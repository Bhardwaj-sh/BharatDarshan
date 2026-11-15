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
    desc: 'Snow-capped passes, ancient Buddhist gompas, and azure alpine lakes reflecting the sky.'
  },
  {
    id: 'heritage',
    title: 'Royal Citadels & Havelis',
    subtitle: 'Rajasthan • Gujarat • Madhya Pradesh',
    image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=85',
    category: 'heritage',
    desc: 'Intricate sandstone battlements, mirror-inlaid royal palaces, and timeless desert legends.'
  },
  {
    id: 'beaches',
    title: 'Emerald Backwaters & Coral Lagoons',
    subtitle: 'Kerala • Goa • Andaman • Lakshadweep',
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=85',
    category: 'beaches',
    desc: 'Glide through palm-fringed lagoons on thatched houseboats and discover pristine coral reefs.'
  },
  {
    id: 'spiritual',
    title: 'Sacred Corridors & Eternal Ghats',
    subtitle: 'Varanasi • Tamil Nadu • Punjab • Uttarakhand',
    image: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1200&q=85',
    category: 'spiritual',
    desc: 'Dawn chanting by sacred riverbanks, soaring Dravidian gopurams, and millennia of unbroken devotion.'
  },
  {
    id: 'wildlife',
    title: 'Untouched Rainforests & Living Bridges',
    subtitle: 'Meghalaya • Assam • Western Ghats',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=85',
    category: 'wildlife',
    desc: 'Bio-engineered root bridges nurtured across generations, cloud gorges, and one-horned rhinos.'
  },
  {
    id: 'culture',
    title: 'Living Traditions & Regional Cuisines',
    subtitle: 'Bengal • Maharashtra • Karnataka • Delhi',
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=1200&q=85',
    category: 'culture',
    desc: 'Century-old spice markets, classical Kathakali rituals, master handlooms, and regal feasts.'
  }
];

export default function CinematicExperienceSection() {
  return (
    <section id="experiences" className="relative py-24 sm:py-32 bg-midnight-950 text-white overflow-hidden">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-cyan-500/10 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-sapphire-500/10 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-400 text-xs font-bold uppercase tracking-widest shadow-cyan-glow mb-4">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>The Geographic Tapestry</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight uppercase">
              Explore India by Experience
            </h2>
          </div>

          <p className="text-sm sm:text-base text-slate-300 font-medium max-w-md">
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
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group relative h-[420px] rounded-3xl overflow-hidden glass-panel border border-white/15 shadow-2xl cursor-pointer"
            >
              {/* Background Photography with Zoom Hover */}
              <img
                src={exp.image}
                alt={exp.title}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108 filter brightness-[0.75]"
              />

              {/* Shading Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-midnight-950 via-midnight-950/40 to-transparent" />

              {/* Content Overlay */}
              <div className="absolute inset-0 p-7 flex flex-col justify-between z-10">
                
                {/* Top Subtitle */}
                <div className="flex items-center justify-between">
                  <span className="badge-cyan text-[10px]">
                    {exp.subtitle.split('•')[0]}
                  </span>
                  <div className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white group-hover:bg-cyan-400 group-hover:text-midnight-950 transition-colors">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

                {/* Bottom Details */}
                <div className="space-y-2">
                  <span className="text-[11px] uppercase font-bold tracking-widest text-cyan-300 block">
                    {exp.subtitle}
                  </span>
                  <h3 className="font-display text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {exp.title}
                  </h3>
                  <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                    {exp.desc}
                  </p>

                  <div className="pt-3">
                    <Link
                      to={`/explore?category=${exp.category}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-400 hover:text-white transition-colors"
                    >
                      <span>Discover Circuits</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
