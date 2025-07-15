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
import { deleteTagApi } from "@/apis/tags";

type Props = {
  id: string;
  open: boolean;
  setOpen: (value: boolean) => void;
};

export const DeleteTagAlert: FC<Props> = ({ id, open, setOpen }) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ["deleteTag", id],
    mutationFn: deleteTagApi,
  });

  const deleteTag = async () => {
    try {
      await mutation.mutateAsync(id);
      await queryClient.invalidateQueries({ queryKey: ["tags"] });
      toast({
        title: "Tag Deleted Successfully",
        variant: "success",
      });
      setOpen(false);
    } catch (e) {
      toast({
        variant: "destructive",
        title: e instanceof Error ? e.message : "Could not delete tag",
      });
    }
  };

  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the tag
            and remove related data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setOpen(false)}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction disabled={mutation.isPending} onClick={deleteTag}>
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
