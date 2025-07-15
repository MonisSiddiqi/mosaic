"use client";

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
import { z } from "zod";
import { useAddProject } from "@/hooks/use-add-project";
import { useEffect, useState } from "react";
import { Combobox } from "@/components/ui/combobox";
import {
  cities,
  countries,
  states,
} from "@/app/auth/register/_components/address-data";

const locationSchema = z.object({
  line1: z.string().min(1, "Line 1 is required."),
  line2: z.string().optional(),
  country: z.string().min(1, "Country is required."),
  state: z.string().min(1, "State is required."),
  city: z.string().min(1, "City is required."),
  postalCode: z.string().min(1, "Postal code is required."),
});

export const Location = ({}) => {
  const { formData, setFormData, handleNext, handlePrev } = useAddProject();

  const [countryOpen, setCountryOpen] = useState(false);
  const [stateOpen, setStateOpen] = useState(false);
  const [cityOpen, setCityOpen] = useState(false);
  const [openPostalCode, setOpenPostalCode] = useState(false);

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

  useEffect(() => {
    form.setValue("state", "");
    form.setValue("city", "");
    form.setValue("postalCode", "");
  }, [form.watch("country")]);

  useEffect(() => {
    form.setValue("city", "");
    form.setValue("postalCode", "");
  }, [form.watch("state")]);

  useEffect(() => {
    form.setValue("postalCode", "");
  }, [form.watch("city")]);

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
          <div className="grid gap-7 md:grid-cols-2">
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
                    <div>
                      <Combobox
                        data={countries.map((item) => ({
                          label: `${item.code} - ${item.name}(${item.flag})`,
                          value: item.code,
                        }))}
                        open={countryOpen}
                        setOpen={setCountryOpen}
                        value={field.value}
                        setValue={field.onChange}
                        fieldName="country"
                      />
                    </div>
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
                    <div>
                      <Combobox
                        data={
                          form.watch("country")
                            ? states
                                .filter(
                                  (item) =>
                                    item.country === form.watch("country"),
                                )
                                .map((item) => ({
                                  label: item.name,
                                  value: item.name,
                                }))
                            : []
                        }
                        open={stateOpen}
                        setOpen={setStateOpen}
                        value={field.value}
                        setValue={field.onChange}
                        fieldName="state"
                      />
                    </div>
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
                    <div>
                      <Combobox
                        data={
                          form.watch("state")
                            ? cities
                                .filter(
                                  (item) => item.state === form.watch("state"),
                                )
                                .map((item) => ({
                                  label: item.name,
                                  value: item.name,
                                }))
                            : []
                        }
                        open={cityOpen}
                        setOpen={setCityOpen}
                        value={field.value}
                        setValue={field.onChange}
                        fieldName="city"
                      />
                    </div>
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
                    <div>
                      <Combobox
                        data={
                          cities
                            .find((item) => item.name === form.watch("city"))
                            ?.postalCodes.map((item) => ({
                              label: String(item),
                              value: String(item),
                            })) ?? []
                        }
                        open={openPostalCode}
                        setOpen={setOpenPostalCode}
                        value={field.value}
                        setValue={field.onChange}
                        fieldName="Postal Code"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="mt-4 flex w-full justify-between">
            <Button type="button" variant="outline" onClick={handlePrev}>
              Previous
            </Button>

            <Button type="submit">Next</Button>
          </div>
        </div>
      </form>
    </Form>
  );
};
