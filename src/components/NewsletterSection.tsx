'use client';

import { useRef, useState, useMemo } from 'react';

/* ── deterministic pseudo-random seeded by index ── */
function seeded(i: number, salt = 0) {
  const x = Math.sin(i * 127.1 + salt * 311.7) * 43758.5453;
  return x - Math.floor(x);
}

/* ── 25 CSS-only floating particles ── */
const PARTICLES = Array.from({ length: 8 }, (_, i) => ({
  id: i,
  x: seeded(i, 0) * 100,
  y: seeded(i, 1) * 100,
  size: 3 + seeded(i, 2) * 9,
  duration: 20 + seeded(i, 3) * 22,
  delay: -(seeded(i, 4) * 20),
  variant: (i % 5) + 1,
  opacity: 0.08 + seeded(i, 5) * 0.22,
  color: i % 3 === 0 ? 'var(--cyan)' : i % 3 === 1 ? 'var(--magenta)' : 'rgba(200,220,255,0.6)',
}));

/* ── confetti colours ── */
const CONF_COLORS = ['#00F0FF', '#FF2D6F', '#FFD43B', '#69DB7C', '#FF9632', '#74C0FC'];

function mkConfetti() {
  return Array.from({ length: 42 }, (_, i) => {
    const angle = (i / 42) * Math.PI * 2 + seeded(i, 7) * 0.8;
    const dist  = 80 + seeded(i, 8) * 180;
    return {
      id: i,
      color: CONF_COLORS[i % CONF_COLORS.length],
      tx: `${Math.cos(angle) * dist}px`,
      ty: `${-Math.abs(Math.sin(angle) * dist) - 30}px`,
      rot: `${seeded(i, 9) * 720 - 360}deg`,
      delay: `${seeded(i, 10) * 0.25}s`,
      size: 5 + seeded(i, 11) * 9,
      rect: i % 3 !== 0,
    };
  });
}

const TRUST_BADGES = [
  { icon: '🔒', label: 'DSGVO-konform' },
  { icon: '✉️', label: 'Kein Spam' },
  { icon: '📅', label: 'Wöchentlich' },
];

const AVATARS = ['#0098B8', '#D91A55', '#7890FF', '#FF9632', '#69DB7C'];

export default function NewsletterSection() {
  const [email, setEmail]     = useState('');
  const [focused, setFocused] = useState(false);
  const [success, setSuccess] = useState(false);
  const [confetti, setConfetti] = useState<ReturnType<typeof mkConfetti>>([]);
  const confRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const confettiItems = useMemo(() => mkConfetti(), []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSuccess(true);
    setConfetti(confettiItems);
    if (confRef.current) clearTimeout(confRef.current);
    confRef.current = setTimeout(() => setConfetti([]), 2200);
    setEmail('');
  };

  return (
    <section style={{
      position: 'relative',
      overflow: 'hidden',
      padding: '140px 0',
      background: 'var(--bg2)',
      transition: 'background 0.35s',
    }}>
      {/* Deep glow behind */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 60% 70% at 50% 60%, rgba(0,152,184,0.06) 0%, transparent 70%)',
      }} />

      {/* CSS-only floating particles */}
      {PARTICLES.map(p => (
        <div
          key={p.id}
          className="nl-particle"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            background: p.color,
            opacity: p.opacity,
            animationName: `fp${p.variant}`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            animationTimingFunction: 'ease-in-out',
            animationIterationCount: 'infinite',
          }}
        />
      ))}

      {/* Confetti burst */}
      {confetti.map(c => (
        <div
          key={c.id}
          className="confetti-piece"
          style={{
            left: '50%',
            top: '55%',
            width: `${c.size}px`,
            height: c.rect ? `${c.size * 0.5}px` : `${c.size}px`,
            background: c.color,
            borderRadius: c.rect ? '2px' : '50%',
            '--tx': c.tx,
            '--ty': c.ty,
            '--rot': c.rot,
            '--cd': c.delay,
          } as React.CSSProperties}
        />
      ))}

      {/* Content */}
      <div style={{
        maxWidth: '680px',
        margin: '0 auto',
        textAlign: 'center',
        position: 'relative',
        zIndex: 1,
        padding: '0 24px',
      }}>
        {/* Eyebrow */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          fontFamily: 'var(--mono)',
          fontSize: '11px',
          letterSpacing: '0.13em',
          textTransform: 'uppercase',
          color: 'var(--cyan)',
          marginBottom: '20px',
        }}>
          <span style={{
            width: '6px', height: '6px', borderRadius: '50%',
            background: 'var(--cyan)',
            boxShadow: '0 0 8px var(--cyan)',
            display: 'inline-block',
            animation: 'pulse-dot 2s infinite',
          }} />
          Security Intelligence Newsletter
        </div>

        {/* Headline */}
        <h2 style={{
          fontSize: 'clamp(34px, 5vw, 68px)',
          fontWeight: 800,
          letterSpacing: '-0.04em',
          lineHeight: 1.0,
          color: 'var(--text)',
          marginBottom: '20px',
        }}>
          Bleib sicher.<br />
          <span style={{ color: 'var(--cyan)' }}>Bleib informiert.</span>
        </h2>

        <p style={{
          fontSize: '16px',
          color: 'var(--text-dim)',
          lineHeight: 1.75,
          marginBottom: '48px',
          maxWidth: '480px',
          margin: '0 auto 48px',
        }}>
          Wöchentliche Threat Intelligence, neue CVEs und KI-Sicherheits&shy;analysen — direkt in deinen Posteingang.
        </p>

        {/* Form with animated conic border */}
        <div className={`nl-border-wrap${focused ? ' focused' : ''}`}>
          <div className="nl-border-inner">
            <form
              onSubmit={handleSubmit}
              style={{ display: 'flex', width: '100%' }}
            >
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                placeholder="deine@email.de"
                style={{
                  flex: 1,
                  height: '56px',
                  padding: '0 20px',
                  background: 'none',
                  border: 'none',
                  outline: 'none',
                  color: 'var(--text)',
                  fontFamily: 'var(--font)',
                  fontSize: '15px',
                  minWidth: 0,
                }}
              />
              <button
                type="submit"
                style={{
                  height: '56px',
                  padding: '0 28px',
                  background: success
                    ? 'linear-gradient(135deg, #69DB7C 0%, #40C057 100%)'
                    : 'linear-gradient(135deg, var(--cyan) 0%, #007A9A 100%)',
                  color: '#fff',
                  border: 'none',
                  fontSize: '14px',
                  fontWeight: 700,
                  fontFamily: 'var(--font)',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  letterSpacing: '0.02em',
                  transition: 'background 0.4s, box-shadow 0.2s',
                  boxShadow: focused ? '0 0 20px rgba(0,152,184,0.35)' : 'none',
                }}
                onMouseEnter={e => { if (!success) (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 0 28px rgba(0,152,184,0.5)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.boxShadow = focused ? '0 0 20px rgba(0,152,184,0.35)' : 'none'; }}
              >
                {success ? '✓ Eingetragen' : 'Anmelden →'}
              </button>
            </form>
          </div>
        </div>

        {/* Social Proof */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '12px',
          marginTop: '20px',
        }}>
          {/* Avatar stack */}
          <div style={{ display: 'flex' }}>
            {AVATARS.map((color, i) => (
              <div key={i} style={{
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                background: color,
                border: '2px solid var(--bg2)',
                marginLeft: i === 0 ? 0 : '-8px',
                fontSize: '11px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontWeight: 700,
              }}>
                {['S', 'K', 'A', 'M', 'T'][i]}
              </div>
            ))}
          </div>
          <span style={{
            fontSize: '13px',
            color: 'var(--text-dim)',
            fontFamily: 'var(--mono)',
          }}>
            Werde Teil der wachsenden <strong style={{ color: 'var(--text)' }}>sicherheit.ai</strong>-Community
          </span>
        </div>

        {/* Trust Badges */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '10px',
          marginTop: '24px',
          flexWrap: 'wrap',
        }}>
          {TRUST_BADGES.map((b, i) => (
            <div key={i} style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              border: '1px solid var(--border)',
              borderRadius: '20px',
              fontSize: '12px',
              fontFamily: 'var(--mono)',
              color: 'var(--text-muted)',
              background: 'var(--surface)',
              letterSpacing: '0.02em',
            }}>
              <span style={{ fontSize: '13px' }}>{b.icon}</span>
              {b.label}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
