import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { getPosts, formatDate } from '@/lib/posts';

export function generateStaticParams() {
  return [{ locale: 'de' }, { locale: 'en' }];
}

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Blog — KI-Sicherheit & Cybersecurity News | sicherheit.ai',
  description: 'Aktuelle Analysen, Threat Intelligence und Forschungsberichte zu KI-Sicherheit und Cybersecurity.',
};

export default async function BlogPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  const articles = await getPosts();

  return (
    <>
      <main style={{ minHeight: '100vh', background: 'var(--bg)', paddingTop: '80px' }}>
        {/* Header */}
        <div className="subpage-header" style={{ background: 'var(--bg2)', borderBottom: '1px solid var(--border)' }}>
          <div className="r-wrap">
            <div style={{ fontFamily: 'var(--mono)', fontSize: '11px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--cyan)', marginBottom: '12px' }}>
              // Aktuelle Insights
            </div>
            <h1 style={{ fontSize: 'clamp(40px, 6vw, 80px)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 0.95, color: 'var(--text)', margin: 0 }}>
              Security<br /><span style={{ color: 'var(--cyan)' }}>Intelligence</span>
            </h1>
            <p style={{ fontSize: '16px', color: 'var(--text-dim)', marginTop: '20px', maxWidth: '500px', lineHeight: 1.7 }}>
              {articles.length} Artikel — Analysen, Threat Intelligence und Forschungsberichte.
            </p>
          </div>
        </div>

        {/* Articles grid */}
        <div className="subpage-content">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(380px, 100%), 1fr))', gap: '20px' }}>
            {articles.map((article) => (
              <Link key={article.id} href={`/${locale}/blog/${article.slug}`} style={{ textDecoration: 'none' }}>
                <article style={{
                  background: 'var(--card-bg)',
                  border: '1px solid var(--border)',
                  borderRadius: '16px',
                  padding: '28px',
                  transition: 'border-color 0.2s, transform 0.2s',
                  cursor: 'pointer',
                  boxShadow: 'var(--card-shadow)',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}>
                  {/* Gradient strip */}
                  <div style={{
                    height: '3px',
                    borderRadius: '2px',
                    background: article.imageGradient,
                    marginBottom: '20px',
                    opacity: 0.8,
                  }} />

                  <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
                    <span style={{ padding: '3px 10px', borderRadius: '4px', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', background: article.categoryBg, color: article.categoryColor }}>
                      {article.category}
                    </span>
                    {article.badge && (
                      <span style={{ padding: '3px 10px', borderRadius: '4px', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', background: article.badgeColor ? `${article.badgeColor}18` : 'rgba(0,240,255,0.12)', color: article.badgeColor ?? 'var(--cyan)' }}>
                        {article.badge}
                      </span>
                    )}
                  </div>

                  <h2 style={{ fontSize: '17px', fontWeight: 700, lineHeight: 1.35, letterSpacing: '-0.01em', color: 'var(--text)', margin: '0 0 12px', flex: 1 }}>
                    {article.title}
                  </h2>

                  <p style={{ fontSize: '13px', color: 'var(--text-dim)', lineHeight: 1.6, marginBottom: '16px' }}>
                    {article.excerpt}
                  </p>

                  <div style={{ display: 'flex', gap: '12px', fontSize: '12px', color: 'var(--text-muted)', fontFamily: 'var(--mono)', paddingTop: '14px', borderTop: '1px solid var(--border)' }}>
                    <span>{article.author}</span>
                    <span>·</span>
                    <span>{formatDate(article.publishedAt)}</span>
                    <span>·</span>
                    <span>{article.readTime} min</span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer locale={locale} />
    </>
  );
}
