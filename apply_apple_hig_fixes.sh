#!/bin/bash

echo "🍎 Applying Apple Human Interface Guidelines to CineFluent"
echo "========================================================"
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

# Check if we're in the right directory
if [ ! -d "frontend" ]; then
    echo "❌ Please run this script from your project root directory"
    exit 1
fi

print_info "Applying Apple HIG mobile optimizations..."

# 1. Update index.html with Apple-specific meta tags
print_info "1. Updating HTML with Apple-specific optimizations..."

cat > frontend/index.html << 'EOF'
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <!-- Apple HIG: Proper viewport for iOS -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover, user-scalable=no">
    
    <!-- Apple HIG: Status bar styling -->
    <meta name="apple-mobile-web-app-status-bar-style" content="default">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-title" content="CineFluent">
    
    <!-- Apple HIG: Home screen icon -->
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
    
    <!-- Apple HIG: Splash screen -->
    <meta name="apple-mobile-web-app-title" content="CineFluent">
    <link rel="apple-touch-startup-image" href="/apple-splash-2048-2732.png">
    
    <!-- Apple HIG: Theme color -->
    <meta name="theme-color" content="#1580FF">
    <meta name="msapplication-TileColor" content="#1580FF">
    
    <title>CineFluent - Learn Languages Through Movies</title>
    <meta name="description" content="Master languages through your favorite films with CineFluent" />
    
    <!-- Apple HIG: Prevent automatic phone number detection -->
    <meta name="format-detection" content="telephone=no">
  </head>

  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
EOF

print_status "HTML updated with Apple HIG standards"

# 2. Update main CSS with Apple HIG guidelines
print_info "2. Applying Apple HIG CSS standards..."

cat > frontend/src/index.css << 'EOF'
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    /* Apple HIG: System colors for iOS */
    --bg-canvas: #F2F2F7;  /* systemGroupedBackground */
    --bg-card: #FFFFFF;    /* systemBackground */
    --content-primary: #000000;  /* label */
    --content-secondary: #3C3C43;  /* secondaryLabel */
    --border-color: #C6C6C8;  /* separator */
    --accent-solid: #007AFF;  /* systemBlue */
    --state-success: #34C759;  /* systemGreen */
    --state-error: #FF3B30;   /* systemRed */
    --spark: #FF9500;  /* systemOrange */

    /* Apple HIG: Typography scale */
    --font-size-large-title: 34px;
    --font-size-title-1: 28px;
    --font-size-title-2: 22px;
    --font-size-title-3: 20px;
    --font-size-headline: 17px;
    --font-size-body: 17px;
    --font-size-callout: 16px;
    --font-size-subhead: 15px;
    --font-size-footnote: 13px;
    --font-size-caption-1: 12px;
    --font-size-caption-2: 11px;

    /* Apple HIG: Standard spacing */
    --spacing-xs: 4px;
    --spacing-sm: 8px;
    --spacing-md: 16px;
    --spacing-lg: 20px;
    --spacing-xl: 32px;

    /* shadcn compatibility */
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;
    --primary: 221 83% 53%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;
    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 221 83% 53%;
    --radius: 12px;  /* Apple HIG: 12px corner radius */
  }

  html.dark {
    /* Apple HIG: Dark mode system colors */
    --bg-canvas: #000000;  /* systemBackground (dark) */
    --bg-card: #1C1C1E;   /* secondarySystemGroupedBackground (dark) */
    --content-primary: #FFFFFF;  /* label (dark) */
    --content-secondary: #EBEBF5;  /* secondaryLabel (dark) */
    --border-color: #38383A;  /* separator (dark) */
    --accent-solid: #0A84FF;  /* systemBlue (dark) */
    --state-success: #30D158;  /* systemGreen (dark) */
    --state-error: #FF453A;   /* systemRed (dark) */
    --spark: #FF9F0A;  /* systemOrange (dark) */

    --background: 0 0% 11%;
    --foreground: 210 40% 98%;
    --card: 0 0% 11%;
    --card-foreground: 210 40% 98%;
    --popover: 0 0% 11%;
    --popover-foreground: 210 40% 98%;
    --primary: 213 93% 67%;
    --primary-foreground: 222.2 47.4% 11.2%;
    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%;
    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;
    --accent: 217.2 32.6% 17.5%;
    --accent-foreground: 210 40% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;
    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;
    --ring: 213 93% 67%;
  }
}

@layer base {
  * {
    @apply border-border;
    /* Apple HIG: Prevent content overflow */
    box-sizing: border-box;
  }

  html {
    /* Apple HIG: Prevent zoom and horizontal scroll */
    overflow-x: hidden;
    -webkit-text-size-adjust: 100%;
    /* Apple HIG: Smooth scrolling */
    scroll-behavior: smooth;
  }

  body {
    @apply bg-bg-canvas text-content-primary;
    /* Apple HIG: San Francisco font family */
    font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', system-ui, sans-serif;
    /* Apple HIG: Prevent horizontal scrolling */
    overflow-x: hidden;
    /* Apple HIG: Better text rendering */
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    /* Apple HIG: Support for dynamic type */
    font-size: var(--font-size-body);
    line-height: 1.47;
    /* Apple HIG: Prevent text selection in UI elements */
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  /* Apple HIG: Allow text selection in content areas */
  p, span, div[role="textbox"], input, textarea {
    -webkit-user-select: text;
    -moz-user-select: text;
    -ms-user-select: text;
    user-select: text;
  }
}

/* Apple HIG: Typography utilities */
@layer utilities {
  /* Apple HIG: Safe areas for devices with notches */
  .safe-area-top {
    padding-top: max(env(safe-area-inset-top), var(--spacing-md));
  }
  
  .safe-area-bottom {
    padding-bottom: max(env(safe-area-inset-bottom), var(--spacing-md));
  }

  .safe-area-left {
    padding-left: env(safe-area-inset-left);
  }

  .safe-area-right {
    padding-right: env(safe-area-inset-right);
  }

  /* Apple HIG: Typography scale */
  .text-large-title {
    font-size: var(--font-size-large-title);
    font-weight: 700;
    line-height: 1.2;
  }

  .text-title-1 {
    font-size: var(--font-size-title-1);
    font-weight: 700;
    line-height: 1.25;
  }

  .text-title-2 {
    font-size: var(--font-size-title-2);
    font-weight: 700;
    line-height: 1.27;
  }

  .text-title-3 {
    font-size: var(--font-size-title-3);
    font-weight: 600;
    line-height: 1.3;
  }

  .text-headline {
    font-size: var(--font-size-headline);
    font-weight: 600;
    line-height: 1.35;
  }

  .text-body {
    font-size: var(--font-size-body);
    font-weight: 400;
    line-height: 1.47;
  }

  .text-callout {
    font-size: var(--font-size-callout);
    font-weight: 400;
    line-height: 1.44;
  }

  .text-subhead {
    font-size: var(--font-size-subhead);
    font-weight: 400;
    line-height: 1.47;
  }

  .text-footnote {
    font-size: var(--font-size-footnote);
    font-weight: 400;
    line-height: 1.54;
  }

  .text-caption {
    font-size: var(--font-size-caption-1);
    font-weight: 400;
    line-height: 1.5;
  }

  /* Apple HIG: Button styles */
  .btn-primary {
    @apply bg-accent-solid hover:opacity-80 text-white font-semibold rounded-xl transition-all duration-200;
    /* Apple HIG: Minimum touch target 44x44 */
    min-height: 44px;
    padding: 12px 24px;
    font-size: var(--font-size-headline);
    /* Apple HIG: Haptic feedback simulation */
    touch-action: manipulation;
    /* Apple HIG: Button press animation */
    transform: scale(1);
  }

  .btn-primary:active {
    transform: scale(0.98);
  }

  .btn-secondary {
    @apply bg-card border border-border text-content-primary hover:bg-opacity-80 font-medium rounded-xl transition-all duration-200;
    min-height: 44px;
    padding: 12px 24px;
    font-size: var(--font-size-headline);
    touch-action: manipulation;
    transform: scale(1);
  }

  .btn-secondary:active {
    transform: scale(0.98);
  }

  /* Apple HIG: Card styles */
  .card-ios {
    @apply bg-card rounded-xl border-0 shadow-sm;
    /* Apple HIG: Card elevation */
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }

  /* Apple HIG: List styles */
  .list-ios {
    @apply bg-card rounded-xl overflow-hidden;
    margin: 0 var(--spacing-md);
  }

  .list-item-ios {
    @apply border-b border-border last:border-b-0 px-4 py-3;
    min-height: 44px;
    display: flex;
    align-items: center;
  }

  /* Apple HIG: Navigation styles */
  .nav-bar-ios {
    @apply bg-card border-b border-border;
    height: 44px;
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
  }

  .tab-bar-ios {
    @apply bg-card border-t border-border;
    height: 83px; /* 49px + 34px safe area */
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
  }

  /* Apple HIG: Input styles */
  .input-ios {
    @apply bg-card border border-border rounded-xl px-4 py-3 text-body;
    min-height: 44px;
    font-size: var(--font-size-body);
  }

  .input-ios:focus {
    @apply border-accent-solid ring-0 outline-none;
  }

  /* Apple HIG: Progress indicators */
  .progress-ios {
    @apply bg-border rounded-full overflow-hidden;
    height: 4px;
  }

  .progress-fill-ios {
    @apply bg-accent-solid rounded-full transition-all duration-300;
    height: 100%;
  }

  /* Apple HIG: Spacing utilities */
  .spacing-xs { margin: var(--spacing-xs); }
  .spacing-sm { margin: var(--spacing-sm); }
  .spacing-md { margin: var(--spacing-md); }
  .spacing-lg { margin: var(--spacing-lg); }
  .spacing-xl { margin: var(--spacing-xl); }

  .padding-xs { padding: var(--spacing-xs); }
  .padding-sm { padding: var(--spacing-sm); }
  .padding-md { padding: var(--spacing-md); }
  .padding-lg { padding: var(--spacing-lg); }
  .padding-xl { padding: var(--spacing-xl); }

  /* Apple HIG: Animation utilities */
  .animation-ios {
    transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  .animation-spring-ios {
    transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  }
}

/* Apple HIG: Dark mode adaptations */
@media (prefers-color-scheme: dark) {
  :root {
    color-scheme: dark;
  }
}

/* Apple HIG: Accessibility - Reduce motion */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

/* Apple HIG: High contrast mode */
@media (prefers-contrast: high) {
  :root {
    --border-color: #000000;
    --content-secondary: #000000;
  }
}
EOF

print_status "Apple HIG CSS applied"

# 3. Update TabNavigator with Apple HIG standards
print_info "3. Updating TabNavigator with Apple HIG..."

cat > frontend/src/navigation/TabNavigator.tsx << 'EOF'
import React, { useState } from 'react';
import { BookOpen, TrendingUp, Users, User } from 'lucide-react';
import LearnScreen from '../screens/LearnScreen';
import ProgressScreen from '../screens/ProgressScreen';
import CommunityScreen from '../screens/CommunityScreen';
import ProfileScreen from '../screens/ProfileScreen';

const TabNavigator = () => {
  const [activeTab, setActiveTab] = useState('Learn');

  const tabs = [
    { name: 'Learn', icon: BookOpen, component: LearnScreen },
    { name: 'Progress', icon: TrendingUp, component: ProgressScreen },
    { name: 'Community', icon: Users, component: CommunityScreen },
    { name: 'Profile', icon: User, component: ProfileScreen },
  ];

  const ActiveComponent = tabs.find(tab => tab.name === activeTab)?.component || LearnScreen;

  return (
    <div className="flex flex-col h-screen bg-bg-canvas overflow-hidden">
      {/* Main content - Apple HIG: Content area */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden">
        <div className="safe-area-top">
          <ActiveComponent />
        </div>
      </div>

      {/* Tab Bar - Apple HIG: 49pt height + safe area */}
      <div className="tab-bar-ios safe-area-bottom">
        <div className="flex justify-around items-center h-[49px] px-2">
          {tabs.map((tab) => {
            const IconComponent = tab.icon;
            const isActive = activeTab === tab.name;
            
            return (
              <button
                key={tab.name}
                onClick={() => setActiveTab(tab.name)}
                className={`flex flex-col items-center justify-center flex-1 py-1 transition-all duration-200 animation-ios ${
                  isActive ? 'text-accent-solid' : 'text-content-secondary'
                }`}
                style={{
                  /* Apple HIG: Minimum touch target */
                  minHeight: '44px',
                  minWidth: '44px'
                }}
              >
                <IconComponent 
                  size={24} 
                  className={`mb-1 transition-all duration-200 ${
                    isActive ? 'scale-110' : 'scale-100'
                  }`} 
                />
                <span className="text-caption font-medium leading-none">
                  {tab.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TabNavigator;
EOF

print_status "TabNavigator updated with Apple HIG"

# 4. Update LearnScreen with Apple HIG
print_info "4. Updating LearnScreen with Apple HIG..."

cat > frontend/src/screens/LearnScreen.tsx << 'EOF'
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
EOF

print_status "LearnScreen updated with Apple HIG"

# 5. Update AuthScreen with Apple HIG
print_info "5. Updating AuthScreen with Apple HIG..."

cat > frontend/src/screens/AuthScreen.tsx << 'EOF'
// src/screens/AuthScreen.tsx
import React, { useState, useEffect } from 'react';
import { Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const AuthScreen = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
  });

  const { login, register, isLoading, error, clearError } = useAuth();

  useEffect(() => {
    clearError();
  }, [isLogin, clearError]);

  useEffect(() => {
    if (error) {
      clearError();
    }
  }, [formData, clearError]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (isLogin) {
        await login(formData.email, formData.password);
      } else {
        await register(formData.email, formData.password, formData.name);
      }
    } catch (err) {
      // Error is already handled in the auth context
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const getFieldError = (field: string) => {
    return error?.field === field ? error.message : undefined;
  };

  const hasGeneralError = error && !error.field;

  return (
    <div className="min-h-screen bg-bg-canvas flex items-center justify-center safe-area-top safe-area-bottom">
      <div className="w-full max-w-sm px-6">
        {/* Header - Apple HIG: Large title */}
        <div className="text-center mb-12">
          <h1 className="text-large-title font-bold text-content-primary mb-3">
            cinefluent
          </h1>
          <p className="text-body text-content-secondary">
            Learn languages through movies
          </p>
        </div>

        {/* Demo Credentials Notice */}
        {process.env.NODE_ENV === 'development' && (
          <div className="card-ios mb-6 p-4">
            <p className="text-callout font-semibold text-accent-solid mb-2">
              Demo Credentials:
            </p>
            <p className="text-footnote text-content-secondary">
              Email: demo@cinefluent.com<br />
              Password: demo123
            </p>
          </div>
        )}

        {/* Form Card */}
        <div className="card-ios p-6">
          <div className="mb-8">
            <h2 className="text-title-1 font-bold text-content-primary mb-2">
              {isLogin ? 'Welcome back' : 'Create account'}
            </h2>
            <p className="text-body text-content-secondary">
              {isLogin ? 'Sign in to continue learning' : 'Start your language journey'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div>
                <label className="text-callout font-medium text-content-primary block mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-content-secondary" />
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className={`input-ios pl-12 w-full ${getFieldError('name') ? 'border-state-error' : ''}`}
                    disabled={isLoading}
                    required
                  />
                  {getFieldError('name') && (
                    <p className="text-footnote text-state-error mt-2">{getFieldError('name')}</p>
                  )}
                </div>
              </div>
            )}

            <div>
              <label className="text-callout font-medium text-content-primary block mb-2">
                Email
              </label>
              <div className="relative">
                <Mail size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-content-secondary" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`input-ios pl-12 w-full ${getFieldError('email') ? 'border-state-error' : ''}`}
                  disabled={isLoading}
                  required
                />
                {getFieldError('email') && (
                  <p className="text-footnote text-state-error mt-2">{getFieldError('email')}</p>
                )}
              </div>
            </div>

            <div>
              <label className="text-callout font-medium text-content-primary block mb-2">
                Password
              </label>
              <div className="relative">
                <Lock size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-content-secondary" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className={`input-ios pl-12 pr-12 w-full ${getFieldError('password') ? 'border-state-error' : ''}`}
                  disabled={isLoading}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-content-secondary hover:text-content-primary transition-colors"
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
                {getFieldError('password') && (
                  <p className="text-footnote text-state-error mt-2">{getFieldError('password')}</p>
                )}
              </div>
            </div>

            {hasGeneralError && (
              <div className="bg-state-error bg-opacity-10 border border-state-error rounded-xl p-4">
                <p className="text-footnote text-state-error text-center">
                  {error.message}
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                  {isLogin ? 'Signing in...' : 'Creating account...'}
                </span>
              ) : (
                isLogin ? 'Sign In' : 'Create Account'
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setFormData({ email: '', password: '', name: '' });
              }}
              className="text-accent-solid hover:opacity-80 font-medium text-body transition-opacity"
              disabled={isLoading}
            >
              {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthScreen;
EOF

print_status "AuthScreen updated with Apple HIG"

# 6. Update Community and Progress screens
print_info "6. Updating remaining screens with Apple HIG..."

cat > frontend/src/screens/CommunityScreen.tsx << 'EOF'
import React, { useState } from 'react';
import { MessageCircle, Trophy, Send } from 'lucide-react';

const CommunityScreen = () => {
  const [activeTab, setActiveTab] = useState('Chat');

  const posts = [
    {
      user: 'Sarah Chen',
      initials: 'SC',
      time: '2m ago',
      content: 'Just finished Toy Story in Spanish! The vocabulary was perfect for beginners 🎬',
      likes: 12
    },
    {
      user: 'Miguel Rodriguez',
      initials: 'MR',
      time: '15m ago',
      content: 'Does anyone know where I can watch Finding Nemo with French subtitles?',
      likes: 5
    },
    {
      user: 'Emma Thompson',
      initials: 'ET',
      time: '1h ago',
      content: 'Tip: Use the \'Export to Anki\' feature after each lesson. It\'s been a game changer for retention! 🧠',
      likes: 23
    }
  ];

  const leaderboard = [
    { rank: 1, name: 'Sarah Chen', points: 2847, streak: 28 },
    { rank: 2, name: 'Miguel Rodriguez', points: 2651, streak: 21 },
    { rank: 3, name: 'Emma Thompson', points: 2398, streak: 19 },
    { rank: 4, name: 'You', points: 1847, streak: 12, isCurrentUser: true },
    { rank: 5, name: 'Akira Tanaka', points: 1654, streak: 15 },
  ];

  return (
    <div className="flex flex-col min-h-full bg-bg-canvas">
      {/* Header */}
      <div className="px-6 py-8 text-center">
        <h1 className="text-large-title font-bold text-content-primary mb-2">
          Community
        </h1>
        <p className="text-body text-content-secondary">
          Connect with fellow learners
        </p>
      </div>

      {/* Tab Navigation - Apple HIG: Segmented control */}
      <div className="px-4 mb-6">
        <div className="bg-card rounded-xl p-1 flex">
          <button
            onClick={() => setActiveTab('Chat')}
            className={`flex-1 flex items-center justify-center py-3 rounded-lg transition-all duration-200 ${
              activeTab === 'Chat' 
                ? 'bg-accent-solid text-white shadow-sm' 
                : 'text-content-secondary hover:text-content-primary'
            }`}
          >
            <MessageCircle size={20} className="mr-2" />
            <span className="text-callout font-medium">Chat</span>
          </button>
          <button
            onClick={() => setActiveTab('Leaderboard')}
            className={`flex-1 flex items-center justify-center py-3 rounded-lg transition-all duration-200 ${
              activeTab === 'Leaderboard' 
                ? 'bg-accent-solid text-white shadow-sm' 
                : 'text-content-secondary hover:text-content-primary'
            }`}
          >
            <Trophy size={20} className="mr-2" />
            <span className="text-callout font-medium">Leaderboard</span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 pb-8">
        {activeTab === 'Chat' ? (
          <div className="space-y-4">
            {posts.map((post, index) => (
              <div key={index} className="card-ios mx-4">
                <div className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-accent-solid rounded-full flex items-center justify-center text-white font-semibold text-footnote">
                      {post.initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-callout font-semibold text-content-primary">
                          {post.user}
                        </h3>
                        <span className="text-caption text-content-secondary">
                          {post.time}
                        </span>
                      </div>
                      <p className="text-body text-content-primary mb-3 leading-relaxed">
                        {post.content}
                      </p>
                      <button className="flex items-center gap-1 text-content-secondary hover:text-state-error transition-colors">
                        <span className="text-footnote">❤️</span>
                        <span className="text-footnote font-medium">{post.likes}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Message Input */}
            <div className="card-ios mx-4">
              <div className="p-4">
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    placeholder="Share your progress or ask for help..."
                    className="input-ios flex-1 text-body"
                  />
                  <button className="bg-accent-solid text-white p-3 rounded-xl hover:opacity-80 transition-opacity">
                    <Send size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-3 px-4">
            {leaderboard.map((user, index) => (
              <div key={index} className={`card-ios ${
                user.isCurrentUser ? 'ring-2 ring-accent-solid bg-accent-solid bg-opacity-5' : ''
              }`}>
                <div className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-content-secondary bg-opacity-10 rounded-full flex items-center justify-center">
                      <span className="text-footnote font-bold text-content-secondary">
                        #{user.rank}
                      </span>
                    </div>
                    <div className="w-10 h-10 bg-accent-solid rounded-full flex items-center justify-center text-white font-semibold text-footnote">
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-callout font-semibold text-content-primary">
                        {user.name}
                      </h3>
                      <p className="text-footnote text-content-secondary">
                        {user.points.toLocaleString()} points
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-spark">🔥</span>
                      <span className="text-footnote font-medium text-content-secondary">
                        {user.streak}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CommunityScreen;
EOF

# 7. Update Progress screen
cat > frontend/src/screens/ProgressScreen.tsx << 'EOF'
import React from 'react';

const ProgressScreen = () => {
  const weeklyActivity = [
    [1, 2, 0, 1, 3, 2, 1],
    [2, 1, 1, 0, 2, 3, 2],
    [1, 3, 2, 1, 1, 2, 0],
    [0, 1, 2, 3, 1, 2, 1],
    [2, 1, 0, 1, 2, 1, 3],
  ];

  const achievements = [
    {
      title: 'First Movie',
      description: 'Complete your first movie',
      status: 'Earned',
      icon: '🎬'
    },
    {
      title: 'Week Warrior',
      description: '7-day learning streak',
      status: 'Earned',
      icon: '🔥'
    }
  ];

  const getActivityColor = (value: number) => {
    if (value === 0) return 'bg-content-secondary bg-opacity-10';
    if (value === 1) return 'bg-state-success opacity-40';
    if (value === 2) return 'bg-state-success opacity-70';
    return 'bg-state-success';
  };

  return (
    <div className="flex flex-col min-h-full bg-bg-canvas">
      {/* Header */}
      <div className="px-6 py-8 text-center">
        <h1 className="text-large-title font-bold text-content-primary mb-2">
          Your Progress
        </h1>
        <p className="text-body text-content-secondary">
          Track your learning journey
        </p>
      </div>

      {/* Stats */}
      <div className="px-4 mb-8">
        <div className="grid grid-cols-2 gap-4">
          <div className="card-ios p-6 text-center">
            <div className="text-large-title font-bold text-spark mb-2">23</div>
            <div className="text-footnote text-content-secondary">Day Streak</div>
          </div>
          <div className="card-ios p-6 text-center">
            <div className="text-large-title font-bold text-accent-solid mb-2">347</div>
            <div className="text-footnote text-content-secondary">Words Learned</div>
          </div>
        </div>
      </div>

      {/* Weekly Goal */}
      <div className="px-4 mb-8">
        <div className="card-ios p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-headline font-semibold text-content-primary">Weekly Goal</h3>
            <span className="text-footnote text-content-secondary">3/5</span>
          </div>
          <div className="progress-ios mb-2">
            <div className="progress-fill-ios" style={{ width: '60%' }} />
          </div>
          <p className="text-footnote text-content-secondary">
            2 more lessons to reach your goal
          </p>
        </div>
      </div>

      {/* Learning Activity */}
      <div className="px-4 mb-8">
        <div className="card-ios p-6">
          <h3 className="text-headline font-semibold text-content-primary mb-4 flex items-center gap-2">
            📅 Learning Activity
          </h3>
          <div className="space-y-2">
            <div className="flex justify-between text-caption text-content-secondary mb-3">
              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
                <div key={index} className="w-6 text-center">{day}</div>
              ))}
            </div>
            {weeklyActivity.map((week, weekIndex) => (
              <div key={weekIndex} className="flex justify-between gap-1">
                {week.map((value, dayIndex) => (
                  <div
                    key={dayIndex}
                    className={`w-6 h-6 rounded ${getActivityColor(value)}`}
                    title={`${value} lessons`}
                  />
                ))}
              </div>
            ))}
            <div className="flex items-center justify-between text-caption text-content-secondary mt-4">
              <span>Less</span>
              <div className="flex gap-1">
                <div className="w-3 h-3 rounded bg-content-secondary bg-opacity-10" />
                <div className="w-3 h-3 rounded bg-state-success opacity-40" />
                <div className="w-3 h-3 rounded bg-state-success opacity-70" />
                <div className="w-3 h-3 rounded bg-state-success" />
              </div>
              <span>More</span>
            </div>
          </div>
        </div>
      </div>

      {/* Achievements */}
      <div className="px-4 pb-8">
        <div className="card-ios p-6">
          <h3 className="text-headline font-semibold text-content-primary mb-4 flex items-center gap-2">
            🏆 Achievements
          </h3>
          <div className="space-y-4">
            {achievements.map((achievement, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="w-12 h-12 bg-content-secondary bg-opacity-10 rounded-full flex items-center justify-center text-xl">
                  {achievement.icon}
                </div>
                <div className="flex-1">
                  <h4 className="text-callout font-medium text-content-primary">
                    {achievement.title}
                  </h4>
                  <p className="text-footnote text-content-secondary">
                    {achievement.description}
                  </p>
                </div>
                <span className="bg-accent-solid text-white text-caption px-3 py-1 rounded-full">
                  {achievement.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressScreen;
EOF

print_status "All screens updated with Apple HIG"

# 8. Create app icons and favicons
print_info "7. Creating Apple app icons..."

# Create a simple script to generate app icons (user will need to add actual icons)
cat > frontend/public/create_icons.txt << 'EOF'
Apple App Icon Requirements:
============================

Place these icon files in frontend/public/:

- apple-touch-icon.png (180x180) - Home screen icon
- favicon-32x32.png (32x32) - Browser favicon
- favicon-16x16.png (16x16) - Browser favicon
- apple-splash-2048-2732.png (2048x2732) - Splash screen

You can generate these from your app logo using:
1. Online tools like favicon.io
2. Design tools like Figma/Sketch
3. Command line tools like ImageMagick

The icon should:
- Use your app's brand colors (#1580FF)
- Be simple and recognizable at small sizes
- Follow Apple's icon design guidelines
EOF

print_status "Icon requirements documented"

# 9. Create deployment script
print_info "8. Creating deployment script..."

cat > deploy_mobile_fixes.sh << 'EOF'
#!/bin/bash

echo "🚀 Deploying Mobile Fixes to Production"
echo "======================================"

# Build the frontend
cd frontend
echo "📦 Building frontend with mobile fixes..."
npm run build

# Deploy to Netlify
echo "🌐 Deploying to Netlify..."
netlify deploy --prod --dir=dist

echo "✅ Mobile fixes deployed!"
echo "📱 Test your app: https://cinefluent.netlify.app"
echo ""
echo "🧪 Test checklist:"
echo "  ✓ Open on iPhone/Android"
echo "  ✓ Check touch targets (44x44 minimum)"
echo "  ✓ Verify safe area spacing"
echo "  ✓ Test landscape/portrait rotation"
echo "  ✓ Check text readability"
echo "  ✓ Verify smooth animations"
EOF

chmod +x deploy_mobile_fixes.sh

print_status "Deployment script created"

# 10. Final instructions
echo ""
echo "🎉 Apple Human Interface Guidelines Applied!"
echo "==========================================="
echo ""
print_info "Changes made:"
echo "  ✅ Apple HIG typography scale"
echo "  ✅ Proper touch targets (44x44 minimum)"
echo "  ✅ Safe area support for notched devices"
echo "  ✅ iOS system colors and spacing"
echo "  ✅ Native-feeling animations"
echo "  ✅ Proper viewport and meta tags"
echo "  ✅ San Francisco font stack"
echo "  ✅ Apple-standard component styles"
echo ""
print_info "Next steps:"
echo "1. Test locally: cd frontend && npm run dev"
echo "2. Deploy fixes: ./deploy_mobile_fixes.sh"
echo "3. Add app icons (see frontend/public/create_icons.txt)"
echo "4. Test on real devices"
echo ""
echo "📱 Your app will now feel native on iOS devices!"
echo "🚀 Deploy with: ./deploy_mobile_fixes.sh"