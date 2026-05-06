'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, useSpring, animate } from 'framer-motion';

// ─── Password Checker Mini ───
function PasswordChecker() {
  const [password, setPassword] = useState('');

  const getStrength = (pw: string) => {
    let score = 0;
    if (pw.length >= 8) score++;
    if (pw.length >= 12) score++;
    if (/[A-Z]/.test(pw)) score++;
    if (/[0-9]/.test(pw)) score++;
    if (/[^A-Za-z0-9]/.test(pw)) score++;
    return score;
  };

  const score = getStrength(password);

  const levels = [
    { label: 'Sehr schwach', color: '#FF2D6F' },
    { label: 'Schwach', color: '#FF5A3A' },
    { label: 'Mittel', color: '#FF9632' },
    { label: 'Stark', color: '#78C864' },
    { label: 'Sehr stark', color: '#00F0FF' },
    { label: 'Unbreachable', color: '#00F0FF' },
  ];

  const current = levels[Math.min(score, 5)];

  const CHECKS = [
    { label: 'Mindestens 8 Zeichen', pass: password.length >= 8 },
    { label: 'Großbuchstabe', pass: /[A-Z]/.test(password) },
    { label: 'Ziffer', pass: /[0-9]/.test(password) },
    { label: 'Sonderzeichen', pass: /[^A-Za-z0-9]/.test(password) },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%' }}>
      <div style={{ position: 'relative' }}>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Passwort eingeben…"
          style={{
            width: '100%',
            padding: '14px 18px',
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '10px',
            color: '#E8EDF8',
            fontFamily: 'var(--mono)',
            fontSize: '14px',
            outline: 'none',
            boxSizing: 'border-box',
            transition: 'border-color 0.2s',
          }}
          onFocus={e => (e.target.style.borderColor = 'rgba(0,240,255,0.4)')}
          onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')}
        />
      </div>

      {/* Strength meter */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span style={{ fontFamily: 'var(--mono)', fontSize: '11px', color: 'rgba(232,237,248,0.4)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Stärke
          </span>
          <span style={{ fontFamily: 'var(--mono)', fontSize: '11px', color: current.color, fontWeight: 700 }}>
            {password ? current.label : '—'}
          </span>
        </div>
        <div style={{
          display: 'flex', gap: '6px',
        }}>
          {[0, 1, 2, 3, 4].map(i => (
            <motion.div
              key={i}
              animate={{
                background: i < score ? current.color : 'rgba(255,255,255,0.08)',
                boxShadow: i < score ? `0 0 8px ${current.color}66` : 'none',
              }}
              transition={{ duration: 0.3, delay: i * 0.04 }}
              style={{
                flex: 1, height: '4px', borderRadius: '2px',
              }}
            />
          ))}
        </div>
      </div>

      {/* Checks */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {CHECKS.map(check => (
          <div key={check.label} style={{
            display: 'flex', alignItems: 'center', gap: '10px',
            fontSize: '12px', fontFamily: 'var(--mono)',
          }}>
            <motion.span
              animate={{ color: check.pass ? '#78C864' : 'rgba(232,237,248,0.25)' }}
              style={{ fontSize: '14px', flexShrink: 0 }}
            >
              {check.pass ? '✓' : '○'}
            </motion.span>
            <span style={{ color: check.pass ? 'rgba(232,237,248,0.7)' : 'rgba(232,237,248,0.3)' }}>
              {check.label}
            </span>
          </div>
        ))}
      </div>

      {password && score >= 3 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            padding: '12px 14px',
            background: 'rgba(120,200,100,0.08)',
            border: '1px solid rgba(120,200,100,0.2)',
            borderRadius: '8px',
            fontFamily: 'var(--mono)',
            fontSize: '11px',
            color: '#78C864',
          }}
        >
          ✓ Geschätzte Crackzeit: {score === 5 ? '> 1 Billion Jahre' : score === 4 ? '~200 Jahre' : '~3 Monate'}
        </motion.div>
      )}
    </div>
  );
}

// ─── Phishing Quiz Mini ───
function PhishingQuiz() {
  const [selected, setSelected] = useState<number | null>(null);

  const Q = {
    text: 'Welche URL ist legitim?',
    options: [
      { label: 'paypal-secure-login.com/account', correct: false },
      { label: 'paypal.com/signin', correct: true },
      { label: 'www-paypal.com/login', correct: false },
      { label: 'paypa1.com/secure', correct: false },
    ],
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%' }}>
      <div style={{
        padding: '16px 18px',
        background: 'rgba(0,240,255,0.04)',
        border: '1px solid rgba(0,240,255,0.12)',
        borderRadius: '10px',
        fontFamily: 'var(--mono)',
        fontSize: '13px',
        color: '#E8EDF8',
        lineHeight: 1.5,
      }}>
        <span style={{ color: 'rgba(0,240,255,0.6)', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: '8px' }}>
          // phishing detector · frage 1/5
        </span>
        {Q.text}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {Q.options.map((opt, i) => {
          const isSelected = selected === i;
          const isCorrect = opt.correct;
          const showResult = selected !== null;

          let bg = 'rgba(255,255,255,0.03)';
          let border = 'rgba(255,255,255,0.08)';
          let textColor = 'rgba(232,237,248,0.6)';

          if (showResult) {
            if (isCorrect) { bg = 'rgba(120,200,100,0.1)'; border = 'rgba(120,200,100,0.3)'; textColor = '#78C864'; }
            else if (isSelected) { bg = 'rgba(255,45,111,0.1)'; border = 'rgba(255,45,111,0.3)'; textColor = '#FF2D6F'; }
          } else if (isSelected) {
            bg = 'rgba(0,240,255,0.08)';
            border = 'rgba(0,240,255,0.3)';
            textColor = '#00F0FF';
          }

          return (
            <motion.button
              key={i}
              onClick={() => !showResult && setSelected(i)}
              whileHover={!showResult ? { scale: 1.01 } : {}}
              whileTap={!showResult ? { scale: 0.99 } : {}}
              style={{
                padding: '12px 16px',
                background: bg,
                border: `1px solid ${border}`,
                borderRadius: '8px',
                fontFamily: 'var(--mono)',
                fontSize: '12px',
                color: textColor,
                cursor: showResult ? 'default' : 'pointer',
                textAlign: 'left',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                transition: 'background 0.2s, border-color 0.2s',
              }}
            >
              <span style={{
                width: '20px', height: '20px',
                border: `1.5px solid ${border}`,
                borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '10px', fontWeight: 700, flexShrink: 0,
                color: textColor,
              }}>
                {showResult && isCorrect ? '✓' : showResult && isSelected ? '✗' : String.fromCharCode(65 + i)}
              </span>
              {opt.label}
            </motion.button>
          );
        })}
      </div>

      {selected !== null && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            padding: '12px 14px',
            background: Q.options[selected].correct ? 'rgba(120,200,100,0.08)' : 'rgba(255,45,111,0.08)',
            border: `1px solid ${Q.options[selected].correct ? 'rgba(120,200,100,0.2)' : 'rgba(255,45,111,0.2)'}`,
            borderRadius: '8px',
            fontSize: '12px',
            fontFamily: 'var(--mono)',
            color: Q.options[selected].correct ? '#78C864' : '#FF2D6F',
          }}
        >
          {Q.options[selected].correct
            ? '✓ Korrekt! paypal.com ist die einzige legitime Domain.'
            : '✗ Falsch. Achte auf den genauen Domain-Namen.'}
        </motion.div>
      )}
    </div>
  );
}

// ─── Security Score Ring ───
function SecurityScoreRing() {
  const [score, setScore] = useState(0);
  const targetScore = 72;

  useEffect(() => {
    const controls = animate(0, targetScore, {
      duration: 1.8,
      ease: 'easeOut',
      onUpdate: v => setScore(Math.round(v)),
    });
    return () => controls.stop();
  }, []);

  const circumference = 2 * Math.PI * 80;
  const strokeDash = (score / 100) * circumference;

  const CATEGORIES = [
    { label: 'Netzwerk', value: 82, color: '#00F0FF' },
    { label: 'Endpoints', value: 67, color: '#FF9632' },
    { label: 'Identitäten', value: 74, color: '#00F0FF' },
    { label: 'KI-Compliance', value: 58, color: '#FF2D6F' },
    { label: 'Datenschutz', value: 88, color: '#78C864' },
  ];

  const scoreColor = score < 40 ? '#FF2D6F' : score < 70 ? '#FF9632' : '#00F0FF';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center', width: '100%' }}>
      {/* Ring */}
      <div style={{ position: 'relative', width: '180px', height: '180px' }}>
        <svg viewBox="0 0 200 200" style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
          <circle
            cx="100" cy="100" r="80"
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="12"
          />
          <motion.circle
            cx="100" cy="100" r="80"
            fill="none"
            stroke={`url(#scoreGradMini)`}
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={circumference}
            animate={{ strokeDashoffset: circumference - strokeDash }}
            transition={{ duration: 1.8, ease: 'easeOut' }}
            style={{ filter: `drop-shadow(0 0 8px ${scoreColor}88)` }}
          />
          <defs>
            <linearGradient id="scoreGradMini" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00F0FF" />
              <stop offset="100%" stopColor="#FF2D6F" />
            </linearGradient>
          </defs>
        </svg>
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        }}>
          <div style={{
            fontSize: '40px', fontWeight: 800, letterSpacing: '-0.05em',
            color: '#E8EDF8', lineHeight: 1,
          }}>
            {score}
          </div>
          <div style={{ fontSize: '11px', color: 'rgba(232,237,248,0.4)', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: '4px' }}>
            /100
          </div>
        </div>
      </div>

      {/* Breakdown bars */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }}>
        {CATEGORIES.map((cat, i) => (
          <div key={cat.label} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '11px', fontFamily: 'var(--mono)', color: 'rgba(232,237,248,0.4)', width: '90px', flexShrink: 0 }}>
              {cat.label}
            </span>
            <div style={{ flex: 1, height: '3px', background: 'rgba(255,255,255,0.06)', borderRadius: '2px', overflow: 'hidden' }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${cat.value}%` }}
                transition={{ duration: 1.2, delay: 0.2 + i * 0.1, ease: 'easeOut' }}
                style={{ height: '100%', background: cat.color, borderRadius: '2px' }}
              />
            </div>
            <span style={{ fontSize: '11px', fontFamily: 'var(--mono)', color: 'rgba(232,237,248,0.3)', width: '24px', textAlign: 'right' }}>
              {cat.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main Component ───
const TOOL_CARDS = [
  {
    id: 'password',
    icon: '🔐',
    title: 'Passwort-Checker',
    subtitle: 'KI-gestützte Stärkenanalyse in Echtzeit',
    color: '#00F0FF',
    bg: 'linear-gradient(135deg, #060D24 0%, #071830 60%, #0A1E40 100%)',
    gradientBorder: 'rgba(0,240,255,0.3)',
    component: <PasswordChecker />,
  },
  {
    id: 'phishing',
    icon: '🎣',
    title: 'Phishing-Detektor',
    subtitle: 'Erkenne gefährliche Inhalte sofort',
    color: '#FF9632',
    bg: 'linear-gradient(135deg, #1A0A00 0%, #241400 60%, #2A1800 100%)',
    gradientBorder: 'rgba(255,150,50,0.3)',
    component: <PhishingQuiz />,
  },
  {
    id: 'score',
    icon: '📊',
    title: 'Security-Score',
    subtitle: 'Dein persönliches Risikoprofil',
    color: '#FF2D6F',
    bg: 'linear-gradient(135deg, #160420 0%, #1E0630 60%, #240840 100%)',
    gradientBorder: 'rgba(255,45,111,0.3)',
    component: <SecurityScoreRing />,
  },
];

export default function HorizontalToolScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 40 });
  const [currentCard, setCurrentCard] = useState(0);
  const [dragging, setDragging] = useState(false);

  const cardWidth = typeof window !== 'undefined' ? Math.min(window.innerWidth * 0.8, 640) : 640;
  const gap = 24;
  const totalWidth = TOOL_CARDS.length * (cardWidth + gap);

  const snapToCard = (index: number) => {
    const target = -(index * (cardWidth + gap));
    animate(x, target, { type: 'spring', stiffness: 300, damping: 40 });
    setCurrentCard(index);
  };

  const handleDragEnd = (_: any, info: any) => {
    setDragging(false);
    const threshold = cardWidth * 0.3;
    if (info.offset.x < -threshold && currentCard < TOOL_CARDS.length - 1) {
      snapToCard(currentCard + 1);
    } else if (info.offset.x > threshold && currentCard > 0) {
      snapToCard(currentCard - 1);
    } else {
      snapToCard(currentCard);
    }
  };

  return (
    <section style={{
      padding: '140px 0',
      background: 'var(--bg)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Header */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 48px', marginBottom: '56px' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div style={{
            fontFamily: 'var(--mono)', fontSize: '11px', letterSpacing: '0.14em',
            textTransform: 'uppercase', color: 'var(--cyan)', marginBottom: '12px',
            display: 'flex', alignItems: 'center', gap: '12px',
          }}>
            <span style={{ display: 'block', width: '24px', height: '1px', background: 'var(--cyan)' }} />
            Sicherheits-Tools · Live Demo
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
            <h2 style={{
              fontSize: 'clamp(36px, 5vw, 64px)',
              fontWeight: 800,
              letterSpacing: '-0.04em',
              lineHeight: 0.95,
              color: '#E8EDF8',
              margin: 0,
            }}>
              Direkt<br />
              <span style={{ color: 'var(--cyan)' }}>ausprobieren</span>
            </h2>
            {/* Dots navigation */}
            <div style={{ display: 'flex', gap: '8px', paddingBottom: '8px' }}>
              {TOOL_CARDS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => snapToCard(i)}
                  style={{
                    width: i === currentCard ? '24px' : '8px',
                    height: '8px',
                    borderRadius: '4px',
                    background: i === currentCard ? 'var(--cyan)' : 'rgba(255,255,255,0.2)',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    padding: 0,
                  }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Horizontal scroll track */}
      <div
        ref={containerRef}
        style={{
          paddingLeft: '48px',
          overflow: 'visible',
          cursor: dragging ? 'grabbing' : 'grab',
        }}
      >
        <motion.div
          ref={trackRef}
          style={{
            display: 'flex',
            gap: `${gap}px`,
            x: springX,
            width: `${totalWidth}px`,
          }}
          drag="x"
          dragConstraints={{
            left: -((TOOL_CARDS.length - 1) * (cardWidth + gap)),
            right: 0,
          }}
          dragElastic={0.1}
          onDragStart={() => setDragging(true)}
          onDragEnd={handleDragEnd}
        >
          {TOOL_CARDS.map((card, i) => (
            <motion.div
              key={card.id}
              style={{
                width: `${cardWidth}px`,
                flexShrink: 0,
                borderRadius: '24px',
                background: card.bg,
                border: `1px solid rgba(255,255,255,0.08)`,
                overflow: 'hidden',
                position: 'relative',
                userSelect: 'none',
              }}
              animate={{
                scale: i === currentCard ? 1 : 0.95,
                opacity: i === currentCard ? 1 : 0.6,
              }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            >
              {/* Animated gradient border */}
              <div style={{
                position: 'absolute', inset: 0, borderRadius: '24px', pointerEvents: 'none',
                background: `linear-gradient(135deg, ${card.gradientBorder}, transparent 50%, ${card.gradientBorder.replace('0.3', '0.1')})`,
                opacity: i === currentCard ? 1 : 0,
                transition: 'opacity 0.4s',
                zIndex: 0,
              }} />

              {/* Ambient glow */}
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: '200px', pointerEvents: 'none',
                background: `radial-gradient(ellipse 60% 100% at 50% 0%, ${card.color}15, transparent)`,
              }} />

              {/* Content */}
              <div style={{ padding: '36px', position: 'relative', zIndex: 1, pointerEvents: i === currentCard ? 'auto' : 'none' }}>
                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
                  <div style={{
                    width: '52px', height: '52px',
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '14px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '24px',
                    flexShrink: 0,
                  }}>
                    {card.icon}
                  </div>
                  <div>
                    <h3 style={{
                      fontSize: '20px', fontWeight: 700, letterSpacing: '-0.02em',
                      color: '#E8EDF8', margin: 0, marginBottom: '4px',
                    }}>
                      {card.title}
                    </h3>
                    <p style={{ fontSize: '13px', color: 'rgba(232,237,248,0.4)', fontFamily: 'var(--mono)', margin: 0 }}>
                      {card.subtitle}
                    </p>
                  </div>
                </div>

                {/* Live tool preview */}
                <div style={{
                  background: 'rgba(0,0,0,0.2)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: '16px',
                  padding: '24px',
                }}>
                  {card.component}
                </div>

                {/* CTA */}
                <div style={{ marginTop: '24px', display: 'flex', gap: '12px' }}>
                  <a href="/de/tools" style={{
                    flex: 1,
                    padding: '12px 20px',
                    background: `linear-gradient(135deg, ${card.color}, ${card.color}88)`,
                    color: '#060B18',
                    fontWeight: 700,
                    fontSize: '13px',
                    textDecoration: 'none',
                    borderRadius: '10px',
                    textAlign: 'center',
                    fontFamily: 'var(--font)',
                    display: 'block',
                  }}>
                    Vollversion →
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Drag hint */}
      <div style={{
        maxWidth: '1280px', margin: '40px auto 0', padding: '0 48px',
        display: 'flex', alignItems: 'center', gap: '8px',
        fontFamily: 'var(--mono)', fontSize: '11px', color: 'rgba(232,237,248,0.25)',
        letterSpacing: '0.06em',
      }}>
        <motion.span
          animate={{ x: [0, 12, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          ←→
        </motion.span>
        Ziehen zum Navigieren · Klicken zum Interagieren
      </div>
    </section>
  );
}
