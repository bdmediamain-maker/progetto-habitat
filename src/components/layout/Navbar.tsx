'use client';

import { useEffect, useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, usePathname, useRouter } from '@/i18n/navigation';
import LangToggle from '@/components/ui/LangToggle';

// ─── Nav link definitions ────────────────────────────────────────────────────

const NAV_LINKS = [
  { href: '/projects',   labelKey: 'work'       },
  { href: '/philosophy', labelKey: 'philosophy'  },
  { href: '/about',      labelKey: 'about'       },
  { href: '/contact',    labelKey: 'contact'     },
] as const;

type NavLabelKey = (typeof NAV_LINKS)[number]['labelKey'];

// ─── Framer Motion variants ──────────────────────────────────────────────────

const overlayListVariants = {
  closed: {},
  open: {
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
};

const overlayLinkVariants = {
  closed: { opacity: 0, x: 60 },
  open: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
  },
};

// ─── Overlay locale toggle (white palette for dark overlay background) ────────

function OverlayLangToggle({ onSelect }: { onSelect: () => void }) {
  const locale   = useLocale();
  const pathname = usePathname();
  const router   = useRouter();

  function switchTo(lang: 'en' | 'it') {
    router.replace(pathname, { locale: lang });
    onSelect();
  }

  return (
    <div
      className="flex items-center gap-3 font-body text-[13px] uppercase"
      style={{ letterSpacing: '0.15em' }}
      aria-label="Language"
    >
      {(['en', 'it'] as const).map((lang, i) => (
        <span key={lang} className="flex items-center gap-3">
          {i > 0 && (
            <span aria-hidden="true" style={{ color: 'rgba(255,255,255,0.2)' }}>
              |
            </span>
          )}
          <button
            onClick={() => switchTo(lang)}
            aria-label={`Switch to ${lang.toUpperCase()}`}
            style={{
              fontWeight: locale === lang ? 700 : 400,
              color:      locale === lang ? '#DB4A2B' : 'rgba(255,255,255,0.4)',
              transition: 'color 0.2s ease',
            }}
          >
            {lang.toUpperCase()}
          </button>
        </span>
      ))}
    </div>
  );
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function Navbar() {
  const t        = useTranslations('nav');
  const pathname = usePathname();

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // rAF-throttled scroll listener — one setState per animation frame max
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 80);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* ════════════════════════════════════════════════════
          HEADER BAR
      ════════════════════════════════════════════════════ */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 border-b border-solid"
        animate={{
          backgroundColor: scrolled
            ? '#E4E2DD'
            : 'rgba(228, 226, 221, 0)',
          borderBottomColor: scrolled
            ? 'rgba(30, 30, 30, 0.1)'
            : 'rgba(30, 30, 30, 0)',
        }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
      >
        <nav className="flex h-16 items-center justify-between px-6 lg:px-10">

          {/* ── Brand ───────────────────────────────────── */}
          <Link href="/" className="shrink-0">
            <motion.span
              className="block font-display text-[18px] font-bold uppercase leading-none text-primary"
              initial={{ letterSpacing: '0em' }}
              whileHover={{ letterSpacing: '0.1em' }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              Progetto Habitat
            </motion.span>
          </Link>

          {/* ── Desktop nav links ────────────────────────── */}
          <ul className="hidden items-center gap-10 md:flex" role="list">
            {NAV_LINKS.map(({ href, labelKey }) => {
              const isActive =
                pathname === href || pathname.startsWith(href + '/');
              return (
                <li key={href}>
                  <Link
                    href={href}
                    className={[
                      'text-body-sm uppercase transition-colors duration-200',
                      isActive
                        ? 'text-accent-red underline underline-offset-4 decoration-accent-red'
                        : 'text-primary hover:text-accent-red',
                    ].join(' ')}
                  >
                    {t(labelKey as NavLabelKey)}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* ── Right side ───────────────────────────────── */}
          <div className="flex items-center gap-6">

            {/* Locale switcher — desktop only, light variant */}
            <div className="hidden md:flex">
              <LangToggle variant="light" />
            </div>

            {/* Hamburger — mobile only */}
            <button
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              className="flex items-center justify-center text-primary md:hidden"
            >
              <Menu size={22} strokeWidth={1.5} />
            </button>
          </div>
        </nav>
      </motion.header>

      {/* ════════════════════════════════════════════════════
          MOBILE FULL-SCREEN OVERLAY
      ════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-overlay"
            className="fixed inset-0 z-[100] flex flex-col bg-primary px-8 pt-10 pb-16"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Close button */}
            <div className="flex justify-end">
              <motion.button
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
                className="flex items-center justify-center text-white"
                whileTap={{ scale: 0.9 }}
              >
                <X size={28} strokeWidth={1.5} />
              </motion.button>
            </div>

            {/* Staggered nav links */}
            <motion.ul
              className="mt-auto flex flex-col gap-4"
              role="list"
              variants={overlayListVariants}
              initial="closed"
              animate="open"
            >
              {NAV_LINKS.map(({ href, labelKey }) => (
                <motion.li key={href} variants={overlayLinkVariants}>
                  <Link
                    href={href}
                    onClick={() => setMenuOpen(false)}
                    className="block font-display text-[10vw] uppercase leading-[0.9] text-white transition-colors duration-150 hover:text-accent-red"
                  >
                    {t(labelKey as NavLabelKey)}
                  </Link>
                </motion.li>
              ))}

              {/* Locale switcher — white palette for dark overlay */}
              <motion.li
                variants={overlayLinkVariants}
                className="mt-8 border-t border-white/10 pt-8"
              >
                <OverlayLangToggle onSelect={() => setMenuOpen(false)} />
              </motion.li>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
