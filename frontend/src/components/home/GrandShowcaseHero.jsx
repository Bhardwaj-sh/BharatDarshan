import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Play, Pause, Compass, ArrowRight, MapPin, Sparkles, Grid } from 'lucide-react';
import { REGIONS_DATA, getRegionFloatingPanels } from '../../data/regionsData';

export default function GrandShowcaseHero() {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const totalRegions = REGIONS_DATA.length;
  const currentRegion = REGIONS_DATA[currentIndex];
  const panels = getRegionFloatingPanels(currentRegion);

  // Auto-advance timer (6.5 seconds per slide)
  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalRegions);
    }, 6500);
    return () => clearInterval(timer);
  }, [isPlaying, totalRegions]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? totalRegions - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalRegions);
  };

  const formatSeq = (num) => String(num + 1).padStart(2, '0');

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between bg-midnight-950 overflow-hidden text-white select-none">
      
      {/* 1. Cinematic Full-Screen Background Image Crossfade */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentRegion.id}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 bg-cover bg-center bg-no-repeat filter brightness-[0.72] contrast-[1.05]"
            style={{
              backgroundImage: `url(${currentRegion.heroImage})`,
            }}
          />
        </AnimatePresence>

        {/* Ambient Dark Navy Vignette and Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-midnight-950/95 via-midnight-950/65 to-midnight-950/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-midnight-950 via-transparent to-midnight-950/70" />
      </div>

      {/* 2. Top Spacer for Navbar */}
      <div className="h-28 sm:h-32" />

      {/* 3. Main Center Stage (Left Typography + Right Floating Panels) */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto py-4 sm:py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Sequence, Realm Subtitle, Headline, Narrative & CTA */}
          <div className="lg:col-span-6 space-y-5 text-left">
            
            {/* Sequence Counter & Realm Tag */}
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs sm:text-sm font-black tracking-widest text-cyan-400">
                {formatSeq(currentIndex)} — {formatSeq(totalRegions - 1)}
              </span>
              <div className="w-8 h-[1px] bg-cyan-400/40" />
              <span className="text-[11px] sm:text-xs uppercase font-extrabold tracking-[0.2em] text-slate-300">
                {currentRegion.type === 'state' ? 'State of India' : 'Union Territory'}
              </span>
            </div>

            {/* Massive Bold Sans Headline (Exact Reference Styling) */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentRegion.id}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              >
                <h1 className="font-display text-5xl sm:text-7xl md:text-8xl font-black text-white tracking-tight uppercase leading-[0.95] drop-shadow-[0_15px_30px_rgba(0,0,0,0.9)]">
                  {currentRegion.name}
                </h1>
              </motion.div>
            </AnimatePresence>

            {/* Narrative Excerpt */}
            <AnimatePresence mode="wait">
              <motion.p
                key={currentRegion.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="text-sm sm:text-base md:text-lg text-slate-200/90 font-normal leading-relaxed max-w-xl"
              >
                {currentRegion.description}
              </motion.p>
            </AnimatePresence>

            {/* CTA & Quick Details */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                to={`/region/${currentRegion.slug}`}
                className="btn-luxury-white group"
              >
                <span>Explore {currentRegion.name}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <div className="hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-xs text-slate-300 font-semibold">
                <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                <span>Capital: <strong className="text-white">{currentRegion.capital}</strong></span>
              </div>
            </div>

          </div>

          {/* Right Column: Signature 3-Panel Floating Photographic Mosaic from Reference */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentRegion.id}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center gap-3 sm:gap-4"
              >
                {/* 1. Large Primary Floating Panel */}
                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  className="relative w-44 sm:w-64 md:w-72 h-[340px] sm:h-[420px] md:h-[450px] rounded-[2rem] overflow-hidden glass-floating-card shrink-0"
                >
                  <img
                    src={panels.primary.image}
                    alt={panels.primary.title}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-midnight-950/90 via-midnight-950/20 to-transparent" />
                  
                  {/* Top Floating Badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] sm:text-xs font-bold text-white border border-white/20 flex items-center gap-1.5 shadow-md">
                      <Sparkles className="w-3 h-3 text-cyan-400" />
                      {panels.primary.title}
                    </span>
                  </div>

                  {/* Bottom Number */}
                  <div className="absolute bottom-4 left-4 z-10">
                    <span className="font-mono text-xs font-black text-cyan-400 bg-midnight-950/70 px-2 py-0.5 rounded-md border border-cyan-400/30">
                      {panels.primary.tag}
                    </span>
                  </div>
                </motion.div>

                {/* 2. Secondary Stacked Panels (2 Small) */}
                <div className="flex flex-col gap-3 sm:gap-4">
                  
                  {/* Top Stacked Card */}
                  <motion.div
                    whileHover={{ y: -5, scale: 1.03 }}
                    transition={{ duration: 0.3 }}
                    className="relative w-36 sm:w-48 md:w-52 h-[162px] sm:h-[200px] md:h-[215px] rounded-[1.75rem] overflow-hidden glass-floating-card"
                  >
                    <img
                      src={panels.secondary.image}
                      alt={panels.secondary.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-midnight-950/80 via-transparent to-transparent" />
                    
                    <div className="absolute top-3 left-3 z-10">
                      <span className="px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-[9px] sm:text-[10px] font-bold text-slate-200 border border-white/20">
                        {panels.secondary.title}
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-3 z-10">
                      <span className="font-mono text-[10px] font-black text-cyan-400 bg-midnight-950/70 px-1.5 py-0.5 rounded border border-cyan-400/30">
                        {panels.secondary.tag}
                      </span>
                    </div>
                  </motion.div>

                  {/* Bottom Stacked Card */}
                  <motion.div
                    whileHover={{ y: -5, scale: 1.03 }}
                    transition={{ duration: 0.3 }}
                    className="relative w-36 sm:w-48 md:w-52 h-[162px] sm:h-[200px] md:h-[215px] rounded-[1.75rem] overflow-hidden glass-floating-card"
                  >
                    <img
                      src={panels.tertiary.image}
                      alt={panels.tertiary.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-midnight-950/80 via-transparent to-transparent" />
                    
                    <div className="absolute top-3 left-3 z-10">
                      <span className="px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-[9px] sm:text-[10px] font-bold text-slate-200 border border-white/20">
                        {panels.tertiary.title}
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-3 z-10">
                      <span className="font-mono text-[10px] font-black text-cyan-400 bg-midnight-950/70 px-1.5 py-0.5 rounded border border-cyan-400/30">
                        {panels.tertiary.tag}
                      </span>
                    </div>
                  </motion.div>

                </div>

              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>

      {/* 4. Bottom Interactive Controls Bar */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-8 sm:pb-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/10">
          
          {/* Previous / Next Controls & Play/Pause */}
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrev}
              className="p-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-all cursor-pointer hover:border-cyan-400 hover:shadow-cyan-glow"
              aria-label="Previous Region"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-all cursor-pointer hover:border-cyan-400"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause className="w-4 h-4 text-cyan-400" /> : <Play className="w-4 h-4 text-white" />}
            </button>

            <button
              onClick={handleNext}
              className="p-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-all cursor-pointer hover:border-cyan-400 hover:shadow-cyan-glow"
              aria-label="Next Region"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Center Scrubbable Progress Line */}
          <div className="w-full sm:w-72 flex items-center gap-3">
            <span className="font-mono text-xs text-slate-400">{formatSeq(currentIndex)}</span>
            <div className="flex-1 h-1 bg-white/20 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-cyan-400 shadow-cyan-glow"
                animate={{ width: `${((currentIndex + 1) / totalRegions) * 100}%` }}
                transition={{ duration: 0.4 }}
              />
            </div>
            <span className="font-mono text-xs text-slate-400">{formatSeq(totalRegions - 1)}</span>
          </div>

          {/* Quick Region Selector Drawer Trigger */}
          <button
            onClick={() => setIsDrawerOpen(!isDrawerOpen)}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-bold text-slate-200 hover:text-white transition-all cursor-pointer"
          >
            <Grid className="w-4 h-4 text-cyan-400" />
            <span>Select Region ({totalRegions})</span>
          </button>

        </div>

        {/* Expandable Quick Region Selector Drawer */}
        <AnimatePresence>
          {isDrawerOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="overflow-hidden mt-4 pt-4 border-t border-white/10"
            >
              <div className="flex items-center gap-2.5 overflow-x-auto pb-3 scrollbar-thin">
                {REGIONS_DATA.map((r, i) => (
                  <button
                    key={r.id}
                    onClick={() => {
                      setCurrentIndex(i);
                      setIsDrawerOpen(false);
                    }}
                    className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                      currentIndex === i
                        ? 'bg-cyan-400 text-midnight-950 font-black shadow-cyan-glow'
                        : 'bg-white/10 text-slate-300 hover:bg-white/20 hover:text-white border border-white/10'
                    }`}
                  >
                    <span className="font-mono text-[10px] opacity-75">{formatSeq(i)}</span>
                    <span>{r.name}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
}
