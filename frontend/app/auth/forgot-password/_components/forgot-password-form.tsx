"use client";

import { RefreshCcwIcon, LogInIcon } from "lucide-react";
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
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { UserRole } from "@/apis/users";
import { useForgotPasswordMutation } from "@/queries/auth.queries";
import { OtpType } from "@/apis/auth";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
});
type Props = {
  className?: string;
};
export const ForgotPasswordForm: FC<Props> = ({ className }) => {
  const { user, isAuthenticated } = useAuth();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const router = useRouter();

  const mutation = useForgotPasswordMutation();

  useEffect(() => {
    if (isAuthenticated) {
      if (user?.role === UserRole.USER) {
        router.push("/");
      } else {
        router.push("/dashboard");
      }
    }
  }, [isAuthenticated, user, router]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await mutation.mutateAsync(values);

      toast({
        variant: "success",
        title: `Otp sent on your email (${values.email}) Successfully, redirecting you...`,
      });

      router.push(
        `/auth/verify-otp?type=${OtpType.FORGOT_PASSWORD}&email=${values.email}`,
      );
    } catch (error) {
      toast({
        variant: "destructive",
        title: error instanceof Error ? error.message : "Could not send otp",
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
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
};
