
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

function Person({ p }) {
  return (
    <article className="team-card" style={{
      background: '#fff', borderRadius: 16, overflow: 'hidden', border: '1px solid #E3EEE1',
      boxShadow: '0 1px 2px rgba(0,0,0,0.04)', display: 'flex', flexDirection: 'column', minWidth: 0,
    }}>
      <div style={{ aspectRatio: '1 / 1', background: '#fff', overflow: 'hidden' }}>
        <img src={`/img/team/${p.slug}.webp?v=3`} alt={p.name} width={480} height={480} loading="eager"
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
      </div>
      <div className="team-txt" style={{ padding: '12px 14px 14px' }}>
        <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#2E7D32' }}>{p.role}</span>
        <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 16, fontWeight: 700, color: '#1A1A1A', margin: '4px 0 6px', lineHeight: 1.2 }}>{p.name}</h3>
        <p style={{ fontSize: 12, color: '#555', lineHeight: 1.5, margin: 0 }}>{p.bio}</p>
      </div>
    </article>
  );
}

const LABEL = { fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#2E7D32', margin: '0 0 12px' };

export default function Team() {
  return (
    <div style={{ flex: 1, overflowY: 'auto', background: '#F0F7EE' }}>
      <div className="team-wrap" style={{ maxWidth: 1240, margin: '0 auto', padding: '40px 32px 40px' }}>
        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#2E7D32', display: 'block', marginBottom: 10 }}>OUR TEAM</span>
        <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(30px, 3.6vw, 44px)', fontWeight: 700, color: '#1A1A1A', lineHeight: 1.12, margin: '0 0 26px' }}>
          The people <em style={{ color: '#4CAF50' }}>building Bottega</em>
        </h1>

        <div className="team-row" style={{ display: 'grid', gridTemplateColumns: '4fr 3fr', gap: 28, alignItems: 'stretch' }}>
          <section style={{ display: 'flex', flexDirection: 'column' }}>
            <h2 style={LABEL}>Leadership</h2>
            <div className="team-grid team-grid-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: 14, flex: 1 }}>
              {LEADERSHIP.map((p) => <Person key={p.slug} p={p} />)}
            </div>
          </section>
          <section style={{ display: 'flex', flexDirection: 'column' }}>
            <h2 style={LABEL}>Commercial &amp; advisory</h2>
            <div className="team-grid team-grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 14, flex: 1 }}>
              {ADVISORS.map((p) => <Person key={p.slug} p={p} />)}
            </div>
          </section>
        </div>
      </div>
      <style>{`
        @media (max-width: 1100px) { .team-row { grid-template-columns: 1fr !important; gap: 22px !important; } .team-wrap { max-width: 860px !important; } }
        @media (max-width: 767.98px) {
          .team-wrap { padding: 28px 16px 40px !important; }
          .team-grid-4, .team-grid-3 { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; gap: 12px !important; }
          .team-txt { padding: 10px 12px 12px !important; }
        }
      `}</style>
    </div>
  );
}
