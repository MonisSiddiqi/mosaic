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
import { TagsListItem } from "@/apis/tags";
import { DeleteTagAlert } from "@/app/dashboard/tags/_components/alerts/delete-tag-alert";
import { EditTagSheet } from "../sheets/edit-tag-sheet";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function TagsTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const tag = row.original as TagsListItem;

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
      <DeleteTagAlert id={tag.id} open={open} setOpen={() => setOpen(false)} />
      <EditTagSheet
        id={tag.id}
        name={tag.name}
        open={openEdit}
        serviceId={tag.service.id}
        setOpen={() => setOpenEdit(false)}
      />
    </>
  );
}
