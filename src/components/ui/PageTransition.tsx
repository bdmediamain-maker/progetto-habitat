'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from '@/i18n/navigation';

/**
 * Wraps page children with Framer Motion AnimatePresence.
 *
 * On the very first render (SSR + hydration) children are shown
 * immediately in a plain <div> — no opacity:0 flash.
 * After mount, Framer Motion takes over and cross-fades on navigation.
 */
export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // SSR + first client paint: render normally, never opacity:0
  if (!mounted) {
    return <div className="flex flex-1 flex-col">{children}</div>;
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        className="flex flex-1 flex-col"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.35, ease: 'easeOut' } }}
        exit={{ opacity: 0, transition: { duration: 0.2, ease: 'easeIn' } }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
