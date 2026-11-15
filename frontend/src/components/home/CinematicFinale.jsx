import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Compass, MapPin } from 'lucide-react';

export default function CinematicFinale({ onExploreClick }) {
  const handleScrollToTop = () => {
    if (onExploreClick) {
      onExploreClick();
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-midnight-950 text-white">
      {/* Background Breathtaking Indian Landscape */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1506461883276-594a12b11cf3?auto=format&fit=crop&w=2400&q=85"
          alt="Breathtaking Indian Landscape"
          className="w-full h-full object-cover scale-105 animate-[kenBurnsDrift_25s_ease-in-out_infinite_alternate]"
        />
        {/* Deep midnight luxury gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-midnight-950 via-midnight-950/75 to-midnight-950/60" />
        <div className="absolute inset-0 bg-radial-at-c from-transparent via-midnight-950/50 to-midnight-950" />
      </div>

      {/* Center Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Micro Brand Tag */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-400/40 text-cyan-300 text-xs font-mono font-semibold uppercase tracking-widest mb-8 backdrop-blur-md shadow-cyan-glow">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span>Discover India • Experience Every Journey</span>
          </div>

          {/* Headline as requested */}
          <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black font-display tracking-tight text-white uppercase leading-[1.05] drop-shadow-2xl">
            India is Waiting. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-200 to-white">
              Your Journey Starts Here.
            </span>
          </h2>

          <p className="mt-6 text-base sm:text-xl text-slate-300 max-w-2xl mx-auto font-light leading-relaxed">
            36 States & Union Territories. Five millennia of living civilization. 
            One extraordinary, curated cinematic experience waiting for you.
          </p>

          {/* Interactive Action Island */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={handleScrollToTop}
              className="btn-luxury-cyan px-8 py-4 text-sm font-bold tracking-widest uppercase rounded-full flex items-center justify-center gap-3 cursor-pointer group shadow-cyan-glow"
            >
              <Compass className="w-5 h-5 text-midnight-950 group-hover:rotate-45 transition-transform duration-500" />
              <span>Begin Exploring All 36 Regions</span>
              <ArrowRight className="w-4 h-4 text-midnight-950 group-hover:translate-x-1 transition-transform" />
            </button>

            <a
              href="#interactive-map"
              className="btn-luxury-glass px-8 py-4 text-sm font-semibold tracking-wider uppercase rounded-full flex items-center justify-center gap-2 text-white hover:text-cyan-300 transition-colors"
            >
              <MapPin className="w-4 h-4 text-cyan-400" />
              <span>Open Interactive India Map</span>
            </a>
          </div>

          {/* Bottom Micro Counters */}
          <div className="mt-16 pt-8 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-3xl mx-auto">
            <div>
              <div className="text-2xl sm:text-3xl font-black font-mono text-cyan-400">28</div>
              <div className="text-[11px] uppercase tracking-wider text-slate-400 mt-1 font-mono">States</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black font-mono text-cyan-400">08</div>
              <div className="text-[11px] uppercase tracking-wider text-slate-400 mt-1 font-mono">Union Territories</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black font-mono text-cyan-400">36</div>
              <div className="text-[11px] uppercase tracking-wider text-slate-400 mt-1 font-mono">Master Itineraries</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black font-mono text-cyan-400">100%</div>
              <div className="text-[11px] uppercase tracking-wider text-slate-400 mt-1 font-mono">Server Verified</div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
