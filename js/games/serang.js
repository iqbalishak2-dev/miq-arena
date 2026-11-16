// MIQ Arena — game: serang
// ================= Serang & Tangkis (berdua) =================
let stTarget = 5;
const ST_Z = [['High','Atas'],['Middle','Tengah'],['Low','Bawah']];
function viewSerang(){
  app.innerHTML = `<section class="hero">
      <div class="stripe"></div>
      <a class="back" href="#berdua" aria-label="Kembali ke Main berdua">${ic('back','#fff',18)}</a>
      <div style="display:flex;flex-direction:column;gap:8px">
        <span class="ic" style="width:48px;height:48px;background:linear-gradient(180deg,var(--y1),var(--y));box-shadow:var(--glow)">${ic('shield','#0a0a0a',24)}</span>
        <h1 style="font-size:30px;line-height:36px;font-weight:700;letter-spacing:-.025em">Serang & Tangkis</h1>
        <p style="margin:0;line-height:20px;color:rgba(255,255,255,.75);max-width:320px">Bergilir menjadi penyerang dan penangkis. Penyerang pilih zon. Penangkis mesti tekan zon yang menyala merah sebelum masa tamat.</p>
      </div>
      <div class="rules">
        <div><span class="dot" style="background:var(--y)"></span><span><b>Penyerang</b>Pilih zon serangan</span></div>
        <div><span class="dot" style="background:#ff2a2a"></span><span><b>Penangkis</b>Tekan zon merah</span></div>
      </div>
    </section>
    <main>${whyBox('serang')}
      <form class="card" id="stForm" style="display:flex;flex-direction:column;gap:16px" novalidate>
        <div class="field"><label for="stP1" class="label">Nama pemain Hong (atas)</label><input id="stP1" maxlength="14" autocomplete="off" value="${esc(S.duel.p2 || 'Lawan')}"></div>
        <div class="field"><label for="stP2" class="label">Nama pemain Chong (bawah)</label><input id="stP2" maxlength="14" autocomplete="off" value="${esc(S.profile.nama)}"></div>
        <div class="field">
          <span class="label">Menang bila dapat</span>
          <div class="seg">${[3,5,7].map(n => `<button type="button" class="chip ${n===stTarget?'on':''}" data-t="${n}" aria-pressed="${n===stTarget}">${n} mata</button>`).join('')}</div>
        </div>
        <span class="err" id="stErr" role="alert"></span>
      </form>
      <button class="btn p full" id="stStart" style="font-size:16px;padding:16px">${ic('play','#0a0a0a',16)}Mula perlawanan</button>
      <section class="card" style="padding:0;overflow:hidden">
        <h2 style="padding:16px 20px 10px;font-size:16px;font-weight:700">Peraturan</h2>
        <div class="trow"><span>Penangkis tekan zon yang betul dalam masa</span><span class="muted">Mata penangkis</span></div>
        <div class="trow"><span>Salah zon atau terlambat</span><span class="muted">Mata penyerang</span></div>
        <div class="trow"><span>Penyerang tidak serang dalam 5 saat</span><span class="muted">Mata penangkis</span></div>
        <div class="trow"><span class="muted" style="font-size:12px">Masa untuk menangkis semakin singkat setiap pusingan.</span></div>
      </section>
      <p class="muted" style="margin:0;text-align:center;font-size:12px">${S.serang.plays} perlawanan dimain</p>
    </main>` + nav('game');
  app.querySelectorAll('[data-t]').forEach(b => b.onclick = () => {
    stTarget = +b.dataset.t;
    app.querySelectorAll('[data-t]').forEach(x => { const on = +x.dataset.t === stTarget; x.classList.toggle('on', on); x.setAttribute('aria-pressed', on); });
  });
  const go = () => {
    const a = document.getElementById('stP1').value.trim(), b = document.getElementById('stP2').value.trim();
    if (!a || !b) { document.getElementById('stErr').textContent = 'Masukkan nama kedua-dua pemain dahulu.'; return; }
    S.duel.p2 = a; save();
    startSerang(a, b, stTarget);
  };
  document.getElementById('stForm').onsubmit = e => { e.preventDefault(); go(); };
  document.getElementById('stStart').onclick = go;
  window.scrollTo(0,0);
}
function startSerang(n0, n1, target){
  G = {kind:'serang', names:[n0,n1], score:[0,0], target, round:0, phase:'idle', ready:[false,false], atk:0, zone:-1, blocks:[0,0]};
  const half = p => `<div class="dhalf sthalf ${p===0?'hong top':'chong'}" data-p="${p}">
      <div class="row1"><span class="nm">${p===0?'Hong':'Chong'} · ${esc([n0,n1][p])}</span><span class="role" id="stRole${p}">–</span><span class="sc" id="stS${p}">0</span></div>
      <div class="stzones">${ST_Z.map((z,i) => `<button class="stz" data-z="${i}">${z[0]}<small>${z[1]}</small></button>`).join('')}</div>
      <span class="msg" id="stM${p}">Tekan untuk sedia</span>
    </div>`;
  app.innerHTML = `<section class="dplay">${half(0)}
    <div class="dmid"><button class="quit" id="stQuit">✕ Berhenti</button><span class="t" id="stRd">SASARAN ${target} MATA</span><span style="width:70px"></span></div>
    ${half(1)}</section>`;
  window.scrollTo(0,0);
  const prevOverflow = document.body.style.overflow; document.body.style.overflow = 'hidden';
  G.cleanup = () => { document.body.style.overflow = prevOverflow; };
  G.halves = [...app.querySelectorAll('.dhalf')];
  G.halves.forEach(h => h.addEventListener('pointerdown', e => {
    e.preventDefault();
    const z = e.target.closest('.stz');
    stTap(+h.dataset.p, z ? +z.dataset.z : -1);
  }));
  document.getElementById('stQuit').onclick = () => { stopGame(); viewSerang(); };
}
const stMsg = (p, t) => { const el = document.getElementById('stM'+p); if (el) el.textContent = t; };
const stZones = p => [...G.halves[p].querySelectorAll('.stz')];
function stRound(){
  const g = G; if (!g || g.kind !== 'serang') return;
  g.round++; g.atk = (g.round - 1) % 2; g.zone = -1;
  const def = 1 - g.atk;
  document.getElementById('stRd').textContent = 'PUSINGAN ' + g.round;
  g.halves.forEach((h,i) => { h.classList.remove('win','foul','atkr'); stZones(i).forEach(z => z.classList.remove('lit','ok','pick')); });
  g.halves[g.atk].classList.add('atkr');
  const r0 = document.getElementById('stRole'+g.atk), r1 = document.getElementById('stRole'+def);
  r0.textContent = 'PENYERANG'; r0.className = 'role atk'; r1.textContent = 'PENANGKIS'; r1.className = 'role';
  stMsg(g.atk, 'Pilih zon untuk menyerang!'); stMsg(def, 'Bersedia… Kyungye');
  g.window = Math.max(550, 1050 - (g.round-1)*35);
  g.phase = 'attack';
  later(() => { if (G && G.kind === 'serang' && G.phase === 'attack' && G.round === g.round) stPoint(def, 'Penyerang tidak serang', 'Masa tamat'); }, 5000);
}
function stPoint(p, msgWin, msgLose){
  const g = G; g.phase = 'point'; clearTimers();
  g.score[p]++; document.getElementById('stS'+p).textContent = g.score[p];
  g.halves[p].classList.add('win');
  stMsg(p, msgWin); stMsg(1-p, msgLose);
  if (g.score[p] >= g.target) return later(stFinish, 1300);
  later(stRound, 1500);
}
function stTap(p, z){
  const g = G; if (!g || g.kind !== 'serang') return;
  if (g.phase === 'idle') {
    g.ready[p] = true; stMsg(p, 'Sedia ✓');
    if (g.ready[0] && g.ready[1]) { g.phase = 'pre'; later(stRound, 400); }
    return;
  }
  if (z < 0) return;
  const def = 1 - g.atk;
  if (g.phase === 'attack' && p === g.atk) {
    clearTimers();
    g.zone = z; g.phase = 'defend'; g.t0 = performance.now();
    stZones(g.atk)[z].classList.add('pick');
    stZones(def)[z].classList.add('lit');
    stMsg(g.atk, 'Serangan dilepaskan!'); stMsg(def, 'TANGKIS!'); buzz(30);
    later(() => { if (G && G.kind === 'serang' && G.phase === 'defend') stPoint(g.atk, 'Kena! Serangan berjaya', 'Terlambat'); }, g.window);
    return;
  }
  if (g.phase === 'defend' && p === def) {
    const ms = Math.round(performance.now() - g.t0);
    if (z === g.zone) {
      stZones(def)[z].classList.remove('lit'); stZones(def)[z].classList.add('ok');
      g.blocks[def]++; buzz(20);
      stPoint(def, `Tangkis! ${ms} ms`, 'Ditangkis');
    } else {
      buzz([60,40,60]);
      stPoint(g.atk, 'Kena! Lawan salah zon', 'Salah zon');
    }
  }
}
function stFinish(){
  const g = G; if (!g || g.kind !== 'serang') return;
  stopGame();
  const w = g.score[0] > g.score[1] ? 0 : 1;
  const st = S.serang; st.plays++; st.blocks += g.blocks[0] + g.blocks[1];
  const xpGain = 40;
  const rankBefore = rankInfo(S.xp).cur.nm;
  S.xp += xpGain; S.rounds++; S.last = 'serang';
  const dk = dkey(new Date()); S.days[dk] = (S.days[dk]||0) + xpGain;
  const rankAfter = rankInfo(S.xp).cur.nm;
  const _rd = {game:'serang'};
  const newDaily = dailyCheck(_rd);
  const newBadges = BADGES.filter(b => !S.badges[b.id] && b.test(S, _rd));
  newBadges.forEach(b => S.badges[b.id] = Date.now());
  save();
  const col = ['var(--hong)','var(--chong)'];
  app.innerHTML = header() + `<main>
    <div class="res">
      <span class="pill dark-p">Perlawanan tamat</span>
      <span class="label" style="margin-top:10px">Pemenang</span>
      <h1 style="font-size:34px;font-weight:900;letter-spacing:-.03em;color:${col[w]}">${esc(g.names[w])}</h1>
      <div class="big">${g.score[0]}<span style="color:var(--muted)"> – </span>${g.score[1]}</div>
      <span class="label">${esc(g.names[0])} (Hong) · ${esc(g.names[1])} (Chong) · ${g.round} pusingan</span>
      <span class="pill y" style="margin-top:8px">+${xpGain} XP${rankAfter!==rankBefore ? ' · Pangkat '+rankAfter+'!' : ''}</span>
    </div>
    ${dailyBanner(newDaily)}${newBadges.length ? `<div class="card" style="padding:14px;display:flex;flex-direction:column;gap:10px;align-items:center"><span class="label">Lencana baru</span><div class="newb">${newBadges.map(b=>`<span class="pill y">${ic('star','#0a0a0a',14)}${b.nm}</span>`).join('')}</div></div>` : ''}
    <div class="grid2" style="gap:8px">
      <div class="st" style="border-top:4px solid var(--hong)"><span class="label">${esc(g.names[0])}</span><div class="v">${g.blocks[0]}<small> tangkisan</small></div></div>
      <div class="st" style="border-top:4px solid var(--chong)"><span class="label">${esc(g.names[1])}</span><div class="v">${g.blocks[1]}<small> tangkisan</small></div></div>
    </div>
    <div class="tip">Hormat lawan selepas perlawanan: Charyot, Kyong-Ye!</div>
    <div style="display:flex;flex-direction:column;gap:8px">
      <button class="btn p full" id="stAgain">Main lagi</button>
      <button class="btn d full" id="stSwap">Tukar tempat dan main lagi</button>
      <a class="btn g full" href="#berdua">Main berdua</a>
    </div>
  </main>`;
  document.getElementById('stAgain').onclick = () => startSerang(g.names[0], g.names[1], g.target);
  document.getElementById('stSwap').onclick = () => startSerang(g.names[1], g.names[0], g.target);
  window.scrollTo(0,0);
}

