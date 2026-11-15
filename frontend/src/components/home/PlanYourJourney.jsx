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
    highlight: 'Strict 1-Tour Architecture',
    accentColor: '#F59E0B'
  },
  {
    step: '02',
    title: 'Zero-Trust Server Pricing',
    desc: 'No hidden surge pricing or fabricated checkout fees. The per-person package pricing displayed on your screen is snapshotted and cryptographically verified directly from our MongoDB backend engine.',
    icon: IndianRupee,
    highlight: 'Cryptographic Price Lock',
    accentColor: '#10B981'
  },
  {
    step: '03',
    title: 'Curated Heritage Stays & Transit',
    desc: 'Rest in authentic heritage havelis, luxury houseboats, and mountain eco-lodges with private chauffeur-driven sanitized transit from arrival to departure.',
    icon: BedDouble,
    highlight: 'Verified Stays & Private Transit',
    accentColor: '#F97316'
  },
  {
    step: '04',
    title: 'Native Master Storyteller Guides',
    desc: 'Every milestone is narrated by government-licensed native historians and storytellers whose families have preserved the region’s living lore for generations.',
    icon: Headphones,
    highlight: 'Licensed Local Guides',
    accentColor: '#A855F7'
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
    <section id="plan" className="relative py-24 sm:py-28 bg-[#F8FAFC] text-slate-900 overflow-hidden border-t border-slate-200">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-800 text-xs font-bold uppercase tracking-wider mb-4 shadow-sm">
            <ShieldCheck className="w-3.5 h-3.5 text-slate-800" />
            <span>Effortless & Transparent Planning</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 font-display">
            How Every Journey <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-orange-600 to-emerald-600">Is Orchestrated</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
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
                className="relative p-6 rounded-3xl bg-white border border-slate-200 hover:border-slate-300 transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span 
                      className="text-3xl font-black font-mono transition-colors text-slate-800"
                    >
                      {step.step}
                    </span>
                    <div 
                      className="w-10 h-10 rounded-xl border flex items-center justify-center bg-slate-100 border-slate-200 text-slate-800"
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <span 
                    className="inline-block px-2.5 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider font-bold mb-2 border bg-slate-100 border-slate-200 text-slate-700"
                  >
                    {step.highlight}
                  </span>

                  <h3 className="text-lg font-bold text-slate-900 mb-2 font-display">
                    {step.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    {step.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-1.5 text-xs text-slate-700 font-semibold">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Standard on all 36 Flagships</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Specimen Package Architecture Showcase */}
        <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-5">
              <span className="text-xs uppercase tracking-widest text-slate-500 font-mono font-bold block mb-2">
                Specimen Package Blueprint
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 mb-3">
                {SAMPLE_BREAKDOWN.region}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mb-6 leading-relaxed font-normal">
                Every tour package in Bharat Darshan follows a strict standard of five clear pillars: Day-wise chronological progression, handpicked accommodation, private transit, curated monument access, and guaranteed per-person pricing.
              </p>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between mb-6">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-slate-500 block font-mono">
                    Snapshotted Starting Price
                  </span>
                  <span className="text-2xl font-black text-slate-900 font-mono">
                    {SAMPLE_BREAKDOWN.price}
                  </span>
                  <span className="text-[11px] text-slate-500 block">per adult / all taxes included</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase tracking-wider text-slate-500 block font-mono">
                    Duration
                  </span>
                  <span className="text-sm font-bold text-slate-900">
                    {SAMPLE_BREAKDOWN.duration}
                  </span>
                </div>
              </div>

              <a
                href="#master-journeys"
                className="btn-classy-dark w-full text-xs font-bold uppercase tracking-wider py-3.5 flex items-center justify-center gap-2 shadow-sm"
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
                    className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-4 hover:border-slate-300 transition-colors"
                  >
                    <div className="w-9 h-9 rounded-lg bg-white border border-slate-200 text-slate-800 flex items-center justify-center shrink-0 shadow-sm">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs uppercase tracking-wider font-bold text-slate-900 font-mono">
                        {item.title}
                      </h4>
                      <p className="text-xs text-slate-600 mt-0.5 font-normal">
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
