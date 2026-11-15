import React from 'react';

export default function QuickFactsBar({ facts = [] }) {
  return (
    <div className="bg-[#070A14] border-y border-white/10 py-8 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 text-center">
          {facts.map((fact, index) => (
            <div key={index} className="flex flex-col items-center">
              <span className="text-[10px] uppercase font-extrabold tracking-widest text-slate-400 mb-1">
                {fact.label}
              </span>
              <span className="font-display text-sm sm:text-base font-black text-amber-400">
                {fact.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
