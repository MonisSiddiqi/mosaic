import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, FC, SetStateAction } from "react";
import { z } from "zod";
import { AddProjectDto } from "@/apis/projects/projects.type";

// Define schema where all fields are optional
const measurementsSchema = z.object({
  length: z.string().optional(),
  width: z.string().optional(),
  height: z.string().optional(),
  area: z.string().optional(),
});

type Props = {
  handlePrevious: () => void;
  handleNext: () => void;
  formData: AddProjectDto;
  setFormData: Dispatch<SetStateAction<AddProjectDto>>;
};

export const SiteMeasurements: FC<Props> = ({
  handlePrevious,
  handleNext,
  formData,
  setFormData,
}) => {
  const form = useForm<z.infer<typeof measurementsSchema>>({
    resolver: zodResolver(measurementsSchema),
    defaultValues: {
      length: formData?.length || "",
      width: formData?.width || "",
      height: formData?.height || "",
      area: formData?.area || "",
    },
  });

  const onSubmit = async (values: z.infer<typeof measurementsSchema>) => {
    setFormData((prev) => ({
      ...prev,
      length: values.length,
      width: values.width,
      height: values.height,
      area: values.area,
    }));

    handleNext();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="mt-4 grid w-full gap-4">
          <div className="grid gap-5 md:grid-cols-2">
            <FormField
              control={form.control}
              name="length"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Length</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter length (optional)" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="width"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Width</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter width (optional)" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="height"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Height</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter height (optional)" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="area"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Area</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter area (optional)" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="mt-4 flex w-full justify-between">
            <Button type="button" variant="outline" onClick={handlePrevious}>
              Previous
            </Button>

            <Button type="submit">Next</Button>
          </div>
        </div>
      </form>
    </Form>
  );
};
