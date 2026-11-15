import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  Clock, 
  MapPin, 
  ArrowRight, 
  ShieldCheck, 
  Compass, 
  Calendar,
  CheckCircle2,
  Users
} from 'lucide-react';
import { REGIONS_DATA } from '../../data/regionsData';
import { STATE_COLOR_MAP } from './InteractiveIndiaMap';

const ZONE_FILTERS = [
  { id: 'all', label: 'All 36 Flagships' },
  { id: 'north', label: 'Himalayas & North' },
  { id: 'west', label: 'Desert & West' },
  { id: 'south', label: 'South & Coast' },
  { id: 'east', label: 'East & Heartland' },
  { id: 'northeast', label: 'Northeast' },
  { id: 'island', label: 'Islands & UTs' },
];

export default function FeaturedMasterJourneys() {
  const [activeZone, setActiveZone] = useState('all');
  const [displayCount, setDisplayCount] = useState(8);

  const filteredRegions = useMemo(() => {
    if (activeZone === 'all') return REGIONS_DATA;
    return REGIONS_DATA.filter((r) => {
      const z = (r.zone || '').toLowerCase();
      const type = (r.type || '').toLowerCase();
      if (activeZone === 'island') {
        return type.includes('union') || z.includes('island') || r.id === 'andaman-and-nicobar-islands' || r.id === 'lakshadweep';
      }
      return z.includes(activeZone) || (r.category && r.category.toLowerCase().includes(activeZone));
    });
  }, [activeZone]);

  const visibleRegions = filteredRegions.slice(0, displayCount);

  return (
    <section id="master-journeys" className="relative py-24 sm:py-28 bg-white text-slate-900 overflow-hidden border-t border-slate-200">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-800 text-xs font-bold uppercase tracking-wider mb-4 shadow-sm">
              <Compass className="w-3.5 h-3.5 text-slate-800" />
              <span>Strict 1-Tour-Per-Region Architecture</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 font-display">
              Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-orange-600 to-emerald-600">Master Journeys</span>
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600 max-w-2xl font-normal">
              Each state and territory of India is represented by exactly one definitive, culturally authentic master itinerary with server-snapshotted pricing.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs uppercase tracking-widest text-slate-500 font-mono">
              Showing <strong className="text-slate-900">{visibleRegions.length}</strong> of {filteredRegions.length}
            </span>
          </div>
        </div>

        {/* Zone Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {ZONE_FILTERS.map((filter) => {
            const isActive = activeZone === filter.id;
            return (
              <button
                key={filter.id}
                onClick={() => {
                  setActiveZone(filter.id);
                  setDisplayCount(8);
                }}
                className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'bg-slate-900 text-white font-black shadow-md border border-slate-900'
                    : 'bg-slate-100 text-slate-700 hover:text-slate-900 border border-slate-200 hover:bg-slate-200'
                }`}
              >
                {filter.label}
              </button>
            );
          })}
        </div>

        {/* Master Journeys Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {visibleRegions.map((region, idx) => {
              const price = region.package?.basePrice || region.basePrice || 24999;
              const formattedPrice = `₹${price.toLocaleString('en-IN')}`;
              const duration = region.package?.duration || `${region.durationDays || 8} Days / ${region.durationNights || 7} Nights`;
              const theme = STATE_COLOR_MAP[region.id] || { fill: '#B45309', border: '#FDE68A' };

              return (
                <motion.article
                  key={region.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: idx * 0.04 }}
                  className="group relative rounded-3xl overflow-hidden bg-white border border-slate-200 hover:border-slate-300 transition-all duration-500 shadow-sm hover:shadow-xl flex flex-col"
                >
                  {/* Image Container with Ken Burns Hover */}
                  <div className="relative h-60 w-full overflow-hidden bg-slate-100">
                    <img
                      src={region.heroImage}
                      alt={region.name}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                    {/* Sequence Badge */}
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md border border-slate-200 text-[11px] font-mono text-slate-800 font-bold shadow-sm">
                      {String(idx + 1).padStart(2, '0')} / {REGIONS_DATA.length}
                    </div>

                    {/* Zone / UT Pill */}
                    <div 
                      className="absolute top-3 right-3 px-2.5 py-1 rounded-full backdrop-blur-md text-[10px] uppercase font-extrabold tracking-wider border shadow-sm bg-white/90 text-slate-800 border-slate-200"
                    >
                      {region.type === 'Union Territory' ? 'Union Territory' : region.zone || 'India'}
                    </div>

                    {/* Duration Badge Bottom Left */}
                    <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-slate-200 text-xs text-slate-900 font-medium shadow-sm">
                      <Clock className="w-3.5 h-3.5 text-amber-600" />
                      <span>{duration}</span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1">
                        <MapPin className="w-3.5 h-3.5 text-amber-600" />
                        <span className="truncate">{region.capital || region.name}</span>
                      </div>

                      <h3 className="text-xl font-bold font-display text-slate-900 group-hover:text-amber-700 transition-colors line-clamp-1">
                        {region.name}
                      </h3>

                      <p className="mt-2 text-xs text-slate-600 line-clamp-2 leading-relaxed font-normal">
                        {region.package?.title || region.tagline || region.description}
                      </p>

                      {/* Highlights Tag Cloud */}
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {(region.highlights || []).slice(0, 3).map((hl, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 rounded bg-slate-100 border border-slate-200 text-[10px] text-slate-700 font-medium"
                          >
                            {hl}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Card Footer: Pricing & Action */}
                    <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] uppercase tracking-wider text-slate-400 block font-mono">
                          Verified Price
                        </span>
                        <span className="text-lg font-black text-slate-900 font-mono">
                          {formattedPrice}
                        </span>
                      </div>

                      <Link
                        to={`/region/${region.id}`}
                        className="btn-classy-dark px-4 py-2 text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-pointer shadow-sm"
                      >
                        <span>Itinerary</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Load More Button */}
        {visibleRegions.length < filteredRegions.length && (
          <div className="mt-14 text-center">
            <button
              onClick={() => setDisplayCount((prev) => Math.min(prev + 8, filteredRegions.length))}
              className="px-8 py-3.5 rounded-full bg-slate-900 text-white hover:bg-slate-800 font-bold text-sm uppercase tracking-wider transition-all duration-300 shadow-md cursor-pointer inline-flex items-center gap-2"
            >
              <span>Explore More Regions ({filteredRegions.length - visibleRegions.length} remaining)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Assurance Banner */}
        <div className="mt-16 p-6 rounded-3xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-800">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900">
                Zero-Trust Architectural Guarantee
              </p>
              <p className="text-xs text-slate-500">
                Every listed itinerary is directly backed by a single authoritative database record and verified state guide consortium.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-800 font-mono font-bold">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>28 States · 8 Union Territories · 36 Flagships</span>
          </div>
        </div>

      </div>
    </section>
  );
}
