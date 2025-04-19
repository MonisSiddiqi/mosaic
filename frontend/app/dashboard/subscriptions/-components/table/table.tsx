"use client";
import { useAllPlansQuery } from "@/queries/payments.queries";
import { columns } from "./column";
import { TableToolbar } from "./table-toolbar";
import { DataTable } from "@/components/table/data-table-client";

export const AllPlansTable = () => {
  const { data } = useAllPlansQuery();
  return (
    <div className="max-w-[calc(100vw-2rem)] lg:max-w-[calc(100vw-20rem)]">
      <DataTable
        data={data || []}
        columns={columns}
        DataTableToolbar={TableToolbar}
      />
    </div>
  );
};
