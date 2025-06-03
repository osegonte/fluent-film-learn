
import React from 'react';
import { Play, Clock, Star } from 'lucide-react';

const LearnScreen = () => {
  const continueMovies = [
    {
      title: 'Toy Story',
      language: 'Spanish',
      difficulty: 'Beginner',
      progress: 65,
      icon: '🎬'
    },
    {
      title: 'Finding Nemo',
      language: 'French',
      difficulty: 'Intermediate',
      progress: 30,
      icon: '🐟'
    }
  ];

  const exploreMovies = [
    {
      title: 'Toy Story',
      language: 'Spanish',
      difficulty: 'Beginner',
      rating: 4.8,
      duration: '18 min',
      scenes: '8/12 scenes',
      progress: 65,
      icon: '🎬'
    },
    {
      title: 'Finding Nemo',
      language: 'French',
      difficulty: 'Intermediate',
      rating: 4.9,
      duration: '22 min',
      scenes: '4/15 scenes',
      progress: 30,
      icon: '🐟'
    }
  ];

  const languages = ['All', 'Spanish', 'French', 'German', 'Italian'];

  return (
    <div className="flex flex-col h-full bg-canvas">
      <div className="flex-1 overflow-y-auto">
        {/* Header */}
        <div className="px-6 py-8 pt-16 text-center">
          <h1 className="text-3xl font-bold text-primary mb-2">Learn with Movies</h1>
          <p className="text-secondary">Master languages through your favorite films</p>
        </div>

        {/* Language Filter */}
        <div className="px-6 mb-8">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {languages.map((lang, index) => (
              <button
                key={lang}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  index === 0 
                    ? 'bg-royalBlue-500 text-white' 
                    : 'bg-card text-secondary hover:bg-slate-800 dark:hover:bg-slate-600'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>

        {/* Continue Learning */}
        <div className="px-6 mb-8">
          <h2 className="text-xl font-semibold text-primary mb-4">Continue Learning</h2>
          <div className="space-y-4">
            {continueMovies.map((movie, index) => (
              <div key={index} className="bg-card rounded-xl p-4 border border-default">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-royalBlue-500 rounded-xl flex items-center justify-center text-2xl">
                    {movie.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-primary">{movie.title}</h3>
                    <p className="text-sm text-secondary">{movie.language} • {movie.difficulty}</p>
                    <div className="mt-2">
                      <div className="w-full bg-slate-800 dark:bg-slate-600 rounded-full h-2">
                        <div 
                          className="progress-gradient h-2 rounded-full transition-all duration-300"
                          style={{ width: `${movie.progress}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-secondary mt-1">{movie.progress}%</p>
                    </div>
                  </div>
                  <button className="bg-navy-900 text-white px-6 py-2 rounded-xl font-semibold flex items-center gap-2">
                    <Play size={16} />
                    Continue
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Explore Movies */}
        <div className="px-6 pb-8">
          <h2 className="text-xl font-semibold text-primary mb-4">Explore Movies</h2>
          <div className="space-y-4">
            {exploreMovies.map((movie, index) => (
              <div key={index} className="bg-card rounded-xl p-4 border border-default">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-royalBlue-500 rounded-xl flex items-center justify-center text-2xl">
                    {movie.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-primary">{movie.title}</h3>
                      <div className="flex items-center gap-1">
                        <Star size={14} className="text-amber-400 fill-current" />
                        <span className="text-sm font-medium text-secondary">{movie.rating}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-secondary mb-2">
                      <span>{movie.language}</span>
                      <span>{movie.difficulty}</span>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-secondary">
                      <div className="flex items-center gap-1">
                        <Clock size={12} />
                        <span>{movie.duration}</span>
                      </div>
                      <span>{movie.scenes}</span>
                    </div>
                    <div className="mt-2">
                      <div className="w-full bg-slate-800 dark:bg-slate-600 rounded-full h-2">
                        <div 
                          className="progress-gradient h-2 rounded-full transition-all duration-300"
                          style={{ width: `${movie.progress}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-secondary mt-1">{movie.progress}%</p>
                    </div>
                  </div>
                  <button className="bg-navy-900 text-white px-6 py-2 rounded-xl font-semibold flex items-center gap-2">
                    <Play size={16} />
                    Continue
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearnScreen;
