import React, { useState } from 'react';
import { 
  User, 
  Award, 
  Star, 
  Check, 
  Bookmark, 
  History, 
  Shield, 
  Zap, 
  Wifi, 
  WifiOff, 
  HelpCircle, 
  Plus, 
  Trash2, 
  PhoneCall, 
  RefreshCw,
  MapPin,
  ChevronRight,
  Sparkles,
  Smartphone,
  Radio,
  Lock
} from 'lucide-react';
import { UserProfile, EmergencyContact, CountryConfig, CityConfig } from '../types';

interface ProfileScreenProps {
  userProfile: UserProfile;
  currentCountry: CountryConfig;
  currentCity: CityConfig;
  onUpdateUserProfile: (updated: Partial<UserProfile>) => void;
  onSelectSavedRoute: (from: string, to: string) => void;
  onDeleteSavedRoute: (id: string) => void;
  onOpenOnboarding: () => void;
  onOpenCitySelector: () => void;
  onOpenPhoneAuth: () => void;
  onOpenAdminDispatch: () => void;
  isOffline: boolean;
  onToggleOfflineSimulator: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  userProfile,
  currentCountry,
  currentCity,
  onUpdateUserProfile,
  onSelectSavedRoute,
  onDeleteSavedRoute,
  onOpenOnboarding,
  onOpenCitySelector,
  onOpenPhoneAuth,
  onOpenAdminDispatch,
  isOffline,
  onToggleOfflineSimulator,
}) => {
  const [showAddContact, setShowAddContact] = useState(false);
  const [newContactName, setNewContactName] = useState('');
  const [newContactPhone, setNewContactPhone] = useState('');
  const [newContactRel, setNewContactRel] = useState('Family');
  const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing' | 'synced'>('idle');

  const currencySymbol = currentCountry.currencySymbol;

  const handleAddEmergencyContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newContactName.trim() || !newContactPhone.trim()) return;

    const newContact: EmergencyContact = {
      id: `contact-${Date.now()}`,
      name: newContactName.trim(),
      phone: newContactPhone.trim(),
      relationship: newContactRel,
    };

    onUpdateUserProfile({
      emergencyContacts: [...userProfile.emergencyContacts, newContact],
    });

    setNewContactName('');
    setNewContactPhone('');
    setShowAddContact(false);
  };

  const handleDeleteEmergencyContact = (id: string) => {
    onUpdateUserProfile({
      emergencyContacts: userProfile.emergencyContacts.filter((c) => c.id !== id),
    });
  };

  const handleManualSync = () => {
    setSyncStatus('syncing');
    setTimeout(() => {
      setSyncStatus('synced');
      setTimeout(() => setSyncStatus('idle'), 2500);
    }, 800);
  };

  return (
    <div className="space-y-3.5 pb-8">
      {/* Profile Header Card */}
      <section className="bg-white border border-gray-100 rounded-3xl p-4 shadow-xs space-y-3.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#FF6321] text-white font-black text-lg flex items-center justify-center shadow-xs shrink-0">
              {userProfile.name.charAt(0).toUpperCase()}
            </div>

            <div className="min-w-0 flex-1">
              <h1 className="text-base font-black text-[#1A1A1A] truncate">
                {userProfile.name}
              </h1>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-[10px] text-[#FF6321] font-black uppercase tracking-wider flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> Level: {userProfile.levelTitle}
                </span>
              </div>
            </div>
          </div>

          {/* Phone Verification Status / Login Button */}
          {userProfile.isPhoneVerified ? (
            <div className="px-2.5 py-1 bg-green-50 text-green-700 border border-green-200 rounded-xl text-[10px] font-black uppercase tracking-wider flex items-center gap-1">
              <span>✓ Phone Verified</span>
            </div>
          ) : (
            <button
              onClick={onOpenPhoneAuth}
              className="px-3 py-1.5 bg-[#1A1A1A] hover:bg-gray-800 text-white rounded-xl text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Smartphone className="w-3 h-3 text-[#FF6321]" />
              <span>Verify Phone</span>
            </button>
          )}
        </div>

        {/* Active Transit Zone Badge with switch button */}
        <div className="p-3 bg-gray-50 rounded-2xl border border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">{currentCountry.flag}</span>
            <div>
              <div className="text-xs font-bold text-gray-900">{currentCity.name}, {currentCity.state}</div>
              <div className="text-[10px] text-gray-400 font-medium">
                {currentCountry.name} • Currency: {currentCountry.currency} ({currentCountry.currencySymbol})
              </div>
            </div>
          </div>
          <button
            onClick={onOpenCitySelector}
            className="px-2.5 py-1 bg-white border border-gray-200 hover:border-[#FF6321] rounded-xl text-xs font-bold text-[#FF6321] cursor-pointer shadow-2xs"
          >
            Switch
          </button>
        </div>

        {/* Contribution stats */}
        <div className="grid grid-cols-2 gap-2.5 pt-1">
          <div className="bg-gray-50 p-2.5 rounded-2xl border border-gray-200 text-center">
            <div className="text-base font-black text-amber-500 flex items-center justify-center gap-1">
              <Star className="w-4 h-4 fill-amber-400" />
              <span>{userProfile.usefulContributions}</span>
            </div>
            <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mt-0.5">
              Useful Intel
            </div>
          </div>

          <div className="bg-gray-50 p-2.5 rounded-2xl border border-gray-200 text-center">
            <div className="text-base font-black text-green-600 flex items-center justify-center gap-1">
              <Check className="w-4 h-4 stroke-[3px]" />
              <span>{userProfile.confirmedReports}</span>
            </div>
            <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mt-0.5">
              Confirmed Reports
            </div>
          </div>
        </div>

        {/* Community Badges */}
        <div>
          <div className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-1.5">
            Community Badges
          </div>
          <div className="flex flex-wrap gap-1.5">
            {userProfile.badges.map((b) => (
              <span
                key={b.id}
                className={`px-2.5 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 ${
                  b.unlocked
                    ? 'bg-orange-50/80 text-orange-950 border-orange-200 shadow-2xs'
                    : 'bg-gray-50 text-gray-400 border-gray-200 opacity-60'
                }`}
                title={b.description}
              >
                <span>{b.icon}</span>
                <span>{b.title}</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* DISPATCH / ADMIN INTELLIGENCE CONSOLE TRIGGER */}
      <section className="bg-[#1A1A1A] text-white rounded-3xl p-4 shadow-sm space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Radio className="w-4 h-4 text-[#FF6321] animate-pulse" />
            <span className="text-xs font-black uppercase tracking-wider">
              Dispatch & Operations Console
            </span>
          </div>
          <button
            onClick={onOpenAdminDispatch}
            className="px-3 py-1.5 bg-[#FF6321] hover:bg-[#e05417] text-white rounded-xl text-[10px] font-black uppercase tracking-wider cursor-pointer shadow-xs"
          >
            Open Console
          </button>
        </div>
        <p className="text-[11px] text-gray-400 font-medium">
          Moderate community incident reports, audit corridor fare predictions, and monitor transport mode nodes in real-time.
        </p>
      </section>

      {/* EMERGENCY SOS CONTACTS SETUP */}
      <section className="bg-white border border-gray-100 rounded-3xl p-4 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs font-black text-[#1A1A1A] uppercase tracking-wider">
            <Shield className="w-4 h-4 text-red-600" />
            <span>Emergency SOS Contacts</span>
          </div>

          <button
            onClick={() => setShowAddContact(!showAddContact)}
            className="text-xs text-[#FF6321] hover:underline font-bold flex items-center gap-1 cursor-pointer uppercase tracking-wider"
          >
            <Plus className="w-3 h-3" />
            <span>Add</span>
          </button>
        </div>

        <p className="text-[11px] text-gray-500 font-medium">
          When you trigger SOS, RouteWise generates instant WhatsApp & SMS dispatch links with your live journey details and GPS coordinates.
        </p>

        {showAddContact && (
          <form onSubmit={handleAddEmergencyContact} className="p-3 bg-gray-50 rounded-2xl border border-gray-200 space-y-2">
            <div className="text-xs font-bold text-gray-800">Add Trusted Contact</div>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                value={newContactName}
                onChange={(e) => setNewContactName(e.target.value)}
                placeholder="Name (e.g. Mum, Brother)"
                className="bg-white border border-gray-200 rounded-xl px-2.5 py-1.5 text-xs text-gray-900 focus:outline-none focus:border-[#FF6321]"
                required
              />
              <input
                type="tel"
                value={newContactPhone}
                onChange={(e) => setNewContactPhone(e.target.value)}
                placeholder="Phone number"
                className="bg-white border border-gray-200 rounded-xl px-2.5 py-1.5 text-xs text-gray-900 focus:outline-none focus:border-[#FF6321]"
                required
              />
            </div>
            <div className="flex items-center justify-between pt-1">
              <select
                value={newContactRel}
                onChange={(e) => setNewContactRel(e.target.value)}
                className="bg-white border border-gray-200 rounded-xl px-2 py-1 text-xs text-gray-700"
              >
                <option value="Family">Family</option>
                <option value="Friend">Friend</option>
                <option value="Colleague">Colleague</option>
                <option value="Other">Other</option>
              </select>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddContact(false)}
                  className="px-2.5 py-1 text-gray-500 text-xs font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3 py-1 bg-[#1A1A1A] text-white rounded-xl text-xs font-bold cursor-pointer"
                >
                  Save Contact
                </button>
              </div>
            </div>
          </form>
        )}

        <div className="space-y-2">
          {userProfile.emergencyContacts.map((contact) => (
            <div
              key={contact.id}
              className="p-3 bg-gray-50 rounded-2xl border border-gray-200 flex items-center justify-between text-xs"
            >
              <div>
                <div className="font-bold text-gray-900 flex items-center gap-1.5">
                  <span>{contact.name}</span>
                  <span className="text-[9px] px-1.5 py-0.2 bg-gray-200 text-gray-700 rounded-md">
                    {contact.relationship}
                  </span>
                </div>
                <div className="text-[10px] text-gray-500 font-mono mt-0.5">{contact.phone}</div>
              </div>
              <button
                onClick={() => handleDeleteEmergencyContact(contact.id)}
                className="p-1.5 text-gray-400 hover:text-red-600 rounded-lg hover:bg-gray-200/50 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* SAVED COMMUTE ROUTES */}
      <section className="bg-white border border-gray-100 rounded-3xl p-4 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs font-black text-[#1A1A1A] uppercase tracking-wider">
            <Bookmark className="w-4 h-4 text-[#FF6321]" />
            <span>Saved Routes ({userProfile.savedRoutes.length})</span>
          </div>
        </div>

        {userProfile.savedRoutes.length === 0 ? (
          <div className="text-center py-4 text-xs text-gray-400 font-medium">
            No saved routes yet. Tap bookmark on any route to save it for instant access.
          </div>
        ) : (
          <div className="space-y-2">
            {userProfile.savedRoutes.map((saved) => (
              <div
                key={saved.id}
                className="p-3 bg-gray-50 hover:bg-orange-50/50 rounded-2xl border border-gray-200 flex items-center justify-between transition-colors"
              >
                <button
                  onClick={() => onSelectSavedRoute(saved.from, saved.to)}
                  className="text-left flex-1 cursor-pointer"
                >
                  <div className="text-xs font-bold text-gray-900">
                    {saved.from} <span className="text-[#FF6321]">→</span> {saved.to}
                  </div>
                  <div className="text-[10px] text-gray-500 font-medium">{saved.label}</div>
                </button>

                <button
                  onClick={() => onDeleteSavedRoute(saved.id)}
                  className="p-1.5 text-gray-400 hover:text-red-600 rounded-lg hover:bg-gray-200/50 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* TRIP HISTORY & RECENT COMMUTES */}
      <section className="bg-white border border-gray-100 rounded-3xl p-4 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs font-black text-[#1A1A1A] uppercase tracking-wider">
            <History className="w-4 h-4 text-gray-700" />
            <span>Completed Commutes ({userProfile.tripHistory.length})</span>
          </div>
        </div>

        <div className="space-y-2">
          {userProfile.tripHistory.map((trip) => (
            <div
              key={trip.id}
              className="p-3 bg-gray-50 rounded-2xl border border-gray-200 flex items-center justify-between text-xs"
            >
              <div>
                <div className="font-bold text-gray-900">
                  {trip.from} → {trip.to}
                </div>
                <div className="text-[10px] text-gray-400 font-medium">
                  {trip.mode} • {trip.date}
                </div>
              </div>
              <div className="text-right">
                <div className="font-black text-green-700">
                  {trip.currencySymbol || currencySymbol}{trip.farePaid.toLocaleString()}
                </div>
                <div className="text-[9px] text-gray-400 font-semibold">
                  {trip.wasAccurate ? '✓ Accurate' : 'Logged'}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SYSTEM & DATA SETTINGS */}
      <section className="bg-white border border-gray-100 rounded-3xl p-4 shadow-xs space-y-3">
        <div className="text-xs font-black uppercase text-gray-900 tracking-wider">
          System & Low-Bandwidth Mode
        </div>

        <div className="space-y-2.5">
          {/* Data Saver Mode Toggle */}
          <div className="flex items-center justify-between p-2.5 bg-gray-50 rounded-2xl border border-gray-200">
            <div>
              <div className="text-xs font-bold text-gray-900">Data Saver Mode</div>
              <div className="text-[10px] text-gray-500 font-medium">
                Reduces image downloads and bandwidth usage.
              </div>
            </div>
            <button
              onClick={() =>
                onUpdateUserProfile({ dataSaverMode: !userProfile.dataSaverMode })
              }
              className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${
                userProfile.dataSaverMode ? 'bg-[#FF6321]' : 'bg-gray-300'
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                  userProfile.dataSaverMode ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Offline Mode Simulator Toggle */}
          <div className="flex items-center justify-between p-2.5 bg-gray-50 rounded-2xl border border-gray-200">
            <div className="flex items-center gap-2">
              {isOffline ? <WifiOff className="w-4 h-4 text-red-500" /> : <Wifi className="w-4 h-4 text-green-600" />}
              <div>
                <div className="text-xs font-bold text-gray-900">Offline Cache Simulation</div>
                <div className="text-[10px] text-gray-500 font-medium">
                  {isOffline ? 'Using local cached GIS database' : 'Online connected'}
                </div>
              </div>
            </div>
            <button
              onClick={onToggleOfflineSimulator}
              className={`px-2.5 py-1 text-xs font-bold rounded-xl border cursor-pointer ${
                isOffline ? 'bg-red-50 text-red-700 border-red-200' : 'bg-white text-gray-700 border-gray-200'
              }`}
            >
              {isOffline ? 'Go Online' : 'Simulate Offline'}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
