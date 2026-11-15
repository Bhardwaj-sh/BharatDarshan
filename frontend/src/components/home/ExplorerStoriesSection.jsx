import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote, ShieldCheck, MapPin } from 'lucide-react';
import BrushDivider from '../common/BrushDivider';

export default function ExplorerStoriesSection() {
  const testimonials = [
    {
      name: 'Dr. Ananya Sharma',
      location: 'Bengaluru, India',
      tour: 'Royal Rajasthan Heritage Circuit (9 Days)',
      quote: 'Having exactly one master package per state removed weeks of planning stress. The desert camp in Jaisalmer under the stars was pure magic, and the pricing was 100% transparent without any hidden charges.',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      rating: 5,
    },
    {
      name: 'Marcus & Elena Vance',
      location: 'Melbourne, Australia',
      tour: 'Kashmir Paradise & Alpine Lakes (7 Days)',
      quote: 'Our Kashmiri houseboat stay on Nigeen Lake and the trek to Betaab Valley were seamless. The local guide Tariq felt like family. Bharat Darshan is the gold standard for exploring India with dignity.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      rating: 5,
    }
  ];

  return (
    <section className="relative bg-forest-900 text-white overflow-hidden py-16 sm:py-24">
      {/* Background ambient radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(210,245,62,0.06)_0%,transparent_60%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* Left Column: Visual Highlight */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-forest-800 text-lime-400 text-xs font-bold uppercase tracking-wider border border-lime-400/30">
              <Quote className="w-3.5 h-3.5 text-lime-400" />
              <span>Real Traveler Journeys</span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-[1.15]">
              Stories & Experiences from Explorers
            </h2>

            <p className="text-slate-300 text-base leading-relaxed">
              Every year, thousands of conscious travelers discover the sacred geography of India through our carefully paced master circuits.
            </p>

            {/* Visual Card */}
            <div className="relative rounded-3xl overflow-hidden border border-forest-750 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80"
                alt="Rajasthan Desert Journey"
                className="w-full h-48 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/40 to-transparent p-5 flex flex-col justify-end">
                <span className="text-xs font-bold text-lime-300 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" /> Thar Desert, Jaisalmer
                </span>
                <span className="text-sm font-semibold text-white mt-0.5">
                  “A constellation sky you will carry with you forever.”
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Testimonial Cards */}
          <div className="lg:col-span-7 space-y-6">
            {testimonials.map((t, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="p-6 sm:p-7 rounded-3xl bg-forest-850/90 border border-forest-750 hover:border-lime-400/40 shadow-xl transition-all duration-300"
              >
                {/* Rating Stars */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <p className="text-slate-200 text-sm sm:text-base leading-relaxed italic mb-6">
                  "{t.quote}"
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-forest-800">
                  <div className="flex items-center gap-3.5">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="w-11 h-11 rounded-full object-cover border-2 border-lime-400/60 shadow-md"
                    />
                    <div>
                      <h4 className="font-display text-sm font-bold text-white flex items-center gap-1.5">
                        {t.name}
                        <ShieldCheck className="w-4 h-4 text-lime-400" />
                      </h4>
                      <p className="text-xs text-slate-400">{t.location}</p>
                    </div>
                  </div>

                  <span className="hidden sm:inline-block px-3 py-1 rounded-full bg-forest-800 text-[11px] font-semibold text-emerald-300 border border-forest-700">
                    {t.tour.split('(')[0]}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>

      {/* Signature White Jagged Torn-Paper / Brush Edge Divider to next cream section */}
      <BrushDivider
        color="#FAFAF7"
        position="bottom"
        variant={2}
        className="mt-16 sm:mt-24"
      />
    </section>
  );
}
