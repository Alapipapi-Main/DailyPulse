'use client';
import { AppLayout } from '@/components/app/app-layout';
import { Header } from '@/components/app/header';
import { InterestSelector } from '@/components/app/interest-selector';
import { ThemeToggle } from '@/components/app/theme-toggle';
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
      <main className="flex-1 space-y-8 bg-background p-4 md:p-6 lg:p-8 dark:bg-background">
        <div className="space-y-2">
            <h1 className="text-3xl font-headline font-bold">Settings</h1>
            <p className="text-muted-foreground">Manage your preferences.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
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
            <Card>
              <CardHeader>
                <CardTitle>Appearance</CardTitle>
                <CardDescription>
                  Switch between light and dark mode.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ThemeToggle />
              </CardContent>
            </Card>
        </div>
      </main>
    </AppLayout>
  );
}
