import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { Prisma, User, UserRoleEnum } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { ApiResponse } from 'src/common/dto/api-response.dto';
import { GetUsersDto } from './dto/get-user.dto';

@Injectable()
export class UsersService {
  userSelect: Prisma.UserSelect = {
    id: true,
    email: true,
    isActive: true,
    isEmailVerified: true,
    role: true,
    createdAt: true,
    updatedAt: true,
    UserProfile: true,
  };
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(getUsersDto: GetUsersDto, authUser: User) {
    const { filter, sortField, sortValue, page = 1, limit = 10 } = getUsersDto;

    const offset = (page - 1) * limit;

    const userWhereInput: Prisma.UserWhereInput = {
      NOT: {
        id: authUser.id,
      },
    };

    const emailFilter = filter?.find((item) => item.id === 'email');
    const roleFilter = filter?.find((item) => item.id === 'role');

    if (emailFilter) {
      userWhereInput.email = {
        contains: (emailFilter.value as string) || undefined,
        mode: 'insensitive',
      };
    }

    if (roleFilter) {
      userWhereInput.role = {
        in: (roleFilter.value as UserRoleEnum[]) || undefined,
      };
    }

    const users = await this.prismaService.user.findMany({
      where: userWhereInput,
      select: this.userSelect,
      orderBy: {
        [sortField]: sortValue,
      },
      skip: offset,
      take: +limit,
    });

    const count = await this.prismaService.user.count({
      where: userWhereInput,
    });

    return new ApiResponse({ total: count, list: users });
  }

  async findOne(id: string) {
    const user = await this.prismaService.user.findFirst({
      where: {
        id,
      },
      select: this.userSelect,
    });

    if (!user) {
      throw new UnprocessableEntityException('User does done not exist');
    }

    return new ApiResponse(user);
  }

  async getOwnProfile(authUser: User) {
    const user = await this.prismaService.user.findFirst({
      where: {
        id: authUser.id,
      },
      select: this.userSelect,
    });
    return new ApiResponse(user);
  }
}
