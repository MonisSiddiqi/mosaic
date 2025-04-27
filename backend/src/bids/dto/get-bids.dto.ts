import { Transform } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';
import { SortingValue } from 'src/common/enum/sorting-value.enum';

export enum BidsSortingFieldEnum {
  USER_STATUS = 'userStatus',
  VENDOR_STATUS = 'vendorStatus',
  VENDOR_ATTACHMENT_NAME = 'vendorAttachmentName',
  CREATED_AT = 'createdAt',
  UPDATED_AT = 'updatedAt',
}

export class GetBidsDto {
  @IsOptional()
  @IsEnum(BidsSortingFieldEnum)
  sortField?: BidsSortingFieldEnum = BidsSortingFieldEnum.CREATED_AT;

  @IsOptional()
  @IsEnum(SortingValue)
  sortValue?: 'asc' | 'desc' = 'desc';

  @IsOptional()
  filter?: [{ id: 'text'; value: string }, { id: 'vendor'; value: string[] }];

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Transform(({ value }) => +value)
  page?: number = 1;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Transform(({ value }) => +value)
  limit?: number = 10;
}
