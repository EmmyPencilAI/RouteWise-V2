// Geographic coordinate definitions for cities, areas, and key transit hubs
export interface LatLng {
  lat: number;
  lng: number;
}

export const CITY_COORDINATES: Record<string, { center: LatLng; bounds?: { north: number; south: number; east: number; west: number } }> = {
  // Nigeria
  lagos: { center: { lat: 6.5244, lng: 3.3792 } },
  abuja: { center: { lat: 9.0765, lng: 7.3986 } },
  portharcourt: { center: { lat: 4.8156, lng: 7.0498 } },
  ibadan: { center: { lat: 7.3775, lng: 3.9470 } },
  kano: { center: { lat: 12.0022, lng: 8.5920 } },
  kaduna: { center: { lat: 10.5105, lng: 7.4165 } },
  enugu: { center: { lat: 6.4584, lng: 7.5464 } },
  benincity: { center: { lat: 6.3350, lng: 5.6037 } },
  onitsha: { center: { lat: 6.1518, lng: 6.7856 } },
  aba: { center: { lat: 5.1066, lng: 7.3667 } },
  owerri: { center: { lat: 5.4833, lng: 7.0333 } },
  uyo: { center: { lat: 5.0377, lng: 7.9128 } },
  calabar: { center: { lat: 4.9757, lng: 8.3417 } },
  jos: { center: { lat: 9.8965, lng: 8.8583 } },
  ilorin: { center: { lat: 8.4799, lng: 4.5418 } },
  akure: { center: { lat: 7.2571, lng: 5.2058 } },
  abeokuta: { center: { lat: 7.1475, lng: 3.3619 } },
  adoekiti: { center: { lat: 7.6212, lng: 5.2215 } },

  // Ghana
  accra: { center: { lat: 5.6037, lng: -0.1870 } },
  kumasi: { center: { lat: 6.6885, lng: -1.6244 } },

  // Kenya
  nairobi: { center: { lat: -1.2921, lng: 36.8219 } },

  // Rwanda
  kigali: { center: { lat: -1.9441, lng: 30.0619 } },
};

export const LANDMARK_COORDINATES: Record<string, LatLng> = {
  // Lagos Junctions
  'ojota': { lat: 6.5828, lng: 3.3768 },
  'ojota motor park': { lat: 6.5830, lng: 3.3770 },
  'ojota new garage': { lat: 6.5835, lng: 3.3765 },
  'anthony': { lat: 6.5658, lng: 3.3685 },
  'anthony bus stop': { lat: 6.5655, lng: 3.3688 },
  'oshodi': { lat: 6.5492, lng: 3.3486 },
  'oshodi interchange': { lat: 6.5501, lng: 3.3490 },
  'yaba': { lat: 6.5095, lng: 3.3711 },
  'yaba bus stop': { lat: 6.5098, lng: 3.3715 },
  'tejuosho market': { lat: 6.5105, lng: 3.3690 },
  'fadeyi': { lat: 6.5298, lng: 3.3670 },
  'maryland': { lat: 6.5710, lng: 3.3665 },
  'ikeja': { lat: 6.5960, lng: 3.3440 },
  'ikeja under bridge': { lat: 6.5980, lng: 3.3450 },
  'cms': { lat: 6.4520, lng: 3.3910 },
  'cms / marina': { lat: 6.4520, lng: 3.3910 },
  'obalende': { lat: 6.4475, lng: 3.4095 },
  'lekki phase 1': { lat: 6.4385, lng: 3.4735 },
  'ajah': { lat: 6.4678, lng: 3.5689 },
  'berger': { lat: 6.6430, lng: 3.3645 },
  'ikorodu': { lat: 6.6194, lng: 3.5105 },
  'ikorodu garage': { lat: 6.6190, lng: 3.5100 },
  'mile 2': { lat: 6.4632, lng: 3.3211 },
  'surulere': { lat: 6.5015, lng: 3.3580 },
  'national stadium': { lat: 6.4975, lng: 3.3620 },
  'costain': { lat: 6.4785, lng: 3.3720 },
  'victoria island': { lat: 6.4281, lng: 3.4219 },

  // Abuja Junctions
  'wuse 2': { lat: 9.0792, lng: 7.4721 },
  'banex': { lat: 9.0835, lng: 7.4760 },
  'wuse market': { lat: 9.0625, lng: 7.4580 },
  'area 1': { lat: 9.0280, lng: 7.4750 },
  'area 1 roundabout': { lat: 9.0285, lng: 7.4755 },
  'berger junction': { lat: 9.0610, lng: 7.4690 },
  'federal secretariat': { lat: 9.0550, lng: 7.5020 },
  'gwarinpa': { lat: 9.1120, lng: 7.4080 },
  'kubwa': { lat: 9.1550, lng: 7.3320 },
  'maitama': { lat: 9.0880, lng: 7.4980 },
  'jabi': { lat: 9.0710, lng: 7.4250 },
  'utako': { lat: 9.0650, lng: 7.4390 },
  'lugbe': { lat: 8.9810, lng: 7.3780 },

  // Port Harcourt
  'choba': { lat: 4.8965, lng: 6.9180 },
  'rumuokoro': { lat: 4.8625, lng: 6.9850 },
  'rumuokoro flyover': { lat: 4.8630, lng: 6.9855 },
  'garrison': { lat: 4.8050, lng: 7.0250 },
  'mile 1 market': { lat: 4.7920, lng: 7.0120 },
  'waterlines': { lat: 4.8210, lng: 7.0180 },
  'artillery': { lat: 4.8320, lng: 7.0350 },

  // Ibadan
  'ui gate': { lat: 7.4435, lng: 3.9015 },
  'mokola': { lat: 7.4050, lng: 3.8890 },
  'mokola roundabout': { lat: 7.4055, lng: 3.8895 },
  'dugbe': { lat: 7.3870, lng: 3.8790 },
  'bodija': { lat: 7.4280, lng: 3.9120 },
  'iwo road': { lat: 7.4020, lng: 3.9480 },
  'challenge': { lat: 7.3450, lng: 3.8810 },

  // Ghana (Accra)
  'madina': { lat: 5.6790, lng: -0.1650 },
  'circle': { lat: 5.5580, lng: -0.2100 },
  'kwame nkrumah circle': { lat: 5.5585, lng: -0.2105 },
  'kaneshie': { lat: 5.5680, lng: -0.2350 },
  'tema station': { lat: 5.5490, lng: -0.1980 },
  'legon': { lat: 5.6510, lng: -0.1870 },
  'lapaz': { lat: 5.6010, lng: -0.2420 },
  'osu': { lat: 5.5560, lng: -0.1820 },

  // Kenya (Nairobi)
  'cbd kencom': { lat: -1.2858, lng: 36.8245 },
  'westlands': { lat: -1.2675, lng: 36.8040 },
  'eastleigh': { lat: -1.2780, lng: 36.8520 },
  'githurai 45': { lat: -1.1980, lng: 36.9280 },
  'upper hill': { lat: -1.2980, lng: 36.8150 },

  // Rwanda (Kigali)
  'nyabugogo': { lat: -1.9380, lng: 30.0450 },
  'downtown cbd': { lat: -1.9510, lng: 30.0610 },
  'remera': { lat: -1.9610, lng: 30.1140 },
  'kimironko': { lat: -1.9420, lng: 30.1280 },
};

/**
 * Returns landmark coordinate or approximates based on city center
 */
export function getLandmarkCoordinate(name: string, cityId: string = 'lagos'): LatLng {
  const normalized = name.toLowerCase().trim();
  for (const [key, coord] of Object.entries(LANDMARK_COORDINATES)) {
    if (normalized.includes(key) || key.includes(normalized)) {
      return coord;
    }
  }

  const city = CITY_COORDINATES[cityId] || CITY_COORDINATES['lagos'];
  // Hash name for deterministic offset within city
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = (hash << 5) - hash + name.charCodeAt(i);
    hash |= 0;
  }
  const offsetLat = ((hash % 100) / 100) * 0.035;
  const offsetLng = (((hash >> 3) % 100) / 100) * 0.035;

  return {
    lat: city.center.lat + offsetLat,
    lng: city.center.lng + offsetLng,
  };
}
