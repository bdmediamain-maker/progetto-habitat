import { createNavigation } from 'next-intl/navigation';
import { routing } from './routing';

/**
 * Typed navigation helpers bound to the project's routing config.
 * Import Link, usePathname, useRouter from here instead of next/navigation
 * so locale prefixes are handled automatically.
 */
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
