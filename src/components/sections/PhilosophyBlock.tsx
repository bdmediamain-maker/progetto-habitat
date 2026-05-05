'use client';

import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

// ─── Component ────────────────────────────────────────────────────────────────

export default function PhilosophyBlock() {
  const t = useTranslations('philosophy');

  const sectionRef  = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const pillarsRef  = useRef<HTMLDivElement>(null);

  // Build pillar data from translations (inside component so hooks are valid)
  const pillars = [
    { number: '01', title: t('pillars.p1_title'), desc: t('pillars.p1_desc') },
    { number: '02', title: t('pillars.p2_title'), desc: t('pillars.p2_desc') },
    { number: '03', title: t('pillars.p3_title'), desc: t('pillars.p3_desc') },
  ];

  const headline = t('headline');

  useGSAP(
    () => {
      // ── Word-by-word scrub colour reveal ──────────────────────────
      const words = gsap.utils.toArray<HTMLElement>(
        '.ph-word',
        headlineRef.current,
      );

      const wordTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start:   'top 60%',
          end:     'center 25%',
          scrub:   1.8,
        },
      });

      words.forEach((word, i) => {
        wordTl.fromTo(
          word,
          { color: 'rgba(30, 30, 30, 0.22)' },
          { color: 'rgba(30, 30, 30, 1)', duration: 0.7 },
          i * 0.55,
        );
      });

      // ── Left column: overline + body text reveal ───────────────────
      gsap.from(['.ph-overline', '.ph-body'], {
        y:          30,
        opacity:    0,
        stagger:    0.18,
        duration:   1,
        ease:       'power3.out',
        clearProps: 'all',
        scrollTrigger: {
          trigger: sectionRef.current,
          start:   'top 72%',
          once:    true,
        },
      });

      // ── Right column pillars: slide in from right ──────────────────
      gsap.from('.ph-pillar', {
        x:          50,
        opacity:    0,
        stagger:    0.2,
        duration:   1,
        ease:       'power3.out',
        clearProps: 'all',
        scrollTrigger: {
          trigger: pillarsRef.current,
          start:   'top 80%',
          once:    true,
        },
      });
    },
    // Re-run when locale changes (headline word count may differ)
    { scope: sectionRef, dependencies: [headline] },
  );

  return (
    <section
      ref={sectionRef}
      aria-labelledby="philosophy-heading"
      style={{ background: '#D9D6D0' }}
    >
      <div
        className="mx-auto grid grid-cols-12 gap-x-8 px-[5vw] py-32"
        style={{ maxWidth: '1600px' }}
      >

        {/* ══ LEFT — 8 columns ══════════════════════════════════════ */}
        <div className="col-span-12 flex flex-col justify-center gap-10 lg:col-span-8 lg:pr-20">

          {/* Overline */}
          <p
            className="ph-overline font-body text-[12px] uppercase text-primary/50"
            style={{ letterSpacing: '0.2em' }}
          >
            {t('overline')}
          </p>

          {/* Headline — each word is a separate span for GSAP colour scrub */}
          <h2
            id="philosophy-heading"
            ref={headlineRef}
            className="font-display font-bold uppercase"
            style={{
              fontSize:      'clamp(32px, 6vw, 110px)',
              lineHeight:    0.9,
              letterSpacing: '-0.03em',
            }}
            aria-label={headline}
          >
            {headline.split(' ').map((word, i) => (
              <span
                key={i}
                className="ph-word inline-block"
                style={{ color: 'rgba(30, 30, 30, 0.22)', marginRight: '0.25em' }}
              >
                {word}
              </span>
            ))}
          </h2>

          {/* Body copy */}
          <p
            className="ph-body font-body text-[18px] leading-relaxed text-primary/70"
            style={{ maxWidth: '56ch' }}
          >
            {t('body')}
          </p>
        </div>

        {/* ══ RIGHT — 4 columns ═════════════════════════════════════ */}
        <div
          ref={pillarsRef}
          className="col-span-12 mt-16 flex flex-col justify-center lg:col-span-4 lg:mt-0"
        >
          {pillars.map((pillar) => (
            <div
              key={pillar.number}
              className="ph-pillar border-t py-8"
              style={{ borderTopColor: 'rgba(30, 30, 30, 0.20)' }}
            >
              <span
                className="mb-3 block font-display font-bold text-accent-red"
                style={{ fontSize: 'clamp(20px, 2.2vw, 36px)' }}
                aria-hidden="true"
              >
                {pillar.number}
              </span>

              <p
                className="mb-2 font-body text-[15px] font-bold uppercase text-primary"
                style={{ letterSpacing: '0.1em' }}
              >
                {pillar.title}
              </p>

              <p className="font-body text-[14px] leading-relaxed text-primary/60">
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
