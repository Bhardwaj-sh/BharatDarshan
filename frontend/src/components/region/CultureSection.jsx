import React from 'react';
import { Utensils, Sparkles, Calendar } from 'lucide-react';

export default function CultureSection({ cultureData, seasons = [] }) {
  if (!cultureData) return null;

  return (
    <section className="py-24 bg-[#05070F] text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Culinary Traditions */}
        <div className="mb-20">
          <div className="max-w-3xl mb-12">
            <span className="text-xs uppercase font-extrabold tracking-widest text-amber-400 block mb-2">
              Gastronomic Traditions
            </span>
            <h2 className="font-display text-4xl sm:text-5xl font-black text-white">
              Regional Flavors & Culinary Heritage
            </h2>
            <p className="text-sm sm:text-base text-slate-400 mt-2 font-normal">
              Every day of your journey offers curated opportunities to savor authentic delicacies.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {cultureData.dishes?.map((dish, idx) => (
              <div key={idx} className="bg-slate-900/60 backdrop-blur-xl rounded-3xl p-7 border border-white/10 hover:border-amber-500/40 hover:shadow-[0_0_25px_rgba(245,158,11,0.15)] transition-all">
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 text-amber-400 flex items-center justify-center mb-5 shadow-sm">
                  <Utensils className="w-5 h-5" />
                </div>
                <h4 className="font-display text-xl font-bold text-white mb-2">
                  {dish.name}
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed font-normal">
                  {dish.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Culture & Climate Guidance */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Festivals & Crafts */}
          <div className="lg:col-span-6 bg-slate-900/60 backdrop-blur-xl rounded-3xl p-8 sm:p-10 border border-white/10 shadow-2xl">
            <div className="flex items-center gap-2 text-xs uppercase font-extrabold tracking-widest text-amber-400 mb-6">
              <Sparkles className="w-4 h-4" />
              <span>Festivals & Living Crafts</span>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="font-display text-xl font-bold text-white mb-4">
                  Celebrated Festivals
                </h4>
                <div className="space-y-3">
                  {cultureData.festivals?.map((f, i) => (
                    <div key={i} className="bg-white/5 rounded-2xl p-4 border border-white/10">
                      <span className="font-bold text-sm text-white block">{f.name}</span>
                      <span className="text-xs text-slate-400 mt-0.5 block font-normal">{f.desc}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-display text-xl font-bold text-white mb-4">
                  Master Handicrafts
                </h4>
                <div className="flex flex-wrap gap-2">
                  {cultureData.handicrafts?.map((craft, i) => (
                    <span
                      key={i}
                      className="px-3.5 py-1.5 rounded-xl bg-white/5 text-slate-300 text-xs font-semibold border border-white/10"
                    >
                      {craft}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Seasonal Weather Guidance */}
          <div className="lg:col-span-6 bg-slate-900/60 backdrop-blur-xl rounded-3xl p-8 sm:p-10 border border-white/10 shadow-2xl">
            <div className="flex items-center gap-2 text-xs uppercase font-extrabold tracking-widest text-amber-400 mb-2">
              <Calendar className="w-4 h-4" />
              <span>Climate & Best Time to Visit</span>
            </div>
            <h3 className="font-display text-2xl sm:text-3xl font-black text-white mb-6">
              Seasonal Travel Guidance
            </h3>

            <div className="space-y-4">
              {seasons.map((season, idx) => (
                <div key={idx} className="bg-white/5 rounded-2xl p-4 border border-white/10">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-display font-bold text-sm text-amber-400">
                      {season.season}
                    </span>
                    <span className="text-[10px] uppercase font-bold tracking-wider px-3 py-0.5 rounded-full bg-white/10 text-slate-200 border border-white/10">
                      {season.status} · {season.temp}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed font-normal">
                    {season.notes}
                  </p>
                </div>
              ))}
            </div>

            <p className="text-[10px] text-slate-500 mt-6 italic">
              * Note: Climate estimates reflect historical meteorological patterns for the region rather than live sensors.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
