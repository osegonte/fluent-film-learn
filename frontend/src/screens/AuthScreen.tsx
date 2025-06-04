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
