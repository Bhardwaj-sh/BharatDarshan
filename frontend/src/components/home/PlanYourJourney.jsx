import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, 
  Compass, 
  CalendarDays, 
  BedDouble, 
  Car, 
  MapPin, 
  IndianRupee, 
  CheckCircle, 
  Clock, 
  ArrowRight,
  Headphones
} from 'lucide-react';

const JOURNEY_STEPS = [
  {
    step: '01',
    title: 'Select Your Definitive Region',
    desc: 'Choose from 28 Indian States and 8 Union Territories. Unlike chaotic travel portals with hundreds of duplicate listings, we offer exactly ONE master itinerary crafted by regional cultural scholars.',
    icon: Compass,
    highlight: 'Strict 1-Tour Architecture'
  },
  {
    step: '02',
    title: 'Zero-Trust Server Pricing',
    desc: 'No hidden surge pricing or fabricated checkout fees. The per-person package pricing displayed on your screen is snapshotted and cryptographically verified directly from our MongoDB backend engine.',
    icon: IndianRupee,
    highlight: 'Cryptographic Price Lock'
  },
  {
    step: '03',
    title: 'Curated Heritage Stays & Transit',
    desc: 'Rest in authentic heritage havelis, luxury houseboats, and mountain eco-lodges with private chauffeur-driven sanitized transit from arrival to departure.',
    icon: BedDouble,
    highlight: 'Verified Stays & Private Transit'
  },
  {
    step: '04',
    title: 'Native Master Storyteller Guides',
    desc: 'Every milestone is narrated by government-licensed native historians and storytellers whose families have preserved the region’s living lore for generations.',
    icon: Headphones,
    highlight: 'Licensed Local Guides'
  }
];

const SAMPLE_BREAKDOWN = {
  region: 'Rajasthan Master Circuit',
  duration: '8 Days / 7 Nights',
  price: '₹38,500',
  inclusions: [
    { title: 'Accommodation', detail: '7 Nights in Heritage Haveli & Luxury Desert Camp', icon: BedDouble },
    { title: 'Transportation', detail: 'Private Chauffeur AC SUV throughout circuit', icon: Car },
    { title: 'Day-Wise Itinerary', detail: 'Jaipur, Jodhpur, Udaipur & Sam Sand Dunes', icon: CalendarDays },
    { title: 'Key Attractions', detail: 'Amber Fort, Mehrangarh, Lake Pichola boat safari', icon: MapPin },
    { title: 'Pricing Transparency', detail: 'Per person on double occupancy basis (All taxes included)', icon: IndianRupee },
  ]
};

export default function PlanYourJourney() {
  return (
    <section id="plan" className="relative py-28 bg-midnight-950 text-white overflow-hidden border-t border-white/5">
      {/* Background cyan beam */}
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
            <span>Effortless & Transparent Planning</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white font-display">
            How Every Journey <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-sky-200">Is Orchestrated</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-400 font-light leading-relaxed">
            From the moment you pick your state to the final sunrise of your journey, every detail is engineered for cinematic wonder and flawless execution.
          </p>
        </div>

        {/* 4 Architectural Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {JOURNEY_STEPS.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={step.step}
                className="relative p-6 rounded-2xl bg-midnight-900/80 border border-white/10 hover:border-cyan-400/50 transition-all duration-300 hover:shadow-cyan-glow flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl font-black font-mono text-cyan-400/40 group-hover:text-cyan-400 transition-colors">
                      {step.step}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-400/30 text-cyan-400 flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <span className="inline-block px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 text-[10px] font-mono uppercase tracking-wider font-semibold mb-2">
                    {step.highlight}
                  </span>

                  <h3 className="text-lg font-bold text-white mb-2 font-display">
                    {step.title}
                  </h3>

                  <p className="text-xs text-slate-400 leading-relaxed font-light">
                    {step.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-1.5 text-xs text-cyan-400 font-semibold">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Standard on all 36 Flagships</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Specimen Package Architecture Showcase */}
        <div className="p-8 sm:p-10 rounded-3xl bg-midnight-900/90 border border-white/15 shadow-floating-panel">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-5">
              <span className="text-xs uppercase tracking-widest text-cyan-400 font-mono font-semibold block mb-2">
                Specimen Package Blueprint
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold font-display text-white mb-3">
                {SAMPLE_BREAKDOWN.region}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mb-6 leading-relaxed font-light">
                Every tour package in Bharat Darshan follows a strict standard of five clear pillars: Day-wise chronological progression, handpicked accommodation, private transit, curated monument access, and guaranteed per-person pricing.
              </p>

              <div className="p-4 rounded-2xl bg-midnight-950/80 border border-white/10 flex items-center justify-between mb-6">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-slate-400 block font-mono">
                    Snapshotted Starting Price
                  </span>
                  <span className="text-2xl font-black text-cyan-400 font-mono">
                    {SAMPLE_BREAKDOWN.price}
                  </span>
                  <span className="text-[11px] text-slate-400 block">per adult / all taxes included</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase tracking-wider text-slate-400 block font-mono">
                    Duration
                  </span>
                  <span className="text-sm font-bold text-white">
                    {SAMPLE_BREAKDOWN.duration}
                  </span>
                </div>
              </div>

              <a
                href="#master-journeys"
                className="btn-luxury-cyan w-full text-xs font-bold uppercase tracking-wider py-3.5 flex items-center justify-center gap-2"
              >
                <span>Browse All 36 Flagship Packages</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            <div className="lg:col-span-7 space-y-3">
              {SAMPLE_BREAKDOWN.inclusions.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-midnight-950/60 border border-white/10 flex items-start gap-4 hover:border-cyan-400/40 transition-colors"
                  >
                    <div className="w-9 h-9 rounded-lg bg-cyan-500/10 border border-cyan-400/30 text-cyan-400 flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs uppercase tracking-wider font-bold text-white font-mono">
                        {item.title}
                      </h4>
                      <p className="text-xs text-slate-300 mt-0.5">
                        {item.detail}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
