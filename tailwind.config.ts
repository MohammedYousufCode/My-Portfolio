/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        playfair: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
        mono: ['"DM Mono"', 'monospace'],
      },
      colors: {
        gold: { DEFAULT: '#C9A84C', bright: '#F0C060', dim: '#7a6230' },
        cyan: { DEFAULT: '#4FC3F7', dim: '#1a4a5c' },
        dark: { DEFAULT: '#060810', card: '#0a101e', nav: '#080d1a' },
      },
      animation: {
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
        'scan': 'scan 3s linear infinite',
        'float': 'float 4s ease-in-out infinite',
      },
      keyframes: {
        glowPulse: { '0%,100%': { boxShadow: '0 0 10px rgba(201,168,76,0.3)' }, '50%': { boxShadow: '0 0 30px rgba(201,168,76,0.7)' } },
        scan: { from: { transform: 'translateY(-100%)' }, to: { transform: 'translateY(100vh)' } },
        float: { '0%,100%': { transform: 'translateY(0px)' }, '50%': { transform: 'translateY(-12px)' } },
      },
    },
  },
  plugins: [],
}
