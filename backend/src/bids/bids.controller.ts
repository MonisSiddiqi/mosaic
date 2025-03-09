import { Controller, Get, Query } from '@nestjs/common';
import { GetBidsDto } from './dto/get-bids.dto';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from '@prisma/client';
import { BidsService } from './bids.service';

@Controller('bids')
export class BidsController {
  constructor(private readonly bidsService: BidsService) {}

  @Get('me')
  findAll(@GetUser() authUser: User) {
    return this.bidsService.findAll(authUser);
  }
}
