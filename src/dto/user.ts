export type UserDTO = {
  id: string;
  name: string;
  email: string;
  avatar: string;
};

export type ProductOptional = {
  id: string;
  name: string;
  description: string | null;
  price: string;
  selected: boolean;
  productId: string;
  createdAt: string;
  updatedAt: string;
};

export type Product = {
  id: string;
  name: string;
  description: string | null;
  price: string;
  sku: string | null;
  stock: number;
  createdAt: string;
  updatedAt: string;
  productOptionals: ProductOptional[];
};

export type ServiceOption = {
  id: string;
  name: string;
  description: string | null;
  price: string;
};

export type Service = {
  id: string;
  name: string;
  description: string | null;
  price: string;
  createdAt: string;
  updatedAt: string;
  serviceOptions: ServiceOption[];
};

export type Client = {
  id: string;
  name: string;
  email: string;
  document: string | null;
  phone: string | null;
  address: string | null;
  createdAt: string;
  updatedAt: string;
}

export type QuoteItem = {
  id: string;
  quoteId: string;
  productId: string | null;
  serviceId: string | null;
  description: string;
  quantity: number;
  unitPrice: string;
  total: string;
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  service: any | null;
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  product: any | null;
}

export type Quote = {
  id: string;
  number: number;
  status: 'DRAFT' | 'SENT' | 'APPROVED' | 'REJECTED' | 'PENDING';
  validUntil: string | null;
  clientId: string;
  signedAt: string | null;
  signatureIp: string;
  notes: string;
  totalValue: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  client: Client;
  items: QuoteItem[];
}