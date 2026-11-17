import React from 'react';
import { Calendar, Clock, Sparkles, ArrowRight } from 'lucide-react';

export default function RegionHero({ region }) {
  const scrollToItinerary = () => {
    const el = document.getElementById('itinerary-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToCalculator = () => {
    const el = document.getElementById('calculator-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center pt-32 pb-20 overflow-hidden bg-forest-950 text-white">
      
      {/* Background Photography with Modern Vignette */}
      <div className="absolute inset-0 z-0">
        <img
          src={region.heroImage || 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=2000&q=85'}
          alt={region.name}
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=2000&q=85';
          }}
          className="w-full h-full object-cover object-center filter brightness-65 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-900/50 to-forest-950/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        
        {/* Territory Tag */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-forest-900/80 text-lime-400 border border-lime-400/30 mb-5 backdrop-blur-md text-xs font-bold uppercase tracking-wider shadow-lime-glow">
          <Sparkles className="w-3.5 h-3.5 text-lime-400 animate-pulse" />
          <span>Flagship Master Tour · {region.type === 'state' ? 'State of India' : 'Union Territory'}</span>
        </div>

        {/* Region Title */}
        <h1 className="font-display text-5xl sm:text-7xl md:text-8xl font-black tracking-tight text-white mb-4 drop-shadow-2xl">
          {region.name}
        </h1>

        {/* Tagline */}
        <p className="font-display text-lg sm:text-2xl text-lime-300 font-bold max-w-2xl mb-6">
          "{region.tagline}"
        </p>

        {/* Summary Description */}
        <p className="max-w-2xl text-sm sm:text-base text-slate-200 leading-relaxed mb-8 font-normal">
          {region.introduction?.history?.slice(0, 240)}...
        </p>

        {/* Quick Badges Bar */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs bg-forest-900/80 backdrop-blur-xl border border-forest-750 rounded-full px-6 py-3 mb-10 shadow-2xl text-white font-medium">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-lime-400" />
            <span className="font-bold">{region.durationDays} Days / {region.durationNights} Nights</span>
          </div>
          <span className="text-white/30">|</span>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-lime-400" />
            <span>Best Season: <strong className="text-lime-300">{region.bestSeason}</strong></span>
          </div>
          <span className="text-white/30">|</span>
          <div className="flex items-center gap-2">
            <span>From: <strong className="font-display text-lime-400 text-base font-black">₹{region.startingPrice.toLocaleString('en-IN')}</strong> / person</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={scrollToCalculator}
            className="btn-lime px-8 py-3.5 text-xs uppercase tracking-wider font-extrabold cursor-pointer"
          >
            <span>Book Tour Enquiry</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={scrollToItinerary}
            className="px-8 py-3.5 rounded-full bg-forest-800 text-slate-200 border border-forest-700 hover:border-lime-400/50 hover:text-white text-xs uppercase tracking-wider font-bold transition-all cursor-pointer"
          >
            Explore Master Itinerary
          </button>
        </div>

      </div>

    </section>
  );
}
