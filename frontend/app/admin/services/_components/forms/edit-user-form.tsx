import { z } from "zod";
import { useForm } from "react-hook-form";
import { RefreshCcwIcon } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FC } from "react";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { editUserApi } from "@/api/user.api";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({ role: z.string().min(1, "Role is required") });
type Props = {
  id: string;
  role: string;
  handleClose: (value: boolean) => void;
};

export const EditUserForm: FC<Props> = ({ id, handleClose, role }) => {
  const queryClient = useQueryClient();

  const { toast } = useToast();

  const { mutate, isPending } = useMutation({
    mutationKey: [`edit/user/${id}`],
    mutationFn: editUserApi,
    onSuccess: () => {
      toast({
        className: "bg-green-200 text-green-700",
        title: "User Updated Successfully",
      });
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
      handleClose(false);
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: error.message,
      });
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    mutate({ id, role: values.role });
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      role: role === "COLLABORATOR" ? "USER" : role,
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-5 max-w-4xl">
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a verified email to display" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="USER">User</SelectItem>
                  <SelectItem value="CONTENT_CREATOR">
                    Content Creator
                  </SelectItem>
                  <SelectItem value="SUPER_ADMIN">Admin</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>Select User Role</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          <Button disabled={isPending} type="submit" className="mt-4 px-5 py-2">
            {isPending && (
              <RefreshCcwIcon className="mr-2 h-4 w-4 animate-spin" />
            )}
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
};
