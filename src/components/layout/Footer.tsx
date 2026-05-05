'use client';

import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Link } from '@/i18n/navigation';
import LangToggle from '@/components/ui/LangToggle';

gsap.registerPlugin(ScrollTrigger, useGSAP);

// ─── Inline SVG social icons (brand icons not in lucide-react) ────────────────

function IconInstagram({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

function IconLinkedin({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function IconPinterest({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 2C6.48 2 2 6.48 2 12c0 4.24 2.65 7.86 6.39 9.29-.09-.78-.17-1.98.03-2.83.19-.77 1.27-5.38 1.27-5.38s-.32-.65-.32-1.61c0-1.51.88-2.64 1.97-2.64.93 0 1.38.7 1.38 1.54 0 .94-.6 2.34-.91 3.64-.26 1.09.54 1.97 1.6 1.97 1.92 0 3.4-2.02 3.4-4.94 0-2.58-1.86-4.39-4.51-4.39-3.07 0-4.87 2.3-4.87 4.68 0 .93.36 1.92.8 2.46.09.11.1.21.07.32-.08.34-.27 1.09-.3 1.24-.05.2-.17.24-.38.15-1.4-.65-2.28-2.7-2.28-4.35 0-3.54 2.57-6.79 7.41-6.79 3.89 0 6.91 2.77 6.91 6.47 0 3.86-2.43 6.97-5.81 6.97-1.13 0-2.2-.59-2.57-1.29l-.7 2.6c-.25.97-.93 2.18-1.39 2.92.05.01.09.02.14.02.3.04.6.06.91.06z" />
    </svg>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

export default function Footer() {
  const t = useTranslations('footer');

  const footerRef = useRef<HTMLElement>(null);
  const yearRef   = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      if (!yearRef.current) return;

      gsap.fromTo(
        yearRef.current,
        { y: 40 },
        {
          y: -40,
          ease: 'none',
          scrollTrigger: {
            trigger: footerRef.current,
            start:   'top bottom',
            end:     'bottom top',
            scrub:   1.2,
          },
        },
      );
    },
    { scope: footerRef },
  );

  const navCol1 = [
    { href: '/projects',   label: t('links.work')       },
    { href: '/philosophy', label: t('links.philosophy')  },
    { href: '/about',      label: t('links.about')       },
    { href: '/contact',    label: t('links.contact')     },
  ];

  const navCol2 = [
    { href: '/services',       label: t('links.services')       },
    { href: '/bioarchitecture', label: t('links.bioarchitecture') },
  ];

  const socialLinks = [
    { icon: IconInstagram, label: 'Instagram', href: 'https://instagram.com' },
    { icon: IconLinkedin,  label: 'LinkedIn',  href: 'https://linkedin.com'  },
    { icon: IconPinterest, label: 'Pinterest', href: 'https://pinterest.com' },
  ] as const;

  return (
    <footer
      ref={footerRef}
      style={{ backgroundColor: '#1E1E1E', color: '#E4E2DD' }}
    >
      {/* ── Main grid ──────────────────────────────────────────────── */}
      <div
        className="mx-auto grid grid-cols-1 gap-x-12 gap-y-16 px-6 pb-10 pt-20 sm:grid-cols-2 lg:grid-cols-4 lg:px-16 xl:px-24"
        style={{ maxWidth: '1600px' }}
      >

        {/* Col 1 — brand */}
        <div className="flex flex-col gap-6">
          <Link href="/" className="group inline-block">
            <span
              className="font-display text-[22px] font-bold uppercase text-footer-text transition-[letter-spacing] duration-300 group-hover:[letter-spacing:0.08em]"
            >
              Progetto Habitat
            </span>
          </Link>

          <p
            className="font-body text-[13px] leading-relaxed"
            style={{ color: 'rgba(228, 226, 221, 0.5)', maxWidth: '220px' }}
          >
            {t('tagline')}
          </p>

          <div className="flex items-center gap-4">
            {socialLinks.map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="text-footer-text/50 transition-colors duration-200 hover:text-accent-red"
              >
                <Icon size={20} />
              </a>
            ))}
          </div>
        </div>

        {/* Col 2 — nav links group 1 */}
        <div className="flex flex-col gap-4">
          <p
            className="mb-2 font-body text-[11px] uppercase"
            style={{ letterSpacing: '0.2em', color: 'rgba(228, 226, 221, 0.35)' }}
          >
            {t('navigate_label')}
          </p>
          {navCol1.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="font-body text-[15px] text-footer-text/60 transition-colors duration-200 hover:text-footer-text"
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Col 3 — nav links group 2 */}
        <div className="flex flex-col gap-4">
          <p
            className="mb-2 font-body text-[11px] uppercase"
            style={{ letterSpacing: '0.2em', color: 'rgba(228, 226, 221, 0.35)' }}
          >
            {t('studio_label')}
          </p>
          {navCol2.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="font-body text-[15px] text-footer-text/60 transition-colors duration-200 hover:text-footer-text"
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Col 4 — studio hours & address */}
        <div className="flex flex-col gap-5">
          <p
            className="font-body text-[11px] uppercase"
            style={{ letterSpacing: '0.2em', color: 'rgba(228, 226, 221, 0.35)' }}
          >
            {t('hours_label')}
          </p>
          <div
            className="font-body text-[14px] leading-loose"
            style={{ color: 'rgba(228, 226, 221, 0.6)' }}
          >
            <p>{t('hours_weekday')}</p>
            <p>{t('hours_saturday')}</p>
            <p>{t('hours_sunday')}</p>
          </div>
          <address
            className="font-body text-[14px] not-italic leading-loose"
            style={{ color: 'rgba(228, 226, 221, 0.6)' }}
          >
            Via Carlo Cipolla 16
            <br />
            37136 Verona, Italy
          </address>
        </div>

      </div>

      {/* ── Bottom bar ─────────────────────────────────────────────── */}
      <div
        className="relative overflow-hidden"
        style={{ borderTop: '1px solid rgba(228, 226, 221, 0.10)' }}
      >
        <div
          className="mx-auto flex flex-wrap items-center justify-between gap-4 px-6 py-6 lg:px-16 xl:px-24"
          style={{ maxWidth: '1600px' }}
        >
          <p
            className="font-body text-[12px]"
            style={{ color: 'rgba(228, 226, 221, 0.4)' }}
          >
            {t('rights')}
          </p>

          <LangToggle variant="dark" />
        </div>

        {/* Massive year — absolute bottom-right, parallax target */}
        <div
          className="pointer-events-none absolute bottom-0 right-0 overflow-hidden leading-none select-none"
          aria-hidden="true"
        >
          <span
            ref={yearRef}
            className="block font-display font-bold"
            style={{
              fontSize:      '10vw',
              color:         'rgba(255, 255, 255, 0.06)',
              lineHeight:    0.85,
              letterSpacing: '-0.04em',
              paddingRight:  '0.05em',
            }}
          >
            2025
          </span>
        </div>
      </div>
    </footer>
  );
}
