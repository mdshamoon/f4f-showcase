'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import LoadingScreen from '@/components/ui/LoadingScreen';
import Navigation from '@/components/Navigation';

// Dynamically import the 3D component to avoid SSR issues
const FarmersForestVisualization = dynamic(
  () => import('@/components/FarmersForestVisualization'),
  { 
    ssr: false,
    loading: () => <LoadingScreen />
  }
);

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900 dark:to-blue-900">
      <Navigation />
      <main className="relative">
        <Suspense fallback={<LoadingScreen />}>
          <FarmersForestVisualization />
        </Suspense>
      </main>
    </div>
  );
}
