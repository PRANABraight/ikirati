import React from 'react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('Unhandled render error:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-stone-50 px-6 text-center">
          <h1 className="text-4xl font-bold text-green-900 mb-4 font-serif">Something went wrong</h1>
          <p className="text-green-700 mb-8 max-w-md">
            An unexpected error occurred. Please reload the page to continue exploring Kirati heritage.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-green-900 text-white px-8 py-3 rounded-full font-bold hover:bg-green-800 transition-colors"
          >
            Reload Page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
