'use client';

import { useEffect, useRef, useState, useCallback, CSSProperties } from 'react';
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
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [heroText, setHeroText] = useState('');
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIdx, setCharIdx] = useState(0);
  const heroTimeRef = useRef(0);
  const animFrameRef = useRef<number>(0);

  const phrases = [t('phrases.0'), t('phrases.1'), t('phrases.2')];

  // Hero canvas
  const getThemeColors = useCallback(() => {
    const dark = theme === 'dark';
    return {
      gridColor: dark ? '0,240,255' : '0,120,180',
      glow1: dark ? 'rgba(0,240,255,0.06)' : 'rgba(0,120,180,0.06)',
      glow2: dark ? 'rgba(255,45,111,0.04)' : 'rgba(200,20,60,0.04)',
      bg0: dark ? '#060B18' : '#EEF3FA',
      bg1: dark ? '#07102A' : '#E4ECF8',
      particle1: dark ? '255,45,111' : '200,20,80',
      particle2: dark ? '0,240,255' : '0,120,180',
    };
  }, [theme]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let W = 0, H = 0;
    let mouseHX = 0, mouseHY = 0;

    const resize = () => {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const onMove = (e: MouseEvent) => {
      mouseHX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseHY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMove);

    const draw = (t: number) => {
      ctx.clearRect(0, 0, W, H);
      const horizon = H * 0.55 + mouseHY * 20;
      const vanishX = W / 2 + mouseHX * 40;
      const tc = getThemeColors();

      const bgGrad = ctx.createLinearGradient(0, 0, 0, H);
      bgGrad.addColorStop(0, tc.bg0);
      bgGrad.addColorStop(0.5, tc.bg1);
      bgGrad.addColorStop(1, tc.bg0);
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, W, H);

      const gridLines = 24;
      const speed = (t * 0.4) % 1;

      ctx.save();
      for (let i = 0; i <= gridLines; i++) {
        const p = i / gridLines;
        const xBottom = (p - 0.5) * W * 2.4 + W / 2;
        ctx.beginPath();
        ctx.moveTo(vanishX, horizon);
        ctx.lineTo(xBottom, H + 20);
        const alpha = 0.04 + Math.abs(p - 0.5) * 0.07;
        ctx.strokeStyle = `rgba(${tc.gridColor},${alpha})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }

      const hLines = 16;
      for (let i = 0; i <= hLines; i++) {
        const progress = ((i / hLines + speed) % 1);
        const y = horizon + (H - horizon + 40) * Math.pow(progress, 2.5);
        const widthAtY = (y - horizon) / (H - horizon) * W * 1.4;
        const leftX = vanishX - widthAtY / 2;
        const rightX = vanishX + widthAtY / 2;
        const alpha = progress * 0.12;
        ctx.beginPath();
        ctx.moveTo(leftX, y);
        ctx.lineTo(rightX, y);
        ctx.strokeStyle = `rgba(${tc.gridColor},${alpha})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
      ctx.restore();

      const glowGrad = ctx.createRadialGradient(vanishX, horizon, 0, vanishX, horizon, W * 0.6);
      glowGrad.addColorStop(0, tc.glow1);
      glowGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = glowGrad;
      ctx.fillRect(0, 0, W, H);

      const mgGrad = ctx.createRadialGradient(
        W * 0.2 + mouseHX * 20, H * 0.3 + mouseHY * 15, 0,
        W * 0.2 + mouseHX * 20, H * 0.3 + mouseHY * 15, W * 0.4
      );
      mgGrad.addColorStop(0, tc.glow2);
      mgGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = mgGrad;
      ctx.fillRect(0, 0, W, H);

      ctx.save();
      for (let i = 0; i < 30; i++) {
        const px = ((i * 137.5 + t * 12) % W);
        const py = ((i * 97.3 + t * 6) % (H * 0.6));
        const alpha = 0.15 + Math.sin(t * 0.8 + i) * 0.1;
        ctx.beginPath();
        ctx.arc(px, py, 1, 0, Math.PI * 2);
        ctx.fillStyle = i % 3 === 0
          ? `rgba(${tc.particle1},${alpha})`
          : `rgba(${tc.particle2},${alpha})`;
        ctx.fill();
      }
      ctx.restore();
    };

    const loop = () => {
      heroTimeRef.current += 0.016;
      draw(heroTimeRef.current);
      animFrameRef.current = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, [getThemeColors]);

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
      {/* Canvas fallback — hidden when video loads */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute', inset: 0, zIndex: 0, width: '100%', height: '100%',
          opacity: 0,
          transition: 'opacity 0.5s',
        }}
      />

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
          }}>
            Tools erkunden →
          </a>
          <a href="#radar" style={{
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
            Mehr erfahren
          </a>
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
