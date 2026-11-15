import React from 'react';
import { Utensils, Sparkles, Calendar } from 'lucide-react';

export default function CultureSection({ cultureData, seasons = [] }) {
  if (!cultureData) return null;

  return (
    <section className="py-20 bg-slate-50 text-slate-900 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Culinary Traditions */}
        <div className="mb-16">
          <div className="max-w-3xl mb-10">
            <span className="text-xs uppercase font-extrabold tracking-widest text-saffron-600 block mb-2">
              Gastronomic Traditions
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-black text-slate-950">
              Regional Flavors & Culinary Heritage
            </h2>
            <p className="text-sm text-slate-600 mt-2 font-normal">
              Every day of your journey offers curated opportunities to savor authentic delicacies.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {cultureData.dishes?.map((dish, idx) => (
              <div key={idx} className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-soft">
                <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4 border border-amber-200/50">
                  <Utensils className="w-4 h-4" />
                </div>
                <h4 className="font-display text-lg font-bold text-slate-950 mb-2">
                  {dish.name}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  {dish.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Culture & Climate Guidance */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Festivals & Crafts */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-8 border border-slate-200/80 shadow-soft">
            <div className="flex items-center gap-2 text-xs uppercase font-extrabold tracking-widest text-saffron-600 mb-5">
              <Sparkles className="w-4 h-4" />
              <span>Festivals & Living Crafts</span>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="font-display text-lg font-bold text-slate-950 mb-3">
                  Celebrated Festivals
                </h4>
                <div className="space-y-3">
                  {cultureData.festivals?.map((f, i) => (
                    <div key={i} className="bg-slate-50 rounded-2xl p-4 border border-slate-200/70">
                      <span className="font-bold text-xs text-slate-950 block">{f.name}</span>
                      <span className="text-xs text-slate-600 mt-0.5 block font-normal">{f.desc}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-display text-lg font-bold text-slate-950 mb-3">
                  Master Handicrafts
                </h4>
                <div className="flex flex-wrap gap-2">
                  {cultureData.handicrafts?.map((craft, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 rounded-xl bg-slate-100 text-slate-800 text-xs font-semibold border border-slate-200/60"
                    >
                      {craft}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Seasonal Weather Guidance */}
          <div className="lg:col-span-6 bg-slate-950 text-white rounded-3xl p-8 border border-slate-800 shadow-xl">
            <div className="flex items-center gap-2 text-xs uppercase font-extrabold tracking-widest text-amber-400 mb-2">
              <Calendar className="w-4 h-4" />
              <span>Climate & Best Time to Visit</span>
            </div>
            <h3 className="font-display text-2xl font-black text-white mb-6">
              Seasonal Travel Guidance
            </h3>

            <div className="space-y-4">
              {seasons.map((season, idx) => (
                <div key={idx} className="bg-slate-900 rounded-2xl p-4 border border-slate-800">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-display font-bold text-sm text-amber-300">
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
