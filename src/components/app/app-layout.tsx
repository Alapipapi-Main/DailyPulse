'use client';

import {
  SidebarProvider,
  Sidebar,
  SidebarInset,
} from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app/sidebar';
import { useEffect, useState } from 'react';

export function AppLayout({ children }: { children: React.ReactNode }) {
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const getSidebarDefaultState = () => {
    if (typeof window === 'undefined') {
      return true;
    }
    const cookieValue = document.cookie
      .split('; ')
      .find((row) => row.startsWith('sidebar_state='))
      ?.split('=')[1];
    return cookieValue !== 'false';
  }

  if (!isMounted) {
    return null; // Or a loading spinner
  }

  return (
    <SidebarProvider defaultOpen={getSidebarDefaultState()}>
      <Sidebar>
        <AppSidebar />
      </Sidebar>
      <SidebarInset className="flex flex-col">{children}</SidebarInset>
    </SidebarProvider>
  );
}
