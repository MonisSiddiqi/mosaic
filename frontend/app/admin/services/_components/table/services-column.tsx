import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

import { DataTableColumnHeader } from "@/components/table";
import { Service } from "@/api/services";
import { ServicesTableRowActions } from "@/app/admin/services/_components/table/services-table-row-actions";

export const servicesColumns: ColumnDef<Service>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" className="ml-2" />
    ),
    cell: ({ row }) => {
      return <div className="ml-2">{row.original.title}</div>;
    },
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description" />
    ),
    cell: ({ row }) => {
      return <div>{row.original.title}</div>;
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
    cell: ({ row }) => <ServicesTableRowActions row={row} />,
  },
];
