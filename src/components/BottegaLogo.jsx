export default function BottegaLogo({ size = 'md' }) {
  const scale = size === 'sm' ? 0.75 : size === 'lg' ? 1.4 : 1;
  const h = Math.round(36 * scale);
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 1, height: h }}>
      <svg height={h} viewBox="0 0 280 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* B */}
        <text x="0" y="48" fontFamily="'DM Sans',sans-serif" fontWeight="700" fontSize="52" fill="#2E7D32">B</text>
        {/* Tomato replacing O */}
        <g transform="translate(38, 4)">
          {/* Tomato body */}
          <ellipse cx="18" cy="35" rx="16" ry="17" fill="#D32F2F"/>
          {/* Shine */}
          <ellipse cx="12" cy="25" rx="5" ry="7" fill="rgba(255,255,255,0.18)" transform="rotate(-20 12 25)"/>
          {/* Green star/stem */}
          <path d="M18 18 L15 8 L18 12 L21 8 Z" fill="#2E7D32"/>
          <path d="M18 18 L8 12 L13 16 L10 8 Z" fill="#2E7D32"/>
          <path d="M18 18 L28 12 L23 16 L26 8 Z" fill="#2E7D32"/>
          <path d="M18 18 L10 24 L14 20 L8 22 Z" fill="#2E7D32"/>
          <path d="M18 18 L26 24 L22 20 L28 22 Z" fill="#2E7D32"/>
        </g>
        {/* TTEGA */}
        <text x="75" y="48" fontFamily="'DM Sans',sans-serif" fontWeight="700" fontSize="52" fill="#2E7D32">TTEGA</text>
      </svg>
    </div>
  );
}