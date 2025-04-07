import { Notification } from "@/apis/notifications/notification.api";
import { cn } from "@/lib/utils";
import moment from "moment";
import { useRouter } from "next/navigation";
import { FC } from "react";

export const NotificationItem: FC<Notification & { className?: string }> = (
  notification,
) => {
  const router = useRouter();

  if (!notification.projectId) {
    return (
      <div
        className={cn(
          `flex cursor-default flex-col gap-4 border border-gray-300 bg-white p-4 ${!notification.isRead && "bg-green-100"}`,
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
          <p className="text-gray-500">{notification.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={() => router.push(`/${notification.data?.link}`)}
      className={cn(
        `flex cursor-pointer flex-col gap-4 border border-gray-300 bg-white p-4 ${!notification.isRead && "bg-green-100"}`,
        notification.className,
      )}
    >
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="flex w-full flex-col gap-2">
          <div className="flex w-full flex-col">
            <div className="flex justify-between">
              <p className="font-medium text-gray-800">
                {notification.heading}
              </p>
              <p className="whitespace-nowrap text-xs text-gray-500">
                {moment(notification.createdAt).fromNow()}
              </p>
            </div>
            <p className="text-gray-500">{notification.message}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
