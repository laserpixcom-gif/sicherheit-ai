'use client';

import { SplineScene } from '@/components/ui/splite';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const QUIZ_TOPICS = [
  {
    id: 'phishing', title: 'KI-Phishing', icon: '◈', color: '#00F0FF',
    source: 'SlashNext · Proofpoint · CISA',
    questions: [
      { q: 'Um wie viel Prozent sind KI-Phishing-Mails laut SlashNext 2023 gestiegen?', options: ['120%', '210%', '340%', '580%'], correct: 2, explain: 'SlashNext 2023: +340% KI-Phishing gegenüber Vorjahr, angetrieben durch Tools wie WormGPT.' },
      { q: 'Was unterscheidet Spear-Phishing von herkömmlichem Phishing?', options: ['Phishing per SMS', 'Gezielter Angriff mit persönlichen Daten', 'Automatisierter Massenversand', 'Nur auf mobile Geräte'], correct: 1, explain: 'Spear-Phishing nutzt persönliche Daten für überzeugende Angriffe. KI automatisiert diese Personalisierung massenhaft.' },
      { q: 'Was ermöglicht WormGPT kriminellen Angreifern?', options: ['Stärkere Passwörter', 'Sicherheitslücken patchen', 'Fehlerfreie Phishing-Mails in jeder Sprache', 'VPN-Tunnel'], correct: 2, explain: 'WormGPT schreibt fehlerfreie Phishing-Mails in jeder Sprache. Schlechtes Deutsch als Erkennungsmerkmal versagt.' },
      { q: 'Typisches Merkmal einer Phishing-Domain:', options: ['HTTPS vorhanden', 'Sehr kurze URL', 'Echte Marke als Subdomain (paypal.evil.com)', 'Professionelles Logo'], correct: 2, explain: 'Die echte Domain steht vor dem letzten Punkt. Bei paypal.evil-site.com ist evil-site.com die echte Domain.' },
      { q: 'Laut Proofpoint: Wie viel Prozent aller Angriffe beginnen mit Phishing?', options: ['41%', '67%', '91%', '99%'], correct: 2, explain: 'Proofpoint State of the Phish 2023: 91% aller Cyberangriffe starten mit einer Phishing-Mail.' },
    ],
  },
  {
    id: 'ransomware', title: 'Ransomware', icon: '◆', color: '#FF3B5C',
    source: 'Sophos · IBM X-Force · Cybersecurity Ventures',
    questions: [
      { q: 'Laut Sophos 2023: Durchschnittliche Lösegeldzahlung?', options: ['250T USD', '540T USD', '1,54 Mio. USD', '8,2 Mio. USD'], correct: 2, explain: 'Sophos 2023: Ø-Zahlung 1,54 Mio. USD. 40% der Zahler erhielten trotzdem nicht alle Daten zurück.' },
      { q: 'Was bedeutet "Double Extortion"?', options: ['Zweimalige Forderung', 'Daten verschlüsselt UND gestohlen', 'Zwei Systeme gleichzeitig', 'Lösegeld verdoppelt nach 24h'], correct: 1, explain: 'Daten werden vor der Verschlüsselung gestohlen. Selbst mit Backup bleibt die Veröffentlichungsdrohung bestehen.' },
      { q: 'Was ist Ransomware-as-a-Service (RaaS)?', options: ['Legaler Cloud-Backup', 'Antivirus im Abo', 'Kriminelle vermieten Ransomware gegen Umsatzbeteiligung', 'Staatliches Frühwarnsystem'], correct: 2, explain: 'RaaS-Gruppen wie LockBit vermieten Ransomware an Affiliates, meist 20-30% der erpressten Summe.' },
      { q: 'Häufigstes Ransomware-Ziel laut IBM X-Force 2023?', options: ['Banken', 'Gesundheitswesen', 'Einzelhandel', 'Automobilindustrie'], correct: 1, explain: 'Krankenhäuser zahlen schnell, sie können keinen Ausfall tolerieren. Patientendaten erzielen hohe Darknet-Preise.' },
      { q: 'Wichtigste BSI-Schutzmaßnahme gegen Ransomware?', options: ['Täglicher Virenscan', 'Komplexere Passwörter', 'Offline-Backups nach 3-2-1-Prinzip', 'Neuere Hardware'], correct: 2, explain: 'BSI: 3-2-1-Backup (3 Kopien, 2 Medien, 1 offline) macht Ransomware wirkungslos. Backups müssen vom Netz getrennt sein.' },
    ],
  },
  {
    id: 'dsgvo', title: 'DSGVO', icon: '◉', color: '#A78BFA',
    source: 'EU-DSGVO · EDPB · EU AI Act',
    questions: [
      { q: 'Maximales Bußgeld nach DSGVO Art. 83?', options: ['500T Euro', '10 Mio. Euro', '20 Mio. Euro oder 4% Jahresumsatz', '100 Mio. Euro'], correct: 2, explain: 'DSGVO Art. 83: Bis zu 20 Mio. Euro oder 4% des weltweiten Jahresumsatzes, je nachdem was höher ist.' },
      { q: 'Meldefrist für Datenpannen an die Aufsichtsbehörde?', options: ['12 Stunden', '24 Stunden', '72 Stunden', '7 Tage'], correct: 2, explain: 'DSGVO Art. 33: Meldepflicht innerhalb 72 Stunden nach Bekanntwerden bei der zuständigen Aufsichtsbehörde.' },
      { q: 'Rekord-Bußgeld gegen Meta 2023?', options: ['390 Mio. Euro', '746 Mio. Euro', '1,2 Mrd. Euro', '4,5 Mrd. Euro'], correct: 2, explain: 'Irische DPC: 1,2 Mrd. Euro gegen Meta im Mai 2023 wegen unzulässiger Datentransfers in die USA.' },
      { q: 'Was regelt der EU AI Act seit August 2024?', options: ['KI-Steuerrecht', 'Nur militärische KI', 'Risikokategorien und Pflichten für KI-Systeme', 'KI-Urheberrecht'], correct: 2, explain: 'EU AI Act: Weltweit erstes KI-Gesetz. Verbietet Social Scoring, fordert Transparenz bei Hochrisiko-KI.' },
      { q: 'Was braucht ein Unternehmen beim Einsatz von Cloud-Diensten?', options: ['Nichts bei ISO-Zertifizierung', 'Keinen Vertrag bei US-Anbietern', 'Auftragsverarbeitungsvertrag (AVV) nach Art. 28', 'Nur interne Genehmigung'], correct: 2, explain: 'DSGVO Art. 28: Jede Auslagerung personenbezogener Daten erfordert einen AVV. Das Unternehmen bleibt verantwortlich.' },
    ],
  },
  {
    id: 'passwoerter', title: 'Passwörter', icon: '✦', color: '#FFB800',
    source: 'BSI · Hive Systems · NIST SP 800-63B',
    questions: [
      { q: 'Hive Systems 2024: Wie schnell wird ein 8-stelliges Kleinbuchstaben-PW geknackt?', options: ['3 Tage', '12 Stunden', '2 Minuten', 'Unter 1 Sekunde'], correct: 3, explain: 'Hive Systems 2024: 8-stellige Passwörter aus Kleinbuchstaben in unter 1 Sekunde. Mit Sonderzeichen ca. 8 Stunden.' },
      { q: 'Was ist "Credential Stuffing"?', options: ['Passwort-Erstellungstool', 'Geleakte Logins auf anderen Diensten testen', 'Passwortverschlüsselung', 'Passwort-Reset per SMS'], correct: 1, explain: 'Milliarden geleakter Logins werden automatisiert auf anderen Diensten getestet. Passwort-Wiederverwendung ist fatal.' },
      { q: 'Sicherste 2FA-Methode gegen Phishing (NIST)?', options: ['SMS-TAN', 'E-Mail-Link', 'TOTP-App', 'FIDO2 WebAuthn-Schlüssel'], correct: 3, explain: 'FIDO2/WebAuthn (z.B. YubiKey) ist phishing-resistent: Authentifizierung ist an die echte Domain gebunden.' },
      { q: 'BSI-Mindestlänge für normale Benutzerpasswörter?', options: ['6 Zeichen', '8 Zeichen', '12 Zeichen', '20 Zeichen'], correct: 2, explain: 'BSI IT-Grundschutz ORP.4: Mindestens 12 Zeichen mit Groß-/Kleinbuchstaben, Zahlen und Sonderzeichen.' },
      { q: 'Was empfiehlt NIST SP 800-63B ausdrücklich NICHT mehr?', options: ['2FA nutzen', 'Passwort-Manager', 'Regelmäßige Passwortrotation ohne Anlass', 'Lange Passwörter'], correct: 2, explain: 'NIST: Erzwungene Rotation führt zu schwächeren Passwörtern. Änderung nur bei tatsächlicher Kompromittierung.' },
    ],
  },
  {
    id: 'unternehmen', title: 'IT-Security', icon: '▣', color: '#00D4A0',
    source: 'IBM Cost of Breach · BSI · Verizon DBIR',
    questions: [
      { q: 'IBM 2023: Durchschnittliche Kosten einer Datenpanne weltweit?', options: ['1,2 Mio. USD', '2,8 Mio. USD', '4,45 Mio. USD', '9,8 Mio. USD'], correct: 2, explain: 'IBM 2023: Ø 4,45 Mio. USD, Rekord. Deutschland: 4,67 Mio. USD, über dem Weltdurchschnitt.' },
      { q: 'Was beschreibt das Prinzip "Least Privilege"?', options: ['Alle erhalten Admin-Rechte', 'Nur minimal notwendige Rechte vergeben', 'Tägliche Rotation von Accounts', 'Nur Vorgesetzte haben Zugang'], correct: 1, explain: 'Principle of Least Privilege: Minimiert Schaden bei Kompromittierung. Jeder bekommt nur was er zwingend benötigt.' },
      { q: 'Was ist ein "Zero-Day-Exploit"?', options: ['Angriff innerhalb 24h', 'Erster Angriff auf ein Startup', 'Angriff auf unbekannte, ungepatchte Lücke', 'Malware die sich selbst löscht'], correct: 2, explain: 'Zero Days = Tage die der Hersteller hatte zu reagieren, nämlich null. Solche Exploits kosten Millionen im Darknet.' },
      { q: 'Verizon DBIR 2023: Häufigster Faktor bei Datenpannen?', options: ['Ungepatchte Software', 'Menschliches Fehlverhalten (74%)', 'Schwache Verschlüsselung', 'Physischer Einbruch'], correct: 1, explain: 'Verizon DBIR 2023: 74% aller Datenpannen involvieren den Human Element. Technik allein reicht nicht.' },
      { q: 'Zweck eines Penetrationstests?', options: ['Mitarbeiter heimlich prüfen', 'Netzwerkgeschwindigkeit messen', 'Autorisierter Angriff zur Aufdeckung realer Schwachstellen', 'Automatische Updates'], correct: 2, explain: 'Pentests simulieren echte Angriffe mit Genehmigung. Ergebnis: Bericht mit konkreten Schwachstellen und Empfehlungen.' },
    ],
  },
];

// 5 bars, perfectly symmetric in viewBox 0-100
// BAR_W=4, side margin=10, gap=15 → bars at 10,29,48,67,86 → centers 12,31,50,69,88
const BAR_X = [10, 29, 48, 67, 86];
const BAR_W = 4;

type BarState = 'hidden' | 'solid' | 'broken';

type CompletedTest = {
  topicId: string;
  topicTitle: string;
  topicIcon: string;
  color: string;
  score: number;
  total: number;
  answers: boolean[];
  barStates: BarState[];
};

function PrisonOverlay({ bars, solidCount, showScaffold }: { bars: BarState[], solidCount: number, showScaffold: boolean }) {
  if (!showScaffold) return null;

  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 10, pointerEvents: 'none' }}
    >
      <defs>
        <linearGradient id="railGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#222" />
          <stop offset="20%" stopColor="#888" />
          <stop offset="50%" stopColor="#ccc" />
          <stop offset="80%" stopColor="#888" />
          <stop offset="100%" stopColor="#222" />
        </linearGradient>
        <linearGradient id="barGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#1a1a1a" />
          <stop offset="30%" stopColor="#777" />
          <stop offset="50%" stopColor="#bbb" />
          <stop offset="70%" stopColor="#777" />
          <stop offset="100%" stopColor="#1a1a1a" />
        </linearGradient>
        <linearGradient id="brokenGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#1a0000" />
          <stop offset="40%" stopColor="#8b1a1a" />
          <stop offset="60%" stopColor="#cc3333" />
          <stop offset="100%" stopColor="#1a0000" />
        </linearGradient>
        <filter id="redGlow">
          <feGaussianBlur stdDeviation="1.2" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="metalGlow">
          <feGaussianBlur stdDeviation="0.5" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Top rail — always visible */}
      <rect x="6" y="1.5" width="88" height="3" rx="1.5" fill="url(#railGrad)" filter="url(#metalGlow)" opacity={0.85} />
      {/* Bottom rail — always visible */}
      <rect x="6" y="95.5" width="88" height="3" rx="1.5" fill="url(#railGrad)" filter="url(#metalGlow)" opacity={0.85} />

      {bars.map((state, i) => {
        const x = BAR_X[i];
        const w = BAR_W;
        const cx = x + w / 2;

        if (state === 'hidden') {
          // Ghost bar — dashed outline placeholder so user sees prison structure immediately
          return (
            <g key={`ghost-${i}`} opacity={0.22}>
              <rect x={x} y={4.5} width={w} height={91} rx={1.5}
                fill="none" stroke="#8af0ff" strokeWidth={0.7} strokeDasharray="3 3" />
            </g>
          );
        }

        if (state === 'broken') {
          return (
            <g key={`broken-${i}`} filter="url(#redGlow)">
              {/* Top broken piece — angled left */}
              <rect
                x={x - 1} y={4.5} width={w} height={40}
                rx={1.5} fill="url(#brokenGrad)" opacity={0.72}
                transform={`rotate(-6, ${cx}, 44)`}
              />
              {/* Bottom broken piece — angled right */}
              <rect
                x={x + 1} y={55.5} width={w} height={40}
                rx={1.5} fill="url(#brokenGrad)" opacity={0.72}
                transform={`rotate(6, ${cx}, 56)`}
              />
              {/* Jagged crack line */}
              <path
                d={`M${cx - 1},42 L${cx + 1.5},46 L${cx - 1.5},50 L${cx + 1},54`}
                stroke="#ff5555" strokeWidth={0.8} fill="none" opacity={0.9}
              />
              {/* Hot glow at break point */}
              <ellipse cx={cx} cy={48} rx={2.5} ry={1.8} fill="#ff3333" opacity={0.3} />
            </g>
          );
        }

        // Solid bar — drops in from top rail
        return (
          <motion.g
            key={`bar-${i}`}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 0.4, ease: [0.34, 1.4, 0.64, 1] }}
            style={{ transformOrigin: `${cx}px 4.5px` }}
            filter="url(#metalGlow)"
          >
            <rect x={x} y={4.5} width={w} height={91} rx={1.5} fill="url(#barGrad)" opacity={0.9} />
            {/* Highlight strip */}
            <rect x={x + 1} y={4.5} width={1} height={91} rx={0.5} fill="rgba(255,255,255,0.2)" />
          </motion.g>
        );
      })}

      {/* Lock — appears only when all 5 solid */}
      {solidCount === 5 && (
        <motion.g
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.4, ease: 'backOut' }}
          style={{ transformOrigin: '50px 55px' }}
        >
          <rect x={44} y={52} width={12} height={9} rx={2} fill="#999" stroke="#666" strokeWidth={0.4} />
          <path d="M47,52 L47,48 Q50,44 53,48 L53,52" stroke="#999" strokeWidth={1.8} fill="none" strokeLinecap="round" />
          <circle cx={50} cy={56} r={1.5} fill="#444" />
          <rect x={49.4} y={56} width={1.2} height={2.8} rx={0.4} fill="#444" />
        </motion.g>
      )}
    </svg>
  );
}

function useTypewriter(text: string, speed = 16, active = true) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);
  useEffect(() => {
    if (!active) { setDisplayed(text); setDone(true); return; }
    setDisplayed(''); setDone(false);
    let i = 0;
    const iv = setInterval(() => {
      i++; setDisplayed(text.slice(0, i));
      if (i >= text.length) { clearInterval(iv); setDone(true); }
    }, speed);
    return () => clearInterval(iv);
  }, [text, speed, active]);
  return { displayed, done };
}

export default function RobotSection() {
  const [phase, setPhase] = useState<'select' | 'quiz' | 'result'>('select');
  const [topicIdx, setTopicIdx] = useState(0);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [showExplain, setShowExplain] = useState(false);
  const [typeActive, setTypeActive] = useState(true);

  // Prison bar state
  const [barStates, setBarStates] = useState<BarState[]>(Array(5).fill('hidden'));
  // Robot flash: 'none' | 'correct' | 'wrong'
  const [robotFlash, setRobotFlash] = useState<'none' | 'correct' | 'wrong'>('none');
  // Completed tests across all topics
  const [completedTests, setCompletedTests] = useState<CompletedTest[]>([]);
  const [copied, setCopied] = useState(false);

  const topic = QUIZ_TOPICS[topicIdx];
  const q = topic.questions[current];
  const score = answers.filter(Boolean).length;
  const ac = topic.color;

  const solidCount = barStates.filter(b => b === 'solid').length;
  const brokenCount = barStates.filter(b => b === 'broken').length;

  // Robot CSS filter: more solid bars = more red & more intense
  const robotFilter = (() => {
    if (solidCount === 0) return 'none';
    const hue = solidCount * 28; // 0 → 140deg (cyan toward red)
    const sat = 1.2 + solidCount * 0.3;
    const bright = 1 - solidCount * 0.04;
    if (robotFlash === 'wrong') return 'hue-rotate(0deg) saturate(4) brightness(1.6)';
    if (robotFlash === 'correct') return `hue-rotate(${hue + 20}deg) saturate(${sat + 0.5}) brightness(1.3)`;
    return `hue-rotate(${hue}deg) saturate(${sat}) brightness(${bright})`;
  })();

  // Glow color beneath robot
  const glowColor = solidCount === 0
    ? ac
    : solidCount >= 4
      ? '#FF2D2D'
      : solidCount >= 2
        ? '#FF7A00'
        : '#FF3B5C';

  const bubbleText =
    phase === 'select' ? 'Wähle ein Thema. Ich stelle dir 5 Fragen und bewerte dein KI-Sicherheitswissen.'
    : phase === 'quiz' ? q.q
    : 'Analyse abgeschlossen. Hier ist deine Sicherheitsbewertung.';

  const { displayed, done: typeDone } = useTypewriter(bubbleText, 16, typeActive);

  useEffect(() => {
    setTypeActive(false);
    const t = setTimeout(() => setTypeActive(true), 120);
    return () => clearTimeout(t);
  }, [phase, current]);

  function startTopic(idx: number) {
    setTopicIdx(idx); setCurrent(0); setAnswers([]); setSelected(null);
    setShowExplain(false); setPhase('quiz');
    setBarStates(Array(5).fill('hidden'));
    setRobotFlash('none');
  }

  function handleSelect(idx: number) {
    if (selected !== null || !typeDone) return;
    setSelected(idx);
    const isCorrect = idx === q.correct;
    setAnswers(prev => [...prev, isCorrect]);

    if (isCorrect) {
      // Add a bar: find first hidden slot
      setBarStates(prev => {
        const next = [...prev];
        const firstHidden = next.indexOf('hidden');
        if (firstHidden !== -1) next[firstHidden] = 'solid';
        return next;
      });
      setRobotFlash('correct');
    } else {
      // Break last solid bar
      setBarStates(prev => {
        const next = [...prev];
        let lastSolid = -1;
        for (let i = next.length - 1; i >= 0; i--) {
          if (next[i] === 'solid') { lastSolid = i; break; }
        }
        if (lastSolid !== -1) next[lastSolid] = 'broken';
        return next;
      });
      setRobotFlash('wrong');
    }

    setTimeout(() => setRobotFlash('none'), 700);
    setTimeout(() => setShowExplain(true), 350);
  }

  function next() {
    if (current + 1 >= topic.questions.length) {
      // Save this test result before showing result screen
      const finalScore = answers.filter(Boolean).length;
      setCompletedTests(prev => {
        const without = prev.filter(t => t.topicId !== topic.id);
        return [...without, {
          topicId: topic.id,
          topicTitle: topic.title,
          topicIcon: topic.icon,
          color: topic.color,
          score: finalScore,
          total: topic.questions.length,
          answers: [...answers],
          barStates: [...barStates],
        }];
      });
      setPhase('result');
      return;
    }
    setCurrent(c => c + 1); setSelected(null); setShowExplain(false);
  }

  function reset() {
    setPhase('select'); setCurrent(0); setAnswers([]); setSelected(null);
    setShowExplain(false); setBarStates(Array(5).fill('hidden')); setRobotFlash('none');
  }

  function triggerDownload(canvas: HTMLCanvasElement, filename: string) {
    canvas.toBlob(blob => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url; a.download = filename; a.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    }, 'image/png');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function drawCardBase(ctx: CanvasRenderingContext2D, W: number, H: number) {
    // Background
    ctx.fillStyle = '#060B18';
    ctx.fillRect(0, 0, W, H);
    // Subtle grid
    ctx.strokeStyle = 'rgba(0,240,255,0.035)';
    ctx.lineWidth = 0.5;
    for (let x = 0; x <= W; x += 44) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }
    for (let y = 0; y <= H; y += 44) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }
    // Top accent gradient bar
    const bar = ctx.createLinearGradient(0, 0, W * 0.65, 0);
    bar.addColorStop(0, 'rgba(0,240,255,0.9)');
    bar.addColorStop(1, 'transparent');
    ctx.fillStyle = bar;
    ctx.fillRect(0, 0, W, 2.5);
    // Border
    ctx.strokeStyle = 'rgba(0,240,255,0.1)';
    ctx.lineWidth = 1;
    ctx.strokeRect(0.5, 0.5, W - 1, H - 1);
  }

  function drawPrisonBars(ctx: CanvasRenderingContext2D, bars: BarState[], x: number, y: number, w: number, h: number) {
    const BAR_COUNT = 5;
    const barW = 6;
    const gap = (w - BAR_COUNT * barW) / (BAR_COUNT + 1);
    // Top rail
    ctx.fillStyle = '#888'; ctx.fillRect(x, y, w, 4);
    // Bottom rail
    ctx.fillStyle = '#888'; ctx.fillRect(x, y + h - 4, w, 4);
    bars.forEach((state, i) => {
      const bx = x + gap + i * (barW + gap);
      if (state === 'hidden') {
        ctx.strokeStyle = 'rgba(0,240,255,0.2)';
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 4]);
        ctx.strokeRect(bx, y + 4, barW, h - 8);
        ctx.setLineDash([]);
      } else if (state === 'solid') {
        const g = ctx.createLinearGradient(bx, 0, bx + barW, 0);
        g.addColorStop(0, '#333'); g.addColorStop(0.4, '#aaa'); g.addColorStop(0.6, '#ccc'); g.addColorStop(1, '#333');
        ctx.fillStyle = g;
        ctx.fillRect(bx, y + 4, barW, h - 8);
      } else {
        // Broken — top half angled
        ctx.save();
        ctx.translate(bx + barW / 2, y + h * 0.45);
        ctx.rotate(-0.12);
        ctx.fillStyle = '#8b1a1a'; ctx.fillRect(-barW / 2, -(h * 0.45 - 4), barW, h * 0.4);
        ctx.restore();
        // bottom half
        ctx.save();
        ctx.translate(bx + barW / 2, y + h * 0.55);
        ctx.rotate(0.12);
        ctx.fillStyle = '#8b1a1a'; ctx.fillRect(-barW / 2, 0, barW, h * 0.4);
        ctx.restore();
        // glow dot at break
        ctx.fillStyle = 'rgba(255,60,60,0.5)';
        ctx.beginPath(); ctx.ellipse(bx + barW / 2, y + h / 2, 5, 3, 0, 0, Math.PI * 2); ctx.fill();
      }
    });
  }

  function downloadSingleImage() {
    const GRADES_LOCAL = [
      { max: 1, label: 'Kritisches Risiko', grade: 'F', color: '#FF3B5C' },
      { max: 2, label: 'Gefährdet', grade: 'D', color: '#FF7A00' },
      { max: 3, label: 'Basisschutz', grade: 'C', color: '#FFB800' },
      { max: 4, label: 'Solide', grade: 'B', color: '#00D4A0' },
      { max: 5, label: 'Experte', grade: 'A+', color: '#00F0FF' },
    ];
    const g = GRADES_LOCAL.find(gr => score <= gr.max) ?? GRADES_LOCAL[4];
    const DPR = 2, W = 600, H = 340;
    const canvas = document.createElement('canvas');
    canvas.width = W * DPR; canvas.height = H * DPR;
    const ctx = canvas.getContext('2d')!;
    ctx.scale(DPR, DPR);

    drawCardBase(ctx, W, H);

    // Header tag
    ctx.fillStyle = 'rgba(0,240,255,0.55)';
    ctx.font = '700 10px monospace';
    ctx.fillText('[ KI-SICHERHEITSQUIZ ]', 28, 36);

    // Topic icon + name
    ctx.fillStyle = topic.color;
    ctx.font = '700 22px monospace';
    ctx.fillText(topic.icon, 28, 76);
    ctx.fillStyle = '#D4E0F5';
    ctx.font = '700 22px sans-serif';
    ctx.fillText(topic.title, 56, 76);

    // Score big
    ctx.fillStyle = g.color;
    ctx.font = '900 72px monospace';
    ctx.fillText(g.grade, 28, 168);

    // Grade label
    ctx.fillStyle = 'rgba(255,255,255,0.4)';
    ctx.font = '400 13px sans-serif';
    ctx.fillText(g.label, 28, 186);

    // Score fraction
    ctx.fillStyle = g.color;
    ctx.font = '700 14px monospace';
    ctx.fillText(`${score} / ${topic.questions.length} richtig`, 28, 210);

    // Answer dots
    const dotSize = 26, dotGap = 8, dotY = 228;
    answers.forEach((correct, i) => {
      const dx = 28 + i * (dotSize + dotGap);
      ctx.fillStyle = correct ? 'rgba(0,240,160,0.15)' : 'rgba(255,59,92,0.15)';
      ctx.beginPath(); ctx.roundRect(dx, dotY, dotSize, dotSize, 5); ctx.fill();
      ctx.strokeStyle = correct ? 'rgba(0,240,160,0.4)' : 'rgba(255,59,92,0.4)';
      ctx.lineWidth = 1; ctx.stroke();
      ctx.fillStyle = correct ? '#00F0A0' : '#FF3B5C';
      ctx.font = '700 13px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(correct ? '✓' : '✗', dx + dotSize / 2, dotY + 17);
      ctx.textAlign = 'left';
    });

    // Prison bars on right side
    drawPrisonBars(ctx, barStates, 310, 60, 260, 200);

    // Cage label
    const solid = barStates.filter(b => b === 'solid').length;
    ctx.fillStyle = solid === 5 ? '#00F0FF' : solid >= 3 ? '#FFB800' : '#FF3B5C';
    ctx.font = '700 12px monospace';
    ctx.fillText(solid === 5 ? '🔒 KI eingesperrt' : `${solid}/5 Stäbe gesetzt`, 310, 278);

    // Watermark
    ctx.fillStyle = 'rgba(255,255,255,0.2)';
    ctx.font = '400 11px monospace';
    ctx.textAlign = 'right';
    ctx.fillText('sicherheit.ai', W - 24, H - 18);
    ctx.textAlign = 'left';

    triggerDownload(canvas, `sicherheit-ai-${topic.id}.png`);
  }

  function downloadAllImage(tests: CompletedTest[]) {
    const GRADES_LOCAL = [
      { max: 1, label: 'Kritisches Risiko', grade: 'F', color: '#FF3B5C' },
      { max: 2, label: 'Gefährdet', grade: 'D', color: '#FF7A00' },
      { max: 3, label: 'Basisschutz', grade: 'C', color: '#FFB800' },
      { max: 4, label: 'Solide', grade: 'B', color: '#00D4A0' },
      { max: 5, label: 'Experte', grade: 'A+', color: '#00F0FF' },
    ];
    const totalScore = tests.reduce((s, t) => s + t.score, 0);
    const totalMax = tests.reduce((s, t) => s + t.total, 0);
    const pct = Math.round((totalScore / totalMax) * 100);
    const avgScore = totalScore / tests.length;
    const overallGrade = GRADES_LOCAL.find(g => avgScore <= g.max) ?? GRADES_LOCAL[4];

    const DPR = 2, W = 600, H = 160 + tests.length * 58 + 80;
    const canvas = document.createElement('canvas');
    canvas.width = W * DPR; canvas.height = H * DPR;
    const ctx = canvas.getContext('2d')!;
    ctx.scale(DPR, DPR);

    drawCardBase(ctx, W, H);

    // Header
    ctx.fillStyle = 'rgba(0,240,255,0.55)';
    ctx.font = '700 10px monospace';
    ctx.fillText('[ KI-SICHERHEITSWISSEN — GESAMTAUSWERTUNG ]', 28, 36);

    // Overall grade
    ctx.fillStyle = overallGrade.color;
    ctx.font = '900 56px monospace';
    ctx.fillText(overallGrade.grade, 28, 106);
    ctx.fillStyle = 'rgba(255,255,255,0.35)';
    ctx.font = '400 13px sans-serif';
    ctx.fillText(`${totalScore}/${totalMax} richtig · ${pct}%`, 28, 124);
    ctx.fillStyle = overallGrade.color;
    ctx.font = '700 13px monospace';
    ctx.fillText(overallGrade.label, 28, 143);

    // Per-topic rows
    tests.forEach((t, i) => {
      const rowY = 165 + i * 58;
      // Row bg
      ctx.fillStyle = 'rgba(255,255,255,0.025)';
      ctx.beginPath(); ctx.roundRect(24, rowY, W - 48, 46, 6); ctx.fill();
      // Icon
      ctx.fillStyle = t.color;
      ctx.font = '700 15px monospace';
      ctx.fillText(t.topicIcon, 40, rowY + 26);
      // Title
      ctx.fillStyle = '#CCD8EF';
      ctx.font = '700 14px sans-serif';
      ctx.fillText(t.topicTitle, 64, rowY + 26);
      // Score
      ctx.fillStyle = t.color;
      ctx.font = '700 13px monospace';
      ctx.textAlign = 'right';
      ctx.fillText(`${t.score}/${t.total}`, W - 40, rowY + 22);
      // Bar progress
      const barW = 120, barH = 6, barX = W - 40 - barW, barY = rowY + 30;
      ctx.fillStyle = 'rgba(255,255,255,0.08)';
      ctx.beginPath(); ctx.roundRect(barX, barY, barW, barH, 3); ctx.fill();
      ctx.fillStyle = t.color;
      ctx.beginPath(); ctx.roundRect(barX, barY, barW * (t.score / t.total), barH, 3); ctx.fill();
      ctx.textAlign = 'left';
    });

    // Watermark
    ctx.fillStyle = 'rgba(255,255,255,0.2)';
    ctx.font = '400 11px monospace';
    ctx.textAlign = 'right';
    ctx.fillText('sicherheit.ai', W - 24, H - 18);
    ctx.textAlign = 'left';

    triggerDownload(canvas, 'sicherheit-ai-gesamtauswertung.png');
  }

  const GRADES = [
    { max: 1, label: 'Kritisches Risiko', grade: 'F', color: '#FF3B5C' },
    { max: 2, label: 'Gefährdet', grade: 'D', color: '#FF7A00' },
    { max: 3, label: 'Basisschutz', grade: 'C', color: '#FFB800' },
    { max: 4, label: 'Solide', grade: 'B', color: '#00D4A0' },
    { max: 5, label: 'Experte', grade: 'A+', color: '#00F0FF' },
  ];
  const gMeta = GRADES.find(g => score <= g.max) ?? GRADES[4];

  // Status label above robot
  const robotStatusLabel = (() => {
    if (phase !== 'quiz') return null;
    if (solidCount === 5) return { text: '🔒 KI eingesperrt!', color: '#FF3B5C' };
    if (brokenCount > 0 && solidCount === 0) return { text: '⚠ KI bricht aus!', color: '#FF7A00' };
    if (solidCount > 0) return { text: `🔒 ${solidCount}/5 Stäbe`, color: '#FF3B5C' };
    return { text: topic.icon + ' ' + topic.title, color: ac };
  })();

  return (
    <section style={{ position: 'relative', width: '100%', overflow: 'hidden', background: '#060B18', borderBottom: '1px solid rgba(0,240,255,0.07)' }}>
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', backgroundImage: 'linear-gradient(rgba(0,240,255,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(0,240,255,0.02) 1px,transparent 1px)', backgroundSize: '56px 56px', maskImage: 'radial-gradient(ellipse 90% 90% at 60% 50%,black 0%,transparent 100%)' }} />

      <style>{`
        @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
        @keyframes scandown{0%{top:0;opacity:0}5%{opacity:.35}90%{opacity:.35}100%{top:100%;opacity:0}}
        @keyframes robotShake{0%,100%{transform:translateX(0)}20%{transform:translateX(-6px)}40%{transform:translateX(6px)}60%{transform:translateX(-4px)}80%{transform:translateX(4px)}}
        @keyframes robotPulse{0%,100%{transform:scale(1)}50%{transform:scale(1.02)}}
        @keyframes barCrack{0%{transform:translateX(0) rotate(0)}25%{transform:translateX(-3px) rotate(-3deg)}75%{transform:translateX(3px) rotate(3deg)}100%{transform:translateX(0) rotate(0)}}
        @keyframes glowPulse{0%,100%{opacity:0.5}50%{opacity:0.9}}
        .rs-scanline{position:absolute;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,rgba(0,240,255,0.28),transparent);animation:scandown 7s linear infinite;pointer-events:none;z-index:4}
        @media(max-width:760px){.rs-wrap{flex-direction:column!important}.rs-robot{width:100%!important;min-width:unset!important}}
        .robot-shake { animation: robotShake 0.5s ease-in-out; }
        .robot-pulse { animation: robotPulse 0.4s ease-in-out; }
      `}</style>

      <div className="rs-wrap" style={{ position: 'relative', maxWidth: '1080px', margin: '0 auto', padding: 'clamp(32px,5vw,56px) 24px', display: 'flex', alignItems: 'stretch', zIndex: 2 }}>

        {/* LEFT: Quiz interface */}
        <div style={{ flex: '1', paddingRight: '32px', display: 'flex', flexDirection: 'column' }}>

          {/* Topic pills */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginBottom: '22px' }}>
            {QUIZ_TOPICS.map((t, i) => {
              const isA = topicIdx === i && phase !== 'select';
              return (
                <button key={t.id}
                  onClick={() => phase === 'select' ? setTopicIdx(i) : startTopic(i)}
                  style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '4px 10px', background: isA ? t.color + '15' : 'rgba(255,255,255,0.03)', border: '1px solid ' + (isA ? t.color + '40' : 'rgba(255,255,255,0.07)'), borderRadius: '100px', cursor: 'pointer', transition: 'all 0.2s' }}
                >
                  <span style={{ fontSize: '10px', color: isA ? t.color : 'rgba(255,255,255,0.3)' }}>{t.icon}</span>
                  <span style={{ fontFamily: 'var(--mono)', fontSize: '9px', letterSpacing: '0.08em', color: isA ? t.color : 'rgba(255,255,255,0.35)', fontWeight: isA ? 700 : 400, textTransform: 'uppercase' as const }}>{t.title}</span>
                </button>
              );
            })}
          </div>

          {/* Speech bubble */}
          <AnimatePresence mode="wait">
            <motion.div key={'b' + phase + current}
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} transition={{ duration: 0.22 }}
              style={{ position: 'relative', background: 'rgba(0,0,0,0.45)', border: '1px solid ' + ac + '22', borderRadius: '4px 16px 16px 16px', padding: '18px 22px', marginBottom: '16px' }}
            >
              <div style={{ position: 'absolute', top: '18px', right: '-9px', width: 0, height: 0, borderTop: '8px solid transparent', borderBottom: '8px solid transparent', borderLeft: '9px solid ' + ac + '22' }} />
              <div style={{ position: 'absolute', top: '18px', right: '-8px', width: 0, height: 0, borderTop: '8px solid transparent', borderBottom: '8px solid transparent', borderLeft: '9px solid rgba(0,0,0,0.45)' }} />
              <div style={{ fontFamily: 'var(--mono)', fontSize: '8px', letterSpacing: '0.2em', color: ac + '55', textTransform: 'uppercase' as const, marginBottom: '7px' }}>
                {phase === 'quiz' ? topic.icon + ' ' + topic.title + ' · Frage ' + (current + 1) + '/' + topic.questions.length : phase === 'select' ? '[ BEREIT ]' : '[ AUSWERTUNG ]'}
              </div>
              <p style={{ fontFamily: 'var(--font)', fontSize: 'clamp(13px,1.5vw,15px)', color: '#D4E0F5', lineHeight: 1.7, margin: 0, minHeight: '44px' }}>
                {displayed}
                {!typeDone && <span style={{ animation: 'blink 0.65s infinite', color: ac }}>|</span>}
              </p>
            </motion.div>
          </AnimatePresence>

          <AnimatePresence mode="wait">

            {/* Quiz options */}
            {phase === 'quiz' && typeDone && (
              <motion.div key={'o' + current} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '7px', marginBottom: '9px' }}>
                  {q.options.map((opt, idx) => {
                    const isSel = selected === idx, isOk = idx === q.correct, rev = selected !== null;
                    let bg = 'rgba(255,255,255,0.02)', border = 'rgba(255,255,255,0.07)', color = 'rgba(255,255,255,0.7)';
                    if (rev) {
                      if (isOk) { bg = 'rgba(0,240,160,0.08)'; border = 'rgba(0,240,160,0.32)'; color = '#00F0A0'; }
                      else if (isSel) { bg = 'rgba(255,59,92,0.08)'; border = 'rgba(255,59,92,0.32)'; color = '#FF3B5C'; }
                      else { color = 'rgba(255,255,255,0.2)'; }
                    }
                    return (
                      <motion.button key={idx} onClick={() => handleSelect(idx)}
                        initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: idx * 0.05 }}
                        whileHover={!rev ? { borderColor: ac + '40', backgroundColor: ac + '06' } : {}}
                        style={{ display: 'flex', alignItems: 'flex-start', gap: '9px', padding: '11px 13px', background: bg, border: '1px solid ' + border, borderRadius: '9px', color, fontFamily: 'var(--font)', fontSize: '13px', lineHeight: 1.45, textAlign: 'left' as const, cursor: rev ? 'default' : 'pointer', transition: 'all 0.2s' }}
                      >
                        <span style={{ fontFamily: 'var(--mono)', fontSize: '10px', fontWeight: 800, flexShrink: 0, marginTop: '1px', color: rev ? (isOk ? '#00F0A0' : isSel ? '#FF3B5C' : 'rgba(255,255,255,0.15)') : ac + '70' }}>
                          {rev ? (isOk ? '✓' : isSel ? '✗' : String.fromCharCode(65 + idx)) : String.fromCharCode(65 + idx)}
                        </span>
                        {opt}
                      </motion.button>
                    );
                  })}
                </div>
                <AnimatePresence>
                  {showExplain && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} style={{ overflow: 'hidden' }}>
                      <div style={{ padding: '10px 13px', borderRadius: '9px', marginBottom: '7px', background: answers[answers.length - 1] ? 'rgba(0,240,160,0.05)' : 'rgba(255,59,92,0.05)', border: '1px solid ' + (answers[answers.length - 1] ? 'rgba(0,240,160,0.18)' : 'rgba(255,59,92,0.18)') }}>
                        <div style={{ fontFamily: 'var(--mono)', fontSize: '8px', letterSpacing: '0.18em', textTransform: 'uppercase' as const, marginBottom: '4px', color: answers[answers.length - 1] ? '#00F0A0' : '#FF3B5C' }}>
                          {answers[answers.length - 1] ? '[ KORREKT — STAB GESETZT ]' : '[ FALSCH — STAB GEBROCHEN ]'}
                        </div>
                        <p style={{ fontFamily: 'var(--font)', fontSize: '12px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, margin: 0 }}>{q.explain}</p>
                      </div>
                      <button onClick={next}
                        style={{ width: '100%', padding: '11px', background: ac + '10', border: '1px solid ' + ac + '30', borderRadius: '9px', color: ac, fontFamily: 'var(--mono)', fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' as const, cursor: 'pointer', transition: 'all 0.2s' }}
                        onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = ac + '1A'}
                        onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = ac + '10'}
                      >{current + 1 >= topic.questions.length ? 'Auswertung anzeigen →' : 'Weiter → (' + (current + 1) + '/' + topic.questions.length + ')'}</button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}

            {/* Select */}
            {phase === 'select' && (
              <motion.div key="sel" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                  {QUIZ_TOPICS.map((t, i) => {
                    const done = completedTests.find(ct => ct.topicId === t.id);
                    return (
                      <motion.button key={t.id} onClick={() => startTopic(i)}
                        initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                        whileHover={{ borderColor: t.color + '50', scale: 1.02 }} whileTap={{ scale: 0.98 }}
                        style={{ padding: '12px 13px', background: done ? t.color + '08' : i === topicIdx ? t.color + '10' : 'rgba(255,255,255,0.02)', border: '1px solid ' + (done ? t.color + '35' : i === topicIdx ? t.color + '30' : 'rgba(255,255,255,0.06)'), borderRadius: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', transition: 'all 0.2s', textAlign: 'left' as const, position: 'relative' as const }}
                      >
                        {done && (
                          <span style={{ position: 'absolute', top: '6px', right: '8px', fontFamily: 'var(--mono)', fontSize: '9px', color: t.color, opacity: 0.8 }}>
                            {done.score}/{done.total}
                          </span>
                        )}
                        <span style={{ width: '30px', height: '30px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: t.color + '12', border: '1px solid ' + t.color + '22', borderRadius: '7px', fontSize: '13px', color: t.color }}>{t.icon}</span>
                        <div>
                          <div style={{ fontFamily: 'var(--font)', fontSize: '13px', fontWeight: 700, color: '#CCD8EF' }}>{t.title}</div>
                          <div style={{ fontFamily: 'var(--mono)', fontSize: '9px', color: done ? t.color : 'rgba(255,255,255,0.25)', letterSpacing: '0.06em', marginTop: '1px' }}>
                            {done ? '█'.repeat(done.score) + '░'.repeat(done.total - done.score) : '5 Fragen'}
                          </div>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>

                {/* Gesamtauswertung — erscheint wenn ≥2 Tests abgeschlossen */}
                <AnimatePresence>
                  {completedTests.length >= 2 && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                      style={{ overflow: 'hidden', marginTop: '10px' }}
                    >
                      <div style={{ padding: '14px 16px', background: 'rgba(0,240,255,0.04)', border: '1px solid rgba(0,240,255,0.15)', borderRadius: '10px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                          <div style={{ fontFamily: 'var(--mono)', fontSize: '9px', letterSpacing: '0.15em', textTransform: 'uppercase' as const, color: 'rgba(0,240,255,0.6)' }}>
                            Gesamtauswertung · {completedTests.length}/{QUIZ_TOPICS.length} Themen
                          </div>
                          <div style={{ fontFamily: 'var(--mono)', fontSize: '11px', fontWeight: 700, color: '#00F0FF' }}>
                            {completedTests.reduce((s, t) => s + t.score, 0)}/{completedTests.reduce((s, t) => s + t.total, 0)}
                          </div>
                        </div>

                        {completedTests.map(ct => (
                          <div key={ct.topicId} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '5px' }}>
                            <span style={{ fontSize: '11px', color: ct.color, flexShrink: 0 }}>{ct.topicIcon}</span>
                            <span style={{ fontFamily: 'var(--font)', fontSize: '11px', color: 'rgba(255,255,255,0.5)', flex: 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' as const }}>{ct.topicTitle}</span>
                            <span style={{ fontFamily: 'var(--mono)', fontSize: '10px', color: ct.color, flexShrink: 0 }}>{'█'.repeat(ct.score)}{'░'.repeat(ct.total - ct.score)}</span>
                            <span style={{ fontFamily: 'var(--mono)', fontSize: '9px', color: 'rgba(255,255,255,0.25)', flexShrink: 0 }}>{ct.score}/{ct.total}</span>
                          </div>
                        ))}

                        <motion.button
                          onClick={() => downloadAllImage(completedTests)}
                          whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}
                          style={{ marginTop: '10px', width: '100%', padding: '10px', background: copied ? 'rgba(0,240,160,0.08)' : 'rgba(0,240,255,0.06)', border: '1px solid ' + (copied ? 'rgba(0,240,160,0.3)' : 'rgba(0,240,255,0.2)'), borderRadius: '8px', color: copied ? '#00F0A0' : '#00F0FF', fontFamily: 'var(--mono)', fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' as const, cursor: 'pointer', transition: 'all 0.25s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '7px' }}
                        >
                          <span>{copied ? '✓' : '↗'}</span>
                          {copied ? 'Gespeichert!' : 'Gesamtauswertung herunterladen'}
                        </motion.button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}

            {/* Result */}
            {phase === 'result' && (
              <motion.div key="res" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '14px' }}>
                  <div style={{ width: '56px', height: '56px', flexShrink: 0, border: '2px solid ' + gMeta.color, borderRadius: '11px', background: gMeta.color + '10', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 18px ' + gMeta.color + '18' }}>
                    <span style={{ fontFamily: 'var(--mono)', fontSize: '20px', fontWeight: 900, color: gMeta.color }}>{gMeta.grade}</span>
                  </div>
                  <div>
                    <div style={{ fontFamily: 'var(--font)', fontSize: '19px', fontWeight: 800, color: gMeta.color, lineHeight: 1.1 }}>{gMeta.label}</div>
                    <div style={{ fontFamily: 'var(--mono)', fontSize: '9px', color: 'rgba(255,255,255,0.3)', marginTop: '3px' }}>{score}/{topic.questions.length} richtig · {topic.title}</div>
                  </div>
                </div>

                {/* Bar result summary */}
                <div style={{ marginBottom: '12px', padding: '10px 14px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '9px' }}>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: '9px', color: 'rgba(255,255,255,0.3)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>KI-Käfig Status</div>
                  <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                    {barStates.map((s, i) => (
                      <div key={i} style={{
                        width: '28px', height: '36px', borderRadius: '3px',
                        background: s === 'solid' ? 'linear-gradient(180deg,#777,#444)' : s === 'broken' ? 'rgba(255,59,92,0.2)' : 'rgba(255,255,255,0.05)',
                        border: `1px solid ${s === 'solid' ? '#666' : s === 'broken' ? 'rgba(255,59,92,0.4)' : 'rgba(255,255,255,0.08)'}`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontFamily: 'var(--mono)', fontSize: '12px',
                        color: s === 'solid' ? '#aaa' : s === 'broken' ? '#FF3B5C' : 'rgba(255,255,255,0.15)',
                      }}>
                        {s === 'solid' ? '|' : s === 'broken' ? '✗' : '·'}
                      </div>
                    ))}
                    <div style={{ marginLeft: '8px', fontFamily: 'var(--mono)', fontSize: '10px', color: solidCount >= 4 ? '#00F0A0' : solidCount >= 2 ? '#FFB800' : '#FF3B5C' }}>
                      {solidCount === 5 ? '🔒 Vollständig gesichert' : solidCount === 0 ? '⚠ KI ist frei!' : `${solidCount} Stäbe übrig`}
                    </div>
                  </div>
                </div>

                <div style={{ height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px', overflow: 'hidden', marginBottom: '11px' }}>
                  <motion.div initial={{ width: 0 }} animate={{ width: (score / topic.questions.length * 100) + '%' }} transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }} style={{ height: '100%', background: 'linear-gradient(90deg,' + gMeta.color + '70,' + gMeta.color + ')', borderRadius: '2px' }} />
                </div>
                <div style={{ display: 'flex', gap: '5px', marginBottom: '14px' }}>
                  {answers.map((c, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
                      style={{ flex: 1, height: '24px', borderRadius: '5px', background: c ? 'rgba(0,240,160,0.1)' : 'rgba(255,59,92,0.1)', border: '1px solid ' + (c ? 'rgba(0,240,160,0.25)' : 'rgba(255,59,92,0.25)'), display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--mono)', fontSize: '10px', color: c ? '#00F0A0' : '#FF3B5C' }}>
                      {c ? '✓' : '✗'}
                    </motion.div>
                  ))}
                </div>
                {/* Share single result */}
                <motion.button
                  onClick={() => downloadSingleImage()}
                  initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
                  whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}
                  style={{ width: '100%', marginBottom: '7px', padding: '12px', background: copied ? 'rgba(0,240,160,0.08)' : 'rgba(255,255,255,0.04)', border: '1px solid ' + (copied ? 'rgba(0,240,160,0.3)' : 'rgba(255,255,255,0.1)'), borderRadius: '9px', color: copied ? '#00F0A0' : 'rgba(255,255,255,0.55)', fontFamily: 'var(--mono)', fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' as const, cursor: 'pointer', transition: 'all 0.25s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '7px' }}
                >
                  <span style={{ fontSize: '13px' }}>{copied ? '✓' : '↗'}</span>
                  {copied ? 'Gespeichert!' : 'Als Bild herunterladen'}
                </motion.button>

                <div style={{ display: 'flex', gap: '7px' }}>
                  <button onClick={reset}
                    style={{ flex: 1, padding: '11px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '9px', color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--mono)', fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' as const, cursor: 'pointer', transition: 'all 0.2s' }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.06)'}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.03)'}
                  >← Themen</button>
                  <button onClick={() => startTopic(topicIdx)}
                    style={{ flex: 1, padding: '11px', background: ac + '10', border: '1px solid ' + ac + '30', borderRadius: '9px', color: ac, fontFamily: 'var(--mono)', fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' as const, cursor: 'pointer', transition: 'all 0.2s' }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = ac + '1A'}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = ac + '10'}
                  >↺ Nochmal</button>
                  <a href="/de/tools"
                    style={{ flex: 1, padding: '11px', background: 'rgba(0,240,255,0.06)', border: '1px solid rgba(0,240,255,0.2)', borderRadius: '9px', color: '#00F0FF', fontFamily: 'var(--mono)', fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' as const, textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}>
                    Tools →
                  </a>
                </div>
                <div style={{ marginTop: '9px', fontFamily: 'var(--mono)', fontSize: '8px', color: 'rgba(255,255,255,0.15)' }}>Quellen: {topic.source}</div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* RIGHT: Robot */}
        <div className="rs-robot" style={{ width: '50%', minWidth: '280px', position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

          {/* Status badge */}
          <AnimatePresence mode="wait">
            {robotStatusLabel && (
              <motion.div
                key={robotStatusLabel.text}
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                transition={{ duration: 0.25 }}
                style={{ alignSelf: 'flex-end', display: 'flex', alignItems: 'center', gap: '6px', fontFamily: 'var(--mono)', fontSize: '9px', letterSpacing: '0.12em', color: robotStatusLabel.color, textTransform: 'uppercase' as const, background: 'rgba(6,11,24,0.85)', border: '1px solid ' + robotStatusLabel.color + '40', padding: '5px 11px', borderRadius: '100px', backdropFilter: 'blur(8px)', marginBottom: '8px', transition: 'color 0.4s, border-color 0.4s' }}
              >
                <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: robotStatusLabel.color, animation: 'blink 1.4s infinite', transition: 'background 0.4s' }} />
                {robotStatusLabel.text}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Robot canvas + prison overlay */}
          <div style={{ width: '100%', position: 'relative', overflow: 'hidden', aspectRatio: '5 / 4' }}>
            <div className="rs-scanline" style={{ top: 0 }} />

            {/* Ground glow — color reacts to bar state */}
            <div style={{
              position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)',
              width: '65%', height: '28%',
              background: `radial-gradient(ellipse,${glowColor}${solidCount > 0 ? '20' : '12'} 0%,transparent 70%)`,
              transition: 'all 0.8s ease',
              pointerEvents: 'none', zIndex: 2,
              animation: solidCount >= 4 ? 'glowPulse 1.5s ease-in-out infinite' : 'none',
            }} />

            {/* Wrong answer flash overlay */}
            <AnimatePresence>
              {robotFlash === 'wrong' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  style={{ position: 'absolute', inset: 0, background: 'rgba(255,50,50,0.18)', zIndex: 8, pointerEvents: 'none', borderRadius: '8px' }}
                />
              )}
              {robotFlash === 'correct' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  style={{ position: 'absolute', inset: 0, background: 'rgba(255,50,50,0.12)', zIndex: 8, pointerEvents: 'none', borderRadius: '8px' }}
                />
              )}
            </AnimatePresence>

            {/* Robot 3D — filter makes it red as bars grow */}
            <motion.div
              animate={robotFlash === 'wrong' ? { x: [-4, 5, -5, 4, -3, 0] } : { x: 0 }}
              transition={{ duration: 0.4 }}
              style={{
                position: 'absolute', top: '-5%', left: '-5%', width: '110%', height: '110%',
                filter: robotFilter,
                transition: robotFlash === 'none' ? 'filter 0.8s ease' : 'none',
              }}
            >
              <SplineScene scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode" className="w-full h-full" />
            </motion.div>

            {/* Prison bars SVG overlay — scaffold always visible during quiz */}
            <PrisonOverlay bars={barStates} solidCount={solidCount} showScaffold={phase === 'quiz'} />
          </div>

          {/* Progress dots */}
          {phase === 'quiz' && (
            <div style={{ display: 'flex', gap: '6px', marginTop: '6px' }}>
              {topic.questions.map((_, i) => (
                <div key={i} style={{ width: i === current ? '18px' : '6px', height: '6px', borderRadius: '3px', background: i < current ? ac + '55' : i === current ? ac : 'rgba(255,255,255,0.1)', transition: 'all 0.35s' }} />
              ))}
            </div>
          )}

          {/* Bar legend during quiz */}
          {phase === 'quiz' && (solidCount > 0 || brokenCount > 0) && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{ marginTop: '10px', display: 'flex', gap: '4px', alignItems: 'center' }}
            >
              {barStates.map((s, i) => (
                <div key={i} style={{
                  width: '10px', height: '22px', borderRadius: '2px',
                  background: s === 'solid'
                    ? 'linear-gradient(180deg,#888,#555)'
                    : s === 'broken'
                      ? 'rgba(255,59,92,0.35)'
                      : 'rgba(255,255,255,0.07)',
                  border: `1px solid ${s === 'solid' ? '#666' : s === 'broken' ? 'rgba(255,59,92,0.5)' : 'rgba(255,255,255,0.1)'}`,
                  transition: 'all 0.4s ease',
                }} />
              ))}
              <span style={{ fontFamily: 'var(--mono)', fontSize: '9px', color: 'rgba(255,255,255,0.3)', marginLeft: '6px' }}>
                {solidCount > 0 && `${solidCount} Stab${solidCount !== 1 ? 'e' : ''}`}
                {brokenCount > 0 && ` · ${brokenCount} zerbrochen`}
              </span>
            </motion.div>
          )}
        </div>

      </div>
    </section>
  );
}
