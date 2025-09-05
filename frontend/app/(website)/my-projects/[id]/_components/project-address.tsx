import { Address } from "@/apis/addresses";
import { cn } from "@/lib/utils";
import React from "react";

type Props = {
  address: Address;
  className?: string;
};

export const AddressCard: React.FC<Props> = ({ address, className }) => {
  return (
    <div
      className={cn(
        "h-full rounded-md border border-gray-200 bg-white p-5",
        className,
      )}
    >
      <div className="space-y-1">
        <h3 className="text-base font-semibold text-gray-800">
          {address.line1}
        </h3>
        {address.line2 && (
          <p className="text-sm text-gray-600">{address.line2}</p>
        )}
        <p className="text-sm text-gray-700">
          {address.city}, {address.state} {address.postalCode}
        </p>
        <p className="text-sm text-gray-700">{address.country}</p>
      </div>
    </div>
  );
};
