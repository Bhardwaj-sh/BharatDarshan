/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        midnight: {
          950: '#030712', // Deep sleek obsidian
          900: '#0B0F19', // Modern dark surface
          800: '#111827',
          700: '#1E293B',
          600: '#334155',
          500: '#64748B',
        },
        saffron: {
          50: '#FFF7ED',
          100: '#FFEDD5',
          200: '#FED7AA',
          400: '#FB923C',
          500: '#F97316', // Electric vibrant saffron
          600: '#EA580C',
        },
        sunset: {
          start: '#FF5E3A',
          mid: '#FF2A6D',
          end: '#9B51E0'
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        display: ['"Outfit"', '"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 10px 30px -5px rgba(15, 23, 42, 0.06)',
        'card': '0 20px 40px -15px rgba(15, 23, 42, 0.08)',
        'card-hover': '0 25px 50px -12px rgba(249, 115, 22, 0.15)',
        'glow-saffron': '0 10px 30px -5px rgba(249, 115, 22, 0.4)',
        'glow-glass': '0 8px 32px 0 rgba(0, 0, 0, 0.25)',
      }
    },
  },
  plugins: [],
}
