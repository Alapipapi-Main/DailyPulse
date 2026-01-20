'use client';

import { Article } from '@/lib/types';
import { NewsCard } from './news-card';
import { Skeleton } from '@/components/ui/skeleton';

interface NewsFeedProps {
  articles: Article[];
  isLoading?: boolean;
}

export default function NewsFeed({ articles, isLoading }: NewsFeedProps) {

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
  
  // The parent component is now responsible for showing an empty state message.
  // This component will simply render nothing if the articles array is empty.

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-start">
      {articles.map((article) => (
        <NewsCard key={article.id} article={article} />
      ))}
    </div>
  );
}
