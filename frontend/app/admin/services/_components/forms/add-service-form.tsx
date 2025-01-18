import { z } from "zod";
import { useForm } from "react-hook-form";
import { RefreshCcwIcon } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Input } from "@/components/ui/input";
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
import { FC } from "react";
import { addServiceApi } from "@/apis/services";
import { toast } from "@/hooks/use-toast";

const formSchema = z.object({
  icon: z.instanceof(File).refine((file) => file.type === "image/svg+xml", {
    message: "Only SVG files are allowed.",
  }),
  title: z.string().min(2, "Title is required."),
  description: z.string().min(5, "Description is required."),
});

type Props = {
  toggleOpen: (value: boolean) => void;
};

export const AddServiceForm: FC<Props> = ({ toggleOpen }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      icon: undefined,
      title: "",
      description: "",
    },
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ["service/add"],
    mutationFn: addServiceApi,
    onSuccess: () => {
      toast({
        className: "bg-green-200 text-green-700",
        title: "Service Added Successfully",
      });
      queryClient.invalidateQueries({
        queryKey: ["services"],
      });
      toggleOpen(false);
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: error.message,
      });
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await mutation.mutateAsync(values);
      toast({
        variant: "success",
        title: "Service Added Successfully",
      });
    } catch (e) {
      toast({
        variant: "destructive",
        title: e instanceof Error ? e.message : "Failed to Add Service",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="mt-4 grid w-full gap-4">
          <FormField
            control={form.control}
            name="icon"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Icon (SVG)</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept=".svg"
                    onChange={(e) => field.onChange(e.target.files?.[0])}
                  />
                </FormControl>
                <FormDescription>
                  Upload a .svg icon for the service.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter title" {...field} />
                </FormControl>
                <FormDescription>
                  Provide a short and descriptive title.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input placeholder="Enter description" {...field} />
                </FormControl>
                <FormDescription>
                  Give a detailed description of the service.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex w-full justify-end">
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
