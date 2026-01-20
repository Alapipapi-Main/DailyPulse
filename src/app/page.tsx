'use client';
import { AppLayout } from '@/components/app/app-layout';
import { Header } from '@/components/app/header';
import NewsFeed from '@/components/app/news-feed';
import { useNewsStore } from '@/store/use-news-store';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useCallback } from 'react';
import { getNewsArticles } from '@/lib/news';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  
  const { isOnboarded, articles, setArticles } = useNewsStore((state) => ({
    isOnboarded: state.isOnboarded,
    articles: state.articles,
    setArticles: state.setArticles,
  }));

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
  
  const handleRefresh = useCallback(async () => {
    setIsLoading(true);
    try {
      const currentInterests = useNewsStore.getState().interests;
      const fetchedArticles = await getNewsArticles(currentInterests);
      setArticles(fetchedArticles);
    } catch (error) {
      console.error("Failed to fetch articles", error);
    } finally {
      setIsLoading(false);
    }
  }, [setArticles]);
  
  useEffect(() => {
    if (isHydrated) {
      if (!isOnboarded) {
        router.replace('/onboarding');
      } else if (articles.length === 0) {
        handleRefresh();
      }
    }
  }, [isHydrated, isOnboarded, articles.length, handleRefresh, router]);

  if (!isHydrated || !isOnboarded) {
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
           <Button onClick={handleRefresh} disabled={isLoading} size="icon" variant="outline">
              <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
              <span className="sr-only">Refresh news</span>
            </Button>
        </div>
        
        {!isLoading && articles.length === 0 ? (
           <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-12 text-center mt-16">
            <h3 className="text-xl font-medium">No articles found</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Try refreshing the feed or changing your interests in the settings.
            </p>
            <Button asChild className="mt-4">
                <Link href="/settings">Change Interests</Link>
            </Button>
          </div>
        ) : (
          <NewsFeed articles={articles} isLoading={isLoading} />
        )}
      </main>
    </AppLayout>
  );
}
