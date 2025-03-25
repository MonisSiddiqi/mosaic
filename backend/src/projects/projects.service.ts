import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { GetProjectsDto } from './dto/get-projects.dto';
import { Prisma, User, UserRole } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { ApiResponse } from 'src/common/dto/api-response.dto';
import { StorageService } from 'src/storage/storage.service';
import { StorageFolderEnum } from 'src/storage/storage-folder.enum';

@Injectable()
export class ProjectsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly storageService: StorageService,
  ) {}

  async create(
    createProjectDto: CreateProjectDto,
    authUser: User,
    files: Express.Multer.File[],
    sampleFiles: Express.Multer.File[],
  ) {
    const {
      title,
      description,
      budgetPreference,
      serviceId,
      tags,
      line1,
      line2,
      country,
      state,
      city,
      postalCode,
      height,
      length,
      width,
      area,
      siteDescription,
      preferenceMessage,
      unit,
    } = createProjectDto;

    const projectCreateInput: Prisma.ProjectCreateInput = {
      title,
      description,
      user: { connect: { id: authUser.id } },
      Address: {
        create: {
          line1,
          ...(line2 ? { line2 } : {}),
          country,
          state,
          city,
          postalCode,
        },
      },
      SiteMeasurement: {
        create: {
          length,
          width,
          height,
          area,
          description: siteDescription,
          unit,
        },
      },
      budgetPreference,
      preferenceMessage,
    };

    const serviceExists = await this.prismaService.service.findUnique({
      where: { id: serviceId },
    });

    //validating service
    if (!serviceExists) {
      throw new UnprocessableEntityException(`Service not found`);
    }
    projectCreateInput.Service = { connect: { id: serviceId } };

    // validating tags
    await Promise.all(
      tags.map(async (tagId) => {
        const isExist = await this.prismaService.tag.findUnique({
          where: {
            id: tagId,
          },
        });
        if (!isExist) {
          throw new UnprocessableEntityException(`Tag not found`);
        }
      }),
    );

    const filesUrls = await Promise.all(
      files.map((file) =>
        this.storageService.uploadFile(file, StorageFolderEnum.PROJECTS),
      ),
    );

    projectCreateInput.ProjectFile = {
      createMany: {
        data: filesUrls.map((url) => ({ url, type: 'BEFORE' })),
      },
    };

    const sampleFilesUrls = await Promise.all(
      sampleFiles.map((file) =>
        this.storageService.uploadFile(file, StorageFolderEnum.PROJECTS),
      ),
    );

    projectCreateInput.SampleFile = {
      createMany: {
        data: sampleFilesUrls.map((url) => ({ url })),
      },
    };

    const project = await this.prismaService.project.create({
      data: projectCreateInput,
    });

    //adding tags
    await this.prismaService.projectTag.createMany({
      data: tags.map((item) => ({ tagId: item, projectId: project.id })),
    });

    return new ApiResponse(project);
  }

  async findAll(getProjectsDto: GetProjectsDto, authUser: User) {
    const { page, limit, sortField, sortValue, filter } = getProjectsDto;

    const projectWhereInput: Prisma.ProjectWhereInput = {};

    if (authUser.role === UserRole.VENDOR) {
      projectWhereInput.Bid = { some: { vendorId: authUser.id } };
    } else if (authUser.role === UserRole.USER) {
      projectWhereInput.user = { id: authUser.id };
    }

    const textFilter = filter?.find((item) => item.id === 'title');
    const userFilter = filter?.find((item) => item.id === 'users');

    if (userFilter) {
      projectWhereInput.user = {
        id: {
          in: userFilter.value,
        },
      };
    }

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
      'Projects fetched successfully',
    );
  }

  findOne(id: number) {
    return `This action returns a #${id} project`;
  }

  update(id: number, updateProjectDto: UpdateProjectDto) {
    return `This action updates a #${id} project`;
  }

  remove(id: number) {
    return `This action removes a #${id} project`;
  }
}
