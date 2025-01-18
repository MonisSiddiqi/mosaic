export type Service = {
  id: string;
  name: string;
  description: string;
  icon: string;
  createdAt: string;
  updatedAt: string;
};

export type GetAllServicesApiResponse = {
  total: number;
  list: Service[];
};
