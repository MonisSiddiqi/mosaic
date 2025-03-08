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
import { Button } from "@/components/ui/button";

import { toast } from "@/hooks/use-toast";
import { editTagApi } from "@/apis/tags";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  name: z.string().min(2, "Name is required."),
});

type Props = {
  id: string;
  name: string;
  handleClose: (value: boolean) => void;
};

export const EditTagForm: FC<Props> = ({ id, handleClose, name }) => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: [`editTag`, id],
    mutationFn: editTagApi,
    onSuccess: () => {
      toast({
        variant: "success",
        title: "Tag Updated Successfully",
      });
      queryClient.invalidateQueries({
        queryKey: ["tags"],
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
    mutate({ id, ...values });
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name,
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="mt-4 grid w-full gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter title" {...field} />
                </FormControl>
                <FormDescription>Provide a name of the tag.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex w-full justify-end">
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
