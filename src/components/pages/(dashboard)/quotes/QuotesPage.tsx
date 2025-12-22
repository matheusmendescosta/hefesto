"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Quote } from "@/dto/user";
import {
  ChevronDown,
  Edit2,
  Eye,
  Trash2
} from "lucide-react";
import { useState } from "react";
import { useQuotes } from "./use-quotes";

const QuotesPage = () => {
  const [expandedQuote, setExpandedQuote] = useState<string | null>(null);

  const { quotes, isLoading, error } = useQuotes();

  const toggleExpand = (quoteId: string) => {
    setExpandedQuote(expandedQuote === quoteId ? null : quoteId);
  };

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

  console.log("Quotes:", quotes);

  if (isLoading) {
    return (
      <div className="flex flex-col h-screen w-full bg-gray-900 border-2 overflow-hidden justify-center items-center">
        <p className="text-gray-300">Carregando orçamentos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col h-screen w-full bg-gray-900 border-2 overflow-hidden justify-center items-center">
        <p className="text-red-400">Erro ao carregar orçamentos: {error.message}</p>
      </div>
    );
  }

  if (quotes.length === 0) {
    return (
      <div className="flex flex-col h-screen w-full bg-gray-900 border-2 overflow-hidden justify-center items-center">
        <p className="text-gray-300">Nenhum orçamento encontrado</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen w-full bg-gray-900 border-2 overflow-hidden">
      <main className="flex-1 overflow-auto bg-gray-900 p-6">
        <div className="w-full rounded-2xl border border-gray-700 bg-gray-800 overflow-hidden">
          <Table className="w-full">
            <TableHeader className="bg-gray-750 hover:bg-gray-750">
              <TableRow className="border-b border-gray-700 hover:bg-gray-750">
                <TableHead className="text-gray-300 w-12"></TableHead>
                <TableHead className="text-gray-300">Nº Orçamento</TableHead>
                <TableHead className="text-gray-300">Cliente</TableHead>
                <TableHead className="text-gray-300">Status</TableHead>
                <TableHead className="text-gray-300">Valor Total</TableHead>
                <TableHead className="text-gray-300">Itens</TableHead>
                <TableHead className="text-gray-300">Criado em</TableHead>
                <TableHead className="text-gray-300 text-center">
                  Ações
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {quotes.map((quote) => (
                <>
                  <TableRow
                    className="border-b border-gray-700 hover:bg-gray-750"
                    key={quote.id}
                  >
                    <TableCell className="text-gray-300 w-12">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleExpand(quote.id)}
                        className="text-gray-300 hover:text-white"
                      >
                        <ChevronDown
                          className={`h-5 w-5 transition-transform ${
                            expandedQuote === quote.id ? "rotate-180" : ""
                          }`}
                        />
                      </Button>
                    </TableCell>
                    <TableCell className="font-semibold text-white">
                      #{quote.number}
                    </TableCell>
                    <TableCell className="font-medium text-white">
                      <div>
                        <p>{quote.client.name}</p>
                        <p className="text-xs text-gray-400">
                          {quote.client.email}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          quote.status
                        )}`}
                      >
                        {getStatusText(quote.status)}
                      </span>
                    </TableCell>
                    <TableCell className="font-semibold text-white">
                      R$ {parseFloat(quote.totalValue).toFixed(2)}
                    </TableCell>
                    <TableCell className="text-sm text-gray-400">
                      {quote.items.length} item(ns)
                    </TableCell>
                    <TableCell className="text-sm text-gray-400">
                      {new Date(quote.createdAt).toLocaleDateString("pt-BR")}
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex gap-2 justify-center">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-blue-400 hover:bg-gray-700 hover:text-blue-300"
                          title="Visualizar"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-yellow-400 hover:bg-gray-700 hover:text-yellow-300"
                          title="Editar"
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-400 hover:bg-gray-700 hover:text-red-300"
                          title="Deletar"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>

                  {expandedQuote === quote.id && (
                    <TableRow className="border-b border-gray-700 hover:bg-gray-750">
                      <TableCell colSpan={8} className="bg-gray-750 p-4">
                        <div>
                          <div className="mb-4 p-3 bg-gray-800 rounded-lg border border-gray-700">
                            <p className="text-sm text-gray-400 mb-1">
                              <span className="font-medium">Notas:</span>{" "}
                              {quote.notes}
                            </p>
                          </div>

                          <h4 className="font-semibold text-white mb-3">
                            Itens do Orçamento:
                          </h4>
                          <div className="space-y-2">
                            {quote.items.map((item, index) => (
                              <div
                                key={item.id}
                                className="p-3 bg-gray-800 rounded-lg border border-gray-700"
                              >
                                <div className="flex items-start justify-between">
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                      <p className="text-sm font-medium text-white">
                                        {index + 1}. {item.description}
                                      </p>
                                      <span className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded">
                                        {item.product ? "Produto" : "Serviço"}
                                      </span>
                                    </div>
                                    <p className="text-xs text-gray-400">
                                      {item.product?.name || item.service?.name}
                                    </p>
                                  </div>
                                  <div className="text-right min-w-fit ml-4">
                                    <p className="text-xs text-gray-400 mb-1">
                                      {item.quantity} x R${" "}
                                      {parseFloat(item.unitPrice).toFixed(2)}
                                    </p>
                                    <p className="text-sm font-semibold text-white">
                                      R$ {parseFloat(item.total).toFixed(2)}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>

                          <div className="mt-4 p-3 bg-gray-800 rounded-lg border border-blue-700 flex items-center justify-between">
                            <p className="font-semibold text-white">
                              Valor Total do Orçamento:
                            </p>
                            <p className="text-lg font-bold text-blue-400">
                              R$ {parseFloat(quote.totalValue).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </>
              ))}
            </TableBody>
          </Table>
        </div>
      </main>
    </div>
  );
};

export default QuotesPage;
