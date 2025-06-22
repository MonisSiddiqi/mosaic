"use client";

import { useState } from "react";
import { useFormContext } from "react-hook-form";
import * as z from "zod";
import { MapPin, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
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
import { Input } from "@/components/ui/input";

import { formSchema } from "./vendor-register-form";

export default function ServiceDistance() {
  const form = useFormContext<z.infer<typeof formSchema>>();

  const currentDistance = Number(form.watch("serviceDistance")) || 0;

  return (
    <Card className="rounded-none border-none shadow-none">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-blue-600" />
          Service Area Configuration
        </CardTitle>
        <CardDescription>
          Define the maximum distance for your service delivery area
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <FormField
            control={form.control}
            name="serviceDistance"
            render={({ field }) => (
              <FormItem className="space-y-4">
                <FormLabel className="text-base font-semibold">
                  Service Distance
                </FormLabel>

                <FormControl>
                  <div className="relative">
                    <Input
                      type="number"
                      placeholder="Enter distance"
                      {...field}
                      className="h-12 rounded-lg border-2 border-gray-200 pl-4 pr-12 text-lg transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                      min="1"
                      max="20000"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 transform text-sm font-medium text-gray-500">
                      mi
                    </div>
                  </div>
                </FormControl>

                <FormDescription className="text-sm text-gray-600">
                  Set the maximum distance in miles for service delivery <br />
                  This determines how far from your location you're willing to
                  provide services.
                </FormDescription>

                {
                  <div className="rounded-lg border bg-gray-50 p-4">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-500">
                        Coverage Area
                      </span>
                      <span className="text-gray-700">
                        ~
                        {Math.round(
                          Math.PI * currentDistance * currentDistance,
                        ).toLocaleString()}{" "}
                        mile²
                      </span>
                    </div>
                  </div>
                }

                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </CardContent>
    </Card>
  );
}
