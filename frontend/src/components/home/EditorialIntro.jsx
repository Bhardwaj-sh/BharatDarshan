import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, Sparkles, ShieldCheck, Compass, Award } from 'lucide-react';

export default function EditorialIntro() {
  return (
    <section className="py-28 bg-[#070A14] text-white border-b border-white/10 relative overflow-hidden">
      
      {/* Background Ambient Mesh */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-orange-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Editorial Statement */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center mb-24"
        >
          <div className="badge-glow mb-4">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>The Bharat Darshan Philosophy</span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-tight">
            Travel without clutter. <br />
            <span className="text-gradient-sun">
              Experience the purest essence of every region.
            </span>
          </h2>
          
          <p className="mt-6 text-base sm:text-xl text-slate-300 leading-relaxed font-normal">
            Instead of confusing you with endless budget vs luxury tiers, we have crafted exactly one comprehensive, geographically realistic master journey for each of India's 36 States and Union Territories.
          </p>
        </motion.div>

        {/* Dual Showcase Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Feature Details */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 flex flex-col justify-center space-y-6"
          >
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-white shadow-[0_0_25px_rgba(245,158,11,0.4)]">
              <Compass className="w-7 h-7" />
            </div>

            <h3 className="font-display text-3xl sm:text-4xl font-black text-white">
              One Master Itinerary per Region
            </h3>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
              Every package is designed around realistic driving routes, monument timings, regional dining, and vetted heritage stays. You see verified per-person pricing that never changes once booked.
            </p>

            <div className="pt-2">
              <Link
                to="/region/rajasthan"
                className="btn-gradient text-xs uppercase tracking-wider py-4 px-7 font-extrabold shadow-glow-saffron"
              >
                <span>View Rajasthan Reference Tour</span>
                <ArrowUpRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </motion.div>

          {/* Right Visual Collage */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5"
          >
            
            <motion.div
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ duration: 0.4 }}
              className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10 group"
            >
              <img
                src="https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=900&q=80"
                alt="Rajasthan Palaces"
                className="w-full h-88 object-cover object-center group-hover:scale-108 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="text-[10px] uppercase tracking-wider font-extrabold bg-gradient-to-r from-amber-500 to-orange-500 text-white px-3 py-1 rounded-full shadow-md">
                  Flagship Reference
                </span>
                <h4 className="font-display text-2xl font-bold mt-2">
                  Royal Rajasthan (9 Days)
                </h4>
                <p className="text-xs text-slate-300 mt-1 font-normal">
                  Palaces, hill citadels & Thar desert dunes.
                </p>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ duration: 0.4 }}
              className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10 group sm:translate-y-8"
            >
              <img
                src="https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=900&q=80"
                alt="Kerala Backwaters"
                className="w-full h-88 object-cover object-center group-hover:scale-108 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="text-[10px] uppercase tracking-wider font-extrabold bg-emerald-500 text-white px-3 py-1 rounded-full shadow-md">
                  Coastal Sanctuary
                </span>
                <h4 className="font-display text-2xl font-bold mt-2">
                  God's Own Kerala (7 Days)
                </h4>
                <p className="text-xs text-slate-300 mt-1 font-normal">
                  Emerald backwaters & spice plantations.
                </p>
              </div>
            </motion.div>

          </motion.div>

        </div>

      </div>
    </section>
  );
}
