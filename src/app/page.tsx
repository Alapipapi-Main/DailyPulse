'use client';
import { AppLayout } from '@/components/app/app-layout';
import { Header } from '@/components/app/header';
import NewsFeed from '@/components/app/news-feed';
import { useNewsStore } from '@/store/use-news-store';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useCallback } from 'react';
import { Article } from '@/lib/types';
import { getNewsArticles } from '@/lib/news';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';

export default function Home() {
  const router = useRouter();
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isHydrated, setIsHydrated] = useState(false);
  
  const isOnboarded = useNewsStore((state) => state.isOnboarded);
  const interests = useNewsStore((state) => state.interests);

  useEffect(() => {
    const unsub = useNewsStore.persist.onFinishHydration(() => {
      setIsHydrated(true);
    });

    if (useNewsStore.persist.hasHydrated()) {
      setIsHydrated(true);
    }

    return () => {
      unsub();
    };
  }, []);
  
  const fetchArticles = useCallback(async () => {
    if (!isOnboarded) {
      router.replace('/onboarding');
      return;
    }

    setIsLoading(true);
    try {
      const fetchedArticles = await getNewsArticles(interests);
      setArticles(fetchedArticles);
    } catch (error) {
      console.error("Failed to fetch articles", error);
    } finally {
      setIsLoading(false);
    }
  }, [isOnboarded, interests, router]);
  
  useEffect(() => {
    if (isHydrated) {
      fetchArticles();
    }
  }, [isHydrated, interests, fetchArticles]);

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
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-headline font-bold text-foreground">
              Your Daily Pulse
            </h1>
            <p className="text-muted-foreground">
              Here are the latest summarized articles based on your interests.
            </p>
          </div>
           <Button onClick={fetchArticles} disabled={isLoading} size="icon" variant="outline">
              <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
              <span className="sr-only">Refresh news</span>
            </Button>
        </div>
        <NewsFeed articles={articles} />
      </main>
    </AppLayout>
  );
}
