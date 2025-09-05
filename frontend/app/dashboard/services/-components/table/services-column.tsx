import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

import { DataTableColumnHeader } from "@/components/table";
import { Service } from "@/apis/services";
import { ServicesTableRowActions } from "./services-table-row-actions";
import Image from "next/image";
import { EyeOffIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const servicesColumns: ColumnDef<Service>[] = [
  {
    accessorKey: "icon",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Icon" className="ml-2" />
    ),
    cell: ({ row }) => {
      const icon = row.original.iconUrl;

      return (
        <div className="ml-2 mt-2">
          {icon ? (
            <Image
              src={icon}
              alt={`@${row.original.name}`}
              width={64}
              height={64}
              className="overflow-hidden object-cover"
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
      return <div className="min-w-96"> {row.original.description}</div>;
    },
  },

  {
    accessorKey: "plan",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Plan" />
    ),
    cell: ({ row }) => {
      const name = row.original.Plan?.name;

      if (!name)
        return (
          <Badge
            variant={"secondary"}
            className="w-32 whitespace-nowrap text-gray-400"
          >
            No Plan
          </Badge>
        );

      //TODO: Have a better design
      if (name === "Essential Trades") {
        return (
          <Badge
            variant={"secondary"}
            className="bg-primary text-white hover:bg-primary"
          >
            {name}
          </Badge>
        );
      }

      if (name === "Skilled Trades") {
        return (
          <Badge
            variant={"secondary"}
            className="w-32 whitespace-nowrap bg-brand-primary text-white hover:bg-brand-primary"
          >
            {name}
          </Badge>
        );
      }

      if (name === "High-Value Trades") {
        return (
          <Badge
            variant={"secondary"}
            className="w-32 whitespace-nowrap bg-brand-gold text-white hover:bg-brand-gold"
          >
            {name}
          </Badge>
        );
      }
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
    cell: ({ row }) => <ServicesTableRowActions row={row} />,
  },
];
