// Desktop guard: renders the LIVE build (A) and the CANDIDATE build (B) side by side, same browser,
// same conditions, page by page, and fails if any desktop pixel differs.
import { chromium } from 'playwright';
import { PNG } from 'pngjs'; import pixelmatch from 'pixelmatch'; import fs from 'fs';
const A = process.env.A || 'http://localhost:4175', B = process.env.B || 'http://localhost:4173';
const OUT = process.argv[2] || './out'; fs.rmSync(OUT, { recursive: true, force: true }); fs.mkdirSync(OUT, { recursive: true });
const routes = ['/', '/?region=toscana', '/regions', '/regions/toscana', '/Producers', '/producers/frantoio-franci', '/Products', '/Products?category=Cheese', '/Experiences', '/Recipes', '/recipes/cacio-e-pepe', '/Stories', '/About', '/ingredients/burrata', '/TasteMap', '/taste-maps', '/creators/chef-antonio', '/checkout'];
const sizes = (process.env.SIZES || '1440x900,1024x768,800x900').split(',').map(s => s.split('x').map(Number));
const b = await chromium.launch({ args: ['--disable-gpu', '--disable-lcd-text', '--force-color-profile=srgb', '--font-render-hinting=none'] });
async function shoot(ctx, base, r, h) {
  const p = await ctx.newPage();
  await p.clock.install({ time: new Date('2026-10-01T10:00:00Z') });
  await p.goto(base + r, { waitUntil: 'networkidle' });
  await p.addStyleTag({ content: '*,*::before,*::after{animation:none!important;transition:none!important;caret-color:transparent!important}' });
  await p.clock.runFor(5000);
  await p.evaluate(async () => { await document.fonts.ready; });
  const sc = await p.evaluateHandle(() => [...document.querySelectorAll('*')].filter(e => /(auto|scroll)/.test(getComputedStyle(e).overflowY) && e.scrollHeight > e.clientHeight + 20).sort((a, b) => b.clientHeight - a.clientHeight)[0] || document.scrollingElement);
  const total = await sc.evaluate(s => s.scrollHeight);
  const shots = [];
  for (let i = 0, y = 0; i < 4 && y < total; i++, y += h - 100) {
    await sc.evaluate((s, y) => { s.scrollTop = y; }, y);
    await p.clock.runFor(300);
    await p.evaluate(async () => {
      const vis = [...document.images].filter(im => { const r = im.getBoundingClientRect(); return r.bottom > -50 && r.top < innerHeight + 50; });
      vis.forEach(im => { im.loading = 'eager'; });
      await Promise.all(vis.map(im => (im.complete && im.naturalWidth ? im.decode().catch(() => {}) : new Promise(res => { im.addEventListener('load', () => im.decode().then(res, res), { once: true }); im.addEventListener('error', res, { once: true }); setTimeout(res, 8000); }))));
    });
    await p.waitForTimeout(250);
    shots.push(await p.screenshot());
  }
  await p.close();
  return shots;
}
let bad = 0, n = 0;
for (const [w, h] of sizes) {
  const ctx = await b.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 1, reducedMotion: 'reduce' });
  for (const r of routes) {
    const sa = await shoot(ctx, A, r, h), sb = await shoot(ctx, B, r, h);
    sa.forEach((buf, i) => {
      n++;
      const a = PNG.sync.read(buf), bb = sb[i] && PNG.sync.read(sb[i]);
      const name = `${w}_${r.replace(/[^a-z0-9]+/gi, '_') || 'home'}__${i}`;
      if (!bb || a.width !== bb.width || a.height !== bb.height) { bad++; console.log('MISMATCH', name); return; }
      const d = new PNG({ width: a.width, height: a.height });
      const px = pixelmatch(a.data, bb.data, d.data, a.width, a.height, { threshold: 0.1 });
      if (px) { bad++; console.log(`DIFF ${px}px ${name}`); fs.writeFileSync(`${OUT}/${name}.png`, PNG.sync.write(d)); fs.writeFileSync(`${OUT}/${name}_A.png`, buf); fs.writeFileSync(`${OUT}/${name}_B.png`, sb[i]); }
    });
  }
  await ctx.close();
}
await b.close();
console.log(`${n} desktop screens compared (live vs candidate), ${bad} differ`);
process.exitCode = bad ? 1 : 0;
