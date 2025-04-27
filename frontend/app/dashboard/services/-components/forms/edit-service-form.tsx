import { z } from "zod";
import { useForm } from "react-hook-form";
import { RefreshCcwIcon } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { FC } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAllPlansQuery } from "@/queries/payments.queries";
import { useEditServiceMutation } from "@/queries/services.queries";

const formSchema = z.object({
  icon: z
    .instanceof(File)
    .refine((file) => file.type === "image/svg+xml", {
      message: "Only SVG files are allowed.",
    })
    .optional(),
  title: z.string().min(2, "Title is required."),
  description: z
    .string()
    .min(
      5,
      "Description is required. Enter some long and meaningful description",
    ),
  planId: z.string().optional(),
});

type Props = {
  id: string;
  title: string;
  description: string | null;
  planId: string | null;
  handleClose: (value: boolean) => void;
};

export const EditServiceForm: FC<Props> = ({
  id,
  handleClose,
  title,
  description,
  planId,
}) => {
  const queryClient = useQueryClient();

  const { data: plans } = useAllPlansQuery();

  const mutation = useEditServiceMutation(id);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await mutation.mutateAsync({ ...values, id });

      await queryClient.invalidateQueries({ queryKey: ["services"] });

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
      title,
      description: description || "",
      planId: planId || "",
    },
  });

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
                  <Textarea
                    className="h-32"
                    placeholder="Enter description"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Give a detailed description of the service.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="planId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select Plan</FormLabel>
                <FormControl>
                  <Select
                    defaultValue={planId || ""}
                    value={field.value}
                    onValueChange={(value) => {
                      console.log(value, form.getValues("planId"));
                      if (value === "none") {
                        form.setValue("planId", "", { shouldValidate: true });
                      } else {
                        form.setValue("planId", value);
                      }
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Plan" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      {plans?.map((item) => (
                        <SelectItem
                          key={item.id}
                          value={item.id}
                          className="flex justify-between"
                        >
                          {item.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
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
