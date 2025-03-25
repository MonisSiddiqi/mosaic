import { addProjectApi, getAllProjectsApi } from "@/apis/projects/projects.api";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  ColumnFiltersState,
  PaginationState,
  SortingState,
} from "@tanstack/react-table";

export const useProjectsQuery = (getProjectDto?: {
  sorting: SortingState;
  pagination: PaginationState;
  filter: ColumnFiltersState;
}) => {
  const { sorting, pagination, filter } = getProjectDto || {};

  return useQuery({
    queryKey: ["projects", { sorting, pagination, filter }],
    queryFn: ({ queryKey }) => {
      const { sorting, pagination, filter } = queryKey[1] as {
        sorting: SortingState;
        pagination: PaginationState;
        filter: ColumnFiltersState;
      };

      let field;

      if (sorting) {
        [field] = sorting;
      }

      return getAllProjectsApi({
        sortField: field?.id,
        sortValue: field?.desc ? "desc" : "asc",
        page: pagination?.pageIndex,
        limit: pagination?.pageSize,
        filter: filter,
      });
    },
  });
};

export const useAddProjectMutation = () => {
  return useMutation({
    mutationKey: ["addProject"],
    mutationFn: addProjectApi,
  });
};
