import { Transform } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, IsUUID, Min } from 'class-validator';
import { SortingValue } from 'src/common/enum/sorting-value.enum';

export enum BidsSortingFieldEnum {
  NAME = 'name',
  DESCRIPTION = 'description',
  CREATED_AT = 'createdAt',
  UPDATED_AT = 'updatedAt',
}

export class GetBidsDto {
  @IsOptional()
  @IsEnum(BidsSortingFieldEnum)
  sortField: BidsSortingFieldEnum = BidsSortingFieldEnum.CREATED_AT;

  @IsOptional()
  @IsEnum(SortingValue)
  sortValue: 'asc' | 'desc' = 'desc';

  @IsOptional()
  filter: [{ id: 'title'; value: string }];

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Transform(({ value }) => +value)
  page: number = 1;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Transform(({ value }) => +value)
  limit: number = 10;
}
