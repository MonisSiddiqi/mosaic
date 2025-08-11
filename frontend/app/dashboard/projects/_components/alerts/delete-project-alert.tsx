import { FC, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { RefreshCcwIcon, Trash2Icon } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "@/hooks/use-toast";
import { useDeletProjectMutation } from "@/queries/projects.queries";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import { UserRole } from "@/apis/users";
import { Button } from "@/components/ui/button";

type Props = {
  id: string;
  text?: string;
  disabled?: boolean;
};

export const DeleteProjectAlert: FC<Props> = ({ id, text, disabled }) => {
  const [open, setOpen] = useState(false);

  const queryClient = useQueryClient();

  const mutation = useDeletProjectMutation();

  const router = useRouter();

  const { user } = useAuth();

  const handleDelete = async () => {
    try {
      await mutation.mutateAsync(id);
      await queryClient.invalidateQueries({ queryKey: ["projects"] });

      toast({
        title: "Project Deleted Successfully",
        variant: "success",
      });

      if (user?.role === UserRole.USER) {
        router.push("/my-projects");
      } else {
        router.push("/dashboard/projects");
      }

      setOpen(false);
    } catch (e) {
      toast({
        variant: "destructive",
        title: e instanceof Error ? e.message : "Could not delete",
      });
    }
  };

  return (
    <AlertDialog open={open}>
      <AlertDialogTrigger onClick={() => setOpen(true)} asChild>
        <Button
          variant="destructive"
          type="button"
          className="w-fit"
          disabled={disabled}
        >
          <Trash2Icon />
          {text ? text : "Delete Project"}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the tag
            and remove related data from our servers.
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
            onClick={handleDelete}
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
