import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  label: string;
  overlayClassName?: string;
  panelClassName?: string;
  children: React.ReactNode;
}

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

// Accessible dialog wrapper: focus trap, Esc to close, body scroll lock,
// focus restore, click-outside close. Panels provide their own close button.
export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  label,
  overlayClassName = 'bg-black/80 backdrop-blur-md',
  panelClassName = '',
  children,
}) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const [shouldRender, setShouldRender] = useState(isOpen);

  useGSAP(() => {
    const overlay = overlayRef.current;
    const panel = panelRef.current;

    if (isOpen) {
      setShouldRender(true);
      return;
    }
    if (!shouldRender || !overlay || !panel) return;

    if (prefersReducedMotion()) {
      setShouldRender(false);
      return;
    }

    const tl = gsap.timeline({ onComplete: () => setShouldRender(false) });
    tl.to(panel, { opacity: 0, scale: 0.95, duration: 0.2, ease: 'power1.in' })
      .to(overlay, { opacity: 0, duration: 0.2, ease: 'power1.in' }, '<');
  }, [isOpen]);

  useGSAP(() => {
    if (!isOpen || !shouldRender) return;
    const overlay = overlayRef.current;
    const panel = panelRef.current;
    if (!overlay || !panel) return;

    if (prefersReducedMotion()) {
      gsap.set([overlay, panel], { opacity: 1, scale: 1 });
      return;
    }

    gsap.fromTo(overlay, { opacity: 0 }, { opacity: 1, duration: 0.25, ease: 'power1.out' });
    gsap.fromTo(
      panel,
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 0.3, ease: 'power2.out', delay: 0.05 }
    );
  }, [isOpen, shouldRender]);

  useEffect(() => {
    if (!isOpen) return;

    previousFocusRef.current = document.activeElement as HTMLElement | null;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const panel = panelRef.current;
    const firstFocusable = panel?.querySelector<HTMLElement>(FOCUSABLE);
    (firstFocusable ?? panel)?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        onClose();
        return;
      }
      if (e.key !== 'Tab' || !panel) return;

      const focusables = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
      previousFocusRef.current?.focus();
    };
  }, [isOpen, onClose]);

  if (!shouldRender) return null;

  return (
    <div
      ref={overlayRef}
      className={`fixed inset-0 flex items-center justify-center z-50 p-4 ${overlayClassName}`}
      onClick={onClose}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={label}
        tabIndex={-1}
        className={panelClassName}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};
