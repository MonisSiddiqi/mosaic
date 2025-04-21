import { Injectable } from '@nestjs/common';
import { ApiResponse } from 'src/common/dto/api-response.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PaymentsService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllPlans() {
    const plans = await this.prismaService.plan.findMany({
      include: {
        Service: true,
      },
    });

    return new ApiResponse(plans, 'Plans fetched successfullly');
  }
}
