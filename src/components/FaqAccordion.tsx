'use client';

import { useState } from 'react';

interface Faq {
  q: string;
  a: string;
}

export default function FaqAccordion({ faqs }: { faqs: Faq[] }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div style={{
      background: 'var(--card-bg)',
      border: '1px solid var(--border)',
      borderRadius: '14px',
      overflow: 'hidden',
    }}>
      <div style={{
        padding: '18px 24px',
        borderBottom: '1px solid var(--border)',
        display: 'flex', alignItems: 'center', gap: '8px',
      }}>
        <span style={{ color: 'var(--cyan)', fontFamily: 'var(--mono)', fontSize: '14px', fontWeight: 700 }}>?</span>
        <span style={{
          fontFamily: 'var(--mono)', fontSize: '10px',
          letterSpacing: '0.14em', textTransform: 'uppercase',
          color: 'var(--text-muted)',
        }}>
          Häufig gestellte Fragen
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {faqs.map((faq, i) => {
          const isOpen = open === i;
          return (
            <div
              key={i}
              style={{ borderBottom: i < faqs.length - 1 ? '1px solid var(--border)' : undefined }}
            >
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                style={{
                  width: '100%', textAlign: 'left',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  gap: '12px',
                  padding: '18px 24px',
                  background: isOpen ? 'rgba(0,240,255,0.04)' : 'none',
                  border: 'none', cursor: 'pointer',
                  transition: 'background 0.15s',
                }}
              >
                <span style={{
                  fontSize: '14px', fontWeight: 600,
                  color: isOpen ? 'var(--text)' : 'var(--text-dim)',
                  lineHeight: 1.5, flex: 1,
                  transition: 'color 0.15s',
                }}>
                  {faq.q}
                </span>
                <span style={{
                  flexShrink: 0,
                  width: '22px', height: '22px',
                  borderRadius: '6px',
                  border: `1px solid ${isOpen ? 'rgba(0,240,255,0.35)' : 'var(--border)'}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'var(--mono)', fontSize: '16px', lineHeight: 1,
                  color: isOpen ? 'var(--cyan)' : 'var(--text-muted)',
                  transition: 'all 0.2s',
                  transform: isOpen ? 'rotate(45deg)' : 'none',
                  userSelect: 'none',
                }}>
                  +
                </span>
              </button>

              <div style={{
                overflow: 'hidden',
                maxHeight: isOpen ? '500px' : '0',
                transition: 'max-height 0.3s ease',
              }}>
                <div style={{
                  padding: '0 24px 20px 24px',
                  display: 'flex', gap: '10px', alignItems: 'flex-start',
                }}>
                  <span style={{
                    flexShrink: 0,
                    fontFamily: 'var(--mono)', fontSize: '9px', fontWeight: 800,
                    color: 'var(--cyan)', paddingTop: '4px',
                    letterSpacing: '0.08em', textTransform: 'uppercase',
                  }}>
                    Antwort
                  </span>
                  <p style={{
                    fontSize: '14px', color: 'var(--text-dim)',
                    margin: 0, lineHeight: 1.8,
                  }}>
                    {faq.a}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
