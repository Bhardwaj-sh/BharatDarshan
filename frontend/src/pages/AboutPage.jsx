import React from 'react';
import { Compass, ShieldCheck, MapPin, Heart, CheckCircle2, Sparkles, Award } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="pt-32 pb-24 bg-slate-50 min-h-screen text-slate-900">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="badge-glow mb-4">
            <Compass className="w-3.5 h-3.5 text-saffron-500" />
            <span>The Bharat Darshan Vision</span>
          </div>
          <h1 className="font-display text-4xl sm:text-6xl font-black text-slate-950 tracking-tight mb-6 leading-tight">
            Discover India. <br />
            <span className="text-gradient-sunset">Experience Every Journey.</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            Bharat Darshan was founded with a singular purpose: to represent every State and Union Territory in India through one masterfully planned, culturally authentic, and geographically realistic itinerary.
          </p>
        </div>

        {/* 3 Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          
          <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-soft hover:shadow-card hover:-translate-y-1 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-saffron-500 to-amber-400 text-white flex items-center justify-center mb-6 shadow-glow-saffron">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="font-display text-xl font-bold text-slate-950 mb-3">
              One Package Per Region
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              No clutter or artificial tier inflation. Each destination has one flagship itinerary crafted around its geography, road travel times, and essential experiences.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-soft hover:shadow-card hover:-translate-y-1 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-slate-950 text-white flex items-center justify-center mb-6 shadow-md">
              <ShieldCheck className="w-6 h-6 text-amber-400" />
            </div>
            <h3 className="font-display text-xl font-bold text-slate-950 mb-3">
              Zero-Trust Pricing
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              All prices are displayed per person. The backend recalculates and permanently snapshots prices upon booking submission, protecting travellers against hidden surprises.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-soft hover:shadow-card hover:-translate-y-1 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-500 flex items-center justify-center mb-6 border border-rose-200/60 shadow-sm">
              <Heart className="w-6 h-6" />
            </div>
            <h3 className="font-display text-xl font-bold text-slate-950 mb-3">
              Zero Fake Statistics
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              We never fabricate customer counters, artificial discount timers, or synthetic reviews. Every fact, route distance, and monument guide is sourced with care.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
