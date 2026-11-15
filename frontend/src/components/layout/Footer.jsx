import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Mail, ShieldCheck, Heart, ArrowUpRight, Sparkles, Send, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative bg-slate-50 text-slate-600 overflow-hidden pt-20 pb-12 border-t border-slate-200">
      
      {/* Background Brand Watermark */}
      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 pointer-events-none select-none opacity-[0.03] whitespace-nowrap">
        <span className="font-display text-[120px] sm:text-[180px] md:text-[240px] font-black text-slate-900 tracking-widest uppercase">
          BHARAT DARSHAN
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top: Brand & Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-14 border-b border-slate-200">
          
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-900" />
              <span className="font-display text-2xl font-black tracking-widest text-slate-900 uppercase">
                Bharat Darshan
              </span>
            </div>
            
            <p className="text-sm text-slate-600 max-w-sm leading-relaxed font-normal">
              Discover India. Experience Every Journey. The definitive luxury travel platform presenting all 28 Indian States and 8 Union Territories through unified master itineraries.
            </p>

            <div className="flex items-center gap-2 text-xs text-slate-800 font-mono font-bold pt-1">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Zero-Trust Server Verified Pricing · Exactly 1 Tour / Region</span>
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm">
              <h4 className="font-display text-xl font-bold text-slate-900 mb-2">
                The Bharat Darshan Travel Journal
              </h4>
              <p className="text-xs text-slate-600 mb-5 font-normal">
                Receive our curated seasonal dispatch on ancient festival dates, Himalayan pass openings, and private heritage retreats across India.
              </p>
              
              <form onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row gap-2 max-w-md">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-slate-50 border border-slate-300 rounded-full px-5 py-3 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-800 transition-colors flex-1"
                />
                <button
                  type="submit"
                  className="btn-classy-dark px-6 py-3 uppercase tracking-wider font-bold whitespace-nowrap flex items-center justify-center gap-1.5 cursor-pointer text-xs"
                >
                  <span>Subscribe</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          </div>

        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 text-xs">
          <div>
            <h5 className="font-display text-xs font-black text-slate-900 uppercase tracking-widest mb-4">
              Flagship Regions
            </h5>
            <ul className="space-y-3 font-medium">
              <li>
                <Link to="/region/rajasthan" className="hover:text-slate-900 transition-colors flex items-center gap-1 text-slate-600">
                  Rajasthan Tour <ArrowUpRight className="w-3 h-3 text-slate-900" />
                </Link>
              </li>
              <li>
                <Link to="/region/kerala" className="hover:text-slate-900 transition-colors text-slate-600">Kerala Backwaters</Link>
              </li>
              <li>
                <Link to="/region/ladakh" className="hover:text-slate-900 transition-colors text-slate-600">Ladakh High Passes</Link>
              </li>
              <li>
                <Link to="/region/himachal-pradesh" className="hover:text-slate-900 transition-colors text-slate-600">Himachal Valleys</Link>
              </li>
              <li>
                <Link to="/region/goa" className="hover:text-slate-900 transition-colors text-slate-600">Goa Heritage Coast</Link>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="font-display text-xs font-black text-slate-900 uppercase tracking-widest mb-4">
              Explore Experiences
            </h5>
            <ul className="space-y-3 font-medium">
              <li><a href="#experiences" className="hover:text-slate-900 transition-colors text-slate-600">Himalayan Sanctuaries</a></li>
              <li><a href="#experiences" className="hover:text-slate-900 transition-colors text-slate-600">Royal Desert Citadels</a></li>
              <li><a href="#experiences" className="hover:text-emerald-300 transition-colors text-slate-300">Coastal Lagoons</a></li>
              <li><a href="#experiences" className="hover:text-orange-300 transition-colors text-slate-300">Sacred Corridors & Ghats</a></li>
              <li><a href="#experiences" className="hover:text-teal-300 transition-colors text-slate-300">Living Root Bridges</a></li>
            </ul>
          </div>

          <div>
            <h5 className="font-display text-xs font-black text-amber-400 uppercase tracking-widest mb-4">
              Architectural Standard
            </h5>
            <ul className="space-y-3 font-medium">
              <li><span className="text-slate-400">Strict 1 Tour Per State</span></li>
              <li><span className="text-slate-400">Zero-Trust Server Pricing</span></li>
              <li><span className="text-slate-400">Government Licensed Guides</span></li>
              <li><span className="text-slate-400">24-Hour Concierge Review</span></li>
              <li><span className="text-slate-400">No Hidden Surge Markup</span></li>
            </ul>
          </div>

          <div>
            <h5 className="font-display text-xs font-black text-amber-400 uppercase tracking-widest mb-4">
              Portal Access
            </h5>
            <ul className="space-y-3 font-medium">
              <li><Link to="/login" className="hover:text-amber-300 transition-colors text-slate-300">Traveler Login</Link></li>
              <li><Link to="/register" className="hover:text-amber-300 transition-colors text-slate-300">Create Account</Link></li>
              <li><Link to="/admin/dashboard" className="hover:text-amber-300 transition-colors text-slate-300">Admin Portal</Link></li>
              <li><Link to="/about" className="hover:text-amber-300 transition-colors text-slate-300">Our Heritage Vision</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} Bharat Darshan. All rights reserved. 28 States · 8 UTs.</p>
          <p className="flex items-center gap-1.5 text-slate-400">
            Crafted with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for Incredible India
          </p>
        </div>

      </div>
    </footer>
  );
}
