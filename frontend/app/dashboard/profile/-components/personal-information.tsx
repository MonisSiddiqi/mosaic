"use client";

import { useAuth } from "@/hooks/use-auth";

export const PersonalInformation = () => {
  const { user } = useAuth();

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800">
          Personal information
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-x-10 gap-y-6 md:grid-cols-2">
        <div>
          <p className="mb-1 text-sm text-gray-500">Name</p>
          <p className="text-gray-700">{user?.UserProfile?.name || "N/A"}</p>
        </div>

        <div>
          <p className="mb-1 text-sm text-gray-500">Email address</p>
          <p className="text-gray-700">{user?.email || "N/A"}</p>
        </div>
      </div>
    </div>
  );
};
