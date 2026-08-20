import React, { useState } from 'react';
import { 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  TrendingUp, 
  MapPin, 
  Bus, 
  Radio, 
  X,
  Sparkles
} from 'lucide-react';
import { CommunityPost, ReportStatus, CityConfig, CountryConfig } from '../../types';

interface AdminDispatchModalProps {
  isOpen: boolean;
  onClose: () => void;
  posts: CommunityPost[];
  onUpdatePostStatus: (postId: string, newStatus: ReportStatus) => void;
  currentCity: CityConfig;
  currentCountry: CountryConfig;
}

export const AdminDispatchModal: React.FC<AdminDispatchModalProps> = ({
  isOpen,
  onClose,
  posts,
  onUpdatePostStatus,
  currentCity,
  currentCountry,
}) => {
  const [activeTab, setActiveTab] = useState<'incidents' | 'fares' | 'networks'>('incidents');

  if (!isOpen) return null;

  const incidents = posts.filter(
    (p) => p.category === 'Safety' || p.category === 'Road' || p.category === 'Traffic'
  );
  const fareReports = posts.filter((p) => p.category === 'Fare');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/70 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-md w-full h-[620px] flex flex-col shadow-2xl border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="p-4 bg-[#1A1A1A] text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-[#FF6321] text-white rounded-lg">
              <Radio className="w-4 h-4 animate-pulse" />
            </span>
            <div>
              <h3 className="text-xs font-black uppercase tracking-wider">Dispatch & Safety Console</h3>
              <p className="text-[10px] text-gray-400 font-medium">
                {currentCity.name}, {currentCountry.name} • Live Moderation
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white p-1 rounded-lg hover:bg-gray-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-gray-200 bg-gray-50 px-3 pt-2 gap-2 text-xs font-black uppercase shrink-0">
          <button
            onClick={() => setActiveTab('incidents')}
            className={`pb-2 px-2 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'incidents'
                ? 'border-[#FF6321] text-[#FF6321]'
                : 'border-transparent text-gray-400 hover:text-gray-700'
            }`}
          >
            Incidents ({incidents.length})
          </button>
          <button
            onClick={() => setActiveTab('fares')}
            className={`pb-2 px-2 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'fares'
                ? 'border-[#FF6321] text-[#FF6321]'
                : 'border-transparent text-gray-400 hover:text-gray-700'
            }`}
          >
            Fare Intel ({fareReports.length})
          </button>
          <button
            onClick={() => setActiveTab('networks')}
            className={`pb-2 px-2 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'networks'
                ? 'border-[#FF6321] text-[#FF6321]'
                : 'border-transparent text-gray-400 hover:text-gray-700'
            }`}
          >
            Networks ({currentCity.availableModes.length})
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-gray-50/50">
          {activeTab === 'incidents' && (
            <div className="space-y-2.5">
              {incidents.length === 0 ? (
                <div className="text-center py-12 text-gray-400 text-xs font-bold">
                  No active incidents pending moderation.
                </div>
              ) : (
                incidents.map((inc) => (
                  <div
                    key={inc.id}
                    className="p-3 bg-white rounded-2xl border border-gray-200 shadow-xs space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-red-100 text-red-700">
                        {inc.category} • {inc.freshness}
                      </span>
                      <span className="text-[9px] font-bold text-gray-400">{inc.timeAgo}</span>
                    </div>

                    <div className="text-xs font-bold text-gray-900">{inc.locationOrRoute}</div>
                    <p className="text-xs text-gray-700 font-medium">{inc.text}</p>

                    <div className="flex items-center justify-between pt-1 border-t border-gray-100 text-[10px] font-bold text-gray-500">
                      <span>
                        ⭐ {inc.stars} useful • ✓ {inc.confirms} confirmed
                      </span>

                      <div className="flex gap-1.5">
                        <button
                          onClick={() => onUpdatePostStatus(inc.id, 'VERIFIED')}
                          className="px-2 py-1 bg-green-600 hover:bg-green-700 text-white rounded-lg flex items-center gap-1 cursor-pointer"
                        >
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Verify</span>
                        </button>
                        <button
                          onClick={() => onUpdatePostStatus(inc.id, 'DISMISSED')}
                          className="px-2 py-1 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg flex items-center gap-1 cursor-pointer"
                        >
                          <XCircle className="w-3 h-3" />
                          <span>Dismiss</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'fares' && (
            <div className="space-y-2">
              {fareReports.map((fr) => (
                <div key={fr.id} className="p-3 bg-white rounded-2xl border border-gray-200 shadow-xs flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-gray-900">{fr.locationOrRoute}</div>
                    <div className="text-[10px] text-gray-500 font-medium">
                      Mode: {fr.transportMode || 'Danfo'} • {fr.timeAgo}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-black text-green-700">
                      {fr.currencySymbol}{fr.fareAmount?.toLocaleString()}
                    </span>
                    <span className="block text-[9px] text-gray-400 font-bold">
                      ✓ {fr.confirms} verified
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'networks' && (
            <div className="p-3 bg-white rounded-2xl border border-gray-200 shadow-xs space-y-3">
              <h4 className="text-xs font-black uppercase text-gray-900">
                Configured Transport Nodes for {currentCity.name}
              </h4>
              <div className="space-y-1.5 text-xs text-gray-700">
                <div className="font-bold text-[11px] text-gray-500 uppercase">Available Modes:</div>
                <div className="flex flex-wrap gap-1">
                  {currentCity.availableModes.map((mode) => (
                    <span key={mode} className="px-2 py-1 bg-orange-50 border border-orange-200 rounded-lg font-bold text-orange-900 text-[10px]">
                      {mode}
                    </span>
                  ))}
                </div>

                <div className="font-bold text-[11px] text-gray-500 uppercase pt-2">Major Transit Hubs:</div>
                <div className="grid grid-cols-2 gap-1">
                  {currentCity.popularJunctions.map((j) => (
                    <span key={j} className="p-1.5 bg-gray-50 border border-gray-200 rounded-lg text-[10px] font-semibold text-gray-800">
                      📍 {j}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
