import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Compass, ArrowRight, Sparkles, ShieldCheck, Flame } from 'lucide-react';
import { CATEGORIES } from '../../data/regionsData';

export default function HeroSection({ onSearch }) {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch({ search: searchTerm, type: selectedType, category: selectedCategory });
      const element = document.getElementById('explore-regions');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(`/explore?search=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <section className="relative min-h-[95vh] flex items-center justify-center pt-32 pb-24 overflow-hidden bg-slate-950 text-white">
      
      {/* High-Impact Visual Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=2400&q=90"
          alt="Incredible India Majestic Heritage"
          className="w-full h-full object-cover object-center opacity-40 scale-105 filter brightness-90 animate-pulse-slow"
        />
        {/* Modern multi-layer gradient vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-950/80" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-saffron-500/20 via-rose-500/10 to-transparent blur-3xl rounded-full pointer-events-none" />
      </div>

      {/* Content Island */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        
        {/* Glow Tag Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-white text-xs font-bold tracking-wider uppercase mb-6 shadow-glow-glass">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>India’s 36 Territories · 1 Flagship Tour Each</span>
        </div>

        {/* High-Impact Headline */}
        <h1 className="font-display text-4xl sm:text-6xl md:text-8xl font-black tracking-tight text-white mb-6 leading-[1.08]">
          Explore India’s <br />
          <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 bg-clip-text text-transparent">
            Finest Journeys
          </span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl text-base sm:text-xl text-slate-300 font-normal leading-relaxed mb-10">
          From the golden dunes of Rajasthan to the high passes of Ladakh and palm-fringed Kerala. Every State and Union Territory thoughtfully planned into one master journey.
        </p>

        {/* Floating High-Tech Search Island */}
        <div className="w-full max-w-4xl bg-white/95 backdrop-blur-2xl rounded-3xl p-3 sm:p-4 shadow-2xl border border-white/50 text-slate-800">
          <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            
            {/* Search Input */}
            <div className="md:col-span-5 flex items-center gap-3 bg-slate-100/90 rounded-2xl px-4 py-3 text-left border border-slate-200/60">
              <MapPin className="w-5 h-5 text-saffron-500 flex-shrink-0" />
              <div className="flex-grow">
                <label className="block text-[10px] uppercase font-bold tracking-wider text-slate-400">
                  Where do you want to go?
                </label>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="e.g. Rajasthan, Kerala, Ladakh..."
                  className="w-full bg-transparent text-sm font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none"
                />
              </div>
            </div>

            {/* Region Type Filter */}
            <div className="md:col-span-3 flex items-center gap-3 bg-slate-100/90 rounded-2xl px-4 py-3 text-left border border-slate-200/60">
              <Compass className="w-5 h-5 text-amber-500 flex-shrink-0" />
              <div className="flex-grow">
                <label className="block text-[10px] uppercase font-bold tracking-wider text-slate-400">
                  Territory
                </label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full bg-transparent text-xs font-semibold text-slate-900 focus:outline-none cursor-pointer"
                >
                  <option value="all">All 36 Regions</option>
                  <option value="state">28 Indian States</option>
                  <option value="UT">8 Union Territories</option>
                </select>
              </div>
            </div>

            {/* Category Filter */}
            <div className="md:col-span-2 flex items-center gap-2 bg-slate-100/90 rounded-2xl px-4 py-3 text-left border border-slate-200/60">
              <div className="flex-grow">
                <label className="block text-[10px] uppercase font-bold tracking-wider text-slate-400">
                  Theme
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full bg-transparent text-xs font-semibold text-slate-900 focus:outline-none cursor-pointer"
                >
                  <option value="all">All Themes</option>
                  {CATEGORIES.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Action Button */}
            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full btn-gradient py-3.5 px-4 text-xs uppercase tracking-wider font-bold rounded-2xl flex items-center justify-center gap-2 shadow-glow-saffron hover:scale-[1.02] active:scale-95 transition-all"
              >
                <span>Find Trips</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </form>
        </div>

        {/* Live Metrics Floating Bar */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs text-slate-300 font-medium">
          <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            <span>28 States & 8 Union Territories</span>
          </div>
          <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full backdrop-blur-md">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Zero-Trust Server Verified Pricing</span>
          </div>
          <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full backdrop-blur-md">
            <Flame className="w-4 h-4 text-saffron-400" />
            <span>1 Flagship Tour Per Region</span>
          </div>
        </div>

      </div>

    </section>
  );
}
