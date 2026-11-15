import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Clock, ArrowRight, Compass, Sparkles, Heart, Star } from 'lucide-react';
import { REGIONS_DATA } from '../../data/regionsData';

export default function ExploreGrid({ initialFilter }) {
  const [searchTerm, setSearchTerm] = useState(initialFilter?.search || '');
  const [typeFilter, setTypeFilter] = useState(initialFilter?.type || 'all');
  const [categoryFilter, setCategoryFilter] = useState(initialFilter?.category || 'all');
  const [visibleCount, setVisibleCount] = useState(12);
  const [favorites, setFavorites] = useState({});

  const toggleFavorite = (id, e) => {
    e.preventDefault();
    e.stopPropagation();
    setFavorites(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredRegions = useMemo(() => {
    return REGIONS_DATA.filter((region) => {
      const term = searchTerm.toLowerCase();
      const matchesSearch =
        region.name.toLowerCase().includes(term) ||
        (region.capital && region.capital.toLowerCase().includes(term)) ||
        (region.highlights && region.highlights.some(h => h.toLowerCase().includes(term)));

      const matchesType = typeFilter === 'all' || 
        (typeFilter === 'state' && region.type !== 'Union Territory') ||
        (typeFilter === 'union-territory' && region.type === 'Union Territory');

      const matchesCategory = categoryFilter === 'all' || 
        (region.zone && region.zone.toLowerCase() === categoryFilter.toLowerCase()) ||
        (region.category && region.category.toLowerCase() === categoryFilter.toLowerCase());

      return matchesSearch && matchesType && matchesCategory;
    });
  }, [searchTerm, typeFilter, categoryFilter]);

  const displayedRegions = filteredRegions.slice(0, visibleCount);

  return (
    <section id="explore-regions" className="relative bg-midnight-950 text-white scroll-mt-20 overflow-hidden pt-12 pb-20">

      {/* Ambient Radial Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-cyan-500/10 blur-[160px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-bold uppercase tracking-wider border border-cyan-400/30 mb-4 shadow-cyan-glow">
            <Compass className="w-3.5 h-3.5 text-cyan-400" />
            <span>The India Master Registry</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight mb-4">
            All 36 Indian Destinations
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-light">
            Exactly one master tour package per State and Union Territory. Realistic itineraries, verified stays, and transparent per-person pricing.
          </p>
        </motion.div>

        {/* Filter Controls Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="bg-midnight-900/90 rounded-3xl p-4 sm:p-5 shadow-2xl border border-white/10 mb-12 backdrop-blur-md"
        >
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">

            {/* Search Input */}
            <div className="relative w-full lg:w-96">
              <Search className="w-4 h-4 text-cyan-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search state, monument, or capital..."
                className="w-full pl-11 pr-4 py-3 rounded-full bg-midnight-950/80 border border-white/15 text-xs font-semibold text-white placeholder:text-slate-400 focus:outline-none focus:border-cyan-400 transition-all"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400 hover:text-white cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Territory Tabs */}
            <div className="flex items-center gap-1.5 p-1 bg-midnight-950/80 rounded-full w-full lg:w-auto overflow-x-auto border border-white/10">
              <button
                onClick={() => setTypeFilter('all')}
                className={`relative px-5 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  typeFilter === 'all'
                    ? 'text-midnight-950'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {typeFilter === 'all' && (
                  <motion.div
                    layoutId="activeTerritoryPill"
                    className="absolute inset-0 bg-cyan-400 rounded-full shadow-cyan-glow"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">All Regions (36)</span>
              </button>

              <button
                onClick={() => setTypeFilter('state')}
                className={`relative px-5 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  typeFilter === 'state'
                    ? 'text-midnight-950'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {typeFilter === 'state' && (
                  <motion.div
                    layoutId="activeTerritoryPill"
                    className="absolute inset-0 bg-cyan-400 rounded-full shadow-cyan-glow"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">28 States</span>
              </button>

              <button
                onClick={() => setTypeFilter('union-territory')}
                className={`relative px-5 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  typeFilter === 'union-territory'
                    ? 'text-midnight-950'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {typeFilter === 'union-territory' && (
                  <motion.div
                    layoutId="activeTerritoryPill"
                    className="absolute inset-0 bg-cyan-400 rounded-full shadow-cyan-glow"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">8 Union Territories</span>
              </button>
            </div>
          </div>

          {/* Secondary Category Filter Chips */}
          <div className="flex items-center gap-2 mt-4 pt-4 border-t border-white/10 overflow-x-auto pb-1 text-xs">
            <span className="text-slate-400 shrink-0 font-semibold flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" /> Filter:
            </span>
            {['all', 'North', 'West', 'South', 'East', 'Northeast'].map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-3.5 py-1.5 rounded-full font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  categoryFilter === cat
                    ? 'bg-cyan-500 text-midnight-950 font-bold shadow-cyan-glow'
                    : 'bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 border border-white/5'
                }`}
              >
                {cat === 'all' ? 'All Zones' : `${cat} India`}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Region Cards Grid */}
        {displayedRegions.length === 0 ? (
          <div className="text-center py-20 bg-midnight-900/60 rounded-3xl border border-white/10">
            <Compass className="w-12 h-12 text-slate-500 mx-auto mb-4 animate-spin" />
            <h3 className="text-xl font-bold text-white mb-2">No Regions Found</h3>
            <p className="text-slate-400 text-sm max-w-md mx-auto mb-6 font-light">
              We couldn't find any state or union territory matching "{searchTerm}". Try clearing your filters.
            </p>
            <button
              onClick={() => { setSearchTerm(''); setTypeFilter('all'); setCategoryFilter('all'); }}
              className="btn-luxury-cyan text-xs uppercase px-6 py-2.5 font-bold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence>
              {displayedRegions.map((region, idx) => {
                const isFav = !!favorites[region.id];
                const price = region.package?.basePrice || region.basePrice || 24999;
                const formattedPrice = `₹${price.toLocaleString('en-IN')}`;
                const duration = region.package?.duration || `${region.durationDays || 8} Days / ${region.durationNights || 7} Nights`;

                return (
                  <motion.div
                    key={region.id}
                    layout
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.45, delay: (idx % 6) * 0.06 }}
                    whileHover={{ y: -6 }}
                    className="group relative rounded-3xl overflow-hidden bg-midnight-900/95 border border-white/10 hover:border-cyan-400/50 transition-all duration-300 shadow-xl hover:shadow-cyan-glow flex flex-col"
                  >
                    {/* Image Header */}
                    <div className="relative h-60 w-full overflow-hidden">
                      <img
                        src={region.heroImage}
                        alt={region.name}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-midnight-950 via-midnight-950/30 to-transparent" />

                      {/* Top Badges */}
                      <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between z-10">
                        <span className="px-3 py-1 rounded-full bg-midnight-950/80 backdrop-blur-md text-[10px] font-bold uppercase tracking-wider text-cyan-300 border border-cyan-400/30">
                          {region.type === 'Union Territory' ? 'Union Territory' : 'State of India'}
                        </span>

                        <motion.button
                          whileTap={{ scale: 0.8 }}
                          onClick={(e) => toggleFavorite(region.id, e)}
                          className={`w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md transition-all cursor-pointer ${
                            isFav
                              ? 'bg-rose-500 text-white shadow-lg'
                              : 'bg-black/60 text-white hover:text-rose-400 border border-white/15'
                          }`}
                          aria-label="Wishlist"
                        >
                          <Heart className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
                        </motion.button>
                      </div>

                      {/* Package Duration Badge on image bottom */}
                      <div className="absolute bottom-3 left-3.5 flex items-center gap-2">
                        <span className="px-2.5 py-1 rounded-full bg-midnight-950/90 backdrop-blur-md text-slate-200 text-xs font-semibold flex items-center gap-1 border border-white/10">
                          <Clock className="w-3.5 h-3.5 text-cyan-400" />
                          {duration}
                        </span>
                        <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-midnight-950/90 backdrop-blur-md text-amber-400 text-xs font-bold border border-white/10">
                          <Star className="w-3 h-3 fill-amber-400" />
                          4.9
                        </span>
                      </div>
                    </div>

                    {/* Content Body */}
                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <div>
                        {/* Title & Capital */}
                        <div className="mb-2.5">
                          <h3 className="font-display text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                            {region.name}
                          </h3>
                          <p className="text-xs font-semibold text-slate-400 flex items-center gap-1 mt-0.5">
                            <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                            Capital: <span className="text-slate-200">{region.capital || region.name}</span>
                          </p>
                        </div>

                        {/* Package Title */}
                        <div className="text-xs font-medium text-cyan-300/90 line-clamp-1 mb-3">
                          {region.package?.title || region.tagline || `${region.name} Flagship Tour`}
                        </div>

                        {/* Highlights Tags */}
                        <div className="flex flex-wrap gap-1.5 mb-5">
                          {(region.highlights || []).slice(0, 3).map((item, i) => (
                            <span
                              key={i}
                              className="px-2.5 py-0.5 rounded-full bg-white/5 text-[11px] font-medium text-slate-300 border border-white/10"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Price & Action Button */}
                      <div className="pt-4 border-t border-white/10 flex items-center justify-between mt-auto">
                        <div>
                          <div className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">
                            Verified Package
                          </div>
                          <div className="font-display text-lg font-black text-cyan-400 font-mono">
                            {formattedPrice}
                            <span className="text-xs font-normal text-slate-400 font-sans"> /person</span>
                          </div>
                        </div>

                        <Link
                          to={`/region/${region.id}`}
                          className="btn-luxury-cyan text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-1.5 cursor-pointer"
                        >
                          <span>Explore</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Load More Button */}
        {visibleCount < filteredRegions.length && (
          <div className="text-center mt-14">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setVisibleCount((prev) => Math.min(prev + 12, filteredRegions.length))}
              className="px-8 py-3.5 rounded-full bg-midnight-900 hover:bg-cyan-500 hover:text-midnight-950 border border-cyan-400/40 text-cyan-300 font-bold text-sm shadow-cyan-glow transition-all cursor-pointer inline-flex items-center gap-2"
            >
              <span>Load More Regions ({filteredRegions.length - visibleCount} remaining)</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>
        )}

      </div>
    </section>
  );
}
