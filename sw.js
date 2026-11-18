// MIQ Arena — service worker: simpan fail app supaya boleh dibuka tanpa internet.
// Tukar VERSION setiap kali kod dikemas kini supaya telefon pemain dapat versi baharu.
const VERSION = 'miq-arena-v1.8.0';
const SHELL = [
  "./",
  "index.html",
  "css/app.css",
  "js/art.js",
  "js/core.js",
  "js/i18n.js",
  "js/main.js",
  "manifest.webmanifest",
  "icons/icon-192.png",
  "icons/icon-512.png",
  "icons/maskable-512.png",
  "icons/apple-touch-icon.png",
  "icons/favicon-32.png",
  "js/games/matsogi.js",
  "js/games/kyokpa.js",
  "js/games/kuiz.js",
  "js/games/memori.js",
  "js/games/sabum.js",
  "js/games/tali.js",
  "js/games/run.js",
  "js/games/duel.js",
  "js/games/tarik.js",
  "js/games/klumba.js",
  "js/games/tangkis.js",
  "js/games/serang.js",
  "js/games/kick.js"
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
// Guna salinan simpanan dahulu (laju, boleh tanpa internet), dan kemas kini di belakang tabir
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  const sameOrigin = url.origin === self.location.origin;
  const fonts = /fonts\.(googleapis|gstatic)\.com$/.test(url.hostname);
  if (!sameOrigin && !fonts) return;
  e.respondWith(caches.open(VERSION).then(async cache => {
    const hit = await cache.match(req, {ignoreSearch: sameOrigin});
    const net = fetch(req).then(res => { if (res && (res.ok || res.type === 'opaque')) cache.put(req, res.clone()); return res; }).catch(() => hit);
    return hit || net;
  }));
});
