'use client';

import { useSidebar } from '@/components/ui/sidebar';
import { ChevronRight, Zap, Plus, Unlink, Settings, CheckCircle2, AlertCircle, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface Integration {
  id: string;
  name: string;
  description: string;
  //eslint-disable-next-line
  icon: any;
  status: 'connected' | 'disconnected';
  connectedSince?: string;
  lastSync?: string;
  color: string;
}

const IntegrationsPage = () => {
  const { toggleSidebar, open } = useSidebar();
  const [integrations, setIntegrations] = useState<Integration[]>([
    {
      id: 'asaas',
      name: 'Asaas',
      description: 'Plataforma de pagamentos e cobranças',
      icon: Zap,
      status: 'connected',
      connectedSince: '2025-12-10',
      lastSync: '2025-12-16T14:30:00Z',
      color: 'from-blue-500 to-blue-600',
    },
    {
      id: 'conta-azul',
      name: 'Conta Azul',
      description: 'Gestão financeira e emissão de notas fiscais',
      icon: Shield,
      status: 'disconnected',
      color: 'from-cyan-500 to-cyan-600',
    },
    {
      id: 'contractor',
      name: 'Contractor',
      description: 'Gestão de contratos e documentos',
      icon: Settings,
      status: 'connected',
      connectedSince: '2025-12-05',
      lastSync: '2025-12-16T10:15:00Z',
      color: 'from-purple-500 to-purple-600',
    },
    {
      id: 'clicksign',
      name: 'ClickSign',
      description: 'Assinatura digital e autenticação',
      icon: Zap,
      status: 'disconnected',
      color: 'from-orange-500 to-orange-600',
    },
  ]);

  const handleConnect = (integrationId: string) => {
    setIntegrations((prev) =>
      prev.map((int) =>
        int.id === integrationId
          ? {
              ...int,
              status: 'connected',
              connectedSince: new Date().toISOString().split('T')[0],
              lastSync: new Date().toISOString(),
            }
          : int,
      ),
    );
  };

  const handleDisconnect = (integrationId: string) => {
    setIntegrations((prev) =>
      prev.map((int) =>
        int.id === integrationId
          ? {
              ...int,
              status: 'disconnected',
              connectedSince: undefined,
              lastSync: undefined,
            }
          : int,
      ),
    );
  };

  const connectedCount = integrations.filter((i) => i.status === 'connected').length;

  return (
    <div className="flex flex-col h-screen w-full bg-gray-900 border-2 overflow-hidden">
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
              {open ? <ChevronRight className="h-5 w-5" /> : <Zap className="h-5 w-5" />}
            </Button>
            <div className="border-l border-gray-700 pl-4">
              <h1 className="text-xl font-semibold text-white">Integrações</h1>
              <p className="text-sm text-gray-500 mt-1">Conecte seus serviços favoritos</p>
            </div>
          </div>
        </div>
      </header>

      {/* Content Area */}
      <main className="flex-1 overflow-auto bg-gray-900 p-6">
        {/* Summary Stats */}
        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-gray-700 bg-gray-800 p-6">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-8 w-8 text-green-400" />
              <div>
                <p className="text-gray-400 text-sm">Integrações Conectadas</p>
                <p className="text-2xl font-bold text-white">{connectedCount}</p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl border border-gray-700 bg-gray-800 p-6">
            <div className="flex items-center gap-3">
              <AlertCircle className="h-8 w-8 text-yellow-400" />
              <div>
                <p className="text-gray-400 text-sm">Integrações Disponíveis</p>
                <p className="text-2xl font-bold text-white">{integrations.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Integrations Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2">
          {integrations.map((integration) => {
            const IconComponent = integration.icon;
            return (
              <div
                key={integration.id}
                className="rounded-2xl border border-gray-700 bg-gray-800 overflow-hidden hover:border-gray-600 transition-all"
              >
                {/* Integration Header */}
                <div className={`bg-gradient-to-r ${integration.color} p-6 text-white`}>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-white/20 rounded-lg backdrop-blur">
                        <IconComponent className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">{integration.name}</h3>
                        <p className="text-sm opacity-90">{integration.description}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Integration Body */}
                <div className="p-6">
                  {/* Status */}
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      {integration.status === 'connected' ? (
                        <>
                          <div className="h-3 w-3 bg-green-500 rounded-full"></div>
                          <span className="text-sm font-medium text-green-400">Conectado</span>
                        </>
                      ) : (
                        <>
                          <div className="h-3 w-3 bg-gray-500 rounded-full"></div>
                          <span className="text-sm font-medium text-gray-400">Desconectado</span>
                        </>
                      )}
                    </div>

                    {/* Connection Details */}
                    {integration.status === 'connected' && integration.connectedSince && (
                      <div className="space-y-1 text-xs text-gray-400">
                        <p>Conectado em: {new Date(integration.connectedSince).toLocaleDateString('pt-BR')}</p>
                        {integration.lastSync && <p>Última sincronização: {new Date(integration.lastSync).toLocaleString('pt-BR')}</p>}
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    {integration.status === 'connected' ? (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-700"
                          onClick={() => handleDisconnect(integration.id)}
                        >
                          <Unlink className="h-4 w-4 mr-2" />
                          Desconectar
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-700">
                          <Settings className="h-4 w-4 mr-2" />
                          Configurar
                        </Button>
                      </>
                    ) : (
                      <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white" onClick={() => handleConnect(integration.id)}>
                        <Plus className="h-4 w-4 mr-2" />
                        Conectar
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default IntegrationsPage;
