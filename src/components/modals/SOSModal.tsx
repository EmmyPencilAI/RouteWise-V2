import React, { useState } from 'react';
import { ShieldAlert, X, Phone, Share2, MapPin, CheckCircle, AlertTriangle, MessageCircle } from 'lucide-react';
import { EmergencyContact, CityConfig } from '../../types';

interface SOSModalProps {
  isOpen: boolean;
  onClose: () => void;
  emergencyContacts: EmergencyContact[];
  currentCity: CityConfig;
  currentRouteLabel?: string;
}

export const SOSModal: React.FC<SOSModalProps> = ({
  isOpen,
  onClose,
  emergencyContacts,
  currentCity,
  currentRouteLabel = 'Transit Journey',
}) => {
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [gpsLocation, setGpsLocation] = useState<string | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  if (!isOpen) return null;

  const handleSendSOS = () => {
    setIsConfirmed(true);
    setIsLocating(true);

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setIsLocating(false);
          setGpsLocation(`${pos.coords.latitude.toFixed(5)}, ${pos.coords.longitude.toFixed(5)}`);
        },
        () => {
          setIsLocating(false);
          setGpsLocation(`${currentCity.name} Transit Zone (Approximate)`);
        },
        { timeout: 4000 }
      );
    } else {
      setIsLocating(false);
      setGpsLocation(`${currentCity.name} Transit Zone`);
    }
  };

  const handleResetAndClose = () => {
    setIsConfirmed(false);
    onClose();
  };

  const emergencyMessage = `EMERGENCY ALERT from RouteWise:\nI am in transit on route: ${currentRouteLabel} (${currentCity.name}).\nLocation: ${gpsLocation || 'Location being captured'}.\nPlease check on me immediately or call emergency lines.`;

  const handleWhatsAppAlert = (phone: string) => {
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    const url = `https://wa.me/${cleanPhone.startsWith('0') ? '234' + cleanPhone.substring(1) : cleanPhone}?text=${encodeURIComponent(emergencyMessage)}`;
    window.open(url, '_blank');
  };

  const handleCopyAlertText = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(emergencyMessage);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#1A1A1A]/80 backdrop-blur-xs flex items-center justify-center p-3">
      <div className="bg-white w-full max-w-sm rounded-2xl shadow-2xl border border-gray-100 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {!isConfirmed ? (
          /* Confirmation Step */
          <div className="p-5 space-y-4 text-center">
            <div className="w-14 h-14 rounded-full bg-red-50 text-red-600 border border-red-200 mx-auto flex items-center justify-center animate-bounce">
              <ShieldAlert className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h2 className="text-base font-black text-[#1A1A1A] uppercase tracking-tight">
                Emergency Distress Alert
              </h2>
              <p className="text-xs text-gray-500 font-medium leading-relaxed">
                This will prepare emergency distress alerts with your current transit location for your trusted contacts and display Nigerian emergency dispatch numbers.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2.5 pt-2">
              <button
                type="button"
                onClick={handleResetAndClose}
                className="py-2.5 px-3 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold rounded-xl transition-colors cursor-pointer uppercase tracking-wider"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleSendSOS}
                className="py-2.5 px-3 bg-red-600 hover:bg-red-700 active:scale-95 text-white text-xs font-black rounded-xl shadow-md transition-all cursor-pointer uppercase tracking-wider"
              >
                Send SOS
              </button>
            </div>
          </div>
        ) : (
          /* Activated SOS Dispatch State */
          <div className="p-4 space-y-3.5">
            <div className="p-3 bg-red-600 text-white rounded-xl flex items-center justify-between shadow-xs">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 animate-pulse" />
                <span className="font-black text-xs uppercase tracking-wider">
                  Distress Mode Active
                </span>
              </div>
              <button onClick={handleResetAndClose} className="text-red-200 hover:text-white cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* GPS Location status */}
            <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 text-xs space-y-1">
              <div className="flex items-center justify-between text-gray-400 font-bold text-[10px] uppercase tracking-wider">
                <span>Location Status</span>
                <span>{isLocating ? 'Capturing GPS...' : 'Recorded Locally'}</span>
              </div>
              <div className="font-bold text-[#1A1A1A] flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-red-600 shrink-0" />
                <span className="truncate">{gpsLocation || 'Capturing coordinates...'}</span>
              </div>
            </div>

            {/* Configured Emergency Contacts */}
            <div className="space-y-1.5">
              <div className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                1-Tap Alert Trusted Contacts:
              </div>
              {emergencyContacts.length > 0 ? (
                emergencyContacts.map((contact) => (
                  <div
                    key={contact.id}
                    className="p-2.5 bg-gray-50 rounded-xl border border-gray-200 flex items-center justify-between text-xs"
                  >
                    <div>
                      <div className="font-bold text-gray-900">{contact.name} ({contact.relationship})</div>
                      <div className="text-[10px] text-gray-400 font-medium">{contact.phone}</div>
                    </div>
                    <div className="flex items-center gap-1">
                      <a
                        href={`tel:${contact.phone}`}
                        className="px-2 py-1 bg-[#1A1A1A] text-white rounded-lg text-[10px] font-bold flex items-center gap-1"
                      >
                        <Phone className="w-3 h-3" /> Call
                      </a>
                      <button
                        onClick={() => handleWhatsAppAlert(contact.phone)}
                        className="px-2 py-1 bg-green-600 text-white rounded-lg text-[10px] font-bold flex items-center gap-1 cursor-pointer"
                      >
                        <MessageCircle className="w-3 h-3" /> WhatsApp
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-[11px] text-amber-800 bg-amber-50 p-2.5 rounded-xl border border-amber-200 font-medium">
                  No personal contacts saved yet. You can add them in Profile.
                </div>
              )}
            </div>

            {/* Official Nigerian Emergency Dispatch Numbers */}
            <div className="space-y-1.5 pt-1">
              <div className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                Official Helplines:
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                {currentCity.emergencyNumbers.map((em) => (
                  <a
                    key={em.number}
                    href={`tel:${em.number}`}
                    className="p-2 bg-red-50 hover:bg-red-100 border border-red-200 rounded-xl text-center block transition-colors"
                  >
                    <div className="text-[10px] text-red-800 font-bold truncate uppercase">{em.label}</div>
                    <div className="text-sm font-black text-red-700">{em.number}</div>
                  </a>
                ))}
              </div>
            </div>

            {/* Copy Alert Button */}
            <button
              onClick={handleCopyAlertText}
              className="w-full py-2.5 bg-gray-50 hover:bg-gray-100 text-gray-800 text-xs font-bold rounded-xl border border-gray-200 flex items-center justify-center gap-1.5 cursor-pointer uppercase tracking-wider"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{copiedLink ? 'Distress Message Copied!' : 'Copy Distress Message'}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
