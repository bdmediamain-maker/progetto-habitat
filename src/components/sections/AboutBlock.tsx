'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Link } from '@/i18n/navigation';

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Placeholder until the client delivers the real portrait.
const PORTRAIT_SRC = 'https://picsum.photos/seed/architectportrait/800/1000';

// ─── Component ────────────────────────────────────────────────────────────────

export default function AboutBlock() {
  const t = useTranslations('about');

  const sectionRef = useRef<HTMLElement>(null);
  const photoRef   = useRef<HTMLDivElement>(null);
  const rightRef   = useRef<HTMLDivElement>(null);

  // Stat values are fixed data; only their labels are translated
  const stats = [
    { value: '20+',  label: t('stats.years')     },
    { value: '200+', label: t('stats.projects')  },
    { value: '3',    label: t('stats.countries') },
  ];

  useGSAP(
    () => {
      // ── Photo: scale + opacity reveal ─────────────────────────────
      gsap.from(photoRef.current, {
        scale:      1.06,
        opacity:    0,
        duration:   1.4,
        ease:       'power3.out',
        clearProps: 'all',
        scrollTrigger: {
          trigger: sectionRef.current,
          start:   'top 75%',
          once:    true,
        },
      });

      // ── Right column: staggered item reveal ───────────────────────
      const items = gsap.utils.toArray<Element>('.ab-item', rightRef.current);

      gsap.from(items, {
        y:          40,
        opacity:    0,
        stagger:    0.14,
        duration:   1,
        ease:       'power3.out',
        clearProps: 'all',
        scrollTrigger: {
          trigger: rightRef.current,
          start:   'top 78%',
          once:    true,
        },
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      aria-labelledby="about-heading"
      className="w-full bg-base"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2">

        {/* ══ LEFT — portrait photo ═════════════════════════════════ */}
        <div
          ref={photoRef}
          className="group relative overflow-hidden"
          style={{ minHeight: 'clamp(420px, 70vh, 900px)' }}
        >
          <Image
            src={PORTRAIT_SRC}
            alt="Doris Alberti — Founder and Principal Architect, Progetto Habitat"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover object-top grayscale transition-[filter] duration-[600ms] group-hover:grayscale-0"
            priority={false}
          />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'linear-gradient(to right, rgba(30,30,30,0.18) 0%, transparent 60%)',
            }}
            aria-hidden="true"
          />
        </div>

        {/* ══ RIGHT — content ═══════════════════════════════════════ */}
        <div
          ref={rightRef}
          className="flex flex-col justify-center px-8 py-20 lg:px-16 xl:px-24"
        >
          {/* Label */}
          <p
            className="ab-item mb-5 font-body text-[11px] uppercase text-accent-red"
            style={{ letterSpacing: '0.3em' }}
          >
            {t('label')}
          </p>

          {/* Name — proper noun, not translated */}
          <h2
            id="about-heading"
            className="ab-item font-display font-bold text-primary"
            style={{
              fontSize:      'clamp(2.5rem, 5vw, 7rem)',
              lineHeight:    0.88,
              letterSpacing: '-0.03em',
              marginBottom:  '1.5rem',
            }}
          >
            Doris
            <br />
            Alberti
          </h2>

          {/* Bio */}
          <p
            className="ab-item font-body leading-relaxed text-primary/70"
            style={{ fontSize: 18, maxWidth: 480, marginBottom: '2.5rem' }}
          >
            {t('bio')}
          </p>

          {/* Stats row */}
          <div
            className="ab-item mb-10 flex flex-wrap gap-x-10 gap-y-6"
            role="list"
            aria-label="Key figures"
          >
            {stats.map((stat, i) => (
              <div key={stat.label} role="listitem" className="flex flex-col">
                {i > 0 && (
                  <div
                    className="mb-3 h-px w-8 bg-primary/20 hidden lg:block"
                    aria-hidden="true"
                  />
                )}
                <span
                  className="block font-display font-bold text-primary"
                  style={{
                    fontSize:      'clamp(2rem, 3vw, 4.5rem)',
                    lineHeight:    1,
                    letterSpacing: '-0.04em',
                  }}
                  aria-label={`${stat.value} ${stat.label}`}
                >
                  {stat.value}
                </span>
                <span
                  className="mt-1 block font-body text-[12px] uppercase text-primary/50"
                  style={{ letterSpacing: '0.15em' }}
                  aria-hidden="true"
                >
                  {stat.label}
                </span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <Link
            href="/about"
            className="ab-item group inline-flex items-center gap-2 font-body text-[14px] text-accent-red transition-opacity duration-200 hover:opacity-70"
          >
            {t('cta')}
            <ArrowRight
              size={14}
              strokeWidth={2}
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
          </Link>
        </div>

      </div>
    </section>
  );
}
