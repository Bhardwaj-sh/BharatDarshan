import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, Volume2, VolumeX, Compass } from 'lucide-react';

export default function CinematicIntro({ onComplete }) {
  const [progress, setProgress] = useState(0);

  // Auto-advance timer (5 seconds)
  useEffect(() => {
    const startTime = Date.now();
    const duration = 5200;

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const current = Math.min((elapsed / duration) * 100, 100);
      setProgress(current);

      if (elapsed >= duration) {
        clearInterval(interval);
        onComplete();
      }
    }, 40);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-midnight-950 overflow-hidden select-none"
    >
      {/* Background Cinematic Visual: Female Travel Host in Royal Indian Landscape */}
      <div className="absolute inset-0 z-0">
        <motion.div
          initial={{ scale: 1.15, y: 15 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ duration: 7, ease: 'easeOut' }}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat filter brightness-[0.78] contrast-[1.08]"
          style={{
            // High-resolution photorealistic imagery of an elegant female traveler on a palace terrace at dawn overlooking mist
            backgroundImage: `url('https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=2400&q=90')`,
          }}
        />

        {/* Ambient Twilight Vignette & Atmospheric Fog Layers */}
        <div className="absolute inset-0 bg-gradient-to-t from-midnight-950 via-midnight-950/40 to-midnight-950/80" />
        <div className="absolute inset-0 bg-radial-vignette opacity-80" />
      </div>

      {/* Skip Intro Floating Glass Button (Top Right) */}
      <div className="absolute top-6 right-6 sm:top-8 sm:right-8 z-30 flex items-center gap-3">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onComplete}
          className="btn-luxury-glass text-xs uppercase tracking-widest px-5 py-2.5 font-bold shadow-cyan-glow flex items-center gap-2 group cursor-pointer"
        >
          <span>Skip Intro</span>
          <ArrowRight className="w-3.5 h-3.5 text-cyan-400 group-hover:translate-x-1 transition-transform" />
        </motion.button>
      </div>

      {/* Main Center Cinema Stage */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white">
        
        {/* Subtle Brand Pill */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-cyan-400 text-xs font-bold tracking-[0.25em] uppercase mb-8 shadow-cyan-glow"
        >
          <Compass className="w-3.5 h-3.5 text-cyan-400 animate-spin-slow" />
          <span>A Visual Travel Film</span>
        </motion.div>

        {/* Title Reveal */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.94, y: 25 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-white tracking-tighter leading-none mb-6 drop-shadow-[0_15px_35px_rgba(0,0,0,0.9)]"
        >
          BHARAT DARSHAN
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="font-display text-sm sm:text-base md:text-xl text-slate-200 uppercase tracking-[0.3em] font-semibold mb-12"
        >
          An Extraordinary Journey Through India
        </motion.p>

        {/* Cinematic Progress Bar */}
        <div className="w-64 sm:w-80 mx-auto h-[2px] bg-white/20 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-cyan-400 to-white shadow-cyan-glow"
            style={{ width: `${progress}%` }}
          />
        </div>

      </div>

      {/* Subtle Bottom Travel Host Tag */}
      <div className="absolute bottom-6 left-6 z-20 hidden sm:flex items-center gap-2 text-[11px] uppercase tracking-widest text-slate-400 font-semibold">
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
        <span>Curated Exploration • India</span>
      </div>
    </motion.div>
  );
}
