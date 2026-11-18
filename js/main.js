// MIQ Arena — permulaan app (dimuatkan selepas core.js dan semua fail game)
route();
applyLang();

// Service worker: app boleh dipasang dan dibuka tanpa internet (hanya di laman sebenar, bukan pratonton)
if ('serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost')) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js').then(reg => {
      // Semak versi baru setiap kali app dibuka semula dari latar belakang
      document.addEventListener('visibilitychange', () => { if (!document.hidden) reg.update().catch(() => {}); });
      setInterval(() => reg.update().catch(() => {}), 30 * 60 * 1000); // semak setiap 30 minit
    }).catch(() => {});
  });
  // Versi baru dah dipasang: muat semula sendiri, tapi tunggu sehingga pemain tukar halaman (bukan tengah main)
  if (navigator.serviceWorker.controller) {
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      showUpdateBar();
      window.addEventListener('hashchange', () => location.reload(), {once:true});
    });
  }
}

// ================= Notifikasi kemas kini =================
// Tukar APP_VER dan WHATS_NEW setiap kali keluarkan versi baru (sama dengan VERSION dalam sw.js).
const APP_VER = '1.10.0';
const WHATS_NEW = [
  'Game baharu: Flying Kick Dash! Tendang melompat, lalu celah pad dan naikkan tali pinggang',
  'Paparan penuh untuk tablet kecil (contoh Xiaomi/Redmi Pad 8–9 inci)',
  'Papan markah ikut kelas. Sabum boleh tambah kelas dalam Mod Sabum (Tetapan)',
  'Papan markah: tulis nama dalam pop up selepas tamat game',
  'Dojang Run: Mod Dikejar baharu! Lari daripada Harimau Putih atau Sabum Garang',
];
function showUpdateBar(){
  if (document.getElementById('updBar')) return;
  const el = document.createElement('div');
  el.id = 'updBar'; el.className = 'updbar'; el.setAttribute('role', 'status');
  el.innerHTML = `<span class="ud">🔔</span><span class="ut"><b>Versi baru tersedia</b><span>Tekan untuk dapatkan ciri terkini.</span></span>
    <button class="btn p" id="updGo">Kemas kini</button><button class="ux" id="updX" aria-label="Tutup">✕</button>`;
  document.body.appendChild(el);
  el.querySelector('#updGo').onclick = () => location.reload();
  el.querySelector('#updX').onclick = () => el.remove();
  if (isEN()) trNode(el);
}
function showWhatsNew(){
  let prev = null; try { prev = localStorage.getItem('miq-ver'); localStorage.setItem('miq-ver', APP_VER); } catch(e) { return; }
  if (!prev || prev === APP_VER) return; // pengguna baru atau tiada perubahan
  const el = document.createElement('div');
  el.className = 'updwrap'; el.id = 'updNew';
  el.innerHTML = `<div class="card updnew" role="dialog" aria-modal="true" aria-labelledby="updT">
    <span class="pill y" style="align-self:flex-start">v${APP_VER}</span>
    <h2 id="updT" style="margin:0;font-size:20px">✅ MIQ Arena dikemas kini!</h2>
    <span class="label">Apa yang baru</span>
    <ul>${WHATS_NEW.map(t => `<li>${t}</li>`).join('')}</ul>
    <button class="btn p full" id="updOk">OK, faham</button></div>`;
  document.body.appendChild(el);
  el.querySelector('#updOk').onclick = () => el.remove();
  el.onclick = e => { if (e.target === el) el.remove(); };
  if (isEN()) trNode(el);
}
showWhatsNew();
