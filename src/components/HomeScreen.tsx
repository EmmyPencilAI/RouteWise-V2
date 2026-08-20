import React, { useState } from 'react';
import { 
  Search, 
  MapPin, 
  ArrowRight, 
  Banknote, 
  AlertTriangle, 
  Bookmark, 
  Clock, 
  Navigation,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { CityConfig, CommunityPost } from '../types';

interface HomeScreenProps {
  currentCity: CityConfig;
  savedRoutes: { id: string; from: string; to: string; label: string }[];
  onSelectRoute: (from: string, to: string) => void;
  onOpenReportModal: () => void;
  onOpenQuickFareModal: () => void;
  communityAlerts: CommunityPost[];
  onViewAlert: (alert: CommunityPost) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  currentCity,
  savedRoutes,
  onSelectRoute,
  onOpenReportModal,
  onOpenQuickFareModal,
  communityAlerts,
  onViewAlert,
}) => {
  const [fromInput, setFromInput] = useState('Current location');
  const [toInput, setToInput] = useState('');
  const [showFromEdit, setShowFromEdit] = useState(false);
  const [isLocating, setIsLocating] = useState(false);

  const handleUseMyLocation = () => {
    setIsLocating(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        () => {
          setIsLocating(false);
          setFromInput('Current location (GPS verified)');
          setShowFromEdit(false);
        },
        () => {
          setIsLocating(false);
          setFromInput('Current location');
          setShowFromEdit(false);
        },
        { timeout: 5000 }
      );
    } else {
      setIsLocating(false);
      setFromInput('Current location');
    }
  };

  const handleSubmitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!toInput.trim()) return;
    const resolvedFrom = fromInput.includes('Current') ? (currentCity.popularJunctions[0] || 'Ojota') : fromInput;
    onSelectRoute(resolvedFrom, toInput.trim());
  };

  const handleQuickJunctionSelect = (junction: string) => {
    setToInput(junction);
    const resolvedFrom = fromInput.includes('Current') ? (currentCity.popularJunctions[0] || 'Ojota') : fromInput;
    onSelectRoute(resolvedFrom, junction);
  };

  // 2-3 important top alerts only
  const topAlerts = communityAlerts.slice(0, 3);

  return (
    <div className="space-y-4 pb-4">
      {/* High Density Search & Planner Card */}
      <section className="bg-white border border-gray-100 rounded-2xl p-4 shadow-xs">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] uppercase tracking-widest text-[#FF6321] font-black flex items-center gap-1">
            <Sparkles className="w-3 h-3" /> Quick Journey Planner
          </span>
          <span className="text-[10px] text-gray-400 font-bold uppercase">{currentCity.name}</span>
        </div>

        <h1 className="text-xl font-black text-[#1A1A1A] mb-3 tracking-tight">
          Where are you going?
        </h1>

        <form onSubmit={handleSubmitSearch} className="space-y-2.5">
          {/* FROM input field */}
          <div className="relative">
            <div className="flex items-center bg-gray-50 rounded-xl px-3 py-2 border border-gray-200 focus-within:border-[#FF6321] transition-colors">
              <div className="w-2.5 h-2.5 rounded-full border-2 border-[#FF6321] bg-white mr-2.5 shrink-0" />
              {showFromEdit ? (
                <input
                  id="from-location-input"
                  type="text"
                  value={fromInput}
                  onChange={(e) => setFromInput(e.target.value)}
                  placeholder="Starting junction..."
                  className="bg-transparent text-xs font-semibold text-[#1A1A1A] placeholder-gray-400 w-full focus:outline-none"
                  autoFocus
                />
              ) : (
                <div className="flex items-center justify-between w-full">
                  <span className="text-xs text-gray-600 truncate font-medium">
                    FROM: <strong className="text-[#1A1A1A] font-bold">{fromInput}</strong>
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowFromEdit(true)}
                    className="text-[10px] text-[#FF6321] hover:underline font-bold uppercase ml-2 shrink-0 cursor-pointer"
                  >
                    Change
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* TO input field */}
          <div className="relative">
            <div className="flex items-center bg-gray-50 rounded-xl px-3 py-2.5 border border-gray-200 focus-within:border-[#FF6321] transition-colors">
              <div className="w-2.5 h-2.5 rounded-full bg-[#FF6321] mr-2.5 shrink-0" />
              <input
                id="destination-search-input"
                type="text"
                value={toInput}
                onChange={(e) => setToInput(e.target.value)}
                placeholder="Search destination (e.g. Yaba, Lekki, Wuse)..."
                className="bg-transparent text-xs font-bold text-[#1A1A1A] placeholder-gray-400 w-full focus:outline-none"
              />
              {toInput && (
                <button
                  type="button"
                  onClick={() => setToInput('')}
                  className="text-gray-400 hover:text-gray-600 text-xs px-1 font-bold"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Action Row: Location Button + Search Button */}
          <div className="flex items-center gap-2 pt-0.5">
            <button
              type="button"
              id="use-my-location-btn"
              onClick={handleUseMyLocation}
              disabled={isLocating}
              className="flex-1 py-2.5 px-3 bg-gray-50 hover:bg-gray-100 active:scale-98 text-gray-700 text-xs font-bold rounded-xl border border-gray-200 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <Navigation className={`w-3.5 h-3.5 text-[#FF6321] ${isLocating ? 'animate-spin' : ''}`} />
              <span className="text-[11px] uppercase tracking-wider">{isLocating ? 'Locating...' : 'Use My GPS'}</span>
            </button>

            <button
              type="submit"
              id="find-route-btn"
              disabled={!toInput.trim()}
              className={`py-2.5 px-4 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                toInput.trim()
                  ? 'bg-[#FF6321] hover:bg-[#e05417] active:scale-98 text-white shadow-md shadow-orange-100'
                  : 'bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed'
              }`}
            >
              <span>Find Route</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </form>

        {/* Quick popular landmarks chips in current city */}
        <div className="mt-3.5 pt-3 border-t border-gray-100">
          <div className="text-[10px] text-gray-400 mb-1.5 font-bold uppercase tracking-widest">
            Popular Junctions:
          </div>
          <div className="flex flex-wrap gap-1.5">
            {currentCity.popularJunctions.slice(0, 5).map((junction) => (
              <button
                key={junction}
                onClick={() => handleQuickJunctionSelect(junction)}
                className="px-2.5 py-1 bg-gray-50 hover:bg-gray-100 active:bg-orange-50 active:border-[#FF6321] text-gray-800 text-xs font-bold rounded-lg border border-gray-200 transition-colors cursor-pointer"
              >
                {junction}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Action Buttons (Check Fare & Report) */}
      <section className="grid grid-cols-2 gap-2.5">
        <button
          id="quick-check-fare-btn"
          onClick={onOpenQuickFareModal}
          className="p-3.5 bg-white border border-gray-100 rounded-2xl hover:border-[#FF6321] active:scale-98 transition-all flex items-center gap-3 text-left shadow-xs cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-orange-50 text-[#FF6321] flex items-center justify-center shrink-0 border border-orange-100">
            <Banknote className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-[#1A1A1A] leading-tight">Check Fare</div>
            <div className="text-[10px] text-gray-400 font-medium leading-tight mt-0.5">Report or check ₦</div>
          </div>
        </button>

        <button
          id="quick-report-btn"
          onClick={onOpenReportModal}
          className="p-3.5 bg-white border border-gray-100 rounded-2xl hover:border-[#FF6321] active:scale-98 transition-all flex items-center gap-3 text-left shadow-xs cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-gray-50 text-gray-800 flex items-center justify-center shrink-0 border border-gray-200">
            <AlertTriangle className="w-5 h-5 text-amber-500" />
          </div>
          <div>
            <div className="text-xs font-bold text-[#1A1A1A] leading-tight">Quick Report</div>
            <div className="text-[10px] text-gray-400 font-medium leading-tight mt-0.5">Traffic or incident</div>
          </div>
        </button>
      </section>

      {/* RECENT / SAVED ROUTES */}
      <section className="bg-white border border-gray-100 rounded-2xl p-4 shadow-xs">
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-1.5 text-xs font-black text-[#1A1A1A] uppercase tracking-wider">
            <Bookmark className="w-3.5 h-3.5 text-[#FF6321]" />
            <span>Saved Routes</span>
          </div>
          <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">1-Tap Plan</span>
        </div>

        <div className="space-y-2">
          {savedRoutes.map((route) => (
            <button
              key={route.id}
              onClick={() => onSelectRoute(route.from, route.to)}
              className="w-full p-2.5 bg-gray-50 hover:bg-orange-50/50 hover:border-orange-200 border border-gray-200 rounded-xl flex items-center justify-between text-left transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-2 min-w-0">
                <span className="text-[10px] font-bold text-gray-700 bg-white px-2 py-0.5 rounded border border-gray-200 shrink-0 uppercase">
                  {route.label}
                </span>
                <span className="text-xs text-gray-900 font-bold truncate">
                  {route.from} <span className="text-[#FF6321] font-black">→</span> {route.to}
                </span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#FF6321] transition-colors shrink-0 ml-1" />
            </button>
          ))}
        </div>
      </section>

      {/* WHAT'S HAPPENING? (Top Alerts) */}
      <section className="bg-white border border-gray-100 rounded-2xl p-4 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5 text-xs font-black text-[#1A1A1A] uppercase tracking-wider">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
            <span>Live Commuter Alerts</span>
          </div>
          <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">On Ground</span>
        </div>

        <div className="space-y-2">
          {topAlerts.length > 0 ? (
            topAlerts.map((alert) => (
              <div
                key={alert.id}
                onClick={() => onViewAlert(alert)}
                className={`p-3 rounded-xl border text-left cursor-pointer transition-colors ${
                  alert.category === 'Safety'
                    ? 'bg-red-50/60 border-red-100 hover:bg-red-50'
                    : alert.category === 'Traffic'
                    ? 'bg-orange-50/60 border-orange-100 hover:bg-orange-50'
                    : 'bg-gray-50 border-gray-200 hover:bg-orange-50/40'
                }`}
              >
                <div className="flex items-center justify-between gap-1 mb-1">
                  <div className="flex items-center gap-1.5">
                    {alert.category === 'Fare' && (
                      <span className="px-1.5 py-0.2 bg-green-50 text-green-700 text-[9px] font-black uppercase rounded border border-green-200">
                        💰 Fare
                      </span>
                    )}
                    {alert.category === 'Traffic' && (
                      <span className="px-1.5 py-0.2 bg-orange-50 text-orange-800 text-[9px] font-black uppercase rounded border border-orange-200">
                        🚦 Traffic
                      </span>
                    )}
                    {alert.category === 'Safety' && (
                      <span className="px-1.5 py-0.2 bg-red-50 text-red-700 text-[9px] font-black uppercase rounded border border-red-200">
                        ⚠️ Safety
                      </span>
                    )}
                    {alert.category === 'Transport' && (
                      <span className="px-1.5 py-0.2 bg-blue-50 text-blue-800 text-[9px] font-black uppercase rounded border border-blue-200">
                        🚌 Transit
                      </span>
                    )}
                    <span className="text-xs font-bold text-gray-900 truncate">
                      {alert.locationOrRoute}
                    </span>
                  </div>
                  <span className="text-[10px] text-gray-400 shrink-0 flex items-center gap-0.5 font-semibold">
                    <Clock className="w-2.5 h-2.5" />
                    {alert.timeAgo}
                  </span>
                </div>

                <p className="text-xs text-gray-700 leading-snug line-clamp-2">
                  {alert.text}
                </p>

                {alert.fareAmount && (
                  <div className="mt-1 text-xs font-bold text-green-700">
                    Reported Fare: ₦{alert.fareAmount.toLocaleString()}
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="py-3 text-center text-xs text-gray-500 flex items-center justify-center gap-1">
              <CheckCircle2 className="w-4 h-4 text-green-600" />
              <span>No disruptions reported right now.</span>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
