import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import Footer from '@/components/Footer';
import JsonLd from '@/components/JsonLd';

const BASE_URL = 'https://sicherheit.ai';

export function generateStaticParams() {
  return [{ locale: 'de' }, { locale: 'en' }];
}

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const isDE = locale === 'de';
  const title = isDE
    ? 'Über uns — sicherheit.ai | KI-Sicherheit & Cybersecurity'
    : 'About — sicherheit.ai | AI Security & Cybersecurity';
  const description = isDE
    ? 'sicherheit.ai ist die unabhängige deutschsprachige Plattform für KI-Sicherheit, Cybersecurity-Tools und umsetzbare Sicherheitsleitfäden für Unternehmen. Unsere Methodik, Quellen und Standards.'
    : 'sicherheit.ai is the independent German-language platform for AI security, cybersecurity tools and actionable security guides for businesses.';
  return {
    title,
    description,
    alternates: {
      canonical: `${BASE_URL}/${locale}/ueber-uns`,
      languages: {
        de: `${BASE_URL}/de/ueber-uns`,
        en: `${BASE_URL}/en/ueber-uns`,
      },
    },
    openGraph: { title, description, type: 'website' },
  };
}

const QUELLEN = [
  { name: 'BSI', desc: 'Bundesamt für Sicherheit in der Informationstechnik', url: 'https://bsi.bund.de' },
  { name: 'NIST NVD', desc: 'National Vulnerability Database (USA)', url: 'https://nvd.nist.gov' },
  { name: 'CISA', desc: 'Cybersecurity & Infrastructure Security Agency (USA)', url: 'https://cisa.gov' },
  { name: 'OWASP', desc: 'Open Web Application Security Project', url: 'https://owasp.org' },
  { name: 'MITRE ATT&CK', desc: 'Globale Wissensdatenbank für Angreifer-Taktiken', url: 'https://attack.mitre.org' },
  { name: 'EU Amtsblatt', desc: 'Offizieller EU AI Act (VO 2024/1689)', url: 'https://eur-lex.europa.eu' },
  { name: 'ENISA', desc: 'EU Agency for Cybersecurity', url: 'https://enisa.europa.eu' },
];

const STANDARDS = [
  { code: 'ISO 27001', desc: 'Informationssicherheits-Managementsystem' },
  { code: 'NIST SP 800-63B', desc: 'Richtlinien für Passwort- und Authentifizierungssicherheit' },
  { code: 'OWASP Top 10', desc: 'Kritischste Sicherheitsrisiken für Webanwendungen' },
  { code: 'EU AI Act', desc: 'VO 2024/1689: KI-Regulierung der Europäischen Union' },
  { code: 'NIS2-Richtlinie', desc: 'EU-Richtlinie zur Netz- und Informationssicherheit' },
  { code: 'DSGVO / GDPR', desc: 'EU-Datenschutz-Grundverordnung' },
  { code: 'CVSS v3.1', desc: 'Common Vulnerability Scoring System für CVE-Bewertungen' },
];

const ANGEBOTE = [
  {
    name: 'KI-Sicherheitscheck',
    price: '€ 499',
    desc: 'Wir prüfen, ob Ihre KI-Nutzung (ChatGPT, Copilot, n8n, Make etc.) DSGVO- und AI-Act-konform ist. Ergebnis: schriftlicher Maßnahmenplan.',
    items: ['KI-Tool-Inventar Ihrer Organisation', 'DSGVO- & AI-Act-Risikobewertung', 'Shadow-AI-Erkennung', 'Maßnahmenplan als PDF', '30 min Auswertungsgespräch'],
    cta: 'Jetzt anfragen',
    highlight: true,
  },
  {
    name: 'Cybersecurity-Basischeck',
    price: '€ 499',
    desc: 'Technische Prüfung Ihrer Website und E-Mail-Infrastruktur auf kritische Sicherheitslücken.',
    items: ['Security-Header-Analyse', 'SSL/TLS-Zertifikatsprüfung', 'E-Mail-Sicherheit SPF/DKIM/DMARC', 'Datenpannen-Prüfung', 'Management-Report'],
    cta: 'Jetzt anfragen',
    highlight: false,
  },
  {
    name: 'Monatsbetreuung',
    price: 'ab € 1.500 / Monat',
    desc: 'Laufende KI- und Cybersecurity-Begleitung für Ihr Unternehmen: monatlicher Report, CVE-Monitoring, Mitarbeiter-Awareness.',
    items: ['Monatlicher Security-Report', 'CVE-Monitoring & Alerts', 'KI-Governance-Unterstützung', 'Awareness-Materialien', 'Notfallplan & Ansprechpartner'],
    cta: 'Angebot anfragen',
    highlight: false,
  },
];

export default function UeberUnsPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  const isDE = locale === 'de';

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'sicherheit.ai',
    url: BASE_URL,
    description: isDE
      ? 'Unabhängige deutschsprachige Plattform für KI-Sicherheit und Cybersecurity.'
      : 'Independent German-language platform for AI security and cybersecurity.',
    areaServed: { '@type': 'GeoCircle', geoMidpoint: { '@type': 'GeoCoordinates', addressCountry: 'DE' } },
    knowsAbout: ['KI-Sicherheit', 'Cybersecurity', 'EU AI Act', 'NIS2', 'DSGVO', 'Incident Response'],
  };

  return (
    <>
      <JsonLd data={schema} />
      <main style={{ minHeight: '100vh', background: 'var(--bg)', paddingTop: '80px' }}>

        {/* Header */}
        <div style={{ background: 'var(--bg2)', borderBottom: '1px solid var(--border)' }}>
          <div className="r-wrap" style={{ padding: '48px 48px 40px' }}>
            <nav style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px', fontFamily: 'var(--mono)', fontSize: '11px', color: 'var(--text-muted)' }}>
              <Link href={`/${locale}`} style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Home</Link>
              <span>›</span>
              <span style={{ color: 'var(--cyan)' }}>{isDE ? 'Über uns' : 'About'}</span>
            </nav>
            <div style={{ fontFamily: 'var(--mono)', fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--cyan)', marginBottom: '12px' }}>
              {isDE ? 'Die Plattform' : 'The Platform'}
            </div>
            <h1 style={{ fontSize: 'clamp(32px, 5vw, 60px)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 0.95, color: 'var(--text)', margin: '0 0 20px' }}>
              {isDE ? 'Über sicherheit.ai' : 'About sicherheit.ai'}
            </h1>
            <p style={{ fontSize: '18px', color: 'var(--text-dim)', lineHeight: 1.75, maxWidth: '680px', margin: 0 }}>
              {isDE
                ? 'sicherheit.ai ist die unabhängige deutschsprachige Plattform für KI-Sicherheit, Cybersecurity-Tools und umsetzbare Sicherheitsleitfäden. Wir helfen Unternehmen, KI sicher einzusetzen und Cyberrisiken zu verstehen. Ohne Herstellerinteressen, ohne Verkaufsdruck.'
                : 'sicherheit.ai is the independent German-language platform for AI security, cybersecurity tools and actionable security guides. We help businesses use AI safely and understand cyber risks. Without vendor interests, without sales pressure.'}
            </p>
          </div>
        </div>

        <div className="r-wrap" style={{ padding: '56px 48px' }}>

          {/* Mission */}
          <section style={{ marginBottom: '72px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
              {[
                { icon: '🎯', title: isDE ? 'Mission' : 'Mission', text: isDE ? 'Wir machen KI-Sicherheit und Cybersecurity für alle zugänglich, von Einzelunternehmen bis zum Mittelstand. Unsere Inhalte sind faktenbasiert, quellengeprüft und regelmäßig aktualisiert.' : 'We make AI security and cybersecurity accessible to everyone, from solo businesses to mid-market companies. Our content is fact-based, source-verified and regularly updated.' },
                { icon: '🔍', title: isDE ? 'Unabhängigkeit' : 'Independence', text: isDE ? 'sicherheit.ai ist keine Agentur und kein Softwareanbieter. Wir haben keine Verkaufsinteressen an bestimmten Produkten. Unsere Bewertungen basieren ausschließlich auf öffentlichen Standards und anerkannten Quellen.' : 'sicherheit.ai is not an agency and not a software vendor. We have no sales interest in specific products. Our assessments are based solely on public standards and recognized sources.' },
                { icon: '📋', title: isDE ? 'Methodik' : 'Methodology', text: isDE ? 'Alle Inhalte orientieren sich an BSI, NIST, OWASP, MITRE ATT&CK und den Vorgaben des EU AI Act. CVE-Bewertungen nutzen den CVSS-Score (v3.1). Simulations- und Demo-Daten werden immer klar gekennzeichnet.' : 'All content follows BSI, NIST, OWASP, MITRE ATT&CK and EU AI Act guidelines. CVE ratings use the CVSS score (v3.1). Simulation and demo data is always clearly labeled.' },
                { icon: '🔄', title: isDE ? 'Aktualität' : 'Currency', text: isDE ? 'Inhalte werden regelmäßig auf Aktualität geprüft. Bei sicherheitskritischen Themen wie CVEs, EU AI Act und NIS2 aktualisieren wir zeitnah nach neuen offiziellen Veröffentlichungen.' : 'Content is regularly reviewed for accuracy. For security-critical topics like CVEs, EU AI Act and NIS2, we update promptly after new official publications.' },
              ].map((item, i) => (
                <div key={i} style={{ background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: '14px', padding: '28px' }}>
                  <div style={{ fontSize: '28px', marginBottom: '12px' }}>{item.icon}</div>
                  <h2 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text)', marginBottom: '10px', letterSpacing: '-0.02em' }}>{item.title}</h2>
                  <p style={{ fontSize: '14px', color: 'var(--text-dim)', lineHeight: 1.75, margin: 0 }}>{item.text}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Data labeling transparency */}
          <section style={{ marginBottom: '72px' }}>
            <h2 style={{ fontSize: '28px', fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--text)', marginBottom: '8px' }}>
              {isDE ? 'Transparenz über unsere Daten' : 'Data Transparency'}
            </h2>
            <p style={{ fontSize: '15px', color: 'var(--text-dim)', marginBottom: '28px', maxWidth: '640px' }}>
              {isDE ? 'Auf sicherheit.ai unterscheiden wir klar zwischen Live-Daten, redaktionellen Inhalten und Demo-Visualisierungen:' : 'On sicherheit.ai we clearly distinguish between live data, editorial content and demo visualizations:'}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '680px' }}>
              {[
                { label: 'LIVE', color: '#78C864', bg: 'rgba(120,200,100,0.1)', text: isDE ? 'Echtzeitdaten aus externen APIs (z.B. NIST NVD für CVEs). Timestamp sichtbar.' : 'Real-time data from external APIs (e.g. NIST NVD for CVEs). Timestamp visible.' },
                { label: 'REDAKTIONELL', color: '#00F0FF', bg: 'rgba(0,240,255,0.1)', text: isDE ? 'Von unserem Team recherchierte und geprüfte Inhalte mit Quellenangaben und Aktualisierungsdatum.' : 'Content researched and reviewed by our team with source citations and update date.' },
                { label: 'DEMO', color: '#FF9632', bg: 'rgba(255,150,50,0.1)', text: isDE ? 'Illustrative Beispieldaten zur Veranschaulichung. Kein Anspruch auf Aktualität oder Vollständigkeit.' : 'Illustrative example data for visualization. No claim of currency or completeness.' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: '10px', padding: '16px 20px' }}>
                  <span style={{ fontFamily: 'var(--mono)', fontSize: '10px', fontWeight: 700, color: item.color, background: item.bg, border: `1px solid ${item.color}40`, padding: '3px 8px', borderRadius: '4px', letterSpacing: '0.06em', flexShrink: 0, marginTop: '2px' }}>
                    {item.label}
                  </span>
                  <p style={{ fontSize: '14px', color: 'var(--text-dim)', lineHeight: 1.65, margin: 0 }}>{item.text}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Sources */}
          <section style={{ marginBottom: '72px' }}>
            <h2 style={{ fontSize: '28px', fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--text)', marginBottom: '8px' }}>
              {isDE ? 'Unsere Quellen' : 'Our Sources'}
            </h2>
            <p style={{ fontSize: '15px', color: 'var(--text-dim)', marginBottom: '28px', maxWidth: '640px' }}>
              {isDE ? 'Alle Inhalte basieren auf verifizierten, öffentlich zugänglichen Quellen anerkannter Institutionen:' : 'All content is based on verified, publicly accessible sources from recognized institutions:'}
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '12px' }}>
              {QUELLEN.map(q => (
                <a key={q.name} href={q.url} target="_blank" rel="noopener noreferrer" className="source-card" style={{
                  display: 'flex', flexDirection: 'column', gap: '4px',
                  background: 'var(--card-bg)', border: '1px solid var(--border)',
                  borderRadius: '10px', padding: '16px 20px', textDecoration: 'none',
                  transition: 'border-color 0.2s',
                }}>
                  <span style={{ fontFamily: 'var(--mono)', fontSize: '13px', fontWeight: 700, color: 'var(--cyan)' }}>{q.name}</span>
                  <span style={{ fontSize: '13px', color: 'var(--text-dim)' }}>{q.desc}</span>
                </a>
              ))}
            </div>
          </section>

          {/* Standards */}
          <section style={{ marginBottom: '72px' }}>
            <h2 style={{ fontSize: '28px', fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--text)', marginBottom: '8px' }}>
              {isDE ? 'Angewandte Standards' : 'Applied Standards'}
            </h2>
            <p style={{ fontSize: '15px', color: 'var(--text-dim)', marginBottom: '28px', maxWidth: '640px' }}>
              {isDE ? 'Unsere Tools, Checklisten und Bewertungen orientieren sich an folgenden anerkannten Normen und Rahmenwerken:' : 'Our tools, checklists and assessments follow these recognized norms and frameworks:'}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxWidth: '640px' }}>
              {STANDARDS.map(s => (
                <div key={s.code} style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '14px 20px', background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: '10px' }}>
                  <span style={{ fontFamily: 'var(--mono)', fontSize: '12px', fontWeight: 700, color: 'var(--cyan)', flexShrink: 0, minWidth: '120px' }}>{s.code}</span>
                  <span style={{ fontSize: '13px', color: 'var(--text-dim)' }}>{s.desc}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Angebote / Beratung */}
          <section id="beratung" style={{ marginBottom: '72px', scrollMarginTop: '100px' }}>
            <div style={{ fontFamily: 'var(--mono)', fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--cyan)', marginBottom: '12px' }}>
              {isDE ? 'Für Unternehmen' : 'For Businesses'}
            </div>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--text)', marginBottom: '12px' }}>
              {isDE ? 'Beratung & Checks' : 'Consulting & Checks'}
            </h2>
            <p style={{ fontSize: '16px', color: 'var(--text-dim)', marginBottom: '40px', maxWidth: '600px', lineHeight: 1.7 }}>
              {isDE
                ? 'Neben kostenfreien Tools und Inhalten bieten wir konkrete Checks und Beratungsleistungen für Unternehmen an, die KI sicher einsetzen und Cyberrisiken reduzieren wollen.'
                : 'Alongside free tools and content, we offer concrete checks and consulting services for businesses that want to use AI securely and reduce cyber risks.'}
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
              {ANGEBOTE.map((a, i) => (
                <div key={i} style={{
                  background: a.highlight ? 'var(--card-bg)' : 'var(--card-bg)',
                  border: a.highlight ? '1px solid rgba(0,240,255,0.3)' : '1px solid var(--border)',
                  borderRadius: '14px', padding: '28px',
                  position: 'relative', overflow: 'hidden',
                }}>
                  {a.highlight && (
                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, var(--cyan), transparent)' }} />
                  )}
                  <div style={{ fontFamily: 'var(--mono)', fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', color: a.highlight ? 'var(--cyan)' : 'var(--text-muted)', marginBottom: '8px' }}>
                    {a.highlight ? (isDE ? 'Empfohlen' : 'Recommended') : isDE ? 'Angebot' : 'Service'}
                  </div>
                  <h3 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text)', marginBottom: '6px', letterSpacing: '-0.02em' }}>{a.name}</h3>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: '22px', fontWeight: 800, color: a.highlight ? 'var(--cyan)' : 'var(--text)', marginBottom: '14px' }}>{a.price}</div>
                  <p style={{ fontSize: '14px', color: 'var(--text-dim)', lineHeight: 1.65, marginBottom: '20px' }}>{a.desc}</p>
                  <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {a.items.map((item, j) => (
                      <li key={j} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', fontSize: '13px', color: 'var(--text-dim)' }}>
                        <span style={{ color: 'var(--cyan)', flexShrink: 0, fontWeight: 700 }}>✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <a href="mailto:info@sicherheit.ai" style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    padding: '12px', borderRadius: '8px',
                    background: a.highlight ? 'linear-gradient(135deg, var(--cyan) 0%, #007A9A 100%)' : 'var(--surface)',
                    color: a.highlight ? '#060B18' : 'var(--text)',
                    border: a.highlight ? 'none' : '1px solid var(--border)',
                    fontWeight: 700, fontSize: '14px', textDecoration: 'none',
                    transition: 'opacity 0.2s',
                  }}>
                    {a.cta} →
                  </a>
                </div>
              ))}
            </div>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '20px', fontFamily: 'var(--mono)' }}>
              {isDE ? '* Alle Preise netto zzgl. MwSt. · Anfragen per E-Mail: info@sicherheit.ai' : '* All prices net excl. VAT · Enquiries: info@sicherheit.ai'}
            </p>
          </section>

          {/* Haftung */}
          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text)', marginBottom: '12px', letterSpacing: '-0.02em' }}>
              {isDE ? 'Haftung & Grenzen' : 'Liability & Limitations'}
            </h2>
            <p style={{ fontSize: '14px', color: 'var(--text-dim)', lineHeight: 1.8, maxWidth: '680px' }}>
              {isDE
                ? 'Die Inhalte und Tools auf sicherheit.ai dienen ausschließlich der Information und Orientierung. Sie ersetzen keine individuelle Rechts-, Steuer- oder IT-Sicherheitsberatung. Für konkrete Sicherheitsmaßnahmen empfehlen wir die Einbindung qualifizierter Fachleute. Die Nutzung der kostenlosen Tools erfolgt auf eigene Verantwortung. CVE-Daten und Bedrohungsinformationen basieren auf öffentlichen Quellen und können Verzögerungen oder Unvollständigkeiten aufweisen.'
                : 'The content and tools on sicherheit.ai are for information and orientation purposes only. They do not replace individual legal, tax or IT security advice. For specific security measures, we recommend involving qualified professionals. Use of the free tools is at your own risk. CVE data and threat information is based on public sources and may have delays or gaps.'}
            </p>
          </section>

          {/* Kontakt */}
          <section style={{ background: 'var(--card-bg)', border: '1px solid rgba(0,240,255,0.2)', borderRadius: '14px', padding: '36px', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, var(--cyan), transparent)' }} />
            <div style={{ fontFamily: 'var(--mono)', fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--cyan)', marginBottom: '12px' }}>
              {isDE ? 'Kontakt' : 'Contact'}
            </div>
            <h2 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text)', marginBottom: '12px', letterSpacing: '-0.02em' }}>
              {isDE ? 'Fragen, Kooperationen, Beratung' : 'Questions, Partnerships, Consulting'}
            </h2>
            <p style={{ fontSize: '15px', color: 'var(--text-dim)', marginBottom: '24px', maxWidth: '520px', lineHeight: 1.7 }}>
              {isDE
                ? 'Für Beratungsanfragen, Fragen zu unseren Inhalten oder Kooperationsanfragen stehen wir per E-Mail zur Verfügung.'
                : 'For consulting inquiries, questions about our content or partnership requests, we are available by email.'}
            </p>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Link href={`/${locale}/kontakt`} style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                background: 'linear-gradient(135deg, var(--cyan) 0%, #007A9A 100%)',
                color: '#060B18', fontWeight: 700, fontSize: '15px',
                padding: '13px 28px', borderRadius: '8px', textDecoration: 'none',
              }}>
                {isDE ? 'Zum Kontaktformular →' : 'Contact form →'}
              </Link>
              <a href="mailto:mahdi.mahmoud2008@gmail.com" style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                background: 'transparent',
                border: '1px solid var(--border)',
                color: 'var(--text-dim)', fontWeight: 600, fontSize: '15px',
                padding: '13px 28px', borderRadius: '8px', textDecoration: 'none',
              }}>
                mahdi.mahmoud2008@gmail.com
              </a>
            </div>
          </section>
        </div>
      </main>
      <Footer locale={locale} />
    </>
  );
}
