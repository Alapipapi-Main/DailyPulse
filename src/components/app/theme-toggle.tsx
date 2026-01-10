'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { SidebarMenuButton } from '@/components/ui/sidebar';
import { useTheme } from '@/context/theme-provider';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <SidebarMenuButton
      onClick={toggleTheme}
      tooltip={{
        children: 'Toggle theme',
        side: 'right',
        align: 'center',
      }}
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="group-data-[collapsible=icon]:hidden">Toggle theme</span>
    </SidebarMenuButton>
  );
}
