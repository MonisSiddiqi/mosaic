"use client";

import {
  RefreshCcwIcon,
  LogInIcon,
  ExternalLinkIcon,
  EyeIcon,
  EyeOffIcon,
  ChevronsUpDown,
  Check,
} from "lucide-react";
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
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";
import { useVendorRegisterMutation } from "@/queries/auth.queries";
import { OtpType } from "@/apis/auth";
import { UserRole } from "@/apis/users";
import { useAuth } from "@/hooks/use-auth";
import ServiceDistance from "./service-distance";

import validator from "validator";
import BudgetPreferenceField from "./budget-preference-field";
import GoogleMapAddressSearchBox from "@/components/google-map-address-search-box";
import { Address } from "@/apis/addresses";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import CountryList from "country-list-with-dial-code-and-flag";

const countries = CountryList.getAll();

export const formSchema = z
  .object({
    name: z.string().min(1, { message: "Name is required" }),
    email: z.string().email({ message: "Please enter a valid email address." }),
    countryCode: z.string().min(1, { message: "Dial code is required." }),
    phone: z.string().refine(
      (val) => {
        if (validator.isMobilePhone(val)) {
          return true;
        } else return false;
      },
      { message: "Please enter a valid phone number." },
    ),
    serviceDistance: z
      .string()
      .min(1, "Service distance is required")
      .refine((val) => !isNaN(Number(val)) && Number(val) >= 50, {
        message: "Please enter a valid distance greater than or equal to 50 km",
      })
      .refine((val) => Number(val) <= 20000, {
        message:
          "Please enter a valid distance less than or equal to 20,000 km",
      }),
    budgetPreference: z.number().default(5),
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
  });

type Props = {
  className?: string;
};
export const VendorRegisterForm: FC<Props> = ({ className }) => {
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      countryCode: "",
      phone: "",
      password: "",
      confirmPassword: "",
      sameAsAddress: false,
      serviceDistance: "100",
      budgetPreference: 5,
    },
  });

  const sameAsAddress = form.watch("sameAsAddress");

  const [selectedFlag, setSelectedFlag] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [address, setAddress] =
    useState<Omit<Address, "id" | "userId" | "createdAt" | "updatedAt">>();

  const [officeAddress, setofficeAddress] =
    useState<Omit<Address, "id" | "userId" | "createdAt" | "updatedAt">>();

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
    if (
      !address ||
      !address.line1 ||
      !address.city ||
      !address.state ||
      !address.country ||
      !address.postalCode ||
      !address.lat ||
      !address.lng
    ) {
      toast({
        title: "Please select your address",
        variant: "destructive",
      });
      return;
    }

    if (!values.sameAsAddress) {
      if (
        !officeAddress ||
        !officeAddress.line1 ||
        !officeAddress.city ||
        !officeAddress.state ||
        !officeAddress.country ||
        !officeAddress.postalCode ||
        !officeAddress.lat ||
        !officeAddress.lng
      ) {
        toast({
          title: "Please select your office address",
          variant: "destructive",
        });
        return;
      }
    }

    try {
      await mutation.mutateAsync({
        ...values,
        ...address,
        officeLine1: officeAddress?.line1,
        officeLine2: officeAddress?.line2,
        officeCity: officeAddress?.city,
        officeState: officeAddress?.state,
        officeCountry: officeAddress?.country,
        officePostalCode: officeAddress?.postalCode,
        officeLat: officeAddress?.lat,
        officeLng: officeAddress?.lng,
        serviceDistance: Number(values.serviceDistance),
        phone: values.countryCode + values.phone?.trim().replace(/^0+/, ""),
      });

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
          <div className="grid w-full gap-4 bg-white p-6 md:grid-cols-2">
            <div className="md:col-span-2">
              <p>Details</p>
            </div>
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

            <div className="flex w-full">
              <FormField
                control={form.control}
                name="countryCode"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Phone Number</FormLabel>
                    <Popover open={open} onOpenChange={setOpen}>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "w-[150px] justify-between",
                              !field.value && "text-muted-foreground",
                            )}
                          >
                            {field.value || "Dial Code"}{" "}
                            {selectedFlag ? `(${selectedFlag})` : null}
                            <ChevronsUpDown className="opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[350px] p-0" align="start">
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
                                    form.setValue(
                                      "countryCode",
                                      item.dial_code,
                                      { shouldValidate: true },
                                    );

                                    setSelectedFlag(item.flag);
                                    setOpen(false);
                                  }}
                                >
                                  {item.name} {item.dial_code} ({item.flag})
                                  <Check
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
                    <FormControl className="mt-[1.38rem]">
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
          </div>

          <div className="grid gap-7 bg-white p-6 md:grid-cols-2">
            <div className="md:col-span-2">
              <p>Address</p>
            </div>
            <div className="flex flex-col gap-2">
              <p className="ml-1 text-sm">Enter your address</p>
              <GoogleMapAddressSearchBox
                onSelect={(data) => {
                  setAddress(data);
                }}
              />
            </div>
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
                defaultValue={officeAddress ? officeAddress.line1 : ""}
              />
              <label htmlFor="sameAsAddress">Same as Address</label>
            </div>
            {!form.watch("sameAsAddress") && (
              <div className="flex flex-col gap-2">
                <p className="ml-1 text-sm">Enter your business address</p>
                <GoogleMapAddressSearchBox
                  onSelect={(data) => {
                    setofficeAddress(data);
                  }}
                />
              </div>
            )}
          </div>

          <ServiceDistance />

          <BudgetPreferenceField />

          <div className="grid gap-4 bg-white p-6">
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
          </div>

          <Button type="button" asChild variant={"link"} size={"lg"}>
            <Link href={"/auth/register"}>
              {" "}
              <ExternalLinkIcon className="mr-2 h-4 w-4" />
              Register as User{" "}
            </Link>
          </Button>
        </div>
      </form>
    </Form>
  );
};
