import { Injectable, Logger } from '@nestjs/common';
import { User } from '@prisma/client';
import { ApiResponse } from 'src/common/dto/api-response.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { StorageService } from 'src/storage/storage.service';

@Injectable()
export class PaymentsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly storageService: StorageService,
  ) {}

  logger = new Logger(PaymentsService.name);

  async getAllPlans() {
    const plans = await this.prismaService.plan.findMany({
      include: {
        Service: true,
      },
      orderBy: {
        amount: 'asc',
      },
    });

    return new ApiResponse(plans, 'Plans fetched successfullly');
  }

  async currentPlan(authUser: User) {
    const plan = await this.prismaService.userPlan.findFirst({
      where: {
        userId: authUser.id,
        endDate: {
          gte: new Date(),
        },
      },
      include: {
        Plan: {
          include: {
            Service: {
              include: {
                VendorService: {
                  where: {
                    userId: authUser.id,
                  },
                },
                Tag: {
                  include: {
                    VendorTag: {
                      where: {
                        userId: authUser.id,
                      },
                    },
                  },
                  orderBy: {
                    VendorTag: {
                      _count: 'desc',
                    },
                  },
                },
              },
              orderBy: {
                VendorService: {
                  _count: 'desc',
                },
              },
            },
          },
        },
      },
      orderBy: {
        endDate: 'asc',
      },
    });

    const plansWithSignedUrl = await Promise.all(
      plan?.Plan.Service.map(async (service) => {
        if (service.iconUrl) {
          const signedUrl = await this.storageService.getSignedFileUrl(
            service.iconUrl,
          );
          return {
            ...service,
            iconUrl: signedUrl,
          };
        }
        return service;
      }),
    );

    return new ApiResponse(
      { ...plan, Plan: { ...plan.Plan, Service: plansWithSignedUrl } },
      'Current plan fetched successfully',
    );
  }
}
