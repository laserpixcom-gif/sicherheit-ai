'use client';

import { useTranslations } from 'next-intl';

const BADGE_STYLES: Record<string, { bg: string; color: string; label: string }> = {
  KRITISCH: { bg: 'rgba(255,45,111,0.15)', color: 'var(--magenta)', label: 'KRITISCH' },
  HOCH: { bg: 'rgba(255,150,50,0.12)', color: '#FF9632', label: 'HOCH' },
  MITTEL: { bg: 'rgba(0,240,255,0.12)', color: 'var(--cyan)', label: 'MITTEL' },
  NEU: { bg: 'rgba(120,200,100,0.12)', color: '#78C864', label: 'NEU' },
};

const ITEMS = [
  { badge: 'KRITISCH', key: 'items.0' },
  { badge: 'HOCH', key: 'items.1' },
  { badge: 'NEU', key: 'items.2' },
  { badge: 'MITTEL', key: 'items.3' },
  { badge: 'KRITISCH', key: 'items.4' },
  { badge: 'HOCH', key: 'items.5' },
  { badge: 'NEU', key: 'items.6' },
  { badge: 'MITTEL', key: 'items.7' },
];

export default function Ticker() {
  const t = useTranslations('ticker');

  const renderItems = ITEMS.map((item, i) => {
    const badge = BADGE_STYLES[item.badge];
    return (
      <span key={i} style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontFamily: 'var(--mono)',
        fontSize: '12px',
        color: 'var(--text-dim)',
        flexShrink: 0,
      }}>
        <span style={{
          padding: '2px 8px',
          borderRadius: '3px',
          fontSize: '10px',
          fontWeight: 700,
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
          background: badge.bg,
          color: badge.color,
        }}>
          {badge.label}
        </span>
        {t(item.key as any)}
      </span>
    );
  });

  return (
    <div style={{
      background: 'rgba(0,240,255,0.04)',
      borderTop: '1px solid var(--border)',
      borderBottom: '1px solid var(--border)',
      padding: '14px 0',
      overflow: 'hidden',
    }}>
      <div className="ticker-track" style={{ display: 'flex', gap: '48px', whiteSpace: 'nowrap' }}>
        {renderItems}
        {/* Duplicate for seamless loop */}
        {renderItems}
      </div>
    </div>
  );
}
