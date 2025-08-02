"use client";

import { useParams } from "next/navigation";
import { Avatar } from "@radix-ui/react-avatar";
import { AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { useUserQuery } from "@/queries/users.queries";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle, CheckCircleIcon, XCircleIcon } from "lucide-react";
import { formatDate } from "date-fns";
import { Separator } from "@/components/ui/separator";
import { BackButton } from "@/components/back-button";

export default () => {
  const { userId } = useParams();

  const { data: user } = useUserQuery(userId as string);

  return (
    <div className="flex flex-col gap-4 rounded bg-white p-5 py-6">
      <BackButton href="/dashboard/users" className="w-fit" />
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
        </div>
      </div>
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
      {user?.Address && (
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-800">Address</h2>
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
      )}{" "}
      <Card className="shadow-none lg:col-span-2">
        <CardHeader>
          <CardTitle>Recent Login History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {user?.LoginHistory.length
              ? user?.LoginHistory.map((login, index) => (
                  <div key={login.id}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        {login.status ? (
                          <CheckCircleIcon className="h-4 w-4 text-green-500" />
                        ) : (
                          <XCircleIcon className="h-4 w-4 text-red-500" />
                        )}
                        <div>
                          <p className="text-sm font-medium">{login.message}</p>
                          <p className="text-xs text-muted-foreground">
                            {formatDate(
                              login.createdAt,
                              "EEEE, MMMM do yyyy, h:mm:ss a",
                            )}
                          </p>
                        </div>
                      </div>
                      <Badge variant={login.status ? "default" : "destructive"}>
                        {login.status ? "Success" : "Failed"}
                      </Badge>
                    </div>
                    {index < user?.LoginHistory.length - 1 && (
                      <Separator className="mt-4" />
                    )}
                  </div>
                ))
              : "No login history available."}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
