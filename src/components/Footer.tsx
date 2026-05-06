'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function Footer({ locale }: { locale: string }) {
  const t = useTranslations('footer');

  return (
    <footer style={{
      padding: '80px 0 40px',
      borderTop: '1px solid var(--border)',
      transition: 'border-color 0.35s',
    }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 48px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr 1fr',
          gap: '48px',
          marginBottom: '64px',
        }}>
          <div>
            <Link href={`/${locale}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', textDecoration: 'none', color: 'var(--text)', height: '64px' }}>
              <img src="/logo.png" alt="sicherheit.ai" style={{ height: '52px', width: 'auto', objectFit: 'cover', objectPosition: 'center top' }} />
            </Link>
            <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: 1.7, marginTop: '14px', maxWidth: '280px' }}>
              {t('tagline')}
            </p>
          </div>

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
              <h4 style={{ fontSize: '13px', fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase', color: 'var(--text)', marginBottom: '16px' }}>
                {col.title}
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {col.links.map((link, j) => (
                  <li key={j}>
                    <Link href={link.href} style={{ fontSize: '14px', color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 0.2s' }}
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

        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderTop: '1px solid var(--border)',
          paddingTop: '32px',
          fontSize: '13px',
          color: 'var(--text-muted)',
          fontFamily: 'var(--mono)',
        }}>
          <span>{t('copyright')}</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '7px', height: '7px', borderRadius: '50%', background: '#78C864',
              boxShadow: '0 0 8px rgba(120,200,100,0.6)',
              animation: 'pulse-dot 2s infinite',
            }} />
            <span>{t('statusNormal')}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
