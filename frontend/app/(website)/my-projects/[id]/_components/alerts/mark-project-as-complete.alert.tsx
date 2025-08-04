import { FC } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { RefreshCcwIcon } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "@/hooks/use-toast";
import { useDeleteProjectUpdateMutation } from "@/queries/projects.queries";
import { AlertDialogTrigger } from "@radix-ui/react-alert-dialog";
import { Button } from "@/components/ui/button";
import { useMarkProjectAsCompleteMutation } from "@/queries/bids.queries";

type Props = {
  id: string;
  open: boolean;
  projectId: string;
  setOpen: (value: boolean) => void;
};

export const MarkProjectAsCompleteAlert: FC<Props> = ({
  id,
  open,
  setOpen,
  projectId,
}) => {
  const queryClient = useQueryClient();

  const mutation = useMarkProjectAsCompleteMutation();

  const handleClick = async () => {
    try {
      await mutation.mutateAsync(id);
      await queryClient.invalidateQueries({
        queryKey: ["project", projectId],
      });
      setOpen(false);
      toast({
        title: "Project marked as completed successfully",
        variant: "success",
      });
    } catch (e) {
      toast({
        variant: "destructive",
        title:
          e instanceof Error
            ? e.message
            : "Could not mark project as completed",
      });
    }
  };

  return (
    <AlertDialog open={open}>
      <Button
        asChild
        className="bg-brand-primary text-white hover:bg-brand-primary/90"
      >
        <AlertDialogTrigger onClick={() => setOpen(true)}>
          Mark Project as Complete
        </AlertDialogTrigger>
      </Button>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            service and remove related data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            disabled={mutation.isPending}
            onClick={() => setOpen(false)}
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            disabled={mutation.isPending}
            onClick={handleClick}
          >
            {mutation.isPending && (
              <RefreshCcwIcon className="mr-2 h-4 w-4 animate-spin" />
            )}
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
