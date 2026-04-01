import { Check, Users, Globe, Award, TrendingUp } from 'lucide-react';

export default function About() {
  const team = [
    { initials: 'AV', name: 'Alessandro Vaccari', role: 'Founder & CEO', color: '#2E7D32' },
    { initials: 'MB', name: 'Michele Barchiesi', role: 'CMO', color: '#1B5E20' },
    { initials: 'GG', name: 'Guillaume Griffith', role: 'CFO', color: '#388E3C' },
    { initials: 'ED', name: 'Edoardo Di Piero', role: 'CTO', color: '#4CAF50' },
  ];

  const features = [
    'AI-powered discovery connecting buyers with authentic Italian producers',
    'Direct-to-consumer sales eliminating costly distribution intermediaries',
    'Certified DOP, IGP, and DOCG products verified by regional authorities',
  ];

  const stats = [
    { value: '450+', label: 'Partners' },
    { value: '20', label: 'Regions' },
    { value: '30+', label: 'Categories' },
    { value: '€81.8B', label: 'Total Market' },
  ];

  return (
    <div style={{ flex: 1, overflowY: 'auto', background: '#F0F7EE' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '56px 32px 64px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '55fr 45fr', gap: 64, alignItems: 'start' }}>

          {/* LEFT: Mission */}
          <div style={{ animation: 'fadeSlideIn 0.5s ease' }}>
            <span style={{
              fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase',
              color: '#2E7D32', marginBottom: 16, display: 'block'
            }}>OUR MISSION</span>

            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 700, color: '#1A1A1A', lineHeight: 1.15, marginBottom: 24 }}>
              Connecting Italian<br />Producers with<br />
              <em style={{ color: '#4CAF50' }}>the World</em>
            </h2>

            <p style={{ fontSize: 16, color: '#555', lineHeight: 1.8, marginBottom: 20 }}>
              At Bottega Delivery, we create digital stores for Italian food & beverage producers allowing them to sell their high-demand Made in Italy products in one accessible platform.
            </p>
            <p style={{ fontSize: 15, color: '#666', lineHeight: 1.8, marginBottom: 36 }}>
              We aim to solve the inefficiencies global customers face when accessing authentic Italian produce with our AI-driven marketplace. By empowering small producers to boost their profits, we drive economic growth and align with key political and social priorities.
            </p>

            {/* Feature points */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 48 }}>
              {features.map((f, i) => (
                <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <div style={{
                    width: 22, height: 22, borderRadius: '50%', background: '#E8F5E9',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1
                  }}>
                    <Check size={12} color="#2E7D32" strokeWidth={3} />
                  </div>
                  <p style={{ fontSize: 14, color: '#444', lineHeight: 1.6 }}>{f}</p>
                </div>
              ))}
            </div>

            {/* Team */}
            <div>
              <p style={{ fontSize: 13, fontWeight: 700, color: '#888', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 16 }}>THE TEAM</p>
              <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                {team.map(member => (
                  <div key={member.initials} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 14px', background: '#fff', borderRadius: 100, border: '1px solid #E8F5E9', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                    <div style={{
                      width: 34, height: 34, borderRadius: '50%', background: member.color,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 12, fontWeight: 800, color: '#fff', flexShrink: 0
                    }}>{member.initials}</div>
                    <div>
                      <p style={{ fontSize: 13, fontWeight: 700, color: '#1A1A1A', lineHeight: 1.2 }}>{member.name}</p>
                      <p style={{ fontSize: 11, color: '#888' }}>{member.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: Stats card */}
          <div style={{ animation: 'fadeSlideIn 0.7s ease' }}>
            <div style={{
              background: 'linear-gradient(135deg, #1B5E20 0%, #2E7D32 60%, #388E3C 100%)',
              borderRadius: 24, padding: '40px', color: '#fff',
              boxShadow: '0 32px 80px rgba(46,125,50,0.3)'
            }}>
              {/* Stats grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28, marginBottom: 36 }}>
                {stats.map(s => (
                  <div key={s.label}>
                    <p style={{ fontFamily: "'DM Mono',monospace", fontSize: 36, fontWeight: 700, color: '#fff', marginBottom: 4 }}>{s.value}</p>
                    <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', fontWeight: 500 }}>{s.label}</p>
                  </div>
                ))}
              </div>

              {/* Divider */}
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.15)', paddingTop: 28, marginBottom: 24 }}>
                {/* Pull quote */}
                <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.85)', lineHeight: 1.7, fontStyle: 'italic', marginBottom: 16 }}>
                  "Being able to sell my products at full price on your platform, instead of selling them to supermarkets at half the price, would almost double my income."
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{
                    width: 38, height: 38, borderRadius: '50%', background: 'rgba(255,255,255,0.2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 14, fontWeight: 800, flexShrink: 0
                  }}>MC</div>
                  <div>
                    <p style={{ fontSize: 13, fontWeight: 700 }}>Matteo Costanzo</p>
                    <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)' }}>Riseria Costanzo, Piemonte</p>
                  </div>
                </div>
              </div>

              {/* Platform tagline */}
              <div style={{
                background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(8px)',
                borderRadius: 14, padding: '18px 20px',
                border: '1px solid rgba(255,255,255,0.2)'
              }}>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.9)', lineHeight: 1.6 }}>
                  Empowering Italian producers to reach global buyers — directly, fairly, and with full transparency. Made in Italy, delivered to the world.
                </p>
              </div>
            </div>

            {/* Values row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginTop: 16 }}>
              {[
                { icon: <Users size={18} />, label: 'Producer-first' },
                { icon: <Globe size={18} />, label: 'Global reach' },
                { icon: <Award size={18} />, label: 'Certified quality' },
              ].map(v => (
                <div key={v.label} style={{
                  background: '#fff', borderRadius: 12, padding: '14px', textAlign: 'center',
                  border: '1px solid #E8F5E9', boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
                }}>
                  <div style={{ color: '#2E7D32', marginBottom: 6, display: 'flex', justifyContent: 'center' }}>{v.icon}</div>
                  <p style={{ fontSize: 12, fontWeight: 600, color: '#444' }}>{v.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}