import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

import { DataTableColumnHeader } from "@/components/table";
import { GetAllUsersApiResponseItem } from "@/apis/users";
import { Badge } from "@/components/ui/badge";
import UserActiveSwitch from "../switch/user-active-switch";

export const usersColumns: ColumnDef<GetAllUsersApiResponseItem>[] = [
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" className="ml-2" />
    ),
    cell: ({ row }) => {
      return <div className="ml-2 py-2">{row.original.email}</div>;
    },
  },

  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => {
      return <div> {row.original.UserProfile?.name || "--"}</div>;
    },
  },

  {
    accessorKey: "role",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Role" />
    ),
    cell: ({ row }) => {
      const role = row.original.role;

      if (role === "USER")
        return (
          <Badge className="w-20 min-w-20 max-w-20 cursor-default bg-green-700 text-white hover:bg-green-700">
            <p className="mx-auto">User</p>
          </Badge>
        );
      if (role === "VENDOR")
        return (
          <Badge className="w-20 min-w-20 max-w-20 cursor-default bg-blue-700 text-white hover:bg-blue-700">
            <p className="mx-auto">Vendor</p>
          </Badge>
        );
      if (role === "ADMIN")
        return (
          <Badge className="w-20 min-w-20 max-w-20 cursor-default bg-orange-700 text-white hover:bg-orange-700">
            <p className="whitespace-nowrap">Admin</p>
          </Badge>
        );
    },
  },

  {
    accessorKey: "isActive",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      return (
        <UserActiveSwitch
          isActive={row.original.isActive}
          userId={row.original.id}
        />
      );
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
    accessorKey: "location",
    enableHiding: false,
  },
];
