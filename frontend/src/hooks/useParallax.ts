import { type RefObject } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Scrubs a hero background's translateY/scale to scroll position, bound to
// the element's own on-screen range so the effect settles once it scrolls
// off instead of growing indefinitely with the page's total scroll depth.
export function useParallax(ref: RefObject<HTMLElement>, speed = 0.5) {
  useGSAP(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    gsap.to(el, {
      yPercent: -20 * speed,
      scale: 1.1,
      ease: 'none',
      scrollTrigger: {
        trigger: el,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });
  }, [ref, speed]);
}
