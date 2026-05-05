import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

// next-intl locale routing — runs as Next.js 16 Proxy (replaces middleware.ts)
const intlProxy = createMiddleware(routing);

export function proxy(request: Parameters<typeof intlProxy>[0]) {
  return intlProxy(request);
}

export const config = {
  matcher: [
    // Skip Next.js internals and static assets
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
