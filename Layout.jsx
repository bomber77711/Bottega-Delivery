import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { ShoppingCart, Search, Menu, X, Command } from 'lucide-react';
import { CartProvider, useCart } from './components/cartStore';
import CartDrawer from './components/CartDrawer';
import CommandBar from './components/CommandBar';
import DiscoveryFloat from './components/DiscoveryFloat';

function BottegaLogoInline() {
  return (
    <svg height="32" viewBox="0 0 240 50" fill="none" xmlns="http://www.w3.org/2000/svg">
      <text x="0" y="40" fontFamily="'DM Sans',sans-serif" fontWeight="800" fontSize="42" fill="#2E7D32">B</text>
      <g transform="translate(32, 2)">
        <ellipse cx="16" cy="30" rx="14" ry="15" fill="#D32F2F"/>
        <ellipse cx="10" cy="21" rx="4" ry="6" fill="rgba(255,255,255,0.18)" transform="rotate(-20 10 21)"/>
        <path d="M16 15 L13 6 L16 10 L19 6 Z" fill="#2E7D32"/>
        <path d="M16 15 L7 10 L11 13 L9 7 Z" fill="#2E7D32"/>
        <path d="M16 15 L25 10 L21 13 L23 7 Z" fill="#2E7D32"/>
      </g>
      <text x="63" y="40" fontFamily="'DM Sans',sans-serif" fontWeight="800" fontSize="42" fill="#2E7D32">TTEGA</text>
    </svg>
  );
}

function NavContent({ currentPageName }) {
  const location = useLocation();
  const { count, setIsOpen } = useCart();
  const [searchFocused, setSearchFocused] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [badgeAnimate, setBadgeAnimate] = useState(false);
  const [cmdOpen, setCmdOpen] = useState(false);
  const prevCount = useRef(count);

  useEffect(() => {
    const handler = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); setCmdOpen(o => !o); }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  useEffect(() => {
    if (count > prevCount.current) {
      setBadgeAnimate(true);
      setTimeout(() => setBadgeAnimate(false), 400);
    }
    prevCount.current = count;
  }, [count]);

  const navLinks = [
    { label: 'Map', page: 'Home' },
    { label: 'Regions', page: 'regions', customPath: '/regions' },
    { label: 'Producers', page: 'Producers' },
    { label: 'Products', page: 'Products' },
    { label: 'Experiences', page: 'Experiences' },
    { label: 'Recipes', page: 'Recipes' },
    { label: 'Stories', page: 'Stories' },

  ];

  const isActive = (page) => currentPageName === page;

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, height: 60, zIndex: 1000,
        background: 'rgba(255,255,255,0.97)', backdropFilter: 'blur(12px)',
        borderBottom: '1px solid #E8F5E9',
        display: 'flex', alignItems: 'center', padding: '0 32px', gap: 32
      }}>
        {/* Logo */}
        <Link to={createPageUrl('Home')} style={{ textDecoration: 'none', flexShrink: 0 }}>
          <BottegaLogoInline />
        </Link>

        {/* Center Nav */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, flex: 1, justifyContent: 'center' }} className="hide-mobile">
          {navLinks.map(link => (
            <Link key={link.page} to={link.customPath || createPageUrl(link.page)} style={{
              padding: '6px 14px', borderRadius: 8, fontSize: 14, fontWeight: 500,
              color: isActive(link.page) ? '#2E7D32' : '#555',
              textDecoration: 'none',
              background: isActive(link.page) ? '#E8F5E9' : 'none',
              transition: 'all 0.15s ease'
            }}
              onMouseEnter={e => { if (!isActive(link.page)) { e.currentTarget.style.color = '#2E7D32'; e.currentTarget.style.background = '#F5FBF5'; } }}
              onMouseLeave={e => { if (!isActive(link.page)) { e.currentTarget.style.color = '#555'; e.currentTarget.style.background = 'none'; } }}>
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right side */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginLeft: 'auto' }}>
          {/* Search / Cmd K pill */}
          <button onClick={() => setCmdOpen(true)} style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '7px 14px', borderRadius: 100,
            background: '#F5F5F5', border: '1px solid transparent',
            transition: 'all 0.2s ease', cursor: 'pointer', width: 180
          }} className="hide-mobile"
            onMouseEnter={e => { e.currentTarget.style.border = '1px solid #4CAF50'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(76,175,80,0.1)'; }}
            onMouseLeave={e => { e.currentTarget.style.border = '1px solid transparent'; e.currentTarget.style.boxShadow = 'none'; }}>
            <Search size={14} color="#888" />
            <span style={{ flex: 1, textAlign: 'left', fontSize: 13, color: '#999', fontFamily: "'DM Sans',sans-serif" }}>Search…</span>
            <kbd style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, color: '#aaa', background: '#eee', border: '1px solid #ddd', borderRadius: 4, padding: '1px 5px' }}>⌘K</kbd>
          </button>

          {/* Cart */}
          <button
            onClick={() => setIsOpen(true)}
            style={{
              position: 'relative', background: 'none', border: 'none', cursor: 'pointer',
              padding: 8, borderRadius: 10, color: '#1A1A1A', display: 'flex', alignItems: 'center',
              transition: 'background 0.15s',
              animation: badgeAnimate ? 'cartPulse 0.4s ease' : 'none'
            }}
            onMouseEnter={e => e.currentTarget.style.background = '#F0F7EE'}
            onMouseLeave={e => e.currentTarget.style.background = 'none'}>
            <ShoppingCart size={22} />
            {count > 0 && (
              <span style={{
                position: 'absolute', top: 2, right: 2,
                background: '#2E7D32', color: '#fff', borderRadius: '50%',
                width: 18, height: 18, fontSize: 10, fontWeight: 700,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                animation: badgeAnimate ? 'badgePop 0.4s ease' : 'none'
              }}>{count > 9 ? '9+' : count}</span>
            )}
          </button>

          {/* Mobile menu */}
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8, display: 'none', color: '#1A1A1A' }}
            className="show-mobile">
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div style={{
          position: 'fixed', top: 60, left: 0, right: 0, zIndex: 999,
          background: '#fff', borderBottom: '1px solid #E8F5E9',
          padding: '12px 24px 20px'
        }}>
          {navLinks.map(link => (
            <Link key={link.page} to={createPageUrl(link.page)}
              onClick={() => setMobileMenuOpen(false)}
              style={{ display: 'block', padding: '10px 0', fontSize: 16, fontWeight: 500, color: isActive(link.page) ? '#2E7D32' : '#1A1A1A', textDecoration: 'none' }}>
              {link.label}
            </Link>
          ))}
        </div>
      )}

      <CartDrawer />
      <CommandBar isOpen={cmdOpen} onClose={() => setCmdOpen(false)} />
    </>
  );
}

export default function Layout({ children, currentPageName }) {
  return (
    <CartProvider>
      <style>{`
        .hide-mobile { }
        .show-mobile { display: none !important; }
        @media (max-width: 768px) {
          .hide-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
      `}</style>
      <NavContent currentPageName={currentPageName} />
      <div style={{ paddingTop: 60, height: '100vh', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        {children}
      </div>
      <DiscoveryFloat />
    </CartProvider>
  );
}