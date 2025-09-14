"use client";

import {
  RefreshCcwIcon,
  LogInIcon,
  ExternalLinkIcon,
  EyeIcon,
  EyeOffIcon,
  ChevronsUpDownIcon,
  CheckIcon,
} from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import {
  Form,
  FormControl,
  FormDescription,
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
import { useRegisterMutation } from "@/queries/auth.queries";
import { OtpType } from "@/apis/auth";
import Link from "next/link";
import { useAuth } from "@/hooks/use-auth";
import { UserRole } from "@/apis/users";

import validator from "validator";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Command } from "cmdk";
import {
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import CountryList from "country-list-with-dial-code-and-flag";

const countries = CountryList.getAll();

const formSchema = z
  .object({
    file: z
      .instanceof(File)
      .refine((file) => file.type.startsWith("image/"), {
        message: "Only Image files are allowed.",
      })
      .optional(),
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
  const [filePreview, setFilePreview] = useState<string | null>(null);
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

  const [selectedFlag, setSelectedFlag] = useState("");

  const registerMutation = useRegisterMutation();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { isAuthenticated, user } = useAuth();

  const router = useRouter();

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
        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem className="mb-4">
              <FormLabel>Profile Picture (Optional)</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.readAsDataURL(file);
                      reader.onload = (event) => {
                        setFilePreview(event.target?.result as string);
                      };
                    }
                    field.onChange(file);
                  }}
                />
              </FormControl>
              <FormDescription>
                Upload your profile picture. A preview will be displayed below.
              </FormDescription>
              <FormMessage />
              {filePreview && (
                <div className="mt-3">
                  <p className="text-sm font-semibold">
                    Profile Picture Preview:
                  </p>
                  <div className="mt-2 flex justify-center rounded-lg border bg-gray-50 p-2">
                    <img
                      src={filePreview}
                      alt="Profile Preview"
                      className="h-40"
                    />
                  </div>
                </div>
              )}
            </FormItem>
          )}
        />
        <div className="grid w-full items-center gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter Full Name"
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

          <div className="flex w-full">
            <FormField
              control={form.control}
              name="countryCode"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Phone Number</FormLabel>
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger
                      asChild
                      className="border border-r-gray-300"
                    >
                      <FormControl className="border border-gray-400">
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-[150px] justify-between bg-transparent",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          {field.value || "Dial Code"}{" "}
                          {selectedFlag ? `(${selectedFlag})` : null}
                          <ChevronsUpDownIcon className="opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-[350px] border border-r-gray-300 p-0"
                      align="start"
                    >
                      <Command>
                        <CommandInput
                          placeholder="Dial code..."
                          className="h-9"
                        />
                        <CommandList>
                          <CommandEmpty>No dial code found.</CommandEmpty>
                          <CommandGroup>
                            {countries.map((item) => (
                              <CommandItem
                                value={`${item.name} - ${item.dial_code}`}
                                key={`${item.name} - ${item.dial_code}`}
                                onSelect={() => {
                                  form.setValue("countryCode", item.dial_code, {
                                    shouldValidate: true,
                                  });
                                  setSelectedFlag(item.flag);
                                  setOpen(false);
                                }}
                              >
                                {item.name} {item.dial_code} ({item.flag})
                                <CheckIcon
                                  className={cn(
                                    "ml-auto",
                                    item.dial_code === field.value
                                      ? "opacity-100"
                                      : "opacity-0",
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl className="mt-[1.38rem] border border-gray-400">
                    <Input
                      placeholder="Phone eg, 123456789"
                      className="max-w-xs"
                      {...field}
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

            <Button type="button" variant={"link"} asChild size={"lg"}>
              <Link href={"/auth/register/vendor"}>
                {" "}
                <ExternalLinkIcon className="mr-2 h-4 w-4" />
                Register as Vendor{" "}
              </Link>
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};
