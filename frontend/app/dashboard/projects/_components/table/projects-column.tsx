import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

import { DataTableColumnHeader } from "@/components/table";

import { GetAllProjectApiResponseItem } from "@/apis/projects/projects.type";
import { ProjectsTableRowActions } from "./projects-table-row-actions";
import { getStatusConfig } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export const projectsColumns: ColumnDef<GetAllProjectApiResponseItem>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Title"
        className="my-1 ml-2"
      />
    ),
    cell: ({ row }) => {
      return <div className="ml-2 mt-2">{row.original.title}</div>;
    },
  },

  {
    accessorKey: "description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description" />
    ),
    cell: ({ row }) => {
      return <div> {row.original.description}</div>;
    },
  },

  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const statusConfig = getStatusConfig(row.original.status);

      const Icon = statusConfig.icon;

      return (
        <Badge variant={statusConfig.variant as any}>
          <Icon className="h-3 w-3 min-w-3" /> {statusConfig.label}
        </Badge>
      );
    },
  },

  {
    accessorKey: "services",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Services" />
    ),
    cell: ({ row }) => {
      const services = row.original.Service?.name;

      if (!services) {
        return <div className="ml-4 flex">--</div>;
      }

      return (
        <div className="flex flex-wrap gap-1">
          <Badge variant="outline">{services}</Badge>
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
      <div>
        {format(new Date(row.original.createdAt), "dd MMM, yyyy hh:mm aa")}
      </div>
    ),
  },

  {
    id: "actions",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Actions" />
    ),
    cell: ({ row }) => <ProjectsTableRowActions row={row} />,
  },

  // vertual columns for filtering

  {
    accessorKey: "tags",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Location" />
    ),
    cell: ({ row }) => null,
    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: "location",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Location" />
    ),
    cell: ({ row }) => null,
    enableSorting: false,
    enableHiding: false,
  },
];
