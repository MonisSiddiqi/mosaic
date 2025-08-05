import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { Observable, Subject } from 'rxjs';
import { SaveNotificationDto } from './dto/save-notification.dto';
import { ApiResponse } from '../common/dto/api-response.dto';
import { PrismaService } from '../prisma/prisma.service';
import { BidStatus, Project, User, UserProfile } from '@prisma/client';

@Injectable()
export class NotificationsService {
  private notificationsSubject: Subject<string> = new Subject<string>();

  constructor(private readonly prismaService: PrismaService) {}

  async saveNotification(saveNotificationDto: SaveNotificationDto) {
    const { userIds, heading, message, data, isGlobal, projectId } =
      saveNotificationDto;

    if (isGlobal) {
      const users = await this.prismaService.user.findMany({
        where: {
          NOT: {
            id: {
              in: userIds || [],
            },
          },
        },
      });
      for (const user of users) {
        await this.prismaService.notification.create({
          data: {
            userId: user.id,
            projectId,
            heading,
            message,
            data: data || undefined,
          },
        });
      }
    } else {
      const users = await this.prismaService.user.findMany({
        where: {
          id: {
            in: userIds || [],
          },
        },
      });

      for (const user of users) {
        await this.prismaService.notification.create({
          data: {
            userId: user.id,
            projectId,
            heading,
            message,
            data: data || undefined,
          },
        });
      }
    }

    this.notificationsSubject.next(JSON.stringify(saveNotificationDto));

    return saveNotificationDto;
  }

  async getAll(authUser: User, page: number) {
    if (!page || page < 1) {
      page = 1;
    }
    const limit = 10;

    const [notifications, unreadCount, totalCount] = await Promise.all([
      this.prismaService.notification.findMany({
        where: {
          userId: authUser.id,
        },
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          project: true,
        },
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prismaService.notification.count({
        where: {
          userId: authUser.id,
          isRead: false,
        },
      }),
      this.prismaService.notification.count({
        where: {
          userId: authUser.id,
        },
      }),
    ]);

    return new ApiResponse(
      {
        unreadCount,
        notifications,
        totalCount,
      },
      'Notifications',
    );
  }

  async markAsRead(authUser: User) {
    await this.prismaService.notification.updateMany({
      where: {
        userId: authUser.id,
        isRead: false,
      },
      data: {
        isRead: true,
      },
    });

    return this.getAll(authUser, 1);
  }

  getNotificationObservable(): Observable<string> {
    return this.notificationsSubject.asObservable();
  }

  async sendNewProjectNotification(
    project: Project,
    user: User & { UserProfile: UserProfile },
  ) {
    const admins = await this.prismaService.user.findMany({
      where: {
        role: 'ADMIN',
      },
    });

    const saveNotificationDto: SaveNotificationDto = {
      userIds: admins.map((admin) => admin.id),
      heading: '🔔 New Project Created',
      message: `📁 A new project "${project.title}" has been created by "${user.UserProfile.name} (${user.email})".`,
      isGlobal: false,
      projectId: project.id,
    };

    return this.saveNotification(saveNotificationDto);
  }

  async sendVendorFoundNotifications(user: User, project: Project) {
    let heading = '';
    let message = '';

    if (user.role === 'USER') {
      heading = '🔔 Vendor Found';
      message = `📌 A vendor has been found for your project "${project.title}". Kindly take necessary actions.`;
    } else if (user.role === 'VENDOR') {
      heading = '🔔 Bid Received';
      message = `📌 You have been received the project "${project.title}" as bid. Kindly Take necessary actions.`;
    } else if (user.role === 'ADMIN') {
      heading = '🔔 Vendor Found';
      message = `📌 A vendor has been found for the project "${project.title}".`;
    }

    const saveNotificationDto: SaveNotificationDto = {
      userIds: [user.id],
      heading,
      message,
      isGlobal: false,
      projectId: project.id,
    };

    return this.saveNotification(saveNotificationDto);
  }

  async sendBidActionNotification(
    recipient: User,
    project: Project,
    action: BidStatus,
  ) {
    const icon = action === BidStatus.ACCEPTED ? '✅' : '❌';

    if (recipient.role === 'USER' && action === BidStatus.ACCEPTED) {
      const saveNotificationDto: SaveNotificationDto = {
        userIds: [recipient.id],
        heading: '🔔 Bid Action',
        message: `${icon} Your bid on the project "${project.title}" has been ${action}. Kindly take necessary actions.`,
        isGlobal: false,
        projectId: project.id,
      };

      return this.saveNotification(saveNotificationDto);
    }

    if (recipient.role === 'VENDOR') {
      const saveNotificationDto: SaveNotificationDto = {
        userIds: [recipient.id],
        heading: '🔔 Bid Action',
        message: `${icon} Your bid on the project "${project.title}" has been ${action}. Kindly take necessary actions.`,
        isGlobal: false,
        projectId: project.id,
      };

      return this.saveNotification(saveNotificationDto);
    }
  }

  async sendProjectCompleteNotification(user: User, project: Project) {
    let message = '';

    if (user.role === 'USER') {
      message = `🎉 Congratulations! Your project "${project.title}" has been successfully completed. Thank you for using our platform!`;
    } else if (user.role === 'VENDOR') {
      message = `🎉 Congratulations! You have successfully completed the project "${project.title}". Thank you for your hard work!`;
    } else if (user.role === 'ADMIN') {
      message = `🎉 Congratulations! The project "${project.title}" has been successfully completed.`;
    }

    const saveNotificationDto: SaveNotificationDto = {
      userIds: [user.id],
      heading: '🔔 Project Completed',
      message,
      isGlobal: false,
      projectId: project.id,
    };

    return this.saveNotification(saveNotificationDto);
  }
}
