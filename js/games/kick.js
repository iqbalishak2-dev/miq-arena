// MIQ Arena — game: kick
// ================= Flying Kick Dash (solo) =================
// Ketik untuk tendangan melompat, lalu celah antara pad. Tali pinggang naik ikut markah. KIAI! = perisai sekejap.
const FK_BELTS = [0, 5, 12, 20, 30, 45];   // markah untuk Putih, Kuning, Hijau, Biru, Merah, Hitam
const FK = {vh:800, grav:1400, jump:-390, padW:70, speed0:170, kiaiDur:1.5, kiaiCd:8, every:1.55};
const fkBelt = s => { let i = 0; FK_BELTS.forEach((m, j) => { if (s >= m) i = j; }); return BELTS[i]; };
const fkGap = s => Math.max(190, 300 - s*4);   // celah mula lebar, mengecil perlahan

// ---- bunyi (dijana, tiada fail) — ikut tetapan Bunyi ----
let fkAc = null;
function fkTone(f1, f2, dur, type, vol, delay){
  if (S.settings.sound === false) return;
  try {
    fkAc = fkAc || new (window.AudioContext || window.webkitAudioContext)();
    if (fkAc.state === 'suspended') fkAc.resume();
    const t0 = fkAc.currentTime + (delay||0), o = fkAc.createOscillator(), g = fkAc.createGain();
    o.type = type; o.frequency.setValueAtTime(f1, t0); o.frequency.exponentialRampToValueAtTime(Math.max(f2,1), t0 + dur);
    g.gain.setValueAtTime(vol, t0); g.gain.exponentialRampToValueAtTime(0.001, t0 + dur);
    o.connect(g).connect(fkAc.destination); o.start(t0); o.stop(t0 + dur + 0.02);
  } catch(e) {}
}
const fkSfx = {
  jump:  () => fkTone(320, 620, 0.12, 'triangle', 0.18),
  point: () => { fkTone(880, 880, 0.08, 'square', 0.08); fkTone(1320, 1320, 0.12, 'square', 0.08, 0.07); },
  belt:  () => [660, 880, 1100, 1320].forEach((f, i) => fkTone(f, f, 0.12, 'triangle', 0.12, i*0.09)),
  kiai:  () => { fkTone(180, 520, 0.25, 'sawtooth', 0.15); fkTone(520, 260, 0.2, 'triangle', 0.15, 0.2); },
  hit:   () => fkTone(160, 40, 0.35, 'sawtooth', 0.3)
};

function viewKick(){
  const k = S.kick;
  app.innerHTML = `<section class="hero">
      <div class="stripe"></div>
      <a class="back" href="#game" aria-label="Kembali ke senarai game">${ic('back','#fff',18)}</a>
      <div style="display:flex;flex-direction:column;gap:8px">
        <span class="ic" style="width:48px;height:48px;background:linear-gradient(180deg,var(--y1),var(--y));box-shadow:var(--glow)">${ic('zap','#0a0a0a',24)}</span>
        <h1 style="font-size:30px;line-height:36px;font-weight:700;letter-spacing:-.025em">Flying Kick Dash</h1>
        <p style="margin:0;line-height:20px;color:rgba(255,255,255,.75);max-width:320px">Ketik skrin untuk tendangan melompat. Lalu celah antara pad tanpa terlanggar. Tali pinggang anda naik bila markah bertambah.</p>
      </div>
    </section>
    <main>${whyBox('kick')}
      <div class="tiles">
        <div class="st"><span class="label">Rekod</span><div class="v">${k.best || '–'}</div></div>
        <div class="st"><span class="label">Tali pinggang</span><div class="v" style="font-size:18px">${k.best ? fkBelt(k.best).nm : '–'}</div></div>
        <div class="st"><span class="label">Dimain</span><div class="v">${k.plays}</div></div>
      </div>
      <section class="card" style="padding:0;overflow:hidden">
        <h2 style="padding:16px 20px 10px;font-size:16px;font-weight:700">Cara bermain</h2>
        <div class="trow"><span><b>Ketik</b> skrin</span><span class="muted">Tendangan melompat</span></div>
        <div class="trow"><span>Lalu <b>celah</b> antara pad</span><span class="muted">+1 markah</span></div>
        <div class="trow"><span>Tekan <b>KIAI!</b></span><span class="muted">Perisai 1.5 saat</span></div>
        ${FK_BELTS.map((m, i) => i ? `<div class="trow"><span style="display:flex;align-items:center;gap:10px"><span class="belt" style="width:28px;height:8px;background:${BELTS[i].col};box-shadow:inset 0 0 0 1px rgba(0,0,0,.15)"></span>${BELTS[i].nm}</span><span class="muted">${m} markah</span></div>` : '').join('')}
      </section>
      <button class="btn p full" id="fkStart" style="font-size:16px;padding:16px">${ic('play','#0a0a0a',16)}Mula</button>
    </main>` + nav('game');
  document.getElementById('fkStart').onclick = () => startKick();
  window.scrollTo(0,0);
}

function startKick(){
  app.innerHTML = `<section class="fkplay">
    <div class="fktop">
      <button class="quit" id="fkQuit">✕ Berhenti</button>
      <div style="text-align:right"><div class="k">REKOD</div><div class="v">${S.kick.best || 0}</div></div>
    </div>
    <div id="fkwrap" aria-label="Kawasan game. Ketik untuk melompat."><canvas id="fkcv"></canvas></div>
    <button class="fkkiai" id="fkKiai" aria-label="Kiai, perisai sekejap">KIAI!<small id="fkCd"></small></button>
  </section>`;
  window.scrollTo(0,0);
  const cv = document.getElementById('fkcv'), wrap = document.getElementById('fkwrap'), ctx = cv.getContext('2d');
  const R = G = {kind:'kick', cv, ctx, wrap, state:'ready', paused:false, score:0, pads:[], spawnT:0.6, t:0, lastT:0,
    y:FK.vh*0.42, vy:0, r:22, kickT:0, kiaiT:0, kiaiCd:0, gx:0, raf:0, kiais:0};
  const prevOverflow = document.body.style.overflow; document.body.style.overflow = 'hidden';
  const resize = () => {
    const dpr = Math.min(2, window.devicePixelRatio || 1), b = wrap.getBoundingClientRect();
    R.sc = b.height / FK.vh; R.vw = b.width / R.sc; R.px = Math.min(130, R.vw*0.27);
    cv.width = Math.round(b.width*dpr); cv.height = Math.round(b.height*dpr);
    ctx.setTransform(dpr*R.sc, 0, 0, dpr*R.sc, 0, 0);
  };
  resize();
  const flap = () => {
    if (R.paused) { R.paused = false; R.lastT = 0; return; }
    if (R.state === 'ready') R.state = 'play';
    if (R.state !== 'play') return;
    R.vy = FK.jump; R.kickT = 0.25; fkSfx.jump();
  };
  const kiai = () => {
    if (R.state !== 'play' || R.paused || R.kiaiCd > 0) return;
    R.kiaiT = FK.kiaiDur; R.kiaiCd = FK.kiaiCd; R.kiais++; fkSfx.kiai(); buzz([40,40,40]);
  };
  wrap.addEventListener('pointerdown', e => { e.preventDefault(); flap(); });
  document.getElementById('fkKiai').addEventListener('pointerdown', e => { e.preventDefault(); kiai(); });
  const keys = e => {
    if (e.key === ' ' || e.key === 'ArrowUp') { e.preventDefault(); flap(); }
    else if (e.key === 'k' || e.key === 'K') kiai();
  };
  const vis = () => { if (document.hidden && R.state === 'play') R.paused = true; };
  window.addEventListener('keydown', keys); window.addEventListener('resize', resize); document.addEventListener('visibilitychange', vis);
  R.cleanup = () => { window.removeEventListener('keydown', keys); window.removeEventListener('resize', resize); document.removeEventListener('visibilitychange', vis); document.body.style.overflow = prevOverflow; };
  document.getElementById('fkQuit').onclick = () => { stopGame(); viewKick(); };
  R.raf = requestAnimationFrame(fkLoop);
}

function fkLoop(now){
  const R = G; if (!R || R.kind !== 'kick') return;
  const dt = R.lastT ? Math.min((now - R.lastT)/1000, 1/30) : 0; R.lastT = now;
  if (!R.paused) fkUpdate(R, dt);
  if (!G || G !== R) return;   // tamat dalam fkUpdate
  fkDraw(R);
  R.raf = requestAnimationFrame(fkLoop);
}

function fkUpdate(R, dt){
  R.t += dt;
  const speed = FK.speed0 + Math.min(R.score*4, 120);
  if (R.state !== 'over') R.gx = (R.gx - speed*dt) % 40;
  if (R.state === 'ready') { R.y = FK.vh*0.42 + Math.sin(R.t*3)*8; return; }
  if (R.state !== 'play') return;
  R.vy += FK.grav*dt; R.y += R.vy*dt;
  R.kickT = Math.max(0, R.kickT - dt); R.kiaiT = Math.max(0, R.kiaiT - dt); R.kiaiCd = Math.max(0, R.kiaiCd - dt);
  R.spawnT -= dt;
  if (R.spawnT <= 0) {
    const gap = fkGap(R.score), lo = 90, hi = FK.vh - 110 - gap;
    R.pads.push({x: R.vw + 10, top: lo + Math.random()*(hi - lo), gap, passed:false});
    R.spawnT = FK.every;
  }
  for (const p of R.pads) {
    p.x -= speed*dt;
    if (!p.passed && p.x + FK.padW < R.px - R.r) {
      p.passed = true; R.score++;
      if (FK_BELTS.includes(R.score)) { fkSfx.belt(); buzz([30,50,30]); } else { fkSfx.point(); buzz(15); }
    }
    if (R.kiaiT <= 0 && (fkHit(R, p.x, 0, p.top) || fkHit(R, p.x, p.top + p.gap, FK.vh))) return fkOver(R);
  }
  R.pads = R.pads.filter(p => p.x > -FK.padW - 10);
  if (R.y + R.r > FK.vh - 60) return fkOver(R);
  if (R.y - R.r < 0) { R.y = R.r; R.vy = 0; }
  const b = document.getElementById('fkKiai'), cd = document.getElementById('fkCd');
  if (b) { b.classList.toggle('ready', R.kiaiCd <= 0); cd.textContent = R.kiaiCd > 0 ? Math.ceil(R.kiaiCd)+' s' : ''; }
}
function fkHit(R, rx, ry, rh){
  const r = R.r*0.8, cx = Math.max(rx, Math.min(R.px, rx + FK.padW)), cy = Math.max(ry, Math.min(R.y, ry + rh));
  return (R.px - cx)**2 + (R.y - cy)**2 < r*r;
}
function fkOver(R){
  R.state = 'over'; fkSfx.hit(); buzz(220);
  later(kickFinish, 700);
}

// ---- lukisan ----
function fkDraw(R){
  const c = R.ctx, W = R.vw, H = FK.vh;
  const g = c.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#1b1b1b'); g.addColorStop(1, '#0d0d0d');
  c.fillStyle = g; c.fillRect(0, 0, W, H);
  c.strokeStyle = 'rgba(245,196,0,.06)'; c.lineWidth = 2;
  for (let y = 120; y < H - 60; y += 120) { c.beginPath(); c.moveTo(0, y); c.lineTo(W, y); c.stroke(); }
  c.fillStyle = 'rgba(245,196,0,.05)'; c.font = '900 140px Geist, system-ui, sans-serif'; c.textAlign = 'center';
  c.fillText('MIQ', W/2, H/2 + 40);
  for (const p of R.pads) { fkPad(c, p.x, 0, p.top, true); fkPad(c, p.x, p.top + p.gap, H - 60 - (p.top + p.gap), false); }
  c.fillStyle = '#f5c400'; c.fillRect(0, H - 60, W, 60);
  c.fillStyle = '#0a0a0a'; for (let x = R.gx; x < W; x += 40) c.fillRect(x, H - 60, 20, 6);
  fkPlayer(R, c);
  c.textAlign = 'center';
  if (R.state !== 'ready') { c.fillStyle = 'rgba(255,255,255,.92)'; c.font = '900 56px Geist, system-ui, sans-serif'; c.fillText(R.score, W/2, 110); }
  const msg = R.state === 'ready' ? 'Ketik untuk mula' : R.paused ? 'Ketik untuk sambung' : '';
  if (msg) {
    c.fillStyle = 'rgba(0,0,0,.6)'; c.fillRect(W/2 - 170, H*0.6 - 40, 340, 64);
    c.fillStyle = '#f5c400'; c.font = '700 28px Geist, system-ui, sans-serif'; c.fillText(tr(msg), W/2, H*0.6 + 2);
  }
}
function fkPad(c, x, y, h, top){
  if (h <= 0) return;
  const w = FK.padW;
  c.fillStyle = '#222'; c.fillRect(x, y, w, h);
  c.strokeStyle = '#f5c400'; c.lineWidth = 3; c.strokeRect(x + 1.5, y + 1.5, w - 3, h - 3);
  const fy = top ? y + h - 34 : y;
  c.fillStyle = '#f5c400'; c.beginPath(); c.roundRect ? c.roundRect(x - 6, fy, w + 12, 34, 8) : c.rect(x - 6, fy, w + 12, 34); c.fill();
  c.fillStyle = '#0a0a0a'; c.beginPath(); c.arc(x + w/2, fy + 17, 9, 0, Math.PI*2); c.fill();
}
function fkPlayer(R, c){
  const b = fkBelt(R.score), black = b.nm === 'Hitam';
  c.save(); c.translate(R.px, R.y); c.rotate(Math.max(-0.5, Math.min(0.7, R.vy/900)));
  if (R.kiaiT > 0) { c.strokeStyle = `rgba(245,196,0,${0.5 + 0.4*Math.sin(R.t*20)})`; c.lineWidth = 4; c.beginPath(); c.arc(0, 0, R.r + 16, 0, Math.PI*2); c.stroke(); }
  c.lineCap = 'round'; c.strokeStyle = '#f5f5f5'; c.lineWidth = 9;
  c.beginPath(); c.moveTo(-4, -14); c.lineTo(0, 10); c.stroke();                     // badan (dobok)
  c.strokeStyle = black ? '#000' : b.col; c.lineWidth = 5;
  c.beginPath(); c.moveTo(-8, 4); c.lineTo(8, 6); c.stroke();                        // tali pinggang
  if (black) { c.strokeStyle = '#f5c400'; c.lineWidth = 1.5; c.beginPath(); c.moveTo(-8, 4); c.lineTo(8, 6); c.stroke(); }
  c.strokeStyle = '#f5f5f5'; c.lineWidth = 7;
  if (R.kickT > 0) {                                                                  // tendangan: kaki depan lurus
    c.beginPath(); c.moveTo(0, 10); c.lineTo(30, 4); c.stroke();
    c.beginPath(); c.moveTo(0, 10); c.lineTo(-10, 22); c.lineTo(-20, 18); c.stroke();
  } else {
    c.beginPath(); c.moveTo(0, 10); c.lineTo(8, 28); c.stroke();
    c.beginPath(); c.moveTo(0, 10); c.lineTo(-8, 28); c.stroke();
  }
  c.lineWidth = 6;
  c.beginPath(); c.moveTo(-3, -8); c.lineTo(12, -4); c.lineTo(16, -14); c.stroke();
  c.beginPath(); c.moveTo(-3, -8); c.lineTo(-14, 0); c.stroke();
  c.fillStyle = '#e0b48a'; c.beginPath(); c.arc(-5, -24, 10, 0, Math.PI*2); c.fill();
  c.fillStyle = '#222'; c.beginPath(); c.arc(-5, -27, 10, Math.PI, Math.PI*2); c.fill();
  c.restore();
}

function kickFinish(){
  const R = G; if (!R || R.kind !== 'kick') return;
  stopGame();
  const s = R.score, k = S.kick, belt = fkBelt(s), isNew = s > k.best;
  if (isNew) k.best = s;
  k.plays++;
  const xpGain = 5 + s*6;
  const rankBefore = rankInfo(S.xp).cur.nm;
  S.xp += xpGain; S.rounds++; S.last = 'kick';
  const dk = dkey(new Date()); S.days[dk] = (S.days[dk]||0) + xpGain;
  const rankAfter = rankInfo(S.xp).cur.nm;
  const _rd = {game:'kick', score:s};
  const newDaily = dailyCheck(_rd);
  const newBadges = BADGES.filter(b => !S.badges[b.id] && b.test(S, _rd));
  newBadges.forEach(b => S.badges[b.id] = Date.now());
  save();
  const nxt = FK_BELTS.find(m => m > s);
  const tip = s < 3 ? 'Petua: jangan ketik terlalu laju. Ketik sekali-sekala dan biarkan badan jatuh sedikit sebelum ketik lagi.'
    : R.kiais === 0 ? 'Petua: guna butang KIAI! bila celah nampak terlalu sempit. Perisai melindungi anda selama 1.5 saat.'
    : 'Hebat! Kekal tenang dan ikut rentak, macam tendangan melompat yang terkawal.';
  app.innerHTML = header() + `<main>
    <div class="res">
      <span class="pill ${isNew?'ok':'dark-p'}">${isNew ? 'Rekod baru!' : 'Tamat'}</span>
      <h1 style="font-size:28px;font-weight:700;letter-spacing:-.025em;margin-top:6px">Flying Kick Dash</h1>
      <div class="big">${s}</div>
      <span class="label">Celah dilalui · rekod ${k.best}</span>
      <span class="pill" style="margin-top:8px;background:${belt.col};color:${['Putih','Kuning'].includes(belt.nm)?'#0a0a0a':'#fff'};box-shadow:inset 0 0 0 1px rgba(0,0,0,.15)">Tali pinggang ${belt.nm}</span>
      ${nxt ? `<span class="muted" style="font-size:13px">${nxt - s} lagi untuk ${fkBelt(nxt).nm}</span>` : ''}
      <span class="pill y" style="margin-top:8px">+${xpGain} XP${rankAfter!==rankBefore ? ' · Pangkat '+rankAfter+'!' : ''}</span>
    </div>
    ${dailyBanner(newDaily)}${lbBlock('kick', '', s, s+' celah · '+belt.nm)}${newBadges.length ? `<div class="card" style="padding:14px;display:flex;flex-direction:column;gap:10px;align-items:center"><span class="label">Lencana baru</span><div class="newb">${newBadges.map(b=>`<span class="pill y">${ic('star','#0a0a0a',14)}${b.nm}</span>`).join('')}</div></div>` : ''}
    <div class="tip">${esc(tip)}</div>
    <div style="display:flex;flex-direction:column;gap:8px">
      <button class="btn p full" id="fkAgain">Main lagi</button>
      <a class="btn g full" href="#game">Senarai game</a>
    </div>
  </main>`;
  document.getElementById('fkAgain').onclick = () => startKick();
  window.scrollTo(0,0);
}
