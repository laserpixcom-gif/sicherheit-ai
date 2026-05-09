import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import Footer from '@/components/Footer';
import JsonLd, { faqSchema } from '@/components/JsonLd';
import FaqAccordion from '@/components/FaqAccordion';
import { GLOSSARY_TERMS, CATEGORY_COLORS, GlossaryTerm } from '@/lib/glossary';

const BASE_URL = 'https://sicherheit.ai';

export function generateStaticParams() {
  const locales = ['de', 'en'];
  return locales.flatMap(locale =>
    GLOSSARY_TERMS.map(t => ({ locale, slug: t.id }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string; slug: string };
}): Promise<Metadata> {
  const term = GLOSSARY_TERMS.find(t => t.id === params.slug);
  if (!term) return {};
  const title = term.abbr
    ? `${term.term} (${term.abbr}) — Definition & Erklärung | sicherheit.ai`
    : `${term.term} — Definition & Erklärung | sicherheit.ai`;
  return {
    title,
    description: term.def,
    keywords: [term.term, term.abbr, term.category, 'Cybersecurity', 'KI-Sicherheit', 'Definition'].filter(Boolean).join(', '),
    alternates: {
      canonical: `${BASE_URL}/${params.locale}/glossar/${term.id}`,
      languages: {
        de: `${BASE_URL}/de/glossar/${term.id}`,
        en: `${BASE_URL}/en/glossar/${term.id}`,
      },
    },
    openGraph: {
      title,
      description: term.def,
      type: 'article',
      url: `${BASE_URL}/${params.locale}/glossar/${term.id}`,
    },
  };
}

function termSchema(term: GlossaryTerm, locale: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'DefinedTerm',
    name: term.abbr ? `${term.term} (${term.abbr})` : term.term,
    description: term.def,
    url: `${BASE_URL}/${locale}/glossar/${term.id}`,
    inDefinedTermSet: {
      '@type': 'DefinedTermSet',
      name: 'KI-Sicherheit & Cybersecurity Glossar',
      url: `${BASE_URL}/${locale}/glossar`,
    },
  };
}

export default function GlossarTermPage({
  params,
}: {
  params: { locale: string; slug: string };
}) {
  setRequestLocale(params.locale);
  const term = GLOSSARY_TERMS.find(t => t.id === params.slug);
  if (!term) notFound();

  const catStyle = CATEGORY_COLORS[term.category] ?? CATEGORY_COLORS.Abwehr;
  const relatedTerms = term.related
    ?.map(rid => GLOSSARY_TERMS.find(t => t.id === rid))
    .filter(Boolean) as GlossaryTerm[];

  return (
    <>
      <JsonLd data={termSchema(term, params.locale)} />
      {term.faqs && term.faqs.length > 0 && (
        <JsonLd data={faqSchema(term.faqs)} />
      )}
      <style>{`
        .gterm-related-link:hover { border-color: var(--border-bright) !important; }
        .gterm-back:hover { border-color: var(--cyan) !important; color: var(--cyan) !important; }
        .gterm-all-link:hover { border-color: var(--border-bright) !important; color: var(--text) !important; }
      `}</style>
      <main style={{ minHeight: '100vh', background: 'var(--bg)', paddingTop: '80px' }}>

        {/* ── Header ── */}
        <div style={{ background: 'var(--bg2)', borderBottom: '1px solid var(--border)' }}>
          <div className="r-wrap" style={{ padding: '48px 48px 40px' }}>

            {/* Breadcrumb */}
            <nav style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px', fontFamily: 'var(--mono)', fontSize: '11px', color: 'var(--text-muted)' }}>
              <Link href={`/${params.locale}`} style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Home</Link>
              <span>›</span>
              <Link href={`/${params.locale}/glossar`} style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Glossar</Link>
              <span>›</span>
              <span style={{ color: 'var(--cyan)' }}>{term.abbr ?? term.term}</span>
            </nav>

            {/* Category badge */}
            <div style={{ marginBottom: '16px' }}>
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: '6px',
                padding: '4px 12px', borderRadius: '6px', fontSize: '11px',
                fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em',
                background: catStyle.bg, color: catStyle.color,
                fontFamily: 'var(--mono)',
              }}>
                <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: catStyle.color, boxShadow: `0 0 6px ${catStyle.color}` }} />
                {term.category}
              </span>
            </div>

            {/* Title */}
            <h1 style={{
              fontSize: 'clamp(32px, 5vw, 64px)', fontWeight: 800,
              letterSpacing: '-0.04em', lineHeight: 0.95,
              color: 'var(--text)', margin: '0 0 12px',
            }}>
              {term.term}
            </h1>
            {term.abbr && (
              <div style={{ fontFamily: 'var(--mono)', fontSize: '13px', color: 'var(--text-muted)', marginBottom: '20px' }}>
                Abkürzung: <span style={{ color: 'var(--cyan)' }}>{term.abbr}</span>
              </div>
            )}

            {/* Definition */}
            <p style={{
              fontSize: 'clamp(15px, 1.8vw, 18px)', color: 'var(--text-dim)',
              lineHeight: 1.75, maxWidth: '680px',
              borderLeft: '3px solid var(--cyan)',
              paddingLeft: '20px', margin: 0,
            }}>
              {term.def}
            </p>
          </div>
        </div>

        {/* ── Content ── */}
        <div className="r-wrap" style={{ padding: '56px 48px' }}>
          <div className="subpage-sidebar-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '48px', alignItems: 'start' }}>

            {/* LEFT: main content */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>

              {/* Simple explanation */}
              <div style={{
                background: 'var(--card-bg)',
                border: '1px solid rgba(0,240,255,0.15)',
                borderRadius: '14px',
                padding: '28px',
                position: 'relative',
                overflow: 'hidden',
              }}>
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
                  background: 'linear-gradient(90deg, var(--cyan), transparent)',
                }} />
                <div style={{
                  display: 'flex', alignItems: 'center', gap: '10px',
                  marginBottom: '16px',
                }}>
                  <span style={{ fontSize: '22px' }}>🧒</span>
                  <div>
                    <div style={{ fontFamily: 'var(--mono)', fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--cyan)', marginBottom: '2px' }}>
                      Einfach erklärt
                    </div>
                    <div style={{ fontSize: '13px', color: 'var(--text-muted)', fontFamily: 'var(--font)' }}>
                      Für jeden verständlich — ohne Vorkenntnisse
                    </div>
                  </div>
                </div>
                <p style={{
                  fontSize: '16px', lineHeight: 1.85,
                  color: 'var(--text)', margin: 0,
                  fontStyle: 'italic',
                }}>
                  &ldquo;{term.simple}&rdquo;
                </p>
              </div>

              {/* Extended definition */}
              {term.extended && (
                <div>
                  <h2 style={{
                    fontSize: '20px', fontWeight: 700, color: 'var(--text)',
                    letterSpacing: '-0.02em', marginBottom: '14px',
                    display: 'flex', alignItems: 'center', gap: '10px',
                  }}>
                    <span style={{ width: '3px', height: '20px', background: 'var(--cyan)', borderRadius: '2px', display: 'block', flexShrink: 0 }} />
                    Ausführliche Erklärung
                  </h2>
                  <p style={{ fontSize: '15px', color: 'var(--text-dim)', lineHeight: 1.85, margin: 0 }}>
                    {term.extended}
                  </p>
                </div>
              )}

              {/* How it works */}
              {term.howItWorks && (
                <div style={{
                  background: 'var(--card-bg)',
                  border: '1px solid var(--border)',
                  borderRadius: '14px',
                  padding: '28px',
                }}>
                  <h2 style={{
                    fontSize: '18px', fontWeight: 700, color: 'var(--text)',
                    letterSpacing: '-0.02em', marginBottom: '18px',
                    display: 'flex', alignItems: 'center', gap: '10px',
                    fontFamily: 'var(--mono)',
                  }}>
                    <span style={{ color: 'var(--cyan)' }}>{'>'}</span>
                    Wie funktioniert das?
                  </h2>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {term.howItWorks.split('. ').filter(s => s.trim().length > 10).map((step, i) => (
                      <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                        <span style={{
                          flexShrink: 0, width: '22px', height: '22px',
                          borderRadius: '6px', background: 'var(--cyan-dim)',
                          border: '1px solid rgba(0,240,255,0.2)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontFamily: 'var(--mono)', fontSize: '10px', fontWeight: 800,
                          color: 'var(--cyan)',
                        }}>
                          {i + 1}
                        </span>
                        <p style={{ fontSize: '14px', color: 'var(--text-dim)', lineHeight: 1.7, margin: 0 }}>
                          {step.trim().replace(/^\d+\.\s*/, '')}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* FAQ Section */}
              {term.faqs && term.faqs.length > 0 && (
                <FaqAccordion faqs={term.faqs} />
              )}

            </div>

            {/* RIGHT: sidebar */}
            <div className="subpage-sidebar" style={{ display: 'flex', flexDirection: 'column', gap: '20px', position: 'sticky', top: '100px' }}>

              {/* Quick facts */}
              <div style={{
                background: 'var(--card-bg)', border: '1px solid var(--border)',
                borderRadius: '14px', padding: '22px',
              }}>
                <div style={{ fontFamily: 'var(--mono)', fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '16px' }}>
                  Quick Facts
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Kategorie</span>
                    <span style={{ fontSize: '12px', fontWeight: 700, padding: '2px 8px', borderRadius: '4px', background: catStyle.bg, color: catStyle.color }}>
                      {term.category}
                    </span>
                  </div>
                  {term.abbr && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Abkürzung</span>
                      <span style={{ fontFamily: 'var(--mono)', fontSize: '13px', color: 'var(--cyan)', fontWeight: 700 }}>{term.abbr}</span>
                    </div>
                  )}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Verwandte Begriffe</span>
                    <span style={{ fontFamily: 'var(--mono)', fontSize: '13px', color: 'var(--text-dim)' }}>{term.related?.length ?? 0}</span>
                  </div>
                </div>
              </div>

              {/* Related terms */}
              {relatedTerms && relatedTerms.length > 0 && (
                <div style={{
                  background: 'var(--card-bg)', border: '1px solid var(--border)',
                  borderRadius: '14px', padding: '22px',
                }}>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '14px' }}>
                    Verwandte Begriffe
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {relatedTerms.map(rt => {
                      const rc = CATEGORY_COLORS[rt.category] ?? CATEGORY_COLORS.Abwehr;
                      return (
                        <Link key={rt.id} href={`/${params.locale}/glossar/${rt.id}`}
                          className="gterm-related-link"
                          style={{
                            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                            padding: '10px 12px', borderRadius: '8px',
                            background: 'var(--surface)', border: '1px solid var(--border)',
                            textDecoration: 'none', transition: 'border-color 0.2s',
                          }}
                        >
                          <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text)' }}>
                            {rt.abbr ?? rt.term}
                          </span>
                          <span style={{ fontSize: '10px', padding: '2px 6px', borderRadius: '3px', background: rc.bg, color: rc.color, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                            {rt.category}
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Back to glossar */}
              <Link href={`/${params.locale}/glossar`}
                className="gterm-back"
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                  padding: '12px', borderRadius: '10px',
                  border: '1px solid var(--border)', background: 'var(--card-bg)',
                  color: 'var(--text-muted)', fontSize: '13px', fontFamily: 'var(--mono)',
                  textDecoration: 'none', transition: 'all 0.2s',
                }}
              >
                ← Zurück zum Glossar
              </Link>
            </div>
          </div>

          {/* ── All terms navigation ── */}
          <div style={{ marginTop: '64px', paddingTop: '40px', borderTop: '1px solid var(--border)' }}>
            <div style={{ fontFamily: 'var(--mono)', fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '20px' }}>
              Alle Begriffe im Glossar
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {GLOSSARY_TERMS.map(t => {
                const isCurrent = t.id === term.id;
                const tc = CATEGORY_COLORS[t.category] ?? CATEGORY_COLORS.Abwehr;
                return (
                  <Link key={t.id} href={`/${params.locale}/glossar/${t.id}`}
                    style={{
                      padding: '6px 12px', borderRadius: '6px', fontSize: '12px',
                      fontWeight: isCurrent ? 700 : 400,
                      background: isCurrent ? tc.bg : 'var(--card-bg)',
                      border: '1px solid ' + (isCurrent ? tc.color + '40' : 'var(--border)'),
                      color: isCurrent ? tc.color : 'var(--text-dim)',
                      textDecoration: 'none', transition: 'all 0.15s',
                    }}
                  >
                    {t.abbr ?? t.term}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </main>
      <Footer locale={params.locale} />
    </>
  );
}
