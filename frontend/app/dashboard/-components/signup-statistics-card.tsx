"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { UserPlusIcon } from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { useDashboardQuery } from "@/queries/dashboard.queries";

export const SignUpStatisticsCard = () => {
  const [, setTimeframe] = useState("weekly");

  const { data } = useDashboardQuery();

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>New Sign-ups</CardTitle>
          <UserPlusIcon className="h-5 w-5 text-emerald-500" />
        </div>
        <CardDescription>User acquisition metrics</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="weekly" onValueChange={setTimeframe}>
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value="daily">Today</TabsTrigger>
            <TabsTrigger value="weekly">This Week</TabsTrigger>
            <TabsTrigger value="monthly">This Month</TabsTrigger>
          </TabsList>
          <TabsContent value="daily" className="mt-4 space-y-4">
            <div className="flex gap-4">
              <Item title="Total" value={data?.signups.today.total || 0} />
              <Item
                title="Home Owners"
                value={data?.signups.today.homeowners || 0}
              />
              <Item title="Vendors" value={data?.signups.today.vendors || 0} />
            </div>
            <p className="text-sm text-muted-foreground">New users today</p>
          </TabsContent>
          <TabsContent value="weekly" className="mt-4 space-y-4">
            <div className="flex gap-4">
              <Item title="Total" value={data?.signups.thisWeek.total || 0} />
              <Item
                title="Home Owners"
                value={data?.signups.thisWeek.homeowners || 0}
              />
              <Item
                title="Vendors"
                value={data?.signups.thisWeek.vendors || 0}
              />
            </div>
            <p className="text-sm text-muted-foreground">New users this week</p>
          </TabsContent>
          <TabsContent value="monthly" className="mt-4 space-y-4">
            <div className="flex gap-4">
              <Item title="Total" value={data?.signups.thisMonth.total || 0} />
              <Item
                title="Home Owners"
                value={data?.signups.thisMonth.homeowners || 0}
              />
              <Item
                title="Vendors"
                value={data?.signups.thisMonth.vendors || 0}
              />
            </div>
            <p className="text-sm text-muted-foreground">
              New users this month
            </p>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

const Item = ({ title, value }: { title: string; value: number }) => {
  return (
    <div className="flex w-full flex-col gap-2 rounded-md bg-muted p-4">
      <p className="text-sm text-muted-foreground">{title}</p>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  );
};
