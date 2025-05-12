import { FC } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
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
import { deleteServiceApi } from "@/apis/services";
import { useDeleteProjectUpdateMutation } from "@/queries/projects.queries";

type Props = {
  id: string;
  open: boolean;
  setOpen: (value: boolean) => void;
};

export const DeleteProjectUpdateAlert: FC<Props> = ({ id, open, setOpen }) => {
  const queryClient = useQueryClient();

  const mutation = useDeleteProjectUpdateMutation();

  const deleteService = async () => {
    try {
      await mutation.mutateAsync(id);
      await queryClient.invalidateQueries({ queryKey: ["getProjectUpdates"] });
      setOpen(false);
      toast({
        title: "Update Deleted Successfully",
        className: "text-green-800 bg-green-200",
      });
    } catch (e) {
      toast({
        variant: "destructive",
        title: e instanceof Error ? e.message : "Could not delete",
      });
    }
  };

  return (
    <AlertDialog open={open}>
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
            onClick={deleteService}
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
