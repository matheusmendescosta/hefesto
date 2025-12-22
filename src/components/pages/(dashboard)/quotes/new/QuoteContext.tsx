'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface ServiceOption {
  id: string;
  name: string;
  price: number;
}

interface QuoteService {
  id: string;
  name: string;
  description?: string;
  price: number;
  quantity: number;
  selectedOptions?: ServiceOption[];
}

interface ProductOption {
  id: string;
  name: string;
  price: number;
}

interface QuoteProduct {
  id: string;
  name: string;
  description?: string;
  price: number;
  quantity: number;
  selectedOptions?: ProductOption[];
}

interface QuoteClient {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
}

interface QuoteContextType {
  services: QuoteService[];
  products: QuoteProduct[];
  clients: QuoteClient[];
  selectedClient: QuoteClient | null;
  
  addService: (service: QuoteService) => void;
  removeService: (id: string) => void;
  updateService: (id: string, service: Partial<QuoteService>) => void;
  
  addProduct: (product: QuoteProduct) => void;
  removeProduct: (id: string) => void;
  updateProduct: (id: string, product: Partial<QuoteProduct>) => void;
  
  setSelectedClient: (client: QuoteClient | null) => void;
  
  getTotalAmount: () => number;
  resetQuote: () => void;
}

const QuoteContext = createContext<QuoteContextType | undefined>(undefined);

export const QuoteProvider = ({ children }: { children: ReactNode }) => {
  const [services, setServices] = useState<QuoteService[]>([]);
  const [products, setProducts] = useState<QuoteProduct[]>([]);
  const [selectedClient, setSelectedClient] = useState<QuoteClient | null>(null);

  const addService = (service: QuoteService) => {
    setServices((prev) => [...prev, service]);
  };

  const removeService = (id: string) => {
    setServices((prev) => prev.filter((s) => s.id !== id));
  };

  const updateService = (id: string, updates: Partial<QuoteService>) => {
    setServices((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...updates } : s))
    );
  };

  const addProduct = (product: QuoteProduct) => {
    setProducts((prev) => [...prev, product]);
  };

  const removeProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const updateProduct = (id: string, updates: Partial<QuoteProduct>) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
    );
  };

  const getTotalAmount = () => {
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
    return servicesTotal + productsTotal;
  };

  const resetQuote = () => {
    setServices([]);
    setProducts([]);
    setSelectedClient(null);
  };

  return (
    <QuoteContext.Provider
      value={{
        services,
        products,
        clients: [],
        selectedClient,
        addService,
        removeService,
        updateService,
        addProduct,
        removeProduct,
        updateProduct,
        setSelectedClient,
        getTotalAmount,
        resetQuote,
      }}
    >
      {children}
    </QuoteContext.Provider>
  );
};

export const useQuote = () => {
  const context = useContext(QuoteContext);
  if (!context) {
    throw new Error('useQuote deve ser usado dentro de um QuoteProvider');
  }
  return context;
};
