import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import Footer from '@/components/Footer';
import KontaktFormular from '@/components/KontaktFormular';

const BASE_URL = 'https://sicherheit.ai';

export function generateStaticParams() {
  return [{ locale: 'de' }, { locale: 'en' }];
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const isDE = params.locale === 'de';
  const title = isDE
    ? 'Kontakt — Beratung & Anfragen | sicherheit.ai'
    : 'Contact — Consulting & Inquiries | sicherheit.ai';
  const description = isDE
    ? 'Kontaktiere sicherheit.ai für Beratungsanfragen, KI-Sicherheitschecks, AI Act Compliance und allgemeine Fragen.'
    : 'Contact sicherheit.ai for consulting requests, AI security checks, AI Act compliance and general inquiries.';
  return {
    title,
    description,
    alternates: {
      canonical: `${BASE_URL}/${params.locale}/kontakt`,
      languages: { de: `${BASE_URL}/de/kontakt`, en: `${BASE_URL}/en/kontakt` },
    },
    openGraph: { title, description, type: 'website', url: `${BASE_URL}/${params.locale}/kontakt` },
  };
}

const ANGEBOTE = [
  {
    icon: '🔍',
    title: 'KI-Sicherheitscheck',
    price: '€499',
    desc: 'Analyse eurer KI-Nutzung auf Datenschutz- und Sicherheitsrisiken. Schriftlicher Report mit konkreten Maßnahmen.',
    color: '#00F0FF',
  },
  {
    icon: '📋',
    title: 'AI Act Compliance',
    price: '€299',
    desc: 'Einordnung eurer KI-Systeme in Risikoklassen, Handlungsplan für EU AI Act-Konformität.',
    color: '#7890FF',
  },
  {
    icon: '⚡',
    title: 'Incident First Response',
    price: '€199/h',
    desc: 'Unterstützung in den ersten 72 Stunden nach einem Sicherheitsvorfall, remote oder vor Ort.',
    color: '#FF9632',
  },
];

export default function KontaktPage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  const isDE = params.locale === 'de';

  return (
    <>
      <style>{`
        @media (max-width: 768px) {
          .kontakt-grid { grid-template-columns: 1fr !important; }
          .kontakt-name-email { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <main style={{ minHeight: '100vh', background: 'var(--bg)', paddingTop: '80px' }}>

        {/* Header */}
        <div style={{ background: 'var(--bg2)', borderBottom: '1px solid var(--border)' }}>
          <div className="r-wrap" style={{ padding: '48px 48px 40px' }}>
            <nav style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px', fontFamily: 'var(--mono)', fontSize: '11px', color: 'var(--text-muted)' }}>
              <Link href={`/${params.locale}`} style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Home</Link>
              <span>›</span>
              <span style={{ color: 'var(--cyan)' }}>{isDE ? 'Kontakt' : 'Contact'}</span>
            </nav>

            <div style={{ fontFamily: 'var(--mono)', fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--cyan)', marginBottom: '12px' }}>
              // Kontakt & Anfragen
            </div>
            <h1 style={{ fontSize: 'clamp(28px, 4vw, 52px)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 0.95, marginBottom: '16px' }}>
              {isDE ? 'Wie kann ich dir helfen?' : 'How can I help you?'}
            </h1>
            <p style={{ fontSize: '17px', color: 'var(--text-dim)', lineHeight: 1.7, maxWidth: '560px' }}>
              {isDE
                ? 'Ob Beratungsanfrage, Sicherheitsfrage oder Pressekontakt: Schreib mir direkt. Ich antworte werktags in der Regel innerhalb von 24 Stunden.'
                : 'Whether consulting, security question or press contact: Write me directly. I usually respond within 24 hours on weekdays.'}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="r-wrap" style={{ padding: '56px 48px' }}>
          <div className="kontakt-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '56px', alignItems: 'start' }}>

            {/* LEFT: Form */}
            <div>
              <div style={{
                background: 'var(--card-bg)',
                border: '1px solid var(--border)',
                borderRadius: '18px',
                padding: '36px',
                position: 'relative',
                overflow: 'hidden',
              }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, var(--cyan), transparent)' }} />
                <div style={{ fontFamily: 'var(--mono)', fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--cyan)', marginBottom: '6px' }}>
                  // Kontaktformular
                </div>
                <h2 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text)', marginBottom: '28px', letterSpacing: '-0.02em' }}>
                  {isDE ? 'Deine Nachricht' : 'Your message'}
                </h2>
                <KontaktFormular />
              </div>
            </div>

            {/* RIGHT: Sidebar */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', position: 'sticky', top: '100px' }}>

              {/* Direktkontakt */}
              <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: '14px', padding: '24px' }}>
                <div style={{ fontFamily: 'var(--mono)', fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '16px' }}>
                  Direktkontakt
                </div>
                <a href="mailto:mahdi.mahmoud2008@gmail.com" style={{
                  display: 'flex', alignItems: 'center', gap: '12px',
                  padding: '14px 16px',
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: '10px',
                  textDecoration: 'none',
                  marginBottom: '10px',
                }}>
                  <span style={{ fontSize: '20px' }}>✉</span>
                  <div>
                    <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text)', fontFamily: 'var(--mono)' }}>E-Mail</div>
                    <div style={{ fontSize: '12px', color: 'var(--cyan)' }}>mahdi.mahmoud2008@gmail.com</div>
                  </div>
                </a>
                <div style={{ fontFamily: 'var(--mono)', fontSize: '11px', color: 'var(--text-muted)', lineHeight: 1.6, padding: '0 4px' }}>
                  Reaktionszeit: &lt;24h werktags
                </div>
              </div>

              {/* Angebote */}
              <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: '14px', padding: '24px' }}>
                <div style={{ fontFamily: 'var(--mono)', fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '16px' }}>
                  Leistungen & Preise
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {ANGEBOTE.map(a => (
                    <div key={a.title} style={{
                      padding: '14px 16px',
                      background: 'var(--surface)',
                      border: '1px solid var(--border)',
                      borderRadius: '10px',
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span>{a.icon}</span>
                          <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text)' }}>{a.title}</span>
                        </div>
                        <span style={{ fontFamily: 'var(--mono)', fontSize: '12px', fontWeight: 800, color: a.color, flexShrink: 0 }}>{a.price}</span>
                      </div>
                      <p style={{ fontSize: '11px', color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>{a.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Datenschutz */}
              <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: '14px', padding: '20px' }}>
                <div style={{ fontFamily: 'var(--mono)', fontSize: '10px', color: 'var(--text-muted)', lineHeight: 1.7 }}>
                  🔒 Deine Daten werden ausschließlich zur Bearbeitung deiner Anfrage verwendet und nicht an Dritte weitergegeben. Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO (Vertragsanbahnung).
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer locale={params.locale} />
    </>
  );
}
