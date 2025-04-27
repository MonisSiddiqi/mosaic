"use client";

import { DataTable } from "@/components/table";
import { useState } from "react";
import {
  ColumnFiltersState,
  PaginationState,
  SortingState,
} from "@tanstack/react-table";
import { columns } from "./column";
import { TableToolbar } from "./table-toolbar";
import { useAllBidsQuery } from "@/queries/bids.queries";
import { ErrorBoundary } from "react-error-boundary";
import { DefaultErrorPage } from "@/components/default-error-page";

export const BidsTable = () => {
  const [filter, setFilter] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([
    {
      id: "createdAt",
      desc: true,
    },
  ]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageSize: 10,
    pageIndex: 0,
  });

  const { data, error, isLoading } = useAllBidsQuery({
    filter,
    pagination,
    sorting,
  });

  if (error) {
    throw new Error(error.message);
  }

  return (
    <div className="max-w-[calc(100vw-2rem)] lg:max-w-[calc(100vw-20rem)]">
      <ErrorBoundary FallbackComponent={DefaultErrorPage}>
        <DataTable
          columns={columns}
          data={{
            total: data?.total || 0,
            data: data?.list || [],
          }}
          DataTableToolbar={TableToolbar}
          sorting={sorting}
          setSorting={setSorting}
          pagination={pagination}
          setPagination={setPagination}
          columnFilters={filter}
          setColumnFilters={setFilter}
          isLoading={isLoading}
        />
      </ErrorBoundary>
    </div>
  );
};
