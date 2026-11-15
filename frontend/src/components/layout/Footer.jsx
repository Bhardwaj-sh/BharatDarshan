import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Mail, ShieldCheck, Heart, ArrowUpRight, Sparkles } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative bg-slate-950 text-slate-300 overflow-hidden pt-20 pb-12 border-t border-slate-900">
      
      {/* Background Brand Watermark */}
      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 pointer-events-none select-none opacity-[0.03] whitespace-nowrap">
        <span className="font-display text-[140px] md:text-[220px] font-black text-white tracking-widest uppercase">
          BHARAT DARSHAN
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top: Brand & Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-14 border-b border-slate-900">
          
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-saffron-500 to-amber-400 flex items-center justify-center text-white shadow-glow-saffron">
                <Compass className="w-5 h-5 text-white" />
              </div>
              <span className="font-display text-2xl font-black tracking-tight text-white">
                Bharat Darshan
              </span>
            </div>
            
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed font-normal">
              Discover India. Experience Every Journey. Dedicated to representing every State and Union Territory in India through one masterfully planned, culturally authentic, and geographically realistic itinerary.
            </p>

            <div className="flex items-center gap-2 text-xs text-amber-400 font-semibold pt-1">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Zero-Trust Server Verified Pricing · Exactly 1 Tour / Region</span>
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-md">
              <h4 className="font-display text-xl font-bold text-white mb-2">
                Stay Inspired for Your Next Journey
              </h4>
              <p className="text-xs text-slate-400 mb-5 font-normal">
                Receive our monthly travel journal highlighting seasonal festival routes, regional cuisines, and verified travel tips across India.
              </p>
              
              <form onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row gap-2 max-w-md">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-slate-950 border border-slate-800 rounded-2xl px-5 py-3 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-saffron-500 transition-colors flex-1"
                />
                <button
                  type="submit"
                  className="btn-gradient text-xs uppercase tracking-wider py-3 px-6 whitespace-nowrap font-bold"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>

        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 text-xs">
          <div>
            <h5 className="font-display text-xs font-black text-amber-400 uppercase tracking-widest mb-4">
              Featured Flagships
            </h5>
            <ul className="space-y-3 font-medium">
              <li>
                <Link to="/region/rajasthan" className="hover:text-amber-300 transition-colors flex items-center gap-1 text-slate-300">
                  Rajasthan Tour <ArrowUpRight className="w-3 h-3 text-saffron-500" />
                </Link>
              </li>
              <li>
                <Link to="/region/kerala" className="hover:text-amber-300 transition-colors text-slate-300">Kerala Backwaters</Link>
              </li>
              <li>
                <Link to="/region/ladakh" className="hover:text-amber-300 transition-colors text-slate-300">Ladakh High Passes</Link>
              </li>
              <li>
                <Link to="/region/himachal-pradesh" className="hover:text-amber-300 transition-colors text-slate-300">Himachal Valleys</Link>
              </li>
              <li>
                <Link to="/region/goa" className="hover:text-amber-300 transition-colors text-slate-300">Goa Heritage & Coast</Link>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="font-display text-xs font-black text-amber-400 uppercase tracking-widest mb-4">
              Explore Themes
            </h5>
            <ul className="space-y-3 font-medium">
              <li><Link to="/#categories" className="hover:text-amber-300 transition-colors text-slate-300">Heritage & Palaces</Link></li>
              <li><Link to="/#categories" className="hover:text-amber-300 transition-colors text-slate-300">Himalayan Escapes</Link></li>
              <li><Link to="/#categories" className="hover:text-amber-300 transition-colors text-slate-300">Coastal Coastlines</Link></li>
              <li><Link to="/#categories" className="hover:text-amber-300 transition-colors text-slate-300">Wildlife & Jungles</Link></li>
              <li><Link to="/#categories" className="hover:text-amber-300 transition-colors text-slate-300">Spiritual Sanctuaries</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="font-display text-xs font-black text-amber-400 uppercase tracking-widest mb-4">
              Platform
            </h5>
            <ul className="space-y-3 font-medium">
              <li><Link to="/explore" className="hover:text-amber-300 transition-colors text-slate-300">All 36 States & UTs</Link></li>
              <li><Link to="/about" className="hover:text-amber-300 transition-colors text-slate-300">Our Vision</Link></li>
              <li><Link to="/login" className="hover:text-amber-300 transition-colors text-slate-300">Traveller Sign In</Link></li>
              <li><Link to="/admin" className="hover:text-amber-300 transition-colors text-slate-300">Admin Portal</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="font-display text-xs font-black text-amber-400 uppercase tracking-widest mb-4">
              Authentic Travel
            </h5>
            <p className="text-slate-400 leading-relaxed font-normal">
              We never fabricate customer numbers, fake countdown timers, or artificial discounts. Every itinerary is planned around geographic reality and living local culture.
            </p>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Bharat Darshan. Built with Pride for Incredible India.</p>
          <div className="flex items-center gap-6 font-semibold">
            <span>28 Indian States</span>
            <span>·</span>
            <span>8 Union Territories</span>
            <span>·</span>
            <span>36 Curated Journeys</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
