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
// report it in any viewport API, so on iPhone Safari (not as a home-screen app) we lift the tabs.
const IOS_SAFARI = typeof navigator !== 'undefined'
  && /iP(hone|od)/.test(navigator.userAgent) && /Safari\//.test(navigator.userAgent)
  && !/(CriOS|FxiOS|EdgiOS|OPiOS|GSA|Instagram|FBAN|FBAV)/.test(navigator.userAgent)
  && !(typeof window !== 'undefined' && (window.navigator.standalone || window.matchMedia?.('(display-mode: standalone)').matches));

function useToolbarOverlap() {
  useEffect(() => {
    const vv = window.visualViewport;
    if (!vv) return undefined;
    const probe = document.createElement('div');
    probe.style.cssText = 'position:fixed;left:0;bottom:0;width:0;height:0;pointer-events:none;visibility:hidden';
    document.body.appendChild(probe);
    let raf = 0;
    const measure = () => {
      raf = 0;
      if (vv.scale > 1.01) return; // pinch-zoomed: leave as is
      const layoutBottom = probe.getBoundingClientRect().top;
      let overlap = Math.round(layoutBottom - (vv.offsetTop + vv.height));
      if (overlap <= 0 && IOS_SAFARI) overlap = 16;
      document.documentElement.style.setProperty('--toolbar-overlap', `${Math.max(0, Math.min(120, overlap))}px`);
    };
    const schedule = () => { if (!raf) raf = requestAnimationFrame(measure); };
    measure();
    vv.addEventListener('resize', schedule);
    vv.addEventListener('scroll', schedule);
    window.addEventListener('orientationchange', schedule);
    return () => {
      cancelAnimationFrame(raf);
      vv.removeEventListener('resize', schedule);
      vv.removeEventListener('scroll', schedule);
      window.removeEventListener('orientationchange', schedule);
      probe.remove();
      document.documentElement.style.removeProperty('--toolbar-overlap');
    };
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
        navigator.userAgent.replace(/^Mozilla\/5.0 /, '').slice(0, 120),
      ].join('\n'));
    };
    tick();
    const iv = setInterval(tick, 500);
    return () => { clearInterval(iv); probe.remove(); };
  }, []);
  return <pre style={{ position: 'fixed', top: 60, left: 6, right: 6, zIndex: 99999, margin: 0, padding: 8, borderRadius: 8, background: 'rgba(0,0,0,0.8)', color: '#0f0', font: '10px/1.4 monospace', whiteSpace: 'pre-wrap', pointerEvents: 'none' }}>{info}</pre>;
}

export default function BottomTabBar({ currentPageName }) {
  const [debug] = useState(() => typeof window !== 'undefined' && new URLSearchParams(window.location.search).has('vp'));
  const { count, setIsOpen, isOpen } = useCart();
  useToolbarOverlap();
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
