import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import { MapPin, Navigation } from 'lucide-react';

// Custom Map Marker using HTML DivIcon for reliable zero-broken-image rendering
const createCustomMarker = (number, title) => {
  return L.divIcon({
    className: 'custom-map-pin',
    html: `
      <div style="
        background: #142B25;
        border: 2px solid #D5A45D;
        color: #F5F0E7;
        width: 32px;
        height: 32px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        font-size: 13px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
      ">
        ${number}
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -18]
  });
};

export default function LeafletMap({ coordinates = [] }) {
  if (!coordinates || coordinates.length === 0) return null;

  // Center on Rajasthan (Jaipur region roughly 26.5, 74.0)
  const centerLat = coordinates.reduce((sum, item) => sum + item.lat, 0) / coordinates.length;
  const centerLng = coordinates.reduce((sum, item) => sum + item.lng, 0) / coordinates.length;

  const polylinePositions = coordinates.map((item) => [item.lat, item.lng]);

  return (
    <div className="rounded-3xl overflow-hidden border border-ivory-200 shadow-soft bg-white">
      <div className="p-4 bg-forest-950 text-white flex items-center justify-between border-b border-forest-900">
        <div className="flex items-center gap-2">
          <Navigation className="w-4 h-4 text-gold-400" />
          <span className="text-xs font-semibold uppercase tracking-wider text-ivory-100">
            Official Route Map & Stops (OpenStreetMap)
          </span>
        </div>
        <span className="text-[11px] text-gold-400 font-medium">
          {coordinates.length} Primary Stops
        </span>
      </div>

      <div className="h-[420px] w-full z-10 relative">
        <MapContainer
          center={[centerLat, centerLng]}
          zoom={6}
          scrollWheelZoom={false}
          className="h-full w-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* Polyline connecting the stops along the route */}
          <Polyline
            positions={polylinePositions}
            pathOptions={{ color: '#D5A45D', weight: 4, dashArray: '8, 8', opacity: 0.9 }}
          />

          {coordinates.map((item, index) => (
            <Marker
              key={index}
              position={[item.lat, item.lng]}
              icon={createCustomMarker(index + 1, item.city)}
            >
              <Popup>
                <div className="p-1">
                  <div className="text-[10px] font-bold text-gold-600 uppercase tracking-wider mb-0.5">
                    Stop {index + 1} · {item.day}
                  </div>
                  <h4 className="font-serif text-sm font-bold text-forest-950 mb-1">
                    {item.city}
                  </h4>
                  <p className="text-xs text-charcoal-600 leading-snug">
                    {item.label}
                  </p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      <div className="p-4 bg-ivory-50 border-t border-ivory-200 text-xs text-charcoal-500 flex flex-wrap items-center justify-between gap-2">
        <span>Click any numbered circle marker to view stop details and schedule.</span>
        <span className="text-forest-900 font-medium">Route Distance: ~1,150 km Total</span>
      </div>
    </div>
  );
}
