import { Prisma, User } from '@prisma/client';
import { AddProjectUpdatesDto } from '../dto/add-project-updates.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { StorageService } from 'src/storage/storage.service';
import {
  Injectable,
  Logger,
  UnprocessableEntityException,
} from '@nestjs/common';
import { StorageFolderEnum } from 'src/storage/storage-folder.enum';
import { ApiResponse } from 'src/common/dto/api-response.dto';
import { EditProjectUpdateDto } from '../dto/edit-project-update.dto';
import { Multer } from 'multer';

@Injectable()
export class ProjectsUpdatesService {
  logger = new Logger(ProjectsUpdatesService.name);

  constructor(
    private readonly prismaService: PrismaService,
    private readonly storageService: StorageService,
  ) {}

  async addProjectUpdates(
    addProjectUpdatesDto: AddProjectUpdatesDto,
    beforeImage: Express.Multer.File,
    afterImage: Express.Multer.File,
    authUser: User,
  ) {
    const { description, projectId } = addProjectUpdatesDto;

    const projectWhereInput: Prisma.ProjectWhereInput = { id: projectId };

    if (authUser.role === 'USER') {
      projectWhereInput.userId = authUser.id;
    } else if (authUser.role === 'VENDOR') {
      projectWhereInput.Bid = {
        some: {
          vendorId: authUser.id,
          vendorStatus: 'ACCEPTED',
          userStatus: 'ACCEPTED',
        },
      };
    }

    const project = await this.prismaService.project.findFirst({
      where: projectWhereInput,
    });

    if (!project) {
      throw new UnprocessableEntityException('Project not found');
    }

    const beforeImageUrl = await this.storageService.uploadFile(
      beforeImage,
      StorageFolderEnum.PROJECTS,
    );
    const afterImageUrl = await this.storageService.uploadFile(
      afterImage,
      StorageFolderEnum.PROJECTS,
    );

    const projectUpdateCreateInput: Prisma.ProjectUpdateCreateInput = {
      project: {
        connect: {
          id: projectId,
        },
      },
      ProjectUpdateFile: {
        createMany: {
          data: [
            {
              type: 'BEFORE',
              fileUrl: beforeImageUrl,
            },
            { type: 'AFTER', fileUrl: afterImageUrl },
          ],
        },
      },
      description,
    };

    if (authUser.role === 'VENDOR') {
      projectUpdateCreateInput.Vendor = {
        connect: {
          id: authUser.id,
        },
      };
    }

    try {
      const projectUpdate = await this.prismaService.projectUpdate.create({
        data: projectUpdateCreateInput,
      });

      return new ApiResponse(
        projectUpdate,
        'Project Update added successfully',
      );
    } catch (error) {
      this.logger.error(
        `Error happened during project update deleting files from s3 bucket`,
      );

      await this.storageService.deleteFile(beforeImageUrl);
      await this.storageService.deleteFile(afterImageUrl);

      throw error;
    }
  }

  async getProjectsUpdates(projectId: string) {
    const project = await this.prismaService.project.findUnique({
      where: { id: projectId },
    });

    if (!project) {
      throw new UnprocessableEntityException('Project not found');
    }

    const projectUpdates = await this.prismaService.projectUpdate.findMany({
      where: {
        projectId,
      },
      include: {
        ProjectUpdateFile: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    const result = await Promise.all(
      projectUpdates.map(async (item) => ({
        ...item,
        ProjectUpdateFile: await Promise.all(
          item.ProjectUpdateFile.map(async (file) => ({
            ...file,
            fileUrl: await this.storageService.getSignedFileUrl(file.fileUrl),
          })),
        ),
      })),
    );

    return new ApiResponse(result, 'Project Updates Fetched Successfully');
  }

  async editProjectsUpdate(
    editProjectUpdateDto: EditProjectUpdateDto,
    authUser: User,
  ) {
    const { id, description } = editProjectUpdateDto;

    const projectUpdate = await this.isUpdateExist(id, authUser);

    if (!projectUpdate) {
      throw new UnprocessableEntityException('Project Update Not found');
    }

    const edittedProjectUpdate = await this.prismaService.projectUpdate.update({
      where: {
        id,
      },
      data: {
        description,
      },
    });

    return new ApiResponse(edittedProjectUpdate, 'Updated successfully');
  }

  async deleteProjectUpdate(id: string, authUser: User) {
    const projectUpdate = await this.isUpdateExist(id, authUser);

    if (!projectUpdate) {
      throw new UnprocessableEntityException('Project update not found');
    }

    const deletedProjectUpdate = await this.prismaService.projectUpdate.delete({
      where: {
        id,
      },
    });

    return new ApiResponse(
      deletedProjectUpdate,
      'Project update deleted successfully',
    );
  }

  async isUpdateExist(id: string, authUser: User) {
    const projectUpdateWhereInput: Prisma.ProjectUpdateWhereInput = {
      id,
    };

    if (authUser.role === 'USER') {
      projectUpdateWhereInput.project = {
        userId: authUser.id,
      };
    } else if (authUser.role === 'VENDOR') {
      projectUpdateWhereInput.vendorId = authUser.id;
    }

    const projectUpdate = await this.prismaService.projectUpdate.findFirst({
      where: projectUpdateWhereInput,
      include: {
        ProjectUpdateFile: true,
      },
    });

    return projectUpdate;
  }
}
