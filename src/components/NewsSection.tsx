'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';

const CAT_STYLES: Record<string, { bg: string; color: string }> = {
  ai: { bg: 'rgba(0,240,255,0.1)', color: 'var(--cyan)' },
  threat: { bg: 'rgba(255,45,111,0.1)', color: 'var(--magenta)' },
  policy: { bg: 'rgba(100,120,255,0.12)', color: '#7890FF' },
  vuln: { bg: 'rgba(255,150,50,0.1)', color: '#FF9632' },
  research: { bg: 'rgba(150,100,255,0.1)', color: '#9664FF' },
};

const ARTICLES = [
  {
    featured: true,
    bg: 'linear-gradient(135deg, #0A0F2E 0%, #0D1A3A 50%, #0A0820 100%)',
    glow1: 'rgba(0,240,255,0.12)',
    glow2: 'rgba(255,45,111,0.08)',
    cat: 'ai',
    catLabel: 'KI-Sicherheit',
    title: 'GPT-5 und die neue Generation KI-gestützter Cyberangriffe: Was Unternehmen jetzt wissen müssen',
    author: 'Dr. Lena Hartmann',
    date: '04. Mai 2026',
    readTime: '12 min',
  },
  {
    bg: 'linear-gradient(135deg, #120820 0%, #1A0A30 100%)',
    glow1: 'rgba(255,45,111,0.1)',
    cat: 'threat',
    catLabel: 'Bedrohung',
    title: 'Phantom Ransomware: Anatomie eines DAX-Angriffs',
    author: 'Markus Schreiber',
    date: '03. Mai 2026',
  },
  {
    bg: 'linear-gradient(135deg, #060E20 0%, #0A1830 100%)',
    glow1: 'rgba(100,120,255,0.1)',
    cat: 'policy',
    catLabel: 'Regulierung',
    title: 'EU AI Act: Die wichtigsten Compliance-Anforderungen für deutsche Firmen',
    author: 'Julia Becker',
    date: '02. Mai 2026',
  },
  {
    noImage: true,
    cat: 'vuln',
    catLabel: 'Schwachstelle',
    title: 'CVE-2026-4821: Kritische RCE-Lücke in OpenSSL 3.x — Sofort patchen',
    meta1: 'CVSS: 9.8',
    meta2: 'Heute',
  },
  {
    noImage: true,
    cat: 'research',
    catLabel: 'Forschung',
    title: 'Wie Angreifer Large Language Models zur Malware-Generierung missbrauchen',
    meta1: 'TU Berlin',
    meta2: '01. Mai 2026',
  },
];

export default function NewsSection({ locale }: { locale: string }) {
  const t = useTranslations('news');

  return (
    <section className="sec-lg" style={{
      background: 'var(--bg2)',
      position: 'relative',
      transition: 'background 0.35s',
    }}>
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse 50% 60% at 20% 50%, rgba(255,45,111,0.03) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
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
          <Link href={`/${locale}/blog`} style={{
            color: 'var(--text-dim)', textDecoration: 'none', fontSize: '14px',
            display: 'flex', alignItems: 'center', gap: '6px', transition: 'color 0.2s',
          }}>
            {t('allArticles')} <span>→</span>
          </Link>
        </div>

        <div className="g-tools">
          {ARTICLES.map((article, i) => (
            <Link
              key={i}
              href={`/${locale}/blog`}
              className={`news-card ${article.featured ? 'animate-in news-featured' : `animate-in animate-delay-${(i % 3) + 1}`}`}
              style={{
                gridColumn: article.featured ? 'span 2' : undefined,
                background: 'var(--card-bg)',
                border: '1px solid var(--border)',
                borderRadius: '14px',
                overflow: 'hidden',
                transition: 'border-color 0.3s, transform 0.3s, box-shadow 0.3s, background 0.35s',
                cursor: 'pointer',
                textDecoration: 'none',
                color: 'inherit',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                boxShadow: 'var(--card-shadow)',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = 'var(--border-bright)';
                el.style.transform = 'translateY(-4px) scale(1.01)';
                el.style.boxShadow = '0 20px 60px rgba(0,0,0,0.4), 0 0 30px rgba(0,240,255,0.08)';
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = 'var(--border)';
                el.style.transform = '';
                el.style.boxShadow = 'var(--card-shadow)';
              }}
            >
              {!article.noImage && (
                <div style={{
                  width: '100%',
                  aspectRatio: article.featured ? '21/10' : '16/10',
                  background: 'var(--bg)',
                  overflow: 'hidden',
                  position: 'relative',
                  flexShrink: 0,
                }}>
                  <div
                    className="card-img-inner"
                    style={{
                      width: '100%', height: '100%',
                      background: article.bg,
                      position: 'relative',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}
                  >
                    <div style={{
                      position: 'absolute', inset: 0,
                      backgroundImage: 'repeating-linear-gradient(-45deg, rgba(255,255,255,0.02) 0px, rgba(255,255,255,0.02) 1px, transparent 1px, transparent 8px)',
                    }} />
                    {article.glow1 && (
                      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at 60% 40%, ${article.glow1} 0%, transparent 60%)${article.glow2 ? `, radial-gradient(ellipse at 20% 70%, ${article.glow2} 0%, transparent 50%)` : ''}` }} />
                    )}
                  </div>
                </div>
              )}
              <div style={{ padding: article.noImage ? '28px' : '22px 24px 24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <span style={{
                  display: 'inline-flex', alignItems: 'center',
                  padding: '4px 10px', borderRadius: '4px',
                  fontSize: '11px', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase',
                  marginBottom: '12px', alignSelf: 'flex-start',
                  background: CAT_STYLES[article.cat].bg,
                  color: CAT_STYLES[article.cat].color,
                }}>
                  {article.catLabel}
                </span>
                <div style={{
                  fontSize: article.featured ? '22px' : '17px',
                  fontWeight: 700, lineHeight: 1.3, letterSpacing: '-0.01em',
                  marginBottom: '10px', flex: 1,
                }}>
                  {article.title}
                </div>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: '12px',
                  fontSize: '12px', color: 'var(--text-muted)', fontFamily: 'var(--mono)',
                  marginTop: '14px', paddingTop: '14px',
                  borderTop: '1px solid var(--border)',
                }}>
                  {article.author && <span>{article.author}</span>}
                  {article.meta1 && <span>{article.meta1}</span>}
                  <span>·</span>
                  <span>{article.date || article.meta2}</span>
                  {article.readTime && <><span>·</span><span>{article.readTime}</span></>}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
