import { SidebarTrigger } from '@/components/ui/sidebar';
import { Newspaper } from 'lucide-react';

export function Header() {
  return (
    <header className="sticky top-0 z-10 flex h-[57px] items-center gap-4 border-b bg-background px-4">
      <div className="flex items-center gap-2">
        <SidebarTrigger />
        <div className="flex items-center gap-2 md:hidden">
            <Newspaper className="h-6 w-6 text-primary" />
            <h1 className="text-lg font-headline font-bold">DailyPulse</h1>
        </div>
      </div>
    </header>
  );
}
