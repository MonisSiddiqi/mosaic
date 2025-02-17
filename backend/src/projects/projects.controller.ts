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
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  @Roles(UserRole.USER)
  @UseGuards(RolesGuard)
  @UseInterceptors(
    FilesInterceptor('file', 10, {
      limits: {
        files: 10,
        fileSize: 1024 * 1024 * 5,
      },
      fileFilter(req, file, callback) {
        const allowedMimeTypes = [
          'image/jpeg',
          'image/png',
          'image/jpg',
          'image/webp',
        ];

        if (!allowedMimeTypes.includes(file.mimetype)) {
          return callback(
            new UnprocessableEntityException('Only image files are allowed!'),
            false,
          );
        }

        callback(null, true);
      },
    }),
  )
  create(
    @Body() createProjectDto: CreateProjectDto,
    @GetUser() authUser: User,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    // if (!files || files.length === 0) {
    //   throw new UnprocessableEntityException('At least one image is required!');
    // }

    return this.projectsService.create(createProjectDto, authUser, files);
  }

  @Get()
  findAll(@Query() getProjectsDto: GetProjectsDto, @GetUser() authUser: User) {
    return this.projectsService.findAll(getProjectsDto, authUser);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectsService.findOne(+id);
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
