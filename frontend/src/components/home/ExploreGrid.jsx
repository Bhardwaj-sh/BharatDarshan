import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Clock, ArrowRight, Compass, Sparkles, Heart, Star } from 'lucide-react';
import { REGIONS_DATA } from '../../data/regionsData';
import BrushDivider from '../common/BrushDivider';

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
      const matchesSearch = 
        region.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        region.capital.toLowerCase().includes(searchTerm.toLowerCase()) ||
        region.highlights.some(h => h.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesType = typeFilter === 'all' || region.type === typeFilter;
      const matchesCategory = categoryFilter === 'all' || region.category === categoryFilter;

      return matchesSearch && matchesType && matchesCategory;
    });
  }, [searchTerm, typeFilter, categoryFilter]);

  const displayedRegions = filteredRegions.slice(0, visibleCount);

  return (
    <section id="explore-regions" className="relative bg-forest-900 text-white scroll-mt-20 overflow-hidden pt-16 pb-20">
      
      {/* Background Ambient Emerald Radial Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-lime-400/5 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-forest-800 text-lime-400 text-xs font-bold uppercase tracking-wider border border-lime-400/30 mb-4 shadow-sm">
            <Compass className="w-3.5 h-3.5 text-lime-400" />
            <span>The India Master Registry</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight mb-4">
            Top Nature Destinations You Can Explore
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
            Exactly one master tour package per State and Union Territory. Realistic itineraries, verified stays, and transparent per-person pricing.
          </p>
        </motion.div>

        {/* Filter Controls Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="glass-forest rounded-3xl p-4 sm:p-5 shadow-2xl border border-forest-750 mb-12"
        >
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            
            {/* Search Input */}
            <div className="relative w-full lg:w-96">
              <Search className="w-4 h-4 text-lime-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search state, monument, or capital..."
                className="w-full pl-11 pr-4 py-3 rounded-full bg-forest-950/80 border border-forest-750 text-xs font-semibold text-white placeholder:text-slate-400 focus:outline-none focus:border-lime-400 transition-all"
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

            {/* Territory Tabs with Smooth Animated Pill */}
            <div className="flex items-center gap-1.5 p-1 bg-forest-950/80 rounded-full w-full lg:w-auto overflow-x-auto border border-forest-750">
              <button
                onClick={() => setTypeFilter('all')}
                className={`relative px-5 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  typeFilter === 'all'
                    ? 'text-forest-950'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {typeFilter === 'all' && (
                  <motion.div
                    layoutId="activeTerritoryPill"
                    className="absolute inset-0 bg-lime-400 rounded-full shadow-lime-glow"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">All Regions (36)</span>
              </button>

              <button
                onClick={() => setTypeFilter('state')}
                className={`relative px-5 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  typeFilter === 'state'
                    ? 'text-forest-950'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {typeFilter === 'state' && (
                  <motion.div
                    layoutId="activeTerritoryPill"
                    className="absolute inset-0 bg-lime-400 rounded-full shadow-lime-glow"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">28 States</span>
              </button>

              <button
                onClick={() => setTypeFilter('union-territory')}
                className={`relative px-5 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  typeFilter === 'union-territory'
                    ? 'text-forest-950'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {typeFilter === 'union-territory' && (
                  <motion.div
                    layoutId="activeTerritoryPill"
                    className="absolute inset-0 bg-lime-400 rounded-full shadow-lime-glow"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">8 Union Territories</span>
              </button>
            </div>
          </div>

          {/* Secondary Category Filter Chips */}
          <div className="flex items-center gap-2 mt-4 pt-4 border-t border-forest-800 overflow-x-auto pb-1 text-xs">
            <span className="text-slate-400 shrink-0 font-semibold flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-lime-400" /> Filter:
            </span>
            {['all', 'Himalayan', 'Heritage', 'Spiritual', 'Coastal', 'Northeast'].map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-3.5 py-1.5 rounded-full font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  categoryFilter === cat
                    ? 'bg-lime-400 text-forest-950 font-bold shadow-sm'
                    : 'bg-forest-800 text-slate-300 hover:text-white hover:bg-forest-750'
                }`}
              >
                {cat === 'all' ? 'All Themes' : cat}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Region Cards Grid */}
        {displayedRegions.length === 0 ? (
          <div className="text-center py-20 bg-forest-850/60 rounded-3xl border border-forest-750">
            <Compass className="w-12 h-12 text-slate-500 mx-auto mb-4 animate-spin" />
            <h3 className="text-xl font-bold text-white mb-2">No Regions Found</h3>
            <p className="text-slate-400 text-sm max-w-md mx-auto mb-6">
              We couldn't find any state or union territory matching "{searchTerm}". Try clearing your filters.
            </p>
            <button
              onClick={() => { setSearchTerm(''); setTypeFilter('all'); setCategoryFilter('all'); }}
              className="btn-lime-sm"
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
                return (
                  <motion.div
                    key={region.id}
                    layout
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.45, delay: (idx % 6) * 0.06 }}
                    whileHover={{ y: -8 }}
                    className="group relative rounded-3xl overflow-hidden bg-forest-850/95 border border-forest-750 hover:border-lime-400/50 transition-all duration-300 shadow-xl hover:shadow-[0_20px_40px_rgba(210,245,62,0.12)] flex flex-col"
                  >
                    {/* Image Header */}
                    <div className="relative h-56 w-full overflow-hidden">
                      <img
                        src={region.heroImage}
                        alt={region.name}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-forest-900 via-transparent to-transparent" />

                      {/* Top Badges */}
                      <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between z-10">
                        <span className="px-3 py-1 rounded-full bg-forest-950/80 backdrop-blur-md text-[10px] font-bold uppercase tracking-wider text-lime-400 border border-lime-400/30">
                          {region.type === 'state' ? 'State of India' : 'Union Territory'}
                        </span>

                        <motion.button
                          whileTap={{ scale: 0.8 }}
                          onClick={(e) => toggleFavorite(region.id, e)}
                          className={`w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md transition-all cursor-pointer ${
                            isFav 
                              ? 'bg-rose-500 text-white shadow-lg' 
                              : 'bg-forest-950/60 text-white hover:text-rose-400'
                          }`}
                          aria-label="Wishlist"
                        >
                          <Heart className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
                        </motion.button>
                      </div>

                      {/* Package Duration Badge on image bottom */}
                      <div className="absolute bottom-3 left-3.5 flex items-center gap-2">
                        <span className="px-2.5 py-1 rounded-full bg-forest-900/90 backdrop-blur-md text-slate-200 text-xs font-semibold flex items-center gap-1 border border-white/10">
                          <Clock className="w-3.5 h-3.5 text-lime-400" />
                          {region.package.duration}
                        </span>
                        <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-forest-900/90 backdrop-blur-md text-amber-400 text-xs font-bold border border-white/10">
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
                          <h3 className="font-display text-xl font-bold text-white group-hover:text-lime-300 transition-colors">
                            {region.name}
                          </h3>
                          <p className="text-xs font-semibold text-slate-400 flex items-center gap-1 mt-0.5">
                            <MapPin className="w-3.5 h-3.5 text-lime-400" />
                            Capital: <span className="text-slate-200">{region.capital}</span>
                          </p>
                        </div>

                        {/* Package Title */}
                        <div className="text-xs font-medium text-emerald-200/90 line-clamp-1 mb-3">
                          {region.package.name}
                        </div>

                        {/* Highlights Tags */}
                        <div className="flex flex-wrap gap-1.5 mb-5">
                          {region.highlights.slice(0, 3).map((item, i) => (
                            <span
                              key={i}
                              className="px-2.5 py-0.5 rounded-full bg-forest-800 text-[11px] font-semibold text-slate-300 border border-forest-750"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Price & Action Button (Exact Reference Styling) */}
                      <div className="pt-4 border-t border-forest-800 flex items-center justify-between mt-auto">
                        <div>
                          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                            Verified Package
                          </div>
                          <div className="font-display text-lg font-black text-lime-400">
                            ₹{region.package.pricePerPerson.toLocaleString('en-IN')}
                            <span className="text-xs font-normal text-slate-400"> /person</span>
                          </div>
                        </div>

                        <Link
                          to={`/region/${region.slug}`}
                          className="btn-lime-sm group/btn"
                        >
                          <span>Explore</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
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
              className="px-8 py-3.5 rounded-full bg-forest-800 hover:bg-forest-750 border border-lime-400/40 text-lime-400 font-bold text-sm shadow-md transition-all cursor-pointer inline-flex items-center gap-2"
            >
              <span>Load More Regions ({filteredRegions.length - visibleCount} remaining)</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>
        )}

      </div>

      {/* Signature White Jagged Torn-Paper / Brush Edge Divider to next cream section */}
      <BrushDivider
        color="#FAFAF7"
        position="bottom"
        variant={3}
        className="mt-20"
      />
    </section>
  );
}
