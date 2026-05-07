'use client';

import { SplineScene } from '@/components/ui/splite';
import { useTheme } from '@/contexts/ThemeContext';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const QUESTIONS = [
  {
    id: 1,
    q: 'Sie erhalten eine E-Mail von "support@paypal.secure-login.net". Was tun Sie?',
    options: [
      { text: 'Link anklicken und Daten eingeben', correct: false },
      { text: 'Domain prüfen — "paypal" steht nicht vor ".com", löschen', correct: true },
      { text: 'Antworten und Echtheit erfragen', correct: false },
      { text: 'Vorsorglich Passwort ändern, dann einloggen', correct: false },
    ],
    explain: '"paypal" erscheint als Subdomain — die echte Domain ist "secure-login.net". KI-Phishing setzt genau hier an.',
  },
  {
    id: 2,
    q: 'Ihr CEO schreibt per WhatsApp: "Überweise sofort 8.000€ — streng geheim!" Was ist das?',
    options: [
      { text: 'Eine interne Notfallanfrage', correct: false },
      { text: 'CEO-Fraud — KI imitiert Textstil, niemals ohne Rückruf handeln', correct: true },
      { text: 'Ein Test der IT-Abteilung', correct: false },
      { text: 'Spam, einfach ignorieren', correct: false },
    ],
    explain: 'KI kann Schreibstil, Tonfall und sogar Stimmen imitieren. Immer telefonisch direkt beim CEO rückfragen.',
  },
  {
    id: 3,
    q: 'Ihr Passwort wurde in einem Datenleck veröffentlicht. Welcher Schutz hilft am meisten?',
    options: [
      { text: 'Ein komplexeres neues Passwort setzen', correct: false },
      { text: 'Zwei-Faktor-Authentifizierung (2FA) aktivieren', correct: true },
      { text: 'VPN nutzen', correct: false },
      { text: 'Passwort alle 30 Tage wechseln', correct: false },
    ],
    explain: '2FA macht ein geleaktes Passwort allein wertlos — Angreifer brauchen zusätzlich Ihr Gerät.',
  },
  {
    id: 4,
    q: 'Ihr PC zeigt: "Alle Daten verschlüsselt — zahlen Sie 2 BTC." Was tun Sie zuerst?',
    options: [
      { text: 'Sofort Bitcoin überweisen', correct: false },
      { text: 'PC neu starten', correct: false },
      { text: 'PC sofort vom Netz trennen, IT & BSI informieren', correct: true },
      { text: 'Antivirusprogramm starten', correct: false },
    ],
    explain: 'Netzwerktrennung stoppt die Ausbreitung. Zahlung garantiert keine Entschlüsselung — 40% der Opfer erhalten trotzdem keine Daten zurück.',
  },
  {
    id: 5,
    q: 'Ein "Microsoft-Techniker" ruft an und braucht kurz Ihren Remote-Zugang. Was ist das?',
    options: [
      { text: 'Eine legitime Supportanfrage', correct: false },
      { text: 'Social Engineering — echte IT fragt nie telefonisch nach Zugangsdaten', correct: true },
      { text: 'Ein Standard-Sicherheitscheck', correct: false },
      { text: 'Könnte echt sein, ich gebe die Daten durch', correct: false },
    ],
    explain: 'Microsoft, BSI und echte IT-Teams fragen niemals unaufgefordert nach Passwörtern oder Remote-Zugängen.',
  },
];

const SCORE_LEVELS = [
  { min: 0, max: 1, label: 'Kritisches Risiko', sublabel: 'Sofortiger Handlungsbedarf', color: '#FF3B5C', grade: 'F', icon: '⚠' },
  { min: 2, max: 2, label: 'Gefährdet', sublabel: 'Grundwissen fehlt', color: '#FF7A00', grade: 'D', icon: '◈' },
  { min: 3, max: 3, label: 'Basisschutz', sublabel: 'Mit erkennbaren Lücken', color: '#FFB800', grade: 'C', icon: '◆' },
  { min: 4, max: 4, label: 'Solide aufgestellt', sublabel: 'Kleine Schwachstellen', color: '#00D4A0', grade: 'B', icon: '◉' },
  { min: 5, max: 5, label: 'KI-Sicherheitsexperte', sublabel: 'Exzellenter Schutz', color: '#00F0FF', grade: 'A+', icon: '✦' },
];

function useTypewriter(text: string, speed = 22, active = true) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);
  useEffect(() => {
    if (!active) { setDisplayed(text); setDone(true); return; }
    setDisplayed('');
    setDone(false);
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) { clearInterval(interval); setDone(true); }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed, active]);
  return { displayed, done };
}

export default function RobotSection() {
  const { theme } = useTheme();
  const [phase, setPhase] = useState<'idle' | 'quiz' | 'result'>('idle');
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [showExplain, setShowExplain] = useState(false);
  const [typeActive, setTypeActive] = useState(false);
  const score = answers.filter(Boolean).length;
  const level = SCORE_LEVELS.find(l => score >= l.min && score <= l.max)!;
  const q = QUESTIONS[current];

  const introText = 'Initiiere Bedrohungsbewertung… Bereit für Ihre KI-Sicherheitsanalyse?';
  const { displayed: introDisplayed, done: introDone } = useTypewriter(introText, 28, phase === 'idle');
  const { displayed: qDisplayed, done: qDone } = useTypewriter(q?.q ?? '', 22, typeActive);

  useEffect(() => {
    if (phase === 'quiz') {
      setTypeActive(false);
      const t = setTimeout(() => setTypeActive(true), 80);
      return () => clearTimeout(t);
    }
  }, [current, phase]);

  function startQuiz() {
    setPhase('quiz');
    setCurrent(0);
    setAnswers([]);
    setSelected(null);
    setShowExplain(false);
  }

  function handleSelect(idx: number) {
    if (selected !== null) return;
    const isCorrect = q.options[idx].correct;
    setSelected(idx);
    setAnswers(prev => [...prev, isCorrect]);
    setTimeout(() => setShowExplain(true), 400);
  }

  function next() {
    if (current + 1 >= QUESTIONS.length) {
      setPhase('result');
    } else {
      setCurrent(c => c + 1);
      setSelected(null);
      setShowExplain(false);
    }
  }

  const isDark = theme === 'dark';
  const bg = isDark ? '#060B18' : '#0A0F1E';
  const borderCol = isDark ? 'rgba(0,240,255,0.12)' : 'rgba(0,240,255,0.10)';

  return (
    <section style={{
      position: 'relative',
      width: '100%',
      overflow: 'hidden',
      background: bg,
      borderTop: `1px solid ${borderCol}`,
      borderBottom: `1px solid ${borderCol}`,
      minHeight: '800px',
    }}>
      {/* Ambient grid */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'linear-gradient(rgba(0,240,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,240,255,0.03) 1px, transparent 1px)',
        backgroundSize: '48px 48px',
        maskImage: 'radial-gradient(ellipse 70% 70% at 50% 50%, black 20%, transparent 100%)',
      }} />

      {/* Scan line ambient */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
        background: 'linear-gradient(90deg, transparent, rgba(0,240,255,0.6), transparent)',
        animation: 'scanline 4s ease-in-out infinite',
        pointerEvents: 'none',
      }} />

      <style>{`
        @keyframes scanline {
          0% { transform: translateY(0); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(800px); opacity: 0; }
        }
        @keyframes pulse-ring {
          0% { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(1.5); opacity: 0; }
        }
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>

      {/* Progress bar */}
      {phase === 'quiz' && (
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'rgba(0,240,255,0.08)', zIndex: 10 }}>
          <motion.div
            style={{ height: '100%', background: 'linear-gradient(90deg, #00A8CC, #00F0FF)', borderRadius: '0 2px 2px 0' }}
            initial={{ width: `${(current / QUESTIONS.length) * 100}%` }}
            animate={{ width: `${((current + 1) / QUESTIONS.length) * 100}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
        </div>
      )}

      {/* Content wrapper */}
      <div style={{
        position: 'relative',
        maxWidth: '900px',
        margin: '0 auto',
        padding: 'clamp(40px, 6vw, 80px) 24px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0px',
        zIndex: 2,
      }}>

        {/* Header badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            fontFamily: 'var(--mono)', fontSize: '10px',
            letterSpacing: '0.18em', textTransform: 'uppercase',
            color: '#00F0FF', marginBottom: '24px',
            border: '1px solid rgba(0,240,255,0.2)',
            padding: '6px 16px', borderRadius: '100px',
            background: 'rgba(0,240,255,0.04)',
          }}
        >
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#00F0FF', animation: 'blink 1.4s ease-in-out infinite' }} />
          KI-Sicherheitsanalyse — Interaktiv
        </motion.div>

        {/* Speech bubble */}
        <AnimatePresence mode="wait">
          {phase !== 'result' && (
            <motion.div
              key={phase === 'idle' ? 'intro' : `q-${current}`}
              initial={{ opacity: 0, scale: 0.96, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -10 }}
              transition={{ duration: 0.3 }}
              style={{
                position: 'relative',
                background: 'rgba(0,240,255,0.04)',
                border: '1px solid rgba(0,240,255,0.18)',
                borderRadius: '16px 16px 16px 4px',
                padding: '24px 28px',
                maxWidth: '680px',
                width: '100%',
                marginBottom: '8px',
              }}
            >
              {/* Corner accent */}
              <div style={{
                position: 'absolute', top: -1, left: -1, width: '24px', height: '24px',
                borderTop: '2px solid #00F0FF', borderLeft: '2px solid #00F0FF',
                borderRadius: '16px 0 0 0',
              }} />
              <div style={{
                position: 'absolute', bottom: -1, right: -1, width: '24px', height: '24px',
                borderBottom: '2px solid rgba(0,240,255,0.3)', borderRight: '2px solid rgba(0,240,255,0.3)',
                borderRadius: '0 0 16px 0',
              }} />

              {/* Label */}
              <div style={{
                fontFamily: 'var(--mono)', fontSize: '9px', letterSpacing: '0.2em',
                color: 'rgba(0,240,255,0.5)', textTransform: 'uppercase', marginBottom: '10px',
              }}>
                {phase === 'idle' ? '[ SICHERHEITS-KI // BEREIT ]' : `[ FRAGE ${current + 1} / ${QUESTIONS.length} ]`}
              </div>

              <p style={{
                fontFamily: 'var(--font)',
                fontSize: 'clamp(15px, 2vw, 18px)',
                color: '#E8F0FF',
                lineHeight: 1.65,
                margin: 0,
                minHeight: '54px',
              }}>
                {phase === 'idle' ? introDisplayed : qDisplayed}
                {((phase === 'idle' && !introDone) || (phase === 'quiz' && !qDone)) && (
                  <span style={{ animation: 'blink 0.7s ease-in-out infinite', color: '#00F0FF' }}>▌</span>
                )}
              </p>

              {/* Bubble tail */}
              <div style={{
                position: 'absolute', bottom: '-11px', left: '28px',
                width: '20px', height: '12px',
                background: 'rgba(0,240,255,0.04)',
                borderLeft: '1px solid rgba(0,240,255,0.18)',
                borderBottom: '1px solid rgba(0,240,255,0.18)',
                clipPath: 'polygon(0 0, 100% 0, 0 100%)',
              }} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Robot scene */}
        <div style={{
          position: 'relative',
          width: '100%',
          maxWidth: '520px',
          height: '320px',
          margin: '0 auto',
          flexShrink: 0,
        }}>
          {/* Glow ring */}
          <div style={{
            position: 'absolute', bottom: '10px', left: '50%', transform: 'translateX(-50%)',
            width: '200px', height: '30px',
            background: 'radial-gradient(ellipse, rgba(0,240,255,0.15) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />

          <SplineScene
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            className="w-full h-full"
          />

          {/* Phase indicator ring */}
          {phase === 'idle' && introDone && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{
                position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)',
                fontFamily: 'var(--mono)', fontSize: '10px', letterSpacing: '0.15em',
                color: 'rgba(0,240,255,0.5)', textTransform: 'uppercase',
                animation: 'blink 2s ease-in-out infinite',
              }}
            >
              ↓ Analyse starten ↓
            </motion.div>
          )}
        </div>

        {/* === IDLE: Start button === */}
        <AnimatePresence mode="wait">
          {phase === 'idle' && introDone && (
            <motion.div
              key="start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              style={{ width: '100%', maxWidth: '520px', marginTop: '-16px' }}
            >
              <button
                onClick={startQuiz}
                style={{
                  width: '100%',
                  padding: '18px 32px',
                  background: 'linear-gradient(135deg, rgba(0,240,255,0.15) 0%, rgba(0,168,204,0.1) 100%)',
                  border: '1px solid rgba(0,240,255,0.35)',
                  borderRadius: '12px',
                  color: '#00F0FF',
                  fontFamily: 'var(--mono)',
                  fontSize: '14px',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  position: 'relative',
                  overflow: 'hidden',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.background = 'linear-gradient(135deg, rgba(0,240,255,0.25) 0%, rgba(0,168,204,0.18) 100%)';
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,240,255,0.6)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.background = 'linear-gradient(135deg, rgba(0,240,255,0.15) 0%, rgba(0,168,204,0.1) 100%)';
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,240,255,0.35)';
                }}
              >
                ◈ &nbsp; Jetzt Sicherheitslevel testen
              </button>

              {/* Sub-label */}
              <p style={{
                textAlign: 'center', fontFamily: 'var(--mono)', fontSize: '10px',
                color: 'rgba(255,255,255,0.25)', letterSpacing: '0.08em',
                marginTop: '10px',
              }}>
                5 Fragen · ~2 Minuten · Keine Anmeldung
              </p>
            </motion.div>
          )}

          {/* === QUIZ: Options === */}
          {phase === 'quiz' && qDone && (
            <motion.div
              key={`options-${current}`}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.35 }}
              style={{ width: '100%', maxWidth: '680px', marginTop: '-16px' }}
            >
              {/* Options grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '10px', marginBottom: '16px' }}>
                {q.options.map((opt, idx) => {
                  const isSelected = selected === idx;
                  const isCorrect = opt.correct;
                  const revealed = selected !== null;

                  let borderColor = 'rgba(255,255,255,0.08)';
                  let bgColor = 'rgba(255,255,255,0.02)';
                  let textColor = 'rgba(255,255,255,0.7)';

                  if (revealed) {
                    if (isCorrect) {
                      borderColor = 'rgba(0,240,160,0.5)';
                      bgColor = 'rgba(0,240,160,0.07)';
                      textColor = '#00F0A0';
                    } else if (isSelected && !isCorrect) {
                      borderColor = 'rgba(255,59,92,0.5)';
                      bgColor = 'rgba(255,59,92,0.07)';
                      textColor = '#FF3B5C';
                    } else {
                      borderColor = 'rgba(255,255,255,0.04)';
                      textColor = 'rgba(255,255,255,0.3)';
                    }
                  }

                  return (
                    <motion.button
                      key={idx}
                      onClick={() => handleSelect(idx)}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.08 }}
                      style={{
                        padding: '14px 18px',
                        background: bgColor,
                        border: `1px solid ${borderColor}`,
                        borderRadius: '10px',
                        color: textColor,
                        fontFamily: 'var(--font)',
                        fontSize: '14px',
                        lineHeight: 1.5,
                        textAlign: 'left',
                        cursor: selected !== null ? 'default' : 'pointer',
                        transition: 'all 0.25s',
                        display: 'flex', alignItems: 'flex-start', gap: '10px',
                      }}
                      whileHover={selected === null ? { borderColor: 'rgba(0,240,255,0.3)', backgroundColor: 'rgba(0,240,255,0.04)' } : {}}
                    >
                      <span style={{
                        fontFamily: 'var(--mono)', fontSize: '11px',
                        color: revealed ? (isCorrect ? '#00F0A0' : (isSelected ? '#FF3B5C' : 'rgba(255,255,255,0.2)')) : 'rgba(0,240,255,0.4)',
                        flexShrink: 0, marginTop: '2px', fontWeight: 700,
                      }}>
                        {revealed ? (isCorrect ? '✓' : (isSelected ? '✗' : String.fromCharCode(65 + idx))) : String.fromCharCode(65 + idx)}
                      </span>
                      {opt.text}
                    </motion.button>
                  );
                })}
              </div>

              {/* Explanation + Next */}
              <AnimatePresence>
                {showExplain && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div style={{
                      padding: '14px 18px',
                      background: answers[answers.length - 1]
                        ? 'rgba(0,240,160,0.06)' : 'rgba(255,59,92,0.06)',
                      border: `1px solid ${answers[answers.length - 1] ? 'rgba(0,240,160,0.2)' : 'rgba(255,59,92,0.2)'}`,
                      borderRadius: '10px',
                      marginBottom: '12px',
                    }}>
                      <div style={{
                        fontFamily: 'var(--mono)', fontSize: '9px', letterSpacing: '0.18em',
                        color: answers[answers.length - 1] ? '#00F0A0' : '#FF3B5C',
                        textTransform: 'uppercase', marginBottom: '6px',
                      }}>
                        {answers[answers.length - 1] ? '[ KORREKT ]' : '[ FALSCH ]'} — KI-Erklärung:
                      </div>
                      <p style={{ fontFamily: 'var(--font)', fontSize: '13px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, margin: 0 }}>
                        {q.explain}
                      </p>
                    </div>

                    <button
                      onClick={next}
                      style={{
                        width: '100%', padding: '14px',
                        background: 'rgba(0,240,255,0.08)',
                        border: '1px solid rgba(0,240,255,0.25)',
                        borderRadius: '10px',
                        color: '#00F0FF',
                        fontFamily: 'var(--mono)', fontSize: '12px',
                        fontWeight: 700, letterSpacing: '0.12em',
                        textTransform: 'uppercase', cursor: 'pointer',
                        transition: 'all 0.2s',
                      }}
                      onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'rgba(0,240,255,0.14)'}
                      onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'rgba(0,240,255,0.08)'}
                    >
                      {current + 1 >= QUESTIONS.length ? 'Auswertung anzeigen →' : `Nächste Frage → (${current + 1}/${QUESTIONS.length})`}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {/* === RESULT === */}
          {phase === 'result' && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              style={{
                width: '100%', maxWidth: '680px',
                background: 'rgba(0,0,0,0.4)',
                border: `1px solid ${level.color}30`,
                borderRadius: '16px',
                padding: '32px 28px',
                position: 'relative',
                overflow: 'hidden',
                marginTop: '-32px',
              }}
            >
              {/* Background glow */}
              <div style={{
                position: 'absolute', top: '-40px', right: '-40px',
                width: '200px', height: '200px',
                background: `radial-gradient(circle, ${level.color}15 0%, transparent 70%)`,
                pointerEvents: 'none',
              }} />

              {/* Grade badge */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '24px' }}>
                <div style={{
                  width: '72px', height: '72px',
                  border: `2px solid ${level.color}`,
                  borderRadius: '12px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                  background: `${level.color}10`,
                  boxShadow: `0 0 24px ${level.color}20`,
                }}>
                  <span style={{ fontFamily: 'var(--mono)', fontSize: '26px', fontWeight: 900, color: level.color }}>
                    {level.grade}
                  </span>
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: '9px', letterSpacing: '0.18em', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', marginBottom: '4px' }}>
                    Ihr Sicherheitsniveau
                  </div>
                  <div style={{ fontFamily: 'var(--font)', fontSize: '22px', fontWeight: 800, color: level.color, lineHeight: 1.1 }}>
                    {level.label}
                  </div>
                  <div style={{ fontFamily: 'var(--font)', fontSize: '13px', color: 'rgba(255,255,255,0.4)', marginTop: '2px' }}>
                    {level.sublabel}
                  </div>
                </div>
              </div>

              {/* Score bar */}
              <div style={{ marginBottom: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontFamily: 'var(--mono)', fontSize: '10px', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em' }}>
                    RICHTIGE ANTWORTEN
                  </span>
                  <span style={{ fontFamily: 'var(--mono)', fontSize: '10px', color: level.color, letterSpacing: '0.1em' }}>
                    {score} / {QUESTIONS.length}
                  </span>
                </div>
                <div style={{ height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden' }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(score / QUESTIONS.length) * 100}%` }}
                    transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
                    style={{ height: '100%', background: `linear-gradient(90deg, ${level.color}80, ${level.color})`, borderRadius: '3px' }}
                  />
                </div>
              </div>

              {/* Per-question breakdown */}
              <div style={{ display: 'flex', gap: '6px', marginBottom: '24px' }}>
                {answers.map((correct, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.08 }}
                    style={{
                      flex: 1, height: '32px',
                      background: correct ? 'rgba(0,240,160,0.12)' : 'rgba(255,59,92,0.12)',
                      border: `1px solid ${correct ? 'rgba(0,240,160,0.25)' : 'rgba(255,59,92,0.25)'}`,
                      borderRadius: '6px',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontFamily: 'var(--mono)', fontSize: '12px',
                      color: correct ? '#00F0A0' : '#FF3B5C',
                    }}
                  >
                    {correct ? '✓' : '✗'}
                  </motion.div>
                ))}
              </div>

              {/* CTA row */}
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <button
                  onClick={startQuiz}
                  style={{
                    flex: 1, minWidth: '160px', padding: '13px 20px',
                    background: 'rgba(0,240,255,0.08)',
                    border: '1px solid rgba(0,240,255,0.2)',
                    borderRadius: '10px',
                    color: '#00F0FF', fontFamily: 'var(--mono)',
                    fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em',
                    textTransform: 'uppercase', cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'rgba(0,240,255,0.14)'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'rgba(0,240,255,0.08)'}
                >
                  ↺ Erneut testen
                </button>
                <a
                  href="/de/tools"
                  style={{
                    flex: 1, minWidth: '160px', padding: '13px 20px',
                    background: `${level.color}15`,
                    border: `1px solid ${level.color}40`,
                    borderRadius: '10px',
                    color: level.color, fontFamily: 'var(--mono)',
                    fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em',
                    textTransform: 'uppercase', cursor: 'pointer',
                    textDecoration: 'none', display: 'flex',
                    alignItems: 'center', justifyContent: 'center',
                    transition: 'all 0.2s',
                  }}
                >
                  Sicherheit prüfen →
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
