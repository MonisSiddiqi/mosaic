import {
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User, UserRole } from '@prisma/client';
import { GetUsersDto } from './dto/get-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';

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

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.usersService.findOne(id);
  }
}
