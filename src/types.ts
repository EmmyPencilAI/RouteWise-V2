export type TransportMode = 
  | 'Danfo' 
  | 'Keke' 
  | 'BRT' 
  | 'Okada' 
  | 'Taxi' 
  | 'Along' 
  | 'Micra' 
  | 'Coaster' 
  | 'Ferry' 
  | 'Walk';

export type ReportCategory = 'Fare' | 'Traffic' | 'Transport' | 'Safety' | 'Road';

export interface RouteStep {
  id: string;
  stepNumber: number;
  mode: TransportMode;
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
  type: 'BALANCED' | 'FASTEST' | 'CHEAPEST';
  totalMinutesMin: number;
  totalMinutesMax: number;
  fareMin: number;
  fareMax: number;
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
  city: string;
  locationOrRoute: string;
  fareAmount?: number;
  transportMode?: TransportMode;
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
  popularJunctions: string[];
  popularRoutes: { from: string; to: string }[];
  availableModes: TransportMode[];
  emergencyNumbers: { label: string; number: string }[];
}

export interface UserProfile {
  name: string;
  levelTitle: string;
  usefulContributions: number;
  confirmedReports: number;
  badges: { id: string; title: string; icon: string }[];
  savedRoutes: { id: string; from: string; to: string; label: string }[];
  tripHistory: { id: string; from: string; to: string; date: string; farePaid: number; mode: string }[];
  emergencyContacts: EmergencyContact[];
  dataSaverMode: boolean;
  selectedCity: string;
}
