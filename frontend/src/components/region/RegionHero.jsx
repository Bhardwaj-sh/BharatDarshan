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
    <section className="relative min-h-[85vh] flex items-center justify-center pt-28 pb-16 overflow-hidden bg-forest-950 text-ivory-100">
      
      {/* Background Photography with Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={region.heroImage}
          alt={region.name}
          className="w-full h-full object-cover object-center filter brightness-60 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/40 to-forest-950/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        
        {/* Territory Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-forest-900/80 border border-gold-500/50 text-gold-400 text-xs font-semibold tracking-widest uppercase mb-4 backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-gold-400" />
          <span>Flagship Reference Journey · {region.type === 'state' ? 'State of India' : 'Union Territory'}</span>
        </div>

        {/* Region Title */}
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white mb-4">
          {region.name}
        </h1>

        {/* Subtitle */}
        <p className="font-serif italic text-lg sm:text-2xl text-gold-300 max-w-2xl mb-6 font-normal">
          "{region.tagline}"
        </p>

        {/* Summary Description */}
        <p className="max-w-2xl text-xs sm:text-sm text-ivory-200/90 leading-relaxed mb-8">
          {region.introduction?.history?.slice(0, 240)}...
        </p>

        {/* Key Quick Badges Bar */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs bg-forest-900/80 backdrop-blur-md border border-white/10 rounded-full px-6 py-3 mb-10 shadow-lg">
          <div className="flex items-center gap-2 text-ivory-100">
            <Clock className="w-4 h-4 text-gold-400" />
            <span className="font-semibold">{region.durationDays} Days / {region.durationNights} Nights</span>
          </div>
          <span className="text-white/20">|</span>
          <div className="flex items-center gap-2 text-ivory-100">
            <Calendar className="w-4 h-4 text-gold-400" />
            <span>Best Season: <strong className="text-gold-300">{region.bestSeason}</strong></span>
          </div>
          <span className="text-white/20">|</span>
          <div className="flex items-center gap-2 text-ivory-100">
            <span>From: <strong className="font-serif text-gold-400 text-base">₹{region.startingPrice.toLocaleString('en-IN')}</strong> / person</span>
          </div>
        </div>

        {/* Action CTAs */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={scrollToCalculator}
            className="btn-gold py-3.5 px-8 text-xs uppercase tracking-wider font-bold shadow-glow-gold"
          >
            <span>Book Tour Enquiry</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </button>
          <button
            onClick={scrollToItinerary}
            className="btn-outline-gold py-3.5 px-8 text-xs uppercase tracking-wider font-semibold"
          >
            Explore 9-Day Itinerary
          </button>
        </div>

      </div>

    </section>
  );
}
