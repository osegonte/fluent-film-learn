
import React from 'react';
import { TrendingUp, Target, Calendar, Award } from 'lucide-react';
import StatsCard from '../components/StatsCard';
import WeeklyHeatmap from '../components/WeeklyHeatmap';
import ProgressChart from '../components/ProgressChart';

const ProgressScreen = () => {
  const stats = [
    {
      icon: TrendingUp,
      title: 'Words Learned',
      value: '1,247',
      subtitle: '+23 this week',
      color: '#34C759',
    },
    {
      icon: Target,
      title: 'Accuracy',
      value: '87%',
      subtitle: '+5% from last week',
      color: '#007AFF',
    },
    {
      icon: Calendar,
      title: 'Study Streak',
      value: '12 days',
      subtitle: 'Personal best!',
      color: '#FF9500',
    },
    {
      icon: Award,
      title: 'Level',
      value: 'B1',
      subtitle: 'Intermediate',
      color: '#AF52DE',
    },
  ];

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="flex-1 overflow-y-auto">
        {/* Header */}
        <div className="p-5 pt-16">
          <h1 className="text-3xl font-bold text-black mb-1">Your Progress</h1>
          <p className="text-gray-500">Keep up the great work!</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-2 px-4 mt-5">
          {stats.map((stat, index) => (
            <StatsCard key={index} stat={stat} />
          ))}
        </div>

        {/* Weekly Activity */}
        <div className="mt-8 px-5">
          <h2 className="text-xl font-semibold text-black mb-4">Weekly Activity</h2>
          <WeeklyHeatmap />
        </div>

        {/* Learning Progress Chart */}
        <div className="mt-8 px-5">
          <h2 className="text-xl font-semibold text-black mb-4">Learning Curve</h2>
          <ProgressChart />
        </div>

        {/* Recent Achievements */}
        <div className="mt-8 px-5 pb-8">
          <h2 className="text-xl font-semibold text-black mb-4">Recent Achievements</h2>
          <div className="bg-white rounded-xl overflow-hidden shadow-sm">
            <div className="p-4 border-b border-gray-100 flex items-center">
              <div className="w-11 h-11 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                <span className="text-xl">🔥</span>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-black">Week Warrior</h3>
                <p className="text-sm text-gray-500">Completed lessons 7 days in a row</p>
              </div>
              <span className="text-xs text-gray-500 font-medium">2 days ago</span>
            </div>
            
            <div className="p-4 border-b border-gray-100 flex items-center">
              <div className="w-11 h-11 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                <span className="text-xl">🎯</span>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-black">Perfect Score</h3>
                <p className="text-sm text-gray-500">Got 100% on a lesson quiz</p>
              </div>
              <span className="text-xs text-gray-500 font-medium">1 week ago</span>
            </div>

            <div className="p-4 flex items-center">
              <div className="w-11 h-11 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                <span className="text-xl">📚</span>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-black">Vocabulary Master</h3>
                <p className="text-sm text-gray-500">Learned 1000+ words</p>
              </div>
              <span className="text-xs text-gray-500 font-medium">2 weeks ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressScreen;
