import { FC } from "react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { EditServiceForm } from "../forms/edit-service-form";

type Props = {
  id: string;
  title: string;
  description: string;
  open: boolean;
  setOpen: (value: boolean) => void;
};

export const EditServiceSheet: FC<Props> = ({
  id,
  setOpen,
  title,
  description,
  open,
}) => {
  const handleClose = (status: boolean) => setOpen(status);

  return (
    <Sheet open={open} onOpenChange={() => setOpen(!open)}>
      <SheetContent className="overflow-auto">
        <SheetHeader>
          <SheetTitle>Edit Service</SheetTitle>
          <SheetDescription>
            Make Changes to this Service. Click save when you are done.
          </SheetDescription>
        </SheetHeader>
        <EditServiceForm
          handleClose={handleClose}
          id={id}
          title={title}
          description={description}
        />
      </SheetContent>
    </Sheet>
  );
};
