import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  UseGuards,
  UseInterceptors,
  UnprocessableEntityException,
  UploadedFiles,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  Patch,
  Delete,
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
import { AddProjectUpdatesDto } from './dto/add-project-updates.dto';
import { ProjectsUpdatesService } from './services/projects-updates.service';
import { EditProjectUpdateDto } from './dto/edit-project-update.dto';

@Controller('projects')
export class ProjectsController {
  constructor(
    private readonly projectsService: ProjectsService,
    private readonly projectsUpdatesService: ProjectsUpdatesService,
  ) {}

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

  @Post('updates')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'beforeImage', maxCount: 1 },
      { name: 'afterImage', maxCount: 1 },
    ]),
  )
  async addProjectUpdates(
    @Body() addProjectUpdatesDto: AddProjectUpdatesDto,
    @UploadedFiles()
    files: {
      beforeImage?: Express.Multer.File[];
      afterImage?: Express.Multer.File[];
    },
    @GetUser() authUser: User,
  ) {
    const beforeImage = files.beforeImage?.[0];
    const afterImage = files.afterImage?.[0];

    if (!beforeImage || !afterImage) {
      throw new UnprocessableEntityException(
        `${beforeImage ? 'afterImage' : 'beforeImage'} is required`,
      );
    }

    const validators = [
      new MaxFileSizeValidator({
        maxSize: 10 * 1024 * 1024,
        message: 'Expected size is 10mb',
      }),
      new FileTypeValidator({ fileType: /^image\// }),
    ];

    await new ParseFilePipe({ validators }).transform(beforeImage);
    await new ParseFilePipe({ validators }).transform(afterImage);

    return this.projectsUpdatesService.addProjectUpdates(
      addProjectUpdatesDto,
      beforeImage,
      afterImage,
      authUser,
    );
  }

  @Get('updates/:projectId')
  async getProjectsUpdates(@Param('projectId') projectId: string) {
    return this.projectsUpdatesService.getProjectsUpdates(projectId);
  }

  @Patch('updates')
  async editProjectsUpdate(
    @Body() editProjectUpdateDto: EditProjectUpdateDto,
    @GetUser() authUser: User,
  ) {
    return this.projectsUpdatesService.editProjectsUpdate(
      editProjectUpdateDto,
      authUser,
    );
  }

  @Delete('updates/:id')
  deleteProjectUpdate(@Param('id') id: string, @GetUser() authUser: User) {
    return this.projectsUpdatesService.deleteProjectUpdate(id, authUser);
  }

  @Get()
  findAll(@Query() getProjectsDto: GetProjectsDto, @GetUser() authUser: User) {
    return this.projectsService.findAll(getProjectsDto, authUser);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectsService.findOne(id);
  }
}
