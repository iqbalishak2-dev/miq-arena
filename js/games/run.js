// MIQ Arena — game: run
// ================= Dojang Run =================
function viewRun(){
  const r = S.run;
  app.innerHTML = `<section class="hero">
      <div class="stripe"></div>
      <a class="back" href="#game" aria-label="Kembali ke senarai game">${ic('back','#fff',18)}</a>
      <div style="display:flex;flex-direction:column;gap:8px">
        <span class="ic" style="width:48px;height:48px;background:linear-gradient(180deg,var(--y1),var(--y));box-shadow:var(--glow)">${ic('feet','#0a0a0a',24)}</span>
        <h1 style="font-size:30px;line-height:36px;font-weight:700;letter-spacing:-.025em">Dojang Run</h1>
        <p style="margin:0;line-height:20px;color:rgba(255,255,255,.75);max-width:320px">Lari sejauh mungkin. Elak halangan, tendang papan dan kutip bintang. Anda ada 3 nyawa.</p>
      </div>
    </section>
    <main>
      <div class="tiles">
        <div class="st"><span class="label">Rekod</span><div class="v">${r.best ? fmt(r.best)+'<small> m</small>' : '–'}</div></div>
        <div class="st"><span class="label">Bintang</span><div class="v">${r.bestStars || '–'}</div></div>
        <div class="st"><span class="label">Larian</span><div class="v">${r.plays}</div></div>
      </div>
      <section class="card" style="padding:0;overflow:hidden">
        <h2 style="padding:16px 20px 10px;font-size:16px;font-weight:700">Cara bermain</h2>
        <div class="trow"><span>Leret <b>kiri / kanan</b></span><span class="muted">Tukar lorong</span></div>
        <div class="trow"><span>Leret <b>atas</b> <span class="muted">· pad biru</span></span><span class="muted">Lompat</span></div>
        <div class="trow"><span>Leret <b>bawah</b> <span class="muted">· palang</span></span><span class="muted">Gelongsor</span></div>
        <div class="trow"><span><b>Ketik</b> <span class="muted">· papan kayu</span></span><span class="muted">Tendang (+50)</span></div>
        <div class="trow"><span>Tiang hitam-kuning</span><span class="muted">Tukar lorong!</span></div>
      </section>
      <button class="btn p full" id="rStart" style="font-size:16px;padding:16px">${ic('play','#0a0a0a',16)}Mula lari</button>
      <p class="muted" style="margin:0;text-align:center;font-size:12px">Butang di bawah skrin juga boleh digunakan jika leretan sukar.</p>
    </main>` + nav('game');
  document.getElementById('rStart').onclick = startRun;
  window.scrollTo(0,0);
}

function startRun(){
  const beltCol = beltOf(S.profile.belt).col;
  app.innerHTML = `<section class="rplay">
    <div class="rtop">
      <button class="quit" id="rQuit">✕ Berhenti</button>
      <div class="hearts" id="rHearts" aria-label="3 nyawa">♥♥♥</div>
    </div>
    <div class="rhud">
      <div><div class="k">JARAK</div><div class="v" id="rM">0 m</div></div>
      <div style="text-align:center"><div class="k">PAPAN</div><div class="v" id="rB">0</div></div>
      <div style="text-align:right"><div class="k">BINTANG</div><div class="v" id="rS">0</div></div>
    </div>
    <div id="rwrap" aria-label="Kawasan larian. Leret untuk bergerak, ketik untuk menendang."><canvas id="rcv"></canvas></div>
    <div class="rctl">
      <button data-a="left" aria-label="Lorong kiri">${ic('back','#0a0a0a',20)}Kiri</button>
      <button data-a="jump" aria-label="Lompat"><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="#0a0a0a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m18 15-6-6-6 6"/></svg>Lompat</button>
      <button data-a="kick" class="kick" aria-label="Tendang">${ic('zap','#0a0a0a',20)}Tendang</button>
      <button data-a="slide" aria-label="Gelongsor"><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="#0a0a0a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>Gelongsor</button>
      <button data-a="right" aria-label="Lorong kanan"><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="#0a0a0a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>Kanan</button>
    </div>
  </section>`;
  window.scrollTo(0,0);
  const cv = document.getElementById('rcv'), wrap = document.getElementById('rwrap'), ctx = cv.getContext('2d');
  const R = G = {kind:'run', cv, ctx, wrap, beltCol, dist:0, speed:13, lives:3, stars:0, boards:0, objs:[], fx:[], pops:[],
    lane:1, px:1, jumpT:-1, slideT:-1, kickT:-1, inv:0, nextRow:50, state:'count', countT:3, t:0, lastT:0, paused:false, raf:0, hudT:0};
  const prevOverflow = document.body.style.overflow; document.body.style.overflow = 'hidden';

  const resize = () => {
    const dpr = Math.min(2, window.devicePixelRatio || 1), r = wrap.getBoundingClientRect();
    R.W = r.width; R.H = r.height; cv.width = Math.round(r.width*dpr); cv.height = Math.round(r.height*dpr);
    ctx.setTransform(dpr,0,0,dpr,0,0);
  };
  resize();
  const act = a => {
    if (R.state !== 'run') return;
    if (R.paused) { R.paused = false; R.lastT = 0; return; }
    if (a === 'left' && R.lane > 0) R.lane--;
    else if (a === 'right' && R.lane < 2) R.lane++;
    else if (a === 'jump' && R.jumpT < 0) { R.jumpT = 0; R.slideT = -1; }
    else if (a === 'slide' && R.slideT < 0) { R.slideT = 0; R.jumpT = -1; }
    else if (a === 'kick' && R.kickT < 0) { R.kickT = 0; tryKick(); }
  };
  R.act = act;
  // leretan / ketik pada kawasan larian
  let sx = 0, sy = 0, st = 0, sid = null;
  wrap.addEventListener('pointerdown', e => { e.preventDefault(); sid = e.pointerId; sx = e.clientX; sy = e.clientY; st = performance.now(); try { wrap.setPointerCapture(e.pointerId); } catch(_){} });
  wrap.addEventListener('pointerup', e => {
    if (sid !== e.pointerId) return; sid = null;
    const dx = e.clientX - sx, dy = e.clientY - sy, ad = Math.max(Math.abs(dx), Math.abs(dy));
    if (ad < 22) return act('kick');
    if (Math.abs(dx) > Math.abs(dy)) act(dx < 0 ? 'left' : 'right'); else act(dy < 0 ? 'jump' : 'slide');
  });
  app.querySelectorAll('.rctl button').forEach(b => b.addEventListener('pointerdown', e => { e.preventDefault(); act(b.dataset.a); }));
  const keys = e => {
    const m = {ArrowLeft:'left', ArrowRight:'right', ArrowUp:'jump', ArrowDown:'slide', ' ':'kick'}[e.key];
    if (m) { e.preventDefault(); act(m); }
  };
  const vis = () => { if (document.hidden && R.state === 'run') R.paused = true; };
  window.addEventListener('keydown', keys); window.addEventListener('resize', resize); document.addEventListener('visibilitychange', vis);
  R.cleanup = () => { window.removeEventListener('keydown', keys); window.removeEventListener('resize', resize); document.removeEventListener('visibilitychange', vis); document.body.style.overflow = prevOverflow; };
  document.getElementById('rQuit').onclick = () => { stopGame(); viewRun(); };
  R.raf = requestAnimationFrame(runLoop);
}

// ---- dunia ----
function spawnRow(R){
  const z = R.nextRow, d = z;
  const lanes = shuffle([0,1,2]);
  // Peringkat kesukaran ikut jarak: awal sangat lapang, kemudian bertambah perlahan-lahan
  const two = d < 400 ? 0 : Math.min(0.4, 0.15 + (d-400)/2500);
  const n = Math.random() < two ? 2 : 1;
  const types = ['pad','bar','board','wall'];
  const w = d < 200 ? [0.45,0.2,0.35,0] : d < 400 ? [0.32,0.25,0.3,0.13] : [0.27,0.23,0.28,0.22];
  let walls = 0;
  for (let i = 0; i < n; i++) {
    let r = Math.random(), t = 0; while (r > w[t]) { r -= w[t]; t++; }
    let type = types[Math.min(t,3)];
    if (type === 'wall' && walls >= 1) type = 'pad';
    if (type === 'wall') walls++;
    R.objs.push({z, lane:lanes[i], type});
  }
  const free = lanes[n];
  if (Math.random() < 0.65) for (let k = 0; k < 3; k++) R.objs.push({z: z + 2 + k*2.2, lane:free, type:'star'});
  const gap = d < 200 ? 24 : d < 400 ? 19 : Math.max(12, 17 - (d-400)/250);
  R.nextRow += gap + Math.random()*6;
}
function tryKick(){
  const R = G, ln = Math.round(R.px);
  const b = R.objs.find(o => o.type === 'board' && !o.dead && o.lane === ln && o.z - R.dist > 0.2 && o.z - R.dist < 7);
  if (b) { b.dead = true; R.boards++; R.fx.push({z:b.z, lane:b.lane, t:0}); R.pops.push({t:0, txt:'PECAH! +50', c:'#f5c400'}); buzz(30); }
}
function hit(R, txt){
  if (R.inv > 0) return;
  R.lives--; R.inv = 1.6; buzz([80,40,80]);
  R.pops.push({t:0, txt, c:'#ff6b6f'});
  const h = document.getElementById('rHearts');
  if (h) { h.innerHTML = '♥'.repeat(R.lives) + `<span class="off">${'♥'.repeat(3-R.lives)}</span>`; h.setAttribute('aria-label', R.lives+' nyawa'); }
  if (R.lives <= 0) { R.state = 'over'; later(runFinish, 900); }
}
function runLoop(now){
  const R = G; if (!R || R.kind !== 'run') return;
  const dt = R.lastT ? Math.min(0.05, (now - R.lastT)/1000) : 0; R.lastT = now;
  if (R.state === 'count') { R.countT -= dt; if (R.countT <= 0) R.state = 'run'; }
  else if (R.state === 'run' && !R.paused) {
    R.t += dt;
    R.speed = Math.min(30, 12 + R.t*0.2);
    R.dist += R.speed*dt;
    while (R.nextRow - R.dist < 85) spawnRow(R);
    R.px += (R.lane - R.px) * Math.min(1, dt*16);
    if (R.jumpT >= 0) { R.jumpT += dt; if (R.jumpT > 0.62) R.jumpT = -1; }
    if (R.slideT >= 0) { R.slideT += dt; if (R.slideT > 0.62) R.slideT = -1; }
    if (R.kickT >= 0) { R.kickT += dt; if (R.kickT > 0.3) R.kickT = -1; }
    if (R.inv > 0) R.inv -= dt;
    const ln = Math.round(R.px), jy = R.jumpT >= 0 ? Math.sin(Math.PI*R.jumpT/0.62) : 0;
    for (const o of R.objs) {
      if (o.dead) continue;
      const rz = o.z - R.dist;
      if (rz < -0.4 || rz > 0.5 || o.lane !== ln) continue;
      if (o.type === 'star') { o.dead = true; R.stars++; continue; }
      if (o.type === 'pad' && jy > 0.35) continue;
      if (o.type === 'bar' && R.slideT >= 0) continue;
      o.dead = true;
      hit(R, o.type === 'pad' ? 'Lompat!' : o.type === 'bar' ? 'Gelongsor!' : o.type === 'board' ? 'Tendang papan!' : 'Tukar lorong!');
    }
    R.objs = R.objs.filter(o => o.z - R.dist > -3);
    R.hudT -= dt;
    if (R.hudT <= 0) {
      R.hudT = 0.1;
      document.getElementById('rM').textContent = fmt(R.dist) + ' m';
      document.getElementById('rS').textContent = R.stars;
      document.getElementById('rB').textContent = R.boards;
    }
  }
  R.fx.forEach(f => f.t += dt); R.fx = R.fx.filter(f => f.t < 0.7);
  R.pops.forEach(p => p.t += dt); R.pops = R.pops.filter(p => p.t < 0.9);
  drawRun(R);
  R.raf = requestAnimationFrame(runLoop);
}

// ---- lukisan ----
function drawRun(R){
  const {ctx, W, H} = R, hy = H*0.30, gy = H*0.88, D = 8, LW = W*0.27;
  const S = z => D/(D+Math.max(z,-5.5)), Y = z => hy + (gy-hy)*S(z), X = (l, z) => W/2 + (l-1)*LW*S(z);
  // langit + gunung
  let g = ctx.createLinearGradient(0,0,0,hy); g.addColorStop(0,'#5fb8f0'); g.addColorStop(1,'#d8f0ff');
  ctx.fillStyle = g; ctx.fillRect(0,0,W,hy+1);
  // matahari
  ctx.fillStyle = 'rgba(255,214,51,.35)'; ctx.beginPath(); ctx.arc(W*0.8, hy*0.36, H*0.055, 0, Math.PI*2); ctx.fill();
  ctx.fillStyle = '#ffd633'; ctx.beginPath(); ctx.arc(W*0.8, hy*0.36, H*0.035, 0, Math.PI*2); ctx.fill();
  // awan bergerak perlahan
  ctx.fillStyle = 'rgba(255,255,255,.92)';
  for (let i = 0; i < 3; i++) {
    const cx = ((i*W*0.42 + R.dist*0.6) % (W*1.4)) - W*0.2, cy = hy*(0.22 + i*0.18), r = H*0.022;
    ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI*2); ctx.arc(cx + r*1.2, cy - r*0.5, r*1.25, 0, Math.PI*2); ctx.arc(cx + r*2.5, cy, r, 0, Math.PI*2); ctx.fill();
  }
  // bukit
  ctx.fillStyle = '#a8dba0'; ctx.beginPath(); ctx.moveTo(0,hy);
  for (let i = 0; i <= 8; i++) ctx.lineTo(i*W/8, hy - (i%2 ? H*0.06 : H*0.025) - Math.sin(i*1.7)*H*0.012);
  ctx.lineTo(W,hy); ctx.fill();
  ctx.fillStyle = '#86c97c'; ctx.beginPath(); ctx.moveTo(0,hy);
  for (let i = 0; i <= 6; i++) ctx.lineTo(i*W/6, hy - (i%2 ? H*0.03 : H*0.012));
  ctx.lineTo(W,hy); ctx.fill();
  // rumput
  ctx.fillStyle = '#7cc46e'; ctx.fillRect(0,hy,W,H-hy);
  const zf = 90, zb = -5;
  const quad = (l1,l2,z1,z2,col) => { ctx.fillStyle = col; ctx.beginPath(); ctx.moveTo(X(l1,z1),Y(z1)); ctx.lineTo(X(l2,z1),Y(z1)); ctx.lineTo(X(l2,z2),Y(z2)); ctx.lineTo(X(l1,z2),Y(z2)); ctx.closePath(); ctx.fill(); };
  quad(-0.62, 2.62, zf, zb, '#8a8a93');
  quad(-0.62, -0.5, zf, zb, '#f5c400'); quad(2.5, 2.62, zf, zb, '#f5c400');
  // garis lorong bergerak
  const off = R.dist % 4;
  for (let k = 0; k < 24; k++) {
    const z1 = k*4 - off; if (z1 > zf) break;
    const z2 = z1 + 1.8;
    quad(0.47, 0.53, z2, Math.max(z1,zb), 'rgba(255,255,255,.85)');
    quad(1.47, 1.53, z2, Math.max(z1,zb), 'rgba(255,255,255,.85)');
  }
  // tiang lampu tepi (rasa kelajuan)
  const lo = R.dist % 8;
  const items = [];
  for (let k = 0; k < 12; k++) { const z = k*8 - lo; if (z > zf || z < -2) continue; items.push({z, kind:'lamp', side:-1}); items.push({z, kind:'lamp', side:1}); }
  R.objs.forEach(o => { if (!o.dead) items.push({z:o.z - R.dist, kind:o.type, lane:o.lane}); });
  R.fx.forEach(f => items.push({z:f.z - R.dist, kind:'fx', lane:f.lane, t:f.t}));
  items.sort((a,b) => b.z - a.z);
  for (const it of items) { if (it.z < 0.6) continue; drawItem(R, it, X, Y, S, LW); }
  drawPlayer(R, W/2 + (R.px-1)*LW, gy, LW);
  for (const it of items) { if (it.z >= 0.6) continue; drawItem(R, it, X, Y, S, LW); }
  // pop teks
  ctx.textAlign = 'center';
  R.pops.forEach(p => { ctx.globalAlpha = Math.max(0, 1 - p.t/0.9); ctx.font = `900 ${Math.round(W*0.075)}px Geist, sans-serif`; ctx.lineWidth = 5; ctx.strokeStyle = '#0a0a0a'; ctx.strokeText(p.txt, W/2, H*0.42 - p.t*40); ctx.fillStyle = p.c; ctx.fillText(p.txt, W/2, H*0.42 - p.t*40); });
  ctx.globalAlpha = 1;
  if (R.state === 'count') {
    ctx.fillStyle = 'rgba(255,255,255,.55)'; ctx.fillRect(0,0,W,H);
    ctx.font = `900 ${Math.round(W*0.28)}px Geist, sans-serif`; ctx.lineWidth = 8; ctx.strokeStyle = '#0a0a0a';
    const ct = Math.ceil(R.countT) > 0 ? String(Math.ceil(R.countT)) : 'LARI!';
    ctx.strokeText(ct, W/2, H*0.52); ctx.fillStyle = '#f5c400'; ctx.fillText(ct, W/2, H*0.52);
    ctx.fillStyle = '#0a0a0a'; ctx.font = `600 ${Math.round(W*0.042)}px Geist, sans-serif`; ctx.fillText('Leret untuk bergerak · ketik untuk tendang', W/2, H*0.64);
  }
  if (R.paused) {
    ctx.fillStyle = 'rgba(255,255,255,.75)'; ctx.fillRect(0,0,W,H);
    ctx.fillStyle = '#0a0a0a'; ctx.font = `700 ${Math.round(W*0.06)}px Geist, sans-serif`; ctx.fillText('Rehat. Ketik untuk sambung', W/2, H/2);
  }
}
function drawItem(R, it, X, Y, S, LW){
  const ctx = R.ctx, s = S(it.z), u = LW*s;
  if (it.kind === 'lamp') {
    const x = R.W/2 + it.side*2.05*LW*s, y = Y(it.z);
    ctx.fillStyle = '#8a5a2b'; ctx.fillRect(x - u*0.05, y - u*0.7, u*0.1, u*0.7);
    ctx.fillStyle = '#2f9e44'; ctx.beginPath(); ctx.arc(x, y - u*0.95, u*0.34, 0, Math.PI*2); ctx.fill();
    ctx.fillStyle = '#40b357'; ctx.beginPath(); ctx.arc(x - u*0.09, y - u*1.05, u*0.2, 0, Math.PI*2); ctx.fill();
    return;
  }
  const x = X(it.lane, it.z), y = Y(it.z);
  if (it.kind === 'star') {
    const r = u*0.16, cy = y - u*0.45 - Math.sin(R.dist*0.5 + it.z)*u*0.04;
    ctx.fillStyle = '#f5c400'; ctx.beginPath();
    for (let i = 0; i < 10; i++) { const a = -Math.PI/2 + i*Math.PI/5, rr = i%2 ? r*0.45 : r; ctx.lineTo(x + Math.cos(a)*rr, cy + Math.sin(a)*rr); }
    ctx.closePath(); ctx.fill(); return;
  }
  if (it.kind === 'pad') {
    const w = u*0.72, h = u*0.3;
    ctx.fillStyle = '#12318f'; ctx.fillRect(x - w/2, y - h, w, h);
    ctx.fillStyle = '#1d4ed8'; ctx.fillRect(x - w/2, y - h, w, h*0.4);
    ctx.fillStyle = 'rgba(255,255,255,.85)'; ctx.font = `700 ${Math.max(8,u*0.1)}px Geist, sans-serif`; ctx.textAlign = 'center'; ctx.fillText('▲', x, y - h*0.25);
    return;
  }
  if (it.kind === 'bar') {
    const w = u*0.86, top = y - u*0.95, bh = u*0.17;
    ctx.fillStyle = '#6b6b70'; ctx.fillRect(x - w/2, top, u*0.06, u*0.95); ctx.fillRect(x + w/2 - u*0.06, top, u*0.06, u*0.95);
    const n = 6; for (let i = 0; i < n; i++) { ctx.fillStyle = i%2 ? '#0a0a0a' : '#c1121f'; ctx.fillRect(x - w/2 + i*w/n, top + u*0.12, w/n + 0.5, bh); }
    return;
  }
  if (it.kind === 'board') {
    const w = u*0.66, h = u*0.42, by = y - u*0.24;
    ctx.fillStyle = '#3a3a40'; ctx.fillRect(x - w/2, y - u*0.24, u*0.12, u*0.24); ctx.fillRect(x + w/2 - u*0.12, y - u*0.24, u*0.12, u*0.24);
    ctx.fillStyle = '#c48a4c'; ctx.fillRect(x - w/2, by - h, w, h);
    ctx.fillStyle = '#e4b77d'; ctx.fillRect(x - w/2, by - h, w, h*0.25);
    ctx.strokeStyle = 'rgba(0,0,0,.18)'; ctx.lineWidth = Math.max(1,u*0.01);
    for (let i = 1; i < 4; i++) { ctx.beginPath(); ctx.moveTo(x - w/2, by - h + i*h/4); ctx.lineTo(x + w/2, by - h + i*h/4); ctx.stroke(); }
    return;
  }
  if (it.kind === 'wall') {
    const w = u*0.6, h = u*1.45;
    ctx.fillStyle = '#0a0a0a'; ctx.fillRect(x - w/2, y - h, w, h);
    ctx.save(); ctx.beginPath(); ctx.rect(x - w/2, y - h, w, h); ctx.clip();
    ctx.strokeStyle = '#f5c400'; ctx.lineWidth = u*0.09;
    for (let i = -3; i < 8; i++) { ctx.beginPath(); ctx.moveTo(x - w/2 + i*u*0.22, y); ctx.lineTo(x - w/2 + i*u*0.22 + h, y - h); ctx.stroke(); }
    ctx.restore(); return;
  }
  if (it.kind === 'fx') {
    const p = it.t/0.7, w = u*0.33, h = u*0.42, by = y - u*0.24 - h;
    ctx.globalAlpha = 1 - p; ctx.fillStyle = '#c48a4c';
    [-1,1].forEach(sd => { ctx.save(); ctx.translate(x + sd*(w/2 + p*u*0.6), by + h/2 - p*u*0.3 + p*p*u*1.2); ctx.rotate(sd*p*1.4); ctx.fillRect(-w/2, -h/2, w, h); ctx.restore(); });
    ctx.globalAlpha = 1;
  }
}
function drawPlayer(R, x, gy, LW){
  const ctx = R.ctx, u = LW*0.95;
  if (R.inv > 0 && Math.floor(R.inv*10) % 2 === 0) return; // berkelip selepas dilanggar
  const jy = R.jumpT >= 0 ? Math.sin(Math.PI*R.jumpT/0.62)*u*0.95 : 0;
  const sliding = R.slideT >= 0, kicking = R.kickT >= 0;
  const ph = R.dist*0.9, sw = (R.state === 'run' && !R.paused && jy === 0 && !sliding) ? Math.sin(ph) : 0;
  // bayang
  ctx.fillStyle = 'rgba(0,0,0,.25)'; ctx.beginPath(); ctx.ellipse(x, gy, u*0.24*(1 - jy/(u*2)), u*0.06, 0, 0, Math.PI*2); ctx.fill();
  const base = gy - jy;
  const legH = sliding ? u*0.18 : u*0.36, torsoH = sliding ? u*0.24 : u*0.34, tw = u*0.3;
  const hip = base - legH;
  ctx.lineCap = 'round';
  // kaki
  ctx.strokeStyle = '#f2f2f2'; ctx.lineWidth = u*0.1;
  if (kicking) {
    ctx.beginPath(); ctx.moveTo(x - tw*0.22, hip); ctx.lineTo(x - tw*0.25, base); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(x + tw*0.22, hip); ctx.lineTo(x + tw*0.5, hip - u*0.32); ctx.stroke();
    ctx.fillStyle = '#e8b98a'; ctx.beginPath(); ctx.arc(x + tw*0.5, hip - u*0.34, u*0.05, 0, Math.PI*2); ctx.fill();
  } else {
    ctx.beginPath(); ctx.moveTo(x - tw*0.22, hip); ctx.lineTo(x - tw*0.22 + sw*u*0.05, base - Math.max(0, sw)*u*0.12); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(x + tw*0.22, hip); ctx.lineTo(x + tw*0.22 - sw*u*0.05, base - Math.max(0, -sw)*u*0.12); ctx.stroke();
  }
  // badan (dobok putih)
  const top = hip - torsoH;
  ctx.fillStyle = '#ffffff'; ctx.beginPath(); ctx.roundRect ? ctx.roundRect(x - tw/2, top, tw, torsoH + u*0.04, u*0.06) : ctx.rect(x - tw/2, top, tw, torsoH + u*0.04); ctx.fill();
  ctx.fillStyle = 'rgba(0,0,0,.08)'; ctx.fillRect(x - u*0.01, top, u*0.02, torsoH);
  // tali pinggang (ikut profil)
  ctx.fillStyle = R.beltCol; ctx.fillRect(x - tw/2, hip - u*0.06, tw, u*0.07);
  if (R.beltCol === '#ffffff') { ctx.strokeStyle = 'rgba(0,0,0,.35)'; ctx.lineWidth = 1; ctx.strokeRect(x - tw/2, hip - u*0.06, tw, u*0.07); }
  ctx.fillRect(x - u*0.02, hip - u*0.02, u*0.04, u*0.1);
  // tangan
  ctx.strokeStyle = '#f2f2f2'; ctx.lineWidth = u*0.08;
  const aw = sliding ? -0.2 : -sw*0.5;
  ctx.beginPath(); ctx.moveTo(x - tw/2, top + u*0.05); ctx.lineTo(x - tw/2 - u*0.08, top + u*0.2 + aw*u*0.1); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(x + tw/2, top + u*0.05); ctx.lineTo(x + tw/2 + u*0.08, top + u*0.2 - aw*u*0.1); ctx.stroke();
  // kepala (dilihat dari belakang: rambut)
  ctx.fillStyle = '#e8b98a'; ctx.beginPath(); ctx.arc(x, top - u*0.11, u*0.12, 0, Math.PI*2); ctx.fill();
  ctx.fillStyle = '#1a1a1a'; ctx.beginPath(); ctx.arc(x, top - u*0.13, u*0.115, 0, Math.PI*2); ctx.fill();
}
function runFinish(){
  const R = G; if (!R || R.kind !== 'run') return;
  stopGame();
  const m = Math.round(R.dist), score = m + R.stars*10 + R.boards*50;
  const r = S.run, isNew = m > r.best;
  if (isNew) r.best = m;
  if (R.stars > r.bestStars) r.bestStars = R.stars;
  r.plays++; r.totalM += m;
  const xpGain = Math.round(score/12);
  const rankBefore = rankInfo(S.xp).cur.nm;
  S.xp += xpGain; S.rounds++; S.last = 'run';
  const dk = dkey(new Date()); S.days[dk] = (S.days[dk]||0) + xpGain;
  const rankAfter = rankInfo(S.xp).cur.nm;
  const _rd = {game:'run', m, boards:R.boards};
  const newDaily = dailyCheck(_rd);
  const newBadges = BADGES.filter(b => !S.badges[b.id] && b.test(S, _rd));
  newBadges.forEach(b => S.badges[b.id] = Date.now());
  save();
  app.innerHTML = header() + `<main>
    <div class="res">
      <span class="pill ${isNew?'ok':'dark-p'}">${isNew ? 'Rekod baru!' : 'Larian tamat'}</span>
      <h1 style="font-size:28px;font-weight:700;letter-spacing:-.025em;margin-top:6px">Dojang Run</h1>
      <div class="big">${fmt(m)}<span style="font-size:32px;color:var(--muted)"> m</span></div>
      <span class="label">${fmt(score)} markah · rekod ${fmt(r.best)} m</span>
      <span class="pill y" style="margin-top:8px">+${xpGain} XP${rankAfter!==rankBefore ? ' · Pangkat '+rankAfter+'!' : ''}</span>
    </div>
    ${dailyBanner(newDaily)}${newBadges.length ? `<div class="card" style="padding:14px;display:flex;flex-direction:column;gap:10px;align-items:center"><span class="label">Lencana baru</span><div class="newb">${newBadges.map(b=>`<span class="pill y">${ic('star','#0a0a0a',14)}${b.nm}</span>`).join('')}</div></div>` : ''}
    <div class="grid2" style="gap:8px">
      <div class="st"><span class="label">Bintang</span><div class="v">${R.stars}</div></div>
      <div class="st"><span class="label">Papan pecah</span><div class="v">${R.boards}</div></div>
    </div>
    <div class="tip">${R.boards < 2 ? 'Petua: ketik skrin bila papan kayu hampir, untuk menendang dan dapat bonus +50.' : 'Hebat! Semakin jauh, semakin laju. Kekal fokus pada lorong di hadapan.'}</div>
    <div style="display:flex;flex-direction:column;gap:8px">
      <button class="btn p full" id="rAgain">Lari lagi</button>
      <a class="btn g full" href="#game">Senarai game</a>
    </div>
  </main>`;
  document.getElementById('rAgain').onclick = startRun;
  window.scrollTo(0,0);
}


