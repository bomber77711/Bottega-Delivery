// Shared catalogue search + map-spot resolver.
//
// One matching function powers the Products / Recipes / Experiences search boxes AND the
// map's spot cards, so a link like "/Products?q=barolo" always shows exactly the items
// the map promised. scripts/audit-links.mjs runs resolveSpot() over every map spot and
// fails if any resolved link leads to an empty page.

import { productsData } from '@/components/productsData';
import { recipesData } from '@/components/recipesData';
import { experiencesData } from '@/components/experiencesData';
import { regionData } from '@/components/regionData';
import { ingredients } from '@/components/ingredientsData';

// ── Text normalisation ────────────────────────────────────────────────
// "Baccalà" → "baccala", "'Nduja" → "nduja", "Cirò Rosso" → "ciro rosso"
export const norm = (s) =>
  (s ?? '')
    .toString()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();

export const slugify = (s) => norm(s).replace(/ /g, '-');

// Words that carry no product meaning on their own.
const STOP = new Set([
  'di', 'del', 'della', 'delle', 'dei', 'da', 'e', 'ed', 'la', 'il', 'lo', 'le', 'al', 'alla', 'the', 'of', 'and', 'a',
  'dop', 'igp', 'doc', 'docg', 'stg', 'tour', 'class', 'experience', 'visit', 'walk', 'farm', 'harvest', 'tasting',
  'cellar', 'route', 'trail',
]);

export const queryTokens = (q) => norm(q).split(' ').filter((t) => t.length >= 2 && !STOP.has(t));

// Every query token must start a word in the haystack ("oil" matches "olive oil", not "boil").
export function matches(haystack, q) {
  const tokens = queryTokens(q);
  if (!tokens.length) return true;
  const h = ' ' + norm(haystack) + ' ';
  return tokens.every((t) => h.includes(' ' + t));
}

// Italian + English region names so "Toscana" and "Tuscany" both work.
const regionAliases = (regionId) => {
  if (!regionId) return '';
  return [regionId.replace(/_/g, ' '), regionData[regionId]?.name].filter(Boolean).join(' ');
};

// ── Haystacks ─────────────────────────────────────────────────────────
const productHay = (p) =>
  [p.name, p.producer, p.category, p.region, regionAliases(p.regionId), p.tags?.join(' '), p.certifications?.join(' '), p.description, p.keywords].join(' ');
const productNameHay = (p) => [p.name, p.producer, p.category, p.keywords].join(' ');
const recipeHay = (r) => [r.name, r.regionName, regionAliases(r.region), r.description, r.category].join(' ');
const recipeNameHay = (r) => [r.name].join(' ');
const experienceHay = (e) => [e.name, e.producer, e.region, regionAliases(e.regionId), e.type, e.description].join(' ');
const experienceNameHay = (e) => [e.name, e.producer].join(' ');

// ── Public search API (used by the list pages) ───────────────────────
export const searchProducts = (q, { regionId, category } = {}) =>
  productsData.filter(
    (p) => matches(productHay(p), q) && (!regionId || p.regionId === regionId) && (!category || p.category === category),
  );
export const searchRecipes = (q, { regionId } = {}) =>
  recipesData.filter((r) => matches(recipeHay(r), q) && (!regionId || r.region === regionId));
export const searchExperiences = (q, { regionId } = {}) =>
  experiencesData.filter((e) => matches(experienceHay(e), q) && (!regionId || e.regionId === regionId));

// ── Producers ─────────────────────────────────────────────────────────
export const allProducers = Object.entries(regionData).flatMap(([regionId, r]) =>
  (r.producers || []).map((p) => ({ ...p, regionId, regionName: r.name, id: slugify(p.name) })),
);
export const findProducer = (slugOrName) => {
  const s = slugify(slugOrName);
  return allProducers.find((p) => p.id === s);
};

// ── Map spot resolver ─────────────────────────────────────────────────
// Returns only links that are guaranteed to land on non-empty content:
//   { primary: link|null, links: [{ label, to, kind, count? }] }
const TYPE_TO_CATEGORY = { wine: 'Wine' };

// Finds the most precise query for a spot label, then counts results with the SAME public
// search function the destination page uses — so the number on the card is the number on the page.
function bestQuery(text, items, fullHay, nameHay, regionId, search) {
  const finish = (q, regionScoped = false) => {
    const found = search(q, regionScoped ? { regionId } : {});
    return found.length ? { q, items: found, regionScoped } : null;
  };
  // 1) whole label against names (most precise)
  const all = queryTokens(text).join(' ');
  if (all && items.some((i) => matches(nameHay(i), all))) { const r = finish(all); if (r) return r; }
  // 2) single significant token against names, longest first, preferring the spot's region
  const toks = queryTokens(text).filter((t) => t.length >= 4).sort((a, b) => b.length - a.length);
  for (const t of toks) {
    const hit = items.filter((i) => matches(nameHay(i), t));
    const inRegion = regionId ? hit.filter((i) => (i.regionId || i.region) === regionId) : hit;
    if (inRegion.length) { const r = finish(t); if (r) return r; }
  }
  // 3) whole label against full text, only inside the spot's region (avoids "Chianti" → an oil description elsewhere)
  if (all && regionId && items.some((i) => (i.regionId || i.region) === regionId && matches(fullHay(i), all))) return finish(all, true);
  return null;
}

export function resolveSpot(spot, regionId) {
  const label = spot.label || spot.name || '';
  const region = regionData[regionId];
  const links = [];
  const push = (l) => { if (!links.some((x) => x.to === l.to)) links.push(l); };

  // Explicit deep link — only if it targets something that exists.
  if (spot.to) {
    let m;
    if ((m = spot.to.match(/^\/ingredients\/(.+)$/)) && ingredients[m[1]]) push({ kind: 'guide', label: `Guide: ${ingredients[m[1]].name}`, to: spot.to });
    else if ((m = spot.to.match(/^\/recipes\/(.+)$/))) { const r = recipesData.find((x) => x.id === m[1]); if (r) push({ kind: 'recipe', label: `Cook ${r.name}`, to: spot.to }); }
    else if ((m = spot.to.match(/^\/producers\/(.+)$/))) { const pr = findProducer(m[1]); if (pr) push({ kind: 'producer', label: `Visit ${pr.name}`, to: spot.to }); }
  }

  // Ingredient guide by name ("Burrata" → /ingredients/burrata) when no explicit guide was given
  if (!links.some((l) => l.kind === 'guide') && spot.type !== 'dish') {
    const ingHit = Object.values(ingredients).find((ing) => queryTokens(label).length && matches(ing.name + ' ' + ing.id.replace(/-/g, ' '), label));
    if (ingHit) push({ kind: 'guide', label: `Guide: ${ingHit.name}`, to: `/ingredients/${ingHit.id}` });
  }

  // Producer page
  if (spot.type === 'producer') {
    const prod = findProducer(label);
    if (prod) push({ kind: 'producer', label: `Visit ${prod.name}`, to: `/producers/${prod.id}` });
  }

  // Products
  const wineOnly = spot.type === 'wine';
  const pool = wineOnly ? productsData.filter((p) => p.category === 'Wine') : productsData;
  const pr = bestQuery(label, pool, productHay, productNameHay, regionId, (q, o) => searchProducts(q, { ...o, category: wineOnly ? 'Wine' : undefined }));
  if (pr) {
    const to = `/Products?q=${encodeURIComponent(pr.q)}${pr.regionScoped ? `&region=${regionId}` : ''}${wineOnly ? '&category=Wine' : ''}`;
    push({ kind: 'products', label: pr.items.length === 1 ? `Shop ${pr.items[0].name}` : `Shop ${pr.items.length} matching products`, to, count: pr.items.length });
  } else if (TYPE_TO_CATEGORY[spot.type]) {
    const cat = TYPE_TO_CATEGORY[spot.type];
    const inRegion = productsData.filter((p) => p.regionId === regionId && p.category === cat);
    if (inRegion.length) push({ kind: 'products', label: `Shop ${region?.name} wines`, to: `/Products?region=${regionId}&category=${encodeURIComponent(cat)}`, count: inRegion.length });
  }

  // Recipes
  const rc = bestQuery(label, recipesData, recipeHay, recipeNameHay, regionId, searchRecipes);
  if (rc && !links.some((l) => l.kind === 'recipe')) {
    push(rc.items.length === 1
      ? { kind: 'recipe', label: `Cook ${rc.items[0].name}`, to: `/recipes/${rc.items[0].id}` }
      : { kind: 'recipe', label: `${rc.items.length} matching recipes`, to: `/Recipes?q=${encodeURIComponent(rc.q)}${rc.regionScoped ? `&region=${regionId}` : ''}`, count: rc.items.length });
  }

  // Experiences
  const ex = bestQuery(label, experiencesData, experienceHay, experienceNameHay, regionId, searchExperiences);
  if (ex) {
    const to = ex.regionScoped ? `/Experiences?q=${encodeURIComponent(ex.q)}&region=${regionId}` : `/Experiences?q=${encodeURIComponent(ex.q)}`;
    push({ kind: 'experience', label: ex.items.length === 1 ? `Book: ${ex.items[0].name}` : `${ex.items.length} matching experiences`, to, count: ex.items.length });
  } else if (spot.type === 'experience') {
    const inRegion = experiencesData.filter((e) => e.regionId === regionId);
    if (inRegion.length) push({ kind: 'experience', label: `Experiences in ${region?.name}`, to: `/Experiences?region=${regionId}`, count: inRegion.length });
  }

  // Always-valid fallbacks
  const regionProducts = productsData.filter((p) => p.regionId === regionId).length;
  if (regionProducts && !links.some((l) => l.kind === 'products')) {
    push({ kind: 'products', label: `Shop ${region?.name} (${regionProducts})`, to: `/Products?region=${regionId}`, count: regionProducts });
  }
  if (region) push({ kind: 'region', label: `Discover ${region.name}`, to: `/regions/${regionId}` });

  const hasContent = links.some((l) => l.kind !== 'region' && !/^\/Products\?region=[a-z_]+$/.test(l.to));
  const note = hasContent ? null : `${label} isn't in the Bottega catalogue yet — explore what ${region?.name || 'this region'} offers today.`;
  return { primary: links[0] || null, links, note };
}

export const regionProductCount = (regionId) => productsData.filter((p) => p.regionId === regionId).length;
