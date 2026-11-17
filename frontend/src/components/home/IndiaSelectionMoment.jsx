import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function IndiaSelectionMoment({ onComplete }) {
  // Auto-advance after 3.8 seconds into the Grand Showcase
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 3800);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.9 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-midnight-950 overflow-hidden select-none"
    >
      {/* Background Deep Midnight Gradient & Radial Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,229,255,0.15)_0%,rgba(3,7,18,0.95)_75%)]" />

      {/* Grid Pattern Background */}
      <div 
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(to right, #FFF 1px, transparent 1px), linear-gradient(to bottom, #FFF 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />

      {/* Skip / Enter Showcase Button */}
      <div className="absolute top-8 right-8 z-30">
        <button
          onClick={onComplete}
          className="btn-luxury-glass text-xs uppercase tracking-widest px-5 py-2.5 font-bold shadow-cyan-glow flex items-center gap-2 cursor-pointer"
        >
          <span>Enter Showcase</span>
          <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
        </button>
      </div>

      {/* Center Illuminated India Map Stage */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center max-w-4xl mx-auto px-6">
        
        {/* Animated India Vector Representation with Electric Cyan Glowing Borders */}
        <div className="relative w-72 h-80 sm:w-96 sm:h-[400px] flex items-center justify-center mb-8">
          
          {/* Radial Light Pulse behind India */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: [1, 1.25, 1], opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute inset-0 bg-cyan-400/20 blur-[70px] rounded-full pointer-events-none"
          />

          {/* Precision SVG Silhouette of India with Glowing Stroke */}
          <svg
            viewBox="0 0 400 450"
            className="w-full h-full filter drop-shadow-[0_0_35px_rgba(0,229,255,0.8)]"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* India Boundary Path */}
            <motion.path
              d="M175,25 C190,20 210,35 225,50 C240,65 260,60 270,80 C280,100 295,115 310,120 C335,130 355,145 365,165 C370,185 360,205 345,215 C330,225 320,240 315,260 C310,280 295,305 285,325 C275,345 260,370 245,395 C230,420 215,440 200,445 C190,440 180,410 170,380 C160,350 145,330 135,305 C125,280 110,260 100,240 C90,220 80,200 85,180 C90,160 105,145 120,130 C135,115 150,90 160,65 Z"
              fill="rgba(5, 11, 24, 0.75)"
              stroke="#00E5FF"
              strokeWidth="3.5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.8, ease: 'easeInOut' }}
            />

            {/* Internal State Meridian Lines */}
            <motion.path
              d="M140,150 Q200,165 280,150 M110,220 Q200,240 300,220 M140,290 Q200,310 270,290 M170,360 Q200,375 240,360"
              fill="none"
              stroke="rgba(0, 229, 255, 0.35)"
              strokeWidth="1.5"
              strokeDasharray="4 4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 1 }}
            />

            {/* Glowing Territory Beacons */}
            {[
              { cx: 190, cy: 60, name: 'Kashmir & Ladakh' },
              { cx: 140, cy: 170, name: 'Rajasthan' },
              { cx: 180, cy: 400, name: 'Kerala & Tamil Nadu' },
              { cx: 330, cy: 160, name: 'Northeast' },
              { cx: 200, cy: 230, name: 'Heartland' }
            ].map((pt, i) => (
              <g key={i}>
                <motion.circle
                  cx={pt.cx}
                  cy={pt.cy}
                  r="5"
                  fill="#00E5FF"
                  initial={{ scale: 0 }}
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ delay: 1 + i * 0.15, duration: 2, repeat: Infinity }}
                />
                <circle cx={pt.cx} cy={pt.cy} r="2" fill="#FFFFFF" />
              </g>
            ))}
          </svg>
        </div>

        {/* Display Typography */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="space-y-3"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-400 text-xs font-black tracking-[0.2em] uppercase">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>The Subcontinent Awakens</span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight uppercase">
            INDIA — 36 REGIONS.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-white">
              ENDLESS STORIES.
            </span>
          </h2>

          <p className="text-sm sm:text-base text-slate-300 font-medium max-w-xl mx-auto tracking-wide">
            Entering the definitive master showcase across all 28 States and 8 Union Territories.
          </p>
        </motion.div>

      </div>
    </motion.div>
  );
}
