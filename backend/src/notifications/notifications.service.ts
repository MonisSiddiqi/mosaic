import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { Observable, Subject } from 'rxjs';
import { SaveNotificationDto } from './dto/save-notification.dto';
import { ApiResponse } from '../common/dto/api-response.dto';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class NotificationsService {
  private notificationsSubject: Subject<string> = new Subject<string>();

  constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  async saveNotification(saveNotificationDto: SaveNotificationDto) {
    const { userId, heading, message, data, isGlobal, projectId } =
      saveNotificationDto;

    const nodeEnv = this.configService.get<'production' | 'development'>(
      'nodeEnv',
    );

    if (isGlobal) {
      const users = await this.prismaService.user.findMany({
        where: {
          NOT: {
            id: userId,
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
      await this.prismaService.notification.create({
        data: {
          userId,
          projectId,
          heading,
          message,
          data: data || undefined,
        },
      });
    }

    //TODO: SEND IN APP NOTIFICATION.

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
}
