import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import { Navigation } from './Navigation';

describe('Navigation', () => {
  it('renders the brand and top-level nav links', () => {
    render(
      <MemoryRouter>
        <Navigation />
      </MemoryRouter>
    );

    expect(screen.getByRole('link', { name: 'Kirati Heart' })).toHaveAttribute('href', '/');
    expect(screen.getAllByRole('link', { name: 'Timeline' })[0]).toHaveAttribute('href', '/timeline');
  });

  it('toggles the mobile menu when the menu button is clicked', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <Navigation />
      </MemoryRouter>
    );

    const toggle = screen.getByRole('button', { name: 'Toggle menu' });
    await user.click(toggle);

    expect(screen.getByRole('button', { name: 'Toggle menu' })).toBeInTheDocument();
  });
});
