/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        cairo: ['Cairo', 'sans-serif'],
      },
      colors: {
        gold: {
          50:  '#fdfbf0',
          100: '#faf5d3',
          200: '#f5e99e',
          300: '#edd85e',
          400: '#e4c532',
          500: '#c8a820',
          600: '#a07f14',
          700: '#7a5e10',
          800: '#614b12',
          900: '#523f14',
        },
        stone: {
          950: '#0f0e0c',
        },
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}
