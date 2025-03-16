import { addTagApi, addVendorTagApi, getAllTagsApi } from "@/apis/tags";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  ColumnFiltersState,
  PaginationState,
  SortingState,
} from "@tanstack/react-table";

export const useTagsQuery = (getTagsDto?: {
  sorting?: SortingState;
  pagination?: PaginationState;
  filter?: ColumnFiltersState;
}) => {
  const { sorting, pagination, filter } = getTagsDto ?? {};

  return useQuery({
    queryKey: ["tags", { sorting, pagination, filter }],
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

      return getAllTagsApi({
        sortField: field?.id,
        sortValue: field?.desc ? "desc" : "asc",
        page: pagination?.pageIndex,
        limit: pagination?.pageSize,
        filter: filter,
      });
    },
  });
};

export const useAddTagMutation = () => {
  return useMutation({
    mutationKey: ["tags"],
    mutationFn: addTagApi,
  });
};

export const useAddVendorTagMutation = () => {
  return useMutation({
    mutationKey: ["addVendorTag"],
    mutationFn: addVendorTagApi,
  });
};
