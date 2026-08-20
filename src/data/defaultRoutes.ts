import { RouteOption, TransportMode, RouteStep } from '../types';

export const POPULAR_PRESET_ROUTES: Record<string, RouteOption> = {
  'Ojota-Yaba': {
    id: 'ojota-yaba-balanced',
    from: 'Ojota',
    to: 'Yaba',
    type: 'BALANCED',
    totalMinutesMin: 50,
    totalMinutesMax: 65,
    fareMin: 800,
    fareMax: 1100,
    transfersCount: 2,
    walkingDistanceMeters: 250,
    confidence: 'High confidence',
    reportCount: 24,
    lastUpdated: '8 minutes ago',
    routeAlert: {
      title: 'Route Alert',
      message: 'Heavy traffic and slight delay reported near Oshodi 15 minutes ago.',
      severity: 'warning',
      timeAgo: '15 mins ago',
      confirmedCount: 11
    },
    steps: [
      {
        id: 's1',
        stepNumber: 1,
        mode: 'Keke',
        from: 'Ojota',
        to: 'Anthony',
        boardLandmark: 'Ojota Junction (Beside Total filling station)',
        dropLandmark: 'Anthony Bus Stop (Under pedestrian bridge)',
        estimatedMinutes: 15,
        fareMin: 200,
        fareMax: 250,
        advice: 'Board from the queue near the footbridge to get exact change.'
      },
      {
        id: 's2',
        stepNumber: 2,
        mode: 'Danfo',
        from: 'Anthony',
        to: 'Oshodi',
        boardLandmark: 'Anthony Bus Stop (Service lane)',
        dropLandmark: 'Oshodi Terminal 2 / Underbridge',
        estimatedMinutes: 20,
        fareMin: 300,
        fareMax: 400,
        advice: 'Conductors often ask for ₦300 holding money; hold exact cash.'
      },
      {
        id: 's3',
        stepNumber: 3,
        mode: 'BRT',
        from: 'Oshodi',
        to: 'Yaba',
        boardLandmark: 'Oshodi BRT Terminal (Lane 3)',
        dropLandmark: 'Yaba Bus Stop (Opposite Tejuosho Market)',
        estimatedMinutes: 20,
        fareMin: 300,
        fareMax: 450,
        advice: 'Use Cowry Card or purchase single trip paper ticket at counter.'
      }
    ]
  },
  'Ikeja-Lekki Phase 1': {
    id: 'ikeja-lekki-balanced',
    from: 'Ikeja',
    to: 'Lekki Phase 1',
    type: 'BALANCED',
    totalMinutesMin: 65,
    totalMinutesMax: 90,
    fareMin: 1400,
    fareMax: 1800,
    transfersCount: 2,
    walkingDistanceMeters: 180,
    confidence: 'High confidence',
    reportCount: 38,
    lastUpdated: '12 minutes ago',
    routeAlert: {
      title: 'Third Mainland Bridge Alert',
      message: 'Smooth movement currently on Third Mainland Bridge towards Island.',
      severity: 'info',
      timeAgo: '12 mins ago',
      confirmedCount: 19
    },
    steps: [
      {
        id: 's1',
        stepNumber: 1,
        mode: 'Danfo',
        from: 'Ikeja',
        to: 'CMS / Marina',
        boardLandmark: 'Ikeja Under Bridge Terminal',
        dropLandmark: 'CMS Bus Stop (Opposite Marina Mall)',
        estimatedMinutes: 40,
        fareMin: 700,
        fareMax: 900,
        advice: 'Takes the express link via Third Mainland Bridge.'
      },
      {
        id: 's2',
        stepNumber: 2,
        mode: 'Danfo',
        from: 'CMS',
        to: 'Lekki Phase 1',
        boardLandmark: 'CMS Island Terminal / Outer Marina',
        dropLandmark: 'Lekki Phase 1 Gate (Tollgate bus stop)',
        estimatedMinutes: 25,
        fareMin: 500,
        fareMax: 700,
        advice: 'Express bus directly towards Maruwa/Jakande; alight at 1st Roundabout.'
      }
    ]
  },
  'Wuse 2-Area 1': {
    id: 'wuse2-area1-balanced',
    from: 'Wuse 2',
    to: 'Area 1',
    type: 'BALANCED',
    totalMinutesMin: 20,
    totalMinutesMax: 30,
    fareMin: 400,
    fareMax: 600,
    transfersCount: 1,
    walkingDistanceMeters: 100,
    confidence: 'High confidence',
    reportCount: 17,
    lastUpdated: '5 minutes ago',
    steps: [
      {
        id: 's1',
        stepNumber: 1,
        mode: 'Along',
        from: 'Wuse 2 (Banex)',
        to: 'Wuse Market',
        boardLandmark: 'Banex Junction (Aminu Kano Way)',
        dropLandmark: 'Wuse Market Overhead Bridge',
        estimatedMinutes: 10,
        fareMin: 150,
        fareMax: 200,
        advice: 'Flag green painted cab going Along.'
      },
      {
        id: 's2',
        stepNumber: 2,
        mode: 'Along',
        from: 'Wuse Market',
        to: 'Area 1 Roundabout',
        boardLandmark: 'Wuse Market Motor Park',
        dropLandmark: 'Area 1 Shopping Centre Roundabout',
        estimatedMinutes: 15,
        fareMin: 250,
        fareMax: 400,
        advice: 'Take Area 1 or Garki direct cabs.'
      }
    ]
  },
  'UI Gate-Dugbe': {
    id: 'ui-dugbe-balanced',
    from: 'UI Gate',
    to: 'Dugbe',
    type: 'BALANCED',
    totalMinutesMin: 25,
    totalMinutesMax: 35,
    fareMin: 350,
    fareMax: 500,
    transfersCount: 1,
    walkingDistanceMeters: 80,
    confidence: 'High confidence',
    reportCount: 29,
    lastUpdated: '14 minutes ago',
    steps: [
      {
        id: 's1',
        stepNumber: 1,
        mode: 'Micra',
        from: 'UI Main Gate',
        to: 'Mokola Roundabout',
        boardLandmark: 'University of Ibadan Main Gate',
        dropLandmark: 'Mokola Flyover underbridge',
        estimatedMinutes: 15,
        fareMin: 150,
        fareMax: 200,
        advice: 'Red and yellow Micra taxi going Mokola/Dugbe.'
      },
      {
        id: 's2',
        stepNumber: 2,
        mode: 'Micra',
        from: 'Mokola',
        to: 'Dugbe (Cocoa House)',
        boardLandmark: 'Mokola Park',
        dropLandmark: 'Cocoa House / Post Office Dugbe',
        estimatedMinutes: 10,
        fareMin: 150,
        fareMax: 250,
        advice: 'Alight right at the Cocoa Mall junction.'
      }
    ]
  },
  'Choba-Mile 1 Market': {
    id: 'choba-mile1-balanced',
    from: 'Choba',
    to: 'Mile 1 Market',
    type: 'BALANCED',
    totalMinutesMin: 45,
    totalMinutesMax: 60,
    fareMin: 600,
    fareMax: 850,
    transfersCount: 1,
    walkingDistanceMeters: 150,
    confidence: 'High confidence',
    reportCount: 21,
    lastUpdated: '20 minutes ago',
    steps: [
      {
        id: 's1',
        stepNumber: 1,
        mode: 'Keke',
        from: 'Choba (Uniport)',
        to: 'Rumuokoro Flyover',
        boardLandmark: 'Uniport Delta Gate Park',
        dropLandmark: 'Rumuokoro Flyover Roundabout',
        estimatedMinutes: 20,
        fareMin: 250,
        fareMax: 350
      },
      {
        id: 's2',
        stepNumber: 2,
        mode: 'Danfo',
        from: 'Rumuokoro',
        to: 'Mile 1 Market',
        boardLandmark: 'Rumuokoro Park (Beside Flyover)',
        dropLandmark: 'Mile 1 Flyover / Diobu',
        estimatedMinutes: 30,
        fareMin: 350,
        fareMax: 500
      }
    ]
  }
};

/**
 * Intelligent local route generator for Nigerian commuter context
 */
export function generateLocalRoute(
  from: string,
  to: string,
  cityId: string = 'lagos'
): RouteOption {
  const cleanFrom = from.trim();
  const cleanTo = to.trim();
  const key = `${cleanFrom}-${cleanTo}`;

  // Check preset route matches
  if (POPULAR_PRESET_ROUTES[key]) {
    return POPULAR_PRESET_ROUTES[key];
  }

  // Reverse match check
  const reverseKey = `${cleanTo}-${cleanFrom}`;
  if (POPULAR_PRESET_ROUTES[reverseKey]) {
    const orig = POPULAR_PRESET_ROUTES[reverseKey];
    return {
      ...orig,
      id: `${cleanFrom.toLowerCase()}-${cleanTo.toLowerCase()}-reversed`,
      from: cleanFrom,
      to: cleanTo,
      steps: orig.steps.map((step, idx) => ({
        ...step,
        id: `rev-s${idx + 1}`,
        stepNumber: idx + 1,
        from: idx === 0 ? cleanFrom : step.to,
        to: idx === orig.steps.length - 1 ? cleanTo : step.from,
        boardLandmark: `${step.dropLandmark || cleanFrom} (Opposite side)`,
        dropLandmark: `${step.boardLandmark || cleanTo}`
      }))
    };
  }

  // Heuristic generation based on Nigerian commuter network
  let primaryMode: TransportMode = 'Danfo';
  let secondaryMode: TransportMode = 'Keke';

  if (cityId === 'abuja') {
    primaryMode = 'Along';
    secondaryMode = 'Taxi';
  } else if (cityId === 'ibadan') {
    primaryMode = 'Micra';
    secondaryMode = 'Danfo';
  } else if (cityId === 'portharcourt' || cityId === 'kano' || cityId === 'enugu') {
    primaryMode = 'Keke';
    secondaryMode = 'Danfo';
  }

  // Calculate dynamic reasonable estimates
  const estMinutesMin = Math.floor(35 + Math.random() * 20);
  const estMinutesMax = estMinutesMin + 15 + Math.floor(Math.random() * 15);
  const baseFare = Math.floor((Math.random() * 5 + 6)) * 100; // 600 - 1100
  const fareMin = baseFare;
  const fareMax = baseFare + 250 + Math.floor(Math.random() * 3) * 100;
  const reportCount = Math.floor(Math.random() * 22) + 8;

  const intermediateStop = `${cleanFrom} Park / Junction`;

  const steps: RouteStep[] = [
    {
      id: `gen-s1`,
      stepNumber: 1,
      mode: secondaryMode,
      from: cleanFrom,
      to: intermediateStop,
      boardLandmark: `${cleanFrom} (Main junction / Motor park)`,
      dropLandmark: `${intermediateStop} (Interchange point)`,
      estimatedMinutes: Math.floor(estMinutesMin * 0.4),
      fareMin: Math.round(fareMin * 0.35 / 50) * 50 || 200,
      fareMax: Math.round(fareMax * 0.35 / 50) * 50 || 300,
      advice: 'Look for the designated loading line to avoid high agbero charges.'
    },
    {
      id: `gen-s2`,
      stepNumber: 2,
      mode: primaryMode,
      from: intermediateStop,
      to: cleanTo,
      boardLandmark: `${intermediateStop} (Direct ${primaryMode} park)`,
      dropLandmark: `${cleanTo} (Alighting bus stop)`,
      estimatedMinutes: Math.floor(estMinutesMin * 0.6),
      fareMin: Math.round(fareMin * 0.65 / 50) * 50 || 400,
      fareMax: Math.round(fareMax * 0.65 / 50) * 50 || 600,
      advice: `Tell the conductor "${cleanTo} wa o" before boarding.`
    }
  ];

  return {
    id: `custom-${Date.now()}`,
    from: cleanFrom,
    to: cleanTo,
    type: 'BALANCED',
    totalMinutesMin: estMinutesMin,
    totalMinutesMax: estMinutesMax,
    fareMin,
    fareMax,
    transfersCount: 1,
    walkingDistanceMeters: 190,
    confidence: reportCount > 15 ? 'High confidence' : 'Estimated',
    reportCount,
    lastUpdated: '10 minutes ago',
    steps
  };
}
