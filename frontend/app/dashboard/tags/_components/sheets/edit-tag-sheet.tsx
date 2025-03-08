import { FC } from "react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { EditTagForm } from "../forms/edit-tag-form";

type Props = {
  id: string;
  name: string;
  open: boolean;
  setOpen: (value: boolean) => void;
};

export const EditTagSheet: FC<Props> = ({ id, setOpen, name, open }) => {
  const handleClose = (status: boolean) => setOpen(status);

  return (
    <Sheet open={open} onOpenChange={() => setOpen(!open)}>
      <SheetContent className="overflow-auto">
        <SheetHeader>
          <SheetTitle>Edit Tag</SheetTitle>
          <SheetDescription>
            Make Changes to this Tag. Click save when you are done.
          </SheetDescription>
        </SheetHeader>
        <EditTagForm handleClose={handleClose} id={id} name={name} />
      </SheetContent>
    </Sheet>
  );
};
