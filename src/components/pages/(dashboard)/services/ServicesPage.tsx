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
import { ChevronDown, Edit2, Eye, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useServices } from "./use-services";

const ServicesPage = () => {
  const { services } = useServices();

  const [expandedService, setExpandedService] = useState<string | null>(null);

  const toggleExpand = (serviceId: string) => {
    setExpandedService(expandedService === serviceId ? null : serviceId);
  };

  return (
    <div className="flex flex-col h-screen w-full bg-gray-900 overflow-hidden">
      <main className="flex-1 overflow-auto bg-gray-900 p-6">
        <Link href="/services/new">
          <Button className="mb-6">Novo Serviço</Button>
        </Link>
        <div className="w-full rounded-2xl border border-gray-700 bg-gray-800 overflow-hidden">
          <Table className="w-full">
            <TableHeader className="bg-gray-750 hover:bg-gray-750">
              <TableRow className="border-b border-gray-700 hover:bg-gray-750">
                <TableHead className="text-gray-300 w-12"></TableHead>
                <TableHead className="text-gray-300">Nome</TableHead>
                <TableHead className="text-gray-300">Preço</TableHead>
                <TableHead className="text-gray-300">Opções</TableHead>
                <TableHead className="text-gray-300">Criado em</TableHead>
                <TableHead className="text-gray-300 text-center">
                  Ações
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {services.map((service) => (
                <>
                  <TableRow
                    className="border-b border-gray-700 hover:bg-gray-750"
                    key={service.id}
                  >
                    <TableCell className="text-gray-300 w-12">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleExpand(service.id)}
                        className="text-gray-300 hover:text-white"
                      >
                        <ChevronDown
                          className={`h-5 w-5 transition-transform ${
                            expandedService === service.id ? "rotate-180" : ""
                          }`}
                        />
                      </Button>
                    </TableCell>
                    <TableCell className="font-medium text-white">
                      {service.name}
                    </TableCell>
                    <TableCell className="font-semibold text-white">
                      R$ {parseFloat(service.price).toFixed(2)}
                    </TableCell>
                    <TableCell className="text-sm text-gray-400">
                      {service.serviceOptions.length} opção(ões)
                    </TableCell>
                    <TableCell className="text-sm text-gray-400">
                      {new Date(service.createdAt).toLocaleDateString("pt-BR")}
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

                  {/* Expandable Row - Opções de Serviço */}
                  {expandedService === service.id && (
                    <TableRow className="border-b border-gray-700 hover:bg-gray-750">
                      <TableCell colSpan={6} className="bg-gray-750 p-4">
                        <div>
                          <h4 className="font-semibold text-white mb-3">
                            Opções de Serviço:
                          </h4>
                          <div className="space-y-2">
                            {service.serviceOptions.map((option) => (
                              <div
                                key={option.id}
                                className="flex items-center justify-between p-3 bg-gray-800 rounded-lg border border-gray-700"
                              >
                                <div className="flex-1">
                                  <p className="text-sm font-medium text-white">
                                    {option.name}
                                  </p>
                                  <p className="text-xs text-gray-400">
                                    {option.description}
                                  </p>
                                </div>
                                <div className="text-right">
                                  <p className="text-sm font-semibold text-white">
                                    R$ {parseFloat(option.price).toFixed(2)}
                                  </p>
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
