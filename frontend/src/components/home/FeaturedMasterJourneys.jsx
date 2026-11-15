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
    <section id="master-journeys" className="relative py-28 bg-midnight-950 text-white overflow-hidden border-t border-white/5">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/3 -right-48 w-96 h-96 bg-sapphire-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-4">
              <Compass className="w-3.5 h-3.5 text-cyan-400" />
              <span>Strict 1-Tour-Per-Region Architecture</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white font-display">
              Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-sky-200">Master Journeys</span>
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-400 max-w-2xl font-light">
              Each state and territory of India is represented by exactly one definitive, culturally authentic master itinerary with server-snapshotted pricing.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs uppercase tracking-widest text-slate-400 font-mono">
              Showing <strong className="text-cyan-400">{visibleRegions.length}</strong> of {filteredRegions.length}
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
                className={`px-5 py-2.5 rounded-full text-xs font-medium uppercase tracking-wider whitespace-nowrap transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'bg-cyan-500 text-midnight-950 font-bold shadow-cyan-glow border border-cyan-400'
                    : 'bg-midnight-900/80 text-slate-400 hover:text-white border border-white/10 hover:border-cyan-500/40'
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

              return (
                <motion.article
                  key={region.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: idx * 0.04 }}
                  className="group relative rounded-2xl overflow-hidden bg-midnight-900/90 border border-white/10 hover:border-cyan-400/50 transition-all duration-500 hover:shadow-cyan-glow flex flex-col"
                >
                  {/* Image Container with Ken Burns Hover */}
                  <div className="relative h-60 w-full overflow-hidden bg-midnight-950">
                    <img
                      src={region.heroImage}
                      alt={region.name}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-midnight-900 via-midnight-900/30 to-black/40" />

                    {/* Sequence Badge */}
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[11px] font-mono text-cyan-300">
                      {String(idx + 1).padStart(2, '0')} / {REGIONS_DATA.length}
                    </div>

                    {/* Zone / UT Pill */}
                    <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-cyan-500/20 backdrop-blur-md border border-cyan-400/30 text-[10px] uppercase font-bold tracking-wider text-cyan-300">
                      {region.type === 'Union Territory' ? 'Union Territory' : region.zone || 'India'}
                    </div>

                    {/* Duration Badge Bottom Left */}
                    <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-xs text-white">
                      <Clock className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{duration}</span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
                        <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                        <span className="truncate">{region.capital || region.name}</span>
                      </div>

                      <h3 className="text-xl font-bold font-display text-white group-hover:text-cyan-300 transition-colors line-clamp-1">
                        {region.name}
                      </h3>

                      <p className="mt-2 text-xs text-slate-400 line-clamp-2 leading-relaxed">
                        {region.package?.title || region.tagline || region.description}
                      </p>

                      {/* Highlights Tag Cloud */}
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {(region.highlights || []).slice(0, 3).map((hl, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] text-slate-300"
                          >
                            {hl}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Card Footer: Pricing & Action */}
                    <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] uppercase tracking-wider text-slate-400 block font-mono">
                          Verified Price
                        </span>
                        <span className="text-lg font-black text-cyan-400 font-mono">
                          {formattedPrice}
                        </span>
                      </div>

                      <Link
                        to={`/region/${region.id}`}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/10 hover:bg-cyan-500 hover:text-midnight-950 border border-white/20 hover:border-cyan-400 text-xs font-semibold text-white transition-all duration-300 group-hover:shadow-cyan-glow cursor-pointer"
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
              className="px-8 py-3.5 rounded-full bg-midnight-900 border border-cyan-400/40 text-cyan-300 hover:bg-cyan-500 hover:text-midnight-950 font-semibold text-sm uppercase tracking-wider transition-all duration-300 shadow-cyan-glow cursor-pointer inline-flex items-center gap-2"
            >
              <span>Explore More Regions ({filteredRegions.length - visibleRegions.length} remaining)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Assurance Banner */}
        <div className="mt-16 p-6 rounded-2xl bg-gradient-to-r from-midnight-900 via-midnight-850 to-midnight-900 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-white">
                Zero-Trust Architectural Guarantee
              </p>
              <p className="text-xs text-slate-400">
                Every listed itinerary is directly backed by a single authoritative database record and verified state guide consortium.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-cyan-400 font-mono font-semibold">
            <CheckCircle2 className="w-4 h-4" />
            <span>28 States · 8 Union Territories · 36 Flagships</span>
          </div>
        </div>

      </div>
    </section>
  );
}
