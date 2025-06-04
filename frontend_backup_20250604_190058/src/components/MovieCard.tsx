
import React from 'react';
import { Play } from 'lucide-react';

interface MovieCardProps {
  movie: {
    id: number;
    title: string;
    difficulty: string;
    language: string;
    progress: number;
    totalLessons: number;
    completedLessons: number;
    thumbnail: string;
  };
  onPress: () => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onPress }) => {
  return (
    <button
      onClick={onPress}
      className="bg-white rounded-xl p-4 shadow-sm min-w-[200px] flex-shrink-0"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
          <span className="text-2xl">{movie.thumbnail}</span>
        </div>
        <Play size={20} className="text-blue-600" />
      </div>
      
      <h3 className="font-semibold text-black text-left mb-1">{movie.title}</h3>
      <p className="text-sm text-gray-500 text-left mb-2">{movie.language} • {movie.difficulty}</p>
      
      <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
        <div 
          className="bg-blue-600 h-2 rounded-full"
          style={{ width: `${movie.progress}%` }}
        ></div>
      </div>
      
      <p className="text-xs text-gray-500 text-left">
        {movie.completedLessons}/{movie.totalLessons} lessons
      </p>
    </button>
  );
};

export default MovieCard;
