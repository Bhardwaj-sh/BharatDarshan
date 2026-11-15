import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Compass, 
  Search, 
  MapPin, 
  Clock, 
  ArrowRight, 
  Navigation,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  ShieldCheck,
  Flame,
  Layers
} from 'lucide-react';
import { REGIONS_DATA } from '../../data/regionsData';
import indiaGeoData from '../../data/indiaStatesGeo.json';
import L from 'leaflet';

// Curated Vibrant Indian Color Palette matching reference image (Emerald, Saffron, Coral, Purple, Gold, Turquoise, Terracotta)
export const STATE_COLOR_MAP = {
  'rajasthan': { fill: '#B45309', border: '#FDE68A', label: 'Rajasthan' },
  'gujarat': { fill: '#C2410C', border: '#FDBA74', label: 'Gujarat' },
  'maharashtra': { fill: '#854D0E', border: '#FDE047', label: 'Maharashtra' },
  'karnataka': { fill: '#A16207', border: '#FEF08A', label: 'Karnataka' },
  'kerala': { fill: '#047857', border: '#6EE7B7', label: 'Kerala' },
  'tamil-nadu': { fill: '#BE123C', border: '#FDA4AF', label: 'Tamil Nadu' },
  'andhra-pradesh': { fill: '#0369A1', border: '#7DD3FC', label: 'Andhra Pradesh' },
  'telangana': { fill: '#0F766E', border: '#5EEAD4', label: 'Telangana' },
  'goa': { fill: '#E11D48', border: '#FDA4AF', label: 'Goa' },
  'madhya-pradesh': { fill: '#15803D', border: '#86EFAC', label: 'Madhya Pradesh' },
  'chhattisgarh': { fill: '#047857', border: '#6EE7B7', label: 'Chhattisgarh' },
  'odisha': { fill: '#9A3412', border: '#FDBA74', label: 'Odisha' },
  'west-bengal': { fill: '#1E3A8A', border: '#93C5FD', label: 'West Bengal' },
  'bihar': { fill: '#92400E', border: '#FDE047', label: 'Bihar' },
  'jharkhand': { fill: '#0F766E', border: '#5EEAD4', label: 'Jharkhand' },
  'uttar-pradesh': { fill: '#6D28D9', border: '#C084FC', label: 'Uttar Pradesh' },
  'punjab': { fill: '#D97706', border: '#FDE047', label: 'Punjab' },
  'haryana': { fill: '#B45309', border: '#FDE68A', label: 'Haryana' },
  'delhi': { fill: '#4338CA', border: '#A5B4FC', label: 'Delhi' },
  'himachal-pradesh': { fill: '#0E7490', border: '#67E8F9', label: 'Himachal Pradesh' },
  'uttarakhand': { fill: '#1E40AF', border: '#93C5FD', label: 'Uttarakhand' },
  'jammu-and-kashmir': { fill: '#5B21B6', border: '#C084FC', label: 'Jammu & Kashmir' },
  'ladakh': { fill: '#3730A3', border: '#A5B4FC', label: 'Ladakh' },
  'sikkim': { fill: '#BE185D', border: '#F472B6', label: 'Sikkim' },
  'assam': { fill: '#166534', border: '#86EFAC', label: 'Assam' },
  'arunachal-pradesh': { fill: '#14532D', border: '#86EFAC', label: 'Arunachal Pradesh' },
  'meghalaya': { fill: '#115E59', border: '#5EEAD4', label: 'Meghalaya' },
  'nagaland': { fill: '#7C2D12', border: '#FDBA74', label: 'Nagaland' },
  'manipur': { fill: '#581C87', border: '#D8B4FE', label: 'Manipur' },
  'mizoram': { fill: '#831843', border: '#F472B6', label: 'Mizoram' },
  'tripura': { fill: '#9D174D', border: '#FDA4AF', label: 'Tripura' },
  'andaman-and-nicobar': { fill: '#0E7490', border: '#67E8F9', label: 'Andaman & Nicobar' },
  'lakshadweep': { fill: '#0284C7', border: '#38BDF8', label: 'Lakshadweep' },
  'chandigarh': { fill: '#0284C7', border: '#38BDF8', label: 'Chandigarh' },
  'puducherry': { fill: '#C026D3', border: '#F0ABFC', label: 'Puducherry' },
  'daman-and-diu': { fill: '#D97706', border: '#FDE047', label: 'Daman & Diu' }
};

export const REGION_GEO_COORDINATES = {
  'rajasthan': { lat: 26.9124, lng: 73.7873, zone: 'west' },
  'kerala': { lat: 10.2505, lng: 76.4711, zone: 'south' },
  'himachal-pradesh': { lat: 31.8048, lng: 77.1734, zone: 'north' },
  'goa': { lat: 15.3593, lng: 74.0540, zone: 'west' },
  'uttarakhand': { lat: 30.1668, lng: 79.2193, zone: 'north' },
  'ladakh': { lat: 34.2526, lng: 77.8771, zone: 'north' },
  'tamil-nadu': { lat: 11.1271, lng: 78.6569, zone: 'south' },
  'jammu-and-kashmir': { lat: 33.7782, lng: 74.8973, zone: 'north' },
  'madhya-pradesh': { lat: 23.4599, lng: 77.9126, zone: 'central' },
  'sikkim': { lat: 27.6389, lng: 88.5122, zone: 'northeast' },
  'uttar-pradesh': { lat: 26.8467, lng: 80.9462, zone: 'north' },
  'andaman-and-nicobar': { lat: 11.7401, lng: 92.6586, zone: 'islands' },
  'karnataka': { lat: 14.8173, lng: 75.8139, zone: 'south' },
  'meghalaya': { lat: 25.5670, lng: 91.2662, zone: 'northeast' },
  'gujarat': { lat: 22.4587, lng: 71.4924, zone: 'west' },
  'assam': { lat: 26.2006, lng: 92.9376, zone: 'northeast' },
  'west-bengal': { lat: 23.4726, lng: 87.8639, zone: 'east' },
  'odisha': { lat: 20.4517, lng: 84.8985, zone: 'east' },
  'maharashtra': { lat: 19.3515, lng: 75.7139, zone: 'west' },
  'punjab': { lat: 30.9471, lng: 75.3412, zone: 'north' },
  'delhi': { lat: 28.6139, lng: 77.2090, zone: 'north' },
  'telangana': { lat: 17.8850, lng: 79.0867, zone: 'south' },
  'andhra-pradesh': { lat: 15.3129, lng: 78.7400, zone: 'south' },
  'bihar': { lat: 25.6941, lng: 85.6376, zone: 'east' },
  'chhattisgarh': { lat: 21.2787, lng: 82.1661, zone: 'central' },
  'puducherry': { lat: 11.9416, lng: 79.8083, zone: 'south' },
  'arunachal-pradesh': { lat: 28.0844, lng: 94.6053, zone: 'northeast' },
  'nagaland': { lat: 26.1584, lng: 94.5624, zone: 'northeast' },
  'manipur': { lat: 24.8170, lng: 93.9368, zone: 'northeast' },
  'mizoram': { lat: 23.3645, lng: 92.9376, zone: 'northeast' },
  'tripura': { lat: 23.8315, lng: 91.5868, zone: 'northeast' },
  'jharkhand': { lat: 23.6102, lng: 85.5096, zone: 'east' },
  'haryana': { lat: 29.2588, lng: 76.0856, zone: 'north' },
  'chandigarh': { lat: 30.7333, lng: 76.7794, zone: 'north' },
  'daman-and-diu': { lat: 20.4283, lng: 72.8397, zone: 'west' },
  'lakshadweep': { lat: 10.5667, lng: 72.6417, zone: 'islands' }
};

const ZONES = [
  { id: 'all', label: 'All 36 Regions', center: [22.8, 80.5], zoom: 4.8 },
  { id: 'north', label: 'Himalayas & North', center: [31.5, 77.0], zoom: 5.7 },
  { id: 'west', label: 'Desert & West', center: [23.5, 72.5], zoom: 5.6 },
  { id: 'south', label: 'Southern Peninsula', center: [13.0, 77.8], zoom: 5.6 },
  { id: 'east', label: 'East & Heartland', center: [23.0, 84.5], zoom: 5.6 },
  { id: 'northeast', label: 'Northeast Mystique', center: [26.0, 93.0], zoom: 6.0 },
  { id: 'islands', label: 'Islands & UTs', center: [11.7, 92.6], zoom: 6.0 },
];

export default function InteractiveIndiaMap() {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const geoJsonLayerRef = useRef(null);
  const labelMarkersRef = useRef({});

  const [selectedZone, setSelectedZone] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);

  const activeRegion = REGIONS_DATA[activeIndex] || REGIONS_DATA[0];

  // Normalization helper to map GeoJSON state name to REGIONS_DATA
  const normStr = (s) => (s || '').toLowerCase().replace(/&/g, 'and').replace(/[^a-z]/g, '');

  const getRegionFromFeatureName = (stName) => {
    const target = normStr(stName);
    return REGIONS_DATA.find((r) => {
      const rn = normStr(r.name);
      return rn === target || rn.includes(target) || target.includes(rn);
    });
  };

  // Filtered regions for quick switcher
  const filteredRegions = REGIONS_DATA.filter((r) => {
    const coords = REGION_GEO_COORDINATES[r.id];
    const matchesSearch =
      r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (r.capital && r.capital.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (r.highlights && r.highlights.some((h) => h.toLowerCase().includes(searchQuery.toLowerCase())));

    const matchesZone = selectedZone === 'all' || (coords && coords.zone === selectedZone);
    return matchesSearch && matchesZone;
  });

  // Initialize Leaflet Map with GeoJSON State Boundaries
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return;

    // Center of India
    const map = L.map(mapContainerRef.current, {
      center: [22.8, 80.5],
      zoom: 4.8,
      minZoom: 4,
      maxZoom: 9,
      zoomControl: false,
      attributionControl: false,
      scrollWheelZoom: false,
    });

    mapInstanceRef.current = map;

    // Build GeoJSON Layer with rich state colors matching reference image
    const geoJsonLayer = L.geoJSON(indiaGeoData, {
      style: (feature) => {
        const region = getRegionFromFeatureName(feature.properties?.st_nm);
        const palette = region ? STATE_COLOR_MAP[region.id] : null;
        const fillColor = palette ? palette.fill : '#374151';
        const borderColor = palette ? palette.border : '#FDE68A';

        return {
          fillColor: fillColor,
          weight: 1.6,
          opacity: 0.9,
          color: borderColor,
          dashArray: '',
          fillOpacity: 0.85,
        };
      },
      onEachFeature: (feature, layer) => {
        const region = getRegionFromFeatureName(feature.properties?.st_nm);
        if (!region) return;

        layer.on({
          mouseover: (e) => {
            const l = e.target;
            l.setStyle({
              weight: 3.5,
              color: '#FFFFFF',
              fillOpacity: 0.98,
            });
            l.bringToFront();
            const idx = REGIONS_DATA.findIndex((r) => r.id === region.id);
            if (idx !== -1) setActiveIndex(idx);
          },
          mouseout: (e) => {
            geoJsonLayer.resetStyle(e.target);
          },
          click: (e) => {
            const idx = REGIONS_DATA.findIndex((r) => r.id === region.id);
            if (idx !== -1) setActiveIndex(idx);
            const coords = REGION_GEO_COORDINATES[region.id];
            if (coords) {
              map.flyTo([coords.lat, coords.lng], 6.0, { duration: 1.2 });
            }
          },
        });
      },
    }).addTo(map);

    geoJsonLayerRef.current = geoJsonLayer;

    // Add Prominent State Name Pills and Markers on each state (Exactly like Reference Screenshot)
    REGIONS_DATA.forEach((region, idx) => {
      const coords = REGION_GEO_COORDINATES[region.id];
      if (!coords) return;

      const palette = STATE_COLOR_MAP[region.id] || { border: '#FDE68A' };

      const labelIcon = L.divIcon({
        className: 'state-map-label',
        html: `
          <div class="state-label-pill" id="pill-${region.id}">
            <span class="w-2 h-2 rounded-full bg-amber-400 shrink-0 shadow-[0_0_8px_#F59E0B]"></span>
            <span class="font-display">${region.name}</span>
          </div>
        `,
        iconSize: [110, 26],
        iconAnchor: [55, 13],
      });

      const labelMarker = L.marker([coords.lat, coords.lng], { icon: labelIcon }).addTo(map);

      labelMarker.on('click', () => {
        setActiveIndex(idx);
        map.flyTo([coords.lat, coords.lng], 6.0, { duration: 1.2 });
      });

      labelMarker.on('mouseover', () => {
        setActiveIndex(idx);
      });

      labelMarkersRef.current[region.id] = labelMarker;
    });

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update active pill highlight on map when activeRegion changes
  useEffect(() => {
    if (!activeRegion) return;
    Object.keys(labelMarkersRef.current).forEach((regId) => {
      const el = document.getElementById(`pill-${regId}`);
      if (el) {
        if (regId === activeRegion.id) {
          el.classList.add('active');
        } else {
          el.classList.remove('active');
        }
      }
    });
  }, [activeRegion]);

  // Zone Navigation with Smooth Camera FlyTo
  const handleZoneChange = (zoneId) => {
    setSelectedZone(zoneId);
    const zoneObj = ZONES.find((z) => z.id === zoneId);
    if (zoneObj && mapInstanceRef.current) {
      mapInstanceRef.current.flyTo(zoneObj.center, zoneObj.zoom, { duration: 1.3 });
    }
  };

  const handleSelectRegion = (region) => {
    const idx = REGIONS_DATA.findIndex((r) => r.id === region.id);
    if (idx !== -1) setActiveIndex(idx);
    const coords = REGION_GEO_COORDINATES[region.id];
    if (coords && mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([coords.lat, coords.lng], 6.0, { duration: 1.2 });
    }
  };

  const handleNextRegion = () => {
    const nextIdx = (activeIndex + 1) % REGIONS_DATA.length;
    setActiveIndex(nextIdx);
    const nextRegion = REGIONS_DATA[nextIdx];
    const coords = REGION_GEO_COORDINATES[nextRegion.id];
    if (coords && mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([coords.lat, coords.lng], 6.0, { duration: 1.2 });
    }
  };

  const handlePrevRegion = () => {
    const prevIdx = (activeIndex - 1 + REGIONS_DATA.length) % REGIONS_DATA.length;
    setActiveIndex(prevIdx);
    const prevRegion = REGIONS_DATA[prevIdx];
    const coords = REGION_GEO_COORDINATES[prevRegion.id];
    if (coords && mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([coords.lat, coords.lng], 6.0, { duration: 1.2 });
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
  const currentPalette = STATE_COLOR_MAP[activeRegion?.id] || { fill: '#B45309', border: '#FDE68A' };

  return (
    <section id="interactive-map" className="relative py-20 sm:py-28 bg-[#F8FAFC] text-slate-900 overflow-hidden border-t border-slate-200">
      
      {/* Subtle Warm Editorial Glows */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[400px] bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[400px] bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with Warm Editorial Styling */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 text-white text-xs font-mono font-bold uppercase tracking-wider mb-4 shadow-sm">
              <Compass className="w-3.5 h-3.5 text-amber-400" />
              <span>Geographical State Atlas • 36 Vibrant Territories</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-900 font-display">
              Explore India <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-orange-600 to-emerald-600">By State</span>
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600 max-w-2xl font-normal">
              Illustrated multi-coloured geographical map of India with distinct state borders, prominent state names, and authentic 1-package itineraries.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleResetView}
              className="px-5 py-2.5 rounded-full bg-white border border-slate-300 text-slate-800 hover:bg-slate-900 hover:text-white text-xs font-mono font-bold flex items-center gap-2 transition-all cursor-pointer shadow-sm hover:shadow"
            >
              <Navigation className="w-3.5 h-3.5 text-amber-500" />
              <span>Full Subcontinent View</span>
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
                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'bg-slate-900 text-white font-black shadow-md border border-slate-900'
                    : 'bg-white text-slate-700 hover:text-slate-900 border border-slate-200 hover:border-slate-400 hover:bg-slate-50'
                }`}
              >
                {zone.label}
              </button>
            );
          })}
        </div>

        {/* Dual Layout: Illustrated Map (8 Cols) + Inspection Card & State List (4 Cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Map Container on Classy Canvas */}
          <div className="lg:col-span-8 relative rounded-3xl overflow-hidden bg-[#E2E8F0] border border-slate-300/80 shadow-xl h-[560px] sm:h-[660px]">
            
            {/* The Map Canvas */}
            <div ref={mapContainerRef} className="w-full h-full z-0" />

            {/* Top Left Status Badge */}
            <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-slate-200 text-[11px] font-mono text-slate-800 shadow-md">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              <span>Interactive India State Map • Click Any State</span>
            </div>

            {/* Quick State Search Overlay Top Right */}
            <div className="absolute top-4 right-4 z-10 w-64">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Filter state (e.g. Rajasthan)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-slate-300 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-800 shadow-md"
                />
              </div>
            </div>

            {/* Active Region Indicator Pill on Map Bottom */}
            <div className="absolute bottom-4 left-4 z-10 hidden sm:flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200 text-xs text-slate-900 shadow-xl">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: currentPalette.fill }}></span>
              <span className="text-slate-900 font-mono font-bold">
                {String(activeIndex + 1).padStart(2, '0')} / {REGIONS_DATA.length}
              </span>
              <span className="text-slate-400">•</span>
              <span className="font-display font-extrabold text-slate-900 text-sm">{activeRegion.name}</span>
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
                  className="rounded-3xl overflow-hidden bg-white border border-slate-200 shadow-lg group"
                >
                  <div className="relative h-56 w-full overflow-hidden bg-slate-100">
                    <img
                      src={activeRegion.heroImage}
                      alt={activeRegion.name}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                    {/* Sequence Badge */}
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-slate-200 text-[11px] font-mono text-slate-800 font-bold shadow-sm">
                      {String(activeIndex + 1).padStart(2, '0')} / {REGIONS_DATA.length} • {activeRegion.type === 'Union Territory' ? 'Union Territory' : 'State'}
                    </div>

                    {/* Step Navigation Arrows over Image */}
                    <div className="absolute top-3 right-3 flex items-center gap-1.5">
                      <button
                        onClick={handlePrevRegion}
                        title="Previous Territory"
                        className="p-2 rounded-full bg-white/85 hover:bg-slate-900 hover:text-white text-slate-800 border border-slate-200 transition-all cursor-pointer shadow-sm"
                      >
                        <ChevronLeft className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={handleNextRegion}
                        title="Next Territory"
                        className="p-2 rounded-full bg-white/85 hover:bg-slate-900 hover:text-white text-slate-800 border border-slate-200 transition-all cursor-pointer shadow-sm"
                      >
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-slate-200 text-xs text-slate-900 font-medium shadow-sm">
                      <Clock className="w-3.5 h-3.5 text-amber-600" />
                      <span>{currentDuration}</span>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1">
                      <MapPin className="w-3.5 h-3.5 text-amber-600" />
                      <span>Capital: <strong className="text-slate-800">{activeRegion.capital || activeRegion.name}</strong></span>
                    </div>

                    <h3 className="text-2xl font-black font-display text-slate-900 group-hover:text-amber-700 transition-colors">
                      {activeRegion.name}
                    </h3>

                    <p className="mt-2 text-xs text-slate-600 line-clamp-2 leading-relaxed font-normal">
                      {activeRegion.package?.title || activeRegion.tagline || activeRegion.description}
                    </p>

                    {/* Highlights tags */}
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {(activeRegion.highlights || []).slice(0, 3).map((hl, i) => (
                        <span 
                          key={i} 
                          className="px-2.5 py-0.5 rounded-md bg-slate-100 border border-slate-200 text-[11px] text-slate-700 font-medium"
                        >
                          {hl}
                        </span>
                      ))}
                    </div>

                    {/* Pricing & CTA */}
                    <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] uppercase tracking-wider text-slate-400 block font-mono">
                          Verified Pricing
                        </span>
                        <span className="text-xl font-black text-slate-900 font-mono">
                          ₹{currentPrice.toLocaleString('en-IN')}
                        </span>
                      </div>

                      <Link
                        to={`/region/${activeRegion.id}`}
                        className="btn-classy-dark px-5 py-2.5 text-xs font-bold rounded-xl flex items-center gap-1.5"
                      >
                        <span>Itinerary</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Quick Territory Switcher List with Color Dots */}
            <div className="p-4 rounded-3xl bg-white border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-3 px-2">
                <span className="text-xs uppercase tracking-wider font-mono font-bold text-slate-900">
                  Quick Select ({filteredRegions.length})
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Click to Pan Map</span>
              </div>

              <div className="max-h-52 overflow-y-auto space-y-1 pr-1 custom-scrollbar">
                {filteredRegions.map((region) => {
                  const isCurrent = activeRegion?.id === region.id;
                  const palette = STATE_COLOR_MAP[region.id] || { fill: '#B45309' };

                  return (
                    <button
                      key={region.id}
                      onClick={() => handleSelectRegion(region)}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-colors cursor-pointer ${
                        isCurrent
                          ? 'bg-slate-100 text-slate-900 border border-slate-300 font-bold shadow-sm'
                          : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                      }`}
                    >
                      <div className="flex items-center gap-2 truncate">
                        <span 
                          className="w-2.5 h-2.5 rounded-full shrink-0 shadow-sm"
                          style={{ backgroundColor: palette.fill }}
                        />
                        <span className="truncate">{region.name}</span>
                      </div>
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
