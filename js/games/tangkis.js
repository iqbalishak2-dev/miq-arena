// MIQ Arena — game: tangkis
// ================= Tangkis! (solo) =================
let tgSel = null;
const TG_DIRS = {atas:[0,-1], bawah:[0,1], kiri:[-1,0], kanan:[1,0]};
const TG_ARROW = {atas:'m6 9 6 6 6-6', bawah:'m18 15-6-6-6 6', kiri:'m9 18 6-6-6-6', kanan:'m15 18-6-6 6-6'}; // anak panah menghala ke tengah
function viewTangkis(){
  const m = S.tgk;
  if (tgSel === null || tgSel > m.unlocked) tgSel = Math.min(m.unlocked, TGLEVELS.length-1);
  const rows = TGLEVELS.map((L,i) => {
    const locked = i > m.unlocked, b = m.best[L.id], passed = i < m.unlocked || (i===TGLEVELS.length-1 && m.passedTop);
    const sub = b ? `Terbaik ${b.blocked}/${L.n} ditangkis` : L.desc;
    const right = locked ? `<span role="img" aria-label="Berkunci">${ic('lock','#6b6b70',16)}</span>`
      : passed ? '<span class="pill ok">Lulus</span>' : (i===tgSel ? '<span class="pill dark-p">Dipilih</span>' : '');
    return `<button class="lvl ${i===tgSel?'sel':''} ${locked?'lock':''}" data-lvl="${i}" ${locked?'aria-disabled="true"':''}>
      <span class="belt" style="background:${L.col};width:28px;height:28px;border-radius:8px;display:grid;place-items:center;color:${i===0?'#0a0a0a':'#fff'};font-weight:700;font-size:13px">${i+1}</span>
      <span class="nm"><b>${L.nm}</b><span>${sub}</span></span>${right}</button>`;
  }).join('');
  const L = TGLEVELS[tgSel];
  app.innerHTML = `<section class="hero">
      <div class="stripe"></div>
      <a class="back" href="#game" aria-label="Kembali ke senarai game">${ic('back','#fff',18)}</a>
      <div style="display:flex;flex-direction:column;gap:8px">
        <span class="ic" style="width:48px;height:48px;background:linear-gradient(180deg,var(--y1),var(--y));box-shadow:var(--glow)">${ic('shield','#0a0a0a',24)}</span>
        <h1 style="font-size:30px;line-height:36px;font-weight:700;letter-spacing:-.025em">Tangkis!</h1>
        <p style="margin:0;line-height:20px;color:rgba(255,255,255,.75);max-width:320px">Serangan merah datang dari atas, bawah, kiri atau kanan. Tekan bahagian skrin di arah serangan itu untuk menangkis sebelum ia sampai.</p>
      </div>
      <div class="rules">
        <div><span class="dot" style="background:var(--hong)"></span><span><b>Serangan</b>Datang ke tengah</span></div>
        <div><span class="dot" style="background:var(--y)"></span><span><b>Tangkis lewat</b>= Sempurna</span></div>
      </div>
    </section>
    <main>${whyBox('tangkis')}
      <section style="display:flex;flex-direction:column;gap:10px">
        <h2 style="font-size:18px;font-weight:700">Pilih tahap</h2>
        ${rows}
      </section>
      <div style="display:flex;flex-direction:column;gap:6px">
        <button class="btn p full" id="tgStart" style="font-size:16px;padding:16px">${ic('play','#0a0a0a',16)}Mula tahap ${L.nm}</button>
        <p class="muted" style="margin:0;text-align:center;font-size:12px">Lulus jika ${Math.round(L.pass*100)}% serangan ditangkis · salah arah = kesilapan</p>
      </div>
    </main>` + nav('game');
  app.querySelectorAll('.lvl').forEach(bt => bt.onclick = () => { const i = +bt.dataset.lvl; if (i > S.tgk.unlocked) return; tgSel = i; viewTangkis(); });
  document.getElementById('tgStart').onclick = () => startTangkis(tgSel);
  window.scrollTo(0,0);
}
function startTangkis(li){
  const L = TGLEVELS[li];
  G = {kind:'tangkis', li, L, atks:[], spawned:0, blocked:0, perfect:0, hits:0, wrong:0, score:0, streak:0, bestStreak:0, raf:0, done:false};
  app.innerHTML = `<section class="tgplay">
    <div class="hud" style="padding-bottom:0">
      <div><div class="k">Markah</div><div class="v" id="tgScore">0</div></div>
      <div style="text-align:center"><div class="k">${L.nm}</div><div class="v" id="tgN">0/${L.n}</div></div>
      <div style="text-align:right"><div class="k">Streak</div><div class="v" id="tgStr">0</div></div>
    </div>
    <div id="tgArena" aria-label="Kawasan tangkisan. Tekan arah serangan.">
      <div class="guide"></div>
      <span class="lbl" style="top:10px;left:50%;transform:translateX(-50%)">ATAS</span>
      <span class="lbl" style="bottom:10px;left:50%;transform:translateX(-50%)">BAWAH</span>
      <span class="lbl" style="left:10px;top:50%;transform:translateY(-50%)">KIRI</span>
      <span class="lbl" style="right:10px;top:50%;transform:translateY(-50%)">KANAN</span>
      <div class="tgme" id="tgMe">${ic('shield','#0a0a0a',30)}<span class="belt" style="background:${beltOf(S.profile.belt).col};box-shadow:inset 0 0 0 1px rgba(0,0,0,.2)"></span></div>
      <div id="toast"></div><div id="count"></div>
    </div>
    <div class="tgdpad">
      ${['kiri','atas','bawah','kanan'].map(d => `<button data-d="${d}" aria-label="Tangkis ${d}"><svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="${{atas:'m18 15-6-6-6 6',bawah:'m6 9 6 6 6-6',kiri:'m15 18-6-6 6-6',kanan:'m9 18 6-6-6-6'}[d]}"/></svg>${d[0].toUpperCase()+d.slice(1)}</button>`).join('')}
    </div>
    <button class="quit" id="tgQuit">✕ Berhenti</button>
  </section>`;
  window.scrollTo(0,0);
  const arena = document.getElementById('tgArena');
  arena.addEventListener('pointerdown', e => {
    e.preventDefault(); if (!G || G.kind !== 'tangkis') return;
    const r = arena.getBoundingClientRect(), dx = e.clientX - (r.left + r.width/2), dy = e.clientY - (r.top + r.height/2);
    tgBlock(Math.abs(dx) > Math.abs(dy) ? (dx < 0 ? 'kiri' : 'kanan') : (dy < 0 ? 'atas' : 'bawah'));
  });
  app.querySelectorAll('.tgdpad button').forEach(b => b.addEventListener('pointerdown', e => { e.preventDefault(); tgBlock(b.dataset.d); }));
  document.getElementById('tgQuit').onclick = () => { stopGame(); viewTangkis(); };
  const c = document.getElementById('count'); let n = 3;
  const tick = () => {
    if (!G || G.kind !== 'tangkis') return;
    if (n > 0) { c.innerHTML = `<div>${n}<small>Junbi!</small></div>`; n--; later(tick, 650); }
    else { c.style.display = 'none'; G.raf = requestAnimationFrame(tgLoop); tgSpawn(); }
  };
  tick();
}
function tgSpawn(){
  const g = G; if (!g || g.kind !== 'tangkis' || g.spawned >= g.L.n) return;
  const dirs = Object.keys(TG_DIRS);
  const d = dirs[Math.floor(Math.random()*4)];
  tgAdd(d);
  if (g.spawned < g.L.n && Math.random() < g.L.dbl) {
    let d2; do { d2 = dirs[Math.floor(Math.random()*4)]; } while (d2 === d);
    later(() => tgAdd(d2), 260);
  }
  const prog = g.spawned / g.L.n;   // makin lama, makin rapat
  later(tgSpawn, Math.max(g.L.travel*0.55, g.L.travel*(0.95 - prog*0.3)) + rnd(150, 550));
}
function tgAdd(d){
  const g = G; if (!g || g.kind !== 'tangkis' || g.spawned >= g.L.n) return;
  g.spawned++;
  document.getElementById('tgN').textContent = `${g.spawned}/${g.L.n}`;
  const el = document.createElement('div');
  el.className = 'tgatk';
  el.innerHTML = `<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="${TG_ARROW[d]}"/></svg>`;
  document.getElementById('tgArena').appendChild(el);
  g.atks.push({d, t0:performance.now(), travel:g.L.travel*rnd(.92,1.08), el, done:false});
}
function tgLoop(now){
  const g = G; if (!g || g.kind !== 'tangkis') return;
  const A = document.getElementById('tgArena'); if (!A) return;
  const W = A.clientWidth, H = A.clientHeight, R = Math.min(W,H)/2 - 30, stop = 50;
  for (const a of g.atks) {
    if (a.done) continue;
    const p = (now - a.t0) / a.travel; a.p = p;
    const [vx, vy] = TG_DIRS[a.d], dist = R - (R - stop) * Math.min(1, p);
    a.el.style.left = (W/2 + vx*dist) + 'px'; a.el.style.top = (H/2 + vy*dist) + 'px';
    if (p >= 1) { a.done = true; tgHurt(a); }
  }
  if (!g.done && g.spawned >= g.L.n && g.atks.every(a => a.done)) { g.done = true; return later(tgFinish, 600); }
  g.raf = requestAnimationFrame(tgLoop);
}
function tgRemove(a){ a.el.classList.add('gone'); setTimeout(() => a.el.remove(), 220); }
function tgHurt(a){
  const g = G; g.hits++; g.streak = 0; tgRemove(a); buzz([70,40,70]);
  const me = document.getElementById('tgMe'); me.classList.remove('hurt','blk'); void me.offsetWidth; me.classList.add('hurt');
  toast('Kena!', 'bad'); tgHud();
}
function tgBlock(d){
  const g = G; if (!g || g.kind !== 'tangkis') return;
  const a = g.atks.filter(x => !x.done && x.d === d && x.p >= 0.2).sort((x,y) => y.p - x.p)[0];
  if (!a) {
    if (g.atks.some(x => !x.done)) { g.wrong++; g.streak = 0; toast('Salah arah', 'warn'); buzz(40); tgHud(); }
    return;
  }
  a.done = true; tgRemove(a);
  const perf = a.p >= 0.7;
  g.blocked++; g.streak++; g.bestStreak = Math.max(g.bestStreak, g.streak); if (perf) g.perfect++;
  g.score += Math.round((perf ? 200 : 100) * (1 + Math.min(g.streak-1, 10)*0.1));
  const me = document.getElementById('tgMe'); me.classList.remove('hurt','blk'); void me.offsetWidth; me.classList.add('blk');
  toast(perf ? 'SEMPURNA!' : 'Tangkis!', 'ok'); buzz(20); tgHud();
}
function tgHud(){
  const g = G;
  document.getElementById('tgScore').textContent = fmt(g.score);
  document.getElementById('tgStr').textContent = g.streak;
}
function tgFinish(){
  const g = G; if (!g || g.kind !== 'tangkis') return;
  stopGame();
  const L = g.L, acc = g.blocked / L.n, pass = acc >= L.pass;
  const m = S.tgk, prev = m.best[L.id], isNew = g.blocked > 0 && (!prev || g.blocked > prev.blocked || (g.blocked === prev.blocked && g.score > prev.score));
  if (isNew) m.best[L.id] = {blocked:g.blocked, score:g.score, date:Date.now()};
  m.plays++;
  let unlockedNow = false;
  if (pass && g.li === m.unlocked && g.li < TGLEVELS.length-1) { m.unlocked++; unlockedNow = true; }
  if (pass && g.li === TGLEVELS.length-1) m.passedTop = true;
  const xpGain = Math.round(g.score/20) + (pass ? 40 : 0);
  const rankBefore = rankInfo(S.xp).cur.nm;
  S.xp += xpGain; S.rounds++; S.last = 'tangkis';
  const dk = dkey(new Date()); S.days[dk] = (S.days[dk]||0) + xpGain;
  const rankAfter = rankInfo(S.xp).cur.nm;
  const _rd = {game:'tangkis', blocked:g.blocked, n:L.n};
  const newDaily = dailyCheck(_rd);
  const newBadges = BADGES.filter(b => !S.badges[b.id] && b.test(S, _rd));
  newBadges.forEach(b => S.badges[b.id] = Date.now());
  save();
  const tip = g.wrong >= 3 ? 'Banyak salah arah. Tunggu sehingga anda pasti dari mana serangan datang, kemudian tangkis.'
    : g.perfect < g.blocked/2 ? 'Petua: tangkis bila serangan hampir sampai untuk dapat "Sempurna", sama seperti menangkis pada saat akhir dalam Matsogi.'
    : 'Tangkisan yang hebat! Pertahanan yang kuat ialah asas Matsogi yang baik.';
  const hasNext = g.li < TGLEVELS.length-1 && g.li+1 <= m.unlocked;
  app.innerHTML = header() + `<main>
    <div class="res">
      <span class="pill ${pass?'ok':''}" style="${pass?'':'background:#fff3d6;color:#8a4b00'}">${pass?'Lulus':'Belum lulus'}</span>
      <h1 style="font-size:28px;font-weight:700;letter-spacing:-.025em;margin-top:6px">Tangkis! · ${L.nm}</h1>
      <p class="muted" style="margin:0">${pass ? (unlockedNow ? `Tahap ${TGLEVELS[g.li+1].nm} kini dibuka!` : 'Syabas! Cuba tangkis semua serangan.') : `Perlu tangkis ${Math.ceil(L.pass*L.n)} serangan untuk lulus.`}</p>
      <div class="big">${g.blocked}<span style="font-size:32px;color:var(--muted)">/${L.n}</span></div>
      <span class="label">Ditangkis · ${fmt(g.score)} markah${isNew ? ' · <span style="color:var(--ok)">rekod baru</span>' : ''}</span>
      <span class="pill y" style="margin-top:8px">+${xpGain} XP${rankAfter!==rankBefore ? ' · Pangkat '+rankAfter+'!' : ''}</span>
    </div>
    ${dailyBanner(newDaily)}${lbBlock('tangkis', L.id, g.score, g.blocked+'/'+L.n+' ditangkis')}${newBadges.length ? `<div class="card" style="padding:14px;display:flex;flex-direction:column;gap:10px;align-items:center"><span class="label">Lencana baru</span><div class="newb">${newBadges.map(b=>`<span class="pill y">${ic('star','#0a0a0a',14)}${b.nm}</span>`).join('')}</div></div>` : ''}
    <div class="grid2" style="gap:8px">
      <div class="st"><span class="label">Sempurna</span><div class="v">${g.perfect}</div></div>
      <div class="st"><span class="label">Kena serang</span><div class="v">${g.hits}</div></div>
      <div class="st"><span class="label">Salah arah</span><div class="v">${g.wrong}</div></div>
      <div class="st"><span class="label">Streak terbaik</span><div class="v">${g.bestStreak}</div></div>
    </div>
    <div class="tip">${esc(tip)}</div>
    <div style="display:flex;flex-direction:column;gap:8px">
      <button class="btn p full" id="tgAgain">Main lagi</button>
      ${hasNext ? '<button class="btn d full" id="tgNx">Tahap seterusnya →</button>' : ''}
      <a class="btn g full" href="#game">Senarai game</a>
    </div>
  </main>`;
  document.getElementById('tgAgain').onclick = () => startTangkis(g.li);
  const nx = document.getElementById('tgNx'); if (nx) nx.onclick = () => { tgSel = g.li+1; startTangkis(g.li+1); };
  window.scrollTo(0,0);
}

