import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Play, Pause, Compass, ArrowRight, MapPin, Sparkles, Grid } from 'lucide-react';
import { REGIONS_DATA, getRegionFloatingPanels } from '../../data/regionsData';
import { STATE_COLOR_MAP } from './InteractiveIndiaMap';

export default function GrandShowcaseHero() {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const totalRegions = REGIONS_DATA.length;
  const currentRegion = REGIONS_DATA[currentIndex];
  const panels = getRegionFloatingPanels(currentRegion);
  const regionTheme = STATE_COLOR_MAP[currentRegion.id] || { fill: '#B45309', border: '#FDE68A' };

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
    <div className="relative min-h-screen w-full flex flex-col justify-between bg-[#06070B] overflow-hidden text-white select-none">
      
      {/* 1. Cinematic Full-Screen Background Image Crossfade */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentRegion.id}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 bg-cover bg-center bg-no-repeat filter brightness-[0.76] contrast-[1.08]"
            style={{
              backgroundImage: `url(${currentRegion.heroImage})`,
            }}
          />
        </AnimatePresence>

        {/* Warm Ambient Vignette and Gradients (Replacing cold blue) */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#06070B]/95 via-[#06070B]/60 to-[#06070B]/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#06070B] via-transparent to-[#06070B]/70" />
        <div 
          className="absolute inset-0 opacity-20 pointer-events-none transition-colors duration-1000"
          style={{
            background: `radial-gradient(circle at 70% 40%, ${regionTheme.fill} 0%, transparent 60%)`
          }}
        />
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
              <span 
                className="font-mono text-xs sm:text-sm font-black tracking-widest"
                style={{ color: regionTheme.border }}
              >
                {formatSeq(currentIndex)} — {formatSeq(totalRegions - 1)}
              </span>
              <div 
                className="w-8 h-[1.5px]" 
                style={{ backgroundColor: regionTheme.border }}
              />
              <span className="text-[11px] sm:text-xs uppercase font-extrabold tracking-[0.2em] text-slate-300">
                {currentRegion.type === 'Union Territory' ? 'Union Territory' : 'State of India'}
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
                className="btn-luxury-gold group shadow-gold-glow"
              >
                <span>Explore {currentRegion.name}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <div className="hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-md text-xs text-slate-200 font-semibold">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
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
                  style={{ borderColor: `${regionTheme.border}40` }}
                >
                  <img
                    src={panels.primary.image}
                    alt={panels.primary.title}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#06070B]/90 via-[#06070B]/20 to-transparent" />
                  
                  {/* Top Floating Badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-[10px] sm:text-xs font-bold text-white border border-white/20 flex items-center gap-1.5 shadow-md">
                      <Sparkles className="w-3 h-3 text-amber-400" />
                      {panels.primary.title}
                    </span>
                  </div>

                  {/* Bottom Number */}
                  <div className="absolute bottom-4 left-4 z-10">
                    <span 
                      className="font-mono text-xs font-black bg-black/80 px-2 py-0.5 rounded-md border"
                      style={{ color: regionTheme.border, borderColor: `${regionTheme.border}60` }}
                    >
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
                    style={{ borderColor: `${regionTheme.border}30` }}
                  >
                    <img
                      src={panels.secondary.image}
                      alt={panels.secondary.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#06070B]/80 via-transparent to-transparent" />
                    
                    <div className="absolute top-3 left-3 z-10">
                      <span className="px-2.5 py-0.5 rounded-full bg-black/70 backdrop-blur-md text-[9px] sm:text-[10px] font-bold text-slate-200 border border-white/20">
                        {panels.secondary.title}
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-3 z-10">
                      <span 
                        className="font-mono text-[10px] font-black bg-black/80 px-1.5 py-0.5 rounded border"
                        style={{ color: regionTheme.border, borderColor: `${regionTheme.border}60` }}
                      >
                        {panels.secondary.tag}
                      </span>
                    </div>
                  </motion.div>

                  {/* Bottom Stacked Card */}
                  <motion.div
                    whileHover={{ y: -5, scale: 1.03 }}
                    transition={{ duration: 0.3 }}
                    className="relative w-36 sm:w-48 md:w-52 h-[162px] sm:h-[200px] md:h-[215px] rounded-[1.75rem] overflow-hidden glass-floating-card"
                    style={{ borderColor: `${regionTheme.border}30` }}
                  >
                    <img
                      src={panels.tertiary.image}
                      alt={panels.tertiary.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#06070B]/80 via-transparent to-transparent" />
                    
                    <div className="absolute top-3 left-3 z-10">
                      <span className="px-2.5 py-0.5 rounded-full bg-black/70 backdrop-blur-md text-[9px] sm:text-[10px] font-bold text-slate-200 border border-white/20">
                        {panels.tertiary.title}
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-3 z-10">
                      <span 
                        className="font-mono text-[10px] font-black bg-black/80 px-1.5 py-0.5 rounded border"
                        style={{ color: regionTheme.border, borderColor: `${regionTheme.border}60` }}
                      >
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
              className="p-3 rounded-full bg-white/10 hover:bg-amber-500 hover:text-midnight-950 border border-white/20 text-white transition-all cursor-pointer shadow-md"
              aria-label="Previous Region"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-3 rounded-full bg-white/10 hover:bg-amber-500 hover:text-midnight-950 border border-white/20 text-white transition-all cursor-pointer shadow-md"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-current" />}
            </button>

            <button
              onClick={handleNext}
              className="p-3 rounded-full bg-white/10 hover:bg-amber-500 hover:text-midnight-950 border border-white/20 text-white transition-all cursor-pointer shadow-md"
              aria-label="Next Region"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            <span className="text-xs text-slate-300 font-mono ml-2 hidden sm:inline">
              Auto-cycling 36 Regions
            </span>
          </div>

          {/* Scrubbable Progress Line Bar */}
          <div className="flex-1 max-w-md mx-4 hidden md:flex items-center gap-3">
            <span className="font-mono text-xs text-amber-300 font-bold">{formatSeq(currentIndex)}</span>
            <div className="relative flex-1 h-1.5 bg-white/15 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full transition-all duration-300"
                style={{
                  width: `${((currentIndex + 1) / totalRegions) * 100}%`,
                  backgroundColor: regionTheme.border,
                  boxShadow: `0 0 12px ${regionTheme.border}`
                }}
              />
            </div>
            <span className="font-mono text-xs text-slate-400">{formatSeq(totalRegions - 1)}</span>
          </div>

          {/* Region Quick Select Trigger */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="px-4 py-2 rounded-full bg-white/10 hover:bg-amber-500 hover:text-midnight-950 border border-white/15 text-xs font-mono font-bold tracking-wider uppercase flex items-center gap-2 transition-all cursor-pointer"
            >
              <Grid className="w-4 h-4" />
              <span>Select Region ({totalRegions})</span>
            </button>
          </div>

        </div>
      </div>

      {/* 5. Region Quick Select Modal Drawer */}
      <AnimatePresence>
        {isDrawerOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={() => setIsDrawerOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#0E1017] border border-amber-400/30 rounded-3xl p-6 sm:p-8 max-w-4xl w-full max-h-[85vh] overflow-y-auto shadow-2xl"
            >
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center font-bold text-xs font-mono">
                    36
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold text-white">Select Any State or Union Territory</h3>
                    <p className="text-xs text-slate-400">Directly jump to any of the 36 definitive Indian regions</p>
                  </div>
                </div>

                <button
                  onClick={() => setIsDrawerOpen(false)}
                  className="p-2 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer text-xs font-mono font-bold"
                >
                  ✕ Close
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {REGIONS_DATA.map((region, idx) => {
                  const isCurrent = idx === currentIndex;
                  const theme = STATE_COLOR_MAP[region.id] || { fill: '#B45309', border: '#FDE68A' };
                  return (
                    <button
                      key={region.id}
                      onClick={() => {
                        setCurrentIndex(idx);
                        setIsDrawerOpen(false);
                      }}
                      className={`p-3 rounded-2xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                        isCurrent
                          ? 'bg-amber-500/20 border-amber-400 shadow-gold-glow'
                          : 'bg-white/5 border-white/10 hover:border-amber-400/40 hover:bg-white/10'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span 
                          className="w-2.5 h-2.5 rounded-full"
                          style={{ backgroundColor: theme.fill }}
                        />
                        <span className="font-mono text-[10px] text-slate-400">{formatSeq(idx)}</span>
                      </div>
                      <div className="font-bold text-xs text-white line-clamp-1">{region.name}</div>
                      <div className="text-[10px] text-slate-400 mt-0.5 line-clamp-1">{region.capital}</div>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
