import React, { useState } from 'react';
import { Compass, Banknote, ShieldAlert, ArrowRight, Check } from 'lucide-react';

interface OnboardingModalProps {
  isOpen: boolean;
  onComplete: () => void;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({
  isOpen,
  onComplete,
}) => {
  const [step, setStep] = useState(1);

  if (!isOpen) return null;

  const slides = [
    {
      stepNumber: 1,
      title: 'Know your route.',
      desc: 'Step-by-step local transit guide across Nigerian and African cities: Keke, Danfo, Along, BRT, Micra, Tro Tro, and where to board opposite landmarks.',
      icon: Compass,
      color: 'text-orange-500 bg-orange-100',
    },
    {
      stepNumber: 2,
      title: 'Know your fare.',
      desc: 'Expected fare ranges powered by real everyday commuter submissions. Never get overcharged by conductors or surge pricing.',
      icon: Banknote,
      color: 'text-emerald-600 bg-emerald-100',
    },
    {
      stepNumber: 3,
      title: 'Stay informed.',
      desc: 'Live road disruptions, traffic standstills, and safety alerts reported by fellow commuters on ground.',
      icon: ShieldAlert,
      color: 'text-amber-600 bg-amber-100',
    },
  ];

  const currentSlide = slides[step - 1];
  const Icon = currentSlide.icon;

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      onComplete();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#1A1A1A]/80 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-xs rounded-3xl shadow-2xl border border-gray-100 p-6 text-center space-y-4 animate-in fade-in zoom-in-95 duration-150">
        {/* Step indicator dots */}
        <div className="flex items-center justify-center gap-1.5 mb-2">
          {[1, 2, 3].map((i) => (
            <span
              key={i}
              className={`h-1.5 rounded-full transition-all ${
                i === step ? 'w-6 bg-[#FF6321]' : 'w-1.5 bg-gray-200'
              }`}
            />
          ))}
        </div>

        {/* Icon */}
        <div className={`w-16 h-16 rounded-2xl mx-auto flex items-center justify-center ${currentSlide.color}`}>
          <Icon className="w-8 h-8" />
        </div>

        {/* Text */}
        <div className="space-y-1.5">
          <h2 className="text-lg font-black text-[#1A1A1A] tracking-tight">
            {currentSlide.title}
          </h2>
          <p className="text-xs text-gray-500 font-medium leading-relaxed px-1">
            {currentSlide.desc}
          </p>
        </div>

        {/* Next / Start Button */}
        <div className="pt-2">
          <button
            onClick={handleNext}
            className="w-full py-3 bg-[#FF6321] hover:bg-[#e05417] active:scale-98 text-white font-black text-xs uppercase tracking-wider rounded-2xl shadow-md shadow-orange-100 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
          >
            <span>{step === 3 ? 'Start Commuting' : 'Next'}</span>
            {step === 3 ? <Check className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
};
