'use client';

import { useState } from 'react';

const ZWECKE = [
  'Beratungsanfrage',
  'KI-Sicherheitscheck',
  'AI Act Compliance',
  'Incident Response',
  'Partnerschaften',
  'Presse & Medien',
  'Allgemeine Frage',
  'Sonstiges',
];

interface Props {
  accentColor?: string;
}

export default function KontaktFormular({ accentColor = 'var(--cyan)' }: Props) {
  const [form, setForm] = useState({ name: '', email: '', zweck: '', betreff: '', nachricht: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.nachricht) {
      setErrorMsg('Bitte Name, E-Mail und Nachricht ausfüllen.');
      return;
    }
    setStatus('loading');
    setErrorMsg('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus('success');
      } else {
        setErrorMsg(data.error ?? 'Fehler. Bitte erneut versuchen.');
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
        padding: '48px 32px', textAlign: 'center',
        background: 'rgba(120,200,100,0.05)',
        border: '1px solid rgba(120,200,100,0.2)',
        borderRadius: '16px',
      }}>
        <div style={{ fontSize: '40px', marginBottom: '16px' }}>✓</div>
        <div style={{ fontSize: '20px', fontWeight: 700, color: '#78C864', marginBottom: '10px' }}>
          Nachricht erhalten!
        </div>
        <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: 1.7, maxWidth: '400px', margin: '0 auto' }}>
          Ich melde mich in der Regel innerhalb von 24 Stunden bei dir, werktags meist noch am selben Tag.
        </p>
      </div>
    );
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '13px 16px',
    background: 'var(--surface)',
    border: '1px solid var(--border)',
    borderRadius: '10px',
    color: 'var(--text)',
    fontFamily: 'var(--mono)',
    fontSize: '14px',
    outline: 'none',
    boxSizing: 'border-box',
    transition: 'border-color 0.2s',
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontFamily: 'var(--mono)',
    fontSize: '11px',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    color: 'var(--text-muted)',
    marginBottom: '8px',
  };

  return (
    <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

      {/* Name + Email */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <div>
          <label style={labelStyle}>Name *</label>
          <input
            type="text"
            value={form.name}
            onChange={e => set('name', e.target.value)}
            placeholder="Max Mustermann"
            required
            style={inputStyle}
            className="contact-input"
          />
        </div>
        <div>
          <label style={labelStyle}>E-Mail *</label>
          <input
            type="email"
            value={form.email}
            onChange={e => set('email', e.target.value)}
            placeholder="max@firma.de"
            required
            style={inputStyle}
            className="contact-input"
          />
        </div>
      </div>

      {/* Zweck */}
      <div>
        <label style={labelStyle}>Anlass</label>
        <select
          value={form.zweck}
          onChange={e => set('zweck', e.target.value)}
          style={{ ...inputStyle, cursor: 'pointer', appearance: 'none', backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23888' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 14px center' }}
          className="contact-input"
        >
          <option value="">Bitte wählen…</option>
          {ZWECKE.map(z => <option key={z} value={z}>{z}</option>)}
        </select>
      </div>

      {/* Betreff */}
      <div>
        <label style={labelStyle}>Betreff</label>
        <input
          type="text"
          value={form.betreff}
          onChange={e => set('betreff', e.target.value)}
          placeholder="Worum geht es?"
          style={inputStyle}
          className="contact-input"
        />
      </div>

      {/* Nachricht */}
      <div>
        <label style={labelStyle}>Nachricht *</label>
        <textarea
          value={form.nachricht}
          onChange={e => set('nachricht', e.target.value)}
          placeholder="Beschreibe dein Anliegen…"
          required
          rows={6}
          style={{ ...inputStyle, resize: 'vertical', minHeight: '140px', lineHeight: 1.65 }}
          className="contact-input"
        />
        <div style={{ marginTop: '6px', fontFamily: 'var(--mono)', fontSize: '10px', color: 'var(--text-muted)', textAlign: 'right' }}>
          {form.nachricht.length}/5000
        </div>
      </div>

      {/* Error */}
      {errorMsg && (
        <div style={{
          padding: '12px 16px',
          background: 'rgba(255,45,111,0.08)',
          border: '1px solid rgba(255,45,111,0.2)',
          borderRadius: '8px',
          fontSize: '13px',
          color: '#FF2D6F',
          fontFamily: 'var(--mono)',
        }}>
          {errorMsg}
        </div>
      )}

      {/* Submit */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
        <button
          type="submit"
          disabled={status === 'loading'}
          style={{
            padding: '14px 32px',
            background: status === 'loading' ? 'var(--surface2)' : `linear-gradient(135deg, ${accentColor} 0%, #007A9A 100%)`,
            border: 'none',
            borderRadius: '10px',
            color: '#060B18',
            fontWeight: 700,
            fontSize: '14px',
            cursor: status === 'loading' ? 'not-allowed' : 'pointer',
            fontFamily: 'var(--font)',
            transition: 'opacity 0.2s',
            opacity: status === 'loading' ? 0.7 : 1,
          }}
        >
          {status === 'loading' ? 'Wird gesendet…' : 'Nachricht senden →'}
        </button>
        <span style={{ fontFamily: 'var(--mono)', fontSize: '11px', color: 'var(--text-muted)' }}>
          DSGVO-konform · Kein Spam · Antwort in &lt;24h
        </span>
      </div>
    </form>
  );
}
