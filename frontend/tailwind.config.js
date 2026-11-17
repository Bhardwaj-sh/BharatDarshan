/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Deep Forest / Emerald Night Palette (used across modals, regions, itineraries)
        forest: {
          950: '#060E0B',
          900: '#0B1C15',
          850: '#12291E',
          800: '#1A3628',
          750: '#234434',
          700: '#2E5441',
        },
        // Deep Warm Charcoal / Obsidian night base (eliminating cold mono-blue)
        midnight: {
          950: '#06070B', // Deep warm obsidian night
          900: '#0E1017', // Warm charcoal surface
          850: '#141722', // Elevated container
          800: '#1C2030', // Card surface
          750: '#252B40',
          700: '#303752',
        },
        // Indian Saffron & Marigold
        saffron: {
          300: '#FDBA74',
          400: '#FB923C',
          500: '#F97316',
          600: '#EA580C',
        },
        marigold: {
          300: '#FDE047',
          400: '#FACC15',
          500: '#EAB308',
          600: '#CA8A04',
        },
        // Imperial Gold & Champagne
        gold: {
          100: '#FEF9E7',
          200: '#FCF3CF',
          300: '#FDE68A',
          400: '#FCD34D',
          500: '#F59E0B',
          600: '#D97706',
        },
        // Lush Emerald & Malabar Jade
        emerald: {
          300: '#6EE7B7',
          400: '#34D399',
          500: '#10B981',
          600: '#059669',
          700: '#047857',
        },
        // Peacock Turquoise & Lagoon Teal
        turquoise: {
          300: '#5EEAD4',
          400: '#2DD4BF',
          500: '#14B8A6',
          600: '#0D9488',
        },
        // Dravidian Coral & Ruby Red
        coral: {
          300: '#FDA4AF',
          400: '#FB7185',
          500: '#F43F5E',
          600: '#E11D48',
          700: '#BE123C',
        },
        // Royal Silk Violet & Kashmiri Saffron Purple
        royal: {
          300: '#D8B4FE',
          400: '#C084FC',
          500: '#A855F7',
          600: '#9333EA',
          700: '#7E22CE',
          800: '#581C87',
        },
        // Accent Electric Cyan for subtle contrast
        cyan: {
          300: '#67E8F9',
          400: '#22D3EE',
          500: '#00E5FF',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        display: ['"Outfit"', '"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
      },
      boxShadow: {
        'gold-glow': '0 0 25px rgba(245, 158, 11, 0.45)',
        'gold-glow-lg': '0 0 50px rgba(245, 158, 11, 0.7)',
        'saffron-glow': '0 0 25px rgba(249, 115, 22, 0.45)',
        'emerald-glow': '0 0 25px rgba(16, 185, 129, 0.45)',
        'coral-glow': '0 0 25px rgba(244, 63, 94, 0.45)',
        'purple-glow': '0 0 25px rgba(168, 85, 247, 0.45)',
        'cyan-glow': '0 0 25px rgba(0, 229, 255, 0.4)',
        'floating-panel': '0 25px 60px -10px rgba(0, 0, 0, 0.85), 0 0 35px rgba(245, 158, 11, 0.12)',
      }
    },
  },
  plugins: [],
}
