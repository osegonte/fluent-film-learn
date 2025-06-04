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

  // Apple HIG: Movie card component
  const MovieCard = ({ movie }: { movie: Movie }) => (
    <div className="card-ios mx-4 mb-4">
      <div className="p-4">
        <div className="flex items-start gap-4">
          {/* Movie thumbnail */}
          <div className="w-16 h-16 bg-accent-solid rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
            {movie.thumbnail}
          </div>
          
          {/* Movie info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-headline font-semibold text-content-primary truncate">
                {movie.title}
              </h3>
              <div className="flex items-center gap-1 flex-shrink-0">
                <Star size={14} className="text-spark fill-current" />
                <span className="text-footnote font-medium text-content-secondary">
                  {movie.rating}
                </span>
              </div>
            </div>
            
            <div className="flex items-center gap-3 mb-2">
              <span className="text-subhead text-accent-solid font-medium">
                {movie.language}
              </span>
              <span className="text-subhead text-content-secondary">
                {movie.difficulty}
              </span>
            </div>
            
            <div className="flex items-center gap-4 text-caption text-content-secondary mb-3">
              <div className="flex items-center gap-1">
                <Clock size={12} />
                <span>{movie.duration}</span>
              </div>
              <span>{movie.scenes}</span>
            </div>
            
            {/* Progress */}
            <div className="mb-3">
              <div className="progress-ios">
                <div 
                  className="progress-fill-ios"
                  style={{ width: `${movie.progress}%` }}
                />
              </div>
              <p className="text-caption text-content-secondary mt-1">
                {movie.progress}% complete
              </p>
            </div>
            
            {/* Action button */}
            <button 
              onClick={() => handleStartLesson(movie.id)}
              className="btn-primary w-full flex items-center justify-center gap-2"
            >
              <Play size={16} />
              <span>{movie.progress > 0 ? 'Continue' : 'Start'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const ErrorState = () => (
    <div className="flex flex-col items-center justify-center py-12 px-6">
      <AlertCircle size={48} className="text-state-error mb-4" />
      <h3 className="text-title-3 font-semibold text-content-primary mb-2 text-center">
        Something went wrong
      </h3>
      <p className="text-body text-content-secondary text-center mb-6 max-w-sm">
        {error}
      </p>
      <button 
        onClick={() => window.location.reload()} 
        className="btn-primary"
      >
        Try Again
      </button>
    </div>
  );

  const LoadingSkeleton = () => (
    <div className="space-y-4 px-4">
      {[...Array(5)].map((_, index) => (
        <MovieCardSkeleton key={index} />
      ))}
    </div>
  );

  return (
    <div className="flex flex-col min-h-full bg-bg-canvas">
      {/* Header - Apple HIG: Large title */}
      <div className="px-6 py-8 text-center">
        <h1 className="text-large-title font-bold text-content-primary mb-2">
          Learn with Movies
        </h1>
        <p className="text-body text-content-secondary">
          Master languages through your favorite films
        </p>
      </div>

      {/* Language Filter - Apple HIG: Segmented control style */}
      <div className="px-4 mb-6">
        <div className="bg-card rounded-xl p-1 flex overflow-x-auto">
          {languages.map((lang) => (
            <button
              key={lang}
              onClick={() => setSelectedLanguage(lang)}
              className={`px-4 py-2 rounded-lg text-subhead font-medium whitespace-nowrap transition-all duration-200 min-w-[60px] ${
                selectedLanguage === lang 
                  ? 'bg-accent-solid text-white shadow-sm' 
                  : 'text-content-secondary hover:text-content-primary'
              }`}
            >
              {lang}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1">
        {/* Error State */}
        {error && !isLoading && <ErrorState />}

        {/* Loading State */}
        {isLoading && (
          <div className="space-y-6">
            <div className="px-6">
              <h2 className="text-title-2 font-semibold text-content-primary mb-4">
                Loading...
              </h2>
            </div>
            <LoadingSkeleton />
          </div>
        )}

        {/* Content */}
        {!isLoading && !error && (
          <>
            {/* Continue Learning */}
            {continueMovies.length > 0 && (
              <div className="mb-8">
                <h2 className="text-title-2 font-semibold text-content-primary mb-4 px-6">
                  Continue Learning
                </h2>
                <div>
                  {continueMovies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                  ))}
                </div>
              </div>
            )}

            {/* Explore Movies */}
            <div className="pb-8">
              <h2 className="text-title-2 font-semibold text-content-primary mb-4 px-6">
                {continueMovies.length > 0 ? 'Explore Movies' : 'Start Learning'}
              </h2>
              {exploreMovies.length > 0 ? (
                <div>
                  {exploreMovies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 px-6">
                  <p className="text-body text-content-secondary mb-4">
                    No movies found for {selectedLanguage}.
                  </p>
                  <button 
                    onClick={() => setSelectedLanguage('All')} 
                    className="btn-secondary"
                  >
                    Show All Movies
                  </button>
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
