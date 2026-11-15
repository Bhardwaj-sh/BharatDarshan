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
      <div className="flex items-center justify-between mb-8 pb-5 border-b border-forest-800">
        <div>
          <span className="text-xs uppercase font-extrabold tracking-widest text-lime-400 block mb-1">
            Day-by-Day Master Plan
          </span>
          <h3 className="font-display text-2xl sm:text-3xl font-black text-white">
            Editorial Itinerary ({days.length} Days)
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={expandAll}
            className="text-xs font-bold text-slate-300 hover:text-lime-400 px-3.5 py-1.5 rounded-full border border-forest-750 bg-forest-900 hover:border-lime-400/40 transition-colors shadow-sm cursor-pointer"
          >
            Expand All
          </button>
          <button
            onClick={collapseAll}
            className="text-xs font-bold text-slate-400 hover:text-white px-3.5 py-1.5 rounded-full border border-forest-750 bg-forest-900 hover:border-forest-700 transition-colors shadow-sm cursor-pointer"
          >
            Collapse All
          </button>
        </div>
      </div>

      {/* Timeline */}
      <div className="relative border-l-2 border-forest-800 ml-4 sm:ml-6 pl-6 sm:pl-8 space-y-8">
        
        {days.map((day) => {
          const isExpanded = !!expandedDays[day.day];

          return (
            <div key={day.day} className="relative group">
              
              {/* Timeline Milestone Marker */}
              <div className="absolute -left-[35px] sm:-left-[43px] top-4 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-forest-950 border-2 border-lime-400 text-lime-400 flex items-center justify-center font-display font-black text-xs shadow-lime-glow group-hover:scale-110 transition-transform">
                {day.day}
              </div>

              {/* Day Card */}
              <div className="bg-forest-850/95 rounded-3xl border border-forest-750 shadow-xl overflow-hidden transition-all duration-200 hover:border-lime-400/40">
                
                {/* Header (Accordion Trigger) */}
                <div
                  onClick={() => toggleDay(day.day)}
                  className="p-6 cursor-pointer flex items-start justify-between gap-4 select-none hover:bg-forest-800/40 transition-colors"
                >
                  <div className="flex-grow">
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <span className="text-[10px] uppercase font-black tracking-wider bg-lime-400/15 text-lime-400 px-2.5 py-0.5 rounded-full border border-lime-400/30">
                        Day {day.day}
                      </span>
                      {day.distance && (
                        <span className="text-[11px] text-slate-300 flex items-center gap-1 font-semibold">
                          <Car className="w-3.5 h-3.5 text-lime-400" />
                          <span>{day.distance}</span>
                        </span>
                      )}
                    </div>
                    <h4 className="font-display text-lg sm:text-xl font-bold text-white">
                      {day.title}
                    </h4>
                  </div>

                  <div className="w-8 h-8 rounded-full bg-forest-800 flex items-center justify-center text-slate-300 flex-shrink-0 mt-1">
                    {isExpanded ? <ChevronUp className="w-4 h-4 text-lime-400" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </div>

                {/* Expanded Day Details */}
                {isExpanded && (
                  <div className="px-6 pb-6 pt-2 border-t border-forest-800 space-y-5 animate-in fade-in duration-200">
                    
                    {/* Day Narrative Overview */}
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                      {day.overview}
                    </p>

                    {/* Timeline Segments: Morning, Afternoon, Evening */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 pt-2">
                      
                      {/* Morning */}
                      <div className="bg-forest-900/80 rounded-2xl p-4 border border-forest-800">
                        <div className="flex items-center gap-2 text-xs font-bold text-lime-300 mb-2">
                          <Sunrise className="w-4 h-4 text-lime-400" />
                          <span>Morning</span>
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          {day.morning}
                        </p>
                      </div>

                      {/* Afternoon */}
                      <div className="bg-forest-900/80 rounded-2xl p-4 border border-forest-800">
                        <div className="flex items-center gap-2 text-xs font-bold text-emerald-300 mb-2">
                          <Sun className="w-4 h-4 text-emerald-400" />
                          <span>Afternoon</span>
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          {day.afternoon}
                        </p>
                      </div>

                      {/* Evening */}
                      <div className="bg-forest-900/80 rounded-2xl p-4 border border-forest-800">
                        <div className="flex items-center gap-2 text-xs font-bold text-teal-300 mb-2">
                          <Moon className="w-4 h-4 text-teal-400" />
                          <span>Evening</span>
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          {day.evening}
                        </p>
                      </div>

                    </div>

                    {/* Night Stay & Meals Badges */}
                    <div className="flex flex-wrap items-center gap-4 pt-3 border-t border-forest-800 text-xs">
                      {day.stay && (
                        <div className="flex items-center gap-1.5 text-slate-300 font-medium">
                          <Bed className="w-4 h-4 text-lime-400" />
                          <span>Stay: <strong className="text-white">{day.stay}</strong></span>
                        </div>
                      )}
                      {day.meal && (
                        <div className="flex items-center gap-1.5 text-slate-300 font-medium">
                          <Utensils className="w-4 h-4 text-lime-400" />
                          <span>Meals: <strong className="text-white">{day.meal}</strong></span>
                        </div>
                      )}
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
