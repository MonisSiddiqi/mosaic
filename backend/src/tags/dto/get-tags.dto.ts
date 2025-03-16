import { Transform } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, Min } from 'class-validator';
import { SortingValue } from 'src/common/enum/sorting-value.enum';

export enum TagsSortingFieldEnum {
  NAME = 'name',
  CREATED_AT = 'createdAt',
  UPDATED_AT = 'updatedAt',
  VENDOR = 'vendor',
}

export class GetTagsDto {
  @IsOptional()
  @IsEnum(TagsSortingFieldEnum)
  sortField: TagsSortingFieldEnum = TagsSortingFieldEnum.CREATED_AT;

  @IsOptional()
  @IsEnum(SortingValue)
  sortValue: 'asc' | 'desc' = 'desc';

  @IsOptional()
  filter: [{ id: 'name'; value: string }, { id: 'serviceId'; value: string }];

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Transform(({ value }) => +value)
  page: number = 0;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Transform(({ value }) => +value)
  limit: number = 0;
}
