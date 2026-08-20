export type GeoCoordinate = [number, number]; // [lat, lng]

export interface TransportModeConfig {
  id: string;
  name: string;
  localName?: string;
  icon: string;
  description?: string;
}

export type ReportCategory = 'Fare' | 'Traffic' | 'Transport' | 'Safety' | 'Road';

export type AlertFreshness = 'LIVE' | 'RECENT' | 'AGING' | 'STALE';
export type IncidentSeverity = 'LOW' | 'MODERATE' | 'ELEVATED' | 'HIGH';
export type ReportStatus = 'UNVERIFIED' | 'CORROBORATED' | 'VERIFIED' | 'RESOLVED' | 'DISMISSED';

export interface RouteInstruction {
  text: string;
  distanceMeters: number;
  roadName: string;
  type: 'straight' | 'turn-left' | 'turn-right' | 'merge' | 'roundabout' | 'arrive' | 'transfer';
  coordinate: GeoCoordinate;
}

export interface RouteStep {
  id: string;
  stepNumber: number;
  mode: string;
  from: string;
  to: string;
  boardLandmark: string;
  dropLandmark: string;
  startCoordinate: GeoCoordinate;
  endCoordinate: GeoCoordinate;
  roadGeometry: GeoCoordinate[]; // Real road coordinates for this leg
  fareMin: number;
  fareMax: number;
  advice?: string;
  distanceMeters?: number;
  instructions?: RouteInstruction[];
}

export interface RouteOption {
  id: string;
  from: string;
  to: string;
  cityId: string;
  countryId: string;
  type: 'BALANCED' | 'FASTEST' | 'CHEAPEST';
  fareMin: number;
  fareMax: number;
  currencySymbol: string;
  transfersCount: number;
  totalDistanceMeters: number;
  confidence: 'High confidence' | 'Moderate' | 'Estimated';
  reportCount: number;
  lastUpdated: string;
  riskScore: IncidentSeverity;
  roadGeometry: GeoCoordinate[]; // Complete actual road geometry polyline
  alternativeRoadGeometry?: GeoCoordinate[];
  alternativeRoute?: RouteOption;
  isRerouteRecommended?: boolean;
  rerouteReason?: string;
  steps: RouteStep[];
  routeAlert?: {
    id: string;
    title: string;
    message: string;
    severity: IncidentSeverity;
    freshness: AlertFreshness;
    timeAgo: string;
    confirmedCount: number;
    starsCount: number;
    location: string;
    coordinates: GeoCoordinate;
    status: ReportStatus;
  };
}

export interface Comment {
  id: string;
  userName: string;
  text: string;
  timeAgo: string;
}

export interface CommunityPost {
  id: string;
  category: ReportCategory;
  countryId: string;
  city: string;
  locationOrRoute: string;
  coordinates?: GeoCoordinate;
  fareAmount?: number;
  currencySymbol?: string;
  transportMode?: string;
  text: string;
  timeAgo: string;
  timestamp: number;
  freshness: AlertFreshness;
  severity?: IncidentSeverity;
  status: ReportStatus;
  stars: number;
  confirms: number;
  userStarred?: boolean;
  userConfirmed?: boolean;
  comments: Comment[];
  isAnonymous?: boolean;
  source?: 'commuter' | 'operator' | 'official' | 'traffic_corps';
  imageUrl?: string;
}

export interface TripSession {
  tripId: string;
  origin: string;
  destination: string;
  route: RouteOption;
  currentLegIndex: number;
  transportMode: string;
  startedAt: number;
  lastLocation: GeoCoordinate | null;
  status: 'PLANNED' | 'ACTIVE' | 'PAUSED' | 'COMPLETED' | 'CANCELLED';
  completedGeometry: GeoCoordinate[];
  remainingGeometry: GeoCoordinate[];
  activeAlert?: CommunityPost | null;
  hasRerouted?: boolean;
}

export interface FareObservation {
  id: string;
  origin: string;
  destination: string;
  transportMode: string;
  cityId: string;
  countryId: string;
  fare: number;
  currencySymbol: string;
  timestamp: number;
  userId?: string;
  confidence: 'High' | 'Moderate' | 'Low';
  confirmedCount: number;
}

export interface FarePrediction {
  origin: string;
  destination: string;
  transportMode: string;
  fareMin: number;
  fareMax: number;
  typicalFare: number;
  currencySymbol: string;
  recentObservationsCount: number;
  confidence: 'High' | 'Moderate' | 'Estimated' | 'Low';
  lastUpdated: string;
}

export interface EmergencyContact {
  id: string;
  name: string;
  phone: string;
  relationship: string;
}

export interface CityConfig {
  id: string;
  name: string;
  state: string;
  countryId: string;
  popularJunctions: string[];
  popularRoutes: { from: string; to: string }[];
  availableModes: string[];
  emergencyNumbers: { label: string; number: string }[];
  localDialectTip?: string;
}

export interface CountryConfig {
  id: string;
  name: string;
  code: string;
  currency: string;
  currencySymbol: string;
  flag: string;
  isPrimaryMarket: boolean;
  emergencyNumbers: { label: string; number: string }[];
  cities: CityConfig[];
  availableModes: TransportModeConfig[];
}

export interface ContributorBadge {
  id: string;
  title: string;
  icon: string;
  description: string;
  unlocked: boolean;
  progress?: number;
}

export interface UserProfile {
  id: string;
  phoneNumber?: string;
  isPhoneVerified: boolean;
  name: string;
  levelTitle: string;
  usefulContributions: number;
  confirmedReports: number;
  starsReceived: number;
  badges: ContributorBadge[];
  savedRoutes: { id: string; from: string; to: string; label: string; cityId?: string }[];
  tripHistory: { 
    id: string; 
    from: string; 
    to: string; 
    date: string; 
    farePaid: number; 
    currencySymbol?: string;
    mode: string;
    wasAccurate?: boolean;
  }[];
  emergencyContacts: EmergencyContact[];
  dataSaverMode: boolean;
  selectedCountryId: string;
  selectedCityId: string;
}

export type TransportMode = string;
