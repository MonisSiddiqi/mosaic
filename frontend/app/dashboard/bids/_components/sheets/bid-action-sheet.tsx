"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
} from "@/components/ui/sheet";
import { BidActionForm } from "../forms/bid-action-form";
import { BidStatus } from "@/apis/bids";
import { Dispatch, FC, SetStateAction, useState } from "react";

type Props = {
  bidId: string;
  status: BidStatus;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export const BidActionSheet: FC<Props> = ({ status, open, setOpen, bidId }) => {
  return (
    <Sheet open={open} onOpenChange={(val) => setOpen(val)}>
      <SheetContent className={`w-full overflow-y-scroll sm:max-w-lg`}>
        <SheetTitle>Action</SheetTitle>
        <SheetDescription>
          Take action on this bid and this cannot be undo once submitted
        </SheetDescription>

        <BidActionForm
          bidId={bidId}
          status={status}
          open={open}
          setOpen={setOpen}
        />
      </SheetContent>
    </Sheet>
  );
};
