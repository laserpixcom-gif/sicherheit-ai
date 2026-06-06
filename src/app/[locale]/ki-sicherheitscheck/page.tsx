import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import Footer from '@/components/Footer';
import JsonLd from '@/components/JsonLd';

const BASE_URL = 'https://sicherheit.ai';

export function generateStaticParams() {
  return [{ locale: 'de' }, { locale: 'en' }];
}

export const dynamic = 'force-static';

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const isDE = params.locale === 'de';
  const title = isDE
    ? 'KI Sicherheitscheck kostenlos — Prüfen Sie Ihre KI-Nutzung in 10 Minuten | sicherheit.ai'
    : 'Free AI Security Check — Test Your AI Usage in 10 Minutes | sicherheit.ai';
  const description = isDE
    ? 'Kostenloser KI Sicherheitscheck für Unternehmen: Prüfen Sie ob ChatGPT, Copilot & Co. DSGVO-konform eingesetzt werden. Sofortiges Ergebnis, kein Login, kein Risiko. Basierend auf EU AI Act & BSI-Standards.'
    : 'Free AI security check for businesses: Test whether ChatGPT, Copilot & Co. are used GDPR-compliantly. Instant result, no login, no risk. Based on EU AI Act & BSI standards.';
  return {
    title,
    description,
    keywords: isDE
      ? 'KI Sicherheitscheck, KI Sicherheit testen, AI Sicherheitscheck kostenlos, ChatGPT DSGVO, Copilot Sicherheit, KI Risiko Unternehmen'
      : 'AI security check, AI security test free, ChatGPT GDPR, Copilot security, AI risk business',
    alternates: {
      canonical: `${BASE_URL}/${params.locale}/ki-sicherheitscheck`,
      languages: {
        de: `${BASE_URL}/de/ki-sicherheitscheck`,
        en: `${BASE_URL}/en/ki-sicherheitscheck`,
        'x-default': `${BASE_URL}/de/ki-sicherheitscheck`,
      },
    },
    openGraph: {
      title,
      description,
      type: 'website',
      url: `${BASE_URL}/${params.locale}/ki-sicherheitscheck`,
    },
  };
}

const RISIKEN = [
  {
    icon: '📤',
    title: 'Datenlecks durch ChatGPT & Co.',
    text: 'Mitarbeiter geben täglich vertrauliche Daten in externe KI-Systeme ein — Kundenlisten, Verträge, Quellcode. Diese Daten können zum Training genutzt werden und sind nicht mehr unter Ihrer Kontrolle.',
    stat: '55%',
    statLabel: 'der Mitarbeiter nutzen KI ohne IT-Genehmigung',
    color: '#FF2D6F',
  },
  {
    icon: '⚖️',
    title: 'DSGVO-Verstöße ohne es zu wissen',
    text: 'Jede Eingabe personenbezogener Daten in externe KI-Dienste ohne Auftragsverarbeitungsvertrag ist ein DSGVO-Verstoß. Bußgelder bis 20 Mio. € oder 4% des Jahresumsatzes drohen.',
    stat: '€20 Mio.',
    statLabel: 'maximales DSGVO-Bußgeld',
    color: '#FF9632',
  },
  {
    icon: '🤖',
    title: 'EU AI Act Pflichten ab August 2026',
    text: 'Unternehmen die KI einsetzen müssen ab August 2026 nachweisen, dass ihre KI-Nutzung EU AI Act-konform ist. Fehlende Dokumentation kostet bis zu 35 Mio. € Strafe.',
    stat: '35 Mio. €',
    statLabel: 'maximale EU AI Act Strafe',
    color: '#7890FF',
  },
  {
    icon: '👤',
    title: 'Shadow AI — der unsichtbare Risikofaktor',
    text: '44% der deutschen Unternehmen haben bereits Sicherheitsverletzungen durch nicht genehmigte KI-Nutzung gemeldet. Die meisten IT-Abteilungen wissen nicht welche KI-Tools ihre Mitarbeiter nutzen.',
    stat: '44%',
    statLabel: 'der deutschen Unternehmen betroffen',
    color: '#A78BFA',
  },
];

const SCHRITTE = [
  { nr: '01', title: '10 Fragen beantworten', text: 'Unser Quiz prüft Ihre KI-Nutzung in fünf Risikobereichen: Datenschutz, Zugangskontrolle, Shadow AI, EU AI Act-Pflichten und Incident Response.' },
  { nr: '02', title: 'Sofortiges Ergebnis', text: 'Sie erhalten Ihren personalisierten Sicherheitsscore und eine visuelle Auswertung — welche Bereiche sicher sind und wo kritische Lücken bestehen.' },
  { nr: '03', title: 'Konkrete Maßnahmen', text: 'Zu jedem identifizierten Risiko erhalten Sie eine priorisierte Handlungsempfehlung basierend auf BSI IT-Grundschutz und EU AI Act-Anforderungen.' },
];

const FAQS = [
  {
    q: 'Ist der KI Sicherheitscheck wirklich kostenlos?',
    a: 'Ja, vollständig kostenlos. Kein Login, keine Kreditkarte, keine versteckten Kosten. Der Check basiert auf öffentlichen BSI- und EU AI Act-Standards und steht jedem Unternehmen frei zur Verfügung.',
  },
  {
    q: 'Welche Daten werden beim KI Sicherheitscheck erhoben?',
    a: 'Es werden keine personenbezogenen Daten erhoben. Alle Antworten werden ausschließlich lokal in Ihrem Browser verarbeitet. Es findet kein Datentransfer statt. Der Check ist vollständig anonym.',
  },
  {
    q: 'Für wen ist der KI Sicherheitscheck geeignet?',
    a: 'Der Check ist für Unternehmen jeder Größe geeignet, die KI-Tools wie ChatGPT, Microsoft Copilot, Google Gemini, Claude oder ähnliche Werkzeuge einsetzen. Besonders relevant für Unternehmen, die unter NIS2 oder den EU AI Act fallen.',
  },
  {
    q: 'Was passiert nach dem Check?',
    a: 'Sie erhalten sofort Ihren Sicherheitsscore und eine Risikobewertung. Wenn Sie eine detaillierte Analyse mit konkretem Maßnahmenplan wünschen, bieten wir einen professionellen KI-Sicherheitscheck ab 499 € an.',
  },
  {
    q: 'Wie oft sollte ich den KI Sicherheitscheck durchführen?',
    a: 'Wir empfehlen den Check quartalsweise, da sich die KI-Tool-Landschaft und Regulierungsanforderungen (EU AI Act, NIS2) schnell verändern. Bei jeder neuen KI-Implementierung sollte ein Check erfolgen.',
  },
  {
    q: 'Ersetzt der kostenlose Check eine professionelle Sicherheitsberatung?',
    a: 'Nein. Der kostenlose Check gibt Ihnen eine schnelle Orientierung und zeigt kritische Schwachstellen auf. Für eine rechtssichere DSGVO- und EU AI Act-Bewertung mit schriftlichem Maßnahmenplan empfehlen wir unseren professionellen KI-Sicherheitscheck.',
  },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map(f => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

const toolSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'KI Sicherheitscheck',
  applicationCategory: 'SecurityApplication',
  operatingSystem: 'Web',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
  description: 'Kostenloser KI Sicherheitscheck für Unternehmen — prüft DSGVO-Konformität und EU AI Act-Compliance der KI-Nutzung.',
  provider: { '@type': 'Organization', name: 'sicherheit.ai', url: BASE_URL },
};

export default function KiSicherheitscheckPage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  const isDE = params.locale === 'de';

  return (
    <>
      <JsonLd data={faqSchema} />
      <JsonLd data={toolSchema} />

      <main style={{ minHeight: '100vh', background: 'var(--bg)', paddingTop: '80px' }}>

        {/* ── Hero ── */}
        <header style={{
          background: 'var(--bg2)',
          borderBottom: '1px solid var(--border)',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Subtle grid */}
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            backgroundImage: 'linear-gradient(rgba(0,240,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(0,240,255,0.02) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }} />

          <div className="r-wrap" style={{ padding: '64px 48px 56px', position: 'relative' }}>
            <nav style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '28px', fontFamily: 'var(--mono)', fontSize: '11px', color: 'var(--text-muted)' }}>
              <Link href={`/${params.locale}`} style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Home</Link>
              <span>›</span>
              <Link href={`/${params.locale}/tools`} style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Tools</Link>
              <span>›</span>
              <span style={{ color: 'var(--cyan)' }}>KI-Sicherheitscheck</span>
            </nav>

            <div style={{ display: 'flex', gap: '12px', marginBottom: '20px', flexWrap: 'wrap' }}>
              <span style={{ fontFamily: 'var(--mono)', fontSize: '10px', fontWeight: 700, color: '#78C864', background: 'rgba(120,200,100,0.1)', border: '1px solid rgba(120,200,100,0.25)', padding: '4px 10px', borderRadius: '4px', letterSpacing: '0.06em' }}>
                KOSTENLOS
              </span>
              <span style={{ fontFamily: 'var(--mono)', fontSize: '10px', fontWeight: 700, color: '#00F0FF', background: 'rgba(0,240,255,0.08)', border: '1px solid rgba(0,240,255,0.2)', padding: '4px 10px', borderRadius: '4px', letterSpacing: '0.06em' }}>
                KEIN LOGIN
              </span>
              <span style={{ fontFamily: 'var(--mono)', fontSize: '10px', fontWeight: 700, color: '#A78BFA', background: 'rgba(167,139,250,0.08)', border: '1px solid rgba(167,139,250,0.2)', padding: '4px 10px', borderRadius: '4px', letterSpacing: '0.06em' }}>
                DSGVO-KONFORM
              </span>
            </div>

            <h1 style={{
              fontSize: 'clamp(32px, 5vw, 64px)',
              fontWeight: 800,
              letterSpacing: '-0.04em',
              lineHeight: 1.0,
              color: 'var(--text)',
              margin: '0 0 20px',
            }}>
              KI Sicherheitscheck<br />
              <span style={{ color: 'var(--cyan)' }}>für Ihr Unternehmen</span>
            </h1>

            <p style={{
              fontSize: 'clamp(16px, 1.8vw, 20px)',
              color: 'var(--text-dim)',
              lineHeight: 1.7,
              maxWidth: '640px',
              margin: '0 0 36px',
            }}>
              Prüfen Sie in <strong style={{ color: 'var(--text)' }}>10 Minuten kostenlos</strong>, ob Ihre KI-Nutzung — ChatGPT, Copilot, Gemini & Co. — DSGVO-konform ist und welche Sicherheitsrisiken bestehen. Basierend auf EU AI Act, BSI IT-Grundschutz und OWASP.
            </p>

            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
              <Link href={`/${params.locale}/#tools`} style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                background: 'linear-gradient(135deg, var(--cyan) 0%, #007A9A 100%)',
                color: '#060B18', fontWeight: 800, fontSize: '16px',
                padding: '16px 36px', borderRadius: '8px', textDecoration: 'none',
                boxShadow: '0 0 32px rgba(0,240,255,0.25)',
                letterSpacing: '-0.01em',
              }}>
                Kostenlosen Check starten →
              </Link>
              <span style={{ fontFamily: 'var(--mono)', fontSize: '12px', color: 'var(--text-muted)' }}>
                ∅ 8 Minuten · Kein Datentransfer
              </span>
            </div>

            {/* Trust row */}
            <div style={{ display: 'flex', gap: '24px', marginTop: '36px', flexWrap: 'wrap' }}>
              {[
                { label: 'BSI IT-Grundschutz', color: '#00F0FF' },
                { label: 'EU AI Act 2026', color: '#7890FF' },
                { label: 'OWASP Top 10', color: '#FF9632' },
                { label: 'DSGVO / GDPR', color: '#78C864' },
              ].map(b => (
                <span key={b.label} style={{ fontFamily: 'var(--mono)', fontSize: '11px', color: b.color, opacity: 0.8 }}>
                  ✓ {b.label}
                </span>
              ))}
            </div>
          </div>
        </header>

        <div className="r-wrap" style={{ padding: '80px 48px' }}>

          {/* ── Warum KI-Sicherheitscheck ── */}
          <section style={{ marginBottom: '96px' }}>
            <div style={{ fontFamily: 'var(--mono)', fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--cyan)', marginBottom: '12px' }}>
              // Warum ein KI-Sicherheitscheck notwendig ist
            </div>
            <h2 style={{ fontSize: 'clamp(24px, 3.5vw, 44px)', fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--text)', marginBottom: '16px', lineHeight: 1.1 }}>
              4 kritische Risiken durch unkontrollierte KI-Nutzung
            </h2>
            <p style={{ fontSize: '16px', color: 'var(--text-dim)', lineHeight: 1.7, maxWidth: '640px', marginBottom: '48px' }}>
              Laut einer Salesforce-Studie 2024 nutzen 55% der Mitarbeiter KI-Tools ohne Wissen der IT-Abteilung. Die rechtlichen und sicherheitstechnischen Konsequenzen sind für viele Unternehmen noch nicht greifbar — bis es zu spät ist.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(320px, 100%), 1fr))', gap: '20px' }}>
              {RISIKEN.map((r, i) => (
                <article key={i} style={{
                  background: 'var(--card-bg)',
                  border: '1px solid var(--border)',
                  borderRadius: '16px',
                  padding: '28px',
                  position: 'relative',
                  overflow: 'hidden',
                }}>
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: `linear-gradient(90deg, ${r.color}, transparent)` }} />
                  <div style={{ fontSize: '28px', marginBottom: '12px' }}>{r.icon}</div>
                  <h3 style={{ fontSize: '17px', fontWeight: 700, color: 'var(--text)', marginBottom: '10px', letterSpacing: '-0.02em' }}>{r.title}</h3>
                  <p style={{ fontSize: '14px', color: 'var(--text-dim)', lineHeight: 1.7, margin: '0 0 20px' }}>{r.text}</p>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'baseline' }}>
                    <span style={{ fontFamily: 'var(--mono)', fontSize: '22px', fontWeight: 800, color: r.color }}>{r.stat}</span>
                    <span style={{ fontFamily: 'var(--mono)', fontSize: '10px', color: 'var(--text-muted)', lineHeight: 1.4 }}>{r.statLabel}</span>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* ── So funktioniert der Check ── */}
          <section style={{ marginBottom: '96px' }}>
            <div style={{ fontFamily: 'var(--mono)', fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--cyan)', marginBottom: '12px' }}>
              // So funktioniert der kostenlose KI Sicherheitscheck
            </div>
            <h2 style={{ fontSize: 'clamp(24px, 3.5vw, 44px)', fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--text)', marginBottom: '48px', lineHeight: 1.1 }}>
              In 3 Schritten zum Ergebnis
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(280px, 100%), 1fr))', gap: '20px', marginBottom: '48px' }}>
              {SCHRITTE.map((s, i) => (
                <div key={i} style={{ background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: '16px', padding: '32px' }}>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: '36px', fontWeight: 800, color: 'rgba(0,240,255,0.15)', lineHeight: 1, marginBottom: '16px' }}>{s.nr}</div>
                  <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text)', marginBottom: '10px', letterSpacing: '-0.02em' }}>{s.title}</h3>
                  <p style={{ fontSize: '14px', color: 'var(--text-dim)', lineHeight: 1.7, margin: 0 }}>{s.text}</p>
                </div>
              ))}
            </div>

            <div style={{ textAlign: 'center' }}>
              <Link href={`/${params.locale}/#tools`} style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                background: 'linear-gradient(135deg, var(--cyan) 0%, #007A9A 100%)',
                color: '#060B18', fontWeight: 800, fontSize: '15px',
                padding: '14px 32px', borderRadius: '8px', textDecoration: 'none',
                boxShadow: '0 0 24px rgba(0,240,255,0.2)',
              }}>
                Jetzt KI-Sicherheitscheck starten →
              </Link>
            </div>
          </section>

          {/* ── Was geprüft wird ── */}
          <section style={{ marginBottom: '96px' }}>
            <div style={{ fontFamily: 'var(--mono)', fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--cyan)', marginBottom: '12px' }}>
              // Prüfbereiche
            </div>
            <h2 style={{ fontSize: 'clamp(24px, 3.5vw, 44px)', fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--text)', marginBottom: '16px', lineHeight: 1.1 }}>
              Was der KI Sicherheitscheck prüft
            </h2>
            <p style={{ fontSize: '16px', color: 'var(--text-dim)', lineHeight: 1.7, maxWidth: '640px', marginBottom: '40px' }}>
              Der Check deckt alle fünf kritischen Risikobereiche ab, die laut BSI, NIST und EU AI Act für Unternehmen relevant sind:
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '720px' }}>
              {[
                { bereich: 'Datenschutz & DSGVO', punkte: 'Welche KI-Tools nutzen Mitarbeiter? Gibt es Auftragsverarbeitungsverträge? Werden personenbezogene Daten eingegeben?', icon: '🔒' },
                { bereich: 'Shadow AI Erkennung', punkte: 'Welche KI-Tools werden ohne IT-Genehmigung genutzt? Gibt es eine KI-Richtlinie? Werden Mitarbeiter geschult?', icon: '👤' },
                { bereich: 'EU AI Act Compliance', punkte: 'Welche KI-Systeme fallen in welche Risikoklasse? Besteht Dokumentationspflicht? Sind Verbote eingehalten?', icon: '⚖️' },
                { bereich: 'Zugangskontrolle & MFA', punkte: 'Ist Multi-Faktor-Authentifizierung für KI-Tools aktiviert? Werden privilegierte Zugänge kontrolliert?', icon: '🛡️' },
                { bereich: 'Incident Response', punkte: 'Gibt es einen Plan für KI-bezogene Sicherheitsvorfälle? Sind Meldepflichten (NIS2: 24h) bekannt?', icon: '⚡' },
              ].map((item, i) => (
                <div key={i} style={{
                  display: 'flex', gap: '20px', alignItems: 'flex-start',
                  background: 'var(--card-bg)', border: '1px solid var(--border)',
                  borderRadius: '12px', padding: '20px 24px',
                }}>
                  <span style={{ fontSize: '22px', flexShrink: 0, marginTop: '2px' }}>{item.icon}</span>
                  <div>
                    <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text)', marginBottom: '6px' }}>{item.bereich}</div>
                    <div style={{ fontSize: '13px', color: 'var(--text-dim)', lineHeight: 1.65 }}>{item.punkte}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── Professioneller Check ── */}
          <section style={{ marginBottom: '96px' }}>
            <div style={{
              background: 'var(--card-bg)',
              border: '1px solid rgba(0,240,255,0.2)',
              borderRadius: '20px',
              padding: '48px',
              position: 'relative',
              overflow: 'hidden',
            }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, var(--cyan), transparent)' }} />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '32px', alignItems: 'center' }}>
                <div>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--cyan)', marginBottom: '12px' }}>
                    Professioneller KI-Sicherheitscheck
                  </div>
                  <h2 style={{ fontSize: 'clamp(20px, 2.5vw, 32px)', fontWeight: 800, color: 'var(--text)', marginBottom: '12px', letterSpacing: '-0.03em' }}>
                    Mehr als ein Quiz — der vollständige Unternehmens-Check
                  </h2>
                  <p style={{ fontSize: '15px', color: 'var(--text-dim)', lineHeight: 1.7, marginBottom: '20px', maxWidth: '540px' }}>
                    Für Unternehmen die eine rechtssichere Bewertung und einen schriftlichen Maßnahmenplan benötigen: Unser professioneller KI-Sicherheitscheck umfasst ein KI-Tool-Inventar, DSGVO- & EU AI Act-Risikobewertung, Shadow-AI-Erkennung und ein 30-minütiges Auswertungsgespräch.
                  </p>
                  <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 28px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {['KI-Tool-Inventar Ihrer Organisation', 'DSGVO- & EU AI Act-Risikobewertung', 'Shadow-AI-Erkennung', 'Maßnahmenplan als PDF', '30 min Auswertungsgespräch'].map((item, i) => (
                      <li key={i} style={{ display: 'flex', gap: '10px', fontSize: '14px', color: 'var(--text-dim)' }}>
                        <span style={{ color: 'var(--cyan)', fontWeight: 700 }}>✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
                    <Link href={`/${params.locale}/kontakt`} style={{
                      display: 'inline-flex', alignItems: 'center', gap: '8px',
                      background: 'linear-gradient(135deg, var(--cyan) 0%, #007A9A 100%)',
                      color: '#060B18', fontWeight: 700, fontSize: '15px',
                      padding: '13px 28px', borderRadius: '8px', textDecoration: 'none',
                    }}>
                      Professionellen Check anfragen →
                    </Link>
                    <span style={{ fontFamily: 'var(--mono)', fontSize: '20px', fontWeight: 800, color: 'var(--cyan)' }}>€ 499</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ── FAQ ── */}
          <section style={{ marginBottom: '80px' }}>
            <div style={{ fontFamily: 'var(--mono)', fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--cyan)', marginBottom: '12px' }}>
              // Häufige Fragen
            </div>
            <h2 style={{ fontSize: 'clamp(24px, 3.5vw, 44px)', fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--text)', marginBottom: '40px', lineHeight: 1.1 }}>
              FAQ zum KI Sicherheitscheck
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '760px' }}>
              {FAQS.map((faq, i) => (
                <div key={i} style={{
                  background: 'var(--card-bg)',
                  border: '1px solid var(--border)',
                  borderRadius: '12px',
                  padding: '24px 28px',
                }}>
                  <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text)', marginBottom: '10px', letterSpacing: '-0.01em' }}>
                    {faq.q}
                  </h3>
                  <p style={{ fontSize: '14px', color: 'var(--text-dim)', lineHeight: 1.75, margin: 0 }}>{faq.a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── Final CTA ── */}
          <section style={{ textAlign: 'center', padding: '48px 0' }}>
            <h2 style={{ fontSize: 'clamp(24px, 3vw, 40px)', fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--text)', marginBottom: '16px' }}>
              Starten Sie jetzt — kostenlos & anonym
            </h2>
            <p style={{ fontSize: '16px', color: 'var(--text-dim)', marginBottom: '32px', maxWidth: '480px', margin: '0 auto 32px', lineHeight: 1.7 }}>
              Kein Login. Kein Datentransfer. Ergebnis in 10 Minuten.
            </p>
            <Link href={`/${params.locale}/#tools`} style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              background: 'linear-gradient(135deg, var(--cyan) 0%, #007A9A 100%)',
              color: '#060B18', fontWeight: 800, fontSize: '17px',
              padding: '18px 44px', borderRadius: '8px', textDecoration: 'none',
              boxShadow: '0 0 40px rgba(0,240,255,0.3)',
            }}>
              KI Sicherheitscheck starten →
            </Link>
            <div style={{ marginTop: '20px', display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
              {['BSI IT-Grundschutz', 'EU AI Act 2026', 'DSGVO-konform', 'Kein Login'].map(b => (
                <span key={b} style={{ fontFamily: 'var(--mono)', fontSize: '11px', color: 'var(--text-muted)' }}>✓ {b}</span>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer locale={params.locale} />
    </>
  );
}
