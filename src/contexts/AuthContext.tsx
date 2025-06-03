// src/contexts/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types/api';
import { apiService } from '../services/api';

interface AuthError {
  message: string;
  field?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  error: AuthError | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<AuthError | null>(null);

  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem('auth_token');
      if (token) {
        try {
          const userData = await apiService.getCurrentUser();
          setUser(userData);
        } catch (error) {
          console.error('Failed to fetch user:', error);
          localStorage.removeItem('auth_token');
          setError({ message: 'Session expired. Please login again.' });
        }
      }
      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  const clearError = () => {
    setError(null);
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string): boolean => {
    return password.length >= 6;
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    // Client-side validation
    if (!validateEmail(email)) {
      setError({ message: 'Please enter a valid email address.', field: 'email' });
      setIsLoading(false);
      return;
    }

    if (!validatePassword(password)) {
      setError({ message: 'Password must be at least 6 characters long.', field: 'password' });
      setIsLoading(false);
      return;
    }

    try {
      const response = await apiService.login(email, password);
      setUser(response.user);
      setError(null);
    } catch (error: any) {
      console.error('Login failed:', error);
      
      // Handle different types of errors
      if (error.message.includes('Invalid credentials')) {
        setError({ message: 'Invalid email or password. Please try again.' });
      } else if (error.message.includes('Network')) {
        setError({ message: 'Network error. Please check your connection and try again.' });
      } else {
        setError({ message: 'Login failed. Please try again.' });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string, name: string) => {
    setIsLoading(true);
    setError(null);

    // Client-side validation
    if (!name.trim()) {
      setError({ message: 'Please enter your full name.', field: 'name' });
      setIsLoading(false);
      return;
    }

    if (!validateEmail(email)) {
      setError({ message: 'Please enter a valid email address.', field: 'email' });
      setIsLoading(false);
      return;
    }

    if (!validatePassword(password)) {
      setError({ message: 'Password must be at least 6 characters long.', field: 'password' });
      setIsLoading(false);
      return;
    }

    try {
      const response = await apiService.register(email, password, name.trim());
      setUser(response.user);
      setError(null);
    } catch (error: any) {
      console.error('Registration failed:', error);
      
      // Handle different types of errors
      if (error.message.includes('already exists')) {
        setError({ message: 'An account with this email already exists.', field: 'email' });
      } else if (error.message.includes('Network')) {
        setError({ message: 'Network error. Please check your connection and try again.' });
      } else {
        setError({ message: 'Registration failed. Please try again.' });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await apiService.logout();
    } catch (error) {
      console.error('Logout error:', error);
      // Continue with logout even if API call fails
    } finally {
      setUser(null);
      setError(null);
    }
  };

  const value: AuthContextType = {
    user,
    isLoading,
    error,
    login,
    register,
    logout,
    clearError,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};