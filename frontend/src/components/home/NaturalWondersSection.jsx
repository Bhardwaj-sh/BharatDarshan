import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Waves, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import BrushDivider from '../common/BrushDivider';

export default function NaturalWondersSection() {
  const wonders = [
    {
      title: 'UNESCO Biosphere Sanctuaries',
      desc: 'Sundarbans mangrove tigers, Nilgiri cloud forests, and Valley of Flowers.'
    },
    {
      title: 'Pristine Coastal Waters',
      desc: 'Turquoise lagoons of Lakshadweep and vibrant coral reefs of Andaman.'
    },
    {
      title: 'Indigenous Eco-Preservation',
      desc: 'Living root bridges nurtured across generations by the Khasi people.'
    }
  ];

  return (
    <section className="relative bg-cream-50 text-slate-900 overflow-hidden py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Signature Brush-Masked Turquoise Waters Photo */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 relative"
          >
            <div className="relative mx-auto max-w-lg">
              {/* Image Frame with Rounded Brush Shape */}
              <div className="overflow-hidden rounded-[2.5rem] shadow-2xl border-4 border-white bg-forest-900">
                <img
                  src="https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=1200&q=80"
                  alt="Turquoise waters of Andaman & Lakshadweep"
                  className="w-full h-[380px] sm:h-[440px] object-cover hover:scale-105 transition-transform duration-700"
                />
                
                {/* Atmospheric gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-forest-950/70 via-transparent to-transparent" />
                
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <span className="text-xs font-bold tracking-widest uppercase text-lime-300 flex items-center gap-1.5">
                    <Waves className="w-4 h-4 text-lime-300" /> Marine Sanctuary
                  </span>
                  <h3 className="font-display text-xl font-bold mt-1">
                    Radhanagar Beach & Coral Coves
                  </h3>
                </div>
              </div>

              {/* Floating Highlight Capsule */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-6 -right-4 sm:-right-6 bg-forest-900 text-white px-5 py-3 rounded-2xl border border-lime-400/30 shadow-xl flex items-center gap-3"
              >
                <div className="w-3 h-3 rounded-full bg-lime-400 animate-ping" />
                <span className="text-xs font-bold text-slate-100">
                  Protected Natural Heritage
                </span>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Column: Narrative & Wonders List */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-forest-900 text-lime-400 text-xs font-bold uppercase tracking-wider shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-lime-400" />
              <span>India’s Natural Wonders</span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-forest-900 tracking-tight leading-[1.15]">
              Beautiful Natural Wonders to Explore
            </h2>

            <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal">
              Beyond the historical monuments lies an ancient wilderness of volcanic islands, living root bridges, tea-blanketed plateaus, and snow leopards. Every itinerary respects the land.
            </p>

            {/* Wonders feature items */}
            <div className="space-y-4 pt-2">
              {wonders.map((w, idx) => (
                <div key={idx} className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
                  <CheckCircle2 className="w-5 h-5 text-forest-700 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-forest-900">{w.title}</h4>
                    <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">{w.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Lime CTA Button */}
            <div className="pt-4">
              <Link
                to="/explore"
                className="btn-lime px-8 py-4 text-sm font-black shadow-lime-glow group"
              >
                <span>Discover Wonders</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Signature Dark Forest Jagged Torn-Paper / Brush Edge Divider to next dark section */}
      <BrushDivider
        color="#0B2019"
        position="bottom"
        variant={1}
        className="mt-16 sm:mt-24"
      />
    </section>
  );
}
