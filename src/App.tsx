import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { BottomNav, TabType } from './components/BottomNav';
import { HomeScreen } from './components/HomeScreen';
import { JourneyScreen } from './components/JourneyScreen';
import { CommunityScreen } from './components/CommunityScreen';
import { ProfileScreen } from './components/ProfileScreen';

// Modals
import { ReportModal } from './components/modals/ReportModal';
import { QuickFareModal } from './components/modals/QuickFareModal';
import { SOSModal } from './components/modals/SOSModal';
import { CitySelectorModal } from './components/modals/CitySelectorModal';
import { OnboardingModal } from './components/modals/OnboardingModal';

// Data & Types
import { COUNTRIES_DATA, getCityById, getCountryById } from './data/cities';
import { generateLocalRoute } from './data/defaultRoutes';
import { INITIAL_COMMUNITY_POSTS } from './data/communityData';
import { 
  CityConfig, 
  CountryConfig,
  RouteOption, 
  CommunityPost, 
  UserProfile 
} from './types';

const INITIAL_PROFILE: UserProfile = {
  name: 'Emeka Adeleke',
  levelTitle: 'Transit Insider',
  usefulContributions: 240,
  confirmedReports: 31,
  badges: [
    { id: 'b1', title: 'Route Scout', icon: '🧭' },
    { id: 'b2', title: 'Fare Watcher', icon: '💰' },
    { id: 'b3', title: 'Road Hero', icon: '🚦' },
  ],
  savedRoutes: [
    { id: 'sr-1', from: 'Ojota', to: 'Yaba', label: 'Home → Work', cityId: 'lagos' },
    { id: 'sr-2', from: 'Ikeja', to: 'Lekki Phase 1', label: 'Home → Client', cityId: 'lagos' },
  ],
  tripHistory: [
    { id: 'th-1', from: 'Ojota', to: 'Yaba', date: 'Yesterday', farePaid: 900, currencySymbol: '₦', mode: 'Danfo' },
    { id: 'th-2', from: 'Ikeja', to: 'CMS', date: '2 days ago', farePaid: 800, currencySymbol: '₦', mode: 'Danfo' },
  ],
  emergencyContacts: [
    { id: 'ec-1', name: 'Sister Chidinma', phone: '08031234567', relationship: 'Family' },
    { id: 'ec-2', name: 'Brother Femi', phone: '08129876543', relationship: 'Family' },
  ],
  dataSaverMode: false,
  selectedCountryId: 'nigeria',
  selectedCityId: 'lagos',
};

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [selectedCountryId, setSelectedCountryId] = useState<string>(() => {
    return localStorage.getItem('routewise_country') || 'nigeria';
  });
  const [selectedCityId, setSelectedCityId] = useState<string>(() => {
    return localStorage.getItem('routewise_city') || 'lagos';
  });

  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    const cached = localStorage.getItem('routewise_profile');
    return cached ? JSON.parse(cached) : INITIAL_PROFILE;
  });

  const [currentRoute, setCurrentRoute] = useState<RouteOption | null>(() => {
    return generateLocalRoute('Ojota', 'Yaba', 'lagos');
  });

  const [communityPosts, setCommunityPosts] = useState<CommunityPost[]>(() => {
    const cached = localStorage.getItem('routewise_community');
    return cached ? JSON.parse(cached) : INITIAL_COMMUNITY_POSTS;
  });

  // Modals state
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isQuickFareModalOpen, setIsQuickFareModalOpen] = useState(false);
  const [isSOSModalOpen, setIsSOSModalOpen] = useState(false);
  const [isCitySelectorOpen, setIsCitySelectorOpen] = useState(false);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(() => {
    return !localStorage.getItem('routewise_onboarded');
  });

  // Quick fare route label state
  const [quickFareRouteLabel, setQuickFareRouteLabel] = useState('Ojota → Yaba');
  const [quickFareMode, setQuickFareMode] = useState<string>('Danfo');

  // Network & Cache state
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [lastUpdatedTime, setLastUpdatedTime] = useState('10:42 AM');

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('routewise_profile', JSON.stringify(userProfile));
  }, [userProfile]);

  useEffect(() => {
    localStorage.setItem('routewise_community', JSON.stringify(communityPosts));
  }, [communityPosts]);

  useEffect(() => {
    localStorage.setItem('routewise_country', selectedCountryId);
    localStorage.setItem('routewise_city', selectedCityId);
  }, [selectedCountryId, selectedCityId]);

  // Online / offline listeners
  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => {
      setIsOffline(true);
      const now = new Date();
      setLastUpdatedTime(`${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')} ${now.getHours() >= 12 ? 'PM' : 'AM'}`);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const currentCountry: CountryConfig = getCountryById(selectedCountryId);
  const currentCity: CityConfig = getCityById(selectedCityId);

  // Route calculation & selection
  const handleFindRoute = (from: string, to: string) => {
    const generated = generateLocalRoute(from, to, currentCity.id);
    setCurrentRoute(generated);
    setActiveTab('journey');
  };

  // Save / Bookmark route
  const handleSaveRoute = (from: string, to: string) => {
    const exists = userProfile.savedRoutes.some(
      (r) => r.from.toLowerCase() === from.toLowerCase() && r.to.toLowerCase() === to.toLowerCase()
    );

    if (exists) {
      setUserProfile((prev) => ({
        ...prev,
        savedRoutes: prev.savedRoutes.filter(
          (r) => !(r.from.toLowerCase() === from.toLowerCase() && r.to.toLowerCase() === to.toLowerCase())
        ),
      }));
    } else {
      const newSaved = {
        id: `sr-${Date.now()}`,
        from,
        to,
        label: `${from} → ${to}`,
        cityId: currentCity.id,
      };
      setUserProfile((prev) => ({
        ...prev,
        savedRoutes: [...prev.savedRoutes, newSaved],
        usefulContributions: prev.usefulContributions + 2,
      }));
    }
  };

  const handleDeleteSavedRoute = (id: string) => {
    setUserProfile((prev) => ({
      ...prev,
      savedRoutes: prev.savedRoutes.filter((r) => r.id !== id),
    }));
  };

  // Submitting community report
  const handleSubmitReport = (newReportData: Omit<CommunityPost, 'id' | 'timestamp' | 'stars' | 'confirms' | 'comments'>) => {
    const newPost: CommunityPost = {
      ...newReportData,
      id: `post-${Date.now()}`,
      timestamp: Date.now(),
      stars: 1,
      confirms: 0,
      userStarred: true,
      comments: [],
    };

    setCommunityPosts((prev) => [newPost, ...prev]);
    setUserProfile((prev) => ({
      ...prev,
      usefulContributions: prev.usefulContributions + 5,
    }));

    // If report has fare, update current route if matches
    if (newReportData.category === 'Fare' && newReportData.fareAmount && currentRoute) {
      if (newReportData.locationOrRoute.toLowerCase().includes(currentRoute.from.toLowerCase())) {
        setCurrentRoute((prev) => {
          if (!prev) return prev;
          return {
            ...prev,
            reportCount: prev.reportCount + 1,
            lastUpdated: 'Just now',
          };
        });
      }
    }
  };

  // Star & Confirm interactions
  const handleStarPost = (postId: string) => {
    setCommunityPosts((prev) =>
      prev.map((post) => {
        if (post.id === postId) {
          const isStarred = !!post.userStarred;
          return {
            ...post,
            userStarred: !isStarred,
            stars: isStarred ? post.stars - 1 : post.stars + 1,
          };
        }
        return post;
      })
    );
  };

  const handleConfirmPost = (postId: string) => {
    setCommunityPosts((prev) =>
      prev.map((post) => {
        if (post.id === postId) {
          const isConfirmed = !!post.userConfirmed;
          return {
            ...post,
            userConfirmed: !isConfirmed,
            confirms: isConfirmed ? post.confirms - 1 : post.confirms + 1,
          };
        }
        return post;
      })
    );

    setUserProfile((prev) => ({
      ...prev,
      confirmedReports: prev.confirmedReports + 1,
      usefulContributions: prev.usefulContributions + 1,
    }));
  };

  const handleAddComment = (postId: string, text: string) => {
    const newComment = {
      id: `c-${Date.now()}`,
      userName: userProfile.name,
      text,
      timeAgo: 'Just now',
    };

    setCommunityPosts((prev) =>
      prev.map((p) => (p.id === postId ? { ...p, comments: [...p.comments, newComment] } : p))
    );

    setUserProfile((prev) => ({
      ...prev,
      usefulContributions: prev.usefulContributions + 2,
    }));
  };

  const handleOpenQuickFare = (routeLabel?: string, mode?: string) => {
    const defaultLabel = routeLabel || (currentCity.popularJunctions.length >= 2 ? `${currentCity.popularJunctions[0]} → ${currentCity.popularJunctions[1]}` : `${currentCity.name} Route`);
    setQuickFareRouteLabel(defaultLabel);
    if (mode) setQuickFareMode(mode);
    else if (currentCity.availableModes.length > 0) setQuickFareMode(currentCity.availableModes[0]);
    setIsQuickFareModalOpen(true);
  };

  const handleSelectCity = (city: CityConfig, country: CountryConfig) => {
    setSelectedCountryId(country.id);
    setSelectedCityId(city.id);
    setUserProfile((prev) => ({
      ...prev,
      selectedCountryId: country.id,
      selectedCityId: city.id,
    }));

    // If city has popular routes, update default active route
    if (city.popularRoutes.length > 0) {
      const defaultRt = city.popularRoutes[0];
      const generated = generateLocalRoute(defaultRt.from, defaultRt.to, city.id);
      setCurrentRoute(generated);
    } else if (city.popularJunctions.length >= 2) {
      const generated = generateLocalRoute(city.popularJunctions[0], city.popularJunctions[1], city.id);
      setCurrentRoute(generated);
    }
  };

  const handleCompleteOnboarding = () => {
    localStorage.setItem('routewise_onboarded', 'true');
    setIsOnboardingOpen(false);
  };

  const handleToggleOfflineSimulator = () => {
    setIsOffline((prev) => !prev);
    const now = new Date();
    setLastUpdatedTime(`${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')} ${now.getHours() >= 12 ? 'PM' : 'AM'}`);
  };

  const isCurrentRouteSaved = currentRoute
    ? userProfile.savedRoutes.some(
        (r) =>
          r.from.toLowerCase() === currentRoute.from.toLowerCase() &&
          r.to.toLowerCase() === currentRoute.to.toLowerCase()
      )
    : false;

  return (
    <div className="min-h-screen bg-[#F5F5F5] text-[#1A1A1A] font-sans antialiased flex justify-center items-center selection:bg-[#FF6321] selection:text-white p-0 sm:p-4">
      {/* Android Device Container Wrapper */}
      <div className="w-full max-w-md bg-white min-h-screen sm:min-h-[720px] sm:h-[840px] sm:max-h-[92vh] flex flex-col relative shadow-2xl border-x border-gray-100 sm:rounded-[32px] sm:border-8 sm:border-[#1A1A1A] overflow-hidden">
        {/* Device Top Speaker Notch */}
        <div className="hidden sm:block h-5 w-28 bg-[#1A1A1A] absolute top-0 left-1/2 -translate-x-1/2 rounded-b-2xl z-30 pointer-events-none" />

        {/* Sticky Header */}
        <Header
          currentCity={currentCity}
          currentCountry={currentCountry}
          onOpenCitySelector={() => setIsCitySelectorOpen(true)}
          isOffline={isOffline}
          isDataSaver={userProfile.dataSaverMode}
          onToggleDataSaver={() =>
            setUserProfile((prev) => ({ ...prev, dataSaverMode: !prev.dataSaverMode }))
          }
          onTriggerSOS={() => setIsSOSModalOpen(true)}
          lastUpdatedTime={lastUpdatedTime}
        />

        {/* Offline Banner if Offline */}
        {isOffline && (
          <div className="bg-[#1A1A1A] text-white px-4 py-2 text-xs font-bold flex items-center justify-between shadow-xs border-b border-gray-800">
            <span className="flex items-center gap-1.5">
              <span className="text-[#FF6321]">📶</span>
              <span className="tracking-tight uppercase text-[11px]">OFFLINE MODE • Cached Transit & Fare Intel</span>
            </span>
            <button
              onClick={handleToggleOfflineSimulator}
              className="text-[10px] text-[#FF6321] hover:underline uppercase font-black tracking-wider cursor-pointer"
            >
              Go Online
            </button>
          </div>
        )}

        {/* Main Content Viewport */}
        <main className="flex-1 p-4 pb-24 overflow-y-auto bg-white">
          {activeTab === 'home' && (
            <HomeScreen
              currentCity={currentCity}
              currentCountry={currentCountry}
              onFindRoute={handleFindRoute}
              onOpenQuickFareReport={() => handleOpenQuickFare()}
              onOpenReportModal={() => setIsReportModalOpen(true)}
              recentPosts={communityPosts}
              savedRoutes={userProfile.savedRoutes}
              isDataSaver={userProfile.dataSaverMode}
            />
          )}

          {activeTab === 'journey' && (
            <JourneyScreen
              route={currentRoute}
              onBackToHome={() => setActiveTab('home')}
              onChangeRoute={handleFindRoute}
              onOpenQuickFareReport={handleOpenQuickFare}
              onTriggerSOS={() => setIsSOSModalOpen(true)}
              onSaveRoute={handleSaveRoute}
              isSaved={isCurrentRouteSaved}
            />
          )}

          {activeTab === 'community' && (
            <CommunityScreen
              posts={communityPosts}
              onOpenReportModal={() => setIsReportModalOpen(true)}
              onStarPost={handleStarPost}
              onConfirmPost={handleConfirmPost}
              onAddComment={handleAddComment}
              selectedCityName={currentCity.name}
              currentCountry={currentCountry}
            />
          )}

          {activeTab === 'profile' && (
            <ProfileScreen
              userProfile={userProfile}
              currentCountry={currentCountry}
              currentCity={currentCity}
              onUpdateUserProfile={(updated) => setUserProfile((prev) => ({ ...prev, ...updated }))}
              onSelectSavedRoute={handleFindRoute}
              onDeleteSavedRoute={handleDeleteSavedRoute}
              onOpenOnboarding={() => setIsOnboardingOpen(true)}
              onOpenCitySelector={() => setIsCitySelectorOpen(true)}
              isOffline={isOffline}
              onToggleOfflineSimulator={handleToggleOfflineSimulator}
            />
          )}
        </main>

        {/* Bottom Navigation (4 Primary Tabs Only) */}
        <BottomNav
          activeTab={activeTab}
          onChangeTab={setActiveTab}
          communityAlertCount={communityPosts.filter((p) => p.category === 'Safety' || p.category === 'Traffic').length}
          hasActiveJourney={activeTab === 'journey'}
        />

        {/* Device Bottom Home Bar Indicator */}
        <div className="hidden sm:block absolute bottom-1.5 left-1/2 -translate-x-1/2 w-28 h-1 bg-gray-300 rounded-full z-50 pointer-events-none" />

        {/* Modals & Flows */}
        <ReportModal
          isOpen={isReportModalOpen}
          onClose={() => setIsReportModalOpen(false)}
          onSubmitReport={handleSubmitReport}
          defaultLocation={currentRoute ? `${currentRoute.from} → ${currentRoute.to}` : ''}
          currentCity={currentCity}
          currentCountry={currentCountry}
        />

        <QuickFareModal
          isOpen={isQuickFareModalOpen}
          onClose={() => setIsQuickFareModalOpen(false)}
          onSubmitFare={handleSubmitReport}
          defaultRoute={quickFareRouteLabel}
          defaultMode={quickFareMode}
          currentCountry={currentCountry}
          currentCity={currentCity}
        />

        <SOSModal
          isOpen={isSOSModalOpen}
          onClose={() => setIsSOSModalOpen(false)}
          emergencyContacts={userProfile.emergencyContacts}
          currentCity={currentCity}
          currentRouteLabel={currentRoute ? `${currentRoute.from} → ${currentRoute.to}` : `${currentCity.name} Transit`}
        />

        <CitySelectorModal
          isOpen={isCitySelectorOpen}
          onClose={() => setIsCitySelectorOpen(false)}
          selectedCityId={selectedCityId}
          selectedCountryId={selectedCountryId}
          onSelectCity={handleSelectCity}
        />

        <OnboardingModal
          isOpen={isOnboardingOpen}
          onComplete={handleCompleteOnboarding}
        />
      </div>
    </div>
  );
}
