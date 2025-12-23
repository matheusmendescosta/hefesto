'use client';

import { useQuote } from '@/components/pages/(dashboard)/quotes/new/QuoteContext';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export const QuoteClientsTab = () => {
  const { selectedClient, setSelectedClient } = useQuote();

  const handleClientChange = (field: string, value: string) => {
    setSelectedClient({
      ...selectedClient,
      [field]: value,
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Dados do Cliente</h3>
        <p className="text-sm text-muted-foreground mb-6">
          Preencha os dados do cliente. O cliente será criado automaticamente ao gerar o orçamento.
        </p>
      </div>

      <Card className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="client-name">Nome *</Label>
            <Input
              id="client-name"
              placeholder="Nome do cliente"
              value={selectedClient?.name || ''}
              onChange={(e) => handleClientChange('name', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="client-email">Email *</Label>
            <Input
              id="client-email"
              type="email"
              placeholder="email@example.com"
              value={selectedClient?.email || ''}
              onChange={(e) => handleClientChange('email', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="client-phone">Telefone</Label>
            <Input
              id="client-phone"
              placeholder="(11) 99999-9999"
              value={selectedClient?.phone || ''}
              onChange={(e) => handleClientChange('phone', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="client-company">Empresa</Label>
            <Input
              id="client-company"
              placeholder="Nome da empresa"
              value={selectedClient?.company || ''}
              onChange={(e) => handleClientChange('company', e.target.value)}
            />
          </div>
        </div>
      </Card>
    </div>
  );
};
