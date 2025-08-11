import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

import { DataTableColumnHeader } from "@/components/table";
import {
  GetAllPlansApiResponseItem,
  PlanType,
} from "@/apis/payments/payments.type";

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
    accessorKey: "yearlySubscriptions",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Monthly Subscriptions" />
    ),
    cell: ({ row }) => {
      const monthly = row.original.UserPlan.filter(
        (item) => item.type === PlanType.MONTHLY,
      );

      return <div className="ml-8">{monthly.length}</div>;
    },
    enableSorting: false,
  },

  {
    accessorKey: "monthlySubscriptions",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Yearly Subscriptions" />
    ),
    cell: ({ row }) => {
      const yearly = row.original.UserPlan.filter(
        (item) => item.type === PlanType.YEARLY,
      );

      return <div className="ml-8">{yearly.length}</div>;
    },
    enableSorting: false,
  },

  {
    accessorKey: "collection",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Collection" />
    ),
    cell: ({ row }) => {
      const totalCollection = row.original.UserPlan.reduce((prev, cur) => {
        return prev + cur.amount;
      }, 0);
      return <div>${totalCollection.toFixed(2)}</div>;
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
];
