// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import TabNavigator from './navigation/TabNavigator';
import AuthScreen from './screens/AuthScreen';
import LessonScreen from './screens/LessonScreen';
import ErrorBoundary from './components/ErrorBoundary';
import LoadingSpinner from './components/LoadingSpinner';

const AppContent = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-canvas">
        <div className="text-center">
          <LoadingSpinner size="lg" className="mb-4" />
          <div className="text-primary font-medium">Loading CineFluent...</div>
          <div className="text-secondary text-sm mt-2">Preparing your learning experience</div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AuthScreen />;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<TabNavigator />} />
        <Route path="/lesson/:lessonId" element={<LessonScreen />} />
        {/* Catch all route for 404s */}
        <Route 
          path="*" 
          element={
            <div className="flex items-center justify-center h-screen bg-canvas">
              <div className="text-center">
                <h1 className="text-2xl font-bold text-primary mb-2">Page Not Found</h1>
                <p className="text-secondary mb-4">The page you're looking for doesn't exist.</p>
                <button 
                  onClick={() => window.history.back()}
                  className="btn-primary"
                >
                  Go Back
                </button>
              </div>
            </div>
          } 
        />
      </Routes>
    </Router>
  );
};

export default function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ErrorBoundary>
  );
}