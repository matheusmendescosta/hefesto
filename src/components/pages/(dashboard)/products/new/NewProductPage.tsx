"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { useFieldArray, useWatch } from "react-hook-form";
import { useNewProduct } from "./use-new-product";

const NewProductPage = () => {
  const { isSubmitting, register, handleSubmit, errors, control } = useNewProduct();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "options",
  });

  const [newOptionName, setNewOptionName] = useState("");
  const [newOptionPrice, setNewOptionPrice] = useState<number | "">(0);

  const handleAddOption = () => {
    if (newOptionName.trim()) {
      append({
        name: newOptionName,
        price: typeof newOptionPrice === "number" ? newOptionPrice : 0,
      });
      setNewOptionName("");
      setNewOptionPrice(0);
    }
  };

  const watchOptions = useWatch({
    control,
    name: "options",
  });

  return (
    <div className="w-full border-2 border-gray-800 rounded-lg shadow-sm bg-gradient-to-b from-gray-900 via-gray-850 to-gray-900">
      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2">Informações Gerais</h2>
          <p className="text-muted-foreground">
            Cadastre um novo produto e suas opções disponíveis
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Dados Principais do Produto */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-6">
              Informações do Produto
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Nome */}
              <div className="space-y-2">
                <Label htmlFor="name">Nome do Produto *</Label>
                <Input
                  id="name"
                  placeholder="Ex: Armazenamento Extra"
                  {...register("name", {
                    required: "Nome do produto é obrigatório",
                  })}
                />
                {errors.name && (
                  <p className="text-sm text-destructive">{errors.name.message}</p>
                )}
              </div>

              {/* Preço */}
              <div className="space-y-2">
                <Label htmlFor="price">Preço *</Label>
                <Input
                  id="price"
                  type="number"
                  placeholder="Ex: 350"
                  step="0.01"
                  {...register("price", {
                    required: "Preço é obrigatório",
                    valueAsNumber: true,
                    min: { value: 0, message: "Preço deve ser maior que 0" },
                  })}
                />
                {errors.price && (
                  <p className="text-sm text-destructive">{errors.price.message}</p>
                )}
              </div>
            </div>

            {/* Estoque */}
            <div className="space-y-2 mt-6">
              <Label htmlFor="stock">Estoque *</Label>
              <Input
                id="stock"
                type="number"
                placeholder="Ex: 100"
                min="0"
                {...register("stock", {
                  required: "Estoque é obrigatório",
                  valueAsNumber: true,
                  min: { value: 0, message: "Estoque não pode ser negativo" },
                })}
              />
              {errors.stock && (
                <p className="text-sm text-destructive">{errors.stock.message}</p>
              )}
            </div>
          </Card>

          {/* Opções do Produto */}
          <Card className="p-6">
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Opções do Produto</h2>
              <p className="text-sm text-muted-foreground">
                Adicione variações ou complementos disponíveis para este produto
              </p>
            </div>

            <Separator className="mb-6" />

            {/* Adicionar Nova Opção */}
            <div className="bg-muted/40 rounded-lg p-6 mb-6">
              <h3 className="font-semibold mb-4">Adicionar Opção</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="option-name">Nome da Opção *</Label>
                  <Input
                    id="option-name"
                    placeholder="Ex: +50GB"
                    value={newOptionName}
                    onChange={(e) => setNewOptionName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="option-price">Preço da Opção</Label>
                  <Input
                    id="option-price"
                    type="number"
                    placeholder="Ex: 75"
                    value={newOptionPrice}
                    onChange={(e) =>
                      setNewOptionPrice(
                        e.target.value === "" ? "" : Number(e.target.value)
                      )
                    }
                    step="0.01"
                  />
                </div>
              </div>
              <Button
                type="button"
                onClick={handleAddOption}
                className="mt-4 w-full md:w-auto"
                variant="outline"
              >
                <Plus className="w-4 h-4 mr-2" />
                Adicionar Opção
              </Button>
            </div>

            {/* Lista de Opções */}
            {fields.length > 0 ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome da Opção</TableHead>
                      <TableHead>Preço</TableHead>
                      <TableHead className="w-12">Ação</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {fields.map((field, index) => (
                      <TableRow key={field.id}>
                        <TableCell className="font-medium">
                          {watchOptions?.[index]?.name}
                        </TableCell>
                        <TableCell>
                          R$ {(watchOptions?.[index]?.price || 0).toFixed(2)}
                        </TableCell>
                        <TableCell>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => remove(index)}
                          >
                            <Trash2 className="w-4 h-4 text-destructive" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                Nenhuma opção adicionada ainda
              </div>
            )}
          </Card>

          {/* Botões de Ação */}
          <div className="flex gap-4 justify-end">
            <Button type="button" variant="outline">
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Salvando..." : "Salvar Produto"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewProductPage;
