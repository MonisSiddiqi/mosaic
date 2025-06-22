"use client";

import { VendorServiceCard } from "./vendor-service-card";
import { ServiceCardSkeleton } from "./skeleton/service-card-skeleton";
import { useCurrentPlanQuery } from "@/queries/payments.queries";
import { CurrentPlanNote } from "./current-plan-note";
import { NoActivePlanNotice } from "../../membership/_components/no-active-plan-notice";
import { PageHeader } from "../../bids/_components/bids-page-header";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";

export const VendorServicePage = () => {
  const { data: currentPlan, isLoading } = useCurrentPlanQuery();

  if (isLoading) {
    return Array(10)
      .fill(null)
      .map((item, index) => <ServiceCardSkeleton key={index} />);
  }

  return (
    <div className="container mx-auto grid gap-7">
      <div className="flex flex-col justify-between gap-7 md:flex-row">
        <PageHeader
          title="Manage Your Services"
          description="Toggle the services you provide to receive relavant bids"
        />

        <Button
          asChild
          variant={"secondary"}
          className="bg-gradient-to-tr from-blue-50 to-blue-100"
        >
          <Link href={"/dashboard/tags"}>
            View Tags <ArrowRightIcon className="size-5" />
          </Link>
        </Button>
      </div>

      {currentPlan?.Plan ? (
        <>
          <CurrentPlanNote {...currentPlan.Plan} />

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {currentPlan?.Plan?.Service?.length ? (
              currentPlan?.Plan.Service.map((service) => (
                <VendorServiceCard key={service.id} service={service} />
              ))
            ) : (
              <div className="w-full py-12 text-center md:col-span-2 xl:col-span-3">
                <h3 className="text-xl font-medium">No services available</h3>
                <p className="mt-2 text-muted-foreground">
                  There are currently no services available under your plan
                </p>
              </div>
            )}
          </div>
        </>
      ) : (
        <NoActivePlanNotice />
      )}
    </div>
  );
};
