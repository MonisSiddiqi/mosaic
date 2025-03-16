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
import { FC } from "react";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { checkSessionApi } from "@/apis/auth/auth.api";
import { UserRole } from "@/apis/users";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string(),
});
type Props = {
  className?: string;
};
export const LoginForm: FC<Props> = ({ className }) => {
  const { login, user } = useAuth();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const search = sessionStorage.getItem("redirect");

  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await login(values);
      await checkSessionApi();

      toast({
        variant: "success",
        title: "Login Successfully",
      });

      console.log(user?.role, UserRole.ADMIN);

      if (user?.role === UserRole.ADMIN) {
        router.push(search || "/dashboard");
      } else {
        router.push(search || "/");
      }
    } catch (e: unknown) {
      if (e instanceof Error) {
        toast({
          variant: "destructive",
          title: e.message,
        });
      }
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
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Your Password"
                    autoComplete="password"
                    type="password"
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
            Log-in
          </Button>
        </div>
      </form>
    </Form>
  );
};
