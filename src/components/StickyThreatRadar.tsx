'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const THREAT_LOGS = [
  { time: '09:41:33', type: 'Brute-Force', target: 'SSH · 185.234.219.42', severity: 'high', country: 'RU' },
  { time: '09:41:38', type: 'RCE Exploit', target: 'CVE-2026-4821 · OpenSSL 3.x', severity: 'critical', country: 'CN' },
  { time: '09:41:44', type: 'Anomalie', target: 'Outbound · 3.4GB · svchost.exe', severity: 'medium', country: 'DE' },
  { time: '09:41:50', type: 'Phishing', target: 'mail-security-de.net · 98.7%', severity: 'high', country: 'US' },
  { time: '09:41:56', type: 'DDoS', target: '48k req/s · BGP Anycast aktiv', severity: 'critical', country: 'RU' },
  { time: '09:42:02', type: 'Ransomware', target: 'invoice_2026.exe · Quarantäne', severity: 'critical', country: 'UA' },
  { time: '09:42:09', type: 'Lateral Move', target: 'admin@firma.de → DC01', severity: 'high', country: 'CN' },
  { time: '09:42:15', type: 'Zero-Day', target: 'Chrome V8 · ungepatcht', severity: 'critical', country: 'KP' },
];

const SEVERITY = {
  critical: { color: '#FF2D6F', bg: 'rgba(255,45,111,0.15)', label: 'KRITISCH' },
  high: { color: '#FF9632', bg: 'rgba(255,150,50,0.12)', label: 'HOCH' },
  medium: { color: '#00F0FF', bg: 'rgba(0,240,255,0.12)', label: 'MITTEL' },
};

// Threat blip positions on radar
const BLIPS = [
  { x: 38, y: 30, color: '#FF2D6F', size: 5 },
  { x: 65, y: 45, color: '#FF9632', size: 4 },
  { x: 28, y: 58, color: '#FF2D6F', size: 6 },
  { x: 72, y: 28, color: '#FF2D6F', size: 4 },
  { x: 55, y: 70, color: '#00F0FF', size: 3 },
  { x: 20, y: 42, color: '#FF9632', size: 4 },
  { x: 80, y: 60, color: '#FF2D6F', size: 5 },
  { x: 48, y: 22, color: '#FF9632', size: 3 },
  { x: 60, y: 80, color: '#00F0FF', size: 3 },
  { x: 35, y: 72, color: '#9664FF', size: 4 },
];

function RadarSVG({ progress }: { progress: number }) {
  const sweepAngle = progress * 360 * 4; // 4 full rotations across the scroll

  return (
    <div style={{
      position: 'relative',
      width: '460px',
      height: '460px',
      flexShrink: 0,
    }}>
      {/* Outer glow ring */}
      <div style={{
        position: 'absolute', inset: '-20px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0,240,255,0.04) 60%, transparent 100%)',
        pointerEvents: 'none',
      }} />

      <svg viewBox="0 0 200 200" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
        {/* Concentric rings */}
        {[1, 0.75, 0.5, 0.25].map((s, i) => (
          <circle
            key={i}
            cx="100" cy="100"
            r={90 * s}
            fill="none"
            stroke={`rgba(0,240,255,${0.08 - i * 0.01})`}
            strokeWidth="0.8"
          />
        ))}

        {/* Cross hairs */}
        {[0, 45, 90, 135].map((angle) => (
          <line
            key={angle}
            x1={100 + Math.cos(angle * Math.PI / 180) * 90}
            y1={100 + Math.sin(angle * Math.PI / 180) * 90}
            x2={100 - Math.cos(angle * Math.PI / 180) * 90}
            y2={100 - Math.sin(angle * Math.PI / 180) * 90}
            stroke="rgba(0,240,255,0.06)"
            strokeWidth="0.5"
          />
        ))}

        {/* Sweep cone */}
        <g transform={`rotate(${sweepAngle % 360}, 100, 100)`}>
          {Array.from({ length: 60 }, (_, i) => {
            const a = (i / 60) * -70 * Math.PI / 180;
            const alpha = (1 - i / 60) * 0.2;
            const x1 = 100 + Math.cos(a - 0.05) * 90;
            const y1 = 100 + Math.sin(a - 0.05) * 90;
            const x2 = 100 + Math.cos(a + 0.05) * 90;
            const y2 = 100 + Math.sin(a + 0.05) * 90;
            return (
              <path
                key={i}
                d={`M100,100 L${x1},${y1} A90,90 0 0,1 ${x2},${y2} Z`}
                fill={`rgba(0,240,255,${alpha})`}
              />
            );
          })}
          {/* Sweep line */}
          <line x1="100" y1="100" x2="190" y2="100" stroke="rgba(0,240,255,0.9)" strokeWidth="1.2" />
        </g>

        {/* Threat blips */}
        {BLIPS.map((blip, i) => {
          const blipAngle = Math.atan2(blip.y - 100, blip.x - 100) * 180 / Math.PI;
          const normalizedSweep = ((sweepAngle % 360) - 180);
          const dist = Math.abs(((blipAngle - normalizedSweep) + 540) % 360 - 180);
          const litUp = dist < 20;
          const glowAlpha = litUp ? 1 : Math.max(0, 0.3 - dist / 180 * 0.3);

          return (
            <g key={i}>
              {litUp && (
                <circle
                  cx={blip.x}
                  cy={blip.y}
                  r={blip.size + 8}
                  fill={`${blip.color}22`}
                />
              )}
              <circle
                cx={blip.x}
                cy={blip.y}
                r={blip.size}
                fill={blip.color}
                opacity={glowAlpha}
                style={{ filter: litUp ? `drop-shadow(0 0 6px ${blip.color})` : 'none' }}
              />
            </g>
          );
        })}

        {/* Center dot */}
        <circle cx="100" cy="100" r="18" fill="rgba(0,240,255,0.05)" />
        <circle cx="100" cy="100" r="3" fill="#00F0FF" />
        <circle cx="100" cy="100" r="8" fill="none" stroke="rgba(0,240,255,0.3)" strokeWidth="1">
          <animate attributeName="r" values="8;16;8" dur="2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.5;0;0.5" dur="2s" repeatCount="indefinite" />
        </circle>

        {/* Ring labels */}
        {['25km', '50km', '75km', '100km'].map((label, i) => (
          <text
            key={i}
            x={100 + 90 * (i + 1) * 0.25 + 3}
            y="102"
            fontSize="4"
            fill="rgba(0,240,255,0.3)"
            fontFamily="monospace"
          >
            {label}
          </text>
        ))}
      </svg>

      {/* Corner brackets HUD */}
      {([
        { top: 0, left: 0, rotate: 0 },
        { top: 0, right: 0, rotate: 90 },
        { bottom: 0, left: 0, rotate: 270 },
        { bottom: 0, right: 0, rotate: 180 },
      ] as Array<{ top?: number; left?: number; right?: number; bottom?: number; rotate: number }>).map((pos, i) => (
        <div key={i} style={{
          position: 'absolute',
          top: pos.top,
          left: pos.left,
          right: pos.right,
          bottom: pos.bottom,
          width: '24px', height: '24px',
          pointerEvents: 'none',
        }}>
          <svg viewBox="0 0 24 24" style={{ transform: `rotate(${pos.rotate}deg)` }}>
            <path d="M0 12 L0 0 L12 0" fill="none" stroke="rgba(0,240,255,0.4)" strokeWidth="1.5" />
          </svg>
        </div>
      ))}

      {/* Live label */}
      <div style={{
        position: 'absolute', top: '16px', left: '50%',
        transform: 'translateX(-50%)',
        fontFamily: 'var(--mono)', fontSize: '10px',
        color: 'rgba(0,240,255,0.6)',
        letterSpacing: '0.12em', textTransform: 'uppercase',
        display: 'flex', alignItems: 'center', gap: '6px',
      }}>
        <span style={{
          width: '6px', height: '6px', borderRadius: '50%',
          background: '#78C864',
          boxShadow: '0 0 8px rgba(120,200,100,0.8)',
          display: 'inline-block',
        }} />
        LIVE
      </div>
    </div>
  );
}

export default function StickyThreatRadar() {
  const stickyRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: stickyRef,
    offset: ['start start', 'end end'],
  });

  const springProgress = useSpring(scrollYProgress, { stiffness: 40, damping: 20 });

  // Radar sweep driven by scroll
  const radarProgress = useTransform(springProgress, [0, 1], [0, 1]);

  return (
    <div
      ref={stickyRef}
      style={{ height: '250vh', position: 'relative' }}
    >
      {/* Sticky container */}
      <div style={{
        position: 'sticky',
        top: 0,
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        background: 'var(--bg2)',
      }}>
        {/* Background noise / grid */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: `
            radial-gradient(ellipse 70% 70% at 30% 50%, rgba(0,240,255,0.03) 0%, transparent 70%),
            radial-gradient(ellipse 50% 60% at 80% 40%, rgba(255,45,111,0.03) 0%, transparent 70%)
          `,
        }} />

        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 48px',
          width: '100%',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '80px',
          alignItems: 'center',
        }}>
          {/* Left: Radar */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '32px' }}>
            <div style={{ textAlign: 'left', width: '100%' }}>
              <div style={{
                fontFamily: 'var(--mono)', fontSize: '11px', letterSpacing: '0.14em',
                textTransform: 'uppercase', color: 'var(--cyan)', marginBottom: '12px',
                display: 'flex', alignItems: 'center', gap: '12px',
              }}>
                <span style={{ display: 'block', width: '24px', height: '1px', background: 'var(--cyan)' }} />
                Live Threat Intelligence
              </div>
              <h2 style={{
                fontSize: 'clamp(32px, 4vw, 52px)',
                fontWeight: 800,
                letterSpacing: '-0.04em',
                lineHeight: 1,
                color: '#E8EDF8',
                margin: 0,
              }}>
                Globale<br />
                <span style={{ color: 'var(--cyan)' }}>Bedrohungs</span>lage
              </h2>
            </div>

            <motion.div style={{ opacity: useTransform(springProgress, [0, 0.1], [0, 1]) }}>
              <RadarSVGWrapper progress={springProgress} />
            </motion.div>

            {/* Stats row */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '12px',
              width: '100%',
            }}>
              {[
                { label: 'Aktiv', value: '2.847', color: '#FF2D6F' },
                { label: 'Geblockt', value: '14.2k', color: '#78C864' },
                { label: 'Analysiert', value: '91.4k', color: '#00F0FF' },
              ].map((stat) => (
                <div key={stat.label} style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: '10px',
                  padding: '14px 16px',
                  textAlign: 'center',
                }}>
                  <div style={{ fontSize: '22px', fontWeight: 800, color: stat.color, letterSpacing: '-0.03em' }}>
                    {stat.value}
                  </div>
                  <div style={{ fontSize: '10px', color: 'rgba(232,237,248,0.4)', fontFamily: 'var(--mono)', letterSpacing: '0.08em', textTransform: 'uppercase', marginTop: '4px' }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Threat Log */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              marginBottom: '8px',
            }}>
              <div style={{
                fontFamily: 'var(--mono)', fontSize: '12px', color: 'rgba(232,237,248,0.5)',
                letterSpacing: '0.06em',
              }}>
                // threat-log · echtzeit
              </div>
              <div style={{
                fontFamily: 'var(--mono)', fontSize: '10px',
                padding: '3px 10px', borderRadius: '4px',
                background: 'rgba(255,45,111,0.12)', color: '#FF2D6F',
              }}>
                {THREAT_LOGS.filter(l => l.severity === 'critical').length} KRITISCH
              </div>
            </div>

            {THREAT_LOGS.map((log, i) => (
              <ThreatLogEntry
                key={log.time}
                log={log}
                index={i}
                scrollProgress={springProgress}
                total={THREAT_LOGS.length}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function RadarSVGWrapper({ progress }: { progress: any }) {
  const rawProgress = progress.get ? progress.get() : 0;
  return <RadarSVG progress={rawProgress} />;
}

// Wrapper to use motion value in render
function ThreatLogEntry({
  log,
  index,
  scrollProgress,
  total,
}: {
  log: typeof THREAT_LOGS[0];
  index: number;
  scrollProgress: any;
  total: number;
}) {
  const threshold = index / total;
  const opacity = useTransform(scrollProgress, [threshold * 0.8, threshold * 0.8 + 0.1], [0, 1]);
  const x = useTransform(scrollProgress, [threshold * 0.8, threshold * 0.8 + 0.1], [30, 0]);
  const sev = SEVERITY[log.severity as keyof typeof SEVERITY];

  return (
    <motion.div
      style={{
        opacity,
        x,
        display: 'flex',
        alignItems: 'flex-start',
        gap: '12px',
        padding: '14px 16px',
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: '10px',
        borderLeft: `3px solid ${sev.color}`,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Severity glow */}
      <div style={{
        position: 'absolute', left: 0, top: 0, bottom: 0, width: '80px',
        background: `linear-gradient(90deg, ${sev.color}0A, transparent)`,
        pointerEvents: 'none',
      }} />

      {/* Time */}
      <div style={{
        fontFamily: 'var(--mono)', fontSize: '11px',
        color: 'rgba(232,237,248,0.3)',
        flexShrink: 0, marginTop: '1px',
        minWidth: '58px',
      }}>
        {log.time}
      </div>

      {/* Main */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px',
        }}>
          <span style={{ fontWeight: 700, fontSize: '13px', color: '#E8EDF8' }}>
            {log.type}
          </span>
          <span style={{
            padding: '2px 8px', borderRadius: '3px',
            fontSize: '9px', fontWeight: 700, letterSpacing: '0.06em',
            textTransform: 'uppercase',
            background: sev.bg, color: sev.color,
          }}>
            {sev.label}
          </span>
        </div>
        <div style={{ fontSize: '12px', color: 'rgba(232,237,248,0.45)', fontFamily: 'var(--mono)' }}>
          {log.target}
        </div>
      </div>

      {/* Country */}
      <div style={{
        fontFamily: 'var(--mono)', fontSize: '10px',
        padding: '3px 8px',
        background: 'rgba(255,255,255,0.05)',
        borderRadius: '4px',
        color: 'rgba(232,237,248,0.35)',
        flexShrink: 0,
      }}>
        {log.country}
      </div>
    </motion.div>
  );
}
