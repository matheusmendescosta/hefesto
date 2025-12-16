'use client';

import { Button } from '@/components/ui/button';
import { useSidebar } from '@/components/ui/sidebar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ChevronDown, ChevronRight, Edit2, Eye, FileText, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';

interface Client {
  id: string;
  name: string;
  email: string;
  document: string | null;
  phone: string | null;
  address: string | null;
  createdAt: string;
  updatedAt: string;
}

interface QuoteItem {
  id: string;
  quoteId: string;
  productId: string | null;
  serviceId: string | null;
  description: string;
  quantity: number;
  unitPrice: string;
  total: string;
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  service: any | null;
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  product: any | null;
}

interface Quote {
  id: string;
  number: number;
  status: 'DRAFT' | 'SENT' | 'APPROVED' | 'REJECTED' | 'PENDING';
  validUntil: string | null;
  clientId: string;
  signedAt: string | null;
  signatureIp: string;
  notes: string;
  totalValue: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  client: Client;
  items: QuoteItem[];
}

const QuotesPage = () => {
  const { toggleSidebar, open } = useSidebar();
  const [expandedQuote, setExpandedQuote] = useState<string | null>(null);

  // Dados de exemplo (substitua com dados do backend)
  const quotes: Quote[] = [
    {
      id: 'c9964145-577a-400f-8af8-d31ee2ac104d',
      number: 235,
      status: 'SENT',
      validUntil: null,
      clientId: '4e7b5fcd-80e4-48e1-a231-99d887a741e4',
      signedAt: null,
      signatureIp: '192.168.2.1',
      notes: 'Orçamento para pequena empresa, plano com dois agentes com IA avançada + Armazenamento Extra + Telefonia',
      totalValue: '900',
      createdAt: '2025-12-16T16:36:30.944Z',
      updatedAt: '2025-12-16T16:36:30.944Z',
      userId: '72048592-2492-49fc-a353-c616fb465d23',
      client: {
        id: '4e7b5fcd-80e4-48e1-a231-99d887a741e4',
        name: 'Lucas',
        email: 'lucas@dev.com',
        document: null,
        phone: null,
        address: null,
        createdAt: '2025-12-16T16:33:08.114Z',
        updatedAt: '2025-12-16T16:33:08.114Z',
      },
      items: [
        {
          id: '013956ea-45ad-47d1-b58d-5f3539a9597b',
          quoteId: 'c9964145-577a-400f-8af8-d31ee2ac104d',
          productId: 'f298e138-d832-4720-a0cf-004fbdc88033',
          serviceId: null,
          description: 'Telefonia',
          quantity: 1,
          unitPrice: '350',
          total: '350',
          service: null,
          product: {
            id: 'f298e138-d832-4720-a0cf-004fbdc88033',
            name: 'Telefonia',
          },
        },
        {
          id: '1f147d96-d9b8-45bd-a349-6f6157946e63',
          quoteId: 'c9964145-577a-400f-8af8-d31ee2ac104d',
          productId: 'bc571978-ead8-4b92-8e92-cfa40d482d98',
          serviceId: null,
          description: 'Armazenamento Extra',
          quantity: 1,
          unitPrice: '200',
          total: '200',
          service: null,
          product: {
            id: 'bc571978-ead8-4b92-8e92-cfa40d482d98',
            name: 'Armazenamento Extra',
          },
        },
        {
          id: 'a40bc581-3a61-43b6-a6cf-c0bcd596f25d',
          quoteId: 'c9964145-577a-400f-8af8-d31ee2ac104d',
          productId: null,
          serviceId: '4a2edc17-9ff9-486f-843c-e1f5e38a8086',
          description: 'Plano Omnichanel 2 Agentes',
          quantity: 1,
          unitPrice: '350',
          total: '350',
          service: {
            id: '4a2edc17-9ff9-486f-843c-e1f5e38a8086',
            name: 'Plano com 2 agentes',
          },
          product: null,
        },
      ],
    },
  ];

  const toggleExpand = (quoteId: string) => {
    setExpandedQuote(expandedQuote === quoteId ? null : quoteId);
  };

  const getStatusColor = (status: Quote['status']) => {
    const statusMap: Record<Quote['status'], string> = {
      DRAFT: 'bg-gray-900 text-gray-200',
      SENT: 'bg-blue-900 text-blue-200',
      APPROVED: 'bg-green-900 text-green-200',
      PENDING: 'bg-yellow-900 text-yellow-200',
      REJECTED: 'bg-red-900 text-red-200',
    };
    return statusMap[status];
  };

  const getStatusText = (status: Quote['status']) => {
    const statusMap: Record<Quote['status'], string> = {
      DRAFT: 'Rascunho',
      SENT: 'Enviado',
      APPROVED: 'Aprovado',
      PENDING: 'Pendente',
      REJECTED: 'Rejeitado',
    };
    return statusMap[status];
  };

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
              {open ? <ChevronRight className="h-5 w-5" /> : <FileText className="h-5 w-5" />}
            </Button>
            <div className="border-l border-gray-700 pl-4">
              <h1 className="text-xl font-semibold text-white">Orçamentos</h1>
              <p className="text-sm text-gray-500 mt-1">Gestão de orçamentos e propostas comerciais</p>
            </div>
          </div>
          <Button className="gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium transition-all shadow-lg hover:shadow-blue-500/50">
            <Plus className="h-4 w-4" />
            Novo Orçamento
          </Button>
        </div>
      </header>

      {/* Content Area */}
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
                <TableHead className="text-gray-300 text-center">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {quotes.map((quote) => (
                <>
                  <TableRow className="border-b border-gray-700 hover:bg-gray-750" key={quote.id}>
                    <TableCell className="text-gray-300 w-12">
                      <Button variant="ghost" size="sm" onClick={() => toggleExpand(quote.id)} className="text-gray-300 hover:text-white">
                        <ChevronDown className={`h-5 w-5 transition-transform ${expandedQuote === quote.id ? 'rotate-180' : ''}`} />
                      </Button>
                    </TableCell>
                    <TableCell className="font-semibold text-white">#{quote.number}</TableCell>
                    <TableCell className="font-medium text-white">
                      <div>
                        <p>{quote.client.name}</p>
                        <p className="text-xs text-gray-400">{quote.client.email}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(quote.status)}`}>
                        {getStatusText(quote.status)}
                      </span>
                    </TableCell>
                    <TableCell className="font-semibold text-white">R$ {parseFloat(quote.totalValue).toFixed(2)}</TableCell>
                    <TableCell className="text-sm text-gray-400">{quote.items.length} item(ns)</TableCell>
                    <TableCell className="text-sm text-gray-400">{new Date(quote.createdAt).toLocaleDateString('pt-BR')}</TableCell>
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
                        <Button variant="ghost" size="sm" className="text-red-400 hover:bg-gray-700 hover:text-red-300" title="Deletar">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>

                  {/* Expandable Row - Itens do Orçamento */}
                  {expandedQuote === quote.id && (
                    <TableRow className="border-b border-gray-700 hover:bg-gray-750">
                      <TableCell colSpan={8} className="bg-gray-750 p-4">
                        <div>
                          <div className="mb-4 p-3 bg-gray-800 rounded-lg border border-gray-700">
                            <p className="text-sm text-gray-400 mb-1">
                              <span className="font-medium">Notas:</span> {quote.notes}
                            </p>
                          </div>

                          <h4 className="font-semibold text-white mb-3">Itens do Orçamento:</h4>
                          <div className="space-y-2">
                            {quote.items.map((item, index) => (
                              <div key={item.id} className="p-3 bg-gray-800 rounded-lg border border-gray-700">
                                <div className="flex items-start justify-between">
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                      <p className="text-sm font-medium text-white">
                                        {index + 1}. {item.description}
                                      </p>
                                      <span className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded">
                                        {item.product ? 'Produto' : 'Serviço'}
                                      </span>
                                    </div>
                                    <p className="text-xs text-gray-400">{item.product?.name || item.service?.name}</p>
                                  </div>
                                  <div className="text-right min-w-fit ml-4">
                                    <p className="text-xs text-gray-400 mb-1">
                                      {item.quantity} x R$ {parseFloat(item.unitPrice).toFixed(2)}
                                    </p>
                                    <p className="text-sm font-semibold text-white">R$ {parseFloat(item.total).toFixed(2)}</p>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>

                          <div className="mt-4 p-3 bg-gray-800 rounded-lg border border-blue-700 flex items-center justify-between">
                            <p className="font-semibold text-white">Valor Total do Orçamento:</p>
                            <p className="text-lg font-bold text-blue-400">R$ {parseFloat(quote.totalValue).toFixed(2)}</p>
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
