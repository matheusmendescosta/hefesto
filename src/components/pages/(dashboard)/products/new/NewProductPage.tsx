'use client';

import { useState } from 'react';
import { useSidebar } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Trash2, ChevronRight, Package } from 'lucide-react';

interface ProductOption {
  id: string;
  name: string;
  price: number;
}

interface ProductForm {
  name: string;
  price: number | '';
  stock: number | '';
  options: ProductOption[];
}

const NewProductPage = () => {
  const { toggleSidebar, open } = useSidebar();
  const [formData, setFormData] = useState<ProductForm>({
    name: '',
    price: '',
    stock: '',
    options: [],
  });

  const [newOption, setNewOption] = useState<Omit<ProductOption, 'id'>>({
    name: '',
    price: 0,
  });

  const handleInputChange = (field: string, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value === '' ? '' : field === 'name' ? value : Number(value),
    }));
  };

  const handleOptionInputChange = (field: string, value: string | number) => {
    setNewOption((prev) => ({
      ...prev,
      [field]: field === 'name' ? value : Number(value),
    }));
  };

  const addOption = () => {
    if (newOption.name.trim()) {
      const option: ProductOption = {
        id: Math.random().toString(36).substring(2, 15),
        ...newOption,
      };
      setFormData((prev) => ({
        ...prev,
        options: [...prev.options, option],
      }));
      setNewOption({ name: '', price: 0 });
    }
  };

  const removeOption = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      options: prev.options.filter((opt) => opt.id !== id),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      name: formData.name,
      price: typeof formData.price === 'number' ? formData.price : 0,
      stock: typeof formData.stock === 'number' ? formData.stock : 0,
      options: formData.options.map(({ id, ...rest }) => rest),
    };

    console.log('Enviando para o backend:', payload);
    // Aqui você faria a chamada da API
    // await createProduct(payload);
  };

  return (
    <div className="w-full border-2 border-gray-800 rounded-lg shadow-sm bg-gradient-to-b from-gray-900 via-gray-850 to-gray-900">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gradient-to-r from-gray-900 via-gray-850 to-gray-900 p-6 shadow-sm sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            aria-label="Toggle sidebar"
            className="text-gray-400 hover:text-white hover:bg-gray-800 transition-all"
          >
            {open ? <ChevronRight className="h-5 w-5" /> : <Package className="h-5 w-5" />}
          </Button>
          <div className="border-l border-gray-700 pl-4">
            <h1 className="text-xl font-semibold text-white">Novo Produto</h1>
            <p className="text-sm text-gray-500 mt-1">Cadastre um novo produto para o sistema</p>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2">Informações Gerais</h2>
          <p className="text-muted-foreground">Cadastre um novo produto e suas opções disponíveis</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Dados Principais do Produto */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-6">Informações do Produto</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Nome */}
              <div className="space-y-2">
                <Label htmlFor="name">Nome do Produto *</Label>
                <Input
                  id="name"
                  placeholder="Ex: Armazenamento Extra"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  required
                />
              </div>

              {/* Preço */}
              <div className="space-y-2">
                <Label htmlFor="price">Preço *</Label>
                <Input
                  id="price"
                  type="number"
                  placeholder="Ex: 350"
                  value={formData.price}
                  onChange={(e) => handleInputChange('price', e.target.value)}
                  step="0.01"
                  required
                />
              </div>
            </div>

            {/* Estoque */}
            <div className="space-y-2 mt-6">
              <Label htmlFor="stock">Estoque *</Label>
              <Input
                id="stock"
                type="number"
                placeholder="Ex: 100"
                value={formData.stock}
                onChange={(e) => handleInputChange('stock', e.target.value)}
                min="0"
                required
              />
            </div>
          </Card>

          {/* Opções do Produto */}
          <Card className="p-6">
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Opções do Produto</h2>
              <p className="text-sm text-muted-foreground">Adicione variações ou complementos disponíveis para este produto</p>
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
                    value={newOption.name}
                    onChange={(e) => handleOptionInputChange('name', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="option-price">Preço da Opção</Label>
                  <Input
                    id="option-price"
                    type="number"
                    placeholder="Ex: 75"
                    value={newOption.price}
                    onChange={(e) => handleOptionInputChange('price', e.target.value)}
                    step="0.01"
                  />
                </div>
              </div>
              <Button type="button" onClick={addOption} className="mt-4 w-full md:w-auto" variant="outline">
                <Plus className="w-4 h-4 mr-2" />
                Adicionar Opção
              </Button>
            </div>

            {/* Lista de Opções */}
            {formData.options.length > 0 ? (
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
                    {formData.options.map((option) => (
                      <TableRow key={option.id}>
                        <TableCell className="font-medium">{option.name}</TableCell>
                        <TableCell>R$ {option.price.toFixed(2)}</TableCell>
                        <TableCell>
                          <Button type="button" variant="ghost" size="icon" onClick={() => removeOption(option.id)}>
                            <Trash2 className="w-4 h-4 text-destructive" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">Nenhuma opção adicionada ainda</div>
            )}
          </Card>

          {/* Botões de Ação */}
          <div className="flex gap-4 justify-end">
            <Button type="button" variant="outline">
              Cancelar
            </Button>
            <Button type="submit" disabled={!formData.name || !formData.price || !formData.stock}>
              Salvar Produto
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewProductPage;
