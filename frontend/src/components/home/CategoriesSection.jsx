import React from 'react';
import { Link } from 'react-router-dom';
import { CATEGORIES } from '../../data/regionsData';
import { ArrowUpRight } from 'lucide-react';

export default function CategoriesSection() {
  return (
    <section id="categories" className="py-20 md:py-28 bg-forest-950 text-ivory-100 relative overflow-hidden">
      
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-forest-800/20 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14">
          <div className="max-w-xl">
            <span className="text-xs uppercase tracking-widest text-gold-400 font-semibold mb-3 block">
              Curated Travel Themes
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
              Journeys Defined by Experience
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-ivory-300 max-w-sm mt-4 md:mt-0 leading-relaxed">
            Whether you seek high Himalayan serenity, royal desert palaces, or tranquil backwaters, explore journeys aligned with your spirit.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              to={`/explore?category=${cat.id}`}
              className="group relative h-72 rounded-3xl overflow-hidden border border-white/10 shadow-soft transition-all duration-500 hover:shadow-card hover:-translate-y-1.5"
            >
              {/* Background Image */}
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
              />
              
              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/40 to-transparent group-hover:via-forest-950/20 transition-all duration-300" />

              {/* Category Info */}
              <div className="absolute inset-0 p-6 flex flex-col justify-between">
                
                {/* Top Badge */}
                <div className="flex items-center justify-between">
                  <span className="bg-forest-900/80 backdrop-blur-md border border-white/10 text-gold-400 text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-full">
                    {cat.count} Regions
                  </span>
                  <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-gold-500 group-hover:text-forest-950 transition-colors">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

                {/* Bottom Title */}
                <div>
                  <h3 className="font-serif text-2xl font-bold text-white group-hover:text-gold-300 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-ivory-200 mt-1 opacity-80 group-hover:opacity-100 transition-opacity">
                    Explore curated regional itineraries
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
