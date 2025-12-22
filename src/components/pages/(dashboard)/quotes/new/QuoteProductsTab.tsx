'use client';

import { useState } from 'react';
import { useQuote } from '@/components/pages/(dashboard)/quotes/new/QuoteContext';
import { useProducts } from '@/components/pages/(dashboard)/products/use-products';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Plus, Trash2, ChevronRight } from 'lucide-react';

interface ProductOption {
  id: string;
  name: string;
  description?: string | null;
  price: string;
}

interface Product {
  id: string;
  name: string;
  description?: string | null;
  price: string;
  productOptionals?: ProductOption[];
}

export const QuoteProductsTab = () => {
  const { products: quoteProducts, addProduct, removeProduct, updateProduct } = useQuote();
  const { products: availableProducts, isLoading } = useProducts();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState<Set<string>>(new Set());
  const [openSheet, setOpenSheet] = useState(false);

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setQuantity(1);
    setSelectedOptions(new Set());
    setOpenSheet(true);
  };

  const handleToggleOption = (optionId: string) => {
    const newOptions = new Set(selectedOptions);
    if (newOptions.has(optionId)) {
      newOptions.delete(optionId);
    } else {
      newOptions.add(optionId);
    }
    setSelectedOptions(newOptions);
  };

  const handleAddProduct = () => {
    if (!selectedProduct) {
      alert('Selecione um produto');
      return;
    }

    const selectedOpts = (selectedProduct.productOptionals || [])
      .filter((opt) => selectedOptions.has(opt.id))
      .map((opt) => ({
        id: opt.id,
        name: opt.name,
        price: Number(opt.price),
      }));

    const quoteProduct = {
      id: Math.random().toString(36).substring(7),
      name: selectedProduct.name,
      description: selectedProduct.description,
      price: Number(selectedProduct.price),
      quantity,
      selectedOptions: selectedOpts,
    };

    addProduct(quoteProduct);
    setOpenSheet(false);
    setSelectedProduct(null);
    setQuantity(1);
    setSelectedOptions(new Set());
  };

  const handleUpdateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity > 0) {
      updateProduct(id, { quantity: newQuantity });
    }
  };

  const getProductTotal = (product: typeof quoteProducts[0]) => {
    const basePrice = product.price * product.quantity;
    const optionsPrice = (product.selectedOptions || []).reduce((sum, opt) => sum + opt.price * product.quantity, 0);
    return basePrice + optionsPrice;
  };

  return (
    <div className="space-y-6">
      {/* Tabela de Produtos Disponíveis */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Produtos Disponíveis</h3>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead className="text-right">Preço</TableHead>
                <TableHead className="w-12">Ação</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={3} className="text-center text-muted-foreground py-8">
                    Carregando produtos...
                  </TableCell>
                </TableRow>
              ) : availableProducts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} className="text-center text-muted-foreground py-8">
                    Nenhum produto disponível
                  </TableCell>
                </TableRow>
              ) : (
                availableProducts.map((product) => (
                  <TableRow 
                    key={product.id}
                    className="cursor-pointer hover:bg-muted/50 transition-colors"
                    onClick={() => handleSelectProduct(product)}
                  >
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell className="text-right">R$ {Number(product.price).toFixed(2)}</TableCell>
                    <TableCell>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelectProduct(product);
                        }}
                      >
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Sheet para selecionar quantidade e opções */}
      <Sheet open={openSheet} onOpenChange={setOpenSheet}>
        <SheetContent className="overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Adicionar Produto</SheetTitle>
          </SheetHeader>

          {selectedProduct && (
            <div className="space-y-6 mt-6">
              <div className="space-y-2">
                <h4 className="font-semibold">{selectedProduct.name}</h4>
                {selectedProduct.description && (
                  <p className="text-sm text-muted-foreground">
                    {selectedProduct.description}
                  </p>
                )}
                <p className="text-lg font-bold text-primary">
                  R$ {Number(selectedProduct.price).toFixed(2)}
                </p>
              </div>

              {/* Opções disponíveis */}
              {(selectedProduct.productOptionals || []).length > 0 && (
                <div className="space-y-3 border-t pt-4">
                  <Label className="text-base font-semibold">Opcionais Disponíveis</Label>
                  <div className="space-y-2">
                    {selectedProduct.productOptionals?.map((option) => (
                      <div key={option.id} className="flex items-start space-x-2">
                        <input
                          type="checkbox"
                          id={`option-${option.id}`}
                          checked={selectedOptions.has(option.id)}
                          onChange={() => handleToggleOption(option.id)}
                          className="mt-1"
                        />
                        <label htmlFor={`option-${option.id}`} className="flex-1 cursor-pointer">
                          <div className="font-medium text-sm">{option.name}</div>
                          {option.description && (
                            <div className="text-xs text-muted-foreground">{option.description}</div>
                          )}
                          <div className="text-sm font-semibold text-primary">
                            + R$ {Number(option.price).toFixed(2)}
                          </div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="space-y-2 border-t pt-4">
                <Label htmlFor="modal-quantity">Quantidade</Label>
                <Input
                  id="modal-quantity"
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                />
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>
                    Produto: R$ {(Number(selectedProduct.price) * quantity).toFixed(2)}
                  </p>
                  {selectedOptions.size > 0 && (
                    <p>
                      Opcionais: R$ {((selectedProduct.productOptionals || [])
                        .filter((opt) => selectedOptions.has(opt.id))
                        .reduce((sum, opt) => sum + Number(opt.price), 0) * quantity).toFixed(2)}
                    </p>
                  )}
                  <p className="font-semibold text-foreground text-base">
                    Total: R$ {((Number(selectedProduct.price) + 
                      (selectedProduct.productOptionals || [])
                        .filter((opt) => selectedOptions.has(opt.id))
                        .reduce((sum, opt) => sum + Number(opt.price), 0)) * quantity).toFixed(2)}
                  </p>
                </div>
              </div>

              <Button onClick={handleAddProduct} className="w-full gap-2">
                <Plus className="w-4 h-4" />
                Adicionar ao Orçamento
              </Button>
            </div>
          )}
        </SheetContent>
      </Sheet>

      {/* Tabela de Produtos Adicionados */}
      {quoteProducts.length > 0 && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Produtos Adicionados</h3>
          <div className="space-y-4">
            {quoteProducts.map((product) => (
              <div key={product.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold">{product.name}</h4>
                    {product.description && (
                      <p className="text-sm text-muted-foreground">{product.description}</p>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeProduct(product.id)}
                    className="h-8 w-8"
                  >
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Preço unitário:</span>
                    <span>R$ {Number(product.price).toFixed(2)}</span>
                  </div>
                  {(product.selectedOptions || []).length > 0 && (
                    <div className="space-y-1 pl-2 border-l-2 border-muted">
                      {product.selectedOptions.map((opt) => (
                        <div key={opt.id} className="flex justify-between text-xs">
                          <span className="text-muted-foreground">→ {opt.name}</span>
                          <span>+ R$ {opt.price.toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-2">
                    <Label className="text-xs">Qtd:</Label>
                    <Input
                      type="number"
                      min="1"
                      value={product.quantity}
                      onChange={(e) =>
                        handleUpdateQuantity(
                          product.id,
                          Math.max(1, parseInt(e.target.value) || 1)
                        )
                      }
                      className="w-16 h-8 text-xs"
                    />
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-muted-foreground">Total:</div>
                    <div className="font-semibold">
                      R$ {getProductTotal(product).toFixed(2)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};
