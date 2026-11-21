import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#FAF7F2', sand: '#F1EAE0', beige: '#E8DECF', charcoal: '#23211E',
        ink: '#2B2A27', wood: '#B08968', woodDark: '#8B6A4B', sage: '#5E7A5E',
        sageDark: '#46603F', muted: '#7A746B',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 10px 40px -20px rgba(35,33,30,0.25)',
        card: '0 20px 60px -30px rgba(35,33,30,0.35)',
      },
      keyframes: {
        confetti: { '0%': { transform: 'translateY(0) rotate(0)', opacity: '1' }, '100%': { transform: 'translateY(600px) rotate(720deg)', opacity: '0' } },
        'fade-up': { '0%': { opacity: '0', transform: 'translateY(20px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
      },
      animation: {
        'fade-up': 'fade-up 0.7s ease-out forwards',
        confetti: 'confetti 3s ease-in forwards',
      },
    },
  },
  plugins: [],
};
export default config;