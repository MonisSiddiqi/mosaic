import { Injectable, UnprocessableEntityException } from '@nestjs/common';

import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { ApiResponse } from '../common/dto/api-response.dto';
import { Prisma, User } from '@prisma/client';
import { GetTagsDto } from './dto/get-tags.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TagsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createTagDto: CreateTagDto) {
    const { name, serviceId } = createTagDto;

    const isExist = await this.prismaService.tag.findUnique({
      where: {
        name,
      },
    });

    if (isExist) {
      throw new UnprocessableEntityException(
        'Tag with same name already exists.',
      );
    }

    const service = await this.prismaService.service.findUnique({
      where: {
        id: serviceId,
      },
    });

    if (!service) {
      throw new UnprocessableEntityException('Service not found.');
    }

    const tagCreateInput: Prisma.TagCreateInput = {
      name,
      service: {
        connect: { id: serviceId },
      },
    };

    const tag = await this.prismaService.tag.create({
      data: tagCreateInput,
    });

    return new ApiResponse(tag, 'Tag Added Successfully');
  }

  async findAll(getTagsDto: GetTagsDto, authUser?: User) {
    const { filter, limit, page, sortField, sortValue } = getTagsDto;

    const tagWhereInput: Prisma.TagWhereInput = {};

    const textFilter = filter?.find((item) => item.id === 'name');
    const serviceId = filter?.find((item) => item.id === 'serviceId');

    if (textFilter) {
      tagWhereInput.name = {
        contains: textFilter.value,
        mode: 'insensitive',
      };
    }

    if (serviceId) {
      const service = await this.prismaService.service.findUnique({
        where: {
          id: serviceId?.value,
        },
      });
      if (!service) {
        throw new UnprocessableEntityException('Service not found');
      }
      tagWhereInput.serviceId = service.id;
    }

    const orderBy: Prisma.TagOrderByWithRelationInput = {};

    if (sortField === 'vendor') {
      orderBy.VendorTag = {
        _count: sortValue,
      };
    } else {
      orderBy[sortField] = sortValue;
    }

    const tags = await this.prismaService.tag.findMany({
      where: tagWhereInput,
      include: {
        VendorTag: {
          where: {
            userId: authUser?.id,
          },
        },
        service: true,
      },
      ...(page > 0 ? { skip: (page - 1) * limit, take: limit } : {}),
      orderBy,
    });

    const total = await this.prismaService.tag.count({
      where: tagWhereInput,
    });

    return new ApiResponse({ total, list: tags }, 'Tags fetched successfully');
  }

  /* find one */
  async findOne(id: string) {
    const tag = await this.prismaService.tag.findUnique({
      where: {
        id,
      },
    });

    if (!tag) {
      throw new UnprocessableEntityException('Tag not found');
    }

    return new ApiResponse(tag, 'Tag fetched successfully');
  }

  async update(id: string, updateTagDto: UpdateTagDto) {
    const { name } = updateTagDto;

    const tag = await this.prismaService.tag.findUnique({
      where: {
        id,
      },
    });

    if (!tag) {
      throw new UnprocessableEntityException('Tag not found');
    }

    const tagUpdateInput: Prisma.TagUpdateInput = {
      name,
    };

    const updatedTag = await this.prismaService.tag.update({
      where: {
        id,
      },
      data: tagUpdateInput,
    });

    return new ApiResponse(updatedTag, 'Tag Updated Successfully');
  }

  async remove(id: string) {
    const tag = await this.prismaService.tag.findUnique({
      where: {
        id,
      },
    });

    if (!tag) {
      throw new UnprocessableEntityException(`Tag not found`);
    }

    await this.prismaService.tag.delete({
      where: {
        id,
      },
    });

    return new ApiResponse(tag, 'Tag Deleted Successfully');
  }

  async addVendorTag(id: string, authUser: User) {
    const tag = await this.prismaService.tag.findUnique({
      where: {
        id,
      },
      include: {
        VendorTag: {
          where: {
            userId: authUser.id,
          },
        },
      },
    });

    if (!tag) {
      throw new UnprocessableEntityException('Tag not found');
    }

    const isAlreadyAdded = tag.VendorTag.length > 0;

    if (isAlreadyAdded) {
      await this.prismaService.vendorTag.delete({
        where: {
          userId_tagId: {
            userId: authUser.id,
            tagId: id,
          },
        },
      });

      return new ApiResponse(null, 'Tag removed from vendor successfully');
    }

    await this.prismaService.vendorTag.create({
      data: {
        tagId: id,
        userId: authUser.id,
      },
    });

    return new ApiResponse(null, 'Tag added to vendor successfully');
  }
}
