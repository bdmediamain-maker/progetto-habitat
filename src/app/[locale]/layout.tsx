import type { Metadata } from 'next';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CustomCursor from '@/components/ui/CustomCursor';
import PageTransition from '@/components/ui/PageTransition';
import ClientWrapper from '@/components/ui/ClientWrapper';
import '../globals.css';

// ─── Default metadata (overridden per-page via generateMetadata) ──────────────

export async function generateMetadata({
  params,
}: LayoutProps<'/[locale]'>): Promise<Metadata> {
  const { locale } = await params;
  const isIT = locale === 'it';

  return {
    metadataBase: new URL('https://www.progettohabitat.it'),
    title: {
      template: '%s | Progetto Habitat',
      default:  'Progetto Habitat',
    },
    description: isIT
      ? 'Studio di architettura e bioarchitettura con sede a Verona. Progettiamo spazi residenziali, hospitality e contract con rispetto per la natura e l\u2019identit\u00e0 del luogo.'
      : 'Architecture and bioarchitecture studio based in Verona, Italy. We design residential, hospitality, and contract spaces with respect for nature and place identity.',
    openGraph: {
      siteName: 'Progetto Habitat',
      locale:   isIT ? 'it_IT' : 'en_US',
      type:     'website',
      images: [
        {
          url:   '/og-default.jpg',
          width:  1200,
          height: 630,
          alt:   'Progetto Habitat — Architecture Studio Verona',
        },
      ],
    },
    twitter: {
      card:  'summary_large_image',
      title: 'Progetto Habitat',
    },
    alternates: {
      canonical: '/',
      languages: {
        'en': '/',
        'it': '/it',
      },
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<'/[locale]'>) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <html lang={locale} className="h-full antialiased">
      {/* Fonts loaded via @import in globals.css (Clash Display 700, Satoshi 400/500) */}
      <body className="min-h-full flex flex-col bg-base text-primary pt-16">
        {/* First-visit loading screen (client-only via ClientWrapper) */}
        <ClientWrapper />

        {/* Custom two-part cursor — hides automatically on touch devices */}
        <CustomCursor />

        <NextIntlClientProvider>
          <Navbar />

          {/*
            PageTransition wraps only the page content (not Navbar/Footer)
            so chrome persists while pages enter/exit.
          */}
          <PageTransition>
            {children}
          </PageTransition>

          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
