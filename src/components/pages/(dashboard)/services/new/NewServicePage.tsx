"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
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
import { useNewService } from "./use-new-service";
import { useFieldArray, useWatch } from "react-hook-form";

const NewServicePage = () => {
  const { register, handleSubmit, errors, isSubmitting, control } = useNewService();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "options",
  });

  const [newOptionName, setNewOptionName] = useState("");
  const [newOptionPrice, setNewOptionPrice] = useState<number | "">(0);
  const [newOptionDescription, setNewOptionDescription] = useState("");

  const handleAddOption = () => {
    if (newOptionName.trim()) {
      append({
        name: newOptionName,
        price: typeof newOptionPrice === "number" ? newOptionPrice : 0,
        description: newOptionDescription,
      });
      setNewOptionName("");
      setNewOptionPrice(0);
      setNewOptionDescription("");
    }
  };

  const watchOptions = useWatch({
    control,
    name: "options",
  });

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Novo Serviço</h1>
        <p className="text-muted-foreground">
          Cadastre um novo serviço e suas opções disponíveis
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Dados Principais do Serviço */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-6">Informações do Serviço</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Nome */}
            <div className="space-y-2">
              <Label htmlFor="name">Nome do Serviço *</Label>
              <Input
                id="name"
                placeholder="Ex: Plano com 2 agentes"
                {...register("name", { required: "Nome é obrigatório" })}
              />
              {errors.name && (
                <p className="text-sm text-destructive">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Preço */}
            <div className="space-y-2">
              <Label htmlFor="price">Preço *</Label>
              <Input
                id="price"
                type="number"
                placeholder="Ex: 350"
                {...register("price", {
                  required: "Preço é obrigatório",
                  valueAsNumber: true,
                  min: { value: 0, message: "Preço deve ser maior que 0" },
                })}
                step="0.01"
              />
              {errors.price && (
                <p className="text-sm text-destructive">
                  {errors.price.message}
                </p>
              )}
            </div>
          </div>

          {/* Descrição */}
          <div className="space-y-2 mt-6">
            <Label htmlFor="description">Descrição</Label>
            <Input
              id="description"
              placeholder="Descrição do serviço (opcional)"
              {...register("description")}
            />
          </div>
        </Card>

        {/* Opções de Serviço */}
        <Card className="p-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Opções do Serviço</h2>
            <p className="text-sm text-muted-foreground">
              Adicione opções disponíveis para este serviço
            </p>
          </div>

          <Separator className="mb-6" />

          <div className="bg-muted/40 rounded-lg p-6 mb-6">
            <h3 className="font-semibold mb-4">Adicionar Opção</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="option-name">Nome da Opção *</Label>
                <Input
                  id="option-name"
                  placeholder="Ex: IA Básica"
                  value={newOptionName}
                  onChange={(e) => setNewOptionName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="option-description">Descrição</Label>
                <Input
                  id="option-description"
                  placeholder="Ex: Descrição da opção"
                  value={newOptionDescription}
                  onChange={(e) => setNewOptionDescription(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="option-price">Preço</Label>
                <Input
                  id="option-price"
                  type="number"
                  placeholder="Ex: 0"
                  value={newOptionPrice}
                  onChange={(e) => setNewOptionPrice(e.target.value === "" ? "" : parseFloat(e.target.value))}
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
                    <TableHead>Nome</TableHead>
                    <TableHead>Descrição</TableHead>
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
                      <TableCell className="text-sm">
                        {watchOptions?.[index]?.description}
                      </TableCell>
                      <TableCell>R$ {watchOptions?.[index]?.price}</TableCell>
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
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Salvando..." : "Salvar Serviço"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default NewServicePage;
