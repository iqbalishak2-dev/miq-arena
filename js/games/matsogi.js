// MIQ Arena — game: matsogi
// ================= Matsogi: butiran =================
let selLevel = null;
function viewMatsogi(){
  const m = S.mats;
  if (selLevel === null || selLevel > m.unlocked) selLevel = Math.min(m.unlocked, LEVELS.length-1);
  const lastBest = m.best[LEVELS[selLevel].id];
  const rows = LEVELS.map((L,i) => {
    const locked = i > m.unlocked, b = m.best[L.id], passed = i < m.unlocked || (i===LEVELS.length-1 && m.passedTop);
    const sub = b ? `Rekod ${fmt(b.score)} · ${b.avg} ms` : L.desc;
    const right = locked ? `<span role="img" aria-label="Berkunci">${ic('lock','#6b6b70',16)}</span>`
      : passed ? '<span class="pill ok">Lulus</span>' : (i===selLevel ? '<span class="pill dark-p">Dipilih</span>' : '');
    return `<button class="lvl ${i===selLevel?'sel':''} ${locked?'lock':''}" data-lvl="${i}" ${locked?'aria-disabled="true"':''}>
      <span class="belt" style="background:${L.col}"></span>
      <span class="nm"><b>${L.nm}</b><span>${sub}</span></span>${right}</button>`;
  }).join('');
  const L = LEVELS[selLevel];
  app.innerHTML = `<section class="hero">
      <div class="stripe"></div>
      <a class="back" href="#game" aria-label="Kembali ke senarai game">${ic('back','#fff',18)}</a>
      <div style="display:flex;flex-direction:column;gap:8px">
        <span class="ic" style="width:48px;height:48px;background:linear-gradient(180deg,var(--y1),var(--y));box-shadow:var(--glow)">${ic('zap','#0a0a0a',24)}</span>
        <h1 style="font-size:30px;line-height:36px;font-weight:700;letter-spacing:-.025em">Matsogi Reflex</h1>
        <p style="margin:0;line-height:20px;color:rgba(255,255,255,.75);max-width:320px">Latih refleks dan disiplin sparring. Serang sasaran yang betul, jangan termakan umpan lawan.</p>
      </div>
      <div class="rules">
        <div><span class="dot" style="background:var(--chong)"></span><span><b>CHONG = serang</b>Tekan pad biru</span></div>
        <div><span class="dot" style="background:var(--hong)"></span><span><b>HONG = jangan</b>Pad merah ialah umpan</span></div>
      </div>
    </section>
    <main>
      <div class="tiles">
        <div class="st"><span class="label">Terpantas</span><div class="v">${m.bestRt ? m.bestRt+'<small> ms</small>' : '–'}</div></div>
        <div class="st"><span class="label">Rekod ${L.nm}</span><div class="v">${lastBest ? lastBest.avg+'<small> ms</small>' : '–'}</div></div>
        <div class="st"><span class="label">Dimain</span><div class="v">${m.plays}×</div></div>
      </div>
      <section style="display:flex;flex-direction:column;gap:10px">
        <h2 style="font-size:18px;font-weight:700">Pilih tahap</h2>
        ${rows}
      </section>
      <div style="display:flex;flex-direction:column;gap:6px">
        <button class="btn p full" id="startBtn" style="font-size:16px;padding:16px">${ic('play','#0a0a0a',16)}Mula tahap ${L.nm}</button>
        <p class="muted" style="margin:0;text-align:center;font-size:12px">${L.cues} serangan · lulus jika ketepatan ≥ 80% dan purata ≤ ${L.pass} ms</p>
      </div>
      <p class="muted" style="margin:0;font-size:12px;line-height:18px;text-align:center">Kelajuan skrin berbeza antara telefon. Bandingkan rekod dengan diri sendiri.</p>
    </main>` + nav('game');
  app.querySelectorAll('.lvl').forEach(b => b.onclick = () => {
    const i = +b.dataset.lvl; if (i > S.mats.unlocked) return;
    selLevel = i; viewMatsogi();
  });
  document.getElementById('startBtn').onclick = () => startGame(selLevel);
  window.scrollTo(0,0);
}


// ================= Matsogi: permainan =================


function startGame(i){
  const L = LEVELS[i];
  G = {li:i, L, n:0, score:0, streak:0, bestStreak:0, rts:[], hits:0, miss:0, wrong:0,
       trapHit:0, trapOk:0, early:0, phase:'idle', cue:null, lastZone:-1, forceCombo:false};
  const zl = ['Nopunde · Kiri','Nopunde · Kanan','Kaunde · Kiri','Kaunde · Kanan'];
  app.innerHTML = `<section class="play">
    <div class="hud">
      <div><div class="k">Markah</div><div class="v" id="hScore">0</div></div>
      <div style="text-align:center"><div class="k">${L.nm}</div><div class="v" id="hCue">0/${L.cues}</div></div>
      <div style="text-align:right"><div class="k">Streak</div><div class="v" id="hStreak">0</div></div>
    </div>
    <div class="pbar"><i id="hBar"></i></div>
    <div id="arena">
      ${zl.map((t,z)=>`<div class="zone" data-z="${z}"><span class="zl">${t}</span><div class="pad"></div></div>`).join('')}
      <div id="toast"></div><div id="count"></div>
    </div>
    <button class="quit" id="quit">✕ Berhenti</button>
  </section>`;
  G.zones = [...app.querySelectorAll('.zone')];
  G.pads = G.zones.map(z => z.querySelector('.pad'));
  document.getElementById('arena').addEventListener('pointerdown', onTap, {passive:false});
  document.getElementById('quit').onclick = () => { stopGame(); viewMatsogi(); };
  window.scrollTo(0,0);
  const c = document.getElementById('count'); let k = 3;
  const tick = () => {
    if (!G) return;
    if (k > 0) { c.innerHTML = `<div>${k}<small>Sedia… Kyungye!</small></div>`; k--; later(tick, 700); }
    else { c.innerHTML = '<div>SIJAK!</div>'; later(() => { c.style.display = 'none'; nextCue(); }, 500); }
  };
  tick();
}
function hud(){
  const $ = id => document.getElementById(id);
  $('hScore').textContent = fmt(G.score);
  $('hCue').textContent = `${G.n}/${G.L.cues}`;
  $('hStreak').textContent = G.streak;
  $('hBar').style.width = (G.n/G.L.cues*100) + '%';
}
const clearPads = () => G && G.pads.forEach(p => p.className = 'pad');

function nextCue(){
  if (!G) return;
  if (G.n >= G.L.cues) return finish();
  const L = G.L, combo = G.forceCombo; G.forceCombo = false;
  let type = 'c';
  if (!combo) { const r = Math.random(); if (r < L.trap) type = 'h'; else if (r < L.trap + L.feint) type = 'f'; }
  let z; do { z = Math.floor(Math.random()*4); } while (z === G.lastZone);
  G.cue = {type, z, combo: type==='c' && !combo && Math.random() < L.combo};
  G.phase = 'wait';
  later(showCue, combo ? rnd(120,220) : rnd(700,2200));
}
function showCue(){
  if (!G) return;
  const c = G.cue; G.n++; hud(); G.lastZone = c.z;
  G.pads[c.z].className = 'pad ' + (c.type === 'h' ? 'h' : 'c');
  G.phase = 'cue';
  c.at = performance.now();
  requestAnimationFrame(() => requestAnimationFrame(() => { if (G && G.cue === c && G.phase === 'cue') c.at = performance.now(); }));
  if (c.type === 'f') later(() => { if (G && G.phase==='cue' && G.cue===c) G.pads[c.z].className = 'pad h'; }, rnd(110,170));
  const win = c.type === 'c' ? G.L.win : Math.min(G.L.win, 900);
  later(() => { if (G && G.phase==='cue' && G.cue===c) timeout(); }, win);
}
function timeout(){
  const c = G.cue; G.phase = 'between'; clearPads();
  if (c.type === 'c') { G.miss++; G.streak = 0; toast('Lambat!','warn'); }
  else { G.trapOk++; toast('Bijak! ✓','ok'); }
  hud(); later(nextCue, 450);
}
function onTap(e){
  if (!G) return;
  const zEl = e.target.closest('.zone'); if (!zEl) return;
  e.preventDefault();
  const z = +zEl.dataset.z, now = performance.now();
  if (G.phase === 'wait') {
    clearTimers(); G.early++; G.score = Math.max(0, G.score-100); G.streak = 0;
    flash(z,false); toast('Terlalu awal!','warn'); buzz(80); hud();
    G.phase = 'between'; later(() => { if (!G) return; G.phase = 'wait'; later(showCue, rnd(900,2000)); }, 500);
    return;
  }
  if (G.phase !== 'cue') return;
  const c = G.cue; clearTimers(); G.phase = 'between'; clearPads();
  if (c.type !== 'c') {
    G.trapHit++; G.streak = 0; G.score = Math.max(0, G.score-300);
    flash(z,false); toast(c.type==='f' ? 'Kena tipu!' : 'Kena umpan!','bad'); buzz([60,40,60]);
    hud(); return later(nextCue, 650);
  }
  if (z !== c.z) { G.wrong++; G.streak = 0; flash(z,false); toast('Salah sasaran','bad'); buzz(60); hud(); return later(nextCue, 550); }
  const rt = Math.round(now - c.at);
  if (rt < 100) { // di bawah 100 ms = meneka, bukan refleks
    G.early++; G.streak = 0; G.score = Math.max(0, G.score-100);
    flash(z,false); toast('Meneka!','warn'); buzz(80); hud(); return later(nextCue, 550);
  }
  G.hits++; G.rts.push(rt); G.streak++; G.bestStreak = Math.max(G.bestStreak, G.streak);
  G.score += Math.round(Math.max(100, G.L.win - rt) * (1 + Math.min(G.streak-1,10)*0.1));
  flash(z,true); toast(rt+' ms','ok'); hud();
  if (c.combo) { G.forceCombo = true; nextCue(); } else later(nextCue, 400);
}
function flash(z, ok){ const el = G.zones[z], c = ok ? 'fo' : 'fb'; el.classList.add(c); setTimeout(() => el.classList.remove(c), 180); }


// ================= Keputusan =================
function finish(){
  clearTimers();
  const g = G, L = g.L; G = null;
  const avg = g.rts.length ? Math.round(g.rts.reduce((a,b)=>a+b,0)/g.rts.length) : 0;
  const best = g.rts.length ? Math.min(...g.rts) : 0;
  const acc = (g.hits + g.trapOk) / L.cues;
  const pass = acc >= PASS_ACC && g.rts.length > 0 && avg <= L.pass;
  const m = S.mats;

  const prev = m.best[L.id];
  const isNew = g.score > 0 && (!prev || g.score > prev.score);
  if (isNew) m.best[L.id] = {score:g.score, avg, date:Date.now()};
  if (best && (!m.bestRt || best < m.bestRt)) m.bestRt = best;
  m.plays++;
  let unlockedNow = false;
  if (pass && g.li === m.unlocked && g.li < LEVELS.length-1) { m.unlocked++; unlockedNow = true; }
  if (pass && g.li === LEVELS.length-1) m.passedTop = true;

  const xpGain = Math.round(g.score/100) + (pass ? 50 : 0);
  const rankBefore = rankInfo(S.xp).cur.nm;
  S.xp += xpGain; S.rounds++;
  const k = dkey(new Date()); S.days[k] = (S.days[k]||0) + xpGain;
  const rankAfter = rankInfo(S.xp).cur.nm;

  const round = {game:'matsogi', acc, li:g.li, avg, trapHit:g.trapHit, early:g.early, bestStreak:g.bestStreak};
  S.last = 'matsogi';
  const _rd = round;
  const newDaily = dailyCheck(_rd);
  const newBadges = BADGES.filter(b => !S.badges[b.id] && b.test(S, _rd));
  newBadges.forEach(b => S.badges[b.id] = Date.now());
  save();

  let tip;
  if (g.trapHit >= 2) tip = 'Anda mudah termakan umpan. Dalam Matsogi, jangan serang setiap gerakan lawan: baca dahulu, kemudian serang.';
  else if (g.early >= 2) tip = 'Terlalu banyak serangan awal. Kekal tenang dalam sikap Kyungye dan tunggu peluang sebenar.';
  else if (g.miss + g.wrong >= 3) tip = 'Banyak sasaran terlepas. Pandang tengah skrin supaya keempat-empat zon kelihatan serentak.';
  else if (avg && avg > L.pass) tip = `Ketepatan baik! Sekarang kurangkan masa reaksi: sasarkan bawah ${L.pass} ms.`;
  else tip = 'Prestasi cemerlang. Teruskan latihan dan bawa refleks ini ke gelanggang!';

  const hasNext = g.li < LEVELS.length-1 && g.li+1 <= m.unlocked;
  app.innerHTML = header() + `<main>
    <div class="res">
      <span class="pill ${pass?'ok':''}" style="${pass?'':'background:#fff3d6;color:#8a4b00'}">${pass?'Lulus':'Belum lulus'}</span>
      <h1 style="font-size:28px;font-weight:700;letter-spacing:-.025em;margin-top:6px">Tahap ${L.nm}</h1>
      <p class="muted" style="margin:0">${pass ? (unlockedNow ? `Tahap ${LEVELS[g.li+1].nm} kini dibuka!` : 'Syabas! Cuba pecahkan rekod anda.') : `Syarat lulus: ketepatan ≥ 80% dan purata ≤ ${L.pass} ms`}</p>
      <div class="big">${fmt(g.score)}</div>
      <span class="label">Markah${isNew ? ' · <span style="color:var(--ok)">rekod baru</span>' : ''}</span>
      <span class="pill y" style="margin-top:8px">+${xpGain} XP${rankAfter!==rankBefore ? ' · Pangkat '+rankAfter+'!' : ''}</span>
    </div>
    ${dailyBanner(newDaily)}${newBadges.length ? `<div class="card" style="padding:14px;display:flex;flex-direction:column;gap:10px;align-items:center"><span class="label">Lencana baru</span><div class="newb">${newBadges.map(b=>`<span class="pill y">${ic('star','#0a0a0a',14)}${b.nm}</span>`).join('')}</div></div>` : ''}
    <div class="grid2" style="gap:8px">
      <div class="st"><span class="label">Purata reaksi</span><div class="v">${avg ? avg+'<small> ms</small>' : '–'}</div></div>
      <div class="st"><span class="label">Terpantas</span><div class="v">${best ? best+'<small> ms</small>' : '–'}</div></div>
      <div class="st"><span class="label">Ketepatan</span><div class="v">${Math.round(acc*100)}<small>%</small></div></div>
      <div class="st"><span class="label">Streak terbaik</span><div class="v">${g.bestStreak}</div></div>
      <div class="st"><span class="label">Kena umpan</span><div class="v">${g.trapHit}</div></div>
      <div class="st"><span class="label">Terlalu awal</span><div class="v">${g.early}</div></div>
    </div>
    <div class="tip">${esc(tip)}</div>
    <div style="display:flex;flex-direction:column;gap:8px">
      <button class="btn p full" id="again">Main lagi</button>
      ${hasNext ? '<button class="btn d full" id="next">Tahap seterusnya →</button>' : ''}
      <a class="btn g full" href="#laman">Laman utama</a>
    </div>
  </main>`;
  document.getElementById('again').onclick = () => startGame(g.li);
  const nx = document.getElementById('next'); if (nx) nx.onclick = () => { selLevel = g.li+1; startGame(g.li+1); };
  window.scrollTo(0,0);
}


