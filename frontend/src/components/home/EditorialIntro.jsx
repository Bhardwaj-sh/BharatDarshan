import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Sparkles, ShieldCheck, Compass } from 'lucide-react';

export default function EditorialIntro() {
  return (
    <section className="py-24 bg-white text-slate-900 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Statement */}
        <div className="max-w-4xl mx-auto text-center mb-20">
          <div className="badge-glow mb-4">
            <Sparkles className="w-3.5 h-3.5 text-saffron-500" />
            <span>The Bharat Darshan Philosophy</span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-black text-slate-950 tracking-tight leading-tight">
            Travel without clutter. <br />
            <span className="text-gradient-sunset">
              Experience the purest essence of every region.
            </span>
          </h2>
          
          <p className="mt-6 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            Instead of confusing you with endless budget vs luxury tiers, we have crafted exactly one comprehensive, geographically realistic master journey for each of India's 36 States and Union Territories.
          </p>
        </div>

        {/* Dual Showcase Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Feature Details */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-6">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-saffron-500 to-amber-400 flex items-center justify-center text-white shadow-glow-saffron">
              <Compass className="w-6 h-6" />
            </div>

            <h3 className="font-display text-2xl sm:text-3xl font-black text-slate-950">
              One Master Itinerary per Region
            </h3>

            <p className="text-sm text-slate-600 leading-relaxed">
              Every package is designed around realistic driving routes, monument timings, regional dining, and vetted heritage stays. You see verified per-person pricing that never changes once booked.
            </p>

            <div className="pt-2">
              <Link
                to="/region/rajasthan"
                className="btn-gradient text-xs uppercase tracking-wider py-3.5 px-6 font-bold"
              >
                <span>View Rajasthan Reference Tour</span>
                <ArrowUpRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </div>

          {/* Right Visual Collage */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
            
            <div className="relative rounded-3xl overflow-hidden shadow-card group">
              <img
                src="https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=900&q=80"
                alt="Rajasthan Palaces"
                className="w-full h-80 object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <span className="text-[10px] uppercase tracking-wider font-extrabold bg-saffron-500 text-white px-3 py-1 rounded-full">
                  Flagship Reference
                </span>
                <h4 className="font-display text-xl font-bold mt-2">
                  Royal Rajasthan (9 Days)
                </h4>
                <p className="text-xs text-slate-300 mt-0.5">
                  Palaces, hill citadels & Thar desert dunes.
                </p>
              </div>
            </div>

            <div className="relative rounded-3xl overflow-hidden shadow-card group sm:translate-y-6">
              <img
                src="https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=900&q=80"
                alt="Kerala Backwaters"
                className="w-full h-80 object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <span className="text-[10px] uppercase tracking-wider font-extrabold bg-emerald-500 text-white px-3 py-1 rounded-full">
                  Coastal Sanctuary
                </span>
                <h4 className="font-display text-xl font-bold mt-2">
                  God's Own Kerala (7 Days)
                </h4>
                <p className="text-xs text-slate-300 mt-0.5">
                  Emerald backwaters & spice plantations.
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
