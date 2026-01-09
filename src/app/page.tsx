'use client';

import { AppLayout } from '@/components/app/app-layout';
import { Header } from '@/components/app/header';
import { InterestSelector } from '@/components/app/interest-selector';
import NewsFeed from '@/components/app/news-feed';
import { Separator } from '@/components/ui/separator';
import { Category } from '@/lib/types';
import { useNewsStore } from '@/store/use-news-store';

// We define the initial interests here, matching the store's default.
const initialInterests: Category[] = ['Technology', 'AI'];

export default function Home() {

  // The NewsFeed component will now handle its own data fetching on the client side.
  // We can pass the initial interests to it if needed, or let it pull from the store.
  // For simplicity, NewsFeed will use the store's state on the client.

  return (
    <AppLayout>
      <Header />
      <main className="flex-1 space-y-6 p-4 md:p-6 lg:p-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-headline font-bold text-foreground">
            Your Daily Pulse
          </h1>
          <p className="text-muted-foreground">
            Select your interests to personalize your news feed.
          </p>
        </div>
        <InterestSelector />
        <Separator />
        <NewsFeed />
      </main>
    </AppLayout>
  );
}
