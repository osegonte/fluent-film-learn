
import React from 'react';
import { Play } from 'lucide-react';

interface LessonCardProps {
  lesson: {
    movieTitle: string;
    episodeTitle: string;
    timestamp: string;
    subtitle: string;
    translation: string;
    progress: number;
  };
}

const LessonCard: React.FC<LessonCardProps> = ({ lesson }) => {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <div className="flex-1">
          <h3 className="font-semibold text-black">{lesson.movieTitle}</h3>
          <p className="text-sm text-gray-500">{lesson.episodeTitle}</p>
        </div>
        <button className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
          <Play size={16} className="text-white ml-0.5" />
        </button>
      </div>
      
      <div className="bg-gray-50 rounded-lg p-3 mb-3">
        <p className="text-black font-medium mb-1">"{lesson.subtitle}"</p>
        <p className="text-sm text-gray-600 italic">{lesson.translation}</p>
      </div>
      
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-500">{lesson.timestamp}</span>
        <div className="w-16 bg-gray-200 rounded-full h-1">
          <div 
            className="bg-blue-600 h-1 rounded-full"
            style={{ width: `${lesson.progress * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default LessonCard;
