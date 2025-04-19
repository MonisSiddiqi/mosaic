export type Plan = {
  id: string;
  name: string;
  description: string | null;
  amount: number;
  updatedAt: string;
  createdAt: string;
};

export type GetAllPlansApiResponseItem = Plan;

export type GetAllPlansApiResponse = GetAllPlansApiResponseItem[];
