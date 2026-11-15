import React, { useState } from 'react';
import { Calendar, Users, ShieldCheck, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

export default function PriceCalculator({ packageData, onOpenEnquiry }) {
  const pricePerPerson = packageData?.pricePerPerson || 34500;
  
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
    <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl sticky top-28">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-5 border-b border-slate-800 mb-6">
        <div>
          <span className="text-[10px] uppercase font-extrabold tracking-widest text-amber-400 block mb-1">
            Verified Single Package
          </span>
          <h3 className="font-display text-2xl font-black text-white">
            Trip Calculator
          </h3>
        </div>
        <div className="text-right">
          <span className="text-[10px] uppercase tracking-wider text-slate-400 block font-semibold">
            Per Person
          </span>
          <span className="font-display text-2xl font-black text-amber-400">
            ₹{pricePerPerson.toLocaleString('en-IN')}
          </span>
        </div>
      </div>

      {/* Controls */}
      <div className="space-y-5">
        
        {/* Date Selection */}
        <div>
          <label className="block text-xs uppercase tracking-wider text-slate-300 font-bold mb-2 flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-amber-400" />
            <span>Select Travel Date</span>
          </label>
          <input
            type="date"
            min={minDateString}
            value={travelDate}
            onChange={(e) => setTravelDate(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-4 py-3 text-sm text-white focus:outline-none focus:border-saffron-500 cursor-pointer font-medium"
          />
        </div>

        {/* Travellers Counter */}
        <div>
          <label className="block text-xs uppercase tracking-wider text-slate-300 font-bold mb-2 flex items-center gap-1.5">
            <Users className="w-4 h-4 text-amber-400" />
            <span>Number of Travellers</span>
          </label>
          <div className="flex items-center justify-between bg-slate-950 border border-slate-800 rounded-2xl p-2">
            <button
              type="button"
              onClick={() => handleTravellerChange(-1)}
              disabled={travellers <= 1}
              className="w-10 h-10 rounded-xl bg-slate-900 text-white hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center font-bold text-lg transition-colors"
            >
              -
            </button>
            <div className="text-center">
              <span className="font-display text-lg font-black text-white block">
                {travellers} {travellers === 1 ? 'Adult' : 'Adults'}
              </span>
              <span className="text-[10px] text-slate-400 font-medium">Age 12+</span>
            </div>
            <button
              type="button"
              onClick={() => handleTravellerChange(1)}
              disabled={travellers >= 12}
              className="w-10 h-10 rounded-xl bg-slate-900 text-white hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center font-bold text-lg transition-colors"
            >
              +
            </button>
          </div>
        </div>

        {/* Breakdown Box */}
        <div className="bg-slate-950/80 rounded-2xl p-4 border border-slate-800 space-y-2.5 text-xs">
          <div className="flex justify-between text-slate-400">
            <span>Base Package (₹{pricePerPerson.toLocaleString('en-IN')} × {travellers})</span>
            <span className="font-bold text-white">₹{subtotal.toLocaleString('en-IN')}</span>
          </div>
          <div className="flex justify-between text-slate-400">
            <span>Heritage Stays & Private Transport</span>
            <span className="text-emerald-400 font-bold">Included</span>
          </div>
          <div className="flex justify-between text-slate-400">
            <span>Monument Permits & Chauffeur</span>
            <span className="text-emerald-400 font-bold">Included</span>
          </div>
          <div className="pt-2 border-t border-slate-800 flex justify-between items-baseline">
            <span className="font-bold text-white text-sm">Estimated Total Amount</span>
            <span className="font-display text-2xl font-black text-amber-400">
              ₹{subtotal.toLocaleString('en-IN')}
            </span>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={handleEnquiryClick}
          className="w-full btn-gradient py-4 text-xs uppercase tracking-wider font-extrabold rounded-2xl flex items-center justify-center gap-2 shadow-glow-saffron hover:scale-[1.02] active:scale-95 transition-all"
        >
          <span>Send Booking Enquiry</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        {/* Price Integrity Note */}
        <div className="pt-2 flex items-start gap-2 text-[11px] text-slate-400 leading-relaxed font-normal">
          <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
          <span>
            Zero-Trust Pricing Architecture: The total amount is recalculated and validated by our server before any enquiry is saved.
          </span>
        </div>

      </div>

    </div>
  );
}
