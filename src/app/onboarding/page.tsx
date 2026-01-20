'use client';

import { useState } from 'react';
import { InterestSelector } from '@/components/app/interest-selector';
import { Button } from '@/components/ui/button';
import { useNewsStore } from '@/store/use-news-store';
import { Newspaper, Sun, Moon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTheme } from '@/context/theme-provider';
import { cn } from '@/lib/utils';
import { ThemeSelector } from '@/components/app/theme-selector';

export default function OnboardingPage() {
  const { interests, finishOnboarding } = useNewsStore();
  const { theme } = useTheme();
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
                Get your daily news, summarized. Choose your interests to get started.
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
            <ThemeSelector />
            <Button onClick={handleContinue} size="lg" className="w-full">
              Finish Setup
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
