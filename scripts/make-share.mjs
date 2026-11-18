// Jana halaman kongsi /g/<id> (preview WhatsApp untuk setiap game) dan og/_render.html (templat gambar 1200x630).
// Jalankan: node scripts/make-share.mjs
// Kemudian jana PNG (perlu Google Chrome), dari folder repo:
//   python3 -m http.server 8000
//   google-chrome --headless --hide-scrollbars --window-size=1200,630 --screenshot=og/matsogi.png "http://localhost:8000/og/_render.html#matsogi"
// Ulang untuk setiap id game (senarai dicetak di hujung skrip ini).
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import vm from 'node:vm';

const BASE = 'https://miq-arena.vercel.app';
const core = readFileSync('js/core.js', 'utf8');
const gamesSrc = core.match(/const GAMES = (\[[\s\S]*?\n\]);/)[1];
const ctx = {};
vm.runInNewContext(readFileSync('js/art.js', 'utf8') + `\nthis.GAMES = ${gamesSrc}; this.art = art;`, ctx);
const games = ctx.GAMES.filter(g => g.ready);
const esc = s => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

mkdirSync('g', { recursive: true });
mkdirSync('og', { recursive: true });
for (const g of games) {
  const title = `${g.nm} · MIQ Arena`;
  const desc = `${g.d}. ${g.mp ? 'Main berdua di satu telefon. ' : ''}Percuma, tanpa daftar akaun.`;
  writeFileSync(`g/${g.id}.html`, `<!doctype html>
<html lang="ms">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="MIQ Arena">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:image" content="${BASE}/og/${g.id}.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:url" content="${BASE}/g/${g.id}">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#0a0a0a">
<meta http-equiv="refresh" content="0;url=/#${g.id}">
<script>location.replace('/#${g.id}')</script>
</head>
<body style="background:#0a0a0a;color:#fff;font-family:system-ui,sans-serif;padding:24px">
<p>Membuka <a href="/#${g.id}" style="color:#f5c400">${esc(g.nm)}</a>…</p>
</body>
</html>
`);
}

// Templat gambar: setiap kad 1200x630, papar satu ikut #id
const cards = games.map(g => `<section class="og" id="${g.id}">
  <div class="l">
    <span class="brand"><b>MIQ</b> ARENA</span>
    <span class="mode">${g.mp ? '2 PEMAIN · SATU TELEFON' : 'MAIN SENDIRI'}</span>
    <h1>${esc(g.nm)}</h1>
    <p>${esc(g.d)}</p>
    <div class="tags">${(g.why || []).map(t => `<i>${esc(t)}</i>`).join('')}</div>
    <span class="foot">Percuma · tanpa akaun · MIQ Taekwon-Do Academy</span>
  </div>
  <div class="r">${ctx.art(g.id)}</div>
</section>`).join('\n');
writeFileSync('og/_render.html', `<!doctype html>
<html lang="ms"><head><meta charset="utf-8"><title>OG render</title>
<style>
html,body{margin:0;background:#0a0a0a}
.og{width:1200px;height:630px;box-sizing:border-box;padding:64px 60px 56px 72px;display:flex;align-items:center;gap:48px;position:relative;overflow:hidden;
  background:#0a0a0a;color:#fff;font-family:Geist,"Helvetica Neue",Arial,sans-serif}
.og:target ~ .og, .og:has(~ .og:target){display:none}
.og:before{content:"";position:absolute;right:-90px;top:-90px;width:260px;height:260px;background:repeating-linear-gradient(135deg,#f5c400 0 22px,#6b5200 22px 34px,transparent 34px 52px)}
.l{flex:1;display:flex;flex-direction:column;gap:18px;min-width:0;align-self:stretch;justify-content:center}
.brand{font-size:30px;font-weight:900;letter-spacing:-.02em}.brand b{color:#f5c400}
.mode{font-size:20px;font-weight:700;letter-spacing:.08em;color:rgba(255,255,255,.6)}
h1{margin:0;font-size:72px;line-height:1.02;letter-spacing:-.03em;font-weight:900}
h1:after{content:"";display:block;width:90px;height:8px;background:#f5c400;margin-top:22px;border-radius:2px}
p{margin:0;font-size:30px;line-height:1.3;color:rgba(255,255,255,.85)}
.tags{display:flex;gap:10px;flex-wrap:wrap}.tags i{font-style:normal;font-size:22px;font-weight:700;background:#f5c400;color:#0a0a0a;padding:6px 14px;border-radius:999px}
.foot{margin-top:auto;font-size:20px;color:rgba(255,255,255,.5)}
.r{width:520px;flex:none;position:relative}
.art{display:block;width:100%;aspect-ratio:16/9;border-radius:28px;overflow:hidden;box-shadow:0 0 0 2px rgba(255,255,255,.18),0 30px 60px -20px rgba(245,196,0,.35)}
.art svg{display:block;width:100%;height:100%}
</style></head><body>
${cards}
</body></html>
`);
console.log(`✓ ${games.length} halaman /g/ dan og/_render.html dijana.\nId: ${games.map(g => g.id).join(' ')}`);
