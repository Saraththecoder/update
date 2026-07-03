import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;
    if (!cursor || !cursorDot) return;

    // We set cursor quickTo with different durations for a drag effect
    const xTo = gsap.quickTo(cursor, "x", { duration: 0.2, ease: "power3" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.2, ease: "power3" });
    const xDTo = gsap.quickTo(cursorDot, "x", { duration: 0.05, ease: "power3" });
    const yDTo = gsap.quickTo(cursorDot, "y", { duration: 0.05, ease: "power3" });

    const moveCursor = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
      xDTo(e.clientX);
      yDTo(e.clientY);
    };

    const handleHoverIn = () => setIsHovering(true);
    const handleHoverOut = () => setIsHovering(false);

    window.addEventListener('mousemove', moveCursor);

    // Setup an observer to add listeners to dynamically added buttons/links
    const setupListeners = () => {
      const interactiveElements = document.querySelectorAll('a, button, input, select, textarea, [role="button"], .gsap-hero-btn');
      interactiveElements.forEach((el) => {
        el.addEventListener('mouseenter', handleHoverIn);
        el.addEventListener('mouseleave', handleHoverOut);
      });
      return interactiveElements;
    };
    
    const elements = setupListeners();

    // Re-run listener setup occasionally for dynamic routes
    const interval = setInterval(setupListeners, 1000);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      clearInterval(interval);
      elements.forEach((el) => {
        el.removeEventListener('mouseenter', handleHoverIn);
        el.removeEventListener('mouseleave', handleHoverOut);
      });
    };
  }, []);

  // Don't render DOM nodes at all on touch devices
  if (typeof window !== 'undefined' && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  return (
    <>
      <div 
        ref={cursorRef} 
        className={`fixed top-0 left-0 w-8 h-8 -ml-4 -mt-4 rounded-full border border-brand-red pointer-events-none z-[9999] transition-transform duration-300 ease-out hidden sm:block ${isHovering ? 'scale-[2.5] bg-brand-red/10 border-brand-red/50' : 'scale-100'}`}
      />
      <div 
        ref={cursorDotRef} 
        className={`fixed top-0 left-0 w-1.5 h-1.5 -ml-[3px] -mt-[3px] rounded-full bg-brand-red pointer-events-none z-[10000] hidden sm:block transition-transform duration-300 ${isHovering ? 'scale-0' : 'scale-100'}`}
      />
    </>
  );
}
