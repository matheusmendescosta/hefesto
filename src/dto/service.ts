export type ServiceOption = {
  id: string;
  name: string;
  description: string;
  price: string;
  selected: boolean;
  serviceId: string;
  createdAt: string;
  updatedAt: string;
};

export type Service = {
  id: string;
  name: string;
  description: string;
  price: string;
  idContaAzul: string | null;
  createdAt: string;
  updatedAt: string;
  serviceOptions: ServiceOption[];
};

export type PaginationMeta = {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};

export type ServicesResponse = {
  data: Service[];
  meta: PaginationMeta;
};
