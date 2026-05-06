'use client';

import { useTranslations } from 'next-intl';

const SCORE_ROWS = [
  { labelKey: 'network', value: 82, color: 'var(--cyan)' },
  { labelKey: 'endpoints', value: 67, color: '#FF9632' },
  { labelKey: 'identities', value: 74, color: 'var(--cyan)' },
  { labelKey: 'aiCompliance', value: 58, color: 'var(--magenta)' },
  { labelKey: 'privacy', value: 88, color: '#78C864' },
];

export default function ScoreSection() {
  const t = useTranslations('score');

  return (
    <section style={{ padding: '120px 0', position: 'relative', overflow: 'hidden' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 48px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
          <div className="animate-in" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ position: 'relative', width: '340px', height: '340px' }}>
              <svg viewBox="0 0 340 340" style={{ width: '340px', height: '340px' }}>
                <defs>
                  <linearGradient id="scoreGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#00F0FF" />
                    <stop offset="100%" stopColor="#FF2D6F" />
                  </linearGradient>
                </defs>
                <circle cx="170" cy="170" r="148" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="16" />
                <circle cx="170" cy="170" r="116" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="12" />
                <circle cx="170" cy="170" r="84" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="10" />
                <circle
                  cx="170" cy="170" r="148"
                  fill="none"
                  stroke="url(#scoreGrad)"
                  strokeWidth="16"
                  strokeLinecap="round"
                  strokeDasharray="776"
                  strokeDashoffset="200"
                  transform="rotate(-90 170 170)"
                  style={{ filter: 'drop-shadow(0 0 8px rgba(0,240,255,0.5))' }}
                />
              </svg>
              <div style={{
                position: 'absolute', top: '50%', left: '50%',
                transform: 'translate(-50%,-50%)', textAlign: 'center',
              }}>
                <div style={{ fontSize: '72px', fontWeight: 800, letterSpacing: '-0.05em', color: 'var(--text)', lineHeight: 1 }}>
                  72<span style={{ color: 'var(--cyan)', fontSize: '36px' }}>/100</span>
                </div>
                <div style={{ fontSize: '13px', color: 'var(--text-muted)', fontFamily: 'var(--mono)', marginTop: '6px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  {t('scoreLabel')}
                </div>
              </div>
            </div>
          </div>

          <div className="animate-in animate-delay-1">
            <div style={{ fontFamily: 'var(--mono)', fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--cyan)', marginBottom: '10px' }}>
              {t('label')}
            </div>
            <h2 style={{ fontSize: 'clamp(32px, 3.5vw, 52px)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.05, marginBottom: '20px' }}>
              {t('title1')}<br />
              <em style={{ fontStyle: 'normal', color: 'var(--magenta)' }}>{t('title2')}</em>
            </h2>
            <p style={{ fontSize: '16px', color: 'var(--text-dim)', lineHeight: 1.7, marginBottom: '36px', maxWidth: '460px' }}>
              {t('desc')}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {SCORE_ROWS.map((row, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <span style={{ fontSize: '13px', color: 'var(--text-dim)', width: '130px', flexShrink: 0 }}>
                    {t(row.labelKey as any)}
                  </span>
                  <div style={{ flex: 1, height: '4px', background: 'var(--border)', borderRadius: '2px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', borderRadius: '2px', background: row.color, width: `${row.value}%`, transition: 'width 1s ease' }} />
                  </div>
                  <span style={{ fontFamily: 'var(--mono)', fontSize: '12px', color: 'var(--text-muted)', width: '30px', textAlign: 'right' }}>
                    {row.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
