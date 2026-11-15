import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Compass, 
  Search, 
  MapPin, 
  Clock, 
  ArrowRight, 
  ArrowLeft,
  Sparkles, 
  Navigation,
  Layers,
  Globe2,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';
import { REGIONS_DATA } from '../../data/regionsData';
import L from 'leaflet';

export const REGION_GEO_COORDINATES = {
  'rajasthan': { lat: 26.9124, lng: 75.7873, zone: 'west', code: 'RJ' },
  'kerala': { lat: 9.9312, lng: 76.2673, zone: 'south', code: 'KL' },
  'himachal-pradesh': { lat: 31.1048, lng: 77.1734, zone: 'north', code: 'HP' },
  'goa': { lat: 15.2993, lng: 74.1240, zone: 'west', code: 'GA' },
  'uttarakhand': { lat: 30.0668, lng: 79.0193, zone: 'north', code: 'UK' },
  'ladakh': { lat: 34.1526, lng: 77.5771, zone: 'north', code: 'LA' },
  'tamil-nadu': { lat: 11.1271, lng: 78.6569, zone: 'south', code: 'TN' },
  'jammu-and-kashmir': { lat: 34.0837, lng: 74.7973, zone: 'north', code: 'JK' },
  'madhya-pradesh': { lat: 23.2599, lng: 77.4126, zone: 'central', code: 'MP' },
  'sikkim': { lat: 27.3389, lng: 88.6065, zone: 'northeast', code: 'SK' },
  'uttar-pradesh': { lat: 26.8467, lng: 80.9462, zone: 'north', code: 'UP' },
  'andaman-and-nicobar': { lat: 11.7401, lng: 92.6586, zone: 'islands', code: 'AN' },
  'karnataka': { lat: 15.3173, lng: 75.7139, zone: 'south', code: 'KA' },
  'meghalaya': { lat: 25.4670, lng: 91.3662, zone: 'northeast', code: 'ML' },
  'gujarat': { lat: 23.2156, lng: 72.6369, zone: 'west', code: 'GJ' },
  'assam': { lat: 26.1445, lng: 91.7362, zone: 'northeast', code: 'AS' },
  'west-bengal': { lat: 22.5726, lng: 88.3639, zone: 'east', code: 'WB' },
  'odisha': { lat: 20.2961, lng: 85.8245, zone: 'east', code: 'OD' },
  'maharashtra': { lat: 19.0760, lng: 72.8777, zone: 'west', code: 'MH' },
  'punjab': { lat: 31.1471, lng: 75.3412, zone: 'north', code: 'PB' },
  'delhi': { lat: 28.6139, lng: 77.2090, zone: 'north', code: 'DL' },
  'telangana': { lat: 17.3850, lng: 78.4867, zone: 'south', code: 'TS' },
  'andhra-pradesh': { lat: 15.9129, lng: 79.7400, zone: 'south', code: 'AP' },
  'bihar': { lat: 25.5941, lng: 85.1376, zone: 'east', code: 'BR' },
  'chhattisgarh': { lat: 21.2514, lng: 81.6296, zone: 'central', code: 'CG' },
  'puducherry': { lat: 11.9416, lng: 79.8083, zone: 'south', code: 'PY' },
  'arunachal-pradesh': { lat: 27.0844, lng: 93.6053, zone: 'northeast', code: 'AR' },
  'nagaland': { lat: 25.6751, lng: 94.1086, zone: 'northeast', code: 'NL' },
  'manipur': { lat: 24.8170, lng: 93.9368, zone: 'northeast', code: 'MN' },
  'mizoram': { lat: 23.7271, lng: 92.7176, zone: 'northeast', code: 'MZ' },
  'tripura': { lat: 23.8315, lng: 91.2868, zone: 'northeast', code: 'TR' },
  'jharkhand': { lat: 23.3441, lng: 85.3096, zone: 'east', code: 'JH' },
  'haryana': { lat: 29.0588, lng: 76.0856, zone: 'north', code: 'HR' },
  'chandigarh': { lat: 30.7333, lng: 76.7794, zone: 'north', code: 'CH' },
  'daman-and-diu': { lat: 20.4283, lng: 72.8397, zone: 'west', code: 'DD' },
  'lakshadweep': { lat: 10.5667, lng: 72.6417, zone: 'islands', code: 'LD' }
};

const ZONES = [
  { id: 'all', label: 'All 36 Regions', center: [22.8, 80.5], zoom: 4.8 },
  { id: 'north', label: 'North & Himalayas', center: [31.5, 77.0], zoom: 5.7 },
  { id: 'west', label: 'West & Desert', center: [23.5, 72.5], zoom: 5.6 },
  { id: 'south', label: 'South & Coast', center: [12.8, 77.8], zoom: 5.6 },
  { id: 'east', label: 'East & Heartland', center: [23.0, 84.5], zoom: 5.6 },
  { id: 'northeast', label: 'Northeast Mystique', center: [26.0, 93.0], zoom: 6.0 },
  { id: 'islands', label: 'Islands & UTs', center: [11.7, 92.6], zoom: 6.0 },
];

export default function InteractiveIndiaMap() {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef({});
  const activeMarkerRef = useRef(null);

  const [selectedZone, setSelectedZone] = useState('all');
  const [mapStyle, setMapStyle] = useState('dark'); // 'dark' | 'satellite'
  const [searchQuery, setSearchQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);

  const baseLayerRef = useRef(null);
  const refLayerRef = useRef(null);
  const satLayerRef = useRef(null);

  const activeRegion = REGIONS_DATA[activeIndex] || REGIONS_DATA[0];

  // Filtered regions for quick list
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

    // Center of India
    const map = L.map(mapContainerRef.current, {
      center: [22.8, 80.5],
      zoom: 4.8,
      minZoom: 4,
      maxZoom: 10,
      zoomControl: false,
      attributionControl: false,
      scrollWheelZoom: false,
    });

    // 1. ESRI World Dark Gray Canvas Base (Official, zero watermark, zero API key)
    const baseLayer = L.tileLayer(
      'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}',
      { maxZoom: 16 }
    ).addTo(map);

    // 2. ESRI World Dark Gray Reference (State and boundary typography)
    const refLayer = L.tileLayer(
      'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Reference/MapServer/tile/{z}/{y}/{x}',
      { maxZoom: 16, opacity: 0.8 }
    ).addTo(map);

    // 3. ESRI Satellite Layer (Optional toggle)
    const satLayer = L.tileLayer(
      'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      { maxZoom: 18 }
    );

    baseLayerRef.current = baseLayer;
    refLayerRef.current = refLayer;
    satLayerRef.current = satLayer;
    mapInstanceRef.current = map;

    // Create markers for all 36 regions
    REGIONS_DATA.forEach((region, idx) => {
      const coords = REGION_GEO_COORDINATES[region.id];
      if (!coords) return;

      const customIcon = L.divIcon({
        className: 'custom-map-pin',
        html: `
          <div class="relative flex items-center justify-center cursor-pointer group pointer-events-auto" data-region-id="${region.id}">
            <span class="absolute -inset-2.5 rounded-full bg-cyan-400/25 animate-ping"></span>
            <span class="relative w-4 h-4 rounded-full bg-cyan-400 border-2 border-[#030712] shadow-[0_0_14px_#00E5FF] group-hover:scale-135 transition-transform flex items-center justify-center">
              <span class="w-1.5 h-1.5 rounded-full bg-white"></span>
            </span>
            <span class="absolute left-6 top-1/2 -translate-y-1/2 hidden group-hover:flex items-center px-2 py-0.5 rounded-md bg-midnight-950/95 text-[11px] font-mono text-cyan-300 border border-cyan-400/40 whitespace-nowrap shadow-2xl pointer-events-none z-30">
              ${region.name} • ${region.capital}
            </span>
          </div>
        `,
        iconSize: [28, 28],
        iconAnchor: [14, 14],
      });

      const marker = L.marker([coords.lat, coords.lng], { icon: customIcon }).addTo(map);

      marker.on('click', () => {
        setActiveIndex(idx);
        map.flyTo([coords.lat, coords.lng], 6.2, { duration: 1.2 });
      });

      marker.on('mouseover', () => {
        setActiveIndex(idx);
      });

      markersRef.current[region.id] = marker;
    });

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Handle map style toggle (Dark Atlas vs Satellite)
  const toggleMapStyle = (style) => {
    setMapStyle(style);
    if (!mapInstanceRef.current) return;
    const map = mapInstanceRef.current;

    if (style === 'satellite') {
      if (baseLayerRef.current) map.removeLayer(baseLayerRef.current);
      if (satLayerRef.current) satLayerRef.current.addTo(map);
      if (refLayerRef.current) refLayerRef.current.bringToFront();
    } else {
      if (satLayerRef.current) map.removeLayer(satLayerRef.current);
      if (baseLayerRef.current) baseLayerRef.current.addTo(map);
      if (refLayerRef.current) refLayerRef.current.bringToFront();
    }
  };

  // Fly to zone
  const handleZoneChange = (zoneId) => {
    setSelectedZone(zoneId);
    const zoneObj = ZONES.find((z) => z.id === zoneId);
    if (zoneObj && mapInstanceRef.current) {
      mapInstanceRef.current.flyTo(zoneObj.center, zoneObj.zoom, { duration: 1.3 });
    }
  };

  // Select a specific region
  const handleSelectRegion = (region) => {
    const idx = REGIONS_DATA.findIndex((r) => r.id === region.id);
    if (idx !== -1) {
      setActiveIndex(idx);
    }
    const coords = REGION_GEO_COORDINATES[region.id];
    if (coords && mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([coords.lat, coords.lng], 6.2, { duration: 1.2 });
    }
  };

  const handleNextRegion = () => {
    const nextIdx = (activeIndex + 1) % REGIONS_DATA.length;
    setActiveIndex(nextIdx);
    const nextRegion = REGIONS_DATA[nextIdx];
    const coords = REGION_GEO_COORDINATES[nextRegion.id];
    if (coords && mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([coords.lat, coords.lng], 6.2, { duration: 1.2 });
    }
  };

  const handlePrevRegion = () => {
    const prevIdx = (activeIndex - 1 + REGIONS_DATA.length) % REGIONS_DATA.length;
    setActiveIndex(prevIdx);
    const prevRegion = REGIONS_DATA[prevIdx];
    const coords = REGION_GEO_COORDINATES[prevRegion.id];
    if (coords && mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([coords.lat, coords.lng], 6.2, { duration: 1.2 });
    }
  };

  const handleResetView = () => {
    setSelectedZone('all');
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([22.8, 80.5], 4.8, { duration: 1.3 });
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
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-400 text-xs font-mono font-semibold uppercase tracking-wider mb-4 shadow-cyan-glow">
              <Compass className="w-3.5 h-3.5 text-cyan-400" />
              <span>Interactive Geographical Atlas</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white font-display">
              Explore India <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-sky-200">By Region</span>
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-400 max-w-2xl font-light">
              High-precision dark geographic atlas across all 28 States and 8 Union Territories. Click any beacon or step through regions.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Map Style Switcher */}
            <div className="p-1 rounded-full bg-midnight-900 border border-white/15 flex items-center text-xs font-mono">
              <button
                onClick={() => toggleMapStyle('dark')}
                className={`px-3 py-1.5 rounded-full font-semibold transition-all cursor-pointer ${
                  mapStyle === 'dark' ? 'bg-cyan-500 text-midnight-950 font-bold shadow-cyan-glow' : 'text-slate-400 hover:text-white'
                }`}
              >
                Dark Atlas
              </button>
              <button
                onClick={() => toggleMapStyle('satellite')}
                className={`px-3 py-1.5 rounded-full font-semibold transition-all cursor-pointer ${
                  mapStyle === 'satellite' ? 'bg-cyan-500 text-midnight-950 font-bold shadow-cyan-glow' : 'text-slate-400 hover:text-white'
                }`}
              >
                Night Satellite
              </button>
            </div>

            <button
              onClick={handleResetView}
              className="px-4 py-2 rounded-full bg-midnight-900 border border-white/15 text-slate-300 hover:text-white hover:border-cyan-400 text-xs font-mono font-semibold flex items-center gap-2 transition-all cursor-pointer"
            >
              <Navigation className="w-3.5 h-3.5 text-cyan-400" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* Zone Filters Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {ZONES.map((zone) => {
            const isActive = selectedZone === zone.id;
            return (
              <button
                key={zone.id}
                onClick={() => handleZoneChange(zone.id)}
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
          
          {/* Leaflet Map Column (8 Cols) */}
          <div className="lg:col-span-8 relative rounded-3xl overflow-hidden bg-midnight-900/90 border border-white/15 shadow-2xl h-[520px] sm:h-[620px]">
            
            {/* The Map Canvas */}
            <div ref={mapContainerRef} className="w-full h-full z-0 bg-[#161a22]" />

            {/* Top Left Status Badge */}
            <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/75 backdrop-blur-md border border-white/15 text-[11px] font-mono text-cyan-300 shadow-xl">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span>Live India Map • {REGIONS_DATA.length} Territories Active</span>
            </div>

            {/* Quick Search Overlay Top Right */}
            <div className="absolute top-4 right-4 z-10 w-64">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-cyan-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Jump to state..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-xs text-white placeholder:text-slate-400 focus:outline-none focus:border-cyan-400 shadow-xl"
                />
              </div>
            </div>

            {/* Active Region Indicator Pill on Map Bottom */}
            <div className="absolute bottom-4 left-4 z-10 hidden sm:flex items-center gap-2 px-4 py-2 rounded-2xl bg-midnight-950/90 backdrop-blur-md border border-white/15 text-xs text-white shadow-2xl">
              <span className="text-cyan-400 font-mono font-bold">
                {String(activeIndex + 1).padStart(2, '0')} / {REGIONS_DATA.length}
              </span>
              <span className="text-slate-400">•</span>
              <span className="font-display font-bold">{activeRegion.name}</span>
              <span className="text-slate-400">({activeRegion.capital})</span>
            </div>
          </div>

          {/* Side Inspection Card & Territory List (4 Cols) */}
          <div className="lg:col-span-4 flex flex-col gap-5">
            
            {/* Active Region Interactive Inspection Card */}
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
                  <div className="relative h-52 w-full overflow-hidden bg-midnight-950">
                    <img
                      src={activeRegion.heroImage}
                      alt={activeRegion.name}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-midnight-950 via-midnight-950/40 to-transparent" />

                    {/* Sequence Badge */}
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-[10px] font-mono text-cyan-300">
                      {String(activeIndex + 1).padStart(2, '0')} / {REGIONS_DATA.length} • {activeRegion.type === 'Union Territory' ? 'UT' : 'State'}
                    </div>

                    {/* Step Navigation Arrows over Image */}
                    <div className="absolute top-3 right-3 flex items-center gap-1.5">
                      <button
                        onClick={handlePrevRegion}
                        title="Previous Territory"
                        className="p-1.5 rounded-full bg-black/60 hover:bg-cyan-500 hover:text-midnight-950 text-white border border-white/20 transition-all cursor-pointer"
                      >
                        <ChevronLeft className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={handleNextRegion}
                        title="Next Territory"
                        className="p-1.5 rounded-full bg-black/60 hover:bg-cyan-500 hover:text-midnight-950 text-white border border-white/20 transition-all cursor-pointer"
                      >
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-xs text-white">
                      <Clock className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{currentDuration}</span>
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
                      <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Capital: <strong className="text-slate-200">{activeRegion.capital || activeRegion.name}</strong></span>
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

              <div className="max-h-48 overflow-y-auto space-y-1 pr-1 custom-scrollbar">
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
