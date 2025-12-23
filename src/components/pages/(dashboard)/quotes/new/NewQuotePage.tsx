"use client";

import { QuoteProvider, useQuote } from "@/components/pages/(dashboard)/quotes/new/QuoteContext";
import { useNewQuote, QuoteFormData } from "@/components/pages/(dashboard)/quotes/new/use-new-quote";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Briefcase, DollarSign, Package, Users } from "lucide-react";
import { useState } from "react";
import { QuoteCheckout } from "./QuoteCheckout";
import { QuoteClientsTab } from "./QuoteClientsTab";
import { QuoteProductsTab } from "./QuoteProductsTab";
import { QuoteServicesTab } from "./QuoteServicesTab";

const NewQuotePageContent = () => {
  const { getTotalAmount, selectedClient, services, products, resetQuote } =
    useQuote();
  const { submitQuote, isSubmitting, apiError } = useNewQuote();
  const [localError, setLocalError] = useState<string | null>(null);

  const handleSubmitQuote = async () => {
    if (!selectedClient) {
      setLocalError("Selecione um cliente");
      return;
    }

    if (services.length === 0 && products.length === 0) {
      setLocalError("Adicione pelo menos um serviço ou produto");
      return;
    }

    setLocalError(null);

    // Gerar número aleatório para o orçamento
    const quoteNumber = Math.floor(Math.random() * 1000000) + 1;
    const totalAmount = getTotalAmount();

    const items = [
      // Serviços principais com suas opções selecionadas
      ...services.map((service) => ({
        description: service.name,
        quantity: service.quantity,
        unitPrice: service.price,
        total: service.price * service.quantity,
        serviceId: service.id,
        selectedOptionIds: (service.selectedOptions || []).map((option) => option.id),
      })),
      // Produtos principais com suas opções selecionadas
      ...products.map((product) => ({
        description: product.name,
        quantity: product.quantity,
        unitPrice: product.price,
        total: product.price * product.quantity,
        productId: product.id,
        selectedOptionIds: (product.selectedOptions || []).map((option) => option.id),
      })),
    ];

    const quoteData: QuoteFormData = {
      number: quoteNumber,
      totalValue: totalAmount,
      client: {
        name: selectedClient.name,
        email: selectedClient.email,
      },
      items,
    };

    const success = await submitQuote(quoteData);
    if (success) {
      resetQuote();
    }
  };

  const displayError = localError || apiError;

  return (
    <div className="w-full min-h-screen">
      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Novo Orçamento</h1>
          <p className="text-muted-foreground">
            Preencha os segmentos abaixo para montar um novo orçamento
          </p>
        </div>

        {displayError && (
          <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
            <p className="text-destructive text-sm font-semibold">{displayError}</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Conteúdo Principal - 3 colunas */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="servicos" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="servicos" className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4" />
                  <span className="hidden sm:inline">Serviços</span>
                </TabsTrigger>
                <TabsTrigger value="produtos" className="flex items-center gap-2">
                  <Package className="w-4 h-4" />
                  <span className="hidden sm:inline">Produtos</span>
                </TabsTrigger>
                <TabsTrigger value="clientes" className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span className="hidden sm:inline">Clientes</span>
                </TabsTrigger>
                <TabsTrigger value="resumo" className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  <span className="hidden sm:inline">Resumo</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="servicos">
                <QuoteServicesTab />
              </TabsContent>

              <TabsContent value="produtos">
                <QuoteProductsTab />
              </TabsContent>

              <TabsContent value="clientes">
                <Card className="p-6">
                  <QuoteClientsTab />
                </Card>
              </TabsContent>

              <TabsContent value="resumo">
                <div className="space-y-6">
                  <Card className="p-6">
                    <h3 className="text-xl font-semibold mb-4">
                      Resumo do Orçamento
                    </h3>

                    {selectedClient ? (
                      <div className="mb-6 p-4 border rounded-lg bg-muted">
                        <p className="text-sm text-muted-foreground">Cliente</p>
                        <p className="text-lg font-semibold">{selectedClient.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {selectedClient.email}
                        </p>
                      </div>
                    ) : (
                      <div className="mb-6 p-4 border border-dashed rounded-lg">
                        <p className="text-sm text-destructive">
                          ⚠ Nenhum cliente selecionado
                        </p>
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <Card className="p-4 bg-muted">
                        <p className="text-sm text-muted-foreground">Serviços</p>
                        <p className="text-2xl font-bold">{services.length}</p>
                        <p className="text-sm">
                          R${" "}
                          {services
                            .reduce((sum, s) => {
                              const optionsPrice = (s.selectedOptions || []).reduce((optSum, opt) => optSum + opt.price * s.quantity, 0);
                              return sum + (s.price * s.quantity) + optionsPrice;
                            }, 0)
                            .toFixed(2)}
                        </p>
                      </Card>

                      <Card className="p-4 bg-muted">
                        <p className="text-sm text-muted-foreground">Produtos</p>
                        <p className="text-2xl font-bold">{products.length}</p>
                        <p className="text-sm">
                          R${" "}
                          {products
                            .reduce((sum, p) => {
                              const optionsPrice = (p.selectedOptions || []).reduce((optSum, opt) => optSum + opt.price * p.quantity, 0);
                              return sum + (p.price * p.quantity) + optionsPrice;
                            }, 0)
                            .toFixed(2)}
                        </p>
                      </Card>
                    </div>

                    {(services.length > 0 || products.length > 0) && (
                      <div className="p-4 border rounded-lg bg-green-50 dark:bg-green-950">
                        <p className="text-sm text-green-700 dark:text-green-100 mb-1">
                          Total do Orçamento
                        </p>
                        <p className="text-3xl font-bold text-green-900 dark:text-green-50">
                          R$ {getTotalAmount().toFixed(2)}
                        </p>
                      </div>
                    )}
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar - Checkout */}
          <div className="lg:col-span-1">
            <QuoteCheckout 
              onSubmit={handleSubmitQuote} 
              isSubmitting={isSubmitting} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const NewQuotePage = () => {
  return (
    <QuoteProvider>
      <NewQuotePageContent />
    </QuoteProvider>
  );
};

export default NewQuotePage;
