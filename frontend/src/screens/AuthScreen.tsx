// src/screens/AuthScreen.tsx
import React, { useState, useEffect } from 'react';
import { Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';

const AuthScreen = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
  });

  const { login, register, isLoading, error, clearError } = useAuth();

  // Clear errors when switching between login/register
  useEffect(() => {
    clearError();
  }, [isLogin, clearError]);

  // Clear errors when user starts typing
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
    <div className="min-h-screen bg-canvas flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2">cinefluent</h1>
          <p className="text-secondary">Learn languages through movies</p>
        </div>

        {/* Demo Credentials Notice */}
        {process.env.NODE_ENV === 'development' && (
          <div className="bg-royalBlue-500 bg-opacity-10 border border-royalBlue-500 rounded-xl p-4 mb-6">
            <p className="text-sm text-royalBlue-500 font-medium mb-2">Demo Credentials:</p>
            <p className="text-xs text-secondary">
              Email: demo@cinefluent.com<br />
              Password: demo123
            </p>
          </div>
        )}

        {/* Form */}
        <div className="bg-card rounded-xl p-6 border border-default">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-primary mb-2">
              {isLogin ? 'Welcome back' : 'Create account'}
            </h2>
            <p className="text-secondary">
              {isLogin ? 'Sign in to continue learning' : 'Start your language journey'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <Label htmlFor="name" className="text-primary">Full Name</Label>
                <div className="relative mt-1">
                  <User size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className={`pl-10 ${getFieldError('name') ? 'border-persimmon-500' : ''}`}
                    disabled={isLoading}
                    required
                  />
                  {getFieldError('name') && (
                    <p className="text-persimmon-500 text-sm mt-1">{getFieldError('name')}</p>
                  )}
                </div>
              </div>
            )}

            <div>
              <Label htmlFor="email" className="text-primary">Email</Label>
              <div className="relative mt-1">
                <Mail size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`pl-10 ${getFieldError('email') ? 'border-persimmon-500' : ''}`}
                  disabled={isLoading}
                  required
                />
                {getFieldError('email') && (
                  <p className="text-persimmon-500 text-sm mt-1">{getFieldError('email')}</p>
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="password" className="text-primary">Password</Label>
              <div className="relative mt-1">
                <Lock size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className={`pl-10 pr-10 ${getFieldError('password') ? 'border-persimmon-500' : ''}`}
                  disabled={isLoading}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-secondary hover:text-primary"
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
                {getFieldError('password') && (
                  <p className="text-persimmon-500 text-sm mt-1">{getFieldError('password')}</p>
                )}
              </div>
            </div>

            {hasGeneralError && (
              <div className="text-persimmon-500 text-sm text-center bg-persimmon-500 bg-opacity-10 rounded-lg p-3">
                {error.message}
              </div>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  {isLogin ? 'Signing in...' : 'Creating account...'}
                </span>
              ) : (
                isLogin ? 'Sign In' : 'Create Account'
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setFormData({ email: '', password: '', name: '' });
              }}
              className="text-royalBlue-500 hover:text-royalBlue-600 font-medium"
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