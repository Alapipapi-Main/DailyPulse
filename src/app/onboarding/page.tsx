'use client';

import { useState } from 'react';
import { InterestSelector } from '@/components/app/interest-selector';
import { Button } from '@/components/ui/button';
import { useNewsStore } from '@/store/use-news-store';
import { Newspaper, Sun, Moon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { ThemeToggle } from '@/components/app/theme-toggle';
import { useTheme } from '@/context/theme-provider';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';

export default function OnboardingPage() {
  const { interests, finishOnboarding } = useNewsStore();
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const [step, setStep] = useState(1);

  const handleContinue = () => {
    finishOnboarding();
    router.replace('/');
  };

  const handleNextStep = () => {
    setStep(2);
  };
  
  const iconColor = theme === 'dark' ? 'text-primary' : 'text-primary';

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4 text-center dark:bg-background">
      <div className="mx-auto w-full max-w-xl space-y-8">
        {step === 1 && (
          <>
            <div className="flex flex-col items-center gap-4">
              <Newspaper className={`h-12 w-12 ${iconColor}`} />
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
              onClick={handleNextStep}
              disabled={interests.length === 0}
              size="lg"
              className="w-full"
            >
              Continue
            </Button>
          </>
        )}
        {step === 2 && (
          <>
            <div className="flex flex-col items-center gap-4">
              {theme === 'light' ? <Sun className={`h-12 w-12 ${iconColor}`} /> : <Moon className={`h-12 w-12 ${iconColor}`} />}
              <h1 className="text-4xl font-headline font-bold">
                Choose Your Look
              </h1>
              <p className="text-lg text-muted-foreground">
                Select your preferred theme to personalize your experience.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setTheme('light')}
                  className={cn(
                    'rounded-lg border-2 p-4 text-center transition-all',
                    theme === 'light'
                      ? 'border-primary ring-2 ring-primary'
                      : 'border-border'
                  )}
                >
                  <div className="mb-2 overflow-hidden rounded-md border bg-[#F0F0F0]">
                    <div className="p-4 space-y-2">
                      <div className="h-4 w-1/2 rounded bg-[#6699CC]"></div>
                      <div className="h-3 w-3/4 rounded bg-[#D98850]"></div>
                    </div>
                  </div>
                  <p className="font-medium">Light</p>
                </button>
                <button
                  onClick={() => setTheme('dark')}
                  className={cn(
                    'rounded-lg border-2 p-4 text-center transition-all',
                    theme === 'dark'
                      ? 'border-primary ring-2 ring-primary'
                      : 'border-border'
                  )}
                >
                  <div className="mb-2 overflow-hidden rounded-md border bg-[#1A1A1A]">
                    <div className="p-4 space-y-2">
                       <div className="h-4 w-1/2 rounded bg-[#6699CC]"></div>
                       <div className="h-3 w-3/4 rounded bg-[#D98850]"></div>
                    </div>
                  </div>
                  <p className="font-medium">Dark</p>
                </button>
            </div>

            <Button onClick={handleContinue} size="lg" className="w-full">
              Finish Setup
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
