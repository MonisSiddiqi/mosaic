import { getNotificationsApi } from "@/apis/notifications/notification.api";
import { useSuspenseQuery } from "@tanstack/react-query";

export const useNotificationsSuspenseQuery = (page: number = 1) => {
  return useSuspenseQuery({
    queryKey: ["notification", page],
    queryFn: () => getNotificationsApi(page),
  });
};
