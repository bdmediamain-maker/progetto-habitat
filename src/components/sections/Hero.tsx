'use client';

import { useRef } from 'react';
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
  hidden:  { y: 40, opacity: 0 },
  visible: (delay: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      delay,
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  }),
};

// ─── Hero section ─────────────────────────────────────────────────────────────

export default function Hero() {
  const t = useTranslations('hero');

  const heroRef    = useRef<HTMLElement>(null);
  const heroImgRef = useRef<HTMLDivElement>(null);

  // Subtle parallax: image drifts up as hero scrolls out
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
      className="relative w-full overflow-hidden bg-primary"
      style={{ minHeight: '100svh' }}
    >

      {/* ══════════════════════════════════════════════════════
          FULL-BLEED BACKGROUND IMAGE  (z-0)
          Oversized inner div gives GSAP parallax room to move.
      ══════════════════════════════════════════════════════ */}
      <div className="absolute inset-0" style={{ zIndex: 0 }}>
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
            src="/images/hero.jpg"
            alt="Progetto Habitat — architecture studio"
            fill
            className="object-cover object-center"
            priority
          />
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          DARK OVERLAY  (z-1, above image, below text)
      ══════════════════════════════════════════════════════ */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{ zIndex: 1, background: 'rgba(0,0,0,0.45)' }}
      />

      {/* ══════════════════════════════════════════════════════
          MAIN TEXT CONTENT  (z-2, above overlay)
      ══════════════════════════════════════════════════════ */}
      <div
        className="relative flex w-full flex-col justify-center px-6 pb-28 pt-24 lg:max-w-[58%] lg:px-16 lg:pb-24"
        style={{ minHeight: '100svh', zIndex: 2 }}
      >
        {/* Overline */}
        <motion.p
          className="mb-10 font-body text-[14px] uppercase"
          style={{
            letterSpacing: '0.2em',
            color:         'rgba(228,226,221,0.75)',
            textShadow:    '0 1px 8px rgba(0,0,0,0.4)',
          }}
          variants={slideUp}
          custom={0.2}
          initial="hidden"
          animate="visible"
        >
          {t('overline')}
        </motion.p>

        {/* Headline — all three lines share the same font-size */}
        <div className="mb-10 select-none" style={{ overflow: 'visible' }}>
          {[
            { key: 'line1' as const, delay: 0.4  },
            { key: 'line2' as const, delay: 0.52 },
            { key: 'line3' as const, delay: 0.64 },
          ].map(({ key, delay }) => (
            <div key={key} className="overflow-hidden">
              <motion.div
                variants={slideUp}
                custom={delay}
                initial="hidden"
                animate="visible"
              >
                <span
                  className="block font-display font-bold uppercase"
                  style={{
                    fontSize:      'clamp(52px, 10vw, 148px)',
                    lineHeight:    0.85,
                    letterSpacing: '-0.04em',
                    color:         '#E4E2DD',
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
          className="mb-10 font-body text-[18px]"
          style={{
            maxWidth:   '420px',
            lineHeight: 1.55,
            color:      'rgba(228,226,221,0.8)',
          }}
          variants={slideUp}
          custom={0.78}
          initial="hidden"
          animate="visible"
        >
          {t('subtext')}
        </motion.p>

        {/* CTA row */}
        <motion.div
          className="flex flex-wrap items-center gap-6"
          variants={slideUp}
          custom={0.92}
          initial="hidden"
          animate="visible"
        >
          {/* Primary CTA */}
          <Link
            href="/projects"
            className="inline-block font-display text-[13px] font-bold uppercase tracking-[0.1em] transition-opacity duration-200 hover:opacity-80"
            style={{
              padding:         '14px 32px',
              background:      '#E4E2DD',
              color:           '#1E1E1E',
            }}
          >
            {t('cta_primary')}
          </Link>

          {/* Secondary CTA */}
          <Link
            href="/philosophy"
            className="group flex items-center gap-2 font-body text-[14px] transition-opacity duration-200 hover:opacity-70"
            style={{ color: '#DB4A2B' }}
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
          SCROLL INDICATOR  (z-2, above overlay)
      ══════════════════════════════════════════════════════ */}
      <motion.div
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
        style={{ zIndex: 2 }}
        variants={slideUp}
        custom={1.1}
        initial="hidden"
        animate="visible"
      >
        <span
          className="font-body text-[11px]"
          style={{ letterSpacing: '0.3em', color: 'rgba(228,226,221,0.5)' }}
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
            stroke="#E4E2DD"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.5"
          />
        </svg>
      </motion.div>

    </section>
  );
}
