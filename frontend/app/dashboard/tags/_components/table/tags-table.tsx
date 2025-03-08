import { DataTable } from "@/components/table";
import { useState } from "react";
import {
  ColumnFiltersState,
  PaginationState,
  SortingState,
} from "@tanstack/react-table";
import { useTagsQuery } from "@/queries/tags.queries";
import { TagsTableToolbar } from "./tags-table-toolbar";
import { tagsColumns } from "./tags-column";

export const TagsTable = () => {
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

  const { data, error, isLoading } = useTagsQuery({
    filter,
    pagination,
    sorting,
  });

  if (error) {
    throw new Error(error.message);
  }

  return (
    <div className="max-w-[calc(100vw-2rem)] lg:max-w-[calc(100vw-20rem)]">
      <DataTable
        columns={tagsColumns}
        data={{
          total: data?.total || 0,
          data: data?.list || [],
        }}
        DataTableToolbar={TagsTableToolbar}
        sorting={sorting}
        setSorting={setSorting}
        pagination={pagination}
        setPagination={setPagination}
        columnFilters={filter}
        setColumnFilters={setFilter}
        isLoading={isLoading}
      />
    </div>
  );
};
