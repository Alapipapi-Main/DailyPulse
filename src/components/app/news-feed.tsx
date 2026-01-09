'use client';

import { useEffect, useState } from 'react';
import { useNewsStore } from '@/store/use-news-store';
import { getNewsArticles } from '@/lib/news';
import { Article } from '@/lib/types';
import { NewsCard } from './news-card';
import { Skeleton } from '@/components/ui/skeleton';

interface NewsFeedProps {
  articles?: Article[]; // For saved articles page
}

export default function NewsFeed({ articles: predefinedArticles }: NewsFeedProps) {
  const [articles, setArticles] = useState<Article[]>(predefinedArticles || []);
  const [isLoading, setIsLoading] = useState(!predefinedArticles);
  const selectedInterests = useNewsStore((state) => state.interests);

  useEffect(() => {
    // If we have predefined articles (like on the saved page), just use them.
    if (predefinedArticles) {
      setArticles(predefinedArticles);
      setIsLoading(false);
      return;
    }

    // Otherwise, fetch articles based on interests from the store.
    const fetchArticles = async () => {
      setIsLoading(true);
      const fetchedArticles = await getNewsArticles(selectedInterests);
      setArticles(fetchedArticles);
      setIsLoading(false);
    };

    fetchArticles();
  }, [selectedInterests, predefinedArticles]);


  if (isLoading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="flex flex-col space-y-3">
            <Skeleton className="aspect-[16/10] w-full rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[80px]" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-4 w-full" />
            </div>
          </div>
        ))}
      </div>
    );
  }
  
  if (articles.length === 0 && !predefinedArticles) {
      return (
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-12 text-center mt-16">
            <h3 className="text-xl font-medium">No articles found</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Try selecting different interests or check your NewsAPI key.
            </p>
          </div>
      )
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {articles.map((article) => (
        <NewsCard key={article.id} article={article} />
      ))}
    </div>
  );
}
