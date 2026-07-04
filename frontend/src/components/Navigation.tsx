import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Mountain, Menu, X } from 'lucide-react';

export const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  // Close mobile menu on Escape
  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMobileMenuOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isMobileMenuOpen]);

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/stories', label: 'Stories' },
    // { path: '/crafts', label: 'Crafts' },
    // { path: '/elders', label: 'Elders' },
    { path: '/archive', label: 'Archive' },
    // { path: '/language', label: 'Language' },
    // { path: '/events', label: 'Events' },
    { path: '/timeline', label: 'Timeline' },
    // { path: '/gallery', label: 'Gallery' }
  ];


  const isTransparent = !isScrolled && !isMobileMenuOpen;

  return (
    <>
      <nav
        className={`fixed z-50 transition-all duration-500 ease-in-out ${isScrolled
          ? 'top-4 left-4 right-4 md:left-1/2 md:-translate-x-1/2 md:w-auto md:max-w-7xl rounded-full bg-white/90 backdrop-blur-md shadow-lg border border-white/20 py-3 px-6'
          : 'top-0 left-0 right-0 w-full bg-transparent py-6 px-6'
          }`}
      >
        <div className={`mx-auto ${isScrolled ? 'w-full' : 'max-w-7xl'}`}>
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className={`p-1.5 rounded-lg transition-colors duration-300 ${isTransparent ? 'bg-white/10' : 'bg-green-50'
                }`}>
                <Mountain className={`w-6 h-6 transition-colors duration-300 ${isTransparent ? 'text-white' : 'text-green-700'
                  }`} />
              </div>
              <span className={`font-bold text-lg tracking-tight transition-colors duration-300 ${isTransparent ? 'text-white' : 'text-green-900'
                }`}>
                Kirati<span className={isTransparent ? 'text-amber-300' : 'text-amber-600'}>Heart</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  aria-current={location.pathname === item.path ? 'page' : undefined}
                  className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${location.pathname === item.path
                    ? isTransparent
                      ? 'bg-white/20 text-white'
                      : 'bg-green-50 text-green-900'
                    : isTransparent
                      ? 'text-white/80 hover:text-white hover:bg-white/10'
                      : 'text-gray-600 hover:text-green-900 hover:bg-gray-50'
                    }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden p-2 rounded-full transition-colors duration-300 ${isTransparent
                ? 'text-white hover:bg-white/10'
                : 'text-green-900 hover:bg-green-50'
                }`}
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Overlay */}
      <div
        id="mobile-menu"
        className={`fixed inset-0 bg-green-900/95 backdrop-blur-xl z-40 lg:hidden transition-all duration-500 ease-in-out ${isMobileMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full pointer-events-none'
          }`}
        style={{ paddingTop: '100px' }}
        aria-hidden={!isMobileMenuOpen}
      >
        <div className="flex flex-col items-center justify-center h-full space-y-6 p-6">
          {navItems.map((item, index) => (
            <Link
              key={item.path}
              to={item.path}
              tabIndex={isMobileMenuOpen ? 0 : -1}
              aria-current={location.pathname === item.path ? 'page' : undefined}
              className={`text-2xl font-bold transition-all duration-300 transform ${isMobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                } ${location.pathname === item.path
                  ? 'text-amber-400'
                  : 'text-white hover:text-amber-200'
                }`}
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              {item.label}
            </Link>
          ))}

          <div className="mt-8 pt-8 border-t border-white/10 w-full max-w-xs text-center">
            <p className="text-green-200 text-sm">
              Preserving our heritage for future generations
            </p>
          </div>
        </div>
      </div>
    </>
  );
};