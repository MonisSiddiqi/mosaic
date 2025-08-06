"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { FC, useState } from "react";
import { PencilIcon, PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AddAddressForm } from "../forms/create-address.form";

type Props = {
  isEdit?: boolean;
};

export const CreateAddressSheet: FC<Props> = ({ isEdit }) => {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} modal={false} onOpenChange={(data) => setOpen(data)}>
      <SheetTrigger asChild onClick={() => setOpen(true)}>
        <Button variant={"secondary"} className="gap-2">
          {isEdit ? (
            <PencilIcon className="size-5" />
          ) : (
            <PlusIcon className="size-5" />
          )}
          Address
        </Button>
      </SheetTrigger>
      <SheetContent
        className="overflow-auto"
        onPointerDownOutside={(e) => {
          e.preventDefault();
        }}
      >
        <SheetHeader>
          <SheetTitle>{isEdit ? "Edit Address" : "Create Address"}</SheetTitle>
          <SheetDescription>
            Make Changes and click submit when {"you're"} done.
          </SheetDescription>
        </SheetHeader>
        <AddAddressForm setOpen={setOpen} />
      </SheetContent>
    </Sheet>
  );
};
