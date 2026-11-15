import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Mail, ShieldCheck, Heart, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative bg-forest-950 text-ivory-200 overflow-hidden pt-16 pb-12 border-t border-forest-800">
      
      {/* Editorial Background Brand Watermark */}
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 pointer-events-none select-none opacity-5 whitespace-nowrap">
        <span className="font-serif text-[120px] md:text-[200px] font-bold text-white tracking-widest uppercase">
          BHARAT DARSHAN
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Section: Brand & Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gold-500/20 border border-gold-500/60 flex items-center justify-center text-gold-400">
                <Compass className="w-5 h-5 text-gold-400" />
              </div>
              <span className="font-serif text-2xl font-bold tracking-wide text-ivory-50">
                Bharat Darshan
              </span>
            </div>
            
            <p className="text-sm text-ivory-300 max-w-sm leading-relaxed">
              Discover India. Experience Every Journey. A curated tourism platform covering all 28 Indian States and 8 Union Territories with exactly one flagship, geographically realistic tour package per region.
            </p>

            <div className="flex items-center gap-2 text-xs text-gold-400/90 pt-2">
              <ShieldCheck className="w-4 h-4 text-gold-400" />
              <span>Transparent Per-Person Pricing · Zero Client-Trust Architecture</span>
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="bg-forest-900/60 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
              <h4 className="font-serif text-lg font-medium text-ivory-100 mb-2">
                Begin Your Journey Across India
              </h4>
              <p className="text-xs text-ivory-300 mb-4">
                Receive our monthly editorial digest featuring seasonal routes, festival calendars, and travel guides.
              </p>
              
              <form onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row gap-2 max-w-md">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="bg-forest-950/80 border border-white/15 rounded-full px-5 py-2.5 text-xs text-ivory-100 placeholder:text-ivory-300/60 focus:outline-none focus:border-gold-500 transition-colors flex-1"
                />
                <button
                  type="submit"
                  className="btn-gold text-xs uppercase tracking-wider py-2.5 px-6 whitespace-nowrap"
                >
                  Join Digest
                </button>
              </form>
            </div>
          </div>

        </div>

        {/* Middle Section: Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-10 text-xs">
          <div>
            <h5 className="font-serif text-sm font-semibold text-gold-400 uppercase tracking-wider mb-4">
              Popular Regions
            </h5>
            <ul className="space-y-2.5">
              <li>
                <Link to="/region/rajasthan" className="hover:text-gold-300 transition-colors flex items-center gap-1">
                  Rajasthan <ArrowUpRight className="w-3 h-3 text-gold-500/60" />
                </Link>
              </li>
              <li>
                <Link to="/region/kerala" className="hover:text-gold-300 transition-colors">Kerala Backwaters</Link>
              </li>
              <li>
                <Link to="/region/ladakh" className="hover:text-gold-300 transition-colors">Ladakh High Passes</Link>
              </li>
              <li>
                <Link to="/region/himachal-pradesh" className="hover:text-gold-300 transition-colors">Himachal Valleys</Link>
              </li>
              <li>
                <Link to="/region/goa" className="hover:text-gold-300 transition-colors">Goa Heritage & Coast</Link>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="font-serif text-sm font-semibold text-gold-400 uppercase tracking-wider mb-4">
              Experiences
            </h5>
            <ul className="space-y-2.5">
              <li><Link to="/#categories" className="hover:text-gold-300 transition-colors">Heritage & Palaces</Link></li>
              <li><Link to="/#categories" className="hover:text-gold-300 transition-colors">Himalayan Escapes</Link></li>
              <li><Link to="/#categories" className="hover:text-gold-300 transition-colors">Coastal Journeys</Link></li>
              <li><Link to="/#categories" className="hover:text-gold-300 transition-colors">Wildlife & Jungles</Link></li>
              <li><Link to="/#categories" className="hover:text-gold-300 transition-colors">Spiritual Pilgrimages</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="font-serif text-sm font-semibold text-gold-400 uppercase tracking-wider mb-4">
              The Platform
            </h5>
            <ul className="space-y-2.5">
              <li><Link to="/explore" className="hover:text-gold-300 transition-colors">All 36 States & UTs</Link></li>
              <li><Link to="/about" className="hover:text-gold-300 transition-colors">About Bharat Darshan</Link></li>
              <li><Link to="/login" className="hover:text-gold-300 transition-colors">Traveller Login</Link></li>
              <li><Link to="/admin" className="hover:text-gold-300 transition-colors">Admin Portal</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="font-serif text-sm font-semibold text-gold-400 uppercase tracking-wider mb-4">
              Philosophy & Guarantee
            </h5>
            <p className="text-ivory-300 leading-relaxed">
              We never fabricate customer reviews, fake view counters, or artificial discounts. Every itinerary is planned around geographic reality and authentic local culture.
            </p>
          </div>
        </div>

        {/* Bottom Section: Copyright */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-ivory-300">
          <p>© {new Date().getFullYear()} Bharat Darshan. Designed & Built with Pride for Incredible India.</p>
          <div className="flex items-center gap-6">
            <span>28 Indian States</span>
            <span>·</span>
            <span>8 Union Territories</span>
            <span>·</span>
            <span>36 Flagship Journeys</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
