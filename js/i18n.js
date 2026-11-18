// MIQ Arena — terjemahan English.
// Teks asal app ialah BM. Bila bahasa English dipilih, setiap teks yang dipaparkan
// diterjemah secara automatik ikut kamus di bawah (nombor ditulis sebagai #).
// Teks yang tiada dalam kamus kekal dalam BM, jadi tambah entri di sini jika ada teks baharu.

const I18N = {
  // ---- umum ----
  'Laman': 'Home', 'Game': 'Games', 'Rekod': 'Records', 'Profil': 'Profile', 'Tetapan': 'Settings',
  'Menu utama': 'Main menu', 'MIQ Arena, laman utama': 'MIQ Arena, home', 'Lihat semua ›': 'See all ›',
  '✕ Berhenti': '✕ Quit', 'Main lagi': 'Play again', 'Tahap seterusnya →': 'Next level →', 'Senarai game': 'Game list',
  'Laman utama': 'Home', 'Kembali ke senarai game': 'Back to game list', 'Kembali ke laman utama': 'Back to home', 'Kembali ke Main berdua': 'Back to 2 players',
  'Pilih tahap': 'Choose level', 'Dipilih': 'Selected', 'Lulus': 'Passed', 'Belum lulus': 'Not passed yet', 'Berkunci': 'Locked',
  'Akan datang': 'Coming soon', 'Baharu!': 'New!', 'Belum dimain': 'Not played yet', '# akan datang': '# coming soon', '# sedia': '# ready',
  'Markah': 'Score', 'Streak': 'Streak', 'Terpantas': 'Fastest', 'Dimain': 'Played', 'Sasaran': 'Target', 'Kombo': 'Combo',
  'Lencana baru': 'New badges', 'rekod baru': 'new record', 'Rekod baru!': 'New record!', 'Belum ada rekod.': 'No records yet.',
  '+# XP': '+# XP', 'Pemenang': 'Winner', 'Seterusnya →': 'Next →', 'Batal': 'Cancel', 'Masa tamat': 'Time up',
  'Mudah': 'Easy', 'Sederhana': 'Medium', 'Sukar': 'Hard', 'mudah': 'easy', 'sederhana': 'medium', 'perlahan': 'slow', 'laju': 'fast',
  'Hidup': 'On', 'Mati': 'Off', 'atau': 'or', 'hari': 'days', 'saat': 'sec', '# saat': '# sec', '# s': '# s', '# m': '# m', 'ms': 'ms',
  '# pemain': '# players', '# PEMAIN': '# PLAYERS', 'SATU TELEFON': 'ONE PHONE', 'VS': 'VS',
  // tali pinggang
  'Putih': 'White', 'Kuning': 'Yellow', 'Hijau': 'Green', 'Biru': 'Blue', 'Merah': 'Red', 'Hitam': 'Black',
  'Putih jalur kuning': 'White, yellow stripe', 'Kuning jalur hijau': 'Yellow, green stripe', 'Hijau jalur biru': 'Green, blue stripe',
  'Biru jalur merah': 'Blue, red stripe', 'Merah jalur hitam': 'Red, black stripe', '# Kup': '# Kup', '# Dan ke atas': '# Dan and above',
  // hari
  'Isn': 'Mon', 'Sel': 'Tue', 'Rab': 'Wed', 'Kha': 'Thu', 'Jum': 'Fri', 'Sab': 'Sat', 'Ahd': 'Sun',

  // ---- kepala, profil ----
  'TAEKWON-DO GAMES': 'TAEKWON-DO GAMES', 'Selamat datang!': 'Welcome!', 'Profil pemain': 'Player profile',
  'Isi profil sekali. Ia dikongsi oleh semua game MIQ Arena.': 'Fill in your profile once. It is shared by every MIQ Arena game.',
  'Diisi sekali, dikongsi oleh semua game.': 'Filled in once, shared by every game.',
  'Nama panggilan': 'Nickname', 'Nama anda': 'Your name', 'Nama pendek sahaja. Jangan guna nama penuh.': 'Short name only. Do not use your full name.',
  'Masukkan nama panggilan dahulu.': 'Enter a nickname first.', 'Tali pinggang sebenar': 'Real belt', 'Cawangan': 'Branch',
  'Rekod disimpan dalam telefon ini sahaja. Tiada foto, tiada nombor telefon, dan tiada akaun diperlukan.': 'Records are stored on this phone only. No photos, no phone numbers and no account needed.',
  'Mula bermain': 'Start playing', 'Simpan profil': 'Save profile', 'Tetapan, privasi dan padam data': 'Settings, privacy and delete data',
  'Dewan BK#': 'BK# Hall',

  // ---- laman utama ----
  'XP ke pangkat Kuning': 'XP to Yellow rank', 'Pangkat tertinggi': 'Highest rank', 'Pangkat Arena:': 'Arena rank:',
  'berasingan daripada tali pinggang sebenar': 'separate from your real belt',
  'STREAK': 'STREAK', 'LENCANA': 'BADGES', 'TERPANTAS': 'FASTEST', 'SAMBUNG LATIHAN': 'CONTINUE TRAINING', 'MULA DI SINI': 'START HERE',
  'Main sekarang': 'Play now', 'Semua game': 'All games', 'Main berdua': '2 players', 'Main sendiri': 'Solo',
  'XP dan lencana dikongsi oleh semua game.': 'XP and badges are shared by every game.',
  'Semua tahap lulus. Pecahkan rekod anda!': 'All levels passed. Beat your record!',
  'Lari, lompat dan tendang papan!': 'Run, jump and kick the boards!', 'Boleh pergi lebih jauh?': 'Can you go further?',
  'Cabar kawan atau keluarga anda sekali lagi!': 'Challenge your friends or family again!',
  'Siapa paling kuat? Cabar kawan anda sekali lagi!': 'Who is strongest? Challenge your friends again!',
  'Siapa paling tepat? Cabar kawan anda sekali lagi!': 'Who is most accurate? Challenge your friends again!',
  'Serang, tangkis, ulang! Cabar kawan anda.': 'Attack, block, repeat! Challenge your friends.',
  'Rekod anda: # m. Boleh pergi lebih jauh?': 'Your record: # m. Can you go further?',
  '# duel dimain': '# duels played', '# perlawanan': '# matches', '# perlawanan dimain': '# matches played', '2 pemain': '2 players',
  // cabaran harian
  'Cabaran harian': 'Daily challenges', 'Selesai!': 'Done!', 'Main': 'Play', 'Selesai': 'Done', 'Belum selesai': 'Not done',
  'Selesaikan ketiga-tiga untuk bonus +# XP.': 'Finish all three for a +# XP bonus.',
  'Bonus +# XP diterima. Cabaran baharu esok!': '+# XP bonus received. New challenges tomorrow!',
  'Streak cabaran: # hari': 'Challenge streak: # days', 'Cabaran harian selesai': 'Daily challenge done',
  'Semua cabaran hari ini selesai!': 'All of today\'s challenges done!',
  'Matsogi Reflex: ketepatan #% atau lebih': 'Matsogi Reflex: #% accuracy or more',
  'Matsogi Reflex: purata reaksi # ms atau kurang': 'Matsogi Reflex: average reaction # ms or less',
  'Dojang Run: lari sejauh # m': 'Dojang Run: run # m', 'Dojang Run: tendang # papan dalam satu larian': 'Dojang Run: kick # boards in one run',
  'Kyokpa Timing: # Sempurna dalam satu pusingan': 'Kyokpa Timing: # Perfects in one round', 'Kyokpa Timing: pecahkan # set papan': 'Kyokpa Timing: break # board sets',
  'Kuiz Asas: dapat #/# atau lebih': 'Basic Quiz: score #/# or more', 'Kuiz Asas: dapat #/#': 'Basic Quiz: score #/#',
  'Memori Padan: siapkan dengan # bintang': 'Memory Match: finish with # stars', 'Ikut Sabum: capai # langkah': 'Follow Sabum: reach # steps',
  'Susun Tali Pinggang: tanpa sebarang kesilapan': 'Belt Order: no mistakes at all', 'Tangkis!: tangkis # serangan dalam satu pusingan': 'Block!: block # attacks in one round',
  'Main berdua: main mana-mana game # pemain': '2 players: play any 2-player game',
  // daftar kelas
  'MIQ TAEKWON-DO ACADEMY': 'MIQ TAEKWON-DO ACADEMY', 'Belum jadi pelajar MIQ?': 'Not an MIQ student yet?',
  'Cuba kelas percuma di BK# Bandar Kinrara, Zenopy Seri Kembangan, BK# atau Lestari Putra. Kelas dari umur # tahun.': 'Try a free class at BK# Bandar Kinrara, Zenopy Seri Kembangan, BK# or Lestari Putra. Classes from age #.',
  'Daftar kelas percuma': 'Book a free class',

  // ---- nama dan penerangan game ----
  'Matsogi Reflex': 'Matsogi Reflex', 'Dojang Run': 'Dojang Run', 'Kyokpa Timing': 'Kyokpa Timing',
  'Kuiz Asas': 'Basic Quiz', 'Memori Padan': 'Memory Match', 'Ikut Sabum': 'Follow Sabum', 'Susun Tali Pinggang': 'Belt Order',
  'Tangkis!': 'Block!', 'Duel Refleks': 'Reflex Duel', 'Tarik Tali': 'Tug of War', 'Kyokpa Lumba': 'Kyokpa Race',
  'Serang & Tangkis': 'Attack & Block', 'Susun Tul': 'Tul Order', 'Teori Grading Quest': 'Grading Theory Quest',
  'Kuiz': 'Quiz', 'Memori': 'Memory', 'Tali Pinggang': 'Belts', 'Kyokpa': 'Kyokpa',
  'Serang Chong, elak Hong': 'Hit Chong, avoid Hong', 'Lari, lompat dan tendang papan': 'Run, jump and kick boards',
  'Pecahkan papan tepat masa': 'Break boards with perfect timing', 'Kiraan dan arahan dalam kelas': 'Counting and class commands',
  'Cari # kad nombor atau gambar yang sama': 'Find 2 matching number or picture cards', 'Ulang urutan pad yang menyala': 'Repeat the order of lit pads',
  'Susun ikut turutan Kup': 'Order by Kup rank', 'Tangkis serangan dari # arah': 'Block attacks from 4 directions',
  'Susun pergerakan ikut turutan': 'Put the movements in order', 'Makna Tul dan sejarah ITF': 'Tul meanings and ITF history',
  'Siapa tekan dahulu bila SIJAK!': 'First to tap on SIJAK!', 'Tarik tali pinggang hitam ke pihak anda': 'Pull the black belt to your side',
  'Siapa paling tepat memecah papan': 'Who breaks boards most accurately', 'Bergilir menyerang dan menangkis': 'Take turns attacking and blocking',
  'Tahap #/#': 'Level #/#', 'Semua lulus': 'All passed', 'Rekod # m': 'Record # m',

  // ---- main berdua ----
  'Main berdua': '2 players', 'Cabar kawan, adik-beradik atau ibu bapa. Hong di atas, Chong di bawah.': 'Challenge friends, siblings or parents. Hong on top, Chong at the bottom.',
  'Cara bersedia': 'How to set up', 'Letak telefon rata di tengah-tengah': 'Lay the phone flat in the middle',
  'Pemain Hong duduk di atas, Chong di bawah': 'Hong player sits at the top, Chong at the bottom',
  'Kedua-dua tekan bahagian sendiri untuk "Sedia"': 'Both tap their own side to get "Ready"',
  'Hormat lawan selepas tamat: Charyot, Kyong-Ye!': 'Respect your opponent after: Charyot, Kyong-Ye!',
  'XP masuk ke profil pemilik telefon ini.': 'XP goes to the profile of this phone\'s owner.',
  'Nama pemain Hong (atas)': 'Hong player name (top)', 'Nama pemain Chong (bawah)': 'Chong player name (bottom)',
  'Menang bila dapat': 'Win at', '# mata': '# points', 'Pemain atas': 'Top player', 'Pemain bawah': 'Bottom player',
  'Masukkan nama kedua-dua pemain dahulu.': 'Enter both players\' names first.', 'Lawan': 'Opponent',
  'Tekan untuk sedia': 'Tap when ready', 'Sedia ✓': 'Ready ✓', 'Sedia… Kyungye': 'Ready… Kyungye', 'Sedia…': 'Ready…',
  'Hormat lawan selepas duel: Charyot, Kyong-Ye!': 'Respect your opponent after the duel: Charyot, Kyong-Ye!',
  'Hormat lawan selepas perlawanan: Charyot, Kyong-Ye!': 'Respect your opponent after the match: Charyot, Kyong-Ye!',
  'Kelajuan pusingan terakhir. Hormat lawan selepas perlawanan: Charyot, Kyong-Ye!': 'Speed in the last round. Respect your opponent after the match: Charyot, Kyong-Ye!',
  'PUSINGAN #': 'ROUND #', 'SASARAN # MATA': 'TARGET # POINTS', 'TERBAIK #': 'BEST OF #', '# PUSINGAN': '# ROUND',
  'Mata untuk anda': 'Point to you', 'Lambat sedikit': 'A bit slow', 'Cuba lagi!': 'Try again!', 'Menang pusingan!': 'Round won!',
  'Menang! # ms': 'Won! # ms', 'Seri!': 'Draw!', 'Hampir! Lawan lebih tepat': 'Close! Opponent was more accurate',
  // duel
  'Letak telefon di tengah. Setiap pemain pegang separuh skrin. Bila skrin bertukar kuning dan keluar "SIJAK!", tekan secepat mungkin!': 'Put the phone in the middle. Each player holds half the screen. When the screen turns yellow and shows "SIJAK!", tap as fast as you can!',
  'Tekan sebelum "SIJAK!" = mata diberi kepada lawan. Kedua-dua pemain boleh tekan serentak.': 'Tapping before "SIJAK!" gives the point to your opponent. Both players can tap at the same time.',
  'Mula duel': 'Start duel', 'Duel tamat': 'Duel over', 'Duel lagi': 'Duel again', 'Tukar tempat dan duel lagi': 'Swap places and duel again',
  '# duel dimain': '# duels played', 'terpantas –': 'fastest –',
  // tarik tali
  'Letak telefon di tengah. Bila "TARIK!" keluar, tekan bahagian anda secepat mungkin untuk menarik simpulan tali pinggang hitam ke garisan anda.': 'Put the phone in the middle. When "PULL!" appears, tap your side as fast as you can to pull the black belt knot to your line.',
  'Bilangan pusingan': 'Number of rounds', '# pusingan': '# round', 'Terbaik #': 'Best of #', 'Mula tarik tali': 'Start tug of war',
  'Tekan dengan hujung jari, bukan dengan kuku atau penumbuk. Letak telefon atas permukaan rata yang lembut.': 'Tap with your fingertip, not your nails or fist. Put the phone on a flat, soft surface.',
  'tekanan terlaju –': 'fastest tapping –', 'TARIK!': 'PULL!', 'Tarik tali tamat': 'Tug of war over', 'Tarik lagi': 'Pull again',
  'Tukar tempat dan tarik lagi': 'Swap places and pull again', 'tekanan/saat': 'taps/sec', 'TARIK TALI': 'TUG OF WAR', 'TEKANAN TERLAJU': 'FASTEST TAPPING',
  // kyokpa lumba
  'Kedua-dua pemain ada meter sendiri. Tekan bahagian anda sekali bila jarum dalam zon kuning. Paling tepat menang pusingan!': 'Each player has their own meter. Tap your side once when the needle is in the yellow zone. Most accurate wins the round!',
  'Mula lumba': 'Start race', 'Siapa menang pusingan?': 'Who wins the round?', 'Paling tinggi': 'Highest', 'Kedua': 'Second', 'Kalah': 'Loses',
  '(garis hitam di tengah)': '(black line in the middle)', '(dalam zon kuning)': '(inside the yellow zone)', '(luar zon / tidak tekan)': '(outside the zone / no tap)',
  'Jika sama, yang paling dekat dengan garis tengah menang.': 'If tied, the one closest to the middle line wins.',
  'Tekan bila dalam zon!': 'Tap when in the zone!', 'Tidak sempat': 'Too late', 'Lumba tamat': 'Race over', 'Lumba lagi': 'Race again',
  'Tukar tempat dan lumba lagi': 'Swap places and race again', 'LUMBA KYOKPA': 'KYOKPA RACE', 'SEMPURNA': 'PERFECT',
  // serang & tangkis
  'Bergilir menjadi penyerang dan penangkis. Penyerang pilih zon. Penangkis mesti tekan zon yang menyala merah sebelum masa tamat.': 'Take turns as attacker and blocker. The attacker picks a zone. The blocker must tap the zone that lights up red before time runs out.',
  'Penyerang': 'Attacker', 'Penangkis': 'Blocker', 'Pilih zon serangan': 'Pick the attack zone', 'Tekan zon merah': 'Tap the red zone',
  'Mula perlawanan': 'Start match', 'Peraturan': 'Rules', 'Penangkis tekan zon yang betul dalam masa': 'Blocker taps the right zone in time',
  'Mata penangkis': 'Blocker\'s point', 'Salah zon atau terlambat': 'Wrong zone or too late', 'Mata penyerang': 'Attacker\'s point',
  'Penyerang tidak serang dalam # saat': 'Attacker does not attack within # sec', 'Masa untuk menangkis semakin singkat setiap pusingan.': 'Blocking time gets shorter every round.',
  'PENYERANG': 'ATTACKER', 'PENANGKIS': 'BLOCKER', 'Pilih zon untuk menyerang!': 'Pick a zone to attack!', 'Bersedia… Kyungye': 'Get ready… Kyungye',
  'Serangan dilepaskan!': 'Attack launched!', 'TANGKIS!': 'BLOCK!', 'Tangkis! # ms': 'Blocked! # ms', 'Ditangkis': 'Blocked',
  'Kena! Serangan berjaya': 'Hit! Attack landed', 'Terlambat': 'Too late', 'Kena! Lawan salah zon': 'Hit! Opponent picked the wrong zone',
  'Salah zon': 'Wrong zone', 'Penyerang tidak serang': 'Attacker did not attack', 'Perlawanan tamat': 'Match over',
  'Tukar tempat dan main lagi': 'Swap places and play again', 'tangkisan': 'blocks', 'Atas': 'Top', 'Tengah': 'Middle', 'Bawah': 'Bottom',
  'SERANG & TANGKIS': 'ATTACK & BLOCK', 'TANGKISAN': 'BLOCKS',

  // ---- Matsogi Reflex ----
  'Latih refleks dan disiplin sparring. Serang sasaran yang betul, jangan termakan umpan lawan.': 'Train your sparring reflexes and discipline. Hit the right target, don\'t fall for your opponent\'s feints.',
  'CHONG = serang': 'CHONG = hit', 'Tekan pad biru': 'Tap the blue pad', 'HONG = jangan': 'HONG = don\'t', 'Pad merah ialah umpan': 'The red pad is a decoy',
  'Pad biru sahaja': 'Blue pads only', 'Umpan merah mula muncul': 'Red decoys appear', 'Lebih laju + kombinasi': 'Faster + combos',
  'Tipuan: biru bertukar merah': 'Feints: blue turns red', 'Tekanan tinggi': 'High pressure', 'Tahap Sabum': 'Sabum level',
  'Rekod Putih': 'White record', 'Rekod Kuning': 'Yellow record', 'Rekod Hijau': 'Green record', 'Rekod Biru': 'Blue record', 'Rekod Merah': 'Red record', 'Rekod Hitam': 'Black record',
  '# serangan': '# attacks', 'lulus jika ketepatan ≥ #% dan purata ≤ # ms': 'pass with ≥ #% accuracy and ≤ # ms average',
  'Kelajuan skrin berbeza antara telefon. Bandingkan rekod dengan diri sendiri.': 'Screen speed differs between phones. Compare records with yourself.',
  'Sedia… Kyungye!': 'Ready… Kyungye!', 'SIJAK!': 'SIJAK!', 'Lambat!': 'Too slow!', 'Bijak! ✓': 'Smart! ✓', 'Terlalu awal!': 'Too early!',
  'Kena tipu!': 'Feinted!', 'Kena umpan!': 'Took the bait!', 'Salah sasaran': 'Wrong target', 'Meneka!': 'Guessing!',
  'Purata reaksi': 'Average reaction', 'Ketepatan': 'Accuracy', 'Streak terbaik': 'Best streak', 'Kena umpan': 'Took bait', 'Terlalu awal': 'Too early',
  'Syabas! Cuba pecahkan rekod anda.': 'Well done! Try to beat your record.', 'Syarat lulus: ketepatan ≥ #% dan purata ≤ # ms': 'To pass: ≥ #% accuracy and ≤ # ms average',
  'Anda mudah termakan umpan. Dalam Matsogi, jangan serang setiap gerakan lawan: baca dahulu, kemudian serang.': 'You fall for decoys easily. In Matsogi, don\'t attack every move your opponent makes: read first, then attack.',
  'Terlalu banyak serangan awal. Kekal tenang dalam sikap Kyungye dan tunggu peluang sebenar.': 'Too many early attacks. Stay calm in Kyungye and wait for a real chance.',
  'Banyak sasaran terlepas. Pandang tengah skrin supaya keempat-empat zon kelihatan serentak.': 'Many targets missed. Look at the middle of the screen so you can see all four zones at once.',
  'Ketepatan baik! Sekarang kurangkan masa reaksi: sasarkan bawah # ms.': 'Good accuracy! Now cut your reaction time: aim for under # ms.',
  'Prestasi cemerlang. Teruskan latihan dan bawa refleks ini ke gelanggang!': 'Excellent! Keep training and bring these reflexes to the ring!',
  'Nopunde': 'Nopunde', 'Kaunde': 'Kaunde', 'Kiri': 'Left', 'Kanan': 'Right',

  // ---- Dojang Run ----
  'Lari sejauh mungkin. Elak halangan, tendang papan dan kutip bintang. Anda ada # nyawa.': 'Run as far as you can. Dodge obstacles, kick boards and collect stars. You have # lives.',
  'Bintang': 'Stars', 'Larian': 'Runs', 'Cara bermain': 'How to play', 'Leret': 'Swipe', 'kiri / kanan': 'left / right',
  'Tukar lorong': 'Change lane', 'atas': 'up', 'pad biru': 'blue pad', 'Lompat': 'Jump', 'bawah': 'down', 'palang': 'bar', 'Gelongsor': 'Slide',
  'Ketik': 'Tap', 'papan kayu': 'wooden board', 'Tendang (+#)': 'Kick (+#)', 'Tiang hitam-kuning': 'Black-yellow pillar', 'Tukar lorong!': 'Change lane!',
  'Mula lari': 'Start running', 'Butang di bawah skrin juga boleh digunakan jika leretan sukar.': 'You can also use the buttons below the screen if swiping is hard.',
  'JARAK': 'DISTANCE', 'PAPAN': 'BOARDS', 'BINTANG': 'STARS', '# nyawa': '# lives', 'Lorong kiri': 'Left lane', 'Lorong kanan': 'Right lane',
  'Tendang': 'Kick', 'Kawasan larian. Leret untuk bergerak, ketik untuk menendang.': 'Running area. Swipe to move, tap to kick.',
  'PECAH! +#': 'BROKEN! +#', 'Lompat!': 'Jump!', 'Gelongsor!': 'Slide!', 'Tendang papan!': 'Kick the board!', 'LARI!': 'RUN!',
  'Leret untuk bergerak · ketik untuk tendang': 'Swipe to move · tap to kick', 'Rehat. Ketik untuk sambung': 'Paused. Tap to continue',
  'Larian tamat': 'Run over', 'rekod # m': 'record # m', '# markah': '# points', 'Papan pecah': 'Boards broken', 'Lari lagi': 'Run again',
  'Petua: ketik skrin bila papan kayu hampir, untuk menendang dan dapat bonus +#.': 'Tip: tap the screen when a wooden board is close to kick it for a +# bonus.',
  'Petua: ketik skrin bila papan kayu hampir, untuk menendang dan dapat bonus +#': 'Tip: tap the screen when a wooden board is close to kick it for a +# bonus',
  'Hebat! Semakin jauh, semakin laju. Kekal fokus pada lorong di hadapan.': 'Great! The further you go, the faster it gets. Stay focused on the lane ahead.',
  'JUMLAH': 'TOTAL', 'LARIAN': 'RUNS', 'REKOD': 'RECORD',
  // Mod Dikejar
  'Mod Dikejar': 'Chase Mode', 'Harimau Putih': 'White Tiger', 'Sabum Garang': 'Angry Sabum',
  'Ada yang mengejar anda! Setiap kali dilanggar, dia makin dekat. Tendang papan untuk jauhkan diri. Kalau dia sampai, anda ditangkap.': 'Someone is chasing you! Every time you crash, they get closer. Kick boards to pull away. If they reach you, you are caught.',
  'Laju, tapi lambat bila belok. Bila dia mengaum,': 'Fast, but slow to turn. When it roars,', 'tukar lorong': 'change lane', 'untuk elak terkaman.': 'to dodge the pounce.',
  'Kejar pelajar yang lewat ke kelas. Bila dia jerit': 'Chases students who are late for class. When he shouts', '"Charyot!"': '"Charyot!"', ', tendang untuk buat Kiai.': ', kick to do a Kiai.',
  'Rekod # m': 'Record # m', 'Jarak pengejar': 'Chaser distance',
  'GRRR! Tukar lorong!': 'GRRR! Change lane!', 'CHARYOT! Tendang!': 'CHARYOT! Kick!', 'Harimau terlepas!': 'Tiger missed!', 'KIAI! Sabum terkejut!': 'KIAI! Sabum is startled!',
  'Dia makin dekat!': 'Getting closer!', 'DITANGKAP!': 'CAUGHT!', 'Ditangkap!': 'Caught!',
  'Harimau Putih mengejar anda!': 'The White Tiger is chasing you!', 'Sabum Garang mengejar anda!': 'Angry Sabum is chasing you!',
  '🐯 Dikejar Harimau Putih': '🐯 Chased by the White Tiger', '🥋 Dikejar Sabum Garang': '🥋 Chased by Angry Sabum',
  'Petua: bila harimau mengaum, terus tukar lorong. Tendang papan untuk tambah jarak.': 'Tip: when the tiger roars, change lane right away. Kick boards to gain distance.',
  'Petua: bila Sabum jerit "Charyot!", tendang segera. Tendang papan untuk tambah jarak.': 'Tip: when Sabum shouts "Charyot!", kick right away. Kick boards to gain distance.',
  'Dojang Run: Mod Dikejar baharu! Lari daripada Harimau Putih atau Sabum Garang': 'Dojang Run: new Chase Mode! Run from the White Tiger or Angry Sabum',

  // ---- Kyokpa Timing ----
  'Tekan skrin bila jarum berada dalam zon kuning. Tepat di tengah = Sempurna, dan papan pecah!': 'Tap the screen when the needle is in the yellow zone. Dead centre = Perfect, and the board breaks!',
  'Zon kuning': 'Yellow zone', 'Tekan di sini': 'Tap here', 'Jarum putih': 'White needle', 'Bergerak kiri-kanan': 'Moves left and right',
  'Pecah': 'Broken', 'Satu papan, zon besar': 'One board, big zone', 'Zon lebih kecil': 'Smaller zone', '# papan berturut-turut': '# boards in a row',
  '# papan, lebih laju': '# boards, faster', '# set papan': '# board sets', '# set × # papan': '# sets × # boards', 'lulus jika # set pecah': 'pass if # sets break',
  'Fokus pada jarum': 'Focus on the needle', 'MULA!': 'GO!', 'Tekan di mana-mana bila jarum dalam zon kuning': 'Tap anywhere when the needle is in the yellow zone',
  'Tekan untuk memecah papan': 'Tap to break the board', 'SEMPURNA!': 'PERFECT!', 'BAIK': 'GOOD', 'TERLEPAS': 'MISSED',
  'Set pecah': 'Sets broken', 'Sempurna': 'Perfect', 'Baik': 'Good', 'Terlepas': 'Missed', '#/# pecah': '#/# broken',
  'Syarat lulus: sekurang-kurangnya # daripada # set pecah': 'To pass: break at least # of # sets',
  'Jangan kejar jarum. Tunggu jarum datang ke zon kuning, kemudian tekan: sama seperti menunggu jarak yang betul sebelum memecah papan.': 'Don\'t chase the needle. Wait for it to reach the yellow zone, then tap: just like waiting for the right distance before breaking a board.',
  'Ramai "Baik", kurang "Sempurna". Sasarkan garis hitam di tengah zon kuning untuk markah berganda.': 'Lots of "Good", not many "Perfect". Aim for the black line in the middle of the yellow zone for double points.',
  'Masa yang sangat tepat! Fokus dan ketenangan inilah kunci Kyokpa sebenar.': 'Very precise timing! Focus and calm are the key to real Kyokpa.',

  // ---- Kuiz Asas ----
  'Kenali kiraan dan arahan yang digunakan dalam kelas Taekwon-Do.': 'Learn the counting and commands used in Taekwon-Do class.',
  'Nombor ke istilah': 'Number to term', 'Istilah ke maksud': 'Term to meaning', 'Kiraan': 'Counting', 'Arahan': 'Commands', 'Campur': 'Mixed',
  'Nombor # hingga #': 'Numbers # to #', 'Arahan dan istilah dojang': 'Commands and dojang terms', 'Semua istilah, bercampur': 'All terms, mixed',
  'Mula kuiz Kiraan': 'Start Counting quiz', 'Mula kuiz Arahan': 'Start Commands quiz', 'Mula kuiz Campur': 'Start Mixed quiz',
  '# soalan': '# questions', 'lulus jika # betul': 'pass with # correct',
  'Ejaan ikut istilah ITF. Tanya Sabum jika ragu tentang sebutan.': 'Spelling follows ITF terms. Ask your Sabum if unsure about pronunciation.',
  'Soalan #/#': 'Question #/#', 'Nombor ini dalam bahasa Korea?': 'This number in Korean?', 'Istilah ini bermaksud nombor…': 'This term means the number…',
  'Apakah maksud istilah ini?': 'What does this term mean?', 'Apakah istilah untuk…': 'What is the term for…',
  'Siap sedia (perhatian)': 'Attention', 'Tunduk hormat': 'Bow', 'Bersedia': 'Ready', 'Mula': 'Begin', 'Berhenti': 'Stop',
  'Kembali ke kedudukan sedia': 'Return to ready position', 'Rehat': 'At ease', 'Bersurai': 'Dismissed', 'Pusing ke belakang': 'About turn',
  'Dewan latihan': 'Training hall', 'Pakaian latihan': 'Uniform', 'Jurulatih': 'Instructor', 'Corak': 'Pattern', 'Sparring': 'Sparring', 'Jeritan semangat': 'Spirit shout',
  'Jawapan betul': 'Correct answers', 'Syabas! Cuba dapatkan #/#.': 'Well done! Try to get #/#.', 'Perlu # betul untuk lulus. Cuba lagi!': 'You need # correct to pass. Try again!',
  'Ulang kaji': 'Review', 'Semua jawapan betul. Hebat! Cuba sebut setiap istilah dengan kuat semasa kelas.': 'All correct. Great! Try saying each term out loud in class.',

  // ---- Memori Padan ----
  'Buka # kad sekali gus. Cari # kad yang sama dengan cubaan paling sedikit.': 'Open 2 cards at a time. Find 2 matching cards in as few tries as possible.',
  'Nombor': 'Numbers', '# dengan #': '# with #', 'Gambar': 'Pictures', 'Bintang dengan bintang': 'Star with star',
  '# pasang': '# pairs', 'nombor': 'numbers', 'gambar': 'pictures', 'nombor dan gambar': 'numbers and pictures',
  'lulus dengan # bintang atau lebih': 'pass with # stars or more', 'PASANGAN': 'PAIRS', 'CUBAAN': 'TRIES', 'Kad tertutup': 'Face-down card',
  '# cubaan': '# tries', 'Perlu # bintang untuk lulus: siapkan dalam # cubaan atau kurang.': 'You need # stars to pass: finish in # tries or fewer.',
  'Syabas! Cuba dengan cubaan lebih sedikit.': 'Well done! Try with fewer tries.', '# bintang daripada #': '# stars out of #',
  'Ingatan yang sangat tajam! Cuba sebut setiap pasangan dengan kuat semasa bermain.': 'Very sharp memory! Try saying each pair out loud as you play.',
  'Petua: ingat kedudukan setiap kad yang anda buka, walaupun bukan pasangannya.': 'Tip: remember where every card you open is, even if it isn\'t a match.',
  'Piala': 'Trophy', 'Pingat': 'Medal', 'Sasaran': 'Target', 'Perisai': 'Shield', 'Kilat': 'Lightning', 'Api': 'Fire', 'Mahkota': 'Crown', 'Hati': 'Heart', 'Tapak kaki': 'Footprints',

  // ---- Ikut Sabum ----
  'Tengok pad yang menyala, kemudian tekan ikut urutan yang sama. Setiap pusingan, urutan bertambah satu.': 'Watch the pads light up, then tap them in the same order. Each round, the order gets one step longer.',
  'Tengok': 'Watch', 'Sabum tunjuk urutan': 'Sabum shows the order', 'Ulang': 'Repeat', 'Tekan ikut urutan': 'Tap in order',
  '# pad': '# pads', 'sasaran # langkah': 'target # steps', 'Terbaik # langkah': 'Best # steps',
  'Lulus jika anda capai # langkah': 'Pass by reaching # steps', 'ada bunyi, kuatkan suara telefon': 'has sound, turn up your volume',
  'Urutan': 'Steps', 'Tengok Sabum…': 'Watch Sabum…', 'Giliran anda!': 'Your turn!', 'Betul!': 'Correct!', 'Salah urutan!': 'Wrong order!',
  'Sasaran # tercapai! Teruskan…': 'Target # reached! Keep going…', 'Pad #': 'Pad #', '# langkah': '# steps', 'langkah': 'steps',
  'Capai # langkah untuk lulus.': 'Reach # steps to pass.', 'Syabas! Cuba urutan yang lebih panjang.': 'Well done! Try a longer order.',
  'Tumpuan yang hebat! Sama seperti mengingat urutan gerakan dalam Tul.': 'Great focus! Just like remembering the moves of a Tul.',
  'Petua: sebut warna atau gambar pad dengan perlahan semasa Sabum menunjukkan urutan.': 'Tip: quietly say the colour or picture of each pad while Sabum shows the order.',

  // ---- Susun Tali Pinggang ----
  'Tekan tali pinggang ikut turutan, dari yang paling rendah (Putih) hingga Hitam.': 'Tap the belts in order, from the lowest (White) to Black.',
  '# warna utama': '# main colours', '# tali pinggang, termasuk berjalur': '# belts, including striped', '# tali pinggang, tanpa nama, # saat': '# belts, no names, # sec',
  'Lulus jika # kesilapan atau kurang': 'Pass with # mistakes or fewer', 'Lulus jika # kesilapan atau kurang dalam # saat': 'Pass with # mistakes or fewer within # sec',
  'Turutan ikut sistem ITF. Jalur pada hujung tali pinggang menunjukkan warna seterusnya.': 'Order follows the ITF system. The stripe at the end of a belt shows the next colour.',
  'DISUSUN': 'PLACED', 'KESILAPAN': 'MISTAKES', 'Tekan tali pinggang': 'Tap the', 'paling rendah': 'lowest', 'dahulu.': 'belt first.',
  'seterusnya': 'next', 'Turutan anda': 'Your order', 'Seterusnya…': 'Next…', '# kesilapan': '# mistakes',
  'Turutan betul dan maksud warna': 'Correct order and colour meanings', 'Syabas! Cuba lebih pantas.': 'Well done! Try to be faster.',
  'Siapkan dalam # saat untuk lulus.': 'Finish within # sec to pass.', 'Kesucian: pelajar baru yang belum ada ilmu Taekwon-Do': 'Innocence: a new student with no Taekwon-Do knowledge yet',
  'Bumi: tempat benih berakar, asas mula dibina': 'Earth: where the seed takes root and the foundation is laid',
  'Tumbuhan yang membesar: kemahiran mula berkembang': 'A growing plant: skills begin to develop',
  'Langit: arah pokok membesar, latihan semakin maju': 'Sky: where the tree grows towards as training progresses',
  'Bahaya: pelajar perlu kawalan diri, lawan perlu berhati-hati': 'Danger: the student must show self-control, and opponents must take care',
  'Lawan kepada putih: kematangan dan kecekapan': 'Opposite of white: maturity and proficiency',

  // ---- Tangkis! ----
  'Serangan merah datang dari atas, bawah, kiri atau kanan. Tekan bahagian skrin di arah serangan itu untuk menangkis sebelum ia sampai.': 'Red attacks come from the top, bottom, left or right. Tap the side of the screen the attack comes from to block it before it lands.',
  'Serangan': 'Attacks', 'Datang ke tengah': 'Come to the centre', 'Tangkis lewat': 'Late block', '= Sempurna': '= Perfect',
  '# serangan · perlahan': '# attacks · slow', 'kadang-kadang berganda': 'sometimes doubled', 'Lulus jika #% serangan ditangkis': 'Pass by blocking #% of attacks',
  'salah arah = kesilapan': 'wrong direction = mistake', 'Kawasan tangkisan. Tekan arah serangan.': 'Blocking area. Tap the attack direction.',
  'ATAS': 'TOP', 'BAWAH': 'BOTTOM', 'KIRI': 'LEFT', 'KANAN': 'RIGHT', 'Junbi!': 'Junbi!',
  'Tangkis atas': 'Block up', 'Tangkis bawah': 'Block down', 'Tangkis kiri': 'Block left', 'Tangkis kanan': 'Block right',
  'Kena!': 'Hit!', 'Salah arah': 'Wrong direction', 'Kena serang': 'Got hit', 'Perlu tangkis # serangan untuk lulus.': 'Block # attacks to pass.',
  'Syabas! Cuba tangkis semua serangan.': 'Well done! Try to block every attack.',
  'Banyak salah arah. Tunggu sehingga anda pasti dari mana serangan datang, kemudian tangkis.': 'Lots of wrong directions. Wait until you are sure where the attack is coming from, then block.',
  'Petua: tangkis bila serangan hampir sampai untuk dapat "Sempurna", sama seperti menangkis pada saat akhir dalam Matsogi.': 'Tip: block when the attack is almost there to get "Perfect", just like blocking at the last moment in Matsogi.',
  'Tangkisan yang hebat! Pertahanan yang kuat ialah asas Matsogi yang baik.': 'Great blocking! A strong defence is the foundation of good Matsogi.',
  'Ditangkis': 'Blocked', 'Tangkisan': 'Blocks',

  // ---- rekod ----
  'Rekod saya': 'My records', 'Bandingkan dengan diri sendiri, minggu demi minggu.': 'Compare with yourself, week by week.',
  'JUMLAH XP': 'TOTAL XP', '+# minggu ini': '+# this week', 'Pusingan': 'Rounds', 'Streak # hari': '# day streak',
  'Aktiviti # hari': '# day activity', 'XP sehari': 'XP per day', 'HARI SELESAI': 'DAYS DONE', 'Tahap': 'Level',
  'Matsogi Reflex: rekod terbaik': 'Matsogi Reflex: best records', 'Kyokpa Timing: rekod terbaik': 'Kyokpa Timing: best records',
  'Kuiz Asas: rekod terbaik': 'Basic Quiz: best records', 'Memori Padan: rekod terbaik': 'Memory Match: best records',
  'Ikut Sabum: rekod terbaik': 'Follow Sabum: best records', 'Susun Tali Pinggang: rekod terbaik': 'Belt Order: best records', 'Tangkis!: rekod terbaik': 'Block!: best records',
  'Belum ada rekod. Main pusingan pertama anda!': 'No records yet. Play your first round!', 'Betul': 'Correct', 'Masa': 'Time',
  'DUEL DIMAIN': 'DUELS PLAYED', 'PERLAWANAN': 'MATCHES', 'Tarik Tali dan Kyokpa Lumba': 'Tug of War and Kyokpa Race', 'Lencana': 'Badges',
  '# daripada #': '# of #', 'diperoleh': 'earned', 'belum diperoleh': 'not earned yet',
  // lencana
  'Langkah pertama': 'First step', 'Refleks #': 'Reflex #', 'Tanpa umpan': 'No bait', 'Raja kombo': 'Combo king', 'Streak # hari': '# day streak',
  'Rajin berlatih': 'Hard worker', 'Matsogi Putih': 'Matsogi White', 'Matsogi Kuning': 'Matsogi Yellow', 'Matsogi Hijau': 'Matsogi Green',
  'Matsogi Biru': 'Matsogi Blue', 'Matsogi Merah': 'Matsogi Red', 'Sabum muda': 'Young Sabum', 'Papan pertama': 'First board',
  'Tepat sempurna': 'Perfect timing', 'Semua pecah': 'All broken', 'Pemecah Sabum': 'Master breaker', 'Pakar kiraan': 'Counting expert',
  'Kuiz #/#': 'Quiz #/#', 'Lulus semua kuiz': 'All quizzes passed', 'Ingatan # bintang': '# star memory', 'Raja memori': 'Memory king',
  'Ingatan panjang': 'Long memory', 'Murid Sabum': 'Sabum\'s student', 'Susun sempurna': 'Perfect order', 'Pakar tali pinggang': 'Belt expert',
  'Pelari # m': 'Runner # m', 'Pelari Sabum': 'Master runner', 'Pemecah papan': 'Board breaker', 'Duel pertama': 'First duel',
  'Juara gelanggang': 'Ring champion', 'Tarik tali pertama': 'First tug of war', 'Lumba Kyokpa pertama': 'First Kyokpa race',
  'Cabaran pertama': 'First challenge', 'Cabaran # hari': '# day challenge', 'Serang & Tangkis pertama': 'First Attack & Block',
  'Perisai besi': 'Iron shield', 'Pakar tangkisan': 'Blocking expert',

  // ---- tetapan ----
  'Bunyi dan getaran': 'Sound and vibration', 'Bunyi': 'Sound', 'Nada dalam Ikut Sabum': 'Tones in Follow Sabum', 'Getaran': 'Vibration',
  'Getaran telefon bila betul atau salah': 'Phone vibrates on right or wrong', 'Pasang app': 'Install app',
  'Pasang MIQ Arena di skrin utama telefon. Boleh dibuka tanpa internet.': 'Install MIQ Arena on your home screen. Works without internet.',
  'Pasang': 'Install', 'App sudah dipasang di telefon ini ✓': 'App already installed on this phone ✓',
  'iPhone: tekan butang': 'iPhone: tap the', 'Kongsi': 'Share', 'di Safari, kemudian': 'button in Safari, then', 'Tambah ke Skrin Utama': 'Add to Home Screen',
  'Buka menu browser (⋮), kemudian pilih': 'Open the browser menu (⋮), then choose', 'Tambah ke skrin utama': 'Add to home screen',
  'Untuk ibu bapa: privasi': 'For parents: privacy', 'Semua rekod, XP dan profil disimpan': 'All records, XP and profile are stored',
  'dalam telefon ini sahaja': 'on this phone only', 'Tiada akaun, tiada kata laluan, dan tiada data dihantar ke pelayan.': 'No account, no password, and no data sent to any server.',
  'Hanya nama panggilan digunakan. Tiada foto, nombor telefon atau alamat diminta.': 'Only a nickname is used. No photos, phone numbers or addresses are asked for.',
  'Data hilang jika data browser dipadam atau telefon ditukar.': 'Data is lost if browser data is cleared or the phone is changed.',
  'Mula semula': 'Start over', 'Padam profil, XP, lencana dan semua rekod dalam telefon ini.': 'Delete the profile, XP, badges and all records on this phone.',
  'Padam semua data': 'Delete all data', 'Pasti? Ini tidak boleh dibatalkan.': 'Sure? This cannot be undone.', 'Ya, padam': 'Yes, delete',
  'Papan markah': 'Leaderboard', 'Papan markah setiap game': 'Leaderboard for each game', 'Lihat semua papan markah ›': 'See all leaderboards ›',
  '🥇 Markah tertinggi!': '🥇 Top score!', '🎉 Masuk 10 teratas!': '🎉 You made the top 10!', 'Tulis nama anda untuk papan markah': 'Type your name for the leaderboard', 'Langkau': 'Skip',
  'Papan markah: tulis nama dalam pop up selepas tamat game': 'Leaderboard: type your name in a pop-up after the game ends',
  'Papan markah ikut kelas. Sabum boleh tambah kelas dalam Mod Sabum (Tetapan)': 'Leaderboards by class. Sabum can add classes in Sabum Mode (Settings)',
  'Kelas': 'Class', '🏆 Pilih kelas anda': '🏆 Choose your class', 'Belum masuk 10 teratas': 'Not in the top 10 yet', 'Tutup': 'Close',
  'Pilih kelas dahulu.': 'Choose a class first.', 'Pilih kelas lain': 'Choose another class', 'Semua kelas': 'All classes',
  'Markah ini belum cukup untuk masuk # teratas kelas ini. Cuba lagi!': 'This score is not enough for the top # of this class yet. Try again!',
  '# teratas setiap game dan setiap kelas. Disimpan dalam peranti ini sahaja.': 'Top # for each game and each class. Stored on this device only.',
  'Mod Sabum': 'Sabum Mode', 'Mod Sabum: urus kelas': 'Sabum Mode: manage classes', 'Buka Mod Sabum': 'Open Sabum Mode',
  'Urus senarai kelas dan papan markah. Dikunci dengan PIN.': 'Manage the class list and leaderboards. Locked with a PIN.',
  'Untuk Sabum sahaja: urus senarai kelas dan papan markah.': 'For Sabum only: manage the class list and leaderboards.',
  'Masukkan PIN Sabum': 'Enter Sabum PIN', 'Tetapkan PIN Sabum (# nombor)': 'Set a Sabum PIN (# digits)', 'Ulang PIN': 'Repeat PIN',
  'Buka': 'Open', 'Simpan PIN': 'Save PIN', 'Ingat PIN ini. Pelajar tidak boleh ubah kelas atau padam markah tanpa PIN.': 'Remember this PIN. Students cannot change classes or delete scores without it.',
  'PIN mesti # nombor.': 'PIN must be # digits.', 'PIN salah.': 'Wrong PIN.', 'PIN tidak sama. Cuba lagi.': 'PINs do not match. Try again.',
  'Senarai kelas': 'Class list', 'Belum ada kelas. Tambah kelas pertama di bawah.': 'No classes yet. Add the first class below.',
  'Nama kelas': 'Class name', 'Nama kelas baru': 'New class name', 'Contoh: BK5 Isnin': 'Example: BK5 Monday', 'Tambah': 'Add', 'Padam?': 'Delete?',
  'Kelas ini sudah ada.': 'This class already exists.', 'Tukar PIN': 'Change PIN', 'Kunci semula': 'Lock again',
  'Tukar nama terus dalam kotak. Padam kelas akan memadam markah kelas itu juga. Untuk padam satu nama, buka Papan markah dan tekan ✕.': 'Rename directly in the box. Deleting a class also deletes its scores. To delete one name, open Leaderboard and tap ✕.',
  'Paparan penuh untuk tablet kecil (contoh Xiaomi/Redmi Pad 8–9 inci)': 'Full-screen layout for small tablets (e.g. Xiaomi/Redmi Pad 8–9 inch)',
  'Simpan': 'Save', 'Nama panggilan': 'Nickname', 'Tulis nama dahulu.': 'Type a name first.', 'Pemain': 'Player',
  'Belum ada nama. Jadilah yang pertama!': 'No names yet. Be the first!', 'Cuba lagi!': 'Try again!',
  'Kosongkan papan ini': 'Clear this board', 'Ya, kosongkan': 'Yes, clear', 'untuk pemain seterusnya.': 'for the next player.', 'Main lagi': 'Play again',
  '# teratas setiap game. Disimpan dalam peranti ini sahaja.': 'Top # for each game. Stored on this device only.',
  '# ms': '# ms', '# m': '# m', '#% tepat': '#% accurate', '#/# pecah': '#/# broken', '#/# betul': '#/# correct', '# cubaan': '# tries', '# saat': '# sec',
  '# langkah': '# steps', '# kesilapan': '# mistakes', '#/# disusun': '#/# placed', '#/# ditangkis': '#/# blocked', '# papan': '# boards',
  'Kenapa main game ini?': 'Why play this game?', 'Kongsi game ini': 'Share this game',
  "Refleks": "Reflexes",
  "Disiplin": "Discipline",
  "Melatih masa reaksi dan kawalan diri. Dalam sparring, kita serang bila ada peluang, bukan setiap kali lawan bergerak.": "Trains reaction time and self-control. In sparring we attack when there is an opening, not every time the opponent moves.",
  "Ketangkasan": "Agility",
  "Koordinasi": "Coordination",
  "Melatih mata dan tangan bekerjasama dengan pantas, serta kekal fokus walaupun semakin laju.": "Trains the eyes and hands to work together quickly, and to stay focused as things speed up.",
  "Sportsmanship": "Sportsmanship",
  "Melatih reaksi pantas pada arahan Sijak, dan cara menang atau kalah dengan hormat.": "Trains a fast reaction to the Sijak command, and how to win or lose with respect.",
  "Stamina": "Stamina",
  "Semangat": "Spirit",
  "Melatih kelajuan dan tahan lasak. Jangan putus asa sehingga tamat, macam semangat Indomitable Spirit.": "Trains speed and endurance. Never give up until the end, like the Indomitable Spirit tenet.",
  "Ketepatan masa": "Timing",
  "Tenang": "Calm",
  "Melatih timing yang tepat walaupun dalam tekanan pertandingan.": "Trains precise timing even under competition pressure.",
  "Membaca lawan": "Reading opponents",
  "Pertahanan": "Defence",
  "Melatih membaca serangan lawan dan bertukar antara menyerang dan bertahan, macam dalam Matsogi.": "Trains reading the opponent's attack and switching between attacking and defending, like in Matsogi.",
  "Kesedaran arah": "Direction awareness",
  "Melatih mata membaca serangan dari setiap arah dan memilih tangkisan yang betul dengan pantas.": "Trains the eyes to read attacks from every direction and choose the right block quickly.",
  "Fokus": "Focus",
  "Memecah papan perlukan timing dan tumpuan penuh. Game ini melatih kedua-duanya.": "Breaking boards needs timing and full concentration. This game trains both.",
  "Istilah": "Terminology",
  "Faham arahan": "Understanding commands",
  "Membantu faham kiraan dan arahan Sabum dalam bahasa Korea, supaya lebih yakin di kelas.": "Helps you understand Korean counting and the Sabum's commands, so you feel more confident in class.",
  "Memori": "Memory",
  "Tumpuan": "Concentration",
  "Melatih daya ingatan dan tumpuan mata, kemahiran yang penting untuk menghafal Tul.": "Trains memory and visual focus, an important skill for memorising Tul.",
  "Memori urutan": "Sequence memory",
  "Dengar arahan": "Following instructions",
  "Melatih mengingat urutan langkah, sama seperti mengingat pergerakan dalam Tul.": "Trains remembering a sequence of steps, just like remembering the moves in a Tul.",
  "Pengetahuan": "Knowledge",
  "Persediaan grading": "Grading prep",
  "Mengenal turutan tali pinggang dan Kup, serta maknanya, sebagai persediaan grading.": "Learn the order of belts and Kup and what they mean, as preparation for grading.",
  "Menghafal turutan pergerakan Tul sebelum grading.": "Memorise the order of Tul movements before grading.",
  "Belajar makna Tul dan sejarah ITF untuk soalan teori grading.": "Learn the meaning of each Tul and ITF history for grading theory questions.",
  'Versi baru tersedia': 'New version available', 'Tekan untuk dapatkan ciri terkini.': 'Tap to get the latest features.', 'Kemas kini': 'Update',
  '✅ MIQ Arena dikemas kini!': '✅ MIQ Arena has been updated!', 'Apa yang baru': "What's new", 'OK, faham': 'OK, got it',
  'Notifikasi bila ada versi baru': 'A notification when a new version is out',
  'Tulis nama selepas tamat game & papan markah 10 teratas': 'Type your name after a game & top 10 leaderboard',
  'Setiap game ada penerangan "Kenapa main game ini?"': 'Every game explains "Why play this game?"',
  '/saat': '/sec', 'Bahasa': 'Language', 'Pilih bahasa app': 'Choose the app language',
  // ---- Flying Kick Dash ----
  'Tendang melompat, lalu celah pad': 'Flying kick through the pad gaps', 'Masa & rentak': 'Timing & rhythm', 'Fokus': 'Focus',
  'Melatih rentak dan kawalan masa. Tendangan melompat yang baik perlukan tenaga yang terkawal, bukan sekadar kuat.': 'Trains rhythm and timing control. A good flying kick needs controlled power, not just strength.',
  'Ketik skrin untuk tendangan melompat. Lalu celah antara pad tanpa terlanggar. Tali pinggang anda naik bila markah bertambah.': 'Tap the screen to do a flying kick. Pass through the gaps between pads without crashing. Your belt goes up as your score rises.',
  'Tali pinggang': 'Belt', 'skrin': 'the screen', 'Tendangan melompat': 'Flying kick', 'Lalu': 'Pass the', 'celah': 'gap', 'antara pad': 'between pads',
  '+# markah': '+# point', 'Tekan': 'Press', 'Perisai # saat': '# sec shield', 'DIMAIN': 'PLAYED', 'Rekod #': 'Record #', 'rekod #': 'record #',
  'Kawasan game. Ketik untuk melompat.': 'Game area. Tap to jump.', 'Kiai, perisai sekejap': 'Kiai, short shield',
  'Ketik untuk mula': 'Tap to start', 'Ketik untuk sambung': 'Tap to resume', 'Tamat': 'Finished', 'Celah dilalui': 'Gaps passed', '# celah': '# gaps',
  'Rekod anda: # celah. Boleh lebih tinggi?': 'Your record: # gaps. Can you go higher?', 'Tendang melompat dan lalu celah pad!': 'Flying kick through the pad gaps!',
  'Petua: jangan ketik terlalu laju. Ketik sekali-sekala dan biarkan badan jatuh sedikit sebelum ketik lagi.': 'Tip: do not tap too fast. Tap now and then and let your body drop a little before tapping again.',
  'Petua: guna butang KIAI! bila celah nampak terlalu sempit. Perisai melindungi anda selama # saat.': 'Tip: use the KIAI! button when a gap looks too narrow. The shield protects you for # seconds.',
  'Hebat! Kekal tenang dan ikut rentak, macam tendangan melompat yang terkawal.': 'Great! Stay calm and keep the rhythm, like a controlled flying kick.',
  'Tendangan terbang': 'Flying kick', 'Terbang tali hitam': 'Black belt flyer',
  'Flying Kick Dash: lalu # celah': 'Flying Kick Dash: pass # gaps', 'Flying Kick Dash: capai tali pinggang Hijau (# celah)': 'Flying Kick Dash: reach Green belt (# gaps)',
  'Nada dalam Ikut Sabum dan Flying Kick Dash': 'Tones in Follow Sabum and Flying Kick Dash',
  'Game baharu: Flying Kick Dash! Tendang melompat, lalu celah pad dan naikkan tali pinggang': 'New game: Flying Kick Dash! Flying kick through pad gaps and raise your belt',
  'Tali pinggang Putih': 'White belt', '# lagi untuk Putih': '# more for White', 'Tali pinggang Kuning': 'Yellow belt', '# lagi untuk Kuning': '# more for Yellow', 'Tali pinggang Hijau': 'Green belt', '# lagi untuk Hijau': '# more for Green', 'Tali pinggang Biru': 'Blue belt', '# lagi untuk Biru': '# more for Blue', 'Tali pinggang Merah': 'Red belt', '# lagi untuk Merah': '# more for Red', 'Tali pinggang Hitam': 'Black belt', '# lagi untuk Hitam': '# more for Black',
};

// Corak untuk teks yang mengandungi nama atau perkataan berubah. (bahagian dalam kurungan diterjemah semula)
const I18N_PATTERNS = [
  [/^Tulis nama anda · tempat #(\d+)$/, m => `Type your name · place #${m[1]}`],
  [/^✍️ Tulis nama · tempat #(\d+)$/, m => `✍️ Type your name · place #${m[1]}`],
  [/^Tempat #(\d+)$/, m => `Place #${m[1]}`],
  [/^✓ Disimpan di tempat #(\d+)\. Tekan$/, m => `✓ Saved in place #${m[1]}. Tap`],
  [/^Markah ini belum cukup untuk masuk (\d+) teratas\. Cuba lagi!$/, m => `This score is not enough for the top ${m[1]}. Try again!`],
  [/^Main (.+)$/, m => `Play ${m[1]}`],
  [/^Hai, (.+)!$/, m => `Hi, ${m[1]}!`],
  [/^Mula tahap (.+)$/, m => `Start ${tr0(m[1])} level`],
  [/^Tahap (.+) kini dibuka!$/, m => `${tr0(m[1])} level unlocked!`],
  [/^Tahap (.+)$/, m => `Level ${tr0(m[1])}`],
  [/^XP ke pangkat (.+)$/, m => `XP to ${tr0(m[1])} rank`],
  [/^Rekod (.+)$/, m => `${tr0(m[1])} record`],
  [/^selepas (.+)\.$/, m => `belt after ${tr0(m[1])}.`],
  [/^(Betul!|Belum tepat\.) (.+) = (.+)$/, m => `${m[1] === 'Betul!' ? 'Correct!' : 'Not quite.'} ${m[2]} = ${tr0(m[3])}`],
  [/^(.+) \((Hong|Chong)\)$/, m => `${tr0(m[1])} (${m[2]})`],
  [/^(.+) terpantas$/, m => `${tr0(m[1])} fastest`],
  [/^XP setiap hari untuk (\d+) hari lepas: (.+)$/, m => `Daily XP for the last ${m[1]} days: ${m[2].replace(/[A-Z][a-z]{2}/g, d => I18N[d] || d)}`],
  [/^WhatsApp (.+)$/, m => `WhatsApp ${m[1]}`],
];

const isEN = () => !!(typeof S !== 'undefined' && S && S.settings && S.settings.lang === 'en');
function tr0(t){
  if (I18N[t] !== undefined) return I18N[t];
  const nums = t.match(/\d[\d,.]*/g);
  if (nums) {
    const key = t.replace(/\d[\d,.]*/g, '#');
    if (I18N[key] !== undefined) { let i = 0; return I18N[key].replace(/#/g, () => nums[i++] ?? '#'); }
  }
  if (t.includes(' · ')) return t.split(' · ').map(p => tr0(p.trim())).join(' · ');
  if (t.endsWith(' ·')) return tr0(t.slice(0, -2)) + ' ·';
  if (t.startsWith('· ')) return '· ' + tr0(t.slice(2));
  for (const [re, fn] of I18N_PATTERNS) { const m = t.match(re); if (m) return fn(m); }
  return t;
}
// Terjemah satu teks (kekalkan ruang di hujung). Dipanggil juga oleh lukisan kanvas Dojang Run.
function tr(s){
  if (!isEN() || !s) return s;
  const m = String(s).match(/^(\s*)([\s\S]*?)(\s*)$/);
  return m[2] ? m[1] + tr0(m[2]) + m[3] : s;
}
function trNode(n){
  if (n.nodeType === 3) { const v = n.nodeValue, t = tr(v); if (t !== v) n.nodeValue = t; return; }
  if (n.nodeType !== 1) return;
  for (const a of ['aria-label', 'placeholder']) { const v = n.getAttribute(a); if (v) { const t = tr(v); if (t !== v) n.setAttribute(a, t); } }
  const w = document.createTreeWalker(n, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT);
  let c; while ((c = w.nextNode())) { if (c !== n) trNode1(c); }
}
function trNode1(c){
  if (c.nodeType === 3) { const v = c.nodeValue, t = tr(v); if (t !== v) c.nodeValue = t; return; }
  for (const a of ['aria-label', 'placeholder']) { const v = c.getAttribute(a); if (v) { const t = tr(v); if (t !== v) c.setAttribute(a, t); } }
}
function applyLang(){
  document.documentElement.lang = isEN() ? 'en' : 'ms';
  if (isEN()) trNode(document.getElementById('app'));
}
// Terjemah automatik setiap kali skrin berubah
new MutationObserver(muts => {
  if (!isEN()) return;
  for (const m of muts) {
    if (m.type === 'characterData') trNode(m.target);
    else if (m.type === 'attributes') trNode1(m.target);
    else m.addedNodes.forEach(trNode);
  }
}).observe(document.getElementById('app'), {subtree:true, childList:true, characterData:true, attributes:true, attributeFilter:['aria-label','placeholder']});
