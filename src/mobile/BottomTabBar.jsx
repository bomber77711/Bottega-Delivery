import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Map, ShoppingBasket, Users, Compass, ShoppingCart } from 'lucide-react';
import { useCart } from '@/components/cartStore';

// Phone-only bottom navigation (rendered by Layout only below 768px).
const TABS = [
  { key: 'Home', label: 'Map', to: '/', Icon: Map, match: ['Home'] },
  { key: 'Products', label: 'Shop', to: '/Products', Icon: ShoppingBasket, match: ['Products'] },
  { key: 'Producers', label: 'Producers', to: '/Producers', Icon: Users, match: ['Producers'] },
  { key: 'Experiences', label: 'Experiences', to: '/Experiences', Icon: Compass, match: ['Experiences'] },
];

// iOS Safari's floating toolbar can sit over the bottom of the layout viewport. Measure how much of
// the layout viewport is hidden below the visible area and lift the tab bar's content above it
// (0 on browsers where nothing is hidden).
// iPhone Safari (iOS 15+) draws its bottom toolbar over the last ~13px of the page and doesn't
// report it in any viewport API, so on iPhone Safari (not as a home-screen app) the tabs are lifted.
const IOS_SAFARI = typeof navigator !== 'undefined'
  && /iP(hone|od)/.test(navigator.userAgent) && /Safari\//.test(navigator.userAgent)
  && !/(CriOS|FxiOS|EdgiOS|OPiOS|GSA|Instagram|FBAN|FBAV)/.test(navigator.userAgent)
  && !(typeof window !== 'undefined' && (window.navigator.standalone || window.matchMedia?.('(display-mode: standalone)').matches));

// A fixed lift, set once: measuring live made the bar jump while Safari's toolbar shrinks and
// grows during scrolling.
function useToolbarOverlap() {
  useEffect(() => {
    if (!IOS_SAFARI) return undefined;
    document.documentElement.style.setProperty('--toolbar-overlap', '16px');
    return () => document.documentElement.style.removeProperty('--toolbar-overlap');
  }, []);
}

// Diagnostics for real devices: open any page with ?vp=1 to see the viewport numbers on screen.
function ViewportDebug() {
  const [info, setInfo] = useState('');
  useEffect(() => {
    const probe = document.createElement('div');
    probe.style.cssText = 'position:fixed;left:0;bottom:0;width:0;height:0;padding-bottom:env(safe-area-inset-bottom);visibility:hidden';
    document.body.appendChild(probe);
    const tick = () => {
      const vv = window.visualViewport || {};
      const r = probe.getBoundingClientRect();
      const tb = document.querySelector('.tabbar')?.getBoundingClientRect();
      setInfo([
        `inner ${window.innerWidth}×${window.innerHeight} · client ${document.documentElement.clientWidth}×${document.documentElement.clientHeight} · screen ${window.screen.width}×${window.screen.height}`,
        `vv ${Math.round(vv.width)}×${Math.round(vv.height)} top ${Math.round(vv.offsetTop)} left ${Math.round(vv.offsetLeft)} scale ${vv.scale?.toFixed?.(2)}`,
        `fixed-bottom ${Math.round(r.bottom)} · safe-bottom ${getComputedStyle(probe).paddingBottom} · tabbar ${tb ? `${Math.round(tb.top)}–${Math.round(tb.bottom)}` : '-'}`,
        `scroll ${Math.round(window.scrollX)},${Math.round(window.scrollY)} · doc ${document.documentElement.scrollWidth}×${document.documentElement.scrollHeight}`,
        `wide: ${[...document.querySelectorAll('body *')].filter((el) => { const b = el.getBoundingClientRect(); return b.width && (b.right > document.documentElement.clientWidth + 0.5 || b.left < -0.5); }).slice(0, 4).map((el) => `${el.tagName.toLowerCase()}.${String(el.className?.baseVal ?? el.className ?? '').split(' ')[0]}(${Math.round(el.getBoundingClientRect().left)}→${Math.round(el.getBoundingClientRect().right)})`).join(' ') || 'none'}`,
        navigator.userAgent.replace(/^Mozilla\/5.0 /, '').slice(0, 120),
      ].join('\n'));
    };
    tick();
    const iv = setInterval(tick, 500);
    return () => { clearInterval(iv); probe.remove(); };
  }, []);
  return <pre style={{ position: 'fixed', top: 60, left: 6, right: 6, zIndex: 99999, margin: 0, padding: 8, borderRadius: 8, background: 'rgba(0,0,0,0.8)', color: '#0f0', font: '10px/1.4 monospace', whiteSpace: 'pre-wrap', pointerEvents: 'none' }}>{info}</pre>;
}

// Pages on phones only ever scroll up/down. iOS Safari can still slide the whole screen sideways
// by a few px; once a one-finger gesture is clearly horizontal, cancel it — unless it started on
// something that genuinely scrolls sideways (chip rows, card rows).
function useNoSidewaysPan() {
  useEffect(() => {
    let sx = 0, sy = 0, axis = null, allowX = false;
    const canScrollX = (el) => {
      for (let n = el instanceof Element ? el : null; n && n !== document.documentElement; n = n.parentElement) {
        const cs = getComputedStyle(n);
        if (/(auto|scroll)/.test(cs.overflowX) && n.scrollWidth > n.clientWidth + 1) return true;
      }
      return false;
    };
    const onStart = (e) => {
      if (e.touches.length !== 1) return;
      sx = e.touches[0].clientX; sy = e.touches[0].clientY; axis = null;
      allowX = canScrollX(e.target);
    };
    const onMove = (e) => {
      if (e.touches.length !== 1 || allowX) return;
      if (!axis) {
        const dx = Math.abs(e.touches[0].clientX - sx), dy = Math.abs(e.touches[0].clientY - sy);
        if (dx < 3 && dy < 3) return;
        axis = dx > dy ? 'x' : 'y';
      }
      if (axis === 'x') e.preventDefault();
    };
    document.addEventListener('touchstart', onStart, { passive: true });
    document.addEventListener('touchmove', onMove, { passive: false });
    return () => {
      document.removeEventListener('touchstart', onStart);
      document.removeEventListener('touchmove', onMove);
    };
  }, []);
}

export default function BottomTabBar({ currentPageName }) {
  const [debug] = useState(() => typeof window !== 'undefined' && new URLSearchParams(window.location.search).has('vp'));
  const { count, setIsOpen, isOpen } = useCart();
  useToolbarOverlap();
  useNoSidewaysPan();
  return (
    <>
    {debug && <ViewportDebug />}
    <nav className="tabbar" aria-label="Main">
      {TABS.map(({ key, label, to, Icon, match }) => {
        const active = match.includes(currentPageName);
        return (
          <Link key={key} to={to} className={`tabbar-item${active ? ' is-active' : ''}`} aria-current={active ? 'page' : undefined}>
            <Icon size={22} strokeWidth={active ? 2.4 : 1.9} />
            <span>{label}</span>
          </Link>
        );
      })}
      <button type="button" className={`tabbar-item${isOpen ? ' is-active' : ''}`} onClick={() => setIsOpen(true)} aria-label={`Cart${count ? `, ${count} items` : ''}`}>
        <span className="tabbar-icon-wrap">
          <ShoppingCart size={22} strokeWidth={1.9} />
          {count > 0 && <span className="tabbar-badge">{count > 9 ? '9+' : count}</span>}
        </span>
        <span>Cart</span>
      </button>
    </nav>
    </>
  );
}
