import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Mountain, Waves, Landmark, Trees, Flame, Utensils, ArrowUpRight, Sparkles } from 'lucide-react';

const EXPERIENCES = [
  {
    id: 'mountains',
    title: 'Himalayan High Passes',
    subtitle: 'Ladakh • Kashmir • Himachal • Sikkim',
    image: 'https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?auto=format&fit=crop&w=1200&q=85',
    category: 'mountains',
    accentColor: '#38BDF8',
    glowColor: 'rgba(56, 189, 248, 0.3)',
    badgeClass: 'bg-sky-500/20 text-sky-300 border-sky-400/40',
    desc: 'Snow-capped passes, ancient cliffside Buddhist gompas, and crystal alpine lakes reflecting high-altitude skies.'
  },
  {
    id: 'heritage',
    title: 'Royal Citadels & Havelis',
    subtitle: 'Rajasthan • Gujarat • Madhya Pradesh',
    image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=85',
    category: 'heritage',
    accentColor: '#F59E0B',
    glowColor: 'rgba(245, 158, 11, 0.35)',
    badgeClass: 'bg-amber-500/20 text-amber-300 border-amber-400/40',
    desc: 'Intricate sandstone battlements, mirror-inlaid royal palaces, and timeless camel caravans beneath desert stars.'
  },
  {
    id: 'beaches',
    title: 'Emerald Backwaters & Lagoons',
    subtitle: 'Kerala • Goa • Andaman • Lakshadweep',
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=85',
    category: 'beaches',
    accentColor: '#10B981',
    glowColor: 'rgba(16, 185, 129, 0.35)',
    badgeClass: 'bg-emerald-500/20 text-emerald-300 border-emerald-400/40',
    desc: 'Glide through palm-fringed lagoons on private thatched houseboats and discover untouched turquoise coral atolls.'
  },
  {
    id: 'spiritual',
    title: 'Sacred Corridors & Eternal Ghats',
    subtitle: 'Varanasi • Tamil Nadu • Punjab • Uttarakhand',
    image: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1200&q=85',
    category: 'spiritual',
    accentColor: '#F97316',
    glowColor: 'rgba(249, 115, 22, 0.35)',
    badgeClass: 'bg-orange-500/20 text-orange-300 border-orange-400/40',
    desc: 'Dawn chanting by sacred riverbanks, soaring Dravidian granite gopurams, and five millennia of unbroken living devotion.'
  },
  {
    id: 'wildlife',
    title: 'Living Root Bridges & Rainforests',
    subtitle: 'Meghalaya • Assam • Western Ghats',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=85',
    category: 'wildlife',
    accentColor: '#059669',
    glowColor: 'rgba(5, 150, 105, 0.35)',
    badgeClass: 'bg-teal-500/20 text-teal-300 border-teal-400/40',
    desc: 'Bio-engineered rubber root bridges nurtured across generations, cloud-swaddled gorges, and untamed wildlife corridors.'
  },
  {
    id: 'culture',
    title: 'Living Traditions & Royal Cuisines',
    subtitle: 'Bengal • Maharashtra • Karnataka • Delhi',
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=1200&q=85',
    category: 'culture',
    accentColor: '#A855F7',
    glowColor: 'rgba(168, 85, 247, 0.35)',
    badgeClass: 'bg-purple-500/20 text-purple-300 border-purple-400/40',
    desc: 'Centuries-old spice bazaars, classical Kathakali rituals, master silk handlooms, and ancestral Awadhi royal banquets.'
  }
];

export default function CinematicExperienceSection() {
  return (
    <section id="experiences" className="relative py-24 sm:py-28 bg-[#FAFAF9] text-slate-900 overflow-hidden border-t border-slate-200">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-800 text-xs font-bold uppercase tracking-widest shadow-sm mb-4">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>The Cultural & Geographical Tapestry</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-black text-slate-900 tracking-tight">
              Explore India <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-orange-600 to-emerald-600">By Experience</span>
            </h2>
          </div>

          <p className="text-sm sm:text-base text-slate-600 font-normal max-w-md">
            Six distinct geographical and cultural ecosystems spanning the Indian subcontinent, each with its master journey.
          </p>
        </div>

        {/* 6 Large Photographic Visual Slabs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {EXPERIENCES.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              whileHover={{ y: -6 }}
              className="group relative h-[420px] rounded-3xl overflow-hidden border border-slate-200/90 flex flex-col justify-end p-6 sm:p-8 transition-all duration-500 shadow-[0_10px_30px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_45px_rgba(0,0,0,0.14)]"
            >
              {/* Background Photography with Zoom Hover */}
              <div className="absolute inset-0 z-0">
                <img
                  src={exp.image}
                  alt={exp.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                  loading="lazy"
                />
                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20" />
              </div>

              {/* Top Floating Badge */}
              <div className="absolute top-5 left-5 right-5 flex items-center justify-between z-10">
                <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[11px] font-bold uppercase tracking-wider text-slate-800 shadow-md">
                  {exp.category}
                </span>

                <div 
                  className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center transition-all group-hover:scale-110 shadow-md"
                >
                  <ArrowUpRight className="w-4 h-4 text-slate-900" />
                </div>
              </div>

              {/* Bottom Content Card */}
              <div className="relative z-10 space-y-2">
                <div className="text-xs uppercase tracking-widest font-mono font-bold text-amber-300">
                  {exp.subtitle}
                </div>

                <h3 className="text-2xl font-black font-display text-white group-hover:text-amber-200 transition-colors">
                  {exp.title}
                </h3>

                <p className="text-xs text-slate-200 line-clamp-2 leading-relaxed font-normal">
                  {exp.desc}
                </p>

                <div className="pt-3">
                  <a
                    href="#master-journeys"
                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider transition-colors text-white hover:text-amber-300"
                  >
                    <span>Discover Itineraries</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
