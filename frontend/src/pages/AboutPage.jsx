import React from 'react';
import { Compass, ShieldCheck, MapPin, Heart, CheckCircle2 } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="pt-28 pb-20 bg-ivory-100 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-forest-900/5 text-forest-800 text-xs font-semibold uppercase tracking-widest mb-4">
            <Compass className="w-3.5 h-3.5 text-gold-600" />
            <span>The Bharat Darshan Vision</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-forest-950 tracking-tight mb-6">
            Discover India. <br />
            <span className="italic font-normal text-gold-600">Experience Every Journey.</span>
          </h1>
          <p className="text-base text-charcoal-600 leading-relaxed">
            Bharat Darshan was founded with a singular purpose: to represent every State and Union Territory in India through one masterfully planned, culturally immersive, and geographically realistic itinerary.
          </p>
        </div>

        {/* Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          
          <div className="bg-white rounded-3xl p-8 border border-ivory-200 shadow-soft">
            <div className="w-12 h-12 rounded-2xl bg-forest-800 text-gold-400 flex items-center justify-center mb-6">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-forest-950 mb-3">
              One Package Per Region
            </h3>
            <p className="text-xs text-charcoal-600 leading-relaxed">
              No clutter or artificial tier inflation. Each destination has one flagship itinerary crafted around its geography, road travel times, and essential experiences.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-ivory-200 shadow-soft">
            <div className="w-12 h-12 rounded-2xl bg-forest-800 text-gold-400 flex items-center justify-center mb-6">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-forest-950 mb-3">
              Transparent Pricing
            </h3>
            <p className="text-xs text-charcoal-600 leading-relaxed">
              All prices are displayed per person. The backend validates and permanently snapshots prices upon booking submission, protecting travellers against hidden surprises.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-ivory-200 shadow-soft">
            <div className="w-12 h-12 rounded-2xl bg-forest-800 text-gold-400 flex items-center justify-center mb-6">
              <Heart className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-forest-950 mb-3">
              Zero Fake Statistics
            </h3>
            <p className="text-xs text-charcoal-600 leading-relaxed">
              We never fabricate customer counters, artificial discount timers, or synthetic reviews. Every fact, route distance, and monument guide is sourced with care.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
