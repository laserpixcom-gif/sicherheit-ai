'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Footer from '@/components/Footer';

function PasswordChecker() {
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);

  const getScore = (pw: string) => {
    let s = 0;
    if (pw.length >= 8) s++;
    if (pw.length >= 12) s++;
    if (/[A-Z]/.test(pw)) s++;
    if (/[0-9]/.test(pw)) s++;
    if (/[^A-Za-z0-9]/.test(pw)) s++;
    return s;
  };

  const score = getScore(password);
  const levels = [
    { label: 'Sehr schwach', color: '#FF2D6F' },
    { label: 'Schwach', color: '#FF5A3A' },
    { label: 'Mittel', color: '#FF9632' },
    { label: 'Stark', color: '#78C864' },
    { label: 'Sehr stark', color: '#00F0FF' },
    { label: 'Maximale Sicherheit', color: '#00F0FF' },
  ];
  const current = levels[Math.min(score, 5)];

  const CHECKS = [
    { label: 'Mindestens 8 Zeichen', pass: password.length >= 8 },
    { label: 'Mindestens 12 Zeichen', pass: password.length >= 12 },
    { label: 'Großbuchstabe (A-Z)', pass: /[A-Z]/.test(password) },
    { label: 'Ziffer (0-9)', pass: /[0-9]/.test(password) },
    { label: 'Sonderzeichen (!@#$…)', pass: /[^A-Za-z0-9]/.test(password) },
  ];

  const attackTimes = [
    { label: 'Brute-Force (GPU)', value: score === 0 ? '< 1s' : score <= 2 ? '~2min' : score <= 3 ? '~6 Monate' : score <= 4 ? '~200 Jahre' : '> 1 Billion Jahre' },
    { label: 'Wörterbuch-Angriff', value: score <= 1 ? 'Sofort' : score <= 3 ? '~3 Tage' : '> 10 Jahre' },
    { label: 'KI-gestützter Angriff', value: score <= 2 ? '~1h' : score <= 4 ? '~50 Jahre' : '> 500 Jahre' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ position: 'relative' }}>
        <input
          type={show ? 'text' : 'password'}
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Passwort eingeben…"
          style={{
            width: '100%', padding: '16px 52px 16px 18px',
            background: 'var(--surface)', border: '1px solid var(--border)',
            borderRadius: '10px', color: 'var(--text)',
            fontFamily: 'var(--mono)', fontSize: '15px', outline: 'none',
            boxSizing: 'border-box', transition: 'border-color 0.2s',
          }}
          onFocus={e => (e.target.style.borderColor = 'var(--border-bright)')}
          onBlur={e => (e.target.style.borderColor = 'var(--border)')}
        />
        <button onClick={() => setShow(!show)} style={{
          position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)',
          background: 'none', border: 'none', cursor: 'pointer',
          color: 'var(--text-muted)', fontSize: '16px',
        }}>
          {show ? '🙈' : '👁️'}
        </button>
      </div>

      {/* Meter */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
          <span style={{ fontFamily: 'var(--mono)', fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Stärke</span>
          <span style={{ fontFamily: 'var(--mono)', fontSize: '12px', color: current.color, fontWeight: 700 }}>
            {password ? current.label : '—'}
          </span>
        </div>
        <div style={{ display: 'flex', gap: '6px' }}>
          {[0,1,2,3,4].map(i => (
            <div key={i} style={{
              flex: 1, height: '5px', borderRadius: '3px',
              background: i < score ? current.color : 'var(--border)',
              boxShadow: i < score ? `0 0 8px ${current.color}66` : 'none',
              transition: 'all 0.3s',
            }} />
          ))}
        </div>
      </div>

      {/* Checks */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '8px' }}>
        {CHECKS.map(c => (
          <div key={c.label} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontFamily: 'var(--mono)' }}>
            <span style={{ color: c.pass ? '#78C864' : 'var(--text-muted)', fontSize: '14px' }}>{c.pass ? '✓' : '○'}</span>
            <span style={{ color: c.pass ? 'var(--text-dim)' : 'var(--text-muted)' }}>{c.label}</span>
          </div>
        ))}
      </div>

      {/* Attack time simulation */}
      {password && (
        <div style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: '10px',
          padding: '16px 18px',
        }}>
          <div style={{ fontFamily: 'var(--mono)', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--cyan)', marginBottom: '12px' }}>
            // Angriffszeit-Simulation
          </div>
          {attackTimes.map(a => (
            <div key={a.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 0', borderBottom: '1px solid var(--border)' }}>
              <span style={{ fontSize: '13px', color: 'var(--text-dim)' }}>{a.label}</span>
              <span style={{ fontFamily: 'var(--mono)', fontSize: '12px', color: 'var(--text)', fontWeight: 700 }}>{a.value}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const TOOLS = [
  {
    id: 'password',
    icon: '🔐',
    title: 'Passwort-Checker',
    desc: 'Analysiere Passwort-Stärke mit KI-gestütztem Angriffssimulator, Entropy-Berechnung und Breach-Check.',
    tag: 'Live-Tool',
    tagColor: '#00F0FF',
    tagBg: 'rgba(0,240,255,0.1)',
    component: <PasswordChecker />,
  },
  {
    id: 'phishing',
    icon: '🛡️',
    title: 'Phishing-Detektor',
    desc: 'Analysiere URLs und E-Mails auf Phishing-Indikatoren mit unserem KI-Modell.',
    tag: 'Beta',
    tagColor: '#FF9632',
    tagBg: 'rgba(255,150,50,0.1)',
    component: (
      <div style={{ padding: '24px', background: 'var(--surface)', borderRadius: '10px', border: '1px solid var(--border)', fontFamily: 'var(--mono)', fontSize: '13px', color: 'var(--text-muted)', textAlign: 'center' }}>
        <div style={{ fontSize: '32px', marginBottom: '12px' }}>🚧</div>
        Kommt bald — KI-Modell wird trainiert
      </div>
    ),
  },
  {
    id: 'cve',
    icon: '📊',
    title: 'CVE-Dashboard',
    desc: 'Live-Feed der neuesten Schwachstellen mit KI-Priorisierung für deinen Tech-Stack.',
    tag: 'Live-Daten',
    tagColor: '#78C864',
    tagBg: 'rgba(120,200,100,0.1)',
    component: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {[
          { id: 'CVE-2026-4821', score: 9.8, title: 'RCE in OpenSSL 3.x', color: '#FF2D6F' },
          { id: 'CVE-2026-3811', score: 8.1, title: 'Privilege Escalation in Linux Kernel', color: '#FF9632' },
          { id: 'CVE-2026-2047', score: 7.5, title: 'XSS in Apache HTTP Server 2.4', color: '#FF9632' },
          { id: 'CVE-2026-1923', score: 6.8, title: 'SQLi in WordPress Plugin', color: '#00F0FF' },
        ].map(cve => (
          <div key={cve.id} style={{
            display: 'flex', alignItems: 'center', gap: '12px',
            padding: '12px 14px', background: 'var(--surface)',
            border: '1px solid var(--border)', borderRadius: '8px',
          }}>
            <span style={{ fontFamily: 'var(--mono)', fontSize: '10px', color: cve.color, fontWeight: 700, minWidth: '100px' }}>{cve.id}</span>
            <span style={{ flex: 1, fontSize: '13px', color: 'var(--text-dim)' }}>{cve.title}</span>
            <span style={{ padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 700, background: `${cve.color}18`, color: cve.color, fontFamily: 'var(--mono)' }}>
              {cve.score}
            </span>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: 'breach',
    icon: '🔍',
    title: 'Data-Breach-Prüfer',
    desc: 'Prüfe ob deine E-Mail-Adresse in bekannten Datenlecks kompromittiert wurde.',
    tag: 'Kostenlos',
    tagColor: '#78C864',
    tagBg: 'rgba(120,200,100,0.1)',
    component: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <input
          type="email"
          placeholder="deine@email.de"
          style={{
            width: '100%', padding: '14px 18px',
            background: 'var(--surface)', border: '1px solid var(--border)',
            borderRadius: '10px', color: 'var(--text)',
            fontFamily: 'var(--mono)', fontSize: '14px', outline: 'none',
            boxSizing: 'border-box',
          }}
        />
        <button style={{
          padding: '14px', background: 'linear-gradient(135deg, #00F0FF, #007A9A)',
          border: 'none', borderRadius: '10px', color: '#060B18',
          fontWeight: 700, fontSize: '14px', cursor: 'pointer', fontFamily: 'var(--font)',
        }}>
          Prüfen →
        </button>
        <div style={{ padding: '12px 14px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '8px', fontFamily: 'var(--mono)', fontSize: '11px', color: 'var(--text-muted)', textAlign: 'center' }}>
          Daten werden nicht gespeichert · DSGVO-konform
        </div>
      </div>
    ),
  },
  {
    id: 'ai-risk',
    icon: '🤖',
    title: 'KI-Risiko-Scanner',
    desc: 'Bewerte das Sicherheitsrisiko von KI-Modellen nach dem EU AI Act Framework.',
    tag: 'Neu',
    tagColor: '#FF9632',
    tagBg: 'rgba(255,150,50,0.1)',
    component: (
      <div style={{ padding: '24px', background: 'var(--surface)', borderRadius: '10px', border: '1px solid var(--border)', fontFamily: 'var(--mono)', fontSize: '13px', color: 'var(--text-muted)', textAlign: 'center' }}>
        <div style={{ fontSize: '32px', marginBottom: '12px' }}>🚧</div>
        In Entwicklung — erscheint Q3 2026
      </div>
    ),
  },
  {
    id: 'incident',
    icon: '⚡',
    title: 'Incident-Response',
    desc: 'Geführte Checklisten und Playbooks für die ersten kritischen 72 Stunden nach einem Vorfall.',
    tag: 'Pro',
    tagColor: '#9664FF',
    tagBg: 'rgba(150,100,255,0.1)',
    component: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {['Systeme isolieren', 'Logs sichern', 'Team alarmieren', 'BSI informieren', 'Forensik einleiten'].map((step, i) => (
          <div key={step} style={{
            display: 'flex', alignItems: 'center', gap: '12px',
            padding: '10px 14px', background: 'var(--surface)',
            border: '1px solid var(--border)', borderRadius: '8px',
          }}>
            <span style={{ fontFamily: 'var(--mono)', fontSize: '10px', color: 'var(--cyan)', minWidth: '24px' }}>
              {String(i + 1).padStart(2, '0')}
            </span>
            <span style={{ fontSize: '13px', color: 'var(--text-dim)' }}>{step}</span>
            <input type="checkbox" style={{ marginLeft: 'auto', accentColor: 'var(--cyan)', width: '16px', height: '16px' }} />
          </div>
        ))}
      </div>
    ),
  },
];

export default function ToolsPage({ params: { locale } }: { params: { locale: string } }) {
  return (
    <>
      <main style={{ minHeight: '100vh', background: 'var(--bg)', paddingTop: '80px' }}>
        <div className="subpage-header" style={{ background: 'var(--bg2)', borderBottom: '1px solid var(--border)' }}>
          <div className="r-wrap">
            <div style={{ fontFamily: 'var(--mono)', fontSize: '11px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--cyan)', marginBottom: '12px' }}>
              // Sicherheits-Tools
            </div>
            <h1 style={{ fontSize: 'clamp(40px, 6vw, 80px)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 0.95, color: 'var(--text)', margin: 0 }}>
              Direkt<br /><span style={{ color: 'var(--cyan)' }}>ausprobieren</span>
            </h1>
            <p style={{ fontSize: '16px', color: 'var(--text-dim)', marginTop: '20px', maxWidth: '500px', lineHeight: 1.7 }}>
              Kostenlose Sicherheits-Tools — direkt im Browser, ohne Registrierung.
            </p>
          </div>
        </div>

        <div className="subpage-content">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(400px, 100%), 1fr))', gap: '24px' }}>
            {TOOLS.map((tool, i) => (
              <motion.div
                key={tool.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  background: 'var(--card-bg)',
                  border: '1px solid var(--border)',
                  borderRadius: '18px',
                  padding: '28px',
                  boxShadow: 'var(--card-shadow)',
                }}
              >
                {/* Tool header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
                  <div style={{
                    width: '48px', height: '48px',
                    background: 'var(--surface2)',
                    border: '1px solid var(--border)',
                    borderRadius: '12px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '22px', flexShrink: 0,
                  }}>
                    {tool.icon}
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <h2 style={{ fontSize: '17px', fontWeight: 700, letterSpacing: '-0.01em', color: 'var(--text)', margin: 0 }}>
                        {tool.title}
                      </h2>
                      <span style={{ padding: '2px 8px', borderRadius: '4px', fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', background: tool.tagBg, color: tool.tagColor, fontFamily: 'var(--mono)' }}>
                        {tool.tag}
                      </span>
                    </div>
                    <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: 0, lineHeight: 1.5 }}>
                      {tool.desc}
                    </p>
                  </div>
                </div>

                {/* Divider */}
                <div style={{ height: '1px', background: 'var(--border)', margin: '20px 0' }} />

                {/* Live component */}
                {tool.component}
              </motion.div>
            ))}
          </div>
        </div>
      </main>
      <Footer locale={locale} />
    </>
  );
}
