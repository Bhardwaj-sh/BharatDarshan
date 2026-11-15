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
    <div className="bg-forest-900 text-white rounded-3xl p-6 sm:p-8 border border-forest-750 shadow-2xl sticky top-28">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-5 border-b border-forest-800 mb-6">
        <div>
          <span className="text-[10px] uppercase font-extrabold tracking-widest text-lime-400 block mb-1">
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
          <span className="font-display text-2xl font-black text-lime-400">
            ₹{pricePerPerson.toLocaleString('en-IN')}
          </span>
        </div>
      </div>

      {/* Controls */}
      <div className="space-y-5">
        
        {/* Date Selection */}
        <div>
          <label className="block text-xs uppercase tracking-wider text-slate-300 font-bold mb-2 flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-lime-400" />
            <span>Select Travel Date</span>
          </label>
          <input
            type="date"
            min={minDateString}
            value={travelDate}
            onChange={(e) => setTravelDate(e.target.value)}
            className="w-full bg-forest-950 border border-forest-750 rounded-2xl px-4 py-3 text-sm text-white focus:outline-none focus:border-lime-400 cursor-pointer font-medium"
          />
        </div>

        {/* Travellers Counter */}
        <div>
          <label className="block text-xs uppercase tracking-wider text-slate-300 font-bold mb-2 flex items-center gap-1.5">
            <Users className="w-4 h-4 text-lime-400" />
            <span>Number of Travellers</span>
          </label>
          <div className="flex items-center justify-between bg-forest-950 border border-forest-750 rounded-2xl p-2">
            <button
              type="button"
              onClick={() => handleTravellerChange(-1)}
              disabled={travellers <= 1}
              className="w-10 h-10 rounded-xl bg-forest-850 text-white hover:bg-forest-800 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center font-bold text-lg transition-colors cursor-pointer"
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
              className="w-10 h-10 rounded-xl bg-forest-850 text-white hover:bg-forest-800 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center font-bold text-lg transition-colors cursor-pointer"
            >
              +
            </button>
          </div>
        </div>

        {/* Calculation Summary */}
        <div className="bg-forest-950/80 rounded-2xl p-4 border border-forest-800 space-y-2 text-xs">
          <div className="flex justify-between text-slate-400">
            <span>Base Tariff ({travellers} × ₹{pricePerPerson.toLocaleString('en-IN')})</span>
            <span className="font-semibold text-slate-200">₹{subtotal.toLocaleString('en-IN')}</span>
          </div>
          <div className="flex justify-between text-slate-400">
            <span>Taxes & Sustainable Conservation</span>
            <span className="font-semibold text-lime-400">Included</span>
          </div>
          <div className="pt-2 border-t border-forest-800 flex justify-between items-baseline">
            <span className="text-sm font-bold text-white">Estimated Total</span>
            <span className="font-display text-2xl font-black text-lime-400">
              ₹{subtotal.toLocaleString('en-IN')}
            </span>
          </div>
        </div>

        {/* Action Button */}
        <button
          type="button"
          onClick={handleEnquiryClick}
          className="btn-lime w-full py-4 text-xs uppercase tracking-wider font-extrabold shadow-lime-glow cursor-pointer"
        >
          <span>Request Booking Enquiry</span>
          <ArrowRight className="w-4 h-4 ml-1" />
        </button>

        {/* Zero-Trust Notice */}
        <div className="flex items-start gap-2.5 pt-2 text-[11px] text-slate-400 leading-relaxed">
          <ShieldCheck className="w-4 h-4 text-lime-400 shrink-0 mt-0.5" />
          <span>
            <strong>Zero-Trust Server Guarantee:</strong> Total price will be strictly verified and snapshotted on the server upon submission.
          </span>
        </div>

      </div>

    </div>
  );
}
