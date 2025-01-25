import { Transform } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, Min } from 'class-validator';

import { UserRole } from '@prisma/client';
import { SortingValue } from 'src/common/enum/sorting-value.enum';

export enum UsersSortingFieldEnum {
  NAME = 'name',
  ROLE = 'role',
  EMAIL = 'email',
  isActive = 'isActive',
  UPDATED_AT = 'updatedAt',
  CREATED_AT = 'createdAt',
}

export class GetUsersDto {
  @IsOptional()
  @IsEnum(UsersSortingFieldEnum)
  sortField: UsersSortingFieldEnum = UsersSortingFieldEnum.CREATED_AT;

  @IsOptional()
  @IsEnum(SortingValue)
  sortValue: 'asc' | 'desc' = 'desc';

  @IsOptional()
  filter: [{ id: 'role'; value: UserRole[] }, { id: 'email'; value: string }];

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Transform(({ value }) => +value)
  page: number = 1;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Transform(({ value }) => +value)
  limit: number = 10;
}
