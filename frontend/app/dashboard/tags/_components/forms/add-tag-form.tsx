import { z } from "zod";
import { useForm } from "react-hook-form";
import { RefreshCcwIcon } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC, useState } from "react";

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
import { toast } from "@/hooks/use-toast";
import { useAddTagMutation } from "@/queries/tags.queries";
import { useServicesQuery } from "@/queries/services.queries";
import { Combobox } from "@/components/ui/combobox";
import { useQueryClient } from "@tanstack/react-query";

const formSchema = z.object({
  name: z.string().min(2, "Title is required."),
  serviceId: z.string().min(1, "Service is required."),
});

type Props = {
  toggleOpen: (value: boolean) => void;
};

export const AddTagForm: FC<Props> = ({ toggleOpen }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      serviceId: "",
    },
  });

  const mutation = useAddTagMutation();

  const { data: services } = useServicesQuery();
  const [openService, setOpenService] = useState(false);
  const queryClient = useQueryClient();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await mutation.mutateAsync(values);

      await queryClient.invalidateQueries({ queryKey: ["tags"] });

      toast({
        variant: "success",
        title: "Tag Added Successfully",
      });

      toggleOpen(false);
    } catch (e) {
      toast({
        variant: "destructive",
        title: e instanceof Error ? e.message : "Failed to Add Tag",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="mt-4 grid w-full gap-4">
          {/* Title Input */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tag Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter a short and clear title"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Name that clearly describes the tag.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="serviceId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Service</FormLabel>
                <FormControl>
                  <Combobox
                    data={
                      services?.list.map((service) => ({
                        value: service.id,
                        label: service.name,
                      })) || []
                    }
                    value={field.value}
                    setValue={field.onChange}
                    open={openService}
                    setOpen={setOpenService}
                    fieldName="Service"
                  />
                </FormControl>
                <FormDescription>
                  Name that clearly describes the tag.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Submit Button */}
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
