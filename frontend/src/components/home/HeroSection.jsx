import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Calendar, Compass, ArrowRight, Sparkles } from 'lucide-react';
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
    <section className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-20 overflow-hidden bg-forest-950 text-ivory-100">
      
      {/* Background Image with Dark Vignette Gradient */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=2000&q=85"
          alt="Historic Fort in India"
          className="w-full h-full object-cover object-center opacity-30 filter brightness-75 scale-105 animate-pulse-slow"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-forest-950/80 via-forest-900/60 to-forest-950" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        
        {/* Curated Journey Pill Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-forest-800/80 border border-gold-500/40 text-gold-400 text-xs font-medium tracking-widest uppercase mb-6 shadow-soft backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-gold-400" />
          <span>36 Regions · Exactly 1 Tour Package Each</span>
        </div>

        {/* Cinematic Headline */}
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white mb-6 leading-[1.15]">
          Discover the Soul of <br />
          <span className="italic font-normal text-gold-400">Incredible India</span>
        </h1>

        {/* Supporting Copy */}
        <p className="max-w-2xl text-base sm:text-lg text-ivory-200/90 mb-10 font-normal leading-relaxed">
          From the regal hill forts of Rajasthan to the serene backwaters of Kerala and high passes of Ladakh — explore every Indian State and Union Territory through one masterfully planned journey.
        </p>

        {/* Integrated Floating Search & Discovery Bar (Inspired by Design Reference) */}
        <div className="w-full max-w-4xl bg-forest-900/85 backdrop-blur-md border border-white/15 p-3 md:p-4 rounded-3xl shadow-2xl">
          <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            
            {/* Search Input */}
            <div className="md:col-span-5 flex items-center gap-3 bg-forest-950/70 border border-white/10 rounded-2xl px-4 py-3 text-left">
              <MapPin className="w-5 h-5 text-gold-400 flex-shrink-0" />
              <div className="flex-grow">
                <label className="block text-[10px] uppercase tracking-wider text-ivory-300 font-semibold">
                  Where to in India?
                </label>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="e.g. Rajasthan, Kerala, Ladakh..."
                  className="w-full bg-transparent text-sm text-ivory-100 placeholder:text-ivory-300/50 focus:outline-none"
                />
              </div>
            </div>

            {/* Region Type Filter */}
            <div className="md:col-span-3 flex items-center gap-3 bg-forest-950/70 border border-white/10 rounded-2xl px-4 py-3 text-left">
              <Compass className="w-5 h-5 text-gold-400 flex-shrink-0" />
              <div className="flex-grow">
                <label className="block text-[10px] uppercase tracking-wider text-ivory-300 font-semibold">
                  Territory Type
                </label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full bg-transparent text-sm text-ivory-100 focus:outline-none cursor-pointer"
                >
                  <option value="all" className="bg-forest-900 text-ivory-100">All 36 Regions</option>
                  <option value="state" className="bg-forest-900 text-ivory-100">28 States</option>
                  <option value="UT" className="bg-forest-900 text-ivory-100">8 Union Territories</option>
                </select>
              </div>
            </div>

            {/* Category Filter */}
            <div className="md:col-span-2 flex items-center gap-2 bg-forest-950/70 border border-white/10 rounded-2xl px-4 py-3 text-left">
              <div className="flex-grow">
                <label className="block text-[10px] uppercase tracking-wider text-ivory-300 font-semibold">
                  Theme
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full bg-transparent text-xs text-ivory-100 focus:outline-none cursor-pointer"
                >
                  <option value="all" className="bg-forest-900 text-ivory-100">All Themes</option>
                  {CATEGORIES.map((cat) => (
                    <option key={cat.id} value={cat.id} className="bg-forest-900 text-ivory-100">
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Submit Button */}
            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full btn-gold py-3.5 px-4 text-xs uppercase tracking-wider font-semibold rounded-2xl flex items-center justify-center gap-2 shadow-glow-gold"
              >
                <span>Explore</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </form>
        </div>

        {/* Quick Highlights Bar */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs text-ivory-300">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-gold-400" />
            <span>28 Indian States</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-gold-400" />
            <span>8 Union Territories</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-gold-400" />
            <span>Verified Per-Person Pricing</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-gold-400" />
            <span>OpenStreetMap Visual Guides</span>
          </div>
        </div>

      </div>

    </section>
  );
}
