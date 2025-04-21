import { Plan } from "@/apis/payments";

export type Service = {
  id: string;
  planId: string | null;
  name: string;
  description: string;
  iconUrl: string | null;
  createdAt: string;
  updatedAt: string;
  Plan: Plan | null;
};

export type ServicesListItem = Service & { VendorService: VendorService[] };

export type GetAllServicesApiResponse = {
  total: number;
  list: ServicesListItem[];
};

export type VendorService = {
  userId: string;
  serviceId: string;
  createdAt: string;
  updatedAt: string;
};

export type AddVendorServiceApiResponse = Service & {
  VendorService: VendorService[];
};
