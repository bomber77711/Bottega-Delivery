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

export default function BottomTabBar({ currentPageName }) {
  const { count, setIsOpen, isOpen } = useCart();
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
