'use client';
import { AppLayout } from '@/components/app/app-layout';
import { Header } from '@/components/app/header';
import { InterestSelector } from '@/components/app/interest-selector';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useNewsStore } from '@/store/use-news-store';

export default function SettingsPage() {
    const interests = useNewsStore((state) => state.interests);

  return (
    <AppLayout>
      <Header />
      <main className="dark:bg-background flex-1 space-y-8 bg-background p-4 md:p-6 lg:p-8">
        <div className="space-y-2">
            <h1 className="text-3xl font-headline font-bold">Settings</h1>
            <p className="text-muted-foreground">Manage your preferences.</p>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>My Interests</CardTitle>
            <CardDescription>
              Select the topics you want to see in your feed. You have selected {interests.length} {interests.length === 1 ? 'topic' : 'topics'}.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <InterestSelector />
          </CardContent>
        </Card>
      </main>
    </AppLayout>
  );
}
