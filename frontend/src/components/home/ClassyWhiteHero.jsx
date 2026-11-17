import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { 
  MapPin, 
  Calendar, 
  Users, 
  Search, 
  ChevronRight, 
  ChevronLeft, 
  Plus, 
  Minus,
  Sparkles, 
  ArrowRight,
  ArrowUpRight,
  Compass,
  Play,
  Pause
} from 'lucide-react';

// Curated high-res panoramic landscapes matching the Egypt luxury poster design
// Saved locally for instantaneous 0-delay switching and preloaded decoded rendering
export const HERO_SCENERIES = [
  {
    id: 'taj-mahal',
    title: 'Taj Mahal',
    location: 'Agra, Uttar Pradesh',
    image: '/images/sceneries/taj-mahal.jpg',
    position: 'center 38%',
    accent: 'Turquoise Reflecting Pool & White Marble',
  },
  {
    id: 'amber-fort',
    title: 'Amber Citadel',
    location: 'Jaipur, Rajasthan',
    image: '/images/sceneries/amber-fort.jpg',
    position: 'center 42%',
    accent: 'Golden Sandstone & Maota Lake',
  },
  {
    id: 'ladakh-peaks',
    title: 'Ladakh Peaks',
    location: 'Ladakh, Himalayas',
    image: '/images/sceneries/ladakh-peaks.jpg',
    position: 'center 48%',
    accent: 'Snow-capped Himalayas & Mountain Highway',
  },
  {
    id: 'varanasi',
    title: 'Varanasi Ghats',
    location: 'Varanasi, Uttar Pradesh',
    image: '/images/sceneries/varanasi.jpg',
    position: 'center 45%',
    accent: 'Sacred Ganga & Golden Sunrise',
  }
];

// Curated Showcase Destinations matching the "Discover the destinations" row from reference
// Expanded to 22 iconic flagship journeys across North, South, East, West, Central, Northeast, and Islands
export const DISCOVER_DESTINATIONS = [
  {
    id: 'rajasthan',
    name: 'Amber Fort',
    state: 'Rajasthan',
    tag: 'Amber Fort • Rajasthan',
    image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80',
    duration: '8 Days',
    price: '₹28,999'
  },
  {
    id: 'kerala',
    name: 'Munnar Hills',
    state: 'Kerala',
    tag: 'Munnar • Kerala',
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80',
    duration: '7 Days',
    price: '₹24,999'
  },
  {
    id: 'jammu-and-kashmir',
    name: 'Dal Lake',
    state: 'Kashmir',
    tag: 'Dal Lake • Kashmir',
    image: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=800&q=80',
    duration: '6 Days',
    price: '₹27,500'
  },
  {
    id: 'ladakh',
    name: 'Pangong Tso',
    state: 'Ladakh',
    tag: 'Pangong • Ladakh',
    image: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=800&q=80',
    duration: '8 Days',
    price: '₹34,999'
  },
  {
    id: 'goa',
    name: 'Palolem Beach',
    state: 'Goa',
    tag: 'Palolem • Goa',
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80',
    duration: '5 Days',
    price: '₹18,500'
  },
  {
    id: 'meghalaya',
    name: 'Living Roots',
    state: 'Meghalaya',
    tag: 'Living Roots • Meghalaya',
    image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80',
    duration: '6 Days',
    price: '₹23,000'
  },
  {
    id: 'uttar-pradesh',
    name: 'Taj Mahal',
    state: 'Uttar Pradesh',
    tag: 'Taj Mahal • Uttar Pradesh',
    image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=800&q=80',
    duration: '5 Days',
    price: '₹21,500'
  },
  {
    id: 'himachal-pradesh',
    name: 'Spiti Valley',
    state: 'Himachal',
    tag: 'Spiti • Himachal',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    duration: '8 Days',
    price: '₹29,999'
  },
  {
    id: 'karnataka',
    name: 'Hampi Ruins',
    state: 'Karnataka',
    tag: 'Hampi • Karnataka',
    image: 'https://images.unsplash.com/photo-1620766182966-c6eb5ed2b788?auto=format&fit=crop&w=800&q=80',
    duration: '6 Days',
    price: '₹22,500'
  },
  {
    id: 'uttarakhand',
    name: 'Rishikesh & Ganga',
    state: 'Uttarakhand',
    tag: 'Rishikesh • Uttarakhand',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
    duration: '5 Days',
    price: '₹19,999'
  },
  {
    id: 'punjab',
    name: 'Golden Temple',
    state: 'Punjab',
    tag: 'Amritsar • Punjab',
    image: 'https://images.unsplash.com/photo-1514222134-b57cbb8ce073?auto=format&fit=crop&w=800&q=80',
    duration: '4 Days',
    price: '₹14,999'
  },
  {
    id: 'gujarat',
    name: 'Rann of Kutch',
    state: 'Gujarat',
    tag: 'White Desert • Gujarat',
    image: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=800&q=80',
    duration: '6 Days',
    price: '₹26,500'
  },
  {
    id: 'maharashtra',
    name: 'Gateway of India',
    state: 'Maharashtra',
    tag: 'Mumbai • Maharashtra',
    image: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=800&q=80',
    duration: '5 Days',
    price: '₹21,000'
  },
  {
    id: 'west-bengal',
    name: 'Darjeeling Hills',
    state: 'West Bengal',
    tag: 'Darjeeling • West Bengal',
    image: 'https://images.unsplash.com/photo-1544634076-a90160ddf44c?auto=format&fit=crop&w=800&q=80',
    duration: '6 Days',
    price: '₹25,500'
  },
  {
    id: 'tamil-nadu',
    name: 'Meenakshi Temple',
    state: 'Tamil Nadu',
    tag: 'Madurai • Tamil Nadu',
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80',
    duration: '5 Days',
    price: '₹23,500'
  },
  {
    id: 'odisha',
    name: 'Konark Sun Temple',
    state: 'Odisha',
    tag: 'Konark • Odisha',
    image: 'https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?auto=format&fit=crop&w=800&q=80',
    duration: '5 Days',
    price: '₹18,000'
  },
  {
    id: 'assam',
    name: 'Kaziranga Safari',
    state: 'Assam',
    tag: 'Kaziranga • Assam',
    image: 'https://images.unsplash.com/photo-1527525443983-6e60c75fff46?auto=format&fit=crop&w=800&q=80',
    duration: '6 Days',
    price: '₹24,000'
  },
  {
    id: 'sikkim',
    name: 'Tsomgo Alpine Lake',
    state: 'Sikkim',
    tag: 'Tsomgo • Sikkim',
    image: 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=800&q=80',
    duration: '6 Days',
    price: '₹26,000'
  },
  {
    id: 'madhya-pradesh',
    name: 'Khajuraho Temples',
    state: 'Madhya Pradesh',
    tag: 'Khajuraho • MP',
    image: 'https://images.unsplash.com/photo-1608889825103-eb5ed706fc64?auto=format&fit=crop&w=800&q=80',
    duration: '5 Days',
    price: '₹21,500'
  },
  {
    id: 'andaman-and-nicobar',
    name: 'Radhanagar Coral Bay',
    state: 'Andaman',
    tag: 'Havelock • Andaman',
    image: 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=800&q=80',
    duration: '7 Days',
    price: '₹36,000'
  },
  {
    id: 'chhattisgarh',
    name: 'Chitrakote Falls',
    state: 'Chhattisgarh',
    tag: 'Chitrakote • Chhattisgarh',
    image: 'https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&w=800&q=80',
    duration: '6 Days',
    price: '₹18,450'
  },
  {
    id: 'arunachal-pradesh',
    name: 'Tawang Monastery',
    state: 'Arunachal',
    tag: 'Tawang • Arunachal',
    image: 'https://images.unsplash.com/photo-1571401835393-8c5f35328320?auto=format&fit=crop&w=800&q=80',
    duration: '7 Days',
    price: '₹28,500'
  }
];

export default function ClassyWhiteHero({ onSelectDestination, onReplayIntro }) {
  const navigate = useNavigate();
  const carouselRef = useRef(null);

  // Active luxury scenery matching Egypt reference layout (default: Taj Mahal at index 0)
  const [activeSceneryIndex, setActiveSceneryIndex] = useState(0);
  const activeScenery = HERO_SCENERIES[activeSceneryIndex];

  // Preload all destination scenery images immediately so switching is 100% instantaneous
  useEffect(() => {
    HERO_SCENERIES.forEach((scenery) => {
      const img = new Image();
      img.src = scenery.image;
    });
  }, []);

  // Smooth Motion Controls
  const [motionMode, setMotionMode] = useState('flow'); // 'flow' (Continuous GPU Glide) | 'slide' (Stepped Auto-Slide)
  const [isPaused, setIsPaused] = useState(false);

  // Step Carousel Scroll Handler
  const scrollCarousel = (direction) => {
    if (carouselRef.current) {
      const cardWidth = 320;
      const gap = 24;
      const step = cardWidth + gap;
      carouselRef.current.scrollBy({
        left: direction === 'next' ? step : -step,
        behavior: 'smooth'
      });
    }
  };

  // Stepped Auto-Slide Engine (Smooth, No Jitter, Pauses on Hover)
  useEffect(() => {
    if (motionMode !== 'slide' || isPaused) return;

    const interval = setInterval(() => {
      if (!carouselRef.current) return;
      const container = carouselRef.current;
      const cardWidth = 320;
      const gap = 24;
      const step = cardWidth + gap;
      const maxScroll = container.scrollWidth - container.clientWidth;

      if (container.scrollLeft >= maxScroll - 20) {
        container.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        container.scrollBy({ left: step, behavior: 'smooth' });
      }
    }, 4500);

    return () => clearInterval(interval);
  }, [motionMode, isPaused]);

  const handleSearchSubmit = () => {
    const target = DISCOVER_DESTINATIONS.find(d => selectedLocation.includes(d.state) || selectedLocation.includes(d.name));
    if (target) {
      navigate(`/region/${target.id}`);
    } else {
      const el = document.getElementById('interactive-map');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCardClick = (dest) => {
    if (onSelectDestination) {
      onSelectDestination(dest.id);
    }
    navigate(`/region/${dest.id}`);
  };

  return (
    <div className="relative w-full bg-[#FAF6F0] text-slate-900 overflow-hidden">
      
      {/* 1. CINEMATIC FULL-BLEED EGYPT-STYLE LUXURY HERO SECTION */}
      <div className="relative w-full h-[88vh] sm:h-[92vh] md:h-screen min-h-[640px] max-h-[960px] overflow-hidden select-none bg-slate-950">
        
        {/* Full-bleed high-res Scenic Landscape Backgrounds (Stacked for instant 0.3s GPU crossfade) */}
        <div className="absolute inset-0">
          {HERO_SCENERIES.map((scenery, idx) => {
            const isActive = activeSceneryIndex === idx;
            return (
              <div 
                key={scenery.id}
                aria-hidden={!isActive}
                className={`absolute inset-0 bg-cover transition-opacity duration-300 ease-out will-change-[opacity] ${
                  isActive ? 'opacity-100 z-1 pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'
                }`}
                style={{
                  backgroundImage: `url('${scenery.image}')`,
                  backgroundPosition: scenery.position || 'center 40%'
                }}
              />
            );
          })}
        </div>

        {/* Top atmospheric shadow gradient for crystal-clear floating navbar */}
        <div className="absolute top-0 left-0 right-0 h-44 bg-gradient-to-b from-black/60 via-black/20 to-transparent pointer-events-none z-10" />

        {/* Bottom atmospheric dark gradient for pristine readability of metrics & CTA */}
        <div className="absolute bottom-0 left-0 right-0 h-80 bg-gradient-to-t from-black/85 via-black/40 to-transparent pointer-events-none z-10" />

        {/* Subtle overall cinematic vignette */}
        <div className="absolute inset-0 bg-black/10 pointer-events-none z-10" />

        {/* 2. THE SIGNATURE DISPLAY TYPOGRAPHY: "INDIA"
               Matching user reference "EGYPT" design:
               - Giant, ultra-bold, modern sans-serif letters
               - Sitting high in the sky with clear contrast
               - Clean drop shadow, zero mixing with foreground boats/trees */}
        <div className="absolute top-[20%] sm:top-[18%] md:top-[16%] lg:top-[15%] left-0 right-0 flex justify-center pointer-events-none z-20 px-4">
          <motion.h1
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-black tracking-normal text-white uppercase text-center text-7xl sm:text-9xl md:text-[11rem] lg:text-[14rem] xl:text-[16rem] leading-none drop-shadow-[0_14px_45px_rgba(0,0,0,0.45)]"
          >
            INDIA
          </motion.h1>
        </div>

        {/* 3. BOTTOM-LEFT INFORMATION & METRIC STATS
               Exact 1:1 match of the Egypt reference:
               - 3 Columns of metric stats (50k+ Happy Travelers, 500+ Curated Journeys, 36 States & UTs)
               - White pill button [ Book Now (↗) ]
               - Evocative narrative quote adjacent to CTA */}
        <div className="absolute bottom-0 left-0 right-0 z-30 px-6 sm:px-12 lg:px-16 pb-8 sm:pb-12 md:pb-14">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            
            {/* Left Content Cluster */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col"
            >
              {/* 3 Metric Columns */}
              <div className="grid grid-cols-3 gap-6 sm:gap-10 md:gap-14 max-w-lg mb-6 sm:mb-8">
                <div>
                  <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight drop-shadow-md">
                    50k+
                  </div>
                  <div className="text-xs sm:text-sm text-white/80 font-medium mt-1 drop-shadow-sm">
                    Happy Travelers
                  </div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight drop-shadow-md">
                    500+
                  </div>
                  <div className="text-xs sm:text-sm text-white/80 font-medium mt-1 drop-shadow-sm">
                    Curated Journeys
                  </div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight drop-shadow-md">
                    36
                  </div>
                  <div className="text-xs sm:text-sm text-white/80 font-medium mt-1 drop-shadow-sm">
                    States & UTs Covered
                  </div>
                </div>
              </div>

              {/* Action & Narrative Row */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                {/* White Pill Button [ Book Now (↗) ] */}
                <a
                  href="#interactive-map"
                  className="group inline-flex items-center gap-3 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-white text-slate-900 font-extrabold text-xs sm:text-sm shadow-[0_10px_30px_rgba(0,0,0,0.35)] hover:bg-slate-100 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer flex-shrink-0"
                >
                  <span>Book Now</span>
                  <span className="flex items-center justify-center w-7 h-7 rounded-full border border-slate-300 group-hover:rotate-45 group-hover:border-slate-900 transition-all duration-300">
                    <ArrowUpRight className="w-4 h-4 text-slate-900" />
                  </span>
                </a>

                {/* Narrative Quote */}
                <p className="text-xs sm:text-sm text-white/90 max-w-md sm:max-w-lg leading-relaxed font-normal drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
                  Journey across regal citadels, sacred rivers, and timeless landscapes — because every path leads to new discoveries.
                </p>
              </div>
            </motion.div>

            {/* Right Ambient Scenery Switcher */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.4 }}
              className="flex items-center gap-2 self-start lg:self-end"
            >
              <div className="flex items-center gap-1.5 p-1.5 rounded-full bg-black/45 backdrop-blur-xl border border-white/20 shadow-2xl">
                {HERO_SCENERIES.map((scenery, idx) => (
                  <button
                    key={scenery.id}
                    onClick={() => setActiveSceneryIndex(idx)}
                    className={`px-3 sm:px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 cursor-pointer ${
                      activeSceneryIndex === idx
                        ? 'bg-white text-slate-900 shadow-md font-bold scale-100'
                        : 'text-white/75 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <span>{scenery.title}</span>
                  </button>
                ))}
              </div>
            </motion.div>

          </div>
        </div>

      </div>

      {/* 3. "DISCOVER THE DESTINATIONS" CAROUSEL (Warm Royal Sandstone Canvas, Zero Jitter, Balanced Spacing) */}
      <div className="relative w-full pt-10 sm:pt-14 pb-12 sm:pb-14 overflow-hidden bg-gradient-to-b from-[#FBF8F3] via-[#FAF5EE] to-[#F5EFEB] border-b border-amber-900/10">
        
        {/* Subtle Decorative Ambient Radial Glow */}
        <div 
          className="absolute top-0 right-1/4 w-[600px] h-[300px] pointer-events-none opacity-40"
          style={{
            background: 'radial-gradient(circle, rgba(245, 158, 11, 0.08) 0%, rgba(217, 119, 6, 0.02) 50%, transparent 70%)'
          }}
        />

        {/* Section Header with Mode Switcher, Play/Pause, and Arrow Controls (Contained within max-w-7xl) */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 sm:mb-8 relative z-10">
        
        {/* Section Header with Mode Switcher, Play/Pause, and Arrow Controls */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-900 text-xs font-mono font-bold uppercase tracking-wider mb-2.5 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>22 Flagship Journeys Across India</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight font-display">
              Discover the <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-700 via-orange-600 to-amber-900">destinations</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 font-normal">
              Immerse in iconic landscapes across all 28 Indian States & 8 Union Territories
            </p>
          </div>

          {/* Interactive Controls */}
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            {/* Motion Mode Switcher: Flow vs Slide */}
            <div className="inline-flex items-center p-1 rounded-full bg-slate-100 border border-slate-200/80 text-xs font-semibold shadow-inner">
              <button
                type="button"
                onClick={() => setMotionMode('flow')}
                className={`px-3 py-1.5 rounded-full transition-all cursor-pointer flex items-center gap-1.5 ${
                  motionMode === 'flow'
                    ? 'bg-slate-900 text-white shadow-sm font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Continuous Smooth Glide (Zero Jitter)"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Smooth Flow</span>
              </button>
              <button
                type="button"
                onClick={() => setMotionMode('slide')}
                className={`px-3 py-1.5 rounded-full transition-all cursor-pointer flex items-center gap-1.5 ${
                  motionMode === 'slide'
                    ? 'bg-slate-900 text-white shadow-sm font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Auto-Stepping Card Slider"
              >
                <Compass className="w-3.5 h-3.5 text-cyan-400" />
                <span>Auto-Slide</span>
              </button>
            </div>

            {/* Play / Pause Toggle Button */}
            <button
              type="button"
              onClick={() => setIsPaused(!isPaused)}
              className="p-2.5 rounded-full border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 shadow-sm transition-all cursor-pointer"
              title={isPaused ? 'Resume Sliding Motion' : 'Pause Sliding Motion'}
              aria-label={isPaused ? 'Play' : 'Pause'}
            >
              {isPaused ? (
                <Play className="w-4 h-4 text-emerald-600 fill-current" />
              ) : (
                <Pause className="w-4 h-4 text-slate-600" />
              )}
            </button>

            {/* Carousel Arrow Controls matching reference */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  if (motionMode === 'flow') setMotionMode('slide');
                  scrollCarousel('prev');
                }}
                className="w-10 h-10 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 flex items-center justify-center shadow-sm hover:shadow transition-all cursor-pointer active:scale-95"
                aria-label="Previous Destinations"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={() => {
                  if (motionMode === 'flow') setMotionMode('slide');
                  scrollCarousel('next');
                }}
                className="w-10 h-10 rounded-full bg-slate-900 hover:bg-slate-800 text-white flex items-center justify-center shadow-md hover:shadow-lg transition-all cursor-pointer active:scale-95"
                aria-label="Next Destinations"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
        </div>

        {/* Carousel Container (Full-Bleed Edge-to-Edge) */}
        {motionMode === 'flow' ? (
          /* ========================================================================= */
          /* MODE 1: CONTINUOUS SMOOTH FLOW (Infinite GPU Marquee, 100% Zero Jitter)   */
          /* Continuous glide - Does NOT stop on mouse hover per user requirement      */
          /* ========================================================================= */
          <div className="w-full overflow-hidden relative group pb-4">
            {/* Blur gradients removed per user request for pure edge-to-edge slide */}

            <div className={`animate-infinite-flow flex items-center gap-5 sm:gap-6 ${isPaused ? 'animate-infinite-flow-paused' : ''}`}>
              {/* Duplicate cards seamlessly for infinite unbroken glide */}
              {[...DISCOVER_DESTINATIONS, ...DISCOVER_DESTINATIONS].map((dest, idx) => (
                <div
                  key={`${dest.id}-${idx}`}
                  onClick={() => handleCardClick(dest)}
                  className="destination-card flex-shrink-0 w-64 sm:w-72 md:w-80 h-88 sm:h-96 rounded-3xl overflow-hidden relative cursor-pointer group/card shadow-[0_10px_30px_rgba(0,0,0,0.08)] hover:shadow-[0_25px_50px_rgba(0,0,0,0.22)] transition-all duration-500 hover:-translate-y-2 border border-slate-100"
                >
                  {/* Destination Image with Zoom on Hover */}
                  <img
                    src={dest.image}
                    alt={dest.name}
                    loading="eager" onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1506461883276-594a12b11cf3?auto=format&fit=crop&w=800&q=80"; }}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover/card:scale-110"
                  />

                  {/* Gentle Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

                  {/* Top Tag Pill matching reference */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[11px] font-bold text-slate-800 shadow-md">
                      <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                      <span>{dest.tag}</span>
                    </span>
                  </div>

                  {/* Bottom Card Meta */}
                  <div className="absolute bottom-5 left-5 right-5 z-10 text-white">
                    <h3 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-white group-hover/card:text-amber-200 transition-colors">
                      {dest.name}
                    </h3>
                    <div className="flex items-center justify-between text-xs mt-1.5 text-slate-200 font-medium">
                      <span>{dest.duration} Master Itinerary</span>
                      <span className="font-bold text-amber-300 font-mono">{dest.price}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* ========================================================================= */
          /* MODE 2: STEPPED AUTO-SLIDE CAROUSEL (Smooth Programmatic Scroll)          */
          /* ========================================================================= */
          <div 
            ref={carouselRef}
            className="flex items-center gap-5 sm:gap-6 overflow-x-auto pb-4 no-scrollbar smooth-scroll-x"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {DISCOVER_DESTINATIONS.map((dest) => (
              <div
                key={dest.id}
                onClick={() => handleCardClick(dest)}
                className="destination-card flex-shrink-0 w-64 sm:w-72 md:w-80 h-88 sm:h-96 rounded-3xl overflow-hidden relative cursor-pointer group shadow-[0_10px_30px_rgba(0,0,0,0.08)] hover:shadow-[0_25px_50px_rgba(0,0,0,0.22)] transition-all duration-500 hover:-translate-y-2 border border-slate-100"
              >
                {/* Destination Image with Zoom on Hover */}
                <img
                  src={dest.image}
                  alt={dest.name}
                  loading="eager" onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1506461883276-594a12b11cf3?auto=format&fit=crop&w=800&q=80"; }}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />

                {/* Gentle Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

                {/* Top Tag Pill matching reference */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[11px] font-bold text-slate-800 shadow-md">
                    <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                    <span>{dest.tag}</span>
                  </span>
                </div>

                {/* Bottom Card Meta */}
                <div className="absolute bottom-5 left-5 right-5 z-10 text-white">
                  <h3 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-white group-hover:text-amber-200 transition-colors">
                    {dest.name}
                  </h3>
                  <div className="flex items-center justify-between text-xs mt-1.5 text-slate-200 font-medium">
                    <span>{dest.duration} Master Itinerary</span>
                    <span className="font-bold text-amber-300 font-mono">{dest.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

    </div>
  );
}
