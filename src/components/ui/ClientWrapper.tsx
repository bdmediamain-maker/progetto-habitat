'use client';

import dynamic from 'next/dynamic';

// LoadingScreen reads sessionStorage — must be client-only.
// dynamic + ssr:false is only valid inside a Client Component.
const LoadingScreen = dynamic(
  () => import('@/components/ui/LoadingScreen'),
  { ssr: false },
);

export default function ClientWrapper() {
  return <LoadingScreen />;
}
