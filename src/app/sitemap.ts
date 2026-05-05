import type { MetadataRoute } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.progettohabitat.it';

// EN has no prefix (localePrefix: 'as-needed'), IT uses /it prefix.
const ROUTES = ['', '/projects', '/about', '/contact'];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const enEntries: MetadataRoute.Sitemap = ROUTES.map((route) => ({
    url:             `${BASE_URL}${route}`,
    lastModified:    now,
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority:        route === '' ? 1.0 : 0.8,
    alternates: {
      languages: {
        en: `${BASE_URL}${route}`,
        it: `${BASE_URL}/it${route}`,
      },
    },
  }));

  const itEntries: MetadataRoute.Sitemap = ROUTES.map((route) => ({
    url:             `${BASE_URL}/it${route}`,
    lastModified:    now,
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority:        route === '' ? 0.9 : 0.7,
    alternates: {
      languages: {
        en: `${BASE_URL}${route}`,
        it: `${BASE_URL}/it${route}`,
      },
    },
  }));

  return [...enEntries, ...itEntries];
}
