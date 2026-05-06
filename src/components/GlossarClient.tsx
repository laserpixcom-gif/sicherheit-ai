'use client';

import { useState, useEffect, useRef } from 'react';
import { GlossaryTerm, GlossaryCategory, CATEGORY_COLORS } from '@/lib/glossary';

interface Props {
  terms: GlossaryTerm[];
  letters: string[];
}

const FILTERS: { label: string; value: GlossaryCategory | 'Alle' }[] = [
  { label: 'Alle', value: 'Alle' },
  { label: 'Angriff', value: 'Angriff' },
  { label: 'KI', value: 'KI' },
  { label: 'Abwehr', value: 'Abwehr' },
  { label: 'Malware', value: 'Malware' },
  { label: 'Authentifizierung', value: 'Authentifizierung' },
  { label: 'Netzwerk', value: 'Netzwerk' },
  { label: 'Regulierung', value: 'Regulierung' },
  { label: 'Protokoll', value: 'Protokoll' },
];

export default function GlossarClient({ terms }: Props) {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<GlossaryCategory | 'Alle'>('Alle');
  const [activeLetter, setActiveLetter] = useState<string>('A');
  const [expanded, setExpanded] = useState<string | null>(null);
  const letterRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const debounceRef = useRef<NodeJS.Timeout>();

  const handleSearch = (val: string) => {
    setQuery(val);
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => setDebouncedQuery(val), 220);
  };

  // Filter terms
  const filtered = terms.filter(t => {
    const matchesFilter = activeFilter === 'Alle' || t.category === activeFilter;
    const q = debouncedQuery.toLowerCase().trim();
    const matchesQuery = !q ||
      t.term.toLowerCase().includes(q) ||
      t.abbr?.toLowerCase().includes(q) ||
      t.def.toLowerCase().includes(q);
    return matchesFilter && matchesQuery;
  });

  // Group by letter
  const grouped: Record<string, GlossaryTerm[]> = {};
  for (const t of filtered) {
    const l = t.term[0].toUpperCase();
    if (!grouped[l]) grouped[l] = [];
    grouped[l].push(t);
  }
  const displayLetters = Object.keys(grouped).sort();

  const scrollToLetter = (letter: string) => {
    setActiveLetter(letter);
    const el = letterRefs.current[letter];
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 160;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  // Track active letter on scroll
  useEffect(() => {
    const onScroll = () => {
      for (const letter of [...displayLetters].reverse()) {
        const el = letterRefs.current[letter];
        if (!el) continue;
        if (el.getBoundingClientRect().top <= 170) {
          setActiveLetter(letter);
          break;
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [displayLetters]);

  return (
    <div>
      {/* ── Search + Filters ── */}
      <div style={{ marginBottom: '28px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {/* Search */}
        <div style={{ position: 'relative', maxWidth: '520px' }}>
          <svg style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <input
            type="search"
            value={query}
            onChange={e => handleSearch(e.target.value)}
            placeholder="Begriff suchen… z.B. Zero-Day, Phishing, LLM"
            style={{
              width: '100%',
              background: 'var(--card-bg)',
              border: '1px solid var(--border)',
              borderRadius: '10px',
              padding: '13px 16px 13px 44px',
              fontSize: '14px',
              color: 'var(--text)',
              fontFamily: 'var(--font)',
              outline: 'none',
              transition: 'border-color 0.2s',
            }}
            onFocus={e => (e.target.style.borderColor = 'var(--cyan)')}
            onBlur={e => (e.target.style.borderColor = 'var(--border)')}
          />
          {query && (
            <button onClick={() => { setQuery(''); setDebouncedQuery(''); }} style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', fontSize: '20px', lineHeight: 1 }}>
              ×
            </button>
          )}
        </div>

        {/* Category filters */}
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {FILTERS.map(f => {
            const isActive = f.value === activeFilter;
            const count = f.value === 'Alle' ? terms.length : terms.filter(t => t.category === f.value).length;
            if (count === 0 && f.value !== 'Alle') return null;
            return (
              <button
                key={f.value}
                onClick={() => setActiveFilter(f.value)}
                style={{
                  padding: '6px 14px',
                  borderRadius: '6px',
                  border: '1px solid',
                  borderColor: isActive ? 'var(--cyan)' : 'var(--border)',
                  background: isActive ? 'var(--cyan)' : 'var(--card-bg)',
                  color: isActive ? '#060B18' : 'var(--text-dim)',
                  fontSize: '13px',
                  fontWeight: isActive ? 700 : 400,
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                  fontFamily: 'var(--font)',
                }}
              >
                {f.label}
              </button>
            );
          })}
        </div>

        {/* Stats */}
        <div style={{ fontFamily: 'var(--mono)', fontSize: '11px', color: 'var(--text-muted)', letterSpacing: '0.04em' }}>
          // {filtered.length} Einträge · {displayLetters.length} Buchstaben
          {debouncedQuery && <span style={{ color: 'var(--cyan)', marginLeft: '8px' }}>· Suche: &quot;{debouncedQuery}&quot;</span>}
        </div>
      </div>

      {/* ── Layout: A-Z sidebar + content ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '48px 1fr', gap: '32px', alignItems: 'start' }}>

        {/* A-Z vertical nav */}
        <div style={{ position: 'sticky', top: '100px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(letter => {
            const available = displayLetters.includes(letter);
            const isActive = letter === activeLetter && available;
            return (
              <button
                key={letter}
                onClick={() => available && scrollToLetter(letter)}
                disabled={!available}
                title={letter}
                style={{
                  width: '32px', height: '32px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: isActive ? 'var(--cyan)' : 'transparent',
                  border: '1px solid',
                  borderColor: isActive ? 'var(--cyan)' : available ? 'var(--border)' : 'transparent',
                  borderRadius: '6px',
                  cursor: available ? 'pointer' : 'default',
                  fontFamily: 'var(--mono)',
                  fontSize: '11px',
                  fontWeight: 700,
                  color: isActive ? '#060B18' : available ? 'var(--text-dim)' : 'var(--surface2)',
                  opacity: available ? 1 : 0.25,
                  transition: 'all 0.15s',
                  padding: 0,
                }}
              >
                {letter}
              </button>
            );
          })}
        </div>

        {/* Terms content */}
        <div>
          {displayLetters.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-muted)', fontFamily: 'var(--mono)', fontSize: '14px' }}>
              Keine Begriffe gefunden.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
              {displayLetters.map(letter => (
                <div key={letter} ref={el => { letterRefs.current[letter] = el; }}>
                  {/* Letter header */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '12px' }}>
                    <div style={{
                      width: '44px', height: '44px', borderRadius: '10px', flexShrink: 0,
                      background: 'linear-gradient(135deg, rgba(0,240,255,0.08), transparent)',
                      border: '1px solid var(--border-bright)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontFamily: 'var(--mono)', fontSize: '18px', fontWeight: 800, color: 'var(--cyan)',
                    }}>
                      {letter}
                    </div>
                    <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
                    <span style={{ fontFamily: 'var(--mono)', fontSize: '10px', color: 'var(--text-muted)', letterSpacing: '0.06em' }}>
                      {grouped[letter].length}
                    </span>
                  </div>

                  {/* Terms */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                    {grouped[letter].map(term => {
                      const catStyle = CATEGORY_COLORS[term.category as GlossaryCategory] ?? CATEGORY_COLORS.Abwehr;
                      const isOpen = expanded === term.id;
                      const relatedTerms = term.related
                        ?.map(rid => terms.find(t => t.id === rid))
                        .filter(Boolean) as GlossaryTerm[] | undefined;

                      return (
                        <div
                          key={term.id}
                          id={`term-${term.id}`}
                          style={{
                            background: isOpen ? 'var(--card-bg)' : 'transparent',
                            border: '1px solid',
                            borderColor: isOpen ? 'var(--border-bright)' : 'transparent',
                            borderRadius: '10px',
                            overflow: 'hidden',
                            transition: 'border-color 0.2s, background 0.2s',
                          }}
                        >
                          {/* Row */}
                          <button
                            onClick={() => setExpanded(isOpen ? null : term.id)}
                            style={{
                              display: 'flex', alignItems: 'center', gap: '12px',
                              width: '100%', textAlign: 'left',
                              padding: '14px 16px',
                              background: 'none', border: 'none', cursor: 'pointer',
                            }}
                          >
                            {/* Term name */}
                            <span style={{ flex: 1, fontSize: '15px', fontWeight: 600, color: 'var(--text)', letterSpacing: '-0.01em', textAlign: 'left' }}>
                              {term.term}
                            </span>

                            {/* Abbr */}
                            {term.abbr && (
                              <span style={{
                                fontFamily: 'var(--mono)', fontSize: '10px',
                                color: 'var(--text-muted)',
                                background: 'var(--surface)',
                                padding: '2px 7px', borderRadius: '4px',
                                flexShrink: 0,
                              }}>
                                {term.abbr}
                              </span>
                            )}

                            {/* Category badge */}
                            <span style={{
                              padding: '2px 8px', borderRadius: '4px', fontSize: '10px',
                              fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em',
                              background: catStyle.bg, color: catStyle.color,
                              flexShrink: 0,
                            }}>
                              {term.category}
                            </span>

                            {/* Dot indicator */}
                            <div style={{
                              width: '7px', height: '7px', borderRadius: '50%', flexShrink: 0,
                              background: catStyle.color,
                              boxShadow: `0 0 6px ${catStyle.color}`,
                            }} />

                            {/* Chevron */}
                            <svg
                              width="14" height="14" viewBox="0 0 24 24" fill="none"
                              stroke="var(--text-muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                              style={{ flexShrink: 0, transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.25s' }}
                            >
                              <polyline points="6 9 12 15 18 9"/>
                            </svg>
                          </button>

                          {/* Expanded */}
                          {isOpen && (
                            <div style={{ padding: '0 16px 20px' }}>
                              <p style={{ fontSize: '14px', color: 'var(--text-dim)', lineHeight: 1.75, margin: '0 0 14px', borderLeft: '2px solid var(--cyan)', paddingLeft: '14px' }}>
                                {term.def}
                              </p>

                              {term.extended && (
                                <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.8, margin: '0 0 14px' }}>
                                  {term.extended}
                                </p>
                              )}

                              {relatedTerms && relatedTerms.length > 0 && (
                                <div>
                                  <div style={{ fontFamily: 'var(--mono)', fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '8px' }}>
                                    Verwandte Begriffe
                                  </div>
                                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                                    {relatedTerms.map(rt => (
                                      <button
                                        key={rt.id}
                                        onClick={e => {
                                          e.stopPropagation();
                                          setExpanded(rt.id);
                                          setTimeout(() => {
                                            const el = document.getElementById(`term-${rt.id}`);
                                            el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                          }, 50);
                                        }}
                                        style={{
                                          fontFamily: 'var(--mono)', fontSize: '11px',
                                          padding: '3px 10px', borderRadius: '5px',
                                          border: '1px solid var(--border-bright)',
                                          background: 'var(--cyan-dim)',
                                          color: 'var(--cyan)',
                                          cursor: 'pointer',
                                        }}
                                      >
                                        {rt.abbr ?? rt.term}
                                      </button>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
