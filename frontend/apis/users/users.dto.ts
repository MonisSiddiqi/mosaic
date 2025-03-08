import { ColumnFiltersState } from "@tanstack/react-table";

export type LoginDto = {
  email: string;
  password: string;
};

export type GetUsersDto = {
  sortField?: string;
  sortValue?: "desc" | "asc";
  filter?: ColumnFiltersState;
  page?: number;
  limit?: number;
};

export type EditProfileDto = {
  file?: File;
  name: string;
};

export type CreateAddressDto = {
  line1: string;
  line2?: string;
  country: string;
  state: string;
  city: string;
  postalCode: string;
};
