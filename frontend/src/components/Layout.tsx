import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navigation } from './Navigation';
import { Footer } from './Footer';

export const Layout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-green-50">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[60] bg-green-900 text-white px-4 py-2 rounded-full font-bold"
      >
        Skip to content
      </a>
      <Navigation />
      <main id="main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};