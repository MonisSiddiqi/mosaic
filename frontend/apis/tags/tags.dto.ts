import { ColumnFiltersState } from "@tanstack/react-table";

export type TagsListDto = {
  sortField?: string;
  sortValue?: "desc" | "asc";
  filter?: ColumnFiltersState;
  page?: number;
  limit?: number;
};

export type AddTagDto = {
  name: string;
};

export type EditTagDto = { id: string } & AddTagDto;
