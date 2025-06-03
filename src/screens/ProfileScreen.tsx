
import React from 'react';
import { User, Settings, Crown, Bell, HelpCircle, LogOut, ChevronRight } from 'lucide-react';

const ProfileScreen = () => {
  const profileStats = [
    { label: 'Words Learned', value: '1,247' },
    { label: 'Movies Completed', value: '8' },
    { label: 'Total Study Time', value: '47h 23m' },
    { label: 'Current Streak', value: '12 days' },
  ];

  const menuItems = [
    {
      icon: Crown,
      title: 'Upgrade to Premium',
      subtitle: 'Unlock all features',
      isPremium: true,
    },
    {
      icon: Settings,
      title: 'Learning Settings',
      subtitle: 'Customize your experience',
    },
    {
      icon: Bell,
      title: 'Notifications',
      subtitle: 'Daily reminders and updates',
    },
    {
      icon: HelpCircle,
      title: 'Help & Support',
      subtitle: 'Get help when you need it',
    },
  ];

  const languages = [
    { name: 'Spanish', level: 'Intermediate', progress: 60, flag: '🇪🇸' },
    { name: 'French', level: 'Beginner', progress: 30, flag: '🇫🇷' },
  ];

  return (
    <div className="flex flex-col h-full bg-canvas">
      <div className="flex-1 overflow-y-auto">
        {/* Profile Header */}
        <div className="px-6 py-8 pt-16 text-center">
          <div className="w-20 h-20 bg-royalBlue-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <User size={40} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold text-primary mb-1">John Doe</h1>
          <p className="text-secondary mb-4">Intermediate Learner • Level B1</p>
          <button className="btn-primary">
            Edit Profile
          </button>
        </div>

        {/* Stats Grid */}
        <div className="px-6 mb-8">
          <div className="bg-card rounded-xl p-6 border border-default">
            <div className="grid grid-cols-2 gap-6">
              {profileStats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-xl font-bold text-primary mb-1">{stat.value}</div>
                  <div className="text-xs text-secondary">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Languages Section */}
        <div className="px-6 mb-8">
          <h2 className="text-xl font-semibold text-primary mb-4">Learning Languages</h2>
          <div className="bg-card rounded-xl overflow-hidden border border-default">
            {languages.map((language, index) => (
              <div key={index} className={`p-4 flex items-center ${index < languages.length - 1 ? 'border-b border-default' : ''}`}>
                <span className="text-2xl mr-3">{language.flag}</span>
                <div className="flex-1">
                  <h3 className="font-semibold text-primary">{language.name}</h3>
                  <p className="text-sm text-secondary">{language.level}</p>
                </div>
                <div className="w-16 h-2 bg-slate-800 dark:bg-slate-600 rounded-full ml-3">
                  <div 
                    className="progress-gradient h-2 rounded-full transition-all duration-300"
                    style={{ width: `${language.progress}%` }}
                  ></div>
                </div>
              </div>
            ))}
            
            <button className="w-full p-4 text-center text-royalBlue-500 font-medium hover:bg-slate-800 dark:hover:bg-slate-600 transition-colors">
              + Add Language
            </button>
          </div>
        </div>

        {/* Menu Items */}
        <div className="px-6 mb-8">
          <h2 className="text-xl font-semibold text-primary mb-4">Settings</h2>
          <div className="bg-card rounded-xl overflow-hidden border border-default">
            {menuItems.map((item, index) => (
              <button key={index} className={`w-full p-4 flex items-center hover:bg-slate-800 dark:hover:bg-slate-600 transition-colors ${index < menuItems.length - 1 ? 'border-b border-default' : ''}`}>
                <div className="flex items-center flex-1">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-3 ${
                    item.isPremium ? 'bg-amber-400 bg-opacity-20' : 'bg-slate-800 dark:bg-slate-600'
                  }`}>
                    <item.icon size={20} className={item.isPremium ? 'text-amber-400' : 'text-secondary'} />
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="font-medium text-primary">{item.title}</h3>
                    <p className="text-sm text-secondary">{item.subtitle}</p>
                  </div>
                </div>
                <ChevronRight size={20} className="text-secondary" />
              </button>
            ))}
          </div>
        </div>

        {/* Sign Out */}
        <div className="px-6 pb-8">
          <button className="w-full bg-card p-4 rounded-xl border border-default flex items-center justify-center hover:bg-slate-800 dark:hover:bg-slate-600 transition-colors">
            <LogOut size={20} className="text-persimmon-500 mr-2" />
            <span className="font-medium text-persimmon-500">Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;
