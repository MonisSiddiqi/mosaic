"use client";

import { VendorServiceCard } from "./vendor-service-card";
import { useState } from "react";
import { ServiceCardSkeleton } from "./skeleton/service-card-skeleton";
import { useCurrentPlanQuery } from "@/queries/payments.queries";
import { CurrentPlanNote } from "./current-plan-note";

export const VendorServicePage = () => {
  const { data: currentPlan, isLoading } = useCurrentPlanQuery();

  return (
    <div className="container mx-auto">
      <CurrentPlanNote />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {isLoading ? (
          Array(10)
            .fill(null)
            .map((item, index) => <ServiceCardSkeleton key={index} />)
        ) : currentPlan?.Plan?.Service?.length ? (
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
    </div>
  );
};
