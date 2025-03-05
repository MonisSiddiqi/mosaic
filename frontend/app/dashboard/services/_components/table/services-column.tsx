import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

import { DataTableColumnHeader } from "@/components/table";
import { Service } from "@/apis/services";
import { ServicesTableRowActions } from "./services-table-row-actions";
import Image from "next/image";
import { EyeOffIcon } from "lucide-react";

export const servicesColumns: ColumnDef<Service>[] = [
  {
    accessorKey: "icon",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Icon" className="ml-2" />
    ),
    cell: ({ row }) => {
      const icon = row.original.iconUrl;

      console.log(icon);

      return (
        <div className="ml-2 mt-2">
          {icon ? (
            <Image
              src={icon}
              alt={`@${row.original.name}`}
              width={44}
              height={44}
              className="overflow-hidden"
            />
          ) : (
            <div className="flex h-11 w-11 items-center justify-center bg-gray-100">
              <EyeOffIcon size={24} className="text-gray-400" />
            </div>
          )}
        </div>
      );
    },
    enableSorting: false,
  },

  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" className="ml-2" />
    ),
    cell: ({ row }) => {
      return <div className="ml-2">{row.original.name}</div>;
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
