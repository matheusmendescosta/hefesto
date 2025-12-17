'use client';

import { authOptions } from '@/auth/auth-options';
import { AppSidebar } from '@/components/layout/app-sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AuthProvider } from '@/providers/auth-provider';
import { getServerSession, Session } from 'next-auth';

// const getCurrentUser = async (session: Session | null) => {
//   if (!session) {
//     return null;
//   }

//   const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/user/${session.user.id}`, {
//     headers: {
//       Authorization: `Bearer ${session.user.token}`,
//     },
//   });

//   if (!response.ok) {
//     throw new Error('Failed to fetch user data');
//   }

//   const user = await response.json();
//   return user;
// };

const DashboardLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  // const session = await getServerSession(authOptions);
  // const currentUser = await getCurrentUser(session);

  // console.log('Current User:', currentUser);

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex-1 overflow-hidden w-full">{children}</main>
    </SidebarProvider>
  );
};

export default DashboardLayout;
