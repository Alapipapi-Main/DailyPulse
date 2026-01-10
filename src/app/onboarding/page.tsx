'use client';

import { InterestSelector } from '@/components/app/interest-selector';
import { Button } from '@/components/ui/button';
import { useNewsStore } from '@/store/use-news-store';
import { Newspaper } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function OnboardingPage() {
  const { interests, finishOnboarding } = useNewsStore();
  const router = useRouter();

  const handleContinue = () => {
    finishOnboarding();
    router.replace('/');
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4 text-center dark:bg-background">
      <div className="mx-auto w-full max-w-xl space-y-8">
        <div className="flex flex-col items-center gap-4">
          <Newspaper className="h-12 w-12 text-primary" />
          <h1 className="text-4xl font-headline font-bold">
            Welcome to DailyPulse
          </h1>
          <p className="text-lg text-muted-foreground">
            What are you interested in? Choose at least one topic to get started.
          </p>
        </div>

        <div className="rounded-lg border bg-card p-6">
          <InterestSelector />
        </div>

        <Button
          onClick={handleContinue}
          disabled={interests.length === 0}
          size="lg"
          className="w-full"
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
