import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, Min } from 'class-validator';

export class GetLoginHistoryDto {
  @IsOptional()
  filter: [{ id: 'email'; value: string }];

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => +value)
  page: number = 0;

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => Math.floor(Number(value)))
  limit: number = 10;
}
