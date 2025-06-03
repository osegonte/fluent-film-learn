
import React from 'react';

const ProgressChart = () => {
  const data = [
    { week: 'W1', words: 45 },
    { week: 'W2', words: 78 },
    { week: 'W3', words: 92 },
    { week: 'W4', words: 124 },
    { week: 'W5', words: 156 },
    { week: 'W6', words: 189 },
  ];

  const maxWords = Math.max(...data.map(d => d.words));

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm">
      <div className="flex items-end justify-between h-32 mb-4">
        {data.map((item, index) => (
          <div key={index} className="flex flex-col items-center flex-1">
            <div className="w-6 bg-gray-100 rounded-t flex items-end justify-center mb-2 relative"
                 style={{ height: '80px' }}>
              <div
                className="w-full bg-blue-600 rounded-t transition-all duration-500"
                style={{ 
                  height: `${(item.words / maxWords) * 80}px`,
                  minHeight: '4px'
                }}
              ></div>
            </div>
            <span className="text-xs text-gray-500 font-medium">{item.week}</span>
          </div>
        ))}
      </div>
      <div className="text-center">
        <div className="text-2xl font-bold text-black">{data[data.length - 1].words}</div>
        <div className="text-sm text-gray-500">Words learned this week</div>
      </div>
    </div>
  );
};

export default ProgressChart;
