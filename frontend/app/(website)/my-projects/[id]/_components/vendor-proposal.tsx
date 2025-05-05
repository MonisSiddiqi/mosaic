"use client";

import { CheckIcon, Download, PaperclipIcon, XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bid, BidStatus } from "@/apis/bids";
import { User, UserProfile } from "@/apis/users";
import { getInitials } from "@/lib/utils";
import { format } from "date-fns";
import { Separator } from "@/components/ui/separator";
import { useBidActionMutation } from "@/queries/bids.queries";
import { LoaderComponent } from "@/components/loader-component";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";

export default function VendorProposal({
  id,
  vendor,
  vendorMessage,
  createdAt,
  vendorAttachmentName,
}: Bid & { vendor: User & { UserProfile: UserProfile } }) {
  const mutation = useBidActionMutation(id);
  const queryClient = useQueryClient();

  const handleAction = async (action: BidStatus) => {
    try {
      await mutation.mutateAsync({ action, bidId: id });
      await queryClient.invalidateQueries({ queryKey: ["project"] });
      toast({ variant: "success", title: "Action registered successfully" });
    } catch (error) {
      toast({
        variant: "destructive",
        title: error instanceof Error ? error.message : "Failed to update",
      });
    }
  };

  return (
    <Card className="max-w-screen-md overflow-hidden rounded-md">
      <CardHeader className="bg-green-50 p-4">
        <div className="flex gap-4">
          <Avatar className="size-14">
            <AvatarImage
              src={vendor.UserProfile.image as string}
              alt={`@${vendor.email}`}
            />
            <AvatarFallback>
              {getInitials(vendor.UserProfile.name)}
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="font-bold">{vendor.UserProfile.name}</h2>
            <p className="text-gray-500">Vendor</p>
          </div>
        </div>
      </CardHeader>

      <Separator />

      <CardContent className="mt-4">
        <div className="flex flex-col gap-4">
          <div className="flex gap-4">
            <Avatar className="size-10">
              <AvatarImage
                src={vendor.UserProfile.image as string}
                alt={`@${vendor.email}`}
              />
              <AvatarFallback>
                {getInitials(vendor.UserProfile.name)}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="rounded-md bg-gray-100 p-4">{vendorMessage}</p>
              <p className="mt-1 text-sm text-gray-500">
                {format(new Date(createdAt), "dd MMM, yyyy hh:mm aa")}
              </p>
            </div>
          </div>

          <div>
            <div className="ml-14 inline-block rounded-md bg-gray-100 p-4">
              <div className="flex gap-3">
                <PaperclipIcon className="w-5 min-w-5" />
                <div>
                  <p className="font-semibold text-gray-700">
                    {vendorAttachmentName}
                  </p>
                </div>
                <Button variant="ghost" size="icon" className="ml-4">
                  <Download className="w-5 min-w-5" />
                </Button>
              </div>
            </div>
            <p className="ml-14 mt-1 text-sm text-gray-500">
              {format(new Date(createdAt), "dd MMM, yyyy hh:mm aa")}
            </p>
          </div>
        </div>
      </CardContent>

      <CardFooter>
        <div>
          <p className="mb-6 bg-yellow-50 p-4 text-sm text-gray-600">
            Note: If you agree with the proposal, click Accept. Otherwise, you
            can choose to Reject, and we&apos;ll notify the next vendor. Please
            note, you can reject up to 3 vendors per project. If you reject more
            than 3 vendors, you&apos;ll need to review and adjust your project
            details and resubmit the project.
          </p>

          <div className="flex justify-end gap-4">
            {mutation.isPending ? (
              <>
                <LoaderComponent text="Sunmitting your response..." />{" "}
              </>
            ) : (
              <>
                <Button
                  variant="outline"
                  className="border-red-200 bg-red-50 text-red-600 hover:bg-red-100"
                  disabled={mutation.isPending}
                  onClick={() => handleAction(BidStatus.REJECTED)}
                >
                  <XIcon className="mr-2 h-4 w-4" /> No, I Reject it
                </Button>
                <Button
                  className="bg-green-500 text-white hover:bg-green-600"
                  disabled={mutation.isPending}
                  onClick={() => handleAction(BidStatus.ACCEPTED)}
                >
                  <CheckIcon className="mr-2 h-4 w-4" /> Yes, I Accept it
                </Button>
              </>
            )}
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
