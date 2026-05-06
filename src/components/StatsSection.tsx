'use client';

import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';

const STATS = [
  { count: 2847, suffix: '', colorSuffix: false, labelKey: 'label', descKey: 'desc1' },
  { count: 12, suffix: 'M+', colorSuffix: true, labelKey: 'label2', descKey: 'desc2', colorVar: '--cyan' },
  { count: 340, suffix: '%', colorSuffix: true, labelKey: 'label3', descKey: 'desc3', colorVar: '--magenta' },
  { count: 48, suffix: 'h', colorSuffix: true, labelKey: 'label4', descKey: 'desc4', colorVar: '--cyan' },
];

export default function StatsSection() {
  const t = useTranslations('stats');
  const sectionRef = useRef<HTMLDivElement>(null);
  const counterRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const animated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !animated.current) {
          animated.current = true;
          STATS.forEach((stat, i) => {
            const el = counterRefs.current[i];
            if (!el) return;
            let current = 0;
            const step = stat.count / 60;
            const timer = setInterval(() => {
              current += step;
              if (current >= stat.count) {
                current = stat.count;
                clearInterval(timer);
              }
              el.textContent = Math.floor(current).toLocaleString('de-DE');
            }, 16);
          });
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="sec-md" style={{
      background: 'var(--bg2)',
      transition: 'background 0.35s',
    }}>
      <div className="r-wrap">
        <div className="g-stats">
          {STATS.map((stat, i) => (
            <div
              key={i}
              className="animate-in stat-cell"
              style={{
                background: 'var(--bg2)',
                position: 'relative',
                overflow: 'hidden',
                transition: 'background 0.35s',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget.querySelector('.stat-top-line') as HTMLElement;
                if (el) el.style.opacity = '1';
              }}
              onMouseLeave={e => {
                const el = e.currentTarget.querySelector('.stat-top-line') as HTMLElement;
                if (el) el.style.opacity = '0';
              }}
            >
              <div
                className="stat-top-line"
                style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
                  background: 'linear-gradient(90deg, transparent, var(--cyan), transparent)',
                  opacity: 0,
                  transition: 'opacity 0.4s',
                }}
              />
              <div style={{
                fontSize: '56px',
                fontWeight: 800,
                letterSpacing: '-0.04em',
                color: 'var(--text)',
                lineHeight: 1,
                marginBottom: '8px',
                fontVariantNumeric: 'tabular-nums',
              }}>
                <span
                  ref={el => { counterRefs.current[i] = el; }}
                  style={{ color: 'var(--text)' }}
                >
                  0
                </span>
                {stat.suffix && (
                  <span style={{ color: stat.colorSuffix ? `var(${stat.colorVar})` : 'var(--text)' }}>
                    {stat.suffix}
                  </span>
                )}
              </div>
              <div style={{ fontSize: '14px', color: 'var(--text-dim)', fontWeight: 500 }}>
                {t(stat.labelKey as any)}
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '6px', fontFamily: 'var(--mono)' }}>
                {t(stat.descKey as any)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
