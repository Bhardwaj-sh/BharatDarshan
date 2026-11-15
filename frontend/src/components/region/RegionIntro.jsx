import React from 'react';
import { Landmark, Mountain, Sparkles, BookOpen } from 'lucide-react';

export default function RegionIntro({ intro, name }) {
  if (!intro) return null;

  return (
    <section className="py-20 bg-slate-50 text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-14">
          <div className="badge-glow mb-3">
            <Sparkles className="w-3.5 h-3.5 text-saffron-500" />
            <span>Living Heritage</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-black text-slate-950">
            About {name}: Royalty, Sand & Spirit
          </h2>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-soft hover:shadow-card transition-all">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-5 border border-amber-200/60">
              <Landmark className="w-6 h-6" />
            </div>
            <h3 className="font-display text-xl font-bold text-slate-950 mb-3">
              Historical Legacy
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              {intro.history}
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-soft hover:shadow-card transition-all">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-5 border border-emerald-200/60">
              <Mountain className="w-6 h-6" />
            </div>
            <h3 className="font-display text-xl font-bold text-slate-950 mb-3">
              Geography & Terrain
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              {intro.geography}
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-soft hover:shadow-card transition-all">
            <div className="w-12 h-12 rounded-2xl bg-saffron-50 text-saffron-600 flex items-center justify-center mb-5 border border-saffron-200/60">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="font-display text-xl font-bold text-slate-950 mb-3">
              Art & Living Culture
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              {intro.culture}
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-soft hover:shadow-card transition-all">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-5 border border-indigo-200/60">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="font-display text-xl font-bold text-slate-950 mb-3">
              What Sets It Apart
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              {intro.distinctive}
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
