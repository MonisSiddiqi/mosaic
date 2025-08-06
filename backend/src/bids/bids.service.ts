import {
  Injectable,
  Logger,
  OnModuleInit,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Prisma, ProjectStatus, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { ApiResponse } from 'src/common/dto/api-response.dto';
import { Cron, CronExpression } from '@nestjs/schedule';
import { GetBidsDto } from './dto/get-bids.dto';
import { BidActionDto } from './dto/bid-action.dto';
import { StorageService } from 'src/storage/storage.service';
import { StorageFolderEnum } from 'src/storage/storage-folder.enum';
import { AssignBidDto } from './dto/assign-bid.dto';
import { NotificationsService } from 'src/notifications/notifications.service';
import { getDistanceMiles } from 'src/common/helpers/utils';

@Injectable()
export class BidsService implements OnModuleInit {
  onModuleInit() {
    this.automaticBidInvite();
  }

  logger = new Logger(BidsService.name);

  constructor(
    private readonly prismaService: PrismaService,
    private readonly storageService: StorageService,
    private readonly notificationService: NotificationsService,
  ) {}

  async findAll(getBidsDto: GetBidsDto, authUser: User) {
    const { sortField, sortValue, page, limit, filter } = getBidsDto;

    const bidWhereInput: Prisma.BidWhereInput = {};

    const textFilter = filter?.find((item) => item.id === 'text');
    const vendorFilter = filter?.find((item) => item.id === 'vendor');

    if (textFilter && textFilter.value?.trim()) {
      bidWhereInput.project = {
        OR: [
          { title: { contains: textFilter.value, mode: 'insensitive' } },
          { description: { contains: textFilter.value, mode: 'insensitive' } },
        ],
      };
    }

    if (authUser.role === 'ADMIN') {
      if (vendorFilter) {
        bidWhereInput.project = {
          userId: {
            in: vendorFilter.value,
          },
        };
      }
    } else {
      bidWhereInput.vendorId = authUser.id;
    }

    const bids = await this.prismaService.bid.findMany({
      where: bidWhereInput,
      orderBy: {
        [sortField]: sortValue,
      },
      ...(page > 0
        ? {
            skip: (page - 1) * limit,
            take: limit,
          }
        : {}),

      include: {
        project: {
          include: {
            user: { include: { UserProfile: true }, omit: { password: true } },
          },
        },
      },
    });

    const total = await this.prismaService.bid.count({ where: bidWhereInput });

    return new ApiResponse({ total, list: bids }, 'Bids fetched successfully');
  }

  async bidAction(
    bidActionDto: BidActionDto,
    authUser: User,
    attachment?: Express.Multer.File,
  ) {
    const { bidId, action, message } = bidActionDto;

    const bidWhereInput: Prisma.BidWhereInput = { id: bidId };

    if (authUser.role === 'USER') {
      bidWhereInput.project = {
        userId: authUser.id,
      };
    }

    if (authUser.role === 'VENDOR') {
      bidWhereInput.vendorId = authUser.id;
    }

    const bid = await this.prismaService.bid.findFirst({
      where: bidWhereInput,
      include: {
        project: true,
      },
    });

    if (!bid) {
      throw new UnprocessableEntityException('Bid not found');
    }

    if (authUser.role === 'VENDOR') {
      if (bid.vendorStatus !== 'PENDING') {
        throw new UnprocessableEntityException(
          `You have already taken action on this bid`,
        );
      }
    } else {
      if (bid.userStatus !== 'PENDING') {
        throw new UnprocessableEntityException(
          `You have already taken action on this bid`,
        );
      }
    }

    if (authUser.role === 'USER' && bid.vendorStatus === 'PENDING') {
      throw new UnprocessableEntityException(
        `You cannot take action on this bid as vendor has not taken action yet`,
      );
    }

    //actions for vendor
    if (action === 'ACCEPTED' && authUser.role === 'VENDOR') {
      if (!attachment) {
        throw new UnprocessableEntityException('attachment is required');
      }

      if (bid.project.status === 'AWARDED') {
        throw new UnprocessableEntityException(
          'Project has already assinged to some vendor',
        );
      }

      if (bid.project.status === 'COMPLETED') {
        throw new UnprocessableEntityException('Project has already completed');
      }

      const key = await this.storageService.uploadFile(
        attachment,
        StorageFolderEnum.PROJECTS,
      );

      await this.prismaService.bid.update({
        where: { id: bidId },
        data: {
          vendorStatus: 'ACCEPTED',
          vendorAttachmentUrl: key,
          vendorAttachmentName: attachment.originalname,
          vendorMessage: message,
        },
      });

      await this.prismaService.project.update({
        where: {
          id: bid.projectId,
        },
        data: {
          status: 'VENDOR_FOUND',
        },
      });
    }

    if (action === 'REJECTED' && authUser.role === 'VENDOR') {
      if (bid.project.status === 'AWARDED') {
        throw new UnprocessableEntityException('Project has already accepted');
      }

      if (bid.project.status === 'COMPLETED') {
        throw new UnprocessableEntityException('Project has already completed');
      }

      await this.prismaService.bid.update({
        where: { id: bidId },
        data: {
          vendorStatus: 'REJECTED',
        },
      });

      await this.prismaService.project.update({
        where: {
          id: bid.projectId,
        },
        data: {
          status: 'IN_PROGRESS',
        },
      });
    }

    //actions for user
    if (action === 'ACCEPTED' && authUser.role === 'USER') {
      if (bid.project.status === 'AWARDED') {
        throw new UnprocessableEntityException('Project has already accepted');
      }

      if (bid.project.status === 'COMPLETED') {
        throw new UnprocessableEntityException('Project has already completed');
      }

      await this.prismaService.bid.update({
        where: { id: bidId },
        data: {
          userStatus: 'ACCEPTED',
        },
      });

      await this.prismaService.project.update({
        where: {
          id: bid.projectId,
        },
        data: {
          status: 'AWARDED',
        },
      });
    }

    if (action === 'REJECTED' && authUser.role === 'USER') {
      if (bid.project.status === 'AWARDED') {
        throw new UnprocessableEntityException('Project has already accepted');
      }

      if (bid.project.status === 'COMPLETED') {
        throw new UnprocessableEntityException('Project has already completed');
      }

      await this.prismaService.bid.update({
        where: { id: bidId },
        data: {
          userStatus: 'REJECTED',
        },
      });

      await this.prismaService.project.update({
        where: {
          id: bid.projectId,
        },
        data: {
          status: 'IN_PROGRESS',
        },
      });
    }

    //Sending notifications
    if (authUser.role === 'USER') {
      const recipient = await this.prismaService.user.findUnique({
        where: {
          id: bid.vendorId,
        },
      });

      await this.notificationService.sendBidActionNotification(
        recipient,
        bid.project,
        action,
      );
    } else if (authUser.role === 'VENDOR') {
      const recipient = await this.prismaService.user.findUnique({
        where: {
          id: bid.project.userId,
        },
      });

      await this.notificationService.sendBidActionNotification(
        recipient,
        bid.project,
        action,
      );
    }

    return new ApiResponse(null, `Bid ${action} successfully`);
  }

  async bidsStatistics(authUser: User) {
    const totolBids = await this.prismaService.bid.count({
      where: { vendorId: authUser.id },
    });

    const pendingBids = await this.prismaService.bid.count({
      where: { vendorId: authUser.id, vendorStatus: 'PENDING' },
    });

    const acceptedBids = await this.prismaService.bid.count({
      where: { vendorId: authUser.id, vendorStatus: 'ACCEPTED' },
    });

    const rejectedBids = await this.prismaService.bid.count({
      where: { vendorId: authUser.id, vendorStatus: 'REJECTED' },
    });

    const data = {
      totolBids,
      pendingBids,
      acceptedBids,
      rejectedBids,
    };

    return new ApiResponse(data);
  }

  @Cron(CronExpression.EVERY_30_MINUTES)
  async automaticBidInvite() {
    this.logger.debug('Running bid automatic invite cron job');

    /*
    Points to consider
    1. Projects should be IN_PROGRESS
    2. Vendor should have active plan.
    3. Vendor should not have any bid assigned to this project before.
    4. Vendor should not have any project in AWARDED state.
    5. Vendor must have verified their email.
    6. Project distance must not exceed vendor's service area.
    7. Select the vendor who did not receive bid from long time meaning older bids first.  
    */

    const projects = await this.prismaService.project.findMany({
      where: {
        status: 'IN_PROGRESS',
      },
      include: {
        Bid: true,
        Address: true,
        user: true,
      },
    });

    if (projects.length === 0) {
      this.logger.debug('All Projects have assigned bid');
      return;
    }

    const vendors = await this.prismaService.user.findMany({
      where: {
        role: 'VENDOR',
        UserPlan: {
          some: {
            endDate: {
              gte: new Date(),
            },
          },
        },
        isEmailVerified: true,
        Bid: {
          none: {
            vendorStatus: 'ACCEPTED',
            userStatus: 'ACCEPTED',
            project: {
              status: {
                not: 'COMPLETED',
              },
            },
          },
        },
      },
      include: {
        Address: true,
        Bid: {
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });

    if (vendors.length === 0) {
      this.logger.debug('No vendors found for bid invite');
      return;
    }

    for (const project of projects) {
      this.logger.debug(`Vendors before filter: ${vendors.length}`);
      //filter those vendors who are out of service area
      //filter previously assigned vendors to this project
      const eligibleVendors = vendors.filter((vendor) => {
        const distance = getDistanceMiles(
          vendor.Address.lat,
          vendor.Address.lng,
          project.Address.lat,
          project.Address.lng,
        );
        const isUnderDistance = distance <= vendor.serviceDistance;
        const isPreviouslyAssigned = project.Bid.some(
          (bid) => bid.vendorId === vendor.id,
        );

        return isUnderDistance && !isPreviouslyAssigned;
      });

      this.logger.debug(`Vendors after filter: ${vendors.length}`);

      //sort vendors older bids first
      eligibleVendors.sort((a, b) => {
        const lastBidA = a.Bid[0];
        if (!lastBidA) return -1;
        const lastBidB = b.Bid[0];
        if (!lastBidB) return 1;
        return lastBidA.createdAt.getTime() - lastBidB.createdAt.getTime();
      });

      if (eligibleVendors.length === 0) {
        this.logger.debug(
          `No eligible vendors found for project "${project.title}".`,
        );
        continue;
      }

      const vendor = eligibleVendors[0]; // Select the first vendor after filtering
      this.logger.debug(
        `Assigning project "${project.title}" to vendor "${vendor.email}"`,
      );

      await this.prismaService.bid.create({
        data: {
          projectId: project.id,
          vendorId: vendor.id,
          userStatus: 'PENDING',
          vendorStatus: 'PENDING',
        },
      });

      await this.prismaService.project.update({
        where: { id: project.id },
        data: {
          status: 'VENDOR_FOUND',
        },
      });

      //sending notifications
      await this.notificationService.sendVendorFoundNotifications(
        vendor,
        project,
      );

      await this.notificationService.sendVendorFoundNotifications(
        project.user,
        project,
      );

      const admins = await this.prismaService.user.findMany({
        where: { role: 'ADMIN' },
      });

      for (const admin of admins) {
        await this.notificationService.sendVendorFoundNotifications(
          admin,
          project,
        );
      }
    }
  }

  async assignBid(assignBidDto: AssignBidDto) {
    const { projectId, vendorId } = assignBidDto;

    const project = await this.prismaService.project.findUnique({
      where: { id: projectId },
      include: { Bid: true, user: true },
    });

    if (!project) {
      throw new UnprocessableEntityException('Project not found');
    }

    if (project.status !== 'IN_PROGRESS') {
      throw new UnprocessableEntityException(
        'Project is not in a state to assign a bid',
      );
    }

    const vendor = await this.prismaService.user.findUnique({
      where: { id: vendorId },
    });

    if (!vendor) {
      throw new UnprocessableEntityException('Vendor not found');
    }

    if (vendor.role !== 'VENDOR') {
      throw new UnprocessableEntityException(
        'Only vendor can be assigned to projects',
      );
    }

    const isPreviouslyAssigned = project.Bid.some(
      (item) => item.vendorId === vendorId,
    );

    if (isPreviouslyAssigned) {
      throw new UnprocessableEntityException(
        'Vendor was previously assigned to this project',
      );
    }

    const bid = await this.prismaService.bid.create({
      data: {
        projectId,
        vendorId,
        userStatus: 'PENDING',
        vendorStatus: 'PENDING',
      },
    });

    await this.prismaService.project.update({
      where: { id: projectId },
      data: { status: 'VENDOR_FOUND' },
    });

    //sending notifications
    await this.notificationService.sendVendorFoundNotifications(
      vendor,
      project,
    );

    await this.notificationService.sendVendorFoundNotifications(
      project.user,
      project,
    );

    const admins = await this.prismaService.user.findMany({
      where: { role: 'ADMIN' },
    });
    for (const admin of admins) {
      await this.notificationService.sendVendorFoundNotifications(
        admin,
        project,
      );
    }

    return new ApiResponse(bid, 'Bid assigned successfully');
  }

  async markProjectComplete(bidId: string, authUser: User) {
    const bid = await this.prismaService.bid.findUnique({
      where: { id: bidId },
      include: {
        project: {
          include: {
            user: true,
          },
        },
        vendor: true,
      },
    });

    if (!bid) {
      throw new UnprocessableEntityException('Bid not found');
    }

    if (bid.vendorId !== authUser.id) {
      throw new UnprocessableEntityException(
        'You are not authorized to mark this project complete or this bid does not belong to you',
      );
    }

    if (bid.vendorStatus !== 'ACCEPTED') {
      throw new UnprocessableEntityException('You have not accepted this bid');
    }

    if (bid.project.status === 'COMPLETED') {
      throw new UnprocessableEntityException('Project is already completed');
    }

    if (bid.project.status !== 'AWARDED') {
      throw new UnprocessableEntityException('Project is not awarded');
    }

    await this.prismaService.project.update({
      where: { id: bid.projectId },
      data: { status: ProjectStatus.COMPLETED },
    });

    //notify user, admin and vendor
    await this.notificationService.sendProjectCompleteNotification(
      bid.project.user,
      bid.project,
    );
    await this.notificationService.sendProjectCompleteNotification(
      bid.vendor,
      bid.project,
    );

    const admins = await this.prismaService.user.findMany({
      where: { role: 'ADMIN' },
    });

    for (const admin of admins) {
      await this.notificationService.sendProjectCompleteNotification(
        admin,
        bid.project,
      );
    }

    return new ApiResponse(null, 'Project marked as completed successfully');
  }
}
