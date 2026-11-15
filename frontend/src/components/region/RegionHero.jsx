import React from 'react';
import { Calendar, Clock, MapPin, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

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
    <section className="relative min-h-[85vh] flex items-center justify-center pt-32 pb-20 overflow-hidden bg-slate-950 text-white">
      
      {/* Background Photography with Modern Vignette */}
      <div className="absolute inset-0 z-0">
        <img
          src={region.heroImage}
          alt={region.name}
          className="w-full h-full object-cover object-center filter brightness-65 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        
        {/* Territory Tag */}
        <div className="badge-glow bg-white/10 text-amber-300 border-white/20 mb-4 backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Flagship Tour · {region.type === 'state' ? 'State of India' : 'Union Territory'}</span>
        </div>

        {/* Region Title */}
        <h1 className="font-display text-5xl sm:text-7xl md:text-8xl font-black tracking-tight text-white mb-4">
          {region.name}
        </h1>

        {/* Tagline */}
        <p className="font-display text-lg sm:text-2xl text-amber-300 font-semibold max-w-2xl mb-6">
          "{region.tagline}"
        </p>

        {/* Summary Description */}
        <p className="max-w-2xl text-sm sm:text-base text-slate-200 leading-relaxed mb-8 font-normal">
          {region.introduction?.history?.slice(0, 240)}...
        </p>

        {/* Quick Badges Bar */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl px-6 py-3 mb-10 shadow-glow-glass text-white font-medium">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-amber-400" />
            <span className="font-bold">{region.durationDays} Days / {region.durationNights} Nights</span>
          </div>
          <span className="text-white/30">|</span>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-amber-400" />
            <span>Best Season: <strong className="text-amber-300">{region.bestSeason}</strong></span>
          </div>
          <span className="text-white/30">|</span>
          <div className="flex items-center gap-2">
            <span>From: <strong className="font-display text-amber-400 text-base font-black">₹{region.startingPrice.toLocaleString('en-IN')}</strong> / person</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={scrollToCalculator}
            className="btn-gradient py-3.5 px-8 text-xs uppercase tracking-wider font-extrabold shadow-glow-saffron"
          >
            <span>Book Tour Enquiry</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </button>
          <button
            onClick={scrollToItinerary}
            className="btn-ghost-dark bg-white/10 text-white border-white/20 hover:bg-white/20 py-3.5 px-8 text-xs uppercase tracking-wider font-bold"
          >
            Explore 9-Day Itinerary
          </button>
        </div>

      </div>

    </section>
  );
}
