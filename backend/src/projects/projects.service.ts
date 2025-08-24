import {
  Injectable,
  Logger,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { GetProjectsDto } from './dto/get-projects.dto';
import { Prisma, ProjectStatus, User, UserRole } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { ApiResponse } from 'src/common/dto/api-response.dto';
import { StorageService } from 'src/storage/storage.service';
import { StorageFolderEnum } from 'src/storage/storage-folder.enum';
import { NotificationsService } from 'src/notifications/notifications.service';

@Injectable()
export class ProjectsService {
  logger = new Logger(ProjectsService.name);
  constructor(
    private readonly prismaService: PrismaService,
    private readonly storageService: StorageService,
    private readonly notificationService: NotificationsService,
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

    if (files && files.length > 0) {
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
    }

    if (sampleFiles && sampleFiles.length > 0) {
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
    }

    const project = await this.prismaService.project.create({
      data: projectCreateInput,
    });

    //adding tags
    await this.prismaService.projectTag.createMany({
      data: tags.map((item) => ({ tagId: item, projectId: project.id })),
    });

    // Notify admins about the new project
    const user = await this.prismaService.user.findFirst({
      where: {
        id: authUser.id,
      },
      include: {
        UserProfile: true,
      },
    });

    await this.notificationService.sendNewProjectNotification(project, user);

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
    const statusFilter = filter?.find((item) => item.id === 'status');
    const serviceFilter = filter?.find((item) => item.id === 'services');
    const locationFilter = filter?.find((item) => item.id === 'location');
    const tagFilter = filter?.find((item) => item.id === 'tags');

    if (userFilter?.value?.length) {
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

    if (statusFilter?.value?.length) {
      projectWhereInput.status = {
        in: statusFilter.value as ProjectStatus[],
      };
    }

    if (serviceFilter?.value?.length) {
      projectWhereInput.Service = {
        id: {
          in: serviceFilter.value,
        },
      };
    }

    if (locationFilter?.value?.length) {
      projectWhereInput.Address = {
        city: {
          in: locationFilter.value,
        },
      };
    }

    if (tagFilter?.value?.length) {
      projectWhereInput.ProjectTag = {
        some: {
          tagId: {
            in: tagFilter.value,
          },
        },
      };
    }

    const projects = await this.prismaService.project.findMany({
      where: projectWhereInput,
      include: {
        ProjectFile: true,
        Service: true,
        Bid: { include: { vendor: true } },
        user: { omit: { password: true } },
        ProjectUpdate: {
          include: {
            ProjectUpdateFile: true,
          },
        },
      },
      ...(page > 0 ? { skip: (page - 1) * limit, take: limit } : {}),
      orderBy: {
        [sortField]: sortValue,
      },
    });

    const total = await this.prismaService.project.count({
      where: projectWhereInput,
    });

    const list = await Promise.all(
      projects.map(async (project) => ({
        ...project,
        ProjectFile: await Promise.all(
          project.ProjectFile.map(async (projectFile) => ({
            ...projectFile,
            url: await this.storageService.getSignedFileUrl(projectFile.url),
          })),
        ),
        ProjectUpdate: await Promise.all(
          project.ProjectUpdate.map(async (update) => ({
            ...update,
            ProjectUpdateFile: await Promise.all(
              update.ProjectUpdateFile.map(async (file) => ({
                ...file,
                fileUrl: await this.storageService.getSignedFileUrl(
                  file.fileUrl,
                ),
              })),
            ),
          })),
        ),
      })),
    );

    return new ApiResponse({ total, list }, 'Projects fetched successfully');
  }

  async findOne(id: string) {
    const projectInclude: Prisma.ProjectInclude = {
      ProjectFile: true,
      SampleFile: true,
      SiteMeasurement: true,
      Address: true,
      ProjectTag: { include: { tag: true } },
      ProjectUpdate: true,
      user: { include: { UserProfile: true } },
      Bid: {
        include: {
          vendor: {
            omit: {
              password: true,
            },
            include: {
              UserProfile: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      },
      Service: true,
    };

    const project = await this.prismaService.project.findUnique({
      where: {
        id,
      },
      include: projectInclude,
    });

    if (!project) {
      throw new UnprocessableEntityException('Project not found');
    }

    const projectWithSignedUrl = {
      ...project,
      ProjectFile: await Promise.all(
        project.ProjectFile.map(async (item) => ({
          ...item,
          url: await this.storageService.getSignedFileUrl(item.url),
        })),
      ),
      SampleFile: await Promise.all(
        project.SampleFile.map(async (item) => ({
          ...item,
          url: await this.storageService.getSignedFileUrl(item.url),
        })),
      ),
    };

    return new ApiResponse(
      projectWithSignedUrl,
      'Project fetched successfully',
    );
  }

  async remove(projectId: string, authUser: User) {
    const projectWhereInput: Prisma.ProjectWhereInput = {};

    projectWhereInput.id = projectId;

    if (authUser.role !== UserRole.ADMIN) {
      projectWhereInput.userId = authUser.id;
    }

    const project = await this.prismaService.project.findFirst({
      where: projectWhereInput,
      include: {
        ProjectFile: true,
        SampleFile: true,
      },
    });

    if (!project) {
      throw new UnprocessableEntityException('Project not found');
    }

    if (project.status !== ProjectStatus.IN_PROGRESS) {
      throw new UnprocessableEntityException(
        'Project can only be deleted when it is in progress',
      );
    }

    // Delete project files from storage
    await Promise.all(
      project.ProjectFile.map((file) =>
        this.storageService.deleteFile(file.url),
      ),
    );
    // Delete sample files from storage
    await Promise.all(
      project.SampleFile.map((file) =>
        this.storageService.deleteFile(file.url),
      ),
    );

    // Delete project
    await this.prismaService.project.delete({
      where: {
        id: projectId,
      },
    });
    this.logger.log(`Project ${projectId} deleted by user ${authUser.id}`);

    return new ApiResponse(project, 'Project deleted successfully');
  }
}
