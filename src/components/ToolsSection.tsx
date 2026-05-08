'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';

const TOOLS = [
  { icon: '🔐', nameKey: 'password', descKey: 'passwordDesc', tagKey: 'Live-Tool', gradient: true, slug: 'password' },
  { icon: '🛡️', nameKey: 'phishing', descKey: 'phishingDesc', tagKey: 'Beta', slug: null },
  { icon: '📊', nameKey: 'cve', descKey: 'cveDesc', tagKey: 'Live-Daten', slug: 'cve' },
  { icon: '🔍', nameKey: 'breach', descKey: 'breachDesc', tagKey: 'Kostenlos', slug: 'breach' },
  { icon: '🤖', nameKey: 'aiRisk', descKey: 'aiRiskDesc', tagKey: 'Neu', slug: null },
  { icon: '⚡', nameKey: 'incident', descKey: 'incidentDesc', tagKey: 'Pro', slug: 'incident' },
];

export default function ToolsSection({ locale }: { locale: string }) {
  const t = useTranslations('tools');

  return (
    <section id="tools" className="sec-lg" style={{
      background: 'var(--bg2)',
      position: 'relative',
      transition: 'background 0.35s',
    }}>
      <div className="r-wrap">
        <div className="animate-in sec-hdr">
          <div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--cyan)', marginBottom: '10px' }}>
              {t('label')}
            </div>
            <div style={{ fontSize: 'clamp(32px, 3.5vw, 48px)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.05 }}>
              {t('title')}
            </div>
          </div>
          <Link href={`/${locale}/tools`} style={{
            color: 'var(--text-dim)', textDecoration: 'none', fontSize: '14px',
            display: 'flex', alignItems: 'center', gap: '6px',
          }}>
            {t('allTools')} →
          </Link>
        </div>

        <div className="g-tools">
          {TOOLS.map((tool, i) => (
            <Link
              key={i}
              href={tool.slug ? `/${locale}/tools/${tool.slug}` : `/${locale}/tools`}
              className={`${tool.gradient ? 'gradient-border' : ''} animate-in ${i > 0 ? `animate-delay-${(i % 3) + 1}` : ''}`}
              style={{
                background: 'var(--card-bg)',
                border: '1px solid var(--border)',
                borderRadius: '14px',
                padding: '28px',
                position: 'relative',
                overflow: 'hidden',
                transition: 'transform 0.3s, box-shadow 0.3s, border-color 0.3s, background 0.35s',
                cursor: 'pointer',
                textDecoration: 'none',
                color: 'inherit',
                display: 'block',
                boxShadow: 'var(--card-shadow)',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.transform = 'translateY(-4px)';
                el.style.boxShadow = '0 16px 48px rgba(0,0,0,0.3), 0 0 24px rgba(0,240,255,0.06)';
                el.style.borderColor = 'var(--border-bright)';
                const line = el.querySelector('.tool-top-line') as HTMLElement;
                if (line) line.style.opacity = '1';
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.transform = '';
                el.style.boxShadow = 'var(--card-shadow)';
                el.style.borderColor = 'var(--border)';
                const line = el.querySelector('.tool-top-line') as HTMLElement;
                if (line) line.style.opacity = '0';
              }}
            >
              <div className="tool-top-line" style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
                background: 'linear-gradient(90deg, transparent, var(--cyan), transparent)',
                opacity: 0, transition: 'opacity 0.3s',
              }} />
              <div style={{
                width: '48px', height: '48px',
                background: 'var(--surface2)',
                border: '1px solid var(--border)',
                borderRadius: '12px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: '20px',
                fontSize: '22px',
              }}>
                {tool.icon}
              </div>
              <div style={{ fontSize: '18px', fontWeight: 700, letterSpacing: '-0.01em', marginBottom: '8px' }}>
                {t(tool.nameKey as any)}
              </div>
              <div style={{ fontSize: '14px', color: 'var(--text-dim)', lineHeight: 1.6, marginBottom: '20px' }}>
                {t(tool.descKey as any)}
              </div>
              <span style={{
                display: 'inline-flex', alignItems: 'center',
                padding: '4px 10px', borderRadius: '4px',
                fontSize: '11px', fontWeight: 600,
                background: 'rgba(0,240,255,0.08)',
                color: 'var(--cyan)',
                fontFamily: 'var(--mono)',
              }}>
                {tool.tagKey}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
