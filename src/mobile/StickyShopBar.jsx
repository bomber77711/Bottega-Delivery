import { useEffect, useState } from 'react';
import { ShoppingBag, ChevronDown } from 'lucide-react';

// Phones: a sticky "Shop" bar above the tab bar on producer pages. Tapping it scrolls to the
// products; it hides itself while the products are on screen.
export default function StickyShopBar({ targetId, count, fromPrice, label }) {
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    const el = document.getElementById(targetId);
    if (!el || !('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(([e]) => setHidden(e.isIntersecting), { threshold: 0.05 });
    io.observe(el);
    return () => io.disconnect();
  }, [targetId]);
  if (!count) return null;
  return (
    <div className={`shop-bar${hidden ? ' is-hidden' : ''}`} aria-hidden={hidden}>
      <span className="shop-bar-text">
        <strong>{label}</strong>
        <span>{count} product{count === 1 ? '' : 's'} · from €{fromPrice.toFixed(2)}</span>
      </span>
      <button type="button" onClick={() => document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}>
        <ShoppingBag size={16} /> Shop <ChevronDown size={14} />
      </button>
    </div>
  );
}
