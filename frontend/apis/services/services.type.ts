export type Service = {
  id: string;
  name: string;
  description: string;
  iconUrl: string;
  createdAt: string;
  updatedAt: string;
};

export type GetAllServicesApiResponse = {
  total: number;
  list: Service[];
};
