/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        pixel: ['"Press Start 2P"', 'monospace'],
        display: ['"Cinzel Decorative"', 'serif'],
        body: ['"Cormorant Garamond"', 'serif'],
        mono: ['"Space Mono"', 'monospace'],
      },
      colors: {
        cream: '#F5F0E8',
        parchment: '#EDE8DC',
        inkBlack: '#1A1410',
        dustyRose: '#D4879C',
        blushPink: '#E8A0B4',
        deepNavy: '#0D1B2A',
        midnightBlue: '#1B2A4A',
        cosmicPurple: '#2D1B4E',
        goldenHour: '#C8A96E',
        paleGold: '#E8D5A3',
      },
      animation: {
        'gear-cw': 'spin 3s linear infinite',
        'gear-ccw': 'spin-reverse 3s linear infinite',
        'float': 'float 3s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
      },
      keyframes: {
        'spin-reverse': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(-360deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.6', filter: 'blur(8px)' },
          '50%': { opacity: '1', filter: 'blur(4px)' },
        },
      },
    },
  },
  plugins: [],
}
