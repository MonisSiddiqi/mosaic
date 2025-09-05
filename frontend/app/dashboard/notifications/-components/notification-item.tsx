import { Notification } from "@/apis/notifications/notification.api";
import { cn } from "@/lib/utils";
import moment from "moment";
import { FC } from "react";

export const NotificationItem: FC<Notification & { className?: string }> = (
  notification,
) => {
  return (
    <div
      className={cn(
        `flex cursor-default flex-col gap-4 rounded-md border border-gray-300 bg-white p-6 ${!notification.isRead && "bg-green-100"}`,
        notification.className,
      )}
    >
      <div className="flex w-full flex-col">
        <div className="flex justify-between">
          <p className="font-medium text-gray-800">{notification.heading}</p>
          <p className="whitespace-nowrap text-xs text-gray-500">
            {moment(notification.createdAt).fromNow()}
          </p>
        </div>
        <p className="mt-1 text-sm text-gray-500">{notification.message}</p>
      </div>
    </div>
  );
};
