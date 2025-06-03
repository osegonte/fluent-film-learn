
import React from 'react';

const ProgressScreen = () => {
  const weeklyActivity = [
    [1, 2, 0, 1, 3, 2, 1],
    [2, 1, 1, 0, 2, 3, 2],
    [1, 3, 2, 1, 1, 2, 0],
    [0, 1, 2, 3, 1, 2, 1],
    [2, 1, 0, 1, 2, 1, 3],
  ];

  const achievements = [
    {
      title: 'First Movie',
      description: 'Complete your first movie',
      status: 'Earned',
      icon: '🎬'
    },
    {
      title: 'Week Warrior',
      description: '7-day learning streak',
      status: 'Earned',
      icon: '🔥'
    }
  ];

  const getActivityColor = (value: number) => {
    if (value === 0) return 'bg-slate-800 dark:bg-slate-600';
    if (value === 1) return 'bg-spruce-500 opacity-40';
    if (value === 2) return 'bg-spruce-500 opacity-70';
    return 'bg-spruce-500';
  };

  return (
    <div className="flex flex-col h-full bg-canvas">
      <div className="flex-1 overflow-y-auto">
        {/* Header */}
        <div className="px-6 py-8 pt-16 text-center">
          <h1 className="text-3xl font-bold text-primary mb-2">Your Progress</h1>
          <p className="text-secondary">Track your learning journey</p>
        </div>

        {/* Stats */}
        <div className="px-6 mb-8">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-card rounded-xl p-6 border border-default text-center">
              <div className="text-3xl font-bold text-persimmon-500 mb-2">23</div>
              <div className="text-sm text-secondary">Day Streak</div>
            </div>
            <div className="bg-card rounded-xl p-6 border border-default text-center">
              <div className="text-3xl font-bold text-royalBlue-500 mb-2">347</div>
              <div className="text-sm text-secondary">Words Learned</div>
            </div>
          </div>
        </div>

        {/* Weekly Goal */}
        <div className="px-6 mb-8">
          <div className="bg-card rounded-xl p-6 border border-default">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-primary">Weekly Goal</h3>
              <span className="text-sm text-secondary">3/5</span>
            </div>
            <div className="w-full bg-slate-800 dark:bg-slate-600 rounded-full h-3 mb-2">
              <div 
                className="progress-gradient h-3 rounded-full transition-all duration-300"
                style={{ width: '60%' }}
              ></div>
            </div>
            <p className="text-sm text-secondary">2 more lessons to reach your goal</p>
          </div>
        </div>

        {/* Learning Activity */}
        <div className="px-6 mb-8">
          <div className="bg-card rounded-xl p-6 border border-default">
            <h3 className="font-semibold text-primary mb-4 flex items-center gap-2">
              📅 Learning Activity
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-secondary mb-3">
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
                  <div key={index} className="w-6 text-center">{day}</div>
                ))}
              </div>
              {weeklyActivity.map((week, weekIndex) => (
                <div key={weekIndex} className="flex justify-between gap-1">
                  {week.map((value, dayIndex) => (
                    <div
                      key={dayIndex}
                      className={`w-6 h-6 rounded ${getActivityColor(value)}`}
                      title={`${value} lessons`}
                    ></div>
                  ))}
                </div>
              ))}
              <div className="flex items-center justify-between text-xs text-secondary mt-4">
                <span>Less</span>
                <div className="flex gap-1">
                  <div className="w-3 h-3 rounded bg-slate-800 dark:bg-slate-600"></div>
                  <div className="w-3 h-3 rounded bg-spruce-500 opacity-40"></div>
                  <div className="w-3 h-3 rounded bg-spruce-500 opacity-70"></div>
                  <div className="w-3 h-3 rounded bg-spruce-500"></div>
                </div>
                <span>More</span>
              </div>
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div className="px-6 pb-8">
          <div className="bg-card rounded-xl p-6 border border-default">
            <h3 className="font-semibold text-primary mb-4 flex items-center gap-2">
              🏆 Achievements
            </h3>
            <div className="space-y-4">
              {achievements.map((achievement, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-slate-800 dark:bg-slate-600 rounded-full flex items-center justify-center text-xl">
                    {achievement.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-primary">{achievement.title}</h4>
                    <p className="text-sm text-secondary">{achievement.description}</p>
                  </div>
                  <span className="bg-navy-900 text-white text-xs px-3 py-1 rounded-full">
                    {achievement.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressScreen;
