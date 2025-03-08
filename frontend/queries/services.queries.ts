import {
  addServiceApi,
  addVendorServiceApi,
  getAllServicesApi,
} from "@/apis/services";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  ColumnFiltersState,
  PaginationState,
  SortingState,
} from "@tanstack/react-table";

export const useServicesQuery = ({
  sorting,
  pagination,
  filter,
}: {
  sorting: SortingState;
  pagination: PaginationState;
  filter: ColumnFiltersState;
}) => {
  return useQuery({
    queryKey: ["services", { sorting, pagination, filter }],
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

      return getAllServicesApi({
        sortField: field?.id,
        sortValue: field?.desc ? "desc" : "asc",
        page: pagination.pageIndex + 1,
        limit: pagination.pageSize,
        filter: filter,
      });
    },
  });
};

export const useAddServiceMutation = () => {
  return useMutation({
    mutationKey: ["services"],
    mutationFn: addServiceApi,
  });
};

export const useAddVendorServiceMutation = () => {
  return useMutation({
    mutationKey: ["addVendorService"],
    mutationFn: addVendorServiceApi,
  });
};
