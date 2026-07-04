import React from 'react';

export const LoadingScreen: React.FC = () => {
  return (
    <div
      role="status"
      aria-label="Loading Kirati Heritage"
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-green-950/40 backdrop-blur-xl transition-all duration-500"
    >
      <div className="relative p-10 rounded-full bg-white/5 backdrop-blur-md shadow-2xl border border-white/10 animate-pulse-slow">
        <svg
          width="120"
          height="120"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-24 h-24 md:w-32 md:h-32 drop-shadow-[0_0_15px_rgba(217,119,6,0.5)]"
        >
          <path
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            stroke="#D97706" // amber-600 (accent)
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="animate-draw-heart"
            style={{
              strokeDasharray: '60',
              strokeDashoffset: '60',
              filter: 'drop-shadow(0 0 8px rgba(217, 119, 6, 0.6))'
            }}
          />
        </svg>

        {/* Inner glow pulse */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-20 h-20 bg-accent/20 rounded-full blur-2xl animate-pulse" />
        </div>
      </div>

      <div className="mt-8 text-center space-y-2">
        <h2 className="text-3xl font-bold text-white font-serif tracking-wider drop-shadow-lg animate-fade-in-up">
          Kirati Heritage
        </h2>
        <p className="text-amber-200/80 text-sm uppercase tracking-[0.2em] animate-pulse">
          Loading...
        </p>
      </div>

      <style>{`
        @keyframes draw-heart {
          0% {
            stroke-dashoffset: 60;
            fill: transparent;
          }
          40% {
            stroke-dashoffset: 0;
            fill: transparent;
          }
          60% {
            stroke-dashoffset: 0;
            fill: rgba(217, 119, 6, 0.15);
          }
          100% {
            stroke-dashoffset: 0;
            fill: rgba(217, 119, 6, 0.3);
          }
        }
        .animate-draw-heart {
          animation: draw-heart 2.5s ease-in-out infinite alternate;
        }
        .animate-pulse-slow {
            animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </div>
  );
};
