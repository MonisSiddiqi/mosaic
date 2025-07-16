"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { toast } from "@/hooks/use-toast";
import { FC } from "react";
import { OtpType } from "@/apis/auth";
import {
  useProfileMutation,
  useVerifyOtpMutation,
} from "@/queries/auth.queries";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import { UserRole } from "@/apis/users";
import { LogInIcon, RefreshCcwIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  otp: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

type Props = {
  type: OtpType;
  email: string;
  className?: string;
};

export const VerifyOtpForm: FC<Props> = ({ type, email, className }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: "",
    },
  });

  const verifyMutation = useVerifyOtpMutation();

  const router = useRouter();

  const { setUser } = useAuth();

  const profileMutation = useProfileMutation();

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      await verifyMutation.mutateAsync({ type, otp: data.otp, email });

      const user = await profileMutation.mutateAsync();

      setUser(user);

      toast({
        variant: "success",
        title: "Verified Successfully",
      });

      if (user.role === UserRole.ADMIN) {
        router.push("/dashboard");
      } else if (user.role === UserRole.VENDOR) {
        router.push("/vendor");
      } else {
        router.push("/");
      }
    } catch (err) {
      toast({
        title: err instanceof Error ? err.message : "Could not verify",
        variant: "destructive",
      });
    }
  }

  if (!type || !email) {
    throw new Error("Invalid params");
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("w-full space-y-6", className)}
      >
        <FormField
          control={form.control}
          name="otp"
          render={({ field }) => (
            <FormItem>
              <FormLabel>One-Time Password</FormLabel>
              <FormControl>
                <InputOTP maxLength={6} {...field}>
                  <InputOTPGroup>
                    <InputOTPSlot className="size-12 bg-white" index={0} />
                    <InputOTPSlot className="size-12 bg-white" index={1} />
                    <InputOTPSlot className="size-12 bg-white" index={2} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot className="size-12 bg-white" index={3} />
                    <InputOTPSlot className="size-12 bg-white" index={4} />
                    <InputOTPSlot className="size-12 bg-white" index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormDescription>
                Please enter the one-time password sent to your phone.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex w-full">
          <Button
            size={"lg"}
            disabled={form.formState.isSubmitting}
            type="submit"
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
