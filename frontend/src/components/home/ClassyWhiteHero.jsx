import React, { useState, useRef } from 'react';
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
  Compass
} from 'lucide-react';

// Curated Showcase Destinations matching the "Discover the destinations" row from reference
const DISCOVER_DESTINATIONS = [
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
    name: 'Varanasi Ghats',
    state: 'Uttar Pradesh',
    tag: 'Varanasi • UP',
    image: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=800&q=80',
    duration: '4 Days',
    price: '₹16,500'
  },
  {
    id: 'himachal-pradesh',
    name: 'Spiti Valley',
    state: 'Himachal',
    tag: 'Spiti • Himachal',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    duration: '8 Days',
    price: '₹29,999'
  }
];

export default function ClassyWhiteHero({ onSelectDestination }) {
  const navigate = useNavigate();
  const carouselRef = useRef(null);

  // Search island state matching reference layout
  const [activeTab, setActiveTab] = useState('tours'); // 'tours' | 'destinations' | 'things'
  const [selectedLocation, setSelectedLocation] = useState('Rajasthan (Amber Fort)');
  const [selectedDate, setSelectedDate] = useState('November 2026');
  const [guestCount, setGuestCount] = useState(2);
  const [showLocationPicker, setShowLocationPicker] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const scrollCarousel = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = 320;
      carouselRef.current.scrollBy({
        left: direction === 'next' ? scrollAmount : -scrollAmount,
        behavior: 'smooth'
      });
    }
  };

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
    <div className="relative w-full bg-white text-slate-900 overflow-hidden">
      
      {/* 1. CINEMATIC FULL-BLEED MOUNTAIN & RIVER LANDSCAPE HERO (Matching Vietnam reference) */}
      <div className="relative w-full h-[640px] sm:h-[720px] md:h-[800px] overflow-hidden">
        
        {/* Full-bleed high-res Indian Scenic Landscape: Lush mountain karst, valley, mist */}
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-100"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1506461883276-594a12b11cf3?auto=format&fit=crop&w=2000&q=85')`,
            backgroundPosition: 'center 40%'
          }}
        />

        {/* Soft natural sunlight atmospheric overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-transparent pointer-events-none" />

        {/* The Signature Misty Cloud Gradient Fade into Pure White (Exact visual from reference) */}
        <div className="absolute bottom-0 left-0 right-0 h-72 sm:h-96 bg-gradient-to-t from-white via-white/85 to-transparent pointer-events-none" />
        <div className="absolute -bottom-8 left-0 right-0 h-28 bg-white filter blur-xl pointer-events-none" />

        {/* Centered Editorial Serif Headline & Subtitle */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 h-full flex flex-col items-center justify-center text-center pt-16 sm:pt-20">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center"
          >
            {/* Massive Editorial Serif Title: "India" matching "Vietnam" from reference */}
            <h1 className="font-serif text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-normal tracking-tight text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.35)] select-none">
              India
            </h1>

            {/* Subtitle: "A FEAST FOR THE EYE AND SOUL" matching "A FEAST FOR THE EYE AND MOUTH" */}
            <p className="mt-2 sm:mt-3 text-xs sm:text-sm md:text-base uppercase tracking-[0.28em] font-semibold text-white/95 drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]">
              A Feast For The Eye And Soul
            </p>

            {/* Pill CTA: "BOOK NOW" matching reference */}
            <div className="mt-6 sm:mt-8">
              <a
                href="#interactive-map"
                className="inline-flex items-center gap-2 px-8 py-3 rounded-full border border-white/80 bg-white/10 hover:bg-white text-white hover:text-slate-900 text-xs sm:text-sm font-bold uppercase tracking-widest backdrop-blur-md transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.2)] hover:shadow-[0_8px_30px_rgba(255,255,255,0.4)] hover:scale-105"
              >
                <span>Book Now</span>
              </a>
            </div>
          </motion.div>

        </div>
      </div>

      {/* 2. THE FLOATING FROSTED GLASS SEARCH ISLAND (Overlapping the hero and content) */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 -mt-28 sm:-mt-32 md:-mt-36">
        
        <div className="glass-search-island rounded-[28px] p-4 sm:p-6 shadow-[0_20px_60px_-15px_rgba(15,23,42,0.14)] border border-white/80 bg-white/85 backdrop-blur-2xl">
          
          {/* Top Navigation Tabs matching "Flights | Hotels | Things to do" */}
          <div className="flex items-center gap-6 sm:gap-8 border-b border-slate-200/70 pb-3 px-2 sm:px-4 text-xs sm:text-sm">
            <button
              onClick={() => setActiveTab('tours')}
              className={`font-semibold pb-2 -mb-[13px] transition-all cursor-pointer ${
                activeTab === 'tours'
                  ? 'text-slate-900 border-b-2 border-slate-900 font-bold'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Flagship Tours
            </button>
            <button
              onClick={() => setActiveTab('destinations')}
              className={`font-semibold pb-2 -mb-[13px] transition-all cursor-pointer ${
                activeTab === 'destinations'
                  ? 'text-slate-900 border-b-2 border-slate-900 font-bold'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Destinations
            </button>
            <button
              onClick={() => setActiveTab('things')}
              className={`font-semibold pb-2 -mb-[13px] transition-all cursor-pointer ${
                activeTab === 'things'
                  ? 'text-slate-900 border-b-2 border-slate-900 font-bold'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Things to do
            </button>
          </div>

          {/* Form Columns: Location | Date | Guests | Circular Dark Search Button */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center pt-4 px-2 sm:px-4">
            
            {/* 1. Location Column */}
            <div className="md:col-span-4 relative border-b md:border-b-0 md:border-r border-slate-200/70 pb-3 md:pb-0 md:pr-4">
              <div 
                onClick={() => { setShowLocationPicker(!showLocationPicker); setShowDatePicker(false); }}
                className="cursor-pointer group"
              >
                <div className="flex items-center gap-2 text-slate-800 text-xs sm:text-sm font-bold">
                  <MapPin className="w-4 h-4 text-slate-800 group-hover:text-amber-600 transition-colors" />
                  <span>Location</span>
                </div>
                <div className="mt-0.5 text-xs text-slate-500 font-medium truncate">
                  {selectedLocation || 'Where do you want to go?'}
                </div>
              </div>

              {/* Location Dropdown */}
              <AnimatePresence>
                {showLocationPicker && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    className="absolute top-full left-0 mt-3 w-64 bg-white rounded-2xl shadow-xl border border-slate-200 p-2 z-50 text-xs"
                  >
                    <div className="px-3 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      Popular Indian Regions
                    </div>
                    {DISCOVER_DESTINATIONS.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => {
                          setSelectedLocation(`${item.state} (${item.name})`);
                          setShowLocationPicker(false);
                        }}
                        className="w-full text-left px-3 py-2 rounded-xl hover:bg-slate-100 flex items-center justify-between text-slate-800 transition-colors"
                      >
                        <span className="font-semibold">{item.name}</span>
                        <span className="text-[11px] text-slate-400">{item.state}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 2. Date Column */}
            <div className="md:col-span-4 relative border-b md:border-b-0 md:border-r border-slate-200/70 pb-3 md:pb-0 md:pr-4">
              <div 
                onClick={() => { setShowDatePicker(!showDatePicker); setShowLocationPicker(false); }}
                className="cursor-pointer group"
              >
                <div className="flex items-center gap-2 text-slate-800 text-xs sm:text-sm font-bold">
                  <Calendar className="w-4 h-4 text-slate-800 group-hover:text-amber-600 transition-colors" />
                  <span>Date</span>
                </div>
                <div className="mt-0.5 text-xs text-slate-500 font-medium flex items-center gap-1">
                  <span>{selectedDate}</span>
                  <span className="text-[10px] text-slate-400">▾</span>
                </div>
              </div>

              {/* Date Dropdown */}
              <AnimatePresence>
                {showDatePicker && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    className="absolute top-full left-0 mt-3 w-56 bg-white rounded-2xl shadow-xl border border-slate-200 p-2 z-50 text-xs"
                  >
                    <div className="px-3 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      Select Season / Month
                    </div>
                    {['November 2026', 'December 2026', 'January 2027', 'February 2027', 'March 2027'].map((m) => (
                      <button
                        key={m}
                        onClick={() => {
                          setSelectedDate(m);
                          setShowDatePicker(false);
                        }}
                        className="w-full text-left px-3 py-2 rounded-xl hover:bg-slate-100 text-slate-800 font-medium transition-colors"
                      >
                        {m}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 3. Guests Column */}
            <div className="md:col-span-3">
              <div className="flex items-center gap-2 text-slate-800 text-xs sm:text-sm font-bold">
                <Users className="w-4 h-4 text-slate-800" />
                <span>Guests</span>
              </div>
              <div className="mt-1 flex items-center gap-2.5 text-xs text-slate-600 font-medium">
                <button
                  type="button"
                  onClick={() => setGuestCount(Math.max(1, guestCount - 1))}
                  className="w-5 h-5 rounded-full border border-slate-300 flex items-center justify-center text-slate-600 hover:bg-slate-100 cursor-pointer transition-colors"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <span className="font-semibold text-slate-800">{guestCount} {guestCount === 1 ? 'Guest' : 'Guests'}</span>
                <button
                  type="button"
                  onClick={() => setGuestCount(guestCount + 1)}
                  className="w-5 h-5 rounded-full border border-slate-300 flex items-center justify-center text-slate-600 hover:bg-slate-100 cursor-pointer transition-colors"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* 4. Circular Dark Search CTA Button matching reference */}
            <div className="md:col-span-1 flex justify-end">
              <button
                type="button"
                onClick={handleSearchSubmit}
                className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-slate-900 text-white flex items-center justify-center hover:bg-slate-800 transition-all duration-300 shadow-lg hover:scale-105 active:scale-95 cursor-pointer"
                title="Search Flagship Itineraries"
              >
                <Search className="w-5 h-5" />
              </button>
            </div>

          </div>

        </div>

      </div>

      {/* 3. "DISCOVER THE DESTINATIONS" CAROUSEL (Directly matching the row of cards in reference) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-16">
        
        {/* Section Header with Next Arrow Button */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight font-display">
              Discover the destinations
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Immerse in iconic landscapes across all 28 Indian States & 8 Union Territories
            </p>
          </div>

          {/* Carousel Arrow Controls matching the right circle arrow in reference */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => scrollCarousel('prev')}
              className="w-10 h-10 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 flex items-center justify-center shadow-sm hover:shadow transition-all cursor-pointer"
              aria-label="Previous Destinations"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scrollCarousel('next')}
              className="w-10 h-10 rounded-full bg-slate-900 hover:bg-slate-800 text-white flex items-center justify-center shadow-md hover:shadow-lg transition-all cursor-pointer"
              aria-label="Next Destinations"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Horizontal Carousel Row */}
        <div 
          ref={carouselRef}
          className="flex items-center gap-5 sm:gap-6 overflow-x-auto pb-4 no-scrollbar snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {DISCOVER_DESTINATIONS.map((dest) => (
            <div
              key={dest.id}
              onClick={() => handleCardClick(dest)}
              className="flex-shrink-0 w-64 sm:w-72 md:w-80 h-88 sm:h-96 rounded-3xl overflow-hidden relative cursor-pointer group shadow-[0_10px_30px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_45px_rgba(0,0,0,0.18)] transition-all duration-500 snap-start"
            >
              {/* Destination Image with Zoom on Hover */}
              <img
                src={dest.image}
                alt={dest.name}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
              />

              {/* Gentle Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent pointer-events-none" />

              {/* Top Tag Pill matching the "Hoi An", "Ha Long" pills in reference */}
              <div className="absolute top-4 left-4 z-10">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[11px] font-bold text-slate-800 shadow-md">
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
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
                  <span className="font-bold text-amber-300">{dest.price}</span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>

    </div>
  );
}