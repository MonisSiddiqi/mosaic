import { Injectable, Logger } from '@nestjs/common';
import { User } from '@prisma/client';
import { ApiResponse } from 'src/common/dto/api-response.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PaymentsService {
  constructor(private readonly prismaService: PrismaService) {}

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

    return new ApiResponse(plan);
  }
}
