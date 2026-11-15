/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          950: '#091411',
          900: '#0D1D19',
          800: '#142B25', // Main deep forest green
          700: '#1C3B33',
          600: '#285247',
          500: '#3B5B4F',
        },
        gold: {
          300: '#F3DAB0',
          400: '#E5BA7D',
          500: '#D5A45D', // Main warm golden accent
          600: '#B8863A',
          700: '#8E6322',
        },
        ivory: {
          50: '#FCFAF7',
          100: '#F5F0E7', // Main warm ivory
          200: '#EBE4D5',
          300: '#DDD3BF',
        },
        charcoal: {
          900: '#191C22',
          800: '#252A32', // Main charcoal
          700: '#343A44',
          600: '#4D5460',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 10px 30px -5px rgba(20, 43, 37, 0.08)',
        'card': '0 14px 34px -10px rgba(13, 29, 25, 0.12)',
        'glow-gold': '0 0 25px -5px rgba(213, 164, 93, 0.3)',
      }
    },
  },
  plugins: [],
}
