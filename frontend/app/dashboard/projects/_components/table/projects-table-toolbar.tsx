"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "@/components/table/data-table-view-options";
import { DataTableFacetedFilter } from "@/components/table";
import { useServicesQuery } from "@/queries/services.queries";
import { ProjectStatusEnum } from "@/apis/projects";
import { useTagsQuery } from "@/queries/tags.queries";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export const statusOptions = [
  { value: ProjectStatusEnum.IN_PROGRESS, label: "In Progress" },
  { value: ProjectStatusEnum.COMPLETED, label: "Completed" },
  { value: ProjectStatusEnum.AWARDED, label: "Awarded" },
];

export function ProjectsTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const { data } = useServicesQuery();
  const { data: tags } = useTagsQuery();

  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter title..."
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />

        <DataTableFacetedFilter
          column={table.getColumn("status")}
          title="Status"
          options={statusOptions}
        />

        <DataTableFacetedFilter
          column={table.getColumn("services")}
          title="Services"
          options={
            data?.list.map((item) => ({
              label: item.name,
              value: item.id,
            })) || []
          }
        />

        <DataTableFacetedFilter
          column={table.getColumn("tags")}
          title="Tags"
          options={
            tags?.list.map((item) => ({
              label: item.name,
              value: item.id,
            })) || []
          }
        />

        <DataTableFacetedFilter
          column={table.getColumn("location")}
          title="Location"
          options={[{ label: "Michigan", value: "Michigan" }]}
        />

        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>

      <DataTableViewOptions table={table} />
    </div>
  );
}
