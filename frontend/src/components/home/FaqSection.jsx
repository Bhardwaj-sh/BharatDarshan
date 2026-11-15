import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle, Sparkles } from 'lucide-react';
import BrushDivider from '../common/BrushDivider';

const FAQS = [
  {
    q: 'Why does Bharat Darshan only offer exactly ONE package per state/UT?',
    a: 'Most travel portals overwhelm travelers with hundreds of generic variants, causing extreme decision fatigue. We follow a strict architectural rule: exactly one deeply researched, master-level circuit per region that captures its ultimate historical, cultural, and natural essence without bloat.'
  },
  {
    q: 'How does your Zero-Trust Server Pricing work?',
    a: 'Client prices are never trusted directly during booking creation. When you request a journey, our backend securely fetches the verified master package price from MongoDB, calculates the exact total based on adult travellers, and creates an immutable snapshot stored in your booking record.'
  },
  {
    q: 'How does the Enquiry-First booking system work?',
    a: 'When you submit an enquiry, your booking is initialized in a "Pending" status. Our verified local state coordinator contacts you within 24 hours to confirm date availability, dietary requirements, and custom requests before moving the status to "Confirmed".'
  },
  {
    q: 'Can itineraries be customized for elderly travelers or families?',
    a: 'Yes. While the master itinerary route is fixed to guarantee depth and logistics, pacing, hotel category upgrades, and accessible vehicle transfers can be tailored directly with your assigned local coordinator during the pending review.'
  },
  {
    q: 'Are all 28 States and 8 Union Territories actually active?',
    a: 'Yes! All 36 regions of India—from Ladakh in the extreme north to Kanyakumari in Tamil Nadu, and from Gujarat in the west to Arunachal Pradesh in the east—are fully documented with live itineraries, capitals, and attraction galleries.'
  }
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="relative bg-cream-50 text-slate-900 overflow-hidden py-16 sm:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-forest-900 text-lime-400 text-xs font-bold uppercase tracking-wider mb-4 shadow-sm">
            <HelpCircle className="w-3.5 h-3.5 text-lime-400" />
            <span>Got Questions?</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-forest-900 tracking-tight">
            Answers to Your Questions
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-3">
            Everything you need to know about our curated master journeys and booking workflow.
          </p>
        </div>

        {/* Accordion Container matching Reference Image */}
        <div className="space-y-3.5">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className={`rounded-2xl sm:rounded-3xl transition-all duration-300 overflow-hidden border ${
                  isOpen
                    ? 'bg-forest-900 text-white border-forest-800 shadow-xl'
                    : 'bg-white text-forest-950 border-slate-200 hover:border-forest-600/40 shadow-sm'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full px-6 py-4 sm:py-5 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className={`font-display text-sm sm:text-base font-bold leading-snug ${
                    isOpen ? 'text-lime-300' : 'text-forest-950'
                  }`}>
                    {faq.q}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                      isOpen ? 'bg-forest-800 text-lime-400' : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-slate-200/90 leading-relaxed border-t border-forest-800/80">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

      </div>

      {/* Signature Dark Forest Jagged Torn-Paper / Brush Edge Divider to dark footer */}
      <BrushDivider
        color="#071611"
        position="bottom"
        variant={3}
        className="mt-16 sm:mt-24"
      />
    </section>
  );
}
