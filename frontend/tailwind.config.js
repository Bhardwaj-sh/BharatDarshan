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
          950: '#071611', // Deepest atmospheric black-emerald
          900: '#0B2019', // Primary reference dark forest green
          850: '#0E2920', // Card surface
          800: '#14382C', // Card borders / elevated surfaces
          750: '#1A4537',
          700: '#235847',
          600: '#327761',
          500: '#439A80',
          400: '#64B89F',
        },
        lime: {
          300: '#E4F965',
          400: '#D2F53E', // Primary reference neon lime accent
          500: '#C2E828',
          600: '#A6C915',
        },
        cream: {
          50: '#FAFAF7', // Warm off-white reference canvas
          100: '#F4F5EE',
          200: '#E7E9DC',
          300: '#D6D9C8',
        },
        midnight: {
          950: '#030712',
          900: '#0B0F19',
          800: '#111827',
        },
        saffron: {
          400: '#FB923C',
          500: '#F97316',
          600: '#EA580C',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        display: ['"Outfit"', '"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
      },
      boxShadow: {
        'soft': '0 10px 30px -5px rgba(11, 32, 25, 0.08)',
        'card': '0 20px 40px -15px rgba(11, 32, 25, 0.12)',
        'lime-glow': '0 0 25px rgba(210, 245, 62, 0.45)',
        'lime-glow-lg': '0 0 45px rgba(210, 245, 62, 0.65)',
        'forest-glow': '0 10px 40px -10px rgba(11, 32, 25, 0.5)',
      }
    },
  },
  plugins: [],
}
