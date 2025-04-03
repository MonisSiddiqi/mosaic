import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  UseInterceptors,
  UnprocessableEntityException,
  UploadedFiles,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { GetProjectsDto } from './dto/get-projects.dto';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User, UserRole } from '@prisma/client';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ApiResponse } from 'src/common/dto/api-response.dto';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  @Roles(UserRole.USER)
  @UseGuards(RolesGuard)
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'files', maxCount: 20 },
      { name: 'sampleFiles', maxCount: 10 },
    ]),
  )
  create(
    @Body() createProjectDto: CreateProjectDto,
    @GetUser() authUser: User,
    @UploadedFiles()
    files: { files: Express.Multer.File[]; sampleFiles: Express.Multer.File[] },
  ) {
    if (!files?.files?.length) {
      throw new UnprocessableEntityException(
        'At least one project image or video is required',
      );
    }

    return this.projectsService.create(
      createProjectDto,
      authUser,
      files.files,
      files.sampleFiles,
    );
  }

  @Get()
  findAll(@Query() getProjectsDto: GetProjectsDto, @GetUser() authUser: User) {
    return this.projectsService.findAll(getProjectsDto, authUser);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectsService.update(+id, updateProjectDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectsService.remove(+id);
  }
}
