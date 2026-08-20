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
  Globe
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
      <section className="bg-white border border-gray-100 rounded-2xl p-4 shadow-xs space-y-3.5">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-[#FF6321] text-white font-black text-lg flex items-center justify-center shadow-xs shrink-0">
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

        {/* Active Transit Zone Badge with switch button */}
        <div className="p-2.5 bg-gray-50 rounded-xl border border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-base">{currentCountry.flag}</span>
            <div>
              <div className="text-xs font-bold text-gray-900">{currentCity.name}, {currentCity.state}</div>
              <div className="text-[10px] text-gray-400 font-medium">{currentCountry.name} • Currency: {currentCountry.currency} ({currentCountry.currencySymbol})</div>
            </div>
          </div>
          <button
            onClick={onOpenCitySelector}
            className="px-2.5 py-1 bg-white border border-gray-200 hover:border-[#FF6321] rounded-lg text-xs font-bold text-[#FF6321] cursor-pointer"
          >
            Switch
          </button>
        </div>

        {/* Contribution stats */}
        <div className="grid grid-cols-2 gap-2.5 pt-1">
          <div className="bg-gray-50 p-2.5 rounded-xl border border-gray-200 text-center">
            <div className="text-base font-black text-amber-500 flex items-center justify-center gap-1">
              <Star className="w-4 h-4 fill-amber-400" />
              <span>{userProfile.usefulContributions}</span>
            </div>
            <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mt-0.5">
              Useful Intel
            </div>
          </div>

          <div className="bg-gray-50 p-2.5 rounded-xl border border-gray-200 text-center">
            <div className="text-base font-black text-green-600 flex items-center justify-center gap-1">
              <Check className="w-4 h-4 stroke-[3px]" />
              <span>{userProfile.confirmedReports}</span>
            </div>
            <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mt-0.5">
              Confirmed Reports
            </div>
          </div>
        </div>

        {/* Badges */}
        <div>
          <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1.5">
            Community Badges
          </div>
          <div className="flex flex-wrap gap-1.5">
            {userProfile.badges.map((b) => (
              <span
                key={b.id}
                className="px-2.5 py-1 bg-gray-50 text-gray-800 border border-gray-200 text-xs font-bold rounded-lg flex items-center gap-1"
              >
                <span>{b.icon}</span>
                <span>{b.title}</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* EMERGENCY SOS CONTACTS SETUP */}
      <section className="bg-white border border-gray-100 rounded-2xl p-4 shadow-xs space-y-3">
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
          When you trigger SOS, RouteWise generates instant WhatsApp & SMS dispatch links with your live journey details and location.
        </p>

        {showAddContact && (
          <form onSubmit={handleAddEmergencyContact} className="p-3 bg-gray-50 rounded-xl border border-gray-200 space-y-2">
            <div className="text-xs font-bold text-gray-800">Add Trusted Contact</div>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                value={newContactName}
                onChange={(e) => setNewContactName(e.target.value)}
                placeholder="Name (e.g. Mum, Brother)"
                className="bg-white border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs text-gray-900 focus:outline-none focus:border-[#FF6321]"
                required
              />
              <input
                type="tel"
                value={newContactPhone}
                onChange={(e) => setNewContactPhone(e.target.value)}
                placeholder="Phone number"
                className="bg-white border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs text-gray-900 focus:outline-none focus:border-[#FF6321]"
                required
              />
            </div>
            <div className="flex items-center justify-between pt-1">
              <select
                value={newContactRel}
                onChange={(e) => setNewContactRel(e.target.value)}
                className="bg-white border border-gray-200 rounded-lg px-2 py-1 text-xs text-gray-700"
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
                  className="px-3 py-1 bg-[#1A1A1A] text-white rounded-lg text-xs font-bold cursor-pointer"
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
              className="p-2.5 bg-gray-50 rounded-xl border border-gray-200 flex items-center justify-between text-xs"
            >
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-red-50 text-red-600 border border-red-100 flex items-center justify-center font-bold text-xs">
                  <PhoneCall className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="font-bold text-gray-900">{contact.name} ({contact.relationship})</div>
                  <div className="text-[11px] text-gray-400 font-medium">{contact.phone}</div>
                </div>
              </div>

              <button
                onClick={() => handleDeleteEmergencyContact(contact.id)}
                className="text-gray-400 hover:text-red-600 p-1 cursor-pointer"
                title="Remove contact"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* SAVED ROUTES */}
      <section className="bg-white border border-gray-100 rounded-2xl p-4 shadow-xs space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs font-black text-[#1A1A1A] uppercase tracking-wider">
            <Bookmark className="w-4 h-4 text-[#FF6321]" />
            <span>Saved Routes</span>
          </div>
          <span className="text-[10px] text-gray-400 font-bold uppercase">{userProfile.savedRoutes.length} saved</span>
        </div>

        <div className="space-y-1.5">
          {userProfile.savedRoutes.map((rt) => (
            <div
              key={rt.id}
              className="p-2.5 bg-gray-50 rounded-xl border border-gray-200 flex items-center justify-between"
            >
              <button
                onClick={() => onSelectSavedRoute(rt.from, rt.to)}
                className="flex items-center gap-2 text-left flex-1 min-w-0 cursor-pointer"
              >
                <span className="px-2 py-0.5 bg-white border border-gray-200 text-[10px] font-bold text-gray-800 rounded uppercase">
                  {rt.label}
                </span>
                <span className="text-xs font-bold text-gray-800 truncate">
                  {rt.from} <span className="text-[#FF6321]">→</span> {rt.to}
                </span>
              </button>

              <button
                onClick={() => onDeleteSavedRoute(rt.id)}
                className="text-gray-400 hover:text-red-600 p-1 ml-2 cursor-pointer"
                title="Delete saved route"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* DATA & NETWORK PREFERENCES */}
      <section className="bg-white border border-gray-100 rounded-2xl p-4 shadow-xs space-y-3">
        <div className="text-xs font-black uppercase tracking-wider text-[#1A1A1A]">
          Data & Network Preferences
        </div>

        {/* Data Saver Toggle */}
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-200">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-green-50 text-green-700 border border-green-100 flex items-center justify-center">
              <Zap className="w-4 h-4 text-green-600" />
            </div>
            <div>
              <div className="text-xs font-bold text-gray-900">Low-Data Saver Mode</div>
              <div className="text-[10px] text-gray-400 font-medium">
                Optimized for slow internet & low-RAM Android phones
              </div>
            </div>
          </div>

          <button
            onClick={() => onUpdateUserProfile({ dataSaverMode: !userProfile.dataSaverMode })}
            className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
              userProfile.dataSaverMode ? 'bg-[#FF6321]' : 'bg-gray-300'
            }`}
          >
            <span
              className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${
                userProfile.dataSaverMode ? 'left-6' : 'left-1'
              }`}
            />
          </button>
        </div>

        {/* Offline Simulator */}
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-200">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gray-100 text-gray-800 border border-gray-200 flex items-center justify-center">
              {isOffline ? <WifiOff className="w-4 h-4 text-amber-600" /> : <Wifi className="w-4 h-4 text-gray-600" />}
            </div>
            <div>
              <div className="text-xs font-bold text-gray-900">Network Simulator</div>
              <div className="text-[10px] text-gray-400 font-medium">
                Status: {isOffline ? 'Offline (Using cached routes)' : 'Online (Live sync)'}
              </div>
            </div>
          </div>

          <button
            onClick={onToggleOfflineSimulator}
            className="px-2.5 py-1 text-xs font-bold rounded-lg border border-gray-200 bg-white hover:bg-gray-100 text-gray-800 cursor-pointer"
          >
            {isOffline ? 'Go Online' : 'Test Offline'}
          </button>
        </div>

        {/* Cache Sync */}
        <div className="flex items-center justify-between pt-1">
          <div className="text-xs text-gray-600 font-medium">
            Local transit cache: <strong className="text-gray-900">Active & Saved</strong>
          </div>
          <button
            onClick={handleManualSync}
            disabled={syncStatus === 'syncing'}
            className="text-xs text-[#FF6321] hover:underline font-bold flex items-center gap-1 cursor-pointer uppercase tracking-wider"
          >
            <RefreshCw className={`w-3 h-3 ${syncStatus === 'syncing' ? 'animate-spin' : ''}`} />
            <span>{syncStatus === 'synced' ? 'Synced!' : 'Sync Now'}</span>
          </button>
        </div>
      </section>

      {/* QUICK SETTINGS & HELP */}
      <section className="bg-white border border-gray-100 rounded-2xl p-2 shadow-xs space-y-1">
        <button
          onClick={onOpenCitySelector}
          className="w-full p-2.5 hover:bg-gray-50 rounded-xl flex items-center justify-between text-left transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-2.5">
            <MapPin className="w-4 h-4 text-[#FF6321]" />
            <span className="text-xs font-bold text-gray-800">Switch Country / City</span>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-400" />
        </button>

        <button
          onClick={onOpenOnboarding}
          className="w-full p-2.5 hover:bg-gray-50 rounded-xl flex items-center justify-between text-left transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-2.5">
            <HelpCircle className="w-4 h-4 text-blue-600" />
            <span className="text-xs font-bold text-gray-800">How RouteWise Works</span>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-400" />
        </button>
      </section>
    </div>
  );
};
