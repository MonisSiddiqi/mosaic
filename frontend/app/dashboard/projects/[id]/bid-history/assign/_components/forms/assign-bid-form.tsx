"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { CheckCircleIcon, CircleXIcon, ClockIcon, Users } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";

import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { useUsersQuery } from "@/queries/users.queries";
import { UserRole } from "@/apis/users";
import { useState } from "react";
import { useAssignBidMutation } from "@/queries/bids.queries";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

const formSchema = z.object({
  vendorId: z.string().min(1, "Vendor is required"),
});

export default function AssignBidForm({ projectId }: { projectId: string }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      vendorId: "",
    },
  });

  const [open, setOpen] = useState(false);

  const { data } = useUsersQuery({
    filter: [{ id: "role", value: [UserRole.VENDOR] }],
    pagination: { pageIndex: -1, pageSize: 10 },
  });

  const mutation = useAssignBidMutation();

  const queryClient = useQueryClient();

  const router = useRouter();

  const backUrl = `/dashboard/projects/${projectId}/bid-history`;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await mutation.mutateAsync({ vendorId: values.vendorId, projectId });
      await queryClient.invalidateQueries({
        queryKey: ["projects"],
      });
      toast({
        title: "Vendor assigned successfully!",
        variant: "success",
      });
      router.push(backUrl);
    } catch (error) {
      toast({
        title:
          error instanceof Error ? error.message : "Failed to assign Vendor",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Users className="text-basf-dark-green h-6 w-6" />
          <CardTitle>Assign Bid</CardTitle>
        </div>
        <CardDescription>Assign a vendor to this project bid.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="vendorId"
              render={({}) => (
                <FormItem>
                  <FormLabel>Vendor</FormLabel>

                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className={cn("w-full min-w-96 justify-between", "")}
                      >
                        {form.watch("vendorId")
                          ? data?.list.find(
                              (item) => item.id === form.watch("vendorId"),
                            )?.UserProfile?.name
                          : "Select Vendor"}

                        <ChevronsUpDown className="opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="flex w-full max-w-2xl flex-col gap-2 bg-muted p-2 md:min-w-96">
                      <Command>
                        <CommandInput
                          placeholder={"Select Vendor..."}
                          className="h-9 border-none shadow-none"
                        />
                        <CommandList>
                          <CommandEmpty>No Vendor found.</CommandEmpty>
                          <CommandGroup className="bg-muted p-0">
                            {data?.list.map((item) => (
                              <CommandItem
                                key={item.id}
                                value={`${item.email}`}
                                disabled={
                                  !item.isAvailable ||
                                  item.UserPlan.length === 0
                                }
                                className="relative mt-2 border border-white bg-white p-4 data-[selected=true]:border data-[selected=true]:border-brand-secondary data-[selected=true]:bg-white data-[selected=true]:text-accent-foreground"
                                onSelect={(val) => {
                                  const selectedItem = data?.list.find(
                                    (item) => item.email === val,
                                  );

                                  if (!selectedItem) return;

                                  const previousVal =
                                    form.getValues("vendorId");

                                  if (previousVal === selectedItem.id) {
                                    form.setValue("vendorId", "");
                                  } else {
                                    form.setValue("vendorId", selectedItem.id, {
                                      shouldValidate: true,
                                    });
                                  }

                                  setOpen(false);
                                }}
                              >
                                <div>
                                  <p> {item.UserProfile?.name} </p>
                                  <p> {item.email} </p>
                                </div>

                                <Check
                                  className={cn(
                                    "ml-auto",
                                    form.getValues("vendorId") === item.id
                                      ? "opacity-100"
                                      : "opacity-0",
                                  )}
                                />

                                {item.UserPlan.length > 0 ? (
                                  item.isAvailable ? (
                                    <Badge className="abosolute right-1 top-1 flex w-24 gap-1 border border-green-600 bg-green-200 text-green-600 hover:bg-green-200 hover:text-green-600">
                                      <CheckCircleIcon className="size-4" />
                                      Available
                                    </Badge>
                                  ) : (
                                    <Badge className="abosolute right-1 top-1 flex w-24 gap-1 border border-yellow-600 bg-yellow-200 text-yellow-600 hover:bg-yellow-200 hover:text-yellow-600">
                                      <ClockIcon className="size-4" />
                                      Busy
                                    </Badge>
                                  )
                                ) : (
                                  <Badge className="abosolute itec right-1 top-1 flex gap-1 whitespace-nowrap border border-red-600 bg-red-200 text-red-600 hover:bg-red-200 hover:text-red-600">
                                    <CircleXIcon className="size-4 min-h-4 min-w-4" />
                                    No Active Plan
                                  </Badge>
                                )}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>

                  <FormDescription>
                    Select Vendor for this project.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-3 pt-4">
              <Button
                type="submit"
                disabled={mutation.isPending}
                className="flex-1"
              >
                {mutation.isPending ? "Assigning..." : "Assign Project"}
              </Button>
              <Button type="button" variant="outline" asChild>
                <Link href={backUrl}>Cancel</Link>
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
