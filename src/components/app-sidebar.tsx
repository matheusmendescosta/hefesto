'use client';

import * as React from 'react';
import { BookOpen, Bot, Command, FileChartLine, Frame, LifeBuoy, Map, PieChart, Send, Settings2, SquareTerminal } from 'lucide-react';

import { NavMain } from '@/components/nav-main';
import { NavProjects } from '@/components/nav-projects';
import { NavSecondary } from '@/components/nav-secondary';
import { NavUser } from '@/components/nav-user';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

const data = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg',
  },
  navMain: [
    {
      title: 'Orçamentos',
      url: '#',
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: 'Serviços',
          url: '/services',
        },
        {
          title: 'Produtos',
          url: '/products',
        },
      ],
    },
    {
      title: 'Categorias',
      url: '#',
      icon: Bot,
      items: [
        {
          title: 'Produtos',
          url: '#',
        },
        {
          title: 'Serviços',
          url: '#',
        },
        {
          title: 'Clientes',
          url: '#',
        },
      ],
    },
    // {
    //   title: 'Documentation',
    //   url: '#',
    //   icon: BookOpen,
    //   items: [
    //     {
    //       title: 'Introduction',
    //       url: '#',
    //     },
    //     {
    //       title: 'Get Started',
    //       url: '#',
    //     },
    //     {
    //       title: 'Tutorials',
    //       url: '#',
    //     },
    //     {
    //       title: 'Changelog',
    //       url: '#',
    //     },
    //   ],
    // },
    {
      title: 'Configurações',
      url: '#',
      icon: Settings2,
      items: [
        {
          title: 'Integrações',
          url: '#',
        },
        // {
        //   title: 'Team',
        //   url: '#',
        // },
        // {
        //   title: 'Billing',
        //   url: '#',
        // },
        // {
        //   title: 'Limits',
        //   url: '#',
        // },
      ],
    },
  ],
  navSecondary: [
    {
      title: 'Support',
      url: '#',
      icon: LifeBuoy,
    },
    {
      title: 'Feedback',
      url: '#',
      icon: Send,
    },
  ],
  projects: [
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: Frame,
    },
    {
      name: 'Orçamentos',
      url: '/quotes',
      icon: PieChart,
    },
    {
      name: 'Produtos',
      url: '/products',
      icon: Map,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="/dashboard">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <FileChartLine className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">Orça AÍ</span>
                  <span className="truncate text-xs">Portal de orçamentos</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
