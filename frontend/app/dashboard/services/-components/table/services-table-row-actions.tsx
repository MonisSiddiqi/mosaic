import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Row } from "@tanstack/react-table";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Service } from "@/apis/services";
import { DeleteServiceAlert } from "@/app/dashboard/services/-components/alerts/delete-service-alert";
import { EditServiceSheet } from "../sheets/edit-service-sheet";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function ServicesTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const service = row.original as Service;

  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
          >
            <DotsHorizontalIcon className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          <DropdownMenuItem onClick={() => setOpenEdit(true)}>
            Edit
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => setOpen(true)}
            className="text-basf-red"
          >
            Delete Permanently
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DeleteServiceAlert
        id={service.id}
        open={open}
        setOpen={() => setOpen(false)}
      />
      <EditServiceSheet
        id={service.id}
        title={service.name}
        description={service.description}
        open={openEdit}
        planId={service.planId}
        setOpen={() => setOpenEdit(false)}
      />
    </>
  );
}
