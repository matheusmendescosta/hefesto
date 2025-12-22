"use client";

import { useQuote } from "@/components/pages/(dashboard)/quotes/new/QuoteContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { DollarSign, Trash2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface QuoteCheckoutProps {
  onSubmit: () => void;
  isSubmitting: boolean;
}

export const QuoteCheckout = ({
  onSubmit,
  isSubmitting,
}: QuoteCheckoutProps) => {
  const {
    getTotalAmount,
    selectedClient,
    services,
    products,
    resetQuote,
    removeService,
    removeProduct,
  } = useQuote();

  const servicesTotal = services.reduce((sum, s) => {
    const servicePrice = s.price * s.quantity;
    const optionsPrice = (s.selectedOptions || []).reduce((optSum, opt) => optSum + opt.price * s.quantity, 0);
    return sum + servicePrice + optionsPrice;
  }, 0);
  const productsTotal = products.reduce((sum, p) => {
    const productPrice = p.price * p.quantity;
    const optionsPrice = (p.selectedOptions || []).reduce((optSum, opt) => optSum + opt.price * p.quantity, 0);
    return sum + productPrice + optionsPrice;
  }, 0);
  const total = getTotalAmount();

  return (
    <Card className="sticky top-6 h-fit bg-gradient-to-b from-muted/50 to-muted border-2 dark:border-gray-700">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <DollarSign className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-bold">Resumo do Orçamento</h3>
        </div>

        <ScrollArea className="max-h-96 mb-6">
          <div className="space-y-4 pr-4">
            {/* Cliente */}
            <div>
              <p className="text-xs text-muted-foreground font-semibold mb-2">
                CLIENTE
              </p>
              {selectedClient ? (
                <div className="p-3 bg-background rounded-lg border border-primary/20">
                  <p className="font-semibold text-sm">{selectedClient.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {selectedClient.email}
                  </p>
                  {selectedClient.company && (
                    <p className="text-xs text-muted-foreground">
                      {selectedClient.company}
                    </p>
                  )}
                </div>
              ) : (
                <div className="p-3 bg-destructive/10 rounded-lg border border-destructive/20">
                  <p className="text-xs text-destructive font-semibold">
                    ⚠ Nenhum cliente selecionado
                  </p>
                </div>
              )}
            </div>

            <Separator />

            {/* Serviços */}
            {services.length > 0 && (
              <div>
                <p className="text-xs text-muted-foreground font-semibold mb-2">
                  SERVIÇOS ({services.length})
                </p>
                <div className="space-y-3">
                  {services.map((service) => {
                    const serviceTotal = service.price * service.quantity;
                    const optionsTotal = (service.selectedOptions || []).reduce(
                      (sum, opt) => sum + opt.price * service.quantity,
                      0
                    );
                    const itemTotal = serviceTotal + optionsTotal;

                    return (
                      <div key={service.id} className="border rounded p-2 space-y-2">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-xs truncate">{service.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {service.quantity}x R$ {Number(service.price).toFixed(2)}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <p className="font-semibold text-xs whitespace-nowrap">
                              R$ {serviceTotal.toFixed(2)}
                            </p>
                            <button
                              onClick={() => removeService(service.id)}
                              className="p-1 hover:bg-destructive/10 rounded transition-colors"
                              title="Remover"
                            >
                              <Trash2 className="w-3 h-3 text-destructive" />
                            </button>
                          </div>
                        </div>
                        
                        {(service.selectedOptions || []).length > 0 && (
                          <div className="border-t pt-2 space-y-1">
                            {service.selectedOptions.map((opt) => (
                              <div key={opt.id} className="flex justify-between text-xs pl-2">
                                <span className="text-muted-foreground">→ {opt.name}</span>
                                <span className="font-medium">
                                  + R$ {(opt.price * service.quantity).toFixed(2)}
                                </span>
                              </div>
                            ))}
                            {optionsTotal > 0 && (
                              <div className="flex justify-between text-xs font-semibold pt-1 border-t">
                                <span>Subtotal:</span>
                                <span>R$ {itemTotal.toFixed(2)}</span>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Produtos */}
            {products.length > 0 && (
              <div>
                {services.length > 0 && <Separator />}
                <p className="text-xs text-muted-foreground font-semibold mb-2">
                  PRODUTOS ({products.length})
                </p>
                <div className="space-y-3">
                  {products.map((product) => {
                    const productTotal = product.price * product.quantity;
                    const optionsTotal = (product.selectedOptions || []).reduce(
                      (sum, opt) => sum + opt.price * product.quantity,
                      0
                    );
                    const itemTotal = productTotal + optionsTotal;

                    return (
                      <div key={product.id} className="border rounded p-2 space-y-2">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-xs truncate">{product.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {product.quantity}x R$ {Number(product.price).toFixed(2)}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <p className="font-semibold text-xs whitespace-nowrap">
                              R$ {productTotal.toFixed(2)}
                            </p>
                            <button
                              onClick={() => removeProduct(product.id)}
                              className="p-1 hover:bg-destructive/10 rounded transition-colors"
                              title="Remover"
                            >
                              <Trash2 className="w-3 h-3 text-destructive" />
                            </button>
                          </div>
                        </div>
                        
                        {(product.selectedOptions || []).length > 0 && (
                          <div className="border-t pt-2 space-y-1">
                            {product.selectedOptions.map((opt) => (
                              <div key={opt.id} className="flex justify-between text-xs pl-2">
                                <span className="text-muted-foreground">→ {opt.name}</span>
                                <span className="font-medium">
                                  + R$ {(opt.price * product.quantity).toFixed(2)}
                                </span>
                              </div>
                            ))}
                            {optionsTotal > 0 && (
                              <div className="flex justify-between text-xs font-semibold pt-1 border-t">
                                <span>Subtotal:</span>
                                <span>R$ {itemTotal.toFixed(2)}</span>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {services.length === 0 && products.length === 0 && (
              <div className="py-6 text-center text-muted-foreground">
                <p className="text-sm">Nenhum item adicionado</p>
              </div>
            )}
          </div>
        </ScrollArea>

        <Separator className="my-4" />

        {/* Totais */}
        <div className="space-y-2 mb-4">
          {services.length > 0 && (
            <div className="flex justify-between text-sm">
              <p className="text-muted-foreground">Serviços:</p>
              <p className="font-semibold">R$ {servicesTotal.toFixed(2)}</p>
            </div>
          )}
          {products.length > 0 && (
            <div className="flex justify-between text-sm">
              <p className="text-muted-foreground">Produtos:</p>
              <p className="font-semibold">R$ {Number(productsTotal).toFixed(2)}</p>
            </div>
          )}
        </div>

        {(services.length > 0 || products.length > 0) && (
          <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200 dark:border-green-800 mb-4">
            <p className="text-xs text-green-700 dark:text-green-100 font-semibold mb-1">
              TOTAL
            </p>
            <p className="text-2xl font-bold text-green-900 dark:text-green-50">
              R$ {Number(total).toFixed(2)}
            </p>
          </div>
        )}

        {/* Botões */}
        <div className="space-y-2">
          <Button
            onClick={onSubmit}
            disabled={
              isSubmitting ||
              !selectedClient ||
              (services.length === 0 && products.length === 0)
            }
            className="w-full gap-2"
          >
            <DollarSign className="w-4 h-4" />
            {isSubmitting ? "Criando..." : "Criar Orçamento"}
          </Button>

          <Button
            onClick={resetQuote}
            variant="outline"
            className="w-full"
            disabled={
              services.length === 0 && products.length === 0 && !selectedClient
            }
          >
            Limpar Tudo
          </Button>
        </div>
      </div>
    </Card>
  );
};
