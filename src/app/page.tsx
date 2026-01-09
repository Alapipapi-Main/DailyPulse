import { AppLayout } from '@/components/app/app-layout';
import { Header } from '@/components/app/header';
import { InterestSelector } from '@/components/app/interest-selector';
import NewsFeed from '@/components/app/news-feed';

export default function Home() {
  return (
    <AppLayout>
      <Header />
      <main className="flex-1 space-y-8 p-4 md:p-6 lg:p-8">
        <InterestSelector />
        <NewsFeed />
      </main>
    </AppLayout>
  );
}
