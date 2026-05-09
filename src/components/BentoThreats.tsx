'use client';

import { useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';

const CARDS = [
  {
    id: 'log4shell',
    featured: true,
    cat: 'Schwachstelle',
    catColor: '#00F0FF',
    catBg: 'rgba(0,240,255,0.12)',
    gradientBg: 'linear-gradient(135deg, #060D24 0%, #071830 40%, #0A1E40 100%)',
    glowColor: 'rgba(0,240,255,0.18)',
    glowHover: '0 0 60px rgba(0,240,255,0.25), 0 24px 80px rgba(0,0,0,0.5)',
    badge: { label: 'CVSS 10.0', bg: 'rgba(255,45,111,0.15)', color: '#FF2D6F' },
    title: 'Log4Shell (CVE-2021-44228): Die Schwachstelle die das Internet erschütterte',
    sub: 'Remote Code Execution in Apache Log4j 2 — Millionen Java-Anwendungen weltweit betroffen. BSI stufte auf Warnstufe 4 (Rot) hoch.',
    hook: 'Eine einzige Zeile Code reichte aus, um Millionen Server weltweit angreifbar zu machen. Log4Shell gilt als eine der kritischsten Schwachstellen der Internetgeschichte — CVSS 10.0, aktiv ausgenutzt innerhalb von Stunden nach Bekanntwerden.',
    meta: 'Quelle: BSI, NIST NVD, CISA · Dez. 2021 · 14 min',
    visual: 'neural',
    slug: 'log4shell-cve-2021-44228',
  },
  {
    id: 'moveit',
    cat: 'Ransomware',
    catColor: '#FF2D6F',
    catBg: 'rgba(255,45,111,0.12)',
    gradientBg: 'linear-gradient(135deg, #1A0610 0%, #240A18 100%)',
    glowColor: 'rgba(255,45,111,0.15)',
    glowHover: '0 0 40px rgba(255,45,111,0.2), 0 16px 48px rgba(0,0,0,0.5)',
    badge: { label: 'CVSS 9.8', bg: 'rgba(255,150,50,0.15)', color: '#FF9632' },
    title: 'MOVEit-Hack: Cl0p Ransomware trifft 2.600 Organisationen',
    hook: 'In 48 Stunden erbeutete die Cl0p-Gruppe Daten von über 2.600 Organisationen — darunter Regierungsbehörden, Banken und Universitäten. Wie ein einziger SQL-Injection-Bug zum größten Datenleck des Jahres 2023 wurde.',
    meta: 'Quelle: Mandiant, Emsisoft · Jun. 2023',
    visual: 'lock',
    slug: 'moveit-hack-cl0p-2023',
  },
  {
    id: 'eu-ai-act',
    cat: 'Regulierung',
    catColor: '#7890FF',
    catBg: 'rgba(120,144,255,0.12)',
    gradientBg: 'linear-gradient(135deg, #060B24 0%, #0A0F38 100%)',
    glowColor: 'rgba(120,144,255,0.15)',
    glowHover: '0 0 40px rgba(120,144,255,0.2), 0 16px 48px rgba(0,0,0,0.5)',
    badge: { label: 'IN KRAFT', bg: 'rgba(120,200,100,0.12)', color: '#78C864' },
    title: 'EU AI Act (VO 2024/1689): Was Unternehmen jetzt wissen müssen',
    hook: 'Seit August 2024 gilt die weltweit erste umfassende KI-Regulierung. Bußgelder bis 35 Mio. Euro drohen — doch viele Unternehmen wissen nicht einmal, ob ihre Systeme unter das Gesetz fallen.',
    meta: 'Quelle: EU Amtsblatt · Aug. 2024',
    visual: 'shield',
    slug: 'eu-ai-act-2024-compliance',
  },
  {
    id: 'bsi',
    cat: 'Lagebericht',
    catColor: '#FF9632',
    catBg: 'rgba(255,150,50,0.12)',
    gradientBg: 'linear-gradient(135deg, #1A0E00 0%, #241500 100%)',
    glowColor: 'rgba(255,150,50,0.12)',
    glowHover: '0 0 40px rgba(255,150,50,0.18), 0 16px 48px rgba(0,0,0,0.5)',
    badge: { label: 'OFFIZIELL', bg: 'rgba(255,45,111,0.12)', color: '#FF2D6F' },
    title: 'BSI Lagebericht 2024: IT-Sicherheit in Deutschland',
    hook: 'Das BSI verzeichnet 2024 eine nie dagewesene Qualität an Cyberangriffen. KI-generierte Phishing-Mails, professionelle Ransomware-Gruppen und staatlich gesteuerte Spionage bedrohen Behörden und Unternehmen gleichermaßen.',
    meta: 'Quelle: Bundesamt für Sicherheit in der IT · Okt. 2024',
    visual: 'bug',
    slug: 'bsi-lagebericht-2024',
  },
  {
    id: 'raas',
    cat: 'Ransomware',
    catColor: '#9664FF',
    catBg: 'rgba(150,100,255,0.12)',
    gradientBg: 'linear-gradient(135deg, #0E0620 0%, #160A30 100%)',
    glowColor: 'rgba(150,100,255,0.12)',
    glowHover: '0 0 40px rgba(150,100,255,0.2), 0 16px 48px rgba(0,0,0,0.5)',
    badge: { label: 'ANALYSE', bg: 'rgba(150,100,255,0.15)', color: '#9664FF' },
    title: 'Ransomware-as-a-Service 2024: Das Geschäftsmodell der Cyberkriminalität',
    hook: 'LockBit, BlackCat, Cl0p — moderne Ransomware-Gruppen operieren wie Tech-Startups mit Support-Teams, SLAs und Affiliate-Programmen. IBM beziffert den durchschnittlichen Schaden pro Angriff auf 4,9 Mio. Dollar.',
    meta: 'Quelle: Sophos, IBM, Europol · 2024',
    visual: 'eye',
    slug: 'ransomware-as-a-service-2024',
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
  const router = useRouter();
  const { theme } = useTheme();
  const isLight = theme === 'light';

  return (
    <motion.article
      className={featured ? 'bento-featured' : undefined}
      variants={cardVariants}
      onClick={() => router.push(`/de/blog/${card.slug}`)}
      whileHover={{
        scale: 1.02,
        boxShadow: isLight
          ? `0 8px 40px rgba(0,0,0,0.15), 0 0 30px ${card.catColor}22`
          : card.glowHover,
        transition: { duration: 0.3, ease: 'easeOut' },
      }}
      style={{
        gridColumn: featured ? 'span 2' : undefined,
        gridRow: featured ? 'span 2' : undefined,
        position: 'relative',
        borderRadius: '18px',
        overflow: 'hidden',
        cursor: 'pointer',
        background: isLight ? 'var(--card-bg)' : card.gradientBg,
        border: isLight ? `1px solid var(--border)` : '1px solid rgba(255,255,255,0.06)',
        display: 'flex',
        flexDirection: 'column',
        minHeight: featured ? '420px' : '200px',
        willChange: 'transform',
        boxShadow: isLight ? 'var(--card-shadow)' : 'none',
      }}
    >
      {/* Ambient glow — dark mode only */}
      {!isLight && (
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: `radial-gradient(ellipse 60% 50% at 30% 30%, ${card.glowColor} 0%, transparent 70%)`,
        }} />
      )}
      {/* Light mode top accent */}
      {isLight && (
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '3px',
          background: `linear-gradient(90deg, ${card.catColor}, transparent)`,
          borderRadius: '18px 18px 0 0',
        }} />
      )}

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
            color: 'var(--text)',
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
          <p style={{ fontSize: '13px', color: 'var(--text-dim)', lineHeight: 1.6, margin: 0 }}>
            {card.sub}
          </p>
        )}

        {'hook' in card && card.hook && (
          <p style={{
            fontSize: featured ? '14px' : '12px',
            color: 'var(--text-dim)',
            lineHeight: 1.65,
            margin: 0,
          }}>
            {card.hook}
          </p>
        )}

        <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'var(--mono)' }}>
          {card.meta}
        </div>

        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          marginTop: '4px',
          padding: featured ? '10px 18px' : '7px 14px',
          borderRadius: '6px',
          background: `${card.catColor}18`,
          border: `1px solid ${card.catColor}40`,
          color: card.catColor,
          fontSize: featured ? '13px' : '11px',
          fontWeight: 700,
          letterSpacing: '0.03em',
          cursor: 'pointer',
          alignSelf: 'flex-start',
          transition: 'background 0.2s, border-color 0.2s',
        }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.background = `${card.catColor}28`;
            (e.currentTarget as HTMLElement).style.borderColor = `${card.catColor}70`;
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.background = `${card.catColor}18`;
            (e.currentTarget as HTMLElement).style.borderColor = `${card.catColor}40`;
          }}
        >
          Jetzt lesen →
        </div>

        {!featured && (
          <div style={{
            position: 'absolute', top: '20px', right: '20px',
            width: '36px', height: '36px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            opacity: 0.4,
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
            color: 'var(--text)',
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
