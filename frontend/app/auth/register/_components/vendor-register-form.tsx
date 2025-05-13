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
import { FC, useEffect } from "react";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";

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
    //office address
    officeLine1: z.string().min(1, { message: "Office line 1 is required." }),
    officeLine2: z.string().optional(),
    officeCountry: z
      .string()
      .min(1, { message: "Office country is required." }),
    officeState: z.string().min(1, { message: "Office state is required." }),
    officeCity: z.string().min(1, { message: "Office city is required." }),
    officePostalCode: z
      .string()
      .min(1, { message: "Office postal code is required." }),
    sameAsAddress: z.boolean().optional(),
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

  const sameAsAddress = form.watch("sameAsAddress");

  const line1 = form.watch("line1");
  const line2 = form.watch("line2");
  const country = form.watch("country");
  const state = form.watch("state");
  const city = form.watch("city");
  const postalCode = form.watch("postalCode");

  useEffect(() => {
    if (sameAsAddress) {
      form.setValue("officeLine1", form.getValues("line1"));
      form.setValue("officeLine2", form.getValues("line2"));
      form.setValue("officeCountry", form.getValues("country"));
      form.setValue("officeState", form.getValues("state"));
      form.setValue("officeCity", form.getValues("city"));
      form.setValue("officePostalCode", form.getValues("postalCode"));
    }
  }, [sameAsAddress, line1, line2, country, state, city, postalCode]);

  const router = useRouter();

  const onSubmit = async () => {
    try {
      router.push(`/membership`);
    } catch (err) {
      toast({
        variant: "destructive",
        title: err instanceof Error ? err.message : "Failed",
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
                    <Input
                      placeholder="Enter office country"
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
              name="officeState"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Office State</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter office state"
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
              name="officeCity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Office City</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter office city"
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
              name="officePostalCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Office Postal Code</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter office postal code"
                      {...field}
                      disabled={sameAsAddress}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
