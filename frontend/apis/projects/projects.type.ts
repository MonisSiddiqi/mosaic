import { Service } from "../services";
import { Tag } from "../tags";
import { Address } from "../users";

export type Project = {
  id: string;
  userId: string;
  serviceId: string | null;
  addressId: string | null;
  title: string;
  description: string;
  status: ProjectStatusEnum;
  budgetPreference: number;
  preferenceMessage: string | null;
  updatedAt: string;
  createdAt: string;
};

export type GetAllProjectApiResponseItem = Project & {
  ProjectFile: ProjectFile[];
  Service: Service;
};

export type GetAllProjectsApiResponse = {
  total: number;
  list: GetAllProjectApiResponseItem[];
};

export type ProjectFile = {
  id: string;
  projectId: string;
  url: string;
  type: FileType;
  updatedAt: string;
  createdAt: string;
};

export enum ProjectStatusEnum {
  IN_PROGRESS = "IN_PROGRESS",
  AWARDED = "AWARDED",
  COMPLETED = "COMPLETED",
}

export enum FileType {
  BEFORE = "BEFORE",
  AFTER = "AFTER",
}

export enum Unit {
  METER = "METER",
  FEET = "FEET",
  YARD = "YARD",
}

export type SiteMeasurement = {
  id: string;
  projectId: string;
  length: number | null;
  width: number | null;
  height: number | null;
  area: number | null;
  description: string | null;
  unit: Unit;
  updatedAt: string;
  createdAt: string;
};

export type ProjectTag = {
  projectId: string;
  tagId: string;
  updatedAt: string;
  createdAt: string;
  tag: Tag;
};

export type GetProjectApiResponse = Project & {
  ProjectFile: ProjectFile[];
  SampleFile: ProjectFile[];
  SiteMeasurement: SiteMeasurement;
  Address: Address;
  ProjectTag: ProjectTag[];
  ProjectUpdate: [];
  Bid: [];
  Service: Service;
};
