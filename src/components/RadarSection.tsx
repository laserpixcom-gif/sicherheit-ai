'use client';

import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';

const THREAT_COLORS: Record<string, string> = {
  critical: '#FF2D6F',
  high: '#FF9632',
  medium: '#00F0FF',
  state: '#9664FF',
};

export default function RadarSection() {
  const t = useTranslations('radar');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rCtx = canvas.getContext('2d');
    if (!rCtx) return;

    const radarW = 520, radarH = 520;
    const cx = radarW / 2, cy = radarH / 2;
    const maxR = 200;

    const threatPoints: Array<{
      angle: number; r: number; type: string;
      pulse: number; speed: number;
    }> = [];

    for (let i = 0; i < 40; i++) {
      threatPoints.push({
        angle: Math.random() * Math.PI * 2,
        r: Math.random() * maxR * 0.92,
        type: ['critical', 'high', 'medium', 'state'][Math.floor(Math.random() * 4)],
        pulse: Math.random() * Math.PI * 2,
        speed: 0.3 + Math.random() * 0.5,
      });
    }

    let radarAngle = 0;

    const draw = () => {
      rCtx.clearRect(0, 0, radarW, radarH);

      // Outer glow
      const outerGlow = rCtx.createRadialGradient(cx, cy, maxR - 10, cx, cy, maxR + 60);
      outerGlow.addColorStop(0, 'rgba(0,240,255,0.03)');
      outerGlow.addColorStop(1, 'transparent');
      rCtx.fillStyle = outerGlow;
      rCtx.fillRect(0, 0, radarW, radarH);

      // Concentric rings
      [1, 0.75, 0.5, 0.25].forEach((s, i) => {
        rCtx.beginPath();
        rCtx.arc(cx, cy, maxR * s, 0, Math.PI * 2);
        rCtx.strokeStyle = `rgba(0,240,255,${0.06 + i * 0.01})`;
        rCtx.lineWidth = 1;
        rCtx.stroke();
      });

      // Cross lines
      rCtx.strokeStyle = 'rgba(0,240,255,0.05)';
      rCtx.lineWidth = 1;
      [0, Math.PI / 4, Math.PI / 2, Math.PI * 3 / 4].forEach(a => {
        rCtx.beginPath();
        rCtx.moveTo(cx + Math.cos(a) * maxR, cy + Math.sin(a) * maxR);
        rCtx.lineTo(cx - Math.cos(a) * maxR, cy - Math.sin(a) * maxR);
        rCtx.stroke();
      });

      // Sweep
      rCtx.save();
      rCtx.translate(cx, cy);
      rCtx.rotate(radarAngle);
      const sweepLen = Math.PI * 0.7;
      for (let i = 0; i < 80; i++) {
        const a = -(sweepLen * i / 80);
        const alpha = (1 - i / 80) * 0.18;
        rCtx.beginPath();
        rCtx.moveTo(0, 0);
        rCtx.arc(0, 0, maxR, a, a - 0.06, false);
        rCtx.closePath();
        rCtx.fillStyle = `rgba(0,240,255,${alpha})`;
        rCtx.fill();
      }
      rCtx.beginPath();
      rCtx.moveTo(0, 0);
      rCtx.lineTo(maxR, 0);
      rCtx.strokeStyle = 'rgba(0,240,255,0.8)';
      rCtx.lineWidth = 1.5;
      rCtx.stroke();
      rCtx.restore();

      // Threat points
      threatPoints.forEach(p => {
        const px = cx + Math.cos(p.angle) * p.r;
        const py = cy + Math.sin(p.angle) * p.r;
        const color = THREAT_COLORS[p.type];
        const normAngle = ((p.angle - radarAngle) % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2);
        const isLit = normAngle < 0.4 || normAngle > Math.PI * 2 - 0.1;
        p.pulse += 0.04;
        const pulseAlpha = isLit
          ? 0.8 + Math.sin(p.pulse * 3) * 0.2
          : Math.max(0, 0.4 - (normAngle / (Math.PI * 2)) * 0.35);

        if (pulseAlpha > 0.05) {
          if (isLit) {
            const pulseR = 8 + Math.sin(p.pulse) * 4;
            const pg = rCtx.createRadialGradient(px, py, 0, px, py, pulseR);
            pg.addColorStop(0, color + 'CC');
            pg.addColorStop(1, color + '00');
            rCtx.beginPath();
            rCtx.arc(px, py, pulseR, 0, Math.PI * 2);
            rCtx.fillStyle = pg;
            rCtx.fill();
          }
          rCtx.beginPath();
          rCtx.arc(px, py, 3, 0, Math.PI * 2);
          rCtx.fillStyle = color + Math.round(pulseAlpha * 255).toString(16).padStart(2, '0');
          rCtx.fill();
        }
      });

      // Center
      const cg = rCtx.createRadialGradient(cx, cy, 0, cx, cy, 20);
      cg.addColorStop(0, 'rgba(0,240,255,0.8)');
      cg.addColorStop(1, 'transparent');
      rCtx.beginPath();
      rCtx.arc(cx, cy, 20, 0, Math.PI * 2);
      rCtx.fillStyle = cg;
      rCtx.fill();
      rCtx.beginPath();
      rCtx.arc(cx, cy, 4, 0, Math.PI * 2);
      rCtx.fillStyle = '#00F0FF';
      rCtx.fill();

      radarAngle += 0.015;
      animRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  const threats = [
    { color: 'var(--magenta)', shadow: 'var(--magenta)', label: t('ransomware'), count: '847 aktiv', countColor: 'var(--magenta)' },
    { color: '#FF9632', shadow: '#FF9632', label: t('phishing'), count: '1.243 aktiv', countColor: '#FF9632' },
    { color: 'var(--cyan)', shadow: 'var(--cyan)', label: t('state'), count: '218 aktiv', countColor: 'var(--cyan)' },
    { color: '#9664FF', shadow: '#9664FF', label: t('aiMalware'), count: '539 aktiv', countColor: '#9664FF' },
  ];

  return (
    <section id="radar" style={{
      padding: '120px 0',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse 60% 80% at 80% 50%, rgba(0,240,255,0.04) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 48px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '80px',
          alignItems: 'center',
        }}>
          <div className="animate-in">
            <div style={{ fontFamily: 'var(--mono)', fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--cyan)', marginBottom: '10px' }}>
              {t('label')}
            </div>
            <h2 style={{
              fontSize: 'clamp(36px, 4vw, 56px)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              lineHeight: 1.05,
              marginBottom: '20px',
            }}>
              {t('title1')}<br />{t('title2')}<br />
              <em style={{ fontStyle: 'normal', color: 'var(--cyan)' }}>{t('title3')}</em>
            </h2>
            <p style={{ fontSize: '16px', color: 'var(--text-dim)', lineHeight: 1.7, marginBottom: '32px', maxWidth: '420px' }}>
              {t('desc')}
            </p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {threats.map((threat, i) => (
                <li
                  key={i}
                  className={`animate-in animate-delay-${i + 1}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                    padding: '14px 18px',
                    background: 'var(--surface)',
                    border: '1px solid var(--border)',
                    borderRadius: '8px',
                    fontSize: '14px',
                    transition: 'border-color 0.2s, background 0.2s',
                    cursor: 'default',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-bright)';
                    (e.currentTarget as HTMLElement).style.background = 'var(--surface2)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)';
                    (e.currentTarget as HTMLElement).style.background = 'var(--surface)';
                  }}
                >
                  <span style={{
                    width: '8px', height: '8px', borderRadius: '50%', flexShrink: 0,
                    background: threat.color,
                    boxShadow: `0 0 8px ${threat.shadow}`,
                  }} />
                  {threat.label}
                  <span style={{ marginLeft: 'auto', fontFamily: 'var(--mono)', fontSize: '12px', color: threat.countColor }}>
                    {threat.count}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="animate-in animate-delay-2" style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            width: '100%', aspectRatio: '1',
          }}>
            <canvas
              ref={canvasRef}
              width={520}
              height={520}
              style={{ width: '100%', height: 'auto', maxWidth: '520px' }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
