import React from 'react';

interface HeroOverlayProps {
  variant?: 'standard' | 'deep';
}

export const HeroOverlay: React.FC<HeroOverlayProps> = ({ variant = 'standard' }) => {
  const gradient =
    variant === 'deep'
      ? 'from-primary-darker/90 via-primary-dark/70 to-accent-light'
      : 'from-primary-dark/80 via-primary/60 to-accent-light';

  return <div className={`absolute inset-0 bg-gradient-to-b ${gradient}`} />;
};
