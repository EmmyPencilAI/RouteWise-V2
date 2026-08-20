import React, { useState } from 'react';
import { X, Check, Banknote } from 'lucide-react';
import { CommunityPost, CountryConfig, CityConfig } from '../../types';

interface QuickFareModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitFare: (report: Omit<CommunityPost, 'id' | 'timestamp' | 'stars' | 'confirms' | 'comments'>) => void;
  defaultRoute?: string;
  defaultMode?: string;
  currentCountry: CountryConfig;
  currentCity: CityConfig;
}

export const QuickFareModal: React.FC<QuickFareModalProps> = ({
  isOpen,
  onClose,
  onSubmitFare,
  defaultRoute = 'Ojota → Yaba',
  defaultMode,
  currentCountry,
  currentCity,
}) => {
  const availableModes = currentCity.availableModes.length > 0 ? currentCity.availableModes : ['Bus', 'Taxi', 'Walk'];
  const [fare, setFare] = useState('500');
  const [route, setRoute] = useState(defaultRoute);
  const [mode, setMode] = useState<string>(defaultMode || availableModes[0] || 'Bus');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const currencySymbol = currentCountry.currencySymbol;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fare.trim() || !route.trim()) return;

    onSubmitFare({
      category: 'Fare',
      countryId: currentCountry.id,
      city: currentCity.name,
      locationOrRoute: route.trim(),
      fareAmount: Number(fare),
      currencySymbol,
      transportMode: mode,
      text: `Paid ${currencySymbol}${Number(fare).toLocaleString()} via ${mode} in ${currentCity.name}.`,
      timeAgo: 'Just now',
    });

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#1A1A1A]/70 backdrop-blur-xs flex items-center justify-center p-3">
      <div className="bg-white w-full max-w-xs rounded-2xl shadow-xl border border-gray-100 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="p-3.5 bg-white border-b border-gray-100 flex items-center justify-between">
          <div className="font-black text-xs text-[#1A1A1A] uppercase tracking-wider flex items-center gap-1.5">
            <Banknote className="w-4 h-4 text-green-600" />
            <span>Quick Fare Report ({currentCity.name})</span>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-900 cursor-pointer p-1 rounded-lg">
            <X className="w-4 h-4" />
          </button>
        </div>

        {submitted ? (
          <div className="p-6 text-center space-y-2">
            <div className="w-10 h-10 rounded-full bg-green-50 text-green-600 border border-green-200 mx-auto flex items-center justify-center">
              <Check className="w-5 h-5 stroke-[3px]" />
            </div>
            <div className="text-sm font-black text-[#1A1A1A]">✓ Fare Submitted!</div>
            <p className="text-xs text-gray-500 font-medium">
              Your fare report keeps RouteWise accurate for commuters in {currentCity.name}.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-4 space-y-3">
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500 block mb-1">
                You Paid ({currencySymbol}):
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-sm font-black text-gray-400">{currencySymbol}</span>
                <input
                  type="number"
                  value={fare}
                  onChange={(e) => setFare(e.target.value)}
                  placeholder="500"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-8 pr-3 py-2 text-base font-black text-[#1A1A1A] focus:outline-none focus:border-[#FF6321]"
                  autoFocus
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500 block mb-1">
                Transport:
              </label>
              <div className="flex flex-wrap gap-1">
                {availableModes.map((m) => (
                  <button
                    type="button"
                    key={m}
                    onClick={() => setMode(m)}
                    className={`px-2 py-1 text-[11px] font-bold rounded-lg border transition-colors cursor-pointer ${
                      mode === m
                        ? 'bg-[#FF6321] text-white border-[#FF6321]'
                        : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500 block mb-1">
                Route:
              </label>
              <input
                type="text"
                value={route}
                onChange={(e) => setRoute(e.target.value)}
                placeholder="e.g. Ojota → Yaba"
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-2.5 py-1.5 text-xs text-[#1A1A1A] font-bold focus:outline-none focus:border-[#FF6321]"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-[#FF6321] hover:bg-[#e05417] active:scale-98 text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-md shadow-orange-100 transition-colors cursor-pointer"
            >
              Submit Fare
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
