import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { ApiResponse } from 'src/common/dto/api-response.dto';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class BidsService implements OnModuleInit {
  logger = new Logger(BidsService.name);

  constructor(private readonly prismaService: PrismaService) {}

  async findAll(authUser: User) {
    const bids = await this.prismaService.bid.findMany({
      where: { vendorId: authUser.id },
    });

    return new ApiResponse(bids, 'Bids fetched successfully');
  }

  onModuleInit() {
    this.bidInvite();
  }

  @Cron(CronExpression.EVERY_30_MINUTES)
  async bidInvite() {
    this.logger.debug('Running bid invite cron job');
    //get all open projects which has not assigned to any vendor
    //cases
    //project is very new and bid still not pushed
    //project was accepted by vendor but rejected by user
    //proeject was rejected by vendor
    const projects = await this.prismaService.project.findMany({
      where: {
        OR: [
          {
            Bid: { some: {} },
          },
          {
            Bid: {
              none: {
                vendorStatus: { not: 'ACCEPTED' },
                userStatus: { not: 'ACCEPTED' },
              },
            },
          },
        ],
      },
      include: {
        Bid: true,
      },
    });

    for (const project of projects) {
      //get all vendors which did not get bid of this project before and which was not got the bid before
      const vendor = await this.prismaService.user.findFirst({
        where: {
          AND: [
            {
              role: 'VENDOR',
            },
            {
              id: {
                notIn: project.Bid.map((bid) => bid.vendorId),
              },
            },

            {
              projects: { none: { status: 'AWARDED' } },
            },
          ],
        },
      });

      if (vendor) {
        this.logger.debug(
          `Inviting vendor ${vendor.email} for project ${project.id}`,
        );
        await this.prismaService.bid.create({
          data: {
            projectId: project.id,
            vendorId: vendor.id,
            userStatus: 'PENDING',
            vendorStatus: 'PENDING',
          },
        });
      } else {
        this.logger.debug(`No vendors available for project ${project.id}`);
      }
    }
  }
}
