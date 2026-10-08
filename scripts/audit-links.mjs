// Verifies that every link the interactive map can show leads to real, non-empty content.
// Run: npm run audit:links   (exits 1 on any dead link — wire it into CI before deploys)
import { createServer } from 'vite';

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
  console.log(`Map spots: ${spots} · links checked: ${links} · spots with only region-level fallbacks: ${onlyFallback}`);
  if (bad.length) { console.error(`\n${bad.length} broken link(s):\n  ` + bad.join('\n  ')); process.exitCode = 1; }
  else console.log('All map links resolve to non-empty pages ✓');
} finally {
  await vite.close();
}
