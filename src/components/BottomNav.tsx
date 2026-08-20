import React from 'react';
import { Home, Compass, Users, User } from 'lucide-react';

export type TabType = 'home' | 'journey' | 'community' | 'profile';

interface BottomNavProps {
  activeTab: TabType;
  onChangeTab: (tab: TabType) => void;
  communityAlertCount?: number;
  hasActiveJourney?: boolean;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onChangeTab,
  communityAlertCount = 0,
  hasActiveJourney = false,
}) => {
  const tabs = [
    {
      id: 'home' as TabType,
      label: 'Home',
      icon: Home,
    },
    {
      id: 'journey' as TabType,
      label: 'Journey',
      icon: Compass,
      hasBadge: hasActiveJourney,
      badgeText: 'Live',
    },
    {
      id: 'community' as TabType,
      label: 'Community',
      icon: Users,
      badgeCount: communityAlertCount > 0 ? communityAlertCount : undefined,
    },
    {
      id: 'profile' as TabType,
      label: 'Profile',
      icon: User,
    },
  ];

  return (
    <nav
      id="bottom-navigation"
      className="bg-white border-t border-gray-100 fixed bottom-0 left-0 right-0 z-40 max-w-md mx-auto h-16 sm:h-20 px-3 flex items-center justify-around shadow-xs"
      aria-label="Main Navigation"
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        const Icon = tab.icon;

        return (
          <button
            key={tab.id}
            id={`nav-tab-${tab.id}`}
            onClick={() => onChangeTab(tab.id)}
            className={`flex-1 h-full flex flex-col items-center justify-center gap-1 relative transition-all cursor-pointer ${
              isActive
                ? 'text-[#FF6321] font-bold'
                : 'text-[#1A1A1A] opacity-40 hover:opacity-100 hover:text-gray-900'
            }`}
          >
            <div className="relative">
              <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5px]' : 'stroke-2'}`} />
              {tab.hasBadge && (
                <span className="absolute -top-1 -right-2.5 px-1 py-0.2 bg-[#FF6321] text-white text-[8px] font-black uppercase rounded-full animate-pulse">
                  {tab.badgeText}
                </span>
              )}
              {tab.badgeCount && tab.badgeCount > 0 ? (
                <span className="absolute -top-1 -right-2 px-1 py-0.2 bg-[#1A1A1A] text-white text-[8px] font-black rounded-full min-w-[14px] text-center">
                  {tab.badgeCount}
                </span>
              ) : null}
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider">{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
