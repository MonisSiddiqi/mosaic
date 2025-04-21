import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

import { DataTableColumnHeader } from "@/components/table";
import { GetAllPlansApiResponseItem } from "@/apis/payments/payments.type";

export const columns: ColumnDef<GetAllPlansApiResponseItem>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" className="ml-2" />
    ),
    cell: ({ row }) => {
      return <div className="ml-2 py-2">{row.original.name}</div>;
    },
  },

  {
    accessorKey: "amount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Amount" />
    ),
    cell: ({ row }) => {
      return <div> ${row.original.amount + "/month"}</div>;
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
];
