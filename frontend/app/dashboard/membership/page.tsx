"use client";

import { LoaderComponent } from "@/components/loader-component";
import { Card, CardContent } from "@/components/ui/card";
import { useCurrentPlanQuery } from "@/queries/payments.queries";
import Plans from "./_components/plans";
import { CurrentPlan } from "./_components/curren-plan";
import { Button } from "@/components/ui/button";
import { ArrowRight, Package, Sparkles } from "lucide-react";
import { NoActivePlanNotice } from "./_components/no-active-plan-notice";

const MembershipPage = () => {
  const { data, isLoading } = useCurrentPlanQuery();

  if (isLoading) {
    <LoaderComponent showText={true} text="Loading current plan..." />;
  }

  if (!data) {
    return (
      <div className="grid gap-14">
        <NoActivePlanNotice />

        <Plans />
      </div>
    );
  }

  return <CurrentPlan {...data} />;
};

export default MembershipPage;
