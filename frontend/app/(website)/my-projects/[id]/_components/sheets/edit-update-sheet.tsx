import { FC } from "react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { EditUpdateForm } from "../forms/edit-update-form";

type Props = {
  id: string;
  description: string;
  open: boolean;
  setOpen: (value: boolean) => void;
};

export const EditUpdateSheet: FC<Props> = ({
  id,
  setOpen,
  description,
  open,
}) => {
  const handleClose = (status: boolean) => setOpen(status);

  return (
    <Sheet open={open} onOpenChange={() => setOpen(!open)}>
      <SheetContent className="overflow-auto">
        <SheetHeader>
          <SheetTitle>Edit Update</SheetTitle>
          <SheetDescription>
            Make Changes to this update. Click save when you are done.
          </SheetDescription>
        </SheetHeader>
        <EditUpdateForm
          handleClose={handleClose}
          id={id}
          description={description}
        />
      </SheetContent>
    </Sheet>
  );
};
