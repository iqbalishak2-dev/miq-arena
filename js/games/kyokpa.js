// MIQ Arena — game: kyokpa
// ================= Kyokpa: butiran =================
let kSel = null;
function viewKyokpa(){
  const k = S.kyok;
  if (kSel === null || kSel > k.unlocked) kSel = Math.min(k.unlocked, KLEVELS.length-1);
  const rows = KLEVELS.map((L,i) => {
    const locked = i > k.unlocked, b = k.best[L.id], passed = i < k.unlocked || (i===KLEVELS.length-1 && k.passedTop);
    const sub = b ? `Rekod ${fmt(b.score)} · ${b.broken}/${L.sets} pecah` : L.desc;
    const right = locked ? `<span role="img" aria-label="Berkunci">${ic('lock','#6b6b70',16)}</span>`
      : passed ? '<span class="pill ok">Lulus</span>' : (i===kSel ? '<span class="pill dark-p">Dipilih</span>' : '');
    return `<button class="lvl ${i===kSel?'sel':''} ${locked?'lock':''}" data-lvl="${i}" ${locked?'aria-disabled="true"':''}>
      <span class="belt" style="background:${L.col}"></span><span class="nm"><b>${L.nm}</b><span>${sub}</span></span>${right}</button>`;
  }).join('');
  const L = KLEVELS[kSel], b = k.best[L.id];
  app.innerHTML = `<section class="hero">
      <div class="stripe"></div>
      <a class="back" href="#game" aria-label="Kembali ke senarai game">${ic('back','#fff',18)}</a>
      <div style="display:flex;flex-direction:column;gap:8px">
        <span class="ic" style="width:48px;height:48px;background:linear-gradient(180deg,var(--y1),var(--y));box-shadow:var(--glow)">${ic('target','#0a0a0a',24)}</span>
        <h1 style="font-size:30px;line-height:36px;font-weight:700;letter-spacing:-.025em">Kyokpa Timing</h1>
        <p style="margin:0;line-height:20px;color:rgba(255,255,255,.75);max-width:320px">Tekan skrin bila jarum berada dalam zon kuning. Tepat di tengah = Sempurna, dan papan pecah!</p>
      </div>
      <div class="rules">
        <div><span class="dot" style="background:var(--y)"></span><span><b>Zon kuning</b>Tekan di sini</span></div>
        <div><span class="dot" style="background:#fff;width:8px;border-radius:3px"></span><span><b>Jarum putih</b>Bergerak kiri-kanan</span></div>
      </div>
    </section>
    <main>${whyBox('kyokpa')}
      <div class="tiles">
        <div class="st"><span class="label">Rekod ${L.nm}</span><div class="v">${b ? fmt(b.score) : '–'}</div></div>
        <div class="st"><span class="label">Pecah</span><div class="v">${b ? b.broken+'<small>/'+L.sets+'</small>' : '–'}</div></div>
        <div class="st"><span class="label">Dimain</span><div class="v">${k.plays}×</div></div>
      </div>
      <section style="display:flex;flex-direction:column;gap:10px">
        <h2 style="font-size:18px;font-weight:700">Pilih tahap</h2>
        ${rows}
      </section>
      <div style="display:flex;flex-direction:column;gap:6px">
        <button class="btn p full" id="kStart" style="font-size:16px;padding:16px">${ic('play','#0a0a0a',16)}Mula tahap ${L.nm}</button>
        <p class="muted" style="margin:0;text-align:center;font-size:12px">${L.sets} set${L.hits>1?' × '+L.hits+' papan':' papan'} · lulus jika ${KPASS} set pecah</p>
      </div>
    </main>` + nav('game');
  app.querySelectorAll('.lvl').forEach(bt => bt.onclick = () => { const i = +bt.dataset.lvl; if (i > S.kyok.unlocked) return; kSel = i; viewKyokpa(); });
  document.getElementById('kStart').onclick = () => startKyokpa(kSel);
  window.scrollTo(0,0);
}


// ================= Kyokpa: permainan =================
function startKyokpa(i){
  const L = KLEVELS[i];
  G = {kind:'kyokpa', li:i, L, set:0, hit:0, score:0, combo:0, broken:0, perfect:0, good:0, miss:0, results:[], phase:'idle', raf:0};
  app.innerHTML = `<section class="kplay">
    <div class="hud">
      <div><div class="k">Markah</div><div class="v" id="kScore">0</div></div>
      <div style="text-align:center"><div class="k">${L.nm}</div><div class="v" id="kSet">1/${L.sets}</div></div>
      <div style="text-align:right"><div class="k">Kombo</div><div class="v" id="kCombo">0</div></div>
    </div>
    <div id="karena" role="button" aria-label="Tekan untuk memecah papan">
      <div class="sets" id="kSets">${Array.from({length:L.sets},(_,j)=>`<b class="${j===0?'cur':''}"></b>`).join('')}</div>
      <div class="stage"><div class="kmsg" id="kMsg"></div><div class="stack" id="kStack"></div><div class="blocks"><span></span><span></span></div></div>
      <div style="display:flex;flex-direction:column;gap:10px">
        <div class="meter"><div class="zone" id="kZone"></div><div class="perf" id="kPerf"></div><div class="needle" id="kNeedle"></div></div>
        <div class="khint" id="kHint">Tekan di mana-mana bila jarum dalam zon kuning</div>
      </div>
      <div id="count" style="border-radius:18px"></div>
    </div>
    <button class="quit" id="kQuit">✕ Berhenti</button>
  </section>`;
  G.el = {stack:document.getElementById('kStack'), zone:document.getElementById('kZone'), perf:document.getElementById('kPerf'), needle:document.getElementById('kNeedle'), msg:document.getElementById('kMsg')};
  document.getElementById('karena').addEventListener('pointerdown', kTap, {passive:false});
  document.getElementById('kQuit').onclick = () => { stopGame(); viewKyokpa(); };
  window.scrollTo(0,0);
  buildStack(); placeZone();
  const c = document.getElementById('count'); let n = 3;
  const tick = () => {
    if (!G) return;
    if (n > 0) { c.innerHTML = `<div>${n}<small>Fokus pada jarum</small></div>`; n--; later(tick, 700); }
    else { c.innerHTML = '<div>MULA!</div>'; later(() => { c.style.display = 'none'; aim(); }, 450); }
  };
  tick();
}
function buildStack(){
  G.el.stack.innerHTML = Array.from({length:G.L.hits}, () => '<div class="board"><i></i><i></i></div>').join('');
  G.boards = [...G.el.stack.querySelectorAll('.board')].reverse(); // papan atas dipecah dahulu
}
function placeZone(){
  const w = G.L.zone; G.zl = 6 + Math.random()*(88 - w); G.zc = G.zl + w/2;
  G.el.zone.style.left = G.zl+'%'; G.el.zone.style.width = w+'%'; G.el.perf.style.left = G.zc+'%';
}
function aim(){
  if (!G) return;
  G.phase = 'aim'; G.t0 = performance.now(); G.ph = Math.random();
  const loop = now => {
    if (!G || G.phase !== 'aim') return;
    G.p = tri((now - G.t0)/1000*G.L.speed + G.ph) * 100;
    G.el.needle.style.left = G.p + '%';
    G.raf = requestAnimationFrame(loop);
  };
  G.raf = requestAnimationFrame(loop);
}
function kHud(){
  document.getElementById('kScore').textContent = fmt(G.score);
  document.getElementById('kSet').textContent = `${Math.min(G.set+1,G.L.sets)}/${G.L.sets}`;
  document.getElementById('kCombo').textContent = G.combo;
  const dots = document.querySelectorAll('#kSets b');
  dots.forEach((d,j) => d.className = (G.results[j]===true?'ok':G.results[j]===false?'no':'') + (j===G.set?' cur':''));
}
function kMsg(t, c){ const m = G.el.msg; m.textContent = t; m.className = 'kmsg on '+c; setTimeout(() => m.className = 'kmsg', 600); }
function kTap(e){
  if (!G || G.kind !== 'kyokpa') return;
  if (e.target.closest('#kQuit')) return;
  e.preventDefault();
  if (G.phase !== 'aim') return;
  G.phase = 'hold'; cancelAnimationFrame(G.raf);
  const p = tri((performance.now() - G.t0)/1000*G.L.speed + G.ph) * 100;
  G.el.needle.style.left = p + '%';
  const half = G.L.zone/2, d = Math.abs(p - G.zc);
  if (d <= half) {
    const perfect = d <= Math.max(1.6, half*0.25);
    G.combo++; perfect ? G.perfect++ : G.good++;
    G.score += Math.round((perfect ? 300 : 150) * (1 + Math.min(G.combo-1,10)*0.1));
    kMsg(perfect ? 'SEMPURNA!' : 'BAIK', perfect ? 'p' : 'g'); buzz(perfect ? 40 : 20);
    G.boards[G.hit].classList.add('broke');
    G.hit++;
    if (G.hit >= G.L.hits) { G.results[G.set] = true; G.broken++; kHud(); return later(nextSet, 750); }
    kHud(); placeZone(); return later(aim, 420);
  }
  G.combo = 0; G.miss++; G.results[G.set] = false;
  kHud();
  kMsg('TERLEPAS', 'b'); buzz([60,40,60]);
  G.el.stack.classList.add('shake'); setTimeout(() => G && G.el.stack.classList.remove('shake'), 400);
  later(nextSet, 850);
}
function nextSet(){
  if (!G) return;
  G.set++; G.hit = 0;
  if (G.set >= G.L.sets) { kHud(); return later(kFinish, 300); }
  kHud(); buildStack(); placeZone(); later(aim, 300);
}
function kFinish(){
  clearTimers();
  const g = G, L = g.L; G = null;
  const k = S.kyok, pass = g.broken >= KPASS;
  const prev = k.best[L.id], isNew = g.score > 0 && (!prev || g.score > prev.score);
  if (isNew) k.best[L.id] = {score:g.score, broken:g.broken, date:Date.now()};
  k.plays++;
  let unlockedNow = false;
  if (pass && g.li === k.unlocked && g.li < KLEVELS.length-1) { k.unlocked++; unlockedNow = true; }
  if (pass && g.li === KLEVELS.length-1) k.passedTop = true;
  const xpGain = Math.round(g.score/12) + (pass ? 50 : 0);
  const rankBefore = rankInfo(S.xp).cur.nm;
  S.xp += xpGain; S.rounds++; S.last = 'kyokpa';
  const dk = dkey(new Date()); S.days[dk] = (S.days[dk]||0) + xpGain;
  const rankAfter = rankInfo(S.xp).cur.nm;
  const round = {game:'kyokpa', li:g.li, broken:g.broken, sets:L.sets, perfect:g.perfect};
  const _rd = round;
  const newDaily = dailyCheck(_rd);
  const newBadges = BADGES.filter(b => !S.badges[b.id] && b.test(S, _rd));
  newBadges.forEach(b => S.badges[b.id] = Date.now());
  save();
  const tip = g.miss >= 4 ? 'Jangan kejar jarum. Tunggu jarum datang ke zon kuning, kemudian tekan: sama seperti menunggu jarak yang betul sebelum memecah papan.'
    : g.perfect < g.good ? 'Ramai "Baik", kurang "Sempurna". Sasarkan garis hitam di tengah zon kuning untuk markah berganda.'
    : 'Masa yang sangat tepat! Fokus dan ketenangan inilah kunci Kyokpa sebenar.';
  const hasNext = g.li < KLEVELS.length-1 && g.li+1 <= k.unlocked;
  app.innerHTML = header() + `<main>
    <div class="res">
      <span class="pill ${pass?'ok':''}" style="${pass?'':'background:#fff3d6;color:#8a4b00'}">${pass?'Lulus':'Belum lulus'}</span>
      <h1 style="font-size:28px;font-weight:700;letter-spacing:-.025em;margin-top:6px">Kyokpa · ${L.nm}</h1>
      <p class="muted" style="margin:0">${pass ? (unlockedNow ? `Tahap ${KLEVELS[g.li+1].nm} kini dibuka!` : 'Syabas! Cuba pecahkan rekod anda.') : `Syarat lulus: sekurang-kurangnya ${KPASS} daripada ${L.sets} set pecah`}</p>
      <div class="big">${fmt(g.score)}</div>
      <span class="label">Markah${isNew ? ' · <span style="color:var(--ok)">rekod baru</span>' : ''}</span>
      <span class="pill y" style="margin-top:8px">+${xpGain} XP${rankAfter!==rankBefore ? ' · Pangkat '+rankAfter+'!' : ''}</span>
    </div>
    ${dailyBanner(newDaily)}${lbBlock('kyokpa', L.id, g.score, g.broken+'/'+L.sets+' pecah')}${newBadges.length ? `<div class="card" style="padding:14px;display:flex;flex-direction:column;gap:10px;align-items:center"><span class="label">Lencana baru</span><div class="newb">${newBadges.map(b=>`<span class="pill y">${ic('star','#0a0a0a',14)}${b.nm}</span>`).join('')}</div></div>` : ''}
    <div class="grid2" style="gap:8px">
      <div class="st"><span class="label">Set pecah</span><div class="v">${g.broken}<small>/${L.sets}</small></div></div>
      <div class="st"><span class="label">Sempurna</span><div class="v">${g.perfect}</div></div>
      <div class="st"><span class="label">Baik</span><div class="v">${g.good}</div></div>
      <div class="st"><span class="label">Terlepas</span><div class="v">${g.miss}</div></div>
    </div>
    <div class="tip">${esc(tip)}</div>
    <div style="display:flex;flex-direction:column;gap:8px">
      <button class="btn p full" id="kAgain">Main lagi</button>
      ${hasNext ? '<button class="btn d full" id="kNext">Tahap seterusnya →</button>' : ''}
      <a class="btn g full" href="#game">Senarai game</a>
    </div>
  </main>`;
  document.getElementById('kAgain').onclick = () => startKyokpa(g.li);
  const nx = document.getElementById('kNext'); if (nx) nx.onclick = () => { kSel = g.li+1; startKyokpa(g.li+1); };
  window.scrollTo(0,0);
}


