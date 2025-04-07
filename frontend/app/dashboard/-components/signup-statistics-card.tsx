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

const signupData = {
  daily: { users: 42, vendors: 30 },
  weekly: { users: 287, vendors: 67 },
  monthly: { users: 1243, vendors: 234 },
};

export const SignUpStatisticsCard = () => {
  const [timeframe, setTimeframe] = useState("weekly");

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
            <TabsTrigger value="daily">Daily</TabsTrigger>
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
          </TabsList>
          <TabsContent value="daily" className="mt-4 space-y-4">
            <div className="flex gap-4">
              <Item
                title="Total"
                value={signupData.daily.users + signupData.daily.vendors}
              />
              <Item title="Home Owners" value={signupData.daily.users} />
              <Item title="Vendors" value={signupData.daily.vendors} />
            </div>
            <p className="text-sm text-muted-foreground">New users today</p>
          </TabsContent>
          <TabsContent value="weekly" className="mt-4 space-y-4">
            <div className="flex gap-4">
              <Item
                title="Total"
                value={signupData.weekly.users + signupData.weekly.vendors}
              />
              <Item title="Home Owners" value={signupData.weekly.users} />
              <Item title="Vendors" value={signupData.weekly.vendors} />
            </div>
            <p className="text-sm text-muted-foreground">New users this week</p>
          </TabsContent>
          <TabsContent value="monthly" className="mt-4 space-y-4">
            <div className="flex gap-4">
              <Item
                title="Total"
                value={signupData.monthly.users + signupData.monthly.vendors}
              />
              <Item title="Home Owners" value={signupData.monthly.users} />
              <Item title="Vendors" value={signupData.monthly.vendors} />
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
