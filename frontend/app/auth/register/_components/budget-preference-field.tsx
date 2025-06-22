"use client";

import { useFormContext } from "react-hook-form";
import * as z from "zod";
import { CoinsIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { formSchema } from "./vendor-register-form";
import { BudgetPreferenceInput } from "./budget-preference-input";

export default function BudgetPreferenceField() {
  const form = useFormContext<z.infer<typeof formSchema>>();

  return (
    <Card className="rounded-none border-none shadow-none">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CoinsIcon className="h-5 w-5 text-blue-600" />
          Budget Preference
        </CardTitle>
        <CardDescription>
          Specify your preference for the type of projects you are most
          interested in.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <FormField
            control={form.control}
            name="budgetPreference"
            render={({ field }) => (
              <FormItem className="space-y-4">
                <FormLabel className="text-base font-semibold">
                  Budget Preference
                </FormLabel>

                <FormControl>
                  <BudgetPreferenceInput
                    selectedValue={field.value}
                    setSelectedValue={field.onChange}
                  />
                </FormControl>

                <FormDescription className="text-sm text-gray-600">
                  When new projects become available, <br />
                  we can prioritize them for you based on your budget
                  preference.
                </FormDescription>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </CardContent>
    </Card>
  );
}
