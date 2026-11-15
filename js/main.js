// MIQ Arena — permulaan app (dimuatkan selepas core.js dan semua fail game)
route();
applyLang();

// Service worker: app boleh dipasang dan dibuka tanpa internet (hanya di laman sebenar, bukan pratonton)
if ('serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost')) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js').catch(() => {});
  });
}
