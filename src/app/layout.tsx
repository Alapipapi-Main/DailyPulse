import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/context/theme-provider';

export const metadata: Metadata = {
  title: 'DailyPulse',
  description: 'Your daily dose of summarized news.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3e%3cpath fill='%236699CC' d='M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2h0a2 2 0 0 0 0 4h.5Z'/%3e%3cpath stroke='%23F5F7FA' stroke-width='2' stroke-linecap='round' d='M4 22V4'/%3e%3cpath stroke='%23F5F7FA' stroke-width='2' stroke-linecap='round' d='M12 14h4'/%3e%3cpath stroke='%23F5F7FA' stroke-width='2' stroke-linecap='round' d='M12 18h4'/%3e%3cpath stroke='%23F5F7FA' stroke-width='2' stroke-linecap='round' d='M12 10h4'/%3e%3c/svg%3e" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Alegreya:wght@400;700&family=Belleza&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={cn('font-body antialiased min-h-screen bg-background')}>
        <ThemeProvider>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
