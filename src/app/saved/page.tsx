'use client';
import { AppLayout } from '@/components/app/app-layout';
import { Header } from '@/components/app/header';
import NewsFeed from '@/components/app/news-feed';
import { useNewsStore } from '@/store/use-news-store';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function SavedPage() {
  const savedArticles = useNewsStore((state) => state.savedArticles);

  return (
    <AppLayout>
      <Header />
      <main className="flex-1 space-y-8 p-4 md:p-6 lg:p-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-headline font-bold">Saved Articles</h1>
        </div>
        {savedArticles.length > 0 ? (
          <NewsFeed articles={savedArticles} />
        ) : (
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-12 text-center mt-16">
            <h3 className="text-xl font-medium">No saved articles yet</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Your saved articles will appear here. Start exploring your feed!
            </p>
            <Button asChild className="mt-4">
              <Link href="/">Back to Feed</Link>
            </Button>
          </div>
        )}
      </main>
    </AppLayout>
  );
}
