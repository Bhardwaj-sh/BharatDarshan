import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Flame, Eye, Compass, Music, Palette, UtensilsCrossed, BookOpen } from 'lucide-react';

const CULTURE_PILLARS = [
  {
    id: 'architecture',
    icon: Compass,
    title: 'Monolithic Architecture',
    subtitle: 'Five Millennia of Stonecraft',
    tag: 'Sacred Geometry',
    image: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1200&q=80',
    quote: '"Indian temple architecture does not merely shelter divinity; it translates cosmic geometry into living granite."',
    points: [
      'Brihadisvara Temple (Thanjavur) — 1,000-year-old monolithic granite vimana',
      'Khajuraho & Konark — Intricate celestial carvings celebrating life and devotion',
      'Hoysala Marvels (Belur & Halebidu) — Soapstone filigree unrivaled anywhere on earth',
      'Mughal & Rajput Fortresses — Amber, Mehrangarh, and Fatehpur Sikri marble lattice'
    ]
  },
  {
    id: 'festivals',
    icon: Flame,
    title: 'Living Celebrations',
    subtitle: 'Where Time Dissolves in Devotion',
    tag: 'Living Rituals',
    image: 'https://images.unsplash.com/photo-1608889825103-eb5ed706fc64?auto=format&fit=crop&w=1200&q=80',
    quote: '"A festival in India is never a spectator event; it is an immersion where communities, seasons, and ancient myths fuse into ecstasy."',
    points: [
      'Dev Deepawali (Varanasi) — 1 million earthen lamps illuminating the sacred Ganga ghats',
      'Hornbill Festival (Nagaland) — 16 indigenous tribes celebrating heritage in the Kisama Valley',
      'Pushkar Camel Fair (Rajasthan) — Desert dunes transformed by music, nomads, and folk ballads',
      'Thrissur Pooram (Kerala) — Celestial percussion ensembles and majestic temple traditions'
    ]
  },
  {
    id: 'gastronomy',
    icon: UtensilsCrossed,
    title: 'Ancestral Gastronomy',
    subtitle: 'The World’s Original Spice Routes',
    tag: 'Ancient Flavors',
    image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=1200&q=80',
    quote: '"Indian culinary tradition is an Ayurvedic science of balance, where every spice serves flavor, medicine, and memory."',
    points: [
      'Awadhi Dum Pukht (Lucknow) — Slow-cooked sealed clay pots with royal saffron and cardamoms',
      'Malabar Spice Route (Kerala) — Black pepper, coconut cream, and coastal heirloom recipes',
      'Wazwan Banquet (Kashmir) — 36-course ritual feast honoring mountain hospitality',
      'Rajasthani Royal Thali — Dal Baati Churma, Gatte ki Sabzi, and wood-fired millet flatbreads'
    ]
  },
  {
    id: 'handicrafts',
    icon: Palette,
    title: 'Master Looms & Crafts',
    subtitle: 'Living Heritage Kept by Master Hands',
    tag: 'Artisan Lineages',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=80',
    quote: '"In every woven thread of a Banarasi zari or Pashmina shawl lies generational memory passed from mother to daughter."',
    points: [
      'Banarasi & Kanjeevaram Silks — Pure gold zari woven on handlooms across centuries',
      'Kashmiri Pashmina & Sozni Needlework — Featherlight warmth from Changthangi goat wool',
      'Kutch Rogan & Ajrakh Block Printing — Natural indigo and mineral dyes stamped onto cotton',
      'Tanjore & Madhubani Artworks — Sacred gold leaf and natural pigments capturing mythology'
    ]
  }
];

export default function LivingCultureSection() {
  const [activeTab, setActiveTab] = useState(CULTURE_PILLARS[0].id);
  const activePillar = CULTURE_PILLARS.find((p) => p.id === activeTab) || CULTURE_PILLARS[0];

  return (
    <section id="culture" className="relative py-28 bg-midnight-950 text-white overflow-hidden border-t border-white/5">
      {/* Subtle radial ambient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-cyan-500/5 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Living Heritage & Soul</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white font-display">
            The Living Fabric of <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-sky-200">Indian Civilization</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-400 font-light leading-relaxed">
            India is not an open-air museum of relics; it is an uninterrupted five-thousand-year living continuum where classical rituals, architecture, culinary sciences, and sacred arts are practiced every sunrise.
          </p>
        </div>

        {/* Tab Navigation Pill Bar */}
        <div className="flex justify-center mb-14">
          <div className="inline-flex p-1.5 rounded-full bg-midnight-900 border border-white/10 backdrop-blur-md overflow-x-auto max-w-full">
            {CULTURE_PILLARS.map((pillar) => {
              const Icon = pillar.icon;
              const isActive = activeTab === pillar.id;
              return (
                <button
                  key={pillar.id}
                  onClick={() => setActiveTab(pillar.id)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'bg-cyan-500 text-midnight-950 font-bold shadow-cyan-glow border border-cyan-400'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-midnight-950' : 'text-cyan-400'}`} />
                  <span>{pillar.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Editorial Feature Showcase */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activePillar.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
          >
            {/* Visual Panel Left (7 Cols) */}
            <div className="lg:col-span-7 relative">
              <div className="relative rounded-3xl overflow-hidden h-[460px] sm:h-[520px] bg-midnight-900 border border-white/15 shadow-floating-panel group">
                <img
                  src={activePillar.image}
                  alt={activePillar.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-midnight-950 via-midnight-950/40 to-transparent" />

                {/* Floating Micro Tag Top Left */}
                <div className="absolute top-5 left-5 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-cyan-400/40 text-cyan-300 text-xs font-mono font-semibold tracking-wide">
                  {activePillar.tag}
                </div>

                {/* Floating Quote Bottom */}
                <div className="absolute bottom-6 left-6 right-6 p-6 rounded-2xl bg-midnight-950/85 backdrop-blur-xl border border-white/10">
                  <p className="text-sm sm:text-base italic font-serif text-slate-200 leading-relaxed">
                    {activePillar.quote}
                  </p>
                </div>
              </div>
            </div>

            {/* Content Panel Right (5 Cols) */}
            <div className="lg:col-span-5 flex flex-col justify-center">
              <span className="text-xs uppercase tracking-widest text-cyan-400 font-mono font-semibold mb-2 block">
                {activePillar.subtitle}
              </span>

              <h3 className="text-2xl sm:text-3xl font-black font-display text-white mb-4">
                {activePillar.title}
              </h3>

              <div className="space-y-4 my-6">
                {activePillar.points.map((pt, i) => (
                  <div key={i} className="flex items-start gap-3 p-3.5 rounded-xl bg-midnight-900/60 border border-white/5 hover:border-cyan-500/30 transition-colors">
                    <div className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold font-mono">
                      {i + 1}
                    </div>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {pt}
                    </p>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center gap-4">
                <a
                  href="#interactive-map"
                  className="btn-luxury-cyan text-xs font-bold uppercase tracking-wider px-6 py-3"
                >
                  Explore Regions With This Heritage
                </a>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}
