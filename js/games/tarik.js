// MIQ Arena — game: tarik
// ================= Tarik Tali =================
let tBest = 3;
function viewTarik(){
  const t = S.tarik;
  app.innerHTML = `<section class="hero">
      <div class="stripe"></div>
      <a class="back" href="#berdua" aria-label="Kembali ke Main berdua">${ic('back','#fff',18)}</a>
      <div style="display:flex;flex-direction:column;gap:8px">
        <span class="ic" style="width:48px;height:48px;background:linear-gradient(180deg,var(--y1),var(--y));box-shadow:var(--glow)">${ic('feet','#0a0a0a',24)}</span>
        <h1 style="font-size:30px;line-height:36px;font-weight:700;letter-spacing:-.025em">Tarik Tali</h1>
        <p style="margin:0;line-height:20px;color:rgba(255,255,255,.75);max-width:320px">Letak telefon di tengah. Bila "TARIK!" keluar, tekan bahagian anda secepat mungkin untuk menarik simpulan tali pinggang hitam ke garisan anda.</p>
      </div>
      <div class="rules">
        <div><span class="dot" style="background:var(--hong)"></span><span><b>HONG</b>Pemain atas</span></div>
        <div><span class="dot" style="background:var(--chong)"></span><span><b>CHONG</b>Pemain bawah</span></div>
      </div>
    </section>
    <main>
      <form class="card" id="tForm" style="display:flex;flex-direction:column;gap:16px" novalidate>
        <div class="field"><label for="tP1" class="label">Nama pemain Hong (atas)</label><input id="tP1" maxlength="14" autocomplete="off" value="${esc(S.duel.p2 || 'Lawan')}"></div>
        <div class="field"><label for="tP2" class="label">Nama pemain Chong (bawah)</label><input id="tP2" maxlength="14" autocomplete="off" value="${esc(S.profile.nama)}"></div>
        <div class="field">
          <span class="label">Bilangan pusingan</span>
          <div class="seg" style="grid-template-columns:repeat(2,minmax(0,1fr))">${[[1,'1 pusingan'],[3,'Terbaik 3']].map(([n,l]) => `<button type="button" class="chip ${n===tBest?'on':''}" data-b="${n}" aria-pressed="${n===tBest}">${l}</button>`).join('')}</div>
        </div>
        <span class="err" id="tErr" role="alert"></span>
      </form>
      <button class="btn p full" id="tStart" style="font-size:16px;padding:16px">${ic('play','#0a0a0a',16)}Mula tarik tali</button>
      <div class="note">${ic('shield','#0a0a0a',18)}<span>Tekan dengan hujung jari, bukan dengan kuku atau penumbuk. Letak telefon atas permukaan rata yang lembut.</span></div>
      <p class="muted" style="margin:0;text-align:center;font-size:12px">${t.plays} perlawanan · tekanan terlaju ${t.bestRate ? t.bestRate+'/saat' : '–'}</p>
    </main>` + nav('game');
  app.querySelectorAll('[data-b]').forEach(b => b.onclick = () => {
    tBest = +b.dataset.b;
    app.querySelectorAll('[data-b]').forEach(x => { const on = +x.dataset.b === tBest; x.classList.toggle('on', on); x.setAttribute('aria-pressed', on); });
  });
  const go = () => {
    const a = document.getElementById('tP1').value.trim(), b = document.getElementById('tP2').value.trim();
    if (!a || !b) { document.getElementById('tErr').textContent = 'Masukkan nama kedua-dua pemain dahulu.'; return; }
    S.duel.p2 = a; save();
    startTarik(a, b, tBest);
  };
  document.getElementById('tForm').onsubmit = e => { e.preventDefault(); go(); };
  document.getElementById('tStart').onclick = go;
  window.scrollTo(0,0);
}
const T_STEP = 0.032;
function startTarik(n0, n1, bestOf){
  G = {kind:'tarik', names:[n0,n1], wins:[0,0], need:Math.ceil(bestOf/2), bestOf, round:0, pos:0, phase:'idle', taps:[0,0], t0:0, rate:[0,0]};
  app.innerHTML = `<section class="dplay tplay">
    <div class="dhalf hong top" data-p="0"><span class="nm">Hong · ${esc(n0)}</span><span class="sc" id="tW0">0</span><span class="msg" id="tM0">Tekan untuk sedia</span></div>
    <div class="dmid"><button class="quit" id="tQuit">✕ Berhenti</button><span class="t" id="tR">${bestOf > 1 ? 'TERBAIK 3' : '1 PUSINGAN'}</span><span style="width:70px"></span></div>
    <div class="dhalf chong" data-p="1"><span class="nm">Chong · ${esc(n1)}</span><span class="sc" id="tW1">0</span><span class="msg" id="tM1">Tekan untuk sedia</span></div>
    <div class="wline" style="top:12%"></div><div class="wline" style="top:88%"></div>
    <div class="rope" id="tRope" aria-hidden="true"><div class="belt" id="tBelt"><span class="dan" style="top:24%"></span><span class="dan" style="top:25.2%"></span><span class="dan" style="bottom:24%"></span><span class="dan" style="bottom:25.2%"></span><div class="knot" id="tKnot"><span class="t1"></span><span class="t2"></span><span class="k1"></span><span class="k2"></span></div></div></div>
  </section>`;
  window.scrollTo(0,0);
  const prevOverflow = document.body.style.overflow; document.body.style.overflow = 'hidden';
  G.cleanup = () => { document.body.style.overflow = prevOverflow; };
  G.halves = [...app.querySelectorAll('.dhalf')];
  G.halves.forEach(h => h.addEventListener('pointerdown', e => { e.preventDefault(); tTap(+h.dataset.p); }));
  document.getElementById('tQuit').onclick = () => { stopGame(); viewTarik(); };
  G.ready = [false,false];
}
const tMsg = (p, t, cls) => { const el = document.getElementById('tM'+p); if (el) { el.textContent = t; el.className = 'msg' + (cls ? ' '+cls : ''); } };
function tKnot(final){
  const b = document.getElementById('tBelt'); if (!b) return;
  b.classList.toggle('final', !!final);
  b.style.transform = `translateY(${(G.pos*38/1.8).toFixed(2)}%)`;
}
function tJerk(p){
  const r = document.getElementById('tRope'), k = document.getElementById('tKnot'); if (!r) return;
  r.classList.remove('jerk0','jerk1'); k.classList.remove('pulse'); void r.offsetWidth;
  r.classList.add('jerk'+p); k.classList.add('pulse');
}
function tRound(){
  const g = G; if (!g || g.kind !== 'tarik') return;
  g.round++; g.pos = 0; g.taps = [0,0]; tKnot(true);
  g.halves.forEach(h => h.classList.remove('go','win','foul'));
  g.phase = 'count'; tMsg(0,''); tMsg(1,'');
  let n = 3;
  const tick = () => {
    if (!G || G.kind !== 'tarik') return;
    if (n > 0) { tMsg(0, String(n)); tMsg(1, String(n)); n--; later(tick, 650); return; }
    G.phase = 'pull'; G.t0 = performance.now();
    tMsg(0, 'TARIK!', 'tap'); tMsg(1, 'TARIK!', 'tap'); buzz(50);
  };
  tick();
}
function tTap(p){
  const g = G; if (!g || g.kind !== 'tarik') return;
  if (g.phase === 'idle') {
    g.ready[p] = true; tMsg(p, 'Sedia ✓');
    if (g.ready[0] && g.ready[1]) { g.phase = 'pre'; later(tRound, 400); }
    return;
  }
  if (g.phase !== 'pull') return;
  g.taps[p]++;
  g.pos += p === 0 ? -T_STEP : T_STEP;   // atas = ke arah -1, bawah = ke arah +1
  tKnot(); tJerk(p);
  if (Math.abs(g.pos) >= 1) {
    g.pos = g.pos < 0 ? -1.25 : 1.25; tKnot(true);   // tarikan akhir: tali pinggang meluncur ke pihak pemenang
    const w = g.pos < 0 ? 0 : 1, secs = Math.max(0.5, (performance.now() - g.t0)/1000);
    g.rate = [Math.round(g.taps[0]/secs*10)/10, Math.round(g.taps[1]/secs*10)/10];
    g.rate.forEach((r,i) => { if (!g.maxRate || r > g.maxRate) g.maxRate = r; });
    g.phase = 'point'; g.wins[w]++; buzz([40,30,80]);
    document.getElementById('tW'+w).textContent = g.wins[w];
    g.halves.forEach(h => h.classList.remove('go'));
    g.halves[w].classList.add('win');
    tMsg(w, 'Menang pusingan!'); tMsg(1-w, 'Cuba lagi!');
    if (g.wins[w] >= g.need) return later(tkFinish, 1300);
    later(tRound, 1800);
  }
}
function tkFinish(){
  const g = G; if (!g || g.kind !== 'tarik') return;
  stopGame();
  const w = g.wins[0] > g.wins[1] ? 0 : 1;
  const t = S.tarik; t.plays++;
  if (g.maxRate && g.maxRate > t.bestRate) t.bestRate = g.maxRate;
  const xpGain = 30;
  const rankBefore = rankInfo(S.xp).cur.nm;
  S.xp += xpGain; S.rounds++; S.last = 'tarik';
  const dk = dkey(new Date()); S.days[dk] = (S.days[dk]||0) + xpGain;
  const rankAfter = rankInfo(S.xp).cur.nm;
  const _rd = {game:'tarik'};
  const newDaily = dailyCheck(_rd);
  const newBadges = BADGES.filter(b => !S.badges[b.id] && b.test(S, _rd));
  newBadges.forEach(b => S.badges[b.id] = Date.now());
  save();
  const col = ['var(--hong)','var(--chong)'];
  app.innerHTML = header() + `<main>
    <div class="res">
      <span class="pill dark-p">Tarik tali tamat</span>
      <span class="label" style="margin-top:10px">Pemenang</span>
      <h1 style="font-size:34px;font-weight:900;letter-spacing:-.03em;color:${col[w]}">${esc(g.names[w])}</h1>
      <div class="big">${g.wins[0]}<span style="color:var(--muted)"> – </span>${g.wins[1]}</div>
      <span class="label">${esc(g.names[0])} (Hong) · ${esc(g.names[1])} (Chong)</span>
      <span class="pill y" style="margin-top:8px">+${xpGain} XP${rankAfter!==rankBefore ? ' · Pangkat '+rankAfter+'!' : ''}</span>
    </div>
    ${dailyBanner(newDaily)}${newBadges.length ? `<div class="card" style="padding:14px;display:flex;flex-direction:column;gap:10px;align-items:center"><span class="label">Lencana baru</span><div class="newb">${newBadges.map(b=>`<span class="pill y">${ic('star','#0a0a0a',14)}${b.nm}</span>`).join('')}</div></div>` : ''}
    <div class="grid2" style="gap:8px">
      <div class="st" style="border-top:4px solid var(--hong)"><span class="label">${esc(g.names[0])}</span><div class="v">${g.rate[0]}<small> tekanan/saat</small></div></div>
      <div class="st" style="border-top:4px solid var(--chong)"><span class="label">${esc(g.names[1])}</span><div class="v">${g.rate[1]}<small> tekanan/saat</small></div></div>
    </div>
    <div class="tip">Kelajuan pusingan terakhir. Hormat lawan selepas perlawanan: Charyot, Kyong-Ye!</div>
    <div style="display:flex;flex-direction:column;gap:8px">
      <button class="btn p full" id="tAgain">Tarik lagi</button>
      <button class="btn d full" id="tSwap">Tukar tempat dan tarik lagi</button>
      <a class="btn g full" href="#game">Senarai game</a>
    </div>
  </main>`;
  document.getElementById('tAgain').onclick = () => startTarik(g.names[0], g.names[1], g.bestOf);
  document.getElementById('tSwap').onclick = () => startTarik(g.names[1], g.names[0], g.bestOf);
  window.scrollTo(0,0);
}


