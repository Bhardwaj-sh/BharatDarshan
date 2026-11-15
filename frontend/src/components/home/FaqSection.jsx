import React, { useState } from 'react';
import { FAQS } from '../../data/regionsData';
import { ChevronDown } from 'lucide-react';

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section className="py-20 md:py-28 bg-ivory-100 text-charcoal-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-14">
          <span className="text-xs uppercase tracking-widest text-gold-600 font-semibold mb-2 block">
            Clear Guidance
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-forest-950">
            Answers to Your Questions
          </h2>
          <p className="text-xs sm:text-sm text-charcoal-600 mt-2 max-w-lg mx-auto">
            Everything you need to know about our single-package philosophy, pricing transparency, and the enquiry process.
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
                    ? 'bg-forest-950 text-white border-forest-800 shadow-md'
                    : 'bg-white text-charcoal-800 border-ivory-200 shadow-soft hover:border-ivory-300'
                }`}
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                >
                  <span className={`font-serif text-base sm:text-lg font-medium pr-4 ${
                    isOpen ? 'text-gold-400' : 'text-forest-950'
                  }`}>
                    {faq.question}
                  </span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${
                    isOpen ? 'rotate-180 bg-forest-800 text-gold-400' : 'bg-ivory-100 text-charcoal-600'
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-ivory-200/90 leading-relaxed border-t border-forest-900/60 animate-in fade-in duration-200">
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
