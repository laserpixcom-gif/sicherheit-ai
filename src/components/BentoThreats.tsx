'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const CARDS = [
  {
    id: 'ai-main',
    featured: true,
    cat: 'KI-Sicherheit',
    catColor: '#00F0FF',
    catBg: 'rgba(0,240,255,0.12)',
    gradientBg: 'linear-gradient(135deg, #060D24 0%, #071830 40%, #0A1E40 100%)',
    glowColor: 'rgba(0,240,255,0.18)',
    glowHover: '0 0 60px rgba(0,240,255,0.25), 0 24px 80px rgba(0,0,0,0.5)',
    badge: { label: 'KRITISCH', bg: 'rgba(255,45,111,0.15)', color: '#FF2D6F' },
    title: 'GPT-5 revolutioniert KI-Angriffe: Was Unternehmen jetzt wissen müssen',
    sub: 'Neue Angriffsklasse bedroht kritische Infrastruktur — vollautomatisierte Exploits in freier Wildbahn',
    meta: 'Dr. Lena Hartmann · 04. Mai 2026 · 12 min',
    visual: 'neural',
  },
  {
    id: 'ransomware',
    cat: 'Ransomware',
    catColor: '#FF2D6F',
    catBg: 'rgba(255,45,111,0.12)',
    gradientBg: 'linear-gradient(135deg, #1A0610 0%, #240A18 100%)',
    glowColor: 'rgba(255,45,111,0.15)',
    glowHover: '0 0 40px rgba(255,45,111,0.2), 0 16px 48px rgba(0,0,0,0.5)',
    badge: { label: 'HOCH', bg: 'rgba(255,150,50,0.15)', color: '#FF9632' },
    title: 'Phantom-Gruppe: Anatomie eines DAX-Angriffs',
    meta: 'Markus Schreiber · 03. Mai 2026',
    visual: 'lock',
  },
  {
    id: 'eu-ai-act',
    cat: 'Regulierung',
    catColor: '#7890FF',
    catBg: 'rgba(120,144,255,0.12)',
    gradientBg: 'linear-gradient(135deg, #060B24 0%, #0A0F38 100%)',
    glowColor: 'rgba(120,144,255,0.15)',
    glowHover: '0 0 40px rgba(120,144,255,0.2), 0 16px 48px rgba(0,0,0,0.5)',
    badge: { label: 'NEU', bg: 'rgba(120,200,100,0.12)', color: '#78C864' },
    title: 'EU AI Act: Compliance-Deadline rückt näher',
    meta: 'Julia Becker · 02. Mai 2026',
    visual: 'shield',
  },
  {
    id: 'cve',
    cat: 'Schwachstelle',
    catColor: '#FF9632',
    catBg: 'rgba(255,150,50,0.12)',
    gradientBg: 'linear-gradient(135deg, #1A0E00 0%, #241500 100%)',
    glowColor: 'rgba(255,150,50,0.12)',
    glowHover: '0 0 40px rgba(255,150,50,0.18), 0 16px 48px rgba(0,0,0,0.5)',
    badge: { label: 'CVSS 9.8', bg: 'rgba(255,45,111,0.12)', color: '#FF2D6F' },
    title: 'CVE-2026-4821: RCE in OpenSSL — sofort patchen',
    meta: 'CERT-DE · Heute',
    visual: 'bug',
  },
  {
    id: 'privacy',
    cat: 'Datenschutz',
    catColor: '#9664FF',
    catBg: 'rgba(150,100,255,0.12)',
    gradientBg: 'linear-gradient(135deg, #0E0620 0%, #160A30 100%)',
    glowColor: 'rgba(150,100,255,0.12)',
    glowHover: '0 0 40px rgba(150,100,255,0.2), 0 16px 48px rgba(0,0,0,0.5)',
    badge: { label: 'DSGVO', bg: 'rgba(150,100,255,0.15)', color: '#9664FF' },
    title: 'Datenpanne: 4M Nutzerdaten bei Telekommunikationsanbieter',
    meta: 'TU Berlin · 01. Mai 2026',
    visual: 'eye',
  },
];

const VISUALS: Record<string, JSX.Element> = {
  neural: (
    <svg viewBox="0 0 200 120" style={{ width: '100%', height: '100%', opacity: 0.4 }}>
      {[0,1,2,3,4].map(i => (
        <circle key={i} cx={20 + i * 40} cy={60} r="6" fill="none" stroke="#00F0FF" strokeWidth="1.5">
          <animate attributeName="r" values="6;9;6" dur={`${1.5 + i * 0.3}s`} repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0.6;1;0.6" dur={`${1.5 + i * 0.3}s`} repeatCount="indefinite"/>
        </circle>
      ))}
      {[0,1,2,3].map(i => (
        <line key={i} x1={26 + i * 40} y1="60" x2={54 + i * 40} y2="60" stroke="#00F0FF" strokeWidth="0.8" opacity="0.3">
          <animate attributeName="opacity" values="0.3;0.7;0.3" dur={`${1.2 + i * 0.2}s`} repeatCount="indefinite"/>
        </line>
      ))}
      {[0,1,2].map(i => (
        <g key={i}>
          <line x1={20 + i * 40} y1="60" x2={60 + i * 40} y2="30" stroke="#FF2D6F" strokeWidth="0.5" opacity="0.25"/>
          <line x1={20 + i * 40} y1="60" x2={60 + i * 40} y2="90" stroke="#FF2D6F" strokeWidth="0.5" opacity="0.25"/>
        </g>
      ))}
    </svg>
  ),
  lock: (
    <svg viewBox="0 0 80 80" style={{ width: '60px', height: '60px', opacity: 0.5 }}>
      <rect x="20" y="36" width="40" height="28" rx="4" fill="none" stroke="#FF2D6F" strokeWidth="2"/>
      <path d="M28 36V26a12 12 0 0 1 24 0v10" fill="none" stroke="#FF2D6F" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="40" cy="50" r="4" fill="#FF2D6F" opacity="0.8">
        <animate attributeName="opacity" values="0.8;0.3;0.8" dur="2s" repeatCount="indefinite"/>
      </circle>
    </svg>
  ),
  shield: (
    <svg viewBox="0 0 80 80" style={{ width: '60px', height: '60px', opacity: 0.5 }}>
      <path d="M40 10 L64 20 L64 40 Q64 58 40 70 Q16 58 16 40 L16 20 Z" fill="none" stroke="#7890FF" strokeWidth="2"/>
      <path d="M30 40 L37 47 L52 32" stroke="#78C864" strokeWidth="2.5" fill="none" strokeLinecap="round">
        <animate attributeName="stroke-dasharray" values="0 40;40 0" dur="1.5s" fill="freeze"/>
      </path>
    </svg>
  ),
  bug: (
    <svg viewBox="0 0 80 80" style={{ width: '60px', height: '60px', opacity: 0.5 }}>
      <circle cx="40" cy="42" r="16" fill="none" stroke="#FF9632" strokeWidth="2"/>
      <line x1="40" y1="26" x2="40" y2="58" stroke="#FF9632" strokeWidth="1" opacity="0.5"/>
      <line x1="24" y1="42" x2="56" y2="42" stroke="#FF9632" strokeWidth="1" opacity="0.5"/>
      <circle cx="40" cy="26" r="6" fill="none" stroke="#FF9632" strokeWidth="2"/>
      <line x1="24" y1="30" x2="16" y2="22" stroke="#FF9632" strokeWidth="1.5"/>
      <line x1="56" y1="30" x2="64" y2="22" stroke="#FF9632" strokeWidth="1.5"/>
      <line x1="24" y1="50" x2="16" y2="58" stroke="#FF9632" strokeWidth="1.5"/>
      <line x1="56" y1="50" x2="64" y2="58" stroke="#FF9632" strokeWidth="1.5"/>
      <circle cx="40" cy="42" r="3" fill="#FF9632">
        <animate attributeName="r" values="3;5;3" dur="1.5s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="1;0.4;1" dur="1.5s" repeatCount="indefinite"/>
      </circle>
    </svg>
  ),
  eye: (
    <svg viewBox="0 0 80 80" style={{ width: '60px', height: '60px', opacity: 0.5 }}>
      <path d="M8 40 Q40 10 72 40 Q40 70 8 40Z" fill="none" stroke="#9664FF" strokeWidth="2"/>
      <circle cx="40" cy="40" r="10" fill="none" stroke="#9664FF" strokeWidth="2"/>
      <circle cx="40" cy="40" r="4" fill="#9664FF" opacity="0.6">
        <animate attributeName="opacity" values="0.6;0.2;0.6" dur="3s" repeatCount="indefinite"/>
      </circle>
    </svg>
  ),
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

function BentoCard({ card, featured = false }: { card: typeof CARDS[0]; featured?: boolean }) {
  return (
    <motion.article
      className={featured ? 'bento-featured' : undefined}
      variants={cardVariants}
      whileHover={{
        scale: 1.02,
        boxShadow: card.glowHover,
        transition: { duration: 0.3, ease: 'easeOut' },
      }}
      style={{
        gridColumn: featured ? 'span 2' : undefined,
        gridRow: featured ? 'span 2' : undefined,
        position: 'relative',
        borderRadius: '18px',
        overflow: 'hidden',
        cursor: 'pointer',
        background: card.gradientBg,
        border: '1px solid rgba(255,255,255,0.06)',
        display: 'flex',
        flexDirection: 'column',
        minHeight: featured ? '420px' : '200px',
        willChange: 'transform',
      }}
    >
      {/* Ambient glow */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: `radial-gradient(ellipse 60% 50% at 30% 30%, ${card.glowColor} 0%, transparent 70%)`,
      }} />

      {/* Animated gradient border */}
      <div style={{
        position: 'absolute', inset: 0, borderRadius: '18px', pointerEvents: 'none',
        background: `linear-gradient(135deg, ${card.catColor}22, transparent 50%, ${card.catColor}11)`,
        opacity: 0,
        transition: 'opacity 0.3s',
      }} className="card-border-glow" />

      {/* Visual / Illustration area */}
      {featured && (
        <div style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '32px',
          position: 'relative',
          overflow: 'hidden',
          minHeight: '200px',
        }}>
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: 'repeating-linear-gradient(-45deg, rgba(255,255,255,0.015) 0px, rgba(255,255,255,0.015) 1px, transparent 1px, transparent 10px)',
          }} />
          {VISUALS[card.visual]}
          {/* Scanline effect */}
          <div style={{
            position: 'absolute', inset: 0,
            background: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.06) 2px, rgba(0,0,0,0.06) 4px)`,
            pointerEvents: 'none',
          }} />
        </div>
      )}

      {/* Content */}
      <div style={{
        padding: featured ? '24px 28px 28px' : '20px 22px 22px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        position: 'relative',
        zIndex: 1,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <span style={{
            padding: '3px 10px', borderRadius: '4px',
            fontSize: '10px', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase',
            background: card.catBg, color: card.catColor,
          }}>
            {card.cat}
          </span>
          <span style={{
            padding: '3px 10px', borderRadius: '4px',
            fontSize: '10px', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase',
            background: card.badge.bg, color: card.badge.color,
          }}>
            {card.badge.label}
          </span>
        </div>

        <div style={{ position: 'relative', display: 'inline-block' }}>
          <h3 style={{
            fontSize: featured ? '20px' : '15px',
            fontWeight: 700,
            lineHeight: 1.3,
            letterSpacing: '-0.02em',
            color: '#E8EDF8',
            margin: 0,
          }}>
            {card.title}
          </h3>
          {/* Animated underline on hover */}
          <div style={{
            position: 'absolute', bottom: '-3px', left: 0,
            height: '1px', width: '0%',
            background: card.catColor,
            transition: 'width 0.4s cubic-bezier(0.16,1,0.3,1)',
          }} className="title-underline" />
        </div>

        {card.sub && (
          <p style={{ fontSize: '13px', color: 'rgba(232,237,248,0.55)', lineHeight: 1.6, margin: 0 }}>
            {card.sub}
          </p>
        )}

        <div style={{ fontSize: '11px', color: 'rgba(232,237,248,0.35)', fontFamily: 'var(--mono)', marginTop: '4px' }}>
          {card.meta}
        </div>

        {!featured && (
          <div style={{
            position: 'absolute', bottom: '22px', right: '22px',
            width: '44px', height: '44px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            {VISUALS[card.visual]}
          </div>
        )}
      </div>
    </motion.article>
  );
}

export default function BentoThreats() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'start 0.3'],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [60, 0]);
  const springY = useSpring(y, { stiffness: 60, damping: 20 });

  return (
    <section
      ref={sectionRef}
      className="sec-xl"
      style={{
        background: 'var(--bg)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background grid texture */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: `
          linear-gradient(rgba(0,240,255,0.025) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,240,255,0.025) 1px, transparent 1px)
        `,
        backgroundSize: '64px 64px',
        maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)',
      }} />

      <motion.div className="r-wrap" style={{ opacity, y: springY }}>
        {/* Header */}
        <div style={{ marginBottom: '56px' }}>
          <div style={{
            fontFamily: 'var(--mono)', fontSize: '11px', letterSpacing: '0.14em',
            textTransform: 'uppercase', color: 'var(--cyan)', marginBottom: '12px',
            display: 'flex', alignItems: 'center', gap: '12px',
          }}>
            <span style={{ display: 'block', width: '24px', height: '1px', background: 'var(--cyan)' }} />
            Aktuelle Bedrohungen
          </div>
          <h2 style={{
            fontSize: 'clamp(36px, 5vw, 64px)',
            fontWeight: 800,
            letterSpacing: '-0.04em',
            lineHeight: 0.95,
            color: '#E8EDF8',
            margin: 0,
          }}>
            Security<br />
            <span style={{ color: 'var(--cyan)' }}>Intelligence</span>
          </h2>
        </div>

        {/* Bento Grid */}
        <motion.div
          className="g-bento"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {CARDS.map((card, i) => (
            <BentoCard key={card.id} card={card} featured={i === 0} />
          ))}
        </motion.div>
      </motion.div>

      <style>{`
        article:hover .title-underline { width: 100% !important; }
        article:hover .card-border-glow { opacity: 1 !important; }
      `}</style>
    </section>
  );
}
