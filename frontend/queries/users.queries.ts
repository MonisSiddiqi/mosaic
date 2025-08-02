import {
  createAddressApi,
  editProfileApi,
  getAllUsersApi,
  getLoginHistoryApi,
  getUserApi,
} from "@/apis/users";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  ColumnFiltersState,
  PaginationState,
  SortingState,
} from "@tanstack/react-table";

export const useUsersQuery = (
  params: {
    sorting?: SortingState;
    pagination?: PaginationState;
    filter?: ColumnFiltersState;
  } = {},
) => {
  return useQuery({
    queryKey: ["users", params],
    queryFn: ({ queryKey }) => {
      const { sorting, pagination, filter } = queryKey[1] as {
        sorting?: SortingState;
        pagination?: PaginationState;
        filter?: ColumnFiltersState;
      };

      let field;

      if (sorting?.length) {
        [field] = sorting;
      }

      return getAllUsersApi({
        sortField: field?.id,
        sortValue: field?.desc ? "desc" : "asc",
        page: pagination?.pageIndex ? pagination.pageIndex + 1 : 1,
        limit: pagination?.pageSize || 10,
        filter: filter,
      });
    },
  });
};

export const useEditProfileMutation = () =>
  useMutation({
    mutationKey: ["editProfile"],
    mutationFn: editProfileApi,
  });

export const useCreateAddressMutation = () => {
  return useMutation({
    mutationKey: ["createAddress"],
    mutationFn: createAddressApi,
  });
};

export const useLoginHistoryQuery = ({
  pagination,
  filter,
}: {
  pagination: PaginationState;
  filter: ColumnFiltersState;
}) => {
  return useQuery({
    queryKey: ["loginHistory", { pagination, filter }],
    queryFn: ({ queryKey }) => {
      const { pagination, filter } = queryKey[1] as {
        pagination: PaginationState;
        filter: ColumnFiltersState;
      };

      return getLoginHistoryApi({
        page: pagination.pageIndex + 1,
        limit: pagination.pageSize,
        filter: filter,
      });
    },
  });
};

export const useUserQuery = (userId?: string) => {
  return useQuery({
    queryKey: ["user", userId],
    queryFn: () => (userId ? getUserApi(userId) : null),
    enabled: !!userId,
  });
};
