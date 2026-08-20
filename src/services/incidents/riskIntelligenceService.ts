import { GeoCoordinate, CommunityPost, AlertFreshness, IncidentSeverity, RouteOption } from '../../types';

function calculateDistanceMeters(coord1: GeoCoordinate, coord2: GeoCoordinate): number {
  const R = 6371e3;
  const lat1 = (coord1[0] * Math.PI) / 180;
  const lat2 = (coord2[0] * Math.PI) / 180;
  const dLat = ((coord2[0] - coord1[0]) * Math.PI) / 180;
  const dLon = ((coord2[1] - coord1[1]) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c);
}

export class RiskIntelligenceService {
  /**
   * Calculates freshness tier based on elapsed time and report category
   */
  calculateFreshness(timestamp: number, category: string): AlertFreshness {
    const elapsedMinutes = Math.floor((Date.now() - timestamp) / (1000 * 60));

    if (category === 'Traffic') {
      if (elapsedMinutes <= 15) return 'LIVE';
      if (elapsedMinutes <= 45) return 'RECENT';
      if (elapsedMinutes <= 120) return 'AGING';
      return 'STALE';
    }

    if (category === 'Safety' || category === 'Road') {
      if (elapsedMinutes <= 20) return 'LIVE';
      if (elapsedMinutes <= 90) return 'RECENT';
      if (elapsedMinutes <= 240) return 'AGING';
      return 'STALE';
    }

    // Fare and general transit
    if (elapsedMinutes <= 60) return 'LIVE';
    if (elapsedMinutes <= 360) return 'RECENT';
    if (elapsedMinutes <= 1440) return 'AGING';
    return 'STALE';
  }

  /**
   * Assesses whether a route is affected by any active incident
   */
  assessRouteRisk(
    route: RouteOption,
    activeIncidents: CommunityPost[]
  ): {
    riskScore: IncidentSeverity;
    affectingIncident: CommunityPost | null;
    isRerouteRecommended: boolean;
    reason?: string;
  } {
    if (!route.roadGeometry || route.roadGeometry.length === 0 || activeIncidents.length === 0) {
      return {
        riskScore: 'LOW',
        affectingIncident: null,
        isRerouteRecommended: false,
      };
    }

    // Filter relevant non-stale safety and roadblock incidents
    const criticalIncidents = activeIncidents.filter((inc) => {
      const freshness = this.calculateFreshness(inc.timestamp, inc.category);
      if (freshness === 'STALE') return false;
      return (
        inc.category === 'Safety' ||
        inc.category === 'Road' ||
        (inc.category === 'Traffic' && inc.severity === 'HIGH')
      );
    });

    for (const incident of criticalIncidents) {
      if (!incident.coordinates) continue;

      // Check distance from incident coordinates to any point on the route's road geometry
      for (const roadPoint of route.roadGeometry) {
        const distance = calculateDistanceMeters(incident.coordinates, roadPoint);
        // If within 650 meters of the road path
        if (distance <= 650) {
          const isHighSeverity = incident.severity === 'HIGH' || incident.severity === 'ELEVATED' || incident.category === 'Safety' || incident.category === 'Road';
          const hasConfirmations = incident.confirms >= 2 || incident.stars >= 5 || incident.status === 'VERIFIED';

          if (isHighSeverity && hasConfirmations) {
            return {
              riskScore: incident.severity || 'HIGH',
              affectingIncident: incident,
              isRerouteRecommended: true,
              reason: `Incident reported around ${incident.locationOrRoute}: "${incident.text}"`,
            };
          }

          return {
            riskScore: incident.severity || 'MODERATE',
            affectingIncident: incident,
            isRerouteRecommended: false,
            reason: `Caution: ${incident.text}`,
          };
        }
      }
    }

    return {
      riskScore: 'LOW',
      affectingIncident: null,
      isRerouteRecommended: false,
    };
  }
}

export const riskIntelligenceService = new RiskIntelligenceService();
