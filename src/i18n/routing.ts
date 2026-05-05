import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'it'],
  defaultLocale: 'en',
  localePrefix: 'as-needed', // EN has no prefix (/), IT gets /it
});

export type Locale = (typeof routing.locales)[number];
