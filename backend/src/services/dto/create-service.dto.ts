import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateServiceDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  name: string;

  @IsString()
  @MaxLength(200)
  description: string;

  @IsOptional()
  @IsString()
  planId: string;
}
