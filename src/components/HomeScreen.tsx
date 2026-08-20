import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  MapPin, 
  Banknote, 
  AlertTriangle, 
  ChevronRight, 
  Sparkles, 
  Plus, 
  CheckCircle2, 
  Repeat,
  Compass,
  Navigation2,
  Radio
} from 'lucide-react';
import { CityConfig, CountryConfig, CommunityPost } from '../types';
import { geocodingService } from '../services/geocoding/geocodingService';

interface HomeScreenProps {
  currentCity: CityConfig;
  currentCountry: CountryConfig;
  onFindRoute: (from: string, to: string) => void;
  onOpenQuickFareReport: () => void;
  onOpenReportModal: () => void;
  recentPosts: CommunityPost[];
  savedRoutes: { id: string; from: string; to: string; label: string }[];
  isDataSaver: boolean;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  currentCity,
  currentCountry,
  onFindRoute,
  onOpenQuickFareReport,
  onOpenReportModal,
  recentPosts,
  savedRoutes,
  isDataSaver,
}) => {
  const defaultFrom = currentCity.popularJunctions[0] || 'Ojota';
  const defaultTo = currentCity.popularJunctions[1] || 'Yaba';

  const [fromLocation, setFromLocation] = useState(defaultFrom);
  const [toLocation, setToLocation] = useState(defaultTo);
  const [activeSuggestionField, setActiveSuggestionField] = useState<'from' | 'to' | null>(null);
  const [isLocating, setIsLocating] = useState(false);

  // Sync inputs when city changes
  useEffect(() => {
    if (currentCity.popularJunctions.length >= 2) {
      setFromLocation(currentCity.popularJunctions[0]);
      setToLocation(currentCity.popularJunctions[1]);
    }
  }, [currentCity.id]);

  const handleSwap = () => {
    setFromLocation(toLocation);
    setToLocation(fromLocation);
  };

  const handleSelectPresetRoute = (from: string, to: string) => {
    setFromLocation(from);
    setToLocation(to);
    onFindRoute(from, to);
  };

  const handleSelectJunction = (junction: string) => {
    if (activeSuggestionField === 'from') {
      setFromLocation(junction);
    } else if (activeSuggestionField === 'to') {
      setToLocation(junction);
    }
    setActiveSuggestionField(null);
  };

  const handleUseCurrentLocation = () => {
    if (!('geolocation' in navigator)) return;
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setIsLocating(false);
        const res = geocodingService.reverseGeocode(pos.coords.latitude, pos.coords.longitude);
        setFromLocation(res.nearestLandmark);
      },
      () => {
        setIsLocating(false);
        setFromLocation(currentCity.popularJunctions[0] || 'My Location');
      },
      { timeout: 5000 }
    );
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fromLocation.trim() || !toLocation.trim()) return;
    onFindRoute(fromLocation.trim(), toLocation.trim());
  };

  const currencySymbol = currentCountry.currencySymbol;

  // Filter recent posts for this city
  const cityPosts = recentPosts.filter(
    (p) => p.city.toLowerCase() === currentCity.name.toLowerCase() || p.city.toLowerCase().includes(currentCity.name.toLowerCase())
  );
  const latestAlert = cityPosts.find((p) => p.category === 'Traffic' || p.category === 'Safety' || p.category === 'Road');

  return (
    <div className="space-y-4 pb-4">
      {/* 1. ROUTE PLANNER CARD */}
      <section className="bg-white border border-gray-100 rounded-3xl p-4 shadow-xs">
        <form onSubmit={handleSearchSubmit} className="space-y-3">
          {/* Origin & Destination with Swap & GPS buttons */}
          <div className="relative space-y-2">
            {/* Origin Input with GPS button */}
            <div className="relative flex items-center">
              <div className="absolute left-3 w-3 h-3 rounded-full border-2 border-[#FF6321] bg-white flex items-center justify-center pointer-events-none" />
              <input
                id="from-input"
                type="text"
                value={fromLocation}
                onChange={(e) => setFromLocation(e.target.value)}
                onFocus={() => setActiveSuggestionField('from')}
                placeholder={`Starting junction in ${currentCity.name}...`}
                className="w-full bg-gray-50 border border-gray-200 rounded-2xl pl-9 pr-12 py-3 text-xs font-bold text-[#1A1A1A] placeholder-gray-400 focus:outline-none focus:border-[#FF6321] focus:bg-white transition-colors"
                required
              />
              <button
                type="button"
                onClick={handleUseCurrentLocation}
                className="absolute right-2.5 p-1.5 text-gray-400 hover:text-[#FF6321] rounded-xl hover:bg-orange-50 transition-colors cursor-pointer"
                title="Use current location via GPS"
              >
                <Navigation2 className={`w-3.5 h-3.5 ${isLocating ? 'animate-spin text-[#FF6321]' : ''}`} />
              </button>
            </div>

            {/* Destination Input with Swap button */}
            <div className="relative flex items-center">
              <div className="absolute left-3 w-3 h-3 rounded-full bg-[#FF6321] pointer-events-none" />
              <input
                id="to-input"
                type="text"
                value={toLocation}
                onChange={(e) => setToLocation(e.target.value)}
                onFocus={() => setActiveSuggestionField('to')}
                placeholder="Where to? (e.g. Terminal, Market)..."
                className="w-full bg-gray-50 border border-gray-200 rounded-2xl pl-9 pr-12 py-3 text-xs font-bold text-[#1A1A1A] placeholder-gray-400 focus:outline-none focus:border-[#FF6321] focus:bg-white transition-colors"
                required
              />
              <button
                type="button"
                onClick={handleSwap}
                className="absolute right-2.5 p-1.5 text-gray-400 hover:text-gray-700 rounded-xl hover:bg-gray-200/60 transition-colors cursor-pointer"
                title="Swap origin and destination"
              >
                <Repeat className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Quick Junction Suggestions */}
          {activeSuggestionField && (
            <div className="p-3 bg-gray-50 rounded-2xl border border-gray-200 space-y-2 animate-in fade-in duration-100">
              <div className="flex items-center justify-between text-[10px] uppercase font-black text-gray-400">
                <span>Popular {currentCity.name} Hubs:</span>
                <button
                  type="button"
                  onClick={() => setActiveSuggestionField(null)}
                  className="text-gray-500 hover:text-gray-800"
                >
                  ✕ Close
                </button>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {currentCity.popularJunctions.slice(0, 8).map((junction) => (
                  <button
                    type="button"
                    key={junction}
                    onClick={() => handleSelectJunction(junction)}
                    className="px-2.5 py-1 bg-white border border-gray-200 rounded-xl text-xs font-semibold text-gray-800 hover:border-[#FF6321] hover:text-[#FF6321] transition-colors cursor-pointer shadow-2xs"
                  >
                    {junction}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* FIND ROUTE ACTION BUTTON */}
          <button
            id="find-route-btn"
            type="submit"
            className="w-full bg-[#FF6321] hover:bg-[#e05417] active:scale-98 text-white font-black py-3.5 rounded-2xl shadow-md shadow-orange-100 text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <span>Find Best Road Route & Fare</span>
            <ArrowRight className="w-4 h-4 stroke-[2.5px]" />
          </button>
        </form>
      </section>

      {/* 2. POPULAR COMMUTER CORRIDORS */}
      <section className="bg-white border border-gray-100 rounded-3xl p-4 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-[#FF6321]" />
            <h2 className="text-xs font-black uppercase tracking-wider text-[#1A1A1A]">
              Popular {currentCity.name} Corridors
            </h2>
          </div>
          <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
            Quick Route
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {currentCity.popularRoutes.map((rt, idx) => (
            <button
              key={`${rt.from}-${rt.to}-${idx}`}
              onClick={() => handleSelectPresetRoute(rt.from, rt.to)}
              className="p-3 bg-gray-50 hover:bg-orange-50/60 border border-gray-200 hover:border-orange-200 rounded-2xl text-left transition-colors cursor-pointer group shadow-2xs"
            >
              <div className="text-xs font-bold text-gray-900 truncate">
                {rt.from} <span className="text-[#FF6321]">→</span> {rt.to}
              </div>
              <div className="text-[10px] text-gray-500 font-semibold mt-1 flex items-center justify-between">
                <span>View Route</span>
                <ChevronRight className="w-3 h-3 text-gray-400 group-hover:text-[#FF6321] transition-transform group-hover:translate-x-0.5" />
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* 3. LIVE ROAD INTEL & FRESHNESS ALERTS */}
      <section className="bg-white border border-gray-100 rounded-3xl p-4 shadow-xs space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <h2 className="text-xs font-black uppercase tracking-wider text-[#1A1A1A]">
              Live Road Intel ({currentCity.name})
            </h2>
          </div>
          <button
            onClick={onOpenReportModal}
            className="text-[10px] text-[#FF6321] hover:underline font-bold uppercase tracking-wider flex items-center gap-0.5 cursor-pointer"
          >
            <Plus className="w-3 h-3" />
            <span>Report</span>
          </button>
        </div>

        {latestAlert ? (
          <div className="p-3.5 bg-orange-50/90 border border-orange-200 rounded-2xl flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black text-orange-900 uppercase">
                  {latestAlert.category} • {latestAlert.freshness}
                </span>
                <span className="text-[9px] text-orange-700 font-bold">
                  {latestAlert.timeAgo}
                </span>
              </div>
              <div className="text-xs font-bold text-gray-900 mt-0.5">{latestAlert.locationOrRoute}</div>
              <p className="text-xs text-orange-950 font-medium leading-tight mt-0.5">
                {latestAlert.text}
              </p>
            </div>
          </div>
        ) : (
          <div className="p-3 bg-green-50 border border-green-200 rounded-2xl flex items-center gap-2 text-xs text-green-800">
            <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
            <span className="font-semibold">Transit corridors flowing normally in {currentCity.name}.</span>
          </div>
        )}
      </section>

      {/* 4. QUICK FARE LOGGER PROMPT */}
      <section className="bg-gray-50 border border-gray-200 rounded-3xl p-3.5 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-green-100 text-green-800 flex items-center justify-center font-black text-sm">
            {currencySymbol}
          </div>
          <div>
            <div className="text-xs font-black text-[#1A1A1A]">Just paid for a trip?</div>
            <div className="text-[10px] text-gray-500 font-medium">
              Submit your fare to keep price ranges accurate.
            </div>
          </div>
        </div>

        <button
          onClick={onOpenQuickFareReport}
          className="px-3.5 py-2 bg-[#1A1A1A] hover:bg-gray-800 active:scale-95 text-white text-xs font-black rounded-xl uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap shadow-xs"
        >
          Log Fare
        </button>
      </section>
    </div>
  );
};
