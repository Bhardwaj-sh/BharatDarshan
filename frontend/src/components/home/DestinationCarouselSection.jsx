import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, MapPin, ArrowUpRight, Star } from 'lucide-react';
import BrushDivider from '../common/BrushDivider';

const CAROUSEL_DESTINATIONS = [
  {
    id: 1,
    title: 'Kashmir Valley',
    state: 'Jammu & Kashmir',
    slug: 'jammu-and-kashmir',
    tag: 'Alpine Sanctuary',
    rating: '4.95',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    description: 'Snow-capped peaks, Dal Lake shikaras, and tranquil pine meadows.'
  },
  {
    id: 2,
    title: 'Royal Rajasthan',
    state: 'Rajasthan',
    slug: 'rajasthan',
    tag: 'Desert Citadels',
    rating: '4.98',
    image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80',
    description: 'Thar golden dunes, majestic forts of Jodhpur, and royal palaces of Udaipur.'
  },
  {
    id: 3,
    title: 'Kerala Backwaters',
    state: 'Kerala',
    slug: 'kerala',
    tag: 'Tropical Serenity',
    rating: '4.92',
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80',
    description: 'Emerald lagoons, houseboats of Alleppey, and misty tea slopes of Munnar.'
  },
  {
    id: 4,
    title: 'Meghalaya Living Roots',
    state: 'Meghalaya',
    slug: 'meghalaya',
    tag: 'Untouched Eden',
    rating: '4.96',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
    description: 'Bio-engineered root bridges, Nohkalikai Falls, and cloud-draped hills.'
  },
  {
    id: 5,
    title: 'Ladakh Moonland',
    state: 'Ladakh',
    slug: 'ladakh',
    tag: 'High Altitude Desert',
    rating: '4.97',
    image: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=800&q=80',
    description: 'Pangong Tso crystal reflections, Khardung La pass, and ancient monasteries.'
  },
  {
    id: 6,
    title: 'Andaman Coral Islands',
    state: 'Andaman and Nicobar Islands',
    slug: 'andaman-and-nicobar-islands',
    tag: 'Ocean Paradise',
    rating: '4.94',
    image: 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=800&q=80',
    description: 'Turquoise waters of Radhanagar, vibrant coral reefs, and secluded coves.'
  }
];

export default function DestinationCarouselSection() {
  const [activeIndex, setActiveIndex] = useState(1);

  const prev = () => {
    setActiveIndex((current) => (current === 0 ? CAROUSEL_DESTINATIONS.length - 1 : current - 1));
  };

  const next = () => {
    setActiveIndex((current) => (current === CAROUSEL_DESTINATIONS.length - 1 ? 0 : current + 1));
  };

  // Auto-cycle every 5 seconds
  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="themes" className="relative bg-cream-50 text-slate-900 overflow-hidden pt-16 sm:pt-24 pb-12 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-forest-900 text-lime-400 text-xs font-bold uppercase tracking-wider mb-4">
            Curated Highlights
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-forest-900 tracking-tight">
            Top Nature Destinations You Can Explore
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-4 font-normal">
            Handpicked sanctuaries across India's most breathtaking landscapes, each with a guaranteed master itinerary.
          </p>
        </div>

        {/* 3D-Perspective Carousel Cards Container */}
        <div className="relative py-8 sm:py-12 flex items-center justify-center min-h-[460px] sm:min-h-[520px]">
          {/* Previous Button */}
          <button
            onClick={prev}
            className="absolute left-2 sm:left-6 z-30 p-3 sm:p-4 rounded-full bg-white/95 text-forest-900 hover:bg-forest-900 hover:text-lime-400 border border-slate-200 shadow-xl transition-all duration-300 cursor-pointer"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Cards Strip */}
          <div className="flex items-center justify-center gap-4 sm:gap-6 w-full max-w-5xl mx-auto px-12 overflow-hidden">
            {CAROUSEL_DESTINATIONS.map((item, index) => {
              // Calculate relative offset from active item
              let offset = index - activeIndex;
              if (offset < -2) offset += CAROUSEL_DESTINATIONS.length;
              if (offset > 2) offset -= CAROUSEL_DESTINATIONS.length;

              const isCenter = offset === 0;
              const isAdjacent = Math.abs(offset) === 1;
              const isVisible = Math.abs(offset) <= 2;

              if (!isVisible) return null;

              return (
                <motion.div
                  key={item.id}
                  onClick={() => setActiveIndex(index)}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{
                    opacity: isCenter ? 1 : isAdjacent ? 0.75 : 0.4,
                    scale: isCenter ? 1.06 : isAdjacent ? 0.9 : 0.8,
                    y: isCenter ? -12 : 0,
                    zIndex: isCenter ? 20 : 10 - Math.abs(offset),
                  }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className={`cursor-pointer transition-shadow rounded-[2rem] overflow-hidden bg-white shrink-0 w-[240px] sm:w-[300px] md:w-[340px] border ${
                    isCenter 
                      ? 'border-forest-800 shadow-[0_25px_50px_rgba(11,32,25,0.22)] ring-4 ring-lime-400/40' 
                      : 'border-slate-200/80 shadow-md hover:opacity-90'
                  }`}
                >
                  <div className="relative h-64 sm:h-72 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-forest-950/80 via-transparent to-transparent" />
                    
                    {/* Top Tag & Rating */}
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                      <span className="px-3 py-1 rounded-full bg-forest-900/80 backdrop-blur-md text-[11px] font-bold text-lime-400 uppercase tracking-wider border border-lime-400/30">
                        {item.tag}
                      </span>
                      <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-forest-900 text-xs font-black shadow-sm">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        {item.rating}
                      </span>
                    </div>

                    {/* Bottom Title on Image */}
                    <div className="absolute bottom-4 left-4 right-4 text-left text-white">
                      <p className="text-xs font-semibold text-lime-300 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" /> {item.state}
                      </p>
                      <h3 className="font-display text-xl font-bold mt-0.5">{item.title}</h3>
                    </div>
                  </div>

                  {/* Card Bottom Details (Expanded when active) */}
                  <div className="p-5 text-left bg-white">
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                      <Link
                        to={`/region/${item.slug}`}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-forest-800 hover:text-forest-950 group"
                      >
                        <span>View Master Package</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-lime-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </Link>

                      <Link
                        to={`/region/${item.slug}`}
                        className="btn-lime-sm"
                      >
                        Explore
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Next Button */}
          <button
            onClick={next}
            className="absolute right-2 sm:right-6 z-30 p-3 sm:p-4 rounded-full bg-white/95 text-forest-900 hover:bg-forest-900 hover:text-lime-400 border border-slate-200 shadow-xl transition-all duration-300 cursor-pointer"
            aria-label="Next Slide"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Carousel Pagination Dots */}
        <div className="flex items-center justify-center gap-2 mt-4">
          {CAROUSEL_DESTINATIONS.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                activeIndex === i ? 'w-8 bg-forest-900' : 'w-2 bg-slate-300 hover:bg-slate-400'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Signature Dark Forest Jagged Torn-Paper / Brush Edge Divider to next section */}
      <BrushDivider
        color="#0B2019"
        position="bottom"
        variant={2}
        className="mt-16 sm:mt-20"
      />
    </section>
  );
}
