import { ColumnFiltersState } from "@tanstack/react-table";

export type GetProjectsDto = {
  sortField?: string;
  sortValue?: "desc" | "asc";
  filter?: ColumnFiltersState;
  page?: number;
  limit?: number;
};

export type AddProjectDto = {
  title: string;
  description: string;
  serviceId: string;
  budgetPreference: number;
  preferenceMessage?: string;
  tags: string[];

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
  siteDescription?: string;

  files: File[];
  sampleFiles: File[];
};

export type AddProjectUpdateDto = {
  projectId: string;
  description: string;
  beforeImage: File;
  afterImage: File;
};

export type UpdateProjectUpdateDto = {
  id: string;
  description: string;
};
