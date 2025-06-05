#!/bin/bash

echo "🔧 Fixing CineFluent Frontend Build Issues"
echo "=========================================="

# Navigate to frontend directory
cd frontend

echo "📝 Creating missing mockData file..."
mkdir -p src/data
cat > src/data/mockData.ts << 'EOF'
// Essential mock data for fallback
export const mockApiService = {
  async getMovies() {
    return [];
  },
  async getMovie(id: string) {
    throw new Error('Movie not found');
  },
  async getLesson(id: string) {
    throw new Error('Lesson not found');
  },
  async getMovieLessons(movieId: string) {
    return [];
  },
  async getCurrentUser() {
    return {
      id: '1',
      email: 'demo@cinefluent.com',
      name: 'Demo User',
      level: 'Intermediate B1',
      streak: 12,
      totalWords: 1247,
      studyTime: '47h 23m',
    };
  },
  async login(email: string, password: string) {
    if (email === 'demo@cinefluent.com' && password === 'demo123') {
      return {
        user: {
          id: '1',
          email: 'demo@cinefluent.com',
          name: 'Demo User',
          level: 'Intermediate B1',
          streak: 12,
          totalWords: 1247,
          studyTime: '47h 23m',
        },
        token: 'mock-jwt-token',
      };
    }
    throw new Error('Invalid credentials');
  },
  async register(email: string, password: string, name: string) {
    return {
      user: { id: '2', email, name, level: 'Beginner', streak: 0, totalWords: 0, studyTime: '0h 0m' },
      token: 'mock-jwt-token',
    };
  },
  async updateProgress(progress: any) {
    console.log('Progress updated:', progress);
  },
};
EOF

echo "🎨 Fixing CSS import issues..."
# Fix the CSS file by removing the problematic @import statements
cat > src/index.css << 'EOF'
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
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
    --accent: 221 83% 53%;
    --accent-foreground: 210 40% 98%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 221 83% 53%;
    --radius: 12px;
    --success: 142 76% 45%;
    --warning: 48 100% 63%;
  }

  html.dark {
    --background: 240 6% 5.5%;
    --foreground: 0 0% 96%;
    --card: 240 4% 10%;
    --card-foreground: 0 0% 96%;
    --popover: 240 4% 13%;
    --popover-foreground: 0 0% 96%;
    --primary: 221 83% 53%;
    --primary-foreground: 0 0% 100%;
    --secondary: 240 4% 13%;
    --secondary-foreground: 0 0% 78%;
    --muted: 240 4% 13%;
    --muted-foreground: 240 5% 64%;
    --accent: 240 4% 13%;
    --accent-foreground: 0 0% 78%;
    --destructive: 0 76% 67%;
    --destructive-foreground: 0 0% 96%;
    --border: 240 4% 18%;
    --input: 240 4% 18%;
    --ring: 221 83% 53%;
    --success: 142 70% 49%;
    --warning: 48 100% 70%;
  }
}

@layer base {
  * {
    @apply border-border;
    box-sizing: border-box;
  }

  body {
    @apply bg-background text-foreground;
    font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', system-ui, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    transition: background-color 0.3s ease, color 0.3s ease;
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: 700;
    letter-spacing: -0.02em;
  }

  p, span, div {
    font-weight: 500;
  }

  button {
    font-weight: 600;
  }
}

@layer components {
  .mobile-card {
    @apply rounded-xl bg-card backdrop-blur-sm border border-border/50 shadow-lg;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  .mobile-card:hover {
    @apply shadow-xl scale-[1.02];
    transform: translateY(-2px) scale(1.02);
  }

  .btn-mobile {
    @apply min-h-[44px] px-6 py-3 rounded-xl font-semibold transition-all duration-300;
    font-weight: 600;
  }
  
  .btn-mobile:active {
    @apply scale-95;
  }

  .btn-mobile:hover {
    transform: translateY(-2px) scale(1.02);
  }

  .btn-primary {
    @apply btn-mobile bg-primary text-primary-foreground shadow-lg;
  }

  .btn-secondary {
    @apply btn-mobile bg-secondary text-secondary-foreground border border-border;
  }

  .progress-enhanced {
    @apply h-3 bg-muted rounded-full overflow-hidden relative;
    transition: all 0.3s ease;
  }
  
  .progress-enhanced .progress-fill {
    @apply h-full rounded-full transition-all duration-700 ease-out min-w-[8px];
    background: linear-gradient(90deg, #1580FF 0%, #8C2BFF 50%, #D11AFF 100%);
  }

  .focus-ring {
    @apply focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2;
  }
}

@layer utilities {
  .animate-fade-in-up {
    animation: fade-in-up 0.6s ease-out;
  }

  .animate-scale-in {
    animation: scale-in 0.4s ease-out;
  }

  .animate-bounce-subtle {
    animation: bounce-subtle 0.6s ease-in-out;
  }

  .stagger-1 { animation-delay: 0.1s; }
  .stagger-2 { animation-delay: 0.2s; }
  .stagger-3 { animation-delay: 0.3s; }
  .stagger-4 { animation-delay: 0.4s; }
  .stagger-5 { animation-delay: 0.5s; }

  @keyframes fade-in-up {
    0% {
      opacity: 0;
      transform: translateY(20px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes scale-in {
    0% {
      opacity: 0;
      transform: scale(0.95);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes bounce-subtle {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
  }
}

/* Theme transitions */
* {
  transition-property: background-color, border-color, color, fill, stroke, opacity, box-shadow, transform;
  transition-duration: 0.3s;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

/* Safe area utilities for mobile */
.safe-area-bottom {
  padding-bottom: env(safe-area-inset-bottom);
}

.safe-area-top {
  padding-top: env(safe-area-inset-top);
}
EOF

echo "🔧 Creating missing theme file..."
cat > src/theme.js << 'EOF'
// Simple theme management
export function initTheme() {
  const savedTheme = localStorage.getItem('theme') || 'light';
  applyTheme(savedTheme);
}

export function toggleTheme() {
  const currentTheme = localStorage.getItem('theme') || 'light';
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  applyTheme(newTheme);
  localStorage.setItem('theme', newTheme);
}

export function setTheme(theme) {
  applyTheme(theme);
  localStorage.setItem('theme', theme);
}

function applyTheme(theme) {
  const html = document.documentElement;
  if (theme === 'dark') {
    html.classList.add('dark');
  } else {
    html.classList.remove('dark');
  }
}

// Initialize theme on page load
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', initTheme);
}
EOF

echo "📱 Creating missing mobile hook..."
mkdir -p src/hooks
cat > src/hooks/use-mobile.tsx << 'EOF'
import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    mql.addEventListener("change", onChange)
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return !!isMobile
}
EOF

echo "🎯 Updating main.tsx to fix theme import..."
cat > src/main.tsx << 'EOF'
// Theme initialization
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
  document.documentElement.classList.add("dark");
} else {
  document.documentElement.classList.remove("dark");
}

import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './theme.js'

createRoot(document.getElementById("root")!).render(<App />);
EOF

echo "🔄 Updating App.tsx to fix loading..."
# Simplify App.tsx to remove complex loading states that reference deleted files
cat > src/App.tsx << 'EOF'
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import { AuthProvider, useAuth } from './contexts/AuthContext';
import AuthScreen from './screens/AuthScreen';
import LearnScreen from './screens/LearnScreen';
import ProgressScreen from './screens/ProgressScreen';
import CommunityScreen from './screens/CommunityScreen';
import ProfileScreen from './screens/ProfileScreen';
import LessonScreen from './screens/LessonScreen';
import ErrorBoundary from './components/ErrorBoundary';
import LoadingSpinner from './components/LoadingSpinner';

const queryClient = new QueryClient();

const AppContent = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-background">
        <div className="text-center">
          <LoadingSpinner size="lg" className="mb-4" />
          <div className="text-foreground font-medium">Loading CineFluent...</div>
          <div className="text-muted-foreground text-sm mt-2">Preparing your learning experience</div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AuthScreen />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<LearnScreen />} />
          <Route path="progress" element={<ProgressScreen />} />
          <Route path="community" element={<CommunityScreen />} />
          <Route path="profile" element={<ProfileScreen />} />
        </Route>
        <Route path="/lesson/:lessonId" element={<LessonScreen />} />
        <Route path="*" element={
          <div className="flex items-center justify-center h-screen bg-background">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-foreground mb-2">Page Not Found</h1>
              <p className="text-muted-foreground">The page you're looking for doesn't exist.</p>
            </div>
          </div>
        } />
      </Routes>
    </BrowserRouter>
  );
};

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <AppContent />
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
EOF

echo "🏗️ Testing frontend build..."
npm run build

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Frontend build successful!"
    echo "🚀 Ready for deployment!"
    cd ..
else
    echo ""
    echo "❌ Build still failing. Let me check what's missing..."
    cd ..
fi
EOF