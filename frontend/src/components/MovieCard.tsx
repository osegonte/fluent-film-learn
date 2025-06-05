import React from 'react';

interface MovieCardProps {
  title: string;
  language: string;
  difficulty: string;
  rating: number;
  duration: string;
  scenes: string;
  progress: number;
  thumbnail: string;
  totalLessons: number;
  completedLessons: number;
}

export function MovieCard({ 
  title, 
  language, 
  difficulty, 
  rating, 
  duration, 
  scenes, 
  progress, 
  thumbnail, 
  totalLessons, 
  completedLessons 
}: MovieCardProps) {
  return (
    <div className="movie-card bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm transition-colors duration-300">
      <div className="flex items-start space-x-4">
        {/* Squarish-round movie icon */}
        <div className="movie-icon w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-[20px] flex items-center justify-center text-2xl flex-shrink-0">
          {thumbnail}
        </div>
        
        <div className="flex-1 min-w-0">
          {/* Movie title with bolder font in lesson context */}
          <h3 className="movie-title-in-lesson text-lg font-bold text-gray-900 dark:text-white truncate">
            {title}
          </h3>
          
          <div className="flex items-center space-x-2 mt-1">
            <span className="text-blue-500 font-semibold">{language}</span>
            <span className="text-gray-600 dark:text-gray-400">{difficulty}</span>
          </div>
          
          <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600 dark:text-gray-400">
            <span className="duration-text font-semibold">{duration}</span>
            <span className="scenes-text font-semibold">{scenes}</span>
            <div className="flex items-center space-x-1">
              <span>⭐</span>
              <span className="font-semibold">{rating}</span>
            </div>
          </div>
          
          {/* Progress with bolder text */}
          <div className="mt-3">
            <div className="flex justify-between items-center mb-1">
              <span className="lesson-progress-text text-sm font-bold text-gray-700 dark:text-gray-300">
                {progress}% complete
              </span>
              <span className="lessons-completed-text text-sm font-bold text-gray-600 dark:text-gray-400">
                {completedLessons}/{totalLessons} lessons
              </span>
            </div>
            
            <div className="course-progress w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div 
                className="bg-accent-gradient h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Start Learning Button */}
      <button className="lesson-button w-full mt-4 bg-accent-gradient text-white font-bold py-3 px-4 rounded-xl transition-transform duration-200 active:scale-98">
        {progress > 0 ? 'Continue Learning' : 'Start Learning'}
      </button>
    </div>
  );
}
