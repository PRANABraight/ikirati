import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Sections that mount in the same paint (e.g. a row of cards) get batched
// into one ScrollTrigger.batch call so they stagger in together; sections
// far apart on the page cross the viewport threshold in different batches
// and reveal independently, matching the old per-element IntersectionObserver.
let pending: HTMLElement[] = [];
let flushScheduled = false;
const triggerByElement = new WeakMap<HTMLElement, ScrollTrigger>();

function flush() {
  flushScheduled = false;
  const targets = pending;
  pending = [];
  if (targets.length === 0) return;

  const triggers = ScrollTrigger.batch(targets, {
    start: 'top 85%',
    once: true,
    onEnter: (batch) =>
      gsap.to(batch, { opacity: 1, y: 0, duration: 1, ease: 'power2.out', stagger: 0.15 }),
  });
  targets.forEach((el, i) => {
    if (triggers[i]) triggerByElement.set(el, triggers[i]);
  });
}

function scheduleReveal(el: HTMLElement) {
  pending.push(el);
  if (!flushScheduled) {
    flushScheduled = true;
    requestAnimationFrame(flush);
  }
}

export const ScrollRevealSection: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      gsap.set(el, { opacity: 1, y: 0 });
      return;
    }

    gsap.set(el, { opacity: 0, y: 40 });
    scheduleReveal(el);

    return () => {
      triggerByElement.get(el)?.kill();
      triggerByElement.delete(el);
    };
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
};
