import React from 'react';
import { MapPin, Info, ArrowUpRight } from 'lucide-react';

export default function AttractionGallery({ attractions = [] }) {
  if (!attractions || attractions.length === 0) return null;

  return (
    <section className="py-16 md:py-24 bg-ivory-50 border-t border-ivory-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs uppercase tracking-widest text-gold-600 font-bold block mb-2">
            Key Monuments
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-forest-950">
            Major Attractions Covered in the Package
          </h2>
          <p className="text-xs sm:text-sm text-charcoal-600 mt-2">
            Each monument is accompanied by verified historical notes and licensed local guides included in your itinerary.
          </p>
        </div>

        {/* Attractions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {attractions.map((attraction) => (
            <div
              key={attraction.id}
              className="bg-white rounded-3xl overflow-hidden border border-ivory-200 shadow-soft group hover:shadow-card transition-all duration-300"
            >
              <div className="relative h-64 overflow-hidden bg-forest-950">
                <img
                  src={attraction.image}
                  alt={attraction.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-950/80 via-transparent to-transparent" />
                <span className="absolute bottom-4 left-4 text-xs font-semibold text-gold-400 bg-forest-950/80 px-3 py-1 rounded-full backdrop-blur-sm border border-gold-500/30 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{attraction.city}</span>
                </span>
              </div>

              <div className="p-6 sm:p-8">
                <h3 className="font-serif text-2xl font-bold text-forest-950 mb-3">
                  {attraction.name}
                </h3>
                <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed mb-4">
                  {attraction.description}
                </p>

                {attraction.visitorNotes && (
                  <div className="bg-ivory-100 rounded-2xl p-3.5 border border-ivory-200 text-xs text-charcoal-700 flex items-start gap-2">
                    <Info className="w-4 h-4 text-gold-600 flex-shrink-0 mt-0.5" />
                    <span>{attraction.visitorNotes}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
