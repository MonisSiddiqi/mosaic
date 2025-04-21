import {
  Injectable,
  Logger,
  UnprocessableEntityException,
} from '@nestjs/common';

import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { PrismaService } from '../prisma/prisma.service';
import { ApiResponse } from '../common/dto/api-response.dto';
import { Prisma, User } from '@prisma/client';
import { StorageService } from 'src/storage/storage.service';
import { StorageFolderEnum } from 'src/storage/storage-folder.enum';
import { GetServicesDto } from './dto/get-services.dto';

@Injectable()
export class ServicesService {
  logger = new Logger(ServicesService.name);
  constructor(
    private readonly prismaService: PrismaService,
    private readonly storageService: StorageService,
  ) {}

  async create(icon: Express.Multer.File, createServiceDto: CreateServiceDto) {
    const { name, description, planId } = createServiceDto;

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
      console.log('hello here');
      try {
        const iconUrl = await this.storageService.uploadSvgFile(
          icon.buffer,
          StorageFolderEnum.SERVICES,
        );
        serviceCreateInput.iconUrl = iconUrl;
      } catch (e) {
        console.log(e);
        throw new UnprocessableEntityException(e.message);
      }
    }

    if (planId) {
      const plan = await this.prismaService.plan.findUnique({
        where: { id: planId },
      });

      if (!plan) {
        throw new UnprocessableEntityException('Plan not found');
      }

      serviceCreateInput.Plan = {
        connect: {
          id: planId,
        },
      };
    }

    const service = await this.prismaService.service.create({
      data: serviceCreateInput,
    });

    return new ApiResponse(service, 'Service Added Successfully');
  }

  async findAll(getServicesDto: GetServicesDto, authUser?: User) {
    const { filter, limit, page, sortField, sortValue } = getServicesDto;

    const serviceWhereInput: Prisma.ServiceWhereInput = {};

    const textFilter = filter?.find((item) => item.id === 'name');
    const planFilter = filter?.find((item) => item.id === 'plan');

    const orderBy: Prisma.ServiceOrderByWithRelationInput = {};

    if (sortField === 'vendor') {
      orderBy.VendorService = {
        _count: sortValue,
      };
    } else {
      orderBy[sortField] = sortValue;
    }

    if (textFilter) {
      serviceWhereInput.name = {
        contains: textFilter.value,
        mode: 'insensitive',
      };
    }

    if (planFilter) {
      serviceWhereInput.Plan = {
        name: {
          in: planFilter.value,
        },
      };
    }

    const services = await this.prismaService.service.findMany({
      where: serviceWhereInput,
      include: {
        VendorService: {
          where: {
            userId: authUser?.id,
          },
        },
        Plan: true,
      },
      ...(page > 0 ? { skip: (page - 1) * limit, take: limit } : {}),
      orderBy,
    });

    const list = await Promise.all(
      services.map(async (item) => ({
        ...item,
        iconUrl: item.iconUrl
          ? await this.storageService.getSignedFileUrl(item.iconUrl)
          : null,
      })),
    );

    const total = await this.prismaService.service.count({
      where: serviceWhereInput,
    });

    return new ApiResponse({ total, list }, 'Services fetched successfully');
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
    const { name, description, planId } = updateServiceDto;

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

    if (planId) {
      const plan = await this.prismaService.plan.findUnique({
        where: { id: planId },
      });

      if (!plan) {
        throw new UnprocessableEntityException('Plan not found');
      }

      serviceUpdateInput.Plan = {
        connect: {
          id: planId,
        },
      };
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

    if (service.iconUrl) {
      try {
        await this.storageService.deleteFile(service.iconUrl);
      } catch (err) {
        this.logger.error(err);
      }
    }

    await this.prismaService.service.delete({
      where: {
        id,
      },
    });

    return new ApiResponse(service, 'Service Deleted Successfully');
  }

  async addVendorService(id: string, authUser: User) {
    const service = await this.prismaService.service.findUnique({
      where: {
        id,
      },
      include: {
        VendorService: true,
      },
    });

    if (!service) {
      throw new UnprocessableEntityException('Service not found');
    }

    const isAlreadyAdded = service.VendorService.some(
      (item) => item.userId === authUser.id,
    );

    if (isAlreadyAdded) {
      await this.prismaService.vendorService.delete({
        where: {
          userId_serviceId: {
            userId: authUser.id,
            serviceId: id,
          },
        },
      });

      return new ApiResponse(
        service,
        'Service removed from vendor successfully',
      );
    }

    await this.prismaService.vendorService.create({
      data: {
        userId: authUser.id,
        serviceId: id,
      },
    });

    return new ApiResponse(service, 'Service added to vendor successfully');
  }
}
