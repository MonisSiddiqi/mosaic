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
import { GetLoginHistoryDto } from './dto/get-login-history-dto';
import { SkipAuth } from 'src/auth/decorators/skip-auth.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @SkipAuth()
  findAll(@Query() getUsersDto: GetUsersDto, @GetUser() authUser: User) {
    return this.usersService.findAll(getUsersDto, authUser);
  }

  @Get('login-history')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  getLoginHistory(@Query() getLoginHistoryDto: GetLoginHistoryDto) {
    return this.usersService.getLoginHistory(getLoginHistoryDto);
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

  @Patch('toggle-active/:id')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  userToggleStatus(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.usersService.toggleActive(id);
  }
}
