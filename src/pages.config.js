/**
 * pages.config.js — top-level page routing.
 * Each key becomes a route at "/<Key>". Pages are lazy-loaded (code-split) except Home,
 * which is the landing page and should paint immediately.
 */
import { lazy } from 'react';
import Home from './pages/Home';
import __Layout from './Layout.jsx';

export const PAGES = {
    "About": lazy(() => import('./pages/About')),
    "Home": Home,
    "Producers": lazy(() => import('./pages/Producers')),
    "Products": lazy(() => import('./pages/Products')),
    "Experiences": lazy(() => import('./pages/Experiences')),
    "Stories": lazy(() => import('./pages/Stories')),
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};
