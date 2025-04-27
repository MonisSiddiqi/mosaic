import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import MultipleSelector from "@/components/ui/multiple-selector";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useTagsQuery } from "@/queries/tags.queries";
import { useServicesQuery } from "@/queries/services.queries";
import { Skeleton } from "@/components/ui/skeleton";
import { CheckIcon, ChevronsUpDown, LoaderIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { useAddProject } from "@/hooks/use-add-project";

const optionSchema = z.object({
  label: z.string(),
  value: z.string(),
  disable: z.boolean().optional(),
});

const formSchema = z.object({
  title: z.string().min(1, "Name is required."),
  serviceId: z.string().min(1, "ServiceId is required."),
  description: z.string().min(1, "Description is required."),
  tags: z.array(optionSchema).refine((data) => data.length > 0, {
    message: "Tags are required.",
  }),
});

export const ProjectDetails = ({}) => {
  const { formData, setFormData, handleNext } = useAddProject();
  const { data: services, isLoading: isServicesLoading } = useServicesQuery();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: formData?.title || "",
      serviceId: formData?.serviceId || "",
      description: formData?.description || "",
      tags:
        formData?.tags?.map((item) => ({
          disable: false,
          label: item,
          value: item,
        })) || [],
    },
  });

  const { data: tags, isLoading: isTagsLoading } = useTagsQuery({
    filter: [
      {
        id: "serviceId",
        value: form.watch("serviceId"),
      },
    ],
  });
  const [open, setOpen] = useState(false);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setFormData((prev) => ({
      ...prev,
      title: values.title,
      description: values.description,
      serviceId: values.serviceId,
      tags: values.tags.map((item) => item.value),
    }));

    handleNext();
  };

  useEffect(() => console.log(formData), [formData]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="mt-4 grid w-full gap-4">
          <div className="grid gap-5 md:grid-cols-2">
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
                    Enter the title of your project
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter description"
                      className="h-44"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Tell us about the project</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="serviceId"
              render={() => (
                <FormItem>
                  <FormLabel>Service</FormLabel>
                  {isServicesLoading ? (
                    <div className="flex items-center gap-2">
                      <LoaderIcon className="size-5 max-h-5 min-h-5 min-w-5 max-w-5 animate-spin" />
                      Loading Services...
                    </div>
                  ) : services ? (
                    <div className="w-full">
                      <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild className="w-full min-w-full">
                          <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={open}
                            className="w-full min-w-full justify-between"
                          >
                            {form.watch("serviceId")
                              ? services?.list?.find(
                                  (service) =>
                                    service.id === form.watch("serviceId"),
                                )?.name
                              : "Select Service..."}
                            <ChevronsUpDown className="opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0">
                          <Command>
                            <CommandInput
                              placeholder="Search Category..."
                              className="h-9"
                            />
                            <CommandList>
                              <CommandEmpty>No service found.</CommandEmpty>
                              <CommandGroup>
                                {services?.list.map((service) => (
                                  <CommandItem
                                    key={service.id}
                                    value={service.name}
                                    onSelect={(value) => {
                                      const service = services.list.find(
                                        (item) => item.name === value,
                                      );

                                      // check is already selected
                                      const isAlreadySelected =
                                        form.watch("serviceId") === service?.id;

                                      if (isAlreadySelected) {
                                        form.setValue("serviceId", "");
                                      } else {
                                        if (service) {
                                          form.setValue(
                                            "serviceId",
                                            service.id,
                                            { shouldValidate: true },
                                          );
                                        }
                                      }

                                      setOpen(false);
                                    }}
                                  >
                                    {service.name}
                                    <CheckIcon
                                      className={cn(
                                        "ml-auto",
                                        form.watch("serviceId") === service.id
                                          ? "opacity-100"
                                          : "opacity-0",
                                      )}
                                    />
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                    </div>
                  ) : (
                    "No Service found"
                  )}

                  <FormDescription>
                    Select the service under which your project falls
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {form.watch("serviceId") && (
              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select Tags</FormLabel>
                    {isTagsLoading ? (
                      <Skeleton className="h-9" />
                    ) : (
                      <MultipleSelector
                        className="flex max-w-full items-center"
                        value={field.value}
                        onChange={field.onChange}
                        defaultOptions={tags?.list.map((item) => ({
                          label: item.name,
                          value: item.id,
                          disable: false,
                        }))}
                        placeholder="Select..."
                        emptyIndicator={
                          <p className="text-center text-gray-600">
                            {form.watch("serviceId")
                              ? "No tags found"
                              : "Select the service first"}
                          </p>
                        }
                      />
                    )}
                  </FormItem>
                )}
              />
            )}

            <div className="col-span-2 mt-5 flex w-full justify-between">
              <Button type="button" variant="outline" disabled>
                Previous
              </Button>

              <Button type="submit">Next</Button>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
};
