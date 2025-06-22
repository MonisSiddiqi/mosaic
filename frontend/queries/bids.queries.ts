import { bidActionApi, getAllBidsApi, getBidsStatisticsApi } from "@/apis/bids";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  ColumnFiltersState,
  PaginationState,
  SortingState,
} from "@tanstack/react-table";

export const useAllBidsQuery = (queryDto?: {
  sorting?: SortingState;
  pagination?: PaginationState;
  filter?: ColumnFiltersState;
}) => {
  const { sorting, pagination, filter } = queryDto || {};

  return useQuery({
    queryKey: ["bids", { sorting, pagination, filter }],
    queryFn: () =>
      getAllBidsApi({
        sortField: sorting?.[0]?.id,
        sortValue: sorting?.[0]?.desc ? "desc" : "asc",
        page: pagination?.pageIndex,
        limit: pagination?.pageSize,
        filter,
      }),
  });
};

export const useBidActionMutation = (bidId: string) => {
  return useMutation({
    mutationKey: ["bid", bidId],
    mutationFn: bidActionApi,
  });
};

export const useBidsStatisticsQuery = () => {
  return useQuery({
    queryKey: ["bisStatistics"],
    queryFn: getBidsStatisticsApi,
  });
};
