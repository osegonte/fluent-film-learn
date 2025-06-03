// src/screens/LearnScreen.tsx
import React, { useState, useEffect } from 'react';
import { Play, Clock, Star, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Movie } from '../types/api';
import { apiService } from '../services/api';
import { MovieCardSkeleton } from '../components/skeletons/MovieCardSkeleton';
import { Button } from '../components/ui/button';

const LearnScreen = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState('All');
  const navigate = useNavigate();

  const languages = ['All', 'Spanish', 'French', 'German', 'Italian'];

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const moviesData = await apiService.getMovies();
        setMovies(moviesData);
      } catch (error: any) {
        console.error('Failed to fetch movies:', error);
        setError('Failed to load movies. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const filteredMovies = selectedLanguage === 'All' 
    ? movies 
    : movies.filter(movie => movie.language === selectedLanguage);

  const continueMovies = filteredMovies.filter(movie => movie.progress > 0 && movie.progress < 100);
  const exploreMovies = filteredMovies.filter(movie => movie.progress === 0 || movie.progress === 100);

  const handleStartLesson = async (movieId: string) => {
    try {
      const lessons = await apiService.getMovieLessons(movieId);
      if (lessons.length > 0) {
        // Find the first incomplete lesson or start from the beginning
        const nextLesson = lessons.find(lesson => !lesson.completed) || lessons[0];
        navigate(`/lesson/${nextLesson.id}`);
      } else {
        setError('No lessons available for this movie.');
      }
    } catch (error) {
      console.error('Failed to start lesson:', error);
      setError('Failed to start lesson. Please try again.');
    }
  };

  const MovieCard = ({ movie }: { movie: Movie }) => (
    <div className="bg-card rounded-xl p-4 border border-default">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 bg-royalBlue-500 rounded-xl flex items-center justify-center text-2xl">
          {movie.thumbnail}
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
          <div className="flex items-center gap-4 text-xs text-secondary mb-2">
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
            <p className="text-xs text-secondary mt-1">{movie.progress}% complete</p>
          </div>
        </div>
        <button 
          onClick={() => handleStartLesson(movie.id)}
          className="bg-royalBlue-500 hover:bg-royalBlue-600 text-white px-6 py-2 rounded-xl font-semibold flex items-center gap-2 transition-colors"
        >
          <Play size={16} />
          {movie.progress > 0 ? 'Continue' : 'Start'}
        </button>
      </div>
    </div>
  );

  const ErrorState = () => (
    <div className="flex flex-col items-center justify-center py-12">
      <AlertCircle size={48} className="text-persimmon-500 mb-4" />
      <h3 className="text-lg font-semibold text-primary mb-2">Something went wrong</h3>
      <p className="text-secondary text-center mb-4">{error}</p>
      <Button 
        onClick={() => window.location.reload()} 
        className="btn-primary"
      >
        Try Again
      </Button>
    </div>
  );

  const LoadingSkeleton = () => (
    <div className="space-y-4">
      {[...Array(5)].map((_, index) => (
        <MovieCardSkeleton key={index} />
      ))}
    </div>
  );

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
            {languages.map((lang) => (
              <button
                key={lang}
                onClick={() => setSelectedLanguage(lang)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedLanguage === lang 
                    ? 'bg-royalBlue-500 text-white' 
                    : 'bg-card text-secondary hover:bg-slate-800 dark:hover:bg-slate-600 border border-default'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>

        {/* Error State */}
        {error && !isLoading && (
          <div className="px-6">
            <ErrorState />
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="px-6 space-y-8">
            <div>
              <h2 className="text-xl font-semibold text-primary mb-4">Loading...</h2>
              <LoadingSkeleton />
            </div>
          </div>
        )}

        {/* Content */}
        {!isLoading && !error && (
          <>
            {/* Continue Learning */}
            {continueMovies.length > 0 && (
              <div className="px-6 mb-8">
                <h2 className="text-xl font-semibold text-primary mb-4">Continue Learning</h2>
                <div className="space-y-4">
                  {continueMovies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                  ))}
                </div>
              </div>
            )}

            {/* Explore Movies */}
            <div className="px-6 pb-8">
              <h2 className="text-xl font-semibold text-primary mb-4">
                {continueMovies.length > 0 ? 'Explore Movies' : 'Start Learning'}
              </h2>
              {exploreMovies.length > 0 ? (
                <div className="space-y-4">
                  {exploreMovies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-secondary">No movies found for {selectedLanguage}.</p>
                  <Button 
                    onClick={() => setSelectedLanguage('All')} 
                    className="mt-4 btn-primary"
                  >
                    Show All Movies
                  </Button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default LearnScreen;