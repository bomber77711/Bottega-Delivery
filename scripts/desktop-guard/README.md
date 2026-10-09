# Desktop guard

The phone experience lives in `src/mobile.css` (phone-only media query) and `src/mobile/*`
(rendered only below 768px). This guard proves a change leaves desktop untouched: it renders the
live build (A) and the candidate build (B) page by page at 1440, 1024 and 800px and fails on any
differing pixel.

```bash
# A: build of main served on :4175, B: candidate build served on :4173 (vite preview)
cd scripts/desktop-guard && npm i playwright pixelmatch@5 pngjs@7
A=http://localhost:4175 B=http://localhost:4173 node desktop-guard.mjs ./out
```
