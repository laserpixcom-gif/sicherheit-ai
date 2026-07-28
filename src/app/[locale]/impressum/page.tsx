import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import Footer from '@/components/Footer';

const BASE_URL = 'https://sicherheit.ai';

// ─────────────────────────────────────────────────────────────────────────────
// ⚠️  VOR DEM DEPLOY AUSFÜLLEN:
// Alle Werte, die mit "[" beginnen, sind Platzhalter und werden auf der Seite
// rot markiert dargestellt. Bitte durch echte Angaben ersetzen.
// Bestätigt: Timaxx Holding GmbH · Molkereistraße 60 · Garbsen · AG Hannover HRB 221145
// ─────────────────────────────────────────────────────────────────────────────
const IMPRESSUM = {
  firma: 'Timaxx Holding GmbH',
  strasse: 'Molkereistraße 60',
  plz: '30826',
  ort: 'Garbsen',
  land: 'Deutschland',
  geschaeftsfuehrer: 'Ronny Titze',
  email: 'info@laserpix.de',
  registergericht: 'Amtsgericht Hannover',
  hrb: 'HRB 221145',
  // telefon / ustId bewusst weggelassen (optional bzw. "soweit vorhanden").
  // Zum Nachtragen: hier wieder ergänzen und die zugehörigen Sections unten einkommentieren.
  // Redaktionell Verantwortlicher i.S.d. § 18 Abs. 2 MStV (Name + ladungsfähige Anschrift):
  redakteurName: 'Mahdi Mahmoud',
};

const isPH = (v: string) => v.trim().startsWith('[');

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
    ? 'Impressum — sicherheit.ai'
    : 'Legal Notice (Impressum) — sicherheit.ai';
  const description = isDE
    ? 'Impressum und Anbieterkennzeichnung gemäß § 5 DDG für sicherheit.ai.'
    : 'Legal notice and provider identification pursuant to § 5 DDG for sicherheit.ai.';
  return {
    title,
    description,
    robots: { index: false, follow: true }, // Rechtsseite: kein Crawl-Budget verschwenden
    alternates: {
      canonical: `${BASE_URL}/${locale}/impressum`,
    },
    openGraph: { title, description, type: 'website' },
  };
}

export default function ImpressumPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  const isDE = locale === 'de';

  // Stil für ausgefüllte vs. offene (Platzhalter-)Werte
  const val = (v: string) =>
    isPH(v)
      ? {
          color: '#FF9632',
          background: 'rgba(255,150,50,0.12)',
          border: '1px solid rgba(255,150,50,0.4)',
          borderRadius: '4px',
          padding: '1px 6px',
          fontFamily: 'var(--mono)',
          fontSize: '13px',
        }
      : undefined;

  const anyPlaceholder = [
    IMPRESSUM.plz,
    IMPRESSUM.geschaeftsfuehrer,
  ].some(isPH);

  return (
    <>
      <main style={{ minHeight: '100vh', background: 'var(--bg)', paddingTop: '80px' }}>

        {/* Header */}
        <div style={{ background: 'var(--bg2)', borderBottom: '1px solid var(--border)' }}>
          <div className="r-wrap" style={{ paddingTop: '48px', paddingBottom: '40px' }}>
            <nav style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px', fontFamily: 'var(--mono)', fontSize: '11px', color: 'var(--text-muted)' }}>
              <Link href={`/${locale}`} style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Home</Link>
              <span>›</span>
              <span style={{ color: 'var(--cyan)' }}>{isDE ? 'Impressum' : 'Legal Notice'}</span>
            </nav>
            <div style={{ fontFamily: 'var(--mono)', fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--cyan)', marginBottom: '12px' }}>
              {isDE ? 'Rechtliches' : 'Legal'}
            </div>
            <h1 style={{ fontSize: 'clamp(32px, 5vw, 60px)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 0.95, color: 'var(--text)', margin: '0 0 20px' }}>
              {isDE ? 'Impressum' : 'Impressum (Legal Notice)'}
            </h1>
            <p style={{ fontSize: '16px', color: 'var(--text-dim)', lineHeight: 1.75, maxWidth: '680px', margin: 0 }}>
              {isDE
                ? 'Angaben gemäß § 5 Digitale-Dienste-Gesetz (DDG).'
                : 'Information pursuant to § 5 of the German Digital Services Act (DDG).'}
            </p>
          </div>
        </div>

        <div className="r-wrap" style={{ paddingTop: '48px', paddingBottom: '72px', maxWidth: '760px' }}>

          {/* Dev-Warnung, wenn noch Platzhalter offen sind */}
          {anyPlaceholder && (
            <div style={{ background: 'rgba(255,150,50,0.1)', border: '1px solid rgba(255,150,50,0.4)', borderRadius: '10px', padding: '14px 18px', marginBottom: '32px', fontSize: '13px', color: '#FF9632', fontFamily: 'var(--mono)', lineHeight: 1.6 }}>
              ⚠️ Dieses Impressum enthält noch Platzhalter (orange markiert). Vor dem Veröffentlichen in <strong>src/app/[locale]/impressum/page.tsx</strong> (Objekt <strong>IMPRESSUM</strong>) ausfüllen.
            </div>
          )}

          {/* Anbieter */}
          <Section title={isDE ? 'Anbieter' : 'Provider'}>
            <p style={{ margin: 0, lineHeight: 1.9 }}>
              <strong style={{ color: 'var(--text)' }}>{IMPRESSUM.firma}</strong><br />
              {IMPRESSUM.strasse}<br />
              <span style={val(IMPRESSUM.plz)}>{IMPRESSUM.plz}</span> {IMPRESSUM.ort}<br />
              {IMPRESSUM.land}
            </p>
          </Section>

          {/* Vertretung */}
          <Section title={isDE ? 'Vertreten durch' : 'Represented by'}>
            <p style={{ margin: 0, lineHeight: 1.9 }}>
              {isDE ? 'Geschäftsführung: ' : 'Managing Director: '}
              <span style={val(IMPRESSUM.geschaeftsfuehrer)}>{IMPRESSUM.geschaeftsfuehrer}</span>
            </p>
          </Section>

          {/* Kontakt */}
          <Section title={isDE ? 'Kontakt' : 'Contact'}>
            <p style={{ margin: 0, lineHeight: 1.9 }}>
              {isDE ? 'E-Mail: ' : 'Email: '}
              <a href={`mailto:${IMPRESSUM.email}`} style={{ color: 'var(--cyan)', textDecoration: 'none' }}>{IMPRESSUM.email}</a>
            </p>
          </Section>

          {/* Registereintrag */}
          <Section title={isDE ? 'Registereintrag' : 'Register entry'}>
            <p style={{ margin: 0, lineHeight: 1.9 }}>
              {isDE ? 'Registergericht: ' : 'Register court: '}{IMPRESSUM.registergericht}<br />
              {isDE ? 'Registernummer: ' : 'Register number: '}{IMPRESSUM.hrb}
            </p>
          </Section>

          {/* USt-IdNr – einkommentieren, sobald IMPRESSUM.ustId gesetzt ist:
          <Section title={isDE ? 'Umsatzsteuer-Identifikationsnummer' : 'VAT ID'}>
            <p style={{ margin: 0, lineHeight: 1.9 }}>
              {isDE
                ? 'Umsatzsteuer-Identifikationsnummer gemäß § 27a Umsatzsteuergesetz: '
                : 'VAT identification number pursuant to § 27a German VAT Act: '}
              {IMPRESSUM.ustId}
            </p>
          </Section>
          */}

          {/* Redaktionell Verantwortlicher */}
          <Section title={isDE ? 'Redaktionell verantwortlich' : 'Responsible for content'}>
            <p style={{ margin: 0, lineHeight: 1.9 }}>
              {isDE
                ? 'Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV:'
                : 'Responsible for content pursuant to § 18 (2) MStV:'}<br />
              <span style={val(IMPRESSUM.redakteurName)}>{IMPRESSUM.redakteurName}</span><br />
              {IMPRESSUM.strasse}, <span style={val(IMPRESSUM.plz)}>{IMPRESSUM.plz}</span> {IMPRESSUM.ort}
            </p>
          </Section>

          {/* EU-Streitschlichtung */}
          <Section title={isDE ? 'EU-Streitschlichtung' : 'EU dispute resolution'}>
            <p style={{ margin: 0, lineHeight: 1.9 }}>
              {isDE
                ? 'Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: '
                : 'The European Commission provides a platform for online dispute resolution (ODR): '}
              <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--cyan)', textDecoration: 'none' }}>
                https://ec.europa.eu/consumers/odr/
              </a><br />
              {isDE
                ? 'Unsere E-Mail-Adresse finden Sie oben im Impressum. Wir sind nicht bereit und nicht verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.'
                : 'Our email address can be found above. We are neither willing nor obliged to participate in dispute resolution proceedings before a consumer arbitration board.'}
            </p>
          </Section>

          {/* Haftung für Inhalte */}
          <Section title={isDE ? 'Haftung für Inhalte' : 'Liability for content'}>
            <p style={{ margin: 0, lineHeight: 1.9 }}>
              {isDE
                ? 'Als Diensteanbieter sind wir für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Wir sind jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.'
                : 'As a service provider, we are responsible for our own content on these pages in accordance with general law. However, we are not obliged to monitor transmitted or stored third-party information or to investigate circumstances that indicate illegal activity. Obligations to remove or block the use of information under general law remain unaffected. Liability in this respect is only possible from the point in time at which knowledge of a specific infringement of the law is obtained. Upon becoming aware of such infringements, we will remove this content immediately.'}
            </p>
          </Section>

          {/* Haftung für Links */}
          <Section title={isDE ? 'Haftung für Links' : 'Liability for links'}>
            <p style={{ margin: 0, lineHeight: 1.9 }}>
              {isDE
                ? 'Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.'
                : 'Our offer contains links to external third-party websites over whose content we have no influence. Therefore, we cannot accept any liability for this third-party content. The respective provider or operator of the linked pages is always responsible for their content. Upon becoming aware of legal violations, we will remove such links immediately.'}
            </p>
          </Section>

          {/* Urheberrecht */}
          <Section title={isDE ? 'Urheberrecht' : 'Copyright'}>
            <p style={{ margin: 0, lineHeight: 1.9 }}>
              {isDE
                ? 'Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.'
                : 'The content and works created by the site operators on these pages are subject to German copyright law. Duplication, processing, distribution and any form of commercialization beyond the scope of copyright law require the written consent of the respective author or creator. Downloads and copies of this site are only permitted for private, non-commercial use.'}
            </p>
          </Section>

          {/* Datenschutz-Hinweis (Link aktivieren, sobald /datenschutz existiert) */}
          <Section title={isDE ? 'Datenschutz' : 'Data protection'}>
            <p style={{ margin: 0, lineHeight: 1.9 }}>
              {isDE
                ? 'Informationen zur Verarbeitung personenbezogener Daten finden Sie in unserer separaten Datenschutzerklärung.'
                : 'Information on the processing of personal data can be found in our separate privacy policy.'}
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
