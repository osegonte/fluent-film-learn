import React, { useState, useEffect } from 'react';
import { toggleTheme, setTheme } from './theme.js';

export function ThemeSettings() {
  const [currentTheme, setCurrentTheme] = useState('light');

  useEffect(() => {
    const theme = localStorage.getItem('theme') || 'light';
    setCurrentTheme(theme);
  }, []);

  const handleThemeChange = (theme: string) => {
    setTheme(theme);
    setCurrentTheme(theme);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-4">
      <h3 className="font-bold text-lg mb-4 text-gray-900 dark:text-white">Appearance</h3>
      
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="font-semibold text-gray-900 dark:text-white">Theme</span>
        </div>
        
        <div className="space-y-2">
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="radio"
              name="theme"
              value="light"
              checked={currentTheme === 'light'}
              onChange={() => handleThemeChange('light')}
              className="w-4 h-4 text-blue-500"
            />
            <span className="text-gray-900 dark:text-white">Light</span>
          </label>
          
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="radio"
              name="theme"
              value="dark"
              checked={currentTheme === 'dark'}
              onChange={() => handleThemeChange('dark')}
              className="w-4 h-4 text-blue-500"
            />
            <span className="text-gray-900 dark:text-white">Dark</span>
          </label>
        </div>
      </div>
    </div>
  );
}

// Simple toggle button for quick access
export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const theme = localStorage.getItem('theme') || 'light';
    setIsDark(theme === 'dark');
  }, []);

  const handleToggle = () => {
    toggleTheme();
    setIsDark(!isDark);
  };

  return (
    <button
      onClick={handleToggle}
      className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
      title="Toggle theme"
    >
      {isDark ? '☀️' : '🌙'}
    </button>
  );
}
