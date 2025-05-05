"use client";

import { Row } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  DownloadCloudIcon,
  Eye,
  MoreHorizontal,
  NavigationIcon,
} from "lucide-react";
import { BidActionSheet } from "../sheets/bid-action-sheet";
import { useState } from "react";
import { GetAllBidsApiResponseItem } from "@/apis/bids";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function TableRowActions<TData extends GetAllBidsApiResponseItem>({
  row,
}: DataTableRowActionsProps<TData>) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {row.original.vendorStatus === "PENDING" && (
            <>
              <DropdownMenuItem
                onClick={() => setOpen(true)}
                className="cursor-pointer"
              >
                <NavigationIcon className="h-4 w-4" />
                Take Action
              </DropdownMenuItem>
              <DropdownMenuSeparator />
            </>
          )}

          <DropdownMenuItem className="cursor-pointer">
            <Eye className="h-4 w-4" />
            View Details
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer">
            <DownloadCloudIcon className="h-4 w-4" />
            Download Proposal
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <BidActionSheet
        open={open}
        setOpen={setOpen}
        status={row.original.vendorStatus}
        bidId={row.original.id}
      />
    </>
  );
}
