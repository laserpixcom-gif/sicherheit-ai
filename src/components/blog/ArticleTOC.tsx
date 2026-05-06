'use client';

import { useEffect, useRef, useState } from 'react';

interface Heading {
  level: number;
  id: string;
  text: string;
}

export default function ArticleTOC({ headings }: { headings: Heading[] }) {
  const [active, setActive] = useState<string>(headings[0]?.id ?? '');
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observer.current?.disconnect();
    observer.current = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
            break;
          }
        }
      },
      { rootMargin: '-80px 0px -60% 0px', threshold: 0 }
    );

    const els = document.querySelectorAll('#article-body h2, #article-body h3');
    els.forEach(el => observer.current?.observe(el));

    return () => observer.current?.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 100;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  return (
    <nav aria-label="Inhaltsverzeichnis">
      <div style={{
        fontFamily: 'var(--mono)',
        fontSize: '10px',
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
        color: 'var(--cyan)',
        marginBottom: '16px',
      }}>
        // Inhalt
      </div>
      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '2px' }}>
        {headings.map(h => (
          <li key={h.id}>
            <button
              onClick={() => scrollTo(h.id)}
              style={{
                display: 'block',
                width: '100%',
                textAlign: 'left',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: `6px 0 6px ${h.level === 3 ? '16px' : '0'}`,
                fontSize: h.level === 2 ? '12px' : '11px',
                fontWeight: h.level === 2 ? 600 : 400,
                color: active === h.id ? 'var(--cyan)' : 'var(--text-muted)',
                lineHeight: 1.4,
                transition: 'color 0.2s',
                borderLeft: `2px solid ${active === h.id ? 'var(--cyan)' : 'transparent'}`,
                paddingLeft: h.level === 3 ? '14px' : '10px',
                letterSpacing: h.level === 2 ? '-0.01em' : '0',
              }}
            >
              {h.text}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
