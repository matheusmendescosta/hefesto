'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Shield, Plus, Unlink, Settings, Loader2 } from 'lucide-react';
import { useContaAzulIntegration } from '@/hooks/useContaAzulIntegration';
import { initiateOAuthFlow } from '@/lib/oauth';

export function ContaAzulIntegrationCard() {
  const { data: session } = useSession();
  const { status, loading, isConnected, disconnect } = useContaAzulIntegration();
  const [isDisconnecting, setIsDisconnecting] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = async () => {
    try {
      setIsConnecting(true);
      // Passar o token do next-auth para a função
      //eslint-disable-next-line
      const token = (session as any)?.user?.token || (session as any)?.user?.accessToken;
      await initiateOAuthFlow('conta-azul', token);
    } catch (error) {
      console.error('Erro ao conectar:', error);
      setIsConnecting(false);
    }
  };

  const handleDisconnect = async () => {
    setIsDisconnecting(true);
    const success = await disconnect();
    setIsDisconnecting(false);

    if (success) {
      // Toast de sucesso poderia ser adicionado aqui
      console.log('Integração desconectada com sucesso');
    }
  };

  if (loading) {
    return (
      <div className="rounded-2xl border border-gray-700 bg-gray-800 overflow-hidden">
        <div className="bg-gradient-to-r from-cyan-500 to-cyan-600 p-6 text-white">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-white/20 rounded-lg backdrop-blur">
                <Shield className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Conta Azul</h3>
                <p className="text-sm opacity-90">Gestão financeira e emissão de notas fiscais</p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 flex items-center justify-center">
          <Loader2 className="h-5 w-5 animate-spin text-gray-400" />
          <span className="ml-2 text-gray-400">Carregando status...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-gray-700 bg-gray-800 overflow-hidden hover:border-gray-600 transition-all">
      {/* Integration Header */}
      <div className="bg-gradient-to-r from-cyan-500 to-cyan-600 p-6 text-white">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-white/20 rounded-lg backdrop-blur">
              <Shield className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Conta Azul</h3>
              <p className="text-sm opacity-90">Gestão financeira e emissão de notas fiscais</p>
            </div>
          </div>
        </div>
      </div>

      {/* Integration Body */}
      <div className="p-6">
        {/* Status */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            {isConnected ? (
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
          {isConnected && status?.connectedAt && (
            <div className="space-y-1 text-xs text-gray-400">
              <p>Conectado em: {new Date(status.connectedAt).toLocaleDateString('pt-BR')}</p>
              {status.lastUpdated && <p>Última atualização: {new Date(status.lastUpdated).toLocaleString('pt-BR')}</p>}
              {status.providerUserId && <p>ID Conta Azul: {status.providerUserId}</p>}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          {isConnected ? (
            <>
              <Button
                variant="outline"
                size="sm"
                className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-700"
                onClick={handleDisconnect}
                disabled={isDisconnecting}
              >
                {isDisconnecting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Desconectando...
                  </>
                ) : (
                  <>
                    <Unlink className="h-4 w-4 mr-2" />
                    Desconectar
                  </>
                )}
              </Button>
              <Button variant="outline" size="sm" className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-700">
                <Settings className="h-4 w-4 mr-2" />
                Configurar
              </Button>
            </>
          ) : (
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white" onClick={handleConnect} disabled={isConnecting}>
              {isConnecting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Conectando...
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4 mr-2" />
                  Conectar
                </>
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
