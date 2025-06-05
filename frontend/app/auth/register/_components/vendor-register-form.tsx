"use client";

import { RefreshCcwIcon, LogInIcon, ExternalLinkIcon } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FC, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";
import { Combobox } from "@/components/ui/combobox";
import { cities, countries, states } from "./address-data";
import { useVendorRegisterMutation } from "@/queries/auth.queries";
import { OtpType } from "@/apis/auth";
import { UserRole } from "@/apis/users";
import { useAuth } from "@/hooks/use-auth";

const formSchema = z
  .object({
    name: z.string().min(1, { message: "Name is required" }),
    email: z.string().email({ message: "Please enter a valid email address." }),
    line1: z.string().min(1, "Line 1 is required."),
    line2: z.string().optional(),
    country: z.string().min(1, "Country is required."),
    state: z.string().min(1, "State is required."),
    city: z.string().min(1, "City is required."),
    postalCode: z.string().min(1, "Postal code is required."),
    officeLine1: z.string().optional(),
    officeLine2: z.string().optional(),
    officeCountry: z.string().optional(),
    officeState: z.string().optional(),
    officeCity: z.string().optional(),
    officePostalCode: z.string().optional(),
    sameAsAddress: z.boolean(),
    password: z
      .string()
      .min(8, "Password must be at least 8 character")
      .refine(
        (value) =>
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
            value ?? "",
          ),
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password and confirm password does not match.",
    path: ["confirmPassword"],
  })
  .superRefine((data, ctx) => {
    if (!data.sameAsAddress) {
      if (!data.officeLine1) {
        ctx.addIssue({
          path: ["officeLine1"],
          message: "Office line 1 is required.",
          code: z.ZodIssueCode.custom,
        });
      }
      if (!data.officeCountry) {
        ctx.addIssue({
          path: ["officeCountry"],
          message: "Office country is required.",
          code: z.ZodIssueCode.custom,
        });
      }
      if (!data.officeState) {
        ctx.addIssue({
          path: ["officeState"],
          message: "Office state is required.",
          code: z.ZodIssueCode.custom,
        });
      }
      if (!data.officeCity) {
        ctx.addIssue({
          path: ["officeCity"],
          message: "Office city is required.",
          code: z.ZodIssueCode.custom,
        });
      }
      if (!data.officePostalCode) {
        ctx.addIssue({
          path: ["officePostalCode"],
          message: "Office postal code is required.",
          code: z.ZodIssueCode.custom,
        });
      }
    }
  });

type Props = {
  className?: string;
};
export const VendorRegisterForm: FC<Props> = ({ className }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      line1: "",
      line2: "",
      country: "",
      state: "",
      city: "",
      postalCode: "",
      officeLine1: "",
      officeLine2: "",
      officeCountry: "",
      officeState: "",
      officeCity: "",
      officePostalCode: "",
      sameAsAddress: false,
    },
  });

  const [countryOpen, setCountryOpen] = useState(false);
  const [stateOpen, setStateOpen] = useState(false);
  const [cityOpen, setCityOpen] = useState(false);
  const [openPostalCode, setOpenPostalCode] = useState(false);

  const [openOfficeCountry, setOpenOfficeCountry] = useState(false);
  const [openOfficeState, setOpenOfficeState] = useState(false);
  const [openOfficeCity, setOpenOfficeCity] = useState(false);
  const [openOfficePostalCode, setOpenOfficePostalCode] = useState(false);

  const sameAsAddress = form.watch("sameAsAddress");

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

  useEffect(() => {
    form.setValue("officeState", "");
    form.setValue("officeCity", "");
    form.setValue("officePostalCode", "");
  }, [form.watch("officeCountry")]);

  useEffect(() => {
    form.setValue("officeCity", "");
    form.setValue("officePostalCode", "");
  }, [form.watch("officeState")]);

  useEffect(() => {
    form.setValue("officePostalCode", "");
  }, [form.watch("officeCity")]);

  const mutation = useVendorRegisterMutation();

  const { isAuthenticated, user } = useAuth();

  const router = useRouter();

  if (isAuthenticated) {
    if (user?.role === UserRole.USER) {
      router.push("/");
    } else {
      router.push("/dashboard");
    }
  }

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await mutation.mutateAsync(values);

      toast({
        variant: "success",
        title: "Otp sent successfully",
      });

      router.push(
        `/auth/verify-otp?type=${OtpType.REGISTRATION}&email=${form.getValues("email")}&role=${UserRole.VENDOR}`,
      );
    } catch (err) {
      toast({
        variant: "destructive",
        title: err instanceof Error ? err.message : "Could not sent otp",
      });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("", className)}
      >
        <div className="grid w-full items-center gap-6">
          <div className="grid w-full grid-cols-2 gap-4 bg-white p-6">
            <div className="md:col-span-2">
              <p>Details</p>
            </div>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter name"
                      {...field}
                      className="border-gray-400 focus:outline-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Your email address"
                      autoComplete="email"
                      className="border-gray-400 focus:outline-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter Password"
                      className="border-gray-400 focus:outline-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Confirm password"
                      className="border-gray-400 focus:outline-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid gap-7 bg-white p-6 md:grid-cols-2">
            <div className="md:col-span-2">
              <p>Address</p>
            </div>
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

          <div className="grid gap-7 bg-white p-6 md:grid-cols-2">
            <p>Business Address</p>
            <div className="flex items-center gap-2 md:col-span-2">
              <Checkbox
                id="sameAsAddress"
                checked={sameAsAddress}
                onCheckedChange={(checked) =>
                  form.setValue("sameAsAddress", checked as boolean)
                }
              />
              <label htmlFor="sameAsAddress">Same as Address</label>
            </div>

            {!form.watch("sameAsAddress") && (
              <>
                <FormField
                  control={form.control}
                  name="officeLine1"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Office Line 1</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter office address line 1"
                          {...field}
                          disabled={sameAsAddress}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="officeLine2"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Office Line 2 (Optional)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter office address line 2"
                          {...field}
                          disabled={sameAsAddress}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="officeCountry"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Office Country</FormLabel>
                      <FormControl>
                        <div>
                          <Combobox
                            data={countries.map((item) => ({
                              label: item.name,
                              value: item.name,
                            }))}
                            open={openOfficeCountry}
                            setOpen={setOpenOfficeCountry}
                            value={field.value as string}
                            setValue={field.onChange}
                            fieldName="Office Country"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="officeState"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Office State</FormLabel>
                      <FormControl>
                        <div>
                          <Combobox
                            data={
                              form.watch("officeCountry")
                                ? states
                                    .filter(
                                      (item) =>
                                        item.country ===
                                        form.watch("officeCountry"),
                                    )
                                    .map((item) => ({
                                      label: item.name,
                                      value: item.name,
                                    }))
                                : []
                            }
                            open={openOfficeState}
                            setOpen={setOpenOfficeState}
                            value={field.value as string}
                            setValue={field.onChange}
                            fieldName="Office State"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="officeCity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Office City</FormLabel>
                      <FormControl>
                        <div>
                          <Combobox
                            data={
                              form.watch("officeState")
                                ? cities
                                    .filter(
                                      (item) =>
                                        item.state ===
                                        form.watch("officeState"),
                                    )
                                    .map((item) => ({
                                      label: item.name,
                                      value: item.name,
                                    }))
                                : []
                            }
                            open={openOfficeCity}
                            setOpen={setOpenOfficeCity}
                            value={field.value as string}
                            setValue={field.onChange}
                            fieldName="Office city"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="officePostalCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Office Postal Code</FormLabel>
                      <FormControl>
                        <div>
                          <Combobox
                            data={
                              cities
                                .find(
                                  (item) =>
                                    item.name === form.watch("officeCity"),
                                )
                                ?.postalCodes.map((item) => ({
                                  label: item,
                                  value: item,
                                })) ?? []
                            }
                            open={openOfficePostalCode}
                            setOpen={setOpenOfficePostalCode}
                            value={field.value as string}
                            setValue={field.onChange}
                            fieldName="Postal Code"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
          </div>

          <div className="grid gap-4 bg-white p-6 md:grid-cols-2">
            <Button
              disabled={form.formState.isSubmitting}
              type="submit"
              size={"lg"}
            >
              {form.formState.isSubmitting ? (
                <RefreshCcwIcon className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <LogInIcon className="mr-2 h-4 w-4" />
              )}
              Register
            </Button>

            <Button type="button" asChild variant={"outline"} size={"lg"}>
              <Link href={"/auth/register"}>
                {" "}
                <ExternalLinkIcon className="mr-2 h-4 w-4" />
                Register as User{" "}
              </Link>
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};
