import React, { useState } from 'react';
import { CheckCircle2, ThumbsUp, ThumbsDown, Banknote, Sparkles, X } from 'lucide-react';
import { CountryConfig } from '../../types';

interface PostTripFeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitFeedback: (data: {
    origin: string;
    destination: string;
    fareEstimateAccurate: boolean;
    directionsUseful: boolean;
    actualFarePaid?: number;
    mode: string;
  }) => void;
  origin: string;
  destination: string;
  expectedFareMin: number;
  expectedFareMax: number;
  mode: string;
  currentCountry: CountryConfig;
}

export const PostTripFeedbackModal: React.FC<PostTripFeedbackModalProps> = ({
  isOpen,
  onClose,
  onSubmitFeedback,
  origin,
  destination,
  expectedFareMin,
  expectedFareMax,
  mode,
  currentCountry,
}) => {
  const [fareAccurate, setFareAccurate] = useState<boolean | null>(true);
  const [directionsUseful, setDirectionsUseful] = useState<boolean | null>(true);
  const [actualFare, setActualFare] = useState(expectedFareMin.toString());
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const currencySymbol = currentCountry.currencySymbol;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const paid = actualFare ? parseInt(actualFare.replace(/[^0-9]/g, ''), 10) : undefined;
    onSubmitFeedback({
      origin,
      destination,
      fareEstimateAccurate: !!fareAccurate,
      directionsUseful: !!directionsUseful,
      actualFarePaid: paid,
      mode,
    });
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-3xl p-5 max-w-sm w-full shadow-2xl border border-gray-100 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-green-100 text-green-700 rounded-xl">
              <CheckCircle2 className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-sm font-black uppercase text-gray-900">Journey Completed!</h3>
              <p className="text-[10px] text-gray-500 font-medium">{origin} → {destination}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {submitted ? (
          <div className="py-6 text-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-green-100 text-green-700 flex items-center justify-center mx-auto text-xl">
              🌟
            </div>
            <h4 className="text-sm font-black text-gray-900">Thank you, Scout!</h4>
            <p className="text-xs text-gray-500 font-medium">
              Your feedback refines fare intelligence for the next commuter.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3.5">
            {/* Question 1: Were fare estimates accurate? */}
            <div className="p-3 bg-gray-50 rounded-2xl border border-gray-200/80 space-y-2">
              <div className="flex justify-between items-center text-xs font-bold text-gray-800">
                <span>Were the fare estimates accurate?</span>
                <span className="text-[10px] text-[#FF6321] font-extrabold">
                  {currencySymbol}{expectedFareMin}–{currencySymbol}{expectedFareMax}
                </span>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setFareAccurate(true)}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold border flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
                    fareAccurate === true
                      ? 'bg-green-600 text-white border-green-600 shadow-xs'
                      : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                  <span>Yes, Accurate</span>
                </button>
                <button
                  type="button"
                  onClick={() => setFareAccurate(false)}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold border flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
                    fareAccurate === false
                      ? 'bg-red-600 text-white border-red-600 shadow-xs'
                      : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <ThumbsDown className="w-3.5 h-3.5" />
                  <span>No, Different</span>
                </button>
              </div>
            </div>

            {/* Actual Fare Paid input */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider block">
                How much did you actually pay?
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-3 font-black text-gray-400 text-sm">{currencySymbol}</span>
                <input
                  type="number"
                  value={actualFare}
                  onChange={(e) => setActualFare(e.target.value)}
                  placeholder="500"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-8 pr-3 py-2.5 text-sm font-black text-gray-900 focus:outline-none focus:border-[#FF6321] focus:bg-white transition-all"
                  required
                />
              </div>
            </div>

            {/* Submit Action */}
            <button
              type="submit"
              className="w-full py-3 bg-[#FF6321] hover:bg-[#e05417] text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-md shadow-orange-200 cursor-pointer active:scale-98 transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Submit & Earn Badges</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
