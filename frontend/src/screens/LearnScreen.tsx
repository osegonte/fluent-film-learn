// src/screens/LearnScreen.tsx
import React, { useState, useEffect } from 'react';
import { Play, Clock, Star, AlertCircle, Film, Flame, Users } from 'lucide-react';
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

  // Enhanced Movie card component with beautiful styling
  const MovieCard = ({ movie, index }: { movie: Movie; index: number }) => (
    <div 
      className="mobile-card mx-4 mb-4 animate-fade-in-up group cursor-pointer"
      style={{ animationDelay: `${index * 0.1}s` }}
      onClick={() => handleStartLesson(movie.id)}
    >
      <div className="p-6">
        <div className="flex items-start gap-4">
          {/* Enhanced movie thumbnail with gradient backdrop */}
          <div className="relative flex-shrink-0">
            <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-3xl relative overflow-hidden cinematic-gradient shadow-lg">
              <Film className="w-8 h-8 text-white/90 absolute" />
              <span className="relative z-10 filter drop-shadow-sm">{movie.thumbnail}</span>
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
            </div>
            {/* Progress ring overlay for in-progress movies */}
            {movie.progress > 0 && movie.progress < 100 && (
              <div className="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-primary shadow-lg flex items-center justify-center animate-pulse-glow">
                <Play className="w-4 h-4 text-white ml-0.5" />
              </div>
            )}
            {/* Completion badge for finished movies */}
            {movie.progress === 100 && (
              <div className="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-success shadow-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </div>
          
          {/* Enhanced movie info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1 min-w-0">
                <h3 className="text-headline font-bold text-content-primary truncate group-hover:text-primary transition-colors">
                  {movie.title}
                </h3>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-subhead text-primary font-semibold">
                    {movie.language}
                  </span>
                  <span className="text-body text-content-secondary">
                    {movie.difficulty}
                  </span>
                </div>
              </div>
              
              {/* Rating with enhanced styling */}
              <div className="flex items-center gap-1 bg-warning/10 px-2 py-1 rounded-lg">
                <Star className="w-4 h-4 text-warning fill-current" />
                <span className="text-footnote font-bold text-warning">
                  {movie.rating}
                </span>
              </div>
            </div>
            
            {/* Enhanced movie metadata */}
            <div className="flex items-center gap-4 text-caption text-content-secondary mb-3">
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                <span className="font-medium">{movie.duration}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Film className="w-3.5 h-3.5" />
                <span className="font-medium">{movie.scenes}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5" />
                <span className="font-medium">{movie.totalLessons} lessons</span>
              </div>
            </div>
            
            {/* Enhanced progress visualization */}
            <div className="mb-4">
              <div className="progress-enhanced">
                <div 
                  className="progress-fill animate-progress-fill"
                  style={{ 
                    '--progress-width': `${movie.progress}%`,
                    width: `${movie.progress}%` 
                  }}
                />
              </div>
              <div className="flex justify-between items-center mt-2">
                <p className="text-caption text-content-secondary font-medium">
                  {movie.progress}% complete
                </p>
                <p className="text-caption text-content-secondary">
                  {movie.completedLessons}/{movie.totalLessons} lessons
                </p>
              </div>
            </div>
            
            {/* Enhanced action button */}
            <button 
              className="btn-primary w-full flex items-center justify-center gap-2 group-hover:scale-105 transition-transform"
              onClick={(e) => {
                e.stopPropagation();
                handleStartLesson(movie.id);
              }}
            >
              <Play className="w-4 h-4" />
              <span className="font-semibold">
                {movie.progress > 0 && movie.progress < 100 ? 'Continue Learning' : 
                 movie.progress === 100 ? 'Review Movie' : 'Start Learning'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const ErrorState = () => (
    <div className="flex flex-col items-center justify-center py-16 px-6 animate-fade-in-up">
      <div className="w-16 h-16 rounded-full bg-state-error/10 flex items-center justify-center mb-6">
        <AlertCircle className="w-8 h-8 text-state-error" />
      </div>
      <h3 className="text-title-3 font-bold text-content-primary mb-3 text-center">
        Something went wrong
      </h3>
      <p className="text-body text-content-secondary text-center mb-8 max-w-sm leading-relaxed">
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
        <div key={index} className={`animate-fade-in-up stagger-${index + 1}`}>
          <MovieCardSkeleton />
        </div>
      ))}
    </div>
  );

  // Enhanced streak display
  const StreakDisplay = () => (
    <div className="mx-4 mb-6">
      <div className="card-ios p-4 bg-gradient-to-r from-warning/5 to-state-success/5 border-warning/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-warning/20 flex items-center justify-center animate-pulse-glow">
              <Flame className="w-6 h-6 text-warning" />
            </div>
            <div>
              <h3 className="text-headline font-bold text-content-primary">12 Day Streak</h3>
              <p className="text-footnote text-content-secondary">Keep it up! You're on fire! 🚀</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-title-2 font-bold text-warning tabular-nums">12</div>
            <div className="text-caption text-content-secondary">days</div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col min-h-full bg-bg-canvas">
      {/* Enhanced header with gradient background */}
      <div className="relative px-6 py-12 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-success/5" />
        <div className="relative z-10">
          <h1 className="text-large-title font-black text-content-primary mb-3 animate-fade-in-up">
            Learn with Movies
          </h1>
          <p className="text-body text-content-secondary leading-relaxed animate-fade-in-up stagger-1">
            Master languages through your favorite films
          </p>
        </div>
        {/* Decorative gradient orbs */}
        <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full bg-gradient-to-br from-primary/20 to-success/20 blur-xl" />
        <div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full bg-gradient-to-br from-warning/20 to-primary/20 blur-xl" />
      </div>

      {/* Streak display */}
      {!isLoading && !error && <StreakDisplay />}

      {/* Enhanced language filter with better visual hierarchy */}
      <div className="px-4 mb-8 animate-fade-in-up stagger-2">
        <div className="card-ios p-2 bg-card/80 backdrop-blur-sm">
          <div className="flex gap-1 overflow-x-auto scrollbar-hide">
            {languages.map((lang, index) => (
              <button
                key={lang}
                onClick={() => setSelectedLanguage(lang)}
                className={`px-4 py-3 rounded-xl text-callout font-semibold whitespace-nowrap transition-all duration-300 min-w-[80px] ${
                  selectedLanguage === lang 
                    ? 'bg-primary text-white shadow-lg scale-105 animate-bounce-subtle' 
                    : 'text-content-secondary hover:text-content-primary hover:bg-primary/5'
                }`}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced content area */}
      <div className="flex-1">
        {/* Error State */}
        {error && !isLoading && <ErrorState />}

        {/* Loading State */}
        {isLoading && (
          <div className="space-y-6">
            <div className="px-6 animate-fade-in-up">
              <div className="flex items-center gap-3 mb-4">
                <div className="skeleton w-8 h-8 rounded-full" />
                <div className="skeleton w-32 h-6" />
              </div>
            </div>
            <LoadingSkeleton />
          </div>
        )}

        {/* Enhanced Content */}
        {!isLoading && !error && (
          <>
            {/* Continue Learning Section */}
            {continueMovies.length > 0 && (
              <div className="mb-10">
                <div className="px-6 mb-6 animate-fade-in-up">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                      <Play className="w-4 h-4 text-primary" />
                    </div>
                    <h2 className="text-title-2 font-bold text-content-primary">
                      Continue Learning
                    </h2>
                  </div>
                  <p className="text-body text-content-secondary">
                    Pick up where you left off
                  </p>
                </div>
                <div>
                  {continueMovies.map((movie, index) => (
                    <MovieCard key={movie.id} movie={movie} index={index} />
                  ))}
                </div>
              </div>
            )}

            {/* Explore Movies Section */}
            <div className="pb-10">
              <div className="px-6 mb-6 animate-fade-in-up">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-full bg-success/20 flex items-center justify-center">
                    <Film className="w-4 h-4 text-success" />
                  </div>
                  <h2 className="text-title-2 font-bold text-content-primary">
                    {continueMovies.length > 0 ? 'Explore Movies' : 'Start Learning'}
                  </h2>
                </div>
                <p className="text-body text-content-secondary">
                  {continueMovies.length > 0 
                    ? 'Discover new stories and languages' 
                    : 'Begin your language learning journey'}
                </p>
              </div>
              
              {exploreMovies.length > 0 ? (
                <div>
                  {exploreMovies.map((movie, index) => (
                    <MovieCard 
                      key={movie.id} 
                      movie={movie} 
                      index={index + continueMovies.length} 
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 px-6 animate-fade-in-up">
                  <div className="w-20 h-20 rounded-full bg-muted/30 flex items-center justify-center mx-auto mb-6">
                    <Film className="w-10 h-10 text-muted-foreground" />
                  </div>
                  <h3 className="text-title-3 font-bold text-content-primary mb-3">
                    No movies found
                  </h3>
                  <p className="text-body text-content-secondary mb-6 max-w-sm mx-auto leading-relaxed">
                    No movies available for {selectedLanguage}. Try selecting a different language.
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