import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Award, Compass, MapPin } from 'lucide-react';

export default function EditorialIntro() {
  return (
    <section className="relative py-20 md:py-28 bg-forest-950 text-ivory-100 overflow-hidden">
      
      {/* Editorial Quote with Inline Capsules */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        <p className="font-serif text-2xl sm:text-4xl md:text-5xl leading-relaxed md:leading-[1.6] text-ivory-100 font-light">
          Travel becomes deeply transformative when you{' '}
          <img
            src="https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=300&q=80"
            alt="Varanasi Ganga Aarti"
            className="inline-capsule-img"
          />
          pause to witness the dawn prayers on the sacred Ganges, wander the golden corridors of desert fortresses, and discover{' '}
          <img
            src="https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=300&q=80"
            alt="Kerala Backwaters"
            className="inline-capsule-img"
          />
          the timeless tranquility awaiting along every horizon of India.
        </p>

        <div className="mt-8 flex items-center justify-center gap-3 text-gold-400 text-xs tracking-widest uppercase">
          <span className="w-12 h-px bg-gold-400/40" />
          <span>The Bharat Darshan Philosophy</span>
          <span className="w-12 h-px bg-gold-400/40" />
        </div>

      </div>

      {/* Featured Editorial Dual Grid (Matching Reference Design) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 md:mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: The 1-Package Promise */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <span className="text-xs uppercase tracking-widest text-gold-400 font-semibold mb-3">
              Thoughtful Curation
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-6 leading-tight">
              One Region. <br />
              One Master Itinerary.
            </h2>
            <p className="text-sm text-ivory-200/90 leading-relaxed mb-6">
              Instead of drowning you in hundreds of confusing, repetitive tour tiers, our travel architects have designed exactly one comprehensive journey for each of India's 36 States and Union Territories.
            </p>
            <p className="text-sm text-ivory-200/90 leading-relaxed mb-8">
              Each package realistically balances travel distances, monument hours, regional cuisine, and authentic accommodation — providing an unforgettable itinerary you can actually experience.
            </p>

            <div>
              <Link
                to="/region/rajasthan"
                className="btn-gold text-xs uppercase tracking-wider py-3 px-6 inline-flex"
              >
                <span>Experience Rajasthan Reference</span>
                <ArrowUpRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </div>

          {/* Right Column: Editorial Photo Collage */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            <div className="relative rounded-3xl overflow-hidden shadow-2xl group">
              <img
                src="https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80"
                alt="Rajasthan Palaces"
                className="w-full h-72 sm:h-80 object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/20 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5">
                <span className="text-[10px] uppercase tracking-wider bg-gold-500/90 text-forest-950 font-bold px-2.5 py-1 rounded-full">
                  Flagship Journey
                </span>
                <h3 className="font-serif text-lg font-bold text-white mt-2">
                  Royal Rajasthan (9 Days)
                </h3>
                <p className="text-xs text-ivory-200 mt-1">
                  Fortresses, lake palaces & Thar desert dunes.
                </p>
              </div>
            </div>

            <div className="relative rounded-3xl overflow-hidden shadow-2xl group sm:translate-y-8">
              <img
                src="https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=800&q=80"
                alt="Ladakh Monasteries"
                className="w-full h-72 sm:h-80 object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/20 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5">
                <span className="text-[10px] uppercase tracking-wider bg-forest-800 border border-white/20 text-ivory-100 font-semibold px-2.5 py-1 rounded-full">
                  Himalayan Haven
                </span>
                <h3 className="font-serif text-lg font-bold text-white mt-2">
                  Mystic Ladakh (8 Days)
                </h3>
                <p className="text-xs text-ivory-200 mt-1">
                  High mountain passes & cobalt alpine lakes.
                </p>
              </div>
            </div>

          </div>

        </div>
      </div>

    </section>
  );
}
