import React, { useState } from 'react';
import { FAQS } from '../../data/regionsData';
import { ChevronDown, HelpCircle } from 'lucide-react';

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section className="py-24 bg-slate-50 text-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <div className="badge-glow mb-4">
            <HelpCircle className="w-3.5 h-3.5 text-saffron-500" />
            <span>Clear Guidance</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-black text-slate-950">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-slate-600 mt-2 max-w-lg mx-auto font-normal">
            Everything you need to know about our single-package philosophy, pricing transparency, and booking enquiry workflow.
          </p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`rounded-2xl transition-all duration-300 overflow-hidden border ${
                  isOpen
                    ? 'bg-slate-950 text-white border-slate-900 shadow-xl'
                    : 'bg-white text-slate-800 border-slate-200/80 shadow-soft hover:border-slate-300'
                }`}
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                >
                  <span className={`font-display text-base sm:text-lg font-bold pr-4 ${
                    isOpen ? 'text-amber-400' : 'text-slate-950'
                  }`}>
                    {faq.question}
                  </span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${
                    isOpen ? 'rotate-180 bg-white/10 text-amber-400' : 'bg-slate-100 text-slate-600'
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-white/10 animate-in fade-in duration-200">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
