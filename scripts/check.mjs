// Semak pantas sebelum push: sintaks setiap fail JS dan nama global yang bertindih antara fail.
// Jalankan: node scripts/check.mjs
import { readFileSync, readdirSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
const files = ['js/core.js', 'js/i18n.js', ...readdirSync('js/games').map(f => 'js/games/' + f), 'js/main.js'];
let bad = 0;
const seen = new Map();
for (const f of files) {
  try { execFileSync(process.execPath, ['--check', f], { stdio: 'pipe' }); }
  catch (e) { console.error(`✗ Ralat sintaks dalam ${f}\n${e.stderr}`); bad++; }
  const src = readFileSync(f, 'utf8');
  for (const m of src.matchAll(/^(?:function|const|let|var)\s+([A-Za-z_$][\w$]*)/gm)) {
    const n = m[1];
    if (seen.has(n)) { console.error(`✗ Nama "${n}" diisytihar dalam ${seen.get(n)} dan ${f}`); bad++; }
    else seen.set(n, f);
  }
}
if (bad) { console.error(`\n${bad} masalah dijumpai.`); process.exit(1); }
console.log(`✓ ${files.length} fail OK, ${seen.size} nama global, tiada pertindihan.`);
