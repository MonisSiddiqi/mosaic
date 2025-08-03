"use client";

import { ProjectStatusEnum } from "@/apis/projects";
import { BackButton } from "@/components/back-button";
import { LoaderComponent } from "@/components/loader-component";
import { Button } from "@/components/ui/button";
import { useProjectQuery } from "@/queries/projects.queries";
import { User2Icon } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { BidHistoryContainer } from "./bid-history-container";

export const BidHistoryPage = () => {
  const params = useParams();

  const id = params.id as string;

  const { data, isLoading, isError, error } = useProjectQuery(id);

  if (isLoading) return <LoaderComponent />;

  if (isError) {
    throw error;
  }

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
        <div className="pl-1">
          <h1 className="text-xl font-semibold text-gray-700">{data?.title}</h1>
          <p className="text-sm">{data?.description}</p>
        </div>
      </div>

      {data && (
        <BidHistoryContainer
          bids={data?.Bid}
          homeowner={data.user}
          project={data}
        />
      )}
    </div>
  );
};
