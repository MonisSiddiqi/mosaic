import { userColumns } from "./services-column";
import { UserTableToolbar } from "./user-table-toolbar";
import { DataTable } from "@/components/table";
import { useState } from "react";
import {
  ColumnFiltersState,
  PaginationState,
  SortingState,
} from "@tanstack/react-table";
import { useUsersQuery } from "@/queries/users.queries";

export const UserTable = () => {
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
        columns={userColumns}
        data={{
          total: data?.total || 0,
          data: data?.list || [],
        }}
        DataTableToolbar={UserTableToolbar}
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
