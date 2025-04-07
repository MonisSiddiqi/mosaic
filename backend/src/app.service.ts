import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { ApiResponse } from './common/dto/api-response.dto';

@Injectable()
export class AppService {
  constructor(private readonly prismaService: PrismaService) {}

  async getDashboardData() {
    const homeOwners = await this.prismaService.user.count({
      where: {
        role: 'USER',
      },
    });

    const vendors = await this.prismaService.user.count({
      where: { role: 'VENDOR' },
    });

    const projects = await this.prismaService.project.count();

    const openBids = await this.prismaService.project.count({
      where: {
        status: 'AWARDED',
      },
    });

    return new ApiResponse(
      { homeOwners, vendors, projects, openBids },
      'Dashboard data fetched successfully',
    );
  }
}
