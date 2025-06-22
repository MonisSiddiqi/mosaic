"use client";

import { VendorTagCard } from "./vendor-tag-card";
import TagCardSkeleton from "./skeleton/tag-card-skeleton";
import { useCurrentPlanQuery } from "@/queries/payments.queries";
import Image from "next/image";
import { NoActivePlanNotice } from "../../membership/_components/no-active-plan-notice";
import { PageHeader } from "../../bids/_components/bids-page-header";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";

export const VendorTagsPage = () => {
  const { data: currentPlan, isLoading } = useCurrentPlanQuery();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {Array(10)
          .fill(null)
          .map((item, index) => (
            <TagCardSkeleton key={index} />
          ))}
      </div>
    );
  }

  return (
    <div className="container mx-auto grid gap-7">
      <div className="flex flex-col justify-between gap-7 md:flex-row">
        <PageHeader
          title="Manage Your Tags"
          description="Toggle the tags you provide to receive relevant bid requests."
        />
        <Button
          asChild
          variant={"secondary"}
          className="bg-gradient-to-tr from-blue-50 to-blue-100"
        >
          <Link href={"/dashboard/services"}>
            View Services <ArrowRightIcon className="size-5" />
          </Link>
        </Button>
      </div>

      {currentPlan?.Plan ? (
        currentPlan.Plan.Service.filter(
          (service) => service.VendorService.length > 0,
        ).length > 0 ? (
          currentPlan.Plan.Service.filter(
            (service) => service.VendorService.length > 0,
          ).map((service) => {
            return (
              <div
                key={service.id}
                className="my-4 rounded-md border border-gray-200 p-4"
              >
                <div className="flex gap-2">
                  <div className="flex h-16 min-h-6 w-16 min-w-16 items-center justify-center overflow-hidden rounded-md">
                    {service.iconUrl ? (
                      <Image
                        src={service.iconUrl}
                        alt={service.name}
                        width={64}
                        height={44}
                        className="object-contain"
                      />
                    ) : (
                      <div className="flex h-16 w-16 items-center justify-center bg-muted text-sm text-muted-foreground">
                        No icon
                      </div>
                    )}
                  </div>
                  <div>
                    <p
                      key={service.id}
                      className="from-neutral-700 text-lg font-semibold"
                    >
                      {service.name}
                    </p>
                    <p className="line-clamp-2 text-sm">
                      {service.description}
                    </p>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                  {service.Tag.map((tag) => (
                    <VendorTagCard key={tag.id} tag={tag} />
                  ))}
                </div>
              </div>
            );
          })
        ) : (
          <div className="py-12 text-center">
            <h3 className="text-xl font-medium">No Services Available</h3>
            <p className="mt-2 text-muted-foreground">
              There are currently no services to choose tags from.
            </p>

            <Button asChild variant={"secondary"} className="mt-4">
              <Link href={"/dashboard/services"}>
                Add Services <ArrowRightIcon className="size-5" />
              </Link>
            </Button>
          </div>
        )
      ) : (
        <NoActivePlanNotice />
      )}

      {/* <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {isLoading
          ? Array(10)
              .fill(null)
              .map((item, index) => <TagCardSkeleton key={index} />)
          : tags?.list.map((tag) => <VendorTagCard key={tag.id} tag={tag} />)}
      </div>

      {tags?.list.length === 0 && (
        <div className="py-12 text-center">
          <h3 className="text-xl font-medium">No tags available</h3>
          <p className="mt-2 text-muted-foreground">
            There are currently no tags available to add to your profile.
          </p>
        </div>
      )} */}
    </div>
  );
};
