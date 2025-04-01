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
import { FC } from "react";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useRegisterMutation } from "@/queries/auth.queries";
import { OtpType } from "@/apis/auth";
import Link from "next/link";
import { useTagsQuery } from "@/queries/tags.queries";
import { useServicesQuery } from "@/queries/services.queries";
import { Skeleton } from "@/components/ui/skeleton";
import MultipleSelector from "@/components/ui/multiple-selector";

const optionSchema = z.object({
  label: z.string(),
  value: z.string(),
  disable: z.boolean().optional(),
});

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
    tags: z.array(optionSchema).optional(),
    services: z.array(optionSchema).optional(),
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
    },
  });

  const { data: services, isLoading: isServicesLoading } = useServicesQuery();
  const { data: tags, isLoading: isTagsLoading } = useTagsQuery();

  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
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

          {/* <div className="grid gap-4 bg-white p-6 md:grid-cols-2">
            <div className="md:col-span-2">
              <p>Services & Tags</p>
            </div>
            <FormField
              control={form.control}
              name="services"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select Services</FormLabel>
                  {isServicesLoading ? (
                    <Skeleton className="h-9" />
                  ) : (
                    <MultipleSelector
                      className="flex max-w-full items-center"
                      value={field.value}
                      onChange={field.onChange}
                      defaultOptions={services?.list.map((item) => ({
                        label: item.name,
                        value: item.id,
                        disable: false,
                      }))}
                      placeholder="Select..."
                      emptyIndicator={
                        <p className="text-center text-gray-600">
                          No found found
                        </p>
                      }
                    />
                  )}
                </FormItem>
              )}
            />

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
                          No tag found
                        </p>
                      }
                    />
                  )}
                </FormItem>
              )}
            />
          </div> */}

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
