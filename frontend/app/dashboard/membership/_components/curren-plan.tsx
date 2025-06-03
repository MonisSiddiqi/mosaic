"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  CreditCard,
  Star,
  CheckCircle,
  ArrowRightIcon,
} from "lucide-react";
import { FC } from "react";
import { GetCurrentPlanApiResponse } from "@/apis/payments";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const CurrentPlan: FC<GetCurrentPlanApiResponse> = (data) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  return (
    <Card className="w-full max-w-md border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-100">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold text-gray-900">
            Current Plan
          </CardTitle>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="rounded-lg border border-blue-100 bg-white py-4 text-center">
          <h3 className="mb-1 text-2xl font-bold text-gray-900">
            {data.Plan.name}
          </h3>
          <div className="flex items-center justify-center gap-2">
            <span className="text-3xl font-bold text-blue-600">
              {formatAmount(data.amount)}
            </span>
            <span className="text-sm uppercase text-gray-500">
              / {data.type.toLowerCase()}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 p-3">
          <CheckCircle className="h-5 w-5 text-green-600" />
          <span className="font-medium text-green-800">
            Active Subscription
          </span>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-3 text-sm">
            <Calendar className="h-4 w-4 text-gray-500" />
            <div>
              <span className="text-gray-600">Started: </span>
              <span className="font-medium text-gray-900">
                {formatDate(data.startDate)}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 text-sm">
            <Calendar className="h-4 w-4 text-gray-500" />
            <div>
              <span className="text-gray-600">Renews: </span>
              <span className="font-medium text-gray-900">
                {formatDate(data.endDate)}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 text-sm">
            <CreditCard className="h-4 w-4 text-gray-500" />
            <div>
              <span className="text-gray-600">Payment ID: </span>
              <span className="font-mono text-xs text-gray-900">
                {data.paymentId}
              </span>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Billing Mode:</span>
            <Badge variant="outline" className="text-xs">
              {data.mode}
            </Badge>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild variant={"outline"} className="w-full">
          <Link href={"/dashboard/services"}>
            View Services <ArrowRightIcon />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
