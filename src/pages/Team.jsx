
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

function Person({ p, large }) {
  return (
    <article className="team-card" style={{
      background: '#fff', borderRadius: 20, overflow: 'hidden', border: '1px solid #E3EEE1',
      boxShadow: '0 1px 2px rgba(0,0,0,0.04)', display: 'flex', flexDirection: 'column',
    }}>
      <div style={{ aspectRatio: '1 / 1', background: '#E8F5E9', overflow: 'hidden' }}>
        <img src={`/img/team/${p.slug}.webp`} alt={p.name} width={480} height={480} loading={large ? 'eager' : 'lazy'}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
      </div>
      <div style={{ padding: large ? '20px 22px 24px' : '16px 18px 20px' }}>
        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#2E7D32' }}>{p.role}</span>
        <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: large ? 22 : 19, fontWeight: 700, color: '#1A1A1A', margin: '6px 0 8px', lineHeight: 1.2 }}>{p.name}</h3>
        <p style={{ fontSize: 14, color: '#555', lineHeight: 1.65, margin: 0 }}>{p.bio}</p>
      </div>
    </article>
  );
}

export default function Team() {
  return (
    <div style={{ flex: 1, overflowY: 'auto', background: '#F0F7EE' }}>
      <div className="team-wrap" style={{ maxWidth: 1200, margin: '0 auto', padding: '56px 32px 64px' }}>
        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#2E7D32', display: 'block', marginBottom: 14 }}>OUR TEAM</span>
        <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(32px, 4.5vw, 52px)', fontWeight: 700, color: '#1A1A1A', lineHeight: 1.12, margin: '0 0 32px' }}>
          The people <em style={{ color: '#4CAF50' }}>building Bottega</em>
        </h1>

        <div className="team-grid team-grid-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: 22 }}>
          {LEADERSHIP.map((p) => <Person key={p.slug} p={p} large />)}
        </div>

        <h2 style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#2E7D32', margin: '56px 0 18px' }}>Commercial &amp; advisory</h2>
        <div className="team-grid team-grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 22 }}>
          {ADVISORS.map((p) => <Person key={p.slug} p={p} />)}
        </div>

      </div>
      <style>{`
        @media (max-width: 1024px) { .team-grid-4 { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; } }
        @media (max-width: 767.98px) {
          .team-wrap { padding: 28px 16px 40px !important; }
          .team-grid-4, .team-grid-3 { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; gap: 12px !important; }
          .team-card h3 { font-size: 16px !important; }
          .team-card p { font-size: 12.5px !important; line-height: 1.5 !important; }
          .team-card > div:last-child { padding: 12px 12px 14px !important; }
        }
      `}</style>
    </div>
  );
}
