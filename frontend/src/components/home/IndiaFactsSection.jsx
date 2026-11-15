import React from 'react';
import { motion } from 'framer-motion';
import { INDIA_FACTS } from '../../data/regionsData';
import { ShieldCheck, Compass, MapPin, Award } from 'lucide-react';

export default function IndiaFactsSection() {
  const icons = [MapPin, Compass, Award, ShieldCheck];

  return (
    <section className="py-28 bg-[#070A14] text-white border-b border-white/10 relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-2xl mx-auto mb-20"
        >
          <span className="text-xs uppercase font-extrabold tracking-widest text-amber-400 mb-2 block">
            Authenticity & Integrity
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-black text-white">
            India at a Glance
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-2 font-normal">
            Verified platform facts and geographic realities — without fabricated statistics.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {INDIA_FACTS.map((fact, index) => {
            const IconComponent = icons[index % icons.length];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -6 }}
                className="bg-slate-900/60 backdrop-blur-xl rounded-3xl p-8 border border-white/10 hover:border-amber-500/40 hover:shadow-[0_0_30px_rgba(245,158,11,0.15)] transition-all flex flex-col justify-between"
              >
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 text-amber-400 flex items-center justify-center mb-8 shadow-sm">
                  <IconComponent className="w-7 h-7" />
                </div>
                <div>
                  <span className="font-display text-3xl sm:text-4xl font-black text-white block mb-1">
                    {fact.value}
                  </span>
                  <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                    {fact.label}
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed font-normal">
                    {fact.detail}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
