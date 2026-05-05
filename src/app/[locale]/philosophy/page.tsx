import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import PhilosophyBlock from '@/components/sections/PhilosophyBlock';

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/philosophy'>): Promise<Metadata> {
  const { locale } = await params;
  const isIT = locale === 'it';

  return {
    title: isIT ? 'Filosofia — Progetto Habitat' : 'Philosophy — Progetto Habitat',
    description: isIT
      ? 'Il nostro approccio all\'architettura: sostenibilità, identità e scala umana al centro di ogni progetto.'
      : 'Our approach to architecture: sustainability, identity, and human scale at the heart of every project.',
    openGraph: {
      title: isIT
        ? 'Filosofia — Progetto Habitat'
        : 'Philosophy — Progetto Habitat',
    },
  };
}

export default async function PhilosophyPage({
  params,
}: PageProps<'/[locale]/philosophy'>) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="flex flex-col pt-16">
      <PhilosophyBlock />
    </main>
  );
}
