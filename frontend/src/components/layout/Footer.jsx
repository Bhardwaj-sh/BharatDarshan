import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Mail, ShieldCheck, Heart, ArrowUpRight, Sparkles, Send } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative bg-forest-950 text-slate-300 overflow-hidden pt-20 pb-12 border-t border-forest-850">
      
      {/* Background Brand Watermark from reference screenshot */}
      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 pointer-events-none select-none opacity-[0.035] whitespace-nowrap">
        <span className="font-display text-[120px] sm:text-[180px] md:text-[230px] font-black text-white tracking-widest uppercase">
          NATURE & TRAVEL
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top: Brand & Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-14 border-b border-forest-850">
          
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-forest-800 border border-lime-400/40 flex items-center justify-center text-lime-400 shadow-lime-glow">
                <Compass className="w-5 h-5 text-lime-400" />
              </div>
              <span className="font-display text-2xl font-black tracking-tight text-white">
                Bharat Darshan
              </span>
            </div>
            
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed font-normal">
              Discover India. Experience Every Journey. Dedicated to representing every State and Union Territory in India through one masterfully planned, culturally authentic, and geographically realistic itinerary.
            </p>

            <div className="flex items-center gap-2 text-xs text-lime-400 font-semibold pt-1">
              <ShieldCheck className="w-4 h-4 text-lime-400" />
              <span>Zero-Trust Server Verified Pricing · Exactly 1 Master Tour / Region</span>
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="bg-forest-900/90 border border-forest-800 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-2xl">
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
                  className="bg-forest-950 border border-forest-750 rounded-full px-5 py-3 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-lime-400 transition-colors flex-1"
                />
                <button
                  type="submit"
                  className="btn-lime-sm px-6 py-3 uppercase tracking-wider font-bold whitespace-nowrap flex items-center justify-center gap-1.5 cursor-pointer"
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
            <h5 className="font-display text-xs font-black text-lime-400 uppercase tracking-widest mb-4">
              Featured Flagships
            </h5>
            <ul className="space-y-3 font-medium">
              <li>
                <Link to="/region/rajasthan" className="hover:text-lime-300 transition-colors flex items-center gap-1 text-slate-300">
                  Rajasthan Tour <ArrowUpRight className="w-3 h-3 text-lime-400" />
                </Link>
              </li>
              <li>
                <Link to="/region/kerala" className="hover:text-lime-300 transition-colors text-slate-300">Kerala Backwaters</Link>
              </li>
              <li>
                <Link to="/region/ladakh" className="hover:text-lime-300 transition-colors text-slate-300">Ladakh High Passes</Link>
              </li>
              <li>
                <Link to="/region/himachal-pradesh" className="hover:text-lime-300 transition-colors text-slate-300">Himachal Valleys</Link>
              </li>
              <li>
                <Link to="/region/goa" className="hover:text-lime-300 transition-colors text-slate-300">Goa Heritage & Coast</Link>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="font-display text-xs font-black text-lime-400 uppercase tracking-widest mb-4">
              Explore Themes
            </h5>
            <ul className="space-y-3 font-medium">
              <li><Link to="/#explore-regions" className="hover:text-lime-300 transition-colors text-slate-300">Heritage & Palaces</Link></li>
              <li><Link to="/#explore-regions" className="hover:text-lime-300 transition-colors text-slate-300">Himalayan Sanctuaries</Link></li>
              <li><Link to="/#explore-regions" className="hover:text-lime-300 transition-colors text-slate-300">Coastal Lagoons</Link></li>
              <li><Link to="/#explore-regions" className="hover:text-lime-300 transition-colors text-slate-300">Spiritual & Temples</Link></li>
              <li><Link to="/#explore-regions" className="hover:text-lime-300 transition-colors text-slate-300">Northeast Living Bridges</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="font-display text-xs font-black text-lime-400 uppercase tracking-widest mb-4">
              Architecture & Rules
            </h5>
            <ul className="space-y-3 font-medium">
              <li><span className="text-slate-400">1 Tour Per State (Strict)</span></li>
              <li><span className="text-slate-400">Zero-Trust Server Pricing</span></li>
              <li><span className="text-slate-400">Enquiry-First Workflow</span></li>
              <li><span className="text-slate-400">Local Certified Guides</span></li>
              <li><span className="text-slate-400">No Surge Pricing</span></li>
            </ul>
          </div>

          <div>
            <h5 className="font-display text-xs font-black text-lime-400 uppercase tracking-widest mb-4">
              Platform & Accounts
            </h5>
            <ul className="space-y-3 font-medium">
              <li><Link to="/login" className="hover:text-lime-300 transition-colors text-slate-300">Traveler Login</Link></li>
              <li><Link to="/register" className="hover:text-lime-300 transition-colors text-slate-300">Create Account</Link></li>
              <li><Link to="/admin/dashboard" className="hover:text-lime-300 transition-colors text-slate-300">Admin Portal</Link></li>
              <li><Link to="/about" className="hover:text-lime-300 transition-colors text-slate-300">Our Heritage Vision</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-forest-850 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} Bharat Darshan. All rights reserved. 28 States · 8 UTs.</p>
          <p className="flex items-center gap-1.5 text-slate-400">
            Crafted with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for Incredible India
          </p>
        </div>

      </div>
    </footer>
  );
}
