"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { CheckCircle } from "lucide-react";

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
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import {
  useCreateAirtableRecordMutation,
  useGetAirtableRecordsQuery,
} from "@/queries/airtable.queries";
import { useQueryClient } from "@tanstack/react-query";

interface EmailCaptureFormProps {
  simplified: boolean;
}

const formSchema = z.object({
  name: z.string().min(2, "Please Enter your name"),
  email: z.string().email("Please enter a valid email address"),
  userType: z.enum(["Homeowner", "Trade Professional"], {
    errorMap: () => ({ message: "Please select an option" }),
  }),
  consent: z
    .boolean()
    .refine((data) => data, { message: "You must agree to receive updates" }),
});

type FormData = z.infer<typeof formSchema>;

export function EmailCaptureForm({ simplified }: EmailCaptureFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const mutation = useCreateAirtableRecordMutation();
  const { data: queries, refetch } = useGetAirtableRecordsQuery();

  const queryClient = useQueryClient();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      userType: undefined,
      consent: false,
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);

    data.email = data.email.trim();
    data.name = data.name.trim();

    await refetch();

    const isExist = queries?.records.find(
      (item) => item.fields.email === data.email,
    );

    if (isExist) {
      toast({
        variant: "destructive",
        title: "This email has already registered",
      });
      setIsLoading(false);
      return;
    }

    try {
      await mutation.mutateAsync({
        records: [
          { fields: { ...data, consent: data.consent ? "Yes" : "No" } },
        ],
      });

      await queryClient.invalidateQueries({
        queryKey: ["createAirtableRecord"],
      });
      toast({
        variant: "success",
        title: "Success",
        description: "You're on the waitlist!",
      });
      setSubmitted(true);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Submission failed",
        description:
          error instanceof Error ? error.message : "Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-6 text-center">
        <CheckCircle className="mb-4 h-12 w-12 text-green-500" />
        <h3 className="mb-2 text-xl font-semibold">{"You're"} in!</h3>
        <p className="text-white">
          Thanks for signing up. {"We'll"} notify you as soon as we launch.
        </p>
      </div>
    );
  }

  // Simplified version
  if (simplified) {
    return (
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-2 sm:flex-row"
      >
        <Input
          type="email"
          placeholder="Your email address"
          {...form.register("email")}
          required
          className="flex-grow"
        />
        <Button type="submit" className="bg-orange-500 hover:bg-orange-600">
          Notify Me
        </Button>
      </form>
    );
  }

  // Full form
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Your name" {...field} />
              </FormControl>
              <FormDescription>Enter your name.</FormDescription>
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
                <Input type="email" placeholder="you@example.com" {...field} />
              </FormControl>
              <FormDescription>Enter your email.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="userType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{"I'm"} a...</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Homeowner">Homeowner</SelectItem>
                    <SelectItem value="Trade Professional">
                      Trade Professional
                    </SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="consent"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <div className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>
                    I agree to receive updates from Crafty Future.{" "}
                  </FormLabel>
                </div>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-orange-500 hover:bg-orange-600"
        >
          {isLoading ? "Joining the waitlist..." : "Join the Waitlist"}
        </Button>
      </form>
    </Form>
  );
}
