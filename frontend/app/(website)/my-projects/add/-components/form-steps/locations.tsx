import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, FC, SetStateAction } from "react";
import { z } from "zod";
import { AddProjectDto } from "@/apis/projects/projects.type";

// Define schema for location data validation using Zod
const locationSchema = z.object({
  line1: z.string().min(1, "Line 1 is required."),
  line2: z.string().optional(),
  country: z.string().min(1, "Country is required."),
  state: z.string().min(1, "State is required."),
  city: z.string().min(1, "City is required."),
  postalCode: z.string().min(1, "Postal code is required."),
});

type Props = {
  handlePrevious: () => void;
  handleNext: () => void;
  formData: AddProjectDto;
  setFormData: Dispatch<SetStateAction<AddProjectDto>>;
};

export const Location: FC<Props> = ({
  handleNext,
  formData,
  setFormData,
  handlePrevious,
}) => {
  const form = useForm<z.infer<typeof locationSchema>>({
    resolver: zodResolver(locationSchema),
    defaultValues: {
      line1: formData?.line1 || "",
      line2: formData?.line2 || "",
      country: formData?.country || "",
      state: formData?.state || "",
      city: formData?.city || "",
      postalCode: formData?.postalCode || "",
    },
  });

  const onSubmit = async (values: z.infer<typeof locationSchema>) => {
    setFormData((prev) => ({
      ...prev,
      line1: values.line1,
      line2: values.line2,
      country: values.country,
      state: values.state,
      city: values.city,
      postalCode: values.postalCode,
    }));

    handleNext();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="mt-4 grid w-full gap-4">
          <div className="grid gap-5 md:grid-cols-3">
            <FormField
              control={form.control}
              name="line1"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Line 1</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter address line 1" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="line2"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Line 2 (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter address line 2" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter country" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>State</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter state" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter city" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="postalCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Postal Code</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter postal code" {...field} />
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
