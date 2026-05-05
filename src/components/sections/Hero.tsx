'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Link } from '@/i18n/navigation';

gsap.registerPlugin(ScrollTrigger, useGSAP);

// ─── Framer Motion variants ──────────────────────────────────────────────────

const slideUp = {
  hidden:  { y: 48, opacity: 0 },
  visible: (delay: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      delay,
      duration: 0.9,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  }),
};

// ─── CTA primary button ───────────────────────────────────────────────────────

function PrimaryButton({ href, children }: { href: string; children: React.ReactNode }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative inline-block overflow-hidden bg-primary"
      style={{ padding: '16px 32px' }}
    >
      <motion.span
        aria-hidden="true"
        className="absolute inset-0 block bg-white"
        initial={false}
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        style={{ transformOrigin: 'left center' }}
      />
      <motion.span
        className="relative z-10 block font-display text-[13px] font-bold uppercase tracking-[0.1em]"
        initial={false}
        animate={{ color: hovered ? '#DB4A2B' : '#E4E2DD' }}
        transition={{ duration: 0.28, ease: 'easeOut' }}
      >
        {children}
      </motion.span>
    </Link>
  );
}

// ─── Hero section ─────────────────────────────────────────────────────────────

export default function Hero() {
  const t = useTranslations('hero');

  const heroRef   = useRef<HTMLElement>(null);
  const heroImgRef = useRef<HTMLDivElement>(null);

  const heroImageSrc    = '/images/hero.jpg';
  const heroPortraitSrc = '/images/hero.jpg'; // same asset, portrait crop via object-position

  // Subtle parallax: desktop image drifts up as the hero scrolls out
  useGSAP(
    () => {
      if (!heroImgRef.current) return;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      gsap.to(heroImgRef.current, {
        y:    -80,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start:   'top top',
          end:     'bottom top',
          scrub:   true,
        },
      });
    },
    { scope: heroRef },
  );

  return (
    <section
      ref={heroRef}
      className="relative w-full overflow-hidden bg-base"
      style={{ minHeight: '100svh' }}
    >

      {/* ══════════════════════════════════════════════════════
          GRADIENT BLOBS
      ══════════════════════════════════════════════════════ */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div
          className="absolute"
          style={{
            width: '60vw', height: '60vw', top: '-15vw', left: '-15vw',
            background: '#DB4A2B', borderRadius: '50%', filter: 'blur(140px)',
            mixBlendMode: 'multiply',
            animation: 'blob-drift-1 13s ease-in-out infinite alternate',
            willChange: 'transform, opacity',
          }}
        />
        <div
          className="absolute"
          style={{
            width: '50vw', height: '50vw', bottom: '-10vw', right: '-10vw',
            background: '#F8A348', borderRadius: '50%', filter: 'blur(120px)',
            mixBlendMode: 'multiply',
            animation: 'blob-drift-2 11s ease-in-out infinite alternate',
            animationDelay: '2s',
            willChange: 'transform, opacity',
          }}
        />
        <div
          className="absolute"
          style={{
            width: '40vw', height: '40vw', top: '25%', left: '28%',
            background: '#FF89A9', borderRadius: '50%', filter: 'blur(100px)',
            mixBlendMode: 'multiply',
            animation: 'blob-drift-3 15s ease-in-out infinite alternate',
            animationDelay: '4s',
            willChange: 'transform, opacity',
          }}
        />
      </div>

      {/* ══════════════════════════════════════════════════════
          MOBILE BACKGROUND IMAGE
      ══════════════════════════════════════════════════════ */}
      {heroImageSrc && (
        <div className="absolute inset-0 z-0 lg:hidden">
          <Image
            src={heroImageSrc}
            alt="Progetto Habitat — studio work"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-primary/40" />
        </div>
      )}

      {/* ══════════════════════════════════════════════════════
          MAIN CONTENT
      ══════════════════════════════════════════════════════ */}
      <div
        className="relative z-10 flex w-full flex-col justify-center px-6 pb-28 pt-24 lg:max-w-[58%] lg:px-16 lg:pb-24"
        style={{ minHeight: '100svh' }}
      >
        {/* Overline */}
        <motion.p
          className="mb-10 font-body text-[14px] uppercase"
          style={{
            letterSpacing: '0.2em',
            color: 'rgba(228,226,221,1)',
            textShadow: '0 1px 8px rgba(0,0,0,0.4)',
          }}
          variants={slideUp}
          custom={0.2}
          initial="hidden"
          animate="visible"
        >
          {t('overline')}
        </motion.p>

        {/* Headline — three separate lines with curtain reveal */}
        <div className="mb-10 select-none" style={{ overflow: 'visible' }}>
          {[
            { key: 'line1' as const, delay: 0.4,  indent: undefined },
            { key: 'line2' as const, delay: 0.55, indent: '15vw'   },
            { key: 'line3' as const, delay: 0.7,  indent: '8vw'    },
          ].map(({ key, delay, indent }) => (
            <div key={key} className="overflow-hidden">
              <motion.div
                variants={slideUp}
                custom={delay}
                initial="hidden"
                animate="visible"
              >
                <span
                  className="block font-display font-bold uppercase text-primary"
                  style={{
                    fontSize:      'clamp(48px, 9vw, 140px)',
                    lineHeight:    0.82,
                    letterSpacing: '-0.05em',
                    paddingLeft:   indent,
                    whiteSpace:    'normal',
                  }}
                >
                  {t(key)}
                </span>
              </motion.div>
            </div>
          ))}
        </div>

        {/* Subtext */}
        <motion.p
          className="mb-10 font-body text-[20px] text-primary/70"
          style={{ maxWidth: '400px', lineHeight: 1.5 }}
          variants={slideUp}
          custom={0.85}
          initial="hidden"
          animate="visible"
        >
          {t('subtext')}
        </motion.p>

        {/* CTA row */}
        <motion.div
          className="flex flex-wrap items-center gap-6"
          variants={slideUp}
          custom={1.0}
          initial="hidden"
          animate="visible"
        >
          <PrimaryButton href="/projects">{t('cta_primary')}</PrimaryButton>

          <Link
            href="/philosophy"
            className="group flex items-center gap-2 font-body text-[14px] text-accent-red transition-opacity duration-200 hover:opacity-70"
          >
            {t('cta_secondary')}
            <ArrowRight
              size={14}
              strokeWidth={2}
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
          </Link>
        </motion.div>
      </div>

      {/* ══════════════════════════════════════════════════════
          DESKTOP PORTRAIT  (absolute right, parallax target)
          Hidden below 1024 px (lg), diagonal left edge via clip-path.
      ══════════════════════════════════════════════════════ */}
      <div
        className="absolute bottom-0 right-0 top-0 z-[1] hidden w-[42%] overflow-hidden lg:block"
        style={{ clipPath: 'polygon(8% 0%, 100% 0%, 100% 100%, 0% 100%)' }}
      >
        {/* Oversized inner wrapper — GSAP parallax translates -80px on scroll */}
        <div
          ref={heroImgRef}
          style={{
            position:   'absolute',
            top:        '-100px',
            bottom:     '-100px',
            left:       0,
            right:      0,
            willChange: 'transform',
          }}
        >
          <Image
            src={heroPortraitSrc}
            alt="Progetto Habitat — studio portrait"
            fill
            className="object-cover object-center"
            priority
            data-cursor="image"
          />
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          SCROLL INDICATOR
      ══════════════════════════════════════════════════════ */}
      <motion.div
        className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2"
        variants={slideUp}
        custom={1.3}
        initial="hidden"
        animate="visible"
      >
        <span
          className="font-body text-[11px] text-primary/50"
          style={{ letterSpacing: '0.3em' }}
        >
          SCROLL
        </span>
        <svg
          width="14"
          height="20"
          viewBox="0 0 14 20"
          fill="none"
          aria-hidden="true"
          style={{ animation: 'scroll-bounce 1.6s ease-in-out infinite' }}
        >
          <path
            d="M7 1v14M1 10l6 7 6-7"
            stroke="#1E1E1E"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.45"
          />
        </svg>
      </motion.div>

    </section>
  );
}
