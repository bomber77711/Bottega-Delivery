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

## Deploy to Vercel

1. Push this repo to GitHub
2. Go to vercel.com → New Project → Import from GitHub
3. Framework: Vite (auto-detected)
4. Deploy → done

No environment variables needed for the frontend demo.

## Pages
- `/` — Interactive Italy map (Home)
- `/Regions` — All 20 Italian regions
- `/Producers` — 60+ artisan producers
- `/Products` — Product catalogue
- `/Experiences` — Food tourism experiences  
- `/Recipes` — Italian recipe collection
- `/Stories` — Editorial gastronomy content

## Next Steps (Backend)
- Supabase for database + auth
- Stripe Connect for payments
- n8n for AI bots (24/7 automation)
