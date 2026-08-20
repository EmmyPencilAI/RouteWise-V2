import React, { useState } from 'react';
import { X, MapPin, Check, Search, Globe } from 'lucide-react';
import { CountryConfig, CityConfig } from '../../types';
import { COUNTRIES_DATA } from '../../data/cities';

interface CitySelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCityId: string;
  selectedCountryId: string;
  onSelectCity: (city: CityConfig, country: CountryConfig) => void;
}

export const CitySelectorModal: React.FC<CitySelectorModalProps> = ({
  isOpen,
  onClose,
  selectedCityId,
  selectedCountryId,
  onSelectCity,
}) => {
  const [activeCountryTab, setActiveCountryTab] = useState<string>(selectedCountryId || 'nigeria');
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  const currentCountry = COUNTRIES_DATA.find((c) => c.id === activeCountryTab) || COUNTRIES_DATA[0];

  // Search filtering
  const filteredCities = currentCountry.cities.filter((city) => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return (
      city.name.toLowerCase().includes(query) ||
      city.state.toLowerCase().includes(query) ||
      city.popularJunctions.some((j) => j.toLowerCase().includes(query))
    );
  });

  return (
    <div className="fixed inset-0 z-50 bg-[#1A1A1A]/70 backdrop-blur-xs flex items-center justify-center p-3">
      <div className="bg-white w-full max-w-sm rounded-2xl shadow-xl border border-gray-100 overflow-hidden animate-in fade-in zoom-in-95 duration-150 flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="p-4 bg-white border-b border-gray-100 flex items-center justify-between shrink-0">
          <div className="font-black text-xs text-[#1A1A1A] uppercase tracking-wider flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-[#FF6321]" />
            <span>Select Transit Region</span>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-900 cursor-pointer p-1 rounded-lg">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Country Selector Tabs */}
        <div className="flex border-b border-gray-100 bg-gray-50 px-2 pt-2 gap-1 overflow-x-auto no-scrollbar shrink-0">
          {COUNTRIES_DATA.map((country) => {
            const isTabActive = country.id === activeCountryTab;
            return (
              <button
                key={country.id}
                onClick={() => {
                  setActiveCountryTab(country.id);
                  setSearchQuery('');
                }}
                className={`px-3 py-2 text-xs font-bold rounded-t-xl transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                  isTabActive
                    ? 'bg-white text-[#1A1A1A] border-t border-l border-r border-gray-200 -mb-[1px] shadow-xs'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                <span>{country.flag}</span>
                <span>{country.name}</span>
                <span className="text-[10px] text-gray-400">({country.cities.length})</span>
              </button>
            );
          })}
        </div>

        {/* Search Bar */}
        <div className="p-3 border-b border-gray-100 bg-white shrink-0">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`Search ${currentCountry.name} cities & junctions...`}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-9 pr-3 py-1.5 text-xs text-gray-900 font-medium focus:outline-none focus:border-[#FF6321]"
            />
          </div>
        </div>

        {/* City list */}
        <div className="p-3.5 overflow-y-auto space-y-1.5 flex-1">
          {filteredCities.length > 0 ? (
            filteredCities.map((city) => {
              const isSelected = city.id === selectedCityId;
              return (
                <button
                  key={city.id}
                  onClick={() => {
                    onSelectCity(city, currentCountry);
                    onClose();
                  }}
                  className={`w-full p-3 rounded-xl border text-left flex items-center justify-between transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-orange-50 border-[#FF6321] text-orange-950 font-bold'
                      : 'bg-gray-50 border-gray-200 text-gray-800 hover:bg-gray-100'
                  }`}
                >
                  <div className="min-w-0 flex-1 pr-2">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-gray-900">{city.name}</span>
                      <span className="text-[10px] bg-white border border-gray-200 text-gray-600 px-1.5 py-0.2 rounded font-semibold">
                        {city.state}
                      </span>
                    </div>
                    <div className="text-[10px] text-gray-400 font-medium truncate mt-0.5">
                      Modes: {city.availableModes.slice(0, 4).join(', ')} • {currentCountry.currency} ({currentCountry.currencySymbol})
                    </div>
                  </div>

                  {isSelected && (
                    <Check className="w-4 h-4 text-[#FF6321] stroke-[3px] shrink-0" />
                  )}
                </button>
              );
            })
          ) : (
            <div className="py-6 text-center text-xs text-gray-400">
              No cities found matching &ldquo;{searchQuery}&rdquo; in {currentCountry.name}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
