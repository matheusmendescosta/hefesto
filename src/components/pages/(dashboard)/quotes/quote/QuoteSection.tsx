"use client";

import { Quote } from "@/dto/user";
import { useQuote } from "./use-quote";

type QuoteSectionProps = {
  quoteId: string;
};

const QuoteSection = ({ quoteId }: QuoteSectionProps) => {
  const { quote, isLoading, error } = useQuote(quoteId);

  const getStatusColor = (status: Quote["status"]) => {
    const statusMap: Record<Quote["status"], string> = {
      DRAFT: "bg-gray-900 text-gray-200",
      SENT: "bg-blue-900 text-blue-200",
      APPROVED: "bg-green-900 text-green-200",
      PENDING: "bg-yellow-900 text-yellow-200",
      REJECTED: "bg-red-900 text-red-200",
    };
    return statusMap[status];
  };

  const getStatusText = (status: Quote["status"]) => {
    const statusMap: Record<Quote["status"], string> = {
      DRAFT: "Rascunho",
      SENT: "Enviado",
      APPROVED: "Aprovado",
      PENDING: "Pendente",
      REJECTED: "Rejeitado",
    };
    return statusMap[status];
  };

  if (isLoading) {
    return (
      <div className="flex flex-col h-screen w-full bg-gray-900 overflow-hidden justify-center items-center">
        <p className="text-gray-300">Carregando orçamento...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col h-screen w-full bg-gray-900 overflow-hidden justify-center items-center">
        <p className="text-red-400">
          Erro ao carregar orçamento: {error.message}
        </p>
      </div>
    );
  }

  if (!quote) {
    return (
      <div className="flex flex-col h-screen w-full bg-gray-900 overflow-hidden justify-center items-center">
        <p className="text-gray-300">Orçamento não encontrado</p>
      </div>
    );
  }
  console.log(quote);
  return (
    <div className="flex flex-col h-screen w-full bg-gray-900 overflow-hidden">
      <main className="flex-1 overflow-auto bg-gray-900 p-8">
        <div className="max-w-6xl mx-auto">
          {/* Cabeçalho com Status */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold text-white">
                Orçamento #{quote.number}
              </h1>
              <p className="text-gray-400 text-sm mt-1">
                Criado em{" "}
                {new Date(quote.createdAt).toLocaleDateString("pt-BR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
            <span
              className={`inline-block px-6 py-3 rounded-full text-sm font-semibold ${getStatusColor(
                quote.status
              )}`}
            >
              {getStatusText(quote.status)}
            </span>
          </div>

          {/* Grid: Cliente e Info */}
          <div className="grid grid-cols-3 gap-6 mb-8">
            {/* Informações do Cliente */}
            <div className="col-span-2 rounded-xl border border-gray-700 bg-gray-800 p-6">
              <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-4">
                Cliente
              </h2>
              <div className="space-y-4">
                <div>
                  <p className="text-gray-400 text-xs mb-1">Nome</p>
                  <p className="text-white text-xl font-semibold">
                    {quote.client?.name}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-400 text-xs mb-1">Email</p>
                    <p className="text-gray-200">{quote.client?.email}</p>
                  </div>
                  {quote.client?.phone && (
                    <div>
                      <p className="text-gray-400 text-xs mb-1">Telefone</p>
                      <p className="text-gray-200">{quote.client.phone}</p>
                    </div>
                  )}
                </div>
                {quote.client?.document && (
                  <div>
                    <p className="text-gray-400 text-xs mb-1">Documento</p>
                    <p className="text-gray-200">{quote.client.document}</p>
                  </div>
                )}
                {quote.client?.address && (
                  <div>
                    <p className="text-gray-400 text-xs mb-1">Endereço</p>
                    <p className="text-gray-200">{quote.client.address}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Datas e Validade */}
            <div className="rounded-xl border border-gray-700 bg-gray-800 p-6">
              <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-4">
                Datas
              </h2>
              <div className="space-y-4">
                <div>
                  <p className="text-gray-400 text-xs mb-1">Criado</p>
                  <p className="text-gray-200 text-sm">
                    {new Date(quote.createdAt).toLocaleDateString("pt-BR")}
                  </p>
                </div>
                {quote.validUntil && (
                  <div>
                    <p className="text-gray-400 text-xs mb-1">Válido até</p>
                    <p className="text-gray-200 text-sm">
                      {new Date(quote.validUntil).toLocaleDateString("pt-BR")}
                    </p>
                  </div>
                )}
                {quote.signedAt && (
                  <div>
                    <p className="text-gray-400 text-xs mb-1">Assinado</p>
                    <p className="text-gray-200 text-sm">
                      {new Date(quote.signedAt).toLocaleDateString("pt-BR")}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Notas (se existir) */}
          {quote.notes && (
            <div className="rounded-xl border border-blue-700 bg-blue-900 bg-opacity-20 p-6 mb-8">
              <p className="text-sm font-semibold text-blue-400 uppercase tracking-wide mb-2">
                Notas
              </p>
              <p className="text-gray-200">{quote.notes}</p>
            </div>
          )}

          {/* Itens */}
          <div className="mb-8">
            <h2 className="text-lg font-bold text-white mb-4">
              Itens do Orçamento
            </h2>
            <div className="space-y-3">
              {quote.items.map((item, index) => (
                <div
                  key={item.id}
                  className="rounded-lg border border-gray-700 bg-gray-800 p-5 hover:bg-gray-750 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white text-sm font-semibold">
                          {index + 1}
                        </span>
                        <div>
                          <p className="text-white font-semibold">
                            {item.description}
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            {item.productId ? "📦 Produto" : "🛠️ Serviço"}
                          </p>
                        </div>
                      </div>

                      {/* Opções Selecionadas */}
                      {item.selectedOptions &&
                        item.selectedOptions.length > 0 && (
                          <div className="mt-3 ml-11 space-y-1">
                            {item.selectedOptions.map((option) => (
                              <p
                                key={option.id}
                                className="text-xs text-gray-400"
                              >
                                ✓ {option.name}{" "}
                                <span className="text-blue-400">
                                  +R$ {parseFloat(option.price).toFixed(2)}
                                </span>
                              </p>
                            ))}
                          </div>
                        )}
                    </div>

                    <div className="text-right ml-4 min-w-fit">
                      <p className="text-xs text-gray-400 mb-2">
                        {item.quantity}x R${" "}
                        {parseFloat(item.unitPrice).toFixed(2)}
                      </p>
                      <p className="text-xl font-bold text-blue-400">
                        R$ {parseFloat(item.total).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Resumo Total */}
          <div className="flex items-end justify-end gap-4">
            <p className="text-gray-400">Total</p>
            <p className="text-xl font-bold text-white">
              R$ {parseFloat(quote.totalValue).toFixed(2)}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default QuoteSection;
