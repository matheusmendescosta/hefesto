"use client";

import {
  Bot,
  FileChartLine,
  FilePlusCorner,
  Frame,
  Hammer,
  LifeBuoy,
  Map,
  PieChart,
  Send,
  Settings2,
  SquareTerminal,
  Store,
  Users,
} from "lucide-react";
import * as React from "react";
import { useContext } from "react";

import { NavMain } from "@/components/layout/nav-main";
import { NavProjects } from "@/components/layout/nav-projects";
import { NavSecondary } from "@/components/layout/nav-secondary";
import { NavUser } from "@/components/layout/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { UserContext } from "@/providers/user-provider";

const data = {
  navMain: [
    {
      title: "Orçamentos",
      url: "/quotes",
      icon: FilePlusCorner,
      isActive: true,
      items: [
        {
          title: "Novo Orçamento",
          url: "/quotes/new",
        },
      ],
    },
    {
      title: "Produtos",
      url: "/products",
      icon: Store,
      items: [
        {
          title: "Novo Produto",
          url: "/products/new",
        },
      ],
    },
    {
      title: "Serviços",
      url: "/services",
      icon: Hammer,
      items: [
        {
          title: "Novo Serviço",
          url: "/services/new",
        },
      ],
    },
    {
      title: "Clientes",
      url: "/clients",
      icon: Users,
      items: [
        {
          title: "Novo Cliente",
          url: "/clients/new",
        },
      ],
    },
    {
      title: "Configurações",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "Integrações",
          url: "/integrations",
        },
        {
          title: "Webhooks",
          url: "#",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Suporte",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send,
    },
  ],
  projects: [
    {
      name: "Dashboard",
      url: "/dashboard",
      icon: Frame,
    },
    {
      name: "Orçamentos",
      url: "/quotes",
      icon: PieChart,
    },
    {
      name: "Produtos",
      url: "/products",
      icon: Map,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useContext(UserContext);

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
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
