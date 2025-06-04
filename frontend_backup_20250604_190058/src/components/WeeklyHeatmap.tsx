
import React from 'react';

const WeeklyHeatmap = () => {
  // Mock data for the last 5 weeks
  const weeks = [
    [1, 2, 0, 1, 3, 2, 1],
    [2, 1, 1, 0, 2, 3, 2],
    [1, 3, 2, 1, 1, 2, 0],
    [0, 1, 2, 3, 1, 2, 1],
    [2, 1, 0, 1, 2, 1, 3],
  ];

  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  const getIntensityColor = (value: number) => {
    if (value === 0) return 'bg-gray-100';
    if (value === 1) return 'bg-green-200';
    if (value === 2) return 'bg-green-400';
    return 'bg-green-600';
  };

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm">
      <div className="flex gap-1">
        <div className="flex flex-col gap-1 mr-2">
          {days.map((day, index) => (
            <div key={index} className="w-6 h-6 flex items-center justify-center text-xs text-gray-500">
              {day}
            </div>
          ))}
        </div>
        {weeks.map((week, weekIndex) => (
          <div key={weekIndex} className="flex flex-col gap-1">
            {week.map((value, dayIndex) => (
              <div
                key={dayIndex}
                className={`w-6 h-6 rounded ${getIntensityColor(value)}`}
                title={`${value} lessons`}
              ></div>
            ))}
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between mt-4 text-xs text-gray-500">
        <span>Less</span>
        <div className="flex gap-1">
          <div className="w-3 h-3 rounded bg-gray-100"></div>
          <div className="w-3 h-3 rounded bg-green-200"></div>
          <div className="w-3 h-3 rounded bg-green-400"></div>
          <div className="w-3 h-3 rounded bg-green-600"></div>
        </div>
        <span>More</span>
      </div>
    </div>
  );
};

export default WeeklyHeatmap;
