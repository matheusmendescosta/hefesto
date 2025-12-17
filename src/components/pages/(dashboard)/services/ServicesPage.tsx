'use client';

import Link from 'next/link';
import { useSidebar } from '@/components/ui/sidebar';
import { ChevronRight, LayoutDashboard, Wrench, Plus, Edit2, Trash2, Eye, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useState } from 'react';

interface ServiceOption {
  id: string;
  name: string;
  description: string;
  price: string;
  selected: boolean;
  serviceId: string;
  createdAt: string;
  updatedAt: string;
}

interface Service {
  id: string;
  name: string;
  description: string | null;
  price: string;
  createdAt: string;
  updatedAt: string;
  serviceOptions: ServiceOption[];
}

const ServicesPage = () => {
  const { toggleSidebar, open } = useSidebar();
  const [expandedService, setExpandedService] = useState<string | null>(null);

  // Dados de exemplo (substitua com dados do backend)
  const services: Service[] = [
    {
      id: '4a2edc17-9ff9-486f-843c-e1f5e38a8086',
      name: 'Plano com 2 agentes',
      description: null,
      price: '350',
      createdAt: '2025-12-16T16:07:52.453Z',
      updatedAt: '2025-12-16T16:07:52.453Z',
      serviceOptions: [
        {
          id: 'ee9e9adb-9aae-4a66-859f-56cee2388885',
          name: 'IA Basica',
          description: 'IA Basica',
          price: '0',
          selected: false,
          serviceId: '4a2edc17-9ff9-486f-843c-e1f5e38a8086',
          createdAt: '2025-12-16T16:07:52.453Z',
          updatedAt: '2025-12-16T16:07:52.453Z',
        },
        {
          id: '8ebbbe8b-6fb2-499d-bfac-08a8fcda2d5d',
          name: 'IA Avançada',
          description: 'IA Avançada',
          price: '75',
          selected: false,
          serviceId: '4a2edc17-9ff9-486f-843c-e1f5e38a8086',
          createdAt: '2025-12-16T16:07:52.453Z',
          updatedAt: '2025-12-16T16:07:52.453Z',
        },
      ],
    },
    {
      id: '4a2edc17-9ff9-486f-843c-e1f5e38a9089',
      name: 'Plano com 3 agentes',
      description: null,
      price: '400',
      createdAt: '2025-12-16T16:07:52.453Z',
      updatedAt: '2025-12-16T16:07:52.453Z',
      serviceOptions: [
        {
          id: 'ee9e9adb-9aae-4a66-859f-56cee2388886',
          name: 'IA Basica',
          description: 'IA Basica',
          price: '0',
          selected: false,
          serviceId: '4a2edc17-9ff9-486f-843c-e1f5e38a9089',
          createdAt: '2025-12-16T16:07:52.453Z',
          updatedAt: '2025-12-16T16:07:52.453Z',
        },
        {
          id: '8ebbbe8b-6fb2-499d-bfac-08a8fcda2d5e',
          name: 'IA Avançada',
          description: 'IA Avançada',
          price: '75',
          selected: false,
          serviceId: '4a2edc17-9ff9-486f-843c-e1f5e38a9089',
          createdAt: '2025-12-16T16:07:52.453Z',
          updatedAt: '2025-12-16T16:07:52.453Z',
        },
        {
          id: '8ebbbe8b-6fb2-499d-bfac-08a8fcda2d5e',
          name: 'Filas',
          description: 'Filas',
          price: '30',
          selected: false,
          serviceId: '4a2edc17-9ff9-486f-843c-e1f5e38a9089',
          createdAt: '2025-12-16T16:07:52.453Z',
          updatedAt: '2025-12-16T16:07:52.453Z',
        },
        {
          id: '8ebbbe8b-6fb2-499d-bfac-08a8fcda2d5e',
          name: 'Supervisor',
          description: 'Supervisor',
          price: '30',
          selected: false,
          serviceId: '4a2edc17-9ff9-486f-843c-e1f5e38a9089',
          createdAt: '2025-12-16T16:07:52.453Z',
          updatedAt: '2025-12-16T16:07:52.453Z',
        },
      ],
    },
    {
      id: '4a2edc17-9ff9-486f-843c-e1f5e38a9090',
      name: 'Plano com 4 agentes',
      description: null,
      price: '450',
      createdAt: '2025-12-16T16:07:52.453Z',
      updatedAt: '2025-12-16T16:07:52.453Z',
      serviceOptions: [
        {
          id: 'ee9e9adb-9aae-4a66-859f-56cee2388887',
          name: 'IA Basica',
          description: 'IA Basica',
          price: '0',
          selected: false,
          serviceId: '4a2edc17-9ff9-486f-843c-e1f5e38a9090',
          createdAt: '2025-12-16T16:07:52.453Z',
          updatedAt: '2025-12-16T16:07:52.453Z',
        },
        {
          id: '8ebbbe8b-6fb2-499d-bfac-08a8fcda2d5f',
          name: 'IA Avançada',
          description: 'IA Avançada',
          price: '75',
          selected: false,
          serviceId: '4a2edc17-9ff9-486f-843c-e1f5e38a9090',
          createdAt: '2025-12-16T16:07:52.453Z',
          updatedAt: '2025-12-16T16:07:52.453Z',
        },
      ],
    },
    {
      id: '4a2edc17-9ff9-486f-843c-e1f5e38a9091',
      name: 'Plano com 5 agentes',
      description: null,
      price: '500',
      createdAt: '2025-12-16T16:07:52.453Z',
      updatedAt: '2025-12-16T16:07:52.453Z',
      serviceOptions: [
        {
          id: 'ee9e9adb-9aae-4a66-859f-56cee2388888',
          name: 'IA Basica',
          description: 'IA Basica',
          price: '0',
          selected: false,
          serviceId: '4a2edc17-9ff9-486f-843c-e1f5e38a9091',
          createdAt: '2025-12-16T16:07:52.453Z',
          updatedAt: '2025-12-16T16:07:52.453Z',
        },
        {
          id: '8ebbbe8b-6fb2-499d-bfac-08a8fcda2d60',
          name: 'IA Avançada',
          description: 'IA Avançada',
          price: '75',
          selected: false,
          serviceId: '4a2edc17-9ff9-486f-843c-e1f5e38a9091',
          createdAt: '2025-12-16T16:07:52.453Z',
          updatedAt: '2025-12-16T16:07:52.453Z',
        },
      ],
    },
    {
      id: '4a2edc17-9ff9-486f-843c-e1f5e38a9092',
      name: 'Plano com 6 agentes',
      description: null,
      price: '550',
      createdAt: '2025-12-16T16:07:52.453Z',
      updatedAt: '2025-12-16T16:07:52.453Z',
      serviceOptions: [
        {
          id: 'ee9e9adb-9aae-4a66-859f-56cee2388889',
          name: 'IA Basica',
          description: 'IA Basica',
          price: '0',
          selected: false,
          serviceId: '4a2edc17-9ff9-486f-843c-e1f5e38a9092',
          createdAt: '2025-12-16T16:07:52.453Z',
          updatedAt: '2025-12-16T16:07:52.453Z',
        },
        {
          id: '8ebbbe8b-6fb2-499d-bfac-08a8fcda2d61',
          name: 'IA Avançada',
          description: 'IA Avançada',
          price: '75',
          selected: false,
          serviceId: '4a2edc17-9ff9-486f-843c-e1f5e38a9092',
          createdAt: '2025-12-16T16:07:52.453Z',
          updatedAt: '2025-12-16T16:07:52.453Z',
        },
      ],
    },
    {
      id: '4a2edc17-9ff9-486f-843c-e1f5e38a9093',
      name: 'Plano com 7 agentes',
      description: null,
      price: '600',
      createdAt: '2025-12-16T16:07:52.453Z',
      updatedAt: '2025-12-16T16:07:52.453Z',
      serviceOptions: [
        {
          id: 'ee9e9adb-9aae-4a66-859f-56cee2388890',
          name: 'IA Basica',
          description: 'IA Basica',
          price: '0',
          selected: false,
          serviceId: '4a2edc17-9ff9-486f-843c-e1f5e38a9093',
          createdAt: '2025-12-16T16:07:52.453Z',
          updatedAt: '2025-12-16T16:07:52.453Z',
        },
        {
          id: '8ebbbe8b-6fb2-499d-bfac-08a8fcda2d62',
          name: 'IA Avançada',
          description: 'IA Avançada',
          price: '75',
          selected: false,
          serviceId: '4a2edc17-9ff9-486f-843c-e1f5e38a9093',
          createdAt: '2025-12-16T16:07:52.453Z',
          updatedAt: '2025-12-16T16:07:52.453Z',
        },
      ],
    },
    {
      id: '4a2edc17-9ff9-486f-843c-e1f5e38a9094',
      name: 'Plano com 8 agentes',
      description: null,
      price: '650',
      createdAt: '2025-12-16T16:07:52.453Z',
      updatedAt: '2025-12-16T16:07:52.453Z',
      serviceOptions: [
        {
          id: 'ee9e9adb-9aae-4a66-859f-56cee2388891',
          name: 'IA Basica',
          description: 'IA Basica',
          price: '0',
          selected: false,
          serviceId: '4a2edc17-9ff9-486f-843c-e1f5e38a9094',
          createdAt: '2025-12-16T16:07:52.453Z',
          updatedAt: '2025-12-16T16:07:52.453Z',
        },
        {
          id: '8ebbbe8b-6fb2-499d-bfac-08a8fcda2d63',
          name: 'IA Avançada',
          description: 'IA Avançada',
          price: '75',
          selected: false,
          serviceId: '4a2edc17-9ff9-486f-843c-e1f5e38a9094',
          createdAt: '2025-12-16T16:07:52.453Z',
          updatedAt: '2025-12-16T16:07:52.453Z',
        },
      ],
    },
    {
      id: '4a2edc17-9ff9-486f-843c-e1f5e38a9095',
      name: 'Plano com 9 agentes',
      description: null,
      price: '700',
      createdAt: '2025-12-16T16:07:52.453Z',
      updatedAt: '2025-12-16T16:07:52.453Z',
      serviceOptions: [
        {
          id: 'ee9e9adb-9aae-4a66-859f-56cee2388892',
          name: 'IA Basica',
          description: 'IA Basica',
          price: '0',
          selected: false,
          serviceId: '4a2edc17-9ff9-486f-843c-e1f5e38a9095',
          createdAt: '2025-12-16T16:07:52.453Z',
          updatedAt: '2025-12-16T16:07:52.453Z',
        },
        {
          id: '8ebbbe8b-6fb2-499d-bfac-08a8fcda2d64',
          name: 'IA Avançada',
          description: 'IA Avançada',
          price: '75',
          selected: false,
          serviceId: '4a2edc17-9ff9-486f-843c-e1f5e38a9095',
          createdAt: '2025-12-16T16:07:52.453Z',
          updatedAt: '2025-12-16T16:07:52.453Z',
        },
      ],
    },
    {
      id: '4a2edc17-9ff9-486f-843c-e1f5e38a9096',
      name: 'Plano com 10 agentes',
      description: null,
      price: '750',
      createdAt: '2025-12-16T16:07:52.453Z',
      updatedAt: '2025-12-16T16:07:52.453Z',
      serviceOptions: [
        {
          id: 'ee9e9adb-9aae-4a66-859f-56cee2388893',
          name: 'IA Basica',
          description: 'IA Basica',
          price: '0',
          selected: false,
          serviceId: '4a2edc17-9ff9-486f-843c-e1f5e38a9096',
          createdAt: '2025-12-16T16:07:52.453Z',
          updatedAt: '2025-12-16T16:07:52.453Z',
        },
        {
          id: '8ebbbe8b-6fb2-499d-bfac-08a8fcda2d65',
          name: 'IA Avançada',
          description: 'IA Avançada',
          price: '75',
          selected: false,
          serviceId: '4a2edc17-9ff9-486f-843c-e1f5e38a9096',
          createdAt: '2025-12-16T16:07:52.453Z',
          updatedAt: '2025-12-16T16:07:52.453Z',
        },
      ],
    },
    {
      id: '4a2edc17-9ff9-486f-843c-e1f5e38a9097',
      name: 'Plano com 11 agentes',
      description: null,
      price: '800',
      createdAt: '2025-12-16T16:07:52.453Z',
      updatedAt: '2025-12-16T16:07:52.453Z',
      serviceOptions: [
        {
          id: 'ee9e9adb-9aae-4a66-859f-56cee2388894',
          name: 'IA Basica',
          description: 'IA Basica',
          price: '0',
          selected: false,
          serviceId: '4a2edc17-9ff9-486f-843c-e1f5e38a9097',
          createdAt: '2025-12-16T16:07:52.453Z',
          updatedAt: '2025-12-16T16:07:52.453Z',
        },
        {
          id: '8ebbbe8b-6fb2-499d-bfac-08a8fcda2d66',
          name: 'IA Avançada',
          description: 'IA Avançada',
          price: '75',
          selected: false,
          serviceId: '4a2edc17-9ff9-486f-843c-e1f5e38a9097',
          createdAt: '2025-12-16T16:07:52.453Z',
          updatedAt: '2025-12-16T16:07:52.453Z',
        },
      ],
    },
  ];

  const toggleExpand = (serviceId: string) => {
    setExpandedService(expandedService === serviceId ? null : serviceId);
  };

  return (
    <div className="flex flex-col h-screen w-full bg-gray-900 border-2 overflow-hidden">
      {/* Header */}
      <header className="border-b border-gray-800 bg-linear-to-r from-gray-900 via-gray-850 to-gray-900 p-6 shadow-sm">
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
              <h1 className="text-xl font-semibold text-white">Serviços</h1>
              <p className="text-sm text-gray-500 mt-1">Gerenciamento de serviços oferecidos</p>
            </div>
          </div>
          <Link href="/services/new">
            <Button className="gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium transition-all shadow-lg hover:shadow-blue-500/50">
              <Plus className="h-4 w-4" />
              Novo Serviço
            </Button>
          </Link>
        </div>
      </header>

      {/* Content Area */}
      <main className="flex-1 overflow-auto bg-gray-900 p-6">
        <div className="w-full rounded-2xl border border-gray-700 bg-gray-800 overflow-hidden">
          <Table className="w-full">
            <TableHeader className="bg-gray-750 hover:bg-gray-750">
              <TableRow className="border-b border-gray-700 hover:bg-gray-750">
                <TableHead className="text-gray-300 w-12"></TableHead>
                <TableHead className="text-gray-300">Nome</TableHead>
                <TableHead className="text-gray-300">Preço</TableHead>
                <TableHead className="text-gray-300">Opções</TableHead>
                <TableHead className="text-gray-300">Criado em</TableHead>
                <TableHead className="text-gray-300 text-center">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {services.map((service) => (
                <>
                  <TableRow className="border-b border-gray-700 hover:bg-gray-750" key={service.id}>
                    <TableCell className="text-gray-300 w-12">
                      <Button variant="ghost" size="sm" onClick={() => toggleExpand(service.id)} className="text-gray-300 hover:text-white">
                        <ChevronDown className={`h-5 w-5 transition-transform ${expandedService === service.id ? 'rotate-180' : ''}`} />
                      </Button>
                    </TableCell>
                    <TableCell className="font-medium text-white">{service.name}</TableCell>
                    <TableCell className="font-semibold text-white">R$ {parseFloat(service.price).toFixed(2)}</TableCell>
                    <TableCell className="text-sm text-gray-400">{service.serviceOptions.length} opção(ões)</TableCell>
                    <TableCell className="text-sm text-gray-400">{new Date(service.createdAt).toLocaleDateString('pt-BR')}</TableCell>
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

                  {/* Expandable Row - Opções de Serviço */}
                  {expandedService === service.id && (
                    <TableRow className="border-b border-gray-700 hover:bg-gray-750">
                      <TableCell colSpan={6} className="bg-gray-750 p-4">
                        <div>
                          <h4 className="font-semibold text-white mb-3">Opções de Serviço:</h4>
                          <div className="space-y-2">
                            {service.serviceOptions.map((option) => (
                              <div
                                key={option.id}
                                className="flex items-center justify-between p-3 bg-gray-800 rounded-lg border border-gray-700"
                              >
                                <div className="flex-1">
                                  <p className="text-sm font-medium text-white">{option.name}</p>
                                  <p className="text-xs text-gray-400">{option.description}</p>
                                </div>
                                <div className="text-right">
                                  <p className="text-sm font-semibold text-white">R$ {parseFloat(option.price).toFixed(2)}</p>
                                  <p className="text-xs text-gray-400">{option.selected ? '✓ Selecionada' : 'Não selecionada'}</p>
                                </div>
                              </div>
                            ))}
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

export default ServicesPage;
