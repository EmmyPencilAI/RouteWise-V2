import { RouteOption, RouteStep, GeoCoordinate } from '../types';
import { getCityById, getCountryById } from './cities';
import { getLandmarkCoordinate } from './coordinates';
import { routingProvider } from '../services/routing/osrmRoutingProvider';

export async function generateLocalRouteAsync(
  from: string,
  to: string,
  cityId: string = 'lagos'
): Promise<RouteOption> {
  const city = getCityById(cityId);
  const country = getCountryById(city.countryId);
  const currencySymbol = country.currencySymbol;

  const fromCoord = getLandmarkCoordinate(from, cityId);
  const toCoord = getLandmarkCoordinate(to, cityId);

  // Available transit modes in this city
  const availableModes = city.availableModes.filter((m) => m !== 'Walk');
  const primaryMode = availableModes[0] || 'Danfo';
  const secondaryMode = availableModes.length > 1 ? availableModes[1] : primaryMode;
  const thirdMode = availableModes.length > 2 ? availableModes[2] : (availableModes[0] || 'BRT');

  // Multi-leg intermediate hubs for realistic transit legs
  const isOjotaYaba = from.toLowerCase().includes('ojota') && to.toLowerCase().includes('yaba');

  let steps: RouteStep[] = [];
  let totalFareMin = 0;
  let totalFareMax = 0;
  let allRoadGeometry: GeoCoordinate[] = [];

  if (isOjotaYaba) {
    // 3-LEG OJOTA -> YABA TRANSIT NETWORK SPECIFICATION
    // Leg 1: Keke (Ojota -> Anthony) ₦250–₦350
    // Leg 2: Danfo (Anthony -> Oshodi) ₦400–₦550
    // Leg 3: BRT (Oshodi -> Yaba) ₦300–₦500
    // Total: ₦950–₦1,400
    const ojotaCoord = getLandmarkCoordinate('Ojota', 'lagos');
    const anthonyCoord = getLandmarkCoordinate('Anthony', 'lagos');
    const oshodiCoord = getLandmarkCoordinate('Oshodi', 'lagos');
    const yabaCoord = getLandmarkCoordinate('Yaba', 'lagos');

    const leg1Route = await routingProvider.getRoute(
      { lat: ojotaCoord.lat, lng: ojotaCoord.lng, name: 'Ojota' },
      { lat: anthonyCoord.lat, lng: anthonyCoord.lng, name: 'Anthony' }
    );
    const leg2Route = await routingProvider.getRoute(
      { lat: anthonyCoord.lat, lng: anthonyCoord.lng, name: 'Anthony' },
      { lat: oshodiCoord.lat, lng: oshodiCoord.lng, name: 'Oshodi' }
    );
    const leg3Route = await routingProvider.getRoute(
      { lat: oshodiCoord.lat, lng: oshodiCoord.lng, name: 'Oshodi' },
      { lat: yabaCoord.lat, lng: yabaCoord.lng, name: 'Yaba' }
    );

    steps = [
      {
        id: 'step-1',
        stepNumber: 1,
        mode: 'Keke',
        from: 'Ojota',
        to: 'Anthony',
        boardLandmark: 'Ojota Junction (Under pedestrian bridge)',
        dropLandmark: 'Anthony',
        startCoordinate: [ojotaCoord.lat, ojotaCoord.lng],
        endCoordinate: [anthonyCoord.lat, anthonyCoord.lng],
        roadGeometry: leg1Route.roadGeometry,
        fareMin: 250,
        fareMax: 350,
        advice: 'Hold exact ₦300 or ₦350 note to avoid conductor delay.',
        distanceMeters: leg1Route.distanceMeters,
      },
      {
        id: 'step-2',
        stepNumber: 2,
        mode: 'Danfo',
        from: 'Anthony',
        to: 'Oshodi',
        boardLandmark: 'Anthony Bus Stop',
        dropLandmark: 'Oshodi',
        startCoordinate: [anthonyCoord.lat, anthonyCoord.lng],
        endCoordinate: [oshodiCoord.lat, oshodiCoord.lng],
        roadGeometry: leg2Route.roadGeometry,
        fareMin: 400,
        fareMax: 550,
        advice: 'Alight at Oshodi Interchange terminal platform.',
        distanceMeters: leg2Route.distanceMeters,
      },
      {
        id: 'step-3',
        stepNumber: 3,
        mode: 'BRT',
        from: 'Oshodi',
        to: 'Yaba',
        boardLandmark: 'Oshodi BRT Terminal',
        dropLandmark: 'Yaba (Commercial Ave)',
        startCoordinate: [oshodiCoord.lat, oshodiCoord.lng],
        endCoordinate: [yabaCoord.lat, yabaCoord.lng],
        roadGeometry: leg3Route.roadGeometry,
        fareMin: 300,
        fareMax: 500,
        advice: 'Tap Cowry card or buy paper token before boarding.',
        distanceMeters: leg3Route.distanceMeters,
      },
    ];

    allRoadGeometry = [...leg1Route.roadGeometry, ...leg2Route.roadGeometry, ...leg3Route.roadGeometry];
    totalFareMin = 950;
    totalFareMax = 1400;
  } else {
    // Dynamic 2-leg city corridor
    const intermediateHubName = city.popularJunctions.find((j) => j !== from && j !== to) || 'Central Transit Hub';
    const hubCoord = getLandmarkCoordinate(intermediateHubName, cityId);

    // Currency scale multiplier
    let baseMultiplier = 1;
    if (country.code === 'GH') baseMultiplier = 0.035;
    else if (country.code === 'KE') baseMultiplier = 0.35;
    else if (country.code === 'RW') baseMultiplier = 3.2;

    const leg1Min = Math.round((300 * baseMultiplier) / 10) * 10;
    const leg1Max = Math.round((450 * baseMultiplier) / 10) * 10;
    const leg2Min = Math.round((350 * baseMultiplier) / 10) * 10;
    const leg2Max = Math.round((550 * baseMultiplier) / 10) * 10;

    const leg1Route = await routingProvider.getRoute(
      { lat: fromCoord.lat, lng: fromCoord.lng, name: from },
      { lat: hubCoord.lat, lng: hubCoord.lng, name: intermediateHubName }
    );
    const leg2Route = await routingProvider.getRoute(
      { lat: hubCoord.lat, lng: hubCoord.lng, name: intermediateHubName },
      { lat: toCoord.lat, lng: toCoord.lng, name: to }
    );

    steps = [
      {
        id: `step-${Date.now()}-1`,
        stepNumber: 1,
        mode: primaryMode,
        from: from,
        to: intermediateHubName,
        boardLandmark: `${from} Main Boarding Junction`,
        dropLandmark: `${intermediateHubName} Station`,
        startCoordinate: [fromCoord.lat, fromCoord.lng],
        endCoordinate: [hubCoord.lat, hubCoord.lng],
        roadGeometry: leg1Route.roadGeometry,
        fareMin: Math.max(10, leg1Min),
        fareMax: Math.max(20, leg1Max),
        advice: city.localDialectTip || 'Hold exact change when boarding.',
        distanceMeters: leg1Route.distanceMeters,
      },
      {
        id: `step-${Date.now()}-2`,
        stepNumber: 2,
        mode: secondaryMode,
        from: intermediateHubName,
        to: to,
        boardLandmark: `${intermediateHubName} Connecting Platform`,
        dropLandmark: `${to} Bus Stop`,
        startCoordinate: [hubCoord.lat, hubCoord.lng],
        endCoordinate: [toCoord.lat, toCoord.lng],
        roadGeometry: leg2Route.roadGeometry,
        fareMin: Math.max(10, leg2Min),
        fareMax: Math.max(20, leg2Max),
        advice: `Inform conductor/driver before arriving at ${to}.`,
        distanceMeters: leg2Route.distanceMeters,
      },
    ];

    allRoadGeometry = [...leg1Route.roadGeometry, ...leg2Route.roadGeometry];
    totalFareMin = leg1Min + leg2Min;
    totalFareMax = leg1Max + leg2Max;
  }

  // Calculate safer alternative route bypassing congested corridors
  const altRouteResult = await routingProvider.getRoute(
    { lat: fromCoord.lat, lng: fromCoord.lng, name: from },
    { lat: toCoord.lat, lng: toCoord.lng, name: to },
    { avoidIncidents: true }
  );

  let totalDistance = 0;
  for (const step of steps) {
    totalDistance += step.distanceMeters || 1200;
  }

  return {
    id: `route-${Date.now()}`,
    from,
    to,
    cityId: city.id,
    countryId: country.id,
    type: 'BALANCED',
    fareMin: totalFareMin,
    fareMax: totalFareMax,
    currencySymbol,
    transfersCount: steps.length - 1,
    totalDistanceMeters: totalDistance,
    confidence: 'High confidence',
    reportCount: 38,
    lastUpdated: '8m ago',
    riskScore: 'LOW',
    roadGeometry: allRoadGeometry,
    alternativeRoadGeometry: altRouteResult.roadGeometry,
    steps,
  };
}

/**
 * Synchronous initial fallback for fast boot
 */
export function generateLocalRoute(
  from: string,
  to: string,
  cityId: string = 'lagos'
): RouteOption {
  const city = getCityById(cityId);
  const country = getCountryById(city.countryId);
  const currencySymbol = country.currencySymbol;

  const ojotaCoord = getLandmarkCoordinate('Ojota', 'lagos');
  const anthonyCoord = getLandmarkCoordinate('Anthony', 'lagos');
  const oshodiCoord = getLandmarkCoordinate('Oshodi', 'lagos');
  const yabaCoord = getLandmarkCoordinate('Yaba', 'lagos');

  const defaultRoadGeometry: GeoCoordinate[] = [
    [6.5828, 3.3768],
    [6.5740, 3.3720],
    [6.5655, 3.3688],
    [6.5560, 3.3680],
    [6.5492, 3.3486],
    [6.5390, 3.3672],
    [6.5298, 3.3670],
    [6.5200, 3.3685],
    [6.5098, 3.3715],
  ];

  return {
    id: 'route-ojota-yaba-initial',
    from: from || 'Ojota',
    to: to || 'Yaba',
    cityId: city.id,
    countryId: country.id,
    type: 'BALANCED',
    fareMin: 950,
    fareMax: 1400,
    currencySymbol,
    transfersCount: 2,
    totalDistanceMeters: 8400,
    confidence: 'High confidence',
    reportCount: 42,
    lastUpdated: '5m ago',
    riskScore: 'LOW',
    roadGeometry: defaultRoadGeometry,
    steps: [
      {
        id: 'step-1',
        stepNumber: 1,
        mode: 'Keke',
        from: from || 'Ojota',
        to: 'Anthony',
        boardLandmark: 'Ojota Junction',
        dropLandmark: 'Anthony',
        startCoordinate: [ojotaCoord.lat, ojotaCoord.lng],
        endCoordinate: [anthonyCoord.lat, anthonyCoord.lng],
        roadGeometry: defaultRoadGeometry.slice(0, 3),
        fareMin: 250,
        fareMax: 350,
        advice: 'Board Ojota underbridge keke park heading Anthony.',
        distanceMeters: 2200,
      },
      {
        id: 'step-2',
        stepNumber: 2,
        mode: 'Danfo',
        from: 'Anthony',
        to: 'Oshodi',
        boardLandmark: 'Anthony Bus Stop',
        dropLandmark: 'Oshodi',
        startCoordinate: [anthonyCoord.lat, anthonyCoord.lng],
        endCoordinate: [oshodiCoord.lat, oshodiCoord.lng],
        roadGeometry: defaultRoadGeometry.slice(2, 6),
        fareMin: 400,
        fareMax: 550,
        advice: 'Take commercial yellow bus on the service lane.',
        distanceMeters: 3800,
      },
      {
        id: 'step-3',
        stepNumber: 3,
        mode: 'BRT',
        from: 'Oshodi',
        to: to || 'Yaba',
        boardLandmark: 'Oshodi BRT Terminal',
        dropLandmark: 'Yaba',
        startCoordinate: [oshodiCoord.lat, oshodiCoord.lng],
        endCoordinate: [yabaCoord.lat, yabaCoord.lng],
        roadGeometry: defaultRoadGeometry.slice(5),
        fareMin: 300,
        fareMax: 500,
        advice: 'Direct BRT to Yaba bus station.',
        distanceMeters: 2400,
      },
    ],
  };
}
