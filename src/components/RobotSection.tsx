'use client';

import { SplineScene } from '@/components/ui/splite';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ─── Quiz Data ─────────────────────────────────────────────── */

const QUIZ_TOPICS = [
  {
    id: 'phishing',
    title: 'KI-Phishing',
    subtitle: 'Social Engineering',
    icon: '◈',
    color: '#00F0FF',
    colorDim: 'rgba(0,240,255,0.12)',
    source: 'SlashNext · Proofpoint · CISA',
    questions: [
      {
        q: 'Laut SlashNext-Report 2023: Um wie viel Prozent sind KI-generierte Phishing-Mails gestiegen?',
        options: ['120%', '210%', '340%', '580%'],
        correct: 2,
        explain: 'SlashNext 2023 Annual State of Phishing Report: +340% KI-generierte Phishing-Mails gegenüber dem Vorjahr — angetrieben durch Tools wie WormGPT.',
      },
      {
        q: 'Was unterscheidet "Spear-Phishing" von herkömmlichem Phishing?',
        options: [
          'Phishing per SMS statt E-Mail',
          'Gezielter Angriff auf eine bestimmte Person mit persönlichen Informationen',
          'Automatisierter Massenversand an Millionen Adressen',
          'Angriff ausschließlich auf mobile Geräte',
        ],
        correct: 1,
        explain: 'Spear-Phishing nutzt persönliche Daten (Name, Arbeitgeber, Kollegen) um überzeugend zu wirken. KI automatisiert diese Personalisierung massenhaft.',
      },
      {
        q: 'Was ermöglichen KI-Tools wie WormGPT kriminellen Angreifern?',
        options: [
          'Stärkere Passwörter zu erstellen',
          'Sicherheitslücken automatisch zu patchen',
          'Professionelle Phishing-Mails ohne Sprachkenntnisse in jeder Sprache',
          'Verschlüsselte VPN-Tunnel aufzubauen',
        ],
        correct: 2,
        explain: 'WormGPT (ChatGPT ohne Sicherheitsfilter) schreibt fehlerfreie Phishing-Mails in jeder Sprache — die klassische Erkennungsmethode "schlechtes Deutsch" versagt damit.',
      },
      {
        q: 'Ein typisches Merkmal einer Phishing-Domain ist:',
        options: [
          'Das Vorhandensein einer HTTPS-Verschlüsselung',
          'Eine besonders kurze URL',
          'Die echte Marke erscheint als Subdomain (z.B. paypal.evil-site.com)',
          'Ein professionelles Logo auf der Website',
        ],
        correct: 2,
        explain: 'Die echte Domain steht immer direkt vor dem letzten Punkt (TLD). Bei "paypal.evil-site.com" ist die Domain "evil-site.com" — PayPal ist nur eine Subdomain.',
      },
      {
        q: 'Laut Proofpoint: Wie viel Prozent aller erfolgreichen Cyberangriffe beginnen mit einer Phishing-E-Mail?',
        options: ['41%', '67%', '91%', '99%'],
        correct: 2,
        explain: 'Proofpoint State of the Phish 2023: 91% aller Cyberangriffe starten mit Phishing — es ist das mit Abstand häufigste Einstiegsvehikel für Angreifer.',
      },
    ],
  },
  {
    id: 'ransomware',
    title: 'Ransomware',
    subtitle: 'Malware & Angriffe',
    icon: '◆',
    color: '#FF3B5C',
    colorDim: 'rgba(255,59,92,0.12)',
    source: 'Sophos · IBM X-Force · Cybersecurity Ventures',
    questions: [
      {
        q: 'Laut Sophos State of Ransomware 2023: Wie hoch war die durchschnittliche Lösegeldzahlung?',
        options: ['250.000 $', '540.000 $', '1,54 Millionen $', '8,2 Millionen $'],
        correct: 2,
        explain: 'Sophos 2023: Durchschnittliche Ransomware-Zahlung stieg auf 1,54 Millionen Dollar — fast doppelt so hoch wie 2022. 40% der Zahler erhielten trotzdem nicht alle Daten zurück.',
      },
      {
        q: 'Was bedeutet "Double Extortion" bei modernen Ransomware-Angriffen?',
        options: [
          'Der Angreifer fordert zweimal Lösegeld',
          'Daten werden verschlüsselt UND gestohlen — Zahlung oder Veröffentlichung droht',
          'Zwei verschiedene Systeme werden gleichzeitig angegriffen',
          'Das Lösegeld wird nach 24h automatisch verdoppelt',
        ],
        correct: 1,
        explain: '"Double Extortion" seit 2019 Standard: Daten werden vor der Verschlüsselung gestohlen. Selbst mit Backup bleibt die Drohung der Veröffentlichung.',
      },
      {
        q: 'Was ist "Ransomware-as-a-Service" (RaaS)?',
        options: [
          'Ein legaler Cloud-Backup-Dienst',
          'Antivirensoftware im monatlichen Abo',
          'Kriminelle vermieten Ransomware-Tools an andere Angreifer gegen Umsatzbeteiligung',
          'Ein staatliches Frühwarnsystem für Ransomware',
        ],
        correct: 2,
        explain: 'RaaS-Gruppen wie LockBit, BlackCat oder Cl0p entwickeln Ransomware und "vermieten" sie an Affiliates — meist gegen 20-30% der erpressten Summen.',
      },
      {
        q: 'Welche Branche war laut IBM X-Force 2023 am häufigsten Ziel von Ransomware?',
        options: ['Banken & Versicherungen', 'Gesundheitswesen & Krankenhäuser', 'Einzelhandel & E-Commerce', 'Automobilindustrie'],
        correct: 1,
        explain: 'Das Gesundheitswesen ist besonders attraktiv: Krankenhäuser können sich keinen Ausfall leisten und zahlen oft schnell. Patientendaten erzielen hohe Preise im Darknet.',
      },
      {
        q: 'Was ist laut BSI die wichtigste Einzelmaßnahme gegen Ransomware?',
        options: [
          'Täglicher Virenscan',
          'Komplexere Passwörter',
          'Regelmäßige, offline gespeicherte Backups (3-2-1-Prinzip)',
          'Neuere Hardware kaufen',
        ],
        correct: 2,
        explain: 'BSI IT-Grundschutz: Das 3-2-1-Backup (3 Kopien, 2 Medien, 1 offline) macht Ransomware wirkungslos. Backups müssen vom Netz getrennt sein — sonst werden sie mitverschlüsselt.',
      },
    ],
  },
  {
    id: 'dsgvo',
    title: 'DSGVO & Datenschutz',
    subtitle: 'EU-Recht & Compliance',
    icon: '◉',
    color: '#A78BFA',
    colorDim: 'rgba(167,139,250,0.12)',
    source: 'EU-DSGVO · EDPB · EU AI Act',
    questions: [
      {
        q: 'Wie hoch ist das maximale Bußgeld nach der DSGVO (Art. 83)?',
        options: [
          '500.000 Euro',
          '10 Millionen Euro',
          '20 Millionen Euro oder 4% des weltweiten Jahresumsatzes',
          '100 Millionen Euro',
        ],
        correct: 2,
        explain: 'DSGVO Art. 83 Abs. 5: Bis zu 20 Millionen Euro oder 4% des gesamten weltweiten Jahresumsatzes — je nachdem, welcher Betrag höher ist.',
      },
      {
        q: 'Innerhalb welcher Frist muss eine Datenpanne der Aufsichtsbehörde gemeldet werden?',
        options: ['12 Stunden', '24 Stunden', '72 Stunden', '7 Tage'],
        correct: 2,
        explain: 'DSGVO Art. 33: Meldepflicht innerhalb von 72 Stunden nach Bekanntwerden. Bei Verzögerung muss die Verspätung begründet werden.',
      },
      {
        q: 'Meta wurde 2023 mit dem bisher höchsten DSGVO-Bußgeld belegt. Wie hoch war es?',
        options: ['390 Millionen Euro', '746 Millionen Euro', '1,2 Milliarden Euro', '4,5 Milliarden Euro'],
        correct: 2,
        explain: 'Die irische Datenschutzbehörde DPC verhängte im Mai 2023 ein Bußgeld von 1,2 Milliarden Euro gegen Meta wegen unzulässiger Datentransfers in die USA (Facebook).',
      },
      {
        q: 'Was regelt der EU AI Act (seit August 2024 in Kraft)?',
        options: [
          'Steuerrecht für KI-Unternehmen in der EU',
          'Ausschließlich militärische KI-Systeme',
          'Risikokategorien (verboten/hoch/gering) und Pflichten für KI-Anwendungen in der EU',
          'Urheberrecht an KI-generierten Inhalten',
        ],
        correct: 2,
        explain: 'Der EU AI Act ist das weltweit erste umfassende KI-Gesetz. Er verbietet z.B. Social Scoring und Echtzeit-Biometrie im öffentlichen Raum, fordert Transparenz bei Hochrisiko-KI.',
      },
      {
        q: 'Was gilt für ein Unternehmen, das einen Auftragsverarbeiter (z.B. Cloud-Anbieter) nutzt?',
        options: [
          'Der Auftragsverarbeiter trägt allein die Verantwortung',
          'Es braucht keinen Vertrag, wenn der Anbieter ISO-zertifiziert ist',
          'Es muss ein Auftragsverarbeitungsvertrag (AVV) nach Art. 28 DSGVO geschlossen werden',
          'Die DSGVO gilt nicht bei US-amerikanischen Anbietern',
        ],
        correct: 2,
        explain: 'DSGVO Art. 28: Jede Auslagerung personenbezogener Daten an Dritte erfordert einen AVV. Das Unternehmen bleibt datenschutzrechtlich verantwortlich.',
      },
    ],
  },
  {
    id: 'passwoerter',
    title: 'Passwörter & 2FA',
    subtitle: 'Authentifizierung',
    icon: '✦',
    color: '#FFB800',
    colorDim: 'rgba(255,184,0,0.12)',
    source: 'BSI · Hive Systems · NIST',
    questions: [
      {
        q: 'Laut Hive Systems 2024: Wie lange dauert es, ein 8-stelliges Kleinbuchstaben-Passwort zu knacken?',
        options: ['3 Tage', '12 Stunden', '2 Minuten', 'Unter 1 Sekunde'],
        correct: 3,
        explain: 'Hive Systems Password Table 2024: 8-stellige Passwörter aus nur Kleinbuchstaben werden in unter 1 Sekunde geknackt. Mit Zahlen und Sonderzeichen: ca. 8 Stunden.',
      },
      {
        q: 'Was ist "Credential Stuffing"?',
        options: [
          'Ein Tool zur automatischen Passwort-Erstellung',
          'Automatisches Testen geleakter Nutzername/Passwort-Kombinationen auf anderen Plattformen',
          'Eine Methode zur Passwortverschlüsselung',
          'Das Zurücksetzen von Passwörtern per SMS',
        ],
        correct: 1,
        explain: 'Milliarden gestohlene Login-Daten zirkulieren im Darknet. Credential Stuffing testet diese automatisiert auf anderen Diensten — gefährlich, weil viele Nutzer Passwörter wiederverwenden.',
      },
      {
        q: 'Welche 2FA-Methode ist laut NIST am sichersten gegen Phishing?',
        options: [
          'SMS-Code (TAN)',
          'E-Mail-Bestätigungslink',
          'TOTP-App (Google Authenticator)',
          'Hardware-Sicherheitsschlüssel (FIDO2/WebAuthn)',
        ],
        correct: 3,
        explain: 'FIDO2/WebAuthn-Schlüssel (z.B. YubiKey) sind phishing-resistent: Die Authentifizierung ist an die echte Domain gebunden — funktioniert auf Fakeseiten gar nicht.',
      },
      {
        q: 'Welche Mindestlänge empfiehlt das BSI (Grundschutz) für Passwörter normaler Nutzerkonten?',
        options: ['6 Zeichen', '8 Zeichen', '12 Zeichen', '20 Zeichen'],
        correct: 2,
        explain: 'BSI IT-Grundschutz ORP.4: Mindestens 12 Zeichen, mit Groß-/Kleinbuchstaben, Zahlen und Sonderzeichen — oder alternativ 25 Zeichen reine Buchstaben.',
      },
      {
        q: 'Was empfiehlt das NIST (SP 800-63B) seit 2017 ausdrücklich NICHT mehr?',
        options: [
          '2-Faktor-Authentifizierung',
          'Passwort-Manager zu nutzen',
          'Erzwungene regelmäßige Passwortänderungen ohne konkreten Anlass',
          'Lange Passwörter (>15 Zeichen)',
        ],
        correct: 2,
        explain: 'NIST 800-63B: Regelmäßige Passwortrotation ohne Anlass ist kontraproduktiv — Nutzer wählen schwächere Passwörter. Änderung nur bei Kompromittierung empfohlen.',
      },
    ],
  },
  {
    id: 'unternehmen',
    title: 'Unternehmenssicherheit',
    subtitle: 'IT-Security & Compliance',
    icon: '▣',
    color: '#00D4A0',
    colorDim: 'rgba(0,212,160,0.12)',
    source: 'IBM Cost of Breach · BSI Lagebericht · Verizon DBIR',
    questions: [
      {
        q: 'Laut IBM Cost of a Data Breach Report 2023: Wie hoch waren die durchschnittlichen Kosten einer Datenpanne weltweit?',
        options: ['1,2 Mio. $', '2,8 Mio. $', '4,45 Mio. $', '9,8 Mio. $'],
        correct: 2,
        explain: 'IBM 2023: Durchschnittliche Kosten einer Datenpanne stiegen auf 4,45 Millionen Dollar — Rekordwert. In Deutschland: 4,67 Millionen Dollar (über dem Weltdurchschnitt).',
      },
      {
        q: 'Was beschreibt das IT-Sicherheitsprinzip "Least Privilege"?',
        options: [
          'Alle Mitarbeiter erhalten Admin-Rechte zur einfacheren Arbeit',
          'Nutzer und Systeme erhalten nur die minimal notwendigen Zugriffsrechte',
          'Privilegierte Accounts werden täglich rotiert',
          'Nur Vorgesetzte haben Zugriff auf sensible Systeme',
        ],
        correct: 1,
        explain: '"Principle of Least Privilege" (PoLP): Jeder Nutzer, Prozess und jedes System erhält nur die Rechte, die für seine Aufgabe zwingend nötig sind — minimiert Schadenspotenzial bei Kompromittierung.',
      },
      {
        q: 'Was ist ein "Zero-Day-Exploit"?',
        options: [
          'Ein Angriff, der innerhalb von 24 Stunden abläuft',
          'Ein erster Angriff auf ein neu gegründetes Unternehmen',
          'Angriff auf eine Sicherheitslücke, die dem Hersteller noch unbekannt und ungepatch ist',
          'Eine Malware, die sich selbst nach 0 Tagen löscht',
        ],
        correct: 2,
        explain: '"Zero Days" bezeichnet die Tage, die der Hersteller hatte, um zu reagieren — nämlich null. Solche Exploits werden im Darknet für Millionen Dollar gehandelt.',
      },
      {
        q: 'Laut Verizon DBIR 2023: Welcher Faktor ist an den meisten Datenpannen beteiligt?',
        options: [
          'Ungepatchte Software',
          'Menschliches Fehlverhalten (Human Element)',
          'Schwache Verschlüsselung',
          'Physischer Einbruch in Rechenzentren',
        ],
        correct: 1,
        explain: 'Verizon DBIR 2023: 74% aller Datenpannen involvieren den "Human Element" — Phishing, Fehler, Missbrauch von Zugangsdaten. Technik allein reicht nicht.',
      },
      {
        q: 'Was ist der Zweck eines professionellen Penetrationstests (Pentest)?',
        options: [
          'Mitarbeiter ohne deren Wissen auf Compliance zu prüfen',
          'Netzwerkgeschwindigkeit unter Last zu messen',
          'Autorisierter Hacking-Versuch zur systematischen Aufdeckung realer Sicherheitslücken',
          'Automatische Installation von Software-Updates',
        ],
        correct: 2,
        explain: 'Pentests simulieren echte Angriffe mit ausdrücklicher Genehmigung. Das Ergebnis ist ein Bericht mit konkreten Schwachstellen und Handlungsempfehlungen — kein reines Compliance-Tool.',
      },
    ],
  },
];

/* ─── Typewriter Hook ───────────────────────────────────────── */
function useTypewriter(text: string, speed = 20, active = true) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);
  useEffect(() => {
    if (!active) { setDisplayed(text); setDone(true); return; }
    setDisplayed(''); setDone(false);
    let i = 0;
    const iv = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) { clearInterval(iv); setDone(true); }
    }, speed);
    return () => clearInterval(iv);
  }, [text, speed, active]);
  return { displayed, done };
}

/* ─── Component ─────────────────────────────────────────────── */
export default function RobotSection() {
  const [phase, setPhase] = useState<'select' | 'quiz' | 'result'>('select');
  const [topicIdx, setTopicIdx] = useState<number | null>(null);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [showExplain, setShowExplain] = useState(false);
  const [typeActive, setTypeActive] = useState(false);

  const robotContainerRef = useRef<HTMLDivElement>(null);
  const topic = topicIdx !== null ? QUIZ_TOPICS[topicIdx] : null;
  const q = topic?.questions[current];
  const score = answers.filter(Boolean).length;

  const { displayed: qDisplayed, done: qDone } = useTypewriter(q?.q ?? '', 18, typeActive);

  useEffect(() => {
    if (phase === 'quiz') {
      setTypeActive(false);
      const t = setTimeout(() => setTypeActive(true), 60);
      return () => clearTimeout(t);
    }
  }, [current, phase]);

  function startTopic(idx: number) {
    setTopicIdx(idx);
    setCurrent(0);
    setAnswers([]);
    setSelected(null);
    setShowExplain(false);
    setPhase('quiz');
  }

  function handleSelect(idx: number) {
    if (selected !== null || !q) return;
    setSelected(idx);
    setAnswers(prev => [...prev, q.options[idx] === q.options[q.correct]]);
    setTimeout(() => setShowExplain(true), 350);
  }

  // Forward global pointer events to Spline canvas — clamped to canvas bounds
  // so Spline always sees coordinates "inside" the canvas while direction is preserved
  useEffect(() => {
    const handleGlobalMove = (e: MouseEvent) => {
      const canvas = robotContainerRef.current?.querySelector('canvas');
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();

      // Map the real cursor to the canvas center + direction, clamped to canvas bounds
      // This way the robot always looks toward the real mouse, never ignores it
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;

      // Clamp within canvas, preserving direction (90% of half-size to keep away from edge)
      const maxX = rect.width * 0.45;
      const maxY = rect.height * 0.45;
      const len = Math.sqrt(dx * dx + dy * dy) || 1;
      const clampedLen = Math.min(len, Math.max(maxX, maxY));
      const scale = clampedLen / len;

      const mappedX = cx + dx * scale;
      const mappedY = cy + dy * scale;

      // Dispatch pointermove (what Spline actually listens to internally)
      canvas.dispatchEvent(new PointerEvent('pointermove', {
        clientX: mappedX,
        clientY: mappedY,
        bubbles: true,
        cancelable: true,
        pointerType: 'mouse',
        isPrimary: true,
      }));
      // Also dispatch mousemove as fallback
      canvas.dispatchEvent(new MouseEvent('mousemove', {
        clientX: mappedX,
        clientY: mappedY,
        bubbles: true,
        cancelable: true,
      }));
    };

    window.addEventListener('mousemove', handleGlobalMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleGlobalMove);
  }, []);

  function next() {
    if (!topic) return;
    if (current + 1 >= topic.questions.length) { setPhase('result'); return; }
    setCurrent(c => c + 1);
    setSelected(null);
    setShowExplain(false);
  }

  function reset() {
    setPhase('select');
    setTopicIdx(null);
    setCurrent(0);
    setAnswers([]);
    setSelected(null);
    setShowExplain(false);
  }

  const accentColor = topic?.color ?? '#00F0FF';

  const SCORE_META = [
    { max: 1, label: 'Kritisches Risiko', grade: 'F', color: '#FF3B5C' },
    { max: 2, label: 'Gefährdet', grade: 'D', color: '#FF7A00' },
    { max: 3, label: 'Basisschutz', grade: 'C', color: '#FFB800' },
    { max: 4, label: 'Solide', grade: 'B', color: '#00D4A0' },
    { max: 5, label: 'Experte', grade: 'A+', color: '#00F0FF' },
  ];
  const resultMeta = SCORE_META.find(m => score <= m.max) ?? SCORE_META[4];

  return (
    <section style={{
      position: 'relative',
      width: '100%',
      overflow: 'hidden',
      background: '#060B18',
      borderBottom: '1px solid rgba(0,240,255,0.08)',
    }}>
      {/* Grid ambient */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'linear-gradient(rgba(0,240,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(0,240,255,0.025) 1px, transparent 1px)',
        backgroundSize: '48px 48px',
        maskImage: 'radial-gradient(ellipse 80% 80% at 50% 40%, black 10%, transparent 100%)',
      }} />

      <style>{`
        @keyframes blink { 0%,100%{opacity:1}50%{opacity:0} }
        @keyframes scandown {
          0%{top:0;opacity:0} 5%{opacity:1} 95%{opacity:1} 100%{top:100%;opacity:0}
        }
        .scan-line {
          position: absolute; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(0,240,255,0.5), transparent);
          animation: scandown 5s linear infinite;
          pointer-events: none; z-index: 3;
        }
      `}</style>

      {/* Layout: robot left + interface right */}
      <div style={{
        position: 'relative',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: 'clamp(32px, 5vw, 64px) 24px',
        display: 'grid',
        gridTemplateColumns: 'minmax(280px, 480px) 1fr',
        gap: '32px',
        alignItems: 'center',
        zIndex: 2,
      }}>

        {/* ─── LEFT: Robot ────────────────────────────────── */}
        <div style={{ position: 'relative' }}>
          {/* Badge */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            fontFamily: 'var(--mono)', fontSize: '9px', letterSpacing: '0.18em',
            color: 'rgba(0,240,255,0.5)', textTransform: 'uppercase',
            border: '1px solid rgba(0,240,255,0.12)',
            padding: '5px 12px', borderRadius: '100px',
            background: 'rgba(0,240,255,0.04)',
            marginBottom: '12px',
          }}>
            <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#00F0FF', animation: 'blink 1.4s ease-in-out infinite' }} />
            KI-SICHERHEITS-ANALYSE
          </div>

          {/* Robot canvas */}
          <div ref={robotContainerRef} style={{
            position: 'relative',
            height: 'clamp(380px, 45vw, 560px)',
            borderRadius: '16px',
            overflow: 'hidden',
            border: phase === 'quiz' ? `1px solid ${accentColor}25` : '1px solid rgba(0,240,255,0.08)',
            transition: 'border-color 0.4s',
            background: 'rgba(0,0,0,0.2)',
          }}>
            <div className="scan-line" />

            {/* Glow behind robot */}
            <div style={{
              position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)',
              width: '60%', height: '40%',
              background: `radial-gradient(ellipse, ${accentColor}12 0%, transparent 70%)`,
              transition: 'all 0.5s',
              pointerEvents: 'none', zIndex: 0,
            }} />

            <SplineScene
              scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
              className="w-full h-full"
            />

            {/* Corner decorators */}
            {['tl', 'tr', 'bl', 'br'].map(pos => (
              <div key={pos} style={{
                position: 'absolute',
                top: pos.startsWith('t') ? 8 : 'auto',
                bottom: pos.startsWith('b') ? 8 : 'auto',
                left: pos.endsWith('l') ? 8 : 'auto',
                right: pos.endsWith('r') ? 8 : 'auto',
                width: 16, height: 16,
                borderTop: pos.startsWith('t') ? `1px solid ${accentColor}40` : 'none',
                borderBottom: pos.startsWith('b') ? `1px solid ${accentColor}40` : 'none',
                borderLeft: pos.endsWith('l') ? `1px solid ${accentColor}40` : 'none',
                borderRight: pos.endsWith('r') ? `1px solid ${accentColor}40` : 'none',
                transition: 'border-color 0.4s',
              }} />
            ))}

            {/* Progress bar inside robot box */}
            {phase === 'quiz' && (
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '3px', background: 'rgba(255,255,255,0.05)', zIndex: 5 }}>
                <motion.div
                  animate={{ width: `${((current + 1) / (topic?.questions.length ?? 5)) * 100}%` }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  style={{ height: '100%', background: `linear-gradient(90deg, ${accentColor}80, ${accentColor})` }}
                />
              </div>
            )}
          </div>

          {/* Source citation */}
          {topic && phase !== 'select' && (
            <div style={{
              marginTop: '8px',
              fontFamily: 'var(--mono)', fontSize: '9px', letterSpacing: '0.1em',
              color: 'rgba(255,255,255,0.2)', textAlign: 'center',
            }}>
              Quellen: {topic.source}
            </div>
          )}
        </div>

        {/* ─── RIGHT: Interface ───────────────────────────── */}
        <div style={{ position: 'relative', minHeight: '480px', display: 'flex', flexDirection: 'column' }}>
          <AnimatePresence mode="wait">

            {/* ── SELECT SCREEN ─────────────────────── */}
            {phase === 'select' && (
              <motion.div
                key="select"
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.35 }}
                style={{ flex: 1, display: 'flex', flexDirection: 'column' }}
              >
                <div style={{ marginBottom: '24px' }}>
                  <h2 style={{
                    fontFamily: 'var(--font)',
                    fontSize: 'clamp(24px, 3vw, 36px)',
                    fontWeight: 800,
                    color: '#E8F0FF',
                    letterSpacing: '-0.03em',
                    lineHeight: 1.1,
                    marginBottom: '8px',
                  }}>
                    Teste dein Wissen<br />
                    <span style={{ color: '#00F0FF' }}>zu KI-Sicherheit</span>
                  </h2>
                  <p style={{
                    fontFamily: 'var(--font)', fontSize: '14px',
                    color: 'rgba(255,255,255,0.4)', lineHeight: 1.6,
                  }}>
                    5 Themen · je 5 Fragen · faktenbasiert
                  </p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 }}>
                  {QUIZ_TOPICS.map((t, i) => (
                    <motion.button
                      key={t.id}
                      onClick={() => startTopic(i)}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.07 }}
                      style={{
                        display: 'flex', alignItems: 'center', gap: '16px',
                        padding: '16px 20px',
                        background: t.colorDim,
                        border: `1px solid ${t.color}25`,
                        borderRadius: '12px',
                        cursor: 'pointer',
                        textAlign: 'left',
                        transition: 'all 0.2s',
                      }}
                      whileHover={{ borderColor: `${t.color}60`, scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                    >
                      <span style={{
                        width: '40px', height: '40px', flexShrink: 0,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        background: `${t.color}15`,
                        border: `1px solid ${t.color}30`,
                        borderRadius: '10px',
                        fontSize: '18px', color: t.color,
                        fontFamily: 'var(--mono)',
                      }}>
                        {t.icon}
                      </span>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontFamily: 'var(--font)', fontSize: '15px', fontWeight: 700, color: '#E8F0FF', lineHeight: 1.2 }}>
                          {t.title}
                        </div>
                        <div style={{ fontFamily: 'var(--mono)', fontSize: '10px', color: t.color, letterSpacing: '0.08em', marginTop: '2px' }}>
                          {t.subtitle}
                        </div>
                      </div>
                      <span style={{ fontFamily: 'var(--mono)', fontSize: '11px', color: 'rgba(255,255,255,0.2)' }}>
                        5 Fragen →
                      </span>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* ── QUIZ ──────────────────────────────── */}
            {phase === 'quiz' && topic && (
              <motion.div
                key={`quiz-${current}`}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.3 }}
                style={{ flex: 1, display: 'flex', flexDirection: 'column' }}
              >
                {/* Topic + progress header */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <button onClick={reset} style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    fontFamily: 'var(--mono)', fontSize: '10px',
                    color: 'rgba(255,255,255,0.25)', letterSpacing: '0.1em',
                    transition: 'color 0.2s', padding: 0,
                  }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.5)'}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.25)'}
                  >
                    ← Themen
                  </button>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontFamily: 'var(--mono)', fontSize: '10px', color: accentColor, letterSpacing: '0.1em' }}>
                      {topic.icon} {topic.title.toUpperCase()}
                    </span>
                    <span style={{
                      fontFamily: 'var(--mono)', fontSize: '10px',
                      color: 'rgba(255,255,255,0.25)',
                    }}>
                      {current + 1}/{topic.questions.length}
                    </span>
                  </div>
                </div>

                {/* Speech bubble */}
                <div style={{
                  position: 'relative',
                  background: 'rgba(0,0,0,0.3)',
                  border: `1px solid ${accentColor}25`,
                  borderRadius: '12px 12px 12px 4px',
                  padding: '18px 20px',
                  marginBottom: '16px',
                  minHeight: '80px',
                }}>
                  <div style={{
                    position: 'absolute', top: -1, left: -1, width: 18, height: 18,
                    borderTop: `1px solid ${accentColor}60`, borderLeft: `1px solid ${accentColor}60`,
                    borderRadius: '12px 0 0 0',
                  }} />
                  <p style={{
                    fontFamily: 'var(--font)', fontSize: 'clamp(14px, 1.5vw, 16px)',
                    color: '#D0DCEF', lineHeight: 1.65, margin: 0,
                  }}>
                    {qDisplayed}
                    {!qDone && <span style={{ animation: 'blink 0.7s ease-in-out infinite', color: accentColor }}>▌</span>}
                  </p>
                </div>

                {/* Options */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
                  {qDone && q?.options.map((opt, idx) => {
                    const isSelected = selected === idx;
                    const isCorrect = idx === q.correct;
                    const revealed = selected !== null;
                    let bg = 'rgba(255,255,255,0.02)';
                    let border = 'rgba(255,255,255,0.07)';
                    let color = 'rgba(255,255,255,0.65)';
                    if (revealed) {
                      if (isCorrect) { bg = 'rgba(0,240,160,0.07)'; border = 'rgba(0,240,160,0.3)'; color = '#00F0A0'; }
                      else if (isSelected) { bg = 'rgba(255,59,92,0.07)'; border = 'rgba(255,59,92,0.3)'; color = '#FF3B5C'; }
                      else { border = 'rgba(255,255,255,0.03)'; color = 'rgba(255,255,255,0.25)'; }
                    }
                    return (
                      <motion.button
                        key={idx}
                        onClick={() => handleSelect(idx)}
                        initial={{ opacity: 0, x: -6 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.06 }}
                        whileHover={selected === null ? { borderColor: `${accentColor}40`, backgroundColor: `${accentColor}06` } : {}}
                        style={{
                          display: 'flex', alignItems: 'flex-start', gap: '12px',
                          padding: '12px 16px',
                          background: bg, border: `1px solid ${border}`,
                          borderRadius: '10px', color,
                          fontFamily: 'var(--font)', fontSize: '13px', lineHeight: 1.5,
                          textAlign: 'left', cursor: selected !== null ? 'default' : 'pointer',
                          transition: 'all 0.2s',
                        }}
                      >
                        <span style={{
                          fontFamily: 'var(--mono)', fontSize: '10px', fontWeight: 800,
                          color: revealed ? (isCorrect ? '#00F0A0' : (isSelected ? '#FF3B5C' : 'rgba(255,255,255,0.15)')) : `${accentColor}70`,
                          flexShrink: 0, marginTop: '2px', minWidth: '14px',
                        }}>
                          {revealed ? (isCorrect ? '✓' : (isSelected ? '✗' : String.fromCharCode(65 + idx))) : String.fromCharCode(65 + idx)}
                        </span>
                        {opt}
                      </motion.button>
                    );
                  })}
                </div>

                {/* Explain + Next */}
                <AnimatePresence>
                  {showExplain && (
                    <motion.div
                      initial={{ opacity: 0, height: 0, marginTop: 0 }}
                      animate={{ opacity: 1, height: 'auto', marginTop: 12 }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      <div style={{
                        padding: '12px 16px', borderRadius: '10px', marginBottom: '10px',
                        background: answers[answers.length - 1] ? 'rgba(0,240,160,0.05)' : 'rgba(255,59,92,0.05)',
                        border: `1px solid ${answers[answers.length - 1] ? 'rgba(0,240,160,0.2)' : 'rgba(255,59,92,0.2)'}`,
                      }}>
                        <div style={{
                          fontFamily: 'var(--mono)', fontSize: '9px', letterSpacing: '0.18em',
                          textTransform: 'uppercase', marginBottom: '5px',
                          color: answers[answers.length - 1] ? '#00F0A0' : '#FF3B5C',
                        }}>
                          {answers[answers.length - 1] ? '[ KORREKT ]' : '[ FALSCH ]'} — Erklärung:
                        </div>
                        <p style={{ fontFamily: 'var(--font)', fontSize: '12px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, margin: 0 }}>
                          {q?.explain}
                        </p>
                      </div>
                      <button onClick={next} style={{
                        width: '100%', padding: '13px',
                        background: `${accentColor}10`, border: `1px solid ${accentColor}30`,
                        borderRadius: '10px', color: accentColor,
                        fontFamily: 'var(--mono)', fontSize: '11px', fontWeight: 700,
                        letterSpacing: '0.12em', textTransform: 'uppercase', cursor: 'pointer',
                        transition: 'all 0.2s',
                      }}
                        onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = `${accentColor}18`}
                        onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = `${accentColor}10`}
                      >
                        {current + 1 >= (topic?.questions.length ?? 5) ? 'Auswertung →' : `Weiter (${current + 1}/${topic?.questions.length}) →`}
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}

            {/* ── RESULT ────────────────────────────── */}
            {phase === 'result' && topic && (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                style={{ flex: 1, display: 'flex', flexDirection: 'column' }}
              >
                {/* Grade */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '24px' }}>
                  <div style={{
                    width: '68px', height: '68px', flexShrink: 0,
                    border: `2px solid ${resultMeta.color}`,
                    borderRadius: '12px',
                    background: `${resultMeta.color}10`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: `0 0 20px ${resultMeta.color}20`,
                  }}>
                    <span style={{ fontFamily: 'var(--mono)', fontSize: '24px', fontWeight: 900, color: resultMeta.color }}>
                      {resultMeta.grade}
                    </span>
                  </div>
                  <div>
                    <div style={{ fontFamily: 'var(--mono)', fontSize: '9px', letterSpacing: '0.15em', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', marginBottom: '4px' }}>
                      {topic.icon} {topic.title} — Ergebnis
                    </div>
                    <div style={{ fontFamily: 'var(--font)', fontSize: '22px', fontWeight: 800, color: resultMeta.color }}>
                      {resultMeta.label}
                    </div>
                    <div style={{ fontFamily: 'var(--mono)', fontSize: '10px', color: 'rgba(255,255,255,0.3)', marginTop: '2px' }}>
                      {score} von {topic.questions.length} richtig
                    </div>
                  </div>
                </div>

                {/* Score bar */}
                <div style={{ marginBottom: '20px' }}>
                  <div style={{ height: '5px', background: 'rgba(255,255,255,0.05)', borderRadius: '3px', overflow: 'hidden' }}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(score / topic.questions.length) * 100}%` }}
                      transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
                      style={{ height: '100%', background: `linear-gradient(90deg, ${resultMeta.color}70, ${resultMeta.color})`, borderRadius: '3px' }}
                    />
                  </div>
                </div>

                {/* Answer breakdown */}
                <div style={{ display: 'flex', gap: '6px', marginBottom: '20px' }}>
                  {answers.map((correct, i) => (
                    <motion.div key={i}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.07 }}
                      style={{
                        flex: 1, height: '28px', borderRadius: '5px',
                        background: correct ? 'rgba(0,240,160,0.1)' : 'rgba(255,59,92,0.1)',
                        border: `1px solid ${correct ? 'rgba(0,240,160,0.25)' : 'rgba(255,59,92,0.25)'}`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontFamily: 'var(--mono)', fontSize: '11px',
                        color: correct ? '#00F0A0' : '#FF3B5C',
                      }}
                    >
                      {correct ? '✓' : '✗'}
                    </motion.div>
                  ))}
                </div>

                {/* CTA */}
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  <button onClick={reset} style={{
                    flex: 1, minWidth: '140px', padding: '13px 16px',
                    background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '10px', color: 'rgba(255,255,255,0.5)',
                    fontFamily: 'var(--mono)', fontSize: '11px', fontWeight: 700,
                    letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.07)'}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)'}
                  >
                    ← Anderes Thema
                  </button>
                  <button onClick={() => startTopic(topicIdx!)} style={{
                    flex: 1, minWidth: '140px', padding: '13px 16px',
                    background: `${topic.color}10`, border: `1px solid ${topic.color}30`,
                    borderRadius: '10px', color: topic.color,
                    fontFamily: 'var(--mono)', fontSize: '11px', fontWeight: 700,
                    letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = `${topic.color}18`}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = `${topic.color}10`}
                  >
                    ↺ Wiederholen
                  </button>
                  <a href="/de/tools" style={{
                    flex: 1, minWidth: '140px', padding: '13px 16px',
                    background: 'rgba(0,240,255,0.08)', border: '1px solid rgba(0,240,255,0.25)',
                    borderRadius: '10px', color: '#00F0FF',
                    fontFamily: 'var(--mono)', fontSize: '11px', fontWeight: 700,
                    letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer',
                    textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'all 0.2s',
                  }}>
                    Sicherheit prüfen →
                  </a>
                </div>

                <div style={{
                  marginTop: '16px',
                  fontFamily: 'var(--mono)', fontSize: '9px', letterSpacing: '0.08em',
                  color: 'rgba(255,255,255,0.15)', textAlign: 'center',
                }}>
                  Quellen: {topic.source}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Responsive: stack on mobile */}
      <style>{`
        @media (max-width: 700px) {
          .robot-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
