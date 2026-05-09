'use client';

import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useTheme } from '@/contexts/ThemeContext';

const LOGS = [
  { time: '09:41:33', level: 'WARN', msg: 'Brute-force attempt detected · IP: 185.234.219.42 · Target: SSH port 22' },
  { time: '09:41:35', level: 'INFO', msg: 'Threat DB updated · 127 new IOCs loaded · Source: MISP' },
  { time: '09:41:38', level: 'CRIT', msg: 'CRITICAL: CVE-2026-4821 exploit attempt blocked · Origin: RU/AS' },
  { time: '09:41:41', level: 'OK', msg: 'Firewall rule updated · Blocked 185.234.0.0/16 · Auto-response active' },
  { time: '09:41:44', level: 'WARN', msg: 'Anomaly: 3.4GB unusual outbound traffic · Process: svchost.exe' },
  { time: '09:41:47', level: 'INFO', msg: 'Phishing domain flagged · mail-security-de.net · Confidence: 98.7%' },
  { time: '09:41:50', level: 'CRIT', msg: 'Ransomware signature match · File: invoice_2026.exe · Quarantined' },
  { time: '09:41:53', level: 'OK', msg: 'KI-Modell retrained · New dataset: 12.4M samples · Accuracy: 99.2%' },
  { time: '09:41:56', level: 'WARN', msg: 'DDoS attempt · 48.000 req/sec · Mitigation active · BW: 12Gbps' },
  { time: '09:41:59', level: 'INFO', msg: 'SIEM alert: Lateral movement detected · User: admin@example.de' },
  { time: '09:42:02', level: 'OK', msg: 'Patch deployed · CVE-2026-3811 · 847 endpoints updated · 0 failures' },
  { time: '09:42:05', level: 'CRIT', msg: 'Zero-day exploit in wild · Chrome V8 · Vendor notified · Tracking' },
];

const LEVEL_COLORS: Record<string, string> = {
  WARN: '#FF9632',
  CRIT: 'var(--magenta)',
  INFO: 'var(--cyan)',
  OK: '#78C864',
};

export default function TerminalSection({ locale }: { locale: string }) {
  const t = useTranslations('terminal');
  const { theme } = useTheme();
  const termRef = useRef<HTMLDivElement>(null);
  const logIdxRef = useRef(0);

  useEffect(() => {
    const termBody = termRef.current;
    if (!termBody) return;

    const addLine = () => {
      const log = LOGS[logIdxRef.current % LOGS.length];
      logIdxRef.current++;
      const line = document.createElement('div');
      line.className = 't-line';
      line.innerHTML = `
        <span style="color: var(--text-muted); flex-shrink: 0; font-family: var(--mono); font-size: 12px;">${log.time}</span>
        <span style="color: ${LEVEL_COLORS[log.level]}; font-family: var(--mono); font-size: 12px;">[${log.level}]</span>
        <span style="color: var(--text-dim); font-family: var(--mono); font-size: 12px;">${log.msg}</span>
      `;
      termBody.appendChild(line);
      if (termBody.children.length > 14) termBody.removeChild(termBody.firstChild!);
      termBody.scrollTop = termBody.scrollHeight;
    };

    for (let i = 0; i < 8; i++) setTimeout(addLine, i * 100);
    const interval = setInterval(addLine, 1800);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="sec-lg" style={{ position: 'relative' }}>
      <div className="r-wrap">
        <div className="g-2c">
          <div className="animate-in">
            <div style={{ fontFamily: 'var(--mono)', fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--cyan)', marginBottom: '10px' }}>
              {t('label')}
            </div>
            <h2 style={{ fontSize: 'clamp(32px, 3.5vw, 52px)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.05, marginBottom: '20px' }}>
              {t('title1')}<br />{t('title2')}<em style={{ fontStyle: 'normal', color: 'var(--cyan)' }}>{t('title3')}</em>
            </h2>
            <p style={{ fontSize: '16px', color: 'var(--text-dim)', lineHeight: 1.7, marginBottom: '36px' }}>
              {t('desc')}
            </p>
            <Link href={`/${locale}/tools`} style={{
              background: 'linear-gradient(135deg, var(--cyan) 0%, #007A9A 100%)',
              color: theme === 'dark' ? '#060B18' : '#fff',
              border: 'none',
              padding: '12px 28px',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: 700,
              cursor: 'pointer',
              fontFamily: 'var(--font)',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
            }}>
              {t('exploreTools')}
            </Link>
          </div>

          <div className="animate-in animate-delay-1">
            <div style={{
              background: theme === 'dark' ? '#0A0F1E' : '#F0F4FC',
              border: '1px solid var(--border)',
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: theme === 'dark'
                ? '0 32px 80px rgba(0,0,0,0.5), 0 0 40px rgba(0,240,255,0.05)'
                : '0 8px 40px rgba(0,0,0,0.12)',
            }}>
              {/* Title bar */}
              <div style={{
                background: theme === 'dark' ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)',
                borderBottom: '1px solid var(--border)',
                padding: '12px 16px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#FF5F57' }} />
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#FEBC2E' }} />
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#28C840' }} />
                <span style={{ marginLeft: 'auto', marginRight: 'auto', fontFamily: 'var(--mono)', fontSize: '12px', color: 'var(--text-muted)' }}>
                  sicherheit.ai — threat-monitor v2.4.1
                </span>
                <span style={{
                  fontFamily: 'var(--mono)', fontSize: '9px', fontWeight: 700,
                  color: '#FF9632', background: 'rgba(255,150,50,0.12)',
                  border: '1px solid rgba(255,150,50,0.3)',
                  padding: '2px 6px', borderRadius: '4px', letterSpacing: '0.06em',
                  textTransform: 'uppercase', flexShrink: 0,
                }}>
                  Demo
                </span>
              </div>
              {/* Body */}
              <div
                ref={termRef}
                style={{
                  padding: '20px',
                  height: '320px',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
