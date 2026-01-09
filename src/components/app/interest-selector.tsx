'use client';

import { useNewsStore } from '@/store/use-news-store';
import { Button } from '@/components/ui/button';
import { categories, Category } from '@/lib/types';
import {
  Cpu,
  BrainCircuit,
  Trophy,
  Briefcase,
  Gamepad2,
  School,
  HeartPulse,
} from 'lucide-react';
import React from 'react';

const categoryIcons: Record<Category, React.ElementType> = {
  Technology: Cpu,
  AI: BrainCircuit,
  Sports: Trophy,
  Business: Briefcase,
  Gaming: Gamepad2,
  Education: School,
  Health: HeartPulse,
};

export function InterestSelector() {
  const selectedInterests = useNewsStore((state) => state.interests);
  const setInterests = useNewsStore((state) => state.setInterests);

  const handleToggle = (category: Category) => {
    const newInterests = selectedInterests.includes(category)
      ? selectedInterests.filter((i) => i !== category)
      : [...selectedInterests, category];
    setInterests(newInterests);
  };

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-headline font-bold">Your Interests</h2>
      <div className="flex flex-wrap justify-start gap-2">
        {categories.map((category) => {
          const Icon = categoryIcons[category];
          const isSelected = selectedInterests.includes(category);
          return (
            <Button
              key={category}
              variant={isSelected ? 'default' : 'outline'}
              onClick={() => handleToggle(category)}
              className="flex gap-2"
            >
              <Icon className="h-4 w-4" />
              {category}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
