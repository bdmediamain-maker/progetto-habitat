'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Minimal custom cursor: 12px filled #DB4A2B dot that snaps to the pointer.
 * Always visible on pointer-fine devices; hidden entirely on touch (coarse).
 * Native cursor is hidden by the `@media (pointer: fine)` rule in globals.css.
 * Renders nothing until mounted to prevent SSR/hydration mismatch.
 */
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    // Skip on touch-only / hybrid devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    function onMouseMove(e: MouseEvent) {
      if (dotRef.current) {
        dotRef.current.style.transform =
          `translate(${e.clientX - 6}px, ${e.clientY - 6}px)`;
      }
    }

    document.addEventListener('mousemove', onMouseMove, { passive: true });

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
    };
  }, [mounted]);

  if (!mounted) return null;

  return (
    <div
      ref={dotRef}
      aria-hidden="true"
      style={{
        position:        'fixed',
        top:             0,
        left:            0,
        width:           12,
        height:          12,
        borderRadius:    '50%',
        backgroundColor: '#DB4A2B',
        pointerEvents:   'none',
        zIndex:          9999,
        willChange:      'transform',
        transform:       'translate(-100px, -100px)',
        opacity:         1,
      }}
    />
  );
}
