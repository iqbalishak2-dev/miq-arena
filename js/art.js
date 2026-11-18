// Gambar preview untuk setiap game (SVG dalam kod: ringan, jalan tanpa internet).
// Tambah game baharu: tambah satu entri dalam ART_SVG ikut id game dalam GAMES.
const ART_C = {y:'#f5c400', yd:'#6b5200', b:'#1d4ed8', r:'#e10600', w:'#fff', g:'#2a2a2a', ok:'#15803d', wood:'#c98a4b', woodd:'#7a4a1e'};
const ART_BG = `<rect width="160" height="90" fill="#0a0a0a"/><polygon points="126,0 138,0 160,22 160,34" fill="${ART_C.y}"/><polygon points="144,0 150,0 160,10 160,16" fill="${ART_C.yd}"/>`;
// Figura lidi ringkas
const artFig = (d, head) => `<circle cx="${head[0]}" cy="${head[1]}" r="5.5" fill="${ART_C.w}"/><path d="${d}" stroke="${ART_C.w}" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
const ART_SVG = {
  matsogi: `<g stroke="${ART_C.y}" stroke-width="3" stroke-linecap="round"><path d="M52 14v6M52 68v6M22 44h6M76 44h6M31 23l4 4M69 61l4 4M31 65l4-4M69 27l4-4"/></g>
    <circle cx="52" cy="44" r="18" fill="${ART_C.b}"/><circle cx="52" cy="44" r="11" fill="none" stroke="${ART_C.w}" stroke-opacity=".5" stroke-width="2"/>
    <circle cx="112" cy="50" r="15" fill="${ART_C.r}" opacity=".85"/><path d="M106 44l12 12M118 44l-12 12" stroke="${ART_C.w}" stroke-width="3" stroke-linecap="round"/>
    <text x="52" y="84" fill="${ART_C.w}" font-size="8" font-weight="800" text-anchor="middle" font-family="sans-serif">CHONG</text><text x="112" y="84" fill="${ART_C.w}" font-size="8" font-weight="800" text-anchor="middle" font-family="sans-serif" opacity=".7">HONG</text>`,
  run: `<path d="M0 76h160" stroke="#333" stroke-width="2"/><g stroke="${ART_C.y}" stroke-width="2.5" stroke-linecap="round" opacity=".7"><path d="M16 34h18M10 44h20M18 54h14"/></g>
    ${artFig('M58 37l-2 15M58 41l-10 6M58 41l10-5M56 52l-9 7-3-6M56 52l18-2', [59,30])}
    <rect x="80" y="40" width="7" height="24" rx="1.5" fill="${ART_C.wood}"/><path d="M83.5 40l-2 8 3 6-2 10" stroke="${ART_C.woodd}" stroke-width="1.5" fill="none"/>
    <rect x="116" y="64" width="12" height="12" rx="2" fill="${ART_C.y}"/>`,
  kick: `<rect x="100" y="4" width="16" height="28" rx="4" fill="${ART_C.r}"/><rect x="100" y="58" width="16" height="26" rx="4" fill="${ART_C.b}"/>
    <path d="M14 80Q28 42 42 36" stroke="${ART_C.y}" stroke-width="2.5" stroke-dasharray="4 4" fill="none" stroke-linecap="round"/>
    ${artFig('M48 41l14 6M62 47l28-2M62 47l-6 10 9 3M50 42l-8 8', [44,36])}`,
  duel: `<circle cx="38" cy="54" r="19" fill="${ART_C.r}"/><circle cx="38" cy="54" r="12" fill="none" stroke="${ART_C.w}" stroke-opacity=".45" stroke-width="2"/>
    <circle cx="122" cy="54" r="19" fill="${ART_C.b}"/><circle cx="122" cy="54" r="12" fill="none" stroke="${ART_C.w}" stroke-opacity=".45" stroke-width="2"/>
    <path d="M84 36l-10 14h9l-6 14 14-18h-9l6-10z" fill="${ART_C.y}"/>
    <text x="80" y="26" fill="${ART_C.y}" font-size="14" font-weight="900" text-anchor="middle" font-family="sans-serif">SIJAK!</text>`,
  tarik: `<path d="M80 8v74" stroke="${ART_C.w}" stroke-opacity=".25" stroke-width="2" stroke-dasharray="4 4"/>
    <rect x="12" y="42" width="136" height="9" rx="2" fill="#1a1a1a" stroke="#666" stroke-width="1.5"/><rect x="77" y="34" width="6" height="25" rx="2" fill="${ART_C.y}"/>
    <circle cx="16" cy="46.5" r="8" fill="${ART_C.r}"/><circle cx="144" cy="46.5" r="8" fill="${ART_C.b}"/>
    <path d="M50 24H26m6-6l-6 6 6 6" stroke="${ART_C.r}" stroke-width="3.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M110 70h24m-6-6l6 6-6 6" stroke="${ART_C.b}" stroke-width="3.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`,
  klumba: `<rect x="18" y="26" width="46" height="34" rx="2" fill="${ART_C.wood}"/><path d="M41 26l-3 9 5 8-4 9 2 8" stroke="${ART_C.woodd}" stroke-width="2" fill="none"/>
    <g transform="rotate(-12 106 43)"><rect x="94" y="26" width="21" height="34" rx="2" fill="${ART_C.wood}"/></g><g transform="rotate(12 124 43)"><rect x="120" y="26" width="21" height="34" rx="2" fill="${ART_C.wood}"/></g>
    <g stroke="${ART_C.y}" stroke-width="2.5" stroke-linecap="round"><path d="M117 14v6M104 18l3 4M130 18l-3 4"/></g>
    <text x="41" y="80" fill="${ART_C.r}" font-size="10" font-weight="900" text-anchor="middle" font-family="sans-serif">P1</text><text x="117" y="80" fill="#5b8cff" font-size="10" font-weight="900" text-anchor="middle" font-family="sans-serif">P2</text>`,
  serang: `<rect x="8" y="40" width="24" height="13" rx="3" fill="${ART_C.r}" opacity=".8"/><rect x="28" y="34" width="28" height="25" rx="8" fill="${ART_C.r}"/>
    <path d="M36 40h12M36 46h12M36 52h12" stroke="#7a0300" stroke-width="2" stroke-linecap="round"/>
    <path d="M80 30l4 9 9-3-5 9 8 5-10 1 1 10-7-7-7 7 1-10-10-1 8-5-5-9 9 3z" fill="${ART_C.y}"/>
    <path d="M128 18l22 8v17c0 15-10 24-22 30-12-6-22-15-22-30V26z" fill="${ART_C.b}"/><path d="M128 30v32" stroke="${ART_C.w}" stroke-opacity=".5" stroke-width="2"/>`,
  tangkis: `<circle cx="80" cy="45" r="17" fill="none" stroke="${ART_C.y}" stroke-width="3"/>
    ${artFig('M80 44v12M80 47l-7-6M80 47l7-6', [80,38])}
    <g stroke="${ART_C.r}" stroke-width="3.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <path d="M80 4v16m-5-5l5 5 5-5"/><path d="M80 86V70m-5 5l5-5 5 5"/><path d="M34 45h16m-5-5l5 5-5 5"/><path d="M126 45h-16m5-5l-5 5 5 5"/></g>`,
  kyokpa: `<rect x="48" y="10" width="64" height="42" rx="2" fill="${ART_C.wood}"/><path d="M48 22h64M48 40h64" stroke="${ART_C.woodd}" stroke-opacity=".35" stroke-width="1.5"/>
    <path d="M80 10l-4 10 6 9-5 10 3 13" stroke="#3d2208" stroke-width="2.5" fill="none" stroke-linejoin="round"/>
    <g stroke="${ART_C.y}" stroke-width="2.5" stroke-linecap="round"><path d="M40 8l5 5M120 8l-5 5M38 40h6M122 40h-6"/></g>
    <rect x="20" y="66" width="120" height="9" rx="4.5" fill="#333"/><rect x="86" y="66" width="20" height="9" fill="${ART_C.y}"/><rect x="94" y="61" width="4" height="19" rx="2" fill="${ART_C.w}"/>`,
  kuiz: `<rect x="18" y="14" width="56" height="62" rx="10" fill="${ART_C.y}"/><text x="46" y="61" fill="#0a0a0a" font-size="44" font-weight="900" text-anchor="middle" font-family="sans-serif">?</text>
    <g font-size="9" font-weight="700" font-family="sans-serif" fill="${ART_C.w}">
    <rect x="86" y="16" width="56" height="16" rx="5" fill="${ART_C.g}"/><text x="94" y="27">Hana</text>
    <rect x="86" y="37" width="56" height="16" rx="5" fill="${ART_C.ok}"/><text x="94" y="48">Dul</text><path d="M128 45l3 3 6-6" stroke="${ART_C.w}" stroke-width="2" fill="none" stroke-linecap="round"/>
    <rect x="86" y="58" width="56" height="16" rx="5" fill="${ART_C.g}"/><text x="94" y="69">Set</text></g>`,
  memori: (() => { let s = ''; for (let i = 0; i < 8; i++) { const x = 27 + (i % 4) * 28, y = i < 4 ? 12 : 48, up = i === 1 || i === 6;
      s += up ? `<rect x="${x}" y="${y}" width="22" height="30" rx="4" fill="${ART_C.w}" stroke="${ART_C.y}" stroke-width="2.5"/><text x="${x+11}" y="${y+21}" fill="${ART_C.r}" font-size="15" font-weight="900" text-anchor="middle" font-family="sans-serif">3</text>`
        : `<rect x="${x}" y="${y}" width="22" height="30" rx="4" fill="${ART_C.g}"/><path d="M${x+11} ${y+9}l5 6-5 6-5-6z" fill="${ART_C.y}" opacity=".55"/>`; } return s; })(),
  sabum: `<rect x="40" y="10" width="34" height="30" rx="7" fill="${ART_C.r}" opacity=".35"/><rect x="86" y="10" width="34" height="30" rx="7" fill="${ART_C.b}" opacity=".35"/>
    <rect x="40" y="50" width="34" height="30" rx="7" fill="${ART_C.ok}" opacity=".35"/><rect x="86" y="50" width="34" height="30" rx="7" fill="${ART_C.y}" stroke="${ART_C.w}" stroke-width="2.5"/>
    <path d="M57 25L103 65" stroke="${ART_C.w}" stroke-opacity=".5" stroke-width="2" stroke-dasharray="3 4"/>
    <g font-size="11" font-weight="900" font-family="sans-serif" text-anchor="middle"><text x="57" y="29" fill="${ART_C.w}">1</text><text x="103" y="69" fill="#0a0a0a">2</text></g>`,
  tali: ['#ffffff','#eab308','#15803d','#1d4ed8','#c1121f','#111111'].map((c, i) =>
      `<rect x="${24 + i*4}" y="${11 + i*11}" width="104" height="8" rx="2" fill="${c}"${i === 5 ? ' stroke="#777" stroke-width="1.5"' : ''}/><rect x="${66 + i*4}" y="${9 + i*11}" width="8" height="12" rx="2" fill="${c}" stroke="#0a0a0a" stroke-width="1.5"/>`).join(''),
  tul: [[44,62],[66,44],[90,58],[112,38]].map(([x, y], i) =>
      `<ellipse cx="${x}" cy="${y}" rx="7" ry="11" fill="${ART_C.w}" opacity=".85" transform="rotate(${i%2?15:-15} ${x} ${y})"/><text x="${x}" y="${y - 16}" fill="${ART_C.y}" font-size="10" font-weight="900" text-anchor="middle" font-family="sans-serif">${i+1}</text>`).join(''),
  teori: `<path d="M80 26c-12-8-30-8-44-4v48c14-4 32-4 44 4 12-8 30-8 44-4V22c-14-4-32-4-44 4z" fill="${ART_C.w}"/><path d="M80 26v48" stroke="#0a0a0a" stroke-width="2"/>
    <g stroke="#999" stroke-width="2" stroke-linecap="round"><path d="M46 36h24M46 46h24M46 56h18M90 36h24M90 46h24M90 56h18"/></g>
    <text x="80" y="18" fill="${ART_C.y}" font-size="11" font-weight="900" text-anchor="middle" font-family="sans-serif">ITF</text>`
};
const art = id => `<span class="art" aria-hidden="true"><svg viewBox="0 0 160 90" xmlns="http://www.w3.org/2000/svg">${ART_BG}${ART_SVG[id] || ''}</svg></span>`;
