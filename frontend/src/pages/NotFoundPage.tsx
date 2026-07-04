import React from 'react';
import { Link } from 'react-router-dom';
import { usePageMeta } from '../hooks/usePageMeta';

export const NotFoundPage: React.FC = () => {
  usePageMeta('Page Not Found');
  return (
  <div className="min-h-[70vh] flex flex-col items-center justify-center bg-stone-50 px-6 text-center">
    <p className="text-amber-600 font-bold uppercase tracking-widest text-sm mb-4">404</p>
    <h1 className="text-5xl font-bold text-green-900 mb-6 font-serif">Page Not Found</h1>
    <p className="text-green-700 mb-10 max-w-md">
      The path you followed doesn't lead anywhere. Return home to keep exploring Kirati heritage.
    </p>
    <Link
      to="/"
      className="bg-green-900 text-white px-8 py-3 rounded-full font-bold hover:bg-green-800 transition-colors"
    >
      Back to Home
    </Link>
  </div>
  );
};
