import { useState } from "react";
import { PlusIcon } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { AddTagForm } from "../forms/add-tag-form";

export const AddTagSheet = () => {
  const [open, setOpen] = useState(false);

  const toggleOpen = (open: boolean) => setOpen(open);

  return (
    <Sheet open={open} onOpenChange={() => setOpen(!open)} modal={false}>
      <SheetTrigger asChild>
        <Button>
          <PlusIcon className="h-4 w-4 text-gray-100" />
          Create
        </Button>
      </SheetTrigger>
      <SheetContent className="overflow-auto">
        <SheetHeader>
          <SheetTitle>New Tag</SheetTitle>
          <SheetDescription>Add new tag and press submit</SheetDescription>
        </SheetHeader>
        <AddTagForm toggleOpen={toggleOpen} />
      </SheetContent>
    </Sheet>
  );
};
