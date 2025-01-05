export type Service = {
  id: string;
  title: string;
  description: string;
  icon: string;
  createdAt: string;
  updatedAt: string;
};

export type GetAllServicesApiResponse = {
  total: number;
  list: Service[];
};
