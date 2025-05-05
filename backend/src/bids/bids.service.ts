import {
  Injectable,
  Logger,
  OnModuleInit,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { ApiResponse } from 'src/common/dto/api-response.dto';
import { Cron, CronExpression } from '@nestjs/schedule';
import { GetBidsDto } from './dto/get-bids.dto';
import { BidActionDto } from './dto/bid-action.dto';
import { StorageService } from 'src/storage/storage.service';
import { StorageFolderEnum } from 'src/storage/storage-folder.enum';

@Injectable()
export class BidsService implements OnModuleInit {
  onModuleInit() {
    this.bidInvite();
  }

  logger = new Logger(BidsService.name);

  constructor(
    private readonly prismaService: PrismaService,
    private readonly storageService: StorageService,
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
        vendorStatus: 'desc',
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

    //actions for admin
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

      return new ApiResponse(null, 'Bid accepted successfully');
    }

    if (action === 'REJECTED' && authUser.role === 'VENDOR') {
      const bid = await this.prismaService.bid.update({
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

      return new ApiResponse(null, 'Bid rejected successfully');
    }

    //actions for user
    if (action === 'ACCEPTED' && authUser.role === 'USER') {
      if (bid.project.status === 'AWARDED') {
        throw new UnprocessableEntityException(
          'Project has already assinged to some vendor',
        );
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

      return new ApiResponse(null, 'Project awarded successfully');
    }

    if (action === 'REJECTED' && authUser.role === 'USER') {
      const bid = await this.prismaService.bid.update({
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

      return new ApiResponse(null, 'Bid rejected successfully');
    }
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
        Bid: {
          none: {
            NOT: {
              userStatus: 'ACCEPTED',
              vendorStatus: 'ACCEPTED',
            },
          },
        },
      },
      include: {
        Bid: true,
      },
    });

    if (projects.length === 0) {
      this.logger.debug('All Projects have assigned bid');
    }

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
        await this.prismaService.project.update({
          where: {
            id: project.id,
          },
          data: {
            status: 'VENDOR_FOUND',
          },
        });
      } else {
        this.logger.debug(`No vendors available for project ${project.id}`);
      }
    }
  }
}
