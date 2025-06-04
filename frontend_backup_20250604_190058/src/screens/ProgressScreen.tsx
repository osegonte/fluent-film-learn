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
    if (value === 0) return 'bg-content-secondary bg-opacity-10';
    if (value === 1) return 'bg-state-success opacity-40';
    if (value === 2) return 'bg-state-success opacity-70';
    return 'bg-state-success';
  };

  return (
    <div className="flex flex-col min-h-full bg-bg-canvas">
      {/* Header */}
      <div className="px-6 py-8 text-center">
        <h1 className="text-large-title font-bold text-content-primary mb-2">
          Your Progress
        </h1>
        <p className="text-body text-content-secondary">
          Track your learning journey
        </p>
      </div>

      {/* Stats */}
      <div className="px-4 mb-8">
        <div className="grid grid-cols-2 gap-4">
          <div className="card-ios p-6 text-center">
            <div className="text-large-title font-bold text-spark mb-2">23</div>
            <div className="text-footnote text-content-secondary">Day Streak</div>
          </div>
          <div className="card-ios p-6 text-center">
            <div className="text-large-title font-bold text-accent-solid mb-2">347</div>
            <div className="text-footnote text-content-secondary">Words Learned</div>
          </div>
        </div>
      </div>

      {/* Weekly Goal */}
      <div className="px-4 mb-8">
        <div className="card-ios p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-headline font-semibold text-content-primary">Weekly Goal</h3>
            <span className="text-footnote text-content-secondary">3/5</span>
          </div>
          <div className="progress-ios mb-2">
            <div className="progress-fill-ios" style={{ width: '60%' }} />
          </div>
          <p className="text-footnote text-content-secondary">
            2 more lessons to reach your goal
          </p>
        </div>
      </div>

      {/* Learning Activity */}
      <div className="px-4 mb-8">
        <div className="card-ios p-6">
          <h3 className="text-headline font-semibold text-content-primary mb-4 flex items-center gap-2">
            📅 Learning Activity
          </h3>
          <div className="space-y-2">
            <div className="flex justify-between text-caption text-content-secondary mb-3">
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
                  />
                ))}
              </div>
            ))}
            <div className="flex items-center justify-between text-caption text-content-secondary mt-4">
              <span>Less</span>
              <div className="flex gap-1">
                <div className="w-3 h-3 rounded bg-content-secondary bg-opacity-10" />
                <div className="w-3 h-3 rounded bg-state-success opacity-40" />
                <div className="w-3 h-3 rounded bg-state-success opacity-70" />
                <div className="w-3 h-3 rounded bg-state-success" />
              </div>
              <span>More</span>
            </div>
          </div>
        </div>
      </div>

      {/* Achievements */}
      <div className="px-4 pb-8">
        <div className="card-ios p-6">
          <h3 className="text-headline font-semibold text-content-primary mb-4 flex items-center gap-2">
            🏆 Achievements
          </h3>
          <div className="space-y-4">
            {achievements.map((achievement, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="w-12 h-12 bg-content-secondary bg-opacity-10 rounded-full flex items-center justify-center text-xl">
                  {achievement.icon}
                </div>
                <div className="flex-1">
                  <h4 className="text-callout font-medium text-content-primary">
                    {achievement.title}
                  </h4>
                  <p className="text-footnote text-content-secondary">
                    {achievement.description}
                  </p>
                </div>
                <span className="bg-accent-solid text-white text-caption px-3 py-1 rounded-full">
                  {achievement.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressScreen;
