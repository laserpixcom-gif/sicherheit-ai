'use client';

import { useState } from 'react';

interface Props {
  tool: string;
  headline?: string;
  subline?: string;
  accentColor?: string;
}

export default function LeadCapture({
  tool,
  headline = 'Ergebnis als PDF-Report erhalten',
  subline = 'Wir schicken dir eine kompakte Auswertung mit konkreten Handlungsempfehlungen. Kostenlos.',
  accentColor = 'var(--cyan)',
}: Props) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const submit = async () => {
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrorMsg('Bitte gültige E-Mail eingeben.');
      return;
    }
    setStatus('loading');
    setErrorMsg('');
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'tool-page', tool }),
      });
      if (res.ok) {
        setStatus('success');
      } else {
        const d = await res.json();
        setErrorMsg(d.error ?? 'Fehler. Bitte erneut versuchen.');
        setStatus('error');
      }
    } catch {
      setErrorMsg('Netzwerkfehler. Bitte erneut versuchen.');
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div style={{
        padding: '24px 28px',
        background: 'rgba(120,200,100,0.06)',
        border: '1px solid rgba(120,200,100,0.25)',
        borderRadius: '14px',
        textAlign: 'center',
      }}>
        <div style={{ fontSize: '28px', marginBottom: '10px' }}>✓</div>
        <div style={{ fontSize: '15px', fontWeight: 700, color: '#78C864', marginBottom: '6px' }}>
          Danke! Report wird geschickt.
        </div>
        <div style={{ fontSize: '13px', color: 'var(--text-muted)', fontFamily: 'var(--mono)' }}>
          Schau auch in deinen Spam-Ordner.
        </div>
      </div>
    );
  }

  return (
    <div style={{
      padding: '24px 28px',
      background: 'var(--card-bg)',
      border: `1px solid var(--border)`,
      borderRadius: '14px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Accent bar */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
        background: `linear-gradient(90deg, ${accentColor}, transparent)`,
      }} />

      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: '6px',
        fontFamily: 'var(--mono)', fontSize: '10px', letterSpacing: '0.12em',
        textTransform: 'uppercase', color: accentColor,
        marginBottom: '12px',
      }}>
        <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: accentColor, display: 'inline-block' }} />
        Kostenloses Angebot
      </div>

      <h3 style={{
        fontSize: '16px', fontWeight: 700, color: 'var(--text)',
        letterSpacing: '-0.02em', margin: '0 0 8px',
      }}>
        {headline}
      </h3>
      <p style={{
        fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.65,
        margin: '0 0 18px',
      }}>
        {subline}
      </p>

      <div style={{ display: 'flex', gap: '8px' }}>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && submit()}
          placeholder="deine@email.de"
          disabled={status === 'loading'}
          style={{
            flex: 1,
            padding: '11px 14px',
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: '9px',
            color: 'var(--text)',
            fontFamily: 'var(--mono)',
            fontSize: '13px',
            outline: 'none',
            minWidth: 0,
          }}
        />
        <button
          onClick={submit}
          disabled={status === 'loading'}
          style={{
            padding: '11px 18px',
            background: accentColor,
            border: 'none',
            borderRadius: '9px',
            color: '#060B18',
            fontWeight: 700,
            fontSize: '13px',
            cursor: status === 'loading' ? 'not-allowed' : 'pointer',
            fontFamily: 'var(--font)',
            whiteSpace: 'nowrap',
            flexShrink: 0,
            opacity: status === 'loading' ? 0.7 : 1,
            transition: 'opacity 0.2s',
          }}
        >
          {status === 'loading' ? '…' : 'Report erhalten →'}
        </button>
      </div>

      {errorMsg && (
        <div style={{
          marginTop: '10px',
          fontSize: '12px', color: '#FF2D6F',
          fontFamily: 'var(--mono)',
        }}>
          {errorMsg}
        </div>
      )}

      <div style={{
        marginTop: '12px',
        fontFamily: 'var(--mono)', fontSize: '10px', color: 'var(--text-muted)',
        display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap',
      }}>
        <span>Kostenlos</span>
        <span style={{ color: 'var(--border)' }}>·</span>
        <span>DSGVO-konform</span>
        <span style={{ color: 'var(--border)' }}>·</span>
        <span>Kein Spam</span>
        <span style={{ color: 'var(--border)' }}>·</span>
        <span>Jederzeit abmeldbar</span>
      </div>
    </div>
  );
}
