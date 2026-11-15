import React, { useState } from 'react';
import { Calendar, Users, ShieldCheck, ArrowRight, Info, CheckCircle2 } from 'lucide-react';

export default function PriceCalculator({ packageData, onOpenEnquiry }) {
  const pricePerPerson = packageData?.pricePerPerson || 34500;
  
  // Tomorrow's date as min date
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 2);
  const minDateString = tomorrow.toISOString().split('T')[0];

  const [travelDate, setTravelDate] = useState(minDateString);
  const [travellers, setTravellers] = useState(2);

  const subtotal = pricePerPerson * travellers;

  const handleTravellerChange = (delta) => {
    const updated = travellers + delta;
    if (updated >= 1 && updated <= 12) {
      setTravellers(updated);
    }
  };

  const handleEnquiryClick = () => {
    if (onOpenEnquiry) {
      onOpenEnquiry({
        travelDate,
        travellers,
        pricePerPerson,
        estimatedTotal: subtotal
      });
    }
  };

  return (
    <div className="bg-forest-950 text-ivory-100 rounded-3xl p-6 sm:p-8 border border-white/15 shadow-2xl sticky top-28">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-5 border-b border-white/10 mb-6">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-widest text-gold-400 block mb-1">
            Official Single Tour Package
          </span>
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
            Trip Price Calculator
          </h3>
        </div>
        <div className="text-right">
          <span className="text-[10px] uppercase tracking-wider text-ivory-300 block">
            Per Person
          </span>
          <span className="font-serif text-2xl font-bold text-gold-400">
            ₹{pricePerPerson.toLocaleString('en-IN')}
          </span>
        </div>
      </div>

      {/* Calculator Controls */}
      <div className="space-y-5">
        
        {/* Date Selection */}
        <div>
          <label className="block text-xs uppercase tracking-wider text-ivory-300 font-semibold mb-2 flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-gold-400" />
            <span>Select Travel Date</span>
          </label>
          <input
            type="date"
            min={minDateString}
            value={travelDate}
            onChange={(e) => setTravelDate(e.target.value)}
            className="w-full bg-forest-900 border border-white/15 rounded-2xl px-4 py-3 text-sm text-ivory-100 focus:outline-none focus:border-gold-500 cursor-pointer"
          />
        </div>

        {/* Travellers Counter */}
        <div>
          <label className="block text-xs uppercase tracking-wider text-ivory-300 font-semibold mb-2 flex items-center gap-1.5">
            <Users className="w-4 h-4 text-gold-400" />
            <span>Number of Travellers</span>
          </label>
          <div className="flex items-center justify-between bg-forest-900 border border-white/15 rounded-2xl p-2">
            <button
              type="button"
              onClick={() => handleTravellerChange(-1)}
              disabled={travellers <= 1}
              className="w-10 h-10 rounded-xl bg-forest-950 text-ivory-100 hover:bg-forest-800 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center font-bold text-lg transition-colors"
            >
              -
            </button>
            <div className="text-center">
              <span className="font-serif text-lg font-bold text-white block">
                {travellers} {travellers === 1 ? 'Traveller' : 'Travellers'}
              </span>
              <span className="text-[10px] text-ivory-300">Adults (Age 12+)</span>
            </div>
            <button
              type="button"
              onClick={() => handleTravellerChange(1)}
              disabled={travellers >= 12}
              className="w-10 h-10 rounded-xl bg-forest-950 text-ivory-100 hover:bg-forest-800 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center font-bold text-lg transition-colors"
            >
              +
            </button>
          </div>
        </div>

        {/* Transparent Price Breakdown */}
        <div className="bg-forest-900/60 rounded-2xl p-4 border border-white/10 space-y-2 text-xs">
          <div className="flex justify-between text-ivory-300">
            <span>Base Package (₹{pricePerPerson.toLocaleString('en-IN')} × {travellers})</span>
            <span className="font-medium text-ivory-100">₹{subtotal.toLocaleString('en-IN')}</span>
          </div>
          <div className="flex justify-between text-ivory-300">
            <span>Heritage Stays & AC Transfers</span>
            <span className="text-gold-400 font-medium">Included</span>
          </div>
          <div className="flex justify-between text-ivory-300">
            <span>Monument Passes & Local Guides</span>
            <span className="text-gold-400 font-medium">Included</span>
          </div>
          <div className="pt-2 border-t border-white/10 flex justify-between items-baseline">
            <span className="font-semibold text-ivory-100 text-sm">Estimated Total Amount</span>
            <span className="font-serif text-2xl font-bold text-gold-400">
              ₹{subtotal.toLocaleString('en-IN')}
            </span>
          </div>
        </div>

        {/* Enquiry CTA Button */}
        <button
          onClick={handleEnquiryClick}
          className="w-full btn-gold py-4 text-xs uppercase tracking-wider font-bold rounded-2xl flex items-center justify-center gap-2 shadow-glow-gold hover:scale-[1.02] active:scale-95 transition-all"
        >
          <span>Send Booking Enquiry</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        {/* Security & Price Integrity Guarantee */}
        <div className="pt-2 flex items-start gap-2 text-[11px] text-ivory-300/80 leading-relaxed">
          <ShieldCheck className="w-4 h-4 text-gold-400 flex-shrink-0 mt-0.5" />
          <span>
            Zero-Trust Pricing Architecture: The total amount is recalculated and validated by our secure server before any enquiry is saved.
          </span>
        </div>

      </div>

    </div>
  );
}
