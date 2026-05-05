import createMiddleware from 'next-intl/middleware';
import { routing } from '@/i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Match all pathnames except for:
  // - /api routes
  // - /_next (Next.js internals)
  // - /fonts, /images, /icons, /public static files
  // - files with extensions (e.g. favicon.ico)
  matcher: [
    '/((?!api|_next|fonts|images|icons|.*\\..*).*)',
  ],
};
