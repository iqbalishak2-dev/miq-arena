// MIQ Arena — teras: data, simpanan, navigasi, laman utama, rekod, profil, tetapan

// ================= Ikon (Lucide) =================
const I = {
  zap:'<path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/>',
  list:'<path d="M10 6h11M10 12h11M10 18h11M4 6h1v4M4 10h2M6 18H4c0-1 2-2 2-3s-1-1.5-2-1"/>',
  lang:'<path d="m5 8 6 6M4 14l6-6 2-3M2 5h12M7 2h1M22 22l-5-10-5 10M14 18h6"/>',
  target:'<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
  book:'<path d="M2 4h6a4 4 0 0 1 4 4v13a3 3 0 0 0-3-3H2zM22 4h-6a4 4 0 0 0-4 4v13a3 3 0 0 1 3-3h7z"/>',
  home:'<path d="m3 10 9-7 9 7v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/>',
  pad:'<rect x="2" y="6" width="20" height="12" rx="2"/><path d="M6 12h4M8 10v4M15 13h.01M18 11h.01"/>',
  trophy:'<path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6M18 9h1.5a2.5 2.5 0 0 0 0-5H18M4 22h16M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22M18 2H6v7a6 6 0 0 0 12 0V2z"/>',
  user:'<circle cx="12" cy="8" r="4"/><path d="M4 22a8 8 0 0 1 16 0"/>',
  play:'<path d="m6 3 14 9-14 9z" fill="currentColor"/>',
  flame:'<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.07-2.14-.22-4.05 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.15.43-2.29 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>',
  lock:'<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
  back:'<path d="m15 18-6-6 6-6"/>',
  grid:'<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
  medal:'<path d="M7.21 15 2.66 7.14a2 2 0 0 1 .13-2.2L4.4 2.8A2 2 0 0 1 6 2h12a2 2 0 0 1 1.6.8l1.6 2.14a2 2 0 0 1 .14 2.2L16.79 15M11 12 5.12 2.2M13 12l5.88-9.8M8 7h8"/><circle cx="12" cy="17" r="5"/>',
  crown:'<path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7zM5 20h14"/>',
  heart:'<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>',
  feet:'<path d="M4 16v-2.38C4 11.5 2.97 10.5 3 8c.03-2.72 1.49-6 4.5-6C9.37 2 10 3.8 10 5.5c0 3.11-2 5.66-2 8.68V16a2 2 0 1 1-4 0ZM20 20v-2.38c0-2.12 1.03-3.12 1-5.62-.03-2.72-1.49-6-4.5-6C14.63 6 14 7.8 14 9.5c0 3.11 2 5.66 2 8.68V20a2 2 0 1 0 4 0ZM16 17h4M4 13h4"/>',
  repeat:'<path d="m17 2 4 4-4 4"/><path d="M3 11v-1a4 4 0 0 1 4-4h14"/><path d="m7 22-4-4 4-4"/><path d="M21 13v1a4 4 0 0 1-4 4H3"/>',
  layers:'<path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"/><path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"/><path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"/>',
  gear:'<path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/>',
  msg:'<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>',
  dl:'<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5"/><path d="M12 15V3"/>',
  star:'<path d="M12 2l3 6.5 7 .9-5.1 4.8 1.3 7L12 17.8 5.8 21.2l1.3-7L2 9.4l7-.9z"/>',
  shield:'<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
  link:'<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>'
};
const ic = (n, col='currentColor', s=20) => `<svg aria-hidden="true" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="${col}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${I[n]}</svg>`;
const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const fmt = n => Math.round(n).toLocaleString('en-US');


// ================= Data tetap =================
const BELTS = [
  {nm:'Putih',  col:'#ffffff'}, {nm:'Kuning', col:'#eab308'}, {nm:'Hijau', col:'#15803d'},
  {nm:'Biru',   col:'#1d4ed8'}, {nm:'Merah',  col:'#c1121f'}, {nm:'Hitam', col:'#0a0a0a'}
];
const BRANCHES = ['MIQ BK5', 'MIQ Zenopy', 'Dewan BK2', 'Lestari Putra'];
// Pangkat Arena (maya, berasingan daripada tali pinggang sebenar)
const RANKS = [
  {nm:'Putih', xp:0}, {nm:'Kuning', xp:500}, {nm:'Hijau', xp:1500},
  {nm:'Biru', xp:3000}, {nm:'Merah', xp:5000}, {nm:'Hitam', xp:8000}
];
const GAMES = [
  {id:'matsogi', nm:'Matsogi Reflex', d:'Serang Chong, elak Hong', icon:'zap', ready:true, store:'mats'},
  {id:'run', nm:'Dojang Run', d:'Lari, lompat dan tendang papan', icon:'feet', ready:true, store:'run'},
  {id:'duel', nm:'Duel Refleks', d:'Siapa tekan dahulu bila SIJAK!', icon:'zap', ready:true, store:'duel', mp:true},
  {id:'tarik', nm:'Tarik Tali', d:'Tarik tali pinggang hitam ke pihak anda', icon:'feet', ready:true, store:'tarik', mp:true},
  {id:'klumba', nm:'Kyokpa Lumba', d:'Siapa paling tepat memecah papan', icon:'target', ready:true, store:'klumba', mp:true},
  {id:'serang', nm:'Serang & Tangkis', d:'Bergilir menyerang dan menangkis', icon:'shield', ready:true, store:'serang', mp:true},
  {id:'tangkis', nm:'Tangkis!', d:'Tangkis serangan dari 4 arah', icon:'shield', ready:true, store:'tgk'},
  {id:'kyokpa', nm:'Kyokpa Timing', d:'Pecahkan papan tepat masa', icon:'target', ready:true, store:'kyok'},
  {id:'kuiz', nm:'Kuiz Asas', d:'Kiraan dan arahan dalam kelas', icon:'lang', ready:true, store:'kuiz'},
  {id:'memori', nm:'Memori Padan', d:'Cari 2 kad nombor atau gambar yang sama', icon:'grid', ready:true, store:'memo'},
  {id:'sabum', nm:'Ikut Sabum', d:'Ulang urutan pad yang menyala', icon:'repeat', ready:true, store:'sim'},
  {id:'tali', nm:'Susun Tali Pinggang', d:'Susun ikut turutan Kup', icon:'layers', ready:true, store:'belt'},
  {id:'tul', nm:'Susun Tul', d:'Susun pergerakan ikut turutan', icon:'list'},
  {id:'teori', nm:'Teori Grading Quest', d:'Makna Tul dan sejarah ITF', icon:'book'}
];
const LEVELS = [
  {id:'putih', nm:'Putih',  col:'#ffffff', cues:15, win:1400, pass:750, trap:0,   feint:0,   combo:0,   desc:'Pad biru sahaja'},
  {id:'kuning',nm:'Kuning', col:'#eab308', cues:18, win:1200, pass:680, trap:.15, feint:0,   combo:0,   desc:'Umpan merah mula muncul'},
  {id:'hijau', nm:'Hijau',  col:'#15803d', cues:20, win:1050, pass:620, trap:.22, feint:0,   combo:.15, desc:'Lebih laju + kombinasi'},
  {id:'biru',  nm:'Biru',   col:'#1d4ed8', cues:22, win:950,  pass:570, trap:.25, feint:.08, combo:.25, desc:'Tipuan: biru bertukar merah'},
  {id:'merah', nm:'Merah',  col:'#c1121f', cues:24, win:850,  pass:530, trap:.28, feint:.12, combo:.3,  desc:'Tekanan tinggi'},
  {id:'hitam', nm:'Hitam',  col:'#0a0a0a', cues:26, win:750,  pass:490, trap:.3,  feint:.18, combo:.4,  desc:'Tahap Sabum'}
];
const PASS_ACC = 0.8;
// Kyokpa: sets = set papan; hits = papan dalam satu set; zone = lebar zon (%); speed = kitaran/saat
const KLEVELS = [
  {id:'putih', nm:'Putih',  col:'#ffffff', sets:8, hits:1, zone:26, speed:.55, desc:'Satu papan, zon besar'},
  {id:'kuning',nm:'Kuning', col:'#eab308', sets:8, hits:1, zone:21, speed:.7,  desc:'Zon lebih kecil'},
  {id:'hijau', nm:'Hijau',  col:'#15803d', sets:8, hits:2, zone:18, speed:.8,  desc:'2 papan berturut-turut'},
  {id:'biru',  nm:'Biru',   col:'#1d4ed8', sets:8, hits:2, zone:15, speed:.95, desc:'2 papan, lebih laju'},
  {id:'merah', nm:'Merah',  col:'#c1121f', sets:8, hits:3, zone:13, speed:1.1, desc:'3 papan berturut-turut'},
  {id:'hitam', nm:'Hitam',  col:'#0a0a0a', sets:8, hits:3, zone:11, speed:1.25,desc:'Tahap Sabum'}
];
const KPASS = 6; // set papan yang mesti pecah daripada 8
// Kuiz Asas — ejaan diluluskan pengguna (Hana/Yosot/Ilgop/Yodol, Baro)
const Q_COUNT = [['Hana','1'],['Dul','2'],['Set','3'],['Net','4'],['Dasot','5'],['Yosot','6'],['Ilgop','7'],['Yodol','8'],['Ahop','9'],['Yol','10']];
const Q_CMD = [['Charyot','Siap sedia (perhatian)'],['Kyong-Ye','Tunduk hormat'],['Junbi','Bersedia'],['Sijak','Mula'],['Goman','Berhenti'],
  ['Baro','Kembali ke kedudukan sedia'],['Swiyo','Rehat'],['Haessan','Bersurai'],['Dwiro Torro','Pusing ke belakang'],
  ['Dojang','Dewan latihan'],['Dobok','Pakaian latihan'],['Sabum','Jurulatih'],['Tul','Corak'],['Matsogi','Sparring'],['Kihap','Jeritan semangat']];
const QLEVELS = [
  {id:'kiraan', nm:'Kiraan', col:'#f5c400', desc:'Nombor 1 hingga 10'},
  {id:'arahan', nm:'Arahan', col:'#6b5200', desc:'Arahan dan istilah dojang'},
  {id:'campur', nm:'Campur', col:'#0a0a0a', desc:'Semua istilah, bercampur'}
];
const QN = 10, QPASS = 8;
const MLEVELS = [
  {id:'mudah', nm:'Mudah', col:'#f5c400', pairs:6, cols:3, desc:'6 pasang · nombor'},
  {id:'sederhana', nm:'Sederhana', col:'#6b5200', pairs:8, cols:4, desc:'8 pasang · gambar'},
  {id:'sukar', nm:'Sukar', col:'#0a0a0a', pairs:10, cols:4, desc:'10 pasang · nombor dan gambar'}
];
// Gambar memori: ikon + warna latar (setiap gambar warna berbeza supaya mudah dikenal)
const M_PICS = [
  {id:'trophy', bg:'#f5c400', fg:'#0a0a0a', nm:'Piala'},
  {id:'medal', bg:'#0a0a0a', fg:'#f5c400', nm:'Pingat'},
  {id:'star', bg:'#15803d', fg:'#ffffff', nm:'Bintang'},
  {id:'target', bg:'#1d4ed8', fg:'#ffffff', nm:'Sasaran'},
  {id:'shield', bg:'#c1121f', fg:'#ffffff', nm:'Perisai'},
  {id:'zap', bg:'#ff6a13', fg:'#0a0a0a', nm:'Kilat'},
  {id:'flame', bg:'#8b5cf6', fg:'#ffffff', nm:'Api'},
  {id:'crown', bg:'#14b8a6', fg:'#0a0a0a', nm:'Mahkota'},
  {id:'heart', bg:'#ec4899', fg:'#ffffff', nm:'Hati'},
  {id:'feet', bg:'#ffffff', fg:'#0a0a0a', nm:'Tapak kaki'}
];
const SLEVELS = [
  {id:'mudah', nm:'Mudah', col:'#f5c400', pads:4, on:650, gap:260, target:6, desc:'4 pad · perlahan'},
  {id:'sederhana', nm:'Sederhana', col:'#6b5200', pads:6, on:520, gap:200, target:8, desc:'6 pad · sederhana'},
  {id:'sukar', nm:'Sukar', col:'#0a0a0a', pads:6, on:400, gap:150, target:10, desc:'6 pad · laju'}
];
// Pad: warna + ikon (ikon membantu pemain yang sukar membezakan warna) + nada bunyi
const S_PADS = [
  {bg:'#f5c400', fg:'#0a0a0a', icon:'star',   hz:330},
  {bg:'#1d4ed8', fg:'#ffffff', icon:'zap',    hz:392},
  {bg:'#15803d', fg:'#ffffff', icon:'heart',  hz:440},
  {bg:'#c1121f', fg:'#ffffff', icon:'flame',  hz:523},
  {bg:'#ff6a13', fg:'#0a0a0a', icon:'crown',  hz:587},
  {bg:'#8b5cf6', fg:'#ffffff', icon:'target', hz:659}
];
// Turutan tali pinggang ITF (sumber: itftaekwondo.com/belt-colour-meanings)
const B_ALL = [
  {nm:'Putih', kup:'10 Kup', c:'#ffffff'},
  {nm:'Putih jalur kuning', kup:'9 Kup', c:'#ffffff', tip:'#eab308'},
  {nm:'Kuning', kup:'8 Kup', c:'#eab308'},
  {nm:'Kuning jalur hijau', kup:'7 Kup', c:'#eab308', tip:'#15803d'},
  {nm:'Hijau', kup:'6 Kup', c:'#15803d'},
  {nm:'Hijau jalur biru', kup:'5 Kup', c:'#15803d', tip:'#1d4ed8'},
  {nm:'Biru', kup:'4 Kup', c:'#1d4ed8'},
  {nm:'Biru jalur merah', kup:'3 Kup', c:'#1d4ed8', tip:'#c1121f'},
  {nm:'Merah', kup:'2 Kup', c:'#c1121f'},
  {nm:'Merah jalur hitam', kup:'1 Kup', c:'#c1121f', tip:'#0a0a0a'},
  {nm:'Hitam', kup:'1 Dan ke atas', c:'#0a0a0a'}
];
const B_MEAN = {Putih:'Kesucian: pelajar baru yang belum ada ilmu Taekwon-Do', Kuning:'Bumi: tempat benih berakar, asas mula dibina', Hijau:'Tumbuhan yang membesar: kemahiran mula berkembang',
  Biru:'Langit: arah pokok membesar, latihan semakin maju', Merah:'Bahaya: pelajar perlu kawalan diri, lawan perlu berhati-hati', Hitam:'Lawan kepada putih: kematangan dan kecekapan'};
const BLEVELS = [
  {id:'mudah', nm:'Mudah', col:'#f5c400', full:true, names:true, time:0, maxErr:1, desc:'6 warna utama'},
  {id:'sederhana', nm:'Sederhana', col:'#6b5200', full:false, names:true, time:0, maxErr:2, desc:'11 tali pinggang, termasuk berjalur'},
  {id:'sukar', nm:'Sukar', col:'#0a0a0a', full:false, names:false, time:30, maxErr:2, desc:'11 tali pinggang, tanpa nama, 30 saat'}
];
const beltBar = (b, w) => `<span class="bbar" style="background:${b.c};${w?'width:'+w+';':''}">${b.tip?`<span class="btip" style="background:${b.tip}"></span>`:''}</span>`;
const TGLEVELS = [
  {id:'mudah', nm:'Mudah', col:'#f5c400', n:16, travel:1700, dbl:0, pass:.75, desc:'16 serangan · perlahan'},
  {id:'sederhana', nm:'Sederhana', col:'#6b5200', n:20, travel:1250, dbl:.2, pass:.8, desc:'20 serangan · kadang-kadang berganda'},
  {id:'sukar', nm:'Sukar', col:'#0a0a0a', n:24, travel:900, dbl:.35, pass:.8, desc:'24 serangan · laju'}
];
// ---- Cabaran Harian: 3 cabaran sehari, sama untuk semua pemain (ikut tarikh) ----
const DAILY_POOL = [
  {id:'m1', g:'matsogi', t:'Matsogi Reflex: ketepatan 80% atau lebih', xp:60, test:r => r.game==='matsogi' && r.acc >= 0.8},
  {id:'m2', g:'matsogi', t:'Matsogi Reflex: purata reaksi 650 ms atau kurang', xp:70, test:r => r.game==='matsogi' && r.avg > 0 && r.avg <= 650},
  {id:'r1', g:'run', t:'Dojang Run: lari sejauh 300 m', xp:60, test:r => r.game==='run' && r.m >= 300},
  {id:'r2', g:'run', t:'Dojang Run: lari sejauh 600 m', xp:90, test:r => r.game==='run' && r.m >= 600},
  {id:'r3', g:'run', t:'Dojang Run: tendang 3 papan dalam satu larian', xp:70, test:r => r.game==='run' && r.boards >= 3},
  {id:'k1', g:'kyokpa', t:'Kyokpa Timing: 3 Sempurna dalam satu pusingan', xp:60, test:r => r.game==='kyokpa' && r.perfect >= 3},
  {id:'k2', g:'kyokpa', t:'Kyokpa Timing: pecahkan 6 set papan', xp:70, test:r => r.game==='kyokpa' && r.broken >= 6},
  {id:'q1', g:'kuiz', t:'Kuiz Asas: dapat 8/10 atau lebih', xp:60, test:r => r.game==='kuiz' && r.correct >= 8},
  {id:'q2', g:'kuiz', t:'Kuiz Asas: dapat 10/10', xp:100, test:r => r.game==='kuiz' && r.correct === 10},
  {id:'e1', g:'memori', t:'Memori Padan: siapkan dengan 2 bintang', xp:50, test:r => r.game==='memori' && r.stars >= 2},
  {id:'e2', g:'memori', t:'Memori Padan: siapkan dengan 3 bintang', xp:80, test:r => r.game==='memori' && r.stars === 3},
  {id:'s1', g:'sabum', t:'Ikut Sabum: capai 6 langkah', xp:60, test:r => r.game==='sabum' && r.len >= 6},
  {id:'s2', g:'sabum', t:'Ikut Sabum: capai 9 langkah', xp:90, test:r => r.game==='sabum' && r.len >= 9},
  {id:'b1', g:'tali', t:'Susun Tali Pinggang: tanpa sebarang kesilapan', xp:60, test:r => r.game==='tali' && r.err === 0},
  {id:'t1', g:'tangkis', t:'Tangkis!: tangkis 12 serangan dalam satu pusingan', xp:60, test:r => r.game==='tangkis' && r.blocked >= 12},
  {id:'p1', g:'berdua', t:'Main berdua: main mana-mana game 2 pemain', xp:50, test:r => ['duel','tarik','klumba','serang'].includes(r.game)}
];
const DAILY_ALL = 100;
function dailyPick(day){
  let h = 2166136261; for (const c of day) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619); }
  const rand = () => { h = Math.imul(h ^ (h >>> 15), 2246822507); h = Math.imul(h ^ (h >>> 13), 3266489909); return ((h ^= h >>> 16) >>> 0) / 4294967296; };
  const out = [], used = new Set(), pool = DAILY_POOL.slice();
  while (out.length < 3 && pool.length) {
    const c = pool.splice(Math.floor(rand()*pool.length), 1)[0];
    if (used.has(c.g)) continue; used.add(c.g); out.push(c);
  }
  return out;
}
function dailyState(){
  const day = dkey(new Date());
  if (!S.daily || S.daily.date !== day) S.daily = Object.assign({streak:0, lastAll:null, total:0}, S.daily || {}, {date:day, done:[], all:false});
  return {day, list: dailyPick(day)};
}
function dailyCheck(r){
  if (!r) return [];
  const {day, list} = dailyState(), d = S.daily, got = [];
  list.forEach(c => {
    if (d.done.includes(c.id)) return;
    let ok = false; try { ok = !!c.test(r); } catch(e) {}
    if (ok) { d.done.push(c.id); got.push({t:c.t, xp:c.xp}); S.xp += c.xp; S.days[day] = (S.days[day]||0) + c.xp; }
  });
  if (!d.all && list.every(c => d.done.includes(c.id))) {
    d.all = true; d.total = (d.total||0) + 1;
    const y = new Date(); y.setDate(y.getDate()-1);
    d.streak = d.lastAll === dkey(y) ? (d.streak||0) + 1 : 1;
    d.lastAll = day;
    S.xp += DAILY_ALL; S.days[day] = (S.days[day]||0) + DAILY_ALL;
    got.push({t:'Semua cabaran hari ini selesai!', xp:DAILY_ALL, all:true});
  }
  return got;
}
function dailyBanner(list){
  if (!list || !list.length) return '';
  return `<div class="card" style="padding:14px;display:flex;flex-direction:column;gap:8px;border:2px solid var(--ok)">
    <span class="label" style="color:var(--ok)">Cabaran harian selesai</span>
    ${list.map(c => `<div style="display:flex;justify-content:space-between;gap:10px;font-size:13px;font-weight:600"><span>${c.all ? '🏆 ' : '✓ '}${esc(c.t)}</span><span style="color:var(--ok);white-space:nowrap">+${c.xp} XP</span></div>`).join('')}
  </div>`;
}
function dailyCard(){
  const {list} = dailyState(), d = S.daily, n = list.filter(c => d.done.includes(c.id)).length;
  const href = g => g === 'berdua' ? '#berdua' : '#'+g;
  return `<section class="card daily">
    <div class="sechead"><h2 style="font-size:18px;font-weight:700">Cabaran harian</h2><span class="pill ${d.all?'ok':'y'}">${d.all ? 'Selesai!' : n+'/3'}</span></div>
    <div class="dbar" aria-hidden="true">${list.map(c => `<i class="${d.done.includes(c.id)?'on':''}"></i>`).join('')}</div>
    ${list.map(c => { const done = d.done.includes(c.id); return `<div class="drow ${done?'done':''}">
      <span class="chk" role="img" aria-label="${done?'Selesai':'Belum selesai'}">${done ? '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>' : ''}</span>
      <span class="tx"><b>${esc(c.t)}</b><span>+${c.xp} XP</span></span>
      ${done ? '' : `<a href="${href(c.g)}">Main</a>`}</div>`; }).join('')}
    <span class="muted" style="font-size:12px">${d.all ? `Bonus +${DAILY_ALL} XP diterima. Cabaran baharu esok!` : `Selesaikan ketiga-tiga untuk bonus +${DAILY_ALL} XP.`}${d.streak ? ` · Streak cabaran: ${d.streak} hari` : ''}</span>
  </section>`;
}
const levelsOf = id => id === 'tangkis' ? TGLEVELS : id === 'tali' ? BLEVELS : id === 'sabum' ? SLEVELS : id === 'kyokpa' ? KLEVELS : id === 'kuiz' ? QLEVELS : id === 'memori' ? MLEVELS : LEVELS;
const BADGES = [
  {id:'first',  nm:'Langkah pertama', test:s => s.rounds >= 1},
  {id:'r450',   nm:'Refleks 450',     test:(s,r) => r && r.game==='matsogi' && r.avg && r.avg <= 450},
  {id:'clean',  nm:'Tanpa umpan',     test:(s,r) => r && r.game==='matsogi' && r.li >= 1 && r.trapHit === 0 && r.early === 0},
  {id:'combo',  nm:'Raja kombo',      test:(s,r) => r && r.game==='matsogi' && r.bestStreak >= 15},
  {id:'k1',     nm:'Papan pertama',   test:(s,r) => r && r.game==='kyokpa' && r.broken >= 1},
  {id:'kperf',  nm:'Tepat sempurna',  test:(s,r) => r && r.game==='kyokpa' && r.perfect >= 5},
  {id:'kall',   nm:'Semua pecah',     test:(s,r) => r && r.game==='kyokpa' && r.broken === r.sets},
  {id:'ktop',   nm:'Pemecah Sabum',   test:s => s.kyok.passedTop === true},
  {id:'q1',     nm:'Pakar kiraan',    test:s => s.kuiz.unlocked >= 1},
  {id:'q10',    nm:'Kuiz 10/10',      test:(s,r) => r && r.game==='kuiz' && r.correct === QN},
  {id:'qtop',   nm:'Lulus semua kuiz',test:s => s.kuiz.passedTop === true},
  {id:'m3',     nm:'Ingatan 3 bintang', test:(s,r) => r && r.game==='memori' && r.stars === 3},
  {id:'mtop',   nm:'Raja memori',     test:s => s.memo.passedTop === true},
  {id:'s10',    nm:'Ingatan panjang', test:(s,r) => r && r.game==='sabum' && r.len >= 10},
  {id:'stop',   nm:'Murid Sabum',     test:s => s.sim.passedTop === true},
  {id:'bperf',  nm:'Susun sempurna',  test:(s,r) => r && r.game==='tali' && r.li >= 1 && r.err === 0},
  {id:'btop',   nm:'Pakar tali pinggang', test:s => s.belt.passedTop === true},
  {id:'r500',   nm:'Pelari 500 m',    test:(s,r) => r && r.game==='run' && r.m >= 500},
  {id:'r2000',  nm:'Pelari Sabum',    test:(s,r) => r && r.game==='run' && r.m >= 2000},
  {id:'d1',     nm:'Duel pertama',    test:s => s.duel.plays >= 1},
  {id:'d10',    nm:'Juara gelanggang', test:s => s.duel.plays >= 10},
  {id:'tt1',    nm:'Tarik tali pertama', test:s => s.tarik.plays >= 1},
  {id:'kl1',    nm:'Lumba Kyokpa pertama', test:s => s.klumba.plays >= 1},
  {id:'dc1',    nm:'Cabaran pertama', test:s => s.daily && s.daily.total >= 1},
  {id:'dc7',    nm:'Cabaran 7 hari',  test:s => s.daily && s.daily.streak >= 7},
  {id:'st1',    nm:'Serang & Tangkis pertama', test:s => s.serang.plays >= 1},
  {id:'tg100',  nm:'Perisai besi',    test:(s,r) => r && r.game==='tangkis' && r.blocked === r.n},
  {id:'tgtop',  nm:'Pakar tangkisan', test:s => s.tgk.passedTop === true},
  {id:'rk10',   nm:'Pemecah papan',   test:(s,r) => r && r.game==='run' && r.boards >= 10},
  {id:'streak3',nm:'Streak 3 hari',   test:s => dayStreak(s) >= 3},
  {id:'rajin',  nm:'Rajin berlatih',  test:s => s.rounds >= 20},
  {id:'p0', nm:'Matsogi Putih',  test:s => s.mats.unlocked >= 1},
  {id:'p1', nm:'Matsogi Kuning', test:s => s.mats.unlocked >= 2},
  {id:'p2', nm:'Matsogi Hijau',  test:s => s.mats.unlocked >= 3},
  {id:'p3', nm:'Matsogi Biru',   test:s => s.mats.unlocked >= 4},
  {id:'p4', nm:'Matsogi Merah',  test:s => s.mats.unlocked >= 5},
  {id:'p5', nm:'Sabum muda',     test:s => s.mats.passedTop === true}
];


// ================= Simpanan (telefon ini sahaja) =================
const KEY = 'miq-arena-v1';
const fresh = () => ({settings:{sound:true, vib:true, lang:'ms'}, profile:null, xp:0, rounds:0, days:{}, badges:{}, last:'matsogi', mats:{unlocked:0, best:{}, bestRt:null, plays:0, passedTop:false}, kyok:{unlocked:0, best:{}, plays:0, passedTop:false}, kuiz:{unlocked:0, best:{}, plays:0, passedTop:false}, memo:{unlocked:0, best:{}, plays:0, passedTop:false}, sim:{unlocked:0, best:{}, plays:0, passedTop:false}, belt:{unlocked:0, best:{}, plays:0, passedTop:false}, run:{best:0, bestStars:0, plays:0, totalM:0}, duel:{plays:0, fastest:null, p2:'Lawan'}, tarik:{plays:0, bestRate:0}, klumba:{plays:0, perfect:0}, serang:{plays:0, blocks:0}, tgk:{unlocked:0, best:{}, plays:0, passedTop:false}});
let S = fresh(), storeOK = true;
try {
  const raw = localStorage.getItem(KEY);
  if (raw) { const o = JSON.parse(raw); S = Object.assign(fresh(), o); S.settings = Object.assign(fresh().settings, o.settings || {}); S.mats = Object.assign(fresh().mats, o.mats || {}); S.kyok = Object.assign(fresh().kyok, o.kyok || {}); S.kuiz = Object.assign(fresh().kuiz, o.kuiz || {}); S.memo = Object.assign(fresh().memo, o.memo || {}); S.sim = Object.assign(fresh().sim, o.sim || {}); S.belt = Object.assign(fresh().belt, o.belt || {}); S.run = Object.assign(fresh().run, o.run || {}); S.duel = Object.assign(fresh().duel, o.duel || {}); S.tarik = Object.assign(fresh().tarik, o.tarik || {}); S.klumba = Object.assign(fresh().klumba, o.klumba || {}); S.serang = Object.assign(fresh().serang, o.serang || {}); S.tgk = Object.assign(fresh().tgk, o.tgk || {}); }
} catch (e) { storeOK = false; }
function save(){ try { localStorage.setItem(KEY, JSON.stringify(S)); } catch(e) { storeOK = false; } }

const dkey = d => `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
function dayStreak(s){
  let d = new Date(), n = 0;
  if (!s.days[dkey(d)]) d.setDate(d.getDate()-1);
  while (s.days[dkey(d)]) { n++; d.setDate(d.getDate()-1); }
  return n;
}
function rankInfo(xp){
  let i = 0; while (i < RANKS.length-1 && xp >= RANKS[i+1].xp) i++;
  const cur = RANKS[i], next = RANKS[i+1];
  return {cur, next, pct: next ? Math.min(100, (xp-cur.xp)/(next.xp-cur.xp)*100) : 100};
}
const initials = n => (n||'?').trim().split(/\s+/).map(w=>w[0]).join('').slice(0,2).toUpperCase() || '?';
const beltOf = nm => BELTS.find(b=>b.nm===nm) || BELTS[0];


// ================= Utiliti dikongsi semua game =================
let timers = [];
const later = (fn, ms) => { const t = setTimeout(fn, ms); timers.push(t); return t; };
const clearTimers = () => { timers.forEach(clearTimeout); timers = []; };
const rnd = (a,b) => a + Math.random()*(b-a);
// Getaran: ikut tetapan pengguna
const buzz = p => { if (S.settings && S.settings.vib === false) return; try { navigator.vibrate && navigator.vibrate(p); } catch(e){} };
function stopGame(){ if (G) { clearTimers(); if (G.raf) cancelAnimationFrame(G.raf); if (G.cleanup) G.cleanup(); G.phase = 'done'; G = null; } }
let toastT;
function toast(t, k){ const el = document.getElementById('toast'); if (!el) return; el.textContent = t; el.className = 'on '+k; clearTimeout(toastT); toastT = setTimeout(() => el.className = '', 520); }
const tri = x => { const f = x - Math.floor(x); return f < .5 ? f*2 : 2 - f*2; };
const shuffle = a => { a = a.slice(); for (let i = a.length-1; i > 0; i--) { const j = Math.floor(Math.random()*(i+1)); [a[i],a[j]] = [a[j],a[i]]; } return a; };


// ================= Rangka & navigasi =================
const app = document.getElementById('app');
function header(){
  const p = S.profile;
  return `<header class="top">
    <a class="logo" href="#laman" aria-label="MIQ Arena, laman utama">
      <img src="icons/icon-192.png" alt="" width="38" height="38" style="border-radius:10px;display:block">
      <span style="display:flex;flex-direction:column;color:#fff"><span class="word">MI<span class="q">Q</span> ARENA</span><span class="sub">TAEKWON-DO GAMES</span></span>
    </a>
    ${p ? `<span style="display:flex;gap:8px;align-items:center"><a href="#tetapan" aria-label="Tetapan" style="width:40px;height:40px;border-radius:12px;background:var(--ink2);display:grid;place-items:center">${ic('gear','#fff',18)}</a><a class="av" href="#profil" aria-label="Profil">${esc(initials(p.nama))}</a></span>` : ''}
  </header>${storeOK ? '' : '<div class="warnbar">Browser ini tidak benarkan simpanan. Rekod akan hilang bila halaman ditutup.</div>'}`;
}
function nav(cur){
  const it = (h, n, icn) => `<a href="#${h}" class="${cur===h?'on':''}" ${cur===h?'aria-current="page"':''}><span>${ic(icn, cur===h?'#0a0a0a':'#6b6b70', 18)}</span>${n}</a>`;
  return `<nav class="bn" aria-label="Menu utama">${it('laman','Laman','home')}${it('game','Game','pad')}${it('rekod','Rekod','trophy')}${it('profil','Profil','user')}</nav>`;
}

let G = null; // permainan aktif
function route(){
  stopGame();
  const h = location.hash.replace('#','');
  if (!S.profile) return viewProfil(true);
  if (h === 'matsogi') return viewMatsogi();
  if (h === 'kyokpa') return viewKyokpa();
  if (h === 'kuiz') return viewKuiz();
  if (h === 'memori') return viewMemori();
  if (h === 'sabum') return viewSabum();
  if (h === 'tali') return viewTali();
  if (h === 'run') return viewRun();
  if (h === 'duel') return viewDuel();
  if (h === 'tarik') return viewTarik();
  if (h === 'klumba') return viewKlumba();
  if (h === 'serang') return viewSerang();
  if (h === 'tangkis') return viewTangkis();
  if (h === 'game') return viewGames();
  if (h === 'tetapan') return viewTetapan();
  if (h === 'berdua') return viewBerdua();
  if (h === 'rekod') return viewRekod();
  if (h === 'profil') return viewProfil(false);
  return viewHome();
}
window.addEventListener('hashchange', route);
function go(h){ if (location.hash === '#'+h) route(); else location.hash = h; }


// ================= Laman utama =================
function viewHome(){
  const p = S.profile, r = rankInfo(S.xp), m = S.mats;
  const lg = GAMES.find(g => g.id === S.last && g.ready) || GAMES[0];
  const ls = S[lg.store], LV = levelsOf(lg.id);
  const lvl = (lg.id === 'run' || lg.mp) ? null : LV[Math.min(ls.unlocked, LV.length-1)];
  const lsub = lg.id === 'serang' ? 'Serang, tangkis, ulang! Cabar kawan anda.' : lg.id === 'klumba' ? 'Siapa paling tepat? Cabar kawan anda sekali lagi!' : lg.id === 'tarik' ? 'Siapa paling kuat? Cabar kawan anda sekali lagi!' : lg.id === 'duel' ? 'Cabar kawan atau keluarga anda sekali lagi!' : lg.id === 'run' ? (S.run.best ? 'Rekod anda: '+fmt(S.run.best)+' m. Boleh pergi lebih jauh?' : 'Lari, lompat dan tendang papan!') : ls.passedTop ? 'Semua tahap lulus. Pecahkan rekod anda!' : 'Tahap '+lvl.nm+' · '+lvl.desc;
  const badgeCount = Object.keys(S.badges).length;
  const games = gameCards();
  app.innerHTML = header() + `<main class="wide home">
    <section class="card" style="display:flex;flex-direction:column;gap:14px">
      <div class="ptitle"><h1 style="font-size:26px">Hai, ${esc(p.nama)}!</h1></div>
      <div class="row">
        <span class="pill"><span class="sw" style="background:${beltOf(p.belt).col}"></span>${esc(p.belt)}</span>
        <span class="pill muted">${esc(p.branch)}</span>
      </div>
      <div style="display:flex;flex-direction:column;gap:6px">
        <div style="display:flex;justify-content:space-between;font-size:12px">
          <span class="label">${r.next ? 'XP ke pangkat '+r.next.nm : 'Pangkat tertinggi'}</span>
          <span style="font-weight:600">${fmt(S.xp)}${r.next ? ' / '+fmt(r.next.xp) : ''}</span>
        </div>
        <div class="bar"><i style="width:${r.pct}%"></i></div>
        <span class="muted" style="font-size:12px">Pangkat Arena: <b style="color:var(--ink)">${r.cur.nm}</b> · berasingan daripada tali pinggang sebenar</span>
      </div>
      <div class="tiles">
        <div class="tile"><span class="k">STREAK</span><span class="v" style="display:flex;align-items:center;gap:4px">${ic('flame','#0a0a0a',16)}${dayStreak(S)}<small> hari</small></span></div>
        <div class="tile"><span class="k">LENCANA</span><span class="v">${badgeCount}<small> /${BADGES.length}</small></span></div>
        <div class="tile"><span class="k">TERPANTAS</span><span class="v">${m.bestRt ? m.bestRt+'<small> ms</small>' : '–'}</span></div>
      </div>
    </section>

    ${dailyCard()}

    <section class="dark" style="display:flex;flex-direction:column;gap:12px">
      <div class="stripe"></div>
      <span class="sub">${S.rounds ? 'SAMBUNG LATIHAN' : 'MULA DI SINI'}</span>
      <div style="display:flex;flex-direction:column;gap:4px">
        <h2 style="font-size:24px;font-weight:700;letter-spacing:-.025em">${lg.nm}</h2>
        <p style="margin:0;color:rgba(255,255,255,.75);line-height:20px;max-width:230px">${lsub}</p>
      </div>
      <a class="btn p" href="#${lg.id}" style="align-self:flex-start">${ic('play','#0a0a0a',16)}Main sekarang</a>
    </section>

    <section style="display:flex;flex-direction:column;gap:12px">
      ${mpHead('Main berdua', true)}
      <div class="grid2">${mpCards(false)}</div>
    </section>
    <section style="display:flex;flex-direction:column;gap:12px">
      <div class="sechead"><h2>Main sendiri</h2><span class="muted" style="font-size:12px">${GAMES.filter(g=>g.ready&&!g.mp).length} sedia · ${GAMES.filter(g=>!g.ready).length} akan datang</span></div>
      <div class="grid2">${games}</div>
    </section>
    ${ctaCard()}
  </main>` + nav('laman');
  window.scrollTo(0,0);
}

const mpStat = g => S[g.store].plays ? S[g.store].plays+' perlawanan' : 'Belum dimain';
function mpCards(big){
  return GAMES.filter(g => g.mp).map(g => `<a class="mpcard ${big?'mpbig':''}" href="#${g.id}"><span class="vs">VS</span>
    <span class="ic">${ic(g.icon,'#0a0a0a')}</span>
    ${big ? `<span class="txt"><b>${g.nm}</b><span class="d">${g.d}</span><span class="d" style="font-weight:600">${mpStat(g)}</span></span>` : `<b>${g.nm}</b><span class="d">${g.d}</span><span class="pill">2 pemain</span>`}
  </a>`).join('');
}
const mpHead = (t, link) => `<div class="sechead"><div class="mphead"><span class="dots" aria-hidden="true"><span style="background:var(--hong)"></span><span style="background:var(--chong)"></span></span><h2>${t}</h2></div>${link ? `<a href="#berdua" style="font-size:13px;font-weight:600">Lihat semua ›</a>` : ''}</div>`;
function gameCards(){
  return GAMES.filter(g => !g.mp).map(g => g.ready
    ? `<a class="gcard" href="#${g.id}"><span class="ic">${ic(g.icon,'#0a0a0a')}</span><b>${g.nm}</b><span class="d">${g.d}</span><span class="pill dark-p">${g.mp ? '2 pemain' : g.id==='run' ? (S.run.best ? 'Rekod '+fmt(S.run.best)+' m' : 'Baharu!') : S[g.store].passedTop ? 'Semua lulus' : 'Tahap '+Math.min(S[g.store].unlocked+1,levelsOf(g.id).length)+'/'+levelsOf(g.id).length}</span></a>`
    : `<div class="gcard soon"><span class="ic">${ic(g.icon,'#6b6b70')}</span><b class="muted">${g.nm}</b><span class="d">${g.d}</span><span class="pill" style="color:var(--muted)">${ic('lock','#6b6b70',12)}Akan datang</span></div>`
  ).join('');
}
function viewGames(){
  app.innerHTML = header() + `<main class="wide">
    <div style="display:flex;flex-direction:column;gap:4px">
      <div class="ptitle"><h1>Semua game</h1></div>
      <p class="muted" style="margin:0 0 0 14px">XP dan lencana dikongsi oleh semua game.</p>
    </div>
    <section style="display:flex;flex-direction:column;gap:12px">
      ${mpHead('Main berdua', true)}
      <div class="grid2">${mpCards(false)}</div>
    </section>
    <section style="display:flex;flex-direction:column;gap:12px">
      <div class="sechead"><h2>Main sendiri</h2></div>
      <div class="grid2">${gameCards()}</div>
    </section>
  </main>` + nav('game');
  window.scrollTo(0,0);
}

function viewBerdua(){
  app.innerHTML = header() + `<main class="wide">
    <section class="dark" style="display:flex;flex-direction:column;gap:10px;background:linear-gradient(135deg,#a3111a 0 49.5%,#0a0a0a 49.5% 50.5%,#1d4ed8 50.5% 100%)">
      <span class="sub">2 PEMAIN · SATU TELEFON</span>
      <h1 style="font-size:28px;line-height:34px;font-weight:700;letter-spacing:-.025em">Main berdua</h1>
      <p style="margin:0;line-height:20px;color:rgba(255,255,255,.88);max-width:300px">Cabar kawan, adik-beradik atau ibu bapa. Hong di atas, Chong di bawah.</p>
    </section>
    <div style="display:flex;flex-direction:column;gap:12px">${mpCards(true)}</div>
    <section class="card" style="padding:0;overflow:hidden">
      <h2 style="padding:16px 20px 10px;font-size:16px;font-weight:700">Cara bersedia</h2>
      <div class="trow"><span><b>1.</b> Letak telefon rata di tengah-tengah</span></div>
      <div class="trow"><span><b>2.</b> Pemain Hong duduk di atas, Chong di bawah</span></div>
      <div class="trow"><span><b>3.</b> Kedua-dua tekan bahagian sendiri untuk "Sedia"</span></div>
      <div class="trow"><span><b>4.</b> Hormat lawan selepas tamat: Charyot, Kyong-Ye!</span></div>
    </section>
    <p class="muted" style="margin:0;font-size:12px;line-height:18px;text-align:center">XP masuk ke profil pemilik telefon ini.</p>
  </main>` + nav('game');
  window.scrollTo(0,0);
}


// ================= Rekod =================
function viewRekod(){
  const days = [], lbl = ['Ahd','Isn','Sel','Rab','Kha','Jum','Sab'];
  for (let i = 6; i >= 0; i--) { const d = new Date(); d.setDate(d.getDate()-i); days.push({l: lbl[d.getDay()], v: S.days[dkey(d)]||0, today: i===0}); }
  const max = Math.max(1, ...days.map(d=>d.v));
  const weekXp = days.reduce((a,d)=>a+d.v,0);
  const m = S.mats;
  const recRows = LEVELS.filter(L => m.best[L.id]).map(L => {
    const b = m.best[L.id], dt = new Date(b.date);
    return `<div class="trow"><div style="display:flex;align-items:center;gap:10px"><span class="belt" style="width:28px;height:8px;background:${L.col}"></span><div style="display:flex;flex-direction:column"><b>${L.nm}</b><span class="muted" style="font-size:12px">${b.avg} ms · ${dt.toLocaleDateString(dateLocale(),{day:'numeric',month:'short'})}</span></div></div><b>${fmt(b.score)}</b></div>`;
  }).join('') || '<div class="trow"><span class="muted">Belum ada rekod. Main pusingan pertama anda!</span></div>';
  app.innerHTML = header() + `<main class="wide">
    <div style="display:flex;flex-direction:column;gap:4px">
      <div class="ptitle"><h1>Rekod saya</h1></div>
      <p class="muted" style="margin:0 0 0 14px">Bandingkan dengan diri sendiri, minggu demi minggu.</p>
    </div>
    <div class="grid2">
      <div class="dark" style="padding:16px;display:flex;flex-direction:column;gap:4px">
        <div class="stripe" style="right:-30px;top:auto;bottom:-30px;width:90px;height:90px"></div>
        <span class="sub">JUMLAH XP</span><span style="font-size:24px;font-weight:700">${fmt(S.xp)}</span>
        <span style="font-size:12px;color:rgba(255,255,255,.6)">+${fmt(weekXp)} minggu ini</span>
      </div>
      <div class="card" style="padding:16px;display:flex;flex-direction:column;gap:4px">
        <span class="label">Pusingan</span><span style="font-size:24px;font-weight:700">${S.rounds}</span>
        <span class="muted" style="font-size:12px">Streak ${dayStreak(S)} hari</span>
      </div>
    </div>
    <section class="card" style="display:flex;flex-direction:column;gap:10px">
      <h2 style="font-size:18px;font-weight:700">Cabaran harian</h2>
      <div class="tiles" style="grid-template-columns:repeat(2,minmax(0,1fr))">
        <div class="tile"><span class="k">HARI SELESAI</span><span class="v">${(S.daily && S.daily.total) || 0}</span></div>
        <div class="tile"><span class="k">STREAK</span><span class="v">${(S.daily && S.daily.streak) || 0}<small> hari</small></span></div>
      </div>
    </section>
    <section class="card" style="display:flex;flex-direction:column;gap:14px">
      <div class="sechead"><h2>Aktiviti 7 hari</h2><span class="muted" style="font-size:12px">XP sehari</span></div>
      <div class="chart" role="img" aria-label="XP setiap hari untuk 7 hari lepas: ${days.map(d=>d.l+' '+d.v).join(', ')}">
        ${days.map(d=>`<div><i class="${d.v===0?'z':(d.today?'t':'')}" style="height:${Math.max(4, d.v/max*100)}px"></i><span>${d.l}</span></div>`).join('')}
      </div>
    </section>
    <section class="card" style="display:flex;flex-direction:column;gap:10px">
      <h2 style="font-size:18px;font-weight:700">Duel Refleks</h2>
      <div class="tiles" style="grid-template-columns:repeat(2,minmax(0,1fr))">
        <div class="tile"><span class="k">DUEL DIMAIN</span><span class="v">${S.duel.plays}</span></div>
        <div class="tile"><span class="k">TERPANTAS</span><span class="v">${S.duel.fastest ? S.duel.fastest+'<small> ms</small>' : '–'}</span></div>
      </div>
    </section>
    <section class="card" style="display:flex;flex-direction:column;gap:10px">
      <h2 style="font-size:18px;font-weight:700">Tarik Tali dan Kyokpa Lumba</h2>
      <div class="tiles" style="grid-template-columns:repeat(2,minmax(0,1fr))">
        <div class="tile"><span class="k">TARIK TALI</span><span class="v">${S.tarik.plays}</span></div>
        <div class="tile"><span class="k">TEKANAN TERLAJU</span><span class="v">${S.tarik.bestRate ? S.tarik.bestRate+'<small> /saat</small>' : '–'}</span></div>
        <div class="tile"><span class="k">LUMBA KYOKPA</span><span class="v">${S.klumba.plays}</span></div>
        <div class="tile"><span class="k">SEMPURNA</span><span class="v">${S.klumba.perfect}</span></div>
        <div class="tile"><span class="k">SERANG & TANGKIS</span><span class="v">${S.serang.plays}</span></div>
        <div class="tile"><span class="k">TANGKISAN</span><span class="v">${S.serang.blocks}</span></div>
      </div>
    </section>
    <section class="card" style="display:flex;flex-direction:column;gap:10px">
      <h2 style="font-size:18px;font-weight:700">Dojang Run</h2>
      <div class="tiles">
        <div class="tile"><span class="k">REKOD</span><span class="v">${S.run.best ? fmt(S.run.best)+'<small> m</small>' : '–'}</span></div>
        <div class="tile"><span class="k">JUMLAH</span><span class="v">${fmt(S.run.totalM)}<small> m</small></span></div>
        <div class="tile"><span class="k">LARIAN</span><span class="v">${S.run.plays}</span></div>
      </div>
    </section>
    <section class="card" style="padding:0;overflow:hidden">
      <h2 style="padding:16px 20px 10px;font-size:18px;font-weight:700">Tangkis!: rekod terbaik</h2>
      <div class="thead label"><span>Tahap</span><span>Tangkisan</span></div>
      ${TGLEVELS.filter(L => S.tgk.best[L.id]).map(L => { const b = S.tgk.best[L.id];
        return `<div class="trow"><div style="display:flex;flex-direction:column"><b>${L.nm}</b><span class="muted" style="font-size:12px">${fmt(b.score)} markah</span></div><b>${b.blocked}/${L.n}</b></div>`; }).join('')
        || '<div class="trow"><span class="muted">Belum ada rekod.</span></div>'}
    </section>
    <section class="card" style="padding:0;overflow:hidden">
      <h2 style="padding:16px 20px 10px;font-size:18px;font-weight:700">Matsogi Reflex: rekod terbaik</h2>
      <div class="thead label"><span>Tahap</span><span>Markah</span></div>
      ${recRows}
    </section>
    <section class="card" style="padding:0;overflow:hidden">
      <h2 style="padding:16px 20px 10px;font-size:18px;font-weight:700">Kyokpa Timing: rekod terbaik</h2>
      <div class="thead label"><span>Tahap</span><span>Markah</span></div>
      ${KLEVELS.filter(L => S.kyok.best[L.id]).map(L => { const b = S.kyok.best[L.id], dt = new Date(b.date);
        return `<div class="trow"><div style="display:flex;align-items:center;gap:10px"><span class="belt" style="width:28px;height:8px;background:${L.col}"></span><div style="display:flex;flex-direction:column"><b>${L.nm}</b><span class="muted" style="font-size:12px">${b.broken}/${L.sets} pecah · ${dt.toLocaleDateString(dateLocale(),{day:'numeric',month:'short'})}</span></div></div><b>${fmt(b.score)}</b></div>`; }).join('')
        || '<div class="trow"><span class="muted">Belum ada rekod.</span></div>'}
    </section>
    <section class="card" style="padding:0;overflow:hidden">
      <h2 style="padding:16px 20px 10px;font-size:18px;font-weight:700">Kuiz Asas: rekod terbaik</h2>
      <div class="thead label"><span>Tahap</span><span>Betul</span></div>
      ${QLEVELS.filter(L => S.kuiz.best[L.id]).map(L => { const b = S.kuiz.best[L.id], dt = new Date(b.date);
        return `<div class="trow"><div style="display:flex;align-items:center;gap:10px"><span class="belt" style="width:28px;height:8px;background:${L.col}"></span><div style="display:flex;flex-direction:column"><b>${L.nm}</b><span class="muted" style="font-size:12px">${fmt(b.score)} markah · ${dt.toLocaleDateString(dateLocale(),{day:'numeric',month:'short'})}</span></div></div><b>${b.correct}/${QN}</b></div>`; }).join('')
        || '<div class="trow"><span class="muted">Belum ada rekod.</span></div>'}
    </section>
    <section class="card" style="padding:0;overflow:hidden">
      <h2 style="padding:16px 20px 10px;font-size:18px;font-weight:700">Memori Padan: rekod terbaik</h2>
      <div class="thead label"><span>Tahap</span><span>Bintang</span></div>
      ${MLEVELS.filter(L => S.memo.best[L.id]).map(L => { const b = S.memo.best[L.id];
        return `<div class="trow"><div style="display:flex;flex-direction:column"><b>${L.nm}</b><span class="muted" style="font-size:12px">${b.moves} cubaan · ${b.secs} saat</span></div><b>${'★'.repeat(b.stars)}<span class="muted">${'☆'.repeat(3-b.stars)}</span></b></div>`; }).join('')
        || '<div class="trow"><span class="muted">Belum ada rekod.</span></div>'}
    </section>
    <section class="card" style="padding:0;overflow:hidden">
      <h2 style="padding:16px 20px 10px;font-size:18px;font-weight:700">Ikut Sabum: rekod terbaik</h2>
      <div class="thead label"><span>Tahap</span><span>Urutan</span></div>
      ${SLEVELS.filter(L => S.sim.best[L.id]).map(L => { const b = S.sim.best[L.id];
        return `<div class="trow"><div style="display:flex;flex-direction:column"><b>${L.nm}</b><span class="muted" style="font-size:12px">${fmt(b.score)} markah</span></div><b>${b.len} langkah</b></div>`; }).join('')
        || '<div class="trow"><span class="muted">Belum ada rekod.</span></div>'}
    </section>
    <section class="card" style="padding:0;overflow:hidden">
      <h2 style="padding:16px 20px 10px;font-size:18px;font-weight:700">Susun Tali Pinggang: rekod terbaik</h2>
      <div class="thead label"><span>Tahap</span><span>Masa</span></div>
      ${BLEVELS.filter(L => S.belt.best[L.id]).map(L => { const b = S.belt.best[L.id];
        return `<div class="trow"><div style="display:flex;flex-direction:column"><b>${L.nm}</b><span class="muted" style="font-size:12px">${b.err} kesilapan · ${fmt(b.score)} markah</span></div><b>${b.secs} saat</b></div>`; }).join('')
        || '<div class="trow"><span class="muted">Belum ada rekod.</span></div>'}
    </section>
    <section style="display:flex;flex-direction:column;gap:12px">
      <div class="sechead"><h2>Lencana</h2><span class="muted" style="font-size:12px">${Object.keys(S.badges).length} daripada ${BADGES.length}</span></div>
      <div class="badges">${BADGES.map(b=>{const got=!!S.badges[b.id];return `<div class="badge ${got?'':'no'}"><span class="c">${ic('star', got?'#0a0a0a':'#6b6b70',18)}</span><small>${b.nm}</small><span class="sr" style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)">${got?'diperoleh':'belum diperoleh'}</span></div>`}).join('')}</div>
    </section>
  </main>` + nav('rekod');
  window.scrollTo(0,0);
}


// ================= Profil =================
function viewProfil(first){
  const p = S.profile || {nama:'', belt:'Putih', branch:BRANCHES[0]};
  let st = {belt:p.belt, branch:p.branch, confirm:false};
  const draw = () => {
    const nameVal = (document.getElementById('nama')||{}).value ?? p.nama;
    app.innerHTML = header() + `<main>
      <div style="display:flex;flex-direction:column;gap:4px">
        ${first ? langPicker() : ''}
        <div class="ptitle"><h1>${first ? 'Selamat datang!' : 'Profil pemain'}</h1></div>
        <p class="muted" style="margin:0 0 0 14px">${first ? 'Isi profil sekali. Ia dikongsi oleh semua game MIQ Arena.' : 'Diisi sekali, dikongsi oleh semua game.'}</p>
      </div>
      <form class="card" id="pf" style="display:flex;flex-direction:column;gap:18px" novalidate>
        <div style="display:flex;align-items:center;gap:14px">
          <span class="av big" id="avb">${esc(initials(nameVal))}</span>
          <div style="display:flex;flex-direction:column;gap:2px"><b style="font-size:16px" id="nmb">${esc(nameVal || 'Nama anda')}</b><span class="muted" style="font-size:12px">${esc(st.belt)} · ${esc(st.branch)}</span></div>
        </div>
        <div class="field">
          <label for="nama" class="label">Nama panggilan</label>
          <input id="nama" maxlength="20" autocomplete="off" placeholder="Danish" value="${esc(nameVal)}">
          <span class="err" id="nerr" role="alert"></span>
          <span class="muted" style="font-size:12px">Nama pendek sahaja. Jangan guna nama penuh.</span>
        </div>
        <div class="field">
          <span class="label">Tali pinggang sebenar</span>
          <div class="chips" style="grid-template-columns:repeat(3,minmax(0,1fr))">
            ${BELTS.map(b=>`<button type="button" class="chip ${st.belt===b.nm?'on':''}" data-belt="${b.nm}" aria-pressed="${st.belt===b.nm}"><span class="sw" style="width:28px;background:${b.col}"></span>${b.nm}</button>`).join('')}
          </div>
        </div>
        <div class="field">
          <span class="label">Cawangan</span>
          <div class="chips" style="grid-template-columns:repeat(2,minmax(0,1fr))">
            ${BRANCHES.map(c=>`<button type="button" class="chip ${st.branch===c?'on':''}" data-br="${c}" aria-pressed="${st.branch===c}">${c}</button>`).join('')}
          </div>
        </div>
      </form>
      <div class="note">${ic('shield','#0a0a0a',18)}<span>Rekod disimpan dalam telefon ini sahaja. Tiada foto, tiada nombor telefon, dan tiada akaun diperlukan.</span></div>
      <button class="btn p full" id="saveBtn" style="font-size:16px;padding:16px">${first ? 'Mula bermain' : 'Simpan profil'}</button>
      ${first ? '' : `<a class="btn g full" href="#tetapan">${ic('gear','#0a0a0a',16)}Tetapan, privasi dan padam data</a>`}
    </main>` + (first ? '' : nav('profil'));
    const inp = document.getElementById('nama');
    inp.oninput = () => {
      document.getElementById('nerr').textContent = '';
      document.getElementById('avb').textContent = initials(inp.value);
      document.getElementById('nmb').textContent = inp.value || 'Nama anda';
    };
    bindLang(draw);
    app.querySelectorAll('[data-belt]').forEach(b => b.onclick = () => { st.belt = b.dataset.belt; draw(); });
    app.querySelectorAll('[data-br]').forEach(b => b.onclick = () => { st.branch = b.dataset.br; draw(); });
    document.getElementById('pf').onsubmit = e => { e.preventDefault(); doSave(); };
    document.getElementById('saveBtn').onclick = doSave;
  };
  const doSave = () => {
    const v = document.getElementById('nama').value.trim();
    if (!v) { document.getElementById('nerr').textContent = 'Masukkan nama panggilan dahulu.'; document.getElementById('nama').focus(); return; }
    S.profile = {nama:v, belt:st.belt, branch:st.branch};
    save(); go('laman');
  };
  draw();
  window.scrollTo(0,0);
}


// ================= Tetapan =================
const MIQ_DAFTAR = 'https://wasap.my/60129692051/DaftarKelasMIQ';
const MIQ_IG = 'https://www.instagram.com/miqtaekwondoacademy/';
function ctaCard(){
  return `<section class="dark" style="display:flex;flex-direction:column;gap:10px">
    <div class="stripe"></div>
    <span class="sub">MIQ TAEKWON-DO ACADEMY</span>
    <h2 style="font-size:22px;font-weight:700;letter-spacing:-.02em;max-width:240px">Belum jadi pelajar MIQ?</h2>
    <p style="margin:0;line-height:20px;color:rgba(255,255,255,.78);max-width:280px">Cuba kelas percuma di BK5 Bandar Kinrara, Zenopy Seri Kembangan, BK2 atau Lestari Putra. Kelas dari umur 5 tahun.</p>
    <a class="btn p" href="${MIQ_DAFTAR}" target="_blank" rel="noopener" style="align-self:flex-start">${ic('msg','#0a0a0a',16)}Daftar kelas percuma</a>
    <span style="font-size:12px;color:rgba(255,255,255,.6)">WhatsApp 011-5423 9873 · Instagram @miqtaekwondoacademy</span>
  </section>`;
}
let installEvt = null;
window.addEventListener('beforeinstallprompt', e => { e.preventDefault(); installEvt = e; if (location.hash === '#tetapan') viewTetapan(); });
const isStandalone = () => { try { return matchMedia('(display-mode: standalone)').matches || navigator.standalone === true; } catch(e) { return false; } };
const isIOS = () => /iphone|ipad|ipod/i.test(navigator.userAgent);
function viewTetapan(confirm){
  const st = S.settings;
  const sw = (id, on, label, sub) => `<div class="trow" style="gap:12px"><div style="display:flex;flex-direction:column;gap:2px"><b style="font-size:14px">${label}</b><span class="muted" style="font-size:12px">${sub}</span></div>
    <button class="chip ${on?'on':''}" id="${id}" role="switch" aria-checked="${on}" style="min-height:40px;min-width:84px;flex-direction:row">${on?'Hidup':'Mati'}</button></div>`;
  let install = '';
  if (isStandalone()) install = `<div class="trow"><span>App sudah dipasang di telefon ini ✓</span></div>`;
  else if (installEvt) install = `<div class="trow" style="gap:12px"><span>Pasang MIQ Arena di skrin utama telefon. Boleh dibuka tanpa internet.</span><button class="btn p" id="doInstall" style="flex:none">${ic('dl','#0a0a0a',16)}Pasang</button></div>`;
  else if (isIOS()) install = `<div class="trow"><span>iPhone: tekan butang <b>Kongsi</b> di Safari, kemudian <b>Tambah ke Skrin Utama</b>.</span></div>`;
  else install = `<div class="trow"><span>Buka menu browser (⋮), kemudian pilih <b>Pasang app</b> atau <b>Tambah ke skrin utama</b>.</span></div>`;
  app.innerHTML = header() + `<main>
    <div class="ptitle"><h1>Tetapan</h1></div>
    ${langPicker()}
    <section class="card" style="padding:0;overflow:hidden">
      <h2 style="padding:16px 20px 6px;font-size:16px;font-weight:700">Bunyi dan getaran</h2>
      ${sw('tSound', st.sound, 'Bunyi', 'Nada dalam Ikut Sabum')}
      ${sw('tVib', st.vib, 'Getaran', 'Getaran telefon bila betul atau salah')}
    </section>
    <section class="card" style="padding:0;overflow:hidden">
      <h2 style="padding:16px 20px 6px;font-size:16px;font-weight:700">Pasang app</h2>
      ${install}
    </section>
    <section class="card" style="display:flex;flex-direction:column;gap:10px">
      <h2 style="font-size:16px;font-weight:700">Untuk ibu bapa: privasi</h2>
      <ul style="margin:0;padding-left:18px;line-height:22px;font-size:14px">
        <li>Semua rekod, XP dan profil disimpan <b>dalam telefon ini sahaja</b>.</li>
        <li>Tiada akaun, tiada kata laluan, dan tiada data dihantar ke pelayan.</li>
        <li>Hanya nama panggilan digunakan. Tiada foto, nombor telefon atau alamat diminta.</li>
        <li>Data hilang jika data browser dipadam atau telefon ditukar.</li>
      </ul>
    </section>
    <section class="card" style="display:flex;flex-direction:column;gap:10px">
      <h2 style="font-size:16px;font-weight:700">Mula semula</h2>
      <p class="muted" style="margin:0;line-height:20px">Padam profil, XP, lencana dan semua rekod dalam telefon ini.</p>
      ${confirm
        ? `<p style="margin:0;font-weight:600;color:var(--bad)">Pasti? Ini tidak boleh dibatalkan.</p><div class="grid2" style="gap:8px"><button class="btn g" id="noReset">Batal</button><button class="btn d" id="yesReset" style="background:var(--bad)">Ya, padam</button></div>`
        : '<button class="btn g" id="askReset">Padam semua data</button>'}
    </section>
    ${ctaCard()}
    <p class="muted" style="margin:0;text-align:center;font-size:12px">MIQ Arena v1.0 · MIQ Taekwon-Do Academy</p>
  </main>` + nav('profil');
  bindLang(() => viewTetapan());
  document.getElementById('tSound').onclick = () => { st.sound = !st.sound; save(); viewTetapan(); };
  document.getElementById('tVib').onclick = () => { st.vib = !st.vib; save(); if (st.vib) buzz(30); viewTetapan(); };
  const di = document.getElementById('doInstall');
  if (di) di.onclick = async () => { try { installEvt.prompt(); await installEvt.userChoice; } catch(e) {} installEvt = null; viewTetapan(); };
  const a = document.getElementById('askReset'); if (a) a.onclick = () => viewTetapan(true);
  const n = document.getElementById('noReset'); if (n) n.onclick = () => viewTetapan(false);
  const y = document.getElementById('yesReset'); if (y) y.onclick = () => { S = fresh(); save(); location.hash = 'profil'; route(); };
  window.scrollTo(0,0);
}

// ================= Pilihan bahasa =================
function langPicker(){
  const L = S.settings.lang || 'ms';
  return `<section class="card" style="display:flex;flex-direction:column;gap:10px;padding:16px 20px">
    <span class="label">Bahasa / Language</span>
    <div class="seg" style="grid-template-columns:repeat(2,minmax(0,1fr))">
      <button type="button" class="chip ${L==='ms'?'on':''}" data-lang="ms" aria-pressed="${L==='ms'}">Bahasa Melayu</button>
      <button type="button" class="chip ${L==='en'?'on':''}" data-lang="en" aria-pressed="${L==='en'}">English</button>
    </div>
  </section>`;
}
function bindLang(redraw){
  app.querySelectorAll('[data-lang]').forEach(b => b.onclick = () => {
    if (S.settings.lang === b.dataset.lang) return;
    S.settings.lang = b.dataset.lang; save(); redraw(); applyLang();
  });
}
const dateLocale = () => (S.settings && S.settings.lang === 'en') ? 'en-GB' : 'ms-MY';
