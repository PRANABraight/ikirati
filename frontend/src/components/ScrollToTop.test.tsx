import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { ScrollToTop } from './ScrollToTop';

describe('ScrollToTop', () => {
  it('scrolls to top whenever the route changes', () => {
    const scrollTo = vi.fn();
    window.scrollTo = scrollTo;

    render(
      <MemoryRouter initialEntries={['/a']}>
        <ScrollToTop />
        <Routes>
          <Route path="/a" element={<div>A</div>} />
          <Route path="/b" element={<div>B</div>} />
        </Routes>
      </MemoryRouter>
    );

    expect(scrollTo).toHaveBeenCalledWith(0, 0);
    scrollTo.mockClear();

    render(
      <MemoryRouter initialEntries={['/b']}>
        <ScrollToTop />
        <Routes>
          <Route path="/a" element={<div>A</div>} />
          <Route path="/b" element={<div>B</div>} />
        </Routes>
      </MemoryRouter>
    );

    expect(scrollTo).toHaveBeenCalledWith(0, 0);
  });
});
