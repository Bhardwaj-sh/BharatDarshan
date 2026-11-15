import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Compass, 
  Search, 
  MapPin, 
  Clock, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Maximize2,
  Navigation,
  Layers
} from 'lucide-react';
import { REGIONS_DATA } from '../../data/regionsData';
import L from 'leaflet';

export const REGION_GEO_COORDINATES = {
  'rajasthan': { lat: 26.9124, lng: 75.7873, zone: 'west' },
  'kerala': { lat: 9.9312, lng: 76.2673, zone: 'south' },
  'himachal-pradesh': { lat: 31.1048, lng: 77.1734, zone: 'north' },
  'goa': { lat: 15.2993, lng: 74.1240, zone: 'west' },
  'uttarakhand': { lat: 30.0668, lng: 79.0193, zone: 'north' },
  'ladakh': { lat: 34.1526, lng: 77.5771, zone: 'north' },
  'tamil-nadu': { lat: 11.1271, lng: 78.6569, zone: 'south' },
  'jammu-and-kashmir': { lat: 34.0837, lng: 74.7973, zone: 'north' },
  'madhya-pradesh': { lat: 23.2599, lng: 77.4126, zone: 'central' },
  'sikkim': { lat: 27.3389, lng: 88.6065, zone: 'northeast' },
  'uttar-pradesh': { lat: 26.8467, lng: 80.9462, zone: 'north' },
  'andaman-and-nicobar': { lat: 11.7401, lng: 92.6586, zone: 'islands' },
  'karnataka': { lat: 15.3173, lng: 75.7139, zone: 'south' },
  'meghalaya': { lat: 25.4670, lng: 91.3662, zone: 'northeast' },
  'gujarat': { lat: 23.2156, lng: 72.6369, zone: 'west' },
  'assam': { lat: 26.1445, lng: 91.7362, zone: 'northeast' },
  'west-bengal': { lat: 22.5726, lng: 88.3639, zone: 'east' },
  'odisha': { lat: 20.2961, lng: 85.8245, zone: 'east' },
  'maharashtra': { lat: 19.0760, lng: 72.8777, zone: 'west' },
  'punjab': { lat: 31.1471, lng: 75.3412, zone: 'north' },
  'delhi': { lat: 28.6139, lng: 77.2090, zone: 'north' },
  'telangana': { lat: 17.3850, lng: 78.4867, zone: 'south' },
  'andhra-pradesh': { lat: 15.9129, lng: 79.7400, zone: 'south' },
  'bihar': { lat: 25.5941, lng: 85.1376, zone: 'east' },
  'chhattisgarh': { lat: 21.2514, lng: 81.6296, zone: 'central' },
  'puducherry': { lat: 11.9416, lng: 79.8083, zone: 'south' },
  'arunachal-pradesh': { lat: 27.0844, lng: 93.6053, zone: 'northeast' },
  'nagaland': { lat: 25.6751, lng: 94.1086, zone: 'northeast' },
  'manipur': { lat: 24.8170, lng: 93.9368, zone: 'northeast' },
  'mizoram': { lat: 23.7271, lng: 92.7176, zone: 'northeast' },
  'tripura': { lat: 23.8315, lng: 91.2868, zone: 'northeast' },
  'jharkhand': { lat: 23.3441, lng: 85.3096, zone: 'east' },
  'haryana': { lat: 29.0588, lng: 76.0856, zone: 'north' },
  'chandigarh': { lat: 30.7333, lng: 76.7794, zone: 'north' },
  'daman-and-diu': { lat: 20.4283, lng: 72.8397, zone: 'west' },
  'lakshadweep': { lat: 10.5667, lng: 72.6417, zone: 'islands' }
};

const ZONES = [
  { id: 'all', label: 'All 36' },
  { id: 'north', label: 'North & Himalayas' },
  { id: 'west', label: 'West & Desert' },
  { id: 'south', label: 'South & Coast' },
  { id: 'east', label: 'East' },
  { id: 'northeast', label: 'Northeast' },
  { id: 'islands', label: 'Islands & UTs' },
];

export default function InteractiveIndiaMap() {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef({});

  const [selectedZone, setSelectedZone] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeRegion, setActiveRegion] = useState(REGIONS_DATA[0]);

  // Filtered regions
  const filteredRegions = REGIONS_DATA.filter((r) => {
    const coords = REGION_GEO_COORDINATES[r.id];
    const matchesSearch =
      r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (r.capital && r.capital.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (r.highlights && r.highlights.some((h) => h.toLowerCase().includes(searchQuery.toLowerCase())));

    const matchesZone = selectedZone === 'all' || (coords && coords.zone === selectedZone);
    return matchesSearch && matchesZone;
  });

  // Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return;

    // Center of India with appropriate bounds
    const map = L.map(mapContainerRef.current, {
      center: [22.8, 80.5],
      zoom: 4.8,
      minZoom: 4,
      maxZoom: 9,
      zoomControl: false,
      attributionControl: false,
      scrollWheelZoom: false,
    });

    // Luxury CartoDB Dark Matter tiles (Authentic geographical map)
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      subdomains: 'abcd',
      maxZoom: 19,
    }).addTo(map);

    mapInstanceRef.current = map;

    // Add Markers for all 36 regions
    REGIONS_DATA.forEach((region) => {
      const coords = REGION_GEO_COORDINATES[region.id];
      if (!coords) return;

      const customIcon = L.divIcon({
        className: 'custom-map-pin',
        html: `
          <div class="relative flex items-center justify-center cursor-pointer group">
            <span class="absolute w-6 h-6 rounded-full bg-cyan-400/25 animate-ping"></span>
            <span class="relative w-3.5 h-3.5 rounded-full bg-cyan-400 border-2 border-[#030712] shadow-[0_0_12px_#00E5FF] group-hover:scale-125 transition-transform"></span>
          </div>
        `,
        iconSize: [24, 24],
        iconAnchor: [12, 12],
      });

      const marker = L.marker([coords.lat, coords.lng], { icon: customIcon }).addTo(map);

      marker.on('click', () => {
        setActiveRegion(region);
        map.flyTo([coords.lat, coords.lng], 6, { duration: 1.2 });
      });

      marker.on('mouseover', () => {
        setActiveRegion(region);
      });

      markersRef.current[region.id] = marker;
    });

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Pan to region when clicked from sidebar
  const handleSelectRegion = (region) => {
    setActiveRegion(region);
    const coords = REGION_GEO_COORDINATES[region.id];
    if (coords && mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([coords.lat, coords.lng], 6, { duration: 1.2 });
    }
  };

  const handleResetView = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([22.8, 80.5], 4.8, { duration: 1.2 });
    }
  };

  const currentPrice = activeRegion?.package?.basePrice || activeRegion?.basePrice || 24999;
  const currentDuration = activeRegion?.package?.duration || `${activeRegion?.durationDays || 8} Days / ${activeRegion?.durationNights || 7} Nights`;

  return (
    <section id="interactive-map" className="relative py-24 sm:py-32 bg-midnight-950 text-white overflow-hidden border-t border-white/5">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[700px] h-[500px] bg-cyan-500/10 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-400 text-xs font-mono font-semibold uppercase tracking-wider mb-4">
              <Compass className="w-3.5 h-3.5 text-cyan-400" />
              <span>Authentic Geographical Atlas</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white font-display">
              Explore India <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-sky-200">By Region</span>
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-400 max-w-2xl font-light">
              Interactive high-precision satellite atlas across all 28 States and 8 Union Territories. Click any territory to inspect its itinerary.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleResetView}
              className="px-4 py-2 rounded-full bg-midnight-900 border border-white/15 text-slate-300 hover:text-white hover:border-cyan-400 text-xs font-mono font-semibold flex items-center gap-2 transition-all cursor-pointer"
            >
              <Navigation className="w-3.5 h-3.5 text-cyan-400" />
              <span>Reset Subcontinent View</span>
            </button>
          </div>
        </div>

        {/* Zone Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {ZONES.map((zone) => {
            const isActive = selectedZone === zone.id;
            return (
              <button
                key={zone.id}
                onClick={() => setSelectedZone(zone.id)}
                className={`px-4 py-2 rounded-full text-xs font-medium uppercase tracking-wider whitespace-nowrap transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'bg-cyan-500 text-midnight-950 font-bold shadow-cyan-glow border border-cyan-400'
                    : 'bg-midnight-900/80 text-slate-400 hover:text-white border border-white/10 hover:border-cyan-500/40'
                }`}
              >
                {zone.label}
              </button>
            );
          })}
        </div>

        {/* Main Map + Inspection Card Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Real Leaflet Map Column (8 Cols) */}
          <div className="lg:col-span-8 relative rounded-3xl overflow-hidden bg-midnight-900/90 border border-white/15 shadow-2xl h-[520px] sm:h-[620px]">
            
            {/* The Map Canvas */}
            <div ref={mapContainerRef} className="w-full h-full z-0 bg-[#030712]" />

            {/* Map Top Floating Overlay Info */}
            <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-[11px] font-mono text-cyan-300">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span>Live Geographic Coordinates • 36 Nodes Active</span>
            </div>

            {/* Quick State Search Overlay inside Map */}
            <div className="absolute top-4 right-4 z-10 w-64">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-cyan-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Jump to state..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-xs text-white placeholder:text-slate-400 focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            {/* Map Bottom Hint */}
            <div className="absolute bottom-4 left-4 z-10 text-[11px] text-slate-400 font-mono bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 hidden sm:block">
              Click any glowing beacon to inspect and fly camera
            </div>
          </div>

          {/* Side Inspection Card & Territory List (4 Cols) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            
            {/* Featured Active Region Glass Card */}
            <AnimatePresence mode="wait">
              {activeRegion && (
                <motion.div
                  key={activeRegion.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="rounded-3xl overflow-hidden bg-midnight-900/90 border border-white/15 shadow-floating-panel group"
                >
                  <div className="relative h-48 w-full overflow-hidden bg-midnight-950">
                    <img
                      src={activeRegion.heroImage}
                      alt={activeRegion.name}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-midnight-950 via-midnight-950/40 to-transparent" />

                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-[10px] font-mono text-cyan-300">
                      {activeRegion.type === 'Union Territory' ? 'Union Territory' : 'State of India'}
                    </div>

                    <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-xs text-white">
                      <Clock className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{currentDuration}</span>
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
                      <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Capital: {activeRegion.capital || activeRegion.name}</span>
                    </div>

                    <h3 className="text-xl font-bold font-display text-white group-hover:text-cyan-300 transition-colors">
                      {activeRegion.name}
                    </h3>

                    <p className="mt-2 text-xs text-slate-300 line-clamp-2 leading-relaxed font-light">
                      {activeRegion.package?.title || activeRegion.tagline || activeRegion.description}
                    </p>

                    {/* Highlights tags */}
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {(activeRegion.highlights || []).slice(0, 3).map((hl, i) => (
                        <span key={i} className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] text-slate-300">
                          {hl}
                        </span>
                      ))}
                    </div>

                    {/* Pricing & CTA */}
                    <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] uppercase tracking-wider text-slate-400 block font-mono">
                          Verified Pricing
                        </span>
                        <span className="text-lg font-black text-cyan-400 font-mono">
                          ₹{currentPrice.toLocaleString('en-IN')}
                        </span>
                      </div>

                      <Link
                        to={`/region/${activeRegion.id}`}
                        className="btn-luxury-cyan px-4 py-2 text-xs font-bold rounded-xl flex items-center gap-1.5"
                      >
                        <span>Itinerary</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Quick Territory Switcher List */}
            <div className="p-4 rounded-3xl bg-midnight-900/70 border border-white/10">
              <div className="flex items-center justify-between mb-3 px-2">
                <span className="text-xs uppercase tracking-wider font-mono font-semibold text-slate-400">
                  Quick Select ({filteredRegions.length})
                </span>
                <span className="text-[10px] text-cyan-400 font-mono">Click to Pan</span>
              </div>

              <div className="max-h-56 overflow-y-auto space-y-1 pr-1 custom-scrollbar">
                {filteredRegions.map((region) => {
                  const isCurrent = activeRegion?.id === region.id;
                  return (
                    <button
                      key={region.id}
                      onClick={() => handleSelectRegion(region)}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-colors cursor-pointer ${
                        isCurrent
                          ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 font-bold'
                          : 'text-slate-300 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      <span className="truncate">{region.name}</span>
                      <span className="text-[10px] font-mono opacity-60 shrink-0">
                        {region.capital}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
