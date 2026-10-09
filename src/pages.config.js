/**
 * pages.config.js — top-level page routing.
 * Each key becomes a route at "/<Key>". Pages are lazy-loaded (code-split) except Home,
 * which is the landing page and should paint immediately.
 */
import { lazyPage } from './lib/lazyPage';
import Home from './pages/Home';
import __Layout from './Layout.jsx';

export const PAGES = {
    "About": lazyPage(() => import('./pages/About')),
    "Home": Home,
    "Producers": lazyPage(() => import('./pages/Producers')),
    "Products": lazyPage(() => import('./pages/Products')),
    "Experiences": lazyPage(() => import('./pages/Experiences')),
    "Stories": lazyPage(() => import('./pages/Stories')),
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};
