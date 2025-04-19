import { Injectable } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';
import { ApiResponse } from 'src/common/dto/api-response.dto';

@Injectable()
export class AddressesService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createAddressDto: CreateAddressDto, authUser: User) {
    const { line1, line2, city, state, country, postalCode } = createAddressDto;

    const address = await this.prismaService.address.upsert({
      where: {
        userId: authUser.id,
      },
      update: {
        line1,
        line2,
        city,
        state,
        country,
        postalCode,
      },
      create: {
        line1,
        line2,
        city,
        state,
        country,
        postalCode,
        userId: authUser.id,
      },
    });

    return new ApiResponse(address, 'Address added successfully');
  }

  async getAddresses() {
    const addresses = await this.prismaService.address.findMany();
    return new ApiResponse(addresses, 'Addressses fetched successfully');
  }
}
