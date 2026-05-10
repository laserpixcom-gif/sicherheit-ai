import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import Footer from '@/components/Footer';
import JsonLd, { faqSchema } from '@/components/JsonLd';
import FaqAccordion from '@/components/FaqAccordion';

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
    ? 'EU AI Act 2026 — Checkliste, Pflichten & Fristen für Unternehmen | sicherheit.ai'
    : 'EU AI Act 2026 — Checklist, Obligations & Deadlines for Businesses | sicherheit.ai';
  const description = isDE
    ? 'Der vollständige Leitfaden zum EU AI Act (VO 2024/1689) für Unternehmen: Risikoklassen, Compliance-Pflichten, Fristen bis 2027, Bußgelder bis 35 Mio. Euro und eine kostenlose Checkliste.'
    : 'The complete guide to the EU AI Act (Regulation 2024/1689) for businesses: risk classes, compliance obligations, deadlines until 2027, fines up to €35 million and a free checklist.';
  return {
    title,
    description,
    keywords: 'EU AI Act, KI-Verordnung, AI Act Unternehmen, AI Act Checkliste, KI-Risikoklassen, AI Act Pflichten, EU AI Act 2026, AI Act DSGVO, KI-Compliance',
    alternates: {
      canonical: `${BASE_URL}/${locale}/ai-act`,
      languages: {
        de: `${BASE_URL}/de/ai-act`,
        en: `${BASE_URL}/en/ai-act`,
      },
    },
    openGraph: { title, description, type: 'article', url: `${BASE_URL}/${locale}/ai-act` },
  };
}

const RISIKOKLASSEN = [
  {
    level: 'Inakzeptables Risiko',
    color: '#FF2D6F',
    bg: 'rgba(255,45,111,0.1)',
    geltung: 'Seit Feb. 2025',
    examples: ['Soziales Scoring durch Behörden', 'Manipulation von Menschen', 'Echtzeit-Biometrie an öffentlichen Orten (mit Ausnahmen)', 'KI zur Ausnutzung von Schwächen'],
    pflicht: 'Verboten. Keine Ausnahmen für Unternehmen.',
  },
  {
    level: 'Hohes Risiko',
    color: '#FF9632',
    bg: 'rgba(255,150,50,0.1)',
    geltung: 'Ab Aug. 2026',
    examples: ['KI in HR & Recruiting', 'KI in Kreditvergabe', 'KI in medizinischen Diagnosen', 'KI in kritischer Infrastruktur', 'KI in der Strafverfolgung', 'KI in der Bildung'],
    pflicht: 'Konformitätsbewertung, Risikomanagement, Dokumentation, menschliche Aufsicht, Registrierung in EU-Datenbank.',
  },
  {
    level: 'Spezifische Transparenzpflichten',
    color: '#7890FF',
    bg: 'rgba(120,144,255,0.1)',
    geltung: 'Ab Aug. 2026',
    examples: ['Chatbots (müssen als KI kenntlich gemacht werden)', 'Deep Fakes', 'Emotionserkennung', 'Biometrische Kategorisierung'],
    pflicht: 'Offenlegung gegenüber Nutzern, dass sie mit einer KI interagieren.',
  },
  {
    level: 'Minimales / kein Risiko',
    color: '#78C864',
    bg: 'rgba(120,200,100,0.1)',
    geltung: 'Keine Pflichten',
    examples: ['KI-Spamfilter', 'KI-gestützte Suche', 'Empfehlungssysteme (ohne kritische Anwendung)', 'Produktivitäts-KI (Copilot, ChatGPT für Texte)'],
    pflicht: 'Keine gesetzlichen Pflichten. Freiwillige Verhaltenskodizes empfohlen.',
  },
];

const FRISTEN = [
  { date: 'August 2024', event: 'EU AI Act in Kraft getreten (VO 2024/1689)', done: true },
  { date: 'Februar 2025', event: 'Verbote für inakzeptables Risiko gelten (Kapitel I & II)', done: true },
  { date: 'August 2025', event: 'Verhaltenskodizes für GPAI-Modelle werden angewendet', done: false },
  { date: 'August 2026', event: 'Hauptteil gilt: Hochrisiko-KI, Transparenzpflichten, Behörden eingerichtet', done: false },
  { date: 'August 2027', event: 'Vollständiger Rollout, auch für bestehende Hochrisiko-Systeme', done: false },
];

const BUSSGELDER = [
  { max: '35 Mio. €', grund: 'Verstoß gegen verbotene KI-Praktiken (Artikel 5)', color: '#FF2D6F' },
  { max: '15 Mio. €', grund: 'Verstöße gegen Anforderungen für Hochrisiko-KI', color: '#FF9632' },
  { max: '7,5 Mio. €', grund: 'Falsche Informationen gegenüber Behörden', color: '#7890FF' },
];

const FAQS = [
  { q: 'Was ist der EU AI Act?', a: 'Der EU AI Act (Verordnung 2024/1689) ist das weltweit erste umfassende KI-Regelwerk. Er klassifiziert KI-Systeme nach Risikostufen und definiert Pflichten für Unternehmen, die KI entwickeln oder einsetzen. Er gilt EU-weit und damit auch für alle deutschen Unternehmen.' },
  { q: 'Welche Unternehmen sind vom EU AI Act betroffen?', a: 'Alle Unternehmen, die KI-Systeme in der EU entwickeln, vertreiben oder einsetzen, unabhängig von ihrer Größe oder ihrem Sitz. Auch Nicht-EU-Unternehmen sind betroffen, wenn ihre KI-Systeme in der EU genutzt werden.' },
  { q: 'Was ist eine KI laut EU AI Act?', a: 'Der AI Act definiert KI-Systeme als maschinenbasierte Systeme, die auf Basis von Eingaben Vorhersagen, Empfehlungen, Entscheidungen oder Inhalte erzeugen und damit physische oder virtuelle Umgebungen beeinflussen können. Das umfasst LLMs wie ChatGPT, Bilderkennungssysteme, Empfehlungsalgorithmen und mehr.' },
  { q: 'Gilt der AI Act für den Einsatz von ChatGPT oder Microsoft Copilot?', a: 'Für die meisten Einsatzzwecke (Texterstellung, Zusammenfassung, Recherche) fallen ChatGPT und Copilot in die Kategorie minimales Risiko und es gelten keine speziellen Pflichten. Werden sie jedoch in hochriskanten Kontexten eingesetzt (z.B. HR-Entscheidungen, Kreditbewertung), gelten die Hochrisiko-Anforderungen.' },
  { q: 'Was müssen Unternehmen jetzt konkret tun?', a: 'Schritt 1: Inventar aller eingesetzten KI-Systeme erstellen. Schritt 2: Risikoklasse jedes Systems bestimmen. Schritt 3: Für Hochrisiko-Systeme: Konformitätsbewertung, Risikomanagement und Dokumentationspflichten aufsetzen. Schritt 4: Mitarbeiter schulen, die mit KI arbeiten. Schritt 5: KI-Governance-Richtlinie erstellen.' },
  { q: 'Was sind GPAI-Modelle (General Purpose AI)?', a: 'GPAI-Modelle sind leistungsstarke KI-Grundlagenmodelle wie GPT-4, Claude oder Gemini. Ab einer Trainingsrechenleistung von 10²⁵ FLOP gelten sie als systemisch relevant und unterliegen zusätzlichen Transparenz- und Sicherheitspflichten.' },
  { q: 'Wie hoch sind die Bußgelder beim AI Act?', a: 'Bis zu 35 Millionen Euro oder 7% des weltweiten Jahresumsatzes bei Verstößen gegen verbotene KI-Praktiken. Bis zu 15 Millionen Euro oder 3% des Umsatzes bei Verletzung der Hochrisiko-Anforderungen.' },
  { q: 'Wie verhält sich der AI Act zur DSGVO?', a: 'Der AI Act ergänzt die DSGVO, ersetzt sie aber nicht. Beide Regelwerke gelten parallel. Die DSGVO regelt den Datenschutz, der AI Act regelt die KI-Sicherheit und -Transparenz. Bei KI-Systemen, die personenbezogene Daten verarbeiten, müssen beide Regelwerke eingehalten werden.' },
];

const CHECKLISTE = [
  'KI-Inventar erstellt: Alle eingesetzten KI-Tools und -Systeme dokumentiert',
  'Risikoklassen bestimmt: Jedes System einer der vier Kategorien zugeordnet',
  'Hochrisiko-Systeme identifiziert und Maßnahmenplan erstellt',
  'KI-Nutzungsrichtlinie für Mitarbeiter erstellt',
  'Transparenzpflichten umgesetzt (Chatbots als KI kenntlich gemacht)',
  'Datenschutz-Folgenabschätzung für hochriskante KI durchgeführt',
  'Menschliche Aufsicht für Hochrisiko-KI-Entscheidungen sichergestellt',
  'Schulungen für KI-nutzende Mitarbeiter geplant oder durchgeführt',
  'Lieferantenverträge auf AI-Act-Konformität geprüft',
  'Verantwortliche Person für KI-Compliance benannt',
];

export default function AiActPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  const isDE = locale === 'de';

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'EU AI Act 2026 — Leitfaden für Unternehmen',
    description: 'Vollständiger Leitfaden zum EU AI Act: Risikoklassen, Pflichten, Fristen und Checkliste.',
    url: `${BASE_URL}/${locale}/ai-act`,
    datePublished: '2024-08-01',
    dateModified: '2026-05-01',
    author: { '@type': 'Organization', name: 'sicherheit.ai' },
    publisher: { '@type': 'Organization', name: 'sicherheit.ai', url: BASE_URL },
    keywords: 'EU AI Act, KI-Verordnung, AI Act Compliance, KI-Risikoklassen',
    inLanguage: locale,
    isBasedOn: 'https://eur-lex.europa.eu/legal-content/DE/TXT/?uri=CELEX:32024R1689',
  };

  return (
    <>
      <JsonLd data={articleSchema} />
      <JsonLd data={faqSchema(FAQS)} />
      <main style={{ minHeight: '100vh', background: 'var(--bg)', paddingTop: '80px' }}>

        {/* Header */}
        <div style={{ background: 'var(--bg2)', borderBottom: '1px solid var(--border)' }}>
          <div className="r-wrap" style={{ padding: '48px 48px 40px' }}>
            <nav style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px', fontFamily: 'var(--mono)', fontSize: '11px', color: 'var(--text-muted)' }}>
              <Link href={`/${locale}`} style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Home</Link>
              <span>›</span>
              <span style={{ color: 'var(--cyan)' }}>EU AI Act</span>
            </nav>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
              <span style={{ fontFamily: 'var(--mono)', fontSize: '10px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#78C864', background: 'rgba(120,200,100,0.1)', border: '1px solid rgba(120,200,100,0.3)', padding: '3px 10px', borderRadius: '5px' }}>
                IN KRAFT
              </span>
              <span style={{ fontFamily: 'var(--mono)', fontSize: '10px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#7890FF', background: 'rgba(120,144,255,0.1)', border: '1px solid rgba(120,144,255,0.3)', padding: '3px 10px', borderRadius: '5px' }}>
                VO 2024/1689
              </span>
              <span style={{ fontFamily: 'var(--mono)', fontSize: '10px', color: 'var(--text-muted)', padding: '3px 10px' }}>
                Zuletzt aktualisiert: Mai 2026 · Quelle: EU Amtsblatt
              </span>
            </div>
            <h1 style={{ fontSize: 'clamp(28px, 4.5vw, 56px)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1, color: 'var(--text)', margin: '0 0 20px' }}>
              {isDE ? 'EU AI Act — Der vollständige Leitfaden für Unternehmen' : 'EU AI Act — The Complete Guide for Businesses'}
            </h1>
            <p style={{ fontSize: '17px', color: 'var(--text-dim)', lineHeight: 1.75, maxWidth: '700px', margin: 0 }}>
              {isDE
                ? 'Die Verordnung (EU) 2024/1689 ist seit August 2024 in Kraft: das weltweit erste umfassende KI-Gesetz. Was bedeutet das konkret für Ihr Unternehmen? Welche Pflichten gelten wann? Und wie werden Bußgelder bis 35 Millionen Euro vermieden?'
                : 'Regulation (EU) 2024/1689 has been in force since August 2024: the world\'s first comprehensive AI law. What does this mean concretely for your business? Which obligations apply when? And how are fines of up to €35 million avoided?'}
            </p>
          </div>
        </div>

        <div className="r-wrap" style={{ padding: '56px 48px' }}>
          <div className="subpage-sidebar-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '48px', alignItems: 'start' }}>

            {/* LEFT — main content */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>

              {/* Was ist der AI Act */}
              <section>
                <h2 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--text)', letterSpacing: '-0.02em', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ width: '3px', height: '22px', background: 'var(--cyan)', borderRadius: '2px', flexShrink: 0 }} />
                  {isDE ? 'Was ist der EU AI Act?' : 'What is the EU AI Act?'}
                </h2>
                <div style={{ fontSize: '15px', color: 'var(--text-dim)', lineHeight: 1.85, display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <p style={{ margin: 0 }}>
                    {isDE
                      ? 'Der EU AI Act (Verordnung (EU) 2024/1689) ist das weltweit erste umfassende Regelwerk für Künstliche Intelligenz. Er wurde am 1. August 2024 im EU-Amtsblatt veröffentlicht und trat am selben Tag in Kraft. Der AI Act gilt für alle Unternehmen, die KI-Systeme in der EU entwickeln, vertreiben oder einsetzen, unabhängig davon, wo das Unternehmen seinen Sitz hat.'
                      : 'The EU AI Act (Regulation (EU) 2024/1689) is the world\'s first comprehensive regulatory framework for artificial intelligence. It was published in the EU Official Journal on 1 August 2024 and entered into force on the same day. The AI Act applies to all companies that develop, distribute or use AI systems in the EU, regardless of where the company is based.'}
                  </p>
                  <p style={{ margin: 0 }}>
                    {isDE
                      ? 'Der Ansatz ist risikobasiert: Je höher das Risiko eines KI-Systems für Grundrechte und Sicherheit, desto strenger die Anforderungen. Das Spektrum reicht von vollständigen Verboten bis zu Systemen ohne besondere Auflagen.'
                      : 'The approach is risk-based: the higher the risk of an AI system to fundamental rights and safety, the stricter the requirements. The spectrum ranges from outright bans to systems with no special requirements.'}
                  </p>
                </div>
              </section>

              {/* Risikoklassen */}
              <section>
                <h2 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--text)', letterSpacing: '-0.02em', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ width: '3px', height: '22px', background: 'var(--cyan)', borderRadius: '2px', flexShrink: 0 }} />
                  {isDE ? 'Die vier Risikoklassen' : 'The Four Risk Classes'}
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {RISIKOKLASSEN.map((r, i) => (
                    <div key={i} style={{ background: 'var(--card-bg)', border: `1px solid ${r.color}30`, borderRadius: '14px', overflow: 'hidden' }}>
                      <div style={{ padding: '16px 20px', borderBottom: `1px solid ${r.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px', background: r.bg }}>
                        <span style={{ fontWeight: 700, color: r.color, fontSize: '15px' }}>{r.level}</span>
                        <span style={{ fontFamily: 'var(--mono)', fontSize: '10px', color: r.color, opacity: 0.8, fontWeight: 700, letterSpacing: '0.06em' }}>{r.geltung}</span>
                      </div>
                      <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <div>
                          <div style={{ fontFamily: 'var(--mono)', fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '8px' }}>Beispiele</div>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                            {r.examples.map((ex, j) => (
                              <span key={j} style={{ fontSize: '12px', color: 'var(--text-dim)', background: 'var(--surface)', border: '1px solid var(--border)', padding: '3px 8px', borderRadius: '4px' }}>{ex}</span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <div style={{ fontFamily: 'var(--mono)', fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '6px' }}>Pflichten</div>
                          <p style={{ fontSize: '13px', color: 'var(--text-dim)', margin: 0, lineHeight: 1.65 }}>{r.pflicht}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Fristen-Timeline */}
              <section>
                <h2 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--text)', letterSpacing: '-0.02em', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ width: '3px', height: '22px', background: 'var(--cyan)', borderRadius: '2px', flexShrink: 0 }} />
                  {isDE ? 'Fristen & Zeitplan' : 'Deadlines & Timeline'}
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                  {FRISTEN.map((f, i) => (
                    <div key={i} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', position: 'relative', paddingBottom: i < FRISTEN.length - 1 ? '0' : '0' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                        <div style={{
                          width: '14px', height: '14px', borderRadius: '50%', marginTop: '3px',
                          background: f.done ? 'var(--cyan)' : 'var(--surface)',
                          border: `2px solid ${f.done ? 'var(--cyan)' : 'var(--border)'}`,
                          boxShadow: f.done ? '0 0 8px rgba(0,240,255,0.4)' : 'none',
                          flexShrink: 0,
                        }} />
                        {i < FRISTEN.length - 1 && (
                          <div style={{ width: '1px', height: '40px', background: f.done ? 'rgba(0,240,255,0.3)' : 'var(--border)', margin: '4px 0' }} />
                        )}
                      </div>
                      <div style={{ paddingBottom: i < FRISTEN.length - 1 ? '0' : '0', paddingTop: '0' }}>
                        <div style={{ fontFamily: 'var(--mono)', fontSize: '11px', fontWeight: 700, color: f.done ? 'var(--cyan)' : 'var(--text-muted)', letterSpacing: '0.06em', marginBottom: '2px' }}>
                          {f.date} {f.done ? '✓' : ''}
                        </div>
                        <p style={{ fontSize: '14px', color: f.done ? 'var(--text-dim)' : 'var(--text)', margin: 0, lineHeight: 1.5, marginBottom: i < FRISTEN.length - 1 ? '12px' : 0 }}>
                          {f.event}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Bußgelder */}
              <section>
                <h2 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--text)', letterSpacing: '-0.02em', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ width: '3px', height: '22px', background: '#FF2D6F', borderRadius: '2px', flexShrink: 0 }} />
                  {isDE ? 'Bußgelder & Sanktionen' : 'Fines & Sanctions'}
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {BUSSGELDER.map((b, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '16px', background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: '10px', padding: '16px 20px' }}>
                      <span style={{ fontFamily: 'var(--mono)', fontSize: '20px', fontWeight: 800, color: b.color, flexShrink: 0 }}>{b.max}</span>
                      <p style={{ fontSize: '14px', color: 'var(--text-dim)', margin: 0, lineHeight: 1.5 }}>{b.grund}</p>
                    </div>
                  ))}
                  <p style={{ fontSize: '12px', color: 'var(--text-muted)', fontFamily: 'var(--mono)', marginTop: '4px' }}>
                    {isDE ? '* Alternativ: % des weltweiten Jahresumsatzes, je nachdem welcher Betrag höher ist.' : '* Alternatively: % of global annual turnover, whichever is higher.'}
                  </p>
                </div>
              </section>

              {/* FAQ */}
              <section>
                <h2 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--text)', letterSpacing: '-0.02em', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ width: '3px', height: '22px', background: 'var(--cyan)', borderRadius: '2px', flexShrink: 0 }} />
                  {isDE ? 'Häufig gestellte Fragen' : 'Frequently Asked Questions'}
                </h2>
                <FaqAccordion faqs={FAQS} />
              </section>

            </div>

            {/* RIGHT — sidebar */}
            <div className="subpage-sidebar" style={{ display: 'flex', flexDirection: 'column', gap: '20px', position: 'sticky', top: '100px' }}>

              {/* Checkliste */}
              <div style={{ background: 'var(--card-bg)', border: '1px solid rgba(0,240,255,0.2)', borderRadius: '14px', overflow: 'hidden', position: 'relative' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, var(--cyan), transparent)' }} />
                <div style={{ padding: '18px 20px', borderBottom: '1px solid var(--border)' }}>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--cyan)', marginBottom: '4px' }}>Kostenlose Checkliste</div>
                  <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text)' }}>AI Act Compliance Check</div>
                </div>
                <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {CHECKLISTE.map((item, i) => (
                    <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                      <span style={{ flexShrink: 0, width: '18px', height: '18px', border: '2px solid var(--border)', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '1px' }} />
                      <span style={{ fontSize: '12px', color: 'var(--text-dim)', lineHeight: 1.5 }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick facts */}
              <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: '14px', padding: '18px 20px' }}>
                <div style={{ fontFamily: 'var(--mono)', fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '14px' }}>Quick Facts</div>
                {[
                  { label: 'Rechtsakt', value: 'VO 2024/1689' },
                  { label: 'In Kraft', value: 'Aug. 2024' },
                  { label: 'Vollständig ab', value: 'Aug. 2027' },
                  { label: 'Max. Bußgeld', value: '€ 35 Mio.' },
                  { label: 'Gültig in', value: 'EU + EWR' },
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: i < 4 ? '1px solid var(--border)' : 'none' }}>
                    <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{item.label}</span>
                    <span style={{ fontFamily: 'var(--mono)', fontSize: '12px', fontWeight: 700, color: 'var(--cyan)' }}>{item.value}</span>
                  </div>
                ))}
              </div>

              {/* Beratung CTA */}
              <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: '14px', padding: '20px' }}>
                <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text)', marginBottom: '8px' }}>
                  {isDE ? 'AI Act Compliance für Ihr Unternehmen' : 'AI Act Compliance for Your Business'}
                </div>
                <p style={{ fontSize: '13px', color: 'var(--text-dim)', lineHeight: 1.6, marginBottom: '16px' }}>
                  {isDE ? 'Wir prüfen, ob Ihre KI-Systeme konform sind und erstellen einen konkreten Maßnahmenplan.' : 'We check whether your AI systems are compliant and create a concrete action plan.'}
                </p>
                <a href="mailto:info@sicherheit.ai" style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  padding: '11px', borderRadius: '8px',
                  background: 'linear-gradient(135deg, var(--cyan) 0%, #007A9A 100%)',
                  color: '#060B18', fontWeight: 700, fontSize: '13px', textDecoration: 'none',
                }}>
                  {isDE ? 'Jetzt anfragen →' : 'Request now →'}
                </a>
              </div>

              {/* Quellen */}
              <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: '14px', padding: '18px 20px' }}>
                <div style={{ fontFamily: 'var(--mono)', fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '12px' }}>Quellen</div>
                {[
                  { label: 'EU Amtsblatt', url: 'https://eur-lex.europa.eu/legal-content/DE/TXT/?uri=CELEX:32024R1689' },
                  { label: 'EU AI Act — Volltext', url: 'https://artificialintelligenceact.eu/de/' },
                  { label: 'BSI: KI-Sicherheit', url: 'https://bsi.bund.de/KI' },
                  { label: 'ENISA: AI Act Guide', url: 'https://enisa.europa.eu' },
                ].map((s, i) => (
                  <a key={i} href={s.url} target="_blank" rel="noopener noreferrer" className="aiact-src-link" style={{ display: 'block', fontSize: '12px', color: 'var(--cyan)', textDecoration: 'none', padding: '6px 0', borderBottom: i < 3 ? '1px solid var(--border)' : 'none', opacity: 0.85 }}>
                    ↗ {s.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer locale={locale} />
    </>
  );
}
