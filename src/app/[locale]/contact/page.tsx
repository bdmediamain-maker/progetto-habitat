import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import ContactSection from '@/components/sections/ContactSection';

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/contact'>): Promise<Metadata> {
  const { locale } = await params;
  const isIT = locale === 'it';

  return {
    title: isIT ? 'Contatti — Inizia un Progetto' : 'Contact — Start a Project',
    description: isIT
      ? 'Contattaci per iniziare il tuo progetto. Studio Progetto Habitat, Via Carlo Cipolla 16, Verona. Tel: +39 045 8009318.'
      : 'Get in touch to start your project. Progetto Habitat Studio, Via Carlo Cipolla 16, Verona. Tel: +39 045 8009318.',
    openGraph: {
      title: isIT
        ? 'Contatta Progetto Habitat — Verona'
        : 'Contact Progetto Habitat — Verona',
    },
  };
}

export default async function ContactPage({
  params,
}: PageProps<'/[locale]/contact'>) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="flex flex-col">
      <ContactSection />
    </main>
  );
}
