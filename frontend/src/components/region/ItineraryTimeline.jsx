import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Bed, Utensils, ChevronDown, ChevronUp, Sun, Moon, Sunrise, Car } from 'lucide-react';

export default function ItineraryTimeline({ days = [] }) {
  // By default, day 1 is expanded
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
      
      {/* Header with Expand/Collapse All Buttons */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-ivory-200">
        <div>
          <span className="text-xs uppercase tracking-widest text-gold-600 font-bold block mb-1">
            Day-by-Day Master Plan
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-forest-950">
            Editorial Itinerary ({days.length} Days)
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={expandAll}
            className="text-xs font-semibold text-forest-800 hover:text-gold-600 px-3 py-1.5 rounded-full border border-forest-800/20 hover:bg-forest-800/5 transition-colors"
          >
            Expand All
          </button>
          <button
            onClick={collapseAll}
            className="text-xs font-semibold text-charcoal-500 hover:text-charcoal-800 px-3 py-1.5 rounded-full border border-charcoal-200 hover:bg-charcoal-50 transition-colors"
          >
            Collapse All
          </button>
        </div>
      </div>

      {/* Vertical Timeline */}
      <div className="relative border-l-2 border-gold-500/30 ml-4 sm:ml-6 pl-6 sm:pl-8 space-y-8">
        
        {days.map((day) => {
          const isExpanded = !!expandedDays[day.day];

          return (
            <div key={day.day} className="relative group">
              
              {/* Timeline Day Circle Marker */}
              <div className="absolute -left-[35px] sm:-left-[43px] top-4 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-forest-900 border-2 border-gold-400 text-gold-400 flex items-center justify-center font-serif font-bold text-xs shadow-md group-hover:scale-110 transition-transform">
                {day.day}
              </div>

              {/* Day Card */}
              <div className="bg-white rounded-3xl border border-ivory-200 shadow-soft overflow-hidden transition-all duration-200 hover:shadow-card">
                
                {/* Header (Clickable Accordion) */}
                <div
                  onClick={() => toggleDay(day.day)}
                  className="p-6 cursor-pointer flex items-start justify-between gap-4 select-none bg-gradient-to-r from-ivory-50/50 to-white hover:bg-ivory-50/80 transition-colors"
                >
                  <div className="flex-grow">
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <span className="text-[10px] uppercase font-bold tracking-widest bg-forest-900/10 text-forest-900 px-2.5 py-0.5 rounded-full">
                        Day {day.day}
                      </span>
                      {day.distance && (
                        <span className="text-[11px] text-charcoal-500 flex items-center gap-1 font-medium">
                          <Car className="w-3 h-3 text-gold-600" />
                          <span>{day.distance}</span>
                        </span>
                      )}
                    </div>
                    <h4 className="font-serif text-lg sm:text-xl font-bold text-forest-950">
                      {day.title}
                    </h4>
                  </div>

                  <div className="w-8 h-8 rounded-full bg-ivory-100 flex items-center justify-center text-charcoal-600 flex-shrink-0 mt-1">
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </div>

                {/* Day Content (Expanded) */}
                {isExpanded && (
                  <div className="px-6 pb-6 pt-2 border-t border-ivory-200/80 space-y-5 animate-in fade-in duration-200">
                    
                    {/* Day Overview Paragraph */}
                    <p className="text-xs sm:text-sm text-charcoal-700 leading-relaxed font-sans">
                      {day.overview}
                    </p>

                    {/* Three-Phase Day Breakdown: Morning / Afternoon / Evening */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
                      
                      {/* Morning */}
                      <div className="bg-amber-50/50 rounded-2xl p-4 border border-amber-200/60">
                        <div className="flex items-center gap-2 text-amber-800 text-xs font-bold uppercase tracking-wider mb-2">
                          <Sunrise className="w-4 h-4 text-amber-600" />
                          <span>Morning</span>
                        </div>
                        <p className="text-xs text-charcoal-700 leading-relaxed">
                          {day.morning}
                        </p>
                      </div>

                      {/* Afternoon */}
                      <div className="bg-orange-50/50 rounded-2xl p-4 border border-orange-200/60">
                        <div className="flex items-center gap-2 text-orange-800 text-xs font-bold uppercase tracking-wider mb-2">
                          <Sun className="w-4 h-4 text-orange-600" />
                          <span>Afternoon</span>
                        </div>
                        <p className="text-xs text-charcoal-700 leading-relaxed">
                          {day.afternoon}
                        </p>
                      </div>

                      {/* Evening */}
                      <div className="bg-indigo-50/50 rounded-2xl p-4 border border-indigo-200/60">
                        <div className="flex items-center gap-2 text-indigo-900 text-xs font-bold uppercase tracking-wider mb-2">
                          <Moon className="w-4 h-4 text-indigo-600" />
                          <span>Evening</span>
                        </div>
                        <p className="text-xs text-charcoal-700 leading-relaxed">
                          {day.evening}
                        </p>
                      </div>

                    </div>

                    {/* Stay & Meal Guidance Footer */}
                    <div className="pt-4 border-t border-ivory-200/80 flex flex-wrap items-center justify-between gap-3 text-xs text-charcoal-600">
                      <div className="flex items-center gap-2">
                        <Bed className="w-4 h-4 text-forest-800 flex-shrink-0" />
                        <span className="font-medium text-forest-950">Stay:</span>
                        <span>{day.stay}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Utensils className="w-4 h-4 text-gold-600 flex-shrink-0" />
                        <span className="font-medium text-forest-950">Meals:</span>
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
