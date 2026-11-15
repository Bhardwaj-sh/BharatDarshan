import React from 'react';
import { motion } from 'framer-motion';
import BrushDivider from '../common/BrushDivider';

export default function CherishedMemoryBanner() {
  return (
    <section className="relative min-h-[480px] sm:min-h-[540px] flex flex-col justify-between bg-forest-950 text-white overflow-hidden">
      {/* Background Cinematic Photo with Mist Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=2000&q=85')`,
        }}
      >
        {/* Dark Emerald & Mist Shading */}
        <div className="absolute inset-0 bg-gradient-to-b from-forest-900/90 via-forest-950/70 to-forest-950/95" />
        <div className="absolute inset-0 bg-forest-900/40 backdrop-blur-[2px]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center my-auto py-16 sm:py-24">
        {/* Animated Badge */}
        <motion.span
          initial={{ opacity: 0, y: -15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-block text-xs font-black tracking-[0.25em] uppercase text-lime-400 mb-4"
        >
          Timeless Indian Journeys
        </motion.span>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-display text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-[1.15]"
        >
          Every moment becomes a <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-300 via-lime-400 to-emerald-300">
            Cherished Memory
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-xl mx-auto text-sm sm:text-base text-slate-300 font-medium leading-relaxed mt-6"
        >
          Glide across misty mountain lakes, walk beneath thousand-year-old temple corridors, and sleep under desert constellations.
        </motion.p>
      </div>

      {/* Signature White Jagged Torn-Paper / Brush Edge Divider to next cream section */}
      <BrushDivider
        color="#FAFAF7"
        position="bottom"
        variant={1}
        className="mt-auto"
      />
    </section>
  );
}
