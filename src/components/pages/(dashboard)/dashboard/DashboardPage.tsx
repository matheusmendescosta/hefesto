'use client';

import { useSidebar } from '@/components/ui/sidebar';
import { LayoutDashboard, BarChart3, Settings, ChevronRight, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SectionCards } from './DashboardSections';

const DashboardPage = () => {
  const { toggleSidebar, open } = useSidebar();

  return (
    <div className="flex flex-col h-screen w-full border-2 overflow-hidden bg-gray-800">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gradient-to-r from-gray-900 via-gray-850 to-gray-900 p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              aria-label="Toggle sidebar"
              className="text-gray-400 hover:text-white hover:bg-gray-800 transition-all"
            >
              {open ? <ChevronRight className="h-5 w-5" /> : <LayoutDashboard className="h-5 w-5" />}
            </Button>
            <div className="border-l border-gray-700 pl-4">
              <h1 className="text-xl font-semibold text-white">Dashboard</h1>
              <p className="text-sm text-gray-500 mt-1">Gerenciamento seus orçamentos</p>
            </div>
          </div>
        </div>
      </header>

      {/* Content Area */}
      <main className="flex-1 overflow-auto bg-gray-900 p-6">
        <div className="max-w-7xl mx-auto">
          <SectionCards />
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
