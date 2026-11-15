import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Compass, Search, MapPin, Clock, ArrowRight, Sparkles, Star } from 'lucide-react';
import { REGIONS_DATA } from '../../data/regionsData';

const ZONES = [
  { id: 'all', label: 'All 36 Regions' },
  { id: 'north', label: 'Northern Himalayas', states: ['jammu-and-kashmir', 'ladakh', 'himachal-pradesh', 'uttarakhand', 'punjab', 'haryana', 'delhi', 'chandigarh'] },
  { id: 'west', label: 'Western Deserts & Coast', states: ['rajasthan', 'gujarat', 'maharashtra', 'goa', 'daman-and-diu'] },
  { id: 'south', label: 'Southern Peninsular', states: ['kerala', 'tamil-nadu', 'karnataka', 'andhra-pradesh', 'telangana', 'puducherry', 'lakshadweep'] },
  { id: 'east', label: 'Eastern Plains & Bay', states: ['west-bengal', 'odisha', 'bihar', 'jharkhand', 'andaman-and-nicobar-islands'] },
  { id: 'northeast', label: 'Northeast Mystique', states: ['meghalaya', 'assam', 'sikkim', 'arunachal-pradesh', 'nagaland', 'manipur', 'mizoram', 'tripura'] },
  { id: 'central', label: 'Heartland & Wildlife', states: ['madhya-pradesh', 'chhattisgarh'] }
];

export default function InteractiveIndiaMap() {
  const [selectedZone, setSelectedZone] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredRegion, setHoveredRegion] = useState(REGIONS_DATA[0]);

  // Filtered regions
  const filteredRegions = useMemo(() => {
    return REGIONS_DATA.filter((r) => {
      const matchesSearch =
        r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.capital.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.highlights.some((h) => h.toLowerCase().includes(searchQuery.toLowerCase()));

      const zoneObj = ZONES.find((z) => z.id === selectedZone);
      const matchesZone = selectedZone === 'all' || (zoneObj && zoneObj.states.includes(r.slug));

      return matchesSearch && matchesZone;
    });
  }, [searchQuery, selectedZone]);

  const activeRegion = hoveredRegion || REGIONS_DATA[0];

  return (
    <section id="map-explorer" className="relative py-24 sm:py-32 bg-midnight-950 text-white overflow-hidden">
      
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[550px] bg-cyan-500/10 blur-[150px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-400 text-xs font-bold uppercase tracking-widest shadow-cyan-glow mb-4">
            <Compass className="w-3.5 h-3.5 text-cyan-400 animate-spin-slow" />
            <span>Interactive Subcontinent Atlas</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight uppercase">
            Explore All 36 Regions of India
          </h2>
          <p className="text-sm sm:text-base text-slate-300 font-medium mt-3 leading-relaxed">
            Hover over any territory on the illuminated map to preview its verified flagship itinerary and logical circular route.
          </p>
        </div>

        {/* Zone Filter Chips */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-10">
          {ZONES.map((zone) => (
            <button
              key={zone.id}
              onClick={() => setSelectedZone(zone.id)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                selectedZone === zone.id
                  ? 'bg-cyan-400 text-midnight-950 font-black shadow-cyan-glow'
                  : 'bg-white/10 text-slate-300 hover:bg-white/20 hover:text-white border border-white/10'
              }`}
            >
              {zone.label}
            </button>
          ))}
        </div>

        {/* Dual Layout: Interactive Map (Left/Center) + Region Floating Preview Card (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Illuminated Interactive India Map */}
          <div className="lg:col-span-7 relative flex items-center justify-center min-h-[440px] sm:min-h-[520px] glass-panel rounded-3xl p-6 sm:p-10 border border-white/15">
            
            {/* Search Bar inside Map */}
            <div className="absolute top-6 left-6 right-6 z-20">
              <div className="relative">
                <Search className="w-4 h-4 text-cyan-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Filter by state, capital, or monument (e.g. Ladakh, Jaipur)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-2.5 rounded-full bg-midnight-950/80 border border-white/20 text-xs font-medium text-white placeholder:text-slate-400 focus:outline-none focus:border-cyan-400 shadow-lg"
                />
              </div>
            </div>

            {/* Precision SVG Vector Map of India */}
            <div className="relative w-full max-w-[380px] h-[400px] sm:h-[460px] pt-12 flex items-center justify-center">
              <svg
                viewBox="0 0 400 450"
                className="w-full h-full filter drop-shadow-[0_0_30px_rgba(0,229,255,0.4)]"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* India Outer Boundary Silhouette */}
                <path
                  d="M175,25 C190,20 210,35 225,50 C240,65 260,60 270,80 C280,100 295,115 310,120 C335,130 355,145 365,165 C370,185 360,205 345,215 C330,225 320,240 315,260 C310,280 295,305 285,325 C275,345 260,370 245,395 C230,420 215,440 200,445 C190,440 180,410 170,380 C160,350 145,330 135,305 C125,280 110,260 100,240 C90,220 80,200 85,180 C90,160 105,145 120,130 C135,115 150,90 160,65 Z"
                  fill="rgba(8, 18, 38, 0.85)"
                  stroke="#00E5FF"
                  strokeWidth="2.5"
                />

                {/* Regional Coordinate Beacons for all 36 territories */}
                {filteredRegions.map((region, idx) => {
                  // Coordinate distribution for visualization
                  const isHovered = activeRegion.id === region.id;
                  
                  // Compute deterministic coordinate spread for India map
                  const hash = region.slug.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
                  const cx = 130 + (hash * 17) % 150;
                  const cy = 70 + (hash * 23) % 310;

                  return (
                    <g
                      key={region.id}
                      className="cursor-pointer group"
                      onMouseEnter={() => setHoveredRegion(region)}
                      onClick={() => setHoveredRegion(region)}
                    >
                      <circle
                        cx={cx}
                        cy={cy}
                        r={isHovered ? 8 : 4.5}
                        fill={isHovered ? '#00E5FF' : '#38BDF8'}
                        className="transition-all duration-300 filter drop-shadow-[0_0_8px_#00E5FF]"
                      />
                      {isHovered && (
                        <circle
                          cx={cx}
                          cy={cy}
                          r={16}
                          fill="none"
                          stroke="#00E5FF"
                          strokeWidth="1.5"
                          className="animate-ping"
                        />
                      )}
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Bottom Counter */}
            <div className="absolute bottom-5 left-6 text-xs text-slate-400 font-mono">
              <span className="text-cyan-400 font-bold">{filteredRegions.length}</span> Regions active on map
            </div>
          </div>

          {/* Right Column: Floating Preview Card of Active Region */}
          <div className="lg:col-span-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeRegion.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="glass-panel rounded-3xl overflow-hidden border border-white/20 shadow-2xl p-6 sm:p-8"
              >
                {/* Thumbnail Image Header */}
                <div className="relative h-56 rounded-2xl overflow-hidden mb-6">
                  <img
                    src={activeRegion.heroImage}
                    alt={activeRegion.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-midnight-950 via-transparent to-transparent" />
                  
                  {/* Top Badges */}
                  <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between">
                    <span className="badge-cyan text-[10px]">
                      {activeRegion.type === 'state' ? 'State of India' : 'Union Territory'}
                    </span>
                    <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-midnight-950/80 backdrop-blur-md text-cyan-300 text-xs font-bold border border-white/10">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" /> 4.9
                    </span>
                  </div>

                  {/* Duration on bottom */}
                  <div className="absolute bottom-3 left-3.5">
                    <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-midnight-950/90 backdrop-blur-md text-white text-xs font-bold border border-white/10">
                      <Clock className="w-3.5 h-3.5 text-cyan-400" />
                      {activeRegion.durationDays} Days / {activeRegion.durationNights} Nights
                    </span>
                  </div>
                </div>

                {/* Region Details */}
                <div className="space-y-3">
                  <div>
                    <h3 className="font-display text-2xl sm:text-3xl font-black text-white">
                      {activeRegion.name}
                    </h3>
                    <p className="text-xs font-semibold text-slate-300 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                      Capital: <span className="text-white font-bold">{activeRegion.capital}</span>
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 line-clamp-3 leading-relaxed">
                    {activeRegion.description}
                  </p>

                  {/* Highlights Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {activeRegion.highlights.slice(0, 3).map((item, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] text-slate-300 font-medium"
                      >
                        {item}
                      </span>
                    ))}
                  </div>

                  {/* Price & Action */}
                  <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                        Verified Package
                      </span>
                      <span className="font-display text-xl font-black text-cyan-400">
                        ₹{activeRegion.startingPrice.toLocaleString('en-IN')}
                        <span className="text-xs font-normal text-slate-400"> /person</span>
                      </span>
                    </div>

                    <Link
                      to={`/region/${activeRegion.slug}`}
                      className="btn-luxury-cyan text-xs py-2.5 px-5 shadow-cyan-glow group"
                    >
                      <span>Explore Itinerary</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
