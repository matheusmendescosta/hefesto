import { useState, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';

interface IntegrationStatus {
  connected: boolean;
  provider: string;
  providerUserId?: string;
  connectedAt?: string;
  lastUpdated?: string;
}

export function useContaAzulIntegration(enabled: boolean = true) {
  const { data: session } = useSession();
  const [status, setStatus] = useState<IntegrationStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const checkStatus = useCallback(async () => {
    if (!enabled) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      //eslint-disable-next-line
      const jwtToken = (session as any)?.user?.token || (session as any)?.user?.accessToken;

      if (!jwtToken) {
        setError('Usuário não autenticado');
        setStatus(null);
        setLoading(false);
        return;
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3333'}/integrations/oauth/status?provider=conta-azul`,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
            'Content-Type': 'application/json',
          },
        },
      );

      if (!response.ok) {
        throw new Error('Erro ao verificar status da integração');
      }

      const data = await response.json();
      setStatus(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
      setStatus(null);
    } finally {
      setLoading(false);
    }
  }, [enabled, session]);

  useEffect(() => {
    checkStatus();

    // Verificar status a cada 5 segundos
    const interval = setInterval(checkStatus, 5000);

    return () => clearInterval(interval);
  }, [checkStatus]);

  const disconnect = useCallback(async () => {
    try {
      //eslint-disable-next-line
      const jwtToken = (session as any)?.user?.token || (session as any)?.user?.accessToken;

      if (!jwtToken) {
        throw new Error('Usuário não autenticado');
      }

      // Implemente o endpoint de desconexão no backend
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3333'}/integrations/oauth/disconnect?provider=conta-azul`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${jwtToken}`,
            'Content-Type': 'application/json',
          },
        },
      );

      if (!response.ok) {
        throw new Error('Erro ao desconectar integração');
      }

      // Atualizar status localmente
      setStatus({ connected: false, provider: 'conta-azul' });
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao desconectar');
      return false;
    }
  }, [session]);

  return {
    status,
    loading,
    error,
    isConnected: status?.connected ?? false,
    checkStatus,
    disconnect,
  };
}
