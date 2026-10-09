// Verifies that every link the interactive map can show leads to real, non-empty content,
// and that every image the site references exists in /public (including paths built at
// runtime by helpers such as productsData's img(id)). Missing files are invisible in the
// browser — the SPA rewrite serves index.html with HTTP 200 — so this check is the guard.
// Run: npm run audit:links   (exits 1 on any problem — wire it into CI before deploys)
import { createServer } from 'vite';
import fs from 'node:fs';
import path from 'node:path';

const vite = await createServer({ server: { middlewareMode: true }, appType: 'custom', logLevel: 'error' });
try {
  const cat = await vite.ssrLoadModule('/src/lib/catalog.js');
  const { gastronomySpots } = await vite.ssrLoadModule('/src/components/gastronomySpots.jsx');
  const { regionData } = await vite.ssrLoadModule('/src/components/regionData.jsx');
  const { recipesData } = await vite.ssrLoadModule('/src/components/recipesData.jsx');
  const { ingredients } = await vite.ssrLoadModule('/src/components/ingredientsData.jsx');

  const check = (to) => {
    const [path, qs = ''] = to.split('?');
    const p = new URLSearchParams(qs);
    const q = p.get('q') || '', regionId = p.get('region') || undefined, category = p.get('category') || undefined;
    let m;
    if (path === '/Products') return cat.searchProducts(q, { regionId, category }).length;
    if (path === '/Recipes') return cat.searchRecipes(q, { regionId }).length;
    if (path === '/Experiences') return cat.searchExperiences(q, { regionId }).length;
    if ((m = path.match(/^\/ingredients\/(.+)$/))) return ingredients[m[1]] ? 1 : 0;
    if ((m = path.match(/^\/producers\/(.+)$/))) return cat.findProducer(m[1]) ? 1 : 0;
    if ((m = path.match(/^\/recipes\/(.+)$/))) return recipesData.some((r) => r.id === m[1]) ? 1 : 0;
    if ((m = path.match(/^\/regions\/(.+)$/))) return regionData[m[1]] ? 1 : 0;
    return -1; // unknown route
  };

  let spots = 0, links = 0, onlyFallback = 0;
  const bad = [];
  for (const [regionId, list] of Object.entries(gastronomySpots)) {
    for (const spot of list) {
      spots++;
      const { links: ls } = cat.resolveSpot(spot, regionId);
      if (!ls.length) bad.push(`${regionId}: "${spot.label}" has no links`);
      if (ls.every((l) => l.kind === 'region' || /^\/Products\?region=[a-z_]+$/.test(l.to))) onlyFallback++;
      for (const l of ls) {
        links++;
        const n = check(l.to);
        if (n <= 0) bad.push(`${regionId}: "${spot.label}" → ${l.to} (${n < 0 ? 'unknown route' : 'empty'})`);
        if (l.count != null && n !== l.count) bad.push(`${regionId}: "${spot.label}" → ${l.to} promises ${l.count}, page shows ${n}`);
      }
    }
  }
  // ── Images ──
  const imgPaths = new Set();
  const collect = (v, seen = new Set()) => {
    if (typeof v === 'string') { if (v.startsWith('/img/')) imgPaths.add(v); return; }
    if (v && typeof v === 'object' && !seen.has(v)) { seen.add(v); Object.values(v).forEach((x) => collect(x, seen)); }
  };
  for (const mod of ['productsData', 'experiencesData', 'recipesData', 'ingredientsData', 'imageConfig', 'creatorsData', 'storiesData', 'regionData']) {
    collect(await vite.ssrLoadModule(`/src/components/${mod}.jsx`).catch(() => ({})));
  }
  const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]));
  for (const f of walk('src').filter((f) => /\.(jsx?|tsx?)$/.test(f))) {
    for (const m of fs.readFileSync(f, 'utf8').matchAll(/\/img\/[A-Za-z0-9_\/-]+\.(?:webp|jpe?g|png|svg)/g)) imgPaths.add(m[0]);
  }
  // Products/categories also ship a phone variant (<name>-640.webp) built at runtime by Products.jsx.
  for (const p of [...imgPaths]) if (p.startsWith('/img/products/') && !p.endsWith('-640.webp')) imgPaths.add(p.replace(/\.webp$/, '-640.webp'));
  const missingImgs = [...imgPaths].filter((p) => !fs.existsSync(path.join('public', p)));
  missingImgs.forEach((p) => bad.push(`missing image file: public${p}`));

  console.log(`Map spots: ${spots} · links checked: ${links} · spots with only region-level fallbacks: ${onlyFallback}`);
  console.log(`Images referenced: ${imgPaths.size} · missing: ${missingImgs.length}`);
  if (bad.length) { console.error(`\n${bad.length} broken link(s):\n  ` + bad.join('\n  ')); process.exitCode = 1; }
  else console.log('All map links resolve to non-empty pages and all images exist ✓');
} finally {
  await vite.close();
}
