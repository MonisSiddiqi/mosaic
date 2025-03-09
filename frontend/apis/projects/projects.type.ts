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

export enum Preference {
  HIGH_QUALITY = "HIGH_QUALITY",
  LOW_PRICE = "LOW_PRICE",
}

export type AddProjectDto = {
  title: string;
  description: string;
  serviceId: string;
  preference?: Preference;
  tags?: string[];

  line1: string;
  line2?: string;
  country: string;
  state: string;
  city: string;
  postalCode: string;

  length?: string;
  width?: string;
  height?: string;
  area?: string;

  files?: File[];
};
