'use client';

import { useState, useEffect, useCallback } from 'react';

// ─── Passwort-Checker ────────────────────────────────────────────────────────

function calcEntropy(pw: string): number {
  const charsets = [
    /[a-z]/.test(pw) ? 26 : 0,
    /[A-Z]/.test(pw) ? 26 : 0,
    /[0-9]/.test(pw) ? 10 : 0,
    /[^a-zA-Z0-9]/.test(pw) ? 32 : 0,
  ];
  const pool = charsets.reduce((a, b) => a + b, 0);
  return pool > 0 ? Math.round(pw.length * Math.log2(pool)) : 0;
}

function crackTime(entropy: number): string {
  const seconds = Math.pow(2, entropy) / 1e12;
  if (seconds < 1) return 'sofort';
  if (seconds < 60) return `${Math.round(seconds)} Sekunden`;
  if (seconds < 3600) return `${Math.round(seconds / 60)} Minuten`;
  if (seconds < 86400) return `${Math.round(seconds / 3600)} Stunden`;
  if (seconds < 31536000) return `${Math.round(seconds / 86400)} Tage`;
  if (seconds < 31536000 * 1000) return `${Math.round(seconds / 31536000)} Jahre`;
  if (seconds < 31536000 * 1e6) return `${(seconds / 31536000 / 1000).toFixed(0)}k Jahre`;
  return '> 1 Million Jahre';
}

export function PasswordChecker() {
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);

  const checks = [
    { label: '≥ 8 Zeichen', pass: password.length >= 8 },
    { label: '≥ 16 Zeichen', pass: password.length >= 16 },
    { label: 'Großbuchstabe', pass: /[A-Z]/.test(password) },
    { label: 'Ziffer', pass: /[0-9]/.test(password) },
    { label: 'Sonderzeichen', pass: /[^a-zA-Z0-9]/.test(password) },
    { label: 'Kein Wörterbuchword', pass: password.length > 5 && !/^(password|passwort|qwerty|123456|admin|letmein)/i.test(password) },
  ];

  const score = checks.filter(c => c.pass).length;
  const entropy = calcEntropy(password);
  const levels = [
    { label: 'Extrem schwach', color: '#FF2D6F' },
    { label: 'Sehr schwach', color: '#FF4A1A' },
    { label: 'Schwach', color: '#FF9632' },
    { label: 'Mittel', color: '#FFCC00' },
    { label: 'Stark', color: '#78C864' },
    { label: 'Sehr stark', color: '#00F0FF' },
    { label: 'Maximale Sicherheit', color: '#00F0FF' },
  ];
  const level = levels[Math.min(score, 6)];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ position: 'relative' }}>
        <input
          type={show ? 'text' : 'password'}
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Passwort eingeben…"
          autoComplete="off"
          style={{ width: '100%', padding: '14px 48px 14px 16px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '10px', color: 'var(--text)', fontFamily: 'var(--mono)', fontSize: '15px', outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.2s' }}
          onFocus={e => (e.target.style.borderColor = 'var(--border-bright)')}
          onBlur={e => (e.target.style.borderColor = 'var(--border)')}
        />
        <button onClick={() => setShow(!show)} style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', fontSize: '15px' }}>
          {show ? '●' : '○'}
        </button>
      </div>

      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span style={{ fontFamily: 'var(--mono)', fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Stärke</span>
          <span style={{ fontFamily: 'var(--mono)', fontSize: '11px', color: level.color, fontWeight: 700 }}>{password ? level.label : '—'}</span>
        </div>
        <div style={{ display: 'flex', gap: '4px' }}>
          {[0,1,2,3,4,5].map(i => (
            <div key={i} style={{ flex: 1, height: '4px', borderRadius: '2px', background: i < score ? level.color : 'var(--border)', transition: 'all 0.3s', boxShadow: i < score ? `0 0 6px ${level.color}66` : 'none' }} />
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
        {checks.map(c => (
          <div key={c.label} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', fontFamily: 'var(--mono)' }}>
            <span style={{ color: c.pass ? '#78C864' : 'var(--border)', fontSize: '14px', fontWeight: 700 }}>{c.pass ? '✓' : '○'}</span>
            <span style={{ color: c.pass ? 'var(--text-dim)' : 'var(--text-muted)' }}>{c.label}</span>
          </div>
        ))}
      </div>

      {password && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '8px', padding: '12px 14px' }}>
            <div style={{ fontFamily: 'var(--mono)', fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '6px' }}>Entropie</div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: '18px', fontWeight: 800, color: level.color }}>{entropy} Bit</div>
          </div>
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '8px', padding: '12px 14px' }}>
            <div style={{ fontFamily: 'var(--mono)', fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '6px' }}>Crackzeit (GPU)</div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: '14px', fontWeight: 800, color: level.color, lineHeight: 1.2 }}>{crackTime(entropy)}</div>
          </div>
        </div>
      )}

      <div style={{ fontFamily: 'var(--mono)', fontSize: '10px', color: 'var(--text-muted)', lineHeight: 1.6 }}>
        Berechnung lokal im Browser. Kein Passwort wird übertragen. Entropie-Basis: NIST SP 800-63B.
      </div>
    </div>
  );
}

// ─── Have I Been Pwned Checker ────────────────────────────────────────────────

async function sha1(text: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest('SHA-1', data);
  return Array.from(new Uint8Array(hashBuffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('')
    .toUpperCase();
}

export function BreachChecker() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<null | { breached: boolean; count?: number; breaches?: string[] }>(null);
  const [pwResult, setPwResult] = useState<null | { count: number }>(null);
  const [mode, setMode] = useState<'email' | 'password'>('email');
  const [error, setError] = useState('');

  const checkEmail = async () => {
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Bitte gültige E-Mail eingeben.');
      return;
    }
    setLoading(true); setError(''); setResult(null);
    try {
      const res = await fetch(`/api/hibp?email=${encodeURIComponent(email)}`);
      const data = await res.json();
      if (data.error) {
        if (data.needsKey) {
          setError('HIBP E-Mail-Check erfordert einen API-Key. Nutze die Passwort-Prüfung (keine Registrierung nötig).');
        } else {
          setError(data.error);
        }
      } else {
        const breaches: { name: string }[] = data.breaches ?? [];
        setResult({ breached: breaches.length > 0, count: breaches.length, breaches: breaches.map((b) => b.name) });
      }
    } catch {
      setError('Fehler bei der Abfrage. Bitte erneut versuchen.');
    }
    setLoading(false);
  };

  const checkPassword = async () => {
    if (!password) return;
    setLoading(true); setError(''); setPwResult(null);
    try {
      const hash = await sha1(password);
      const prefix = hash.slice(0, 5);
      const suffix = hash.slice(5);
      const res = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`);
      const text = await res.text();
      const lines = text.split('\n');
      const match = lines.find(l => l.toUpperCase().startsWith(suffix));
      const count = match ? parseInt(match.split(':')[1].trim()) : 0;
      setPwResult({ count });
    } catch {
      setError('Fehler bei der Passwort-Prüfung.');
    }
    setLoading(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', gap: '6px' }}>
        {(['email', 'password'] as const).map(m => (
          <button key={m} onClick={() => { setMode(m); setResult(null); setPwResult(null); setError(''); }}
            style={{ flex: 1, padding: '8px', borderRadius: '8px', border: '1px solid', borderColor: mode === m ? 'var(--cyan)' : 'var(--border)', background: mode === m ? 'var(--cyan-dim)' : 'transparent', color: mode === m ? 'var(--cyan)' : 'var(--text-muted)', cursor: 'pointer', fontFamily: 'var(--mono)', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            {m === 'email' ? 'E-Mail prüfen' : 'Passwort prüfen'}
          </button>
        ))}
      </div>

      {mode === 'email' ? (
        <>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="deine@email.de"
            onKeyDown={e => e.key === 'Enter' && checkEmail()}
            style={{ width: '100%', padding: '13px 16px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '10px', color: 'var(--text)', fontFamily: 'var(--mono)', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }} />
          <button onClick={checkEmail} disabled={loading}
            style={{ padding: '13px', background: loading ? 'var(--surface2)' : 'var(--cyan)', border: 'none', borderRadius: '10px', color: '#060B18', fontWeight: 700, fontSize: '14px', cursor: loading ? 'not-allowed' : 'pointer', fontFamily: 'var(--font)', transition: 'background 0.2s' }}>
            {loading ? 'Prüfe…' : 'E-Mail prüfen →'}
          </button>
        </>
      ) : (
        <>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Passwort eingeben (lokal gehasht)"
            onKeyDown={e => e.key === 'Enter' && checkPassword()}
            style={{ width: '100%', padding: '13px 16px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '10px', color: 'var(--text)', fontFamily: 'var(--mono)', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }} />
          <button onClick={checkPassword} disabled={loading}
            style={{ padding: '13px', background: loading ? 'var(--surface2)' : 'var(--cyan)', border: 'none', borderRadius: '10px', color: '#060B18', fontWeight: 700, fontSize: '14px', cursor: loading ? 'not-allowed' : 'pointer', fontFamily: 'var(--font)', transition: 'background 0.2s' }}>
            {loading ? 'Prüfe…' : 'Passwort prüfen →'}
          </button>
        </>
      )}

      {error && <div style={{ padding: '10px 14px', background: 'rgba(255,45,111,0.08)', border: '1px solid rgba(255,45,111,0.2)', borderRadius: '8px', fontSize: '13px', color: '#FF2D6F', fontFamily: 'var(--mono)' }}>{error}</div>}

      {result && (
        <div style={{ padding: '16px', background: result.breached ? 'rgba(255,45,111,0.08)' : 'rgba(120,200,100,0.08)', border: `1px solid ${result.breached ? 'rgba(255,45,111,0.25)' : 'rgba(120,200,100,0.25)'}`, borderRadius: '10px' }}>
          <div style={{ fontWeight: 700, color: result.breached ? '#FF2D6F' : '#78C864', marginBottom: '8px', fontSize: '15px' }}>
            {result.breached ? '⚠ In Datenpannen gefunden' : '✓ Nicht gefunden'}
          </div>
          {result.breached && result.count !== undefined && (
            <div style={{ fontFamily: 'var(--mono)', fontSize: '12px', color: 'var(--text-dim)' }}>In {result.count} Datenpanne{result.count !== 1 ? 'n' : ''} aufgetaucht.</div>
          )}
          {!result.breached && <div style={{ fontFamily: 'var(--mono)', fontSize: '12px', color: 'var(--text-dim)' }}>Diese E-Mail wurde in keiner bekannten Datenpanne gefunden.</div>}
        </div>
      )}

      {pwResult && (
        <div style={{ padding: '16px', background: pwResult.count > 0 ? 'rgba(255,45,111,0.08)' : 'rgba(120,200,100,0.08)', border: `1px solid ${pwResult.count > 0 ? 'rgba(255,45,111,0.25)' : 'rgba(120,200,100,0.25)'}`, borderRadius: '10px' }}>
          <div style={{ fontWeight: 700, color: pwResult.count > 0 ? '#FF2D6F' : '#78C864', marginBottom: '8px', fontSize: '15px' }}>
            {pwResult.count > 0 ? `⚠ ${pwResult.count.toLocaleString('de')}× in Datenpannen` : '✓ Nicht in bekannten Datenpannen'}
          </div>
          <div style={{ fontFamily: 'var(--mono)', fontSize: '12px', color: 'var(--text-dim)' }}>
            {pwResult.count > 0 ? 'Dieses Passwort sofort ersetzen! Nur der SHA1-Hashpräfix (5 Zeichen) wurde gesendet — k-Anonymity-Methode (NIST SP 800-63B).' : 'Passwort nicht in Have I Been Pwned gefunden. Datensatz: 13+ Milliarden kompromittierte Passwörter.'}
          </div>
        </div>
      )}

      <div style={{ fontFamily: 'var(--mono)', fontSize: '10px', color: 'var(--text-muted)', lineHeight: 1.6 }}>
        Powered by Have I Been Pwned (haveibeenpwned.com) · DSGVO-konform · Keine Daten werden gespeichert
      </div>
    </div>
  );
}

// ─── Live CVE Dashboard ───────────────────────────────────────────────────────

interface CveItem {
  id: string;
  score: number | null;
  severity: string;
  description: string;
  published: string;
  refs: string[];
}

export function CveDashboard() {
  const [cves, setCves] = useState<CveItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchedAt, setFetchedAt] = useState('');
  const [fallback, setFallback] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);

  const fetchCves = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/cves');
      const data = await res.json();
      setCves(data.cves ?? []);
      setFetchedAt(data.fetchedAt ?? '');
      setFallback(data.fallback ?? false);
    } catch {
      setCves([]);
    }
    setLoading(false);
  }, []);

  useEffect(() => { fetchCves(); }, [fetchCves]);

  const scoreColor = (score: number | null) => {
    if (!score) return 'var(--text-muted)';
    if (score >= 9) return '#FF2D6F';
    if (score >= 7) return '#FF9632';
    if (score >= 4) return '#FFCC00';
    return '#78C864';
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: loading ? 'var(--text-muted)' : '#78C864', boxShadow: loading ? 'none' : '0 0 8px #78C864', animation: loading ? 'none' : 'pulse-dot 2s infinite' }} />
          <span style={{ fontFamily: 'var(--mono)', fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            {loading ? 'Lädt…' : fallback ? 'Bekannte CVEs' : 'Live — NVD API'}
          </span>
        </div>
        {fetchedAt && (
          <button onClick={fetchCves} style={{ fontFamily: 'var(--mono)', fontSize: '10px', color: 'var(--cyan)', background: 'none', border: 'none', cursor: 'pointer' }}>
            ↻ Aktualisieren
          </button>
        )}
      </div>

      {loading ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {[1,2,3,4,5].map(i => (
            <div key={i} style={{ height: '52px', background: 'var(--surface)', borderRadius: '8px', animation: 'pulse-dot 1.5s infinite', opacity: 0.5 + i * 0.05 }} />
          ))}
        </div>
      ) : cves.length === 0 ? (
        <div style={{ padding: '20px', textAlign: 'center', fontFamily: 'var(--mono)', fontSize: '12px', color: 'var(--text-muted)' }}>
          Keine Daten verfügbar
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {cves.map(cve => (
            <div key={cve.id} style={{ border: '1px solid var(--border)', borderRadius: '8px', overflow: 'hidden', transition: 'border-color 0.2s', borderColor: expanded === cve.id ? 'var(--border-bright)' : 'var(--border)' }}>
              <button onClick={() => setExpanded(expanded === cve.id ? null : cve.id)}
                style={{ display: 'flex', alignItems: 'center', gap: '10px', width: '100%', padding: '11px 13px', background: 'var(--surface)', border: 'none', cursor: 'pointer', textAlign: 'left' }}>
                <span style={{ fontFamily: 'var(--mono)', fontSize: '11px', color: scoreColor(cve.score), fontWeight: 800, flexShrink: 0, minWidth: '110px' }}>{cve.id}</span>
                <span style={{ flex: 1, fontSize: '12px', color: 'var(--text-dim)', lineHeight: 1.3, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical' as const }}>{cve.description}</span>
                <span style={{ fontFamily: 'var(--mono)', fontSize: '12px', fontWeight: 800, color: scoreColor(cve.score), flexShrink: 0, padding: '2px 7px', background: `${scoreColor(cve.score)}15`, borderRadius: '4px' }}>
                  {cve.score ?? '?'}
                </span>
              </button>
              {expanded === cve.id && (
                <div style={{ padding: '12px 13px', borderTop: '1px solid var(--border)', background: 'var(--card-bg)' }}>
                  <p style={{ fontSize: '12px', color: 'var(--text-dim)', lineHeight: 1.7, marginBottom: '10px' }}>{cve.description}</p>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {cve.refs?.map(ref => (
                      <a key={ref} href={ref} target="_blank" rel="noopener noreferrer"
                        style={{ fontFamily: 'var(--mono)', fontSize: '10px', color: 'var(--cyan)', textDecoration: 'none', padding: '3px 8px', border: '1px solid var(--border-bright)', borderRadius: '4px' }}>
                        → NVD Details
                      </a>
                    ))}
                  </div>
                  {cve.published && (
                    <div style={{ marginTop: '8px', fontFamily: 'var(--mono)', fontSize: '10px', color: 'var(--text-muted)' }}>
                      Veröffentlicht: {new Date(cve.published).toLocaleDateString('de-DE')}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <div style={{ fontFamily: 'var(--mono)', fontSize: '10px', color: 'var(--text-muted)', lineHeight: 1.6 }}>
        Quelle: NIST NVD (nvd.nist.gov) · Kritische CVEs (CVSS ≥ 9) · 30-Tage-Fenster · Cache 30 min
      </div>
    </div>
  );
}

// ─── HTTP Security Headers Checker ───────────────────────────────────────────

const SECURITY_HEADERS = [
  { name: 'Strict-Transport-Security', short: 'HSTS', desc: 'Erzwingt HTTPS-Verbindungen', importance: 'critical' },
  { name: 'Content-Security-Policy', short: 'CSP', desc: 'Verhindert XSS und Injection-Angriffe', importance: 'critical' },
  { name: 'X-Frame-Options', short: 'X-Frame', desc: 'Verhindert Clickjacking', importance: 'high' },
  { name: 'X-Content-Type-Options', short: 'XCTO', desc: 'Verhindert MIME-Sniffing', importance: 'medium' },
  { name: 'Referrer-Policy', short: 'Referrer', desc: 'Kontrolliert Referrer-Informationen', importance: 'medium' },
  { name: 'Permissions-Policy', short: 'Permissions', desc: 'Kontrolliert Browser-Features', importance: 'medium' },
];

export function HeaderChecker() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<null | { url: string; headers: Record<string, string | null>; score: number }>(null);
  const [error, setError] = useState('');

  const check = async () => {
    let target = url.trim();
    if (!target) return;
    if (!target.startsWith('http')) target = 'https://' + target;
    setLoading(true); setError(''); setResults(null);
    try {
      const res = await fetch(`/api/header-check?url=${encodeURIComponent(target)}`);
      if (!res.ok) throw new Error('Fehler');
      const data = await res.json();
      setResults(data);
    } catch {
      setError('Domain nicht erreichbar oder Fehler bei der Prüfung.');
    }
    setLoading(false);
  };

  const scoreColor = (score: number) => score >= 80 ? '#78C864' : score >= 50 ? '#FF9632' : '#FF2D6F';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', gap: '8px' }}>
        <input value={url} onChange={e => setUrl(e.target.value)} placeholder="example.de" onKeyDown={e => e.key === 'Enter' && check()}
          style={{ flex: 1, padding: '13px 14px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '10px', color: 'var(--text)', fontFamily: 'var(--mono)', fontSize: '14px', outline: 'none' }} />
        <button onClick={check} disabled={loading}
          style={{ padding: '13px 18px', background: 'var(--cyan)', border: 'none', borderRadius: '10px', color: '#060B18', fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer', fontFamily: 'var(--font)', fontSize: '14px', flexShrink: 0 }}>
          {loading ? '…' : 'Prüfen'}
        </button>
      </div>

      {error && <div style={{ padding: '10px 14px', background: 'rgba(255,45,111,0.08)', border: '1px solid rgba(255,45,111,0.2)', borderRadius: '8px', fontSize: '12px', color: '#FF2D6F', fontFamily: 'var(--mono)' }}>{error}</div>}

      {results && (
        <>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '14px 16px', background: 'var(--surface)', borderRadius: '10px', border: '1px solid var(--border)' }}>
            <div style={{ fontFamily: 'var(--mono)', fontSize: '28px', fontWeight: 800, color: scoreColor(results.score) }}>{results.score}</div>
            <div>
              <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text)' }}>Security Score</div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: '11px', color: 'var(--text-muted)' }}>{results.url}</div>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {SECURITY_HEADERS.map(h => {
              const val = results.headers[h.name.toLowerCase()];
              const present = val !== null && val !== undefined;
              return (
                <div key={h.name} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '8px' }}>
                  <span style={{ color: present ? '#78C864' : h.importance === 'critical' ? '#FF2D6F' : '#FF9632', fontWeight: 700, fontSize: '14px', flexShrink: 0 }}>{present ? '✓' : '✗'}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: 'var(--mono)', fontSize: '11px', fontWeight: 700, color: 'var(--text)' }}>{h.short}</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{h.desc}</div>
                  </div>
                  {present && <span style={{ fontFamily: 'var(--mono)', fontSize: '9px', color: 'var(--text-muted)', maxWidth: '100px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{val?.slice(0, 30)}…</span>}
                  <span style={{ fontFamily: 'var(--mono)', fontSize: '9px', padding: '2px 6px', borderRadius: '3px', background: h.importance === 'critical' ? 'rgba(255,45,111,0.1)' : h.importance === 'high' ? 'rgba(255,150,50,0.1)' : 'rgba(0,240,255,0.08)', color: h.importance === 'critical' ? '#FF2D6F' : h.importance === 'high' ? '#FF9632' : 'var(--cyan)', textTransform: 'uppercase', letterSpacing: '0.05em', flexShrink: 0 }}>
                    {h.importance}
                  </span>
                </div>
              );
            })}
          </div>
        </>
      )}

      <div style={{ fontFamily: 'var(--mono)', fontSize: '10px', color: 'var(--text-muted)', lineHeight: 1.6 }}>
        Prüft HTTP-Sicherheits-Header der Zieldomain. Basiert auf OWASP Secure Headers Project.
      </div>
    </div>
  );
}

// ─── Incident Response Checkliste ────────────────────────────────────────────

const PHASES = [
  {
    phase: '01 — Erkennung & Alarmierung',
    color: '#FF2D6F',
    steps: [
      { text: 'Anomalie oder Vorfall bestätigen — kein Fehlalarm?', ref: '' },
      { text: 'Incident-Response-Team sofort alarmieren', ref: '' },
      { text: 'Erste Dokumentation: Was, wann, wie entdeckt?', ref: '' },
      { text: 'Kritikalitätsstufe einschätzen (P1–P4)', ref: '' },
    ],
  },
  {
    phase: '02 — Eindämmung',
    color: '#FF9632',
    steps: [
      { text: 'Betroffene Systeme VOM NETZ isolieren (nicht ausschalten!)', ref: 'BSI' },
      { text: 'Netzwerk-Segmente absperren — laterale Ausbreitung verhindern', ref: '' },
      { text: 'Kompromittierte Accounts sperren / Passwörter zurücksetzen', ref: '' },
      { text: 'Externen Angriff noch aktiv? VPN/Firewall-Regeln prüfen', ref: '' },
    ],
  },
  {
    phase: '03 — Forensik & Analyse',
    color: '#FFCC00',
    steps: [
      { text: 'RAM-Dump und Disk-Image der betroffenen Systeme erstellen', ref: '' },
      { text: 'Logs sichern: SIEM, Firewall, EDR, Active Directory', ref: '' },
      { text: 'Initialen Angriffsvektor (Initial Access) identifizieren', ref: 'MITRE' },
      { text: 'Zeitlinie des Angriffs rekonstruieren (Kill Chain)', ref: '' },
    ],
  },
  {
    phase: '04 — Meldepflichten',
    color: '#7890FF',
    steps: [
      { text: 'BSI informieren (Pflicht für KRITIS, empfohlen für alle)', ref: 'BSI' },
      { text: 'DSGVO: Datenschutzbehörde within 72h (wenn personenb. Daten)', ref: 'DSGVO' },
      { text: 'Staatsanwaltschaft / LKA-Cybercrime bei Ransomware/Diebstahl', ref: '' },
      { text: 'Versicherung informieren (Cyberpolice falls vorhanden)', ref: '' },
    ],
  },
  {
    phase: '05 — Wiederherstellung',
    color: '#78C864',
    steps: [
      { text: 'Sauberes Backup identifizieren — Integrität prüfen', ref: '' },
      { text: 'Systeme nur aus verifizierten Backups wiederherstellen', ref: '' },
      { text: 'Einfallstor schließen bevor Systeme wieder online gehen', ref: '' },
      { text: 'Monitoring erhöhen — Wiederinfektion erkennen', ref: '' },
    ],
  },
];

export function IncidentResponse() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const toggle = (key: string) => setChecked(prev => ({ ...prev, [key]: !prev[key] }));
  const total = PHASES.flatMap(p => p.steps).length;
  const done = Object.values(checked).filter(Boolean).length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span style={{ fontFamily: 'var(--mono)', fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Fortschritt</span>
          <span style={{ fontFamily: 'var(--mono)', fontSize: '11px', color: 'var(--cyan)', fontWeight: 700 }}>{done}/{total}</span>
        </div>
        <div style={{ height: '4px', background: 'var(--border)', borderRadius: '2px', overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${(done / total) * 100}%`, background: 'linear-gradient(90deg, var(--cyan), var(--magenta))', transition: 'width 0.4s', borderRadius: '2px' }} />
        </div>
      </div>

      {PHASES.map((phase) => (
        <div key={phase.phase}>
          <div style={{ fontFamily: 'var(--mono)', fontSize: '11px', fontWeight: 700, color: phase.color, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '8px' }}>{phase.phase}</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {phase.steps.map((step, si) => {
              const key = `${phase.phase}-${si}`;
              return (
                <div key={key} onClick={() => toggle(key)}
                  style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '9px 12px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '7px', cursor: 'pointer', transition: 'border-color 0.2s', borderColor: checked[key] ? phase.color + '44' : 'var(--border)' }}>
                  <div style={{ width: '16px', height: '16px', borderRadius: '4px', border: `1.5px solid ${checked[key] ? phase.color : 'var(--border)'}`, background: checked[key] ? phase.color + '20' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all 0.2s' }}>
                    {checked[key] && <span style={{ fontSize: '10px', color: phase.color, fontWeight: 800 }}>✓</span>}
                  </div>
                  <span style={{ fontSize: '12px', color: checked[key] ? 'var(--text-muted)' : 'var(--text-dim)', flex: 1, textDecoration: checked[key] ? 'line-through' : 'none', lineHeight: 1.4 }}>{step.text}</span>
                  {step.ref && <span style={{ fontFamily: 'var(--mono)', fontSize: '9px', color: 'var(--text-muted)', padding: '1px 5px', border: '1px solid var(--border)', borderRadius: '3px', flexShrink: 0 }}>{step.ref}</span>}
                </div>
              );
            })}
          </div>
        </div>
      ))}

      <div style={{ fontFamily: 'var(--mono)', fontSize: '10px', color: 'var(--text-muted)', lineHeight: 1.6 }}>
        Basierend auf: BSI IT-Grundschutz, NIST SP 800-61, SANS Incident Handler's Handbook
      </div>
    </div>
  );
}
