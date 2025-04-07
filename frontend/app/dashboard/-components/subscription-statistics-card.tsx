"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CreditCardIcon } from "lucide-react";

const subscriptionData = {
  active: 2105,
  trialing: 843,
  expired: 412,
  unpaid: 164,
};

export const SubscriptionStatisticsCard = () => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Subscription Status</CardTitle>
          <CreditCardIcon className="h-5 w-5 text-emerald-500" />
        </div>
        <CardDescription>Active, trialing, expired, unpaid</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-emerald-500"></div>
              <span>Active</span>
            </div>
            <span className="font-medium">
              {subscriptionData.active.toLocaleString()}
            </span>
          </div>
          <Progress
            value={
              (subscriptionData.active /
                (subscriptionData.active +
                  subscriptionData.trialing +
                  subscriptionData.expired +
                  subscriptionData.unpaid)) *
              100
            }
            className="h-2 bg-gray-100"
          />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-blue-400"></div>
              <span>Trialing</span>
            </div>
            <span className="font-medium">
              {subscriptionData.trialing.toLocaleString()}
            </span>
          </div>
          <Progress
            value={
              (subscriptionData.trialing /
                (subscriptionData.active +
                  subscriptionData.trialing +
                  subscriptionData.expired +
                  subscriptionData.unpaid)) *
              100
            }
            className="h-2 bg-gray-100 text-blue-400"
          />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-amber-400"></div>
              <span>Expired</span>
            </div>
            <span className="font-medium">
              {subscriptionData.expired.toLocaleString()}
            </span>
          </div>
          <Progress
            value={
              (subscriptionData.expired /
                (subscriptionData.active +
                  subscriptionData.trialing +
                  subscriptionData.expired +
                  subscriptionData.unpaid)) *
              100
            }
            className="h-2 bg-gray-100 text-amber-400"
          />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-red-400"></div>
              <span>Unpaid</span>
            </div>
            <span className="font-medium">
              {subscriptionData.unpaid.toLocaleString()}
            </span>
          </div>
          <Progress
            value={
              (subscriptionData.unpaid /
                (subscriptionData.active +
                  subscriptionData.trialing +
                  subscriptionData.expired +
                  subscriptionData.unpaid)) *
              100
            }
            className="h-2 bg-gray-100 text-red-400"
          />
        </div>
      </CardContent>
    </Card>
  );
};
