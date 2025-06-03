
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
    <div className="flex flex-col h-screen bg-canvas">
      {/* Main content */}
      <div className="flex-1 overflow-hidden">
        <ActiveComponent />
      </div>

      {/* Bottom tab bar */}
      <div className="bg-card border-t border-default px-4 py-2">
        <div className="flex justify-around items-center h-16 max-w-md mx-auto">
          {tabs.map((tab) => {
            const IconComponent = tab.icon;
            const isActive = activeTab === tab.name;
            
            return (
              <button
                key={tab.name}
                onClick={() => setActiveTab(tab.name)}
                className={`flex flex-col items-center justify-center flex-1 py-1 transition-colors ${
                  isActive ? 'text-royalBlue-500' : 'text-secondary'
                }`}
              >
                <IconComponent size={24} className="mb-1" />
                <span className="text-xs font-medium">{tab.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TabNavigator;
