
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import TabNavigator from './navigation/TabNavigator';
import AuthScreen from './screens/AuthScreen';
import LessonScreen from './screens/LessonScreen';

const AppContent = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-canvas">
        <div className="text-primary">Loading...</div>
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
      </Routes>
    </Router>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
