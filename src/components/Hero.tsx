'use client';

import { useEffect, useState, CSSProperties } from 'react';
import { useTranslations } from 'next-intl';
import { useTheme } from '@/contexts/ThemeContext';
import { motion } from 'framer-motion';

interface HudCard {
  label: string;
  value: string;
  sub: string;
  barWidth?: string;
  barColor?: string;
  valueColor?: string;
  valueSize?: string;
  dotColor?: string;
  pos: CSSProperties;
  delay: number;
}

export default function Hero() {
  const t = useTranslations('hero');
  const hudT = useTranslations('hud');
  const { theme } = useTheme();
  const [heroText, setHeroText] = useState('');
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIdx, setCharIdx] = useState(0);

  const phrases = [t('phrases.0'), t('phrases.1'), t('phrases.2')];

  // Typewriter
  useEffect(() => {
    const current = phrases[phraseIdx];
    const timer = setTimeout(() => {
      if (!isDeleting) {
        setHeroText(current.slice(0, charIdx + 1));
        if (charIdx + 1 === current.length) {
          setTimeout(() => setIsDeleting(true), 2400);
          return;
        }
        setCharIdx((c: number) => c + 1);
      } else {
        setHeroText(current.slice(0, charIdx - 1));
        if (charIdx - 1 === 0) {
          setIsDeleting(false);
          setPhraseIdx((p: number) => (p + 1) % phrases.length);
        }
        setCharIdx((c: number) => c - 1);
      }
    }, isDeleting ? 28 : 52);
    return () => clearTimeout(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [charIdx, isDeleting, phraseIdx]);

  // Scroll progress
  useEffect(() => {
    const onScroll = () => {
      const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100;
      const el = document.getElementById('scroll-progress');
      if (el) el.style.width = pct + '%';
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const hudCards: HudCard[] = [
    {
      label: `// ${hudT('threats')}`,
      value: hudT('threatsValue'),
      sub: hudT('threatsSub'),
      barWidth: '73%',
      barColor: 'var(--magenta)',
      pos: { position: 'absolute', top: '18%', left: '52%' },
      delay: 0,
    },
    {
      label: `// ${hudT('status')}`,
      value: hudT('statusValue'),
      valueColor: 'var(--cyan)',
      sub: hudT('statusSub'),
      dotColor: '#78C864',
      pos: { position: 'absolute', top: '22%', right: '6%' },
      delay: 2,
    },
    {
      label: `// ${hudT('cve')}`,
      value: hudT('cveValue'),
      sub: hudT('cveSub'),
      barWidth: '45%',
      pos: { position: 'absolute', bottom: '30%', left: '50%' },
      delay: 4,
    },
    {
      label: `// ${hudT('ai')}`,
      value: hudT('aiValue'),
      valueSize: '14px',
      sub: hudT('aiSub'),
      dotColor: 'var(--magenta)',
      pos: { position: 'absolute', bottom: '20%', right: '7%' },
      delay: 1,
    },
  ];

  return (
    <section style={{
      position: 'relative',
      width: '100%',
      minHeight: '100svh',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
    }}>
      {/* Video background — dark and light mode */}
      <video
        key={theme}
        autoPlay
        muted
        loop
        playsInline
        preload="none"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center right',
          zIndex: 0,
          opacity: theme === 'dark' ? 1 : 0.85,
          transition: 'opacity 0.5s',
        }}
      >
        <source src={theme === 'dark' ? '/hero-bg.mp4' : '/hero-bg-light.mp4'} type="video/mp4" />
      </video>

      {/* Gradient overlay — left side dark for text legibility */}
      <div style={{
        position: 'absolute',
        inset: 0,
        zIndex: 1,
        background: theme === 'dark'
          ? `linear-gradient(to right,
              rgba(6,11,24,0.97) 0%,
              rgba(6,11,24,0.90) 30%,
              rgba(6,11,24,0.55) 55%,
              rgba(6,11,24,0.10) 75%,
              rgba(6,11,24,0.00) 100%
            ),
            linear-gradient(to bottom,
              rgba(6,11,24,0.4) 0%,
              transparent 20%,
              transparent 80%,
              rgba(6,11,24,0.6) 100%
            )`
          : `radial-gradient(ellipse 80% 60% at 50% 80%, var(--hero-glow1) 0%, transparent 70%),
             radial-gradient(ellipse 60% 40% at 20% 20%, var(--hero-glow2) 0%, transparent 60%),
             radial-gradient(ellipse 70% 50% at 80% 60%, var(--hero-glow1) 0%, transparent 60%)`,
      }} />

      {/* HUD Cards - hidden on mobile to avoid overlap */}
      <div className="hide-mobile" style={{ position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none' }}>
        {hudCards.map((card, i) => (
          <motion.div
            key={i}
            className="hud-card glass"
            style={{
              ...card.pos,
              boxShadow: theme === 'light' ? '0 4px 20px rgba(0,0,0,0.08)' : 'none',
            }}
            animate={{ y: [0, -12, 0] }}
            transition={{
              duration: 6,
              repeat: Infinity,
              delay: card.delay,
              ease: 'easeInOut',
            }}
          >
            <div style={{ color: 'var(--cyan)', fontSize: '9px', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '6px' }}>
              {card.label}
            </div>
            <div style={{
              fontSize: card.valueSize || '18px',
              fontWeight: 700,
              color: card.valueColor || 'var(--text)',
              marginBottom: '2px',
            }}>
              {card.value}
            </div>
            <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>
              {card.dotColor && (
                <span style={{
                  display: 'inline-block',
                  width: '6px', height: '6px',
                  borderRadius: '50%',
                  background: card.dotColor,
                  marginRight: '5px',
                }} />
              )}
              {card.sub}
            </div>
            {card.barWidth && (
              <div style={{ height: '2px', background: 'rgba(0,240,255,0.1)', borderRadius: '1px', marginTop: '8px' }}>
                <div style={{
                  height: '100%', borderRadius: '1px',
                  background: card.barColor || 'var(--cyan)',
                  width: card.barWidth,
                }} />
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Hero Content */}
      <motion.div
        style={{
          position: 'relative',
          zIndex: 3,
          textAlign: theme === 'dark' ? 'left' : 'center',
          maxWidth: theme === 'dark' ? '620px' : '960px',
          padding: theme === 'dark' ? '0 0 0 clamp(24px, 6vw, 96px)' : '0 24px',
          width: '100%',
        }}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        <div style={{
          fontFamily: 'var(--mono)',
          fontSize: '12px',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: 'var(--cyan)',
          marginBottom: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: theme === 'dark' ? 'flex-start' : 'center',
          gap: '10px',
        }}>
          <span style={{ width: '32px', height: '1px', background: 'var(--cyan)', opacity: 0.6, display: 'block' }} />
          {t('eyebrow')}
          {theme === 'light' && <span style={{ width: '32px', height: '1px', background: 'var(--cyan)', opacity: 0.6, display: 'block' }} />}
        </div>

        <h1
          className="gradient-text"
          style={{
            fontSize: 'clamp(48px, 6.5vw, 96px)',
            fontWeight: 800,
            lineHeight: 0.95,
            letterSpacing: '-0.04em',
            marginBottom: '28px',
          }}
        >
          {t('headline1')}<br />{t('headline2')}
        </h1>

        <p style={{
          fontFamily: 'var(--mono)',
          fontSize: 'clamp(14px, 1.5vw, 17px)',
          color: theme === 'dark' ? 'rgba(232,237,248,0.80)' : 'var(--text-dim)',
          maxWidth: '520px',
          margin: theme === 'dark' ? '0 0 48px' : '0 auto 48px',
          lineHeight: 1.7,
          minHeight: '2.5em',
        }}>
          {heroText}
          <span className="cursor-blink" />
        </p>

        <div className="hero-ctas" style={{ justifyContent: theme === 'dark' ? 'flex-start' : 'center' }}>
          <a href="#tools" style={{
            background: 'linear-gradient(135deg, var(--cyan) 0%, #007A9A 100%)',
            color: theme === 'dark' ? '#060B18' : '#fff',
            border: 'none',
            padding: '14px 32px',
            borderRadius: '8px',
            fontSize: '15px',
            fontWeight: 700,
            cursor: 'pointer',
            fontFamily: 'var(--font)',
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
          }}>
            {t('cta1')} →
          </a>
          <a href="#beratung" style={{
            background: theme === 'dark' ? 'rgba(255,255,255,0.06)' : 'none',
            border: '1px solid var(--border)',
            color: 'var(--text-dim)',
            padding: '14px 32px',
            borderRadius: '8px',
            fontSize: '15px',
            fontWeight: 500,
            cursor: 'pointer',
            fontFamily: 'var(--font)',
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            backdropFilter: theme === 'dark' ? 'blur(8px)' : 'none',
          }}>
            {t('cta2')}
          </a>
        </div>

        {/* Trust bar */}
        <div style={{
          marginTop: '40px',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          flexWrap: 'wrap',
          justifyContent: theme === 'dark' ? 'flex-start' : 'center',
        }}>
          <span style={{ fontFamily: 'var(--mono)', fontSize: '10px', color: 'var(--text-muted)', letterSpacing: '0.06em' }}>
            Basierend auf:
          </span>
          {['BSI', 'NIST', 'OWASP', 'EU AI Act', 'CISA'].map(src => (
            <span key={src} style={{
              fontFamily: 'var(--mono)', fontSize: '10px', fontWeight: 700,
              color: 'var(--cyan)', opacity: 0.7,
              padding: '2px 7px', borderRadius: '4px',
              border: '1px solid rgba(0,240,255,0.2)',
              letterSpacing: '0.04em',
            }}>
              {src}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <div className="scroll-indicator">
        <span style={{
          fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase',
          color: 'var(--text-muted)', fontFamily: 'var(--mono)',
        }}>
          {t('scroll')}
        </span>
        <div style={{ width: '1px', height: '48px', background: 'linear-gradient(to bottom, var(--cyan), transparent)' }} />
      </div>
    </section>
  );
}
