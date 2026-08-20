import { RouteOption, RouteStep, CityConfig } from '../types';
import { getCityById, getCountryById } from './cities';

export const PRESET_ROUTES: Record<string, RouteOption> = {
  // Lagos primary
  'ojota-yaba': {
    id: 'route-ojota-yaba',
    from: 'Ojota',
    to: 'Yaba',
    cityId: 'lagos',
    countryId: 'nigeria',
    type: 'BALANCED',
    totalMinutesMin: 35,
    totalMinutesMax: 50,
    fareMin: 800,
    fareMax: 1100,
    currencySymbol: '₦',
    transfersCount: 1,
    walkingDistanceMeters: 180,
    confidence: 'High confidence',
    reportCount: 38,
    lastUpdated: '12m ago',
    steps: [
      {
        id: 'step-1',
        stepNumber: 1,
        mode: 'Danfo',
        from: 'Ojota Motor Park',
        to: 'Anthony Bus Stop',
        boardLandmark: 'Ojota New Garage (Under pedestrian bridge)',
        dropLandmark: 'Anthony Bus Stop (Opposite GTBank)',
        estimatedMinutes: 15,
        fareMin: 400,
        fareMax: 500,
        advice: 'Hold exact ₦500 note to avoid conductor change delay.',
      },
      {
        id: 'step-2',
        stepNumber: 2,
        mode: 'Danfo',
        from: 'Anthony Bus Stop',
        to: 'Yaba (Commercial Ave / Tech Hub)',
        boardLandmark: 'Anthony service lane towards Fadeyi/Yaba',
        dropLandmark: 'Yaba Bus Stop (Tejuosho Market Gate)',
        estimatedMinutes: 25,
        fareMin: 400,
        fareMax: 600,
        advice: 'Alight before railway crossing if heading to Sabo Tech Hub.',
      },
    ],
  },
  // Abuja primary
  'wuse-area1': {
    id: 'route-wuse-area1',
    from: 'Wuse 2',
    to: 'Area 1',
    cityId: 'abuja',
    countryId: 'nigeria',
    type: 'BALANCED',
    totalMinutesMin: 20,
    totalMinutesMax: 30,
    fareMin: 500,
    fareMax: 700,
    currencySymbol: '₦',
    transfersCount: 1,
    walkingDistanceMeters: 100,
    confidence: 'High confidence',
    reportCount: 24,
    lastUpdated: '8m ago',
    steps: [
      {
        id: 'step-1',
        stepNumber: 1,
        mode: 'Along',
        from: 'Banex Plaza, Wuse 2',
        to: 'Berger Junction',
        boardLandmark: 'Opposite Banex side gate',
        dropLandmark: 'Berger Roundabout',
        estimatedMinutes: 10,
        fareMin: 250,
        fareMax: 350,
        advice: 'Flag green cabs heading "Berger Along".',
      },
      {
        id: 'step-2',
        stepNumber: 2,
        mode: 'Along',
        from: 'Berger Junction',
        to: 'Area 1 Roundabout',
        boardLandmark: 'Under Berger flyover, Airport Road arm',
        dropLandmark: 'Area 1 Roundabout (Near Shopping Complex)',
        estimatedMinutes: 15,
        fareMin: 250,
        fareMax: 350,
        advice: 'State exact section (Area 1 Post Office or Roundabout).',
      },
    ],
  },
  // Port Harcourt
  'choba-mile1': {
    id: 'route-choba-mile1',
    from: 'Choba',
    to: 'Mile 1 Market',
    cityId: 'portharcourt',
    countryId: 'nigeria',
    type: 'BALANCED',
    totalMinutesMin: 40,
    totalMinutesMax: 60,
    fareMin: 700,
    fareMax: 1000,
    currencySymbol: '₦',
    transfersCount: 1,
    walkingDistanceMeters: 150,
    confidence: 'High confidence',
    reportCount: 19,
    lastUpdated: '20m ago',
    steps: [
      {
        id: 'step-1',
        stepNumber: 1,
        mode: 'Keke',
        from: 'Choba (Uniport Gate 1)',
        to: 'Rumuokoro Flyover',
        boardLandmark: 'Opposite Uniport Delta Park gate',
        dropLandmark: 'Rumuokoro Under-flyover transit park',
        estimatedMinutes: 20,
        fareMin: 350,
        fareMax: 500,
        advice: 'Board direct keke to avoid intermediate stops at Alakahia.',
      },
      {
        id: 'step-2',
        stepNumber: 2,
        mode: 'Along',
        from: 'Rumuokoro Flyover',
        to: 'Mile 1 Market (Diobu)',
        boardLandmark: 'Ikwerre Road service lane towards Mile 1',
        dropLandmark: 'Mile 1 Market Flyover',
        estimatedMinutes: 25,
        fareMin: 350,
        fareMax: 500,
        advice: 'Check morning market congestion around Ikwerre Road.',
      },
    ],
  },
  // Ibadan
  'ui-dugbe': {
    id: 'route-ui-dugbe',
    from: 'UI Gate',
    to: 'Dugbe',
    cityId: 'ibadan',
    countryId: 'nigeria',
    type: 'BALANCED',
    totalMinutesMin: 25,
    totalMinutesMax: 35,
    fareMin: 400,
    fareMax: 600,
    currencySymbol: '₦',
    transfersCount: 1,
    walkingDistanceMeters: 120,
    confidence: 'High confidence',
    reportCount: 22,
    lastUpdated: '15m ago',
    steps: [
      {
        id: 'step-1',
        stepNumber: 1,
        mode: 'Micra',
        from: 'UI Main Gate',
        to: 'Mokola Roundabout',
        boardLandmark: 'Directly under UI Pedestrian Flyover',
        dropLandmark: 'Mokola Overhead Bridge',
        estimatedMinutes: 12,
        fareMin: 200,
        fareMax: 300,
        advice: 'Micra loads fast. 2 in front, 4 in back.',
      },
      {
        id: 'step-2',
        stepNumber: 2,
        mode: 'Micra',
        from: 'Mokola Roundabout',
        to: 'Dugbe (Cocoa House)',
        boardLandmark: 'Mokola market park arm',
        dropLandmark: 'Cocoa Dome / Dugbe Post Office',
        estimatedMinutes: 15,
        fareMin: 200,
        fareMax: 300,
        advice: 'Alight at Cocoa House roundabout.',
      },
    ],
  },
};

/**
 * Universal dynamic route generator that respects the city, country, 
 * available local transport modes, and currency configuration.
 */
export function generateLocalRoute(
  from: string,
  to: string,
  cityId: string = 'lagos'
): RouteOption {
  const city = getCityById(cityId);
  const country = getCountryById(city.countryId);
  const currencySymbol = country.currencySymbol;

  // Check preset route key
  const normalizedKey = `${from.toLowerCase().replace(/[^a-z0-9]/g, '')}-${to.toLowerCase().replace(/[^a-z0-9]/g, '')}`;
  for (const [key, val] of Object.entries(PRESET_ROUTES)) {
    if (key.includes(normalizedKey) || normalizedKey.includes(key.replace('-', ''))) {
      return {
        ...val,
        from,
        to,
        cityId: city.id,
        countryId: country.id,
        currencySymbol,
      };
    }
  }

  // Derive primary and secondary modes available in this city
  const availableModes = city.availableModes.length > 0 ? city.availableModes : ['Bus', 'Taxi', 'Walk'];
  const primaryMode = availableModes[0] || 'Bus';
  const secondaryMode = availableModes.length > 1 ? availableModes[1] : (availableModes[0] || 'Taxi');

  // Base fare calculation adapted to country economy scale
  let baseMultiplier = 1;
  if (country.code === 'GH') baseMultiplier = 0.035; // GHS
  else if (country.code === 'KE') baseMultiplier = 0.35; // KES
  else if (country.code === 'RW') baseMultiplier = 3.2; // RWF
  else baseMultiplier = 1; // NGN

  const rawFareMin = Math.round((500 * baseMultiplier) / 10) * 10;
  const rawFareMax = Math.round((800 * baseMultiplier) / 10) * 10;
  const leg1Min = Math.round((250 * baseMultiplier) / 10) * 10;
  const leg1Max = Math.round((400 * baseMultiplier) / 10) * 10;
  const leg2Min = rawFareMin - leg1Min;
  const leg2Max = rawFareMax - leg1Max;

  const intermediateHub = city.popularJunctions.find((j) => j !== from && j !== to) || 'Central Interchange';

  const steps: RouteStep[] = [
    {
      id: `step-${Date.now()}-1`,
      stepNumber: 1,
      mode: primaryMode,
      from: from,
      to: intermediateHub,
      boardLandmark: `Opposite ${from} landmark / main boarding arm`,
      dropLandmark: `${intermediateHub} transit hub underbridge`,
      estimatedMinutes: 18,
      fareMin: Math.max(10, leg1Min),
      fareMax: Math.max(20, leg1Max),
      advice: city.localDialectTip || 'Hold exact change when boarding.',
    },
    {
      id: `step-${Date.now()}-2`,
      stepNumber: 2,
      mode: secondaryMode,
      from: intermediateHub,
      to: to,
      boardLandmark: `${intermediateHub} connecting platform / service lane`,
      dropLandmark: `${to} main drop point`,
      estimatedMinutes: 22,
      fareMin: Math.max(10, leg2Min),
      fareMax: Math.max(20, leg2Max),
      advice: `Inform operator before reaching ${to} destination stop.`,
    },
  ];

  return {
    id: `route-${Date.now()}`,
    from,
    to,
    cityId: city.id,
    countryId: country.id,
    type: 'BALANCED',
    totalMinutesMin: 35,
    totalMinutesMax: 50,
    fareMin: Math.max(20, rawFareMin),
    fareMax: Math.max(30, rawFareMax),
    currencySymbol,
    transfersCount: 1,
    walkingDistanceMeters: 160,
    confidence: 'High confidence',
    reportCount: 16,
    lastUpdated: 'Just now',
    steps,
  };
}
