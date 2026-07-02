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
      animation: {
        'bounce-slow': 'bounce 3s infinite',
      },
    },
  },
  plugins: [],
};
