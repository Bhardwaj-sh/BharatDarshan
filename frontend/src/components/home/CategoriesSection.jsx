import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CATEGORIES } from '../../data/regionsData';
import { ArrowUpRight, Compass, Sparkles } from 'lucide-react';

export default function CategoriesSection() {
  return (
    <section id="categories" className="py-28 bg-[#05070F] text-white relative overflow-hidden border-b border-white/10">
      
      {/* Background Animated Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[450px] bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-rose-500/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-16"
        >
          <div className="max-w-xl">
            <span className="text-xs uppercase font-extrabold tracking-widest text-amber-400 mb-3 block">
              Curated Travel Themes
            </span>
            <h2 className="font-display text-4xl sm:text-6xl font-black text-white tracking-tight">
              Journeys Defined by Experience
            </h2>
          </div>
          <p className="text-sm sm:text-base text-slate-400 max-w-sm mt-4 md:mt-0 leading-relaxed font-normal">
            Whether you seek high Himalayan summits, royal desert palaces, or tranquil backwaters, find your spirit's journey.
          </p>
        </motion.div>

        {/* Categories Grid with Framer Motion */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map((cat, index) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link
                to={`/explore?category=${cat.id}`}
                className="group relative block h-88 rounded-3xl overflow-hidden border border-white/10 shadow-2xl hover:border-amber-500/50 hover:shadow-[0_0_35px_rgba(245,158,11,0.25)] transition-all duration-500"
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 filter brightness-95"
                />
                
                {/* Gradient Mask */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent group-hover:via-slate-950/15 transition-all duration-300" />

                {/* Content Overlay */}
                <div className="absolute inset-0 p-7 flex flex-col justify-between z-10">
                  
                  <div className="flex items-center justify-between">
                    <span className="bg-black/60 backdrop-blur-md border border-white/15 text-amber-300 text-[10px] font-extrabold uppercase tracking-wider px-3.5 py-1.5 rounded-full">
                      {cat.count} Regions
                    </span>
                    <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-gradient-to-r group-hover:from-amber-500 group-hover:to-orange-500 group-hover:scale-110 transition-all duration-300">
                      <ArrowUpRight className="w-5 h-5" />
                    </div>
                  </div>

                  <div>
                    <h3 className="font-display text-2xl sm:text-3xl font-black text-white group-hover:text-amber-300 transition-colors">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-slate-300 mt-1 font-normal">
                      Explore regional master itineraries
                    </p>
                  </div>

                </div>
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
