"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

import { useCreateAddressMutation } from "@/queries/users.queries";
import { useAuth } from "@/hooks/use-auth";
import { Combobox } from "@/components/ui/combobox";
import {
  cities,
  countries,
  states,
} from "@/app/auth/register/_components/address-data";
import { RefreshCwIcon } from "lucide-react";

const formSchema = z.object({
  line1: z.string().min(2, "Address Line 1 is required."),
  line2: z.string().optional(),
  city: z.string().min(1, "City is required."),
  state: z.string().min(1, "State is required."),
  country: z.string().min(1, "Country is required."),
  postalCode: z.string().min(4, "Postal code is required."),
});

type Props = {
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export const AddAddressForm: FC<Props> = ({ setOpen }) => {
  const { setUser, user } = useAuth();

  const [countryOpen, setCountryOpen] = useState(false);
  const [stateOpen, setStateOpen] = useState(false);
  const [cityOpen, setCityOpen] = useState(false);
  const [openPostalCode, setOpenPostalCode] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      line1: user?.Address?.line1 || "",
      line2: user?.Address?.line2 || "",
      city: user?.Address?.city || "",
      state: user?.Address?.state || "",
      country: user?.Address?.country || "",
      postalCode: user?.Address?.postalCode || "",
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

  const mutation = useCreateAddressMutation();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const address = await mutation.mutateAsync(values);

      // const response = await fetch(
      //   "http://localhost:5000" + apiEndpoints.users.createAddress,
      //   {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //       Accept: "application/json",
      //     },
      //     credentials: "include", // This is the fetch equivalent of Axios' withCredentials: true
      //     body: JSON.stringify(values),
      //   },
      // );

      setUser((prevUser) => {
        if (!prevUser) return prevUser;

        return {
          ...prevUser,
          Address: address,
        };
      });

      toast({
        variant: "success",
        title: "Address added successfully",
      });
      setOpen(false);
    } catch (e) {
      toast({
        variant: "destructive",
        title: e instanceof Error ? e.message : "Failed to add address",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="mt-4 grid w-full gap-4">
          <FormField
            control={form.control}
            name="line1"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address Line 1</FormLabel>
                <FormControl>
                  <Input placeholder="Enter address" {...field} />
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
                <FormLabel>Address Line 2 (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="Apartment, suite, etc." {...field} />
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
                        label: item.name,
                        value: item.name,
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
                            label: item,
                            value: item,
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

        <div className="mt-7 flex w-full justify-end">
          <Button disabled={mutation.isPending} type="submit">
            {mutation.isPending && (
              <RefreshCwIcon className="size-4 animate-spin" />
            )}
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
};
