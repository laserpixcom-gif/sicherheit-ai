'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';

export default function NewsletterSection() {
  const t = useTranslations('newsletter');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.0002,
      vy: (Math.random() - 0.5) * 0.0002,
      r: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.4 + 0.1,
      color: Math.random() > 0.5 ? '0,240,255' : '255,45,111',
    }));

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x = (p.x + p.vx + 1) % 1;
        p.y = (p.y + p.vy + 1) % 1;
        ctx.beginPath();
        ctx.arc(p.x * canvas.width, p.y * canvas.height, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color},${p.alpha})`;
        ctx.fill();
      });
      animRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animRef.current);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSuccess(`// Danke! ${email} wurde erfolgreich registriert.`);
      setEmail('');
    }
  };

  return (
    <section style={{
      padding: '140px 0',
      position: 'relative',
      overflow: 'hidden',
      background: 'var(--bg2)',
      transition: 'background 0.35s',
    }}>
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse 70% 80% at 50% 50%, rgba(0,240,255,0.04) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <canvas
        ref={canvasRef}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
      />
      <div style={{
        maxWidth: '640px',
        margin: '0 auto',
        textAlign: 'center',
        position: 'relative',
        zIndex: 1,
        padding: '0 24px',
      }}>
        <div style={{ fontFamily: 'var(--mono)', fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--cyan)', marginBottom: '10px', display: 'flex', justifyContent: 'center' }}>
          {t('label')}
        </div>
        <h2 style={{ fontSize: 'clamp(32px, 4vw, 56px)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.05, marginBottom: '16px' }}>
          {t('title1')}<br />
          <em style={{ fontStyle: 'normal', color: 'var(--cyan)' }}>{t('title2')}</em>
        </h2>
        <p style={{ fontSize: '16px', color: 'var(--text-dim)', lineHeight: 1.7, marginBottom: '48px' }}>
          {t('desc')}
        </p>
        <form
          onSubmit={handleSubmit}
          style={{
            display: 'flex',
            maxWidth: '480px',
            margin: '0 auto',
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: '10px',
            overflow: 'hidden',
            transition: 'border-color 0.3s, box-shadow 0.3s',
          }}
          onFocus={e => {
            (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-bright)';
            (e.currentTarget as HTMLElement).style.boxShadow = '0 0 0 3px rgba(0,240,255,0.08), 0 0 30px rgba(0,240,255,0.12)';
          }}
          onBlur={e => {
            (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)';
            (e.currentTarget as HTMLElement).style.boxShadow = 'none';
          }}
        >
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder={t('placeholder')}
            style={{
              flex: 1,
              padding: '16px 20px',
              background: 'none',
              border: 'none',
              outline: 'none',
              color: 'var(--text)',
              fontFamily: 'var(--font)',
              fontSize: '15px',
            }}
          />
          <button type="submit" style={{
            background: 'linear-gradient(135deg, var(--cyan) 0%, #007A9A 100%)',
            color: '#fff',
            border: 'none',
            padding: '12px 24px',
            fontSize: '14px',
            fontWeight: 700,
            fontFamily: 'var(--font)',
            cursor: 'pointer',
            transition: 'opacity 0.2s',
            whiteSpace: 'nowrap',
          }}>
            {t('button')}
          </button>
        </form>
        <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '16px', fontFamily: 'var(--mono)' }}>
          {t('meta')}
        </p>
        {success && (
          <p style={{ color: 'var(--cyan)', fontFamily: 'var(--mono)', fontSize: '13px', marginTop: '12px' }}>
            {success}
          </p>
        )}
      </div>
    </section>
  );
}
