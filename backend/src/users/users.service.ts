import {
  Injectable,
  Logger,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Prisma, User, UserRole } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { ApiResponse } from 'src/common/dto/api-response.dto';
import { GetUsersDto } from './dto/get-user.dto';
import { EditProfileDto } from './dto/edit-profile.dto';
import { StorageService } from 'src/storage/storage.service';
import { StorageFolderEnum } from 'src/storage/storage-folder.enum';
import { GetLoginHistoryDto } from './dto/get-login-history-dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly storageService: StorageService,
  ) {}

  logger = new Logger(UsersService.name);

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
    const locationFilter = filter?.find((item) => item.id === 'location');
    const isActiveFilter = filter?.find((item) => item.id === 'isActive');

    if (emailFilter) {
      userWhereInput.email = {
        contains: (emailFilter.value as string) || undefined,
        mode: 'insensitive',
      };
    }

    if (roleFilter) {
      userWhereInput.role = {
        in: (roleFilter.value as UserRole[]) || undefined,
      };
    }

    if (locationFilter) {
      userWhereInput.Address = {
        city: {
          in: locationFilter.value.map((item) => item) || undefined,
        },
      };
    }

    if (isActiveFilter) {
      const active = isActiveFilter.value.find((item) => item === 'ACTIVE');
      const inAcitve = isActiveFilter.value.find(
        (item) => item === 'IN_ACTIVE',
      );

      if (!(active && inAcitve)) {
        if (active) {
          userWhereInput.isActive = true;
        } else if (inAcitve) {
          userWhereInput.isActive = false;
        }
      }
    }

    const users = await this.prismaService.user.findMany({
      where: userWhereInput,
      omit: {
        password: true,
      },
      include: {
        UserProfile: true,
      },
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
      include: {
        UserProfile: true,
      },
      omit: {
        password: true,
      },
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
      include: {
        UserProfile: true,
        Address: true,
      },
      omit: {
        password: true,
      },
    });
    return new ApiResponse({
      ...user,
      UserProfile: {
        ...user.UserProfile,
        image: await this.storageService.getSignedFileUrl(
          user.UserProfile.image,
        ),
      },
    });
  }

  async editProfile(
    editProfileDto: EditProfileDto,
    file: Express.Multer.File,
    authUser: User,
  ) {
    const { name } = editProfileDto;

    const user = await this.prismaService.user.findUnique({
      where: {
        id: authUser.id,
      },
      include: {
        UserProfile: true,
        Address: true,
      },
    });

    if (!user) {
      throw new UnprocessableEntityException('User not found');
    }

    let image;

    if (file) {
      this.logger.debug('Uploading profile image to s3 bucket...');
      image = await this.storageService.uploadFile(
        file,
        StorageFolderEnum.USERS,
      );
      this.logger.debug('Successfully uploaded profile image to s3 bucket');

      // Delete old image from s3 bucket
      if (user.UserProfile?.image) {
        this.logger.debug('Deleting old profile image from s3 bucket...');
        await this.storageService.deleteFile(user.UserProfile.image);
        this.logger.debug(
          'Successfully deleted old profile image from s3 bucket',
        );
      }
    }

    const updatedUser = await this.prismaService.user.update({
      where: {
        id: authUser.id,
      },
      data: {
        UserProfile: {
          connectOrCreate: {
            create: {
              name,
              ...(image ? { image } : {}),
            },
            where: {
              userId: authUser.id,
            },
          },
          update: {
            name,
            ...(image ? { image } : {}),
          },
        },
      },
      include: {
        UserProfile: true,
        Address: true,
      },
      omit: {
        password: true,
      },
    });

    return new ApiResponse(
      {
        ...updatedUser,
        UserProfile: {
          ...updatedUser.UserProfile,
          ...(updatedUser.UserProfile.image
            ? {
                image: await this.storageService.getSignedFileUrl(
                  updatedUser.UserProfile.image,
                ),
              }
            : {}),
        },
      },
      'User profile updated successfully',
    );
  }

  async getLoginHistory(getLoginHistoryDto: GetLoginHistoryDto) {
    const { filter, page, limit } = getLoginHistoryDto;

    const loginHistoryWhereInput: Prisma.LoginHistoryWhereInput = {};

    const emailFilter = filter?.find((item) => item.id === 'email');

    if (emailFilter) {
      loginHistoryWhereInput.user = {
        email: {
          contains: (emailFilter.value as string) || undefined,
          mode: 'insensitive',
        },
      };
    }

    const loginHistory = await this.prismaService.loginHistory.findMany({
      where: loginHistoryWhereInput,
      include: {
        user: {
          include: {
            UserProfile: true,
          },
          omit: {
            password: true,
          },
        },
      },

      ...(page > 0 ? { take: limit, skip: (page - 1) * limit } : {}),

      orderBy: {
        createdAt: 'desc',
      },
    });

    const total = await this.prismaService.loginHistory.count({
      where: loginHistoryWhereInput,
    });

    const list = await Promise.all(
      loginHistory.map(async (history) => ({
        ...history,
        user: {
          ...history.user,
          UserProfile: {
            ...history.user.UserProfile,
            image: history.user.UserProfile?.image
              ? await this.storageService.getSignedFileUrl(
                  history.user.UserProfile.image,
                )
              : null,
          },
        },
      })),
    );

    return new ApiResponse(
      { total, list },
      'Login history fetched successfully',
    );
  }

  async toggleActive(id: string) {
    console.log('request received');
    const user = await this.prismaService.user.findFirst({
      where: {
        id,
      },
    });

    if (!user) {
      throw new UnprocessableEntityException(
        `User with this id ${id} does not found`,
      );
    }

    const updatedUser = await this.prismaService.user.update({
      where: {
        id,
      },
      data: {
        isActive: !user.isActive,
      },
      omit: {
        password: true,
      },
    });

    return new ApiResponse(updatedUser, 'Status Updated Successfully');
  }
}
