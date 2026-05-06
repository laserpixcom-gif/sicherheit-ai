export type GlossaryCategory =
  | 'Angriff'
  | 'Abwehr'
  | 'Regulierung'
  | 'KI'
  | 'Malware'
  | 'Authentifizierung'
  | 'Netzwerk'
  | 'Protokoll';

export const CATEGORY_COLORS: Record<GlossaryCategory, { color: string; bg: string }> = {
  Angriff:          { color: '#FF2D6F', bg: 'rgba(255,45,111,0.10)' },
  Abwehr:           { color: '#00F0FF', bg: 'rgba(0,240,255,0.10)' },
  Regulierung:      { color: '#7890FF', bg: 'rgba(120,144,255,0.10)' },
  KI:               { color: '#FF9632', bg: 'rgba(255,150,50,0.10)' },
  Malware:          { color: '#FF2D6F', bg: 'rgba(255,45,111,0.10)' },
  Authentifizierung:{ color: '#78C864', bg: 'rgba(120,200,100,0.10)' },
  Netzwerk:         { color: '#9664FF', bg: 'rgba(150,100,255,0.10)' },
  Protokoll:        { color: '#00C8A0', bg: 'rgba(0,200,160,0.10)' },
};

export interface GlossaryTerm {
  id: string;
  term: string;
  abbr?: string;
  def: string;
  extended?: string;
  category: GlossaryCategory;
  related?: string[];
}

export const GLOSSARY_TERMS: GlossaryTerm[] = [
  {
    id: 'apt',
    term: 'Advanced Persistent Threat',
    abbr: 'APT',
    def: 'Langfristige, zielgerichtete Cyberangriffe, meist staatlich gesponsert, die über Monate oder Jahre unentdeckt bleiben.',
    extended: 'APTs nutzen eine Kombination aus Social Engineering, Zero-Day-Exploits und Lateral Movement, um dauerhaften Zugang zu kritischer Infrastruktur zu erhalten. Bekannte APT-Gruppen sind Fancy Bear (Russland), Lazarus Group (Nordkorea) und APT41 (China).',
    category: 'Angriff',
    related: ['lateral-movement', 'ttp', 'zero-day'],
  },
  {
    id: 'brute-force',
    term: 'Brute-Force-Angriff',
    def: 'Systematisches Durchprobieren aller möglichen Passwörter oder Schlüssel bis die korrekte Kombination gefunden wird.',
    extended: 'Moderne Varianten wie Dictionary Attacks und Credential Stuffing sind effizienter als reine Brute-Force-Angriffe. MFA und Account-Lockout-Mechanismen sind die effektivsten Gegenmaßnahmen.',
    category: 'Angriff',
    related: ['mfa', 'credential-stuffing'],
  },
  {
    id: 'cve',
    term: 'Common Vulnerabilities and Exposures',
    abbr: 'CVE',
    def: 'Standardisiertes System zur Katalogisierung von Sicherheitslücken in Software und Hardware mit eindeutiger ID.',
    extended: 'Jede CVE-ID hat das Format CVE-JAHR-NUMMER. Der CVSS-Score bewertet den Schweregrad von 0 (keine Gefahr) bis 10 (kritisch). CVEs werden von MITRE verwaltet und von Anbietern wie NVD gepflegt.',
    category: 'Protokoll',
    related: ['patch-management', 'zero-day'],
  },
  {
    id: 'credential-stuffing',
    term: 'Credential Stuffing',
    def: 'Automatisierter Angriff, bei dem gestohlene Nutzername/Passwort-Kombinationen aus Datenpannen gegen andere Dienste getestet werden.',
    category: 'Angriff',
    related: ['brute-force', 'mfa', 'zero-trust'],
  },
  {
    id: 'ddos',
    term: 'Distributed Denial of Service',
    abbr: 'DDoS',
    def: 'Angriff bei dem viele kompromittierte Systeme gleichzeitig einen Dienst mit Anfragen überlasten und lahmlegen.',
    extended: 'DDoS-Angriffe können volumetrisch (Bandbreite), protokollbasiert (SYN-Flood) oder anwendungsbasiert (HTTP-Flood) sein. Moderne DDoS-Abwehr nutzt Scrubbing-Center und CDN-basierte Filterung.',
    category: 'Angriff',
    related: ['botnet', 'firewall'],
  },
  {
    id: 'edr',
    term: 'Endpoint Detection & Response',
    abbr: 'EDR',
    def: 'Sicherheitslösung die Endgeräte kontinuierlich überwacht, Bedrohungen erkennt und automatisch reagiert.',
    extended: 'EDR-Systeme sammeln Telemetriedaten von Endpunkten, analysieren Verhaltensmuster mit KI und ermöglichen automatisierte oder manuelle Incident-Response. Marktführer sind CrowdStrike Falcon, SentinelOne und Microsoft Defender.',
    category: 'Abwehr',
    related: ['siem', 'ids', 'xdr'],
  },
  {
    id: 'firewall',
    term: 'Firewall',
    def: 'Netzwerksicherheitssystem das den Datenverkehr anhand von Regeln kontrolliert und unerwünschte Verbindungen blockiert.',
    extended: 'Next-Generation Firewalls (NGFW) kombinieren traditionelle Paketfilterung mit Deep Packet Inspection, Application Awareness und integrierten Intrusion Prevention Systemen.',
    category: 'Abwehr',
    related: ['ids', 'zero-trust', 'netzwerksegmentierung'],
  },
  {
    id: 'honeypot',
    term: 'Honeypot',
    def: 'Täuschungssystem das Angreifer anzieht und deren Methoden dokumentiert, ohne echte Systeme zu gefährden.',
    extended: 'Honeypots können Low-Interaction (simuliert Dienste), High-Interaction (echte Systeme) oder Honeynetworks (ganze Netzwerke) sein. Sie liefern wertvolle Threat Intelligence über aktuelle Angriffsmethoden.',
    category: 'Abwehr',
    related: ['ttp', 'threat-intelligence'],
  },
  {
    id: 'ids',
    term: 'Intrusion Detection System',
    abbr: 'IDS',
    def: 'System zur Erkennung von unbefugten Zugriffen oder Anomalien im Netzwerkverkehr.',
    extended: 'Network-based IDS (NIDS) überwacht den Netzwerkverkehr, Host-based IDS (HIDS) analysiert einzelne Systeme. Ergänzt durch IPS (Intrusion Prevention System), das aktiv blockieren kann.',
    category: 'Abwehr',
    related: ['siem', 'edr', 'firewall'],
  },
  {
    id: 'ki-angriff',
    term: 'KI-Angriff (Adversarial AI)',
    def: 'Angriff der KI-Systeme durch manipulierte Eingabedaten täuscht oder deren Ausgabe gezielt beeinflusst.',
    extended: 'Adversarial Examples sind speziell präparierte Eingaben, die für Menschen normal wirken, KI-Modelle aber täuschen. Model Poisoning vergiftet Trainingsdaten, Prompt Injection manipuliert LLM-Ausgaben.',
    category: 'KI',
    related: ['prompt-injection', 'llm-sicherheit'],
  },
  {
    id: 'lateral-movement',
    term: 'Lateral Movement',
    def: 'Technik bei der sich Angreifer nach dem Erstzugang seitwärts durch ein Netzwerk bewegen um weitere Systeme zu kompromittieren.',
    extended: 'Typische Techniken: Pass-the-Hash, Pass-the-Ticket, RDP-Hijacking, WMI-Ausführung. Netzwerksegmentierung und Zero-Trust-Architekturen begrenzen laterale Bewegung erheblich.',
    category: 'Angriff',
    related: ['apt', 'zero-trust', 'netzwerksegmentierung'],
  },
  {
    id: 'llm-sicherheit',
    term: 'LLM-Sicherheit',
    def: 'Schutz von Large Language Models vor Manipulation, Datenlecks und missbräuchlicher Nutzung.',
    extended: 'Hauptrisiken: Prompt Injection, Training Data Extraction, Model Inversion und Jailbreaking. OWASP Top 10 für LLMs definiert die kritischsten Schwachstellen.',
    category: 'KI',
    related: ['prompt-injection', 'ki-angriff'],
  },
  {
    id: 'mfa',
    term: 'Multi-Faktor-Authentifizierung',
    abbr: 'MFA',
    def: 'Sicherheitsverfahren das mehrere unabhängige Faktoren zur Identitätsbestätigung erfordert.',
    extended: 'Faktoren: Wissen (Passwort), Besitz (TOTP-Token, Smartphone), Biometrie (Fingerabdruck, Gesicht). FIDO2/WebAuthn gilt als phishing-resistenteste MFA-Methode.',
    category: 'Authentifizierung',
    related: ['phishing', 'zero-trust', 'passkeys'],
  },
  {
    id: 'netzwerksegmentierung',
    term: 'Netzwerksegmentierung',
    def: 'Aufteilung eines Netzwerks in isolierte Segmente um die Ausbreitung von Angriffen zu begrenzen.',
    extended: 'Micro-Segmentierung mit Software-Defined Networking (SDN) ermöglicht granulare Kontrolle bis auf Workload-Ebene. VLANs sind eine klassische Implementierungsmethode.',
    category: 'Netzwerk',
    related: ['zero-trust', 'lateral-movement', 'firewall'],
  },
  {
    id: 'osint',
    term: 'Open Source Intelligence',
    abbr: 'OSINT',
    def: 'Informationsgewinnung aus öffentlich zugänglichen Quellen zur Vorbereitung von Angriffen oder Sicherheitsanalysen.',
    extended: 'OSINT-Tools: Maltego, Shodan, theHarvester, FOCA. Angreifer nutzen OSINT für Reconnaissance, Verteidiger für Attack Surface Management.',
    category: 'Angriff',
    related: ['apt', 'social-engineering', 'threat-intelligence'],
  },
  {
    id: 'passkeys',
    term: 'Passkeys',
    def: 'Passwortloser Authentifizierungsstandard basierend auf Public-Key-Kryptographie und FIDO2.',
    category: 'Authentifizierung',
    related: ['mfa', 'phishing'],
  },
  {
    id: 'patch-management',
    term: 'Patch Management',
    def: 'Systematischer Prozess zur Identifikation, Beschaffung und Installation von Software-Updates zum Schließen von Sicherheitslücken.',
    extended: 'Best Practice: Patches innerhalb von 24h für kritische CVEs (CVSS ≥ 9), 72h für hohe, 30 Tage für mittlere. Automatisiertes Patch-Management mit Tools wie WSUS, Ansible oder Puppet.',
    category: 'Abwehr',
    related: ['cve', 'zero-day'],
  },
  {
    id: 'phishing',
    term: 'Phishing',
    def: 'Täuschungsangriff bei dem Nutzer durch gefälschte E-Mails, Websites oder Nachrichten zur Preisgabe sensibler Daten verleitet werden.',
    extended: 'Varianten: Spear-Phishing (gezielt), Whaling (Führungskräfte), Vishing (Telefon), Smishing (SMS). KI-generiertes Phishing ist kaum noch von echten Nachrichten zu unterscheiden.',
    category: 'Angriff',
    related: ['social-engineering', 'mfa', 'ki-angriff'],
  },
  {
    id: 'prompt-injection',
    term: 'Prompt Injection',
    def: 'Angriff auf KI-Systeme bei dem manipulierte Eingaben das Modell dazu bringen seine Sicherheitsregeln zu umgehen.',
    extended: 'Direct Prompt Injection: Nutzer manipuliert das System direkt. Indirect Prompt Injection: Schadcode versteckt in Websites oder Dokumenten, die das KI-System verarbeitet.',
    category: 'KI',
    related: ['llm-sicherheit', 'ki-angriff'],
  },
  {
    id: 'ransomware',
    term: 'Ransomware',
    def: 'Schadsoftware die Daten verschlüsselt und Lösegeld für die Entschlüsselung verlangt.',
    extended: 'Ransomware-as-a-Service (RaaS) ermöglicht auch technisch unerfahrenen Angreifern komplexe Kampagnen. Double Extortion kombiniert Verschlüsselung mit Datendiebstahl und Veröffentlichungsdrohung.',
    category: 'Malware',
    related: ['backup', 'incident-response', 'edr'],
  },
  {
    id: 'siem',
    term: 'Security Information and Event Management',
    abbr: 'SIEM',
    def: 'Plattform die Sicherheitsdaten aus verschiedenen Quellen sammelt, korreliert und Alarme generiert.',
    extended: 'Moderne SIEMs integrieren User and Entity Behavior Analytics (UEBA) und Security Orchestration, Automation and Response (SOAR). Marktführer: Splunk, Microsoft Sentinel, IBM QRadar.',
    category: 'Abwehr',
    related: ['ids', 'edr', 'threat-intelligence'],
  },
  {
    id: 'social-engineering',
    term: 'Social Engineering',
    def: 'Manipulation von Menschen um vertrauliche Informationen preiszugeben oder sicherheitsrelevante Handlungen auszuführen.',
    extended: 'Techniken: Pretexting, Baiting, Quid-pro-quo, Tailgating. Der Mensch ist das schwächste Glied in der Sicherheitskette. Regelmäßige Security-Awareness-Schulungen sind die beste Prävention.',
    category: 'Angriff',
    related: ['phishing', 'osint'],
  },
  {
    id: 'sql-injection',
    term: 'SQL-Injection',
    def: 'Angriff bei dem manipulierter SQL-Code in Eingabefelder eingeschleust wird um Datenbanken zu manipulieren.',
    extended: 'Schutzmaßnahmen: Prepared Statements, Parameterized Queries, ORM-Nutzung und Web Application Firewalls. Rangiert seit Jahren in den OWASP Top 10.',
    category: 'Angriff',
    related: ['owasp', 'waf'],
  },
  {
    id: 'threat-intelligence',
    term: 'Threat Intelligence',
    def: 'Systematisch gesammelte und analysierte Informationen über aktuelle Bedrohungsakteure, Taktiken und Indikatoren.',
    extended: 'Strategische TI informiert Managemententscheidungen, taktische TI hilft Analysten, operative TI automatisiert Abwehrmaßnahmen. Sharing-Plattformen: MISP, OpenCTI, ISAC-Netzwerke.',
    category: 'Abwehr',
    related: ['ttp', 'siem', 'honeypot'],
  },
  {
    id: 'ttp',
    term: 'Tactics, Techniques and Procedures',
    abbr: 'TTP',
    def: 'Beschreibung der Vorgehensweise von Angreifern — wichtig für Bedrohungsmodellierung und Abwehrstrategien.',
    extended: 'Das MITRE ATT&CK Framework katalogisiert TTPs realer Angreifer in einer strukturierten Matrix. Es ist der De-facto-Standard für Threat Intelligence und Red-Team-Übungen.',
    category: 'Protokoll',
    related: ['apt', 'threat-intelligence', 'honeypot'],
  },
  {
    id: 'waf',
    term: 'Web Application Firewall',
    abbr: 'WAF',
    def: 'Spezialisierte Firewall die HTTP-Datenverkehr analysiert und typische Web-Angriffe wie SQL-Injection und XSS blockiert.',
    category: 'Abwehr',
    related: ['sql-injection', 'firewall', 'owasp'],
  },
  {
    id: 'xdr',
    term: 'Extended Detection and Response',
    abbr: 'XDR',
    def: 'Erweiterte Sicherheitsplattform die Daten aus Endpoints, Netzwerk, Cloud und E-Mail korreliert und unified Response ermöglicht.',
    category: 'Abwehr',
    related: ['edr', 'siem'],
  },
  {
    id: 'zero-day',
    term: 'Zero-Day',
    def: 'Sicherheitslücke die noch unbekannt oder ungepatcht ist und von Angreifern aktiv ausgenutzt wird.',
    extended: 'Zero-Day-Exploits werden auf dem Schwarzmarkt für hunderttausende bis Millionen Dollar gehandelt. Staatliche Akteure horten Zero-Days für strategische Operationen.',
    category: 'Angriff',
    related: ['cve', 'patch-management', 'apt'],
  },
  {
    id: 'zero-trust',
    term: 'Zero Trust',
    def: 'Sicherheitsarchitektur die keinem Nutzer, Gerät oder Netzwerksegment standardmäßig vertraut — jede Anfrage wird verifiziert.',
    extended: 'Prinzip: Never Trust, Always Verify. Implementierung über Identitätsprüfung, Least-Privilege-Zugriff, Micro-Segmentierung und kontinuierliche Verifikation. NIST SP 800-207 ist der Referenzstandard.',
    category: 'Abwehr',
    related: ['mfa', 'netzwerksegmentierung', 'lateral-movement'],
  },
];

export function getTermsByLetter(): Record<string, GlossaryTerm[]> {
  const grouped: Record<string, GlossaryTerm[]> = {};
  for (const term of GLOSSARY_TERMS) {
    const letter = term.term[0].toUpperCase();
    if (!grouped[letter]) grouped[letter] = [];
    grouped[letter].push(term);
  }
  // Sort terms within each letter
  for (const letter of Object.keys(grouped)) {
    grouped[letter].sort((a, b) => a.term.localeCompare(b.term, 'de'));
  }
  return grouped;
}

export function getAllLetters(): string[] {
  const letters = Object.keys(getTermsByLetter()).sort();
  return letters;
}

export function getTermById(id: string): GlossaryTerm | undefined {
  return GLOSSARY_TERMS.find(t => t.id === id);
}
