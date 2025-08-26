import { useEffect } from "react";
import { useNotificationsSuspenseQuery } from "@/queries/notifications.queries";
import { useAuth } from "@/hooks/use-auth";

import { toast } from "@/hooks/use-toast";
import { API_URL } from "@/config";

//TODO:play sound
// import NotificationSound from "@/app/assets/notification-sound.wav";

type EventData = {
  userId: string;
  heading: string;
  message: string;
  data?: {
    [key: string]: any;
  };
  isGlobal: boolean;
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
        if (notification.userId !== user?.id) {
          toast({
            className: "bg-stone-200 text-stone-700",
            title: notification.heading,
            description: notification.message,
          });

          // const audio = new Audio(NotificationSound);
          // audio.play();
          refetch();
        }
      } else if (notification.userId === user?.id) {
        toast({
          className: "bg-stone-200 text-stone-700",
          title: notification.heading,
          description: notification.message,
        });

        // const audio = new Audio(NotificationSound);
        // audio.play();
        refetch();
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
