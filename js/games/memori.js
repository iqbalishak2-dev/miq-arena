// MIQ Arena — game: memori
// ================= Memori Padan =================
let mSel = null;
function viewMemori(){
  const m = S.memo;
  if (mSel === null || mSel > m.unlocked) mSel = Math.min(m.unlocked, MLEVELS.length-1);
  const rows = MLEVELS.map((L,i) => {
    const locked = i > m.unlocked, b = m.best[L.id], passed = i < m.unlocked || (i===MLEVELS.length-1 && m.passedTop);
    const sub = b ? `Terbaik ${'★'.repeat(b.stars)} · ${b.moves} cubaan` : L.desc;
    const right = locked ? `<span role="img" aria-label="Berkunci">${ic('lock','#6b6b70',16)}</span>`
      : passed ? '<span class="pill ok">Lulus</span>' : (i===mSel ? '<span class="pill dark-p">Dipilih</span>' : '');
    return `<button class="lvl ${i===mSel?'sel':''} ${locked?'lock':''}" data-lvl="${i}" ${locked?'aria-disabled="true"':''}>
      <span class="belt" style="background:${L.col};width:28px;height:28px;border-radius:8px;display:grid;place-items:center;color:${i===0?'#0a0a0a':'#fff'};font-weight:700;font-size:13px">${i+1}</span>
      <span class="nm"><b>${L.nm}</b><span>${sub}</span></span>${right}</button>`;
  }).join('');
  const L = MLEVELS[mSel];
  app.innerHTML = `<section class="hero">
      <div class="stripe"></div>
      <a class="back" href="#game" aria-label="Kembali ke senarai game">${ic('back','#fff',18)}</a>
      <div style="display:flex;flex-direction:column;gap:8px">
        <span class="ic" style="width:48px;height:48px;background:linear-gradient(180deg,var(--y1),var(--y));box-shadow:var(--glow)">${ic('grid','#0a0a0a',24)}</span>
        <h1 style="font-size:30px;line-height:36px;font-weight:700;letter-spacing:-.025em">Memori Padan</h1>
        <p style="margin:0;line-height:20px;color:rgba(255,255,255,.75);max-width:320px">Buka 2 kad sekali gus. Cari 2 kad yang sama dengan cubaan paling sedikit.</p>
      </div>
      <div class="rules">
        <div><span class="dot" style="background:#fff;display:grid;place-items:center;color:#0a0a0a;font-weight:900;font-size:13px">7</span><span><b>Nombor</b>7 dengan 7</span></div>
        <div><span class="dot" style="background:var(--y);display:grid;place-items:center">${ic('star','#0a0a0a',14)}</span><span><b>Gambar</b>Bintang dengan bintang</span></div>
      </div>
    </section>
    <main>
      <section style="display:flex;flex-direction:column;gap:10px">
        <h2 style="font-size:18px;font-weight:700">Pilih tahap</h2>
        ${rows}
      </section>
      <div style="display:flex;flex-direction:column;gap:6px">
        <button class="btn p full" id="mStart" style="font-size:16px;padding:16px">${ic('play','#0a0a0a',16)}Mula tahap ${L.nm}</button>
        <p class="muted" style="margin:0;text-align:center;font-size:12px">${L.pairs} pasang · lulus dengan 2 bintang atau lebih</p>
      </div>
    </main>` + nav('game');
  app.querySelectorAll('.lvl').forEach(bt => bt.onclick = () => { const i = +bt.dataset.lvl; if (i > S.memo.unlocked) return; mSel = i; viewMemori(); });
  document.getElementById('mStart').onclick = () => startMemori(mSel);
  window.scrollTo(0,0);
}
function startMemori(li){
  const L = MLEVELS[li];
  const nums = n => shuffle([1,2,3,4,5,6,7,8,9,10]).slice(0,n).map(v => ({p:'n'+v, t:String(v), kind:'num'}));
  const pics = n => shuffle(M_PICS).slice(0,n).map(pc => ({p:'i'+pc.id, t:pc.nm, kind:'pic', pc}));
  const items = L.id === 'mudah' ? nums(L.pairs) : L.id === 'sederhana' ? pics(L.pairs) : [...nums(5), ...pics(5)];
  const cards = shuffle(items.flatMap(it => [Object.assign({}, it), Object.assign({}, it)]));
  G = {kind:'memori', li, L, cards, open:[], done:0, moves:0, lock:false, t0:performance.now(), secs:0};
  const face = c => c.kind === 'num'
    ? `<span class="f mn" style="font-size:${L.cols===3?44:34}px;font-weight:900">${c.t}</span>`
    : `<span class="f" style="background:${c.pc.bg};color:${c.pc.fg};${c.pc.bg==='#ffffff'?'border:1px solid var(--line);':''}">${ic(c.pc.id, c.pc.fg, L.cols===3?44:36)}</span>`;
  app.innerHTML = `<main style="padding-top:16px;gap:14px">
    <div style="display:flex;justify-content:space-between;align-items:center">
      <button class="btn g" id="mQuit" style="min-height:40px;padding:8px 12px;font-size:13px">✕ Berhenti</button>
      <span class="label">${L.nm}</span>
      <span class="pill y" id="mTime">0 s</span>
    </div>
    <div class="tiles" style="grid-template-columns:repeat(2,minmax(0,1fr))">
      <div class="tile"><span class="k">PASANGAN</span><span class="v" id="mDone">0<small>/${L.pairs}</small></span></div>
      <div class="tile"><span class="k">CUBAAN</span><span class="v" id="mMoves">0</span></div>
    </div>
    <div class="mgrid" style="grid-template-columns:repeat(${L.cols},minmax(0,1fr))">
      ${cards.map((c,i)=>`<button class="mc" data-i="${i}" aria-label="Kad tertutup"><span class="in"><span class="b"><span>MIQ</span></span>${face(c)}</span></button>`).join('')}
    </div>
  </main>`;
  document.getElementById('mQuit').onclick = () => { stopGame(); viewMemori(); };
  app.querySelectorAll('.mc').forEach(b => b.onclick = () => flip(+b.dataset.i));
  const tick = () => { if (!G || G.kind !== 'memori') return; G.secs = Math.floor((performance.now()-G.t0)/1000); const el = document.getElementById('mTime'); if (el) el.textContent = G.secs+' s'; later(tick, 1000); };
  later(tick, 1000);
  window.scrollTo(0,0);
}
function flip(i){
  const g = G; if (!g || g.kind !== 'memori' || g.lock) return;
  const c = g.cards[i]; if (c.done || g.open.includes(i)) return;
  const el = app.querySelector(`.mc[data-i="${i}"]`);
  el.classList.add('open'); el.setAttribute('aria-label', c.t);
  g.open.push(i);
  if (g.open.length < 2) return;
  g.moves++; document.getElementById('mMoves').textContent = g.moves;
  const [a,b] = g.open, ca = g.cards[a], cb = g.cards[b];
  const ea = app.querySelector(`.mc[data-i="${a}"]`), eb = el;
  if (ca.p === cb.p) {
    ca.done = cb.done = true; g.done++; g.open = [];
    ea.classList.add('done'); eb.classList.add('done'); buzz(20);
    document.getElementById('mDone').innerHTML = `${g.done}<small>/${g.L.pairs}</small>`;
    if (g.done === g.L.pairs) { g.lock = true; later(mFinish, 700); }
  } else {
    g.lock = true; ea.classList.add('miss'); eb.classList.add('miss'); buzz(30);
    later(() => {
      [ea,eb].forEach(e => { e.classList.remove('open','miss'); e.setAttribute('aria-label','Kad tertutup'); });
      if (G) { G.open = []; G.lock = false; }
    }, 850);
  }
}
function mFinish(){
  clearTimers();
  const g = G, L = g.L; G = null;
  const secs = Math.max(1, Math.round((performance.now()-g.t0)/1000));
  const stars = g.moves <= L.pairs + 3 ? 3 : g.moves <= L.pairs*2 ? 2 : 1;
  const score = L.pairs*150 + stars*200 + Math.max(0, 300 - secs*3);
  const m = S.memo, pass = stars >= 2;
  const prev = m.best[L.id], isNew = !prev || stars > prev.stars || (stars === prev.stars && g.moves < prev.moves);
  if (isNew) m.best[L.id] = {stars, moves:g.moves, secs, score, date:Date.now()};
  m.plays++;
  let unlockedNow = false;
  if (pass && g.li === m.unlocked && g.li < MLEVELS.length-1) { m.unlocked++; unlockedNow = true; }
  if (pass && g.li === MLEVELS.length-1) m.passedTop = true;
  const xpGain = Math.round(score/10) + (pass ? 30 : 0);
  const rankBefore = rankInfo(S.xp).cur.nm;
  S.xp += xpGain; S.rounds++; S.last = 'memori';
  const dk = dkey(new Date()); S.days[dk] = (S.days[dk]||0) + xpGain;
  const rankAfter = rankInfo(S.xp).cur.nm;
  const _rd = {game:'memori', stars};
  const newDaily = dailyCheck(_rd);
  const newBadges = BADGES.filter(b => !S.badges[b.id] && b.test(S, _rd));
  newBadges.forEach(b => S.badges[b.id] = Date.now());
  save();
  const hasNext = g.li < MLEVELS.length-1 && g.li+1 <= m.unlocked;
  app.innerHTML = header() + `<main>
    <div class="res">
      <span class="pill ${pass?'ok':''}" style="${pass?'':'background:#fff3d6;color:#8a4b00'}">${pass?'Lulus':'Belum lulus'}</span>
      <h1 style="font-size:28px;font-weight:700;letter-spacing:-.025em;margin-top:6px">Memori · ${L.nm}</h1>
      <p class="muted" style="margin:0">${pass ? (unlockedNow ? `Tahap ${MLEVELS[g.li+1].nm} kini dibuka!` : 'Syabas! Cuba dengan cubaan lebih sedikit.') : `Perlu 2 bintang untuk lulus: siapkan dalam ${L.pairs*2} cubaan atau kurang.`}</p>
      <div class="big" style="color:var(--y);-webkit-text-stroke:2px #0a0a0a" role="img" aria-label="${stars} bintang daripada 3">${'★'.repeat(stars)}<span style="color:var(--line);-webkit-text-stroke:0">${'★'.repeat(3-stars)}</span></div>
      <span class="label">${g.moves} cubaan · ${secs} saat${isNew ? ' · <span style="color:var(--ok)">rekod baru</span>' : ''}</span>
      <span class="pill y" style="margin-top:8px">+${xpGain} XP${rankAfter!==rankBefore ? ' · Pangkat '+rankAfter+'!' : ''}</span>
    </div>
    ${dailyBanner(newDaily)}${lbBlock('memori', L.id, score, '★'.repeat(stars)+' · '+g.moves+' cubaan · '+secs+' saat')}${newBadges.length ? `<div class="card" style="padding:14px;display:flex;flex-direction:column;gap:10px;align-items:center"><span class="label">Lencana baru</span><div class="newb">${newBadges.map(b=>`<span class="pill y">${ic('star','#0a0a0a',14)}${b.nm}</span>`).join('')}</div></div>` : ''}
    <div class="tip">${stars === 3 ? 'Ingatan yang sangat tajam! Cuba sebut setiap pasangan dengan kuat semasa bermain.' : 'Petua: ingat kedudukan setiap kad yang anda buka, walaupun bukan pasangannya.'}</div>
    <div style="display:flex;flex-direction:column;gap:8px">
      <button class="btn p full" id="mAgain">Main lagi</button>
      ${hasNext ? '<button class="btn d full" id="mNx">Tahap seterusnya →</button>' : ''}
      <a class="btn g full" href="#game">Senarai game</a>
    </div>
  </main>`;
  document.getElementById('mAgain').onclick = () => startMemori(g.li);
  const nx = document.getElementById('mNx'); if (nx) nx.onclick = () => { mSel = g.li+1; startMemori(g.li+1); };
  window.scrollTo(0,0);
}


