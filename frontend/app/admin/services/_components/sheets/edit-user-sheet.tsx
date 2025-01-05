import { FC } from "react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { EditUserForm } from "../forms/edit-user-form";

type Props = {
  id: string;
  role: string;
  open: boolean;
  setOpen: (value: boolean) => void;
};

export const EditUserSheet: FC<Props> = ({ id, setOpen, role, open }) => {
  const handleClose = (status: boolean) => setOpen(status);

  return (
    <Sheet open={open} onOpenChange={() => setOpen(!open)}>
      <SheetContent className="overflow-auto">
        <SheetHeader>
          <SheetTitle>Edit User</SheetTitle>
          <SheetDescription>
            Make Changes to this User role. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <EditUserForm handleClose={handleClose} id={id} role={role} />
      </SheetContent>
    </Sheet>
  );
};
