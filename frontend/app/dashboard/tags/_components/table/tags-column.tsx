import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

import { DataTableColumnHeader } from "@/components/table";
import { TagsListItem } from "@/apis/tags";
import { TagsTableRowActions } from "./tags-table-row-actions";
import { Badge } from "@/components/ui/badge";

export const tagsColumns: ColumnDef<TagsListItem>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" className="ml-2" />
    ),
    cell: ({ row }) => (
      <div className="ml-2 font-medium">{row.original.name}</div>
    ),
  },
  {
    accessorKey: "service.name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Service" />
    ),
    cell: ({ row }) => {
      const serviceName = row.original.service?.name ?? "—";
      return (
        <div className="text-sm text-gray-700">
          {" "}
          <Badge variant={"secondary"}>{serviceName}</Badge>{" "}
        </div>
      );
    },
    enableSorting: false,
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created At" />
    ),
    cell: ({ row }) => (
      <div className="text-sm text-gray-600">
        {format(new Date(row.original.createdAt), "dd MMM, yyyy hh:mm aa")}
      </div>
    ),
  },
  {
    id: "actions",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Actions" />
    ),
    cell: ({ row }) => <TagsTableRowActions row={row} />,
  },
];
