import { Badge } from "@/components/ui/badge";
import { Bid, BidStatus } from "@/apis/bids";
import { FC } from "react";
import { HomeIcon, WrenchIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { User, UserProfile } from "@/apis/users";
import { Project } from "@/apis/projects";
import { StatusBadge } from "@/app/dashboard/bids/_components/status-badge";
import { EmptyUI } from "@/components/empty-ui";
import { ProjectStatusTimeline } from "@/app/(website)/_components/project-status-timeline";

type Props = {
  bids: (Bid & { vendor: User & { UserProfile: UserProfile } })[];
  homeowner: User & { UserProfile: UserProfile };
  project: Project;
};

export const BidHistoryContainer: FC<Props> = ({
  bids,
  homeowner,
  project,
}) => {
  return (
    <div className="flex flex-col gap-4">
      <ProjectStatusTimeline className="bg-white" status={project.status} />

      <div className="flex flex-col justify-between gap-4 rounded border border-gray-200 bg-white p-4">
        <p className="whitespace-nowrap text-sm text-gray-700">Bid History</p>

        <div className="flex flex-col gap-4">
          {bids.length ? (
            bids.map((bid, i) => (
              <div
                key={bid.id}
                className="rounded border border-gray-200 bg-stone-50 p-4"
              >
                <Badge className="mb-2" variant={"outline"}>
                  #{bids.length - i} Bid
                </Badge>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="flex flex-col gap-2 rounded border border-gray-200 bg-white p-4">
                    <div className="flex items-center gap-2">
                      <HomeIcon className="size-4" />
                      <p> Homeowner Status</p>
                    </div>
                    <Separator />
                    <p>{homeowner.UserProfile.name}</p>
                    <p className="text-sm">{homeowner.email}</p>
                    <div className="mt-4 w-fit">
                      {bid.vendorStatus === BidStatus.REJECTED ? (
                        <Badge variant={"secondary"}>N/A</Badge>
                      ) : (
                        <StatusBadge status={bid.userStatus} />
                      )}
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
            <EmptyUI text="No Bid history found" />
          )}
        </div>
      </div>
    </div>
  );
};
