import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

import { DataTableColumnHeader } from "@/components/table";

import { GetAllProjectApiResponseItem } from "@/apis/projects/projects.type";
import { ProjectsTableRowActions } from "./projects-table-row-actions";
import { cn, getStatusConfig } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export type BadgeVariant =
  | "pending"
  | "success"
  | "default"
  | "secondary"
  | "destructive"
  | "outline"
  | "rejected"
  | null
  | undefined;

export const projectsColumns: ColumnDef<GetAllProjectApiResponseItem>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" className="ml-2" />
    ),
    cell: ({ row }) => {
      return (
        <Link
          className="ml-2 w-full py-2 hover:underline"
          href={`/dashboard/projects/${row.id}`}
        >
          {row.original.title}
        </Link>
      );
    },
  },

  {
    accessorKey: "description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description" />
    ),
    cell: ({ row }) => {
      return <div className="min-w-96"> {row.original.description}</div>;
    },
  },

  {
    accessorKey: "bid-history",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Bid History" />
    ),
    cell: ({ row }) => {
      return (
        <Button variant={"secondary"} asChild size={"sm"}>
          <Link href={`/dashboard/projects/${row.id}/bid-history`}>
            Bid History
          </Link>
        </Button>
      );
    },
    enableSorting: false,
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
        <Badge
          variant={statusConfig.variant as BadgeVariant}
          className={cn(statusConfig.className, "flex items-center gap-2")}
        >
          <Icon className={cn("h-3 w-3 min-w-3")} />{" "}
          <p className="whitespace-nowrap"> {statusConfig.label} </p>
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
    cell: () => null,
    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: "location",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Location" />
    ),
    cell: () => null,
    enableSorting: false,
    enableHiding: false,
  },
];
