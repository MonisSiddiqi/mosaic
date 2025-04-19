"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Gavel, LayersIcon, UsersIcon, GridIcon } from "lucide-react";
import { StatisticsCard } from "./-components/users-statistics-card";
import { SignUpStatisticsCard } from "./-components/signup-statistics-card";
import { SubscriptionStatisticsCard } from "./-components/subscription-statistics-card";
import { useDashboardQuery } from "@/queries/dashboard.queries";
import { SignupTrend } from "./-components/signup-trend";

export default function Dashboard() {
  const { data, isLoading } = useDashboardQuery();

  return (
    <div className="space-y-6 p-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatisticsCard
          value={data?.homeOwners}
          title="Home Owners"
          description="Total number of home owners"
          icon={UsersIcon}
          isLoading={isLoading}
        />

        <StatisticsCard
          value={data?.vendors}
          title="Trade Professionals"
          description="Total number of trade professionals"
          icon={LayersIcon}
          isLoading={isLoading}
        />

        <StatisticsCard
          value={data?.projects}
          title="Total Projects"
          description="Total number of projects submitted"
          icon={GridIcon}
          isLoading={isLoading}
        />

        <StatisticsCard
          title="Open Bids"
          value={data?.openBids}
          icon={Gavel}
          description="Total number of open bids"
          isLoading={isLoading}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <SignUpStatisticsCard />
        <SubscriptionStatisticsCard />
      </div>

      <div>
        <SignupTrend />
      </div>
      {/* <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent User Registrations</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Display a list of recently registered users here.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Latest Bids</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Display a list of the latest bids here.
            </p>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>System Notifications</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">
            Display important system notifications and alerts here.
          </p>
        </CardContent>
      </Card> */}
    </div>
  );
}

function StatCard({
  title,
  value,
  icon,
  description,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
  description: string;
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}
