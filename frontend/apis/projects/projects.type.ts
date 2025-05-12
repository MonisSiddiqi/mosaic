import { UserProfile } from "@/apis/users";
import { Address } from "@/apis/addresses";
import { Bid } from "@/apis/bids";
import { Service } from "@/apis/services";
import { Tag } from "@/apis/tags";
import { User } from "../users";

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
  Bid: (Bid & { vendor: User & { UserProfile: UserProfile } })[];
  Service: Service;
};

export enum ProjectStatusEnum {
  IN_PROGRESS = "IN_PROGRESS",
  VENDOR_FOUND = "VENDOR_FOUND",
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

export const statusOptions = [
  { value: ProjectStatusEnum.IN_PROGRESS, label: "In Progress" },
  { value: ProjectStatusEnum.COMPLETED, label: "Completed" },
  { value: ProjectStatusEnum.AWARDED, label: "Awarded" },
];

export type ProjectUpdate = {
  id: string;
  projectId: string;
  vendorId: string | null;
  description: string;
  updatedAt: string;
  createdAt: string;
};

export type ProjectUpdateFile = {
  projectUpdateId: string;
  type: FileType;
  fileUrl: string;
};

export type AddProjectUpdateApiResponse = ProjectUpdate;

export type GetProjectUpdatesApiResponseItem = ProjectUpdate & {
  ProjectUpdateFile: ProjectUpdateFile[];
};

export type GetProjectUpdatesApiResponse = GetProjectUpdatesApiResponseItem[];

export type UpdateProjectUpdateApiResponse = ProjectUpdate;

export type DeleteProjectUpdateApiResponse = ProjectUpdate;
