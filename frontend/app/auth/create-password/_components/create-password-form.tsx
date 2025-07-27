"use client";

import { RefreshCcwIcon, LogInIcon, EyeIcon, EyeOffIcon } from "lucide-react";
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
import { useRouter, useSearchParams } from "next/navigation";
import { useCreatePasswordMutation } from "@/queries/auth.queries";
import { useAuth } from "@/hooks/use-auth";
import { UserRole } from "@/apis/users";

const formSchema = z
  .object({
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
export const CreatePasswordForm: FC<Props> = ({ className }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const mutation = useCreatePasswordMutation();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { isAuthenticated, user } = useAuth();

  const router = useRouter();

  const searchParams = useSearchParams();

  const email = searchParams.get("email") as string;

  useEffect(() => {
    if (isAuthenticated) {
      if (user?.role === UserRole.USER) {
        router.push("/");
      } else {
        router.push("/dashboard");
      }
    }
  }, [isAuthenticated]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await mutation.mutateAsync({ email, password: values.password });

      toast({
        variant: "success",
        title: "Password Created Successfully, redirecting you...",
      });

      router.push(`/auth`);
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
            name="password"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className="relative flex items-center">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter Password"
                      className="border-gray-400 pr-10 focus:outline-none"
                      {...field}
                    />
                    <Button
                      type="button"
                      size={"icon"}
                      className={`absolute right-0.5 top-0.5 h-8 w-8 text-white ${showPassword ? "bg-red-800 hover:bg-red-900" : "bg-blue-900 hover:bg-blue-950"}`}
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      {showPassword ? (
                        <EyeIcon className="size-5" />
                      ) : (
                        <EyeOffIcon className="size-5" />
                      )}
                    </Button>
                  </div>
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
                  <div className="relative flex items-center">
                    <Input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Enter Password"
                      className="border-gray-400 pr-10 focus:outline-none"
                      {...field}
                    />
                    <Button
                      type="button"
                      size={"icon"}
                      className={`absolute right-0.5 top-0.5 h-8 w-8 text-white ${showConfirmPassword ? "bg-red-800 hover:bg-red-900" : "bg-blue-900 hover:bg-blue-950"}`}
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
                    >
                      {showConfirmPassword ? (
                        <EyeIcon className="size-5" />
                      ) : (
                        <EyeOffIcon className="size-5" />
                      )}
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid items-center gap-4">
            <Button
              disabled={mutation.isPending}
              type="submit"
              className="mt-4"
              size={"lg"}
            >
              {form.formState.isSubmitting ? (
                <RefreshCcwIcon className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <LogInIcon className="mr-2 h-4 w-4" />
              )}
              Submit
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};
