import { Service } from "@/apis/services";

export type Plan = {
  id: string;
  name: string;
  description: string | null;
  amount: number;
  isPopular: boolean;
  updatedAt: string;
  createdAt: string;
};

export type GetAllPlansApiResponseItem = Plan & { Service: Service[] };

export type GetAllPlansApiResponse = GetAllPlansApiResponseItem[];
