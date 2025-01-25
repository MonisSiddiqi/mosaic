import { Injectable } from '@nestjs/common';
import { Prisma, User, UserRole } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { ApiResponse } from 'src/common/dto/api-response.dto';
import { GetBidsDto } from './dto/get-bids.dto';

@Injectable()
export class BidsService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(getProjectsDto: GetBidsDto, authUser: User) {
    const { page, limit, sortField, sortValue, filter } = getProjectsDto;

    const projectWhereInput: Prisma.ProjectWhereInput = {};

    if (authUser.role !== UserRole.ADMIN) {
      projectWhereInput.userId = authUser.id;
    }

    const textFilter = filter?.find((item) => item.id === 'title');

    if (textFilter) {
      projectWhereInput.title = {
        contains: textFilter.value,
        mode: 'insensitive',
      };
    }

    const projects = await this.prismaService.project.findMany({
      where: projectWhereInput,
      ...(page > 0 ? { skip: (page - 1) * limit, take: limit } : {}),
      orderBy: {
        [sortField]: sortValue,
      },
    });

    const total = await this.prismaService.project.count({
      where: projectWhereInput,
    });

    return new ApiResponse(
      { total, list: projects },
      'Bids fetched successfully',
    );
  }
}
