import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

import { DataTableColumnHeader } from "@/components/table";
import { Service } from "@/api/services";
import { ServicesTableRowActions } from "./services-table-row-actions";
import { useState } from "react";
import Image from "next/image";
import { EyeOffIcon } from "lucide-react";

export const servicesColumns: ColumnDef<Service>[] = [
  {
    accessorKey: "icon",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Icon" />
    ),
    cell: ({ row }) => {
      const icon = row.original.icon;
      const [imageError, setImageError] = useState(false);

      return (
        <div className="ml-2 mt-2 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 duration-300">
          {icon && !imageError ? (
            <Image
              src={icon}
              alt="Service Icon"
              width={40}
              height={40}
              className="rounded-full"
              onError={() => setImageError(true)}
            />
          ) : imageError ? (
            <span className="text-xs">Could not load</span>
          ) : (
            <EyeOffIcon size={24} className="text-gray-400" />
          )}
        </div>
      );
    },
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
