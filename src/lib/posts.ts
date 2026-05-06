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
}

// ─── Static fallback data ────────────────────────────────────────────────────
export const STATIC_POSTS: Post[] = [
  {
    id: '1',
    slug: 'gpt-5-ki-angriffe',
    title: 'GPT-5 und die neue Generation KI-gestützter Cyberangriffe',
    excerpt: 'Vollautomatisierte Exploits, täuschend echte Phishing-Mails, autonome Malware — GPT-5 verändert die Bedrohungslandschaft fundamental.',
    category: 'KI-Sicherheit',
    categoryColor: '#00F0FF',
    categoryBg: 'rgba(0,240,255,0.1)',
    author: 'Dr. Lena Hartmann',
    authorRole: 'Head of Threat Research',
    publishedAt: '2026-05-04',
    readTime: 12,
    imageGradient: 'linear-gradient(135deg, #060D24 0%, #071830 40%, #0A1E40 100%)',
    badge: 'KRITISCH',
    badgeColor: '#FF2D6F',
    tags: ['GPT-5', 'KI-Angriffe', 'Phishing', 'Malware', 'LLM'],
    faqs: [
      { q: 'Was macht GPT-5-gestützte Angriffe gefährlicher als bisherige?', a: 'GPT-5 kann personalisierte Phishing-Mails in Echtzeit generieren, Sicherheitslücken automatisiert identifizieren und Social-Engineering-Skripte für spezifische Zielpersonen erstellen — ohne menschliches Zutun.' },
      { q: 'Wie kann mein Unternehmen sich gegen KI-gestützte Angriffe schützen?', a: 'Multi-Faktor-Authentifizierung, Mitarbeiterschulungen zu KI-Phishing, KI-gestützte E-Mail-Filter und Zero-Trust-Architekturen sind die wichtigsten Gegenmaßnahmen.' },
      { q: 'Sind kleinere Unternehmen auch betroffen?', a: 'Ja. KI senkt die Einstiegshürde für Angreifer erheblich. Angriffe, die früher staatliche Ressourcen erforderten, sind jetzt für kleine kriminelle Gruppen erschwinglich.' },
    ],
    content: `<h2 id="einfuehrung">Die KI-Zeitenwende in der Cyberkriminalität</h2>
<p>Mit dem Launch von GPT-5 im März 2026 hat sich die Bedrohungslandschaft fundamental verändert. Was Sicherheitsforscher seit Jahren befürchtet haben, ist nun Realität: Vollautomatisierte Angriffskampagnen, die ohne menschliche Eingriffe Ziele identifizieren, kompromittieren und lateral bewegen.</p>
<p>In unserem Threat Intelligence Team haben wir in den letzten 60 Tagen einen Anstieg von <strong>340% bei KI-generierten Phishing-Kampagnen</strong> gemessen. Die Qualität der Angriffe ist dabei so gestiegen, dass selbst geschulte IT-Mitarbeiter sie kaum noch von echten E-Mails unterscheiden können.</p>
<blockquote><p>„Wir stehen an einem Wendepunkt: KI macht Angriffe nicht nur schneller, sondern qualitativ besser — und damit deutlich gefährlicher."</p><cite>— Dr. Klaus Müller, BSI-Forschungsleiter</cite></blockquote>

<h2 id="angriffsmuster">Neue Angriffsmuster im Detail</h2>
<h3 id="llm-phishing">LLM-generiertes Spear-Phishing</h3>
<p>Klassisches Phishing nutzte generische Vorlagen. LLM-gestütztes Spear-Phishing hingegen analysiert LinkedIn-Profile, Twitter-Aktivität, Unternehmens-Pressemitteilungen und öffentliche Kalender, um hyper-personalisierte Nachrichten zu erstellen.</p>
<pre><code class="language-python"># Vereinfachtes Beispiel eines LLM-Phishing-Frameworks (Analyse-Zwecke)
class PhishingAgent:
    def generate_lure(self, target_profile: dict) -> str:
        context = f"""
        Ziel: {target_profile['name']}, {target_profile['role']}
        Firma: {target_profile['company']}
        Letzte Aktivität: {target_profile['recent_posts']}
        """
        # LLM generiert personalisierte Nachricht basierend auf Kontext
        return llm.complete(PHISHING_PROMPT.format(context=context))</code></pre>
<p>Das Resultat: E-Mails, die spezifische Projekte referenzieren, korrekte Terminologie der Branche verwenden und sogar auf echte interne Meetings anspielen — gewonnen aus öffentlichen Quellen.</p>

<h3 id="autonome-exploits">Autonome Exploit-Entwicklung</h3>
<p>GPT-5-gestützte Systeme können mittlerweile aus CVE-Beschreibungen automatisiert funktionierende Proof-of-Concept-Exploits erstellen. Unser Team hat in einer kontrollierten Umgebung gemessen: Vom Lesen einer CVE-Beschreibung bis zum funktionierenden Exploit vergehen im Schnitt <strong>18 Minuten</strong>. Manuell würde ein erfahrener Pentester mehrere Stunden benötigen.</p>

<h2 id="unternehmen">Bedrohungen für Unternehmen</h2>
<p>Drei Angriffsvektoren sind besonders kritisch:</p>
<ul>
<li><strong>CEO-Fraud 2.0</strong>: KI klont Stimmen von Führungskräften aus öffentlichen Interviews und erstellt authentische Audio-Anweisungen für Überweisungen.</li>
<li><strong>Supply-Chain-Kompromittierung</strong>: Automatisierte Analyse von Open-Source-Abhängigkeiten findet schwache Glieder in der Lieferkette.</li>
<li><strong>Insider-Threat-Simulation</strong>: LLMs können das Kommunikationsmuster von Mitarbeitern analysieren und überzeugend imitieren.</li>
</ul>

<h2 id="gegenmassnahmen">Was Unternehmen jetzt tun müssen</h2>
<p>Die gute Nachricht: Gegen KI-Angriffe helfen vor allem grundlegende Security-Maßnahmen, konsequent umgesetzt.</p>
<pre><code class="language-bash"># Checklist: Sofortmaßnahmen gegen KI-Phishing
✓ MFA auf allen Accounts aktivieren (FIDO2 bevorzugen)
✓ E-Mail-Gateway mit KI-Filter nachrüsten
✓ Mitarbeiter-Training: KI-Phishing erkennen (vierteljährlich)
✓ Zero-Trust-Netzwerk-Segmentierung implementieren
✓ Incident Response Plan für KI-Angriffe aktualisieren
✓ Threat Intelligence Feed abonnieren (z.B. MISP, OpenCTI)</code></pre>

<h2 id="fazit">Fazit: Sicherheit im KI-Zeitalter</h2>
<p>Die Demokratisierung von KI ist unaufhaltsam — und damit auch die Demokratisierung von Cyberangriffen. Unternehmen, die jetzt handeln und ihre Security-Posture modernisieren, werden die nächste Welle KI-gestützter Angriffe deutlich besser überstehen als jene, die abwarten.</p>
<p>In unserem nächsten Artikel analysieren wir konkrete Defense-in-Depth-Strategien gegen LLM-basierte Angriffe. Abonnieren Sie unseren Newsletter, um keine Updates zu verpassen.</p>`,
  },
  {
    id: '2',
    slug: 'phantom-ransomware-dax',
    title: 'Phantom Ransomware: Anatomie eines DAX-Angriffs',
    excerpt: 'Eine forensische Analyse des Phantom-Angriffs auf ein DAX-Unternehmen — Angriffsphasen, Lateral Movement und warum klassische Backups versagten.',
    category: 'Ransomware',
    categoryColor: '#FF2D6F',
    categoryBg: 'rgba(255,45,111,0.1)',
    author: 'Markus Schreiber',
    authorRole: 'Forensic Analyst',
    publishedAt: '2026-05-03',
    readTime: 8,
    imageGradient: 'linear-gradient(135deg, #1A0610 0%, #240A18 100%)',
    badge: 'HOCH',
    badgeColor: '#FF9632',
    tags: ['Ransomware', 'Forensik', 'DAX', 'Incident Response', 'DSGVO'],
    faqs: [
      { q: 'Warum versagten die Backups?', a: 'Die Angreifer verbrachten 34 Tage in der Infrastruktur und kompromitierten in dieser Zeit auch die Backup-Systeme. Online-Backups wurden verschlüsselt, bevor der Hauptangriff ausgelöst wurde.' },
      { q: 'Wie lange dauerte die Wiederherstellung?', a: 'Das Unternehmen benötigte 23 Tage, um kritische Systeme wiederherzustellen. Der Gesamtschaden belief sich auf geschätzte 47 Millionen Euro.' },
      { q: 'Was war der initiale Angriffsvektor?', a: 'Eine ungepatchte VPN-Appliance (CVE-2025-8821) ermöglichte den Erstzugang. Das Patch war seit 6 Wochen verfügbar.' },
    ],
    content: `<h2 id="zeitlinie">Die Angriffszeitlinie</h2>
<p>Am 14. April 2026 um 03:47 Uhr MESZ beginnen auf den Servern eines DAX-40-Unternehmens Dateien zu verschwinden — nicht gelöscht, sondern verschlüsselt. Innerhalb von 4 Stunden sind 847 Server betroffen. Was folgt, ist eine der kostspieligsten Cyberattacken in der Geschichte des deutschen Mittelstands.</p>
<p>Die forensische Analyse des Incident Response Teams enthüllt: Die Angreifer waren seit <strong>34 Tagen in der Infrastruktur</strong>. Was als einfacher VPN-Exploit begann, entwickelte sich zu einem präzisen, orchestrierten Angriff.</p>

<h2 id="initial-access">Phase 1: Initial Access</h2>
<p>Der Einstiegspunkt war eine ungepatchte Pulse Secure VPN-Appliance. CVE-2025-8821, ein kritisches Authentication-Bypass, war seit dem 8. März öffentlich bekannt — das Patch war verfügbar, aber nicht ausgerollt.</p>
<pre><code class="language-bash"># Angriffsvektor: CVE-2025-8821 Authentication Bypass
POST /api/v1/auth/bypass HTTP/1.1
Host: vpn.target-corp.de
X-Forwarded-For: 127.0.0.1

# Angreifer erhalten Session-Token ohne Credentials
# Anschließend: Tunnel in internes Netzwerk</code></pre>
<blockquote><p>„Das Patch war seit sechs Wochen verfügbar. Ein Patching-Intervall von 30 Tagen für kritische Infrastruktur ist in der heutigen Bedrohungslandschaft nicht mehr akzeptabel."</p><cite>— Incident Response Team, anonymisiert</cite></blockquote>

<h2 id="lateral-movement">Phase 2: Lateral Movement (Tag 1–28)</h2>
<p>Nach dem Erstzugang agierten die Angreifer äußerst geduldig. Statt sofort zu handeln, verbrachten sie vier Wochen damit, die Infrastruktur zu kartieren und Privilegien zu eskalieren.</p>

<h2 id="backup-kompromittierung">Phase 3: Backup-Kompromittierung</h2>
<p>Das Ergebnis: Die Backup-Systeme waren zum Zeitpunkt des Hauptangriffs bereits vollständig kompromittiert. Weder Veeam-Backups noch die Tape-Bibliothek waren nutzbar.</p>

<h2 id="lessons-learned">Lessons Learned</h2>
<p>Dieser Angriff zeigt exemplarisch, warum Air-Gapped Backups und 3-2-1-Backup-Strategien immer noch State of the Art sind. Patch-Management-Intervalle für kritische Infrastruktur müssen drastisch verkürzt werden.</p>`,
  },
  {
    id: '3',
    slug: 'eu-ai-act-compliance',
    title: 'EU AI Act: Compliance-Anforderungen für deutsche Firmen',
    excerpt: 'Ab 2026 gelten verbindliche KI-Regulierungen in der EU. Was Unternehmen jetzt wissen müssen — Risikoklassen, Verbote und Fristen.',
    category: 'Regulierung',
    categoryColor: '#7890FF',
    categoryBg: 'rgba(120,144,255,0.1)',
    author: 'Julia Becker',
    authorRole: 'Legal & Compliance',
    publishedAt: '2026-05-02',
    readTime: 10,
    imageGradient: 'linear-gradient(135deg, #060B24 0%, #0A0F38 100%)',
    badge: 'NEU',
    badgeColor: '#78C864',
    tags: ['EU AI Act', 'DSGVO', 'Compliance', 'Regulierung', 'KI-Recht'],
    faqs: [
      { q: 'Welche Unternehmen sind vom EU AI Act betroffen?', a: 'Alle Unternehmen, die KI-Systeme in der EU entwickeln, einsetzen oder vertreiben — unabhängig vom Firmensitz. Auch US-Unternehmen, die Dienste in die EU anbieten.' },
      { q: 'Was sind die Strafen bei Verstößen?', a: 'Bis zu 30 Millionen Euro oder 6% des weltweiten Jahresumsatzes — ähnlich wie die DSGVO. Für KMU gibt es Ausnahmeregelungen.' },
      { q: 'Gibt es eine Übergangsfrist?', a: 'Ja. Hochrisiko-Systeme haben bis August 2026 Zeit zur Compliance. Verbotene KI-Praktiken sind ab Februar 2026 untersagt.' },
    ],
    content: `<h2 id="ueberblick">Was ist der EU AI Act?</h2>
<p>Der EU Artificial Intelligence Act ist die weltweit erste umfassende KI-Regulierung und trat am 1. August 2024 in Kraft. Er gilt für alle Unternehmen, die KI-Systeme in der EU entwickeln, einsetzen oder vertreiben — unabhängig vom Firmensitz.</p>

<h2 id="risikoklassen">Die vier Risikoklassen</h2>
<ul>
<li><strong>Unannehmbares Risiko (verboten)</strong>: Social-Scoring-Systeme, manipulative KI, biometrische Massenüberwachung</li>
<li><strong>Hochrisiko</strong>: KI in kritischer Infrastruktur, Bildung, Beschäftigung, Strafverfolgung</li>
<li><strong>Begrenztes Risiko</strong>: Chatbots müssen als KI erkennbar sein</li>
<li><strong>Minimales Risiko</strong>: KI-Spam-Filter, KI-Spiele — kaum Regulierung</li>
</ul>

<h2 id="fristen">Wichtige Fristen 2026</h2>
<pre><code class="language-bash"># EU AI Act Compliance Timeline
Feb 2026  → Verbote für unannehmbares Risiko (Art. 5) gelten
Aug 2026  → GPAI-Regeln für Allzweck-KI-Modelle
Feb 2027  → Hochrisiko-KI-Pflichten vollständig in Kraft
Aug 2027  → Alle restlichen Anforderungen</code></pre>

<h2 id="handlungsempfehlung">Was jetzt zu tun ist</h2>
<p>Erstellen Sie ein KI-Inventar aller eingesetzten Systeme. Klassifizieren Sie jeden Einsatzbereich nach den EU-AI-Act-Kriterien und prüfen Sie, ob Konformitätsprüfungen erforderlich sind.</p>

<h2 id="fazit">Fazit</h2>
<p>Der EU AI Act ist kein bürokratisches Hindernis — er ist eine Chance. Unternehmen, die jetzt in KI-Compliance investieren, schaffen nachhaltiges Vertrauen und vermeiden kostspielige Nachbesserungen.</p>`,
  },
  {
    id: '4',
    slug: 'cve-2026-4821-openssl',
    title: 'CVE-2026-4821: Kritische RCE-Lücke in OpenSSL 3.x — Sofort patchen',
    excerpt: 'CVSS 9.8 — Eine kritische Remote Code Execution Schwachstelle in OpenSSL 3.x wird aktiv ausgenutzt. Patching-Anleitung und Workarounds.',
    category: 'Schwachstelle',
    categoryColor: '#FF9632',
    categoryBg: 'rgba(255,150,50,0.1)',
    author: 'CERT-DE',
    authorRole: 'Security Advisory',
    publishedAt: '2026-05-01',
    readTime: 5,
    imageGradient: 'linear-gradient(135deg, #1A0E00 0%, #241500 100%)',
    badge: 'CVSS 9.8',
    badgeColor: '#FF2D6F',
    tags: ['CVE', 'OpenSSL', 'RCE', 'Patch', 'Kritisch'],
    faqs: [
      { q: 'Welche OpenSSL-Versionen sind betroffen?', a: 'OpenSSL 3.0.0 bis 3.3.1. OpenSSL 1.1.1 und 1.0.2 sind nicht betroffen.' },
      { q: 'Gibt es einen Workaround ohne Neustart?', a: 'Nein. Das Patching erfordert einen Neustart der betroffenen Dienste. Planen Sie Wartungsfenster entsprechend.' },
    ],
    content: `<h2 id="schwachstelle">Die Schwachstelle</h2>
<p>CVE-2026-4821 ist eine kritische Buffer-Overflow-Schwachstelle in der TLS-Implementierung von OpenSSL 3.x. Angreifer können durch einen speziell präparierten TLS-Handshake beliebigen Code auf dem Server ausführen.</p>
<pre><code class="language-bash"># Betroffene Versionen prüfen
openssl version
# Betroffen: 3.0.0 - 3.3.1
# Gepatcht: 3.3.2+

# Sofort-Patching (Debian/Ubuntu)
sudo apt update && sudo apt upgrade openssl -y
# Dienste neu starten
sudo systemctl restart nginx apache2 mysql</code></pre>

<h2 id="ausmass">Ausmaß der Bedrohung</h2>
<p>OpenSSL ist in nahezu jeder Linux-Infrastruktur vorhanden. Schätzungen zufolge sind weltweit über 2 Millionen öffentlich erreichbare Server betroffen. Exploit-Code ist bereits in freier Wildbahn verfügbar.</p>

<h2 id="patching">Patching-Anleitung</h2>
<p>Sofort auf OpenSSL 3.3.2 oder höher aktualisieren. Alle TLS-terminierenden Dienste neu starten. Anschließend Zertifikate und private Schlüssel als potentiell kompromittiert behandeln.</p>`,
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
