// MIQ Arena — game: klumba
// ================= Kyokpa Lumba =================
let klTarget = 3;
function viewKlumba(){
  const k = S.klumba;
  app.innerHTML = `<section class="hero">
      <div class="stripe"></div>
      <a class="back" href="#berdua" aria-label="Kembali ke Main berdua">${ic('back','#fff',18)}</a>
      <div style="display:flex;flex-direction:column;gap:8px">
        <span class="ic" style="width:48px;height:48px;background:linear-gradient(180deg,var(--y1),var(--y));box-shadow:var(--glow)">${ic('target','#0a0a0a',24)}</span>
        <h1 style="font-size:30px;line-height:36px;font-weight:700;letter-spacing:-.025em">Kyokpa Lumba</h1>
        <p style="margin:0;line-height:20px;color:rgba(255,255,255,.75);max-width:320px">Kedua-dua pemain ada meter sendiri. Tekan bahagian anda sekali bila jarum dalam zon kuning. Paling tepat menang pusingan!</p>
      </div>
      <div class="rules">
        <div><span class="dot" style="background:var(--hong)"></span><span><b>HONG</b>Pemain atas</span></div>
        <div><span class="dot" style="background:var(--chong)"></span><span><b>CHONG</b>Pemain bawah</span></div>
      </div>
    </section>
    <main>${whyBox('klumba')}
      <form class="card" id="kForm" style="display:flex;flex-direction:column;gap:16px" novalidate>
        <div class="field"><label for="kP1" class="label">Nama pemain Hong (atas)</label><input id="kP1" maxlength="14" autocomplete="off" value="${esc(S.duel.p2 || 'Lawan')}"></div>
        <div class="field"><label for="kP2" class="label">Nama pemain Chong (bawah)</label><input id="kP2" maxlength="14" autocomplete="off" value="${esc(S.profile.nama)}"></div>
        <div class="field">
          <span class="label">Menang bila dapat</span>
          <div class="seg">${[2,3,5].map(n => `<button type="button" class="chip ${n===klTarget?'on':''}" data-t="${n}" aria-pressed="${n===klTarget}">${n} mata</button>`).join('')}</div>
        </div>
        <span class="err" id="kErr" role="alert"></span>
      </form>
      <button class="btn p full" id="kStart" style="font-size:16px;padding:16px">${ic('play','#0a0a0a',16)}Mula lumba</button>
      <section class="card" style="padding:0;overflow:hidden">
        <h2 style="padding:16px 20px 10px;font-size:16px;font-weight:700">Siapa menang pusingan?</h2>
        <div class="trow"><span><b style="color:#8a6a00">Sempurna</b> (garis hitam di tengah)</span><span class="muted">Paling tinggi</span></div>
        <div class="trow"><span><b style="color:var(--ok)">Baik</b> (dalam zon kuning)</span><span class="muted">Kedua</span></div>
        <div class="trow"><span><b style="color:var(--bad)">Terlepas</b> (luar zon / tidak tekan)</span><span class="muted">Kalah</span></div>
        <div class="trow"><span class="muted" style="font-size:12px">Jika sama, yang paling dekat dengan garis tengah menang.</span></div>
      </section>
      <p class="muted" style="margin:0;text-align:center;font-size:12px">${k.plays} perlawanan dimain</p>
    </main>` + nav('game');
  app.querySelectorAll('[data-t]').forEach(b => b.onclick = () => {
    klTarget = +b.dataset.t;
    app.querySelectorAll('[data-t]').forEach(x => { const on = +x.dataset.t === klTarget; x.classList.toggle('on', on); x.setAttribute('aria-pressed', on); });
  });
  const go = () => {
    const a = document.getElementById('kP1').value.trim(), b = document.getElementById('kP2').value.trim();
    if (!a || !b) { document.getElementById('kErr').textContent = 'Masukkan nama kedua-dua pemain dahulu.'; return; }
    S.duel.p2 = a; save();
    startKlumba(a, b, klTarget);
  };
  document.getElementById('kForm').onsubmit = e => { e.preventDefault(); go(); };
  document.getElementById('kStart').onclick = go;
  window.scrollTo(0,0);
}
function startKlumba(n0, n1, target){
  G = {kind:'klumba', names:[n0,n1], score:[0,0], target, round:0, phase:'idle', ready:[false,false], pl:[{},{}], perfect:[0,0], raf:0};
  const half = (p, cls) => `<div class="dhalf klhalf ${cls}" data-p="${p}">
      <div class="row1"><span class="nm">${p===0?'Hong':'Chong'} · ${esc([n0,n1][p])}</span><span class="sc" id="kS${p}">0</span></div>
      <div class="stack" id="kB${p}"><div class="board"><i></i><i></i></div></div>
      <span class="kres" id="kR${p}">Tekan untuk sedia</span>
      <div class="meter"><div class="zone" id="kZ${p}"></div><div class="perf" id="kF${p}"></div><div class="needle" id="kN${p}" style="left:0%"></div></div>
    </div>`;
  app.innerHTML = `<section class="dplay">
    ${half(0,'hong top')}
    <div class="dmid"><button class="quit" id="kQuit">✕ Berhenti</button><span class="t" id="kRd">SASARAN ${target} MATA</span><span style="width:70px"></span></div>
    ${half(1,'chong')}
  </section>`;
  window.scrollTo(0,0);
  const prevOverflow = document.body.style.overflow; document.body.style.overflow = 'hidden';
  G.cleanup = () => { document.body.style.overflow = prevOverflow; };
  G.halves = [...app.querySelectorAll('.dhalf')];
  G.halves.forEach(h => h.addEventListener('pointerdown', e => { e.preventDefault(); klTap(+h.dataset.p); }));
  document.getElementById('kQuit').onclick = () => { stopGame(); viewKlumba(); };
}
const klRes = (p, t, c) => { const el = document.getElementById('kR'+p); if (el) { el.textContent = t; el.className = 'kres' + (c ? ' '+c : ''); } };
function klRound(){
  const g = G; if (!g || g.kind !== 'klumba') return;
  g.round++;
  document.getElementById('kRd').textContent = 'PUSINGAN ' + g.round;
  g.halves.forEach(h => h.classList.remove('win','foul'));
  const zone = Math.max(12, 22 - (g.round-1)*1.5), speed = Math.min(1.2, 0.6 + (g.round-1)*0.07);
  g.zone = zone; g.speed = speed;
  [0,1].forEach(p => {
    const zl = 6 + Math.random()*(88 - zone);
    g.pl[p] = {zl, zc: zl + zone/2, ph: Math.random(), locked:false, d:999, rank:0};
    document.getElementById('kZ'+p).style.cssText = `left:${zl}%;width:${zone}%`;
    document.getElementById('kF'+p).style.left = (zl + zone/2) + '%';
    document.getElementById('kB'+p).innerHTML = '<div class="board"><i></i><i></i></div>';
  });
  g.phase = 'count';
  let n = 3;
  const tick = () => {
    if (!G || G.kind !== 'klumba') return;
    if (n > 0) { klRes(0, String(n)); klRes(1, String(n)); n--; later(tick, 600); return; }
    klRes(0, 'Tekan bila dalam zon!'); klRes(1, 'Tekan bila dalam zon!');
    G.phase = 'aim'; G.t0 = performance.now();
    const loop = now => {
      if (!G || G.kind !== 'klumba' || G.phase !== 'aim') return;
      [0,1].forEach(p => { const P = G.pl[p]; if (!P.locked) { P.p = tri((now - G.t0)/1000*G.speed + P.ph)*100; document.getElementById('kN'+p).style.left = P.p + '%'; } });
      G.raf = requestAnimationFrame(loop);
    };
    G.raf = requestAnimationFrame(loop);
    later(() => { if (G && G.kind === 'klumba' && G.phase === 'aim') { [0,1].forEach(p => { if (!G.pl[p].locked) klLock(p, true); }); } }, 6000);
  };
  tick();
}
function klLock(p, timeout){
  const g = G, P = g.pl[p];
  P.locked = true;
  if (timeout) { P.rank = 0; P.d = 999; klRes(p, 'Tidak sempat', 'b'); }
  else {
    P.p = tri((performance.now() - g.t0)/1000*g.speed + P.ph)*100;
    document.getElementById('kN'+p).style.left = P.p + '%';
    const half = g.zone/2; P.d = Math.abs(P.p - P.zc);
    P.rank = P.d <= Math.max(1.6, half*0.25) ? 2 : P.d <= half ? 1 : 0;
    klRes(p, ['TERLEPAS','BAIK','SEMPURNA!'][P.rank], ['b','g','p'][P.rank]);
    if (P.rank > 0) { const bd = document.querySelector('#kB'+p+' .board'); if (bd) bd.classList.add('broke'); }
    if (P.rank === 2) g.perfect[p]++;
    buzz(P.rank ? 30 : [50,30,50]);
  }
  if (g.pl[0].locked && g.pl[1].locked) { g.phase = 'judge'; cancelAnimationFrame(g.raf); later(klJudge, 700); }
}
function klTap(p){
  const g = G; if (!g || g.kind !== 'klumba') return;
  if (g.phase === 'idle') {
    g.ready[p] = true; klRes(p, 'Sedia ✓');
    if (g.ready[0] && g.ready[1]) { g.phase = 'pre'; later(klRound, 400); }
    return;
  }
  if (g.phase === 'aim' && !g.pl[p].locked) klLock(p, false);
}
function klJudge(){
  const g = G; if (!g || g.kind !== 'klumba') return;
  const [a, b] = g.pl;
  let w = -1;
  if (a.rank !== b.rank) w = a.rank > b.rank ? 0 : 1;
  else if (a.rank > 0 && Math.abs(a.d - b.d) > 0.05) w = a.d < b.d ? 0 : 1;
  if (w < 0) { klRes(0, 'Seri!'); klRes(1, 'Seri!'); later(klRound, 1600); return; }
  g.score[w]++;
  document.getElementById('kS'+w).textContent = g.score[w];
  g.halves[w].classList.add('win');
  klRes(w, 'Menang pusingan!', 'p'); if (g.pl[1-w].rank > 0) klRes(1-w, 'Hampir! Lawan lebih tepat', 'g');
  if (g.score[w] >= g.target) return later(klFinish, 1400);
  later(klRound, 1800);
}
function klFinish(){
  const g = G; if (!g || g.kind !== 'klumba') return;
  stopGame();
  const w = g.score[0] > g.score[1] ? 0 : 1;
  const k = S.klumba; k.plays++; k.perfect += g.perfect[0] + g.perfect[1];
  const xpGain = 40;
  const rankBefore = rankInfo(S.xp).cur.nm;
  S.xp += xpGain; S.rounds++; S.last = 'klumba';
  const dk = dkey(new Date()); S.days[dk] = (S.days[dk]||0) + xpGain;
  const rankAfter = rankInfo(S.xp).cur.nm;
  const _rd = {game:'klumba'};
  const newDaily = dailyCheck(_rd);
  const newBadges = BADGES.filter(b => !S.badges[b.id] && b.test(S, _rd));
  newBadges.forEach(b => S.badges[b.id] = Date.now());
  save();
  const col = ['var(--hong)','var(--chong)'];
  app.innerHTML = header() + `<main>
    <div class="res">
      <span class="pill dark-p">Lumba tamat</span>
      <span class="label" style="margin-top:10px">Pemenang</span>
      <h1 style="font-size:34px;font-weight:900;letter-spacing:-.03em;color:${col[w]}">${esc(g.names[w])}</h1>
      <div class="big">${g.score[0]}<span style="color:var(--muted)"> – </span>${g.score[1]}</div>
      <span class="label">${esc(g.names[0])} (Hong) · ${esc(g.names[1])} (Chong) · ${g.round} pusingan</span>
      <span class="pill y" style="margin-top:8px">+${xpGain} XP${rankAfter!==rankBefore ? ' · Pangkat '+rankAfter+'!' : ''}</span>
    </div>
    ${dailyBanner(newDaily)}${newBadges.length ? `<div class="card" style="padding:14px;display:flex;flex-direction:column;gap:10px;align-items:center"><span class="label">Lencana baru</span><div class="newb">${newBadges.map(b=>`<span class="pill y">${ic('star','#0a0a0a',14)}${b.nm}</span>`).join('')}</div></div>` : ''}
    <div class="grid2" style="gap:8px">
      <div class="st" style="border-top:4px solid var(--hong)"><span class="label">${esc(g.names[0])}</span><div class="v">${g.perfect[0]}<small> Sempurna</small></div></div>
      <div class="st" style="border-top:4px solid var(--chong)"><span class="label">${esc(g.names[1])}</span><div class="v">${g.perfect[1]}<small> Sempurna</small></div></div>
    </div>
    <div class="tip">Hormat lawan selepas perlawanan: Charyot, Kyong-Ye!</div>
    <div style="display:flex;flex-direction:column;gap:8px">
      <button class="btn p full" id="kAgain">Lumba lagi</button>
      <button class="btn d full" id="kSwap">Tukar tempat dan lumba lagi</button>
      <a class="btn g full" href="#berdua">Main berdua</a>
    </div>
  </main>`;
  document.getElementById('kAgain').onclick = () => startKlumba(g.names[0], g.names[1], g.target);
  document.getElementById('kSwap').onclick = () => startKlumba(g.names[1], g.names[0], g.target);
  window.scrollTo(0,0);
}


