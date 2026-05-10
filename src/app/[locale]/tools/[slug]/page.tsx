import type { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import Footer from '@/components/Footer';
import { PasswordChecker, BreachChecker, CveDashboard, HeaderChecker, IncidentResponse } from '@/components/tools/ToolComponents';
import LeadCapture from '@/components/LeadCapture';

const BASE_URL = 'https://sicherheit.ai';

interface ToolInfo {
  id: string;
  icon: string;
  title: string;
  subtitle: string;
  tag: string;
  tagColor: string;
  tagBg: string;
  description: string;
  whatItDoes: string[];
  howToUse: string[];
  howToInterpret: string[];
  component: ReactNode;
}

const TOOL_DATA: ToolInfo[] = [
  {
    id: 'password',
    icon: '🔐',
    title: 'Passwort-Analyzer',
    subtitle: 'Entropie-Berechnung & Crack-Zeit-Simulation',
    tag: 'Lokal · Sicher',
    tagColor: '#78C864',
    tagBg: 'rgba(120,200,100,0.1)',
    description: 'Analysiert die kryptografische Stärke eines Passworts direkt im Browser, ohne Netzwerkzugriff. Kein Byte verlässt dein Gerät.',
    whatItDoes: [
      'Berechnet die Entropie in Bit nach NIST SP 800-63B. Je mehr Bits, desto sicherer.',
      'Simuliert die Crackzeit bei einem modernen GPU-Cluster mit 10¹² Versuchen pro Sekunde.',
      'Prüft 6 Sicherheitskriterien: Länge, Groß-/Kleinbuchstaben, Ziffern, Sonderzeichen, Wörterbuch-Angriff.',
      'Zeigt einen visuellen Stärke-Score von "Extrem schwach" bis "Maximale Sicherheit".',
    ],
    howToUse: [
      'Gib dein Passwort in das Eingabefeld ein. Die Analyse erfolgt sofort und live.',
      'Nutze den Augen-Button, um zwischen sichtbarem und verborgenem Text zu wechseln.',
      'Alle Berechnungen laufen lokal im Browser. Keine Daten werden gesendet.',
    ],
    howToInterpret: [
      'Entropie unter 40 Bit: Unsicher. Sofort ändern, crackt in Sekunden bis Minuten.',
      'Entropie 60–80 Bit: Akzeptabel für normale Konten, nicht für kritische Zugänge.',
      'Entropie über 100 Bit: Sicher gegen aktuelle Hardware-Angriffe. Crackzeit > 1 Million Jahre.',
      'Crackzeit "sofort": Das Passwort steht wahrscheinlich in einer Wörterliste. Sofort ersetzen.',
      'Alle 6 Checks grün: Passwort erfüllt NIST-Mindestanforderungen.',
    ],
    component: <PasswordChecker />,
  },
  {
    id: 'breach',
    icon: '🔍',
    title: 'Datenpanne-Checker',
    subtitle: 'Have I Been Pwned: 13+ Milliarden kompromittierte Einträge',
    tag: 'Live · HIBP',
    tagColor: '#00F0FF',
    tagBg: 'rgba(0,240,255,0.1)',
    description: 'Prüft, ob deine E-Mail-Adresse oder dein Passwort in bekannten Datenpannen aufgetaucht ist. Genutzt wird die weltweit größte Datenbank kompromittierter Zugangsdaten.',
    whatItDoes: [
      'Prüft E-Mail-Adressen gegen die Have I Been Pwned Datenbank mit Milliarden Einträgen aus echten Datenlecks.',
      'Prüft Passwörter per k-Anonymity-Methode: Nur die ersten 5 Zeichen des SHA1-Hashwerts werden gesendet. Das Passwort selbst verlässt nie dein Gerät.',
      'Zeigt an, in wie vielen und welchen Datenpannen ein Eintrag gefunden wurde.',
    ],
    howToUse: [
      'Wähle den Modus "E-Mail prüfen" oder "Passwort prüfen" mit den Buttons oben.',
      'E-Mail: Gib deine Adresse ein und klicke "E-Mail prüfen". Erfordert API-Key für den HIBP-Dienst.',
      'Passwort: Gib dein Passwort ein. Es wird lokal gehasht, nur der Hashpräfix (5 Zeichen) wird gesendet.',
    ],
    howToInterpret: [
      '"In Datenpannen gefunden": Dieses Passwort oder diese E-Mail ist kompromittiert. Sofort ändern!',
      '"Nicht gefunden": Kein Treffer in der Datenbank. Keine 100%-Garantie, aber ein gutes Zeichen.',
      'Hohe Anzahl an Datenpannen: Das Passwort ist sehr weit verbreitet und gefährlich. Sofort ersetzen.',
      'Auch wenn deine E-Mail "sauber" ist: Prüfe regelmäßig, da neue Datenpannen täglich auftauchen.',
    ],
    component: <BreachChecker />,
  },
  {
    id: 'cve',
    icon: '📡',
    title: 'CVE Live-Dashboard',
    subtitle: 'Kritische Schwachstellen direkt aus NIST NVD',
    tag: 'Live · NVD API',
    tagColor: '#FF2D6F',
    tagBg: 'rgba(255,45,111,0.1)',
    description: 'Zeigt aktuelle kritische Sicherheitslücken (CVEs mit CVSS ≥ 9) aus der offiziellen NIST National Vulnerability Database, aktualisiert alle 30 Minuten.',
    whatItDoes: [
      'Ruft automatisch die neuesten kritischen CVEs (CVSS-Score ≥ 9) der letzten 30 Tage ab.',
      'Zeigt CVE-ID, CVSS-Score, kurze Beschreibung und Veröffentlichungsdatum.',
      'Verlinkt direkt zu den offiziellen NVD-Detailseiten für vollständige technische Informationen.',
      'Farbkodierung nach Schweregrad: Rot (kritisch ≥9), Orange (hoch ≥7), Gelb (mittel ≥4).',
    ],
    howToUse: [
      'Das Dashboard lädt automatisch beim Öffnen der Seite.',
      'Klicke auf eine CVE-Zeile, um die vollständige Beschreibung und Links aufzuklappen.',
      'Nutze den "↻ Aktualisieren"-Button, um die neuesten Daten zu laden.',
    ],
    howToInterpret: [
      'CVSS 9.0–10.0 (Kritisch, rot): Sofortiger Handlungsbedarf. Patch einspielen oder System isolieren.',
      'CVSS 7.0–8.9 (Hoch, orange): Hohes Risiko. Zeitnah patchen, spätestens innerhalb einer Woche.',
      'CVSS 4.0–6.9 (Mittel, gelb): Mittleres Risiko. Im nächsten Wartungsfenster behandeln.',
      'Prüfe bei jeder CVE, ob deine eingesetzten Systeme/Software betroffen sind.',
      '"Bekannte CVEs" statt "Live NVD API": Fallback-Daten bei API-Ausfall, trotzdem aktuell relevant.',
    ],
    component: <CveDashboard />,
  },
  {
    id: 'headers',
    icon: '🛡️',
    title: 'Security Headers Prüfer',
    subtitle: 'HTTP-Sicherheits-Header Analyse nach OWASP',
    tag: 'Live-Tool',
    tagColor: '#9664FF',
    tagBg: 'rgba(150,100,255,0.1)',
    description: 'Analysiert die HTTP-Sicherheits-Header einer beliebigen Website und bewertet die Konfiguration nach dem OWASP Secure Headers Project Standard.',
    whatItDoes: [
      'Prüft 6 kritische HTTP-Header: HSTS, CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy.',
      'Berechnet einen Security-Score von 0–100 basierend auf vorhandenen Headern und deren Gewichtung.',
      'Zeigt für jeden Header, ob er vorhanden ist, und gibt den tatsächlichen Wert aus.',
      'Klassifiziert Header-Priorität: Critical (HSTS, CSP), High (X-Frame), Medium (Rest).',
    ],
    howToUse: [
      'Gib eine Domain ein (z.B. "example.de"). Das "https://" wird automatisch ergänzt.',
      'Drücke Enter oder klicke "Prüfen".',
      'Warte kurz, während der Server die Header der Zieldomain abruft.',
    ],
    howToInterpret: [
      'Score 80–100: Gut konfiguriert. Alle kritischen Header sind gesetzt.',
      'Score 50–79: Verbesserungsbedarf. Mindestens ein kritischer Header fehlt.',
      'Score 0–49: Schlecht konfiguriert. Erhebliche Sicherheitslücken im HTTP-Layer.',
      '✗ bei HSTS: Seite erzwingt kein HTTPS. Man-in-the-Middle-Angriffe sind möglich.',
      '✗ bei CSP: Kein Schutz gegen Cross-Site-Scripting (XSS), den häufigsten Web-Angriff.',
      '✗ bei X-Frame-Options: Clickjacking-Angriffe möglich. Nutzer können manipuliert werden.',
    ],
    component: <HeaderChecker />,
  },
  {
    id: 'incident',
    icon: '⚡',
    title: 'Incident Response Checkliste',
    subtitle: 'Interaktive IR-Checkliste nach BSI & NIST SP 800-61',
    tag: 'Interaktiv',
    tagColor: '#FF9632',
    tagBg: 'rgba(255,150,50,0.1)',
    description: 'Strukturierte, interaktive Checkliste für die ersten kritischen Stunden nach einem Sicherheitsvorfall. Basierend auf BSI IT-Grundschutz, NIST SP 800-61 und dem SANS Incident Handler\'s Handbook.',
    whatItDoes: [
      '5 Phasen decken den kompletten Incident-Response-Prozess ab: Erkennung, Eindämmung, Forensik, Meldepflichten, Wiederherstellung.',
      '20 konkrete Maßnahmen mit rechtlichen Referenzen (BSI, DSGVO, MITRE ATT&CK).',
      'Interaktive Checkboxen mit Fortschrittsanzeige. Du siehst jederzeit, wo du stehst.',
      'Farbkodierung nach Dringlichkeit: Rot (sofort), Orange (schnell), Gelb (bald), Blau (legal), Grün (Abschluss).',
    ],
    howToUse: [
      'Öffne diese Seite sofort nach Erkennung eines Sicherheitsvorfalls.',
      'Arbeite die Phasen der Reihe nach ab, von oben nach unten.',
      'Klicke jeden Schritt an, sobald er abgeschlossen ist. Der Fortschrittsbalken aktualisiert sich automatisch.',
      'Die Checkliste läuft im Browser ohne Account oder Login und funktioniert auch offline nach dem Laden.',
    ],
    howToInterpret: [
      'Phase 01 (Rot): Erst bestätigen, dann handeln. Fehlalarme kosten Ressourcen.',
      'Phase 02 (Orange): Systeme isolieren, NICHT ausschalten! Ausschalten zerstört RAM-Forensik.',
      'Phase 03 (Gelb): Forensik immer vor Wiederherstellung durchführen, sonst verlierst du Beweise.',
      'Phase 04 (Blau): Die 72-Stunden-Frist der DSGVO ist verbindlich. Datenschutzbehörde benachrichtigen!',
      'Phase 05 (Grün): Niemals aus kompromittierten Backups wiederherstellen. Integrität zuerst prüfen!',
    ],
    component: <IncidentResponse />,
  },
];

export function generateStaticParams() {
  const slugs = TOOL_DATA.map(t => t.id);
  return ['de', 'en'].flatMap(locale =>
    slugs.map(slug => ({ locale, slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string; slug: string };
}): Promise<Metadata> {
  const tool = TOOL_DATA.find(t => t.id === params.slug);
  if (!tool) return {};
  const title = `${tool.title} — Kostenloses Security Tool | sicherheit.ai`;
  const description = tool.description;
  return {
    title,
    description,
    keywords: [tool.title, 'Cybersecurity Tool', 'IT-Sicherheit', 'kostenlos', 'Online Tool', 'sicherheit.ai'].join(', '),
    alternates: {
      canonical: `${BASE_URL}/${params.locale}/tools/${tool.id}`,
      languages: {
        de: `${BASE_URL}/de/tools/${tool.id}`,
        en: `${BASE_URL}/en/tools/${tool.id}`,
      },
    },
    openGraph: {
      title,
      description,
      type: 'website',
      url: `${BASE_URL}/${params.locale}/tools/${tool.id}`,
    },
  };
}

export default function ToolPage({
  params,
}: {
  params: { locale: string; slug: string };
}) {
  setRequestLocale(params.locale);
  const tool = TOOL_DATA.find(t => t.id === params.slug);
  if (!tool) notFound();

  return (
    <>
      <style>{`
        .tool-info-item { transition: border-color 0.2s; }
        .tool-info-item:hover { border-color: var(--border-bright) !important; }
        .tool-back:hover { border-color: var(--cyan) !important; color: var(--cyan) !important; }
      `}</style>
      <main style={{ minHeight: '100vh', background: 'var(--bg)', paddingTop: '80px' }}>

        {/* ── Header ── */}
        <div style={{ background: 'var(--bg2)', borderBottom: '1px solid var(--border)' }}>
          <div className="r-wrap" style={{ padding: '48px 48px 40px' }}>

            {/* Breadcrumb */}
            <nav style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px', fontFamily: 'var(--mono)', fontSize: '11px', color: 'var(--text-muted)' }}>
              <Link href={`/${params.locale}`} style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Home</Link>
              <span>›</span>
              <Link href={`/${params.locale}/tools`} style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Tools</Link>
              <span>›</span>
              <span style={{ color: 'var(--cyan)' }}>{tool.title}</span>
            </nav>

            {/* Icon + Tag */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '20px' }}>
              <div style={{ width: '56px', height: '56px', background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '26px', flexShrink: 0 }}>
                {tool.icon}
              </div>
              <div>
                <span style={{
                  display: 'inline-flex', alignItems: 'center', padding: '4px 10px',
                  borderRadius: '5px', fontSize: '11px', fontWeight: 700,
                  textTransform: 'uppercase', letterSpacing: '0.06em',
                  background: tool.tagBg, color: tool.tagColor,
                  fontFamily: 'var(--mono)',
                }}>
                  {tool.tag}
                </span>
              </div>
            </div>

            {/* Title */}
            <h1 style={{
              fontSize: 'clamp(28px, 4.5vw, 56px)', fontWeight: 800,
              letterSpacing: '-0.04em', lineHeight: 0.95,
              color: 'var(--text)', margin: '0 0 10px',
            }}>
              {tool.title}
            </h1>
            <div style={{ fontFamily: 'var(--mono)', fontSize: '13px', color: 'var(--text-muted)', marginBottom: '20px' }}>
              {tool.subtitle}
            </div>

            {/* Description */}
            <p style={{
              fontSize: 'clamp(14px, 1.6vw, 17px)', color: 'var(--text-dim)',
              lineHeight: 1.75, maxWidth: '640px',
              borderLeft: '3px solid var(--cyan)',
              paddingLeft: '20px', margin: 0,
            }}>
              {tool.description}
            </p>
          </div>
        </div>

        {/* ── Content ── */}
        <div className="r-wrap" style={{ padding: '56px 48px' }}>
          <div className="subpage-sidebar-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '56px', alignItems: 'start' }}>

            {/* LEFT: tool + info */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>

              {/* The tool itself */}
              <div style={{
                background: 'var(--card-bg)',
                border: '1px solid var(--border)',
                borderRadius: '18px',
                padding: '32px',
                position: 'relative',
                overflow: 'hidden',
              }}>
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
                  background: `linear-gradient(90deg, ${tool.tagColor}, transparent)`,
                }} />
                <div style={{ marginBottom: '24px' }}>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase', color: tool.tagColor, marginBottom: '4px' }}>
                    // Tool
                  </div>
                  <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text)' }}>{tool.title}</div>
                </div>
                {tool.component}
              </div>

              {/* Lead capture */}
              <LeadCapture
                tool={tool.id}
                accentColor={tool.tagColor}
                headline={tool.id === 'incident' ? 'Incident Response Playbook als PDF' : 'Ergebnis als PDF-Report erhalten'}
                subline={tool.id === 'incident'
                  ? 'Erhalte das vollständige IR-Playbook nach BSI und NIST SP 800-61 mit allen Phasen, Kontaktlisten und Vorlagen.'
                  : 'Wir schicken dir eine kompakte Auswertung mit konkreten Handlungsempfehlungen. Kostenlos.'}
              />

              {/* How to use */}
              <div>
                <h2 style={{
                  fontSize: '20px', fontWeight: 700, color: 'var(--text)',
                  letterSpacing: '-0.02em', marginBottom: '16px',
                  display: 'flex', alignItems: 'center', gap: '10px',
                }}>
                  <span style={{ width: '3px', height: '20px', background: 'var(--cyan)', borderRadius: '2px', display: 'block', flexShrink: 0 }} />
                  So verwendest du das Tool
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {tool.howToUse.map((step, i) => (
                    <div key={i} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start', padding: '14px 16px', background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: '10px' }}>
                      <span style={{
                        flexShrink: 0, width: '24px', height: '24px',
                        borderRadius: '7px', background: 'var(--cyan-dim)',
                        border: '1px solid rgba(0,240,255,0.2)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontFamily: 'var(--mono)', fontSize: '11px', fontWeight: 800,
                        color: 'var(--cyan)',
                      }}>
                        {i + 1}
                      </span>
                      <p style={{ fontSize: '14px', color: 'var(--text-dim)', lineHeight: 1.7, margin: 0 }}>{step}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* How to interpret */}
              <div style={{
                background: 'var(--card-bg)',
                border: '1px solid var(--border)',
                borderRadius: '14px',
                padding: '28px',
              }}>
                <h2 style={{
                  fontSize: '18px', fontWeight: 700, color: 'var(--text)',
                  letterSpacing: '-0.02em', marginBottom: '18px',
                  display: 'flex', alignItems: 'center', gap: '10px',
                  fontFamily: 'var(--mono)',
                }}>
                  <span style={{ color: 'var(--cyan)' }}>{'>'}</span>
                  Ergebnisse richtig interpretieren
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {tool.howToInterpret.map((item, i) => (
                    <div key={i} style={{
                      display: 'flex', gap: '12px', alignItems: 'flex-start',
                      padding: '10px 14px', background: 'var(--surface)',
                      border: '1px solid var(--border)', borderRadius: '8px',
                    }}>
                      <span style={{ color: 'var(--cyan)', fontFamily: 'var(--mono)', fontSize: '12px', flexShrink: 0, marginTop: '2px' }}>›</span>
                      <p style={{ fontSize: '13px', color: 'var(--text-dim)', lineHeight: 1.65, margin: 0 }}>{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT: sidebar */}
            <div className="subpage-sidebar" style={{ display: 'flex', flexDirection: 'column', gap: '20px', position: 'sticky', top: '100px' }}>

              {/* What it does */}
              <div style={{
                background: 'var(--card-bg)', border: '1px solid var(--border)',
                borderRadius: '14px', padding: '22px',
              }}>
                <div style={{ fontFamily: 'var(--mono)', fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '16px' }}>
                  Was kann dieses Tool?
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {tool.whatItDoes.map((item, i) => (
                    <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                      <span style={{ color: tool.tagColor, fontSize: '12px', flexShrink: 0, marginTop: '2px', fontWeight: 700 }}>✓</span>
                      <span style={{ fontSize: '12px', color: 'var(--text-dim)', lineHeight: 1.6 }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Other tools */}
              <div style={{
                background: 'var(--card-bg)', border: '1px solid var(--border)',
                borderRadius: '14px', padding: '22px',
              }}>
                <div style={{ fontFamily: 'var(--mono)', fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '14px' }}>
                  Weitere Tools
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {TOOL_DATA.filter(t => t.id !== tool.id).map(t => (
                    <Link key={t.id} href={`/${params.locale}/tools/${t.id}`}
                      className="tool-info-item"
                      style={{
                        display: 'flex', alignItems: 'center', gap: '10px',
                        padding: '10px 12px', borderRadius: '8px',
                        background: 'var(--surface)', border: '1px solid var(--border)',
                        textDecoration: 'none',
                      }}
                    >
                      <span style={{ fontSize: '16px' }}>{t.icon}</span>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text)' }}>{t.title}</div>
                        <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontFamily: 'var(--mono)' }}>{t.tag}</div>
                      </div>
                      <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>→</span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Beratung CTA */}
              <div style={{
                background: 'linear-gradient(135deg, rgba(0,240,255,0.06) 0%, rgba(255,45,111,0.04) 100%)',
                border: '1px solid var(--border)',
                borderRadius: '14px',
                padding: '22px',
              }}>
                <div style={{ fontFamily: 'var(--mono)', fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--cyan)', marginBottom: '10px' }}>
                  Professionelle Hilfe
                </div>
                <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text)', marginBottom: '8px', lineHeight: 1.3 }}>
                  Unsicher, was dein Ergebnis bedeutet?
                </div>
                <p style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: 1.6, margin: '0 0 14px' }}>
                  In einem 30-minütigen Erstgespräch analysieren wir deine Situation und geben konkrete Handlungsempfehlungen.
                </p>
                <a href={`/${params.locale}/ueber-uns#beratung`}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    padding: '11px 16px',
                    background: 'linear-gradient(135deg, var(--cyan) 0%, #007A9A 100%)',
                    color: '#060B18', fontWeight: 700, fontSize: '13px',
                    borderRadius: '9px', textDecoration: 'none',
                    fontFamily: 'var(--font)',
                  }}>
                  Beratung buchen →
                </a>
              </div>

              {/* Back to library */}
              <Link href={`/${params.locale}/tools`}
                className="tool-back"
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                  padding: '12px', borderRadius: '10px',
                  border: '1px solid var(--border)', background: 'var(--card-bg)',
                  color: 'var(--text-muted)', fontSize: '13px', fontFamily: 'var(--mono)',
                  textDecoration: 'none', transition: 'all 0.2s',
                }}
              >
                ← Zur Tool-Bibliothek
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer locale={params.locale} />
    </>
  );
}
