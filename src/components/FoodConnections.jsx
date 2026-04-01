import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// node types: recipe|producer|ingredient|region|experience
const nodeColors = {
  recipe: { bg: '#FFF3E0', border: '#E65100', text: '#E65100' },
  producer: { bg: '#E8F5E9', border: '#2E7D32', text: '#2E7D32' },
  ingredient: { bg: '#F5F5F5', border: '#666', text: '#444' },
  region: { bg: '#E3F2FD', border: '#1565C0', text: '#1565C0' },
  experience: { bg: '#FBE9E7', border: '#C76A3A', text: '#C76A3A' },
};

export default function FoodConnections({ nodes = [], edges = [], title = 'Food Connections' }) {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(null);
  const [collapsed, setCollapsed] = useState(false);

  if (!nodes.length) return null;

  // Simple horizontal layout: center node first, then spread others
  const W = 520, H = 200;
  const centerNode = nodes[0];
  const others = nodes.slice(1);
  const positions = [
    { x: W / 2, y: H / 2, ...centerNode },
    ...others.map((n, i) => {
      const angle = (i / others.length) * Math.PI * 1.6 - 0.8;
      const r = 130;
      return { x: W / 2 + Math.cos(angle) * r, y: H / 2 + Math.sin(angle) * r * 0.7, ...n };
    }),
  ];

  const nodeMap = Object.fromEntries(positions.map(n => [n.id, n]));

  return (
    <div style={{ background: '#F0F7EE', borderRadius: 12, padding: '20px 24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: collapsed ? 0 : 16 }}>
        <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 17, fontWeight: 700, color: '#1A1A1A' }}>
          🔗 {title}
        </h3>
        <button onClick={() => setCollapsed(c => !c)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 12, color: '#888', fontWeight: 600 }}>
          {collapsed ? 'Show ▾' : 'Hide ▴'}
        </button>
      </div>
      {!collapsed && (
        <div style={{ position: 'relative', width: '100%', maxWidth: W, margin: '0 auto', overflow: 'hidden' }}>
          <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ display: 'block' }}>
            {/* Edges */}
            {(edges.length ? edges : others.map(n => ({ from: centerNode.id, to: n.id }))).map((e, i) => {
              const a = nodeMap[e.from], b = nodeMap[e.to];
              if (!a || !b) return null;
              return <line key={i} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="rgba(46,125,50,0.25)" strokeWidth={1.5} strokeDasharray="4 3" />;
            })}
            {/* Nodes */}
            {positions.map((n) => {
              const c = nodeColors[n.type] || nodeColors.ingredient;
              const isHov = hovered === n.id;
              const label = n.label || n.id;
              const maxLen = 18;
              const displayLabel = label.length > maxLen ? label.slice(0, maxLen - 1) + '…' : label;
              const pillW = Math.max(displayLabel.length * 6.5 + 20, 70);
              const pillH = 26;
              return (
                <g key={n.id}
                  style={{ cursor: n.path ? 'pointer' : 'default', transition: 'opacity 0.15s' }}
                  opacity={hovered && !isHov ? 0.6 : 1}
                  onMouseEnter={() => setHovered(n.id)}
                  onMouseLeave={() => setHovered(null)}
                  onClick={() => n.path && navigate(n.path)}
                >
                  <rect
                    x={n.x - pillW / 2} y={n.y - pillH / 2}
                    width={pillW} height={pillH} rx={13}
                    fill={c.bg} stroke={isHov ? c.border : `${c.border}66`}
                    strokeWidth={isHov ? 1.5 : 1}
                  />
                  <text x={n.x} y={n.y + 4.5} textAnchor="middle" fontSize={10} fontWeight={isHov ? 700 : 600}
                    fill={c.text} fontFamily="'DM Sans',sans-serif" style={{ userSelect: 'none' }}>
                    {displayLabel}
                  </text>
                  {isHov && (
                    <text x={n.x} y={n.y + pillH / 2 + 11} textAnchor="middle" fontSize={8.5} fill="#888"
                      fontFamily="'DM Mono',monospace" style={{ userSelect: 'none' }}>
                      {n.type}
                    </text>
                  )}
                </g>
              );
            })}
          </svg>
          <p style={{ fontSize: 10, color: '#aaa', textAlign: 'center', marginTop: 6, fontFamily: "'DM Mono',monospace" }}>Click nodes to explore connections</p>
        </div>
      )}
    </div>
  );
}