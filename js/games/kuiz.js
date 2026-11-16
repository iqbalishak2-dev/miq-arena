// MIQ Arena — game: kuiz
// ================= Kuiz Asas: butiran =================
let qSel = null;
function viewKuiz(){
  const q = S.kuiz;
  if (qSel === null || qSel > q.unlocked) qSel = Math.min(q.unlocked, QLEVELS.length-1);
  const rows = QLEVELS.map((L,i) => {
    const locked = i > q.unlocked, b = q.best[L.id], passed = i < q.unlocked || (i===QLEVELS.length-1 && q.passedTop);
    const sub = b ? `Terbaik ${b.correct}/${QN} betul` : L.desc;
    const right = locked ? `<span role="img" aria-label="Berkunci">${ic('lock','#6b6b70',16)}</span>`
      : passed ? '<span class="pill ok">Lulus</span>' : (i===qSel ? '<span class="pill dark-p">Dipilih</span>' : '');
    return `<button class="lvl ${i===qSel?'sel':''} ${locked?'lock':''}" data-lvl="${i}" ${locked?'aria-disabled="true"':''}>
      <span class="belt" style="background:${L.col};width:28px;height:28px;border-radius:8px;display:grid;place-items:center;color:${i===0?'#0a0a0a':'#fff'};font-weight:700;font-size:13px">${i+1}</span>
      <span class="nm"><b>${L.nm}</b><span>${sub}</span></span>${right}</button>`;
  }).join('');
  const L = QLEVELS[qSel];
  app.innerHTML = `<section class="hero">
      <div class="stripe"></div>
      <a class="back" href="#game" aria-label="Kembali ke senarai game">${ic('back','#fff',18)}</a>
      <div style="display:flex;flex-direction:column;gap:8px">
        <span class="ic" style="width:48px;height:48px;background:linear-gradient(180deg,var(--y1),var(--y));box-shadow:var(--glow)">${ic('lang','#0a0a0a',24)}</span>
        <h1 style="font-size:30px;line-height:36px;font-weight:700;letter-spacing:-.025em">Kuiz Asas</h1>
        <p style="margin:0;line-height:20px;color:rgba(255,255,255,.75);max-width:320px">Kenali kiraan dan arahan yang digunakan dalam kelas Taekwon-Do.</p>
      </div>
      <div class="rules">
        <div><span class="dot" style="background:var(--y);display:grid;place-items:center;color:#0a0a0a;font-weight:700;font-size:12px">7</span><span><b>Ilgop</b>Nombor ke istilah</span></div>
        <div><span class="dot" style="background:#fff;display:grid;place-items:center;color:#0a0a0a;font-weight:700;font-size:12px">?</span><span><b>Junbi</b>Istilah ke maksud</span></div>
      </div>
    </section>
    <main>
      <section style="display:flex;flex-direction:column;gap:10px">
        <h2 style="font-size:18px;font-weight:700">Pilih tahap</h2>
        ${rows}
      </section>
      <div style="display:flex;flex-direction:column;gap:6px">
        <button class="btn p full" id="qStart" style="font-size:16px;padding:16px">${ic('play','#0a0a0a',16)}Mula kuiz ${L.nm}</button>
        <p class="muted" style="margin:0;text-align:center;font-size:12px">${QN} soalan · lulus jika ${QPASS} betul</p>
      </div>
      <p class="muted" style="margin:0;font-size:12px;line-height:18px;text-align:center">Ejaan ikut istilah ITF. Tanya Sabum jika ragu tentang sebutan.</p>
    </main>` + nav('game');
  app.querySelectorAll('.lvl').forEach(bt => bt.onclick = () => { const i = +bt.dataset.lvl; if (i > S.kuiz.unlocked) return; qSel = i; viewKuiz(); });
  document.getElementById('qStart').onclick = () => startKuiz(qSel);
  window.scrollTo(0,0);
}


// ================= Kuiz Asas: permainan =================
function makeQ(item, pool, isCount){
  const [ko, mean] = item;
  const others = shuffle(pool.filter(p => p[0] !== ko)).slice(0,3);
  const t = Math.random();
  if (isCount && t < .5) return {k:'Nombor ini dalam bahasa Korea?', t:mean, big:true, ans:ko, opts:shuffle([ko, ...others.map(o=>o[0])]), item};
  if (isCount)           return {k:'Istilah ini bermaksud nombor…', t:ko, big:true, ans:mean, opts:shuffle([mean, ...others.map(o=>o[1])]), item};
  if (t < .55)           return {k:'Apakah maksud istilah ini?', t:ko, big:true, ans:mean, opts:shuffle([mean, ...others.map(o=>o[1])]), item};
  return {k:'Apakah istilah untuk…', t:mean, big:false, ans:ko, opts:shuffle([ko, ...others.map(o=>o[0])]), item};
}
function buildQuiz(li){
  const id = QLEVELS[li].id;
  if (id === 'kiraan') return shuffle(Q_COUNT).slice(0,QN).map(it => makeQ(it, Q_COUNT, true));
  if (id === 'arahan') return shuffle(Q_CMD).slice(0,QN).map(it => makeQ(it, Q_CMD, false));
  const mix = shuffle([...shuffle(Q_COUNT).slice(0,4).map(it=>['c',it]), ...shuffle(Q_CMD).slice(0,6).map(it=>['m',it])]);
  return mix.map(([k,it]) => k==='c' ? makeQ(it, Q_COUNT, true) : makeQ(it, Q_CMD, false));
}
function startKuiz(li){
  G = {kind:'kuiz', li, L:QLEVELS[li], qs:buildQuiz(li), i:0, correct:0, score:0, streak:0, res:[], wrong:[], phase:'ask'};
  drawQ();
}
function drawQ(){
  const g = G, q = g.qs[g.i];
  q.shownAt = performance.now(); g.phase = 'ask';
  app.innerHTML = `<main style="padding-top:20px">
    <div style="display:flex;justify-content:space-between;align-items:center">
      <button class="btn g" id="qQuit" style="min-height:40px;padding:8px 12px;font-size:13px">✕ Berhenti</button>
      <span class="label">${g.L.nm} · Soalan ${g.i+1}/${QN}</span>
      <span class="pill y">${fmt(g.score)}</span>
    </div>
    <div class="qbar" aria-hidden="true">${g.qs.map((_,j)=>`<b class="${g.res[j]===true?'ok':g.res[j]===false?'no':j===g.i?'cur':''}"></b>`).join('')}</div>
    <div class="qcard"><div class="stripe"></div><span class="qk">${esc(q.k)}</span><span class="qt ${q.big?'':'sm'}">${esc(q.t)}</span></div>
    <div class="opts">${q.opts.map((o,j)=>`<button class="opt" data-o="${j}"><span class="l">${'ABCD'[j]}</span>${esc(o)}</button>`).join('')}</div>
    <div id="qFb" aria-live="polite"></div>
  </main>`;
  document.getElementById('qQuit').onclick = () => { stopGame(); viewKuiz(); };
  app.querySelectorAll('.opt').forEach(b => b.onclick = () => answer(+b.dataset.o));
  window.scrollTo(0,0);
}
function answer(j){
  const g = G; if (!g || g.phase !== 'ask') return;
  g.phase = 'shown';
  const q = g.qs[g.i], pick = q.opts[j], ok = pick === q.ans;
  const btns = [...app.querySelectorAll('.opt')];
  btns.forEach((b,k) => { b.disabled = true; if (q.opts[k] === q.ans) b.classList.add('ok'); });
  const fb = document.getElementById('qFb');
  if (ok) {
    const secs = (performance.now() - q.shownAt)/1000;
    g.correct++; g.streak++;
    g.score += 100 + Math.max(0, Math.round(50 - secs*8)) + Math.min(g.streak-1, 5)*10;
    g.res[g.i] = true; buzz(20);
    fb.innerHTML = `<div class="fb ok">Betul! ${esc(q.item[0])} = ${esc(q.item[1])}</div>`;
    later(nextQ, 900);
  } else {
    btns[j].classList.add('no'); g.streak = 0; g.res[g.i] = false; buzz([60,40,60]);
    g.wrong.push(q.item);
    fb.innerHTML = `<div style="display:flex;flex-direction:column;gap:10px"><div class="fb no">Belum tepat. ${esc(q.item[0])} = ${esc(q.item[1])}</div><button class="btn d full" id="qNext">Seterusnya →</button></div>`;
    document.getElementById('qNext').onclick = nextQ;
  }
}
function nextQ(){
  if (!G || G.kind !== 'kuiz') return;
  clearTimers();
  G.i++;
  if (G.i >= QN) return qFinish();
  drawQ();
}
function qFinish(){
  const g = G, L = g.L; G = null;
  const q = S.kuiz, pass = g.correct >= QPASS;
  const prev = q.best[L.id], isNew = g.correct > 0 && (!prev || g.correct > prev.correct || (g.correct === prev.correct && g.score > prev.score));
  if (isNew) q.best[L.id] = {score:g.score, correct:g.correct, date:Date.now()};
  q.plays++;
  let unlockedNow = false;
  if (pass && g.li === q.unlocked && g.li < QLEVELS.length-1) { q.unlocked++; unlockedNow = true; }
  if (pass && g.li === QLEVELS.length-1) q.passedTop = true;
  const xpGain = g.correct*12 + (pass ? 40 : 0);
  const rankBefore = rankInfo(S.xp).cur.nm;
  S.xp += xpGain; S.rounds++; S.last = 'kuiz';
  const dk = dkey(new Date()); S.days[dk] = (S.days[dk]||0) + xpGain;
  const rankAfter = rankInfo(S.xp).cur.nm;
  const _rd = {game:'kuiz', correct:g.correct};
  const newDaily = dailyCheck(_rd);
  const newBadges = BADGES.filter(b => !S.badges[b.id] && b.test(S, _rd));
  newBadges.forEach(b => S.badges[b.id] = Date.now());
  save();
  const uniqWrong = [...new Map(g.wrong.map(w => [w[0], w])).values()];
  const hasNext = g.li < QLEVELS.length-1 && g.li+1 <= q.unlocked;
  app.innerHTML = header() + `<main>
    <div class="res">
      <span class="pill ${pass?'ok':''}" style="${pass?'':'background:#fff3d6;color:#8a4b00'}">${pass?'Lulus':'Belum lulus'}</span>
      <h1 style="font-size:28px;font-weight:700;letter-spacing:-.025em;margin-top:6px">Kuiz · ${L.nm}</h1>
      <p class="muted" style="margin:0">${pass ? (unlockedNow ? `Tahap ${QLEVELS[g.li+1].nm} kini dibuka!` : 'Syabas! Cuba dapatkan 10/10.') : `Perlu ${QPASS} betul untuk lulus. Cuba lagi!`}</p>
      <div class="big">${g.correct}<span style="font-size:32px;color:var(--muted)">/${QN}</span></div>
      <span class="label">Jawapan betul · ${fmt(g.score)} markah${isNew ? ' · <span style="color:var(--ok)">rekod baru</span>' : ''}</span>
      <span class="pill y" style="margin-top:8px">+${xpGain} XP${rankAfter!==rankBefore ? ' · Pangkat '+rankAfter+'!' : ''}</span>
    </div>
    ${dailyBanner(newDaily)}${lbBlock('kuiz', L.id, g.score, g.correct+'/'+QN+' betul')}${newBadges.length ? `<div class="card" style="padding:14px;display:flex;flex-direction:column;gap:10px;align-items:center"><span class="label">Lencana baru</span><div class="newb">${newBadges.map(b=>`<span class="pill y">${ic('star','#0a0a0a',14)}${b.nm}</span>`).join('')}</div></div>` : ''}
    ${uniqWrong.length ? `<section class="card" style="padding:0;overflow:hidden">
      <h2 style="padding:16px 20px 10px;font-size:16px;font-weight:700">Ulang kaji</h2>
      ${uniqWrong.map(w=>`<div class="trow"><b>${esc(w[0])}</b><span>${esc(w[1])}</span></div>`).join('')}
    </section>` : '<div class="tip">Semua jawapan betul. Hebat! Cuba sebut setiap istilah dengan kuat semasa kelas.</div>'}
    <div style="display:flex;flex-direction:column;gap:8px">
      <button class="btn p full" id="qAgain">Main lagi</button>
      ${hasNext ? '<button class="btn d full" id="qNx">Tahap seterusnya →</button>' : ''}
      <a class="btn g full" href="#game">Senarai game</a>
    </div>
  </main>`;
  document.getElementById('qAgain').onclick = () => startKuiz(g.li);
  const nx = document.getElementById('qNx'); if (nx) nx.onclick = () => { qSel = g.li+1; startKuiz(g.li+1); };
  window.scrollTo(0,0);
}


