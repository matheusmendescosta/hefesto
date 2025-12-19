import { authOptions } from '@/auth/auth-options';
import { AppSidebar } from '@/components/layout/app-sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { getServerSession } from 'next-auth';

const DashboardLayout = async ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const session = await getServerSession(authOptions);

  console.log('Access Token:', session?.accessToken);

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex-1 overflow-hidden w-full">{children}</main>
    </SidebarProvider>
  );
};

export default DashboardLayout;
