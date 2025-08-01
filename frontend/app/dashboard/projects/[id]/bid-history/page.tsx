"use client";

import { ProjectStatusEnum } from "@/apis/projects";
import { StatusBadge } from "@/app/dashboard/bids/_components/status-badge";
import { BackButton } from "@/components/back-button";
import { EmptyUI } from "@/components/empty-ui";
import { LoaderComponent } from "@/components/loader-component";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn, getStatusConfig } from "@/lib/utils";
import { useProjectQuery } from "@/queries/projects.queries";
import { HomeIcon, User2Icon, WrenchIcon } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { BadgeVariant } from "../../_components/table/projects-column";

export default () => {
  const params = useParams();

  const id = params.id as string;

  const { data, isLoading } = useProjectQuery(id);

  if (isLoading) return <LoaderComponent />;

  const statusConfig = getStatusConfig(data?.status as ProjectStatusEnum);

  const Icon = statusConfig.icon;

  return (
    <div className="flex flex-col gap-4 bg-muted">
      <div className="flex items-center justify-between">
        <BackButton href="/dashboard/projects" />
        {data?.status === ProjectStatusEnum.IN_PROGRESS && (
          <Button
            asChild
            className="hover:bg-branc-primary/90 bg-brand-primary text-white"
            disabled
          >
            <Link href={`/dashboard/projects/${id}/bid-history/assign`}>
              <User2Icon /> Assign Bid
            </Link>
          </Button>
        )}
      </div>

      <div className="flex w-full items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold text-gray-700">{data?.title}</h1>
          <p className="text-sm">{data?.description}</p>
        </div>
      </div>

      <div>
        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm text-gray-700">Bid History</p>
          <div className="flex items-center gap-4">
            <p className="text-sm text-gray-600">Current Status :</p>
            <Badge
              variant={statusConfig.variant as BadgeVariant}
              className={statusConfig.className}
            >
              <Icon className={cn("h-3 w-3 min-w-3")} /> {statusConfig.label}
            </Badge>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          {data?.Bid.length ? (
            data.Bid.map((bid, i) => (
              <div
                key={bid.id}
                className="rounded border border-gray-200 bg-white p-4"
              >
                <Badge className="mb-2" variant={"outline"}>
                  #{data.Bid.length - i} Bid
                </Badge>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="flex flex-col gap-2 rounded border border-gray-200 bg-white p-4">
                    <div className="flex items-center gap-2">
                      <HomeIcon className="size-4" />
                      <p> Homeowner Status</p>
                    </div>
                    <Separator />
                    <p>{data.user.UserProfile.name}</p>
                    <p className="text-sm">{data.user.email}</p>
                    <div className="mt-4 w-fit">
                      <StatusBadge status={bid.userStatus} />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 rounded border border-gray-200 bg-white p-4">
                    <div className="flex items-center gap-2">
                      <WrenchIcon className="size-4" />
                      <p>Vendor Status</p>
                    </div>
                    <Separator />
                    <p>{bid.vendor.UserProfile.name}</p>
                    <p className="text-sm">{bid.vendor.email}</p>
                    <div className="mt-4 w-fit">
                      <StatusBadge status={bid.vendorStatus} />
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <EmptyUI text="No Bids found" />
          )}
        </div>
      </div>
    </div>
  );
};
