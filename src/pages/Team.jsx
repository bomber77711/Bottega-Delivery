
// Team — same people, roles and bios as the 2026 investor deck.
const LEADERSHIP = [
  { slug: 'alessandro-vaccari', name: 'Alessandro Vaccari', role: 'Founder & CEO', bio: 'International sales and marketing across UK, Switzerland, Germany and Australia in FMCG multinationals.' },
  { slug: 'alexandra-akira', name: 'Alexandra Akira', role: 'Co-Founder & CFO', bio: 'CuratePurpose. Next Level Productions. United Nations.' },
  { slug: 'michele-barchiesi', name: 'Michele Barchiesi', role: 'CMO', bio: 'Producer and Made in Italy expert. Co-owner, Giorgione Orto & Cucina. Owner, Cantina Antonelli San Marco.' },
  { slug: 'edoardo-di-piero', name: 'Edoardo Di Piero', role: 'CTO', bio: 'Full-stack developer. Founder, GalacticaSoft.com.' },
];

const ADVISORS = [
  { slug: 'leonardo-aresi', name: 'Leonardo Aresi', role: 'CCO', bio: 'Editor, communication and lobbying. Ex Mediaset.' },
  { slug: 'edoardo-agnese', name: 'Edoardo Agnese', role: 'Financial Advisor', bio: 'Investment & Wealth Management at Allianz Bank.' },
  { slug: 'federico-pizzi', name: 'Federico Pizzi', role: 'Tax Advisor', bio: 'Taxation and financial advisor. Chartered accountant.' },
];

function Person({ p, cls }) {
  return (
    <article className={`team-card ${cls || ''}`} style={{
      background: '#fff', borderRadius: 18, overflow: 'hidden', border: '1px solid #E3EEE1',
      boxShadow: '0 2px 10px rgba(27,58,27,0.06)', display: 'flex', flexDirection: 'column', minWidth: 0, minHeight: 0,
    }}>
      <div className="team-photo" style={{ flex: 1, minHeight: 0, background: '#fff', overflow: 'hidden' }}>
        <img src={`/img/team/${p.slug}.webp?v=3`} alt={p.name} width={480} height={480} loading="eager"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 28%', display: 'block' }} />
      </div>
      <div className="team-txt" style={{ padding: '14px 18px 16px', flex: 'none', minHeight: 146, boxSizing: 'border-box' }}>
        <span style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#2E7D32' }}>{p.role}</span>
        <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 19, fontWeight: 700, color: '#1A1A1A', margin: '3px 0 5px', lineHeight: 1.2 }}>{p.name}</h3>
        <p style={{ fontSize: 13, color: '#555', lineHeight: 1.5, margin: 0 }}>{p.bio}</p>
      </div>
    </article>
  );
}

export default function Team() {
  return (
    <div style={{ flex: 1, background: '#F0F7EE' }}>
      <div className="team-wrap" style={{ maxWidth: 1240, margin: '0 auto', padding: '26px 32px 26px', height: 'calc(100dvh - var(--team-nav, 60px))', minHeight: 620, boxSizing: 'border-box', display: 'flex', flexDirection: 'column' }}>
        <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(28px, 3.2vw, 40px)', fontWeight: 700, color: '#1A1A1A', lineHeight: 1.1, margin: '0 0 20px', flex: 'none' }}>
          <span style={{ display: 'block', fontFamily: 'inherit', fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#2E7D32', marginBottom: 8, fontFamily: 'system-ui, sans-serif' }}>OUR TEAM</span>
          The people <em style={{ color: '#4CAF50' }}>building Bottega</em>
        </h1>
        <div className="team-grid" style={{ flex: 1, minHeight: 0, display: 'grid', gridTemplateColumns: 'repeat(8, minmax(0, 1fr))', gridTemplateRows: 'repeat(2, minmax(0, 1fr))', gap: 18 }}>
          {LEADERSHIP.map((p) => <Person key={p.slug} p={p} cls="tc-top" />)}
          {ADVISORS.map((p, i) => <Person key={p.slug} p={p} cls={i === 0 ? 'tc-bot tc-first' : 'tc-bot'} />)}
        </div>
      </div>
      <style>{`
        .team-card { grid-column: span 2; }
        .team-card.tc-first { grid-column: 2 / span 2; }
        @media (min-width: 768px) and (max-height: 780px) {
          .team-wrap { padding: 16px 32px 18px !important; }
          .team-wrap h1 { font-size: 30px !important; margin-bottom: 14px !important; }
          .team-wrap h1 > span { margin-bottom: 4px !important; }
          .team-grid { gap: 14px !important; }
          .team-txt { padding: 10px 16px 12px !important; min-height: 122px !important; }
          .team-card h3 { font-size: 17px !important; margin: 2px 0 3px !important; }
          .team-card p { font-size: 12px !important; line-height: 1.45 !important; }
        }
        @media (max-width: 767.98px) {
          .team-wrap { height: auto !important; min-height: 0 !important; padding: 24px 16px 40px !important; }
          .team-grid { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; grid-template-rows: none !important; gap: 12px !important; }
          .team-card, .team-card.tc-first { grid-column: auto !important; }
          .team-photo { flex: none !important; aspect-ratio: 1 / 1; }
          .team-txt { padding: 10px 12px 12px !important; min-height: 0 !important; }
          .team-card h3 { font-size: 16px !important; }
          .team-card p { font-size: 12.5px !important; }
        }
      `}</style>
    </div>
  );
}
