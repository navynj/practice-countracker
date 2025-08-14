'use client';

import Nav from '@/app/_layout/Nav';
import { Suspense } from 'react';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative max-w-[1440px] mx-auto">
      {/* content */}
      <main className="w-full h-[calc(100dvh-6rem)] overflow-hidden relative">
        {children}
      </main>
      {/* nav */}
      <Nav className="h-[6rem] lg:hidden" />
      {/* overlays */}
      <div id="overlay-container" className="absolute top-0 w-full">
        <Suspense></Suspense>
      </div>
      <div id="overlay-container" className="absolute bottom-0 w-full">
        <Suspense></Suspense>
      </div>
    </div>
  );
}
