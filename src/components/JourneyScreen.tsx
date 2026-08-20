import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeft, 
  Banknote, 
  AlertTriangle, 
  CheckCircle2, 
  ShieldAlert, 
  Share2, 
  Play, 
  Square,
  Bookmark,
  Sparkles,
  Navigation,
  Compass,
  Repeat,
  Radio,
  Check
} from 'lucide-react';
import { RouteOption, RouteStep, GeoCoordinate, CommunityPost, CountryConfig } from '../types';
import { RealRoadMap } from './map/RealRoadMap';
import { PostTripFeedbackModal } from './modals/PostTripFeedbackModal';
import { riskIntelligenceService } from '../services/incidents/riskIntelligenceService';
import { routingProvider } from '../services/routing/osrmRoutingProvider';

interface JourneyScreenProps {
  route: RouteOption | null;
  onBackToHome: () => void;
  onChangeRoute: (from: string, to: string) => void;
  onOpenQuickFareReport: (routeLabel: string, currentMode?: string) => void;
  onTriggerSOS: () => void;
  onSaveRoute: (from: string, to: string) => void;
  isSaved?: boolean;
  communityPosts: CommunityPost[];
  currentCountry: CountryConfig;
  onSubmitTripFeedback: (feedback: any) => void;
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
  communityPosts,
  currentCountry,
  onSubmitTripFeedback,
}) => {
  const [activeStepIndex, setActiveStepIndex] = useState<number | null>(null);
  const [isLiveTravelling, setIsLiveTravelling] = useState(false);
  const [isSimulationMode, setIsSimulationMode] = useState(false);
  const [userLocation, setUserLocation] = useState<GeoCoordinate | null>(null);
  const [completedGeometry, setCompletedGeometry] = useState<GeoCoordinate[]>([]);
  const [copiedShare, setCopiedShare] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [isAlternativeActive, setIsAlternativeActive] = useState(false);
  const [dismissedRerouteAlert, setDismissedRerouteAlert] = useState(false);

  const simulationIntervalRef = useRef<any>(null);
  const simIndexRef = useRef<number>(0);

  if (!route) {
    return (
      <div className="bg-white rounded-2xl p-6 border border-gray-200 text-center space-y-3">
        <h2 className="text-base font-bold text-[#1A1A1A]">No Journey Selected</h2>
        <p className="text-xs text-gray-500">
          Enter your destination from the Home screen to view the recommended local road route.
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

  const currencySymbol = route.currencySymbol || currentCountry.currencySymbol || '₦';

  // Evaluate risk intelligence for current active route
  const currentRoadGeometry = isAlternativeActive && route.alternativeRoadGeometry
    ? route.alternativeRoadGeometry
    : route.roadGeometry;

  const riskAssessment = riskIntelligenceService.assessRouteRisk(
    { ...route, roadGeometry: currentRoadGeometry },
    communityPosts
  );

  const hasAlternativeAvailable = !!(route.alternativeRoadGeometry && route.alternativeRoadGeometry.length > 0);

  // Initialize user location at start of route
  useEffect(() => {
    if (currentRoadGeometry && currentRoadGeometry.length > 0) {
      setUserLocation(currentRoadGeometry[0]);
    }
  }, [route]);

  // Clean up simulation timer
  useEffect(() => {
    return () => {
      if (simulationIntervalRef.current) {
        clearInterval(simulationIntervalRef.current);
      }
    };
  }, []);

  // Handle start journey
  const handleStartJourney = (withSimulation: boolean = false) => {
    setIsLiveTravelling(true);
    setActiveStepIndex(0);
    simIndexRef.current = 0;
    setCompletedGeometry([]);

    if (withSimulation) {
      setIsSimulationMode(true);
      if (simulationIntervalRef.current) clearInterval(simulationIntervalRef.current);

      const path = currentRoadGeometry;
      if (!path || path.length === 0) return;

      simulationIntervalRef.current = setInterval(() => {
        simIndexRef.current += 1;
        if (simIndexRef.current >= path.length) {
          clearInterval(simulationIntervalRef.current);
          handleFinishTrip();
          return;
        }

        const nextCoord = path[simIndexRef.current];
        setUserLocation(nextCoord);
        setCompletedGeometry(path.slice(0, simIndexRef.current));

        // Advance active step index automatically based on progress along legs
        const totalPoints = path.length;
        const currentProgress = simIndexRef.current / totalPoints;
        const totalSteps = route.steps.length;
        const expectedStepIndex = Math.min(totalSteps - 1, Math.floor(currentProgress * totalSteps));
        setActiveStepIndex(expectedStepIndex);
      }, 1200);
    } else {
      // Real Geolocation Tracking
      setIsSimulationMode(false);
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            const snapped = routingProvider.matchLocationToRoad(
              pos.coords.latitude,
              pos.coords.longitude,
              currentRoadGeometry
            );
            setUserLocation(snapped.snappedCoordinate);
          },
          () => {
            // Geolocation fallback
            if (currentRoadGeometry.length > 0) setUserLocation(currentRoadGeometry[0]);
          }
        );
      }
    }
  };

  const handleStopJourney = () => {
    if (simulationIntervalRef.current) {
      clearInterval(simulationIntervalRef.current);
    }
    setIsLiveTravelling(false);
    setIsSimulationMode(false);
    setActiveStepIndex(null);
  };

  const handleFinishTrip = () => {
    handleStopJourney();
    setShowFeedbackModal(true);
  };

  const handleNextStep = () => {
    if (activeStepIndex !== null && activeStepIndex < route.steps.length - 1) {
      const nextIdx = activeStepIndex + 1;
      setActiveStepIndex(nextIdx);
      const nextStep = route.steps[nextIdx];
      if (nextStep && nextStep.startCoordinate) {
        setUserLocation(nextStep.startCoordinate);
      }
    } else {
      handleFinishTrip();
    }
  };

  const handleToggleAlternative = () => {
    setIsAlternativeActive((prev) => !prev);
    setDismissedRerouteAlert(true);
  };

  const handleRecenter = () => {
    if (userLocation) {
      // Trigger recenter
      setUserLocation([...userLocation]);
    }
  };

  const handleShare = async () => {
    const text = `RouteWise Journey: ${route.from} → ${route.to} via ${route.steps.map((s) => s.mode).join(' + ')}. Est. Fare: ${currencySymbol}${route.fareMin}–${currencySymbol}${route.fareMax}`;
    if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(text);
        setCopiedShare(true);
        setTimeout(() => setCopiedShare(false), 2000);
      } catch (e) {
        // clipboard fallback
      }
    }
  };

  const activeStep = activeStepIndex !== null ? route.steps[activeStepIndex] : null;
  const nextStep = activeStepIndex !== null && activeStepIndex < route.steps.length - 1 ? route.steps[activeStepIndex + 1] : null;

  return (
    <div className="space-y-3.5 pb-8">
      {/* Top Bar Navigation & Actions */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBackToHome}
          className="flex items-center gap-1.5 text-xs font-black text-gray-700 hover:text-gray-900 bg-white px-3 py-1.5 rounded-xl border border-gray-200 cursor-pointer active:scale-95 transition-all shadow-xs"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Search</span>
        </button>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => onSaveRoute(route.from, route.to)}
            className={`p-2 rounded-xl border transition-all cursor-pointer shadow-xs ${
              isSaved
                ? 'bg-orange-50 text-[#FF6321] border-orange-200'
                : 'bg-white text-gray-500 border-gray-200 hover:text-gray-900'
            }`}
            title="Save Route"
          >
            <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-[#FF6321]' : ''}`} />
          </button>

          <button
            onClick={handleShare}
            className="p-2 bg-white text-gray-500 hover:text-gray-900 rounded-xl border border-gray-200 cursor-pointer shadow-xs flex items-center gap-1 text-[11px] font-bold"
            title="Share Route"
          >
            {copiedShare ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Share2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Real Road Map View */}
      <RealRoadMap
        roadGeometry={currentRoadGeometry}
        completedGeometry={completedGeometry}
        userLocation={userLocation}
        steps={route.steps}
        activeStepIndex={activeStepIndex}
        incidents={communityPosts}
        isLiveTracking={isLiveTravelling}
        onRecenter={handleRecenter}
        onTriggerSOS={onTriggerSOS}
        onToggleAlternative={handleToggleAlternative}
        isAlternativeActive={isAlternativeActive}
        hasAlternativeAvailable={hasAlternativeAvailable}
      />

      {/* Proactive Risk & Safer Reroute Alert (if incident affects route) */}
      {riskAssessment.isRerouteRecommended && !dismissedRerouteAlert && (
        <div className="p-3.5 bg-red-50 border-2 border-red-300 rounded-2xl shadow-sm space-y-2 animate-in fade-in">
          <div className="flex items-start gap-2">
            <span className="p-1 bg-red-600 text-white rounded-lg shrink-0 mt-0.5">
              <AlertTriangle className="w-4 h-4" />
            </span>
            <div>
              <h4 className="text-xs font-black text-red-900 uppercase">
                Active Road Disruption Ahead
              </h4>
              <p className="text-xs text-red-800 font-medium leading-relaxed mt-0.5">
                {riskAssessment.reason || 'Incident reported along this corridor.'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-1">
            {hasAlternativeAvailable && (
              <button
                onClick={handleToggleAlternative}
                className="flex-1 py-2 bg-green-700 hover:bg-green-800 text-white text-[11px] font-black uppercase rounded-xl shadow-xs cursor-pointer active:scale-98 transition-all flex items-center justify-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{isAlternativeActive ? 'Revert to Standard' : 'Use Safer Route'}</span>
              </button>
            )}
            <button
              onClick={() => setDismissedRerouteAlert(true)}
              className="px-3 py-2 bg-white text-gray-700 border border-gray-200 text-[11px] font-bold rounded-xl hover:bg-gray-50 cursor-pointer"
            >
              Keep Route
            </button>
          </div>
        </div>
      )}

      {/* Active Live Journey Navigation HUD */}
      {isLiveTravelling && activeStep ? (
        <div className="p-4 bg-[#1A1A1A] text-white rounded-3xl shadow-xl space-y-3.5 border border-gray-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-wider text-gray-300">
                ACTIVE LEG {activeStep.stepNumber} of {route.steps.length}
              </span>
            </div>
            <div className="flex items-center gap-2">
              {isSimulationMode && (
                <span className="text-[9px] font-bold bg-[#FF6321] text-white px-2 py-0.5 rounded-full uppercase">
                  Simulation
                </span>
              )}
              <button
                onClick={handleStopJourney}
                className="p-1 text-gray-400 hover:text-white rounded-lg hover:bg-gray-800 cursor-pointer"
                title="Stop Journey"
              >
                <Square className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Current Step Focus */}
          <div className="space-y-1">
            <div className="text-[10px] font-bold uppercase text-[#FF6321] flex items-center gap-1.5">
              <span>{MODE_ICON_MAP[activeStep.mode] || '🚐'}</span>
              <span>{activeStep.mode} • WHERE YOU ARE GOING NOW</span>
            </div>
            <div className="text-base font-black text-white">
              {activeStep.from} → {activeStep.to}
            </div>
            <div className="text-xs text-gray-300 font-medium">
              Board at: <span className="font-bold text-white">{activeStep.boardLandmark}</span>
            </div>
          </div>

          {/* Leg Fare info strictly without travel time */}
          <div className="flex items-center justify-between p-2.5 bg-gray-900/90 rounded-2xl border border-gray-800">
            <div className="flex items-center gap-1.5 text-xs font-bold text-gray-300">
              <Banknote className="w-3.5 h-3.5 text-green-400" />
              <span>Fare for this leg:</span>
            </div>
            <span className="text-xs font-black text-green-400">
              {currencySymbol}{activeStep.fareMin}–{currencySymbol}{activeStep.fareMax}
            </span>
          </div>

          {/* Next Leg Preview (if any) */}
          {nextStep && (
            <div className="p-2.5 bg-gray-800/60 rounded-2xl border border-gray-700/60 flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5 text-gray-300">
                <Repeat className="w-3.5 h-3.5 text-[#FF6321]" />
                <span>Next transfer:</span>
                <span className="font-bold text-white">{nextStep.mode} to {nextStep.to}</span>
              </div>
              <span className="text-[10px] text-gray-400 font-bold">
                {currencySymbol}{nextStep.fareMin}–{currencySymbol}{nextStep.fareMax}
              </span>
            </div>
          )}

          {/* Step Action Buttons */}
          <div className="flex gap-2 pt-1">
            <button
              onClick={handleNextStep}
              className="flex-1 py-3 bg-[#FF6321] hover:bg-[#e05417] text-white font-black text-xs uppercase tracking-wider rounded-2xl shadow-md cursor-pointer active:scale-98 transition-all flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{activeStepIndex === route.steps.length - 1 ? 'Complete Journey' : 'Arrived at Next Hub'}</span>
            </button>
          </div>
        </div>
      ) : (
        /* Journey Summary Card (Before Starting) */
        <div className="p-4 bg-white rounded-3xl border border-gray-200 shadow-sm space-y-4">
          <div className="flex items-start justify-between">
            <div className="space-y-0.5">
              <div className="text-[10px] font-black uppercase text-[#FF6321] tracking-wider">
                Recommended Local Route
              </div>
              <h2 className="text-lg font-black text-gray-900 leading-tight">
                {route.from} → {route.to}
              </h2>
              <div className="text-[11px] text-gray-500 font-semibold">
                {route.transfersCount === 0 ? 'Direct Route' : `${route.transfersCount} Connection Transfer${route.transfersCount > 1 ? 's' : ''}`} • {route.confidence}
              </div>
            </div>

            {/* Total Fare Range Badge */}
            <div className="text-right">
              <div className="text-[10px] font-bold text-gray-400 uppercase">Total Estimated Fare</div>
              <div className="text-base font-black text-green-700">
                {currencySymbol}{route.fareMin}–{currencySymbol}{route.fareMax}
              </div>
            </div>
          </div>

          {/* Start Journey Controls */}
          <div className="flex flex-col sm:flex-row gap-2 pt-1">
            <button
              onClick={() => handleStartJourney(false)}
              className="flex-1 py-3.5 bg-[#FF6321] hover:bg-[#e05417] text-white font-black text-xs uppercase tracking-wider rounded-2xl shadow-md shadow-orange-100 cursor-pointer active:scale-98 transition-all flex items-center justify-center gap-2"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Start Journey</span>
            </button>

            <button
              onClick={() => handleStartJourney(true)}
              className="py-3.5 px-4 bg-gray-100 hover:bg-gray-200 text-gray-800 font-black text-xs uppercase tracking-wider rounded-2xl border border-gray-200 cursor-pointer active:scale-98 transition-all flex items-center justify-center gap-1.5"
              title="Simulate travel along the road"
            >
              <Radio className="w-4 h-4 text-[#FF6321]" />
              <span>Simulate Route</span>
            </button>
          </div>
        </div>
      )}

      {/* Transportation Legs Detail (Strictly NO travel times displayed per requirements) */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-xs font-black text-gray-900 uppercase tracking-wider">
            Transportation Legs ({route.steps.length})
          </h3>
          <span className="text-[10px] text-gray-500 font-bold">
            Total Fare: {currencySymbol}{route.fareMin}–{currencySymbol}{route.fareMax}
          </span>
        </div>

        <div className="space-y-2.5">
          {route.steps.map((step, index) => {
            const isCurrentLeg = activeStepIndex === index;
            const isCompleted = activeStepIndex !== null && activeStepIndex > index;

            return (
              <div
                key={step.id}
                className={`p-4 rounded-2xl border transition-all ${
                  isCurrentLeg
                    ? 'bg-orange-50/60 border-[#FF6321] shadow-xs'
                    : isCompleted
                    ? 'bg-gray-50/70 border-gray-200 opacity-60'
                    : 'bg-white border-gray-200 shadow-xs'
                }`}
              >
                {/* Leg Header: Transport Icon + Mode + Leg No. + Fare Range */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{MODE_ICON_MAP[step.mode] || '🚐'}</span>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-black text-gray-900">{step.mode}</span>
                        <span className="text-[9px] font-black uppercase px-1.5 py-0.2 rounded-md bg-gray-100 text-gray-600">
                          Leg {step.stepNumber}
                        </span>
                      </div>
                      <div className="text-xs font-bold text-gray-700">
                        {step.from} → {step.to}
                      </div>
                    </div>
                  </div>

                  {/* Leg Estimated Fare (NO travel time) */}
                  <div className="text-right">
                    <span className="text-xs font-black text-green-700 bg-green-50 px-2 py-1 rounded-xl border border-green-200">
                      {currencySymbol}{step.fareMin}–{currencySymbol}{step.fareMax}
                    </span>
                  </div>
                </div>

                {/* Boarding and Drop Landmarks */}
                <div className="mt-3 pt-2.5 border-t border-gray-100 grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                  <div className="space-y-0.5">
                    <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider block">
                      🟢 Boarding Landmark:
                    </span>
                    <span className="font-extrabold text-gray-800">{step.boardLandmark}</span>
                  </div>

                  <div className="space-y-0.5">
                    <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider block">
                      🏁 Drop Landmark:
                    </span>
                    <span className="font-extrabold text-gray-800">{step.dropLandmark}</span>
                  </div>
                </div>

                {/* Practical Advice */}
                {step.advice && (
                  <div className="mt-2.5 p-2 bg-gray-50 rounded-xl border border-gray-200/60 text-[10px] text-gray-600 font-medium flex items-center gap-1.5">
                    <span className="text-xs">💡</span>
                    <span>{step.advice}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Action Footer: Log Fare report & SOS button */}
      <div className="flex gap-2 pt-2">
        <button
          onClick={() => onOpenQuickFareReport(`${route.from} → ${route.to}`, route.steps[0]?.mode)}
          className="flex-1 py-3 bg-white hover:bg-gray-50 text-gray-800 border border-gray-200 rounded-2xl text-xs font-black uppercase tracking-wider shadow-xs cursor-pointer active:scale-98 transition-all flex items-center justify-center gap-1.5"
        >
          <Banknote className="w-3.5 h-3.5 text-[#FF6321]" />
          <span>Log Actual Fare</span>
        </button>

        <button
          onClick={onTriggerSOS}
          className="py-3 px-4 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 rounded-2xl text-xs font-black uppercase tracking-wider shadow-xs cursor-pointer active:scale-98 transition-all flex items-center justify-center gap-1.5"
        >
          <ShieldAlert className="w-3.5 h-3.5 text-red-600" />
          <span>Emergency SOS</span>
        </button>
      </div>

      {/* Post-Trip Feedback Modal */}
      <PostTripFeedbackModal
        isOpen={showFeedbackModal}
        onClose={() => setShowFeedbackModal(false)}
        onSubmitFeedback={(feedback) => {
          onSubmitTripFeedback(feedback);
          setShowFeedbackModal(false);
        }}
        origin={route.from}
        destination={route.to}
        expectedFareMin={route.fareMin}
        expectedFareMax={route.fareMax}
        mode={route.steps[0]?.mode || 'Danfo'}
        currentCountry={currentCountry}
      />
    </div>
  );
};
