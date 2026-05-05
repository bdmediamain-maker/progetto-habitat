'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';

// ─── Types ────────────────────────────────────────────────────────────────────

interface LangToggleProps {
  /**
   * 'light' — toggle sits on a light background (Navbar, default)
   * 'dark'  — toggle sits on the dark footer background
   */
  variant?: 'light' | 'dark';
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function LangToggle({ variant = 'light' }: LangToggleProps) {
  const locale   = useLocale();
  const pathname = usePathname();
  const router   = useRouter();

  function switchTo(lang: 'en' | 'it') {
    router.replace(pathname, { locale: lang });
  }

  const inactive =
    variant === 'dark'
      ? 'rgba(228, 226, 221, 0.40)'
      : 'rgba(30, 30, 30, 0.50)';

  const separator =
    variant === 'dark'
      ? 'rgba(228, 226, 221, 0.20)'
      : 'rgba(30, 30, 30, 0.25)';

  return (
    <div
      className="flex items-center gap-2 font-body text-[11px] uppercase"
      style={{ letterSpacing: '0.15em' }}
      aria-label="Language"
    >
      {(['en', 'it'] as const).map((lang, i) => (
        <span key={lang} className="flex items-center gap-2">
          {i > 0 && (
            <span aria-hidden="true" style={{ color: separator }}>
              |
            </span>
          )}
          <button
            onClick={() => switchTo(lang)}
            aria-label={`Switch to ${lang.toUpperCase()}`}
            className="transition-colors duration-200"
            style={{
              fontWeight: locale === lang ? 700 : 400,
              color:      locale === lang ? '#DB4A2B' : inactive,
            }}
          >
            {lang.toUpperCase()}
          </button>
        </span>
      ))}
    </div>
  );
}
