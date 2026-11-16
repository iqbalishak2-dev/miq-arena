// MIQ Arena — game: sabum
// ================= Ikut Sabum =================
let sSel = null, actx = null;
function tone(hz, ms){
  try {
    if (!actx || S.settings.sound === false) return;
    const o = actx.createOscillator(), g = actx.createGain(), t = actx.currentTime;
    o.type = 'triangle'; o.frequency.value = hz;
    g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.25, t+0.02); g.gain.exponentialRampToValueAtTime(0.0001, t + ms/1000);
    o.connect(g).connect(actx.destination); o.start(t); o.stop(t + ms/1000 + 0.05);
  } catch(e){}
}
function viewSabum(){
  const m = S.sim;
  if (sSel === null || sSel > m.unlocked) sSel = Math.min(m.unlocked, SLEVELS.length-1);
  const rows = SLEVELS.map((L,i) => {
    const locked = i > m.unlocked, b = m.best[L.id], passed = i < m.unlocked || (i===SLEVELS.length-1 && m.passedTop);
    const sub = b ? `Terbaik ${b.len} langkah · sasaran ${L.target}` : `${L.desc} · sasaran ${L.target} langkah`;
    const right = locked ? `<span role="img" aria-label="Berkunci">${ic('lock','#6b6b70',16)}</span>`
      : passed ? '<span class="pill ok">Lulus</span>' : (i===sSel ? '<span class="pill dark-p">Dipilih</span>' : '');
    return `<button class="lvl ${i===sSel?'sel':''} ${locked?'lock':''}" data-lvl="${i}" ${locked?'aria-disabled="true"':''}>
      <span class="belt" style="background:${L.col};width:28px;height:28px;border-radius:8px;display:grid;place-items:center;color:${i===0?'#0a0a0a':'#fff'};font-weight:700;font-size:13px">${i+1}</span>
      <span class="nm"><b>${L.nm}</b><span>${sub}</span></span>${right}</button>`;
  }).join('');
  const L = SLEVELS[sSel];
  app.innerHTML = `<section class="hero">
      <div class="stripe"></div>
      <a class="back" href="#game" aria-label="Kembali ke senarai game">${ic('back','#fff',18)}</a>
      <div style="display:flex;flex-direction:column;gap:8px">
        <span class="ic" style="width:48px;height:48px;background:linear-gradient(180deg,var(--y1),var(--y));box-shadow:var(--glow)">${ic('repeat','#0a0a0a',24)}</span>
        <h1 style="font-size:30px;line-height:36px;font-weight:700;letter-spacing:-.025em">Ikut Sabum</h1>
        <p style="margin:0;line-height:20px;color:rgba(255,255,255,.75);max-width:320px">Tengok pad yang menyala, kemudian tekan ikut urutan yang sama. Setiap pusingan, urutan bertambah satu.</p>
      </div>
      <div class="rules">
        <div><span class="dot" style="background:var(--y)"></span><span><b>Tengok</b>Sabum tunjuk urutan</span></div>
        <div><span class="dot" style="background:#fff"></span><span><b>Ulang</b>Tekan ikut urutan</span></div>
      </div>
    </section>
    <main>
      <section style="display:flex;flex-direction:column;gap:10px">
        <h2 style="font-size:18px;font-weight:700">Pilih tahap</h2>
        ${rows}
      </section>
      <div style="display:flex;flex-direction:column;gap:6px">
        <button class="btn p full" id="sStart" style="font-size:16px;padding:16px">${ic('play','#0a0a0a',16)}Mula tahap ${L.nm}</button>
        <p class="muted" style="margin:0;text-align:center;font-size:12px">Lulus jika anda capai ${L.target} langkah · ada bunyi, kuatkan suara telefon</p>
      </div>
    </main>` + nav('game');
  app.querySelectorAll('.lvl').forEach(bt => bt.onclick = () => { const i = +bt.dataset.lvl; if (i > S.sim.unlocked) return; sSel = i; viewSabum(); });
  document.getElementById('sStart').onclick = () => {
    try { actx = actx || new (window.AudioContext || window.webkitAudioContext)(); actx.resume && actx.resume(); } catch(e) { actx = null; }
    startSabum(sSel);
  };
  window.scrollTo(0,0);
}
function startSabum(li){
  const L = SLEVELS[li];
  G = {kind:'sabum', li, L, seq:[], pos:0, phase:'idle', score:0};
  const pads = S_PADS.slice(0, L.pads);
  app.innerHTML = `<section class="splay">
    <div class="hud" style="padding-bottom:0">
      <div><div class="k">Markah</div><div class="v" id="sScore">0</div></div>
      <div style="text-align:center"><div class="k">${L.nm}</div><div class="v" id="sLen">0</div></div>
      <div style="text-align:right"><div class="k">Sasaran</div><div class="v">${L.target}</div></div>
    </div>
    <div class="sstat" id="sStat" aria-live="polite">Sedia…</div>
    <div class="spads wait" id="sPads" style="grid-template-rows:repeat(${L.pads/2},minmax(0,1fr))">
      ${pads.map((p,i)=>`<button class="spad" data-p="${i}" style="background:${p.bg};box-shadow:0 0 0 0 ${p.bg}" aria-label="Pad ${i+1}">${ic(p.icon,p.fg,44)}</button>`).join('')}
    </div>
    <button class="quit" id="sQuit">✕ Berhenti</button>
  </section>`;
  G.pads = [...app.querySelectorAll('.spad')];
  G.pads.forEach(b => b.addEventListener('pointerdown', e => { e.preventDefault(); sPress(+b.dataset.p); }));
  document.getElementById('sQuit').onclick = () => { stopGame(); viewSabum(); };
  window.scrollTo(0,0);
  later(sRound, 700);
}
function sLight(i, ms){
  const b = G.pads[i], p = S_PADS[i];
  b.classList.add('lit'); b.style.boxShadow = `0 0 36px 4px ${p.bg}`;
  tone(p.hz, ms);
  setTimeout(() => { b.classList.remove('lit'); b.style.boxShadow = `0 0 0 0 ${p.bg}`; }, ms);
}
function sStat(t, c){ const el = document.getElementById('sStat'); if (el) { el.textContent = t; el.className = 'sstat ' + (c||''); } }
function sRound(){
  if (!G || G.kind !== 'sabum') return;
  const L = G.L;
  let n; do { n = Math.floor(Math.random()*L.pads); } while (G.seq.length >= 2 && n === G.seq[G.seq.length-1] && n === G.seq[G.seq.length-2]);
  G.seq.push(n); G.pos = 0; G.phase = 'show';
  document.getElementById('sPads').classList.add('wait');
  sStat('Tengok Sabum…');
  const on = Math.max(Math.round(L.on*0.6), L.on - (G.seq.length-1)*15), gap = L.gap;
  G.seq.forEach((p, k) => later(() => G && sLight(p, on), 400 + k*(on+gap)));
  later(() => { if (!G) return; G.phase = 'input'; document.getElementById('sPads').classList.remove('wait'); sStat('Giliran anda!', 'you'); }, 400 + G.seq.length*(on+gap));
}
function sPress(i){
  if (!G || G.kind !== 'sabum' || G.phase !== 'input') return;
  sLight(i, 220);
  if (i !== G.seq[G.pos]) {
    G.phase = 'over'; buzz([80,50,80]); tone(110, 500);
    sStat('Salah urutan!', 'bad');
    later(() => G && sLight(G.seq[G.pos], 500), 450);
    return later(sFinish, 1300);
  }
  G.pos++;
  if (G.pos >= G.seq.length) {
    G.phase = 'show';
    G.score += G.seq.length * 100;
    document.getElementById('sScore').textContent = fmt(G.score);
    document.getElementById('sLen').textContent = G.seq.length;
    buzz(25); sStat(G.seq.length === G.L.target ? `Sasaran ${G.L.target} tercapai! Teruskan…` : 'Betul!', 'good');
    later(sRound, 900);
  }
}
function sFinish(){
  clearTimers();
  const g = G, L = g.L; G = null;
  const len = g.seq.length - 1; // urutan terakhir yang berjaya
  const pass = len >= L.target;
  const m = S.sim, prev = m.best[L.id], isNew = len > 0 && (!prev || len > prev.len);
  if (isNew) m.best[L.id] = {len, score:g.score, date:Date.now()};
  m.plays++;
  let unlockedNow = false;
  if (pass && g.li === m.unlocked && g.li < SLEVELS.length-1) { m.unlocked++; unlockedNow = true; }
  if (pass && g.li === SLEVELS.length-1) m.passedTop = true;
  const xpGain = len*15 + (pass ? 40 : 0);
  const rankBefore = rankInfo(S.xp).cur.nm;
  S.xp += xpGain; S.rounds++; S.last = 'sabum';
  const dk = dkey(new Date()); S.days[dk] = (S.days[dk]||0) + xpGain;
  const rankAfter = rankInfo(S.xp).cur.nm;
  const _rd = {game:'sabum', len};
  const newDaily = dailyCheck(_rd);
  const newBadges = BADGES.filter(b => !S.badges[b.id] && b.test(S, _rd));
  newBadges.forEach(b => S.badges[b.id] = Date.now());
  save();
  const hasNext = g.li < SLEVELS.length-1 && g.li+1 <= m.unlocked;
  app.innerHTML = header() + `<main>
    <div class="res">
      <span class="pill ${pass?'ok':''}" style="${pass?'':'background:#fff3d6;color:#8a4b00'}">${pass?'Lulus':'Belum lulus'}</span>
      <h1 style="font-size:28px;font-weight:700;letter-spacing:-.025em;margin-top:6px">Ikut Sabum · ${L.nm}</h1>
      <p class="muted" style="margin:0">${pass ? (unlockedNow ? `Tahap ${SLEVELS[g.li+1].nm} kini dibuka!` : 'Syabas! Cuba urutan yang lebih panjang.') : `Capai ${L.target} langkah untuk lulus.`}</p>
      <div class="big">${len}<span style="font-size:28px;color:var(--muted)"> langkah</span></div>
      <span class="label">${fmt(g.score)} markah${isNew ? ' · <span style="color:var(--ok)">rekod baru</span>' : ''}</span>
      <span class="pill y" style="margin-top:8px">+${xpGain} XP${rankAfter!==rankBefore ? ' · Pangkat '+rankAfter+'!' : ''}</span>
    </div>
    ${dailyBanner(newDaily)}${lbBlock('sabum', L.id, g.score, len+' langkah')}${newBadges.length ? `<div class="card" style="padding:14px;display:flex;flex-direction:column;gap:10px;align-items:center"><span class="label">Lencana baru</span><div class="newb">${newBadges.map(b=>`<span class="pill y">${ic('star','#0a0a0a',14)}${b.nm}</span>`).join('')}</div></div>` : ''}
    <div class="tip">${len >= 8 ? 'Tumpuan yang hebat! Sama seperti mengingat urutan gerakan dalam Tul.' : 'Petua: sebut warna atau gambar pad dengan perlahan semasa Sabum menunjukkan urutan.'}</div>
    <div style="display:flex;flex-direction:column;gap:8px">
      <button class="btn p full" id="sAgain">Main lagi</button>
      ${hasNext ? '<button class="btn d full" id="sNx">Tahap seterusnya →</button>' : ''}
      <a class="btn g full" href="#game">Senarai game</a>
    </div>
  </main>`;
  document.getElementById('sAgain').onclick = () => startSabum(g.li);
  const nx = document.getElementById('sNx'); if (nx) nx.onclick = () => { sSel = g.li+1; startSabum(g.li+1); };
  window.scrollTo(0,0);
}


