import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Clock, ArrowRight, Compass, Sparkles, Heart } from 'lucide-react';
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
    <section id="explore-regions" className="py-24 bg-slate-50 text-slate-900 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="badge-glow mb-4">
            <Compass className="w-3.5 h-3.5 text-saffron-500" />
            <span>Curated Regional Packages</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-black text-slate-950 tracking-tight mb-4">
            Discover All 36 Regions of India
          </h2>
          <p className="text-base text-slate-600 font-normal leading-relaxed">
            Exactly one authentic flagship itinerary per region. Realistic travel distances, verified stays, and transparent per-person pricing.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-white rounded-3xl p-4 sm:p-5 shadow-soft border border-slate-200/80 mb-12">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            
            {/* Search Input */}
            <div className="relative w-full lg:w-96">
              <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search state, monument, or capital..."
                className="w-full pl-11 pr-4 py-2.5 rounded-2xl bg-slate-100 border border-transparent text-xs font-semibold text-slate-800 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-saffron-500 transition-all"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400 hover:text-slate-700"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Territory Tabs */}
            <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-2xl w-full lg:w-auto overflow-x-auto">
              <button
                onClick={() => setTypeFilter('all')}
                className={`px-5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  typeFilter === 'all'
                    ? 'bg-slate-950 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-950'
                }`}
              >
                All 36 Regions
              </button>
              <button
                onClick={() => setTypeFilter('state')}
                className={`px-5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  typeFilter === 'state'
                    ? 'bg-slate-950 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-950'
                }`}
              >
                28 States
              </button>
              <button
                onClick={() => setTypeFilter('UT')}
                className={`px-5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  typeFilter === 'UT'
                    ? 'bg-slate-950 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-950'
                }`}
              >
                8 Union Territories
              </button>
            </div>

            {/* Counter */}
            <div className="text-xs font-bold text-slate-500">
              Showing <span className="text-saffron-600 font-extrabold">{filteredRegions.length}</span> destinations
            </div>

          </div>
        </div>

        {/* Regions Grid */}
        {displayedRegions.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedRegions.map((region) => {
              const isFav = !!favorites[region.id];

              return (
                <div
                  key={region.id}
                  className="group bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-soft hover:shadow-card-hover hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
                >
                  {/* Image Container with Badges */}
                  <div className="relative h-64 overflow-hidden bg-slate-950">
                    <img
                      src={region.thumbnail || region.heroImage}
                      alt={region.name}
                      className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20" />

                    {/* Top Badges */}
                    <div className="absolute top-4 inset-x-4 flex items-center justify-between">
                      <span className="bg-slate-950/80 backdrop-blur-md text-amber-400 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-white/10 shadow-sm">
                        {region.type === 'state' ? 'State' : 'Union Territory'}
                      </span>

                      <button
                        onClick={(e) => toggleFavorite(region.id, e)}
                        className={`w-8 h-8 rounded-full backdrop-blur-md flex items-center justify-center transition-colors ${
                          isFav ? 'bg-rose-500 text-white' : 'bg-black/40 text-white/80 hover:text-white'
                        }`}
                        title="Save to Wishlist"
                      >
                        <Heart className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
                      </button>
                    </div>

                    {/* Duration Badge */}
                    <span className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-md text-slate-900 text-[10px] font-extrabold px-3 py-1 rounded-full flex items-center gap-1.5 shadow-md">
                      <Clock className="w-3.5 h-3.5 text-saffron-500" />
                      <span>{region.durationDays}D / {region.durationNights}N</span>
                    </span>

                    {/* Name & Capital Overlay */}
                    <div className="absolute bottom-4 left-4 text-white">
                      <p className="text-[11px] text-amber-300 font-semibold flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-amber-400" />
                        <span>Capital: {region.capital}</span>
                      </p>
                      <h3 className="font-display text-2xl font-black text-white tracking-tight">
                        {region.name}
                      </h3>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 flex flex-col flex-grow justify-between">
                    <div>
                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
                        {region.description}
                      </p>

                      {/* Highlight Pills */}
                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {region.highlights.slice(0, 3).map((item, idx) => (
                          <span
                            key={idx}
                            className="bg-slate-100 text-slate-700 text-[10px] font-semibold px-2.5 py-1 rounded-lg"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Footer Row */}
                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                      <div>
                        <span className="block text-[10px] uppercase font-bold tracking-wider text-slate-400">
                          Starting From
                        </span>
                        <span className="font-display text-xl font-black text-slate-950">
                          ₹{region.startingPrice.toLocaleString('en-IN')}
                          <span className="text-xs text-slate-500 font-normal"> / person</span>
                        </span>
                      </div>

                      <Link
                        to={`/region/${region.slug}`}
                        className="btn-gradient text-xs py-2 px-4 rounded-xl flex items-center gap-1 font-bold shadow-md hover:shadow-glow-saffron transition-all"
                      >
                        <span>View Trip</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 shadow-soft">
            <Compass className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="font-display text-xl font-bold text-slate-800">No destinations found</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto mb-4">
              We couldn't find a region matching "{searchTerm}". Try clearing your filter.
            </p>
            <button
              onClick={() => { setSearchTerm(''); setTypeFilter('all'); setCategoryFilter('all'); }}
              className="btn-dark text-xs py-2 px-6"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Load More */}
        {filteredRegions.length > visibleCount && (
          <div className="text-center mt-14">
            <button
              onClick={() => setVisibleCount((prev) => prev + 12)}
              className="btn-ghost-dark text-xs uppercase tracking-wider font-bold py-3.5 px-8 shadow-sm"
            >
              Load More Regions ({filteredRegions.length - visibleCount} remaining)
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
