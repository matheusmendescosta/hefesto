/**
 * Utilitários para gerenciar fluxos OAuth
 */

export const OAUTH_PROVIDERS = {
  conta_azul: 'conta-azul',
  asaas: 'asaas',
  contractor: 'contractor',
  clicksign: 'clicksign',
} as const;

export type OAuthProvider = (typeof OAUTH_PROVIDERS)[keyof typeof OAUTH_PROVIDERS];

/**
 * Inicia o fluxo de autorização OAuth
 * @param provider - Provider OAuth (conta-azul, asaas, etc)
 * @param token - Token JWT (opcional, será obtido do next-auth se não fornecido)
 */
export async function initiateOAuthFlow(provider: OAuthProvider, token?: string): Promise<void> {
  try {
    let authToken = token;

    // Se não foi fornecido um token, tentar pegar do next-auth dinamicamente
    if (!authToken) {
      try {
        const { getSession } = await import('next-auth/react');
        const session = await getSession();

        if (!session || !session.user) {
          throw new Error('Usuário não autenticado');
        }

        // Tenta pegar o token da sessão (pode variar conforme configuração)
        //eslint-disable-next-line
        authToken = (session as any).user?.sub || (session as any).user?.sub;

        if (!authToken) {
          console.warn('Token não encontrado na sessão do next-auth, tentando fallback...');
          // Fallback: tentar pegar do localStorage
          authToken = localStorage.getItem('jwtToken') || undefined;
        }
      } catch {
        // Se next-auth não estiver disponível, tentar localStorage
        authToken = localStorage.getItem('jwtToken') || undefined;
      }
    }

    if (!authToken) {
      throw new Error('Usuário não autenticado. Token não encontrado.');
    }

    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3333';
    const authorizeUrl = `${apiUrl}/integrations/oauth/authorize?provider=${provider}`;

    const response = await fetch(authorizeUrl, {
      headers: {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Erro ao iniciar fluxo OAuth');
    }

    const data = await response.json();

    // Se a resposta tem uma URL, abrir em nova guia
    if (data.authorizationUrl) {
      window.open(data.authorizationUrl, '_blank', 'width=500,height=600');
    } else if (data.redirectUrl) {
      window.open(data.redirectUrl, '_blank', 'width=500,height=600');
    } else {
      throw new Error('URL de autorização não encontrada na resposta');
    }
  } catch (error) {
    console.error('Erro ao iniciar fluxo OAuth:', error);
    throw error;
  }
}

/**
 * Obtém o token de autenticação (next-auth ou localStorage)
 * Útil para usar em hooks
 */
export async function getAuthToken(): Promise<string | null> {
  try {
    // Tentar pegar do next-auth
    try {
      const { getSession } = await import('next-auth/react');
      const session = await getSession();

      if (session) {
        //eslint-disable-next-line
        const token = (session as any).user?.token || (session as any).user?.accessToken;
        if (token) return token;
      }
    } catch {
      // next-auth não disponível
    }

    // Fallback para localStorage
    return localStorage.getItem('jwtToken');
  } catch {
    return null;
  }
}
export function getOAuthCallbackParams(): {
  provider?: string;
  code?: string;
  state?: string;
  error?: string;
} {
  if (typeof window === 'undefined') return {};

  const params = new URLSearchParams(window.location.search);

  return {
    provider: params.get('provider') ?? undefined,
    code: params.get('code') ?? undefined,
    state: params.get('state') ?? undefined,
    error: params.get('error') ?? undefined,
  };
}

/**
 * Limpa os parâmetros de callback da URL
 */
export function clearOAuthCallbackParams(): void {
  if (typeof window === 'undefined') return;

  // Limpar a URL sem fazer reload
  window.history.replaceState({}, document.title, window.location.pathname);
}

/**
 * Aguarda o processamento do callback
 * Retorna true se foi bem-sucedido, false se houve erro
 */
export async function waitForOAuthCompletion(timeoutMs: number = 5000): Promise<boolean> {
  return new Promise((resolve) => {
    const startTime = Date.now();

    const checkCompletion = async () => {
      try {
        const jwtToken = localStorage.getItem('jwtToken');
        if (!jwtToken) {
          resolve(false);
          return;
        }

        const params = getOAuthCallbackParams();
        if (!params.provider) {
          resolve(true); // Callback foi processado e URL limpada
          return;
        }

        if (Date.now() - startTime > timeoutMs) {
          resolve(false); // Timeout
          return;
        }

        setTimeout(checkCompletion, 500);
      } catch {
        resolve(false);
      }
    };

    checkCompletion();
  });
}
