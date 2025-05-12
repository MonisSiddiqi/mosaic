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
import { Textarea } from "@/components/ui/textarea";

import { useAddProjectUpdateMutation } from "@/queries/projects.queries";
import { useQueryClient } from "@tanstack/react-query";

const formSchema = z.object({
  beforeImage: z
    .instanceof(File)
    .refine((file) => file.type.startsWith("image/"), {
      message: "Only image files are allowed.",
    }),
  afterImage: z
    .instanceof(File)
    .refine((file) => file.type.startsWith("image/"), {
      message: "Only image files are allowed.",
    }),
  description: z.string().min(5, "Description is required."),
});

type Props = {
  projectId: string;
  toggleOpen: (value: boolean) => void;
};

export const AddUpdateForm: FC<Props> = ({ toggleOpen, projectId }) => {
  const [beforeImagePreview, setBeforeImagePreview] = useState<string | null>(
    null,
  );
  const [afterImagePreview, setAfterImagePreview] = useState<string | null>(
    null,
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      beforeImage: undefined,
      afterImage: undefined,
      description: "",
    },
  });

  const queryClient = useQueryClient();

  const mutation = useAddProjectUpdateMutation();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await mutation.mutateAsync({ ...values, projectId });
      toast({
        variant: "success",
        title: "Update Added Successfully",
      });

      await queryClient.invalidateQueries({ queryKey: ["getProjectUpdates"] });

      toggleOpen(false);
    } catch (e) {
      toast({
        variant: "destructive",
        title: e instanceof Error ? e.message : "Failed to Add Update",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="mt-4 grid w-full gap-6">
          <FormField
            control={form.control}
            name="beforeImage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Before Image</FormLabel>
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
                          setBeforeImagePreview(event.target?.result as string);
                        };
                      }
                      field.onChange(file);
                    }}
                  />
                </FormControl>
                <FormDescription>
                  Upload Before Image of the site.
                </FormDescription>
                <FormMessage />
                {beforeImagePreview && (
                  <div className="mt-3">
                    <p className="text-sm font-semibold">
                      Before Image Preview:
                    </p>
                    <div className="mt-2 flex justify-center rounded-lg border bg-gray-50 p-2">
                      <img
                        src={beforeImagePreview}
                        alt="Before Image Preview"
                      />
                    </div>
                  </div>
                )}
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="afterImage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>After Image</FormLabel>
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
                          setAfterImagePreview(event.target?.result as string);
                        };
                      }
                      field.onChange(file);
                    }}
                  />
                </FormControl>
                <FormDescription>
                  Upload After Image of the site.
                </FormDescription>
                <FormMessage />
                {afterImagePreview && (
                  <div className="mt-3">
                    <p className="text-sm font-semibold">
                      Before Image Preview:
                    </p>
                    <div className="mt-2 flex justify-center rounded-lg border bg-gray-50 p-2">
                      <img src={afterImagePreview} alt="After Image Preview" />
                    </div>
                  </div>
                )}
              </FormItem>
            )}
          />

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
        </div>
      </form>
    </Form>
  );
};
