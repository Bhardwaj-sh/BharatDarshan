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
          950: '#030712', // Deepest obsidian black
          900: '#050B18', // Primary midnight surface
          850: '#0A1224', // Elevated card surface
          800: '#0F1A36', // Card borders / elevated containers
          750: '#162347',
          700: '#1F305E',
        },
        cyan: {
          300: '#67E8F9',
          400: '#22D3EE',
          500: '#00E5FF', // Electric cyan highlight from prompt
          glow: '#00E5FF',
        },
        sapphire: {
          400: '#38BDF8',
          500: '#0284C7',
          600: '#0369A1',
        },
        champagne: {
          100: '#FEF9E7',
          200: '#FCF3CF',
          300: '#F9E79F',
          400: '#F3E5AB', // Subtle champagne highlight from prompt
          500: '#E6C280',
        },
        amber: {
          400: '#FBBF24',
          500: '#F59E0B',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        display: ['"Outfit"', '"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
      },
      boxShadow: {
        'cyan-glow': '0 0 25px rgba(0, 229, 255, 0.45)',
        'cyan-glow-lg': '0 0 50px rgba(0, 229, 255, 0.7)',
        'champagne-glow': '0 0 25px rgba(243, 229, 171, 0.35)',
        'glass-card': '0 20px 50px rgba(0, 0, 0, 0.65)',
        'floating-panel': '0 25px 60px -10px rgba(0, 0, 0, 0.85), 0 0 30px rgba(0, 229, 255, 0.15)',
      }
    },
  },
  plugins: [],
}
