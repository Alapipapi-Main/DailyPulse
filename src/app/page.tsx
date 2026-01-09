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
  const router = useRouter();
  const [initialArticles, setInitialArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isHydrated, setIsHydrated] = useState(false);
  
  const isOnboarded = useNewsStore((state) => state.isOnboarded);
  const interests = useNewsStore((state) => state.interests);

  useEffect(() => {
    // This effect ensures we only run logic after the store has been rehydrated from localStorage
    const unsub = useNewsStore.persist.onFinishHydration(() => {
      setIsHydrated(true);
    });

    // If already hydrated, set the state
    if (useNewsStore.persist.hasHydrated()) {
      setIsHydrated(true);
    }

    return () => {
      unsub();
    };
  }, []);
  
  useEffect(() => {
    // This effect handles redirection and data fetching, but only runs when `isHydrated` is true
    if (!isHydrated) {
      return; // Do nothing until hydration is complete
    }

    async function load() {
      if (!isOnboarded) {
        router.replace('/onboarding');
        return;
      }

      // If we are here, it means user is onboarded.
      try {
        const articles = await getNewsArticles(interests);
        setInitialArticles(articles);
      } catch (error) {
        console.error("Failed to fetch initial articles", error);
      } finally {
        setIsLoading(false);
      }
    }
    
    load();

  }, [isHydrated, isOnboarded, interests, router]);

  // A more robust loading state that waits for hydration
  if (!isHydrated) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }
  
  if (isLoading && isOnboarded) {
     return (
      <div className="flex h-screen items-center justify-center">
        <p>Loading your articles...</p>
      </div>
    );
  }

  // If the user is not onboarded, we should have already redirected.
  // This is a fallback to prevent flashing the main page content.
  if (!isOnboarded) {
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
