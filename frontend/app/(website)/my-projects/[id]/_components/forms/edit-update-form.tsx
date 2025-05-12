import { z } from "zod";
import { useForm } from "react-hook-form";
import { RefreshCcwIcon } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
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
import { Button } from "@/components/ui/button";

import { toast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { useUpdateProjectUpdateMutation } from "@/queries/projects.queries";

const formSchema = z.object({
  description: z
    .string()
    .min(
      5,
      "Description is required. Enter some long and meaningful description",
    ),
});

type Props = {
  id: string;
  description: string;
  handleClose: (value: boolean) => void;
};

export const EditUpdateForm: FC<Props> = ({ id, handleClose, description }) => {
  const queryClient = useQueryClient();

  const mutation = useUpdateProjectUpdateMutation();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await mutation.mutateAsync({ ...values, id });

      await queryClient.invalidateQueries({ queryKey: ["getProjectUpdates"] });

      toast({
        title: "Updated successfully",
        variant: "success",
      });

      handleClose(false);
    } catch (error) {
      toast({
        title: error instanceof Error ? error.message : "Could not update",
        variant: "destructive",
      });
    }
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: description,
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="mt-4 grid w-full gap-4">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    className="h-32"
                    placeholder="Enter description"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Tell Us about the project update.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="mt-7 flex w-full justify-end">
          <Button
            disabled={mutation.isPending}
            type="submit"
            className="mt-4 px-5 py-2"
          >
            {mutation.isPending && (
              <RefreshCcwIcon className="mr-2 h-4 w-4 animate-spin" />
            )}
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
};
