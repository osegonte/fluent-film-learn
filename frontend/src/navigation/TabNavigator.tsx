import React, { useState } from 'react';
import { BookOpen, TrendingUp, Users, User } from 'lucide-react';
import LearnScreen from '../screens/LearnScreen';
import ProgressScreen from '../screens/ProgressScreen';
import CommunityScreen from '../screens/CommunityScreen';
import ProfileScreen from '../screens/ProfileScreen';

const TabNavigator = () => {
  const [activeTab, setActiveTab] = useState('Learn');

  const tabs = [
    { name: 'Learn', icon: BookOpen, component: LearnScreen },
    { name: 'Progress', icon: TrendingUp, component: ProgressScreen },
    { name: 'Community', icon: Users, component: CommunityScreen },
    { name: 'Profile', icon: User, component: ProfileScreen },
  ];

  const ActiveComponent = tabs.find(tab => tab.name === activeTab)?.component || LearnScreen;

  return (
    <div className="flex flex-col h-screen bg-background overflow-hidden">
      {/* Main content - Apple HIG: Content area */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden">
        <div className="safe-area-top">
          <ActiveComponent />
        </div>
      </div>

      {/* Tab Bar - Apple HIG: 49pt height + safe area */}
      <div className="tab-bar-ios safe-area-bottom">
        <div className="flex justify-around items-center h-[49px] px-2">
          {tabs.map((tab) => {
            const IconComponent = tab.icon;
            const isActive = activeTab === tab.name;
            
            return (
              <button
                key={tab.name}
                onClick={() => setActiveTab(tab.name)}
                className={`flex flex-col items-center justify-center flex-1 py-1 transition-all duration-200 animation-ios ${
                  isActive ? 'text-blue-600' : 'text-muted-foreground'
                }`}
                style={{
                  minHeight: '44px',
                  minWidth: '44px'
                }}
              >
                <IconComponent 
                  size={24} 
                  className={`mb-1 transition-all duration-200 ${
                    isActive ? 'scale-110' : 'scale-100'
                  }`} 
                />
                <span className="text-caption font-medium leading-none">
                  {tab.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TabNavigator;
