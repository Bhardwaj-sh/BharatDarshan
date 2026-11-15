import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShieldCheck, Compass, Users, CheckCircle2, ArrowRight, Award } from 'lucide-react';
import BrushDivider from '../common/BrushDivider';

export default function TrustedGuideSection() {
  return (
    <section className="relative bg-cream-50 text-slate-900 overflow-hidden py-16 sm:py-24">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Editorial Narrative & CTA */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-forest-900 text-lime-400 text-xs font-bold uppercase tracking-wider shadow-sm">
              <Award className="w-3.5 h-3.5 text-lime-400" />
              <span>Authentic Curations Only</span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-forest-900 tracking-tight leading-[1.15]">
              Explore Nature with a <br className="hidden sm:inline" />
              <span className="text-forest-600 underline decoration-lime-400 decoration-wavy decoration-2">
                Trusted Guide
              </span>
            </h2>

            <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal">
              Travel should bring stillness, not confusion. Rather than flooding you with hundreds of generic tour packages, Bharat Darshan crafts <strong>exactly ONE definitive, all-inclusive master journey</strong> for each of India’s 28 States and 8 Union Territories.
            </p>

            {/* Feature Bullets */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
                <CheckCircle2 className="w-5 h-5 text-forest-700 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-forest-900">Zero-Trust Pricing</h4>
                  <p className="text-xs text-slate-600 mt-0.5">Calculated & snapshotted on server. No surge charges.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
                <Users className="w-5 h-5 text-forest-700 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-forest-900">Certified Local Guides</h4>
                  <p className="text-xs text-slate-600 mt-0.5">Native storytellers fluent in regional folklore & history.</p>
                </div>
              </div>
            </div>

            {/* CTA Button (Vibrant Neon Lime from reference) */}
            <div className="pt-4 flex items-center gap-4">
              <Link
                to="/explore"
                className="btn-lime px-8 py-4 text-sm font-black shadow-lime-glow group"
              >
                <span>Book Now</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                to="/about"
                className="px-6 py-3.5 rounded-full text-sm font-bold text-forest-800 hover:text-forest-950 hover:bg-slate-200/60 transition-colors"
              >
                Learn Our Philosophy
              </Link>
            </div>
          </motion.div>

          {/* Right Column: Signature Brush-Masked Photo with Floating Badge */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 relative flex justify-center"
          >
            {/* Outer Decorative Shape */}
            <div className="relative w-full max-w-lg">
              {/* Organic Brush Silhouette Frame */}
              <div className="relative overflow-hidden rounded-[2.5rem] shadow-2xl border-4 border-white">
                <img
                  src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80"
                  alt="Exploring India's nature with guides"
                  className="w-full h-[380px] sm:h-[440px] object-cover hover:scale-105 transition-transform duration-700"
                />
                
                {/* Atmospheric gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-forest-950/70 via-transparent to-transparent" />
                
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <span className="text-xs font-bold tracking-widest uppercase text-lime-300">
                    Sacred Valleys & Living Bridges
                  </span>
                  <h3 className="font-display text-xl font-bold mt-1">
                    Meghalaya & Eastern Himalayas
                  </h3>
                </div>
              </div>

              {/* Floating Stat Capsule Badge */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -bottom-6 -left-4 sm:-left-8 bg-forest-900 text-white p-4 sm:p-5 rounded-3xl border border-lime-400/30 shadow-2xl flex items-center gap-4"
              >
                <div className="w-12 h-12 rounded-2xl bg-forest-800 border border-lime-400/40 flex items-center justify-center text-lime-400 shadow-lime-glow">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-2xl font-black text-lime-400 leading-none">36 / 36</div>
                  <div className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider mt-1">
                    States & UTs Covered
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Signature Dark Forest Jagged Torn-Paper / Brush Edge Divider to next section */}
      <BrushDivider
        color="#0B2019"
        position="bottom"
        variant={3}
        className="mt-16 sm:mt-24"
      />
    </section>
  );
}
