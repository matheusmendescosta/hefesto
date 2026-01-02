"use client";

import { Button } from "@/components/ui/button";
import { useContaAzulIntegration } from "@/hooks/useContaAzulIntegration";
import { initiateOAuthFlow } from "@/lib/oauth";
import {
  AlertCircle,
  CheckCircle2,
  Loader2,
  Plus,
  Settings,
  Shield,
  Unlink,
  Zap,
  X,
} from "lucide-react";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Integration {
  id: string;
  name: string;
  description: string;
  //eslint-disable-next-line
  icon: any;
  status: "connected" | "disconnected";
  connectedSince?: string;
  lastSync?: string;
  color: string;
  useRealIntegration?: boolean;
}

const IntegrationsPage = () => {
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const { status: contaAzulStatus, loading: contaAzulLoading, isConnected: isContaAzulConnected, disconnect: disconnectContaAzul, checkStatus } = useContaAzulIntegration();
  const [integrations, setIntegrations] = useState<Integration[]>([
    {
      id: "clicksign",
      name: "ClickSign",
      description: "Assinatura digital e autenticação",
      icon: Zap,
      status: "disconnected",
      color: "from-orange-500 to-orange-600",
    },
  ]);

  const [isConnecting, setIsConnecting] = useState(false);
  const [isDisconnecting, setIsDisconnecting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Verificar params de sucesso/erro do callback
  useEffect(() => {
    const success = searchParams.get('success');
    const error = searchParams.get('error');
    const code = searchParams.get('code');
    const state = searchParams.get('state');

    // Se recebeu code e state do Conta Azul, processar callback
    if (code && state) {
      handleContaAzulCallback(code, state);
      return;
    }

    if (success === 'conta-azul') {
      setSuccessMessage('Integração Conta Azul conectada com sucesso!');
      // Atualizar status da integração
      checkStatus();
      // Limpar URL
      window.history.replaceState({}, document.title, '/dashboard/integrations');
    }

    if (error) {
      setErrorMessage(`Erro ao conectar: ${decodeURIComponent(error)}`);
      // Limpar URL
      window.history.replaceState({}, document.title, '/dashboard/integrations');
    }
  }, [searchParams, checkStatus]);

  const handleConnectContaAzul = async () => {
    try {
      setIsConnecting(true);
      //eslint-disable-next-line
      const token = (session as any)?.user?.access_token || (session as any)?.user?.token || (session as any)?.user?.accessToken;
      await initiateOAuthFlow('conta-azul', token);
    } catch (error) {
      console.error('Erro ao conectar:', error);
      setIsConnecting(false);
    }
  };

  const handleContaAzulCallback = async (code: string, state: string) => {
    try {
      //eslint-disable-next-line
      const token = (session as any)?.user?.access_token || (session as any)?.user?.token || (session as any)?.user?.accessToken;

      if (!token) {
        throw new Error('Token não encontrado');
      }

      // Fazer requisição ao backend para processar o callback
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3333';
      const response = await fetch(
        `${apiUrl}/integrations/oauth/callback?provider=conta-azul&code=${code}&state=${state}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Erro ao conectar integração');
      }

      // Sucesso
      setSuccessMessage('Integração Conta Azul conectada com sucesso!');
      checkStatus();
      
      // Limpar URL
      window.history.replaceState({}, document.title, '/dashboard/integrations');
    } catch (error) {
      console.error('Erro ao processar callback:', error);
      setErrorMessage(error instanceof Error ? error.message : 'Erro ao conectar');
      // Limpar URL mesmo em caso de erro
      window.history.replaceState({}, document.title, '/dashboard/integrations');
    }
  };

  const handleDisconnectContaAzul = async () => {
    setIsDisconnecting(true);
    const success = await disconnectContaAzul();
    setIsDisconnecting(false);

    if (success) {
      console.log('Integração Conta Azul desconectada com sucesso');
    }
  };

  const handleConnect = (integrationId: string) => {
    setIntegrations((prev) =>
      prev.map((int) =>
        int.id === integrationId
          ? {
              ...int,
              status: "connected",
              connectedSince: new Date().toISOString().split("T")[0],
              lastSync: new Date().toISOString(),
            }
          : int
      )
    );
  };

  const handleDisconnect = (integrationId: string) => {
    setIntegrations((prev) =>
      prev.map((int) =>
        int.id === integrationId
          ? {
              ...int,
              status: "disconnected",
              connectedSince: undefined,
              lastSync: undefined,
            }
          : int
      )
    );
  };

  const connectedCount = integrations.filter(
    (i) => i.status === "connected"
  ).length + (isContaAzulConnected ? 1 : 0);

  return (
    <div className="flex flex-col h-screen w-full bg-gray-900 border-2 overflow-hidden">
      {/* Alert Messages */}
      {successMessage && (
        <div className="bg-green-900/20 border-l-4 border-green-500 p-4 mx-6 mt-6 rounded flex items-center gap-3">
          <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
          <p className="text-green-400">{successMessage}</p>
          <button
            onClick={() => setSuccessMessage(null)}
            className="ml-auto"
          >
            <X className="h-4 w-4 text-green-500 hover:text-green-400" />
          </button>
        </div>
      )}

      {errorMessage && (
        <div className="bg-red-900/20 border-l-4 border-red-500 p-4 mx-6 mt-6 rounded flex items-center gap-3">
          <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
          <p className="text-red-400">{errorMessage}</p>
          <button
            onClick={() => setErrorMessage(null)}
            className="ml-auto"
          >
            <X className="h-4 w-4 text-red-500 hover:text-red-400" />
          </button>
        </div>
      )}

      {/* Content Area */}
      <main className="flex-1 overflow-auto bg-gray-900 p-6">
        {/* Summary Stats */}
        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-gray-700 bg-gray-800 p-6">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-8 w-8 text-green-400" />
              <div>
                <p className="text-gray-400 text-sm">Integrações Conectadas</p>
                <p className="text-2xl font-bold text-white">
                  {connectedCount}
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl border border-gray-700 bg-gray-800 p-6">
            <div className="flex items-center gap-3">
              <AlertCircle className="h-8 w-8 text-yellow-400" />
              <div>
                <p className="text-gray-400 text-sm">Integrações Disponíveis</p>
                <p className="text-2xl font-bold text-white">
                  {integrations.length + 1}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Integrations Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2">
          {/* Conta Azul Integration Card */}
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
              {contaAzulLoading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-5 w-5 animate-spin text-gray-400" />
                  <span className="ml-2 text-gray-400">Carregando status...</span>
                </div>
              ) : (
                <>
                  {/* Status */}
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      {isContaAzulConnected ? (
                        <>
                          <div className="h-3 w-3 bg-green-500 rounded-full"></div>
                          <span className="text-sm font-medium text-green-400">
                            Conectado
                          </span>
                        </>
                      ) : (
                        <>
                          <div className="h-3 w-3 bg-gray-500 rounded-full"></div>
                          <span className="text-sm font-medium text-gray-400">
                            Desconectado
                          </span>
                        </>
                      )}
                    </div>

                    {/* Connection Details */}
                    {isContaAzulConnected && contaAzulStatus?.connectedAt && (
                      <div className="space-y-1 text-xs text-gray-400">
                        <p>
                          Conectado em:{" "}
                          {new Date(
                            contaAzulStatus.connectedAt
                          ).toLocaleDateString("pt-BR")}
                        </p>
                        {contaAzulStatus.lastUpdated && (
                          <p>
                            Última atualização:{" "}
                            {new Date(contaAzulStatus.lastUpdated).toLocaleString(
                              "pt-BR"
                            )}
                          </p>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    {isContaAzulConnected ? (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-700"
                          onClick={handleDisconnectContaAzul}
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
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-700"
                        >
                          <Settings className="h-4 w-4 mr-2" />
                          Configurar
                        </Button>
                      </>
                    ) : (
                      <Button
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                        onClick={handleConnectContaAzul}
                        disabled={isConnecting}
                      >
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
                </>
              )}
            </div>
          </div>

          {/* Other Integrations */}
          {integrations.map((integration) => {
            const IconComponent = integration.icon;
            return (
              <div
                key={integration.id}
                className="rounded-2xl border border-gray-700 bg-gray-800 overflow-hidden hover:border-gray-600 transition-all"
              >
                {/* Integration Header */}
                <div
                  className={`bg-gradient-to-r ${integration.color} p-6 text-white`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-white/20 rounded-lg backdrop-blur">
                        <IconComponent className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">
                          {integration.name}
                        </h3>
                        <p className="text-sm opacity-90">
                          {integration.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Integration Body */}
                <div className="p-6">
                  {/* Status */}
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      {integration.status === "connected" ? (
                        <>
                          <div className="h-3 w-3 bg-green-500 rounded-full"></div>
                          <span className="text-sm font-medium text-green-400">
                            Conectado
                          </span>
                        </>
                      ) : (
                        <>
                          <div className="h-3 w-3 bg-gray-500 rounded-full"></div>
                          <span className="text-sm font-medium text-gray-400">
                            Desconectado
                          </span>
                        </>
                      )}
                    </div>

                    {/* Connection Details */}
                    {integration.status === "connected" &&
                      integration.connectedSince && (
                        <div className="space-y-1 text-xs text-gray-400">
                          <p>
                            Conectado em:{" "}
                            {new Date(
                              integration.connectedSince
                            ).toLocaleDateString("pt-BR")}
                          </p>
                          {integration.lastSync && (
                            <p>
                              Última sincronização:{" "}
                              {new Date(integration.lastSync).toLocaleString(
                                "pt-BR"
                              )}
                            </p>
                          )}
                        </div>
                      )}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    {integration.status === "connected" ? (
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
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-700"
                        >
                          <Settings className="h-4 w-4 mr-2" />
                          Configurar
                        </Button>
                      </>
                    ) : (
                      <Button
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                        onClick={() => handleConnect(integration.id)}
                      >
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
