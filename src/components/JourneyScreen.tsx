import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Clock, 
  Banknote, 
  AlertTriangle, 
  CheckCircle2, 
  ShieldAlert, 
  Check, 
  Share2, 
  Play, 
  Square,
  Info,
  Edit3,
  Bookmark,
  Sparkles
} from 'lucide-react';
import { RouteOption, RouteStep, TransportMode } from '../types';

interface JourneyScreenProps {
  route: RouteOption | null;
  onBackToHome: () => void;
  onChangeRoute: (from: string, to: string) => void;
  onOpenQuickFareReport: (routeLabel: string, currentMode?: string) => void;
  onTriggerSOS: () => void;
  onSaveRoute: (from: string, to: string) => void;
  isSaved?: boolean;
}

const MODE_ICON_MAP: Record<string, string> = {
  Danfo: '🚐',
  Keke: '🛺',
  BRT: '🚌',
  Okada: '🏍️',
  Taxi: '🚕',
  Along: '🚗',
  Micra: '🚘',
  Coaster: '🚍',
  Ferry: '⛴️',
  'A Daidaita Sahu': '🛺',
  'Tro Tro': '🚐',
  'Shared Taxi': '🚗',
  Matatu: '🚐',
  'Boda Boda': '🏍️',
  'Tuk Tuk': '🛺',
  'Coaster Bus': '🚍',
  Moto: '🏍️',
  Walk: '🚶',
};

export const JourneyScreen: React.FC<JourneyScreenProps> = ({
  route,
  onBackToHome,
  onChangeRoute,
  onOpenQuickFareReport,
  onTriggerSOS,
  onSaveRoute,
  isSaved = false,
}) => {
  const [activeStepIndex, setActiveStepIndex] = useState<number | null>(null);
  const [isLiveTravelling, setIsLiveTravelling] = useState(false);
  const [showEditInputs, setShowEditInputs] = useState(false);
  const [fromEdit, setFromEdit] = useState(route?.from || 'Ojota');
  const [toEdit, setToEdit] = useState(route?.to || 'Yaba');
  const [copiedShare, setCopiedShare] = useState(false);

  if (!route) {
    return (
      <div className="bg-white rounded-2xl p-6 border border-gray-200 text-center space-y-3">
        <h2 className="text-base font-bold text-[#1A1A1A]">No Journey Selected</h2>
        <p className="text-xs text-gray-500">
          Enter your destination from the Home screen to view the recommended local route.
        </p>
        <button
          onClick={onBackToHome}
          className="px-4 py-2 bg-[#FF6321] hover:bg-[#e05417] text-white text-xs font-bold rounded-xl cursor-pointer"
        >
          Go to Search
        </button>
      </div>
    );
  }

  const currencySymbol = route.currencySymbol || '₦';

  const handleStartJourney = () => {
    setIsLiveTravelling(true);
    setActiveStepIndex(0);
  };

  const handleNextStep = () => {
    if (activeStepIndex !== null && activeStepIndex < route.steps.length - 1) {
      setActiveStepIndex(activeStepIndex + 1);
    } else {
      // Completed trip
      setIsLiveTravelling(false);
      setActiveStepIndex(null);
      // Prompt quick fare submit
      onOpenQuickFareReport(`${route.from} → ${route.to}`, route.steps[0]?.mode);
    }
  };

  const handleStopJourney = () => {
    setIsLiveTravelling(false);
    setActiveStepIndex(null);
  };

  const handleApplyEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!toEdit.trim()) return;
    onChangeRoute(fromEdit.trim(), toEdit.trim());
    setShowEditInputs(false);
  };

  const handleShareJourney = () => {
    const shareText = `RouteWise Journey: ${route.from} → ${route.to}\nExpected Fare: ${currencySymbol}${route.fareMin.toLocaleString()} - ${currencySymbol}${route.fareMax.toLocaleString()}\nEst. Time: ${route.totalMinutesMin}-${route.totalMinutesMax} mins\nTransfers: ${route.transfersCount}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareText);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2500);
    }
  };

  const currentActiveStep = activeStepIndex !== null ? route.steps[activeStepIndex] : null;

  return (
    <div className="space-y-4 pb-6">
      {/* High Density Journey Header Bar */}
      <header className="flex items-center justify-between py-1">
        <div className="flex items-center gap-2.5">
          <button
            onClick={onBackToHome}
            className="p-1.5 -ml-1 text-gray-700 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
            title="Back to planner"
          >
            <ArrowLeft className="w-5 h-5 stroke-[2.5px]" />
          </button>
          <h1 className="text-xl font-bold tracking-tight text-[#1A1A1A]">Journey</h1>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onSaveRoute(route.from, route.to)}
            className={`px-2.5 py-1 rounded-full text-xs font-bold border transition-colors cursor-pointer flex items-center gap-1 ${
              isSaved
                ? 'bg-[#FF6321] text-white border-[#FF6321]'
                : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
            }`}
            title={isSaved ? 'Route saved' : 'Save route'}
          >
            <Bookmark className="w-3 h-3" />
            <span className="text-[10px] uppercase">{isSaved ? 'Saved' : 'Save'}</span>
          </button>

          <button
            onClick={handleShareJourney}
            className="px-2.5 py-1 bg-gray-50 hover:bg-gray-100 text-gray-700 text-xs font-bold rounded-full border border-gray-200 flex items-center gap-1 transition-colors cursor-pointer"
            title="Share journey details"
          >
            <Share2 className="w-3 h-3" />
            <span className="text-[10px] uppercase">{copiedShare ? 'Copied' : 'Share'}</span>
          </button>

          <button
            onClick={onTriggerSOS}
            className="bg-red-50 hover:bg-red-100 text-red-600 font-bold text-xs px-3 py-1 rounded-full border border-red-100 transition-colors flex items-center gap-1 cursor-pointer"
            title="Emergency SOS"
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>SOS</span>
          </button>
        </div>
      </header>

      {/* High Density Origin & Destination Card */}
      <section className="p-4 bg-white border border-gray-100 rounded-2xl shadow-xs">
        {/* Origin / Destination Visual Connector */}
        <div className="flex items-center gap-3 mb-3.5">
          <div className="flex flex-col items-center gap-1 py-1">
            <div className="w-3 h-3 rounded-full border-2 border-[#FF6321] bg-white"></div>
            <div className="w-0.5 h-7 bg-gray-200"></div>
            <div className="w-3 h-3 rounded-full bg-[#FF6321]"></div>
          </div>

          <div className="flex-1 flex flex-col gap-2">
            {showEditInputs ? (
              <form onSubmit={handleApplyEdit} className="space-y-1.5">
                <input
                  type="text"
                  value={fromEdit}
                  onChange={(e) => setFromEdit(e.target.value)}
                  placeholder="Starting junction"
                  className="bg-gray-50 border border-gray-200 rounded-lg p-2 text-xs font-semibold text-gray-900 w-full focus:outline-none focus:border-[#FF6321]"
                />
                <input
                  type="text"
                  value={toEdit}
                  onChange={(e) => setToEdit(e.target.value)}
                  placeholder="Destination"
                  className="bg-gray-50 border border-gray-200 rounded-lg p-2 text-xs font-bold text-gray-900 w-full focus:outline-none focus:border-[#FF6321]"
                />
                <div className="flex gap-2 pt-1">
                  <button
                    type="submit"
                    className="px-3 py-1 bg-[#FF6321] text-white text-xs font-bold rounded-lg"
                  >
                    Update
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowEditInputs(false)}
                    className="px-3 py-1 bg-gray-200 text-gray-700 text-xs font-bold rounded-lg"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <>
                <div className="bg-gray-50 px-3 py-2 rounded-lg border border-gray-100 text-xs font-semibold text-gray-700 flex items-center justify-between">
                  <span>{route.from}</span>
                  <button
                    onClick={() => setShowEditInputs(true)}
                    className="text-gray-400 hover:text-gray-600 p-0.5 cursor-pointer"
                    title="Edit route"
                  >
                    <Edit3 className="w-3 h-3" />
                  </button>
                </div>
                <div className="bg-gray-50 px-3 py-2 rounded-lg border border-gray-100 text-xs font-black text-gray-900">
                  {route.to}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Route Metrics Row */}
        <div className="flex justify-between items-end pt-3 border-t border-gray-100">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-0.5">
              Recommended Route
            </span>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-black text-[#1A1A1A]">
                {route.totalMinutesMin}–{route.totalMinutesMax} min
              </span>
              <span className="text-green-600 bg-green-50 px-2 py-0.5 rounded text-[10px] font-bold uppercase border border-green-100">
                Balanced
              </span>
            </div>
            <span className="text-[10px] text-gray-400 font-medium mt-0.5">
              {route.transfersCount} {route.transfersCount === 1 ? 'transfer' : 'transfers'}
            </span>
          </div>

          <div className="text-right">
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block mb-0.5">
              Expected Fare
            </span>
            <span className="text-xl font-black text-[#FF6321] block tracking-tight">
              {currencySymbol}{route.fareMin.toLocaleString()}–{currencySymbol}{route.fareMax.toLocaleString()}
            </span>
            <div className="flex items-center justify-end gap-1 mt-0.5">
              <span className="text-[10px] text-green-600 font-bold">
                ✓ {route.confidence}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* LIVE GUIDANCE ACTIVE BANNER */}
      {isLiveTravelling && currentActiveStep && (
        <section className="bg-[#FF6321] text-white rounded-2xl p-4 shadow-lg shadow-orange-100 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black uppercase tracking-wider bg-black/20 px-2.5 py-0.5 rounded-full">
              LIVE STEP {activeStepIndex! + 1} OF {route.steps.length}
            </span>
            <button
              onClick={handleStopJourney}
              className="text-xs text-orange-100 hover:text-white flex items-center gap-1 font-bold underline cursor-pointer"
            >
              <Square className="w-3 h-3" /> Stop
            </button>
          </div>

          <div>
            <div className="text-[10px] uppercase font-bold text-orange-200 tracking-wider">CURRENT ACTION:</div>
            <div className="text-base font-black leading-tight mt-0.5">
              Board {currentActiveStep.mode} at {currentActiveStep.boardLandmark}
            </div>
            <div className="text-xs text-orange-100 mt-1 flex items-center gap-2">
              <span>Alight: <strong>{currentActiveStep.dropLandmark}</strong></span>
              <span>•</span>
              <span>{currencySymbol}{currentActiveStep.fareMin}–{currencySymbol}{currentActiveStep.fareMax}</span>
            </div>
          </div>

          {currentActiveStep.advice && (
            <div className="bg-black/15 p-2 rounded-lg text-xs text-orange-100 border border-white/10">
              💡 {currentActiveStep.advice}
            </div>
          )}

          <div className="flex items-center gap-2 pt-1">
            <button
              onClick={handleNextStep}
              className="flex-1 py-3 px-4 bg-white hover:bg-gray-50 active:scale-98 text-[#FF6321] text-xs font-black rounded-xl shadow-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer uppercase tracking-wider"
            >
              <Check className="w-4 h-4 stroke-[3px]" />
              <span>
                {activeStepIndex! < route.steps.length - 1
                  ? `Next Step (${route.steps[activeStepIndex! + 1].mode})`
                  : 'Finish Journey & Log Fare'}
              </span>
            </button>
          </div>
        </section>
      )}

      {/* STEP-BY-STEP TRANSIT TIMELINE */}
      <section className="bg-white border border-gray-100 rounded-2xl p-4 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-gray-100 pb-2.5">
          <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">
            Transit Legs ({route.steps.length})
          </span>
          <button
            onClick={() => onOpenQuickFareReport(`${route.from} → ${route.to}`, route.steps[0]?.mode)}
            className="text-[10px] text-[#FF6321] hover:underline font-bold uppercase tracking-wider cursor-pointer"
          >
            I paid {currencySymbol}____
          </button>
        </div>

        <div className="space-y-0">
          {route.steps.map((step, index) => {
            const icon = MODE_ICON_MAP[step.mode] || '🚐';
            const isStepActive = isLiveTravelling && activeStepIndex === index;
            const isLastStep = index === route.steps.length - 1;

            return (
              <div key={step.id} className="flex gap-3.5">
                {/* Step Number Circle + Vertical Dashed Connector */}
                <div className="flex flex-col items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shrink-0 transition-colors ${
                      isStepActive
                        ? 'bg-[#FF6321] text-white shadow-sm'
                        : 'bg-gray-100 text-gray-900 border border-gray-200'
                    }`}
                  >
                    {step.stepNumber}
                  </div>
                  {!isLastStep && (
                    <div className="w-px flex-1 border-l-2 border-dashed border-gray-200 my-1 min-h-[44px]" />
                  )}
                </div>

                {/* Step Details */}
                <div className={`flex-1 ${isLastStep ? 'pb-1' : 'pb-4'}`}>
                  <div className="flex justify-between items-start mb-1">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-gray-900 text-sm">
                        {icon} {step.mode}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500 font-bold">
                      {currencySymbol}{step.fareMin}–{currencySymbol}{step.fareMax}
                    </span>
                  </div>

                  <p className="text-sm text-gray-700 font-medium leading-snug">
                    {step.from} → {step.to}
                  </p>

                  <p className="text-xs text-gray-400 mt-1 italic font-medium">
                    Board: {step.boardLandmark}
                  </p>

                  <p className="text-xs text-gray-500 font-medium mt-0.5">
                    Alight: {step.dropLandmark}
                  </p>

                  {step.advice && (
                    <div className="mt-1.5 p-2 bg-gray-50 rounded-lg text-[11px] text-gray-600 border border-gray-100 flex items-start gap-1">
                      <Info className="w-3 h-3 text-gray-400 shrink-0 mt-0.5" />
                      <span>{step.advice}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Route Alert */}
        {route.routeAlert ? (
          <div className="mt-4 p-4 bg-orange-50 border border-orange-100 rounded-xl flex items-start gap-3">
            <div className="w-5 h-5 mt-0.5 text-[#FF6321] shrink-0">
              <AlertTriangle className="w-5 h-5 stroke-[2.5px]" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-orange-800 uppercase tracking-wide">
                Route Alert
              </h4>
              <p className="text-xs text-orange-700 leading-tight mt-1">
                {route.routeAlert.message}
              </p>
              <div className="text-[10px] text-orange-600 pt-1 font-semibold">
                Reported {route.routeAlert.timeAgo} • {route.routeAlert.confirmedCount} confirms
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-3 p-3 bg-green-50/70 border border-green-100 rounded-xl flex items-center gap-2 text-xs text-green-800">
            <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
            <span className="font-medium">No major disruptions reported on this route.</span>
          </div>
        )}
      </section>

      {/* START JOURNEY PRIMARY ACTION */}
      {!isLiveTravelling && (
        <div className="pt-1">
          <button
            id="start-journey-btn"
            onClick={handleStartJourney}
            className="w-full bg-[#FF6321] hover:bg-[#e05417] active:scale-98 text-white font-black py-4 rounded-2xl shadow-lg shadow-orange-200 text-base uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>Start Journey</span>
          </button>
        </div>
      )}
    </div>
  );
};
