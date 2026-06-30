"use client";
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowLeft, Loader2 } from "lucide-react";
import { ProtectedRoute } from "@/components/auth-provider";
import { useAuthStore } from "@/lib/auth-store";
import { getCityCoordinates } from "@/lib/locations";
import { getSafePlacesByCity as getMockSafePlaces } from "@/lib/mock-data";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    google: any;
  }
}

const MARKER_COLORS: Record<string, string> = {
  hospital: "#EF4444",
  police: "#3B82F6",
  fire: "#F97316",
  volunteer: "#10B981",
  aed: "#8B5CF6",
};

export default function MapPage() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapType, setMapType] = useState<"roadmap" | "satellite">("roadmap");
  const { user } = useAuthStore();
  const SAFE_PLACES = getMockSafePlaces(user?.city);
  
  const [selectedPlace, setSelectedPlace] = useState<typeof SAFE_PLACES[0] | null>(null);
  const [filter, setFilter] = useState("all");

  const toggleMapType = () => {
    if (!mapInstanceRef.current) return;
    const newType = mapType === "roadmap" ? "satellite" : "roadmap";
    mapInstanceRef.current.setMapTypeId(newType);
    setMapType(newType);
  };

  useEffect(() => {
    const loadMap = () => {
      if (!window.google || !mapRef.current) return;
      
      const cityCoords = getCityCoordinates(user?.city);
      
      const map = new window.google.maps.Map(mapRef.current, {
        center: cityCoords,
        zoom: 13,
        styles: [
          { elementType: "geometry", stylers: [{ color: "#0f172a" }] },
          { elementType: "labels.text.stroke", stylers: [{ color: "#0f172a" }] },
          { elementType: "labels.text.fill", stylers: [{ color: "#94a3b8" }] },
          { featureType: "road", elementType: "geometry", stylers: [{ color: "#1e293b" }] },
          { featureType: "road", elementType: "geometry.stroke", stylers: [{ color: "#334155" }] },
          { featureType: "water", elementType: "geometry", stylers: [{ color: "#0ea5e9" }] },
          { featureType: "poi", stylers: [{ visibility: "off" }] },
        ],
        disableDefaultUI: true,
        zoomControl: true,
      });
      mapInstanceRef.current = map;

      // Add markers for safe places
      SAFE_PLACES.forEach((place) => {
        const marker = new window.google.maps.Marker({
          position: { lat: place.lat, lng: place.lng },
          map,
          title: place.name,
          icon: {
            path: window.google.maps.SymbolPath.CIRCLE,
            fillColor: MARKER_COLORS[place.type] || "#6B7280",
            fillOpacity: 1,
            strokeColor: "#fff",
            strokeWeight: 2,
            scale: 10,
          },
        });
        marker.addListener("click", () => setSelectedPlace(place));
      });

      // User location marker
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((pos) => {
          new window.google.maps.Marker({
            position: { lat: pos.coords.latitude, lng: pos.coords.longitude },
            map,
            title: "You",
            icon: {
              path: window.google.maps.SymbolPath.CIRCLE,
              fillColor: "#3B82F6",
              fillOpacity: 1,
              strokeColor: "#fff",
              strokeWeight: 3,
              scale: 12,
            },
          });
          map.setCenter({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        });
      }
      setMapLoaded(true);
    };

    if (window.google) { loadMap(); return; }
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`;
    script.async = true;
    script.onload = loadMap;
    document.head.appendChild(script);
  }, []);

  const filters = [
    { key: "all", label: "All" },
    { key: "hospital", label: "🏥 Hospitals" },
    { key: "police", label: "👮 Police" },
    { key: "fire", label: "🚒 Fire" },
  ];

  return (
    <ProtectedRoute>
    <div className="h-screen bg-[#030712] text-white flex flex-col">
      {/* Header */}
      <div className="glass border-b border-white/5 px-6 h-16 flex items-center gap-4 flex-shrink-0">
        <Link href="/dashboard" className="text-white/60 hover:text-white">
          <ArrowLeft size={22} />
        </Link>
        <h1 className="font-semibold">Emergency Map</h1>
        <div className="ml-auto flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-sm text-white/40">Live</span>
        </div>
      </div>

      {/* Filters */}
      <div className="px-4 py-3 flex gap-2 overflow-x-auto flex-shrink-0 border-b border-white/5">
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
              filter === f.key ? "emergency-gradient text-white" : "bg-white/5 text-white/50 hover:bg-white/10"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Map Actions Overlay */}
      <div className="absolute top-24 left-4 z-20">
        <button
          onClick={toggleMapType}
          className="glass rounded-xl px-4 py-2 text-sm font-medium border border-white/20 hover:bg-white/10 transition-colors shadow-lg"
        >
          {mapType === "roadmap" ? "🛰️ Satellite View" : "🗺️ Map View"}
        </button>
      </div>

      {/* Map */}
      <div className="flex-1 relative">
        {!mapLoaded && (
          <div className="absolute inset-0 flex items-center justify-center z-10 bg-[#030712]">
            <div className="text-center">
              <Loader2 size={32} className="text-blue-500 animate-spin mx-auto mb-3" />
              <p className="text-white/40">Loading emergency map...</p>
            </div>
          </div>
        )}
        <div ref={mapRef} className="w-full h-full" />

        {/* Legend */}
        <div className="absolute top-4 right-4 glass rounded-xl p-3 border border-white/10 space-y-2">
          {Object.entries(MARKER_COLORS).map(([type, color]) => (
            <div key={type} className="flex items-center gap-2 text-xs text-white/60 capitalize">
              <div className="w-3 h-3 rounded-full" style={{ background: color }} />
              {type}
            </div>
          ))}
        </div>

        {/* SOS FAB */}
        <Link href="/sos" className="absolute bottom-6 right-6">
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="w-16 h-16 rounded-full emergency-gradient flex items-center justify-center shadow-lg shadow-red-500/40 sos-pulse"
          >
            <span className="text-white font-bold text-lg">SOS</span>
          </motion.div>
        </Link>

        {/* Selected place panel */}
        {selectedPlace && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="absolute bottom-6 left-4 right-24 glass rounded-2xl p-4 border border-white/10"
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="font-semibold text-white">{selectedPlace.name}</div>
                <div className="text-xs text-white/40 capitalize mt-0.5">{selectedPlace.type}</div>
                <div className="text-sm text-blue-400 mt-1">📞 {selectedPlace.phone}</div>
              </div>
              <button onClick={() => setSelectedPlace(null)} className="text-white/30 hover:text-white text-xl leading-none">×</button>
            </div>
            <div className="flex gap-2 mt-3">
              <button className="flex-1 py-2 rounded-xl bg-emerald-500/20 text-emerald-400 text-sm font-medium hover:bg-emerald-500/30 transition-colors">
                Navigate
              </button>
              <a href={`tel:${selectedPlace.phone}`} className="flex-1 py-2 rounded-xl bg-blue-500/20 text-blue-400 text-sm font-medium hover:bg-blue-500/30 transition-colors text-center">
                Call Now
              </a>
            </div>
          </motion.div>
        )}
      </div>
    </div>
    </ProtectedRoute>
  );
}
