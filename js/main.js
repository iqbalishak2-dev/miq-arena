// MIQ Arena — permulaan app (dimuatkan selepas core.js dan semua fail game)
route();
applyLang();

// Service worker: app boleh dipasang dan dibuka tanpa internet (hanya di laman sebenar, bukan pratonton)
if ('serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost')) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js').then(reg => {
      // Semak versi baru setiap kali app dibuka semula dari latar belakang
      document.addEventListener('visibilitychange', () => { if (!document.hidden) reg.update().catch(() => {}); });
    }).catch(() => {});
  });
  // Versi baru dah dipasang: muat semula sendiri, tapi tunggu sehingga pemain tukar halaman (bukan tengah main)
  if (navigator.serviceWorker.controller) {
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      window.addEventListener('hashchange', () => location.reload(), {once:true});
    });
  }
}
