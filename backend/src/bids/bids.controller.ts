import {
  Body,
  Controller,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { GetBidsDto } from './dto/get-bids.dto';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User, UserRole } from '@prisma/client';
import { BidsService } from './bids.service';
import { BidActionDto } from './dto/bid-action.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { AssignBidDto } from './dto/assign-bid.dto';

@Controller('bids')
export class BidsController {
  constructor(private readonly bidsService: BidsService) {}

  @Get()
  findAll(@Query() getBidsDto: GetBidsDto, @GetUser() authUser: User) {
    return this.bidsService.findAll(getBidsDto, authUser);
  }

  @Post('action')
  @Roles(UserRole.VENDOR, UserRole.USER)
  @UseGuards(RolesGuard)
  @UseInterceptors(FileInterceptor('attachment'))
  bidAction(
    @Body() bidActionDto: BidActionDto,
    @GetUser() authUser: User,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 10 * 1024 * 1024,
            message: 'Attachement size should be less than 10mb',
          }),
        ],
        fileIsRequired: false,
      }),
    )
    attachment: Express.Multer.File,
  ) {
    return this.bidsService.bidAction(bidActionDto, authUser, attachment);
  }

  @Get('statistics')
  getBidsStatistics(@GetUser() authUser: User) {
    return this.bidsService.bidsStatistics(authUser);
  }

  @Post('assign')
  @Roles(UserRole.ADMIN)
  @UseGuards(RolesGuard)
  assignBid(@Body() assignBidDto: AssignBidDto) {
    return this.bidsService.assignBid(assignBidDto);
  }

  @Roles(UserRole.VENDOR)
  @UseGuards(RolesGuard)
  @Patch(':id/mark-as-complete')
  markProjectAsComplete(@Param('id') bidId: string, @GetUser() authUser: User) {
    return this.bidsService.markProjectComplete(bidId, authUser);
  }
}
