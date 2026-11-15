import React from 'react';
import { Utensils, Sparkles, Calendar, Sun, CloudRain, Snowflake } from 'lucide-react';

export default function CultureSection({ cultureData, seasons = [] }) {
  if (!cultureData) return null;

  return (
    <section className="py-16 md:py-24 bg-ivory-100 text-charcoal-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Culinary & Food */}
        <div className="mb-16">
          <div className="max-w-3xl mb-8">
            <span className="text-xs uppercase tracking-widest text-gold-600 font-bold block mb-2">
              Gastronomic Traditions
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-forest-950">
              Regional Flavors & Culinary Heritage
            </h2>
            <p className="text-xs sm:text-sm text-charcoal-600 mt-2">
              Every day of the itinerary includes curated opportunities to savor traditional dishes.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {cultureData.dishes?.map((dish, idx) => (
              <div key={idx} className="bg-white rounded-3xl p-6 border border-ivory-200 shadow-soft">
                <div className="w-9 h-9 rounded-full bg-gold-500/10 text-gold-600 flex items-center justify-center mb-4">
                  <Utensils className="w-4 h-4" />
                </div>
                <h4 className="font-serif text-lg font-bold text-forest-950 mb-2">
                  {dish.name}
                </h4>
                <p className="text-xs text-charcoal-600 leading-relaxed">
                  {dish.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Culture, Festivals & Weather Guidance */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Festivals & Handicrafts */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-8 border border-ivory-200 shadow-soft">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-gold-600 font-bold mb-4">
              <Sparkles className="w-4 h-4" />
              <span>Festivals & Living Crafts</span>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="font-serif text-lg font-bold text-forest-950 mb-2">
                  Celebrated Festivals
                </h4>
                <div className="space-y-3">
                  {cultureData.festivals?.map((f, i) => (
                    <div key={i} className="bg-ivory-50 rounded-2xl p-4 border border-ivory-200/80">
                      <span className="font-semibold text-xs text-forest-950 block">{f.name}</span>
                      <span className="text-xs text-charcoal-600 mt-0.5 block">{f.desc}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-serif text-lg font-bold text-forest-950 mb-2">
                  Master Handicrafts
                </h4>
                <div className="flex flex-wrap gap-2">
                  {cultureData.handicrafts?.map((craft, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 rounded-full bg-forest-900/5 text-forest-900 text-xs font-medium border border-forest-900/10"
                    >
                      {craft}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Seasonal Weather Guidance (Accurate, non-fabricated) */}
          <div className="lg:col-span-6 bg-forest-950 text-ivory-100 rounded-3xl p-8 border border-white/10 shadow-soft">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-gold-400 font-bold mb-2">
              <Calendar className="w-4 h-4" />
              <span>Climate & Best Time to Visit</span>
            </div>
            <h3 className="font-serif text-2xl font-bold text-white mb-6">
              Seasonal Travel Guidance
            </h3>

            <div className="space-y-4">
              {seasons.map((season, idx) => (
                <div key={idx} className="bg-forest-900/80 rounded-2xl p-4 border border-white/10">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-serif font-bold text-sm text-gold-400">
                      {season.season}
                    </span>
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-forest-800 text-ivory-200 border border-white/10">
                      {season.status} · {season.temp}
                    </span>
                  </div>
                  <p className="text-xs text-ivory-300 leading-relaxed">
                    {season.notes}
                  </p>
                </div>
              ))}
            </div>

            <p className="text-[10px] text-ivory-400 mt-6 italic">
              * Note: Climate estimates reflect historical meteorological patterns for the region rather than live sensors.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
