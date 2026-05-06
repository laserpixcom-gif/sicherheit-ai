import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import Footer from '@/components/Footer';
import GlossarClient from '@/components/GlossarClient';
import { GLOSSARY_TERMS } from '@/lib/glossary';

export function generateStaticParams() {
  return [{ locale: 'de' }, { locale: 'en' }];
}

export const metadata: Metadata = {
  title: 'Glossar — KI-Sicherheit & Cybersecurity Begriffe | sicherheit.ai',
  description: 'Über 25 Begriffe aus KI-Sicherheit und Cybersecurity — verständlich erklärt mit Kategorien, erweiterten Definitionen und verwandten Begriffen.',
};

// All possible letters A-Z for nav display
const ALL_LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

export default function GlossarPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  // Schema.org DefinedTermSet
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTermSet',
    name: 'KI-Sicherheit & Cybersecurity Glossar',
    url: 'https://sicherheit.ai/glossar',
    hasDefinedTerm: GLOSSARY_TERMS.map(t => ({
      '@type': 'DefinedTerm',
      name: t.abbr ? `${t.term} (${t.abbr})` : t.term,
      description: t.def,
      inDefinedTermSet: 'https://sicherheit.ai/glossar',
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
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
          <GlossarClient terms={GLOSSARY_TERMS} letters={ALL_LETTERS} />
        </div>
      </main>
      <Footer locale={locale} />
    </>
  );
}
