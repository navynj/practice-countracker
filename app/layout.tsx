import { Metadata, Viewport } from 'next';
import JotaiProvider from './_provider/JotaiProvider';
import JotaiQueryClientProvider from './_provider/JotaiQueryClientProvider';
import './globals.css';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
};

export const metadata: Metadata = {
  title: 'Practice Countracker',
  description: 'Counter or tracker for your music practice',
  manifest: '/manifest.json',
  icons: [{ rel: 'icon', url: '/logo-192x192.png', sizes: '192x192' }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <JotaiQueryClientProvider>
          <JotaiProvider>{children}</JotaiProvider>
        </JotaiQueryClientProvider>
      </body>
    </html>
  );
}
