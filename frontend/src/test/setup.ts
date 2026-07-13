import '@testing-library/jest-dom';

// jsdom doesn't implement matchMedia; GSAP-aware components query
// `prefers-reduced-motion` on every animation path, so without this every
// test that mounts them throws "matchMedia is not a function".
if (!window.matchMedia) {
  window.matchMedia = (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  } as MediaQueryList);
}
