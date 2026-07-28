import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import Footer from '@/components/Footer';

const BASE_URL = 'https://sicherheit.ai';

// Verantwortlicher = Betreiber laut Impressum
const V = {
  firma: 'Timaxx Holding GmbH',
  strasse: 'Molkereistraße 60',
  plz: '30826',
  ort: 'Garbsen',
  land: 'Deutschland',
  email: 'info@laserpix.de',
};

const STAND = '28. Juli 2026';

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
    ? 'Datenschutzerklärung — sicherheit.ai'
    : 'Privacy Policy — sicherheit.ai';
  const description = isDE
    ? 'Informationen zur Verarbeitung personenbezogener Daten auf sicherheit.ai gemäß DSGVO.'
    : 'Information on the processing of personal data on sicherheit.ai pursuant to the GDPR.';
  return {
    title,
    description,
    robots: { index: false, follow: true },
    alternates: { canonical: `${BASE_URL}/${locale}/datenschutz` },
    openGraph: { title, description, type: 'website' },
  };
}

export default function DatenschutzPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  const isDE = locale === 'de';

  return (
    <>
      <main style={{ minHeight: '100vh', background: 'var(--bg)', paddingTop: '80px' }}>

        {/* Header */}
        <div style={{ background: 'var(--bg2)', borderBottom: '1px solid var(--border)' }}>
          <div className="r-wrap" style={{ paddingTop: '48px', paddingBottom: '40px' }}>
            <nav style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px', fontFamily: 'var(--mono)', fontSize: '11px', color: 'var(--text-muted)' }}>
              <Link href={`/${locale}`} style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Home</Link>
              <span>›</span>
              <span style={{ color: 'var(--cyan)' }}>{isDE ? 'Datenschutz' : 'Privacy'}</span>
            </nav>
            <div style={{ fontFamily: 'var(--mono)', fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--cyan)', marginBottom: '12px' }}>
              {isDE ? 'Rechtliches' : 'Legal'}
            </div>
            <h1 style={{ fontSize: 'clamp(32px, 5vw, 60px)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 0.95, color: 'var(--text)', margin: '0 0 20px' }}>
              {isDE ? 'Datenschutzerklärung' : 'Privacy Policy'}
            </h1>
            <p style={{ fontSize: '16px', color: 'var(--text-dim)', lineHeight: 1.75, maxWidth: '680px', margin: 0 }}>
              {isDE
                ? 'Diese Erklärung informiert Sie über Art, Umfang und Zweck der Verarbeitung personenbezogener Daten auf dieser Website gemäß der Datenschutz-Grundverordnung (DSGVO).'
                : 'This policy informs you about the nature, scope and purpose of the processing of personal data on this website in accordance with the General Data Protection Regulation (GDPR).'}
            </p>
            <p style={{ fontFamily: 'var(--mono)', fontSize: '12px', color: 'var(--text-muted)', marginTop: '16px' }}>
              {isDE ? 'Stand: ' : 'Last updated: '}{STAND}
            </p>
          </div>
        </div>

        <div className="r-wrap" style={{ paddingTop: '48px', paddingBottom: '72px', maxWidth: '760px' }}>

          {/* 1. Verantwortlicher */}
          <Section title={isDE ? '1. Verantwortlicher' : '1. Controller'}>
            <p style={{ margin: 0, lineHeight: 1.9 }}>
              {isDE
                ? 'Verantwortlich für die Datenverarbeitung auf dieser Website ist:'
                : 'The controller responsible for data processing on this website is:'}<br /><br />
              <strong style={{ color: 'var(--text)' }}>{V.firma}</strong><br />
              {V.strasse}<br />
              {V.plz} {V.ort}, {V.land}<br />
              {isDE ? 'E-Mail: ' : 'Email: '}
              <a href={`mailto:${V.email}`} style={{ color: 'var(--cyan)', textDecoration: 'none' }}>{V.email}</a>
            </p>
            <p style={{ marginTop: '14px', lineHeight: 1.9 }}>
              {isDE
                ? 'Weitere Angaben zum Anbieter finden Sie in unserem '
                : 'Further provider details can be found in our '}
              <Link href={`/${locale}/impressum`} style={{ color: 'var(--cyan)', textDecoration: 'none' }}>
                {isDE ? 'Impressum' : 'legal notice'}
              </Link>.
            </p>
          </Section>

          {/* 2. Hosting */}
          <Section title={isDE ? '2. Hosting (Vercel)' : '2. Hosting (Vercel)'}>
            <p style={{ margin: 0, lineHeight: 1.9 }}>
              {isDE
                ? 'Diese Website wird bei der Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, USA, gehostet. Wenn Sie unsere Website besuchen, verarbeitet Vercel als Auftragsverarbeiter technische Zugriffsdaten (siehe Server-Logfiles). Rechtsgrundlage ist unser berechtigtes Interesse an einer sicheren und effizienten Bereitstellung unseres Onlineangebots (Art. 6 Abs. 1 lit. f DSGVO). Mit Vercel besteht ein Auftragsverarbeitungsvertrag (Art. 28 DSGVO). Eine Datenübermittlung in die USA kann stattfinden; diese ist durch die EU-Standardvertragsklauseln bzw. das EU-US Data Privacy Framework abgesichert.'
                : 'This website is hosted by Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, USA. When you visit our website, Vercel processes technical access data as a processor (see server log files). The legal basis is our legitimate interest in the secure and efficient provision of our online offering (Art. 6 (1) (f) GDPR). A data processing agreement (Art. 28 GDPR) is in place with Vercel. Data may be transferred to the USA, safeguarded by the EU Standard Contractual Clauses and/or the EU-US Data Privacy Framework.'}
            </p>
          </Section>

          {/* 3. Server-Logfiles */}
          <Section title={isDE ? '3. Server-Logfiles' : '3. Server log files'}>
            <p style={{ margin: 0, lineHeight: 1.9 }}>
              {isDE
                ? 'Beim Aufruf dieser Website werden automatisch Informationen erfasst, die Ihr Browser übermittelt. Dies sind insbesondere: IP-Adresse, Datum und Uhrzeit der Anfrage, aufgerufene Seite/Datei, verwendeter Browser und Betriebssystem sowie die Referrer-URL. Diese Daten dienen der technischen Bereitstellung, Sicherheit und Stabilität der Website und werden nicht mit anderen Datenquellen zusammengeführt. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO.'
                : 'When you access this website, information transmitted by your browser is automatically collected. This includes in particular: IP address, date and time of the request, page/file accessed, browser and operating system used, and the referrer URL. This data serves the technical provision, security and stability of the website and is not merged with other data sources. The legal basis is Art. 6 (1) (f) GDPR.'}
            </p>
          </Section>

          {/* 4. SSL/TLS */}
          <Section title={isDE ? '4. SSL-/TLS-Verschlüsselung' : '4. SSL/TLS encryption'}>
            <p style={{ margin: 0, lineHeight: 1.9 }}>
              {isDE
                ? 'Diese Website nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte eine SSL-/TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie am „https://" in der Adresszeile Ihres Browsers.'
                : 'For security reasons and to protect the transmission of confidential content, this website uses SSL/TLS encryption. You can recognize an encrypted connection by the "https://" in your browser\'s address bar.'}
            </p>
          </Section>

          {/* 5. Keine Cookies */}
          <Section title={isDE ? '5. Cookies' : '5. Cookies'}>
            <p style={{ margin: 0, lineHeight: 1.9 }}>
              {isDE
                ? 'Diese Website setzt keine Tracking- oder Marketing-Cookies ein. Es werden lediglich technisch notwendige Funktionen genutzt (z. B. zum Speichern Ihrer Theme-Einstellung hell/dunkel im lokalen Speicher Ihres Browsers). Hierfür ist kein Cookie-Einwilligungsbanner erforderlich.'
                : 'This website does not use tracking or marketing cookies. Only technically necessary functions are used (e.g. to store your light/dark theme preference in your browser\'s local storage). No cookie consent banner is required for this.'}
            </p>
          </Section>

          {/* 6. Web Analytics */}
          <Section title={isDE ? '6. Reichweitenmessung (Vercel Web Analytics)' : '6. Analytics (Vercel Web Analytics)'}>
            <p style={{ margin: 0, lineHeight: 1.9 }}>
              {isDE
                ? 'Zur statistischen Auswertung der Nutzung unserer Website setzen wir Vercel Web Analytics ein (Anbieter: Vercel Inc.). Vercel Web Analytics arbeitet cookielos und ohne Speicherung eines geräteübergreifenden Kennzeichens. Es werden aggregierte, anonymisierte Nutzungsdaten erhoben (z. B. aufgerufene Seiten, ungefähre Herkunft, Gerätetyp), die keinen Rückschluss auf einzelne Personen zulassen. Rechtsgrundlage ist unser berechtigtes Interesse an einer datensparsamen Reichweitenmessung (Art. 6 Abs. 1 lit. f DSGVO).'
                : 'For the statistical analysis of the use of our website, we use Vercel Web Analytics (provider: Vercel Inc.). Vercel Web Analytics works without cookies and without storing a cross-device identifier. Aggregated, anonymized usage data is collected (e.g. pages viewed, approximate origin, device type) that does not allow conclusions to be drawn about individual persons. The legal basis is our legitimate interest in data-minimizing reach measurement (Art. 6 (1) (f) GDPR).'}
            </p>
          </Section>

          {/* 7. Formulare, Newsletter & Kontakt */}
          <Section title={isDE ? '7. Kontakt, Formulare & Newsletter' : '7. Contact, forms & newsletter'}>
            <p style={{ margin: 0, lineHeight: 1.9 }}>
              {isDE
                ? 'Wenn Sie uns über ein Formular auf dieser Website oder per E-Mail kontaktieren, verarbeiten wir die von Ihnen angegebenen Daten (z. B. Name, E-Mail-Adresse und Ihre Nachricht) ausschließlich zur Bearbeitung Ihrer Anfrage und für den Fall von Anschlussfragen. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (vorvertragliche bzw. vertragliche Maßnahmen) bzw. Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der Beantwortung von Anfragen).'
                : 'If you contact us via a form on this website or by email, we process the data you provide (e.g. name, email address and your message) solely to handle your request and for any follow-up questions. The legal basis is Art. 6 (1) (b) GDPR (pre-contractual/contractual measures) or Art. 6 (1) (f) GDPR (legitimate interest in responding to inquiries).'}
            </p>
            <p style={{ marginTop: '14px', lineHeight: 1.9 }}>
              {isDE
                ? 'Sofern Sie sich für unseren Newsletter anmelden, verarbeiten wir Ihre E-Mail-Adresse auf Grundlage Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO) zum Versand von Informationen zu KI-Sicherheit und Cybersecurity. Sie können diese Einwilligung jederzeit mit Wirkung für die Zukunft widerrufen, z. B. über den Abmeldelink in jeder E-Mail oder per Nachricht an uns.'
                : 'If you subscribe to our newsletter, we process your email address on the basis of your consent (Art. 6 (1) (a) GDPR) to send information on AI security and cybersecurity. You can withdraw this consent at any time with effect for the future, e.g. via the unsubscribe link in each email or by contacting us.'}
            </p>
            <p style={{ marginTop: '14px', lineHeight: 1.9 }}>
              {isDE
                ? 'Ihre Daten werden gelöscht, sobald sie für die Zweckerreichung nicht mehr erforderlich sind, sofern keine gesetzlichen Aufbewahrungspflichten entgegenstehen.'
                : 'Your data will be deleted as soon as it is no longer required to achieve the purpose, unless statutory retention obligations apply.'}
            </p>
          </Section>

          {/* 8. Betroffenenrechte */}
          <Section title={isDE ? '8. Ihre Rechte' : '8. Your rights'}>
            <p style={{ margin: 0, lineHeight: 1.9 }}>
              {isDE
                ? 'Sie haben im Rahmen der gesetzlichen Vorgaben jederzeit das Recht auf:'
                : 'Within the framework of the statutory provisions, you have the right at any time to:'}
            </p>
            <ul style={{ margin: '12px 0 0', paddingLeft: '20px', lineHeight: 1.9 }}>
              {(isDE
                ? [
                    'Auskunft über Ihre gespeicherten personenbezogenen Daten (Art. 15 DSGVO)',
                    'Berichtigung unrichtiger Daten (Art. 16 DSGVO)',
                    'Löschung Ihrer Daten (Art. 17 DSGVO)',
                    'Einschränkung der Verarbeitung (Art. 18 DSGVO)',
                    'Datenübertragbarkeit (Art. 20 DSGVO)',
                    'Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)',
                    'Widerruf einer erteilten Einwilligung (Art. 7 Abs. 3 DSGVO)',
                  ]
                : [
                    'Access to your stored personal data (Art. 15 GDPR)',
                    'Rectification of incorrect data (Art. 16 GDPR)',
                    'Erasure of your data (Art. 17 GDPR)',
                    'Restriction of processing (Art. 18 GDPR)',
                    'Data portability (Art. 20 GDPR)',
                    'Objection to processing (Art. 21 GDPR)',
                    'Withdrawal of a given consent (Art. 7 (3) GDPR)',
                  ]
              ).map((r, i) => (
                <li key={i} style={{ color: 'var(--text-dim)' }}>{r}</li>
              ))}
            </ul>
            <p style={{ marginTop: '14px', lineHeight: 1.9 }}>
              {isDE
                ? 'Zur Ausübung Ihrer Rechte genügt eine E-Mail an '
                : 'To exercise your rights, an email to '}
              <a href={`mailto:${V.email}`} style={{ color: 'var(--cyan)', textDecoration: 'none' }}>{V.email}</a>
              {isDE ? '.' : ' is sufficient.'}
            </p>
          </Section>

          {/* 9. Beschwerderecht */}
          <Section title={isDE ? '9. Beschwerderecht bei der Aufsichtsbehörde' : '9. Right to lodge a complaint'}>
            <p style={{ margin: 0, lineHeight: 1.9 }}>
              {isDE
                ? 'Ihnen steht ein Beschwerderecht bei einer Datenschutz-Aufsichtsbehörde zu. Zuständig ist die Landesbeauftragte für den Datenschutz Niedersachsen, Prinzenstraße 5, 30159 Hannover.'
                : 'You have the right to lodge a complaint with a data protection supervisory authority. The competent authority is the State Commissioner for Data Protection of Lower Saxony (Landesbeauftragte für den Datenschutz Niedersachsen), Prinzenstraße 5, 30159 Hannover, Germany.'}
            </p>
          </Section>

          {/* 10. Änderungen */}
          <Section title={isDE ? '10. Änderungen dieser Datenschutzerklärung' : '10. Changes to this privacy policy'}>
            <p style={{ margin: 0, lineHeight: 1.9 }}>
              {isDE
                ? 'Wir passen diese Datenschutzerklärung an, sobald Änderungen der von uns durchgeführten Datenverarbeitung dies erforderlich machen. Es gilt jeweils die auf dieser Seite veröffentlichte aktuelle Fassung.'
                : 'We adapt this privacy policy as soon as changes to the data processing we carry out make this necessary. The current version published on this page applies in each case.'}
            </p>
          </Section>

        </div>
      </main>
      <Footer locale={locale} />
    </>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: '36px' }}>
      <h2 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text)', marginBottom: '10px', letterSpacing: '-0.01em', fontFamily: 'var(--mono)', textTransform: 'uppercase' }}>
        {title}
      </h2>
      <div style={{ fontSize: '15px', color: 'var(--text-dim)' }}>
        {children}
      </div>
    </section>
  );
}
