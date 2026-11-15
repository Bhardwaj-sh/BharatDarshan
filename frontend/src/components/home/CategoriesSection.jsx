import React from 'react';
import { Link } from 'react-router-dom';
import { CATEGORIES } from '../../data/regionsData';
import { ArrowUpRight, Compass } from 'lucide-react';

export default function CategoriesSection() {
  return (
    <section id="categories" className="py-24 bg-slate-900 text-white relative overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-saffron-500/10 via-amber-500/10 to-rose-500/10 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div className="max-w-xl">
            <span className="text-xs uppercase font-extrabold tracking-widest text-amber-400 mb-3 block">
              Curated Travel Themes
            </span>
            <h2 className="font-display text-4xl sm:text-5xl font-black text-white tracking-tight">
              Journeys Defined by Experience
            </h2>
          </div>
          <p className="text-sm text-slate-400 max-w-sm mt-4 md:mt-0 leading-relaxed font-normal">
            Whether you seek high Himalayan summits, living royal heritage, or tranquil coastlines, find your journey across India.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              to={`/explore?category=${cat.id}`}
              className="group relative h-80 rounded-3xl overflow-hidden border border-white/10 shadow-lg hover:shadow-glow-saffron hover:-translate-y-2 transition-all duration-500"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
              />
              
              {/* Gradient Mask */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent group-hover:via-slate-950/20 transition-all duration-300" />

              {/* Content Overlay */}
              <div className="absolute inset-0 p-6 flex flex-col justify-between">
                
                <div className="flex items-center justify-between">
                  <span className="bg-slate-950/80 backdrop-blur-md border border-white/15 text-amber-300 text-[10px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full">
                    {cat.count} Regions
                  </span>
                  <div className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-saffron-500 transition-colors">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

                <div>
                  <h3 className="font-display text-2xl font-black text-white group-hover:text-amber-300 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-slate-300 mt-1">
                    Explore curated single packages
                  </p>
                </div>

              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
