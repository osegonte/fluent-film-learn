
import React, { useState } from 'react';
import { 
  User, 
  Settings, 
  Crown, 
  Bell, 
  HelpCircle, 
  LogOut,
  ChevronRight 
} from 'lucide-react';

const ProfileScreen = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

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
      color: '#FF9500',
      isPremium: true,
    },
    {
      icon: Settings,
      title: 'Learning Settings',
      subtitle: 'Customize your experience',
      color: '#8E8E93',
    },
    {
      icon: Bell,
      title: 'Notifications',
      subtitle: 'Daily reminders and updates',
      color: '#8E8E93',
      hasSwitch: true,
    },
    {
      icon: HelpCircle,
      title: 'Help & Support',
      subtitle: 'Get help when you need it',
      color: '#8E8E93',
    },
  ];

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="flex-1 overflow-y-auto">
        {/* Profile Header */}
        <div className="px-5 py-8 pt-16 text-center">
          <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">🙋‍♂️</span>
          </div>
          <h1 className="text-2xl font-bold text-black mb-1">John Doe</h1>
          <p className="text-gray-500 mb-4">Intermediate Learner • Level B1</p>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-full text-sm font-semibold">
            Edit Profile
          </button>
        </div>

        {/* Stats Grid */}
        <div className="flex bg-white mx-5 rounded-xl p-5 mb-5 shadow-sm">
          {profileStats.map((stat, index) => (
            <div key={index} className="flex-1 text-center">
              <div className="text-xl font-bold text-black mb-1">{stat.value}</div>
              <div className="text-xs text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Languages Section */}
        <div className="px-5 mb-5">
          <h2 className="text-xl font-semibold text-black mb-4">Learning Languages</h2>
          <div className="bg-white rounded-xl overflow-hidden shadow-sm">
            <div className="p-4 border-b border-gray-100 flex items-center">
              <span className="text-2xl mr-3">🇪🇸</span>
              <div className="flex-1">
                <h3 className="font-semibold text-black">Spanish</h3>
                <p className="text-sm text-gray-500">Intermediate</p>
              </div>
              <div className="w-15 h-1 bg-gray-200 rounded-full ml-3">
                <div className="w-3/5 h-full bg-green-500 rounded-full"></div>
              </div>
            </div>
            
            <div className="p-4 border-b border-gray-100 flex items-center">
              <span className="text-2xl mr-3">🇫🇷</span>
              <div className="flex-1">
                <h3 className="font-semibold text-black">French</h3>
                <p className="text-sm text-gray-500">Beginner</p>
              </div>
              <div className="w-15 h-1 bg-gray-200 rounded-full ml-3">
                <div className="w-1/3 h-full bg-green-500 rounded-full"></div>
              </div>
            </div>

            <button className="p-4 text-center text-blue-600 font-medium">
              + Add Language
            </button>
          </div>
        </div>

        {/* Menu Items */}
        <div className="px-5 mb-5">
          <h2 className="text-xl font-semibold text-black mb-4">Settings</h2>
          <div className="bg-white rounded-xl overflow-hidden shadow-sm">
            {menuItems.map((item, index) => (
              <button key={index} className="w-full p-4 border-b border-gray-100 last:border-b-0 flex items-center">
                <div className="flex items-center flex-1">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center mr-3 ${
                    item.isPremium ? 'bg-orange-50' : 'bg-gray-100'
                  }`}>
                    <item.icon size={20} color={item.color} />
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="font-medium text-black">{item.title}</h3>
                    <p className="text-sm text-gray-500">{item.subtitle}</p>
                  </div>
                </div>
                {item.hasSwitch ? (
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notificationsEnabled}
                      onChange={(e) => setNotificationsEnabled(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                  </label>
                ) : (
                  <ChevronRight size={20} className="text-gray-300" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Sign Out */}
        <button className="flex items-center justify-center bg-white mx-5 mb-10 p-4 rounded-xl shadow-sm">
          <LogOut size={20} className="text-red-600 mr-2" />
          <span className="font-medium text-red-600">Sign Out</span>
        </button>
      </div>
    </div>
  );
};

export default ProfileScreen;
