import React from 'react';
import { Landmark, Mountain, Sparkles, BookOpen } from 'lucide-react';

export default function RegionIntro({ intro, name }) {
  if (!intro) return null;

  return (
    <section className="py-24 bg-[#05070F] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="badge-glow mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Living Heritage</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-black text-white">
            About {name}: Royalty, Sand & Spirit
          </h2>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <div className="bg-slate-900/60 backdrop-blur-xl rounded-3xl p-8 border border-white/10 hover:border-amber-500/40 hover:shadow-[0_0_30px_rgba(245,158,11,0.15)] transition-all">
            <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 text-amber-400 flex items-center justify-center mb-6 shadow-sm">
              <Landmark className="w-7 h-7" />
            </div>
            <h3 className="font-display text-2xl font-bold text-white mb-3">
              Historical Legacy
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
              {intro.history}
            </p>
          </div>

          <div className="bg-slate-900/60 backdrop-blur-xl rounded-3xl p-8 border border-white/10 hover:border-amber-500/40 hover:shadow-[0_0_30px_rgba(245,158,11,0.15)] transition-all">
            <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 text-emerald-400 flex items-center justify-center mb-6 shadow-sm">
              <Mountain className="w-7 h-7" />
            </div>
            <h3 className="font-display text-2xl font-bold text-white mb-3">
              Geography & Terrain
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
              {intro.geography}
            </p>
          </div>

          <div className="bg-slate-900/60 backdrop-blur-xl rounded-3xl p-8 border border-white/10 hover:border-amber-500/40 hover:shadow-[0_0_30px_rgba(245,158,11,0.15)] transition-all">
            <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 text-orange-400 flex items-center justify-center mb-6 shadow-sm">
              <Sparkles className="w-7 h-7" />
            </div>
            <h3 className="font-display text-2xl font-bold text-white mb-3">
              Art & Living Culture
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
              {intro.culture}
            </p>
          </div>

          <div className="bg-slate-900/60 backdrop-blur-xl rounded-3xl p-8 border border-white/10 hover:border-amber-500/40 hover:shadow-[0_0_30px_rgba(245,158,11,0.15)] transition-all">
            <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 text-cyan-400 flex items-center justify-center mb-6 shadow-sm">
              <BookOpen className="w-7 h-7" />
            </div>
            <h3 className="font-display text-2xl font-bold text-white mb-3">
              What Sets It Apart
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
              {intro.distinctive}
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
