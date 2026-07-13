import { describe, it, expect, vi, afterEach } from 'vitest';
import { render } from '@testing-library/react';
import { ScrollRevealSection } from './useScrollReveal';

function mockMatchMedia(reduced: boolean) {
  vi.spyOn(window, 'matchMedia').mockImplementation(
    (query: string) =>
      ({
        matches: query.includes('reduce') ? reduced : false,
        media: query,
        onchange: null,
        addListener: () => {},
        removeListener: () => {},
        addEventListener: () => {},
        removeEventListener: () => {},
        dispatchEvent: () => false,
      }) as MediaQueryList
  );
}

describe('ScrollRevealSection', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders children', () => {
    const { getByText } = render(
      <ScrollRevealSection>
        <p>hello</p>
      </ScrollRevealSection>
    );
    expect(getByText('hello')).toBeInTheDocument();
  });

  it('applies the given className to the wrapper', () => {
    const { container } = render(
      <ScrollRevealSection className="custom-class">
        <p>x</p>
      </ScrollRevealSection>
    );
    expect(container.firstElementChild).toHaveClass('custom-class');
  });

  it('starts hidden and scheduled for a scroll-triggered reveal', () => {
    const { container } = render(
      <ScrollRevealSection>
        <p>content</p>
      </ScrollRevealSection>
    );
    const el = container.firstElementChild as HTMLElement;
    expect(el.style.opacity).toBe('0');
  });

  it('renders fully visible immediately under prefers-reduced-motion', () => {
    mockMatchMedia(true);
    const { container } = render(
      <ScrollRevealSection>
        <p>content</p>
      </ScrollRevealSection>
    );
    const el = container.firstElementChild as HTMLElement;
    expect(el.style.opacity).toBe('1');
  });

  it('unmounts cleanly without throwing', () => {
    const { unmount } = render(
      <ScrollRevealSection>
        <p>x</p>
      </ScrollRevealSection>
    );
    expect(() => unmount()).not.toThrow();
  });
});
