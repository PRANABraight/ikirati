import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#166534', // green-800
          dark: '#14532d', // green-900
          darker: '#052e16', // green-950
          light: '#f0fdf4', // green-50
        },
        accent: {
          DEFAULT: '#d97706', // amber-600
          dark: '#78350f', // amber-900
          light: '#fffbeb', // amber-50
          soft: '#fef3c7', // amber-100
        },
      },
      keyframes: {
        'fade-in-up': {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        blob: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '33%': { transform: 'translate(30px, -40px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
        },
      },
      animation: {
        'bounce-slow': 'bounce 3s infinite',
        'fade-in-up': 'fade-in-up 0.7s ease-out both',
        'float-slow': 'float-slow 6s ease-in-out infinite',
        blob: 'blob 12s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [typography],
};
