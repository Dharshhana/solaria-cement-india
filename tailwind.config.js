/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        canvas: '#0A192F',
        surface: '#112240',
        ink: '#FFFFFF',
        cyan: {
          DEFAULT: '#00FFFF',
          glow: 'rgba(0, 255, 255, 0.35)',
          soft: 'rgba(0, 255, 255, 0.12)',
        },
        amber: {
          DEFAULT: '#FFBF00',
          glow: 'rgba(255, 191, 0, 0.35)',
          soft: 'rgba(255, 191, 0, 0.12)',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'cyan-glow': '0 0 40px rgba(0, 255, 255, 0.25)',
        'amber-glow': '0 0 40px rgba(255, 191, 0, 0.25)',
        'card': '0 20px 60px -20px rgba(0, 0, 0, 0.6)',
      },
      keyframes: {
        ripple: {
          '0%': { transform: 'scale(0)', opacity: '0.6' },
          '100%': { transform: 'scale(2.5)', opacity: '0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        ripple: 'ripple 1.2s ease-out forwards',
        float: 'float 6s ease-in-out infinite',
        shimmer: 'shimmer 3s linear infinite',
      },
    },
  },
  plugins: [],
};
