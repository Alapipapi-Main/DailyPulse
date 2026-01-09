'use client';
import { AppLayout } from '@/components/app/app-layout';
import { Header } from '@/components/app/header';
import { InterestSelector } from '@/components/app/interest-selector';
import NewsFeed from '@/components/app/news-feed';
import { Separator } from '@/components/ui/separator';
import { useNewsStore } from '@/store/use-news-store';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Article, Category } from '@/lib/types';
import { getNewsArticles } from '@/lib/news';

export default function Home() {
  const { isOnboarded, interests } = useNewsStore();
  const router = useRouter();
  const [initialArticles, setInitialArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function load() {
      if (!isOnboarded) {
        router.replace('/onboarding');
        return;
      }
      
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
  }, [isOnboarded, interests, router]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        {/* You can replace this with a more sophisticated loading spinner */}
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
