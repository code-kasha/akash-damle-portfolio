import { writeFile } from 'node:fs/promises'
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)
const sharp = createRequire(require.resolve('next/package.json'))('sharp')
const projects = [
  ['sk8r', ['sk8r'], 'DEVELOPER TOOLING', 'Keep your momentum.', '#f2a99b', 'terminal'],
  ['rootstock', ['Rootstock'], 'FOUNDATION', 'Start complete. Prune to fit.', '#b9df98', 'tree'],
  ['promeet-desk', ['Pro Meet Desk'], 'BOOKINGS', 'Time reserved. Privacy preserved.', '#a6dcd5', 'calendar'],
  ['lead-platform', ['Lead Management', 'Platform'], 'SALES', 'From first contact to next action.', '#d3bcf2', 'columns'],
  ['webhook-delivery', ['Webhook Delivery'], 'INTEGRATIONS', 'Events delivered with confidence.', '#f0bd91', 'nodes'],
  ['operations-api', ['Operations API'], 'OPERATIONS', 'Business workflows, connected.', '#a6c9ee', 'nodes'],
  ['bharat-post-dir', ['bharat-post-dir'], 'REFERENCE DATA', 'India, one PIN code at a time.', '#e7cc8e', 'pin'],
  ['roomwave', ['Roomwave'], 'COMMUNICATION', 'A shared space for conversation.', '#e9b1cc', 'chat'],
  ['fuelora', ['Fuelora'], 'PRICE DATA', 'Fuel prices. A clearer perspective.', '#bbd98e', 'chart'],
]

const box = (x, y, w, h, opacity = 1) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="12" fill="currentColor" fill-opacity="${opacity}"/>`
const line = (d) => `<path d="${d}" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>`
function illustration(type) {
  switch (type) {
    case 'tree': return line('M180 330V140M180 220L80 150V80M180 270L280 200V120') + [[180,110],[80,60],[280,95]].map(([x,y])=>box(x-25,y-25,50,50)).join('') + box(140,320,80,24)
    case 'calendar': return `<rect x="45" y="65" width="280" height="280" rx="20" fill="none" stroke="currentColor" stroke-width="5"/>` + line('M45 140H325M115 45V90M255 45V90') + [0,1,2].flatMap(r=>[0,1,2].map(c=>box(83+c*76,175+r*52,40,28,r===1&&c===1?1:.2))).join('')
    case 'columns': return [0,1,2].map((c)=>box(30+c*110,70,94,270,.08)+box(45+c*110,90,62,7,.5)+[0,1,2-c].slice(0,3-c).map((_,r)=>box(44+c*110,125+r*65,66,48,.25+c*.23)).join('')).join('')
    case 'nodes': return line('M75 195H170M200 195H290M185 180V85H290M185 210V305H290') + box(25,160,70,70) + [60,170,280].map(y=>box(280,y,60,50,.55)).join('') + `<circle cx="185" cy="195" r="24" fill="currentColor"/>`
    case 'pin': return `<path d="M185 350C155 310 65 225 65 150a120 120 0 0 1 240 0c0 75-90 160-120 200Z" fill="currentColor" fill-opacity=".12" stroke="currentColor" stroke-width="5"/><circle cx="185" cy="150" r="40" fill="none" stroke="currentColor" stroke-width="5"/>` + line('M75 365H295')
    case 'chat': return `<path d="M30 80H280V235H120L60 285V235H30Z" fill="currentColor" fill-opacity=".15" stroke="currentColor" stroke-width="5"/><path d="M145 275H280L330 320V165" fill="none" stroke="currentColor" stroke-width="5"/>` + [85,150,215].map(x=>`<circle cx="${x}" cy="155" r="9" fill="currentColor"/>`).join('')
    case 'terminal': return `<rect x="35" y="50" width="300" height="220" rx="18" fill="currentColor" fill-opacity=".08" stroke="currentColor" stroke-width="5"/>` + line('M35 95H335') + [62,87,112].map(x=>`<circle cx="${x}" cy="73" r="7" fill="currentColor" fill-opacity=".6"/>`).join('') + line('M68 135L95 155L68 175') + box(115,149,130,12,.6) + box(68,200,190,12,.25) + box(68,228,150,12,.25) + line('M35 350C135 352 205 342 255 326S318 304 335 298') + `<circle cx="335" cy="298" r="11" fill="currentColor"/>`
    case 'chart': return [0,1,2,3,4].map((c)=>box(30+c*65,310-[65,115,95,185,235][c],38,[65,115,95,185,235][c],.16+c*.16)).join('') + line('M35 185L110 145L175 170L240 90L310 45')
  }
}

for (const [slug, titles, category, subtitle, accent, type] of projects) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="640" viewBox="0 0 1280 640">
<title>${titles.join(' ')}</title><desc>${subtitle}</desc>
<defs><pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40 0H0V40" fill="none" stroke="#fff" stroke-opacity=".035"/></pattern></defs>
<rect width="1280" height="640" fill="#151d20"/><rect width="1280" height="640" fill="url(#grid)"/>
<circle cx="1050" cy="300" r="246" fill="${accent}" fill-opacity=".035"/>
<path d="M64 70H104" stroke="${accent}" stroke-width="5"/>
<g font-family="Segoe UI, Arial, sans-serif"><text x="122" y="78" fill="${accent}" font-size="20" font-weight="600" letter-spacing="4">${category}</text>
${titles.map((t,i)=>`<text x="64" y="${titles.length===1?300:255+i*76}" fill="#f3f3ed" font-size="${t.length>16?58:68}" font-weight="700" letter-spacing="-2">${t}</text>`).join('')}
<text x="68" y="${titles.length===1?358:389}" fill="#adb8b9" font-size="26">${subtitle}</text>
<text x="68" y="568" fill="#7f9194" font-family="Consolas, monospace" font-size="16" letter-spacing="2">AKASH DAMLE / SELECTED WORK</text></g>
<path d="M770 120V520" stroke="#fff" stroke-opacity=".1"/>
<g transform="translate(830 110)" color="${accent}">${illustration(type)}</g>
</svg>`
  await writeFile(new URL(`../public/${slug}-social.svg`, import.meta.url), svg)
  await sharp(Buffer.from(svg)).png().toFile(new URL(`../public/${slug}-social.png`, import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1'))
}
console.log(`Generated ${projects.length} project covers (SVG + PNG).`)
