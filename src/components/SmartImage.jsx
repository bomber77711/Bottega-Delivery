import { useEffect, useState } from 'react';

// <img> that never shows the browser's broken-image icon.
// If the source fails (dead CDN link, offline, typo) it renders a branded tile instead:
// a soft gradient in the category colour with an emoji and the item name.
export default function SmartImage({ src, alt = '', emoji = '🍽️', tint = '#2E7D32', label, style, imgStyle, loading = 'lazy', ...rest }) {
  const [failed, setFailed] = useState(!src);
  useEffect(() => { setFailed(!src); }, [src]);

  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        style={{
          width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6,
          background: `radial-gradient(circle at 30% 25%, ${tint}33, transparent 60%), linear-gradient(135deg, ${tint}22, ${tint}55)`,
          color: tint, textAlign: 'center', padding: 12, ...style,
        }}
      >
        <span style={{ fontSize: 34, lineHeight: 1 }}>{emoji}</span>
        {label && <span style={{ fontSize: 11, fontWeight: 700, opacity: 0.85, maxWidth: '90%' }}>{label}</span>}
      </div>
    );
  }
  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      decoding="async"
      onError={() => setFailed(true)}
      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', ...style, ...imgStyle }}
      {...rest}
    />
  );
}
