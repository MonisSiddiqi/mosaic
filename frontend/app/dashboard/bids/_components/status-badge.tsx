import { BidStatus } from "@/apis/bids";
import { Badge } from "@/components/ui/badge";
import { CheckCircleIcon, ClockIcon, XCircleIcon } from "lucide-react";
import { FC } from "react";

type Props = {
  status: BidStatus;
};

export const StatusBadge: FC<Props> = ({ status }) => {
  switch (status) {
    case "PENDING":
      return (
        <Badge
          variant="outline"
          className="flex items-center gap-1 border-amber-200 bg-amber-50 text-amber-500"
        >
          <ClockIcon className="h-3 w-3" /> Pending
        </Badge>
      );
    case "ACCEPTED":
      return (
        <Badge
          variant="outline"
          className="flex items-center gap-1 border-green-200 bg-green-50 text-green-500"
        >
          <CheckCircleIcon className="h-3 w-3" /> Accepted
        </Badge>
      );
    case "REJECTED":
      return (
        <Badge
          variant="outline"
          className="flex items-center gap-1 border-red-200 bg-red-50 text-red-500"
        >
          <XCircleIcon className="h-3 w-3" /> Rejected
        </Badge>
      );
    default:
      return <Badge>{status}</Badge>;
  }
};
