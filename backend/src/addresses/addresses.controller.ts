import { Controller, Post, Body, Get } from '@nestjs/common';
import { AddressesService } from './addresses.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from '@prisma/client';
import { SkipAuth } from 'src/auth/decorators/skip-auth.decorator';

@Controller('addresses')
export class AddressesController {
  constructor(private readonly addressesService: AddressesService) {}

  @Post()
  create(
    @Body() createAddressDto: CreateAddressDto,
    @GetUser() authUser: User,
  ) {
    return this.addressesService.create(createAddressDto, authUser);
  }

  @SkipAuth()
  @Get()
  getProjectsAddresses() {
    return this.addressesService.getAddresses();
  }
}
