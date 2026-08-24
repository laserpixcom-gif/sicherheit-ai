import Link from 'next/link';

/**
 * Serverseitig gerenderte interne Verlinkung ("Weiterführend").
 * Verteilt Link-Signal von Pillar-/Money-Pages in Blog + Glossar (und umgekehrt).
 * hrefs OHNE Locale-Präfix übergeben (z. B. "/blog/nis2-richtlinie-mittelstand").
 */
export default function RelatedLinks({
  locale,
  title = 'Weiterführende Inhalte',
  links,
}: {
  locale: string;
  title?: string;
  links: { label: string; href: string }[];
}) {
  if (!links.length) return null;
  return (
    <section aria-label={title} className="r-wrap" style={{ padding: '8px 48px 64px' }}>
      <h2 style={{ fontFamily: 'var(--mono)', fontSize: '11px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--cyan)', marginBottom: '20px' }}>
        {title}
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '12px' }}>
        {links.map((l, i) => (
          <Link
            key={i}
            href={`/${locale}${l.href}`}
            style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px',
              padding: '16px 20px', borderRadius: '10px',
              background: 'var(--card-bg)', border: '1px solid var(--border)',
              color: 'var(--text)', textDecoration: 'none', fontSize: '14px', fontWeight: 600,
              transition: 'border-color 0.2s',
            }}
          >
            <span>{l.label}</span>
            <span style={{ color: 'var(--cyan)', flexShrink: 0 }}>→</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
