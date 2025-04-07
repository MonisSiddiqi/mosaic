import { Controller, Get, Patch, Query, Res } from '@nestjs/common';
import { Response } from 'express';

import { NotificationsService } from './notifications.service';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { SkipAuth } from '../auth/decorators/skip-auth.decorator';
import { User } from '@prisma/client';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationService: NotificationsService) {}

  @Get()
  getAll(@GetUser() authUser: User, @Query('page') page: number) {
    return this.notificationService.getAll(authUser, page);
  }

  @Patch()
  markAsRead(@GetUser() authUser: User) {
    return this.notificationService.markAsRead(authUser);
  }

  @Get('/receive')
  @SkipAuth()
  stream(@Res() res: Response) {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.setHeader('X-Accel-Buffering', 'no');
    res.flushHeaders();

    const notificationObservable =
      this.notificationService.getNotificationObservable();

    notificationObservable.subscribe((notification) => {
      res.write(`event: notification\n`);
      res.write(`data: ${notification}\n\n`);
      // res.flush()
    });

    res.on('close', () => {
      console.log('Client disconnected');
      res.end();
    });
  }
}
