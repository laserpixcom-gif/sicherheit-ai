import Footer from '@/components/Footer';

const TERMS = [
  { term: 'Advanced Persistent Threat (APT)', def: 'Langfristige, zielgerichtete Cyberangriffe, meist staatlich gesponsert, die über Monate oder Jahre unentdeckt bleiben.' },
  { term: 'Brute-Force-Angriff', def: 'Systematisches Durchprobieren aller möglichen Passwörter oder Schlüssel bis die korrekte Kombination gefunden wird.' },
  { term: 'CVE (Common Vulnerabilities and Exposures)', def: 'Standardisiertes System zur Katalogisierung von Sicherheitslücken in Software und Hardware mit eindeutiger ID.' },
  { term: 'DDoS (Distributed Denial of Service)', def: 'Angriff bei dem viele kompromittierte Systeme gleichzeitig einen Dienst mit Anfragen überlasten und lahmlegen.' },
  { term: 'Endpoint Detection & Response (EDR)', def: 'Sicherheitslösung die Endgeräte kontinuierlich überwacht, Bedrohungen erkennt und automatisch reagiert.' },
  { term: 'Firewall', def: 'Netzwerksicherheitssystem das den Datenverkehr anhand von Regeln kontrolliert und unerwünschte Verbindungen blockiert.' },
  { term: 'Honeypot', def: 'Täuschungssystem das Angreifer anzieht und deren Methoden dokumentiert, ohne echte Systeme zu gefährden.' },
  { term: 'Intrusion Detection System (IDS)', def: 'System zur Erkennung von unbefugten Zugriffen oder Anomalien im Netzwerkverkehr.' },
  { term: 'KI-Angriff (Adversarial AI)', def: 'Angriff der KI-Systeme durch manipulierte Eingabedaten täuscht oder deren Ausgabe gezielt beeinflusst.' },
  { term: 'Lateral Movement', def: 'Technik bei der sich Angreifer nach dem Erstzugang seitwärts durch ein Netzwerk bewegen um weitere Systeme zu kompromittieren.' },
  { term: 'MFA (Multi-Faktor-Authentifizierung)', def: 'Sicherheitsverfahren das mehrere unabhängige Faktoren zur Identitätsbestätigung erfordert.' },
  { term: 'OSINT (Open Source Intelligence)', def: 'Informationsgewinnung aus öffentlich zugänglichen Quellen zur Vorbereitung von Angriffen oder Sicherheitsanalysen.' },
  { term: 'Patch Management', def: 'Systematischer Prozess zur Identifikation, Beschaffung und Installation von Software-Updates zum Schließen von Sicherheitslücken.' },
  { term: 'Phishing', def: 'Täuschungsangriff bei dem Nutzer durch gefälschte E-Mails, Websites oder Nachrichten zur Preisgabe sensibler Daten verleitet werden.' },
  { term: 'Ransomware', def: 'Schadsoftware die Daten verschlüsselt und Lösegeld für die Entschlüsselung verlangt.' },
  { term: 'Social Engineering', def: 'Manipulation von Menschen um vertrauliche Informationen preiszugeben oder sicherheitsrelevante Handlungen auszuführen.' },
  { term: 'SQL-Injection', def: 'Angriff bei dem manipulierter SQL-Code in Eingabefelder eingeschleust wird um Datenbanken zu manipulieren.' },
  { term: 'SIEM (Security Information and Event Management)', def: 'Plattform die Sicherheitsdaten aus verschiedenen Quellen sammelt, korreliert und Alarme generiert.' },
  { term: 'TTP (Tactics, Techniques and Procedures)', def: 'Beschreibung der Vorgehensweise von Angreifern — wichtig für Bedrohungsmodellierung und Abwehrstrategien.' },
  { term: 'Zero-Day', def: 'Sicherheitslücke die noch unbekannt oder ungepatcht ist und von Angreifern aktiv ausgenutzt wird.' },
];

export default function GlossarPage({ params: { locale } }: { params: { locale: string } }) {
  return (
    <>
      <main style={{ minHeight: '100vh', background: 'var(--bg)', paddingTop: '80px' }}>
        <div className="subpage-header" style={{
          background: 'var(--bg2)',
          borderBottom: '1px solid var(--border)',
        }}>
          <div className="r-wrap">
            <div style={{ fontFamily: 'var(--mono)', fontSize: '11px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--cyan)', marginBottom: '12px' }}>
              // Sicherheitsbegriffe A–Z
            </div>
            <h1 style={{ fontSize: 'clamp(40px, 6vw, 80px)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 0.95, color: 'var(--text)', margin: 0 }}>
              Glossar
            </h1>
            <p style={{ fontSize: '16px', color: 'var(--text-dim)', marginTop: '20px', maxWidth: '500px', lineHeight: 1.7 }}>
              {TERMS.length} Begriffe aus KI-Sicherheit und Cybersecurity — verständlich erklärt.
            </p>
          </div>
        </div>

        <div className="subpage-content">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {TERMS.map((item, i) => (
              <div key={i} style={{
                background: 'var(--card-bg)',
                border: '1px solid var(--border)',
                borderRadius: '12px',
                padding: '24px 28px',
                boxShadow: 'var(--card-shadow)',
                transition: 'border-color 0.2s',
              }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '16px', marginBottom: '10px' }}>
                  <span style={{ fontFamily: 'var(--mono)', fontSize: '10px', color: 'var(--cyan)', minWidth: '28px' }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h2 style={{ fontSize: '16px', fontWeight: 700, letterSpacing: '-0.01em', color: 'var(--text)', margin: 0 }}>
                    {item.term}
                  </h2>
                </div>
                <p style={{ fontSize: '14px', color: 'var(--text-dim)', lineHeight: 1.7, margin: '0 0 0 44px' }}>
                  {item.def}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer locale={locale} />
    </>
  );
}
