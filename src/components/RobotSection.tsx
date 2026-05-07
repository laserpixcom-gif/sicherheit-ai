'use client';

import { SplineScene } from '@/components/ui/splite';
import { Spotlight } from '@/components/ui/spotlight';
import { useTheme } from '@/contexts/ThemeContext';

export default function RobotSection() {
  const { theme } = useTheme();

  return (
    <section style={{
      position: 'relative',
      width: '100%',
      overflow: 'hidden',
      background: theme === 'dark' ? '#060B18' : '#EEF2FA',
      borderTop: '1px solid var(--border)',
      borderBottom: '1px solid var(--border)',
    }}>
      {/* Background grid */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: theme === 'dark'
          ? 'linear-gradient(rgba(0,240,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(0,240,255,0.025) 1px, transparent 1px)'
          : 'linear-gradient(rgba(0,120,180,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,120,180,0.06) 1px, transparent 1px)',
        backgroundSize: '64px 64px',
        maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)',
      }} />

      <div style={{
        position: 'relative',
        maxWidth: '1280px',
        margin: '0 auto',
        display: 'flex',
        flexWrap: 'wrap',
        minHeight: '560px',
        alignItems: 'stretch',
      }}>
        {/* Left — Text content */}
        <div style={{
          flex: '0 0 min(45%, 100%)',
          minWidth: 'min(360px, 100%)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: 'clamp(48px, 6vw, 96px) clamp(24px, 4vw, 64px)',
          position: 'relative',
          zIndex: 2,
        }}>
          {/* Eyebrow */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: '10px',
            fontFamily: 'var(--mono)', fontSize: '11px',
            letterSpacing: '0.14em', textTransform: 'uppercase',
            color: 'var(--cyan)', marginBottom: '20px',
          }}>
            <span style={{ width: '28px', height: '1px', background: 'var(--cyan)', opacity: 0.7 }} />
            KI-gestützte Analyse
          </div>

          {/* Heading */}
          <h2 style={{
            fontSize: 'clamp(32px, 4vw, 54px)',
            fontWeight: 800,
            letterSpacing: '-0.035em',
            lineHeight: 1.05,
            color: 'var(--text)',
            marginBottom: '20px',
          }}>
            Sind Sie in Zukunft<br />
            <span style={{ color: 'var(--cyan)' }}>sicher vor KI?</span>
          </h2>

          {/* Body */}
          <p style={{
            fontSize: 'clamp(14px, 1.4vw, 16px)',
            color: 'var(--text-dim)',
            lineHeight: 1.75,
            marginBottom: '36px',
            maxWidth: '420px',
          }}>
            KI-Systeme werden zunehmend für Cyberangriffe eingesetzt —
            von automatisierten Phishing-Kampagnen bis zu adaptiver Malware.
            Verstehen Sie die Risiken bevor sie zur Bedrohung werden.
          </p>

          {/* Stats row */}
          <div style={{
            display: 'flex', gap: '32px', marginBottom: '36px',
          }}>
            {[
              { val: '340%', label: 'Anstieg KI-Phishing' },
              { val: '72%', label: 'Firmen unvorbereitet' },
              { val: '11 Sek.', label: 'Ø Angriffsintervall' },
            ].map(s => (
              <div key={s.label}>
                <div style={{
                  fontFamily: 'var(--mono)', fontSize: '22px', fontWeight: 800,
                  color: 'var(--cyan)', letterSpacing: '-0.03em', lineHeight: 1,
                }}>
                  {s.val}
                </div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px', lineHeight: 1.3 }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <a href="/de/tools" style={{
              display: 'inline-flex', alignItems: 'center',
              padding: '12px 24px',
              background: 'linear-gradient(135deg, var(--cyan) 0%, #007A9A 100%)',
              color: theme === 'dark' ? '#060B18' : '#fff',
              borderRadius: '8px',
              fontSize: '14px', fontWeight: 700,
              textDecoration: 'none', fontFamily: 'var(--font)',
              transition: 'opacity 0.2s',
            }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.opacity = '0.85'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.opacity = '1'}
            >
              Sicherheit prüfen →
            </a>
            <a href="/de/glossar" style={{
              display: 'inline-flex', alignItems: 'center',
              padding: '12px 24px',
              background: 'transparent',
              border: '1px solid var(--border)',
              color: 'var(--text-dim)',
              borderRadius: '8px',
              fontSize: '14px', fontWeight: 500,
              textDecoration: 'none', fontFamily: 'var(--font)',
              transition: 'border-color 0.2s',
            }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-bright)'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'}
            >
              KI-Begriffe verstehen
            </a>
          </div>
        </div>

        {/* Right — 3D Robot */}
        <div style={{
          flex: '1',
          minWidth: '300px',
          position: 'relative',
          minHeight: '400px',
        }}>
          {/* Spotlight effect */}
          <Spotlight size={500} className="z-0" />

          {/* Spline 3D Scene */}
          <SplineScene
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            className="w-full h-full"
          />

          {/* Edge fade left */}
          <div style={{
            position: 'absolute', top: 0, left: 0, bottom: 0, width: '80px',
            background: theme === 'dark'
              ? 'linear-gradient(to right, #060B18, transparent)'
              : 'linear-gradient(to right, #EEF2FA, transparent)',
            pointerEvents: 'none', zIndex: 2,
          }} />
        </div>
      </div>
    </section>
  );
}
