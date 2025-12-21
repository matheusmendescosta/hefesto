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
