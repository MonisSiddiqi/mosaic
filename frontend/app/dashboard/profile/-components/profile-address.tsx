"use client";

import { useAuth } from "@/hooks/use-auth";
import { CreateAddressSheet } from "./sheets/create-address.sheet";

export const ProfileAddress = () => {
  const { user } = useAuth();

  const address = user?.Address;

  if (address) {
    return (
      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-800">Address</h2>
          <CreateAddressSheet isEdit={true} />
        </div>

        <div className="grid grid-cols-1 gap-x-10 gap-y-6 md:grid-cols-2">
          <div>
            <p className="mb-1 text-sm text-gray-500">Line 1</p>
            <p className="text-gray-700">{user?.Address?.line1 || "N/A"}</p>
          </div>
          <div>
            <p className="mb-1 text-sm text-gray-500">Line 2</p>
            <p className="text-gray-700">{user?.Address?.line2 || "N/A"}</p>
          </div>

          <div>
            <p className="mb-1 text-sm text-gray-500">City</p>
            <p className="text-gray-700">{user?.Address?.city || "N/A"}</p>
          </div>

          <div>
            <p className="mb-1 text-sm text-gray-500">State</p>
            <p className="text-gray-700">{user?.Address?.state || "N/A"}</p>
          </div>

          <div>
            <p className="mb-1 text-sm text-gray-500">Country</p>
            <p className="text-gray-700">{user?.Address?.country || "N/A"}</p>
          </div>

          <div>
            <p className="mb-1 text-sm text-gray-500">Postal Code</p>
            <p className="text-gray-700">
              {user?.Address?.postalCode || "N/A"}
            </p>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex h-56 w-full items-center justify-center rounded-lg border border-gray-200 bg-white p-6">
        <CreateAddressSheet />
      </div>
    );
  }
};
