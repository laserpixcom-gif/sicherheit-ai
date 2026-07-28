import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import Footer from '@/components/Footer';
import GlossarClient from '@/components/GlossarClient';
import JsonLd, { definedTermSetSchema } from '@/components/JsonLd';
import { GLOSSARY_TERMS } from '@/lib/glossary';

export function generateStaticParams() {
  return [{ locale: 'de' }, { locale: 'en' }];
}

export async function generateMetadata(): Promise<Metadata> {
  const count = GLOSSARY_TERMS.length;
  return {
    title: 'Cybersecurity & KI-Sicherheit Glossar — Begriffe A–Z | sicherheit.ai',
    description: `${count} Begriffe aus KI-Sicherheit und Cybersecurity — verständlich erklärt: Definition, einfache Erklärung, Funktionsweise und FAQs. Von APT bis Zero-Day.`,
  };
}

// All possible letters A-Z for nav display
const ALL_LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

export default function GlossarPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);

  return (
    <>
      <JsonLd data={definedTermSetSchema(GLOSSARY_TERMS)} />
      <main style={{ minHeight: '100vh', background: 'var(--bg)', paddingTop: '80px' }}>
        {/* Header */}
        <div
          className="subpage-header"
          style={{ background: 'var(--bg2)', borderBottom: '1px solid var(--border)' }}
        >
          <div className="r-wrap">
            <div
              style={{
                fontFamily: 'var(--mono)', fontSize: '11px', letterSpacing: '0.14em',
                textTransform: 'uppercase', color: 'var(--cyan)', marginBottom: '12px',
              }}
            >
              // Sicherheitsbegriffe A–Z
            </div>
            <h1
              style={{
                fontSize: 'clamp(40px, 6vw, 80px)', fontWeight: 800, letterSpacing: '-0.04em',
                lineHeight: 0.95, color: 'var(--text)', margin: 0,
              }}
            >
              Glossar
            </h1>
            <p
              style={{
                fontSize: '16px', color: 'var(--text-dim)', marginTop: '20px',
                maxWidth: '520px', lineHeight: 1.7,
              }}
            >
              {GLOSSARY_TERMS.length} Begriffe aus KI-Sicherheit und Cybersecurity — mit erweiterten Definitionen und verwandten Konzepten.
            </p>

            {/* Category legend */}
            <div style={{ display: 'flex', gap: '8px', marginTop: '28px', flexWrap: 'wrap' }}>
              {(['Angriff', 'Abwehr', 'KI', 'Malware', 'Authentifizierung', 'Netzwerk', 'Regulierung', 'Protokoll'] as const).map(cat => {
                const count = GLOSSARY_TERMS.filter(t => t.category === cat).length;
                if (!count) return null;
                const colors: Record<string, { color: string; bg: string }> = {
                  Angriff:          { color: '#FF2D6F', bg: 'rgba(255,45,111,0.10)' },
                  Abwehr:           { color: '#00F0FF', bg: 'rgba(0,240,255,0.10)' },
                  Regulierung:      { color: '#7890FF', bg: 'rgba(120,144,255,0.10)' },
                  KI:               { color: '#FF9632', bg: 'rgba(255,150,50,0.10)' },
                  Malware:          { color: '#FF2D6F', bg: 'rgba(255,45,111,0.10)' },
                  Authentifizierung:{ color: '#78C864', bg: 'rgba(120,200,100,0.10)' },
                  Netzwerk:         { color: '#9664FF', bg: 'rgba(150,100,255,0.10)' },
                  Protokoll:        { color: '#00C8A0', bg: 'rgba(0,200,160,0.10)' },
                };
                const c = colors[cat];
                return (
                  <span
                    key={cat}
                    style={{
                      padding: '3px 10px', borderRadius: '4px', fontSize: '11px',
                      fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em',
                      background: c.bg, color: c.color,
                    }}
                  >
                    {cat} ({count})
                  </span>
                );
              })}
            </div>
          </div>
        </div>

        {/* Client-side interactive glossary */}
        <div className="subpage-content">
          <GlossarClient terms={GLOSSARY_TERMS} letters={ALL_LETTERS} locale={locale} />
        </div>

        {/* SSR-Liste aller Begriffe — garantiert serverseitig crawlbare interne Links.
            Kritisch für Indexierung: verteilt Link-Signal vom Hub an alle 113 Term-Seiten,
            unabhängig davon, ob der Google-Crawler das Client-JS ausführt. */}
        <nav aria-label="Alle Glossarbegriffe" className="r-wrap" style={{ padding: '8px 48px 56px' }}>
          <h2 style={{ fontFamily: 'var(--mono)', fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '20px' }}>
            Alle Begriffe A–Z
          </h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {[...GLOSSARY_TERMS].sort((a, b) => a.term.localeCompare(b.term, 'de')).map(t => (
              <Link
                key={t.id}
                href={`/${locale}/glossar/${t.id}`}
                style={{
                  padding: '6px 12px', borderRadius: '6px', fontSize: '12px',
                  background: 'var(--card-bg)', border: '1px solid var(--border)',
                  color: 'var(--text-dim)', textDecoration: 'none',
                }}
              >
                {t.term}{t.abbr ? ` (${t.abbr})` : ''}
              </Link>
            ))}
          </div>
        </nav>
      </main>
      <Footer locale={locale} />
    </>
  );
}
