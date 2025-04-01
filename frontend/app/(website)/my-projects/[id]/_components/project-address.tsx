import { Address } from "@/apis/users";
import React from "react";

type Props = {
  address: Address;
};

export const AddressCard: React.FC<Props> = ({ address }) => {
  return (
    <div className="h-full rounded-md bg-white p-5">
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
