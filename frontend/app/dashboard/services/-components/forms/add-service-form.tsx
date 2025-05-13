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
import { useAddServiceMutation } from "@/queries/services.queries";
import { Textarea } from "@/components/ui/textarea";
import { useAllPlansQuery } from "@/queries/payments.queries";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  icon: z
    .instanceof(File)
    .refine((file) => file.type === "image/svg+xml", {
      message: "Only SVG files are allowed.",
    })
    .optional(),
  title: z.string().min(2, "Title is required."),
  description: z.string().min(5, "Description is required."),
  planId: z.string().optional(),
});

type Props = {
  toggleOpen: (value: boolean) => void;
};

export const AddServiceForm: FC<Props> = ({ toggleOpen }) => {
  const [svgPreview, setSvgPreview] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      icon: undefined,
      title: "",
      description: "",
      planId: "",
    },
  });

  const mutation = useAddServiceMutation();
  const { data: plans } = useAllPlansQuery();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await mutation.mutateAsync(values);
      toast({
        variant: "success",
        title: "Service Added Successfully",
      });

      toggleOpen(false);
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
        <div className="mt-4 grid w-full gap-6">
          {/* SVG Icon Upload & Preview */}
          <FormField
            control={form.control}
            name="icon"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Service Icon (SVG Format)</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept=".svg"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.readAsDataURL(file);
                        reader.onload = (event) => {
                          setSvgPreview(event.target?.result as string);
                        };
                      }
                      field.onChange(file);
                    }}
                  />
                </FormControl>
                <FormDescription>
                  Upload an SVG file to represent the service. A preview will be
                  displayed below.
                </FormDescription>
                <FormMessage />
                {svgPreview && (
                  <div className="mt-3">
                    <p className="text-sm font-semibold">SVG Preview:</p>
                    <div className="mt-2 flex justify-center rounded-lg border bg-gray-50 p-2">
                      <img
                        src={svgPreview}
                        alt="SVG Preview"
                        className="h-16 w-16"
                      />
                    </div>
                  </div>
                )}
              </FormItem>
            )}
          />

          {/* Title Input */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Service Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter a short and clear title"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Title that clearly describes the service.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Description Input */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Service Description</FormLabel>
                <FormControl>
                  <Textarea
                    className="h-32"
                    placeholder="Provide a detailed description"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Explain the service in a concise and informative manner.
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

        {/* Submit Button */}
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
