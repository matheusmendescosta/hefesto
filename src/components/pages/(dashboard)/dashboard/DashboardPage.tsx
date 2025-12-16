'use client';

import { useSidebar } from '@/components/ui/sidebar';
import { LayoutDashboard, BarChart3, Settings, ChevronRight, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

const DashboardPage = () => {
  const { toggleSidebar, open } = useSidebar();

  return (
    <div className="flex flex-col h-screen w-full border-2 rounded-2xl overflow-hidden bg-gray-800">
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
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Card 1 */}
          <div className="rounded-2xl border border-gray-700 bg-gray-800 p-6 shadow-lg hover:shadow-xl hover:border-gray-600 transition-all">
            <div className="flex items-center gap-3 mb-4">
              <LayoutDashboard className="h-6 w-6 text-blue-400" />
              <h2 className="text-lg font-semibold text-white">Bem-vindo</h2>
            </div>
            <p className="text-gray-400">Clique no ícone de menu para abrir/fechar o sidebar</p>
          </div>

          {/* Card 2 */}
          <div className="rounded-2xl border border-gray-700 bg-gray-800 p-6 shadow-lg hover:shadow-xl hover:border-gray-600 transition-all">
            <div className="flex items-center gap-3 mb-4">
              <BarChart3 className="h-6 w-6 text-green-400" />
              <h2 className="text-lg font-semibold text-white">Análises</h2>
            </div>
            <p className="text-gray-400">Visualize estatísticas e métricas do seu negócio</p>
          </div>

          {/* Card 3 */}
          <div className="rounded-2xl border border-gray-700 bg-gray-800 p-6 shadow-lg hover:shadow-xl hover:border-gray-600 transition-all">
            <div className="flex items-center gap-3 mb-4">
              <Settings className="h-6 w-6 text-purple-400" />
              <h2 className="text-lg font-semibold text-white">Configurações</h2>
            </div>
            <p className="text-gray-400">Gerencie as configurações do seu sistema</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
