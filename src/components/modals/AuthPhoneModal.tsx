import React, { useState } from 'react';
import { Smartphone, CheckCircle2, ShieldCheck, ArrowRight, X } from 'lucide-react';
import { CountryConfig } from '../../types';

interface AuthPhoneModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccessAuth: (phoneNumber: string, userId: string) => void;
  currentCountry: CountryConfig;
}

export const AuthPhoneModal: React.FC<AuthPhoneModalProps> = ({
  isOpen,
  onClose,
  onSuccessAuth,
  currentCountry,
}) => {
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phoneNumber, setPhoneNumber] = useState('08031234567');
  const [otp, setOtp] = useState('4821');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber.trim()) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep('otp');
    }, 600);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const generatedUserId = `usr_${Math.random().toString(36).substring(2, 10)}`;
      onSuccessAuth(phoneNumber, generatedUserId);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-3xl p-5 max-w-sm w-full shadow-2xl border border-gray-100 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="p-2 bg-orange-100 text-[#FF6321] rounded-2xl">
              <Smartphone className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-sm font-black uppercase text-gray-900">Commuter Sign In</h3>
              <p className="text-[10px] text-gray-500 font-medium">Quick Phone + OTP (Zero spam)</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {step === 'phone' ? (
          <form onSubmit={handleSendOtp} className="space-y-3">
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider block">
                Mobile Phone Number
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-3 text-xs font-bold text-gray-500">{currentCountry.flag}</span>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="080 1234 5678"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-9 pr-3 py-2.5 text-xs font-bold text-gray-900 focus:outline-none focus:border-[#FF6321] focus:bg-white"
                  required
                />
              </div>
            </div>

            <p className="text-[10px] text-gray-400 font-medium leading-relaxed">
              🔒 We never ask for address, DOB, or national ID. Your phone is only used to secure your saved routes and verified badge contributions.
            </p>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#FF6321] hover:bg-[#e05417] text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-md shadow-orange-100 cursor-pointer active:scale-98 transition-all flex items-center justify-center gap-2"
            >
              <span>{loading ? 'Sending OTP...' : 'Send 4-Digit Code'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-3">
            <div className="space-y-1 text-center">
              <span className="text-[11px] font-bold text-gray-700 uppercase tracking-wider block">
                Enter 4-Digit Code sent to {phoneNumber}
              </span>
              <input
                type="text"
                maxLength={4}
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-36 mx-auto tracking-widest text-center text-xl font-black bg-gray-50 border-2 border-[#FF6321] rounded-xl py-2 text-gray-900 focus:outline-none"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-md shadow-green-100 cursor-pointer active:scale-98 transition-all flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>{loading ? 'Verifying...' : 'Verify & Unlock Scout Badge'}</span>
            </button>

            <button
              type="button"
              onClick={() => setStep('phone')}
              className="w-full text-center text-[10px] font-bold text-gray-400 hover:text-gray-700 uppercase tracking-wider"
            >
              Change Phone Number
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
