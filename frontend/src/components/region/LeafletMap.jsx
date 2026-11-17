import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import { Navigation } from 'lucide-react';

const createCustomMarker = (number, _title) => {
  return L.divIcon({
    className: 'custom-map-pin',
    html: `
      <div style="
        background: #0F172A;
        border: 2px solid #F97316;
        color: #FFFFFF;
        width: 34px;
        height: 34px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 800;
        font-family: sans-serif;
        font-size: 13px;
        box-shadow: 0 4px 14px rgba(249, 115, 22, 0.4);
      ">
        ${number}
      </div>
    `,
    iconSize: [34, 34],
    iconAnchor: [17, 17],
    popupAnchor: [0, -20]
  });
};

export default function LeafletMap({ coordinates = [] }) {
  if (!coordinates || coordinates.length === 0) return null;

  const centerLat = coordinates.reduce((sum, item) => sum + item.lat, 0) / coordinates.length;
  const centerLng = coordinates.reduce((sum, item) => sum + item.lng, 0) / coordinates.length;

  const polylinePositions = coordinates.map((item) => [item.lat, item.lng]);

  return (
    <div className="rounded-3xl overflow-hidden border border-slate-200/90 shadow-soft bg-white">
      <div className="p-4 bg-slate-950 text-white flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Navigation className="w-4 h-4 text-saffron-500" />
          <span className="text-xs font-bold uppercase tracking-wider text-slate-100">
            Interactive Route Map & Primary Stops (OpenStreetMap)
          </span>
        </div>
        <span className="text-xs text-amber-400 font-bold bg-white/10 px-3 py-1 rounded-full">
          {coordinates.length} Stops Connected
        </span>
      </div>

      <div className="h-[440px] w-full z-10 relative">
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

          <Polyline
            positions={polylinePositions}
            pathOptions={{ color: '#F97316', weight: 4, dashArray: '6, 6', opacity: 0.9 }}
          />

          {coordinates.map((item, index) => (
            <Marker
              key={index}
              position={[item.lat, item.lng]}
              icon={createCustomMarker(index + 1, item.city)}
            >
              <Popup>
                <div className="p-1">
                  <div className="text-[10px] font-bold text-saffron-600 uppercase tracking-wider mb-0.5">
                    Stop {index + 1} · {item.day}
                  </div>
                  <h4 className="font-display text-sm font-bold text-slate-900 mb-1">
                    {item.city}
                  </h4>
                  <p className="text-xs text-slate-600 leading-snug">
                    {item.label}
                  </p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      <div className="p-4 bg-slate-50 border-t border-slate-200 text-xs text-slate-500 flex flex-wrap items-center justify-between gap-2 font-medium">
        <span>Click any numbered circle marker to view stop details and schedule.</span>
        <span className="text-slate-900 font-bold">Route Distance: ~1,150 km Total</span>
      </div>
    </div>
  );
}
