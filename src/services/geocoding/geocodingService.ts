import { GeoCoordinate, CityConfig, CountryConfig } from '../../types';
import { COUNTRIES_DATA, getCityById, getCountryById } from '../../data/cities';
import { LANDMARK_COORDINATES, CITY_COORDINATES, getLandmarkCoordinate } from '../../data/coordinates';

export interface ReverseGeocodeResult {
  country: CountryConfig;
  city: CityConfig;
  area: string;
  nearestLandmark: string;
  coordinates: GeoCoordinate;
  formattedAddress: string;
}

function haversineDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export class GeocodingService {
  /**
   * Identifies Country, City, Area and nearest Landmark from GPS coordinates
   */
  reverseGeocode(lat: number, lng: number): ReverseGeocodeResult {
    let closestCity: CityConfig = COUNTRIES_DATA[0].cities[0];
    let minCityDistance = Infinity;

    // 1. Find nearest city center
    for (const country of COUNTRIES_DATA) {
      for (const city of country.cities) {
        const cityCoord = CITY_COORDINATES[city.id]?.center || { lat: 6.5244, lng: 3.3792 };
        const dist = haversineDistance(lat, lng, cityCoord.lat, cityCoord.lng);
        if (dist < minCityDistance) {
          minCityDistance = dist;
          closestCity = city;
        }
      }
    }

    const country = getCountryById(closestCity.countryId);

    // 2. Find nearest landmark within that city or global landmarks
    let nearestLandmark = closestCity.popularJunctions[0] || 'Central Bus Terminal';
    let minLandmarkDist = Infinity;

    for (const [name, coord] of Object.entries(LANDMARK_COORDINATES)) {
      const dist = haversineDistance(lat, lng, coord.lat, coord.lng);
      if (dist < minLandmarkDist) {
        minLandmarkDist = dist;
        nearestLandmark = name.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
      }
    }

    return {
      country,
      city: closestCity,
      area: `${nearestLandmark} Axis`,
      nearestLandmark,
      coordinates: [lat, lng],
      formattedAddress: `${nearestLandmark}, ${closestCity.name}, ${country.name}`,
    };
  }

  /**
   * Resolves a search string into coordinates
   */
  geocode(query: string, preferredCityId: string = 'lagos'): { name: string; coordinates: GeoCoordinate } {
    const coord = getLandmarkCoordinate(query, preferredCityId);
    return {
      name: query,
      coordinates: [coord.lat, coord.lng],
    };
  }
}

export const geocodingService = new GeocodingService();
