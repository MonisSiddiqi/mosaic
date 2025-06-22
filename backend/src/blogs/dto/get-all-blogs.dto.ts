import { IsOptional } from 'class-validator';

export class GetAllBlogsDto {
  @IsOptional()
  filter: [{ id: string; value: string }];
}
