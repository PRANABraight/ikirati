import React, { useState, useEffect, useRef } from 'react';

export const useScrollReveal = () => {
    const [isVisible, setIsVisible] = useState(false);
    const domRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                // Reveal once and stay visible; re-hiding on scroll-out is
                // disorienting and hurts screen-reader/find-in-page use.
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            });
        });
        const currentElement = domRef.current;
        if (currentElement) observer.observe(currentElement);
        return () => {
            if (currentElement) observer.unobserve(currentElement);
        };
    }, []);

    return { isVisible, domRef };
};

export const ScrollRevealSection: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => {
    const { isVisible, domRef } = useScrollReveal();
    return (
        <div
            ref={domRef}
            className={`transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} ${className}`}
        >
            {children}
        </div>
    );
};
