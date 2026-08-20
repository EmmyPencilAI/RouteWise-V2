import React, { useState } from 'react';
import { X, Check } from 'lucide-react';
import { ReportCategory, CommunityPost, CityConfig, CountryConfig } from '../../types';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitReport: (report: Omit<CommunityPost, 'id' | 'timestamp' | 'stars' | 'confirms' | 'comments'>) => void;
  defaultLocation?: string;
  currentCity: CityConfig;
  currentCountry: CountryConfig;
}

export const ReportModal: React.FC<ReportModalProps> = ({
  isOpen,
  onClose,
  onSubmitReport,
  defaultLocation = '',
  currentCity,
  currentCountry,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ReportCategory | null>(null);
  const defaultLoc = defaultLocation || (currentCity.popularJunctions.length >= 2 ? `${currentCity.popularJunctions[0]} → ${currentCity.popularJunctions[1]}` : currentCity.name);
  const [location, setLocation] = useState(defaultLoc);
  const [fareAmount, setFareAmount] = useState('');
  const [transportMode, setTransportMode] = useState<string>(currentCity.availableModes[0] || 'Bus');
  const [description, setDescription] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  if (!isOpen) return null;

  const currencySymbol = currentCountry.currencySymbol;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCategory || !location.trim()) return;

    onSubmitReport({
      category: selectedCategory,
      countryId: currentCountry.id,
      city: currentCity.name,
      locationOrRoute: location.trim(),
      fareAmount: fareAmount ? Number(fareAmount) : undefined,
      currencySymbol: fareAmount ? currencySymbol : undefined,
      transportMode: selectedCategory === 'Fare' || selectedCategory === 'Transport' ? transportMode : undefined,
      text: description.trim() || `${selectedCategory} update at ${location}`,
      timeAgo: 'Just now',
      isAnonymous,
    });

    setSubmittedSuccess(true);
    setTimeout(() => {
      setSubmittedSuccess(false);
      setSelectedCategory(null);
      setDescription('');
      setFareAmount('');
      onClose();
    }, 1200);
  };

  const categories: { id: ReportCategory; label: string; icon: string; desc: string }[] = [
    { id: 'Fare', label: 'Fare', icon: '💰', desc: 'Price paid or hike' },
    { id: 'Traffic', label: 'Traffic', icon: '🚦', desc: 'Gridlock, standstill' },
    { id: 'Transport', label: 'Transport', icon: '🚌', desc: 'Queue & vehicle availability' },
    { id: 'Safety', label: 'Safety', icon: '⚠️', desc: 'Incident, calm or caution' },
    { id: 'Road', label: 'Road', icon: '🛣️', desc: 'Pothole, blockage' },
  ];

  const availableModes = currentCity.availableModes.length > 0 ? currentCity.availableModes : ['Bus', 'Taxi', 'Walk'];

  return (
    <div className="fixed inset-0 z-50 bg-[#1A1A1A]/70 backdrop-blur-xs flex items-center justify-center p-3">
      <div className="bg-white w-full max-w-sm rounded-2xl shadow-xl border border-gray-100 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="p-4 bg-white border-b border-gray-100 flex items-center justify-between">
          <div className="font-black text-sm tracking-tight text-[#1A1A1A] uppercase flex items-center gap-1.5">
            <span>📢 Quick Commuter Report ({currentCity.name})</span>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-900 p-1 cursor-pointer rounded-lg hover:bg-gray-100"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {submittedSuccess ? (
          <div className="p-8 text-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-green-50 text-green-600 border border-green-200 mx-auto flex items-center justify-center">
              <Check className="w-6 h-6 stroke-[3px]" />
            </div>
            <div className="text-base font-black text-[#1A1A1A]">
              ✓ Report Received!
            </div>
            <p className="text-xs text-gray-500 font-medium">
              Your live intel is helping fellow commuters in {currentCity.name} right now.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-4 space-y-3.5">
            {/* Step 1: Select Category */}
            {!selectedCategory ? (
              <div className="space-y-2.5">
                <div className="text-xs font-bold text-gray-800 uppercase tracking-wide">
                  What are you reporting?
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {categories.map((cat) => (
                    <button
                      type="button"
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className="p-3 bg-gray-50 hover:bg-orange-50 hover:border-[#FF6321] border border-gray-200 rounded-xl text-left transition-colors cursor-pointer"
                    >
                      <div className="text-lg">{cat.icon}</div>
                      <div className="text-xs font-black text-[#1A1A1A] mt-1">{cat.label}</div>
                      <div className="text-[10px] text-gray-400 font-medium">{cat.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              /* Step 2: Details based on selected category */
              <div className="space-y-3">
                <div className="flex items-center justify-between pb-1 border-b border-gray-100">
                  <span className="text-[10px] font-black text-[#FF6321] uppercase tracking-wider">
                    REPORTING: {selectedCategory}
                  </span>
                  <button
                    type="button"
                    onClick={() => setSelectedCategory(null)}
                    className="text-[10px] text-gray-400 hover:text-gray-800 uppercase font-bold cursor-pointer"
                  >
                    Change
                  </button>
                </div>

                {/* Location / Junction */}
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500 block mb-1">
                    Where in {currentCity.name}? (Junction or Route)
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder={`e.g. ${currentCity.popularJunctions[0] || 'Central Area'}`}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs font-bold text-[#1A1A1A] focus:outline-none focus:border-[#FF6321]"
                    required
                  />
                </div>

                {/* If Fare Category */}
                {selectedCategory === 'Fare' && (
                  <div className="space-y-2">
                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500 block mb-1">
                        Fare Paid ({currencySymbol})
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-2 text-xs font-bold text-gray-400">{currencySymbol}</span>
                        <input
                          type="number"
                          value={fareAmount}
                          onChange={(e) => setFareAmount(e.target.value)}
                          placeholder="500"
                          className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-8 pr-3 py-2 text-xs text-[#1A1A1A] font-black focus:outline-none focus:border-[#FF6321]"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500 block mb-1">
                        Transport Mode
                      </label>
                      <div className="flex flex-wrap gap-1.5">
                        {availableModes.map((mode) => (
                          <button
                            type="button"
                            key={mode}
                            onClick={() => setTransportMode(mode)}
                            className={`px-2.5 py-1 text-xs font-bold rounded-lg border transition-colors cursor-pointer ${
                              transportMode === mode
                                ? 'bg-[#FF6321] text-white border-[#FF6321]'
                                : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                            }`}
                          >
                            {mode}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Notes or description */}
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500 block mb-1">
                    Details / Note (Optional)
                  </label>
                  <textarea
                    rows={2}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder={
                      selectedCategory === 'Traffic'
                        ? 'e.g. Heavy traffic moving slowly towards bridge...'
                        : selectedCategory === 'Safety'
                        ? 'e.g. Area is well-lit, security checkpoint active...'
                        : 'Any useful tip for other commuters...'
                    }
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 text-xs text-gray-800 font-medium focus:outline-none focus:border-[#FF6321]"
                  />
                </div>

                {/* Anonymous toggle */}
                {selectedCategory === 'Safety' && (
                  <label className="flex items-center gap-2 text-xs text-gray-600 font-medium cursor-pointer pt-1">
                    <input
                      type="checkbox"
                      checked={isAnonymous}
                      onChange={(e) => setIsAnonymous(e.target.checked)}
                      className="rounded text-[#FF6321]"
                    />
                    <span>Submit anonymously</span>
                  </label>
                )}

                {/* Submit Action */}
                <button
                  type="submit"
                  className="w-full py-3 bg-[#FF6321] hover:bg-[#e05417] active:scale-98 text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-md shadow-orange-100 transition-colors cursor-pointer"
                >
                  Submit Report (Takes 5s)
                </button>
              </div>
            )}
          </form>
        )}
      </div>
    </div>
  );
};
