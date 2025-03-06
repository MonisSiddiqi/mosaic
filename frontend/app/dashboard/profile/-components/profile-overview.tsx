"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/use-auth";
import { getInitials } from "@/lib/utils";
import { EditProfileSheet } from "./sheets/edit-profile-sheet";

export const ProfileOverview = () => {
  const { user } = useAuth();

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-6">
          <Avatar className="h-24 w-24">
            <AvatarImage
              src={user?.UserProfile?.image || undefined}
              alt={user?.UserProfile?.name}
              className="object-cover"
            />
            <AvatarFallback className="text-2xl">
              {getInitials(user?.UserProfile?.name || "")}
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">
              {user?.UserProfile?.name || "N/A"}
            </h2>
            <Badge variant={"secondary"}>
              {user?.role.split("").at(0)?.toUpperCase() +
                "" +
                user?.role.toLowerCase().slice(1, user.role.length)}
            </Badge>
          </div>
        </div>

        <EditProfileSheet />
      </div>
    </div>
  );
};
