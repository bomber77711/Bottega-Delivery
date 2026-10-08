# Bottega Delivery — Frontend

AI-powered Italian F&B marketplace. Built with React + Vite + Tailwind.

## Stack
- React 18 + Vite
- Tailwind CSS + shadcn/ui
- React Router v6
- Framer Motion
- D3 (Italy SVG map)

## Local Development

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Quality checks

```bash
npm run check        # lint + map link audit + production build
npm run audit:links  # verifies every map marker links to a non-empty page
```

## Images
All images are self-hosted WebP in `public/img/` (`products/` one per product, `lib/` regions & dishes,
`u/` and `b44/` legacy Unsplash/Base44 assets). Creative Commons credits: `public/img/CREDITS.md`
(also shown on /About). Never hot-link third-party image URLs: they rot.

## Map
- Boundaries: `src/components/map/italy-regions.topo.json` (simplified from openpolis/geojson-italy).
- Markers: `src/components/gastronomySpots.jsx`, each with real `coords: [lng, lat]`.
- Marker links are resolved by `src/lib/catalog.js` (shared with the Products/Recipes/Experiences search).
- Selected region is in the URL: `/?region=toscana`.

## Deploy to Vercel

1. Push this repo to GitHub
2. Go to vercel.com → New Project → Import from GitHub
3. Framework: Vite (auto-detected)
4. Deploy → done

Environment variables (Vercel → Settings → Environment Variables):
- `ANTHROPIC_API_KEY`: required for the Ask Bottega assistant (`api/ask-bottega.js`)
- `ANTHROPIC_MODEL`: optional model override

## Pages
- `/` — Interactive Italy map (Home)
- `/Regions` — All 20 Italian regions
- `/Producers` — 60+ artisan producers
- `/Products` — Product catalogue (`?q=&category=&region=&cert=&sort=`)
- `/Experiences` — Food tourism experiences  
- `/Recipes` — Italian recipe collection
- `/Stories` — Editorial gastronomy content

## Next Steps (Backend)
- Supabase for database + auth
- Stripe Connect for payments
- n8n for AI bots (24/7 automation)
