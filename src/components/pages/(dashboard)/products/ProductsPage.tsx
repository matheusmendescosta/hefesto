"use client";

import Link from "next/link";
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
import { useState } from "react";
import { useProducts } from "./use-products";

// interface ProductOptional {
//   id: string;
//   name: string;
//   description: string | null;
//   price: string;
//   selected: boolean;
//   productId: string;
//   createdAt: string;
//   updatedAt: string;
// }

// interface Product {
//   id: string;
//   name: string;
//   description: string | null;
//   price: string;
//   sku: string | null;
//   stock: number;
//   createdAt: string;
//   updatedAt: string;
//   productOptionals: ProductOptional[];
// }

const ProductsPage = () => {
  const { products } = useProducts();

  const [expandedProduct, setExpandedProduct] = useState<string | null>(null);

  const toggleExpand = (productId: string) => {
    setExpandedProduct(expandedProduct === productId ? null : productId);
  };

  const getStockStatus = (stock: number) => {
    if (stock === 0)
      return { color: "bg-red-900 text-red-200", text: "Sem estoque" };
    if (stock < 50)
      return { color: "bg-yellow-900 text-yellow-200", text: "Baixo estoque" };
    return { color: "bg-green-900 text-green-200", text: "Em estoque" };
  };

  console.log("productsApi", products);
  return (
    <div className="flex flex-col h-screen w-full bg-gray-900 overflow-hidden">
      <main className="flex-1 overflow-auto bg-gray-900 p-6">
        <Link href="/products/new">
          <Button className="mb-6">Novo Produto</Button>
        </Link>
        <div className="w-full rounded-2xl border border-gray-700 bg-gray-800 overflow-hidden">
          <Table className="w-full">
            <TableHeader className="bg-gray-750 hover:bg-gray-750">
              <TableRow className="border-b border-gray-700 hover:bg-gray-750">
                <TableHead className="text-gray-300 w-12"></TableHead>
                <TableHead className="text-gray-300">Nome</TableHead>
                <TableHead className="text-gray-300">Preço</TableHead>
                <TableHead className="text-gray-300">SKU</TableHead>
                <TableHead className="text-gray-300">Estoque</TableHead>
                <TableHead className="text-gray-300">Opcionais</TableHead>
                <TableHead className="text-gray-300">Criado em</TableHead>
                <TableHead className="text-gray-300 text-center">
                  Ações
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => {
                const stockStatus = getStockStatus(product.stock);
                return (
                  <>
                    <TableRow
                      className="border-b border-gray-700 hover:bg-gray-750"
                      key={product.id}
                    >
                      <TableCell className="text-gray-300 w-12">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleExpand(product.id)}
                          className="text-gray-300 hover:text-white"
                        >
                          <ChevronDown
                            className={`h-5 w-5 transition-transform ${
                              expandedProduct === product.id ? "rotate-180" : ""
                            }`}
                          />
                        </Button>
                      </TableCell>
                      <TableCell className="font-medium text-white">
                        {product.name}
                      </TableCell>
                      <TableCell className="font-semibold text-white">
                        R$ {parseFloat(product.price).toFixed(2)}
                      </TableCell>
                      <TableCell className="text-sm text-gray-400">
                        {product.sku || "-"}
                      </TableCell>
                      <TableCell>
                        <div>
                          <span
                            className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${stockStatus.color}`}
                          >
                            {stockStatus.text}
                          </span>
                          <p className="text-xs text-gray-400 mt-1">
                            {product.stock} unidades
                          </p>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-gray-400">
                        {product.productOptionals.length} opção(ões)
                      </TableCell>
                      <TableCell className="text-sm text-gray-400">
                        {new Date(product.createdAt).toLocaleDateString(
                          "pt-BR"
                        )}
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

                    {/* Expandable Row - Opcionais do Produto */}
                    {expandedProduct === product.id && (
                      <TableRow className="border-b border-gray-700 hover:bg-gray-750">
                        <TableCell colSpan={8} className="bg-gray-750 p-4">
                          <div>
                            <h4 className="font-semibold text-white mb-3">
                              Opcionais do Produto:
                            </h4>
                            <div className="space-y-2">
                              {product.productOptionals.length > 0 ? (
                                product.productOptionals.map((optional) => (
                                  <div
                                    key={optional.id}
                                    className="flex items-center justify-between p-3 bg-gray-800 rounded-lg border border-gray-700"
                                  >
                                    <div className="flex-1">
                                      <p className="text-sm font-medium text-white">
                                        {optional.name}
                                      </p>
                                      {optional.description && (
                                        <p className="text-xs text-gray-400">
                                          {optional.description}
                                        </p>
                                      )}
                                    </div>
                                    <div className="text-right">
                                      <p className="text-sm font-semibold text-white">
                                        R${" "}
                                        {parseFloat(optional.price).toFixed(2)}
                                      </p>
                                      <p className="text-xs text-gray-400">
                                        {optional.selected
                                          ? "✓ Selecionado"
                                          : "Não selecionado"}
                                      </p>
                                    </div>
                                  </div>
                                ))
                              ) : (
                                <p className="text-sm text-gray-400">
                                  Nenhum opcional disponível
                                </p>
                              )}
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </main>
    </div>
  );
};

export default ProductsPage;
