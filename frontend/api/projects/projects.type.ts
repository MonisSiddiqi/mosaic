export type Project = {
  id: string;
  userId: string;
  serviceId: string | null;
  addressId: string | null;
  title: string;
  description: string;
  status: ProjectStatusEnum;
  updatedAt: string;
  createdAt: string;
};
export type GetAllProjectsApiResponse = {
  total: number;
  list: Project[];
};

export enum ProjectStatusEnum {
  IN_PROGRESS = "IN_PROGRESS",
  AWARDED = "AWARDED",
  COMPLETED = "COMPLETED",
}
