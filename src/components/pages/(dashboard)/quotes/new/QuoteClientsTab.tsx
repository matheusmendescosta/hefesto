'use client';

import { useEffect, useState } from 'react';
import { useQuote } from '@/components/pages/(dashboard)/quotes/new/QuoteContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Tabs } from '@/components/ui/tabs';

interface Client {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
}

export const QuoteClientsTab = () => {
  const { selectedClient, setSelectedClient } = useQuote();
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [newClient, setNewClient] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
  });
  const [isCreatingNew, setIsCreatingNew] = useState(false);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        // TODO: Buscar clientes da API
        setClients([]);
      } catch (error) {
        console.error('Erro ao buscar clientes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  const handleSelectClient = (client: Client) => {
    setSelectedClient(client);
  };

  const handleCreateClient = async () => {
    if (!newClient.name || !newClient.email) {
      alert('Nome e email são obrigatórios');
      return;
    }

    try {
      // TODO: Criar cliente na API
      const client: Client = {
        id: Date.now().toString(),
        ...newClient,
      };

      setClients((prev) => [...prev, client]);
      setNewClient({ name: '', email: '', phone: '', company: '' });
      setIsCreatingNew(false);
      handleSelectClient(client);
    } catch (error) {
      console.error('Erro ao criar cliente:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Selecione ou crie um cliente</h3>
        <Button onClick={() => setIsCreatingNew(!isCreatingNew)} variant="outline">
          {isCreatingNew ? 'Cancelar' : 'Novo Cliente'}
        </Button>
      </div>

      {isCreatingNew && (
        <Card className="p-6">
          <h4 className="font-semibold mb-4">Novo Cliente</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="client-name">Nome *</Label>
              <Input
                id="client-name"
                placeholder="Nome do cliente"
                value={newClient.name}
                onChange={(e) => setNewClient((prev) => ({ ...prev, name: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="client-email">Email *</Label>
              <Input
                id="client-email"
                type="email"
                placeholder="email@example.com"
                value={newClient.email}
                onChange={(e) => setNewClient((prev) => ({ ...prev, email: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="client-phone">Telefone</Label>
              <Input
                id="client-phone"
                placeholder="(11) 99999-9999"
                value={newClient.phone}
                onChange={(e) => setNewClient((prev) => ({ ...prev, phone: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="client-company">Empresa</Label>
              <Input
                id="client-company"
                placeholder="Nome da empresa"
                value={newClient.company}
                onChange={(e) => setNewClient((prev) => ({ ...prev, company: e.target.value }))}
              />
            </div>
          </div>
          <Button onClick={handleCreateClient} className="mt-4">
            Criar Cliente
          </Button>
        </Card>
      )}

      <div className="space-y-2">
        <h4 className="font-semibold">Clientes Disponíveis</h4>
        {loading ? (
          <p className="text-muted-foreground">Carregando clientes...</p>
        ) : clients.length === 0 ? (
          <p className="text-muted-foreground">Nenhum cliente disponível</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {clients.map((client) => (
              <Card
                key={client.id}
                className={`p-4 cursor-pointer transition-colors ${
                  selectedClient?.id === client.id
                    ? 'border-primary bg-primary/5'
                    : 'hover:bg-muted'
                }`}
                onClick={() => handleSelectClient(client)}
              >
                <p className="font-semibold">{client.name}</p>
                <p className="text-sm text-muted-foreground">{client.email}</p>
                {client.company && (
                  <p className="text-sm text-muted-foreground">{client.company}</p>
                )}
                {client.phone && (
                  <p className="text-sm text-muted-foreground">{client.phone}</p>
                )}
              </Card>
            ))}
          </div>
        )}
      </div>

      {selectedClient && (
        <Card className="p-4 border-green-500 bg-green-50 dark:bg-green-950">
          <p className="text-green-900 dark:text-green-100">
            ✓ Cliente selecionado: <span className="font-semibold">{selectedClient.name}</span>
          </p>
        </Card>
      )}
    </div>
  );
};
