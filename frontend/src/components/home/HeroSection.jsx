import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Compass, Sparkles, ArrowRight, ShieldCheck, Sun } from 'lucide-react';
import BrushDivider from '../common/BrushDivider';

const HERO_SLIDES = [
  {
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=2000&q=85',
    title: 'Misty Alpine Lakes & Snow Peaks',
    location: 'Kashmir & Himachal Pradesh',
    tag: 'Himalayan Sanctuary'
  },
  {
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=2000&q=85',
    title: 'Emerald Backwaters & Sacred Groves',
    location: 'Kerala & Western Ghats',
    tag: 'Coastal & Serene'
  },
  {
    image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=2000&q=85',
    title: 'Golden Thar Dunes & Royal Citadels',
    location: 'Rajasthan Heritage',
    tag: 'Desert Forts'
  },
  {
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=2000&q=85',
    title: 'Living Root Bridges & Cloud Valleys',
    location: 'Meghalaya & Northeast',
    tag: 'Untouched Eden'
  }
];

export default function HeroSection({ onSearch, onSearchSelect }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const navigate = useNavigate();

  // Slide cross-dissolve timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (onSearchSelect) {
      onSearchSelect(searchQuery, selectedCategory);
    } else if (onSearch) {
      onSearch({ search: searchQuery, category: selectedCategory });
      const el = document.getElementById('explore-regions');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate(`/explore?search=${encodeURIComponent(searchQuery)}&category=${encodeURIComponent(selectedCategory)}`);
    }
  };

  const trendingTags = [
    { label: 'Kashmir Mist', query: 'kashmir' },
    { label: 'Rajasthan Royal', query: 'rajasthan' },
    { label: 'Kerala Backwaters', query: 'kerala' },
    { label: 'Ladakh High Passes', query: 'ladakh' },
    { label: 'Varanasi Ghats', query: 'uttar pradesh' }
  ];

  return (
    <div className="relative min-h-[95vh] flex flex-col justify-between bg-forest-950 overflow-hidden pt-28 sm:pt-36">
      {/* Background Animated Slider with Cross-Dissolve */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.6, ease: 'easeInOut' }}
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${HERO_SLIDES[currentSlide].image})`,
            }}
          />
        </AnimatePresence>

        {/* Deep Atmospheric Mist and Indian Forest Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-forest-950/85 via-forest-900/65 to-forest-950/98" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(12,36,29,0.5)_0%,rgba(6,21,16,0.95)_100%)]" />

        {/* Drifting Mist Layer */}
        <div 
          className="absolute inset-0 opacity-25 pointer-events-none animate-mist"
          style={{
            backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(210,245,62,0.18) 0%, transparent 65%)'
          }}
        />

        {/* Massive Ambient Watermark "TOURISM" from reference design */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none text-center w-full z-0">
          <span className="font-display font-black text-7xl sm:text-9xl md:text-[15rem] tracking-widest text-white/[0.04] uppercase block">
            TOURISM
          </span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center my-auto py-12">
        {/* Top Floating Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-forest-900/90 backdrop-blur-md border border-lime-400/40 text-lime-400 text-xs font-bold uppercase tracking-widest shadow-lime-glow mb-6"
        >
          <Sparkles className="w-3.5 h-3.5 animate-pulse text-lime-400" />
          <span>Incredible India • 28 States & 8 Union Territories • 1 Definitive Tour Each</span>
        </motion.div>

        {/* Main Display Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white tracking-tight leading-[1.08] mb-6 drop-shadow-2xl"
        >
          Discover India.{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-300 via-lime-400 to-emerald-400">
            Experience
          </span>{' '}
          Every Journey.
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-slate-200/90 font-medium leading-relaxed mb-10"
        >
          From snow-clad Himalayan passes to emerald tropical lagoons.
          Zero decision fatigue with our server-guaranteed, all-inclusive master itineraries.
        </motion.p>

        {/* Signature Frosted Glass Search Capsule from Reference */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="max-w-4xl mx-auto"
        >
          <form
            onSubmit={handleSearchSubmit}
            className="p-2 sm:p-3 rounded-3xl sm:rounded-full bg-forest-900/90 backdrop-blur-2xl border border-forest-700/80 shadow-[0_20px_50px_rgba(0,0,0,0.7)] flex flex-col sm:flex-row items-center gap-2 sm:gap-3"
          >
            {/* Input 1: Destination / State */}
            <div className="flex-1 flex items-center gap-3 px-4 py-3 sm:py-2 w-full text-left rounded-full hover:bg-forest-800/50 transition-colors">
              <MapPin className="w-5 h-5 text-lime-400 shrink-0" />
              <div className="flex-1">
                <label className="block text-[10px] uppercase font-bold tracking-wider text-slate-400">
                  Destination
                </label>
                <input
                  type="text"
                  placeholder="Where to? (e.g. Rajasthan, Kerala, Ladakh)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent text-sm font-semibold text-white placeholder-slate-400 focus:outline-none"
                />
              </div>
            </div>

            <div className="hidden sm:block w-[1px] h-8 bg-forest-750" />

            {/* Input 2: Experience / Theme */}
            <div className="flex-1 flex items-center gap-3 px-4 py-3 sm:py-2 w-full text-left rounded-full hover:bg-forest-800/50 transition-colors">
              <Compass className="w-5 h-5 text-lime-400 shrink-0" />
              <div className="flex-1">
                <label className="block text-[10px] uppercase font-bold tracking-wider text-slate-400">
                  Experience Type
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full bg-transparent text-sm font-semibold text-white focus:outline-none cursor-pointer"
                >
                  <option value="" className="bg-forest-900 text-white">All 36 Master Itineraries</option>
                  <option value="Himalayan" className="bg-forest-900 text-white">Himalayan & Peaks</option>
                  <option value="Heritage" className="bg-forest-900 text-white">Royal Forts & Palaces</option>
                  <option value="Spiritual" className="bg-forest-900 text-white">Temples & Spiritual</option>
                  <option value="Coastal" className="bg-forest-900 text-white">Coastal & Backwaters</option>
                  <option value="Northeast" className="bg-forest-900 text-white">Northeast Mystique</option>
                </select>
              </div>
            </div>

            {/* Submit Button (Vibrant Neon Lime) */}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="btn-lime w-full sm:w-auto px-8 py-3.5 text-sm font-black whitespace-nowrap shadow-lime-glow flex items-center justify-center gap-2 cursor-pointer"
            >
              <Search className="w-4 h-4 text-forest-950" />
              <span>Explore Tour</span>
            </motion.button>
          </form>

          {/* Quick Trending Tag Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-xs font-medium text-slate-300">
            <span className="text-slate-400 flex items-center gap-1 font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-lime-400" /> Popular:
            </span>
            {trendingTags.map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={() => {
                  setSearchQuery(item.query);
                  if (onSearchSelect) {
                    onSearchSelect(item.query, '');
                  } else if (onSearch) {
                    onSearch({ search: item.query, category: '' });
                    const el = document.getElementById('explore-regions');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="px-3.5 py-1 rounded-full bg-forest-900/70 hover:bg-lime-400 hover:text-forest-950 border border-forest-750 text-slate-300 hover:border-lime-400 transition-all duration-200 cursor-pointer text-xs font-semibold"
              >
                {item.label}
              </button>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Signature White Jagged Torn-Paper / Brush Edge Divider */}
      <BrushDivider
        color="#081D17"
        position="bottom"
        variant={1}
        className="mt-8"
      />
    </div>
  );
}
