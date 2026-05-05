import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  experimental: {
    // Inline Tailwind atomic CSS into the HTML <head> on first load,
    // eliminating the render-blocking stylesheet request.
    inlineCss: true,
  },

  images: {
    remotePatterns: [
      // Picsum — placeholder images during development.
      // Remove once real project photos are in /public/images/.
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        pathname: '/**',
      },
    ],
  },

  async headers() {
    return [
      // Hashed Next.js build chunks — safe to cache permanently.
      {
        source:  '/_next/static/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      // Self-hosted fonts.
      {
        source:  '/fonts/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      // Images — revalidate daily, serve stale for up to a week.
      {
        source:  '/images/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=86400, stale-while-revalidate=604800' },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
