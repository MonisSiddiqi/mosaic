export class SaveNotificationDto {
  userId: string;
  heading: string;
  message: string;
  data?: {
    link?: string;
    [key: string]: any;
  };
  isGlobal: boolean;
  projectId?: string;
}
