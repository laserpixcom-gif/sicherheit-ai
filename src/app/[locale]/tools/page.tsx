import Link from 'next/link';
import { setRequestLocale } from 'next-intl/server';
import Footer from '@/components/Footer';

const TOOLS = [
  {
    id: 'breach',
    icon: '🔍',
    title: 'Datenpanne-Checker',
    desc: 'Prüfe E-Mail und Passwort gegen Have I Been Pwned — 13+ Milliarden kompromittierte Einträge.',
    tag: 'Live · HIBP',
    tagColor: '#00F0FF',
    tagBg: 'rgba(0,240,255,0.1)',
    highlight: 'E-Mail & Passwort-Schutz',
  },
  {
    id: 'password',
    icon: '🔐',
    title: 'Passwort-Analyzer',
    desc: 'Entropie-Berechnung, Crack-Zeit-Simulation (GPU-Cluster) nach NIST SP 800-63B. 100% lokal.',
    tag: 'Lokal · Sicher',
    tagColor: '#78C864',
    tagBg: 'rgba(120,200,100,0.1)',
    highlight: 'Kein Datentransfer',
  },
  {
    id: 'cve',
    icon: '📡',
    title: 'CVE Live-Dashboard',
    desc: 'Aktuelle kritische Schwachstellen direkt aus der NIST NVD — CVSS ≥ 9 im 30-Tage-Fenster.',
    tag: 'Live · NVD API',
    tagColor: '#FF2D6F',
    tagBg: 'rgba(255,45,111,0.1)',
    highlight: 'Echtzeit-Bedrohungslage',
  },
  {
    id: 'headers',
    icon: '🛡️',
    title: 'Security Headers Prüfer',
    desc: 'HTTP-Sicherheits-Header einer Domain prüfen — HSTS, CSP, X-Frame-Options und mehr.',
    tag: 'Live-Tool',
    tagColor: '#9664FF',
    tagBg: 'rgba(150,100,255,0.1)',
    highlight: 'OWASP-Standard',
  },
  {
    id: 'incident',
    icon: '⚡',
    title: 'Incident Response Checkliste',
    desc: 'Interaktive IR-Checkliste für die ersten kritischen Stunden nach einem Sicherheitsvorfall — BSI & NIST.',
    tag: 'Interaktiv',
    tagColor: '#FF9632',
    tagBg: 'rgba(255,150,50,0.1)',
    highlight: '5-Phasen-Prozess',
  },
];

export default function ToolsPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);

  return (
    <>
      <style>{`
        .tool-card { transition: transform 0.25s, box-shadow 0.25s, border-color 0.25s; }
        .tool-card:hover { transform: translateY(-5px); box-shadow: 0 20px 60px rgba(0,0,0,0.35), 0 0 30px rgba(0,240,255,0.05) !important; border-color: var(--border-bright) !important; }
        .tool-card:hover .tool-card-line { opacity: 1 !important; }
        .tool-card:hover .tool-card-arrow { color: var(--cyan) !important; transform: translateX(4px); }
        .tool-card-arrow { transition: color 0.2s, transform 0.2s; }
      `}</style>
      <main style={{ minHeight: '100vh', background: 'var(--bg)', paddingTop: '80px' }}>

        {/* ── Header ── */}
        <div className="subpage-header" style={{ background: 'var(--bg2)', borderBottom: '1px solid var(--border)' }}>
          <div className="r-wrap">
            <div style={{ fontFamily: 'var(--mono)', fontSize: '11px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--cyan)', marginBottom: '12px' }}>
              // Kostenlose Sicherheits-Tools
            </div>
            <h1 style={{ fontSize: 'clamp(40px, 6vw, 80px)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 0.95, color: 'var(--text)', margin: '0 0 20px' }}>
              Security<br /><span style={{ color: 'var(--cyan)' }}>Tools</span>
            </h1>
            <p style={{ fontSize: '16px', color: 'var(--text-dim)', maxWidth: '520px', lineHeight: 1.7, margin: 0 }}>
              {TOOLS.length} kostenlose Tools — direkt im Browser, ohne Registrierung, DSGVO-konform. Jedes Tool hat eine eigene Seite mit Anleitung und Ergebniserklärung.
            </p>
          </div>
        </div>

        {/* ── Tool Grid ── */}
        <div className="subpage-content">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(340px, 100%), 1fr))', gap: '20px' }}>
            {TOOLS.map(tool => (
              <Link
                key={tool.id}
                href={`/${locale}/tools/${tool.id}`}
                className="tool-card"
                style={{
                  display: 'flex', flexDirection: 'column',
                  background: 'var(--card-bg)',
                  border: '1px solid var(--border)',
                  borderRadius: '18px',
                  padding: '28px',
                  textDecoration: 'none',
                  color: 'inherit',
                  position: 'relative',
                  overflow: 'hidden',
                  boxShadow: 'var(--card-shadow)',
                }}
              >
                {/* Top accent line */}
                <div className="tool-card-line" style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
                  background: `linear-gradient(90deg, ${tool.tagColor}, transparent)`,
                  opacity: 0, transition: 'opacity 0.25s',
                }} />

                {/* Icon + Tag row */}
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '20px' }}>
                  <div style={{
                    width: '52px', height: '52px',
                    background: 'var(--surface2)', border: '1px solid var(--border)',
                    borderRadius: '13px', display: 'flex', alignItems: 'center',
                    justifyContent: 'center', fontSize: '24px', flexShrink: 0,
                  }}>
                    {tool.icon}
                  </div>
                  <span style={{
                    padding: '4px 10px', borderRadius: '5px',
                    fontSize: '10px', fontWeight: 700,
                    textTransform: 'uppercase', letterSpacing: '0.06em',
                    background: tool.tagBg, color: tool.tagColor,
                    fontFamily: 'var(--mono)',
                  }}>
                    {tool.tag}
                  </span>
                </div>

                {/* Title */}
                <h2 style={{ fontSize: '18px', fontWeight: 700, letterSpacing: '-0.01em', color: 'var(--text)', margin: '0 0 8px' }}>
                  {tool.title}
                </h2>

                {/* Highlight badge */}
                <div style={{ fontFamily: 'var(--mono)', fontSize: '10px', color: tool.tagColor, marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: tool.tagColor, display: 'inline-block' }} />
                  {tool.highlight}
                </div>

                {/* Description */}
                <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.65, margin: '0 0 24px', flex: 1 }}>
                  {tool.desc}
                </p>

                {/* CTA */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontFamily: 'var(--mono)', fontSize: '12px', color: 'var(--text-dim)', fontWeight: 600 }}>
                    Tool öffnen
                  </span>
                  <span className="tool-card-arrow" style={{ fontFamily: 'var(--mono)', fontSize: '16px', color: 'var(--text-muted)' }}>→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer locale={locale} />
    </>
  );
}
