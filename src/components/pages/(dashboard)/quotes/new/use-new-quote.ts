import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface ServiceOption {
  id: string;
  name: string;
  price: number;
}

interface ProductOption {
  id: string;
  name: string;
  price: number;
}

interface QuoteService {
  id: string;
  name: string;
  description?: string;
  price: number;
  quantity: number;
  selectedOptions?: ServiceOption[];
}

interface QuoteProduct {
  id: string;
  name: string;
  description?: string;
  price: number;
  quantity: number;
  selectedOptions?: ProductOption[];
}

export interface QuoteItem {
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
  productId?: string;
  serviceId?: string;
  selectedOptionIds?: string[];
}

export interface QuoteFormData {
  number: number;
  totalValue: number;
  clientId?: string;
  client?: {
    name: string;
    email: string;
  };
  items: QuoteItem[];
}

export const useNewQuote = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const submitQuote = async (quoteData: QuoteFormData) => {
    console.log("data quote", quoteData);

    if (!session || !session.user) {
      setApiError("Sessão expirada. Por favor, faça login novamente.");
      return false;
    }

    setIsSubmitting(true);
    setApiError(null);

    try {
      const payload = {
        number: quoteData.number,
        totalValue: quoteData.totalValue,
        client: quoteData.client,
        items: quoteData.items,
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/quotes`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${session.user.access_token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        try {
          const errorData = await response.json();
          const errorMessage = errorData.message || "Erro ao criar orçamento";
          setApiError(errorMessage);
        } catch {
          setApiError("Erro ao criar orçamento. Tente novamente.");
        }
        return false;
      }

      // Tentar parsear JSON da resposta, mas não falhar se vazio
      let result = null;
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const text = await response.text();
        if (text) {
          result = JSON.parse(text);
        }
      }

      console.log("Orçamento criado com sucesso:", result);

      // Redirecionar para página de orçamentos
      router.push("/quotes");
      return true;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Erro desconhecido";
      setApiError(errorMessage);
      console.error("Erro ao criar orçamento:", err);
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    submitQuote,
    isSubmitting,
    apiError,
  };
};
