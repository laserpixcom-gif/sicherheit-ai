'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useTheme } from '@/contexts/ThemeContext';

interface NavProps {
  locale: string;
}

export default function Nav({ locale }: NavProps) {
  const t = useTranslations('nav');
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const otherLocale = locale === 'de' ? 'en' : 'de';

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: '0 48px',
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: scrolled
          ? 'var(--nav-bg-scrolled)'
          : 'var(--nav-bg)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid var(--border)',
        transition: 'background 0.35s, border-color 0.35s',
      }}
      className={scrolled ? 'scrolled' : ''}
    >
      <Link href={`/${locale}`} style={{
        fontSize: '18px',
        fontWeight: 700,
        letterSpacing: '-0.02em',
        textDecoration: 'none',
        color: 'var(--text)',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        height: '64px',
      }}>
        <img
          src="/logo.png"
          alt="sicherheit.ai Logo"
          style={{
            height: '52px',
            width: 'auto',
            objectFit: 'cover',
            objectPosition: 'center top',
            mixBlendMode: theme === 'dark' ? 'screen' : 'multiply',
            transition: 'filter 0.35s',
          }}
        />
      </Link>

      <ul style={{
        display: 'flex',
        gap: '32px',
        listStyle: 'none',
      }}>
        {[
          { href: `/${locale}`, label: t('home') },
          { href: `/${locale}/blog`, label: t('insights') },
          { href: `/${locale}/glossar`, label: t('glossar') },
          { href: `/${locale}/tools`, label: t('tools') },
        ].map(({ href, label }) => (
          <li key={href}>
            <Link href={href} style={{
              color: 'var(--text-dim)',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: 500,
              position: 'relative',
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-dim)')}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {/* Language switcher */}
        <Link href={`/${otherLocale}`} style={{
          background: 'none',
          border: '1px solid var(--border)',
          color: 'var(--text-muted)',
          padding: '6px 12px',
          borderRadius: '6px',
          fontSize: '12px',
          fontWeight: 600,
          cursor: 'pointer',
          fontFamily: 'var(--mono)',
          textDecoration: 'none',
          display: 'inline-flex',
          alignItems: 'center',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
        }}>
          {otherLocale}
        </Link>

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '7px',
            padding: '6px 14px',
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: '20px',
            cursor: 'pointer',
            fontSize: '12px',
            fontWeight: 600,
            fontFamily: 'var(--font)',
            color: 'var(--text-dim)',
            transition: 'all 0.2s',
            whiteSpace: 'nowrap',
          }}
        >
          <span style={{ fontSize: '15px' }}>{theme === 'dark' ? '☀️' : '🌙'}</span>
          <span>{theme === 'dark' ? t('light') : t('dark')}</span>
        </button>

        <Link href={`/${locale}/glossar`} style={{
          background: 'none',
          border: '1px solid var(--border)',
          color: 'var(--text-dim)',
          padding: '8px 18px',
          borderRadius: '6px',
          fontSize: '13px',
          fontWeight: 500,
          cursor: 'pointer',
          fontFamily: 'var(--font)',
          textDecoration: 'none',
          display: 'inline-flex',
          alignItems: 'center',
          transition: 'border-color 0.2s, color 0.2s, background 0.2s',
        }}>
          {t('glossar')}
        </Link>

        <Link href={`/${locale}/tools`} style={{
          background: 'linear-gradient(135deg, var(--cyan) 0%, #007A9A 100%)',
          color: theme === 'dark' ? '#060B18' : '#fff',
          border: 'none',
          padding: '8px 20px',
          borderRadius: '6px',
          fontSize: '13px',
          fontWeight: 700,
          cursor: 'pointer',
          fontFamily: 'var(--font)',
          textDecoration: 'none',
          display: 'inline-flex',
          alignItems: 'center',
          transition: 'transform 0.2s, box-shadow 0.2s',
        }}>
          {t('tools')} →
        </Link>
      </div>
    </nav>
  );
}
