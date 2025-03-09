import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { ApiResponse } from 'src/common/dto/api-response.dto';

@Injectable()
export class BidsService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(authUser: User) {
    const bids = await this.prismaService.bid.findMany({
      where: { vendorId: authUser.id },
    });

    return new ApiResponse(bids, 'Bids fetched successfully');
  }
}
