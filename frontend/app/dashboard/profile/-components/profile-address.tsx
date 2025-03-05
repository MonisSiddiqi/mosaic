"use client";

import { useAuth } from "@/hooks/use-auth";

export const ProfileAddress = () => {
  const { user } = useAuth();

  if (!user?.Address) return null;

  console.log(user);

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800">Address</h2>
        {/* <EditProfileModal section="address" user={user} /> */}
      </div>

      <div className="grid grid-cols-1 gap-x-10 gap-y-6 md:grid-cols-2">
        <div>
          <p className="mb-1 text-sm text-gray-500">Country</p>
          <p className="text-gray-700">{user?.Address?.country || "N/A"}</p>
        </div>

        <div>
          <p className="mb-1 text-sm text-gray-500">City/State</p>
          <p className="text-gray-700">{user?.Address?.city || "N/A"}</p>
        </div>

        <div>
          <p className="mb-1 text-sm text-gray-500">Postal Code</p>
          <p className="text-gray-700">{user?.Address?.postalCode || "N/A"}</p>
        </div>
      </div>
    </div>
  );
};
