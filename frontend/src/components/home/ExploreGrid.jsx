import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Clock, Tag, ArrowRight, Compass, Filter } from 'lucide-react';
import { REGIONS_DATA } from '../../data/regionsData';

export default function ExploreGrid({ initialFilter }) {
  const [searchTerm, setSearchTerm] = useState(initialFilter?.search || '');
  const [typeFilter, setTypeFilter] = useState(initialFilter?.type || 'all'); // 'all' | 'state' | 'UT'
  const [categoryFilter, setCategoryFilter] = useState(initialFilter?.category || 'all');
  const [visibleCount, setVisibleCount] = useState(12);

  // Filtered dataset
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
    <section id="explore-regions" className="py-20 md:py-28 bg-ivory-100 text-charcoal-800 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-forest-900/5 text-forest-800 text-xs font-semibold uppercase tracking-widest mb-3 border border-forest-900/10">
            <Compass className="w-3.5 h-3.5 text-gold-600" />
            <span>Discover India's 36 Territories</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-forest-950 mb-4 tracking-tight">
            Explore All 28 States & 8 Union Territories
          </h2>
          <p className="text-sm sm:text-base text-charcoal-600 leading-relaxed">
            Every region features its own dedicated flagship package, day-by-day itinerary, interactive route map, and transparent per-person pricing.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-white rounded-3xl p-4 md:p-6 shadow-soft border border-ivory-200 mb-12">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            
            {/* Search Input */}
            <div className="relative w-full lg:w-96">
              <Search className="w-4 h-4 text-charcoal-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search state, capital, or monument..."
                className="w-full pl-11 pr-4 py-2.5 rounded-full bg-ivory-50 border border-ivory-200 text-xs text-charcoal-800 placeholder:text-charcoal-400 focus:outline-none focus:border-gold-500 focus:bg-white transition-all"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-charcoal-400 hover:text-charcoal-700"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Territory Type Tabs */}
            <div className="flex items-center gap-1.5 p-1 bg-ivory-100 rounded-full w-full lg:w-auto overflow-x-auto">
              <button
                onClick={() => setTypeFilter('all')}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all whitespace-nowrap ${
                  typeFilter === 'all'
                    ? 'bg-forest-800 text-white shadow-sm'
                    : 'text-charcoal-600 hover:text-forest-950'
                }`}
              >
                All 36 Regions
              </button>
              <button
                onClick={() => setTypeFilter('state')}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all whitespace-nowrap ${
                  typeFilter === 'state'
                    ? 'bg-forest-800 text-white shadow-sm'
                    : 'text-charcoal-600 hover:text-forest-950'
                }`}
              >
                28 States
              </button>
              <button
                onClick={() => setTypeFilter('UT')}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all whitespace-nowrap ${
                  typeFilter === 'UT'
                    ? 'bg-forest-800 text-white shadow-sm'
                    : 'text-charcoal-600 hover:text-forest-950'
                }`}
              >
                8 Union Territories
              </button>
            </div>

            {/* Filter Count Counter */}
            <div className="text-xs text-charcoal-500 font-medium">
              Showing <span className="font-bold text-forest-900">{filteredRegions.length}</span> destinations
            </div>

          </div>
        </div>

        {/* Regions Grid */}
        {displayedRegions.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedRegions.map((region) => (
              <div
                key={region.id}
                className="group bg-white rounded-3xl overflow-hidden border border-ivory-200/80 shadow-soft hover:shadow-card hover:-translate-y-1 transition-all duration-300 flex flex-col"
              >
                {/* Region Image & Badges */}
                <div className="relative h-56 overflow-hidden bg-forest-950">
                  <img
                    src={region.thumbnail || region.heroImage}
                    alt={region.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />
                  
                  {/* Territory Badge */}
                  <span className="absolute top-4 left-4 bg-forest-950/80 backdrop-blur-md text-gold-400 border border-gold-500/40 text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full">
                    {region.type === 'state' ? 'State' : 'Union Territory'}
                  </span>

                  {/* Duration Pill */}
                  <span className="absolute top-4 right-4 bg-white/90 backdrop-blur-md text-forest-950 text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm">
                    <Clock className="w-3 h-3 text-gold-600" />
                    <span>{region.durationDays}D / {region.durationNights}N</span>
                  </span>

                  {/* Capital & Name on Image */}
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <p className="text-[11px] text-ivory-200 flex items-center gap-1 font-medium">
                      <MapPin className="w-3 h-3 text-gold-400" />
                      <span>Capital: {region.capital}</span>
                    </p>
                    <h3 className="font-serif text-2xl font-bold tracking-tight text-white mt-0.5">
                      {region.name}
                    </h3>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 flex flex-col flex-grow justify-between">
                  <div>
                    <p className="text-xs text-charcoal-600 line-clamp-2 leading-relaxed mb-4">
                      {region.description}
                    </p>

                    {/* Highlights Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {region.highlights.slice(0, 3).map((item, idx) => (
                        <span
                          key={idx}
                          className="bg-ivory-100 text-forest-900 border border-ivory-200 text-[10px] font-medium px-2.5 py-0.5 rounded-full"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Bottom: Price & Button */}
                  <div className="pt-4 border-t border-ivory-200/80 flex items-center justify-between">
                    <div>
                      <span className="block text-[10px] uppercase tracking-wider text-charcoal-500 font-medium">
                        Per Person
                      </span>
                      <span className="font-serif text-lg font-bold text-forest-950">
                        ₹{region.startingPrice.toLocaleString('en-IN')}
                      </span>
                    </div>

                    <Link
                      to={`/region/${region.slug}`}
                      className="btn-forest text-xs py-2 px-4 rounded-full group-hover:bg-gold-500 group-hover:text-forest-950 transition-colors"
                    >
                      <span>Explore</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </Link>
                  </div>

                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl border border-ivory-200 p-8">
            <Compass className="w-10 h-10 text-charcoal-300 mx-auto mb-3" />
            <h3 className="font-serif text-xl font-bold text-charcoal-800">No destinations found</h3>
            <p className="text-xs text-charcoal-500 mt-1 max-w-sm mx-auto">
              We couldn't find a region matching "{searchTerm}". Try clearing your search or filter options.
            </p>
            <button
              onClick={() => { setSearchTerm(''); setTypeFilter('all'); setCategoryFilter('all'); }}
              className="mt-4 btn-forest text-xs py-2 px-5"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Load More Button if filtered items exceed visibleCount */}
        {filteredRegions.length > visibleCount && (
          <div className="text-center mt-12">
            <button
              onClick={() => setVisibleCount((prev) => prev + 12)}
              className="btn-outline-forest text-xs uppercase tracking-wider font-semibold py-3 px-8"
            >
              Load More Regions ({filteredRegions.length - visibleCount} remaining)
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
