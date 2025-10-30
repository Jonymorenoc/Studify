import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#7F6BFF',
        'primary-dark': '#6A54FF',
        secondary: '#F38DE0',
        accent: '#FFCA87',
        success: '#44D19C',
        warning: '#FFD166',
        error: '#F77F91',
        surface: '#F5F4FF',
        'surface-soft': '#FAF9FF',
        'surface-strong': '#FFFFFF',
        'surface-alt': '#EDEBFF',
        muted: '#7E8AA9',
        ink: '#433D66',
      },
      boxShadow: {
        glow: '0 20px 40px -20px rgba(103, 81, 255, 0.4)',
      },
      backgroundImage: {
        'card-header': 'linear-gradient(110deg, rgba(103,81,255,0.18), rgba(103,81,255,0.05))',
        'progress-track': 'linear-gradient(90deg, rgba(103,81,255,0.15), rgba(45,212,191,0.15))',
      },
      keyframes: {
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(12px) scale(0.98)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        'pulse-star': {
          '0%, 100%': { transform: 'scale(0.92)', opacity: '0.7' },
          '50%': { transform: 'scale(1.08)', opacity: '1' },
        },
      },
      animation: {
        'fade-in-up': 'fade-in-up 320ms ease forwards',
        'pulse-star': 'pulse-star 900ms ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

export default config
