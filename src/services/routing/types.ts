import { GeoCoordinate, RouteInstruction } from '../../types';

export interface RouteWayPoint {
  name?: string;
  lat: number;
  lng: number;
}

export interface RoutingOptions {
  mode?: 'driving' | 'transit' | 'walking';
  avoidIncidents?: boolean;
  alternative?: boolean;
  cityId?: string;
}

export interface RouteCalculationResult {
  roadGeometry: GeoCoordinate[]; // [lat, lng][] following actual roads
  distanceMeters: number;
  roadNames: string[];
  instructions: RouteInstruction[];
  intersections: GeoCoordinate[];
  confidence: number;
}

export interface RoutingProvider {
  name: string;
  getRoute(
    origin: RouteWayPoint,
    destination: RouteWayPoint,
    options?: RoutingOptions
  ): Promise<RouteCalculationResult>;

  getAlternativeRoutes(
    origin: RouteWayPoint,
    destination: RouteWayPoint,
    options?: RoutingOptions
  ): Promise<RouteCalculationResult[]>;

  getRouteInstructions(roadGeometry: GeoCoordinate[]): RouteInstruction[];

  matchLocationToRoad(
    lat: number,
    lng: number,
    roadGeometry: GeoCoordinate[]
  ): {
    snappedCoordinate: GeoCoordinate;
    distanceToRoadMeters: number;
    segmentIndex: number;
    progressPercentage: number;
  };
}
