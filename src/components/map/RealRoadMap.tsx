import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { 
  Navigation2, 
  Maximize2, 
  ShieldAlert, 
  AlertTriangle, 
  Layers, 
  Radio, 
  Play, 
  Square,
  Sparkles 
} from 'lucide-react';
import { GeoCoordinate, RouteStep, CommunityPost } from '../../types';

interface RealRoadMapProps {
  roadGeometry: GeoCoordinate[];
  completedGeometry?: GeoCoordinate[];
  userLocation: GeoCoordinate | null;
  steps: RouteStep[];
  activeStepIndex: number | null;
  incidents: CommunityPost[];
  isLiveTracking: boolean;
  onRecenter: () => void;
  onTriggerSOS: () => void;
  onToggleAlternative?: () => void;
  isAlternativeActive?: boolean;
  hasAlternativeAvailable?: boolean;
}

export const RealRoadMap: React.FC<RealRoadMapProps> = ({
  roadGeometry,
  completedGeometry = [],
  userLocation,
  steps,
  activeStepIndex,
  incidents,
  isLiveTracking,
  onRecenter,
  onTriggerSOS,
  onToggleAlternative,
  isAlternativeActive = false,
  hasAlternativeAvailable = false,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const routePolylineRef = useRef<L.Polyline | null>(null);
  const completedPolylineRef = useRef<L.Polyline | null>(null);
  const userMarkerRef = useRef<L.Marker | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);

  const [mapReady, setMapReady] = useState(false);
  const [showIncidentsLayer, setShowIncidentsLayer] = useState(true);

  // 1. Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return;

    const initialCenter: [number, number] = roadGeometry[0] || [6.5244, 3.3792];

    const map = L.map(mapContainerRef.current, {
      center: initialCenter,
      zoom: 14,
      zoomControl: false,
      attributionControl: false,
    });

    // Clean, crisp high-contrast CartoDB Positron / OSM tiles for mobile GIS
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      maxZoom: 19,
      subdomains: 'abcd',
    }).addTo(map);

    markersLayerRef.current = L.layerGroup().addTo(map);
    mapInstanceRef.current = map;
    setMapReady(true);

    // Initial resize trigger
    setTimeout(() => {
      map.invalidateSize();
    }, 200);

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // 2. Draw Real Road Geometry & Polylines
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !mapReady || roadGeometry.length === 0) return;

    // Clear previous polylines
    if (routePolylineRef.current) {
      map.removeLayer(routePolylineRef.current);
    }
    if (completedPolylineRef.current) {
      map.removeLayer(completedPolylineRef.current);
    }

    // Remaining / Main Road Polyline (Vibrant RouteWise Orange)
    const latLngs: L.LatLngExpression[] = roadGeometry.map((coord) => [coord[0], coord[1]]);
    
    routePolylineRef.current = L.polyline(latLngs, {
      color: isAlternativeActive ? '#10B981' : '#FF6321',
      weight: 6,
      opacity: 0.9,
      lineCap: 'round',
      lineJoin: 'round',
    }).addTo(map);

    // Completed Path Polyline (Dark/Muted)
    if (completedGeometry.length > 1) {
      const compLatLngs: L.LatLngExpression[] = completedGeometry.map((coord) => [coord[0], coord[1]]);
      completedPolylineRef.current = L.polyline(compLatLngs, {
        color: '#4B5563',
        weight: 6,
        opacity: 0.7,
        dashArray: '8, 8',
      }).addTo(map);
    }

    // Fit map bounds to road route
    if (!userLocation || !isLiveTracking) {
      const bounds = L.latLngBounds(latLngs);
      map.fitBounds(bounds, { padding: [35, 35], maxZoom: 16 });
    }
  }, [roadGeometry, completedGeometry, mapReady, isAlternativeActive]);

  // 3. Render Step Markers, Junctions & Incident Hazards
  useEffect(() => {
    const map = mapInstanceRef.current;
    const markersLayer = markersLayerRef.current;
    if (!map || !markersLayer || !mapReady) return;

    markersLayer.clearLayers();

    // Render Steps & Transfer Points
    steps.forEach((step, idx) => {
      const isStart = idx === 0;
      const isEnd = idx === steps.length - 1;
      const isActive = activeStepIndex === idx;

      // Start Origin Marker
      if (isStart && step.startCoordinate) {
        const startIcon = L.divIcon({
          className: 'custom-map-icon',
          html: `
            <div style="background:#1A1A1A; color:#FFF; font-weight:900; font-size:10px; padding:4px 8px; border-radius:12px; border:2px solid #FFF; box-shadow:0 4px 6px rgba(0,0,0,0.2); white-space:nowrap; display:flex; align-items:center; gap:4px;">
              <span>🟢</span>
              <span>${step.from}</span>
            </div>
          `,
          iconSize: [80, 30],
          iconAnchor: [40, 15],
        });
        L.marker([step.startCoordinate[0], step.startCoordinate[1]], { icon: startIcon }).addTo(markersLayer);
      }

      // Transfer Point Marker
      if (!isStart && step.startCoordinate) {
        const transferIcon = L.divIcon({
          className: 'custom-map-icon',
          html: `
            <div style="background:#FFF; color:#1A1A1A; font-weight:800; font-size:10px; padding:3px 6px; border-radius:10px; border:2px solid #FF6321; box-shadow:0 3px 6px rgba(0,0,0,0.15); white-space:nowrap; display:flex; align-items:center; gap:4px;">
              <span>🔁</span>
              <span>${step.from}</span>
            </div>
          `,
          iconSize: [75, 26],
          iconAnchor: [37, 13],
        });
        L.marker([step.startCoordinate[0], step.startCoordinate[1]], { icon: transferIcon }).addTo(markersLayer);
      }

      // Final Destination Marker
      if (isEnd && step.endCoordinate) {
        const destIcon = L.divIcon({
          className: 'custom-map-icon',
          html: `
            <div style="background:#FF6321; color:#FFF; font-weight:900; font-size:10px; padding:4px 8px; border-radius:12px; border:2px solid #FFF; box-shadow:0 4px 8px rgba(255,99,33,0.4); white-space:nowrap; display:flex; align-items:center; gap:4px;">
              <span>🏁</span>
              <span>${step.to}</span>
            </div>
          `,
          iconSize: [80, 30],
          iconAnchor: [40, 15],
        });
        L.marker([step.endCoordinate[0], step.endCoordinate[1]], { icon: destIcon }).addTo(markersLayer);
      }
    });

    // Render Live Road Incidents along the route
    if (showIncidentsLayer) {
      incidents.forEach((inc) => {
        if (!inc.coordinates) return;

        const isHazard = inc.category === 'Safety' || inc.category === 'Road';
        const isTraffic = inc.category === 'Traffic';
        const badgeColor = isHazard ? '#DC2626' : isTraffic ? '#EA580C' : '#2563EB';
        const emoji = isHazard ? '🚨' : isTraffic ? '🚦' : '⚠️';

        const incidentIcon = L.divIcon({
          className: 'custom-incident-icon',
          html: `
            <div style="background:${badgeColor}; color:#FFF; font-size:11px; font-weight:800; padding:3px 6px; border-radius:8px; border:2px solid #FFF; box-shadow:0 3px 8px rgba(0,0,0,0.3); display:flex; align-items:center; gap:3px; animation:pulse 2s infinite;">
              <span>${emoji}</span>
              <span style="font-size:9px; text-transform:uppercase;">${inc.category}</span>
            </div>
          `,
          iconSize: [60, 24],
          iconAnchor: [30, 12],
        });

        const marker = L.marker([inc.coordinates[0], inc.coordinates[1]], { icon: incidentIcon });
        marker.bindPopup(`
          <div style="font-family:sans-serif; padding:2px; max-width:180px;">
            <div style="font-weight:bold; font-size:11px; color:${badgeColor}; text-transform:uppercase;">${inc.category} • ${inc.freshness}</div>
            <div style="font-size:11px; color:#111; margin-top:2px;">${inc.text}</div>
            <div style="font-size:9px; color:#666; margin-top:4px;">⭐ ${inc.stars} useful • ✓ ${inc.confirms} confirmed</div>
          </div>
        `);
        marker.addTo(markersLayer);
      });
    }
  }, [steps, activeStepIndex, incidents, showIncidentsLayer, mapReady]);

  // 4. Update User Marker Position along Road
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !mapReady) return;

    if (userLocation) {
      const userLatLng: [number, number] = [userLocation[0], userLocation[1]];

      if (!userMarkerRef.current) {
        const userIcon = L.divIcon({
          className: 'user-pulse-marker',
          html: `
            <div style="position:relative; width:28px; height:28px; display:flex; align-items:center; justify-content:center;">
              <div style="position:absolute; width:28px; height:28px; background:#FF6321; opacity:0.35; border-radius:50%; animation:ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>
              <div style="width:16px; height:16px; background:#FF6321; border:3px solid #FFFFFF; border-radius:50%; box-shadow:0 2px 6px rgba(0,0,0,0.4); z-index:10;"></div>
            </div>
          `,
          iconSize: [28, 28],
          iconAnchor: [14, 14],
        });

        userMarkerRef.current = L.marker(userLatLng, { icon: userIcon, zIndexOffset: 1000 }).addTo(map);
      } else {
        userMarkerRef.current.setLatLng(userLatLng);
      }

      if (isLiveTracking) {
        map.panTo(userLatLng, { animate: true, duration: 0.6 });
      }
    } else if (userMarkerRef.current) {
      map.removeLayer(userMarkerRef.current);
      userMarkerRef.current = null;
    }
  }, [userLocation, isLiveTracking, mapReady]);

  const handleFitBounds = () => {
    const map = mapInstanceRef.current;
    if (!map || roadGeometry.length === 0) return;
    const latLngs: L.LatLngExpression[] = roadGeometry.map((c) => [c[0], c[1]]);
    map.fitBounds(L.latLngBounds(latLngs), { padding: [40, 40] });
  };

  return (
    <div className="relative w-full h-64 sm:h-72 rounded-2xl overflow-hidden border border-gray-200 shadow-inner bg-gray-100">
      {/* Real Road Map Container */}
      <div ref={mapContainerRef} className="w-full h-full z-0" />

      {/* Floating Status & Map Mode Badge */}
      <div className="absolute top-2.5 left-2.5 z-10 flex items-center gap-1.5 pointer-events-none">
        <div className="bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-full border border-gray-200 shadow-xs flex items-center gap-1.5 text-[10px] font-black uppercase text-gray-900">
          <span className={`w-2 h-2 rounded-full ${isLiveTracking ? 'bg-green-500 animate-pulse' : 'bg-[#FF6321]'}`} />
          <span>{isLiveTracking ? 'Live Road Tracking' : 'Road Route Overview'}</span>
        </div>

        {isAlternativeActive && (
          <div className="bg-green-600 text-white px-2 py-1 rounded-full shadow-xs text-[9px] font-black uppercase flex items-center gap-1">
            <Sparkles className="w-2.5 h-2.5" />
            <span>Safer Corridor Active</span>
          </div>
        )}
      </div>

      {/* Map Action Controls (Recenter, Fit, Hazards, SOS) */}
      <div className="absolute bottom-2.5 right-2.5 z-10 flex flex-col gap-1.5">
        <button
          onClick={onRecenter}
          className="w-8 h-8 bg-white/95 hover:bg-white text-gray-800 rounded-xl shadow-md border border-gray-200 flex items-center justify-center cursor-pointer active:scale-95 transition-all"
          title="Recenter to my position"
        >
          <Navigation2 className="w-4 h-4 text-[#FF6321] fill-[#FF6321]" />
        </button>

        <button
          onClick={handleFitBounds}
          className="w-8 h-8 bg-white/95 hover:bg-white text-gray-800 rounded-xl shadow-md border border-gray-200 flex items-center justify-center cursor-pointer active:scale-95 transition-all"
          title="Fit full route in view"
        >
          <Maximize2 className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={() => setShowIncidentsLayer((prev) => !prev)}
          className={`w-8 h-8 rounded-xl shadow-md border flex items-center justify-center cursor-pointer active:scale-95 transition-all ${
            showIncidentsLayer
              ? 'bg-orange-50 border-orange-200 text-[#FF6321]'
              : 'bg-white/95 border-gray-200 text-gray-400'
          }`}
          title="Toggle road hazard markers"
        >
          <Layers className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={onTriggerSOS}
          className="w-8 h-8 bg-red-600 hover:bg-red-700 text-white rounded-xl shadow-md flex items-center justify-center cursor-pointer active:scale-95 transition-all"
          title="Emergency SOS"
        >
          <ShieldAlert className="w-4 h-4" />
        </button>
      </div>

      {/* Alternative Route Switch Pill (If available) */}
      {hasAlternativeAvailable && onToggleAlternative && (
        <div className="absolute bottom-2.5 left-2.5 z-10">
          <button
            onClick={onToggleAlternative}
            className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider shadow-md border transition-all flex items-center gap-1.5 cursor-pointer ${
              isAlternativeActive
                ? 'bg-green-600 text-white border-green-700'
                : 'bg-white/95 text-gray-800 border-gray-200 hover:bg-white'
            }`}
          >
            <span>{isAlternativeActive ? '✓ Using Safer Corridor' : '🔄 Alternative Available'}</span>
          </button>
        </div>
      )}
    </div>
  );
};
