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
  ) {
    const {
      title,
      description,
      preference,
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
    } = createProjectDto;

    const projectCreateInput: Prisma.ProjectCreateInput = {
      title,
      description,
      user: { connect: { id: authUser.id } },
    };

    if (preference) {
      projectCreateInput.preference = preference;
    }

    // if (serviceId) {
    //   const serviceExists = await this.prismaService.service.findUnique({
    //     where: { id: serviceId },
    //   });

    //   if (!serviceExists) {
    //     // throw new UnprocessableEntityException(`Service not found`);
    //     projectCreateInput.Service = { connect: { id: serviceId } };
    //   }

    //   // projectCreateInput.Service = { connect: { id: serviceId } };
    // }

    // if (tags && tags.length > 0) {
    //   const existingTags = await this.prismaService.tag.findMany({
    //     where: { id: { in: tags } },
    //     select: { id: true },
    //   });

    //   const existingTagIds = existingTags.map((tag) => tag.id);
    //   const nonExistingTags = tags.filter(
    //     (tag) => !existingTagIds.includes(tag),
    //   );

    //   if (nonExistingTags.length > 0) {
    //     throw new UnprocessableEntityException(
    //       `Tags not found: ${nonExistingTags.join(', ')}`,
    //     );
    //   }

    //   if (existingTagIds.length > 0) {
    //     projectCreateInput.ProjectTag = {
    //       createMany: {
    //         data: existingTagIds.map((tagId) => ({ tagId })),
    //       },
    //     };
    //   }
    // }

    // projectCreateInput.Address = {
    //   create: {
    //     line1,
    //     ...(line2 ? { line2 } : {}),
    //     country,
    //     state,
    //     city,
    //     postalCode,
    //   },
    // };

    // projectCreateInput.SiteMeasurement = {
    //   create: {
    //     length,
    //     width,
    //     height,
    //     area,
    //   },
    // };

    const filesUrls = await Promise.all(
      files.map(async (file) => {
        try {
          return await this.storageService.uploadImageFile(
            file.buffer,
            StorageFolderEnum.PROJECTS,
          );
        } catch (error) {
          console.log(
            `Failed to upload file: ${file.originalname}, Error: ${error.message}`,
          );
          return null;
        }
      }),
    );

    // const validFileUrls = filesUrls.filter((url) => url !== null);

    // projectCreateInput.ProjectImage = {
    //   createMany: {
    //     data: validFileUrls.map((url) => ({ url, type: 'BEFORE' })),
    //   },
    // };

    const project = await this.prismaService.project.create({
      data: projectCreateInput,
    });

    return new ApiResponse(project);
  }

  async findAll(getProjectsDto: GetProjectsDto, authUser: User) {
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
