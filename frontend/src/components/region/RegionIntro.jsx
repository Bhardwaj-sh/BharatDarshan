import React from 'react';
import { Landmark, Mountain, Sparkles, BookOpen } from 'lucide-react';

export default function RegionIntro({ intro, name }) {
  if (!intro) return null;

  return (
    <section className="py-16 md:py-24 bg-ivory-100 text-charcoal-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <span className="text-xs uppercase tracking-widest text-gold-600 font-bold block mb-2">
            The Living Heritage
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-forest-950">
            About {name}: Royalty, Sand & Spirit
          </h2>
        </div>

        {/* 4-Pillar Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* History */}
          <div className="bg-white rounded-3xl p-8 border border-ivory-200 shadow-soft">
            <div className="w-10 h-10 rounded-2xl bg-forest-900/5 text-forest-800 flex items-center justify-center mb-4">
              <Landmark className="w-5 h-5 text-gold-600" />
            </div>
            <h3 className="font-serif text-xl font-bold text-forest-950 mb-3">
              Historical Legacy
            </h3>
            <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed font-sans">
              {intro.history}
            </p>
          </div>

          {/* Geography */}
          <div className="bg-white rounded-3xl p-8 border border-ivory-200 shadow-soft">
            <div className="w-10 h-10 rounded-2xl bg-forest-900/5 text-forest-800 flex items-center justify-center mb-4">
              <Mountain className="w-5 h-5 text-gold-600" />
            </div>
            <h3 className="font-serif text-xl font-bold text-forest-950 mb-3">
              Geography & Terrain
            </h3>
            <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed font-sans">
              {intro.geography}
            </p>
          </div>

          {/* Culture */}
          <div className="bg-white rounded-3xl p-8 border border-ivory-200 shadow-soft">
            <div className="w-10 h-10 rounded-2xl bg-forest-900/5 text-forest-800 flex items-center justify-center mb-4">
              <Sparkles className="w-5 h-5 text-gold-600" />
            </div>
            <h3 className="font-serif text-xl font-bold text-forest-950 mb-3">
              Art & Living Culture
            </h3>
            <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed font-sans">
              {intro.culture}
            </p>
          </div>

          {/* What makes it distinctive */}
          <div className="bg-white rounded-3xl p-8 border border-ivory-200 shadow-soft">
            <div className="w-10 h-10 rounded-2xl bg-forest-900/5 text-forest-800 flex items-center justify-center mb-4">
              <BookOpen className="w-5 h-5 text-gold-600" />
            </div>
            <h3 className="font-serif text-xl font-bold text-forest-950 mb-3">
              What Sets It Apart
            </h3>
            <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed font-sans">
              {intro.distinctive}
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
