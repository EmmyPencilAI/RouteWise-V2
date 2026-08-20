import React from 'react';
import { ShieldAlert, WifiOff, Zap, MapPin } from 'lucide-react';
import { CityConfig, CountryConfig } from '../types';

interface HeaderProps {
  currentCity: CityConfig;
  currentCountry: CountryConfig;
  onOpenCitySelector: () => void;
  isOffline: boolean;
  isDataSaver: boolean;
  onToggleDataSaver: () => void;
  onTriggerSOS: () => void;
  lastUpdatedTime: string;
}

export const Header: React.FC<HeaderProps> = ({
  currentCity,
  currentCountry,
  onOpenCitySelector,
  isOffline,
  isDataSaver,
  onToggleDataSaver,
  onTriggerSOS,
  lastUpdatedTime,
}) => {
  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-20 px-4 py-3 flex items-center justify-between shadow-xs">
      {/* Brand & City selector */}
      <div className="flex items-center gap-2">
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className="font-black text-lg tracking-tight text-[#1A1A1A]">
              Route<span className="text-[#FF6321]">Wise</span>
            </span>
            <button
              id="city-selector-btn"
              onClick={onOpenCitySelector}
              className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-gray-50 hover:bg-gray-100 text-[#1A1A1A] text-xs font-bold rounded-full border border-gray-200 transition-colors cursor-pointer"
              title="Change country or city"
            >
              <span className="text-xs">{currentCountry.flag}</span>
              <span className="truncate max-w-[110px]">{currentCity.name}</span>
            </button>
          </div>
          {isOffline ? (
            <span className="text-[10px] text-amber-600 font-bold flex items-center gap-1 uppercase tracking-tight">
              <WifiOff className="w-2.5 h-2.5" /> Cached • {lastUpdatedTime}
            </span>
          ) : (
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
              Transit Intel • {currentCountry.name}
            </span>
          )}
        </div>
      </div>

      {/* Right status & emergency actions */}
      <div className="flex items-center gap-2">
        {/* Data Saver toggle button */}
        <button
          id="data-saver-toggle-header"
          onClick={onToggleDataSaver}
          className={`px-2.5 py-1 text-xs font-bold rounded-full flex items-center gap-1 border transition-colors cursor-pointer ${
            isDataSaver
              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
              : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
          }`}
          title={isDataSaver ? 'Data Saver is ON (Low bandwidth)' : 'Turn on Data Saver'}
        >
          <Zap className={`w-3 h-3 ${isDataSaver ? 'text-emerald-600 fill-emerald-600' : 'text-gray-400'}`} />
          <span className="text-[10px] uppercase font-bold hidden sm:inline">{isDataSaver ? 'Low-Data' : 'Data Saver'}</span>
        </button>

        {/* SOS Button */}
        <button
          id="sos-header-btn"
          onClick={onTriggerSOS}
          className="bg-red-50 hover:bg-red-100 active:scale-95 text-red-600 font-bold text-xs px-3 py-1 rounded-full border border-red-100 transition-all flex items-center gap-1 cursor-pointer"
          title="Emergency SOS"
        >
          <ShieldAlert className="w-3.5 h-3.5 text-red-600" />
          <span>SOS</span>
        </button>
      </div>
    </header>
  );
};
