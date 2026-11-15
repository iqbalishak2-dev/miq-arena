// MIQ Arena — game: tali
// ================= Susun Tali Pinggang =================
let bSel = null;
function viewTali(){
  const m = S.belt;
  if (bSel === null || bSel > m.unlocked) bSel = Math.min(m.unlocked, BLEVELS.length-1);
  const rows = BLEVELS.map((L,i) => {
    const locked = i > m.unlocked, b = m.best[L.id], passed = i < m.unlocked || (i===BLEVELS.length-1 && m.passedTop);
    const sub = b ? `Terbaik ${b.secs} saat · ${b.err} kesilapan` : L.desc;
    const right = locked ? `<span role="img" aria-label="Berkunci">${ic('lock','#6b6b70',16)}</span>`
      : passed ? '<span class="pill ok">Lulus</span>' : (i===bSel ? '<span class="pill dark-p">Dipilih</span>' : '');
    return `<button class="lvl ${i===bSel?'sel':''} ${locked?'lock':''}" data-lvl="${i}" ${locked?'aria-disabled="true"':''}>
      <span class="belt" style="background:${L.col};width:28px;height:28px;border-radius:8px;display:grid;place-items:center;color:${i===0?'#0a0a0a':'#fff'};font-weight:700;font-size:13px">${i+1}</span>
      <span class="nm"><b>${L.nm}</b><span>${sub}</span></span>${right}</button>`;
  }).join('');
  const L = BLEVELS[bSel];
  app.innerHTML = `<section class="hero">
      <div class="stripe"></div>
      <a class="back" href="#game" aria-label="Kembali ke senarai game">${ic('back','#fff',18)}</a>
      <div style="display:flex;flex-direction:column;gap:8px">
        <span class="ic" style="width:48px;height:48px;background:linear-gradient(180deg,var(--y1),var(--y));box-shadow:var(--glow)">${ic('layers','#0a0a0a',24)}</span>
        <h1 style="font-size:30px;line-height:36px;font-weight:700;letter-spacing:-.025em">Susun Tali Pinggang</h1>
        <p style="margin:0;line-height:20px;color:rgba(255,255,255,.75);max-width:320px">Tekan tali pinggang ikut turutan, dari yang paling rendah (Putih) hingga Hitam.</p>
      </div>
      <div style="display:flex;flex-direction:column;gap:6px;background:var(--ink2);border-radius:12px;padding:12px">
        ${B_ALL.filter(b=>!b.tip).map(b=>beltBar(b,'100%')).join('')}
      </div>
    </section>
    <main>
      <section style="display:flex;flex-direction:column;gap:10px">
        <h2 style="font-size:18px;font-weight:700">Pilih tahap</h2>
        ${rows}
      </section>
      <div style="display:flex;flex-direction:column;gap:6px">
        <button class="btn p full" id="bStart" style="font-size:16px;padding:16px">${ic('play','#0a0a0a',16)}Mula tahap ${L.nm}</button>
        <p class="muted" style="margin:0;text-align:center;font-size:12px">Lulus jika ${L.maxErr} kesilapan atau kurang${L.time ? ' dalam '+L.time+' saat' : ''}</p>
      </div>
      <p class="muted" style="margin:0;font-size:12px;line-height:18px;text-align:center">Turutan ikut sistem ITF. Jalur pada hujung tali pinggang menunjukkan warna seterusnya.</p>
    </main>` + nav('game');
  app.querySelectorAll('.lvl').forEach(bt => bt.onclick = () => { const i = +bt.dataset.lvl; if (i > S.belt.unlocked) return; bSel = i; viewTali(); });
  document.getElementById('bStart').onclick = () => startTali(bSel);
  window.scrollTo(0,0);
}
function startTali(li){
  const L = BLEVELS[li];
  const order = L.full ? B_ALL.filter(b => !b.tip) : B_ALL.slice();
  G = {kind:'tali', li, L, order, pool:shuffle(order.map((b,i)=>i)), placed:0, err:0, t0:performance.now()};
  drawTali();
  const tick = () => {
    if (!G || G.kind !== 'tali') return;
    const secs = Math.floor((performance.now()-G.t0)/1000), el = document.getElementById('bTime');
    if (el) el.textContent = L.time ? Math.max(0, L.time - secs)+' s' : secs+' s';
    if (L.time && secs >= L.time) return tFinish(true);
    later(tick, 250);
  };
  later(tick, 250);
}
function drawTali(){
  const g = G, L = g.L, n = g.order.length;
  const ladder = g.order.map((b,i) => i < g.placed
    ? `<div class="lrow"><span class="n">${i+1}</span>${beltBar(b)}<small style="font-size:12px;font-weight:600">${b.nm}</small></div>`
    : `<div class="lrow empty"><span class="n" style="background:var(--line);color:var(--muted)">${i+1}</span><small class="muted" style="font-size:12px">${i===g.placed ? 'Seterusnya…' : ''}</small></div>`).join('');
  app.innerHTML = `<main style="padding-top:16px;gap:14px">
    <div style="display:flex;justify-content:space-between;align-items:center">
      <button class="btn g" id="bQuit" style="min-height:40px;padding:8px 12px;font-size:13px">✕ Berhenti</button>
      <span class="label">${L.nm} · ${g.placed}/${n}</span>
      <span class="pill y" id="bTime">${L.time ? L.time+' s' : '0 s'}</span>
    </div>
    <div class="tiles" style="grid-template-columns:repeat(2,minmax(0,1fr))">
      <div class="tile"><span class="k">DISUSUN</span><span class="v">${g.placed}<small>/${n}</small></span></div>
      <div class="tile"><span class="k">KESILAPAN</span><span class="v" style="${g.err > L.maxErr ? 'color:var(--bad)' : ''}">${g.err}<small> /${L.maxErr}</small></span></div>
    </div>
    <div class="note" style="background:var(--ink);color:#fff"><span>${g.placed === 0 ? 'Tekan tali pinggang <b style="color:var(--y)">paling rendah</b> dahulu.' : 'Tekan tali pinggang <b style="color:var(--y)">seterusnya</b> selepas ' + esc(g.order[g.placed-1].nm) + '.'}</span></div>
    <div class="bpool">
      ${g.pool.filter(i => i >= g.placed).map(i => { const b = g.order[i]; return `<button class="bbtn" data-i="${i}" aria-label="${esc(b.nm)}">${beltBar(b,'100%')}${L.names ? `<small>${b.nm}</small>` : ''}</button>`; }).join('')}
    </div>
    <section style="display:flex;flex-direction:column;gap:8px">
      <span class="label">Turutan anda</span>
      <div class="ladder">${ladder}</div>
    </section>
  </main>`;
  document.getElementById('bQuit').onclick = () => { stopGame(); viewTali(); };
  app.querySelectorAll('.bbtn').forEach(bt => bt.onclick = () => pickBelt(+bt.dataset.i, bt));
}
function pickBelt(i, el){
  const g = G; if (!g || g.kind !== 'tali') return;
  if (i === g.placed) {
    g.placed++; buzz(15);
    if (g.placed >= g.order.length) { drawTali(); return later(() => tFinish(false), 500); }
    drawTali();
  } else {
    g.err++; buzz([50,30,50]);
    el.classList.remove('wrong'); void el.offsetWidth; el.classList.add('wrong');
    const v = app.querySelectorAll('.tile .v')[1]; if (v) v.innerHTML = `${g.err}<small> /${g.L.maxErr}</small>`;
    if (g.err > g.L.maxErr) v && (v.style.color = 'var(--bad)');
  }
}
function tFinish(timeUp){
  clearTimers();
  const g = G, L = g.L; G = null;
  const secs = Math.max(1, Math.round((performance.now()-g.t0)/1000));
  const done = g.placed >= g.order.length;
  const pass = done && !timeUp && g.err <= L.maxErr;
  const score = done ? Math.max(100, 1000 + g.order.length*50 - g.err*150 - secs*10) : g.placed*50;
  const m = S.belt, prev = m.best[L.id];
  const isNew = done && (!prev || g.err < prev.err || (g.err === prev.err && secs < prev.secs));
  if (isNew) m.best[L.id] = {secs, err:g.err, score, date:Date.now()};
  m.plays++;
  let unlockedNow = false;
  if (pass && g.li === m.unlocked && g.li < BLEVELS.length-1) { m.unlocked++; unlockedNow = true; }
  if (pass && g.li === BLEVELS.length-1) m.passedTop = true;
  const xpGain = Math.round(score/10) + (pass ? 30 : 0);
  const rankBefore = rankInfo(S.xp).cur.nm;
  S.xp += xpGain; S.rounds++; S.last = 'tali';
  const dk = dkey(new Date()); S.days[dk] = (S.days[dk]||0) + xpGain;
  const rankAfter = rankInfo(S.xp).cur.nm;
  const _rd = {game:'tali', li:g.li, err: done ? g.err : 99, done};
  const newDaily = dailyCheck(_rd);
  const newBadges = BADGES.filter(b => !S.badges[b.id] && b.test(S, _rd));
  newBadges.forEach(b => S.badges[b.id] = Date.now());
  save();
  const hasNext = g.li < BLEVELS.length-1 && g.li+1 <= m.unlocked;
  app.innerHTML = header() + `<main>
    <div class="res">
      <span class="pill ${pass?'ok':''}" style="${pass?'':'background:#fff3d6;color:#8a4b00'}">${pass?'Lulus':(timeUp?'Masa tamat':'Belum lulus')}</span>
      <h1 style="font-size:28px;font-weight:700;letter-spacing:-.025em;margin-top:6px">Tali Pinggang · ${L.nm}</h1>
      <p class="muted" style="margin:0">${pass ? (unlockedNow ? `Tahap ${BLEVELS[g.li+1].nm} kini dibuka!` : 'Syabas! Cuba lebih pantas.') : timeUp ? `Siapkan dalam ${L.time} saat untuk lulus.` : `Lulus jika ${L.maxErr} kesilapan atau kurang.`}</p>
      <div class="big">${done ? secs : g.placed}<span style="font-size:28px;color:var(--muted)">${done ? ' saat' : '/'+g.order.length}</span></div>
      <span class="label">${g.err} kesilapan · ${fmt(score)} markah${isNew ? ' · <span style="color:var(--ok)">rekod baru</span>' : ''}</span>
      <span class="pill y" style="margin-top:8px">+${xpGain} XP${rankAfter!==rankBefore ? ' · Pangkat '+rankAfter+'!' : ''}</span>
    </div>
    ${dailyBanner(newDaily)}${newBadges.length ? `<div class="card" style="padding:14px;display:flex;flex-direction:column;gap:10px;align-items:center"><span class="label">Lencana baru</span><div class="newb">${newBadges.map(b=>`<span class="pill y">${ic('star','#0a0a0a',14)}${b.nm}</span>`).join('')}</div></div>` : ''}
    <section class="card" style="padding:0;overflow:hidden">
      <h2 style="padding:16px 20px 10px;font-size:16px;font-weight:700">Turutan betul dan maksud warna</h2>
      ${g.order.map(b => `<div class="trow" style="align-items:flex-start;gap:12px"><div style="display:flex;flex-direction:column;gap:6px;flex:1">${beltBar(b,'100%')}<span style="font-size:13px;font-weight:700">${b.nm} <span class="muted" style="font-weight:500">· ${b.kup}</span></span>${!b.tip && B_MEAN[b.nm] ? `<span class="muted" style="font-size:12px;line-height:17px">${B_MEAN[b.nm]}</span>` : ''}</div></div>`).join('')}
    </section>
    <div style="display:flex;flex-direction:column;gap:8px">
      <button class="btn p full" id="tAgain">Main lagi</button>
      ${hasNext ? '<button class="btn d full" id="tNx">Tahap seterusnya →</button>' : ''}
      <a class="btn g full" href="#game">Senarai game</a>
    </div>
  </main>`;
  document.getElementById('tAgain').onclick = () => startTali(g.li);
  const nx = document.getElementById('tNx'); if (nx) nx.onclick = () => { bSel = g.li+1; startTali(g.li+1); };
  window.scrollTo(0,0);
}


