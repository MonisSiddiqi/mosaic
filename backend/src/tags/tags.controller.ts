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
  UploadedFiles,
  ParseFilePipe,
  FileTypeValidator,
} from '@nestjs/common';
import { User, UserRole } from '@prisma/client';

import { CreateTagDto } from './dto/create-tag.dto';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import {
  FileFieldsInterceptor,
  FileInterceptor,
} from '@nestjs/platform-express';
import { GetTagsDto } from './dto/get-tags.dto';
import { SkipAuth } from 'src/auth/decorators/skip-auth.decorator';
import { UpdateTagDto } from './dto/update-tag.dto';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { AddVendorTagDto } from './dto/add-vendor-tag.dto';
import { TagsService } from './tags.service';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsTag: TagsService) {}

  @Post()
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  create(@Body() createTagDto: CreateTagDto) {
    return this.tagsTag.create(createTagDto);
  }

  @Post('vendor')
  @UseGuards(RolesGuard)
  @Roles(UserRole.VENDOR)
  addVendorTag(
    @Body() addVendorTagDto: AddVendorTagDto,
    @GetUser() authUser: User,
  ) {
    return this.tagsTag.addVendorTag(addVendorTagDto.tagId, authUser);
  }

  @Get()
  @SkipAuth()
  findAll(@Query() getTagsDto: GetTagsDto, @GetUser() authUser: User) {
    return this.tagsTag.findAll(getTagsDto, authUser);
  }

  @Get(':id')
  @SkipAuth()
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.tagsTag.findOne(id);
  }

  @Patch(':id')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateTagDto: UpdateTagDto,
  ) {
    return this.tagsTag.update(id, updateTagDto);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.tagsTag.remove(id);
  }
}
