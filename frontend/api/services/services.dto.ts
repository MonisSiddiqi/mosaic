import { ColumnFiltersState } from "@tanstack/react-table";

export type ServicesListDto = {
  sortField?: string;
  sortValue?: "desc" | "asc";
  filter?: ColumnFiltersState;
  page?: number;
  limit?: number;
};

export type AddServiceDto = {
  icon: File;
  title: string;
  description: string;
};
