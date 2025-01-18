import { getAllProjectsApi } from "@/api/projects/projects.api";
import { getAllUsersApi } from "@/api/users";
import { useQuery } from "@tanstack/react-query";
import {
  ColumnFiltersState,
  PaginationState,
  SortingState,
} from "@tanstack/react-table";

export const useUsersQuery = ({
  sorting,
  pagination,
  filter,
}: {
  sorting: SortingState;
  pagination: PaginationState;
  filter: ColumnFiltersState;
}) => {
  return useQuery({
    queryKey: ["users", { sorting, pagination, filter }],
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

      return getAllUsersApi({
        sortField: field?.id,
        sortValue: field?.desc ? "desc" : "asc",
        page: pagination.pageIndex + 1,
        limit: pagination.pageSize,
        filter: filter,
      });
    },
  });
};
