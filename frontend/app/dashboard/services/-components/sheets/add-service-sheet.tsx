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
import { AddServiceForm } from "../forms/add-service-form";

export const AddServiceSheet = () => {
  const [open, setOpen] = useState(false);

  const toggleOpen = (open: boolean) => setOpen(open);

  return (
    <Sheet open={open} onOpenChange={() => setOpen(!open)} modal={false}>
      <SheetTrigger asChild>
        <Button>
          <PlusIcon className="mr-2 h-4 w-4 text-gray-100" />
          Create
        </Button>
      </SheetTrigger>
      <SheetContent className="overflow-auto">
        <SheetHeader>
          <SheetTitle>New Service</SheetTitle>
          <SheetDescription>Add new service and press submit</SheetDescription>
        </SheetHeader>
        <AddServiceForm toggleOpen={toggleOpen} />
      </SheetContent>
    </Sheet>
  );
};
