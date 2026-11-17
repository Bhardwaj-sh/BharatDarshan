import React from 'react';
import { MapPin, Info } from 'lucide-react';

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=800&q=80';

export default function AttractionGallery({ attractions = [] }) {
  if (!attractions || attractions.length === 0) return null;

  return (
    <section className="py-24 bg-[#070A14] text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase font-extrabold tracking-widest text-amber-400 block mb-2">
            Key Monuments
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-black text-white">
            Major Attractions Covered in the Package
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-2 font-normal">
            Every landmark features verified historical notes and licensed local guides included in your itinerary.
          </p>
        </div>

        {/* Attractions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {attractions.map((attraction, idx) => (
            <div
              key={attraction.id || attraction._id || `${attraction.name}-${idx}`}
              className="bg-slate-900/60 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/10 shadow-2xl group hover:border-amber-500/50 hover:shadow-[0_0_30px_rgba(245,158,11,0.2)] transition-all duration-300"
            >
              <div className="relative h-64 overflow-hidden bg-slate-950">
                <img
                  src={attraction.image || FALLBACK_IMAGE}
                  alt={attraction.name}
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = FALLBACK_IMAGE;
                  }}
                  className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent pointer-events-none" />
                <span className="absolute bottom-4 left-4 text-xs font-bold text-white bg-black/70 px-3.5 py-1.5 rounded-full backdrop-blur-md border border-white/15 flex items-center gap-1.5 shadow-sm">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  <span>{attraction.city}</span>
                </span>
              </div>

              <div className="p-7 sm:p-8">
                <h3 className="font-display text-2xl font-bold text-white mb-3">
                  {attraction.name}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6 font-normal">
                  {attraction.description}
                </p>

                {attraction.visitorNotes && (
                  <div className="bg-white/5 rounded-2xl p-4 border border-white/10 text-xs text-slate-300 flex items-start gap-2.5 font-normal">
                    <Info className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
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
