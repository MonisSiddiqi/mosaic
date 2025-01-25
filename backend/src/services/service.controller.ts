import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  UseGuards,
  UseInterceptors,
  BadRequestException,
  UploadedFile,
  Query,
} from '@nestjs/common';
import { UserRole } from '@prisma/client';

import { CreateServiceDto } from './dto/create-service.dto';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { GetServicesDto } from './dto/get-services.dto';
import { SkipAuth } from 'src/auth/decorators/skip-auth.decorator';
import { UpdateServiceDto } from './dto/update-service.dto';
import { ServicesService } from './services.service';

@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Post()
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'icon', maxCount: 1 }], {
      fileFilter: (_, file, cb) => {
        if (file.fieldname === 'icon') {
          if (!(file.mimetype === 'image/svg+xml')) {
            return cb(
              new BadRequestException(
                'Invalid icon, only SVG files are allowed!',
              ),
              false,
            );
          }
        }
        cb(null, true);
      },
    }),
  )
  create(
    @Body() createServiceDto: CreateServiceDto,
    @UploadedFile() icon: Express.Multer.File,
  ) {
    return this.servicesService.create(icon, createServiceDto);
  }

  @Get()
  @SkipAuth()
  findAll(@Query() getServicesDto: GetServicesDto) {
    return this.servicesService.findAll(getServicesDto);
  }

  @Get(':id')
  @SkipAuth()
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.servicesService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'icon', maxCount: 1 }], {
      fileFilter: (_, file, cb) => {
        if (file.fieldname === 'icon') {
          if (!(file.mimetype === 'image/svg+xml')) {
            return cb(
              new BadRequestException(
                'Invalid icon, only SVG files are allowed!',
              ),
              false,
            );
          }
        }
        cb(null, true);
      },
    }),
  )
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateServiceDto: UpdateServiceDto,
    @UploadedFile() icon: Express.Multer.File,
  ) {
    return this.servicesService.update(id, updateServiceDto, icon);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.servicesService.remove(id);
  }
}
