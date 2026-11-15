// MIQ Arena — game: duel
// ================= Duel Refleks =================
let dTarget = 5;
function viewDuel(){
  const d = S.duel;
  app.innerHTML = `<section class="hero">
      <div class="stripe"></div>
      <a class="back" href="#berdua" aria-label="Kembali ke Main berdua">${ic('back','#fff',18)}</a>
      <div style="display:flex;flex-direction:column;gap:8px">
        <span class="ic" style="width:48px;height:48px;background:linear-gradient(180deg,var(--y1),var(--y));box-shadow:var(--glow)">${ic('zap','#0a0a0a',24)}</span>
        <h1 style="font-size:30px;line-height:36px;font-weight:700;letter-spacing:-.025em">Duel Refleks</h1>
        <p style="margin:0;line-height:20px;color:rgba(255,255,255,.75);max-width:320px">Letak telefon di tengah. Setiap pemain pegang separuh skrin. Bila skrin bertukar kuning dan keluar "SIJAK!", tekan secepat mungkin!</p>
      </div>
      <div class="rules">
        <div><span class="dot" style="background:var(--hong)"></span><span><b>HONG</b>Pemain atas</span></div>
        <div><span class="dot" style="background:var(--chong)"></span><span><b>CHONG</b>Pemain bawah</span></div>
      </div>
    </section>
    <main>
      <form class="card" id="dForm" style="display:flex;flex-direction:column;gap:16px" novalidate>
        <div class="field">
          <label for="dP1" class="label">Nama pemain Hong (atas)</label>
          <input id="dP1" maxlength="14" autocomplete="off" value="${esc(d.p2 || 'Lawan')}">
        </div>
        <div class="field">
          <label for="dP2" class="label">Nama pemain Chong (bawah)</label>
          <input id="dP2" maxlength="14" autocomplete="off" value="${esc(S.profile.nama)}">
        </div>
        <div class="field">
          <span class="label">Menang bila dapat</span>
          <div class="seg">${[3,5,7].map(n => `<button type="button" class="chip ${n===dTarget?'on':''}" data-t="${n}" aria-pressed="${n===dTarget}">${n} mata</button>`).join('')}</div>
        </div>
        <span class="err" id="dErr" role="alert"></span>
      </form>
      <button class="btn p full" id="dStart" style="font-size:16px;padding:16px">${ic('play','#0a0a0a',16)}Mula duel</button>
      <div class="note">${ic('shield','#0a0a0a',18)}<span>Tekan sebelum "SIJAK!" = mata diberi kepada lawan. Kedua-dua pemain boleh tekan serentak.</span></div>
      <p class="muted" style="margin:0;text-align:center;font-size:12px">${d.plays} duel dimain · terpantas ${d.fastest ? d.fastest+' ms' : '–'}</p>
    </main>` + nav('game');
  app.querySelectorAll('[data-t]').forEach(b => b.onclick = () => {
    dTarget = +b.dataset.t;
    app.querySelectorAll('[data-t]').forEach(x => { const on = +x.dataset.t === dTarget; x.classList.toggle('on', on); x.setAttribute('aria-pressed', on); });
  });
  const go = () => {
    const a = document.getElementById('dP1').value.trim(), b = document.getElementById('dP2').value.trim();
    if (!a || !b) { document.getElementById('dErr').textContent = 'Masukkan nama kedua-dua pemain dahulu.'; return; }
    S.duel.p2 = a; save();
    startDuel(a, b, dTarget);
  };
  document.getElementById('dForm').onsubmit = e => { e.preventDefault(); go(); };
  document.getElementById('dStart').onclick = go;
  window.scrollTo(0,0);
}
function startDuel(n0, n1, target){
  // pemain 0 = Hong (atas, terbalik), pemain 1 = Chong (bawah)
  G = {kind:'duel', names:[n0,n1], score:[0,0], best:[null,null], target, phase:'idle', goAt:0, round:0};
  app.innerHTML = `<section class="dplay">
    <div class="dhalf hong top" data-p="0"><span class="nm">Hong · ${esc(n0)}</span><span class="sc" id="dS0">0</span><span class="msg" id="dM0">Tekan untuk sedia</span></div>
    <div class="dmid"><button class="quit" id="dQuit">✕ Berhenti</button><span class="t">SASARAN ${target} MATA</span><span class="t" id="dR">PUSINGAN 1</span></div>
    <div class="dhalf chong" data-p="1"><span class="nm">Chong · ${esc(n1)}</span><span class="sc" id="dS1">0</span><span class="msg" id="dM1">Tekan untuk sedia</span></div>
  </section>`;
  window.scrollTo(0,0);
  const prevOverflow = document.body.style.overflow; document.body.style.overflow = 'hidden';
  G.cleanup = () => { document.body.style.overflow = prevOverflow; };
  G.halves = [...app.querySelectorAll('.dhalf')];
  G.halves.forEach(h => h.addEventListener('pointerdown', e => { e.preventDefault(); dTap(+h.dataset.p); }));
  document.getElementById('dQuit').onclick = () => { stopGame(); viewDuel(); };
  G.ready = [false,false];
}
const dMsg = (p, t) => { const el = document.getElementById('dM'+p); if (el) el.textContent = t; };
function dRound(){
  const g = G; if (!g || g.kind !== 'duel') return;
  g.round++; document.getElementById('dR').textContent = 'PUSINGAN ' + g.round;
  g.halves.forEach(h => h.classList.remove('go','win','foul'));
  g.phase = 'wait'; dMsg(0,'Sedia… Kyungye'); dMsg(1,'Sedia… Kyungye');
  later(() => {
    if (!G || G.phase !== 'wait') return;
    G.phase = 'go'; G.goAt = performance.now();
    G.halves.forEach(h => h.classList.add('go'));
    dMsg(0,'SIJAK!'); dMsg(1,'SIJAK!'); buzz(40);
  }, rnd(1500, 4200));
}
function dPoint(p, why, ms){
  const g = G; g.phase = 'point';
  g.score[p]++;
  document.getElementById('dS'+p).textContent = g.score[p];
  g.halves.forEach(h => h.classList.remove('go'));
  g.halves[p].classList.add('win');
  const o = 1 - p;
  if (why === 'foul') { g.halves[o].classList.add('foul'); dMsg(o, 'Terlalu awal!'); dMsg(p, 'Mata untuk anda'); }
  else { dMsg(p, `Menang! ${ms} ms`); dMsg(o, 'Lambat sedikit'); }
  if (g.score[p] >= g.target) return later(dFinish, 1200);
  later(dRound, 1500);
}
function dTap(p){
  const g = G; if (!g || g.kind !== 'duel') return;
  if (g.phase === 'idle') {
    g.ready[p] = true; dMsg(p, 'Sedia ✓');
    if (g.ready[0] && g.ready[1]) { g.phase = 'pre'; later(dRound, 500); }
    else dMsg(1-p, 'Tekan untuk sedia');
    return;
  }
  if (g.phase === 'wait') { clearTimers(); buzz([60,40,60]); return dPoint(1-p, 'foul'); }
  if (g.phase === 'go') {
    const ms = Math.round(performance.now() - g.goAt);
    if (g.best[p] === null || ms < g.best[p]) g.best[p] = ms;
    buzz(25); return dPoint(p, 'fast', ms);
  }
}
function dFinish(){
  const g = G; if (!g || g.kind !== 'duel') return;
  stopGame();
  const w = g.score[0] > g.score[1] ? 0 : 1;
  const d = S.duel; d.plays++;
  const fast = [g.best[0], g.best[1]].filter(v => v !== null);
  if (fast.length) { const f = Math.min(...fast); if (!d.fastest || f < d.fastest) d.fastest = f; }
  const xpGain = 40;
  const rankBefore = rankInfo(S.xp).cur.nm;
  S.xp += xpGain; S.rounds++; S.last = 'duel';
  const dk = dkey(new Date()); S.days[dk] = (S.days[dk]||0) + xpGain;
  const rankAfter = rankInfo(S.xp).cur.nm;
  const _rd = {game:'duel'};
  const newDaily = dailyCheck(_rd);
  const newBadges = BADGES.filter(b => !S.badges[b.id] && b.test(S, _rd));
  newBadges.forEach(b => S.badges[b.id] = Date.now());
  save();
  const col = ['var(--hong)','var(--chong)'];
  app.innerHTML = header() + `<main>
    <div class="res">
      <span class="pill dark-p">Duel tamat</span>
      <span class="label" style="margin-top:10px">Pemenang</span>
      <h1 style="font-size:34px;font-weight:900;letter-spacing:-.03em;color:${col[w]}">${esc(g.names[w])}</h1>
      <div class="big">${g.score[0]}<span style="color:var(--muted)"> – </span>${g.score[1]}</div>
      <span class="label">${esc(g.names[0])} (Hong) · ${esc(g.names[1])} (Chong)</span>
      <span class="pill y" style="margin-top:8px">+${xpGain} XP${rankAfter!==rankBefore ? ' · Pangkat '+rankAfter+'!' : ''}</span>
    </div>
    ${dailyBanner(newDaily)}${newBadges.length ? `<div class="card" style="padding:14px;display:flex;flex-direction:column;gap:10px;align-items:center"><span class="label">Lencana baru</span><div class="newb">${newBadges.map(b=>`<span class="pill y">${ic('star','#0a0a0a',14)}${b.nm}</span>`).join('')}</div></div>` : ''}
    <div class="grid2" style="gap:8px">
      <div class="st" style="border-top:4px solid var(--hong)"><span class="label">${esc(g.names[0])} terpantas</span><div class="v">${g.best[0] !== null ? g.best[0]+'<small> ms</small>' : '–'}</div></div>
      <div class="st" style="border-top:4px solid var(--chong)"><span class="label">${esc(g.names[1])} terpantas</span><div class="v">${g.best[1] !== null ? g.best[1]+'<small> ms</small>' : '–'}</div></div>
    </div>
    <div class="tip">Hormat lawan selepas duel: Charyot, Kyong-Ye!</div>
    <div style="display:flex;flex-direction:column;gap:8px">
      <button class="btn p full" id="dAgain">Duel lagi</button>
      <button class="btn d full" id="dSwap">Tukar tempat dan duel lagi</button>
      <a class="btn g full" href="#game">Senarai game</a>
    </div>
  </main>`;
  document.getElementById('dAgain').onclick = () => startDuel(g.names[0], g.names[1], g.target);
  document.getElementById('dSwap').onclick = () => startDuel(g.names[1], g.names[0], g.target);
  window.scrollTo(0,0);
}


