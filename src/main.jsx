import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '@/App.jsx'
import '@/index.css'
import '@/globals.css'

// Safety net: any <img> anywhere in the app that fails to load is swapped for a soft branded
// placeholder instead of the browser's broken-image icon + alt text.
const IMG_PLACEHOLDER = 'data:image/svg+xml;utf8,' + encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">' +
  '<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#EAF4E8"/><stop offset="1" stop-color="#C9E2C6"/></linearGradient></defs>' +
  '<rect width="400" height="300" fill="url(#g)"/><text x="200" y="168" font-size="56" text-anchor="middle">🍅</text></svg>'
);
window.addEventListener('error', (e) => {
  const el = e.target;
  if (el && el.tagName === 'IMG' && !el.dataset.fallback) {
    el.dataset.fallback = '1';
    el.src = IMG_PLACEHOLDER;
  }
}, true);

ReactDOM.createRoot(document.getElementById('root')).render(
  <App />
)
