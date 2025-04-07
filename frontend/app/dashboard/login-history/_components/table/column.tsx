import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

import { DataTableColumnHeader } from "@/components/table";
import { GetLoginHistoryApiResponseItem } from "@/apis/users";
import { Badge } from "@/components/ui/badge";
import { CheckCircleIcon, XCircleIcon } from "lucide-react";

export const columns: ColumnDef<GetLoginHistoryApiResponseItem>[] = [
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" className="ml-2" />
    ),
    cell: ({ row }) => {
      return <div className="ml-2 py-2">{row.original.user.email}</div>;
    },

    enableSorting: false,
  },

  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => {
      return <div> {row.original.user.UserProfile?.name || "--"}</div>;
    },

    enableSorting: false,
  },

  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      return (
        <div className="w-24">
          {row.original.status ? (
            <Badge
              variant={"success"}
              className="border border-green-900 bg-green-200 text-green-900"
            >
              <CheckCircleIcon className="size-3 min-h-3 min-w-3" /> Success
            </Badge>
          ) : (
            <Badge variant="rejected">
              {" "}
              <XCircleIcon className="size-3 min-h-3 min-w-3" /> Failed
            </Badge>
          )}
        </div>
      );
    },

    enableSorting: false,
  },

  {
    accessorKey: "message",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Message" />
    ),
    cell: ({ row }) => {
      return (
        <div
          className={`${row.original.status ? "text-green-500" : "text-destructive"}`}
        >
          {row.original.message ? row.original.message : "--"}
        </div>
      );
    },

    enableSorting: false,
  },

  {
    accessorKey: "role",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Role" />
    ),
    cell: ({ row }) => {
      const role = row.original.user.role;

      return (
        <div>
          <Badge variant={"secondary"} className="w-20 min-w-20 max-w-20">
            <p className="mx-auto">{role}</p>
          </Badge>
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

    enableSorting: false,
  },
];
