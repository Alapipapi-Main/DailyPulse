'use client';

import { useTheme } from '@/context/theme-provider';
import { cn } from '@/lib/utils';

export function ThemeSelector() {
  const { theme, setTheme } = useTheme();

  return (
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
  );
}
