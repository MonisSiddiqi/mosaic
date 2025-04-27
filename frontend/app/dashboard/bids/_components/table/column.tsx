import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

import { DataTableColumnHeader } from "@/components/table";
import { GetAllBidsApiResponseItem } from "@/apis/bids";
import { TableRowActions } from "./table-row-actions";
import { Attachment } from "../attachment";
import { StatusBadge } from "../status-badge";

export const columns: ColumnDef<GetAllBidsApiResponseItem>[] = [
  {
    accessorKey: "text",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Project"
        className="my-1 ml-2"
      />
    ),
    cell: ({ row }) => {
      return <div className="ml-2 mt-2">{row.original.project.title}</div>;
    },
    enableSorting: false,
  },

  {
    accessorKey: "user",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Home Owner" />
    ),
    cell: ({ row }) => {
      return <div> {row.original.project.user.UserProfile.name}</div>;
    },
    enableSorting: false,
  },

  {
    accessorKey: "vendorStatus",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Your Response" />
    ),
    cell: ({ row }) => <StatusBadge status={row.original.vendorStatus} />,
  },

  {
    accessorKey: "userStatus",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Home Owner's Response" />
    ),
    cell: ({ row }) => <StatusBadge status={row.original.userStatus} />,
  },

  {
    accessorKey: "vendorAttachmentName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Proposal Attachment" />
    ),
    cell: ({ row }) => {
      const { vendorAttachmentName, vendorAttachmentUrl } = row.original;

      if (vendorAttachmentName && vendorAttachmentUrl) {
        return (
          <Attachment
            attachmentName={vendorAttachmentName}
            attachmentUrl={vendorAttachmentUrl}
          />
        );
      } else {
        return <p className="text-gray-500">None</p>;
      }
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
    cell: ({ row }) => <TableRowActions row={row} />,
  },
];
