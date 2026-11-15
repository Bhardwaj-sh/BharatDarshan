import React from 'react';
import { Compass, ShieldCheck, MapPin, Heart, CheckCircle2, Sparkles, Award } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="pt-32 pb-24 bg-midnight-950 min-h-screen text-slate-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-400 text-xs font-mono font-semibold uppercase tracking-wider mb-4 shadow-cyan-glow">
            <Compass className="w-3.5 h-3.5 text-cyan-400" />
            <span>The Bharat Darshan Vision</span>
          </div>
          <h1 className="font-display text-4xl sm:text-6xl font-black text-white tracking-tight mb-6 leading-tight">
            Discover India. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-200 to-white">
              Experience Every Journey.
            </span>
          </h1>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-light">
            Bharat Darshan was founded with a singular purpose: to represent every State and Union Territory in India through one masterfully planned, culturally authentic, and geographically realistic itinerary.
          </p>
        </div>

        {/* 3 Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          
          <div className="bg-midnight-900/90 rounded-3xl p-8 border border-white/10 shadow-xl hover:border-cyan-400/50 hover:shadow-cyan-glow transition-all">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-400/30 text-cyan-400 flex items-center justify-center mb-6">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="font-display text-xl font-bold text-white mb-3">
              One Package Per Region
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
              No clutter or artificial tier inflation. Each destination has one flagship itinerary crafted around its geography, road travel times, and essential experiences.
            </p>
          </div>

          <div className="bg-midnight-900/90 rounded-3xl p-8 border border-white/10 shadow-xl hover:border-cyan-400/50 hover:shadow-cyan-glow transition-all">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-400/30 text-cyan-400 flex items-center justify-center mb-6">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-display text-xl font-bold text-white mb-3">
              Zero-Trust Pricing
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
              All prices are displayed per person. The backend recalculates and permanently snapshots prices upon booking submission, protecting travellers against hidden surprises.
            </p>
          </div>

          <div className="bg-midnight-900/90 rounded-3xl p-8 border border-white/10 shadow-xl hover:border-cyan-400/50 hover:shadow-cyan-glow transition-all">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-400/30 text-cyan-400 flex items-center justify-center mb-6">
              <Heart className="w-6 h-6" />
            </div>
            <h3 className="font-display text-xl font-bold text-white mb-3">
              Zero Fake Statistics
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
              We never fabricate customer counters, artificial discount timers, or synthetic reviews. Every fact, route distance, and monument guide is sourced with care.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
