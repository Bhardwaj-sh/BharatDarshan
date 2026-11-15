import React, { useState } from 'react';
import { motion } from 'framer-motion';
import BrushDivider from '../common/BrushDivider';

export default function EditorialQuoteSection() {
  const [hoveredPill, setHoveredPill] = useState(null);

  return (
    <section className="relative bg-forest-900 text-white overflow-hidden py-14 sm:py-20">
      {/* Background ambient radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(210,245,62,0.06)_0%,transparent_70%)] pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-6 sm:px-8 text-center">
        {/* Animated Main Editorial Quote with Inline Image Pills */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-[2.6rem] font-bold text-slate-100 leading-[1.6] sm:leading-[1.7] tracking-tight"
        >
          Life becomes more meaningful when you
          
          {/* Inline Image Pill 1 (Misty Lake / Mountains) */}
          <span 
            className="relative inline-block align-middle mx-2.5 my-1"
            onMouseEnter={() => setHoveredPill(1)}
            onMouseLeave={() => setHoveredPill(null)}
          >
            <motion.img
              whileHover={{ scale: 1.15, rotate: -2 }}
              animate={{ y: [0, -4, 0] }}
              transition={{ 
                y: { duration: 3.5, repeat: Infinity, ease: 'easeInOut' },
                scale: { duration: 0.25 }
              }}
              src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"
              alt="Misty Mountain Haven"
              className="w-16 sm:w-24 md:w-28 h-8 sm:h-10 md:h-12 rounded-full object-cover border-2 border-lime-400/80 shadow-lime-glow cursor-pointer"
            />
            {hoveredPill === 1 && (
              <motion.span
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className="absolute -top-9 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-full bg-forest-950 text-lime-400 text-[10px] font-bold uppercase tracking-wider whitespace-nowrap border border-lime-400/40 shadow-xl pointer-events-none z-20"
              >
                Dal Lake, Kashmir
              </motion.span>
            )}
          </span>

          take a moment to pause and breathe deep. Among majestic mountains and

          {/* Inline Image Pill 2 (Tropical Backwaters / Sea) */}
          <span 
            className="relative inline-block align-middle mx-2.5 my-1"
            onMouseEnter={() => setHoveredPill(2)}
            onMouseLeave={() => setHoveredPill(null)}
          >
            <motion.img
              whileHover={{ scale: 1.15, rotate: 2 }}
              animate={{ y: [0, 4, 0] }}
              transition={{ 
                y: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
                scale: { duration: 0.25 }
              }}
              src="https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=400&q=80"
              alt="Kerala Backwaters"
              className="w-16 sm:w-24 md:w-28 h-8 sm:h-10 md:h-12 rounded-full object-cover border-2 border-lime-400/80 shadow-lime-glow cursor-pointer"
            />
            {hoveredPill === 2 && (
              <motion.span
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className="absolute -top-9 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-full bg-forest-950 text-lime-400 text-[10px] font-bold uppercase tracking-wider whitespace-nowrap border border-lime-400/40 shadow-xl pointer-events-none z-20"
              >
                Alleppey, Kerala
              </motion.span>
            )}
          </span>

          sacred rivers, we discover the quiet beauty that stays with us long after the journey ends.
        </motion.div>

        {/* Small sub-caption */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-lime-400/80 mt-6"
        >
          — The Philosophy of Bharat Darshan
        </motion.p>
      </div>

      {/* Signature White Jagged Torn-Paper / Brush Edge Divider to next cream section */}
      <BrushDivider
        color="#FAFAF7"
        position="bottom"
        variant={2}
        className="mt-12"
      />
    </section>
  );
}
