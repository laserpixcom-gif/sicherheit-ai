import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        cyber: {
          bg: '#060B18',
          bg2: '#080E1F',
          cyan: '#00F0FF',
          magenta: '#FF2D6F',
          text: '#E8ECF4',
        },
      },
      fontFamily: {
        sans: ['Geist', 'system-ui', 'sans-serif'],
        mono: ['Geist Mono', 'monospace'],
      },
      animation: {
        'ticker': 'ticker 30s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-dot': 'pulseDot 2s infinite',
        'gradient-shift': 'gradientShift 8s ease infinite',
        'blink': 'blink 1s step-end infinite',
        'bounce-scroll': 'bounceScroll 2.5s ease-in-out infinite',
        'border-rotate': 'borderRotate 4s linear infinite',
      },
      keyframes: {
        ticker: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        pulseDot: {
          '0%, 100%': { boxShadow: '0 0 8px var(--cyber-cyan)' },
          '50%': { boxShadow: '0 0 20px var(--cyber-cyan), 0 0 40px rgba(0,240,255,0.3)' },
        },
        gradientShift: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        bounceScroll: {
          '0%, 100%': { transform: 'translateX(-50%) translateY(0)' },
          '50%': { transform: 'translateX(-50%) translateY(8px)' },
        },
        borderRotate: {
          from: { filter: 'hue-rotate(0deg)' },
          to: { filter: 'hue-rotate(360deg)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
