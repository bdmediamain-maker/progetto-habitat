import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import Hero from '@/components/sections/Hero';
import ProjectsSection from '@/components/sections/ProjectsSection';
import Marquee from '@/components/sections/Marquee';
import PhilosophyBlock from '@/components/sections/PhilosophyBlock';
import AboutBlock from '@/components/sections/AboutBlock';
import ContactSection from '@/components/sections/ContactSection';

export async function generateMetadata({
  params,
}: PageProps<'/[locale]'>): Promise<Metadata> {
  const { locale } = await params;
  const isIT = locale === 'it';

  return {
    title: isIT
      ? 'Architettura e Bioarchitettura a Verona'
      : 'Architecture & Bioarchitecture Studio — Verona',
    description: isIT
      ? 'Progetto Habitat è uno studio di architettura fondato da Doris Alberti a Verona. Progettiamo spazi residenziali, hospitality e bioarchitettura.'
      : 'Progetto Habitat is an architecture studio founded by Doris Alberti in Verona, designing residential, hospitality, and bioarchitecture spaces.',
    openGraph: {
      title: isIT
        ? 'Progetto Habitat — Architettura a Verona'
        : 'Progetto Habitat — Architecture Studio Verona',
    },
  };
}

export default async function HomePage({ params }: PageProps<'/[locale]'>) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="flex flex-col">
      <Hero />
      <ProjectsSection />
      <Marquee />
      <PhilosophyBlock />
      <AboutBlock />
      <ContactSection />
    </main>
  );
}
