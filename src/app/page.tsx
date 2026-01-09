import { AppLayout } from '@/components/app/app-layout';
import { Header } from '@/components/app/header';
import { InterestSelector } from '@/components/app/interest-selector';
import NewsFeed from '@/components/app/news-feed';
import { Separator } from '@/components/ui/separator';

export default function Home() {
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
