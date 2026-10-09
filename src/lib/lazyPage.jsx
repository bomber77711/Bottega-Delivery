import { lazy } from 'react';

// Code-split page that renders synchronously once its code has been prefetched.
// React.lazy alone always suspends for a beat on first render (even when the chunk is
// cached); after preload() we render the real component directly, so clicks feel instant.
const registry = [];

export function lazyPage(factory) {
  let Loaded = null;
  const load = () => factory().then((m) => { Loaded = m.default; return m; });
  const Lazy = lazy(load);
  function Page(props) {
    return Loaded ? <Loaded {...props} /> : <Lazy {...props} />;
  }
  Page.preload = () => (Loaded ? Promise.resolve() : load().catch(() => {}));
  registry.push(Page);
  return Page;
}

// Preload every registered page one after another (call when the browser is idle).
export function preloadAllPages() {
  return registry.reduce((p, page) => p.then(() => page.preload()), Promise.resolve());
}
