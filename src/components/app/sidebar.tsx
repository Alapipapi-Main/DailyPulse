'use client';

import {
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Rss, Bookmark, Newspaper } from 'lucide-react';
import { useSidebar } from '@/components/ui/sidebar';
import { SheetTitle } from '@/components/ui/sheet';

export function AppSidebar() {
  const pathname = usePathname();
  const { isMobile } = useSidebar();

  const menuItems = [
    { href: '/', label: 'My Feed', icon: Rss },
    { href: '/saved', label: 'Saved Articles', icon: Bookmark },
  ];

  return (
    <>
      <SidebarHeader>
        {isMobile && <SheetTitle />}
        <div className="flex h-[57px] items-center gap-3 px-3">
          <Newspaper className="h-8 w-8 shrink-0 text-primary" />
          <h1 className="text-xl font-headline font-bold group-data-[collapsible=icon]:hidden">
            DailyPulse
          </h1>
        </div>
      </SidebarHeader>
      <SidebarContent className="p-2">
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.href}
                tooltip={{
                  children: item.label,
                  side: 'right',
                  align: 'center',
                }}
              >
                <Link href={item.href}>
                  <item.icon className="shrink-0" />
                  <span className="group-data-[collapsible=icon]:hidden">
                    {item.label}
                  </span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </>
  );
}
