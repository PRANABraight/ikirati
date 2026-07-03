import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import { Footer } from './Footer';

describe('Footer', () => {
  it('renders the brand name and nav links', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );

    expect(screen.getByRole('link', { name: 'Kirati Heart' })).toHaveAttribute('href', '/');
    expect(screen.getByRole('link', { name: 'Stories' })).toHaveAttribute('href', '/stories');
    expect(screen.getByRole('link', { name: 'Archive' })).toHaveAttribute('href', '/archive');
  });
});
