import { GLYPHS_BOLD, GLYPHS_FILL } from './glyphPaths';

// One refined glyph per map spot (replaces the emoji on phones).
const BY_EMOJI = {
  '👨‍🌾': 'barn', '🗺': 'map-trifold', '🍷': 'wine', '🧀': 'cheese', '🌿': 'leaf', '🥩': 'knife',
  '🍽': 'fork-knife', '🍝': 'bowl-food', '🐟': 'fish', '🫒': 'drop', '🥃': 'brandy', '🫙': 'jar',
  '🍾': 'champagne', '🍋': 'orange-slice', '🍚': 'bowl-steam', '🍫': 'cookie', '🍞': 'bread',
  '🌶': 'pepper', '🍕': 'pizza', '🍅': 'plant', '🥖': 'bread', '🧅': 'plant', '🌱': 'plant',
  '🍎': 'tree', '🌾': 'grains',
};
const BY_LABEL = [[/fonduta/i, 'cooking-pot'], [/pistach|nocciol|hazel/i, 'acorn']];
const BY_TYPE = { producer: 'barn', experience: 'map-trifold', wine: 'wine', dish: 'fork-knife', ingredient: 'leaf' };

export function glyphFor(spot) {
  for (const [re, name] of BY_LABEL) if (re.test(spot.label || '')) return name;
  const e = (spot.emoji || '').replace(/\uFE0F/g, '');
  return BY_EMOJI[e] || BY_TYPE[spot.type] || 'leaf';
}

// Category tints tuned for the dark map
export const GLYPH_COLOR = { producer: '#C5E1A5', ingredient: '#81C784', wine: '#F48FB1', dish: '#FFAB91', experience: '#FFD54F' };

const SETS = { bold: GLYPHS_BOLD, fill: GLYPHS_FILL };

// SVG glyph centred on (0,0), `size` px wide — for use inside the map's SVG. variant: 'bold' | 'fill'
export function GlyphPath({ name, size, fill, variant = 'fill' }) {
  const set = SETS[variant] || GLYPHS_FILL;
  return <path d={set[name] || set.leaf} fill={fill} transform={`translate(${-size / 2} ${-size / 2}) scale(${size / 256})`} style={{ pointerEvents: 'none' }} />;
}

// Standalone inline icon for HTML (region sheet cards, chips).
export function Glyph({ name, size = 18, color = 'currentColor', variant = 'fill', style }) {
  return (
    <svg width={size} height={size} viewBox="-128 -128 256 256" aria-hidden="true" style={{ display: 'block', ...style }}>
      <GlyphPath name={name} size={256} fill={color} variant={variant} />
    </svg>
  );
}
