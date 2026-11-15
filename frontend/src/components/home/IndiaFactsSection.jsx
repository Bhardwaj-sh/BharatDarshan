import React from 'react';
import { INDIA_FACTS } from '../../data/regionsData';
import { ShieldCheck, Compass, MapPin, Award } from 'lucide-react';

export default function IndiaFactsSection() {
  const icons = [MapPin, Compass, Award, ShieldCheck];

  return (
    <section className="py-20 bg-ivory-50 border-y border-ivory-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs uppercase tracking-widest text-gold-600 font-semibold mb-2 block">
            Authenticity & Integrity
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-forest-950">
            India at a Glance
          </h2>
          <p className="text-xs sm:text-sm text-charcoal-600 mt-2">
            Verified platform facts and geographic realities — without fabricated statistics.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {INDIA_FACTS.map((fact, index) => {
            const IconComponent = icons[index % icons.length];
            return (
              <div
                key={index}
                className="bg-white rounded-3xl p-6 border border-ivory-200 shadow-soft flex flex-col justify-between"
              >
                <div className="w-10 h-10 rounded-2xl bg-forest-900/5 text-forest-800 flex items-center justify-center mb-6">
                  <IconComponent className="w-5 h-5 text-gold-600" />
                </div>
                <div>
                  <span className="font-serif text-2xl font-bold text-forest-950 block mb-1">
                    {fact.value}
                  </span>
                  <h4 className="text-xs font-semibold text-charcoal-800 uppercase tracking-wider mb-2">
                    {fact.label}
                  </h4>
                  <p className="text-xs text-charcoal-500 leading-relaxed">
                    {fact.detail}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
