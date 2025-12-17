'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Trash2 } from 'lucide-react';

interface ServiceOption {
  id: string;
  name: string;
  description: string;
  price: string;
  selected: boolean;
}

interface ServiceForm {
  name: string;
  description: string;
  price: string;
  serviceOptions: ServiceOption[];
}

const NewServicePage = () => {
  const [formData, setFormData] = useState<ServiceForm>({
    name: '',
    description: '',
    price: '',
    serviceOptions: [],
  });

  const [newOption, setNewOption] = useState<Omit<ServiceOption, 'id' | 'selected'>>({
    name: '',
    description: '',
    price: '',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleOptionInputChange = (field: string, value: string) => {
    setNewOption((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const addOption = () => {
    if (newOption.name.trim()) {
      const option: ServiceOption = {
        id: Math.random().toString(36).substring(2, 15),
        ...newOption,
        selected: false,
      };
      setFormData((prev) => ({
        ...prev,
        serviceOptions: [...prev.serviceOptions, option],
      }));
      setNewOption({ name: '', description: '', price: '' });
    }
  };

  const removeOption = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      serviceOptions: prev.serviceOptions.filter((opt) => opt.id !== id),
    }));
  };

  const toggleOptionSelected = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      serviceOptions: prev.serviceOptions.map((opt) => (opt.id === id ? { ...opt, selected: !opt.selected } : opt)),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      name: formData.name,
      description: formData.description || null,
      price: formData.price,
      serviceOptions: formData.serviceOptions.map(({ id, ...rest }) => ({
        ...rest,
        serviceId: '', // será preenchido pelo backend
      })),
    };

    console.log('Enviando para o backend:', payload);
    // Aqui você faria a chamada da API
    // await createService(payload);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Novo Serviço</h1>
        <p className="text-muted-foreground">Cadastre um novo serviço e suas opções disponíveis</p>
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

          {/* Descrição */}
          <div className="space-y-2 mt-6">
            <Label htmlFor="description">Descrição</Label>
            <Input
              id="description"
              placeholder="Descrição do serviço (opcional)"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
            />
          </div>
        </Card>

        {/* Opções de Serviço */}
        <Card className="p-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Opções do Serviço</h2>
            <p className="text-sm text-muted-foreground">Adicione opções disponíveis para este serviço</p>
          </div>

          <Separator className="mb-6" />

          {/* Adicionar Nova Opção */}
          <div className="bg-muted/40 rounded-lg p-6 mb-6">
            <h3 className="font-semibold mb-4">Adicionar Opção</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="option-name">Nome da Opção *</Label>
                <Input
                  id="option-name"
                  placeholder="Ex: IA Básica"
                  value={newOption.name}
                  onChange={(e) => handleOptionInputChange('name', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="option-description">Descrição</Label>
                <Input
                  id="option-description"
                  placeholder="Ex: IA Básica"
                  value={newOption.description}
                  onChange={(e) => handleOptionInputChange('description', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="option-price">Preço</Label>
                <Input
                  id="option-price"
                  type="number"
                  placeholder="Ex: 0"
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
          {formData.serviceOptions.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Descrição</TableHead>
                    <TableHead>Preço</TableHead>
                    <TableHead>Selecionado</TableHead>
                    <TableHead className="w-12">Ação</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {formData.serviceOptions.map((option) => (
                    <TableRow key={option.id}>
                      <TableCell className="font-medium">{option.name}</TableCell>
                      <TableCell className="text-sm">{option.description}</TableCell>
                      <TableCell>R$ {option.price}</TableCell>
                      <TableCell>
                        <input
                          type="checkbox"
                          checked={option.selected}
                          onChange={() => toggleOptionSelected(option.id)}
                          className="w-4 h-4 rounded border-gray-300"
                        />
                      </TableCell>
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
          <Button type="submit" disabled={!formData.name || !formData.price}>
            Salvar Serviço
          </Button>
        </div>
      </form>
    </div>
  );
};

export default NewServicePage;
