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
