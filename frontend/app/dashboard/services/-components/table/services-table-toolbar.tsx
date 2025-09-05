import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "@/components/table/data-table-view-options";
import { AddServiceSheet } from "../sheets/add-service-sheet";
import { DataTableFacetedFilter } from "@/components/table";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

const plans = ["Essential Trades", "High-Value Trades", "Skilled Trades"];

export function ServicesTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
      <div className="flex flex-1 flex-wrap items-center gap-4">
        <Input
          placeholder="Filter name..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        <DataTableFacetedFilter
          column={table.getColumn("plan")}
          title="Plan"
          options={plans.map((item) => ({ label: item, value: item }))}
        />
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="h-4 w-4" />
          </Button>
        )}
      </div>
      <div className="-order-1 flex items-end gap-4 md:order-none md:flex-row">
        <DataTableViewOptions table={table} />
        <AddServiceSheet />
      </div>
    </div>
  );
}
