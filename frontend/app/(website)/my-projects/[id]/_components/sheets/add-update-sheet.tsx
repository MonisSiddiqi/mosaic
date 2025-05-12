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
import { AddUpdateForm } from "../forms/add-update-form";

export const AddUpdateSheet = ({ projectId }: { projectId: string }) => {
  const [open, setOpen] = useState(false);

  const toggleOpen = (open: boolean) => setOpen(open);

  return (
    <Sheet open={open} onOpenChange={() => setOpen(!open)} modal={false}>
      <SheetTrigger asChild>
        <Button>
          <PlusIcon className="h-4 w-4 text-gray-100" />
          Add Update
        </Button>
      </SheetTrigger>
      <SheetContent className="overflow-auto">
        <SheetHeader>
          <SheetTitle>Add new update</SheetTitle>
          <SheetDescription>Add new update and press submit</SheetDescription>
        </SheetHeader>
        <AddUpdateForm toggleOpen={toggleOpen} projectId={projectId} />
      </SheetContent>
    </Sheet>
  );
};
