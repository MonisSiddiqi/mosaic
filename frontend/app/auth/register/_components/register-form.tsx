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
import { FC, useState } from "react";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useRegisterMutation } from "@/queries/auth.queries";
import { OtpType } from "@/apis/auth";
import Link from "next/link";
import { useAuth } from "@/hooks/use-auth";
import { UserRole } from "@/apis/users";
import { Combobox } from "@/components/ui/combobox";

import validator from "validator";

const formSchema = z
  .object({
    name: z.string().min(1, { message: "Name is required" }),
    email: z.string().email({ message: "Please enter a valid email address." }),
    countryCode: z.string().min(1, { message: "Dial code." }),
    phone: z.string().refine(
      (val) => {
        if (validator.isMobilePhone(val)) {
          return true;
        } else return false;
      },
      { message: "Please enter a valid phone number." },
    ),
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
export const RegisterForm: FC<Props> = ({ className }) => {
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      countryCode: "",
      phone: "",
    },
  });

  const registerMutation = useRegisterMutation();

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
      await registerMutation.mutateAsync({
        ...values,
        phone: values.countryCode + values.phone?.trim().replace(/^0+/, ""),
      });

      toast({
        variant: "success",
        title: "Otp sent successfully",
      });

      router.push(
        `/auth/verify-otp?type=${OtpType.REGISTRATION}&email=${form.getValues("email")}`,
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

          <div className="flex items-baseline">
            <FormField
              control={form.control}
              name="countryCode"
              render={({ field }) => (
                <FormItem className="flex max-h-10 flex-col">
                  <FormLabel className="mb-1">Dial Code</FormLabel>
                  <FormControl>
                    <Combobox
                      data={[{ name: "USA", dialCode: "+1" }].map((item) => ({
                        label: `${item.dialCode} - ${item.name}`,
                        value: item.dialCode,
                      }))}
                      className="w-28 min-w-28 max-w-28 border border-gray-400 bg-transparent"
                      fieldName="countryCode"
                      value={field.value as string}
                      open={open}
                      setOpen={setOpen}
                      setValue={field.onChange}
                      placeHolder="Dial code"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="mt-2 w-full">
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Your phone number"
                      autoComplete="phone"
                      className="w-full border-gray-400 focus:outline-none"
                      {...field}
                      onBlur={() => {
                        if (field.value) {
                          field.onChange(field.value.trim().replace(/^0+/, ""));
                        }
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
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
          <div className="grid items-center gap-4">
            <Button
              disabled={form.formState.isSubmitting}
              type="submit"
              className="mt-4"
              size={"lg"}
            >
              {form.formState.isSubmitting ? (
                <RefreshCcwIcon className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <LogInIcon className="mr-2 h-4 w-4" />
              )}
              Register as User
            </Button>

            <Button
              type="button"
              className="mt-4 bg-brand-gold hover:bg-brand-gold/90"
              asChild
              size={"lg"}
            >
              <Link href={"/auth/register/vendor"}>
                {" "}
                <ExternalLinkIcon className="mr-2 h-4 w-4" />
                Register as Vendor{" "}
              </Link>
            </Button>

            <Button type="button" variant={"link"}>
              <Link href="/auth/forgot-password">Forgot Password?</Link>
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};
