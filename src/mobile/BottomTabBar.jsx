import { useEffect } from 'react';
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
      const overlap = Math.round(layoutBottom - (vv.offsetTop + vv.height));
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

export default function BottomTabBar({ currentPageName }) {
  const { count, setIsOpen, isOpen } = useCart();
  useToolbarOverlap();
  return (
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
  );
}
