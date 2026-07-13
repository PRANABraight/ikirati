import { describe, it, expect, vi, afterEach } from 'vitest';
import { render } from '@testing-library/react';
import { useRef } from 'react';
import { gsap } from 'gsap';
import { useParallax } from './useParallax';

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

function TestHero() {
  const ref = useRef<HTMLDivElement>(null);
  useParallax(ref);
  return <div ref={ref} data-testid="hero" />;
}

describe('useParallax', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('does not throw when mounted', () => {
    expect(() => render(<TestHero />)).not.toThrow();
  });

  it('creates a scrub-bound scroll tween on the element', () => {
    const spy = vi.spyOn(gsap, 'to');
    render(<TestHero />);

    expect(spy).toHaveBeenCalled();
    const [target, vars] = spy.mock.calls[0];
    expect(target).toBeInstanceOf(HTMLElement);
    expect(vars).toMatchObject({ ease: 'none' });
    expect(vars.scrollTrigger).toMatchObject({ scrub: true });
  });

  it('skips the tween under prefers-reduced-motion', () => {
    mockMatchMedia(true);
    const spy = vi.spyOn(gsap, 'to');
    render(<TestHero />);
    expect(spy).not.toHaveBeenCalled();
  });
});
