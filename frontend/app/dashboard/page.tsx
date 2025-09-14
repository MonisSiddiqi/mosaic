"use client";

import { Gavel, LayersIcon, UsersIcon, GridIcon } from "lucide-react";
import { StatisticsCard } from "./-components/users-statistics-card";
import { SignUpStatisticsCard } from "./-components/signup-statistics-card";
import { SubscriptionStatisticsCard } from "./-components/subscription-statistics-card";
import { useDashboardQuery } from "@/queries/dashboard.queries";
import { SignupTrend } from "./-components/signup-trend";
import { useAuth } from "@/hooks/use-auth";
import { UserRole } from "@/apis/users";
import { BidStats } from "./bids/_components/bid-stats";
import Link from "next/link";
import { ServicesStats } from "./bids/_components/services-stats";
import { useCurrentPlanQuery } from "@/queries/payments.queries";
import { LoaderComponent } from "@/components/loader-component";
import { NoActivePlanNotice } from "./membership/_components/no-active-plan-notice";

export default function Dashboard() {
  const { data, isLoading } = useDashboardQuery();

  const { user } = useAuth();
  const { data: plan, isLoading: isPlanLoading } = useCurrentPlanQuery();

  if (user?.role === UserRole.VENDOR) {
    return (
      <div className="flex flex-col gap-6">
        <div className="rounded-md border border-gray-200 bg-white p-5">
          <BidStats />
        </div>
        {isPlanLoading ? (
          <LoaderComponent />
        ) : plan ? (
          <ServicesStats />
        ) : (
          <NoActivePlanNotice />
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Link href={"/dashboard/users"}>
          <StatisticsCard
            value={data?.homeOwners}
            title="Home Owners"
            description="Total number of home owners"
            icon={UsersIcon}
            isLoading={isLoading}
          />
        </Link>

        <Link href={"/dashboard/users"}>
          <StatisticsCard
            value={data?.vendors}
            title="Trade Professionals"
            description="Total number of trade professionals"
            icon={LayersIcon}
            isLoading={isLoading}
          />
        </Link>

        <Link href={"/dashboard/projects"}>
          <StatisticsCard
            value={data?.projects}
            title="Total Projects"
            description="Total number of projects submitted"
            icon={GridIcon}
            isLoading={isLoading}
          />
        </Link>

        <Link href={"/dashboard/projects"}>
          <StatisticsCard
            title="Open Bids"
            value={data?.openBids}
            icon={Gavel}
            description="Total number of open bids"
            isLoading={isLoading}
          />
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <SignUpStatisticsCard />
        <SubscriptionStatisticsCard />
      </div>

      <div>
        <SignupTrend />
      </div>
    </div>
  );
}
