'use client';

import { SplineScene } from '@/components/ui/splite';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const QUIZ_TOPICS = [
  {
    id: 'phishing', title: 'KI-Phishing', icon: '◈', color: '#00F0FF',
    source: 'SlashNext · Proofpoint · CISA',
    questions: [
      { q: 'Um wie viel Prozent sind KI-Phishing-Mails laut SlashNext 2023 gestiegen?', options: ['120%', '210%', '340%', '580%'], correct: 2, explain: 'SlashNext 2023: +340% KI-Phishing gegenüber Vorjahr — angetrieben durch Tools wie WormGPT.' },
      { q: 'Was unterscheidet Spear-Phishing von herkömmlichem Phishing?', options: ['Phishing per SMS', 'Gezielter Angriff mit persönlichen Daten', 'Automatisierter Massenversand', 'Nur auf mobile Geräte'], correct: 1, explain: 'Spear-Phishing nutzt persönliche Daten für überzeugende Angriffe. KI automatisiert diese Personalisierung massenhaft.' },
      { q: 'Was ermöglicht WormGPT kriminellen Angreifern?', options: ['Stärkere Passwörter', 'Sicherheitslücken patchen', 'Fehlerfreie Phishing-Mails in jeder Sprache', 'VPN-Tunnel'], correct: 2, explain: 'WormGPT schreibt fehlerfreie Phishing-Mails in jeder Sprache — schlechtes Deutsch als Erkennungsmerkmal versagt.' },
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
      { q: 'Was ist Ransomware-as-a-Service (RaaS)?', options: ['Legaler Cloud-Backup', 'Antivirus im Abo', 'Kriminelle vermieten Ransomware gegen Umsatzbeteiligung', 'Staatliches Frühwarnsystem'], correct: 2, explain: 'RaaS-Gruppen wie LockBit vermieten Ransomware an Affiliates — meist 20-30% der erpressten Summe.' },
      { q: 'Häufigstes Ransomware-Ziel laut IBM X-Force 2023?', options: ['Banken', 'Gesundheitswesen', 'Einzelhandel', 'Automobilindustrie'], correct: 1, explain: 'Krankenhäuser zahlen schnell — sie können keinen Ausfall tolerieren. Patientendaten erzielen hohe Darknet-Preise.' },
      { q: 'Wichtigste BSI-Schutzmaßnahme gegen Ransomware?', options: ['Täglicher Virenscan', 'Komplexere Passwörter', 'Offline-Backups nach 3-2-1-Prinzip', 'Neuere Hardware'], correct: 2, explain: 'BSI: 3-2-1-Backup (3 Kopien, 2 Medien, 1 offline) macht Ransomware wirkungslos. Backups müssen vom Netz getrennt sein.' },
    ],
  },
  {
    id: 'dsgvo', title: 'DSGVO', icon: '◉', color: '#A78BFA',
    source: 'EU-DSGVO · EDPB · EU AI Act',
    questions: [
      { q: 'Maximales Bußgeld nach DSGVO Art. 83?', options: ['500T Euro', '10 Mio. Euro', '20 Mio. Euro oder 4% Jahresumsatz', '100 Mio. Euro'], correct: 2, explain: 'DSGVO Art. 83: Bis zu 20 Mio. Euro oder 4% des weltweiten Jahresumsatzes — je nachdem was höher ist.' },
      { q: 'Meldefrist für Datenpannen an die Aufsichtsbehörde?', options: ['12 Stunden', '24 Stunden', '72 Stunden', '7 Tage'], correct: 2, explain: 'DSGVO Art. 33: Meldepflicht innerhalb 72 Stunden nach Bekanntwerden bei der zuständigen Aufsichtsbehörde.' },
      { q: 'Rekord-Bußgeld gegen Meta 2023?', options: ['390 Mio. Euro', '746 Mio. Euro', '1,2 Mrd. Euro', '4,5 Mrd. Euro'], correct: 2, explain: 'Irische DPC: 1,2 Mrd. Euro gegen Meta im Mai 2023 wegen unzulässiger Datentransfers in die USA.' },
      { q: 'Was regelt der EU AI Act seit August 2024?', options: ['KI-Steuerrecht', 'Nur militärische KI', 'Risikokategorien und Pflichten für KI-Systeme', 'KI-Urheberrecht'], correct: 2, explain: 'EU AI Act: Weltweit erstes KI-Gesetz. Verbietet Social Scoring, fordert Transparenz bei Hochrisiko-KI.' },
      { q: 'Was braucht ein Unternehmen beim Einsatz von Cloud-Diensten?', options: ['Nichts bei ISO-Zertifizierung', 'Keinen Vertrag bei US-Anbietern', 'Auftragsverarbeitungsvertrag (AVV) nach Art. 28', 'Nur interne Genehmigung'], correct: 2, explain: 'DSGVO Art. 28: Jede Auslagerung personenbezogener Daten erfordert einen AVV — das Unternehmen bleibt verantwortlich.' },
    ],
  },
  {
    id: 'passwoerter', title: 'Passwörter', icon: '✦', color: '#FFB800',
    source: 'BSI · Hive Systems · NIST SP 800-63B',
    questions: [
      { q: 'Hive Systems 2024: Wie schnell wird ein 8-stelliges Kleinbuchstaben-PW geknackt?', options: ['3 Tage', '12 Stunden', '2 Minuten', 'Unter 1 Sekunde'], correct: 3, explain: 'Hive Systems 2024: 8-stellige Passwörter aus Kleinbuchstaben in unter 1 Sekunde. Mit Sonderzeichen ca. 8 Stunden.' },
      { q: 'Was ist "Credential Stuffing"?', options: ['Passwort-Erstellungstool', 'Geleakte Logins auf anderen Diensten testen', 'Passwortverschlüsselung', 'Passwort-Reset per SMS'], correct: 1, explain: 'Milliarden geleakter Logins werden automatisiert auf anderen Diensten getestet — Passwort-Wiederverwendung ist fatal.' },
      { q: 'Sicherste 2FA-Methode gegen Phishing (NIST)?', options: ['SMS-TAN', 'E-Mail-Link', 'TOTP-App', 'FIDO2 WebAuthn-Schlüssel'], correct: 3, explain: 'FIDO2/WebAuthn (z.B. YubiKey) ist phishing-resistent: Authentifizierung ist an die echte Domain gebunden.' },
      { q: 'BSI-Mindestlänge für normale Benutzerpasswörter?', options: ['6 Zeichen', '8 Zeichen', '12 Zeichen', '20 Zeichen'], correct: 2, explain: 'BSI IT-Grundschutz ORP.4: Mindestens 12 Zeichen mit Groß-/Kleinbuchstaben, Zahlen und Sonderzeichen.' },
      { q: 'Was empfiehlt NIST SP 800-63B ausdrücklich NICHT mehr?', options: ['2FA nutzen', 'Passwort-Manager', 'Regelmäßige Passwortrotation ohne Anlass', 'Lange Passwörter'], correct: 2, explain: 'NIST: Erzwungene Rotation führt zu schwächeren Passwörtern. Änderung nur bei tatsächlicher Kompromittierung.' },
    ],
  },
  {
    id: 'unternehmen', title: 'IT-Security', icon: '▣', color: '#00D4A0',
    source: 'IBM Cost of Breach · BSI · Verizon DBIR',
    questions: [
      { q: 'IBM 2023: Durchschnittliche Kosten einer Datenpanne weltweit?', options: ['1,2 Mio. USD', '2,8 Mio. USD', '4,45 Mio. USD', '9,8 Mio. USD'], correct: 2, explain: 'IBM 2023: Ø 4,45 Mio. USD — Rekord. Deutschland: 4,67 Mio. USD, über dem Weltdurchschnitt.' },
      { q: 'Was beschreibt das Prinzip "Least Privilege"?', options: ['Alle erhalten Admin-Rechte', 'Nur minimal notwendige Rechte vergeben', 'Tägliche Rotation von Accounts', 'Nur Vorgesetzte haben Zugang'], correct: 1, explain: 'Principle of Least Privilege: Minimiert Schaden bei Kompromittierung — jeder nur was er zwingend benötigt.' },
      { q: 'Was ist ein "Zero-Day-Exploit"?', options: ['Angriff innerhalb 24h', 'Erster Angriff auf ein Startup', 'Angriff auf unbekannte, ungepatchte Lücke', 'Malware die sich selbst löscht'], correct: 2, explain: 'Zero Days = Tage die der Hersteller hatte zu reagieren — nämlich null. Solche Exploits kosten Millionen im Darknet.' },
      { q: 'Verizon DBIR 2023: Häufigster Faktor bei Datenpannen?', options: ['Ungepatchte Software', 'Menschliches Fehlverhalten (74%)', 'Schwache Verschlüsselung', 'Physischer Einbruch'], correct: 1, explain: 'Verizon DBIR 2023: 74% aller Datenpannen involvieren den Human Element — Technik allein reicht nicht.' },
      { q: 'Zweck eines Penetrationstests?', options: ['Mitarbeiter heimlich prüfen', 'Netzwerkgeschwindigkeit messen', 'Autorisierter Angriff zur Aufdeckung realer Schwachstellen', 'Automatische Updates'], correct: 2, explain: 'Pentests simulieren echte Angriffe mit Genehmigung — Ergebnis: Bericht mit konkreten Schwachstellen und Empfehlungen.' },
    ],
  },
];

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
  const topic = QUIZ_TOPICS[topicIdx];
  const q = topic.questions[current];
  const score = answers.filter(Boolean).length;
  const ac = topic.color;

  const bubbleText =
    phase === 'select' ? 'Wähle ein Thema — ich stelle dir 5 Fragen und bewerte dein KI-Sicherheitswissen.'
    : phase === 'quiz' ? q.q
    : 'Analyse abgeschlossen. Hier ist deine Sicherheitsbewertung.';

  const { displayed, done: typeDone } = useTypewriter(bubbleText, 16, typeActive);

  useEffect(() => {
    setTypeActive(false);
    const t = setTimeout(() => setTypeActive(true), 120);
    return () => clearTimeout(t);
  }, [phase, current]);


  function startTopic(idx: number) {
    setTopicIdx(idx); setCurrent(0); setAnswers([]); setSelected(null); setShowExplain(false); setPhase('quiz');
  }
  function handleSelect(idx: number) {
    if (selected !== null || !typeDone) return;
    setSelected(idx);
    setAnswers(prev => [...prev, idx === q.correct]);
    setTimeout(() => setShowExplain(true), 350);
  }
  function next() {
    if (current + 1 >= topic.questions.length) { setPhase('result'); return; }
    setCurrent(c => c + 1); setSelected(null); setShowExplain(false);
  }
  function reset() {
    setPhase('select'); setCurrent(0); setAnswers([]); setSelected(null); setShowExplain(false);
  }

  const GRADES = [
    { max: 1, label: 'Kritisches Risiko', grade: 'F', color: '#FF3B5C' },
    { max: 2, label: 'Gefährdet', grade: 'D', color: '#FF7A00' },
    { max: 3, label: 'Basisschutz', grade: 'C', color: '#FFB800' },
    { max: 4, label: 'Solide', grade: 'B', color: '#00D4A0' },
    { max: 5, label: 'Experte', grade: 'A+', color: '#00F0FF' },
  ];
  const gMeta = GRADES.find(g => score <= g.max) ?? GRADES[4];

  return (
    <section style={{ position: 'relative', width: '100%', overflow: 'hidden', background: '#060B18', borderBottom: '1px solid rgba(0,240,255,0.07)' }}>
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', backgroundImage: 'linear-gradient(rgba(0,240,255,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(0,240,255,0.02) 1px,transparent 1px)', backgroundSize: '56px 56px', maskImage: 'radial-gradient(ellipse 90% 90% at 60% 50%,black 0%,transparent 100%)' }} />

      <style>{`
        @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
        @keyframes scandown{0%{top:0;opacity:0}5%{opacity:.35}90%{opacity:.35}100%{top:100%;opacity:0}}
        .rs-scanline{position:absolute;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,rgba(0,240,255,0.28),transparent);animation:scandown 7s linear infinite;pointer-events:none;z-index:4}
        @media(max-width:760px){.rs-wrap{flex-direction:column!important}.rs-robot{width:100%!important;min-width:unset!important;height:280px!important}}
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
              {/* Arrow right → toward robot */}
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
                        <div style={{ fontFamily: 'var(--mono)', fontSize: '8px', letterSpacing: '0.18em', textTransform: 'uppercase' as const, marginBottom: '4px', color: answers[answers.length - 1] ? '#00F0A0' : '#FF3B5C' }}>{answers[answers.length - 1] ? '[ KORREKT ]' : '[ FALSCH ]'}</div>
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
                  {QUIZ_TOPICS.map((t, i) => (
                    <motion.button key={t.id} onClick={() => startTopic(i)}
                      initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                      whileHover={{ borderColor: t.color + '50', scale: 1.02 }} whileTap={{ scale: 0.98 }}
                      style={{ padding: '12px 13px', background: i === topicIdx ? t.color + '10' : 'rgba(255,255,255,0.02)', border: '1px solid ' + (i === topicIdx ? t.color + '30' : 'rgba(255,255,255,0.06)'), borderRadius: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', transition: 'all 0.2s', textAlign: 'left' as const }}
                    >
                      <span style={{ width: '30px', height: '30px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: t.color + '12', border: '1px solid ' + t.color + '22', borderRadius: '7px', fontSize: '13px', color: t.color }}>{t.icon}</span>
                      <div>
                        <div style={{ fontFamily: 'var(--font)', fontSize: '13px', fontWeight: 700, color: '#CCD8EF' }}>{t.title}</div>
                        <div style={{ fontFamily: 'var(--mono)', fontSize: '9px', color: t.color, letterSpacing: '0.06em', marginTop: '1px' }}>5 Fragen</div>
                      </div>
                    </motion.button>
                  ))}
                </div>
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

        {/* RIGHT: Robot — no box, floats free */}
        <div className="rs-robot" style={{ width: '42%', minWidth: '260px', position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

          <motion.div animate={{ y: [0, -4, 0] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            style={{ alignSelf: 'flex-end', display: 'flex', alignItems: 'center', gap: '6px', fontFamily: 'var(--mono)', fontSize: '9px', letterSpacing: '0.12em', color: ac, textTransform: 'uppercase' as const, background: 'rgba(6,11,24,0.85)', border: '1px solid ' + ac + '28', padding: '5px 11px', borderRadius: '100px', backdropFilter: 'blur(8px)', marginBottom: '8px', transition: 'color 0.4s, border-color 0.4s' }}
          >
            <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: ac, animation: 'blink 1.4s infinite', transition: 'background 0.4s' }} />
            {phase === 'quiz' ? topic.icon + ' ' + topic.title : phase === 'result' ? '✓ Fertig' : 'Bereit'}
          </motion.div>

          <div style={{ width: '100%', height: 'clamp(380px,48vw,540px)', position: 'relative' }}>
            <div className="rs-scanline" style={{ top: 0 }} />
            <div style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '65%', height: '28%', background: 'radial-gradient(ellipse,' + ac + '12 0%,transparent 70%)', transition: 'all 0.6s', pointerEvents: 'none' }} />
            <SplineScene scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode" className="w-full h-full" />
          </div>

          {phase === 'quiz' && (
            <div style={{ display: 'flex', gap: '6px', marginTop: '6px' }}>
              {topic.questions.map((_, i) => (
                <div key={i} style={{ width: i === current ? '18px' : '6px', height: '6px', borderRadius: '3px', background: i < current ? ac + '55' : i === current ? ac : 'rgba(255,255,255,0.1)', transition: 'all 0.35s' }} />
              ))}
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
