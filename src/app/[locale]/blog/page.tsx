import Footer from '@/components/Footer';
import Link from 'next/link';

const ARTICLES = [
  {
    cat: 'KI-Sicherheit', catColor: '#00F0FF', catBg: 'rgba(0,240,255,0.1)',
    title: 'GPT-5 und die neue Generation KI-gestützter Cyberangriffe',
    author: 'Dr. Lena Hartmann', date: '04. Mai 2026', readTime: '12 min',
    badge: 'KRITISCH', badgeColor: '#FF2D6F', badgeBg: 'rgba(255,45,111,0.12)',
  },
  {
    cat: 'Ransomware', catColor: '#FF2D6F', catBg: 'rgba(255,45,111,0.1)',
    title: 'Phantom Ransomware: Anatomie eines DAX-Angriffs',
    author: 'Markus Schreiber', date: '03. Mai 2026', readTime: '8 min',
    badge: 'HOCH', badgeColor: '#FF9632', badgeBg: 'rgba(255,150,50,0.12)',
  },
  {
    cat: 'Regulierung', catColor: '#7890FF', catBg: 'rgba(120,144,255,0.1)',
    title: 'EU AI Act: Compliance-Anforderungen für deutsche Firmen',
    author: 'Julia Becker', date: '02. Mai 2026', readTime: '10 min',
    badge: 'NEU', badgeColor: '#78C864', badgeBg: 'rgba(120,200,100,0.12)',
  },
  {
    cat: 'Schwachstelle', catColor: '#FF9632', catBg: 'rgba(255,150,50,0.1)',
    title: 'CVE-2026-4821: Kritische RCE-Lücke in OpenSSL 3.x',
    author: 'CERT-DE', date: '01. Mai 2026', readTime: '5 min',
    badge: 'CVSS 9.8', badgeColor: '#FF2D6F', badgeBg: 'rgba(255,45,111,0.12)',
  },
  {
    cat: 'Forschung', catColor: '#9664FF', catBg: 'rgba(150,100,255,0.1)',
    title: 'LLM-gestützte Malware-Generierung: Analyse aktueller Angriffsmuster',
    author: 'TU Berlin', date: '30. Apr 2026', readTime: '15 min',
    badge: 'NEU', badgeColor: '#78C864', badgeBg: 'rgba(120,200,100,0.12)',
  },
  {
    cat: 'Datenschutz', catColor: '#9664FF', catBg: 'rgba(150,100,255,0.1)',
    title: 'Datenpanne: 4 Millionen Nutzerdaten bei Telekommunikationsanbieter',
    author: 'Redaktion', date: '29. Apr 2026', readTime: '6 min',
    badge: 'HOCH', badgeColor: '#FF9632', badgeBg: 'rgba(255,150,50,0.12)',
  },
];

export default function BlogPage({ params: { locale } }: { params: { locale: string } }) {
  return (
    <>
      <main style={{ minHeight: '100vh', background: 'var(--bg)', paddingTop: '80px' }}>
        {/* Header */}
        <div className="subpage-header" style={{
          background: 'var(--bg2)',
          borderBottom: '1px solid var(--border)',
        }}>
          <div className="r-wrap">
            <div style={{ fontFamily: 'var(--mono)', fontSize: '11px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--cyan)', marginBottom: '12px' }}>
              // Aktuelle Insights
            </div>
            <h1 style={{ fontSize: 'clamp(40px, 6vw, 80px)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 0.95, color: 'var(--text)', margin: 0 }}>
              Security<br /><span style={{ color: 'var(--cyan)' }}>Intelligence</span>
            </h1>
          </div>
        </div>

        {/* Articles grid */}
        <div className="subpage-content">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(380px, 100%), 1fr))', gap: '20px' }}>
            {ARTICLES.map((article, i) => (
              <article key={i} style={{
                background: 'var(--card-bg)',
                border: '1px solid var(--border)',
                borderRadius: '16px',
                padding: '28px',
                transition: 'border-color 0.2s, transform 0.2s',
                cursor: 'pointer',
                boxShadow: 'var(--card-shadow)',
              }}>
                <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
                  <span style={{ padding: '3px 10px', borderRadius: '4px', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', background: article.catBg, color: article.catColor }}>
                    {article.cat}
                  </span>
                  <span style={{ padding: '3px 10px', borderRadius: '4px', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', background: article.badgeBg, color: article.badgeColor }}>
                    {article.badge}
                  </span>
                </div>
                <h2 style={{ fontSize: '17px', fontWeight: 700, lineHeight: 1.35, letterSpacing: '-0.01em', color: 'var(--text)', margin: '0 0 16px' }}>
                  {article.title}
                </h2>
                <div style={{ display: 'flex', gap: '12px', fontSize: '12px', color: 'var(--text-muted)', fontFamily: 'var(--mono)', paddingTop: '14px', borderTop: '1px solid var(--border)' }}>
                  <span>{article.author}</span>
                  <span>·</span>
                  <span>{article.date}</span>
                  <span>·</span>
                  <span>{article.readTime}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>
      <Footer locale={locale} />
    </>
  );
}
