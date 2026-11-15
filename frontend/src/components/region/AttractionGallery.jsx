import React from 'react';
import { MapPin, Info } from 'lucide-react';

export default function AttractionGallery({ attractions = [] }) {
  if (!attractions || attractions.length === 0) return null;

  return (
    <section className="py-20 bg-white border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase font-extrabold tracking-widest text-saffron-600 block mb-2">
            Key Monuments
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-black text-slate-950">
            Major Attractions Covered in the Package
          </h2>
          <p className="text-sm text-slate-600 mt-2 font-normal">
            Every landmark features verified historical notes and licensed local guides included in your itinerary.
          </p>
        </div>

        {/* Attractions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {attractions.map((attraction) => (
            <div
              key={attraction.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-soft group hover:shadow-card hover:-translate-y-1 transition-all duration-300"
            >
              <div className="relative h-64 overflow-hidden bg-slate-950">
                <img
                  src={attraction.image}
                  alt={attraction.name}
                  className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <span className="absolute bottom-4 left-4 text-xs font-bold text-white bg-slate-950/80 px-3 py-1 rounded-full backdrop-blur-md border border-white/20 flex items-center gap-1.5 shadow-sm">
                  <MapPin className="w-3.5 h-3.5 text-saffron-500" />
                  <span>{attraction.city}</span>
                </span>
              </div>

              <div className="p-6 sm:p-8">
                <h3 className="font-display text-2xl font-bold text-slate-950 mb-3">
                  {attraction.name}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-5 font-normal">
                  {attraction.description}
                </p>

                {attraction.visitorNotes && (
                  <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 text-xs text-slate-700 flex items-start gap-2.5 font-medium">
                    <Info className="w-4 h-4 text-saffron-600 flex-shrink-0 mt-0.5" />
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
