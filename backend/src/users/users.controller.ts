import {
  Body,
  Controller,
  FileTypeValidator,
  Get,
  Param,
  ParseFilePipe,
  ParseUUIDPipe,
  Patch,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User, UserRole } from '@prisma/client';
import { GetUsersDto } from './dto/get-user.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { EditProfileDto } from './dto/edit-profile.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  findAll(@Query() getUsersDto: GetUsersDto, @GetUser() authUser: User) {
    return this.usersService.findAll(getUsersDto, authUser);
  }

  @Get('me')
  getOwnProfile(@GetUser() authUser: User) {
    return this.usersService.getOwnProfile(authUser);
  }

  @Patch('me')
  @UseInterceptors(FileInterceptor('file'))
  editProfile(
    @Body() editProfileDto: EditProfileDto,
    @UploadedFile(
      new ParseFilePipe({
        fileIsRequired: false,
        validators: [new FileTypeValidator({ fileType: 'image/*' })],
      }),
    )
    file: Express.Multer.File,
    @GetUser() authUser: User,
  ) {
    return this.usersService.editProfile(editProfileDto, file, authUser);
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.usersService.findOne(id);
  }
}
