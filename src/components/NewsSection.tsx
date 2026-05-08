'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import type { Post } from '@/lib/posts';
import { formatDate } from '@/lib/posts';

// Mappe Blog-Kategorien auf visuelle Styles
function getCatStyle(category: string): { bg: string; color: string } {
  const map: Record<string, { bg: string; color: string }> = {
    'Schwachstelle': { bg: 'rgba(255,150,50,0.1)', color: '#FF9632' },
    'Incident': { bg: 'rgba(255,45,111,0.1)', color: 'var(--magenta)' },
    'Regulierung': { bg: 'rgba(100,120,255,0.12)', color: '#7890FF' },
    'Lagebericht': { bg: 'rgba(0,240,255,0.1)', color: 'var(--cyan)' },
    'Analyse': { bg: 'rgba(150,100,255,0.1)', color: '#9664FF' },
    'KI-Sicherheit': { bg: 'rgba(0,240,255,0.1)', color: 'var(--cyan)' },
    'Bedrohung': { bg: 'rgba(255,45,111,0.1)', color: 'var(--magenta)' },
    'News': { bg: 'rgba(120,200,100,0.1)', color: '#78C864' },
  };
  return map[category] ?? { bg: 'rgba(0,240,255,0.1)', color: 'var(--cyan)' };
}

export default function NewsSection({ locale, posts }: { locale: string; posts: Post[] }) {
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
          {posts.map((post, i) => {
            const catStyle = getCatStyle(post.category);
            const isFeatured = i === 0;
            return (
              <Link
                key={post.slug}
                href={`/${locale}/blog/${post.slug}`}
                className={`news-card ${isFeatured ? 'animate-in news-featured' : `animate-in animate-delay-${(i % 3) + 1}`}`}
                style={{
                  gridColumn: isFeatured ? 'span 2' : undefined,
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
                {/* Gradient hero image */}
                <div style={{
                  width: '100%',
                  aspectRatio: isFeatured ? '21/10' : '16/10',
                  background: 'var(--bg)',
                  overflow: 'hidden',
                  position: 'relative',
                  flexShrink: 0,
                }}>
                  <div style={{
                    width: '100%', height: '100%',
                    background: post.imageGradient,
                    position: 'relative',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <div style={{
                      position: 'absolute', inset: 0,
                      backgroundImage: 'repeating-linear-gradient(-45deg, rgba(255,255,255,0.02) 0px, rgba(255,255,255,0.02) 1px, transparent 1px, transparent 8px)',
                    }} />
                    {post.badge && (
                      <span style={{
                        position: 'absolute', top: '16px', right: '16px',
                        fontFamily: 'var(--mono)', fontSize: '11px', fontWeight: 800,
                        padding: '4px 10px', borderRadius: '5px',
                        background: 'rgba(0,0,0,0.5)', color: post.badgeColor ?? '#FF2D6F',
                        border: `1px solid ${post.badgeColor ?? '#FF2D6F'}44`,
                        backdropFilter: 'blur(8px)',
                      }}>
                        {post.badge}
                      </span>
                    )}
                  </div>
                </div>

                <div style={{ padding: '22px 24px 24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <span style={{
                    display: 'inline-flex', alignItems: 'center',
                    padding: '4px 10px', borderRadius: '4px',
                    fontSize: '11px', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase',
                    marginBottom: '12px', alignSelf: 'flex-start',
                    background: catStyle.bg, color: catStyle.color,
                  }}>
                    {post.category}
                  </span>
                  <div style={{
                    fontSize: isFeatured ? '22px' : '17px',
                    fontWeight: 700, lineHeight: 1.3, letterSpacing: '-0.01em',
                    marginBottom: '10px', flex: 1,
                  }}>
                    {post.title}
                  </div>
                  {isFeatured && post.excerpt && (
                    <p style={{ fontSize: '14px', color: 'var(--text-dim)', lineHeight: 1.6, margin: '0 0 12px' }}>
                      {post.excerpt.slice(0, 140)}…
                    </p>
                  )}
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: '12px',
                    fontSize: '12px', color: 'var(--text-muted)', fontFamily: 'var(--mono)',
                    marginTop: '14px', paddingTop: '14px',
                    borderTop: '1px solid var(--border)',
                    flexWrap: 'wrap',
                  }}>
                    <span>{post.author}</span>
                    <span>·</span>
                    <span>{formatDate(post.publishedAt)}</span>
                    <span>·</span>
                    <span>{post.readTime} min</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
