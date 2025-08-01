"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Users } from "lucide-react";
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

import { Combobox } from "@/components/ui/combobox";
import { useUsersQuery } from "@/queries/users.queries";
import { UserRole } from "@/apis/users";
import { useState } from "react";
import { useAssignBidMutation } from "@/queries/bids.queries";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import Link from "next/link";

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
      await toast({
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
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vendor</FormLabel>

                  <Combobox
                    data={
                      data?.list.map((item) => ({
                        label: `${item.UserProfile?.name} - ${item.email}`,
                        value: item.id,
                      })) || []
                    }
                    placeHolder="Select Vendor"
                    fieldName={field.name}
                    value={field.value}
                    setValue={field.onChange}
                    open={open}
                    setOpen={setOpen}
                  />

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
