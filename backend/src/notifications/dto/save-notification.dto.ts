export class SaveNotificationDto {
  userIds: string[];
  heading: string;
  message: string;
  isGlobal: boolean;
  projectId?: string;
  data?: {
    [key: string]: any;
  };
}
