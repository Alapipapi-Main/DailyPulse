'use client';
import { AppLayout } from '@/components/app/app-layout';
import { Header } from '@/components/app/header';
import { InterestSelector } from '@/components/app/interest-selector';
import NewsFeed from '@/components/app/news-feed';
import { Separator } from '@/components/ui/separator';
import { useNewsStore } from '@/store/use-news-store';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Article } from '@/lib/types';
import { getNewsArticles } from '@/lib/news';

export default function Home() {
  const { isOnboarded, interests } = useNewsStore();
  const router = useRouter();
  const [initialArticles, setInitialArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function load() {
      // Don't do anything until the store is hydrated and we know the onboarding status
      if (useNewsStore.persist.hasHydrated() && !isOnboarded) {
        router.replace('/onboarding');
        return;
      }
      
      if (isOnboarded) {
        try {
          const articles = await getNewsArticles(interests);
          setInitialArticles(articles);
        } catch (error) {
          console.error("Failed to fetch initial articles", error);
        } finally {
          setIsLoading(false);
        }
      }
    }
    
    // Check hydration status before loading
    if (useNewsStore.persist.hasHydrated()) {
      load();
    } else {
      // Subscribe to hydration event
      const unsub = useNewsStore.persist.onFinishHydration(() => {
        load();
        unsub(); // Unsubscribe once done
      });
    }

  }, [isOnboarded, interests, router]);

  // A more robust loading state that waits for hydration
  if (isLoading || !useNewsStore.persist.hasHydrated()) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }
  
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
        <NewsFeed articles={initialArticles} />
      </main>
    </AppLayout>
  );
}
