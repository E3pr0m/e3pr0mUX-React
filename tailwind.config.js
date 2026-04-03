/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#0a0010',
        primary: '#7c3aed',
        accent: '#06b6d4',
        glow: '#a855f7',
        muted: '#4a5568',
      },
      fontFamily: {
        mono: ['"Space Mono"', 'monospace'],
        sans: ['"Inter"', 'sans-serif'],
      },
      animation: {
        'glitch': 'glitch 2s infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'scanline': 'scanline 8s linear infinite',
      },
      keyframes: {
        glitch: {
          '0%, 100%': { textShadow: '2px 0 #06b6d4, -2px 0 #a855f7' },
          '25%': { textShadow: '-2px 0 #06b6d4, 2px 0 #a855f7', transform: 'translate(-2px, 0)' },
          '50%': { textShadow: '2px 0 #a855f7, -2px 0 #06b6d4', transform: 'translate(2px, 0)' },
          '75%': { textShadow: '-1px 0 #06b6d4, 1px 0 #a855f7', transform: 'translate(0)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px #7c3aed, 0 0 40px #7c3aed30' },
          '50%': { boxShadow: '0 0 40px #a855f7, 0 0 80px #a855f750' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
      },
      backgroundImage: {
        'cyber-grid': 'linear-gradient(rgba(6,182,212,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.03) 1px, transparent 1px)',
        'glow-radial': 'radial-gradient(ellipse at center, #7c3aed20 0%, transparent 70%)',
      },
      backgroundSize: {
        'grid': '60px 60px',
      },
    },
  },
  plugins: [],
}
