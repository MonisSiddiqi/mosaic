import { BidStatus } from '@prisma/client';
import {
  IsEnum,
  IsOptional,
  IsString,
  IsUUID,
  Length,
  ValidateIf,
} from 'class-validator';

export class BidActionDto {
  @IsUUID()
  bidId: string;

  @IsEnum({
    ACCEPTED: BidStatus.ACCEPTED,
    REJECTED: BidStatus.REJECTED,
  })
  action: 'ACCEPTED' | 'REJECTED';

  @IsOptional()
  @IsString()
  @Length(3)
  message: string;
}
