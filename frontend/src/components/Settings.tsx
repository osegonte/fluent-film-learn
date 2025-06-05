import React from 'react';
import { useTheme } from '@/hooks/useTheme';
import { Moon, Sun, Monitor, ChevronRight } from 'lucide-react';

export function Settings() {
  const { theme, setTheme } = useTheme();

  const themeOptions = [
    { value: 'light', label: 'Light', icon: Sun },
    { value: 'dark', label: 'Dark', icon: Moon },
    { value: 'system', label: 'System', icon: Monitor },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="safe-area-inset-top">
        <div className="px-4 py-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Settings
          </h1>

          {/* Theme Section */}
          <div className="settings-list">
            <div className="settings-section">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 px-4">
                Appearance
              </h2>
              
              <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden">
                {themeOptions.map((option) => {
                  const IconComponent = option.icon;
                  const isSelected = theme === option.value;
                  
                  return (
                    <button
                      key={option.value}
                      onClick={() => setTheme(option.value as any)}
                      className="settings-item w-full text-left"
                    >
                      <div className="flex items-center space-x-3">
                        <IconComponent className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                        <span className="settings-item-label">
                          {option.label}
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        {isSelected && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        )}
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Other Settings Sections */}
          <div className="settings-list">
            <div className="settings-section">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 px-4">
                Learning
              </h2>
              
              <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden">
                <div className="settings-item">
                  <span className="settings-item-label">Daily Goal</span>
                  <span className="settings-item-value">5 lessons</span>
                </div>
                
                <div className="settings-item">
                  <span className="settings-item-label">Notifications</span>
                  <span className="settings-item-value">Enabled</span>
                </div>
                
                <div className="settings-item">
                  <span className="settings-item-label">Offline Downloads</span>
                  <span className="settings-item-value">Wi-Fi Only</span>
                </div>
              </div>
            </div>
          </div>

          {/* Account Section */}
          <div className="settings-list">
            <div className="settings-section">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 px-4">
                Account
              </h2>
              
              <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden">
                <div className="settings-item">
                  <span className="settings-item-label">Profile</span>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </div>
                
                <div className="settings-item">
                  <span className="settings-item-label">Privacy</span>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </div>
                
                <div className="settings-item">
                  <span className="settings-item-label">Help & Support</span>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
