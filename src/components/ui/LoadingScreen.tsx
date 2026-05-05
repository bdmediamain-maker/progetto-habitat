'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const BRAND   = 'PROGETTO HABITAT';
const LETTERS = BRAND.split('');

type Phase = 'show' | 'hide' | 'done';

export default function LoadingScreen() {
  // Start as 'done' (hidden) until we confirm it's a first visit
  const [phase, setPhase] = useState<Phase>('done');

  useEffect(() => {
    // Subsequent visits — skip entirely
    if (sessionStorage.getItem('visited')) return;
    sessionStorage.setItem('visited', '1');

    // Respect prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // First visit: show the screen
    setPhase('show');

    // After 2 s: trigger slide-up exit
    const hideTimer = setTimeout(() => setPhase('hide'), 2000);

    // After 2 s + 600 ms animation: unmount completely
    const doneTimer = setTimeout(() => setPhase('done'), 2600);

    return () => {
      clearTimeout(hideTimer);
      clearTimeout(doneTimer);
    };
  }, []);

  // Not mounted / already dismissed
  if (phase === 'done') return null;

  return (
    <div
      aria-hidden="true"
      style={{
        position:   'fixed',
        inset:      0,
        zIndex:     9999,
        backgroundColor: '#1E1E1E',
        display:    'flex',
        alignItems: 'center',
        justifyContent: 'center',
        // CSS transition drives the exit — no AnimatePresence needed
        opacity:   phase === 'hide' ? 0 : 1,
        transform: phase === 'hide' ? 'translateY(-100%)' : 'translateY(0)',
        transition: 'opacity 600ms ease, transform 600ms cubic-bezier(0.16,1,0.3,1)',
        pointerEvents: phase === 'hide' ? 'none' : 'all',
      }}
    >
      {/* Letter-by-letter brand reveal (Framer Motion — enter only) */}
      <h1
        aria-label={BRAND}
        className="flex flex-wrap items-center justify-center select-none"
      >
        {LETTERS.map((char, i) => (
          <motion.span
            key={i}
            aria-hidden="true"
            className="inline-block font-display font-bold uppercase text-white"
            style={{
              fontSize:      'clamp(1.5rem, 5vw, 4rem)',
              letterSpacing: '-0.02em',
              width: char === ' ' ? '0.5em' : undefined,
            }}
            initial={{ opacity: 0, y: 24 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: {
                delay:    i * 0.055,
                duration: 0.4,
                ease:     [0.16, 1, 0.3, 1],
              },
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </h1>

      {/* Accent line */}
      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{
          scaleX: 1,
          opacity: 1,
          transition: { delay: 1.0, duration: 0.5, ease: 'easeOut' },
        }}
        style={{
          width:           '40px',
          height:          '1px',
          backgroundColor: '#DB4A2B',
          transformOrigin: 'left',
        }}
      />
    </div>
  );
}
