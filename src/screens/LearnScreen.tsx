
import React, { useState } from 'react';
import { Play, Clock, Star } from 'lucide-react';
import MovieCard from '../components/MovieCard';
import LessonCard from '../components/LessonCard';
import StreakWidget from '../components/StreakWidget';

const LearnScreen = () => {
  const [selectedMovie, setSelectedMovie] = useState(null);

  const featuredMovies = [
    {
      id: 1,
      title: 'Breaking Bad',
      difficulty: 'Intermediate',
      language: 'Spanish',
      progress: 65,
      totalLessons: 24,
      completedLessons: 16,
      thumbnail: '🎬',
    },
    {
      id: 2,
      title: 'Amélie',
      difficulty: 'Beginner',
      language: 'French',
      progress: 30,
      totalLessons: 18,
      completedLessons: 5,
      thumbnail: '🎭',
    },
    {
      id: 3,
      title: 'Dark',
      difficulty: 'Advanced',
      language: 'German',
      progress: 15,
      totalLessons: 32,
      completedLessons: 5,
      thumbnail: '🌑',
    },
  ];

  const continueLesson = {
    movieTitle: 'Breaking Bad',
    episodeTitle: 'S1E3: ...And the Bag\'s in the River',
    timestamp: '14:32',
    subtitle: 'No me digas que no sabes quién soy.',
    translation: 'Don\'t tell me you don\'t know who I am.',
    progress: 0.65,
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="flex-1 overflow-y-auto">
        {/* Header Section */}
        <div className="p-5 pt-16">
          <h1 className="text-3xl font-bold text-black mb-1">Good morning!</h1>
          <p className="text-gray-500">Ready to learn with movies?</p>
        </div>

        {/* Streak Widget */}
        <StreakWidget />

        {/* Continue Learning Section */}
        <div className="mt-6 px-5">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-xl font-semibold text-black">Continue Learning</h2>
            <button className="text-blue-600 font-medium">See All</button>
          </div>
          
          <LessonCard lesson={continueLesson} />
        </div>

        {/* Featured Movies Section */}
        <div className="mt-6 px-5">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-xl font-semibold text-black">Featured Movies</h2>
            <button className="text-blue-600 font-medium">See All</button>
          </div>
          
          <div className="flex gap-4 overflow-x-auto pb-4">
            {featuredMovies.map((movie) => (
              <MovieCard 
                key={movie.id} 
                movie={movie}
                onPress={() => setSelectedMovie(movie)}
              />
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-6 px-5 pb-8">
          <h2 className="text-xl font-semibold text-black mb-3">Quick Actions</h2>
          <div className="flex gap-2">
            <button className="flex-1 bg-white rounded-xl p-4 shadow-sm flex flex-col items-center">
              <Play size={20} className="text-blue-600 mb-2" />
              <span className="text-sm font-medium text-black">Random Lesson</span>
            </button>
            <button className="flex-1 bg-white rounded-xl p-4 shadow-sm flex flex-col items-center">
              <Clock size={20} className="text-blue-600 mb-2" />
              <span className="text-sm font-medium text-black">5-Min Challenge</span>
            </button>
            <button className="flex-1 bg-white rounded-xl p-4 shadow-sm flex flex-col items-center">
              <Star size={20} className="text-blue-600 mb-2" />
              <span className="text-sm font-medium text-black">Review Words</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearnScreen;
