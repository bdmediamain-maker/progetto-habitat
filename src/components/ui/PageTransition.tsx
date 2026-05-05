'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from '@/i18n/navigation';

/**
 * Wraps page children with Framer Motion AnimatePresence.
 * Keyed on the current pathname so enter/exit animations fire
 * on every client navigation.
 *
 * Enter:  opacity 0→1, y 20→0  (0.6s spring)
 * Exit:   opacity 1→0, y 0→-20 (0.4s ease-in)
 *
 * Placed in layout.tsx around {children} (not Navbar/Footer).
 */
export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        className="flex flex-1 flex-col"
        initial={{ opacity: 0, y: 20 }}
        animate={{
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
        }}
        exit={{
          opacity: 0,
          y: -20,
          transition: { duration: 0.4, ease: 'easeIn' },
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
