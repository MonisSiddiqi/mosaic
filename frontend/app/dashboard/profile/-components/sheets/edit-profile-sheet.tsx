"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { EditProfileForm } from "../forms/edit-profile.form";
import { useState } from "react";
import { PencilIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export const EditProfileSheet = () => {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={() => setOpen(!open)}>
      <SheetTrigger asChild>
        <Button variant={"secondary"} className="gap-2">
          <PencilIcon className="size-5" /> Edit Profile
        </Button>
      </SheetTrigger>
      <SheetContent className="overflow-auto">
        <SheetHeader>
          <SheetTitle>Edit Profile</SheetTitle>
          <SheetDescription>
            Make Changes and click submit when you're done.
          </SheetDescription>
        </SheetHeader>
        <EditProfileForm setOpen={setOpen} />
      </SheetContent>
    </Sheet>
  );
};
