import { Transform } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, IsUUID, Min } from 'class-validator';
import { SortingValue } from 'src/common/enum/sorting-value.enum';

export enum ProjectsSortingFieldEnum {
  TITLE = 'title',
  DESCRIPTION = 'description',
  CREATED_AT = 'createdAt',
  UPDATED_AT = 'updatedAt',
  STATUS = 'status',
}

export class GetProjectsDto {
  @IsOptional()
  @IsEnum(ProjectsSortingFieldEnum)
  sortField: ProjectsSortingFieldEnum = ProjectsSortingFieldEnum.CREATED_AT;

  @IsOptional()
  @IsEnum(SortingValue)
  sortValue: 'asc' | 'desc' = 'desc';

  @IsOptional()
  filter: [
    { id: 'title'; value: string },
    { id: 'users'; value: string[] },
    { id: 'status'; value: string[] },
    { id: 'services'; value: string[] },
    { id: 'location'; value: string[] },
    { id: 'tags'; value: string[] },
  ];

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
