import { Injectable, UnprocessableEntityException } from '@nestjs/common';

import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { PrismaService } from '../prisma/prisma.service';
import { ApiResponse } from '../common/dto/api-response.dto';
import { Prisma } from '@prisma/client';
import { StorageService } from 'src/storage/storage.service';
import { StorageFolderEnum } from 'src/storage/storage-folder.enum';
import { GetServicesDto } from './dto/get-services.dto';

@Injectable()
export class ServicesService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly storageService: StorageService,
  ) {}

  async create(icon: Express.Multer.File, createServiceDto: CreateServiceDto) {
    const { name, description } = createServiceDto;

    const isExist = await this.prismaService.service.findUnique({
      where: {
        name,
      },
    });

    if (isExist) {
      throw new UnprocessableEntityException(
        'Service with same name already exists.',
      );
    }

    const serviceCreateInput: Prisma.ServiceCreateInput = {
      name,
      description,
    };

    if (icon) {
      const iconUrl = await this.storageService.uploadImageFile(
        icon.buffer,
        StorageFolderEnum.SERVICES,
      );

      serviceCreateInput.iconUrl = iconUrl;
    }

    const service = await this.prismaService.service.create({
      data: serviceCreateInput,
    });

    return new ApiResponse(service, 'Service Added Successfully');
  }

  async findAll(getServicesDto: GetServicesDto) {
    const { filter, limit, page, sortField, sortValue } = getServicesDto;

    const serviceWhereInput: Prisma.ServiceWhereInput = {};

    const textFilter = filter?.find((item) => item.id === 'name');

    if (textFilter) {
      serviceWhereInput.name = {
        contains: textFilter.value,
        mode: 'insensitive',
      };
    }

    const services = await this.prismaService.service.findMany({
      where: serviceWhereInput,
      ...(page > 0 ? { skip: (page - 1) * limit, take: limit } : {}),
      orderBy: {
        [sortField]: sortValue,
      },
    });

    const total = await this.prismaService.service.count({
      where: serviceWhereInput,
    });

    return new ApiResponse(
      { total, list: services },
      'Services fetched successfully',
    );
  }

  /* find one */
  async findOne(id: string) {
    const service = await this.prismaService.service.findUnique({
      where: {
        id,
      },
    });

    if (!service) {
      throw new UnprocessableEntityException('Service not found');
    }

    return new ApiResponse(service, 'Service fetched successfully');
  }

  async update(
    id: string,
    updateServiceDto: UpdateServiceDto,
    icon: Express.Multer.File,
  ) {
    const { name, description } = updateServiceDto;

    const service = await this.prismaService.service.findUnique({
      where: {
        id,
      },
    });

    if (!service) {
      throw new UnprocessableEntityException('Service not found');
    }

    const serviceUpdateInput: Prisma.ServiceUpdateInput = {
      name,
      description,
    };

    if (icon) {
      if (service.iconUrl) {
        await this.storageService.deleteFile(service.iconUrl);
      }

      const iconUrl = await this.storageService.uploadImageFile(
        icon.buffer,
        StorageFolderEnum.SERVICES,
      );

      serviceUpdateInput.iconUrl = iconUrl;
    }

    const updatedService = await this.prismaService.service.update({
      where: {
        id,
      },
      data: serviceUpdateInput,
    });

    return new ApiResponse(updatedService, 'Service Updated Successfully');
  }

  async remove(id: string) {
    const service = await this.prismaService.service.findUnique({
      where: {
        id,
      },
    });

    if (!service) {
      throw new UnprocessableEntityException(`Service not found`);
    }

    await this.prismaService.service.delete({
      where: {
        id,
      },
    });

    return new ApiResponse(service, 'Service Deleted Successfully');
  }
}
