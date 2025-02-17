import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import PlumbingIcon from "@/app/assets/plumbing-icon.svg";
import ElectricianIcon from "@/app/assets/electrician-icon.svg";
import FencingIcon from "@/app/assets/fencing-icon.svg";
import PaintingIcon from "@/app/assets/painting-icon.svg";
import AcIcon from "@/app/assets/ac-icon.svg";
import CleaningIcon from "@/app/assets/cleaning-icon.svg";
import TreeIcon from "@/app/assets/tree-icon.svg";
import RoofingIcon from "@/app/assets/roofing-icon.png";
import PestIcon from "@/app/assets/pest-icon.svg";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import MultipleSelector from "@/components/ui/multiple-selector";
import { string, z } from "zod";

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
import { Dispatch, FC, SetStateAction } from "react";
import { AddProjectDto } from "@/apis/projects/projects.type";

interface ProjectDetailsProps {
  updateFormData: (data: object) => void;
}

const optionSchema = z.object({
  label: z.string(),
  value: z.string(),
  disable: z.boolean().optional(),
});

const services = [
  {
    name: "Plumbing",
    icon: PlumbingIcon,
    href: "/services/plumbing",
    description:
      "Professional plumbing services for repairs, installations, and maintenance.",
  },
  {
    name: "Electrical",
    icon: ElectricianIcon,
    href: "/services/electrical",
    description:
      "Expert electrical solutions, from wiring to appliance installations.",
  },
  {
    name: "Fencing",
    icon: FencingIcon,
    href: "/services/fencing",
    description:
      "Durable and stylish fencing solutions for privacy and security.",
  },
  {
    name: "Painting",
    icon: PaintingIcon,
    href: "/services/painting",
    description:
      "High-quality painting services for interior and exterior spaces.",
  },
  {
    name: "Heating & Cooling",
    icon: AcIcon,
    href: "/services/hvac",
    description:
      "Comprehensive heating and cooling services to maintain indoor comfort.",
  },
  {
    name: "Cleaning",
    icon: CleaningIcon,
    href: "/services/cleaning",
    description:
      "Reliable cleaning services to keep your spaces spotless and fresh.",
  },
  {
    name: "Tree Service",
    icon: TreeIcon,
    href: "/services/tree-service",
    description:
      "Tree trimming, removal, and maintenance services for healthy landscapes.",
  },
  {
    name: "Roofing",
    icon: RoofingIcon,
    href: "/services/roofing",
    description:
      "Roofing repair, installation, and inspection services for your home or business.",
  },
  {
    name: "Pest Control",
    icon: PestIcon,
    href: "/services/pest-control",
    description:
      "Effective pest control solutions to protect your property and health.",
  },
];

const tags = [
  { label: "Bathroom Remodel", value: "Bathroom Remodel" },
  { label: "Roofing", value: "Roofing" },
  { label: "Driveways", value: "Driveways" },
  { label: "Tree Service", value: "Tree Service" },
  { label: "Cleaning Service", value: "Cleaning Service" },
  { label: "Fencing", value: "Fencing" },
  { label: "Painting", value: "Painting" },
  { label: "Handyman", value: "Handyman" },
  { label: "Plumbing", value: "Plumbing" },
  { label: "Electrical", value: "Electrical" },
  { label: "Kitchen Remodel", value: "Kitchen Remodel" },
  { label: "Gutter Cleaning", value: "Gutter Cleaning" },
  { label: "Pest Control", value: "Pest Control" },
  { label: "Window Repair", value: "Window Repair" },
  { label: "Heating & Cooling", value: "Heating & Cooling" },
  { label: "Holiday Lighting", value: "Holiday Lighting" },
  { label: "Carpentry", value: "Carpentry" },
  { label: "Flooring", value: "Flooring" },
  { label: "Landscaping", value: "Landscaping" },
  { label: "Garage Door Repair", value: "Garage Door Repair" },
];

const formSchema = z.object({
  title: z.string().min(1, "Name is required."),
  serviceId: z.string().min(1, "ServiceId is required."),
  description: z.string().min(1, "Description is required."),
  tags: z.array(optionSchema).refine((data) => data.length > 0, {
    message: "Tags are required.",
  }),
});

type Props = {
  handlePrevious: () => void;
  handleNext: () => void;
  currentStep: number;
  formData: AddProjectDto | undefined;
  setFormData: Dispatch<SetStateAction<AddProjectDto>>;
  steps: { title: string; icon: any }[];
};

export const ProjectDetails: FC<Props> = ({
  handleNext,
  formData,
  setFormData,
}) => {
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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="mt-4 grid w-full gap-4">
          <div className="grid grid-cols-1 gap-5">
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
                <FormItem>
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
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Service</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Service" />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                      {services.map((service) => (
                        <SelectItem key={service.name} value={service.name}>
                          {service.name}
                        </SelectItem>
                      ))}
                      <SelectItem value={"other"}>{"Other"}</SelectItem>
                    </SelectContent>
                  </Select>

                  <FormDescription>
                    Select the service under which your project falls
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select Tags</FormLabel>
                  <FormMessage />
                  <MultipleSelector
                    className="flex max-w-full items-center"
                    value={field.value}
                    onChange={field.onChange}
                    defaultOptions={services.map((item) => ({
                      label: item.name,
                      value: item.name,
                      disable: false,
                    }))}
                    placeholder="Select..."
                    emptyIndicator={
                      <p className="text-center text-gray-600">
                        No Category found.
                      </p>
                    }
                  />
                </FormItem>
              )}
            />

            <div className="flex w-full justify-between">
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
