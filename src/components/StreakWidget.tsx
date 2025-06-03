
import React from 'react';

const StreakWidget = () => {
  const currentStreak = 12;
  const longestStreak = 28;
  
  return (
    <div className="bg-white rounded-xl p-5 mx-5 mt-4 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <div className="text-center flex-1">
          <div className="text-3xl font-bold text-orange-500 mb-1">{currentStreak}</div>
          <div className="text-sm text-gray-500 font-medium">Day Streak</div>
        </div>
        
        <div className="flex-1 text-center">
          <div className="text-4xl">🔥</div>
        </div>
        
        <div className="text-center flex-1">
          <div className="text-xl font-semibold text-gray-500 mb-1">{longestStreak}</div>
          <div className="text-xs text-gray-500 text-center">Personal Best</div>
        </div>
      </div>
      
      <p className="text-center text-black font-medium">
        Keep it up! You're on fire! 🚀
      </p>
    </div>
  );
};

export default StreakWidget;
