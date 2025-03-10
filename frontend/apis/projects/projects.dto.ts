import { ColumnFiltersState } from "@tanstack/react-table";

export type GetProjectsDto = {
  sortField?: string;
  sortValue?: "desc" | "asc";
  filter?: ColumnFiltersState;
  page?: number;
  limit?: number;
};
