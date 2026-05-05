import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import ProjectsSection from '@/components/sections/ProjectsSection';

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/projects'>): Promise<Metadata> {
  const { locale } = await params;
  const isIT = locale === 'it';

  return {
    title: isIT ? 'Lavori — Progetti Selezionati' : 'Work — Selected Projects',
    description: isIT
      ? 'Scopri i progetti selezionati di Progetto Habitat: residenziale, hospitality, contract e bioarchitettura in Italia e all\'estero.'
      : 'Explore selected projects by Progetto Habitat: residential, hospitality, contract, and bioarchitecture across Italy and abroad.',
    openGraph: {
      title: isIT
        ? 'Lavori Selezionati — Progetto Habitat'
        : 'Selected Works — Progetto Habitat',
    },
  };
}

export default async function ProjectsPage({
  params,
}: PageProps<'/[locale]/projects'>) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main>
      <ProjectsSection />
    </main>
  );
}
