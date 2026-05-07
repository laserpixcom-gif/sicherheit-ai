import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import Footer from '@/components/Footer';
import { getPosts, getPost, getRelatedPosts, formatDate } from '@/lib/posts';
import ArticleTOC from '@/components/blog/ArticleTOC';
import ArticleShare from '@/components/blog/ArticleShare';
import ArticleProgress from '@/components/blog/ArticleProgress';
import JsonLd, { articleSchema } from '@/components/JsonLd';
import Link from 'next/link';
import { autolinkGlossary } from '@/lib/autolink';

export const revalidate = 3600;

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map(p => ({ slug: p.slug }));
}

const BASE_URL = 'https://sicherheit.ai';

export async function generateMetadata({
  params,
}: {
  params: { locale: string; slug: string };
}): Promise<Metadata> {
  const post = await getPost(params.slug);
  if (!post) return {};
  const ogUrl = `${BASE_URL}/api/og?title=${encodeURIComponent(post.title)}&category=${encodeURIComponent(post.category)}&author=${encodeURIComponent(post.author)}&readTime=${post.readTime}${post.badge ? `&badge=${encodeURIComponent(post.badge)}` : ''}`;
  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.tags.join(', '),
    alternates: {
      canonical: `${BASE_URL}/${params.locale}/blog/${post.slug}`,
      languages: {
        de: `${BASE_URL}/de/blog/${post.slug}`,
        en: `${BASE_URL}/en/blog/${post.slug}`,
      },
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [post.author],
      tags: post.tags,
      images: [{ url: ogUrl, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [ogUrl],
    },
  };
}

function extractHeadings(html: string) {
  const re = /<h([23])[^>]*id="([^"]+)"[^>]*>([^<]+)<\/h[23]>/g;
  const headings: { level: number; id: string; text: string }[] = [];
  let m;
  while ((m = re.exec(html)) !== null) {
    headings.push({ level: parseInt(m[1]), id: m[2], text: m[3].trim() });
  }
  return headings;
}

const BADGE_COLORS: Record<string, { color: string; bg: string }> = {
  KRITISCH: { color: '#FF2D6F', bg: 'rgba(255,45,111,0.12)' },
  HOCH:     { color: '#FF9632', bg: 'rgba(255,150,50,0.12)' },
  NEU:      { color: '#78C864', bg: 'rgba(120,200,100,0.12)' },
  default:  { color: '#00F0FF', bg: 'rgba(0,240,255,0.12)' },
};

function getBadgeStyle(badge?: string) {
  if (!badge) return BADGE_COLORS.default;
  if (badge.includes('CVSS')) return BADGE_COLORS.KRITISCH;
  return BADGE_COLORS[badge] ?? BADGE_COLORS.default;
}

export default async function BlogPostPage({
  params,
}: {
  params: { locale: string; slug: string };
}) {
  const [post, related] = await Promise.all([
    getPost(params.slug),
    getPost(params.slug).then(p =>
      p ? getRelatedPosts(params.slug, p.category) : []
    ),
  ]);

  setRequestLocale(params.locale);
  if (!post) notFound();

  const headings = extractHeadings(post.content);
  const badgeStyle = getBadgeStyle(post.badge);
  const linkedContent = autolinkGlossary(post.content, params.locale);

  return (
    <>
      <JsonLd data={articleSchema({ title: post.title, description: post.excerpt, author: post.author, publishedAt: post.publishedAt, slug: post.slug, tags: post.tags })} />

      <ArticleProgress />

      <main style={{ minHeight: '100vh', background: 'var(--bg)', paddingTop: '80px' }}>
        {/* ── Hero ── */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            minHeight: '480px',
            display: 'flex',
            alignItems: 'flex-end',
            overflow: 'hidden',
            background: post.imageGradient,
          }}
        >
          {/* Scan-line overlay */}
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.03) 0px, rgba(0,0,0,0.03) 1px, transparent 1px, transparent 4px)',
            pointerEvents: 'none',
          }} />
          {/* Bottom gradient fade */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to top, rgba(6,11,24,0.98) 0%, rgba(6,11,24,0.4) 55%, transparent 100%)',
          }} />

          <div className="r-wrap" style={{ position: 'relative', zIndex: 2, paddingBottom: '56px', paddingTop: '80px', width: '100%' }}>
            {/* Breadcrumb */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
              <Link href={`/${params.locale}/blog`} style={{ fontFamily: 'var(--mono)', fontSize: '11px', color: 'rgba(232,237,248,0.45)', textDecoration: 'none', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                ← Blog
              </Link>
              <span style={{ color: 'rgba(232,237,248,0.2)', fontSize: '11px' }}>/</span>
              <span style={{ fontFamily: 'var(--mono)', fontSize: '11px', color: 'rgba(0,240,255,0.7)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                {post.category}
              </span>
            </div>

            {/* Badges */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
              <span style={{ padding: '3px 10px', borderRadius: '4px', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', background: 'rgba(0,240,255,0.12)', color: '#00F0FF' }}>
                {post.category}
              </span>
              {post.badge && (
                <span style={{ padding: '3px 10px', borderRadius: '4px', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', background: badgeStyle.bg, color: badgeStyle.color }}>
                  {post.badge}
                </span>
              )}
            </div>

            {/* Title */}
            <h1 style={{
              fontSize: 'clamp(28px, 4.5vw, 56px)',
              fontWeight: 800,
              letterSpacing: '-0.035em',
              lineHeight: 1.05,
              color: '#E8EDF8',
              maxWidth: '820px',
              margin: '0 0 28px',
              textShadow: '0 2px 32px rgba(0,0,0,0.6)',
            }}>
              {post.title}
            </h1>

            {/* Meta */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{
                  width: '36px', height: '36px', borderRadius: '50%',
                  background: 'linear-gradient(135deg, rgba(0,240,255,0.2), rgba(255,45,111,0.2))',
                  border: '1px solid rgba(0,240,255,0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'var(--mono)', fontSize: '14px', color: '#00F0FF', fontWeight: 700,
                }}>
                  {post.author[0]}
                </div>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: '#E8EDF8' }}>{post.author}</div>
                  {post.authorRole && (
                    <div style={{ fontSize: '11px', color: 'rgba(232,237,248,0.45)', fontFamily: 'var(--mono)' }}>{post.authorRole}</div>
                  )}
                </div>
              </div>
              <div style={{ display: 'flex', gap: '16px', fontFamily: 'var(--mono)', fontSize: '12px', color: 'rgba(232,237,248,0.45)' }}>
                <span>{formatDate(post.publishedAt)}</span>
                <span>·</span>
                <span>{post.readTime} min Lesezeit</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Tags strip ── */}
        <div style={{ borderBottom: '1px solid var(--border)', background: 'var(--bg2)' }}>
          <div className="r-wrap" style={{ paddingTop: '16px', paddingBottom: '16px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {post.tags.map(tag => (
              <span key={tag} style={{
                fontFamily: 'var(--mono)', fontSize: '11px', color: 'var(--text-muted)',
                padding: '3px 8px', border: '1px solid var(--border)', borderRadius: '4px',
                letterSpacing: '0.04em',
              }}>
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* ── Article layout ── */}
        <div className="r-wrap" style={{ paddingTop: '64px', paddingBottom: '80px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: headings.length > 0 ? '220px 1fr 48px' : '1fr', gap: '48px', alignItems: 'start', maxWidth: '1200px' }}>

            {/* TOC — desktop left */}
            {headings.length > 0 && (
              <div className="hide-mobile" style={{ position: 'sticky', top: '100px' }}>
                <ArticleTOC headings={headings} />
              </div>
            )}

            {/* Article body */}
            <article id="article-body">
              {/* Excerpt lead */}
              <p style={{
                fontSize: '20px',
                lineHeight: 1.7,
                color: 'var(--text-dim)',
                fontWeight: 400,
                borderLeft: '3px solid var(--cyan)',
                paddingLeft: '20px',
                marginBottom: '40px',
                fontStyle: 'italic',
              }}>
                {post.excerpt}
              </p>

              {/* HTML content — Glossar-Begriffe automatisch verlinkt */}
              <div
                className="prose"
                dangerouslySetInnerHTML={{ __html: linkedContent }}
              />

              {/* Tags */}
              <div style={{ marginTop: '48px', paddingTop: '32px', borderTop: '1px solid var(--border)' }}>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {post.tags.map(tag => (
                    <span key={tag} style={{
                      fontFamily: 'var(--mono)', fontSize: '11px', color: 'var(--cyan)',
                      padding: '4px 10px', border: '1px solid var(--border-bright)', borderRadius: '4px',
                    }}>
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* FAQ */}
              {post.faqs && post.faqs.length > 0 && (
                <section style={{ marginTop: '64px' }}>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: '11px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--cyan)', marginBottom: '20px' }}>
                    // FAQ
                  </div>
                  <h2 style={{ fontSize: '28px', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--text)', marginBottom: '28px' }}>
                    Häufige Fragen
                  </h2>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {post.faqs.map((faq, i) => (
                      <div key={i} style={{
                        background: 'var(--card-bg)',
                        border: '1px solid var(--border)',
                        borderRadius: '12px',
                        padding: '24px 28px',
                      }}>
                        <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                          <span style={{ fontFamily: 'var(--mono)', fontSize: '12px', color: 'var(--cyan)', fontWeight: 700, flexShrink: 0, paddingTop: '2px' }}>
                            Q{String(i + 1).padStart(2, '0')}
                          </span>
                          <div>
                            <p style={{ fontWeight: 700, color: 'var(--text)', marginBottom: '10px', lineHeight: 1.4 }}>
                              {faq.q}
                            </p>
                            <p style={{ color: 'var(--text-dim)', lineHeight: 1.7, fontSize: '15px' }}>
                              {faq.a}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Author box */}
              <div style={{
                marginTop: '64px',
                background: 'var(--card-bg)',
                border: '1px solid var(--border)',
                borderRadius: '16px',
                padding: '28px',
                display: 'flex',
                gap: '20px',
                alignItems: 'center',
              }}>
                <div style={{
                  width: '56px', height: '56px', borderRadius: '50%', flexShrink: 0,
                  background: 'linear-gradient(135deg, rgba(0,240,255,0.15), rgba(255,45,111,0.15))',
                  border: '1px solid var(--border-bright)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'var(--mono)', fontSize: '20px', color: 'var(--cyan)', fontWeight: 700,
                }}>
                  {post.author[0]}
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: 'var(--text)', marginBottom: '4px' }}>{post.author}</div>
                  {post.authorRole && (
                    <div style={{ fontFamily: 'var(--mono)', fontSize: '11px', color: 'var(--cyan)', letterSpacing: '0.06em', marginBottom: '8px' }}>{post.authorRole}</div>
                  )}
                  <div style={{ fontSize: '13px', color: 'var(--text-dim)' }}>
                    Experte für KI-Sicherheit und Cybersecurity bei sicherheit.ai
                  </div>
                </div>
              </div>
            </article>

            {/* Share — desktop right */}
            {headings.length > 0 && (
              <div className="hide-mobile" style={{ position: 'sticky', top: '100px' }}>
                <ArticleShare title={post.title} />
              </div>
            )}
          </div>
        </div>

        {/* ── Related Posts ── */}
        {related.length > 0 && (
          <div style={{ borderTop: '1px solid var(--border)', background: 'var(--bg2)', padding: '80px 0' }}>
            <div className="r-wrap">
              <div style={{ fontFamily: 'var(--mono)', fontSize: '11px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--cyan)', marginBottom: '12px' }}>
                // Verwandte Artikel
              </div>
              <h2 style={{ fontSize: '32px', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--text)', marginBottom: '32px' }}>
                Mehr lesen
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(320px, 100%), 1fr))', gap: '16px' }}>
                {related.map(r => {
                  const rb = getBadgeStyle(r.badge);
                  return (
                    <Link key={r.id} href={`/${params.locale}/blog/${r.slug}`} style={{ textDecoration: 'none' }}>
                      <article style={{
                        background: 'var(--card-bg)',
                        border: '1px solid var(--border)',
                        borderRadius: '16px',
                        padding: '24px',
                        cursor: 'pointer',
                        transition: 'border-color 0.2s',
                        height: '100%',
                      }}>
                        <div style={{ display: 'flex', gap: '6px', marginBottom: '14px' }}>
                          <span style={{ padding: '2px 8px', borderRadius: '4px', fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', background: 'rgba(0,240,255,0.1)', color: '#00F0FF' }}>
                            {r.category}
                          </span>
                          {r.badge && (
                            <span style={{ padding: '2px 8px', borderRadius: '4px', fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', background: rb.bg, color: rb.color }}>
                              {r.badge}
                            </span>
                          )}
                        </div>
                        <h3 style={{ fontSize: '15px', fontWeight: 700, lineHeight: 1.35, color: 'var(--text)', marginBottom: '12px' }}>
                          {r.title}
                        </h3>
                        <div style={{ fontFamily: 'var(--mono)', fontSize: '11px', color: 'var(--text-muted)' }}>
                          {formatDate(r.publishedAt)} · {r.readTime} min
                        </div>
                      </article>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer locale={params.locale} />
    </>
  );
}
