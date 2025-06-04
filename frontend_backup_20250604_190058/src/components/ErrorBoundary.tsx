// src/components/ErrorBoundary.tsx
import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from './ui/button';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error Boundary caught an error:', error, errorInfo);
    
    // You can log the error to an error reporting service here
    if (process.env.NODE_ENV === 'production') {
      // Log to error service (e.g., Sentry, LogRocket)
    }
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-canvas flex items-center justify-center px-6">
          <div className="text-center max-w-md">
            <div className="w-16 h-16 bg-persimmon-500 bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertTriangle size={32} className="text-persimmon-500" />
            </div>
            
            <h1 className="text-2xl font-bold text-primary mb-4">
              Oops! Something went wrong
            </h1>
            
            <p className="text-secondary mb-6">
              We're sorry, but something unexpected happened. Please try refreshing the page or contact support if the problem persists.
            </p>
            
            <div className="space-y-3">
              <Button 
                onClick={this.handleReset}
                className="w-full btn-primary"
              >
                <RefreshCw size={16} className="mr-2" />
                Try Again
              </Button>
              
              <Button 
                onClick={() => window.location.reload()}
                variant="outline"
                className="w-full"
              >
                Refresh Page
              </Button>
            </div>
            
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mt-6 text-left">
                <summary className="cursor-pointer text-sm text-secondary hover:text-primary">
                  Error Details (Dev Mode)
                </summary>
                <pre className="mt-2 p-4 bg-card border border-default rounded-lg text-xs overflow-auto text-persimmon-500">
                  {this.state.error.stack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;