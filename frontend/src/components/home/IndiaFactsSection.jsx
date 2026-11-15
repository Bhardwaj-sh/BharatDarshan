import React from 'react';
import { INDIA_FACTS } from '../../data/regionsData';
import { ShieldCheck, Compass, MapPin, Award } from 'lucide-react';

export default function IndiaFactsSection() {
  const icons = [MapPin, Compass, Award, ShieldCheck];

  return (
    <section className="py-24 bg-white border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase font-extrabold tracking-widest text-saffron-600 mb-2 block">
            Authenticity & Integrity
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-black text-slate-950">
            India at a Glance
          </h2>
          <p className="text-sm text-slate-600 mt-2 font-normal">
            Verified platform facts and geographic realities — without fabricated statistics.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {INDIA_FACTS.map((fact, index) => {
            const IconComponent = icons[index % icons.length];
            return (
              <div
                key={index}
                className="bg-slate-50 rounded-3xl p-7 border border-slate-200/80 shadow-soft hover:shadow-card hover:-translate-y-1 transition-all flex flex-col justify-between"
              >
                <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 text-saffron-600 flex items-center justify-center mb-6 shadow-sm">
                  <IconComponent className="w-6 h-6" />
                </div>
                <div>
                  <span className="font-display text-3xl font-black text-slate-950 block mb-1">
                    {fact.value}
                  </span>
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                    {fact.label}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
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
