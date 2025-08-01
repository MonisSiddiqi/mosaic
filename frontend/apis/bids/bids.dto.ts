import { ColumnFiltersState } from "@tanstack/react-table";
import { BidStatus } from "./bids.type";

export type GetAllBidsDto = {
  sortField?: string;
  sortValue?: "desc" | "asc";
  filter?: ColumnFiltersState;
  page?: number;
  limit?: number;
};

export type BidActionDto = {
  bidId: string;
  action?: BidStatus;
  message?: string;
  attachment?: File;
};

export type AssignBidDto = {
  projectId: string;
  vendorId: string;
};
