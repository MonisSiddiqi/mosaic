import { BidStatus } from "@/apis/bids";
import { FC } from "react";

type Props = {
  status: BidStatus;
};

export const ActionWarning: FC<Props> = ({ status }) => {
  switch (status) {
    case "REJECTED":
      return (
        <div className="bg-yellow-50 p-4 text-yellow-600">
          <p className="text-sm">
            <span className="font-semibold">Warning</span>: You are{" "}
            <span className="text-sm font-semibold">Rejecting </span>
            this bid.
          </p>
          <p className="mt-1 text-sm">
            Once submitted, this action cannot be reversed. Are you sure you
            want to proceed?
          </p>
        </div>
      );

    case "ACCEPTED":
      return (
        <div className="bg-green-50 p-4 text-green-600">
          <p className="text-sm">
            <span className="font-semibold">Congratulations</span>: You are{" "}
            <span className="text-sm font-semibold">Accepting </span>
            this bid.
          </p>
        </div>
      );
  }
};
