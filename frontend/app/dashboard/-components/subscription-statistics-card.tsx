"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useDashboardQuery } from "@/queries/dashboard.queries";
import { CreditCardIcon } from "lucide-react";

export const SubscriptionStatisticsCard = () => {
  const { data } = useDashboardQuery();

  // Calculate total subscriptions
  const total = data?.subscriptions.total || 0;
  const active = data?.subscriptions.active || 0;
  const expired = data?.subscriptions.expired || 0;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Subscription Status</CardTitle>
          <CreditCardIcon className="h-5 w-5 text-emerald-500" />
        </div>
        <CardDescription>
          Active, expired, and inactive subscriptions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-emerald-500"></div>
              <span>Active</span>
            </div>
            <span className="font-medium">{active.toLocaleString()}</span>
          </div>
          <Progress
            value={(active / total) * 100}
            className="h-2 bg-gray-100"
          />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-amber-400"></div>
              <span>Expired</span>
            </div>
            <span className="font-medium">{expired.toLocaleString()}</span>
          </div>
          <Progress
            value={(expired / total) * 100}
            className="h-2 bg-gray-100 text-amber-400"
          />

          <div className="mt-4 border-t border-gray-100 pt-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Total Subscriptions</span>
              <span className="font-semibold">{total.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
