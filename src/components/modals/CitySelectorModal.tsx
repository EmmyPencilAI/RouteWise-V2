import React from 'react';
import { X, MapPin, Check } from 'lucide-react';
import { CityConfig } from '../../types';

interface CitySelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  cities: CityConfig[];
  selectedCityId: string;
  onSelectCity: (city: CityConfig) => void;
}

export const CitySelectorModal: React.FC<CitySelectorModalProps> = ({
  isOpen,
  onClose,
  cities,
  selectedCityId,
  onSelectCity,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#1A1A1A]/70 backdrop-blur-xs flex items-center justify-center p-3">
      <div className="bg-white w-full max-w-sm rounded-2xl shadow-xl border border-gray-100 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="p-4 bg-white border-b border-gray-100 flex items-center justify-between">
          <div className="font-black text-xs text-[#1A1A1A] uppercase tracking-wider flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-[#FF6321]" />
            <span>Select Transit City</span>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-900 cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-3.5 max-h-96 overflow-y-auto space-y-1.5">
          <p className="text-xs text-gray-500 mb-2 font-medium">
            Select your city to get local transport terms (Danfo, Keke, Along, Micra) and accurate fares.
          </p>

          {cities.map((city) => {
            const isSelected = city.id === selectedCityId;
            return (
              <button
                key={city.id}
                onClick={() => {
                  onSelectCity(city);
                  onClose();
                }}
                className={`w-full p-3 rounded-xl border text-left flex items-center justify-between transition-colors cursor-pointer ${
                  isSelected
                    ? 'bg-orange-50 border-[#FF6321] text-orange-950 font-bold'
                    : 'bg-gray-50 border-gray-200 text-gray-800 hover:bg-gray-100'
                }`}
              >
                <div>
                  <div className="text-xs font-bold">{city.name}</div>
                  <div className="text-[10px] text-gray-400 font-medium">{city.state}</div>
                </div>

                {isSelected && (
                  <Check className="w-4 h-4 text-[#FF6321] stroke-[3px]" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
