# MIQ Arena · Taekwon-Do Games

Hub game untuk pelajar **MIQ Taekwon-Do Academy** (ITF). 13 game, main sendiri atau berdua di satu telefon. Percuma, tanpa akaun. Semua rekod disimpan dalam telefon pemain sahaja.

## Game

| Main sendiri | Main berdua |
|---|---|
| Matsogi Reflex, Dojang Run, Kyokpa Timing, Kuiz Asas, Memori Padan, Ikut Sabum, Susun Tali Pinggang, Tangkis!, Flying Kick Dash | Duel Refleks, Tarik Tali, Kyokpa Lumba, Serang & Tangkis |

Ciri lain: profil (nama panggilan), XP dan Pangkat Arena, lencana, Cabaran Harian, rekod 7 hari, tetapan bunyi/getaran, app boleh dipasang (PWA) dan dibuka tanpa internet.

## Struktur

```
index.html              Halaman utama (meta, pratonton WhatsApp, muat skrip)
css/app.css             Semua gaya (kuning + hitam)
js/core.js              Data, simpanan, navigasi, laman utama, rekod, profil, tetapan, cabaran harian
js/games/*.js           Satu fail untuk setiap game
js/main.js              Mula app + daftar service worker
sw.js                   Simpanan luar talian (tukar VERSION setiap kali kemas kini)
manifest.webmanifest    Maklumat app untuk "Pasang ke skrin utama"
icons/, og-image.png    Ikon app dan gambar pratonton link
scripts/check.mjs       Semakan sebelum push
```

Tiada langkah build. Semua fail ialah HTML, CSS dan JavaScript biasa.

## Jalankan di komputer

```bash
python3 -m http.server 8000
# buka http://localhost:8000
```

## Sebelum push

```bash
node scripts/check.mjs
```

Ia menyemak ralat sintaks dan nama fungsi yang bertindih antara fail (punca pepijat Susun Tali Pinggang dahulu).

## Deploy ke Vercel

1. Masuk ke vercel.com → **Add New → Project** → pilih repo `miq-arena`.
2. Framework Preset: **Other**. Build command dan output directory dibiarkan kosong.
3. Tekan **Deploy**.
4. Jika domain bukan `miq-arena.vercel.app`, tukar `og:image` dan `og:url` dalam `index.html`.

## Kemas kini app

Setiap kali kod ditukar, naikkan `VERSION` dalam `sw.js` (contohnya `miq-arena-v1.0.1`). Kalau tidak, telefon yang sudah memasang app akan terus guna versi lama.

## Tambah game baharu

1. Buat `js/games/namagame.js` (ikut corak fail sedia ada: `viewX`, `startX`, `xFinish`).
2. Tambah entri dalam `GAMES` (`js/core.js`) dan laluan dalam `route()`.
3. Tambah `<script>` dalam `index.html` dan nama fail dalam `SHELL` di `sw.js`.
4. Jalankan `node scripts/check.mjs`.
