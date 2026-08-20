export interface TransportModeConfig {
  id: string;
  name: string;
  localName?: string;
  icon: string;
  description?: string;
}

export type ReportCategory = 'Fare' | 'Traffic' | 'Transport' | 'Safety' | 'Road';

export interface RouteStep {
  id: string;
  stepNumber: number;
  mode: string;
  from: string;
  to: string;
  boardLandmark: string;
  dropLandmark: string;
  estimatedMinutes: number;
  fareMin: number;
  fareMax: number;
  advice?: string;
}

export interface RouteOption {
  id: string;
  from: string;
  to: string;
  cityId: string;
  countryId: string;
  type: 'BALANCED' | 'FASTEST' | 'CHEAPEST';
  totalMinutesMin: number;
  totalMinutesMax: number;
  fareMin: number;
  fareMax: number;
  currencySymbol: string;
  transfersCount: number;
  walkingDistanceMeters: number;
  confidence: 'High confidence' | 'Estimated';
  reportCount: number;
  lastUpdated: string;
  steps: RouteStep[];
  routeAlert?: {
    title: string;
    message: string;
    severity: 'warning' | 'info' | 'danger';
    timeAgo: string;
    confirmedCount: number;
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
  fareAmount?: number;
  currencySymbol?: string;
  transportMode?: string;
  text: string;
  timeAgo: string;
  timestamp: number;
  stars: number;
  confirms: number;
  userStarred?: boolean;
  userConfirmed?: boolean;
  comments: Comment[];
  isAnonymous?: boolean;
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

export interface UserProfile {
  name: string;
  levelTitle: string;
  usefulContributions: number;
  confirmedReports: number;
  badges: { id: string; title: string; icon: string }[];
  savedRoutes: { id: string; from: string; to: string; label: string; cityId?: string }[];
  tripHistory: { 
    id: string; 
    from: string; 
    to: string; 
    date: string; 
    farePaid: number; 
    currencySymbol?: string;
    mode: string 
  }[];
  emergencyContacts: EmergencyContact[];
  dataSaverMode: boolean;
  selectedCountryId: string;
  selectedCityId: string;
}

// Backward compatibility alias
export type TransportMode = string;
