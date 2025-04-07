import httpClient from "..";
import { apiEndpoints } from "../api-endpoints";
import { Project } from "../projects";

export type NotificationResponse = {
  unreadCount: number;
  notifications: Notification[];
  totalCount: number;
};

export type Notification = {
  id: string;
  userId: string | null;
  heading: string;
  message: string;
  projectId: string | null;
  Project: Project | null;
  data?: {
    link?: string;
    [key: string]: any;
  };
  isRead: boolean;
  updatedAt: Date;
  createdAt: Date;
};

export const getNotificationsApi = async (
  page: number,
): Promise<NotificationResponse> => {
  const response = await httpClient.get(apiEndpoints.notifications.getAll, {
    params: {
      page,
    },
  });
  return response.data.result;
};

export const markAsReadNotificationsApi =
  async (): Promise<NotificationResponse> => {
    const response = await httpClient.patch(
      apiEndpoints.notifications.markAsRead,
    );
    return response.data.result;
  };

export const markAsReadApi = async (): Promise<NotificationResponse> => {
  const response = await httpClient.patch(
    apiEndpoints.notifications.markAsRead,
  );
  return response.data.result;
};
