"use client";

import { LoaderComponent } from "@/components/loader-component";
import { Card, CardContent } from "@/components/ui/card";
import { useCurrentPlanQuery } from "@/queries/payments.queries";
import Plans from "./_components/plans";
import { CurrentPlan } from "./_components/curren-plan";
import { Button } from "@/components/ui/button";
import { ArrowRight, Package, Sparkles } from "lucide-react";

const MembershipPage = () => {
  const { data, isLoading } = useCurrentPlanQuery();

  if (isLoading) {
    <LoaderComponent showText={true} text="Loading current plan..." />;
  }

  if (!data) {
    return (
      <div className="grid gap-14">
        <Card className="w-full border-gray-200 bg-gradient-to-br from-red-50 to-red-200">
          <CardContent className="flex flex-col items-center justify-center px-6 py-12 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-red-100 to-red-200">
              <Package className="h-8 w-8 text-red-600" />
            </div>

            <h3 className="mb-2 text-xl font-semibold text-gray-900">
              No Active Plan
            </h3>
            <p className="mb-6 leading-relaxed text-gray-600">
              You don't have an active subscription yet. Choose a plan to unlock
              all features and get started.
            </p>
          </CardContent>
        </Card>

        <Plans />
      </div>
    );
  }

  return <CurrentPlan {...data} />;
};

export default MembershipPage;
