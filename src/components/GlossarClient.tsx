'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { GlossaryTerm, GlossaryCategory, CATEGORY_COLORS } from '@/lib/glossary';

interface Props {
  terms: GlossaryTerm[];
  letters: string[];
}

export default function GlossarClient({ terms, letters }: Props) {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [activeLetter, setActiveLetter] = useState<string>(letters[0] ?? '');
  const [expanded, setExpanded] = useState<string | null>(null);
  const letterRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const debounceRef = useRef<NodeJS.Timeout>();

  // Debounce search
  const handleSearch = (val: string) => {
    setQuery(val);
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => setDebouncedQuery(val), 220);
  };

  // Filter terms
  const filtered = debouncedQuery.trim()
    ? terms.filter(t =>
        t.term.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
        t.abbr?.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
        t.def.toLowerCase().includes(debouncedQuery.toLowerCase())
      )
    : null;

  // Group filtered or all
  const grouped: Record<string, GlossaryTerm[]> = {};
  if (filtered) {
    for (const t of filtered) {
      const l = t.term[0].toUpperCase();
      if (!grouped[l]) grouped[l] = [];
      grouped[l].push(t);
    }
  } else {
    for (const t of terms) {
      const l = t.term[0].toUpperCase();
      if (!grouped[l]) grouped[l] = [];
      grouped[l].push(t);
    }
  }
  const displayLetters = Object.keys(grouped).sort();

  const scrollToLetter = (letter: string) => {
    setActiveLetter(letter);
    const el = letterRefs.current[letter];
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 140;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  // Track active letter on scroll
  useEffect(() => {
    if (debouncedQuery) return;
    const onScroll = () => {
      for (const letter of [...letters].reverse()) {
        const el = letterRefs.current[letter];
        if (!el) continue;
        if (el.getBoundingClientRect().top <= 160) {
          setActiveLetter(letter);
          break;
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [letters, debouncedQuery]);

  return (
    <>
      {/* ── Search ── */}
      <div style={{ marginBottom: '40px' }}>
        <div style={{ position: 'relative', maxWidth: '480px' }}>
          <svg style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', flexShrink: 0 }} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <input
            type="search"
            value={query}
            onChange={e => handleSearch(e.target.value)}
            placeholder="Begriff suchen…"
            style={{
              width: '100%',
              background: 'var(--card-bg)',
              border: '1px solid var(--border)',
              borderRadius: '10px',
              padding: '12px 16px 12px 44px',
              fontSize: '15px',
              color: 'var(--text)',
              fontFamily: 'var(--font)',
              outline: 'none',
              transition: 'border-color 0.2s',
            }}
            onFocus={e => (e.target.style.borderColor = 'var(--cyan)')}
            onBlur={e => (e.target.style.borderColor = 'var(--border)')}
          />
          {query && (
            <button
              onClick={() => { setQuery(''); setDebouncedQuery(''); }}
              style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', fontSize: '18px', lineHeight: 1 }}
            >
              ×
            </button>
          )}
        </div>
        {debouncedQuery && (
          <div style={{ marginTop: '8px', fontFamily: 'var(--mono)', fontSize: '11px', color: 'var(--text-muted)' }}>
            {filtered?.length ?? 0} Treffer für &quot;{debouncedQuery}&quot;
          </div>
        )}
      </div>

      {/* ── A–Z Nav ── */}
      {!debouncedQuery && (
        <div style={{
          position: 'sticky', top: '80px', zIndex: 10,
          background: 'var(--bg)',
          borderBottom: '1px solid var(--border)',
          marginBottom: '32px',
          paddingBottom: '12px',
          overflowX: 'auto',
        }}>
          <div style={{ display: 'flex', gap: '4px', minWidth: 'max-content' }}>
            {letters.map(letter => {
              const available = displayLetters.includes(letter);
              const isActive = letter === activeLetter;
              return (
                <button
                  key={letter}
                  onClick={() => available && scrollToLetter(letter)}
                  disabled={!available}
                  style={{
                    width: '36px', height: '36px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: isActive ? 'var(--cyan)' : 'transparent',
                    border: '1px solid',
                    borderColor: isActive ? 'var(--cyan)' : available ? 'var(--border)' : 'transparent',
                    borderRadius: '6px',
                    cursor: available ? 'pointer' : 'default',
                    fontFamily: 'var(--mono)',
                    fontSize: '13px',
                    fontWeight: 700,
                    color: isActive ? '#060B18' : available ? 'var(--text-dim)' : 'var(--text-muted)',
                    opacity: available ? 1 : 0.3,
                    transition: 'all 0.15s',
                  }}
                >
                  {letter}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* ── Terms ── */}
      {displayLetters.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-muted)', fontFamily: 'var(--mono)', fontSize: '14px' }}>
          Keine Begriffe gefunden.
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
          {displayLetters.map(letter => (
            <div key={letter} ref={el => { letterRefs.current[letter] = el; }}>
              {/* Letter header */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px',
              }}>
                <div style={{
                  width: '48px', height: '48px', borderRadius: '10px', flexShrink: 0,
                  background: 'linear-gradient(135deg, var(--cyan-dim), transparent)',
                  border: '1px solid var(--border-bright)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'var(--mono)', fontSize: '20px', fontWeight: 800, color: 'var(--cyan)',
                }}>
                  {letter}
                </div>
                <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
                <span style={{ fontFamily: 'var(--mono)', fontSize: '11px', color: 'var(--text-muted)' }}>
                  {grouped[letter].length} Begriff{grouped[letter].length !== 1 ? 'e' : ''}
                </span>
              </div>

              {/* Terms under this letter */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {grouped[letter].map(term => {
                  const catStyle = CATEGORY_COLORS[term.category as GlossaryCategory] ?? CATEGORY_COLORS.Abwehr;
                  const isOpen = expanded === term.id;
                  const relatedTerms = term.related?.map(rid => terms.find(t => t.id === rid)).filter(Boolean) as GlossaryTerm[] | undefined;

                  return (
                    <div
                      key={term.id}
                      style={{
                        background: 'var(--card-bg)',
                        border: `1px solid ${isOpen ? 'var(--border-bright)' : 'var(--border)'}`,
                        borderRadius: '12px',
                        overflow: 'hidden',
                        transition: 'border-color 0.2s',
                      }}
                    >
                      {/* Term header */}
                      <button
                        onClick={() => setExpanded(isOpen ? null : term.id)}
                        style={{
                          display: 'flex', alignItems: 'center', gap: '16px',
                          width: '100%', textAlign: 'left',
                          padding: '20px 24px',
                          background: 'none', border: 'none', cursor: 'pointer',
                        }}
                      >
                        <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                          <span style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text)', letterSpacing: '-0.01em' }}>
                            {term.term}
                          </span>
                          {term.abbr && (
                            <span style={{ fontFamily: 'var(--mono)', fontSize: '11px', color: 'var(--cyan)', background: 'var(--cyan-dim)', padding: '2px 7px', borderRadius: '4px' }}>
                              {term.abbr}
                            </span>
                          )}
                          <span style={{ padding: '2px 8px', borderRadius: '4px', fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', background: catStyle.bg, color: catStyle.color }}>
                            {term.category}
                          </span>
                        </div>
                        <svg
                          width="16" height="16" viewBox="0 0 24 24" fill="none"
                          stroke="var(--text-muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                          style={{ flexShrink: 0, transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.25s' }}
                        >
                          <polyline points="6 9 12 15 18 9"/>
                        </svg>
                      </button>

                      {/* Short def always visible */}
                      <div style={{ padding: '0 24px 20px 24px' }}>
                        <p style={{ fontSize: '14px', color: 'var(--text-dim)', lineHeight: 1.7, margin: 0 }}>
                          {term.def}
                        </p>
                      </div>

                      {/* Expanded content */}
                      {isOpen && (
                        <div style={{
                          borderTop: '1px solid var(--border)',
                          padding: '20px 24px 24px',
                          background: 'var(--surface)',
                        }}>
                          {term.extended && (
                            <p style={{ fontSize: '14px', color: 'var(--text-dim)', lineHeight: 1.8, marginBottom: relatedTerms?.length ? '20px' : '0' }}>
                              {term.extended}
                            </p>
                          )}
                          {relatedTerms && relatedTerms.length > 0 && (
                            <div>
                              <div style={{ fontFamily: 'var(--mono)', fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '10px' }}>
                                Verwandte Begriffe
                              </div>
                              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                                {relatedTerms.map(rt => (
                                  <button
                                    key={rt.id}
                                    onClick={e => { e.stopPropagation(); setExpanded(rt.id); const el = document.getElementById(`term-${rt.id}`); el?.scrollIntoView({ behavior: 'smooth', block: 'center' }); }}
                                    style={{
                                      fontFamily: 'var(--mono)', fontSize: '11px',
                                      padding: '4px 10px', borderRadius: '6px',
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
    </>
  );
}
