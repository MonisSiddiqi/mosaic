import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { GetProjectsDto } from './dto/get-projects.dto';
import { Prisma, User, UserRoleEnum } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { ApiResponse } from 'src/common/dto/api-response.dto';

@Injectable()
export class ProjectsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createProjectDto: CreateProjectDto) {
    return 'This action adds a new project';
  }

  async findAll(getProjectsDto: GetProjectsDto, authUser: User) {
    const { page, limit, sortField, sortValue, filter } = getProjectsDto;

    const projectWhereInput: Prisma.ProjectWhereInput = {};

    if (authUser.role !== UserRoleEnum.ADMIN) {
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
