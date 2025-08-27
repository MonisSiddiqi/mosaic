import { useEffect } from "react";
import { useNotificationsSuspenseQuery } from "@/queries/notifications.queries";
import { useAuth } from "@/hooks/use-auth";

import { toast } from "@/hooks/use-toast";
import { API_URL } from "@/config";

import NotificationSound from "@/app/assets/notification-sound.wav";

type EventData = {
  userIds: string[];
  heading: string;
  message: string;
  isGlobal: boolean;
  projectId?: string;
  data?: {
    [key: string]: any;
  };
};

export const useListenNotifications = () => {
  const { data, refetch } = useNotificationsSuspenseQuery();

  const { user } = useAuth();

  useEffect(() => {
    const eventSource = new EventSource(
      `${API_URL}/api/v1/notifications/receive`,
    );

    const notificationEventHandler = (event: MessageEvent<string>) => {
      const notification = JSON.parse(event.data) as EventData;

      if (notification.isGlobal) {
        const isExcluded = notification.userIds.some((id) => id === user?.id);

        if (!isExcluded) {
          console.log("Showing notification:", notification.heading);

          toast({
            className: "bg-brand-primary text-white z-50 border-brand-primary",
            title: notification.heading,
            description: notification.message,
          });

          const audio = new Audio(NotificationSound);
          audio
            .play()
            .catch((error) => console.log("Audio play error:", error?.message));
          refetch();
        }
      } else {
        console.log("Notification is targeted");
        const isIncluded = notification.userIds.some((id) => id === user?.id);

        if (isIncluded) {
          toast({
            className: "bg-brand-primary text-white z-50 border-brand-primary",
            title: notification.heading,
            description: notification.message,
          });

          const audio = new Audio(NotificationSound);
          audio
            .play()
            .catch((error) => console.log("Audio play error:", error?.message));

          refetch();
        }
      }
    };

    eventSource.addEventListener("notification", notificationEventHandler);

    return () => {
      eventSource.removeEventListener("notification", notificationEventHandler);
      eventSource.close();
    };
  }, [user?.id, refetch]);

  return { unreadCount: data?.unreadCount ?? 0 };
};
