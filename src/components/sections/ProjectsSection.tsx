'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

import {
  projects,
  FILTERS,
  ALL_FILTER,
  type Project,
  type FilterValue,
} from '@/data/projects';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const FILTER_I18N_KEYS: Record<FilterValue, string> = {
  'All':             'all',
  'Residential':     'residential',
  'Hospitality':     'hospitality',
  'Contract':        'contract',
  'Bioarchitecture': 'bioarchitecture',
};

// ─────────────────────────────────────────────────────────────────────────────
// Section header: SELECTED ← left  /  WORKS → right  (GSAP + skewX entrance)
// ─────────────────────────────────────────────────────────────────────────────

function SectionHeader() {
  const t = useTranslations('portfolio');

  const wrapRef     = useRef<HTMLDivElement>(null);
  const selectedRef = useRef<HTMLDivElement>(null);
  const worksRef    = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapRef.current,
          start:   'top 78%',
          once:    true,
        },
      });

      // Slide in from sides + skewX straighten
      tl.from(selectedRef.current, {
        x:        -140,
        opacity:  0,
        skewX:    -3,
        duration: 1.3,
        ease:     'power3.out',
        clearProps: 'skewX',
      }).from(
        worksRef.current,
        {
          x:        140,
          opacity:  0,
          skewX:    3,
          duration: 1.3,
          ease:     'power3.out',
          clearProps: 'skewX',
        },
        '<0.08',
      );
    },
    { scope: wrapRef },
  );

  return (
    <div
      ref={wrapRef}
      className="relative w-full overflow-hidden"
      style={{
        paddingTop:    128,
        paddingBottom: 128,
        paddingLeft:   '5vw',
        paddingRight:  '5vw',
        background:
          'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(248,163,72,0.15) 0%, transparent 70%), #E4E2DD',
      }}
    >
      <div ref={selectedRef} className="text-left">
        <span
          className="block select-none font-display font-bold uppercase text-primary"
          style={{
            fontSize:      'clamp(48px, 12vw, 200px)',
            lineHeight:    0.88,
            letterSpacing: '-0.05em',
            opacity:       0.9,
          }}
        >
          {t('line1')}
        </span>
      </div>

      <div ref={worksRef} className="text-right">
        <span
          className="block select-none font-display font-bold uppercase text-accent-red"
          style={{
            fontSize:      'clamp(48px, 12vw, 200px)',
            lineHeight:    0.88,
            letterSpacing: '-0.05em',
          }}
        >
          {t('line2')}
        </span>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Filter bar
// ─────────────────────────────────────────────────────────────────────────────

interface FilterBarProps {
  active:   FilterValue;
  onChange: (f: FilterValue) => void;
}

function FilterBar({ active, onChange }: FilterBarProps) {
  const t = useTranslations('portfolio.filters');

  return (
    <div
      className="flex flex-wrap gap-2"
      role="toolbar"
      aria-label="Filter projects by category"
    >
      {FILTERS.map((filter) => {
        const isActive = active === filter;
        return (
          <button
            key={filter}
            onClick={() => onChange(filter)}
            aria-pressed={isActive}
            className={[
              'relative overflow-hidden border px-5 py-2',
              'font-body text-[13px] uppercase transition-colors duration-200',
              isActive
                ? 'border-primary text-base'
                : 'border-primary text-primary hover:border-accent-red hover:text-accent-red',
            ].join(' ')}
            style={{ letterSpacing: '0.1em' }}
          >
            {isActive && (
              <motion.span
                layoutId="active-filter-bg"
                className="absolute inset-0 bg-primary"
                transition={{ type: 'spring', bounce: 0.18, duration: 0.45 }}
              />
            )}
            <span className="relative z-10">
              {t(FILTER_I18N_KEYS[filter])}
            </span>
          </button>
        );
      })}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Project card with cursor-following tooltip
// ─────────────────────────────────────────────────────────────────────────────

function ProjectCard({ project }: { project: Project }) {
  // Tooltip uses direct DOM manipulation — no re-renders per mousemove
  const tooltipRef = useRef<HTMLDivElement>(null);

  function onMouseMove(e: React.MouseEvent<HTMLElement>) {
    const el = tooltipRef.current;
    if (!el) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left + 14;
    const y = e.clientY - rect.top  - 14;
    el.style.transform = `translate(${x}px, ${y}px)`;
    el.style.opacity   = '1';
  }

  function onMouseLeave() {
    if (tooltipRef.current) tooltipRef.current.style.opacity = '0';
  }

  return (
    <article
      className="group relative"
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {/* ── Image ───────────────────────────────────────── */}
      <div className="relative mb-4 aspect-[3/4] overflow-hidden">
        <div
          className="absolute inset-0 transition-transform duration-[600ms] group-hover:scale-[1.05]"
          style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
        >
          <Image
            src={project.image}
            alt={`${project.title} — ${project.category} project by Progetto Habitat`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover object-center"
            data-cursor="image"
          />
        </div>
        <div className="absolute inset-0 z-10 bg-primary/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>

      {/* ── Metadata ────────────────────────────────────── */}
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p
            className="mb-1 font-body text-[11px] uppercase text-accent-red"
            style={{ letterSpacing: '0.2em' }}
          >
            {project.category}
          </p>
          <h3
            className="mb-1 font-body text-[16px] font-bold uppercase text-primary transition-colors duration-200 group-hover:text-accent-pink"
            style={{ letterSpacing: '0.15em' }}
          >
            {project.title}
          </h3>
          <p className="font-body text-[13px] text-primary/50">
            {project.location}&ensp;—&ensp;{project.year}
          </p>
        </div>

        <div className="flex shrink-0 items-center pt-7">
          <ArrowRight
            size={16}
            strokeWidth={1.8}
            className="translate-x-[-10px] text-primary opacity-0 transition-[transform,opacity] duration-300 group-hover:translate-x-0 group-hover:opacity-100"
          />
        </div>
      </div>

      {/* ── Cursor-following tooltip ──────────────────── */}
      <div
        ref={tooltipRef}
        aria-hidden="true"
        style={{
          position:         'absolute',
          top:              0,
          left:             0,
          zIndex:           20,
          pointerEvents:    'none',
          opacity:          0,
          transition:       'opacity 0.15s ease',
          willChange:       'transform, opacity',
          backgroundColor:  '#1E1E1E',
          padding:          '6px 10px',
          display:          'flex',
          flexDirection:    'column',
          gap:              4,
        }}
      >
        <span
          style={{
            fontFamily:    'var(--font-body)',
            fontSize:      10,
            fontWeight:    500,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color:         '#DB4A2B',
          }}
        >
          {project.category}
        </span>
        <span
          style={{
            fontFamily: 'var(--font-body)',
            fontSize:   11,
            color:      'rgba(228, 226, 221, 0.6)',
          }}
        >
          {project.year}
        </span>
      </div>
    </article>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Project grid  (GSAP stagger reveal + Framer Motion filter transitions)
// ─────────────────────────────────────────────────────────────────────────────

function ProjectGrid({ items }: { items: Project[] }) {
  const gridRef = useRef<HTMLUListElement>(null);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<Element>('.ph-card-inner', gridRef.current);
      if (!cards.length) return;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      gsap.from(cards, {
        y:          60,
        opacity:    0,
        stagger:    0.12,
        duration:   0.9,
        ease:       'power3.out',
        clearProps: 'all',
        scrollTrigger: {
          trigger: gridRef.current,
          start:   'top 85%',
          once:    true,
        },
      });
    },
    { scope: gridRef },
  );

  return (
    <motion.ul
      ref={gridRef}
      layout
      className="grid grid-cols-1 gap-x-4 gap-y-16 sm:grid-cols-2 lg:grid-cols-3"
    >
      <AnimatePresence mode="popLayout" initial={false}>
        {items.map((project) => (
          <motion.li
            key={project.id}
            layout
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="ph-card-inner">
              <ProjectCard project={project} />
            </div>
          </motion.li>
        ))}
      </AnimatePresence>
    </motion.ul>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Root export
// ─────────────────────────────────────────────────────────────────────────────

export default function ProjectsSection() {
  const t = useTranslations('portfolio');
  const [activeFilter, setActiveFilter] = useState<FilterValue>(ALL_FILTER);

  const filteredProjects =
    activeFilter === ALL_FILTER
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <section aria-labelledby="projects-heading">
      <SectionHeader />

      <div className="bg-base px-6 pb-32 pt-16 lg:px-16">
        <h2 id="projects-heading" className="sr-only">
          {t('section_label')}
        </h2>

        <div className="mb-14">
          <FilterBar active={activeFilter} onChange={setActiveFilter} />
        </div>

        <ProjectGrid items={filteredProjects} />
      </div>
    </section>
  );
}
