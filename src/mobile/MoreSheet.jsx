import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Landmark, ChefHat, BookOpen, Heart, Info, Sparkles, ChevronRight, X } from 'lucide-react';
import { randomDiscovery } from '@/components/DiscoveryFloat';

// Phone-only "More" menu (opened from the header ☰): secondary sections + Discover.
const LINKS = [
  { to: '/regions', label: 'Regions', sub: 'All 20 Italian regions', Icon: Landmark },
  { to: '/Recipes', label: 'Recipes', sub: 'Traditional dishes & their producers', Icon: ChefHat },
  { to: '/Stories', label: 'Stories', sub: 'People, places and traditions', Icon: BookOpen },
  { to: '/taste-maps', label: 'Taste Maps', sub: 'Curated collections', Icon: Heart },
  { to: '/About', label: 'About Bottega', sub: 'Our mission', Icon: Info },
];

export default function MoreSheet({ open, onClose }) {
  const navigate = useNavigate();
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = prev; window.removeEventListener('keydown', onKey); };
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="sheet-backdrop" onClick={onClose}>
      <div className="sheet" role="dialog" aria-label="More" onClick={(e) => e.stopPropagation()}>
        <div className="sheet-grabber" />
        <div className="sheet-head">
          <span>More</span>
          <button type="button" className="sheet-close" onClick={onClose} aria-label="Close"><X size={20} /></button>
        </div>
        <nav className="more-list">
          {LINKS.map(({ to, label, sub, Icon }) => (
            <Link key={to} to={to} onClick={onClose} className="more-item">
              <span className="more-icon"><Icon size={20} /></span>
              <span className="more-text"><strong>{label}</strong><span>{sub}</span></span>
              <ChevronRight size={18} className="more-chev" />
            </Link>
          ))}
        </nav>
        <button type="button" className="more-discover" onClick={() => { const d = randomDiscovery(); onClose(); navigate(d.href); }}>
          <Sparkles size={18} /> Discover something new
        </button>
      </div>
    </div>
  );
}
