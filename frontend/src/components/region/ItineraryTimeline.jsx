import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Bed, Utensils, ChevronDown, ChevronUp, Sun, Moon, Sunrise, Car, Sparkles } from 'lucide-react';

export default function ItineraryTimeline({ days = [] }) {
  const [expandedDays, setExpandedDays] = useState({ 1: true, 2: true });

  const toggleDay = (dayNumber) => {
    setExpandedDays((prev) => ({
      ...prev,
      [dayNumber]: !prev[dayNumber]
    }));
  };

  const expandAll = () => {
    const all = {};
    days.forEach((d) => (all[d.day] = true));
    setExpandedDays(all);
  };

  const collapseAll = () => {
    setExpandedDays({});
  };

  return (
    <div className="relative">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-8 pb-5 border-b border-slate-200">
        <div>
          <span className="text-xs uppercase font-extrabold tracking-widest text-saffron-600 block mb-1">
            Day-by-Day Master Plan
          </span>
          <h3 className="font-display text-2xl sm:text-3xl font-black text-slate-950">
            Editorial Itinerary ({days.length} Days)
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={expandAll}
            className="text-xs font-bold text-slate-700 hover:text-saffron-600 px-3.5 py-1.5 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition-colors shadow-sm"
          >
            Expand All
          </button>
          <button
            onClick={collapseAll}
            className="text-xs font-bold text-slate-500 hover:text-slate-800 px-3.5 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition-colors shadow-sm"
          >
            Collapse All
          </button>
        </div>
      </div>

      {/* Timeline */}
      <div className="relative border-l-2 border-slate-200 ml-4 sm:ml-6 pl-6 sm:pl-8 space-y-8">
        
        {days.map((day) => {
          const isExpanded = !!expandedDays[day.day];

          return (
            <div key={day.day} className="relative group">
              
              {/* Timeline Milestone Marker */}
              <div className="absolute -left-[35px] sm:-left-[43px] top-4 w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-slate-900 border-2 border-saffron-500 text-amber-400 flex items-center justify-center font-display font-black text-xs shadow-md group-hover:scale-110 transition-transform">
                {day.day}
              </div>

              {/* Day Card */}
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-soft overflow-hidden transition-all duration-200 hover:shadow-card">
                
                {/* Header (Accordion Trigger) */}
                <div
                  onClick={() => toggleDay(day.day)}
                  className="p-6 cursor-pointer flex items-start justify-between gap-4 select-none hover:bg-slate-50/70 transition-colors"
                >
                  <div className="flex-grow">
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <span className="text-[10px] uppercase font-black tracking-wider bg-saffron-50 text-saffron-600 px-2.5 py-0.5 rounded-lg border border-saffron-200/60">
                        Day {day.day}
                      </span>
                      {day.distance && (
                        <span className="text-[11px] text-slate-500 flex items-center gap-1 font-semibold">
                          <Car className="w-3.5 h-3.5 text-saffron-500" />
                          <span>{day.distance}</span>
                        </span>
                      )}
                    </div>
                    <h4 className="font-display text-lg sm:text-xl font-bold text-slate-950">
                      {day.title}
                    </h4>
                  </div>

                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 flex-shrink-0 mt-1">
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </div>

                {/* Expanded Day Details */}
                {isExpanded && (
                  <div className="px-6 pb-6 pt-2 border-t border-slate-100 space-y-5 animate-in fade-in duration-200">
                    
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                      {day.overview}
                    </p>

                    {/* Morning / Afternoon / Evening Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
                      
                      {/* Morning */}
                      <div className="bg-amber-50/60 rounded-2xl p-4 border border-amber-200/70">
                        <div className="flex items-center gap-2 text-amber-800 text-xs font-bold uppercase tracking-wider mb-2">
                          <Sunrise className="w-4 h-4 text-amber-600" />
                          <span>Morning</span>
                        </div>
                        <p className="text-xs text-slate-700 leading-relaxed font-normal">
                          {day.morning}
                        </p>
                      </div>

                      {/* Afternoon */}
                      <div className="bg-orange-50/60 rounded-2xl p-4 border border-orange-200/70">
                        <div className="flex items-center gap-2 text-orange-800 text-xs font-bold uppercase tracking-wider mb-2">
                          <Sun className="w-4 h-4 text-orange-600" />
                          <span>Afternoon</span>
                        </div>
                        <p className="text-xs text-slate-700 leading-relaxed font-normal">
                          {day.afternoon}
                        </p>
                      </div>

                      {/* Evening */}
                      <div className="bg-slate-100/80 rounded-2xl p-4 border border-slate-200">
                        <div className="flex items-center gap-2 text-slate-900 text-xs font-bold uppercase tracking-wider mb-2">
                          <Moon className="w-4 h-4 text-slate-600" />
                          <span>Evening</span>
                        </div>
                        <p className="text-xs text-slate-700 leading-relaxed font-normal">
                          {day.evening}
                        </p>
                      </div>

                    </div>

                    {/* Stay & Meal Summary */}
                    <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600">
                      <div className="flex items-center gap-2">
                        <Bed className="w-4 h-4 text-saffron-500 flex-shrink-0" />
                        <span className="font-bold text-slate-900">Stay:</span>
                        <span>{day.stay}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Utensils className="w-4 h-4 text-amber-500 flex-shrink-0" />
                        <span className="font-bold text-slate-900">Meals:</span>
                        <span>{day.meal}</span>
                      </div>
                    </div>

                  </div>
                )}

              </div>
            </div>
          );
        })}

      </div>
    </div>
  );
}
