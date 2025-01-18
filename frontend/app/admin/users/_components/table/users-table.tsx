import { DataTable } from "@/components/table";
import { useState } from "react";
import {
  ColumnFiltersState,
  PaginationState,
  SortingState,
} from "@tanstack/react-table";
import { usersColumns } from "./users-column";
import { UsersTableToolbar } from "./users-table-toolbar";
import { useUsersQuery } from "@/queries/users.queries";

export const UsersTable = () => {
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

  const { data, error, isLoading } = useUsersQuery({
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
        columns={usersColumns}
        data={{
          total: data?.total || 0,
          data: data?.list || [],
        }}
        DataTableToolbar={UsersTableToolbar}
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
