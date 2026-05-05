import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import PhilosophyBlock from '@/components/sections/PhilosophyBlock';
import AboutBlock from '@/components/sections/AboutBlock';

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/about'>): Promise<Metadata> {
  const { locale } = await params;
  const isIT = locale === 'it';

  return {
    title: isIT ? 'Studio — Doris Alberti' : 'About — Doris Alberti',
    description: isIT
      ? 'Doris Alberti ha fondato Progetto Habitat a Verona dopo quindici anni di pratica tra Italia, Portogallo e Giappone. Bioarchitettura, onestà materiale, spazio umano.'
      : 'Doris Alberti founded Progetto Habitat in Verona after fifteen years of practice across Italy, Portugal, and Japan. Bioarchitecture, material honesty, human space.',
    openGraph: {
      title: isIT
        ? 'Doris Alberti — Fondatrice di Progetto Habitat'
        : 'Doris Alberti — Founder of Progetto Habitat',
    },
  };
}

export default async function AboutPage({
  params,
}: PageProps<'/[locale]/about'>) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="flex flex-col">
      <AboutBlock />
      <PhilosophyBlock />
    </main>
  );
}
