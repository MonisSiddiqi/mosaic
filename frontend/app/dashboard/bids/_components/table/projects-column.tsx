import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

import { DataTableColumnHeader } from "@/components/table";

import { Project } from "@/apis/projects/projects.type";
import { ProjectsTableRowActions } from "./projects-table-row-actions";

export const projectsColumns: ColumnDef<Project>[] = [
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
      return <div> {row.original.status}</div>;
    },
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
];
