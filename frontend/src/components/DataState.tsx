import React from 'react';
import { RefreshCw } from 'lucide-react';

export const LoadingSection: React.FC<{ label?: string }> = ({ label = 'Loading content' }) => (
  <div role="status" aria-label={label} className="py-24 px-6">
    <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[0, 1, 2].map((i) => (
        <div key={i} className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse">
          <div className="h-64 bg-green-100" />
          <div className="p-8 space-y-4">
            <div className="h-6 bg-green-100 rounded w-3/4" />
            <div className="h-4 bg-green-50 rounded" />
            <div className="h-4 bg-green-50 rounded w-5/6" />
          </div>
        </div>
      ))}
    </div>
  </div>
);

export const ErrorSection: React.FC<{ onRetry: () => void; message?: string }> = ({
  onRetry,
  message = "We couldn't load this content. Please check your connection and try again.",
}) => (
  <div role="alert" className="py-24 px-6 text-center">
    <p className="text-green-800 text-lg mb-8 max-w-md mx-auto">{message}</p>
    <button
      onClick={onRetry}
      className="inline-flex items-center gap-2 bg-green-900 text-white px-8 py-3 rounded-full font-bold hover:bg-green-800 transition-colors"
    >
      <RefreshCw className="w-4 h-4" />
      Try Again
    </button>
  </div>
);

export const EmptySection: React.FC<{ message?: string }> = ({
  message = 'Content is coming soon. Check back as our community archive grows.',
}) => (
  <div className="py-24 px-6 text-center">
    <p className="text-green-700 text-lg max-w-md mx-auto">{message}</p>
  </div>
);
