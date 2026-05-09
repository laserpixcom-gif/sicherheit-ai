'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';

interface NavProps { locale: string }

/* ── Magnetic link wrapper ── */
function MagLink({ href, label, active }: { href: string; label: string; active: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 350, damping: 28 });
  const sy = useSpring(y, { stiffness: 350, damping: 28 });

  const onMove = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    x.set((e.clientX - r.left - r.width / 2) * 0.28);
    y.set((e.clientY - r.top - r.height / 2) * 0.28);
  };
  const onLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div ref={ref} style={{ x: sx, y: sy }} onMouseMove={onMove} onMouseLeave={onLeave}>
      <Link
        href={href}
        className={active ? 'nav-link-active' : ''}
        style={{
          color: active ? 'var(--text)' : 'var(--text-dim)',
          textDecoration: 'none',
          fontSize: '14px',
          fontWeight: 500,
          position: 'relative',
          transition: 'color 0.2s',
          paddingBottom: '4px',
        }}
        onMouseEnter={e => { if (!active) (e.currentTarget as HTMLAnchorElement).style.color = 'var(--text)'; }}
        onMouseLeave={e => { if (!active) (e.currentTarget as HTMLAnchorElement).style.color = 'var(--text-dim)'; }}
      >
        {label}
      </Link>
    </motion.div>
  );
}

export default function Nav({ locale }: NavProps) {
  const t = useTranslations('nav');
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const otherLocale = locale === 'de' ? 'en' : 'de';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const links = [
    { href: `/${locale}`, label: t('home') },
    { href: `/${locale}/tools`, label: t('tools') },
    { href: `/${locale}/glossar`, label: t('glossar') },
    { href: `/${locale}/ai-act`, label: t('aiact') },
    { href: `/${locale}/blog`, label: t('insights') },
    { href: `/${locale}/ueber-uns`, label: t('ueber') },
  ];

  const navHeight = scrolled ? '60px' : '72px';

  return (
    <>
      <motion.nav
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0,
          zIndex: 1000,
          padding: '0 48px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: scrolled ? 'var(--nav-bg-scrolled)' : 'var(--nav-bg)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid var(--border)',
          transition: 'background 0.35s, border-color 0.35s',
        }}
        animate={{ height: navHeight }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Logo */}
        <Link href={`/${locale}`} style={{
          textDecoration: 'none',
          color: 'var(--text)',
          display: 'flex',
          alignItems: 'center',
          height: '100%',
          zIndex: 10,
        }}>
          <img
            src="/logo.png"
            alt="sicherheit.ai"
            style={{
              height: scrolled ? '40px' : '46px',
              width: 'auto',
              objectFit: 'cover',
              objectPosition: 'center top',
              mixBlendMode: theme === 'dark' ? 'screen' : 'multiply',
              transition: 'height 0.35s',
            }}
          />
        </Link>

        {/* Desktop links */}
        <ul style={{
          display: 'flex',
          gap: '28px',
          listStyle: 'none',
          alignItems: 'center',
        }} className="nav-desktop">
          {links.map(({ href, label }) => (
            <li key={href}>
              <MagLink href={href} label={label} active={pathname === href} />
            </li>
          ))}
        </ul>

        {/* Right controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* Language */}
          <Link href={`/${otherLocale}`} style={{
            border: '1px solid var(--border)',
            color: 'var(--text-muted)',
            padding: '5px 11px',
            borderRadius: '6px',
            fontSize: '11px',
            fontWeight: 700,
            fontFamily: 'var(--mono)',
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            transition: 'border-color 0.2s, color 0.2s',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--border-bright)';
            (e.currentTarget as HTMLAnchorElement).style.color = 'var(--text)';
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--border)';
            (e.currentTarget as HTMLAnchorElement).style.color = 'var(--text-muted)';
          }}
          >
            {otherLocale}
          </Link>

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '5px 12px',
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
            <span style={{ fontSize: '14px' }}>{theme === 'dark' ? '☀' : '◑'}</span>
            <span className="nav-desktop">{theme === 'dark' ? t('light') : t('dark')}</span>
          </button>

          {/* CTA */}
          <Link
            href={`/${locale}/ueber-uns#beratung`}
            className="nav-desktop"
            style={{
              background: 'linear-gradient(135deg, var(--cyan) 0%, #007A9A 100%)',
              color: theme === 'dark' ? '#060B18' : '#fff',
              border: 'none',
              padding: '7px 18px',
              borderRadius: '6px',
              fontSize: '13px',
              fontWeight: 700,
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              transition: 'box-shadow 0.2s, transform 0.2s',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 0 20px rgba(0,152,184,0.4)';
              (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = 'none';
              (e.currentTarget as HTMLAnchorElement).style.transform = 'none';
            }}
          >
            {t('beratung')} →
          </Link>

          {/* Hamburger */}
          <button
            className="nav-mobile"
            onClick={() => setMenuOpen(v => !v)}
            aria-label="Menu"
            style={{
              background: 'none',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              padding: '7px 10px',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              gap: '5px',
              zIndex: 10001,
              position: 'relative',
            }}
          >
            <motion.span animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }} transition={{ duration: 0.25 }}
              style={{ display: 'block', width: '20px', height: '1.5px', background: 'var(--text)', borderRadius: '2px', transformOrigin: 'center' }} />
            <motion.span animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }} transition={{ duration: 0.2 }}
              style={{ display: 'block', width: '20px', height: '1.5px', background: 'var(--text)', borderRadius: '2px' }} />
            <motion.span animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }} transition={{ duration: 0.25 }}
              style={{ display: 'block', width: '20px', height: '1.5px', background: 'var(--text)', borderRadius: '2px', transformOrigin: 'center' }} />
          </button>
        </div>
      </motion.nav>

      {/* Mobile fullscreen overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-nav-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{ paddingTop: '80px' }}
          >
            {/* Links */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', width: '100%', padding: '0 32px' }}>
              {links.map(({ href, label }, i) => (
                <motion.div
                  key={href}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 12 }}
                  transition={{ delay: i * 0.06, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  style={{ width: '100%' }}
                >
                  <Link
                    href={href}
                    onClick={() => setMenuOpen(false)}
                    style={{
                      display: 'block',
                      fontSize: 'clamp(28px, 8vw, 48px)',
                      fontWeight: 800,
                      letterSpacing: '-0.03em',
                      color: pathname === href ? 'var(--cyan)' : 'var(--text)',
                      textDecoration: 'none',
                      padding: '16px 0',
                      borderBottom: '1px solid var(--border)',
                      textAlign: 'center',
                      transition: 'color 0.2s',
                    }}
                  >
                    {label}
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Bottom */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              style={{ marginTop: '48px', display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}
            >
              <Link href={`/${otherLocale}`} onClick={() => setMenuOpen(false)} style={{
                padding: '10px 20px',
                border: '1px solid var(--border)',
                borderRadius: '8px',
                color: 'var(--text-dim)',
                textDecoration: 'none',
                fontSize: '14px',
                fontFamily: 'var(--mono)',
                textTransform: 'uppercase',
              }}>
                {otherLocale.toUpperCase()}
              </Link>
              <button onClick={() => { toggleTheme(); }} style={{
                padding: '10px 20px',
                border: '1px solid var(--border)',
                borderRadius: '8px',
                color: 'var(--text-dim)',
                background: 'none',
                fontSize: '14px',
                fontFamily: 'var(--font)',
                cursor: 'pointer',
              }}>
                {theme === 'dark' ? '☀ Hell' : '◑ Dunkel'}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Inline responsive styles */}
      <style>{`
        @media (min-width: 769px) { .nav-mobile { display: none !important; } }
        @media (max-width: 768px) { .nav-desktop { display: none !important; } }
      `}</style>
    </>
  );
}
