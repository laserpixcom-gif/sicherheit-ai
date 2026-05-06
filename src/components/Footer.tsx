'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function Footer({ locale }: { locale: string }) {
  const t = useTranslations('footer');

  return (
    <footer className="footer-grid-bg" style={{
      borderTop: '1px solid var(--border)',
      transition: 'border-color 0.35s',
    }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '80px 48px 0' }}>
        <div className="g-footer" style={{ marginBottom: '64px' }}>
          {/* Brand column */}
          <div>
            <Link href={`/${locale}`} style={{ display: 'inline-flex', alignItems: 'center', textDecoration: 'none', height: '52px' }}>
              <img
                src="/logo.png"
                alt="sicherheit.ai"
                style={{ height: '44px', width: 'auto', objectFit: 'cover', objectPosition: 'center top' }}
              />
            </Link>
            <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: 1.75, marginTop: '16px', maxWidth: '260px' }}>
              {t('tagline')}
            </p>
            {/* Social links */}
            <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
              {[
                { label: 'GitHub', href: '#' },
                { label: 'RSS', href: '#' },
                { label: 'LinkedIn', href: '#' },
              ].map(s => (
                <a key={s.label} href={s.href} style={{
                  padding: '5px 12px',
                  border: '1px solid var(--border)',
                  borderRadius: '6px',
                  fontSize: '11px',
                  fontFamily: 'var(--mono)',
                  color: 'var(--text-muted)',
                  textDecoration: 'none',
                  letterSpacing: '0.04em',
                  transition: 'border-color 0.2s, color 0.2s',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--border-bright)';
                  (e.currentTarget as HTMLAnchorElement).style.color = 'var(--cyan)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--border)';
                  (e.currentTarget as HTMLAnchorElement).style.color = 'var(--text-muted)';
                }}
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {[
            {
              title: t('content'),
              links: [
                { label: t('insights'), href: `/${locale}/blog` },
                { label: t('analyses'), href: `/${locale}/blog` },
                { label: t('glossar'), href: `/${locale}/glossar` },
                { label: t('cveFeed'), href: `/${locale}/blog` },
              ],
            },
            {
              title: t('tools'),
              links: [
                { label: t('passwordChecker'), href: `/${locale}/tools` },
                { label: t('phishingDetector'), href: `/${locale}/tools` },
                { label: t('cveDashboard'), href: `/${locale}/tools` },
                { label: t('aiScanner'), href: `/${locale}/tools` },
              ],
            },
            {
              title: t('legal'),
              links: [
                { label: t('privacy'), href: '#' },
                { label: t('imprint'), href: '#' },
                { label: t('terms'), href: '#' },
                { label: t('gdpr'), href: '#' },
              ],
            },
          ].map((col, i) => (
            <div key={i}>
              <h4 style={{
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--text-muted)',
                marginBottom: '20px',
                fontFamily: 'var(--mono)',
              }}>
                {col.title}
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {col.links.map((link, j) => (
                  <li key={j}>
                    <Link
                      href={link.href}
                      style={{ fontSize: '14px', color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 0.2s' }}
                      onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
                      onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderTop: '1px solid var(--border)',
          padding: '24px 0 32px',
          gap: '16px',
          flexWrap: 'wrap',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '13px', color: 'var(--text-muted)', fontFamily: 'var(--mono)' }}>
              {t('copyright')}
            </span>
            {/* KI badge */}
            <span className="ki-badge">
              KI-optimiert · llms.txt verfügbar
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '7px', height: '7px', borderRadius: '50%',
              background: '#69DB7C',
              boxShadow: '0 0 8px rgba(105,219,124,0.7)',
              animation: 'pulse-dot 2s infinite',
            }} />
            <span style={{ fontFamily: 'var(--mono)', fontSize: '12px', color: 'var(--text-muted)' }}>
              {t('statusNormal')}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
